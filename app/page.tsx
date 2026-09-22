import Link from "next/link";
import LiveSearchBar from "../components/LiveSearchBar";
import ThumbnailImg from "../components/ThumbnailImg";
import WorldMapClient from "../components/WorldMapClient";
import { discoveryVideos as videos, worldTours as mappedTours } from "../lib/tours/server";

const mappedCountryCount = new Set(mappedTours.map((tour) => tour.country)).size;
const featuredVideo = videos.find((video) => video.slug === "nice-old-town-monday-evening-walk-2025");

// ─── Top destinations data ───────────────────────────────────────────────────

const topDestinations = [
  {
    name: "Naples & Campania",
    description: "Explore Campania walks",
    href: "/destinations/italy/campania",
    img: "/images/homepage/naples-campania.jpg",
  },
  {
    name: "Venice",
    description: "Explore on the Italy map",
    href: "/destinations/italy#tour-map",
    img: "/images/homepage/venice.jpg",
  },
  {
    name: "Amalfi Coast",
    description: "Explore coastal Campania",
    href: "/destinations/italy/campania",
    img: "/images/homepage/amalfi-coast.jpg",
  },
  {
    name: "French Riviera",
    description: "Explore Riviera walks",
    href: "/destinations/france/french-riviera",
    img: "/images/homepage/french-riviera.jpg",
  },
  {
    name: "Rome",
    description: "Explore on the Italy map",
    href: "/destinations/italy#tour-map",
    img: "/images/homepage/rome.jpg",
  },
  {
    name: "Paris",
    description: "Explore Paris walks",
    href: "/destinations/france/paris",
    img: "/images/homepage/paris.jpg",
  },
];

