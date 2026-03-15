import Link from "next/link";


const featuredDestinations = [
  {
    name: "Naples",
    href: "/destinations/italy/campania/naples",
    status: "Available now",
    description:
      "Your main Naples hub with featured walks, city pages, and future travel resources.",
  },
  {
    name: "Amalfi Coast",
    href: "#",
    status: "Videos available",
    description:
      "Positano, Amalfi, Atrani, Ravello, coastal drives, trails, and future destination pages.",
  },
  {
    name: "Pompeii",
    href: "#",
    status: "Videos available",
    description:
      "Ancient ruins, archaeological sites, and multiple filmed visits with a dedicated page coming soon.",
  },
  {
    name: "Ischia",
    href: "#",
    status: "Videos available",
    description:
      "Multiple walks around the island with a dedicated destination page coming soon.",
  },
  {
    name: "Capri",
    href: "#",
    status: "Videos available",
    description:
      "Island walks, scenic viewpoints, and travel-focused destination pages coming soon.",
  },
  {
    name: "Pozzuoli",
    href: "#",
    status: "Videos available",
    description:
      "Pozzuoli, amphitheaters, Baia, Lago d'Averno, and the Phlegraean Fields area.",
  },
];


const destinationGroups = [
  {
    title: "Cities & Towns",
    items: [
      "Naples",
      "Agropoli",
      "Amalfi",
      "Aversa",
      "Atrani",
      "Caserta Vecchia",
      "Positano",
      "Pozzuoli",
      "Procida",
      "Ravello",
      "Sant'Agata de' Goti",
    ],
  },
  {
    title: "Islands & Coast",
    items: ["Capri", "Ischia", "Procida", "Amalfi Coast Drives"],
  },
  {
    title: "Ancient Sites & Ruins",
    items: [
      "Pompeii",
      "Herculaneum",
      "Paestum",
      "Baia Ruins",
      "Capua Amphitheater",
      "Pozzuoli Amphitheater",
    ],
  },
  {
    title: "Trails & Nature",
    items: [
      "Path of the Gods",
      "Path of the Lemons",
      "Valle delle Ferriere",
      "Lago d'Averno",
      "Mt. Vesuvius",
    ],
  },
  {
    title: "Historic & Cultural Sites",
    items: [
      "Caserta Palace",
      "Fontanelle Cemetery",
      "Limatola Castle",
      "Resina Market of Ercolano",
    ],
  },
];


const gettingThere = [
  "Fly into Naples International Airport and use Naples as a main gateway for much of Campania.",
  "Many travelers arrive by train into Naples, then continue by local rail, ferry, bus, car, or private transfer.",
  "For islands and coastal destinations, ferries and hydrofoils are often part of the trip planning.",
];


const gettingAround = [
  {
    title: "Train & Rail",
    text: "Useful for Naples and many major destinations. Good for city-to-city travel, but less flexible for more rural or coastal itineraries.",
  },
  {
    title: "Ferries & Hydrofoils",
    text: "Important for islands like Capri, Ischia, and Procida, and often useful for coastal travel depending on the season and route.",
  },
  {
    title: "Rental Car",
    text: "Helpful for flexibility in some parts of Campania, but parking, traffic, and narrow roads can make driving stressful in busy areas.",
  },
  {
    title: "Private Drivers",
    text: "A strong option for travelers who want comfort, airport pickups, Amalfi Coast transfers, or full-day custom touring.",
  },
];


const topPlaces = [
  "Naples historic center",
  "Amalfi Coast towns and scenic drives",
  "Capri, Ischia, and Procida",
  "Pompeii and Herculaneum",
  "Paestum and the ancient Greek temples",
  "Pozzuoli, Baia, and the Phlegraean Fields",
  "Caserta Palace",
  "Mt. Vesuvius",
];


const travelResources = [
  {
    title: "Train Information",
    href: "#",
    description: "Placeholder for rail resources and route-planning links.",
  },
  {
    title: "Ferry Information",
    href: "#",
    description: "Placeholder for ferry, hydrofoil, and port information.",
  },
  {
    title: "Airport & Arrival Info",
    href: "#",
    description: "Placeholder for Naples airport and regional arrival guidance.",
  },
  {
    title: "Official Tourism Resources",
    href: "#",
    description: "Placeholder for tourism boards, museums, and official visitor info.",
  },
];


