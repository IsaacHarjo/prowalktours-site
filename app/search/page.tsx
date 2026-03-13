import Link from "next/link";

import { videos } from "../../data/videos";

type SearchParams = {
  q?: string | string[];
};

const normalizeQueryValue = (value: string | string[] | undefined) => {
  if (Array.isArray(value)) {
    return value[0] ?? "";
  }

  return value ?? "";
};

const matchesQuery = (query: string, video: (typeof videos)[number]) => {
  const normalizedQuery = query.trim().toLowerCase();

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

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: Promise<SearchParams> | SearchParams;
}) {
  const resolvedSearchParams = await Promise.resolve(searchParams);
  const query = normalizeQueryValue(resolvedSearchParams?.q).trim();
  const results = query
    ? videos.filter((video) => matchesQuery(query, video))
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

          <form
            action="/search"
            method="get"
            className="mt-8 max-w-3xl rounded-[2rem] border border-[#d8c7b5] bg-white p-3 shadow-sm"
          >
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="text"
                name="q"
                defaultValue={query}
                placeholder="Search Naples, Italy, Spaccanapoli, waterfront, markets..."
                className="h-14 flex-1 rounded-[1.25rem] border border-[#d8c7b5] bg-[#fcfaf6] px-5 text-[17px] text-[#3d3327] outline-none transition placeholder:text-[#8a7a68] focus:border-[#167fd5]"
              />
              <button
                type="submit"
                className="inline-flex h-14 items-center justify-center rounded-[1.25rem] bg-[#167fd5] px-6 text-base font-semibold text-white transition hover:bg-[#09679e]"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12 lg:px-10 lg:py-14">
        {!query ? (
          <div className="rounded-[2rem] border border-[#d8c7b5] bg-white p-8 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#9a735a]">
              Start Searching
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#3d3327]">
              Find walks by place or subject
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-8 text-[#56493a]">
              Try a city like Naples, a country like Italy, a landmark like
              Castel dell&apos;Ovo, or a theme like waterfront, markets, or
              historic center.
            </p>
          </div>
        ) : results.length === 0 ? (
          <div className="rounded-[2rem] border border-[#d8c7b5] bg-white p-8 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#9a735a]">
              No Matches
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#3d3327]">
              No results for &ldquo;{query}&rdquo;
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-8 text-[#56493a]">
              Try a broader search using a city, country, landmark, or theme.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#9a735a]">
                Search Results
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#3d3327]">
                {results.length} result{results.length === 1 ? "" : "s"} for
                {" "}
                &ldquo;{query}&rdquo;
              </h2>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              {results.map((video) => (
                <article
                  key={video.id}
                  className="overflow-hidden rounded-[2rem] border border-[#d8c7b5] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="overflow-hidden border-b border-[#eadfce]">
                    <img
                      src={video.thumbnail}
                      alt={video.siteTitle}
                      className="aspect-[16/9] w-full object-cover"
                      loading="lazy"
                    />
                  </div>

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
                    </div>

                    <p className="mt-5 text-base leading-8 text-[#56493a]">
                      {video.shortDescription}
                    </p>

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
