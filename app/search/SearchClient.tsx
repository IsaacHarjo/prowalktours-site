"use client";
import Link from "next/link";
import type { ReactNode } from "react";
import SearchFilterBar from "../../components/SearchFilterBar";
import { withWatchTimestamp } from "../../lib/tours/links";
import type { DiscoveryVideo } from "../../lib/tours/types";
import type { SearchHitRecord } from "../../data/video-types";

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


export default function SearchClient({videos, query, selectedCountry, selectedRegion, selectedCity, selectedType, hasActiveFilters, results}: { videos: DiscoveryVideo[]; query: string; selectedCountry: string; selectedRegion: string; selectedCity: string; selectedType: string; hasActiveFilters: boolean; results: {video: DiscoveryVideo; matchingHits: SearchHitRecord[]}[]; }) {
  return (
    <div className="min-h-screen bg-[#fcfaf6] text-[#3d3327]">
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

            <div className="grid items-start gap-6 lg:grid-cols-2">
              {results.map(({ video, matchingHits }) => {
                const watchHref = video.watchHref;
                const isInternalWatchPage =
                  video.watchDestinationType === "internal-page";

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
                              const hitHref = withWatchTimestamp(video.watchHref, hit.seconds);
                              const isInternalHit = video.watchDestinationType === "internal-page";

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
    </div>
  );
}
