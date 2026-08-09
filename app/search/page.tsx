import Link from "next/link";
import type { ReactNode } from "react";

import SearchFilterBar from "../../components/SearchFilterBar";
import {
  getVideoWatchDestinationType,
  getVideoWatchHref,
} from "../../data/maps/filters";
import { allSearchHits } from "../../data/search-hits/france";
import type { SearchHitRecord } from "../../data/video-types";
import { videos } from "../../data/videos/index";

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

function SearchResultLink({
  href,
  isInternal,
  className,
  children,
  ariaLabel,
}: {
  href: string;
  isInternal: boolean;
  className: string;
  children: ReactNode;
  ariaLabel?: string;
}) {
  if (isInternal) {
    return (
      <Link href={href} className={className} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={className}
      aria-label={ariaLabel}
    >
      {children}
    </a>
  );
}

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
          const isGeographicMatch = matchesGeographicMetadata(query, video);

          // RULE 2: Broad page-title matches stay card-only unless we also
          // have a more specific landmark/highlight match for this video.
          const isVideoLevelMatch = matchesVideoLevel(query, video);
          const hasSpecificMatch =
            matchesLandmarks(query, video) ||
            Boolean(matchingHitsBySlug[video.slug]?.length);

          // RULE 3: Only suppress timestamps for broad geographic queries or
          // title-only matches with no more specific evidence.
          const hits =
            isGeographicMatch || (isVideoLevelMatch && !hasSpecificMatch)
            ? []
            : (matchingHitsBySlug[video.slug] ?? []).sort(
                (a, b) => a.seconds - b.seconds
              );

          return { video, matchingHits: hits };
        })
    : [];

  return (
    <main className="min-h-screen bg-[#fcfaf6] text-[#3d3327]">
      <section className="border-b border-[#d8c7b5] bg-gradient-to-br from-[#f4e6bc] via-[#fcfaf6] to-[#e7f1f8]">
        <div className="mx-auto max-w-6xl px-6 py-14 lg:px-10 lg:py-16">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#9a735a]">
            Site Search
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-[#3d3327] sm:text-5xl">
            Search walks and destinations
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-[#56493a]">
            Search by city, country, landmark, neighborhood, or theme to find
            the right walk faster.
          </p>

          <SearchFilterBar
            videos={videos}
            initialQuery={query}
            initialCountry={selectedCountry}
            initialRegion={selectedRegion}
            initialCity={selectedCity}
            initialType={selectedType}
            action="/search"
            placeholder="Search by keyword"
            submitLabel="Search"
            variant="page"
          />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12 lg:px-10 lg:py-14">
        {!hasActiveFilters ? (
          <div className="rounded-[2rem] border border-[#d8c7b5] bg-white p-8 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#9a735a]">
              Start Searching
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#3d3327]">
              Find walks by place or subject
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-8 text-[#56493a]">
              Try a city like Naples, a country like Italy, a landmark like
              Castel d&apos;Ovo, or a theme like waterfront, markets, or
              historic center.
            </p>
          </div>
        ) : results.length === 0 ? (
          <div className="rounded-[2rem] border border-[#d8c7b5] bg-white p-8 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#9a735a]">
              No Matches
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#3d3327]">
              {query
                ? `No results for "${query}"`
                : "No videos match the current filters"}
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-8 text-[#56493a]">
              Try a broader search or relax one or more filters to see more
              videos.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#9a735a]">
                Search Results
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#3d3327]">
                {query
                  ? `${results.length} result${results.length === 1 ? "" : "s"} for "${query}"`
                  : `${results.length} matching video${results.length === 1 ? "" : "s"}`}
              </h2>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              {results.map(({ video, matchingHits }) => {
                const watchHref = getVideoWatchHref(video.slug, video.youtubeUrl);
                const isInternalWatchPage =
                  getVideoWatchDestinationType(video.slug) === "internal-page";

                return (
                  <article
                    key={video.id}
                    className="overflow-hidden rounded-[2rem] border border-[#d8c7b5] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                  >
                    <SearchResultLink
                      href={watchHref}
                      isInternal={isInternalWatchPage}
                      className="block overflow-hidden border-b border-[#eadfce]"
                      ariaLabel={`View ${video.siteTitle}`}
                    >
                      <img
                        src={video.thumbnail}
                        alt={video.siteTitle}
                        className="aspect-[16/9] w-full object-cover"
                        loading="lazy"
                      />
                    </SearchResultLink>

                    <div className="p-6">
                      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9a735a]">
                        {video.city}, {video.region}, {video.country}
                      </p>
                      <h3 className="mt-3 text-2xl font-bold tracking-tight text-[#3d3327]">
                        {video.siteTitle}
                      </h3>

                      <div className="mt-4 flex flex-wrap gap-3 text-sm text-[#6e5a45]">
                        <span className="rounded-full border border-[#e5d7c6] bg-[#fcfaf6] px-3 py-1.5 font-medium">
                          {video.filmingMonthYear}
                        </span>
                        <span className="rounded-full border border-[#e5d7c6] bg-[#fcfaf6] px-3 py-1.5 font-medium">
                          {video.durationLabel}
                        </span>
                        <span className="rounded-full border border-[#e5d7c6] bg-[#fcfaf6] px-3 py-1.5 font-medium">
                          {video.videoType}
                        </span>
                      </div>

                      <p className="mt-5 text-base leading-8 text-[#56493a]">
                        {video.shortDescription}
                      </p>

                      {matchingHits.length > 0 ? (
                        <div className="mt-6 rounded-[1.5rem] border border-[#eadfce] bg-[#fcfaf6] p-4">
                          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9a735a]">
                            Matching Timestamps
                          </p>
                          <div className="mt-3 space-y-3">
                            {matchingHits.map((hit) => {
                              const hitHref = getVideoWatchHref(
                                hit.slug,
                                hit.youtube_url
                              );
                              const isInternalHit =
                                getVideoWatchDestinationType(hit.slug) ===
                                "internal-page";

                              return (
                                <SearchResultLink
                                  key={`${hit.slug}-${hit.seconds}-${hit.highlight_title}`}
                                  href={hitHref}
                                  isInternal={isInternalHit}
                                  className="block rounded-[1rem] border border-[#eadfce] bg-white px-4 py-3 transition hover:border-[#167fd5] hover:shadow-sm"
                                >
                                  <p className="text-sm font-semibold text-[#167fd5]">
                                    {hit.time_label}
                                  </p>
                                  <p className="mt-1 text-sm font-semibold text-[#3d3327]">
                                    {hit.highlight_title}
                                  </p>
                                </SearchResultLink>
                              );
                            })}
                          </div>
                        </div>
                      ) : null}

                      <SearchResultLink
                        href={watchHref}
                        isInternal={isInternalWatchPage}
                        className="mt-6 inline-flex items-center justify-center rounded-full bg-[#167fd5] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#09679e]"
                      >
                        View video
                      </SearchResultLink>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
