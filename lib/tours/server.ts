import "server-only";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { videos as editorialVideos } from "../../data/videos";
import { allSearchHits } from "../../data/search-hits/france";
import { tourCountries } from "./countries";
import { buildTours, isPublicTour, parseTourCsv } from "./core";
import type { DiscoveryVideo, WorldTour } from "./types";

const sourceDirectory = path.join(process.cwd(), "data", "maps");
const pageDirectory = path.join(process.cwd(), "app", "videos");
const pageSlugs = new Set(readdirSync(pageDirectory, { withFileTypes: true })
  .filter((entry) => entry.isDirectory() && existsSync(path.join(pageDirectory, entry.name, "page.tsx")))
  .map((entry) => entry.name));

// Private/server-side collection includes drafts. Never serialize it into a client.
export const tours = buildTours(tourCountries.map((country) => ({
  source: country.source,
  rows: parseTourCsv(readFileSync(path.join(sourceDirectory, country.source), "utf8"), country.source),
})), editorialVideos, pageSlugs);
export const publicTours = tours.filter(isPublicTour);
const publicById = new Map(publicTours.map((tour) => [tour.tourId, tour]));

// Keep the site's ONE combined highlight index; resolve IDs to current slugs
// and URLs rather than trusting repeated link data in its exported rows.
export const searchHits = allSearchHits.flatMap((hit) => {
  const tour = publicById.get(hit.tour_id);
  if (!tour || hit.seconds < 0 || (tour.durationSeconds > 0 && hit.seconds >= tour.durationSeconds)) return [];
  return [{ ...hit, slug: tour.slug, youtube_url: tour.youtubeUrl }];
});

// Explicit projection prevents production notes and draft records reaching clients.
export const discoveryVideos: DiscoveryVideo[] = publicTours.map((tour) => ({
  id: tour.tourId, slug: tour.slug, siteTitle: tour.siteTitle, youtubeTitle: tour.youtubeTitle,
  youtubeUrl: tour.youtubeUrl, thumbnail: tour.thumbnail, country: tour.country,
  region: tour.region, city: tour.city, filmingDates: tour.filmingDates,
  filmingMonthYear: tour.filmingMonthYear, durationLabel: tour.durationLabel,
  durationSeconds: tour.durationSeconds, weather: tour.weather,
  shortDescription: tour.shortDescription, keywords: tour.keywords, landmarks: tour.landmarks,
  themes: tour.themes, timeOfDay: tour.timeOfDay, videoType: tour.videoType,
  visibility: tour.visibility, highlights: [],
  watchHref: tour.watchHref, watchDestinationType: tour.watchDestinationType,
}));

export const worldTours: WorldTour[] = publicTours.flatMap((tour) => {
  if (tour.latitude === null || tour.longitude === null) return [];
  const mapGroup = tour.country === "Monaco" ? "France" : tour.country;
  if (!tourCountries.some((country) => country.name === mapGroup)) {
    throw new Error(`${tour.tourId}: no map presentation configured for ${mapGroup}`);
  }
  return [{
    tourId: tour.tourId, slug: tour.slug, title: tour.siteTitle, city: tour.city,
    country: tour.country, mapGroup, region: tour.region, themes: tour.themes,
    videoType: tour.videoType, filmedYear: tour.filmedYear, durationLabel: tour.durationLabel,
    youtubeUrl: tour.youtubeUrl, watchHref: tour.watchHref, watchDestinationType: tour.watchDestinationType,
    latitude: tour.latitude, longitude: tour.longitude,
  }];
});
