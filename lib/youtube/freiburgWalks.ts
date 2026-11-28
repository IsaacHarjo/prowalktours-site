import { isFullLengthWalk, publicReleaseFromWatchPage, walkCandidatesFromFeed, type FeedWalk, type VerifiedFeedWalk } from "./latestWalk";
import release from "../../data/youtube/freiburg-release.json";

export function isFreiburgUpload(walk: Pick<FeedWalk, "youtubeUrl" | "siteTitle">): boolean {
  const id = new URL(walk.youtubeUrl).searchParams.get("v");
  return !!id && !release.excludedVideoIds.includes(id)
    && (id === release.videoId || /\bfreiburg\b/i.test(walk.siteTitle));
}

export async function discoverFreiburgRelease(fetcher: typeof fetch = fetch, now = Date.now()): Promise<VerifiedFeedWalk[]> {
  if (Date.parse(release.publicReleaseDate) > now) return [];
  const response = await fetcher(`https://www.youtube.com/watch?v=${release.videoId}`, { cache: "no-store", signal: AbortSignal.timeout(15000) });
  if (!response.ok) throw new Error(`Freiburg release metadata returned HTTP ${response.status}`);
  const walk = publicReleaseFromWatchPage(await response.text(), release.videoId, release.publicReleaseDate, now);
  return walk ? [walk] : [];
}

export async function freiburgUploadsFromFeed(xml: string, durationForId: (id: string) => Promise<number | null>, now = Date.now()): Promise<VerifiedFeedWalk[]> {
  // The members-first release is verified separately, with its public release
  // date; an old upload date in the feed must not overwrite that date.
  const candidates = walkCandidatesFromFeed(xml, now).filter(walk => isFreiburgUpload(walk)
    && !walk.youtubeUrl.endsWith(`v=${release.videoId}`));
  const verified = await Promise.all(candidates.map(async walk => {
    const id = new URL(walk.youtubeUrl).searchParams.get("v")!;
    const durationSeconds = await durationForId(id);
    return durationSeconds !== null && isFullLengthWalk(durationSeconds) ? { ...walk, durationSeconds } : null;
  }));
  return verified.filter((walk): walk is VerifiedFeedWalk => walk !== null);
}

// This small archive is discovered public YouTube metadata, not tour records.
// Missing entries in the rolling feed must never erase earlier discoveries.
export function mergeFreiburgUploads(saved: VerifiedFeedWalk[], incoming: VerifiedFeedWalk[]): VerifiedFeedWalk[] {
  const byUrl = new Map([...saved, ...incoming].map(walk => [walk.youtubeUrl, walk]));
  return [...byUrl.values()].sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt));
}

export function validateFreiburgArchive(value: unknown, now = Date.now()): VerifiedFeedWalk[] {
  if (!Array.isArray(value)) throw new Error("Freiburg upload archive must be an array");
  const seen = new Set<string>();
  for (const walk of value) {
    if (!walk || typeof walk !== "object"
      || typeof walk.youtubeUrl !== "string" || !/^https:\/\/www\.youtube\.com\/watch\?v=[\w-]{11}$/.test(walk.youtubeUrl)
      || typeof walk.siteTitle !== "string" || !isFreiburgUpload(walk)
      || /#shorts?\b|\b(?:trailer|teaser)\b/i.test(walk.siteTitle)
      || typeof walk.shortDescription !== "string"
      || typeof walk.durationSeconds !== "number" || !isFullLengthWalk(walk.durationSeconds)
      || typeof walk.publishedAt !== "string" || !Number.isFinite(Date.parse(walk.publishedAt)) || Date.parse(walk.publishedAt) > now
      || walk.thumbnail !== `https://i.ytimg.com/vi/${new URL(walk.youtubeUrl).searchParams.get("v")}/hqdefault.jpg`
      || seen.has(walk.youtubeUrl)) throw new Error("Invalid or duplicate entry in Freiburg upload archive");
    seen.add(walk.youtubeUrl);
  }
  return value as VerifiedFeedWalk[];
}

