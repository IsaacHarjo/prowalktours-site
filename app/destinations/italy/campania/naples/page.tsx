import Image from "next/image";
import Link from "next/link";

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Countries", href: "/countries" },
  { label: "Italy", href: "/destinations/italy" },
  { label: "Campania", href: "/destinations/italy/campania" },
  { label: "Naples" },
];

export default function Home() {
  const quickFacts = [
    "20+ Naples videos",
    "Day, night, drone, 360, bike, waterfront, churches, and more",
    "Campania, Italy",
  ];

  const categories = [
    {
      title: "Day Walks",
      description:
        "Explore Naples in daylight through historic streets, markets, churches, and daily city life.",
      imageSrc: "/naples/day-walks.jpg",
      alt: "Street scene in Naples during the day",
    },
    {
      title: "Evening & Night Walks",
      description:
        "Experience Naples after dark with glowing alleys, nightlife, and atmospheric city scenes.",
      imageSrc: "/naples/night-walks.jpg",
      alt: "Atmospheric Naples evening alley",
    },
    {
      title: "Waterfront & Bay Views",
      description:
        "Discover the Lungomare, Castel dell’Ovo, Santa Lucia, and sweeping views of the bay.",
      imageSrc: "/naples/waterfront.jpg",
      alt: "Naples waterfront with boats and bay views",
    },
    {
      title: "Historic Center",
      description:
        "Browse walks through Spaccanapoli, Via dei Tribunali, piazzas, churches, and old city streets.",
      imageSrc: "/naples/historic-center.jpg",
      alt: "Historic center street in Naples",
    },
    {
      title: "Markets & Street Life",
      description:
        "Explore the color, noise, movement, and local character of Naples markets and busy streets.",
      imageSrc: "/naples/markets.JPG",
      alt: "Market scene in Naples",
    },
    {
      title: "360 & Drone Views",
      description:
        "Watch Naples from above and in immersive formats with drone footage and 360 videos.",
      imageSrc: "/naples/drone.jpg",
      alt: "Aerial view of Naples and bay",
    },
  ];

  const featuredVideos = [
    {
      title:
        "Naples, Italy Daytime Walking Tour — Historic Center, Sanità & Waterfront — July 2023",
      meta: "Lead featured walk",
      tags: ["Day Walk", "Historic Center", "Waterfront", "Long Walk"],
      imageSrc: "/naples/hero.jpg",
      alt: "Naples skyline and bay view",
    },
    {
      title: "Best Naples Waterfront Walk",
      meta: "Scenic bay views",
      tags: ["Waterfront", "Vesuvius Views", "Castel dell’Ovo"],
      imageSrc: "/naples/waterfront.jpg",
      alt: "Naples waterfront and boats",
    },
    {
      title: "Best Naples Night Walk",
      meta: "Evening atmosphere",
      tags: ["Night", "Spanish Quarter", "Historic Streets"],
      imageSrc: "/naples/night-walks.jpg",
      alt: "Naples night atmosphere",
    },
  ];

  const gallery = [
    {
      src: "/naples/hero.jpg",
      alt: "Naples skyline and bay",
    },
    {
      src: "/naples/waterfront.jpg",
      alt: "Boats and water in Naples",
    },
    {
      src: "/naples/castle.JPG",
      alt: "Castel Nuovo in Naples",
    },
    {
      src: "/naples/markets.JPG",
      alt: "Naples market scene",
    },
    {
      src: "/naples/night-walks.jpg",
      alt: "Naples alley with Pulcinella",
    },
    {
      src: "/naples/day-walks.jpg",
      alt: "Naples daytime street scene",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-zinc-900">
      <section className="relative overflow-hidden border-b border-zinc-200">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-100 via-cyan-50 to-zinc-100" />
        <div className="absolute inset-0 opacity-60 bg-[radial-gradient(circle_at_top_right,rgba(14,165,233,0.18),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(20,184,166,0.16),transparent_28%)]" />
        <div className="relative mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
          <nav
            aria-label="Breadcrumb"
            className="mb-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-zinc-600"
          >
            {breadcrumbs.map((item, index) => (
              <div key={item.label} className="inline-flex items-center gap-2">
                {item.href ? (
                  <Link
                    href={item.href}
                    className="transition hover:text-sky-700"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="font-medium text-zinc-800">{item.label}</span>
                )}
                {index < breadcrumbs.length - 1 ? (
                  <span aria-hidden="true" className="text-zinc-400">
                    /
                  </span>
                ) : null}
              </div>
            ))}
          </nav>
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div>
              <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Explore Naples
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-700">
                Discover walking tours, waterfront views, historic streets,
                churches, castles, markets, drone footage, and more from
                Naples, Italy.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
  href="/videos/naples-daytime-walk-2023"
  className="rounded-2xl bg-zinc-900 px-5 py-3 text-sm font-semibold text-white shadow-sm"
>
  Featured Naples Walk
</a>
                <button className="rounded-2xl border border-zinc-300 bg-white px-5 py-3 text-sm font-semibold text-zinc-900">
                  Browse Naples Videos
                </button>
                <button className="rounded-2xl border border-zinc-300 bg-white px-5 py-3 text-sm font-semibold text-zinc-900">
                  License Naples Footage
                </button>
              </div>
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {quickFacts.map((fact) => (
                  <div
                    key={fact}
                    className="rounded-2xl border border-zinc-200 bg-white/85 p-4 text-sm text-zinc-700 shadow-sm"
                  >
                    {fact}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-zinc-200 bg-white p-4 shadow-xl">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem]">
                <Image
                  src="/naples/hero.jpg"
                  alt="Naples skyline and bay view"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6 text-white">
                  <p className="text-xs uppercase tracking-[0.2em] text-white/80">
                    Featured destination image
                  </p>
                  <p className="mt-2 text-2xl font-semibold">Naples</p>
                  <p className="mt-2 max-w-sm text-sm text-white/90">
                    A broad city-and-bay view for the Naples destination hub.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-zinc-500">
              Why Naples?
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight">
              A city with many ways to explore
            </h2>
          </div>
          <div className="rounded-[2rem] border border-zinc-200 bg-zinc-50 p-7 shadow-sm">
            <p className="leading-8 text-zinc-700">
              Naples is one of the most layered and visually rich cities in
              Italy, with a mix of historic streets, religious landmarks,
              markets, waterfront scenery, castles, neighborhoods full of
              character, and sweeping views of Mount Vesuvius. Prowalk Tours
              has explored Naples in many different ways, from long daytime
              walks and evening strolls to Christmas scenes, church visits,
              drone footage, bike rides, and immersive 360 videos.
            </p>
            <p className="mt-5 leading-8 text-zinc-700">
              Whether you want the energy of Via Toledo, the atmosphere of
              Spaccanapoli, the local life of the Spanish Quarter, or the sea
              views near Castel dell’Ovo, this page is the place to start.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16 lg:px-10">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-zinc-500">
              Browse by category
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight">
              Choose how to explore Naples
            </h2>
          </div>
          <div className="hidden rounded-2xl border border-zinc-200 bg-white px-4 py-2 text-sm text-zinc-600 shadow-sm md:block">
            Start with a category, then choose a video
          </div>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {categories.map((category) => (
            <div
              key={category.title}
              className="group overflow-hidden rounded-[1.75rem] border border-zinc-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative aspect-[16/10] overflow-hidden border-b border-zinc-200">
                <Image
                  src={category.imageSrc}
                  alt={category.alt}
                  fill
                  className="object-cover transition duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold">{category.title}</h3>
                <p className="mt-3 text-sm leading-7 text-zinc-600">
                  {category.description}
                </p>
                <div className="mt-5 inline-flex items-center text-sm font-semibold text-zinc-900">
                  View category
                  <span className="ml-2">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-zinc-200 bg-zinc-50">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-zinc-500">
                Start here
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight">
                Featured Naples videos
              </h2>
            </div>
            <button className="hidden rounded-2xl border border-zinc-300 bg-white px-4 py-2 text-sm font-semibold text-zinc-900 md:block">
              Browse all Naples videos
            </button>
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {featuredVideos.map((video) => (
              <div
                key={video.title}
                className="rounded-[1.75rem] border border-zinc-200 bg-white p-6 shadow-sm"
              >
                <div className="relative aspect-[16/10] overflow-hidden rounded-[1.25rem]">
                  <Image
                    src={video.imageSrc}
                    alt={video.alt}
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                  {video.meta}
                </p>
                <h3 className="mt-2 text-xl font-semibold leading-8">
                  {video.title}
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {video.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <a
  href="/videos/naples-daytime-walk-2023"
  className="mt-5 inline-block rounded-2xl bg-zinc-900 px-4 py-3 text-sm font-semibold text-white"
>
  Open video page
</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-zinc-500">
              Scenes from Naples
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight">
              A quick visual snapshot
            </h2>
            <p className="mt-4 max-w-xl leading-8 text-zinc-700">
              The Naples library includes historic streets, waterfront scenes,
              markets, castles, murals, local life, and wide views toward Mount
              Vesuvius.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {gallery.map((item) => (
                <div
                  key={item.src}
                  className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] border border-zinc-200"
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-zinc-200 bg-zinc-900 p-8 text-white shadow-xl">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-zinc-300">
              Licensing
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight">
              License Naples footage
            </h2>
            <p className="mt-5 leading-8 text-zinc-300">
              Looking to license footage of Naples for television, documentary,
              travel, news, websites, or commercial projects? Prowalk Tours may
              have licensed footage available featuring Naples streets,
              churches, castles, markets, waterfront scenes, Mount Vesuvius
              views, drone imagery, and long-form walking tours.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-zinc-900">
                License Naples Footage
              </button>
              <button className="rounded-2xl border border-zinc-700 px-5 py-3 text-sm font-semibold text-white">
                Contact Prowalk Tours
              </button>
            </div>
            <div className="mt-8 rounded-[1.5rem] border border-zinc-800 bg-zinc-950/60 p-5 text-sm text-zinc-400">
              Additional Naples aerials, waterfront imagery, and city scenes
              may also be available for select licensing uses.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
