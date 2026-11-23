import type { GuideWalk } from "../guides/types";
import type { VerifiedFeedWalk } from "./latestWalk";

function durationLabel(seconds: number): string {
  const whole = Math.floor(seconds);
  const hours = Math.floor(whole / 3600);
  const minutes = Math.floor(whole % 3600 / 60);
  return `${hours ? `${hours}:` : ""}${hours ? String(minutes).padStart(2, "0") : minutes}:${String(whole % 60).padStart(2, "0")}`;
}

export function guideVideoCards(walks: GuideWalk[], uploads: VerifiedFeedWalk[] = []) {
  const catalog = [...walks].sort((a, b) => (b.filmedYear ?? 0) - (a.filmedYear ?? 0) || Number(a.videoType !== "day-walk") - Number(b.videoType !== "day-walk"));
  const cards = catalog.map(walk => {
    const label = walk.videoType === "360-tour" ? "360° walk" : walk.videoType === "evening-walk" ? "Evening walk" : walk.slug.includes("morning") ? "Morning walk" : "Daytime walk";
    return { youtubeId: walk.youtubeId, label, siteTitle: walk.siteTitle, thumbnail: walk.thumbnail,
      context: walk.filmedYear ? `Filmed in ${walk.filmedYear}` : "", durationLabel: walk.durationLabel,
      watchHref: walk.watchHref, watchDestinationType: walk.watchDestinationType };
  });
  const known = new Map(cards.map(card => [card.youtubeId, card]));
  const seen = new Set<string>();
  const latest = [...uploads].sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt)).flatMap(walk => {
    const youtubeId = new URL(walk.youtubeUrl).searchParams.get("v")!;
    if (seen.has(youtubeId)) return [];
    seen.add(youtubeId);
    const existing = known.get(youtubeId);
    if (existing) return [existing];
    // Publication date is not a filming date. Keep the real YouTube title
    // rather than guessing daytime/evening or inventing an internal tour page.
    return [{ youtubeId, label: walk.siteTitle, siteTitle: walk.siteTitle, thumbnail: walk.thumbnail,
      context: `Published ${new Date(walk.publishedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" })}`,
      durationLabel: durationLabel(walk.durationSeconds), watchHref: walk.youtubeUrl, watchDestinationType: "youtube" as const }];
  });
  return [...latest, ...cards.filter(card => !seen.has(card.youtubeId))];
}
