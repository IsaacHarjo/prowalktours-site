import Link from "next/link";

const destinations = [
  {
    name: "Paris",
    href: null,
    status: "Coming soon",
    description:
      "City walks, landmarks, neighborhoods, and future destination guides across Paris.",
  },
  {
    name: "French Riviera",
    href: "/destinations/france/french-riviera",
    status: "Available now",
    description:
      "Explore Riviera destinations, coastal towns, scenic walks, and travel-focused pages.",
  },
  {
    name: "Provence",
    href: null,
    status: "Coming soon",
    description:
      "Villages, markets, countryside routes, and future destination pages across Provence.",
  },
  {
    name: "Christmas Markets",
    href: null,
    status: "Coming soon",
    description:
      "Seasonal market destinations, festive town centers, and holiday walking pages coming later.",
  },
];

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Countries", href: "/countries" },
  { label: "France" },
];

export default function FrancePage() {
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
            France
          </h1>
          <p className="mt-5 max-w-3xl text-[18px] leading-8 text-[#6c5b49]">
            Browse France by destination hub, then expand into cities, regions,
            seasonal travel pages, and individual walking tours as they go live.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/destinations/france/french-riviera"
              className="inline-flex items-center justify-center rounded-full bg-[#167fd5] px-6 py-3 text-base font-semibold text-white transition hover:bg-[#0f6db9]"
            >
              Explore French Riviera
            </Link>

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
        <div className="mb-8 rounded-3xl border border-dashed border-[#d8c7b5] bg-[#fffaf3] p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9a7a52]">
            Future Feature
          </p>
          <h2 className="mt-3 text-3xl font-bold text-[#2f261d]">
            Interactive France Map
          </h2>
          <p className="mt-3 max-w-3xl text-[17px] leading-8 text-[#6c5b49]">
            This section can later become a visual map of France with clickable
            destination hubs. For now, use the featured cards below as the main
            entry points.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {destinations.map((destination) =>
            destination.href ? (
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
                  View destination page →
                </div>
              </Link>
            ) : (
              <div
                key={destination.name}
                className="rounded-3xl border border-[#eadfce] bg-[#f8f3ec] p-7 opacity-90"
              >
                <h2 className="text-2xl font-bold text-[#2f261d]">
                  {destination.name}
                </h2>
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
