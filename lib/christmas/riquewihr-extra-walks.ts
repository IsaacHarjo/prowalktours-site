import { youtubeIdFromUrl } from "../tours/core";
import type { ChristmasWalk } from "./catalog";

// Riquewihr walks shown on the guide before they reach the tour CSVs.
// `showOnGuide` adds the walk to the guide's cards and ItemList. Once a Sheet
// export includes the same YouTube ID, the catalog record is used and the
// entry here is skipped.
export const riquewihrDayWalk2025YoutubeId = "yWwK6emeRqY";

const extraWalks: { showOnGuide: boolean; walk: ChristmasWalk }[] = [
  {
    // Shown from 13 November 2026 at Ike's request, while the video is still
    // members-only on YouTube. It goes public on 14 November 2026.
    showOnGuide: true,
    walk: {
      id: "fr-0040",
      slug: "riquewihr-christmas-market-day-walk-2025",
      siteTitle: "Riquewihr, France Christmas Market Day Walk (2025)",
      youtubeTitle: "Riquewihr, France Christmas Market | Inside the Shops, Cellars & Courtyards | 4K 🎄",
      youtubeUrl: `https://www.youtube.com/watch?v=${riquewihrDayWalk2025YoutubeId}`,
      thumbnail: `https://i.ytimg.com/vi/${riquewihrDayWalk2025YoutubeId}/hqdefault.jpg`,
      country: "France",
      region: "Alsace (Grand Est)",
      city: "Riquewihr",
      filmingDates: ["2025-12-14"],
      filmingMonthYear: "December 2025",
      filmedYear: 2025,
      durationLabel: "2:00:44",
      durationSeconds: 7244,
      weather: "",
      shortDescription: "Inside the shops, cellars and courtyards of Riquewihr during the Christmas market.",
      keywords: ["Riquewihr", "Alsace (Grand Est)", "France", "day walk", "Christmas Markets"],
      landmarks: [],
      themes: ["christmas-market"],
      timeOfDay: "",
      videoType: "day-walk",
      visibility: "public",
      highlights: [],
      watchHref: `https://www.youtube.com/watch?v=${riquewihrDayWalk2025YoutubeId}`,
      watchDestinationType: "youtube",
    },
  },
];

/** Adds the shown extra walks the catalog doesn't already have, newest first. */
export function withRiquewihrExtraWalks(walks: ChristmasWalk[]): ChristmasWalk[] {
  const known = new Set(walks.map(walk => youtubeIdFromUrl(walk.youtubeUrl)));
  const extras = extraWalks.filter(entry => entry.showOnGuide && !known.has(youtubeIdFromUrl(entry.walk.youtubeUrl))).map(entry => entry.walk);
  if (!extras.length) return walks;
  return [...walks, ...extras].sort((a, b) => (b.filmedYear ?? 0) - (a.filmedYear ?? 0));
}
