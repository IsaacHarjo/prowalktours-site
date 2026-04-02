import Link from "next/link";

import ExploreVideoMap from "../../../components/ExploreVideoMap";
import { germanyMapFeatures } from "../../../data/maps/germany";

const destinations = [
  {
    name: "Christmas Markets",
    href: "/destinations/germany/christmas-markets",
    status: "Available now",
    description:
      "Nuremberg, Dresden, Rothenburg ob der Tauber, Cologne, Stuttgart, Munich, Aachen, Esslingen, and Freiburg — day and evening walks through Germany's Christmas markets.",
  },
];

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Countries", href: "/countries" },
  { label: "Germany" },
];

export default function GermanyPage() {
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
                  <Link href={item.href} className="transition hover:text-[#167fd5]">{item.label}</Link>
                ) : (
                  <span className="font-medium text-[#5c4c33]">{item.label}</span>
                )}
                {index < breadcrumbs.length - 1 ? (
                  <span aria-hidden="true" className="text-[#bba893]">/</span>
                ) : null}
              </div>
            ))}
          </nav>

          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9a7a52]">
            Country
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-[#2f261d] sm:text-5xl">
            Germany
          </h1>
          <p className="mt-5 max-w-3xl text-[18px] leading-8 text-[#6c5b49]">
            Browse Germany&apos;s Christmas market walking tours across 9 cities —
            day and evening walks through decorated old towns, cathedral squares,
            medieval markets, and festive stalls.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#map"
              className="inline-flex items-center justify-center rounded-full bg-[#167fd5] px-6 py-3 text-base font-semibold text-white transition hover:bg-[#0f6db9]"
            >
              Explore the Map
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

      <section id="map" className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9a7a52]">
            Interactive Germany Map
          </p>
          <h2 className="mt-3 text-3xl font-bold text-[#2f261d]">
            Explore Germany on the map
          </h2>
          <p className="mt-3 max-w-3xl text-[17px] leading-8 text-[#6c5b49]">
            Browse Christmas market tours across Germany. Each marker represents
            a mapped video — filter by time of day or year to explore the collection.
          </p>

          <div className="mt-6">
            <ExploreVideoMap
              features={germanyMapFeatures}
              initialViewState={{
                longitude: 10.4515,
                latitude: 51.1657,
                zoom: 5.5,
              }}
            />
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {destinations.map((destination) => (
            <Link
              key={destination.name}
              href={destination.href}
              className="group rounded-3xl border border-[#eadfce] bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-[#d7c3ad] hover:shadow-md"
            >
              <h2 className="text-2xl font-bold text-[#2f261d] transition group-hover:text-[#167fd5]">
                {destination.name}
              </h2>
              <p className="mt-2 text-sm font-semibold uppercase tracking-[0.12em] text-[#9a7a52]">
                {destination.status}
              </p>
              <p className="mt-4 text-[16px] leading-7 text-[#6c5b49]">
                {destination.description}
              </p>
              <div className="mt-6 text-[16px] font-semibold text-[#167fd5]">
                View all Christmas markets →
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