const localPartners = [
  {
    title: "Private Drivers",
    href: "#",
    description:
      "Feature a trusted local driver or transfer service here for Campania.",
  },
  {
    title: "Tour Guides",
    href: "#",
    description:
      "Feature walking guides, archaeology guides, or local experience hosts here.",
  },
  {
    title: "Travel Agencies",
    href: "#",
    description:
      "Feature regional agencies or trip planners serving Naples and Campania.",
  },
];


const prowalkTips = [
  "Campania works well as a multi-base trip: Naples, the Amalfi Coast area, and the islands can all feel very different.",
  "Naples is often the easiest transport hub, but not every destination is best done as a rushed day trip.",
  "For islands and coastal towns, ferry schedules and weather can matter a lot when planning your route.",
  "Historic sites, busy towns, and scenic trails all require different pacing, so grouping nearby stops together is often the best approach.",
];


const featuredWalks = [
  {
    title: "Naples Daytime Walk — July 2023",
    href: "/videos/naples-daytime-walk-2023",
    note: "Working page now",
  },
  {
    title: "Amalfi Coast Walks & Drives",
    href: "#",
    note: "Video pages coming soon",
  },
  {
    title: "Pompeii Walks",
    href: "#",
    note: "Video pages coming soon",
  },
  {
    title: "Ischia Walks",
    href: "#",
    note: "Video pages coming soon",
  },
];


const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Countries", href: "/countries" },
  { label: "Italy", href: "/destinations/italy" },
  { label: "Campania" },
];

