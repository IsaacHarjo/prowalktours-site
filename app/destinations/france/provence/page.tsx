import Link from "next/link";

const featuredDestinations = [
  {
    name: "Avignon",
    href: "/videos/avignon-walking-tour-2025",
    description:
      "Explore Avignon as the historic City of the Popes, with papal history, city walls, lively squares, and the famous Pont d'Avignon.",
    imageSrc: "/avignon-walking-tour-2025/avignon-hero-image.png",
    imageAlt: "Avignon historic center and papal landmarks",
  },
  {
    name: "Nimes",
    href: null,
    description:
      "Future Provence walking tours focused on Roman history, monuments, and the grand historic core of Nimes.",
    imageSrc: null,
    imageAlt: "",
  },
  {
    name: "Arles",
    href: null,
    description:
      "Future walks through Arles centered on Roman heritage, old town character, and Provencal atmosphere.",
    imageSrc: null,
    imageAlt: "",
  },
];

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Countries", href: "/countries" },
  { label: "France", href: "/destinations/france" },
  { label: "Provence" },
];

export default function ProvencePage() {
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
            Region
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-[#2f261d] sm:text-5xl">
            Explore Provence with Prowalk Tours
          </h1>
          <p className="mt-5 max-w-4xl text-[18px] leading-8 text-[#6c5b49]">
            Browse Prowalk Tours videos across Provence, beginning with Avignon
            and expanding over time to more historic cities in southern France
            including Nimes and Arles. Discover featured destinations and
            follow new Provence walking tours as they are added.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="#featured-destinations"
              className="inline-flex items-center justify-center rounded-full bg-[#167fd5] px-6 py-3 text-base font-semibold text-white transition hover:bg-[#0f6db9]"
            >
              Browse Provence destinations
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

      <section className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
        <div
          id="featured-destinations"
          className="mb-8 rounded-3xl border border-[#eadfce] bg-white p-8 shadow-sm"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9a7a52]">
            Featured Destinations
          </p>
          <h2 className="mt-3 text-3xl font-bold text-[#2f261d]">
            Start with Provence destinations below
          </h2>
          <p className="mt-4 max-w-4xl text-[17px] leading-8 text-[#6c5b49]">
            Avignon is live now, while Nimes and Arles are reserved as future
            Provence destination hubs as more walks and city pages are added.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {featuredDestinations.map((destination) =>
            destination.href ? (
              <Link
                key={destination.name}
                href={destination.href}
                className="group overflow-hidden rounded-3xl border border-[#eadfce] bg-white shadow-sm transition hover:-translate-y-1 hover:border-[#d7c3ad] hover:shadow-md"
              >
                {destination.imageSrc ? (
                  <div className="aspect-16/10 w-full overflow-hidden">
                    <img
                      src={destination.imageSrc}
                      alt={destination.imageAlt}
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                ) : null}
                <div className="p-6">
                  <h2 className="text-xl font-bold text-[#2f261d] transition group-hover:text-[#167fd5]">
                    {destination.name}
                  </h2>
                  <p className="mt-3 text-[15px] leading-7 text-[#6c5b49]">
                    {destination.description}
                  </p>
                  <div className="mt-5 text-[15px] font-semibold text-[#167fd5]">
                    Begin Walking →
                  </div>
                </div>
              </Link>
            ) : (
              <div
                key={destination.name}
                className="overflow-hidden rounded-3xl border border-[#eadfce] bg-[#f8f3ec] opacity-90"
              >
                <div className="flex aspect-16/10 w-full items-center justify-center bg-[#efe5d8] text-sm font-semibold text-[#9a7a52]">
                  Coming soon
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-bold text-[#2f261d]">
                    {destination.name}
                  </h2>
                  <p className="mt-3 text-[15px] leading-7 text-[#6c5b49]">
                    {destination.description}
                  </p>
                </div>
              </div>
            )
          )}
        </div>
      </section>
    </main>
  );
}
