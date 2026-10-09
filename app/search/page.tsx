import SearchClient from "./SearchClient";
import PageJsonLd from "../../components/PageJsonLd";
import { pageMetadata } from "../../lib/seo/pageMetadata";
export const metadata = pageMetadata("Search Walks & Landmarks", "Find Prowalk Tours by city, country, landmark, theme, or video type, with matching landmark timestamps.", "/search");

import type { SearchHitRecord } from "../../data/video-types";
import { discoveryVideos as videos, searchHits as allSearchHits } from "../../lib/tours/server";

type SearchParams = {
  q?: string | string[];
  country?: string | string[];
  region?: string | string[];
  city?: string | string[];
  type?: string | string[];
};

type SearchResultGroup = {
  video: (typeof videos)[number];
  matchingHits: SearchHitRecord[];
};

const normalizeQueryValue = (value: string | string[] | undefined) => {
  if (Array.isArray(value)) {
    return value[0] ?? "";
  }

  return value ?? "";
};

const normalizeSearchText = (value: string) =>
  value
    .normalize("NFD")
    .replace(/\p{Diacritic}+/gu, "")
    .replace(/[-'`]+/g, " ")
    .replace(/[^\p{Letter}\p{Number}]+/gu, " ")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ");

// Word boundary match — "paris" matches "Paris" but NOT "Parish"
const wordBoundaryMatch = (query: string, text: string) => {
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(`\\b${escaped}\\b`, "i");
  return re.test(text);
};

// Check if normalized query matches as whole word(s) within normalized text
const matchesWord = (normalizedQuery: string, value: string) =>
  wordBoundaryMatch(normalizedQuery, normalizeSearchText(value));

// Check if query matches city, region, or country (broad metadata match)
const matchesBroadMetadata = (
  query: string,
  video: (typeof videos)[number]
) => {
  const q = normalizeSearchText(query);
  if (!q) return false;

  return [
    video.siteTitle,
    video.country,
    video.region,
    video.city,
    video.shortDescription,
    ...video.keywords,
    ...video.themes,
  ].some((val) => matchesWord(q, val));
};

const matchesGeographicMetadata = (
  query: string,
  video: (typeof videos)[number]
) => {
  const q = normalizeSearchText(query);
  if (!q) return false;

  return [video.city, video.region, video.country].some((val) =>
    matchesWord(q, val)
  );
};

// Check if query matches specific landmarks in the video's highlights
const matchesLandmarks = (
  query: string,
  video: (typeof videos)[number]
) => {
  const q = normalizeSearchText(query);
  if (!q) return false;

  return video.landmarks.some((val) => matchesWord(q, val));
};

// Check if query matches a search hit (highlight timestamp)
const matchesSearchHit = (query: string, hit: SearchHitRecord) => {
  const q = normalizeSearchText(query);
  if (!q) return false;

  return [hit.highlight_title, hit.landmark, ...hit.search_terms].some((val) =>
    matchesWord(q, val)
  );
};

// LEVEL 1: Does the query match any VIDEO-LEVEL field?
// If yes → show card only, no timestamps.
// Video-level = broad page-title match only. Geographic matches are handled
// separately so landmark/highlight queries can still surface timestamps.
const matchesVideoLevel = (query: string, video: (typeof videos)[number]) => {
  const q = normalizeSearchText(query);
  if (!q) return false;

  return matchesWord(q, video.siteTitle);
};

const matchesFilterValue = (
  videoValue: string | undefined,
  selectedValue: string
) => {
  if (!selectedValue) return true;
  return (videoValue ?? "") === selectedValue;
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: Promise<SearchParams> | SearchParams;
}) {
  const resolvedSearchParams = await Promise.resolve(searchParams);
  const query = normalizeQueryValue(resolvedSearchParams?.q).trim();
  const selectedCountry = normalizeQueryValue(
    resolvedSearchParams?.country
  ).trim();
  const selectedRegion = normalizeQueryValue(
    resolvedSearchParams?.region
  ).trim();
  const selectedCity = normalizeQueryValue(resolvedSearchParams?.city).trim();
  const selectedType = normalizeQueryValue(resolvedSearchParams?.type).trim();

  const hasActiveFilters = Boolean(
    query || selectedCountry || selectedRegion || selectedCity || selectedType
  );

  // Classify the query across the catalog, not separately for each result.
  // Paris is still a destination search for tours cataloged under Montmartre.
  const isGeographicQuery = videos.some((video) =>
    matchesGeographicMetadata(query, video)
  );

  // Group highlight hits by slug
  const matchingHitsBySlug = query
    ? allSearchHits.reduce<Record<string, SearchHitRecord[]>>(
        (groups, hit) => {
          if (!matchesSearchHit(query, hit)) return groups;
          groups[hit.slug] = [...(groups[hit.slug] ?? []), hit];
          return groups;
        },
        {}
      )
    : {};

  // Build results: one card per video, timestamps only for landmark matches
  const results: SearchResultGroup[] = hasActiveFilters
    ? videos
        .filter((video) => {
          const matchesSelectedFilters =
            matchesFilterValue(video.country, selectedCountry) &&
            matchesFilterValue(video.region, selectedRegion) &&
            matchesFilterValue(video.city, selectedCity) &&
            matchesFilterValue(video.videoType, selectedType);

          if (!matchesSelectedFilters) return false;
          if (!query) return true;

          return (
            matchesBroadMetadata(query, video) ||
            matchesLandmarks(query, video) ||
            Boolean(matchingHitsBySlug[video.slug]?.length)
          );
        })
        .map((video) => {
          // RULE 1: Geographic queries stay card-only.

          // RULE 2: Broad page-title matches stay card-only unless we also
          // have a more specific landmark/highlight match for this video.
          const isVideoLevelMatch = matchesVideoLevel(query, video);
          const hasSpecificMatch =
            matchesLandmarks(query, video) ||
            Boolean(matchingHitsBySlug[video.slug]?.length);

          // RULE 3: Only suppress timestamps for broad geographic queries or
          // title-only matches with no more specific evidence.
          const hits =
            isGeographicQuery || (isVideoLevelMatch && !hasSpecificMatch)
            ? []
            : (matchingHitsBySlug[video.slug] ?? []).sort(
                (a, b) => a.seconds - b.seconds
              );

          return { video, matchingHits: hits };
        })
    : [];

  return <><PageJsonLd title="Search Walks" pathname="/search" /><SearchClient videos={videos} query={query} selectedCountry={selectedCountry} selectedRegion={selectedRegion} selectedCity={selectedCity} selectedType={selectedType} hasActiveFilters={hasActiveFilters} results={results} /></>;
}
