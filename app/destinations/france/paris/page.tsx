import type { Metadata } from "next";
import Link from "next/link";

const siteUrl = "https://www.prowalktours.com";
const pageUrl = `${siteUrl}/destinations/france/paris`;

export const metadata: Metadata = {
  title: "Paris, France Walking Tours | ProWalk Tours",
  description:
    "Paris walking tours in 4K: evening city walks, the Latin Quarter, the Marais, and the Paris Catacombs. Long-form, immersive, no commentary.",
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "Paris, France Walking Tours | ProWalk Tours",
    description:
      "Paris walking tours in 4K: evening city walks, the Latin Quarter, the Marais, and the Paris Catacombs. Long-form, immersive, no commentary.",
    url: pageUrl,
  },
};

const featuredWalks = [
  {
    name: "Paris, France Evening Walk (2022)",
    href: "/videos/paris-evening-walk-2022",
    status: "Available now",
    description:
      "Saint-Michel, Notre-Dame, the Marais, Bastille, Eiffel Tower, the Louvre, Pont Neuf, and the Panthéon on a long-form evening walk through central Paris.",
  },
  {
    name: "Paris Latin Quarter & Marais Evening Walk (2020)",
    href: "/videos/paris-latin-quarter-marais-evening-walk-2020",
    status: "Available now",
    description:
      "An evening walk through the Latin Quarter and into the Marais, covering the historic street grid, markets, and riverside promenades in central Paris.",
  },
  {
    name: "Paris Catacombs Tour (2020)",
    href: "/videos/paris-catacombs-tour-2020",
    status: "Available now",
    description:
      "The Paris Catacombs entrance, underground ossuary corridors, stacked bone walls, and key memorial features inside one of the city's most distinctive sites.",
  },
];

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Countries", href: "/countries" },
  { label: "France", href: "/destinations/france" },
  { label: "Paris" },
];

export default function ParisPage() {
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
            City
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-[#2f261d] sm:text-5xl">
            Paris
          </h1>
          <p className="mt-5 max-w-4xl text-[18px] leading-8 text-[#6c5b49]">
            Long-form 4K walking tours through Paris — covering evening city
            walks, historic neighborhoods, and underground landmarks. Browse the
            walks below to find footage, timestamps, and licensing details.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="#featured-walks"
              className="inline-flex items-center justify-center rounded-full bg-[#167fd5] px-6 py-3 text-base font-semibold text-white transition hover:bg-[#0f6db9]"
            >
              Browse Walks
            </Link>

            <Link
              href="/destinations/france"
              className="inline-flex items-center justify-center rounded-full border border-[#d8c7b5] bg-white px-6 py-3 text-base font-semibold text-[#3d3327] transition hover:bg-[#f8f3ec]"
            >
              Back to France
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
        <div className="rounded-3xl border border-[#eadfce] bg-white p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9a7a52]">
            Overview
          </p>
          <h2 className="mt-3 text-3xl font-bold text-[#2f261d]">
            Evening walks, historic neighborhoods, and underground Paris
          </h2>
          <p className="mt-4 max-w-4xl text-[17px] leading-8 text-[#6c5b49]">
            The Paris collection covers the city at street level — riverfront
            promenades, the Latin Quarter, the Marais, major landmarks at dusk,
            and the Catacombs underground. Each walk is long-form, shot in 4K,
            with no commentary so the city speaks for itself.
          </p>
        </div>
      </section>

      <section
        id="featured-walks"
        className="mx-auto max-w-7xl px-6 py-6 lg:px-10"
      >
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9a7a52]">
            Featured Walks
          </p>
          <h2 className="mt-3 text-3xl font-bold text-[#2f261d]">
            Three Paris walks available now
          </h2>
          <p className="mt-3 max-w-3xl text-[17px] leading-8 text-[#6c5b49]">
            All three walks are live with full timestamps, route maps, and
            licensing details. Additional Paris content will be added as more
            walks are published.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {featuredWalks.map((walk) => (
            <Link
              key={walk.name}
              href={walk.href}
              className="group rounded-3xl border border-[#eadfce] bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-[#d7c3ad] hover:shadow-md"
            >
              <h3 className="text-2xl font-bold text-[#2f261d] transition group-hover:text-[#167fd5]">
                {walk.name}
              </h3>
              <p className="mt-2 text-sm font-semibold uppercase tracking-[0.12em] text-[#9a7a52]">
                {walk.status}
              </p>
              <p className="mt-4 text-[16px] leading-7 text-[#6c5b49]">
                {walk.description}
              </p>
              <div className="mt-6 text-[16px] font-semibold text-[#167fd5]">
                View walk →
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
