import Link from "next/link";

const countries = [
  {
    name: "Italy",
    href: "/destinations/italy",
    emoji: "🇮🇹",
    status: "Available now",
    description: "Regions, cities, and walks across Italy.",
  },
  {
    name: "United States",
    href: "#",
    emoji: "🇺🇸",
    status: "Coming soon",
    description: "Future landing page for United States walks and destinations.",
  },
  {
    name: "Canada",
    href: "#",
    emoji: "🇨🇦",
    status: "Coming soon",
    description: "Future landing page for Canada walks and destinations.",
  },
  {
    name: "France",
    href: "/destinations/france",
    emoji: "🇫🇷",
    status: "Available now",
    description: "Regions, cities, and walks across France.",
  },
  {
    name: "Norway",
    href: "#",
    emoji: "🇳🇴",
    status: "Coming soon",
    description: "Future landing page for Norway walks and destinations.",
  },
  {
    name: "Denmark",
    href: "#",
    emoji: "🇩🇰",
    status: "Coming soon",
    description: "Future landing page for Denmark walks and destinations.",
  },
  {
    name: "Germany",
    href: "#",
    emoji: "🇩🇪",
    status: "Coming soon",
    description: "Future landing page for Germany walks and destinations.",
  },
  {
    name: "Croatia",
    href: "#",
    emoji: "🇭🇷",
    status: "Coming soon",
    description: "Future landing page for Croatia walks and destinations.",
  },
  {
    name: "Slovenia",
    href: "#",
    emoji: "🇸🇮",
    status: "Coming soon",
    description: "Future landing page for Slovenia walks and destinations.",
  },
  {
    name: "Spain",
    href: "#",
    emoji: "🇪🇸",
    status: "Coming soon",
    description: "Future landing page for Spain walks and destinations.",
  },
  {
    name: "Portugal",
    href: "#",
    emoji: "🇵🇹",
    status: "Coming soon",
    description: "Future landing page for Portugal walks and destinations.",
  },
  {
    name: "Japan",
    href: "#",
    emoji: "🇯🇵",
    status: "Coming soon",
    description: "Future landing page for Japan walks and destinations.",
  },
  {
    name: "Brazil",
    href: "#",
    emoji: "🇧🇷",
    status: "Coming soon",
    description: "Future landing page for Brazil walks and destinations.",
  },
  {
    name: "Switzerland",
    href: "#",
    emoji: "🇨🇭",
    status: "Coming soon",
    description: "Future landing page for Switzerland walks and destinations.",
  },
  {
    name: "Czechia",
    href: "#",
    emoji: "🇨🇿",
    status: "Coming soon",
    description: "Future landing page for Czechia walks and destinations.",
  },
  {
    name: "Hungary",
    href: "#",
    emoji: "🇭🇺",
    status: "Coming soon",
    description: "Future landing page for Hungary walks and destinations.",
  },
  {
    name: "Austria",
    href: "#",
    emoji: "🇦🇹",
    status: "Coming soon",
    description: "Future landing page for Austria walks and destinations.",
  },
  {
    name: "Netherlands",
    href: "#",
    emoji: "🇳🇱",
    status: "Coming soon",
    description: "Future landing page for Netherlands walks and destinations.",
  },
  {
    name: "Turkey",
    href: "#",
    emoji: "🇹🇷",
    status: "Coming soon",
    description: "Future landing page for Turkey walks and destinations.",
  },
  {
    name: "Egypt",
    href: "#",
    emoji: "🇪🇬",
    status: "Coming soon",
    description: "Future landing page for Egypt walks and destinations.",
  },
  {
    name: "Jordan",
    href: "#",
    emoji: "🇯🇴",
    status: "Coming soon",
    description: "Future landing page for Jordan walks and destinations.",
  },
  {
    name: "Malta",
    href: "#",
    emoji: "🇲🇹",
    status: "Coming soon",
    description: "Future landing page for Malta walks and destinations.",
  },
  {
    name: "Australia",
    href: "#",
    emoji: "🇦🇺",
    status: "Coming soon",
    description: "Future landing page for Australia walks and destinations.",
  },
];

export default function CountriesPage() {
  return (
    <main className="bg-[#fcfaf7] text-[#2f261d]">
      <section className="border-b border-[#eadfce] bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
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