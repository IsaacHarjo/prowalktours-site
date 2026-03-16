import Link from "next/link";

const countries = [
  {
    name: "Italy",
    href: "/destinations/italy",
    emoji: "\uD83C\uDDEE\uD83C\uDDF9",
    status: "Available now",
    description: "Regions, cities, and walks across Italy.",
  },
  {
    name: "France",
    href: "/destinations/france",
    emoji: "\uD83C\uDDEB\uD83C\uDDF7",
    status: "Available now",
    description: "Regions, cities, and walks across France.",
  },
  {
    name: "United States",
    href: "/destinations/usa",
    emoji: "\uD83C\uDDFA\uD83C\uDDF8",
    status: "Available now",
    description: "States, cities, and walks across the United States.",
  },
  {
    name: "Egypt",
    href: "/destinations/egypt",
    emoji: "\uD83C\uDDEA\uD83C\uDDEC",
    status: "Available now",
    description: "Historic sites, museums, and walks across Egypt.",
  },
  {
    name: "Greece",
    href: "/destinations/greece",
    emoji: "\uD83C\uDDEC\uD83C\uDDF7",
    status: "Available now",
    description: "Cities, islands, and walks across Greece.",
  },
  {
    name: "Japan",
    href: "/destinations/japan",
    emoji: "\uD83C\uDDEF\uD83C\uDDF5",
    status: "Available now",
    description: "Cities, neighborhoods, and walks across Japan.",
  },
  {
    name: "Spain",
    href: "/destinations/spain",
    emoji: "\uD83C\uDDEA\uD83C\uDDF8",
    status: "Available now",
    description: "Cities, neighborhoods, and walks across Spain.",
  },
  {
    name: "Portugal",
    href: "/destinations/portugal",
    emoji: "\uD83C\uDDF5\uD83C\uDDF9",
    status: "Available now",
    description: "Cities, neighborhoods, and walks across Portugal.",
  },
  {
    name: "Croatia",
    href: "/destinations/croatia",
    emoji: "\uD83C\uDDED\uD83C\uDDF7",
    status: "Available now",
    description: "Cities, coastal towns, and walks across Croatia.",
  },
  {
    name: "Canada",
    href: "/destinations/canada",
    emoji: "\uD83C\uDDE8\uD83C\uDDE6",
    status: "Available now",
    description: "Provinces, cities, and walks across Canada.",
  },
  {
    name: "Turkey",
    href: "/destinations/turkey",
    emoji: "\uD83C\uDDF9\uD83C\uDDF7",
    status: "Available now",
    description: "Cities, neighborhoods, and walks across Turkey.",
  },
  {
    name: "Australia",
    href: "/destinations/australia",
    emoji: "\uD83C\uDDE6\uD83C\uDDFA",
    status: "Available now",
    description: "Cities, beaches, and walks across Australia.",
  },
  {
    name: "Netherlands",
    href: "/destinations/netherlands",
    emoji: "\uD83C\uDDF3\uD83C\uDDF1",
    status: "Available now",
    description: "Cities, neighborhoods, and walks across the Netherlands.",
  },
  {
    name: "Germany",
    href: "/destinations/germany",
    emoji: "\uD83C\uDDE9\uD83C\uDDEA",
    status: "Available now",
    description: "Cities, markets, and walks across Germany.",
  },
  {
    name: "Austria",
    href: "/destinations/austria",
    emoji: "\uD83C\uDDE6\uD83C\uDDF9",
    status: "Available now",
    description: "Cities, neighborhoods, and walks across Austria.",
  },
  {
    name: "Switzerland",
    href: "/destinations/switzerland",
    emoji: "\uD83C\uDDE8\uD83C\uDDED",
    status: "Available now",
    description: "Cities, neighborhoods, and walks across Switzerland.",
  },
  {
    name: "Denmark",
    href: "/destinations/denmark",
    emoji: "\uD83C\uDDE9\uD83C\uDDF0",
    status: "Available now",
    description: "Cities, neighborhoods, and walks across Denmark.",
  },
  {
    name: "Norway",
    href: "/destinations/norway",
    emoji: "\uD83C\uDDF3\uD83C\uDDF4",
    status: "Available now",
    description: "Cities, towns, and walks across Norway.",
  },
  {
    name: "Slovenia",
    href: "/destinations/slovenia",
    emoji: "\uD83C\uDDF8\uD83C\uDDEE",
    status: "Available now",
    description: "Cities, coastal towns, and walks across Slovenia.",
  },
  {
    name: "Czechia",
    href: "/destinations/czechia",
    emoji: "\uD83C\uDDE8\uD83C\uDDFF",
    status: "Available now",
    description: "Cities, landmarks, and walks across Czechia.",
  },
  {
    name: "Hungary",
    href: "/destinations/hungary",
    emoji: "\uD83C\uDDED\uD83C\uDDFA",
    status: "Available now",
    description: "Cities, neighborhoods, and walks across Hungary.",
  },
  {
    name: "Brazil",
    href: "/destinations/brazil",
    emoji: "\uD83C\uDDE7\uD83C\uDDF7",
    status: "Available now",
    description: "Cities, neighborhoods, and walks across Brazil.",
  },
  {
    name: "Jordan",
    href: "/destinations/jordan",
    emoji: "\uD83C\uDDEF\uD83C\uDDF4",
    status: "Available now",
    description: "Cities, historic sites, and walks across Jordan.",
  },
  {
    name: "Malta",
    href: "/destinations/malta",
    emoji: "\uD83C\uDDF2\uD83C\uDDF9",
    status: "Available now",
    description: "Historic areas, coastal spots, and walks across Malta.",
  },
];

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Countries" },
];

export default function CountriesPage() {
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
            Browse
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-[#2f261d] sm:text-5xl">
            Explore by Country
          </h1>
          <p className="mt-5 max-w-3xl text-[18px] leading-8 text-[#6c5b49]">
            Start by choosing a country, then drill down into regions, cities,
            and individual walking tours.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {countries.map((country) =>
            country.href !== "#" ? (
              <Link
                key={country.name}
                href={country.href}
                className="group rounded-3xl border border-[#eadfce] bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-[#d7c3ad] hover:shadow-md"
              >
                <div className="text-4xl">{country.emoji}</div>
                <h2 className="mt-5 text-2xl font-bold text-[#2f261d] transition group-hover:text-[#167fd5]">
                  {country.name}
                </h2>
                <p className="mt-2 text-sm font-semibold uppercase tracking-[0.12em] text-[#9a7a52]">
                  {country.status}
                </p>
                <p className="mt-4 text-[16px] leading-7 text-[#6c5b49]">
                  {country.description}
                </p>
                <div className="mt-6 text-[16px] font-semibold text-[#167fd5]">
                  View country page →
                </div>
              </Link>
            ) : (
              <div
                key={country.name}
                className="rounded-3xl border border-[#eadfce] bg-[#f8f3ec] p-7 opacity-90"
              >
                <div className="text-4xl">{country.emoji}</div>
                <h2 className="mt-5 text-2xl font-bold text-[#2f261d]">
                  {country.name}
                </h2>
                <p className="mt-2 text-sm font-semibold uppercase tracking-[0.12em] text-[#9a7a52]">
                  {country.status}
                </p>
                <p className="mt-4 text-[16px] leading-7 text-[#6c5b49]">
                  {country.description}
                </p>
              </div>
            )
          )}
        </div>
      </section>
    </main>
  );
}
