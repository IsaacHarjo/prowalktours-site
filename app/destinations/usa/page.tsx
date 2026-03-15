import Link from "next/link";

const fullMapUrl =
  "https://www.google.com/maps/d/edit?mid=1tK1BxpTYoDbl9253VX2cKsHCjadtkV8&usp=sharing";
const embeddedMapUrl =
  "https://www.google.com/maps/d/u/0/embed?mid=1tK1BxpTYoDbl9253VX2cKsHCjadtkV8";

const states = [
  {
    name: "Washington",
    status: "Coming soon",
    description:
      "Future walking tours, cities, and destination pages across Washington.",
  },
  {
    name: "New York",
    status: "Coming soon",
    description:
      "Future walking tours, cities, and destination pages across New York.",
  },
  {
    name: "Wyoming",
    status: "Coming soon",
    description:
      "Future walking tours, parks, and destination pages across Wyoming.",
  },
  {
    name: "California",
    status: "Coming soon",
    description:
      "Future walking tours, cities, and destination pages across California.",
  },
  {
    name: "Florida",
    status: "Coming soon",
    description:
      "Future walking tours, cities, and destination pages across Florida.",
  },
];

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Countries", href: "/countries" },
  { label: "USA" },
];

export default function USAPage() {
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
            USA
          </h1>
          <p className="mt-5 max-w-3xl text-[18px] leading-8 text-[#6c5b49]">
            Browse the United States by state, then expand into cities,
            destinations, and individual walking tours as this collection grows.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#states"
              className="inline-flex items-center justify-center rounded-full bg-[#167fd5] px-6 py-3 text-base font-semibold text-white transition hover:bg-[#0f6db9]"
            >
              Explore States
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
        <div className="mb-8 rounded-3xl border border-[#d8c7b5] bg-[#fffaf3] p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9a7a52]">
            Interactive USA Map
          </p>
          <h2 className="mt-3 text-3xl font-bold text-[#2f261d]">
            Explore the USA on the map
          </h2>
          <p className="mt-3 max-w-3xl text-[17px] leading-8 text-[#6c5b49]">
            Browse walking tours by state, including Washington, New York,
            Wyoming, California, and Florida.
          </p>
          <div className="mt-6 overflow-hidden rounded-[2rem] border border-[#d8c7b5] bg-white shadow-sm">
            <div className="aspect-[16/9] w-full bg-[#f8f3ec]">
              <iframe
                className="h-full w-full"
                src={embeddedMapUrl}
                title="Interactive USA map"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
          <a
            href={fullMapUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center justify-center rounded-full border border-[#167fd5] bg-white px-6 py-3 text-base font-semibold text-[#167fd5] transition hover:bg-[#edf6fd]"
          >
            Open the full USA map
          </a>
        </div>

        <div id="states" className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {states.map((state) => (
            <div
              key={state.name}
              className="rounded-3xl border border-[#eadfce] bg-[#f8f3ec] p-7 opacity-90"
            >
              <h2 className="text-2xl font-bold text-[#2f261d]">
                {state.name}
              </h2>
              <p className="mt-2 text-sm font-semibold uppercase tracking-[0.12em] text-[#9a7a52]">
                {state.status}
              </p>
              <p className="mt-4 text-[16px] leading-7 text-[#6c5b49]">
                {state.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
