import Link from "next/link";
import MapSection from "../../../components/MapSection";

const fullMapUrl =
  "https://www.google.com/maps/d/edit?mid=1seCCNQYf_wd6OVvtekyDs8wtMnOQxgw&usp=sharing";
const embeddedMapUrl =
  "https://www.google.com/maps/d/u/0/embed?mid=1seCCNQYf_wd6OVvtekyDs8wtMnOQxgw";

const destinations = [
  {
    name: "Oslo",
    status: "Coming soon",
    description:
      "Future walking tours, neighborhoods, and destination pages across Oslo.",
  },
  {
    name: "Sandefjord",
    status: "Coming soon",
    description:
      "Future walking tours, waterfront routes, and destination pages across Sandefjord.",
  },
];

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Countries", href: "/countries" },
  { label: "Norway" },
];

export default function NorwayPage() {
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
            Norway
          </h1>
          <p className="mt-5 max-w-3xl text-[18px] leading-8 text-[#6c5b49]">
            Browse Norway by destination, then expand into cities, towns, and
            individual walking tours as this growing collection continues to
            develop.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#destinations"
              className="inline-flex items-center justify-center rounded-full bg-[#167fd5] px-6 py-3 text-base font-semibold text-white transition hover:bg-[#0f6db9]"
            >
              Explore Destinations
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
          eyebrow="Interactive Norway Map"
          heading="Explore Norway on the map"
          description={
            <>
              Browse tours in Oslo and Sandefjord, with more Norway destinations
            added over time.
            </>
          }
          iframeSrc={embeddedMapUrl}
          iframeTitle="Interactive Norway map"
          iframeLoading="lazy"
          iframeReferrerPolicy="no-referrer-when-downgrade"
          fullMapButtonHref={fullMapUrl}
          fullMapButtonLabel="Open the full Norway map"
        />

        <div
          id="destinations"
          className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
        >
          {destinations.map((destination) => (
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
          ))}
        </div>
      </section>
    </main>
  );
}

