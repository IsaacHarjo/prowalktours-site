import { PROWALK_CHANNEL_ID } from "./latestWalk";

// YouTube occasionally returns 503 for this public feed. Retry transient
// failures in both live discovery and the archive job; never accept error HTML.
export async function fetchPublicFeed(fetcher: typeof fetch = fetch, init: RequestInit = {}): Promise<string> {
  for (let attempt = 0; attempt < 3; attempt++) {
    let response: Response;
    try {
      response = await fetcher(`https://www.youtube.com/feeds/videos.xml?channel_id=${PROWALK_CHANNEL_ID}`, {
        ...init, signal: AbortSignal.timeout(8000),
      });
    } catch (error) {
      if (attempt === 2) throw error;
      await new Promise(resolve => setTimeout(resolve, 250 * (attempt + 1)));
      continue;
    }
    if (!response.ok) {
      if (attempt < 2 && (response.status === 429 || response.status >= 500)) {
        await new Promise(resolve => setTimeout(resolve, 250 * (attempt + 1)));
        continue;
      }
      throw new Error(`Public channel feed returned HTTP ${response.status}`);
    }
    const xml = await response.text();
    if (!/<feed[\s>]/.test(xml) || !xml.includes(`<yt:channelId>${PROWALK_CHANNEL_ID}</yt:channelId>`)) {
      throw new Error("Unexpected public channel feed");
    }
    return xml;
  }
  throw new Error("Public channel feed unavailable");
}
