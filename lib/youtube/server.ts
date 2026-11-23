import "server-only";
import { unstable_cache } from "next/cache";
import { durationFromWatchPage, isFullLengthWalk, walkCandidatesFromFeed, PROWALK_CHANNEL_ID, type FeaturedWalk } from "./latestWalk";

type CatalogWalk = FeaturedWalk & { durationSeconds: number };

// Watch pages can exceed Next's 2 MB fetch-cache limit. Cache only the parsed
// duration, and retry unavailable metadata on the next 15-minute refresh.
const getVideoDuration = unstable_cache(async (id: string): Promise<number | null> => {
  try {
    const page = await fetch(`https://www.youtube.com/watch?v=${id}`, {
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    });
    return page.ok ? durationFromWatchPage(await page.text(), id) : null;
  } catch { return null; }
}, ["youtube-walk-duration-v1"], { revalidate: 900 });

export async function getNewestWalk(fallback?: CatalogWalk, catalog: CatalogWalk[] = []): Promise<FeaturedWalk | undefined> {
  const safeFallback = fallback && isFullLengthWalk(fallback.durationSeconds) ? fallback : undefined;
  try {
    const response = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${PROWALK_CHANNEL_ID}`, {
      next: { revalidate: 900 },
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) throw new Error("YouTube feed unavailable");
    const candidates = walkCandidatesFromFeed(await response.text());
    const knownDurations = candidates.map(candidate => {
      const id = new URL(candidate.youtubeUrl).searchParams.get("v")!;
      return catalog.find(walk => new URL(walk.youtubeUrl).searchParams.get("v") === id
        || new URL(walk.youtubeUrl).pathname === `/${id}`)?.durationSeconds;
    });
    // Once a catalog walk qualifies, older entries cannot win the selection.
    const firstKnownWalk = knownDurations.findIndex(duration => duration !== undefined && isFullLengthWalk(duration));
    const shortlist = firstKnownWalk < 0 ? candidates : candidates.slice(0, firstKnownWalk + 1);
    // Check in parallel so unavailable metadata cannot multiply the timeout.
    // Catalog durations avoid extra requests for tours already on the site.
    const eligible = await Promise.all(shortlist.map(async (candidate, index) => {
      const id = new URL(candidate.youtubeUrl).searchParams.get("v")!;
      const known = knownDurations[index];
      if (known !== undefined && known > 0) return isFullLengthWalk(known);
      const duration = await getVideoDuration(id);
      return duration !== null && isFullLengthWalk(duration);
    }));
    const newest = shortlist.find((_, index) => eligible[index]);
    if (!newest) throw new Error("No verified full-length walk in YouTube feed");
    return newest;
  } catch {
    console.warn("Newest walk: using the curated fallback because no full-length public video could be verified.");
    return safeFallback;
  }
}
