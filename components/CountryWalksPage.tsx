import Link from "next/link";
import CardImage from "./CardImage";
import MapSection from "./MapSection";
import type { CountryWalk, CountryWalkGroup } from "../lib/tours/countryWalks";

// Shared template for country pages that don't have a full destination
// guide yet: header, the existing route map, then every public walk from
// the tour data grouped by city. Server component; only CardImage is a
// client component and it receives just a slug, thumbnail URL and alt text.

type CountryWalksPageProps = {
  /** Display name, e.g. "United States". */
  country: string;
  /** Name inside a sentence when it needs an article, e.g. "the United States". */
  inSentence?: string;
  map: { embedUrl: string; fullUrl: string };
  walkGroups: CountryWalkGroup[];
};

// "Athens", "Athens and Mykonos", "Athens, Mykonos, and Paros".
function listPlaces(places: string[]) {
  if (places.length <= 2) return places.join(" and ");
  return `${places.slice(0, -1).join(", ")}, and ${places[places.length - 1]}`;
}

function formatVideoType(videoType: string) {
  return videoType.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function WalkCard({ walk }: { walk: CountryWalk }) {
  const details = [walk.filmed, walk.durationLabel].filter(Boolean).join(" · ");
  const content = (
    <>
      <div className="aspect-video w-full overflow-hidden bg-[#2f261d]">
        <CardImage
          slug={walk.slug}
          fallbackSrc={walk.thumbnail}
          alt={walk.title}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h4 className="text-lg font-bold leading-7 text-[#2f261d] transition group-hover:text-[#167fd5]">
          {walk.title}
        </h4>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {walk.videoType ? (
            <span className="rounded-full bg-[#f0e8dc] px-3 py-1 text-xs font-semibold text-[#6c5b49]">
              {formatVideoType(walk.videoType)}
            </span>
          ) : null}
          {details ? (
            <span className="text-xs text-[#8a7a68]">{details}</span>
          ) : null}
        </div>
        <div className="mt-auto pt-4 text-[15px] font-semibold text-[#167fd5]">
          {walk.isInternal ? (
            "View walk →"
          ) : (
            <>
              Watch on YouTube ↗
              <span className="sr-only"> (opens in a new tab)</span>
            </>
          )}
        </div>
      </div>
    </>
  );
  const className =
    "group flex flex-col overflow-hidden rounded-3xl border border-[#eadfce] bg-white shadow-sm transition hover:-translate-y-1 hover:border-[#d7c3ad] hover:shadow-md";

  return walk.isInternal ? (
    <Link href={walk.href} className={className}>
      {content}
    </Link>
  ) : (
    <a href={walk.href} target="_blank" rel="noopener noreferrer" className={className}>
      {content}
    </a>
  );
}

export default function CountryWalksPage({
  country,
  inSentence = country,
  map,
  walkGroups,
}: CountryWalksPageProps) {
  const walkCount = walkGroups.reduce((total, group) => total + group.walks.length, 0);
  // Intro and map line come from the tour data, so they stay current as
  // walks are added. Places are listed in the same order as the groups.
  const places = listPlaces(walkGroups.map((group) => group.city));
  const intro =
    walkCount === 1
      ? `So far I have one walk in ${inSentence}, in ${places}.`
      : `So far I have ${walkCount} walks in ${inSentence}, covering ${places}.`;
  const mapDescription = `See where my walks in ${places} are on the map.`;
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Countries", href: "/countries" },
    { label: country },
  ];

  return (
    <div className="bg-[#fcfaf7] text-[#2f261d]">
      <section className="border-b border-[#eadfce] bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
          <nav
            aria-label="Breadcrumb"
            className="mb-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-[#8a7a68]"
          >
            {breadcrumbs.map((item, index) => (
              <div key={item.label} className="inline-flex items-center gap-2">
                {item.href ? (
                  <Link href={item.href} className="transition hover:text-[#167fd5]">
                    {item.label}
                  </Link>
                ) : (
                  <span className="font-medium text-[#5c4c33]">{item.label}</span>
                )}
                {index < breadcrumbs.length - 1 ? (
                  <span aria-hidden="true" className="text-[#bba893]">
                    /
                  </span>
                ) : null}
              </div>
            ))}
          </nav>

          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9a7a52]">
            Country
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-[#2f261d] sm:text-5xl">
            {country}
          </h1>
          <p className="mt-5 max-w-3xl text-[18px] leading-8 text-[#6c5b49]">{intro}</p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#walks"
              className="inline-flex items-center justify-center rounded-full bg-[#167fd5] px-6 py-3 text-base font-semibold text-white transition hover:bg-[#0f6db9]"
            >
              Browse the Walks
            </a>
            <Link
              href="/countries"
              className="inline-flex items-center justify-center rounded-full border border-[#d8c7b5] bg-white px-6 py-3 text-base font-semibold text-[#3d3327] transition hover:bg-[#f8f3ec]"
            >
              Back to Countries
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
        <MapSection
          className="mb-12 rounded-3xl border border-[#d8c7b5] bg-[#fffaf3] p-8"
          eyebrow={`Interactive ${country} Map`}
          heading={`Explore ${country} on the map`}
          description={mapDescription}
          iframeSrc={map.embedUrl}
          iframeTitle={`Interactive ${country} map`}
          iframeLoading="lazy"
          iframeReferrerPolicy="no-referrer-when-downgrade"
          fullMapButtonHref={map.fullUrl}
          fullMapButtonLabel={`Open the full ${country} map`}
        />

        <div id="walks" className="scroll-mt-24">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9a7a52]">
            The walks
          </p>
          <h2 className="mt-3 text-3xl font-bold text-[#2f261d]">My walks in {inSentence}</h2>
          <p className="mt-3 max-w-3xl text-[17px] leading-8 text-[#6c5b49]">
            {walkCount} {walkCount === 1 ? "walk" : "walks"}, grouped by city.
            Walks with a page on this site open here; the rest open on YouTube.
          </p>

          {walkGroups.map((group) => (
            <div key={group.city} className="mt-10">
              <h3 className="text-2xl font-bold text-[#2f261d]">
                {group.city}
                <span className="ml-3 text-sm font-semibold uppercase tracking-[0.12em] text-[#9a7a52]">
                  {group.walks.length} {group.walks.length === 1 ? "walk" : "walks"}
                </span>
              </h3>
              <div className="mt-5 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {group.walks.map((walk) => (
                  <WalkCard key={walk.id} walk={walk} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