// ─── Homepage ────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <div className="bg-[#fcfaf7] text-[#2f261d]">
      {/* ═══ SECTION 1 — Hero ═══ */}
      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-6 py-12 text-center lg:py-16">
          <h1 className="text-xl font-bold uppercase text-[#9a7a52] sm:text-2xl lg:text-3xl">
            {mappedTours.length} tours to explore on the map
          </h1>
          <div className="mx-auto mt-6 max-w-2xl">
            <LiveSearchBar videos={videos}>
              <div className="mt-3 flex flex-wrap justify-center gap-3">
                <Link
                  href="/countries"
                  className="inline-flex items-center justify-center rounded-full bg-[#3d3327] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#2f261d]"
                >
                  Browse Countries
                </Link>
                <Link
                  href="#world-map"
                  className="inline-flex items-center justify-center rounded-full bg-[#009246] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#007a3a]"
                >
                  Explore the Map
                </Link>
              </div>
            </LiveSearchBar>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 2 — Top Destinations ═══ */}
      <section className="border-y border-[#eadfce] bg-white">
        <div className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9a7a52]">
            Top Destinations
          </p>
          <div className="mt-5 flex gap-4 overflow-x-auto pb-2 lg:grid lg:grid-cols-6 lg:overflow-visible">
            {topDestinations.map((dest) => (
              <Link
                key={dest.name}
                href={dest.href}
                className="group w-[200px] shrink-0 overflow-hidden rounded-2xl border border-[#eadfce] bg-[#fcfaf7] shadow-sm transition hover:-translate-y-0.5 hover:border-[#d7c3ad] hover:shadow-md lg:w-auto"
              >
                <div className="aspect-video w-full overflow-hidden bg-[#2f261d]">
                  <ThumbnailImg
                    src={dest.img}
                    alt={dest.name}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="px-3 py-3">
                  <p className="text-sm font-bold text-[#2f261d]">
                    {dest.name}
                  </p>
                  <p className="mt-0.5 text-xs text-[#8a7a68]">
                    {dest.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SECTION 3 — Trust Bar ═══ */}
      <section className="border-b border-[#eadfce] bg-[#f5f0e8]">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-8 sm:flex-row sm:items-center sm:justify-between lg:px-10">
          <div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9a7a52]">From the Christmas archive</p><h2 className="mt-2 text-2xl font-bold">Europe’s Christmas markets, on foot</h2><p className="mt-2 text-sm leading-6 text-[#6c5b49]">Explore the walks by destination and discover the journeys behind the films.</p></div>
          <Link href="/christmas-markets" className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-full bg-[#009246] px-5 py-3 text-sm font-semibold text-white hover:bg-[#007a3a]">Explore Christmas Markets →</Link>
        </div>
      </section>
      <section className="bg-[#f5f0e8]">
        <div className="mx-auto max-w-5xl px-6 py-4 text-center">
          <p className="text-xs font-medium tracking-wide text-[#6c5b49] sm:text-sm">
            Wall Street Journal &middot; 24 countries &middot; TV distribution
            via Janson Media &middot; 4K walks with binaural audio
          </p>
        </div>
      </section>

      {/* ═══ SECTION 4 — Interactive Map ═══ */}
      <section id="world-map" className="scroll-mt-16 mx-auto max-w-7xl px-6 py-10 lg:px-10 lg:py-14">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9a7a52]">
          Interactive Tour Map
        </p>
        <h2 className="mt-2 text-2xl font-bold text-[#2f261d] sm:text-3xl">
          Browse walks by geography
        </h2>
        <div className="mt-6">
          <WorldMapClient
            tours={mappedTours}
            fullWidth
            heightClassName="h-[360px] sm:h-[500px]"
          />
        </div>
        <p className="mt-4 text-center text-sm text-[#8a7a68]">
          Explore tours in {mappedCountryCount} countries. More destinations are being added.
        </p>
      </section>

      {/* ═══ SECTION 5 — Visitor Intent Cards ═══ */}
      <section className="mx-auto max-w-7xl px-6 pb-10 lg:px-10">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9a7a52]">
          What Brings You Here?
        </p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Link
            href="/countries"
            className="rounded-2xl border border-[#eadfce] bg-white p-6 transition hover:-translate-y-0.5 hover:border-[#d7c3ad] hover:shadow-md"
          >
            <h3 className="text-lg font-bold text-[#2f261d]">
              Find more walks
            </h3>
            <p className="mt-2 text-[15px] leading-7 text-[#6c5b49]">
              Browse walking tours by country and region
            </p>
            <p className="mt-4 text-sm font-semibold text-[#167fd5]">
              Browse Countries &rarr;
            </p>
          </Link>

          <Link
            href="/search"
            className="rounded-2xl border border-[#eadfce] bg-white p-6 transition hover:-translate-y-0.5 hover:border-[#d7c3ad] hover:shadow-md"
          >
            <h3 className="text-lg font-bold text-[#2f261d]">
              Find a place
            </h3>
            <p className="mt-2 text-[15px] leading-7 text-[#6c5b49]">
              Search for a city, neighborhood, or landmark you want to explore
            </p>
            <p className="mt-4 text-sm font-semibold text-[#167fd5]">
              Search Walks &rarr;
            </p>
          </Link>

          <Link
            href="/licensing"
            className="rounded-2xl border border-[#eadfce] bg-white p-6 transition hover:-translate-y-0.5 hover:border-[#d7c3ad] hover:shadow-md"
          >
            <h3 className="text-lg font-bold text-[#2f261d]">
              License footage
            </h3>
            <p className="mt-2 text-[15px] leading-7 text-[#6c5b49]">
              TV, streaming, commercial, ambient, and institutional
            </p>
            <p className="mt-4 text-sm font-semibold text-[#167fd5]">
              Licensing Info &rarr;
            </p>
          </Link>
        </div>
      </section>

      {/* ═══ SECTION 6 — Featured Walk ═══ */}
      {featuredVideo ? (
      <section className="mx-auto max-w-7xl px-6 pb-16 lg:px-10">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#c89b3c]">
          Featured Walk
        </p>
        <div className="mt-4 flex flex-col gap-5 rounded-2xl border border-[#eadfce] bg-white p-5 sm:flex-row sm:items-start">
          <div className="w-full shrink-0 overflow-hidden rounded-xl bg-[#2f261d] sm:w-[200px]">
            <ThumbnailImg
              src={featuredVideo.thumbnail}
              alt={featuredVideo.siteTitle}
              className="aspect-video w-full object-cover"
            />
          </div>
          <div className="min-w-0">
            <h3 className="text-base font-bold leading-snug text-[#2f261d]">
              {featuredVideo.siteTitle}
            </h3>
            <p className="mt-1.5 text-sm text-[#8a7a68]">
              {featuredVideo.city}, {featuredVideo.country} &middot; Filmed {featuredVideo.filmingMonthYear}
            </p>
            <Link
              href={featuredVideo.watchHref}
              className="mt-4 inline-flex items-center justify-center rounded-full bg-[#167fd5] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0f6db9]"
            >
              Watch the tour &rarr;
            </Link>
          </div>
        </div>
      </section>
      ) : null}
    </div>
  );
}
