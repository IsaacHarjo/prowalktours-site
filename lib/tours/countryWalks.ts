import "server-only";
import { discoveryVideos } from "./server";

// Narrow, public-only shape for country pages. Built from discoveryVideos
// (the public projection), never from the full tour collection.
export type CountryWalk = {
  id: string;
  slug: string;
  title: string;
  /** /videos/<slug> when the walk has a page on this site, else YouTube. */
  href: string;
  isInternal: boolean;
  thumbnail: string;
  filmed: string;
  durationLabel: string;
  videoType: string;
};

export type CountryWalkGroup = { city: string; walks: CountryWalk[] };

/**
 * Public walks for one country (by its name in the tour data, e.g. "USA"),
 * grouped by city. Cities with more walks come first; walks within a city
 * run newest first, with undated walks last.
 */
export function getCountryWalkGroups(country: string): CountryWalkGroup[] {
  const byCity = new Map<string, { walk: CountryWalk; date: string }[]>();
  for (const video of discoveryVideos) {
    if (video.country !== country) continue;
    const city = video.city || video.region || country;
    const entries = byCity.get(city) ?? [];
    entries.push({
      date: video.filmingDates[0] ?? "",
      walk: {
        id: video.id,
        slug: video.slug,
        title: video.siteTitle,
        href: video.watchHref,
        isInternal: video.watchDestinationType === "internal-page",
        thumbnail: video.thumbnail,
        filmed: video.filmingMonthYear,
        durationLabel: video.durationLabel,
        videoType: video.videoType,
      },
    });
    byCity.set(city, entries);
  }
  return [...byCity.entries()]
    .sort(([cityA, a], [cityB, b]) => b.length - a.length || cityA.localeCompare(cityB))
    .map(([city, entries]) => ({
      city,
      walks: entries
        .sort((a, b) => (b.date || "0").localeCompare(a.date || "0"))
        .map((entry) => entry.walk),
    }));
}
