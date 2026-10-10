export const PROWALK_CHANNEL_ID = "UCNzul4dnciIlDg8BAcn5-cQ";

export type FeaturedWalk = {
  youtubeUrl: string;
  thumbnail: string;
  siteTitle: string;
  shortDescription: string;
  city?: string;
  country?: string;
};

function decodeXml(value: string): string {
  return value.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1").replace(/&(#x[\da-f]+|#\d+|amp|lt|gt|quot|apos);/gi, (match, entity: string) => {
    const named: Record<string, string> = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'" };
    if (named[entity]) return named[entity];
    const code = entity.startsWith("#x") ? parseInt(entity.slice(2), 16) : Number(entity.slice(1));
    return Number.isInteger(code) && code > 0 && code <= 0x10ffff ? String.fromCodePoint(code) : match;
  });
}

// Only read entries from the channel's public feed, never a supplied video URL
// or playlist (which could contain unlisted videos). Title matching identifies
// walks; it is not a duration-based Shorts classifier.
export function latestWalkFromFeed(xml: string, now = Date.now()): FeaturedWalk | null {
  const candidates = [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)].flatMap(([, entry]) => {
    const field = (tag: string) => decodeXml(entry.match(new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`))?.[1] ?? "").trim();
    const id = field("yt:videoId");
    const title = field("title");
    const published = Date.parse(field("published"));
    if (field("yt:channelId") !== PROWALK_CHANNEL_ID || !/^[\w-]{11}$/.test(id)
      || !Number.isFinite(published) || published > now
      || !/\bwalk(?:ing)?\b/i.test(title) || /#shorts?\b|\b(?:trailer|teaser)\b/i.test(title)) return [];
    const intro = field("media:description").split(/\r?\n\s*\r?\n/)[0].replace(/\s+/g, " ");
    return [{ published, video: {
      youtubeUrl: `https://www.youtube.com/watch?v=${id}`,
      thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
      siteTitle: title,
      shortDescription: intro.length > 320 ? `${intro.slice(0, 317).replace(/\s+\S*$/, "")}…` : intro,
    } }];
  });
  return candidates.sort((a, b) => b.published - a.published)[0]?.video ?? null;
}
