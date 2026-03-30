import Link from "next/link";

import SearchFilterBar from "../../components/SearchFilterBar";
import { franceSearchHits } from "../../data/search-hits/france";
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

const normalizeSearchText = (value: string) => value.trim().toLowerCase();

const matchesVideoMetadata = (query: string, video: (typeof videos)[number]) => {
  const normalizedQuery = normalizeSearchText(query);

  if (!normalizedQuery) {
    return false;
  }

  const searchableValues = [
    video.siteTitle,
    video.country,
    video.region,
    video.city,
    video.shortDescription,
    ...video.keywords,
    ...video.landmarks,
    ...video.highlights.map((highlight) => highlight.title),
  ];

  return searchableValues.some((value) =>
    value.toLowerCase().includes(normalizedQuery)
  );
};

const matchesSearchHit = (query: string, hit: SearchHitRecord) => {
  const normalizedQuery = normalizeSearchText(query);

  if (!normalizedQuery) {
    return false;
  }

  const searchableValues = [
    hit.highlight_title,
    hit.landmark,
    ...hit.search_terms,
  ];

  return searchableValues.some((value) =>
    value.toLowerCase().includes(normalizedQuery)
  );
};

const matchesFilterValue = (
  videoValue: string | undefined,
  selectedValue: string
) => {
  if (!selectedValue) {
    return true;
  }

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
  const selectedRegion = normalizeQueryValue(resolvedSearchParams?.region).trim();
  const selectedCity = normalizeQueryValue(resolvedSearchParams?.city).trim();
  const selectedType = normalizeQueryValue(resolvedSearchParams?.type).trim();

  const hasActiveFilters = Boolean(
    query || selectedCountry || selectedRegion || selectedCity || selectedType
  );

  const matchingHitsBySlug = query
    ? franceSearchHits.reduce<Record<string, SearchHitRecord[]>>((groups, hit) => {
        if (!matchesSearchHit(query, hit)) {
          return groups;
        }

        groups[hit.slug] = [...(groups[hit.slug] ?? []), hit];
        return groups;
      }, {})
    : {};

  const results: SearchResultGroup[] = hasActiveFilters
    ? videos
        .filter((video) => {
          const matchesSelectedFilters =
            matchesFilterValue(video.country, selectedCountry) &&
            matchesFilterValue(video.region, selectedRegion) &&
            matchesFilterValue(video.city, selectedCity) &&
            matchesFilterValue(video.videoType, selectedType);

          if (!matchesSelectedFilters) {
            return false;
          }

          if (!query) {
            return true;
          }

          return (
            matchesVideoMetadata(query, video) ||
            Boolean(matchingHitsBySlug[video.slug]?.length)
          );
        })
        .map((video) => ({
          video,
          matchingHits: (matchingHitsBySlug[video.slug] ?? []).sort(
            (left, right) => left.seconds - right.seconds
          ),
        }))
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
              {results.map(({ video, matchingHits }) => (
                <article
                  key={video.id}
                  className="overflow-hidden rounded-[2rem] border border-[#d8c7b5] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <Link
                    href={`/videos/${video.slug}`}
                    className="block overflow-hidden border-b border-[#eadfce]"
                    aria-label={`View ${video.siteTitle}`}
                  >
                    <img
                      src={video.thumbnail}
                      alt={video.siteTitle}
                      className="aspect-[16/9] w-full object-cover"
                      loading="lazy"
                    />
                  </Link>

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
                          {matchingHits.map((hit) => (
                            <a
                              key={`${hit.slug}-${hit.seconds}-${hit.highlight_title}`}
                              href={`https://youtu.be/${hit.youtube_url.split("/").pop()}?t=${hit.seconds}`}
                              target="_blank"
                              rel="noreferrer"
                              className="block rounded-[1rem] border border-[#eadfce] bg-white px-4 py-3 transition hover:border-[#167fd5] hover:shadow-sm"
                            >
                              <p className="text-sm font-semibold text-[#167fd5]">
                                {hit.time_label}
                              </p>
                              <p className="mt-1 text-sm font-semibold text-[#3d3327]">
                                {hit.highlight_title}
                              </p>
                            </a>
                          ))}
                        </div>
                      </div>
                    ) : null}

                    <Link
                      href={`/videos/${video.slug}`}
                      className="mt-6 inline-flex items-center justify-center rounded-full bg-[#167fd5] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#09679e]"
                    >
                      View video
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
