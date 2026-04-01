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
    name: "Paris Promenade Plant\u00e9e Walk (2020)",
    href: "/videos/paris-promenade-plantee-day-walk-2020",
    description:
      "The Coul\u00e9e Verte Ren\u00e9-Dumont elevated greenway, Viaduc des Arts, and Jardin de Reuilly \u2014 a quieter side of Paris.",
    imageSrc: "https://i.ytimg.com/vi/KoORZY4TygU/maxresdefault.jpg",
    imageAlt: "Paris Promenade Plant\u00e9e elevated greenway",
  },
  {
    name: "Paris, France Day Walk (2020)",
    href: "/videos/paris-landmarks-day-walk-2020",
    description:
      "A 12-mile day walk through Rue Mouffetard, the Panth\u00e9on, Luxembourg Gardens, Notre-Dame, the Louvre, the Champs-\u00c9lys\u00e9es, Arc de Triomphe, and the Eiffel Tower.",
    imageSrc: "https://i.ytimg.com/vi/oz1Mgu8e1N4/maxresdefault.jpg",
    imageAlt: "Paris landmarks day walk with Eiffel Tower",
  },
  {
    name: "Montmartre Day Walk (2020)",
    href: "/videos/montmartre-day-walk-2020",
    description:
      "Moulin Rouge, Rue Lepic, La Maison Rose, Place du Tertre, Sacr\u00e9-C\u0153ur dome views, and the full hilltop village of Montmartre.",
    imageSrc: "https://i.ytimg.com/vi/yqOlY5uBBbo/maxresdefault.jpg",
    imageAlt: "Montmartre day walk hilltop streets",
  },
  {
    name: "Montmartre Evening Walk (2022)",
    href: "/videos/montmartre-evening-walk-2022",
    description:
      "Place du Tertre, Sacr\u00e9-C\u0153ur, Square Louise Michel, Place des Abbesses, and Rue Lepic on an evening walk through Montmartre.",
    imageSrc: "https://i.ytimg.com/vi/hLa9PRc9DFk/maxresdefault.jpg",
    imageAlt: "Montmartre evening walk with Sacr\u00e9-C\u0153ur",
  },
  {
    name: "Paris, France Evening Walk (2022)",
    href: "/videos/paris-evening-walk-2022",
    description:
      "Saint-Michel, Notre-Dame, the Marais, Bastille, Eiffel Tower, the Louvre, Pont Neuf, and the Panthéon on a long-form evening walk through central Paris.",
    imageSrc: "https://i.ytimg.com/vi/fKgP6JGAM_A/maxresdefault.jpg",
    imageAlt: "Paris evening walk along the Seine at dusk",
  },
  {
    name: "Paris Latin Quarter & Marais Evening Walk (2020)",
    href: "/videos/paris-latin-quarter-marais-evening-walk-2020",
    description:
      "An evening walk through the Latin Quarter and into the Marais, covering the historic street grid, markets, and riverside promenades in central Paris.",
    imageSrc: "/paris-latin-quarter-marais-evening-walk-2020/hero.jpg",
    imageAlt: "Paris Latin Quarter streets at night",
  },
  {
    name: "Paris Catacombs Tour (2020)",
    href: "/videos/paris-catacombs-tour-2020",
    description:
      "The Paris Catacombs entrance, underground ossuary corridors, stacked bone walls, and key memorial features inside one of the city's most distinctive sites.",
    imageSrc: "/paris-catacombs-tour-2020/hero.jpg",
    imageAlt: "Paris Catacombs underground ossuary",
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

      <section
        id="featured-walks"
        className="mx-auto max-w-7xl px-6 py-6 lg:px-10"
      >
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9a7a52]">
            Featured Walks
          </p>
          <h2 className="mt-3 text-3xl font-bold text-[#2f261d]">
            Paris walks available now
          </h2>
          <p className="mt-3 max-w-3xl text-[17px] leading-8 text-[#6c5b49]">
            All walks are live with full timestamps, route maps, and
            licensing details. Additional Paris content will be added as more
            walks are published.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {featuredWalks.map((walk) => (
            <Link
              key={walk.name}
              href={walk.href}
              className="group overflow-hidden rounded-3xl border border-[#eadfce] bg-white shadow-sm transition hover:-translate-y-1 hover:border-[#d7c3ad] hover:shadow-md"
            >
              <div className="aspect-16/10 w-full overflow-hidden">
                <img
                  src={walk.imageSrc}
                  alt={walk.imageAlt}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#2f261d] transition group-hover:text-[#167fd5]">
                  {walk.name}
                </h3>
                <p className="mt-3 text-[15px] leading-7 text-[#6c5b49]">
                  {walk.description}
                </p>
                <div className="mt-5 text-[15px] font-semibold text-[#167fd5]">
                  Begin Walking →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
