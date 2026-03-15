import Link from "next/link";

const featuredDestinations = [
  {
    name: "Menton",
    href: "/videos/menton-france-walking-tour-2025",
    status: "Available now",
    description:
      "Explore Menton through a featured walking tour with seaside views, old streets, and Riviera atmosphere.",
  },
  {
    name: "Nice",
    href: null,
    status: "Coming soon",
    description:
      "Future walks and destination coverage for promenades, neighborhoods, and city highlights in Nice.",
  },
  {
    name: "Cannes",
    href: null,
    status: "Coming soon",
    description:
      "Future Riviera walks focused on waterfront areas, boulevards, and destination highlights in Cannes.",
  },
  {
    name: "Monaco",
    href: null,
    status: "Coming soon",
    description:
      "Future walking pages for Monaco viewpoints, harbor scenes, and urban routes along the Riviera.",
  },
];

export default function FrenchRivieraPage() {
  return (
    <main className="bg-[#fcfaf7] text-[#2f261d]">
      <section className="border-b border-[#eadfce] bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9a7a52]">
            Region
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-[#2f261d] sm:text-5xl">
            French Riviera
          </h1>
          <p className="mt-5 max-w-4xl text-[18px] leading-8 text-[#6c5b49]">
            Use this page as the regional hub for the French Riviera within
            France, starting with featured walks and expanding into more towns,
            coastal routes, and destination pages over time.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="#featured-destinations"
              className="inline-flex items-center justify-center rounded-full bg-[#167fd5] px-6 py-3 text-base font-semibold text-white transition hover:bg-[#0f6db9]"
            >
              Browse Destinations
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
            A Mediterranean coast of towns, harbors, and scenic walks
          </h2>
          <p className="mt-4 max-w-4xl text-[17px] leading-8 text-[#6c5b49]">
            The French Riviera combines seaside promenades, historic centers,
            hillside views, beach towns, and polished urban waterfronts. This
            lightweight hub is where Riviera destinations can grow from a single
            featured walk into a broader regional collection.
          </p>
        </div>
      </section>

      <section
        id="featured-destinations"
        className="mx-auto max-w-7xl px-6 py-6 lg:px-10"
      >
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9a7a52]">
            Featured Destinations
          </p>
          <h2 className="mt-3 text-3xl font-bold text-[#2f261d]">
            Start with the Riviera destinations below
          </h2>
          <p className="mt-3 max-w-3xl text-[17px] leading-8 text-[#6c5b49]">
            Menton is live now, with additional French Riviera destinations to
            be added as more walks and regional pages are published.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {featuredDestinations.map((destination) =>
            destination.href ? (
              <Link
                key={destination.name}
                href={destination.href}
                className="group rounded-3xl border border-[#eadfce] bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-[#d7c3ad] hover:shadow-md"
              >
                <h3 className="text-2xl font-bold text-[#2f261d] transition group-hover:text-[#167fd5]">
                  {destination.name}
                </h3>
                <p className="mt-2 text-sm font-semibold uppercase tracking-[0.12em] text-[#9a7a52]">
                  {destination.status}
                </p>
                <p className="mt-4 text-[16px] leading-7 text-[#6c5b49]">
                  {destination.description}
                </p>
                <div className="mt-6 text-[16px] font-semibold text-[#167fd5]">
                  View featured walk →
                </div>
              </Link>
            ) : (
              <div
                key={destination.name}
                className="rounded-3xl border border-[#eadfce] bg-[#f8f3ec] p-7 opacity-90"
              >
                <h3 className="text-2xl font-bold text-[#2f261d]">
                  {destination.name}
                </h3>
                <p className="mt-2 text-sm font-semibold uppercase tracking-[0.12em] text-[#9a7a52]">
                  {destination.status}
                </p>
                <p className="mt-4 text-[16px] leading-7 text-[#6c5b49]">
                  {destination.description}
                </p>
              </div>
            )
          )}
        </div>
      </section>
    </main>
  );
}
