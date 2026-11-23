export const PROWALK_CHANNEL_ID = "UCNzul4dnciIlDg8BAcn5-cQ";

export type FeaturedWalk = {
  youtubeUrl: string;
  thumbnail: string;
  siteTitle: string;
  shortDescription: string;
  city?: string;
  country?: string;
};

export type FeedWalk = FeaturedWalk & { publishedAt: string };
export type VerifiedFeedWalk = FeedWalk & { durationSeconds: number };

function decodeXml(value: string): string {
  return value.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1").replace(/&(#x[\da-f]+|#\d+|amp|lt|gt|quot|apos);/gi, (match, entity: string) => {
    const named: Record<string, string> = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'" };
    if (named[entity]) return named[entity];
    const code = entity.startsWith("#x") ? parseInt(entity.slice(2), 16) : Number(entity.slice(1));
    return Number.isInteger(code) && code > 0 && code <= 0x10ffff ? String.fromCodePoint(code) : match;
  });
}

// Only read entries from the channel's public feed, never a supplied video URL
// or playlist (which could contain unlisted videos). No "walk" keyword is
// required. These are only candidates: callers must verify duration before
// displaying one, since unlabeled Shorts also appear in the public feed.
export function walkCandidatesFromFeed(xml: string, now = Date.now()): FeedWalk[] {
  const candidates = [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)].flatMap(([, entry]) => {
    const field = (tag: string) => decodeXml(entry.match(new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`))?.[1] ?? "").trim();
    const id = field("yt:videoId");
    const title = field("title");
    const published = Date.parse(field("published"));
    if (field("yt:channelId") !== PROWALK_CHANNEL_ID || !/^[\w-]{11}$/.test(id)
      || !Number.isFinite(published) || published > now
      || !title || /#shorts?\b|\b(?:trailer|teaser)\b/i.test(title)) return [];
    const intro = field("media:description").split(/\r?\n\s*\r?\n/)[0].replace(/\s+/g, " ");
    return [{ published, video: {
      publishedAt: new Date(published).toISOString(),
      youtubeUrl: `https://www.youtube.com/watch?v=${id}`,
      thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
      siteTitle: title,
      shortDescription: intro.length > 320 ? `${intro.slice(0, 317).replace(/\s+\S*$/, "")}…` : intro,
    } }];
  });
  return candidates.sort((a, b) => b.published - a.published).map(candidate => candidate.video);
}

// Shorts can be up to three minutes. Unknown durations fail closed.
export function isFullLengthWalk(duration: number): boolean {
  return Number.isFinite(duration) && duration > 180;
}

// Read JSON, never execute YouTube's scripts. Scope duration to the requested
// video and our channel, not related videos or ads elsewhere in the HTML.
export function durationFromWatchPage(html: string, videoId: string): number | null {
  const assignment = /\bytInitialPlayerResponse\s*=\s*\{/.exec(html);
  if (!assignment) return null;
  const start = assignment.index + assignment[0].length - 1;
  let depth = 0;
  let quoted = false;
  let escaped = false;
  for (let i = start; i < html.length; i++) {
    const char = html[i];
    if (quoted) {
      if (escaped) escaped = false;
      else if (char === "\\") escaped = true;
      else if (char === '"') quoted = false;
    } else if (char === '"') quoted = true;
    else if (char === "{") depth++;
    else if (char === "}" && --depth === 0) {
      try {
        const player = JSON.parse(html.slice(start, i + 1));
        const details = player.videoDetails;
        if (player.playabilityStatus?.status !== "OK" || details?.videoId !== videoId
          || details.channelId !== PROWALK_CHANNEL_ID || details.isLive || details.isUpcoming) return null;
        const duration = Number(details.lengthSeconds);
        return Number.isFinite(duration) && duration > 0 ? duration : null;
      } catch { return null; }
    }
  }
  return null;
}
