import "server-only";
import { latestWalkFromFeed, PROWALK_CHANNEL_ID, type FeaturedWalk } from "./latestWalk";

export async function getNewestWalk(fallback?: FeaturedWalk): Promise<FeaturedWalk | undefined> {
  try {
    const response = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${PROWALK_CHANNEL_ID}`, {
      next: { revalidate: 900 },
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) throw new Error("YouTube feed unavailable");
    const newest = latestWalkFromFeed(await response.text());
    if (!newest) throw new Error("No eligible walk in YouTube feed");
    return newest;
  } catch {
    console.warn("Newest walk: using the curated fallback because the public feed could not be read.");
    return fallback;
  }
}
