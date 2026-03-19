import Link from "next/link";
import MapSection from "../../../components/MapSection";

const fullMapUrl =
  "https://www.google.com/maps/d/edit?mid=10grORN8XYRpuIVzrAcB04cKvxA4-BTU&usp=sharing";
const embeddedMapUrl =
  "https://www.google.com/maps/d/u/0/embed?mid=10grORN8XYRpuIVzrAcB04cKvxA4-BTU";

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
    href: "/destinations/france/provence",
    status: "Available now",
    description:
      "Explore Provence destinations beginning with Avignon and expanding into more historic cities over time.",
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
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
        <MapSection
          className="mb-8 rounded-3xl border border-[#d8c7b5] bg-[#fffaf3] p-8"
          eyebrow="Interactive France Map"
          heading="Explore France on the map"
          description={
            <>
              Browse Paris, French Riviera, Provence, and Christmas Markets on
            the interactive map below.
            </>
          }
          iframeSrc={embeddedMapUrl}
          iframeTitle="Interactive France map"
          iframeLoading="lazy"
          iframeReferrerPolicy="no-referrer-when-downgrade"
          fullMapButtonHref={fullMapUrl}
          fullMapButtonLabel="Open the full France map"
        />

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

