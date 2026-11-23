import { isFullLengthWalk, walkCandidatesFromFeed, type VerifiedFeedWalk } from "./latestWalk";

export async function colmarUploadsFromFeed(xml: string, durationForId: (id: string) => Promise<number | null>, now = Date.now()): Promise<VerifiedFeedWalk[]> {
  const candidates = walkCandidatesFromFeed(xml, now).filter(walk => /\bcolmar\b/i.test(walk.siteTitle));
  const verified = await Promise.all(candidates.map(async walk => {
    const id = new URL(walk.youtubeUrl).searchParams.get("v")!;
    const durationSeconds = await durationForId(id);
    return durationSeconds !== null && isFullLengthWalk(durationSeconds) ? { ...walk, durationSeconds } : null;
  }));
  return verified.filter((walk): walk is VerifiedFeedWalk => walk !== null);
}

// This small archive is discovered public YouTube metadata, not tour records.
// Missing entries in the rolling feed must never erase earlier discoveries.
export function mergeColmarUploads(saved: VerifiedFeedWalk[], incoming: VerifiedFeedWalk[]): VerifiedFeedWalk[] {
  const byUrl = new Map([...saved, ...incoming].map(walk => [walk.youtubeUrl, walk]));
  return [...byUrl.values()].sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt));
}

export function validateColmarArchive(value: unknown, now = Date.now()): VerifiedFeedWalk[] {
  if (!Array.isArray(value)) throw new Error("Colmar upload archive must be an array");
  const seen = new Set<string>();
  for (const walk of value) {
    if (!walk || typeof walk !== "object"
      || typeof walk.youtubeUrl !== "string" || !/^https:\/\/www\.youtube\.com\/watch\?v=[\w-]{11}$/.test(walk.youtubeUrl)
      || typeof walk.siteTitle !== "string" || !/\bcolmar\b/i.test(walk.siteTitle)
      || /#shorts?\b|\b(?:trailer|teaser)\b/i.test(walk.siteTitle)
      || typeof walk.shortDescription !== "string"
      || typeof walk.durationSeconds !== "number" || !isFullLengthWalk(walk.durationSeconds)
      || typeof walk.publishedAt !== "string" || !Number.isFinite(Date.parse(walk.publishedAt)) || Date.parse(walk.publishedAt) > now
      || walk.thumbnail !== `https://i.ytimg.com/vi/${new URL(walk.youtubeUrl).searchParams.get("v")}/hqdefault.jpg`
      || seen.has(walk.youtubeUrl)) throw new Error("Invalid or duplicate entry in Colmar upload archive");
    seen.add(walk.youtubeUrl);
  }
  return value as VerifiedFeedWalk[];
}
