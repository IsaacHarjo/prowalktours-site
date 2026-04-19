import Link from "next/link";
import MapSection from "../../../components/MapSection";
import ThumbnailImg from "../../../components/ThumbnailImg";
import { canadaVideos } from "../../../data/videos/canada";
import { getCardImageSrc } from "../../../lib/cardImages";

const fullMapUrl =
  "https://www.google.com/maps/d/edit?mid=1a5hdtdDOzWQdZBbRJ0_4r7YQyZG31s8&usp=sharing";
const embeddedMapUrl =
  "https://www.google.com/maps/d/u/0/embed?mid=1a5hdtdDOzWQdZBbRJ0_4r7YQyZG31s8";

function getYoutubeId(url: string) {
  const m = /(?:youtu\.be\/|[?&]v=|\/embed\/)([A-Za-z0-9_-]{11})/.exec(url);
  return m ? m[1] : "";
}

function formatVideoType(vt: string) {
  return vt.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Countries", href: "/countries" },
  { label: "Canada" },
];

export default function CanadaPage() {
  return (
    <main className="bg-[#fcfaf7] text-[#2f261d]">
      <section className="border-b border-[#eadfce] bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
          <nav
            aria-label="Breadcrumb"
            className="mb-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-[#8a7a68]"
          >
            {breadcrumbs.map((item, index) => (
              <div key={item.label} className="inline-flex items-center gap-2">
                {item.href ? (
                  <Link
                    href={item.href}
                    className="transition hover:text-[#167fd5]"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="font-medium text-[#5c4c33]">
                    {item.label}
                  </span>
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
            Canada
          </h1>
          <p className="mt-5 max-w-3xl text-[18px] leading-8 text-[#6c5b49]">
            Browse Canada by province, then expand into cities, destinations,
            and individual walking tours as this growing collection develops.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#provinces"
              className="inline-flex items-center justify-center rounded-full bg-[#167fd5] px-6 py-3 text-base font-semibold text-white transition hover:bg-[#0f6db9]"
            >
              Explore Tours
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
          className="mb-8 rounded-3xl border border-[#d8c7b5] bg-[#fffaf3] p-8"
          eyebrow="Interactive Canada Map"
          heading="Explore Canada on the map"
          description={
            <>
              Browse tours in British Columbia, with more Canadian provinces to
            be added over time.
            </>
          }
          iframeSrc={embeddedMapUrl}
          iframeTitle="Interactive Canada map"
          iframeLoading="lazy"
          iframeReferrerPolicy="no-referrer-when-downgrade"
          fullMapButtonHref={fullMapUrl}
          fullMapButtonLabel="Open the full Canada map"
        />

        <div id="provinces" className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9a7a52]">
            British Columbia
          </p>
          <h2 className="mt-3 text-3xl font-bold text-[#2f261d]">
            Vancouver, British Columbia
          </h2>
          <p className="mt-3 max-w-3xl text-[17px] leading-8 text-[#6c5b49]">
            Explore Vancouver through walking tours, bike tours, and evening
            walks covering Stanley Park, the seawall, Gastown, Granville Island,
            and more.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {canadaVideos.map((tour) => {
            const ytId = getYoutubeId(tour.youtubeUrl);
            const fallbackThumb = ytId
              ? `https://img.youtube.com/vi/${ytId}/mqdefault.jpg`
              : "";
            const thumbSrc = getCardImageSrc(tour.slug, fallbackThumb);
            return (
              <Link
                key={tour.slug}
                href={`/videos/${tour.slug}`}
                className="group overflow-hidden rounded-3xl border border-[#eadfce] bg-white shadow-sm transition hover:-translate-y-1 hover:border-[#d7c3ad] hover:shadow-md"
              >
                <div className="aspect-video w-full overflow-hidden bg-[#2f261d]">
                  {thumbSrc ? (
                    <ThumbnailImg
                      src={thumbSrc}
                      alt={tour.siteTitle}
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="h-full w-full bg-[#2f261d]" />
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-[#2f261d] transition group-hover:text-[#167fd5]">
                    {tour.siteTitle}
                  </h3>
                  <p className="mt-2 text-sm text-[#8a7a68]">
                    {tour.city}, {tour.region}
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-[#f0e8dc] px-3 py-1 text-xs font-semibold text-[#6c5b49]">
                      {formatVideoType(tour.videoType)}
                    </span>
                    <span className="text-xs text-[#8a7a68]">
                      {tour.durationLabel}
                    </span>
                  </div>
                  <div className="mt-4 text-[15px] font-semibold text-[#167fd5]">
                    View Tour →
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}