export default function CampaniaPage() {
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
            Campania
          </h1>


          <p className="mt-5 max-w-4xl text-[18px] leading-8 text-[#6c5b49]">
            Explore Campania through cities, islands, archaeological sites,
            coastal towns, scenic drives, and walking routes across southern
            Italy. This page is both a regional video hub and a travel-planning
            starting point.
          </p>


          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="#destinations"
              className="inline-flex items-center justify-center rounded-full bg-[#167fd5] px-6 py-3 text-base font-semibold text-white transition hover:bg-[#0f6db9]"
            >
              Browse Destinations
            </Link>


            <Link
              href="#plan-your-trip"
              className="inline-flex items-center justify-center rounded-full border border-[#d8c7b5] bg-white px-6 py-3 text-base font-semibold text-[#3d3327] transition hover:bg-[#f8f3ec]"
            >
              Plan Your Trip
            </Link>


            <Link
              href="/destinations/italy"
              className="inline-flex items-center justify-center rounded-full border border-[#d8c7b5] bg-white px-6 py-3 text-base font-semibold text-[#3d3327] transition hover:bg-[#f8f3ec]"
            >
              Back to Italy
            </Link>
          </div>
        </div>
      </section>


      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl border border-[#eadfce] bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#9a7a52]">
              Library
            </p>
            <p className="mt-3 text-3xl font-bold text-[#2f261d]">163+</p>
            <p className="mt-2 text-[16px] leading-7 text-[#6c5b49]">
              Videos already filmed in Campania, with more still to be edited and
              published.
            </p>
          </div>


          <div className="rounded-3xl border border-[#eadfce] bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#9a7a52]">
              Region Highlights
            </p>
            <p className="mt-3 text-3xl font-bold text-[#2f261d]">Coast + Ruins + Islands</p>
            <p className="mt-2 text-[16px] leading-7 text-[#6c5b49]">
              Naples, Amalfi Coast, Pompeii, Ischia, Capri, Pozzuoli, Caserta,
              and more.
            </p>
          </div>


          <div className="rounded-3xl border border-[#eadfce] bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#9a7a52]">
              Page Purpose
            </p>
            <p className="mt-3 text-3xl font-bold text-[#2f261d]">Watch + Plan</p>
            <p className="mt-2 text-[16px] leading-7 text-[#6c5b49]">
              Use this page to browse walks and also start planning transport,
              logistics, and places to visit.
            </p>
          </div>
        </div>
      </section>


      <section id="destinations" className="mx-auto max-w-7xl px-6 py-6 lg:px-10">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9a7a52]">
            Browse Destinations
          </p>
          <h2 className="mt-3 text-3xl font-bold text-[#2f261d]">
            Featured Campania destinations
          </h2>
          <p className="mt-3 max-w-3xl text-[17px] leading-8 text-[#6c5b49]">
            Start with the strongest destination hubs first, then expand into
            specific towns, sites, and routes across the region.
          </p>
        </div>


        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {featuredDestinations.map((destination) =>
            destination.href !== "#" ? (
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
                  View destination →
                </div>
              </Link>
            ) : (
              <div
                key={destination.name}
                className="rounded-3xl border border-[#eadfce] bg-[#f8f3ec] p-7"
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


      <section className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9a7a52]">
            Explore by Category
          </p>
          <h2 className="mt-3 text-3xl font-bold text-[#2f261d]">
            What you can explore in Campania
          </h2>
        </div>


        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {destinationGroups.map((group) => (
            <div
              key={group.title}
              className="rounded-3xl border border-[#eadfce] bg-white p-7 shadow-sm"
            >
              <h3 className="text-2xl font-bold text-[#2f261d]">{group.title}</h3>
              <ul className="mt-5 space-y-3 text-[16px] leading-7 text-[#6c5b49]">
                {group.items.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>


      <section className="mx-auto max-w-7xl px-6 py-2 lg:px-10">
        <div className="rounded-3xl border border-[#eadfce] bg-white p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9a7a52]">
            Featured Walks
          </p>
          <h2 className="mt-3 text-3xl font-bold text-[#2f261d]">
            Start with a few key videos
          </h2>


          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {featuredWalks.map((walk) =>
              walk.href !== "#" ? (
                <Link
                  key={walk.title}
                  href={walk.href}
                  className="rounded-2xl border border-[#eadfce] bg-[#fcfaf7] p-5 transition hover:border-[#d7c3ad] hover:shadow-sm"
                >
                  <h3 className="text-lg font-bold text-[#2f261d]">{walk.title}</h3>
                  <p className="mt-2 text-sm font-semibold uppercase tracking-[0.12em] text-[#9a7a52]">
                    {walk.note}
                  </p>
                </Link>
              ) : (
                <div
                  key={walk.title}
                  className="rounded-2xl border border-[#eadfce] bg-[#f8f3ec] p-5"
                >
                  <h3 className="text-lg font-bold text-[#2f261d]">{walk.title}</h3>
                  <p className="mt-2 text-sm font-semibold uppercase tracking-[0.12em] text-[#9a7a52]">
                    {walk.note}
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </section>


      <section
        id="plan-your-trip"
        className="mx-auto max-w-7xl px-6 py-14 lg:px-10"
      >
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9a7a52]">
            Plan Your Trip
          </p>
          <h2 className="mt-3 text-3xl font-bold text-[#2f261d]">
            Use Campania as a travel-planning hub
          </h2>
          <p className="mt-3 max-w-4xl text-[17px] leading-8 text-[#6c5b49]">
            This section can grow into one of the most useful parts of the site:
            practical trip planning, transport guidance, key places to visit,
            and local services for travelers heading to Campania.
          </p>
        </div>


        <div className="grid gap-6 xl:grid-cols-2">
          <div className="rounded-3xl border border-[#eadfce] bg-white p-7 shadow-sm">
            <h3 className="text-2xl font-bold text-[#2f261d]">Getting there</h3>
            <ul className="mt-5 space-y-3 text-[16px] leading-7 text-[#6c5b49]">
              {gettingThere.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>


          <div className="rounded-3xl border border-[#eadfce] bg-white p-7 shadow-sm">
            <h3 className="text-2xl font-bold text-[#2f261d]">Top places to visit</h3>
            <ul className="mt-5 space-y-3 text-[16px] leading-7 text-[#6c5b49]">
              {topPlaces.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
        </div>


        <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {gettingAround.map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-[#eadfce] bg-white p-6 shadow-sm"
            >
              <h3 className="text-xl font-bold text-[#2f261d]">{item.title}</h3>
              <p className="mt-3 text-[16px] leading-7 text-[#6c5b49]">{item.text}</p>
            </div>
          ))}
        </div>
      </section>


      <section className="mx-auto max-w-7xl px-6 py-2 lg:px-10">
        <div className="grid gap-6 xl:grid-cols-2">
          <div className="rounded-3xl border border-[#eadfce] bg-white p-8 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9a7a52]">
              Travel Resources
            </p>
            <h2 className="mt-3 text-3xl font-bold text-[#2f261d]">
              Helpful planning links
            </h2>


            <div className="mt-6 space-y-4">
              {travelResources.map((resource) =>
                resource.href !== "#" ? (
                  <a
                    key={resource.title}
                    href={resource.href}
                    className="block rounded-2xl border border-[#eadfce] bg-[#fcfaf7] p-5 transition hover:border-[#d7c3ad] hover:shadow-sm"
                  >
                    <h3 className="text-lg font-bold text-[#2f261d]">
                      {resource.title}
                    </h3>
                    <p className="mt-2 text-[16px] leading-7 text-[#6c5b49]">
                      {resource.description}
                    </p>
                  </a>
                ) : (
                  <div
                    key={resource.title}
                    className="rounded-2xl border border-[#eadfce] bg-[#f8f3ec] p-5"
                  >
                    <h3 className="text-lg font-bold text-[#2f261d]">
                      {resource.title}
                    </h3>
                    <p className="mt-2 text-[16px] leading-7 text-[#6c5b49]">
                      {resource.description}
                    </p>
                  </div>
                )
              )}
            </div>
          </div>


          <div className="rounded-3xl border border-[#eadfce] bg-white p-8 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9a7a52]">
              Prowalk Tips
            </p>
            <h2 className="mt-3 text-3xl font-bold text-[#2f261d]">
              Trip-planning notes
            </h2>


            <ul className="mt-6 space-y-4 text-[16px] leading-7 text-[#6c5b49]">
              {prowalkTips.map((tip) => (
                <li key={tip}>• {tip}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>


      <section className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
        <div className="rounded-3xl border border-[#eadfce] bg-white p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9a7a52]">
            Featured Local Services
          </p>
          <h2 className="mt-3 text-3xl font-bold text-[#2f261d]">
            Drivers, guides, and travel partners
          </h2>
          <p className="mt-3 max-w-3xl text-[17px] leading-8 text-[#6c5b49]">
            This is where you can feature trusted private drivers, local guides,
            agencies, and region-specific travel services. Later, this can also
            become a sponsored partner section.
          </p>


          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {localPartners.map((partner) =>
              partner.href !== "#" ? (
                <a
                  key={partner.title}
                  href={partner.href}
                  className="block rounded-2xl border border-[#eadfce] bg-[#fcfaf7] p-6 transition hover:border-[#d7c3ad] hover:shadow-sm"
                >
                  <h3 className="text-xl font-bold text-[#2f261d]">
                    {partner.title}
                  </h3>
                  <p className="mt-3 text-[16px] leading-7 text-[#6c5b49]">
                    {partner.description}
                  </p>
                </a>
              ) : (
                <div
                  key={partner.title}
                  className="rounded-2xl border border-[#eadfce] bg-[#f8f3ec] p-6"
                >
                  <h3 className="text-xl font-bold text-[#2f261d]">
                    {partner.title}
                  </h3>
                  <p className="mt-3 text-[16px] leading-7 text-[#6c5b49]">
                    {partner.description}
                  </p>
                </div>
              )
            )}
          </div>


          <div className="mt-8 rounded-2xl border border-dashed border-[#d8c7b5] bg-[#fffaf3] p-6">
            <h3 className="text-xl font-bold text-[#2f261d]">
              Local business in Campania?
            </h3>
            <p className="mt-3 max-w-3xl text-[16px] leading-7 text-[#6c5b49]">
              This can become your call-to-action area for private drivers, tour
              guides, travel consultants, and agencies who want to be featured on
              this region page.
            </p>
            <div className="mt-5">
              <Link
                href="/about"
                className="inline-flex items-center justify-center rounded-full bg-[#3d3327] px-6 py-3 text-base font-semibold text-white transition hover:bg-[#2f261d]"
              >
                Partner With Prowalk Tours
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
