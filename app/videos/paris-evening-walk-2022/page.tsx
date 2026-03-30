import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import LongFormWalkPage, {
  LongFormWalkStatsRow,
} from "../../../components/LongFormWalkPage";
import MapSection from "../../../components/MapSection";
import { parisEveningWalk2022Detail } from "../../../data/video-details/paris-evening-walk-2022";
import { franceVideos } from "../../../data/videos/france";

const siteUrl = "https://www.prowalktours.com";
const pageUrl = `${siteUrl}/videos/paris-evening-walk-2022`;
const heroImagePath =
  "/paris-evening-walk-2022/paris-evening-walk-placeholder-hero.svg";
const ogImageUrl = `${siteUrl}${heroImagePath}`;
const fullMapUrl =
  "https://www.google.com/maps/d/edit?mid=17nTBGojUSBQ_vVo5LBLRrM1koOz5AM8&usp=sharing";
const fullMapEmbedUrl =
  "https://www.google.com/maps/d/u/0/embed?mid=17nTBGojUSBQ_vVo5LBLRrM1koOz5AM8";
const fullMapQrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(fullMapUrl)}`;
const metadataTitle = "Paris, France Evening Walk (2022)";
const metadataDescription =
  "Explore Paris at evening in this long-form walk through Saint-Michel, Notre-Dame, the Marais, Bastille, the Eiffel Tower, the Louvre, Pont Neuf, the Panth\u00e9on, and the Left Bank.";

const parisVideo = franceVideos.find(
  (video) => video.slug === "paris-evening-walk-2022"
);
const youtubeVideoId = parisVideo?.youtubeUrl.split("/").pop() ?? "fKgP6JGAM_A";

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Countries", href: "/countries" },
  { label: "France", href: "/destinations/france" },
  { label: "Paris, France Evening Walk (2022)" },
];

const highlights = parisEveningWalk2022Detail.highlights;

const relatedTours = [
  {
    title: "France Destination Hub",
    href: "/destinations/france",
    description:
      "Browse France by region and continue into more city walks as the collection grows.",
    imageSrc: heroImagePath,
    imageAlt: "Paris evening walk placeholder preview",
  },
  {
    title: "Avignon Walking Tour",
    href: "/videos/avignon-walking-tour-2025",
    description:
      "Continue exploring France with a long-form walk through Avignon's historic center and papal landmarks.",
    imageSrc: "/avignon-walking-tour-2025/avignon-hero-image.png",
    imageAlt: "Avignon walking tour preview",
  },
  {
    title: "Antibes Walking Tour",
    href: "/videos/antibes-daytime-walk-2025",
    description:
      "Switch from Paris to the French Riviera with another long-form France walking tour.",
    imageSrc: "/antibes-daytime-walk-2025/antibes-hero-image.jpg",
    imageAlt: "Antibes walking tour preview",
  },
];

export const metadata: Metadata = {
  title: metadataTitle,
  description: metadataDescription,
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: metadataTitle,
    description: metadataDescription,
    url: pageUrl,
    images: [
      {
        url: ogImageUrl,
        alt: "Paris evening walk placeholder hero image",
      },
    ],
  },
};

export default function ParisEveningWalk2022Page() {
  const formattedFilmingDate = parisVideo?.filmingDates[0]
    ? new Date(`${parisVideo.filmingDates[0]}T12:00:00`).toLocaleDateString(
        "en-US",
        {
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric",
        }
      )
    : "Saturday, July 23, 2022";

  const topRowStats = [
    { icon: "\u{1F4C5}", label: "Date", value: formattedFilmingDate },
    { icon: "\u{1F4CF}", label: "Distance", value: "8.5 miles" },
    {
      icon: "\u{1F552}",
      label: "Duration",
      value: parisVideo?.durationLabel ?? "2:25:33",
    },
    {
      icon: "\u{2600}\uFE0F",
      label: "Weather",
      value: parisVideo?.weather ?? "80\u00b0F / 27\u00b0C",
    },
  ];

  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${siteUrl}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Countries",
        item: `${siteUrl}/countries`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "France",
        item: `${siteUrl}/destinations/france`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Paris, France Evening Walk (2022)",
        item: pageUrl,
      },
    ],
  };

  const videoStructuredData = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: metadataTitle,
    description: metadataDescription,
    thumbnailUrl: [ogImageUrl],
    embedUrl: "https://www.youtube.com/embed/fKgP6JGAM_A",
    contentUrl: "https://www.youtube.com/watch?v=fKgP6JGAM_A",
    uploadDate: "2022-07-23",
    url: pageUrl,
  };

  return (
    <>
      <Script
        id="paris-breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData),
        }}
      />
      <Script
        id="paris-video-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(videoStructuredData),
        }}
      />

      <LongFormWalkPage
        stickyNav={
          <section className="sticky top-16 z-40 border-y border-[#7f5f49] bg-[#3d3327]/95 text-white backdrop-blur">
            <nav className="mx-auto grid max-w-6xl grid-cols-[1fr_auto] items-center px-6 py-2 sm:py-3 lg:px-10">
              <div className="justify-self-end sm:justify-self-start">
                <div className="flex min-w-max items-center gap-4 text-xs font-semibold text-white/90 sm:gap-6 sm:text-sm">
                  <a
                    href="#overview"
                    className="hidden transition hover:text-white sm:inline-flex"
                  >
                    Overview
                  </a>
                  <a
                    href="#highlights"
                    className="hidden transition hover:text-white sm:inline-flex"
                  >
                    Highlights
                  </a>
                  <a
                    href="#route-map"
                    className="hidden transition hover:text-white sm:inline-flex"
                  >
                    Route Map
                  </a>
                  <a
                    href="#licensing"
                    className="hidden transition hover:text-white sm:inline-flex"
                  >
                    Licensing
                  </a>
                  <a
                    href="#related-tours"
                    className="hidden transition hover:text-white sm:inline-flex"
                  >
                    Related Tours
                  </a>
                </div>
              </div>

              <div className="hidden justify-self-end shrink-0 items-center gap-2 rounded-full border border-[#8f735c] bg-[#4a3c2f] px-3 py-1.5 text-sm font-semibold text-white/90 md:flex">
                <div className="h-4 w-6 overflow-hidden rounded-[2px] border border-white/20">
                  <div className="grid h-full grid-cols-3">
                    <div className="bg-[#0055a4]" />
                    <div className="bg-white" />
                    <div className="bg-[#ef4135]" />
                  </div>
                </div>
                <span>France</span>
              </div>
            </nav>
          </section>
        }
      >
        <section
          id="overview"
          className="scroll-mt-32 border-b border-[#d8c7b5] bg-gradient-to-br from-[#f4e6bc] via-[#fcfaf6] to-[#e7f1f8]"
        >
          <div className="mx-auto max-w-6xl px-6 py-12 lg:px-10 lg:py-16">
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

            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
              <div className="min-w-0">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#9a735a]">
                  {parisEveningWalk2022Detail.heroEyebrow}
                </p>
                <h1 className="mt-3 text-4xl font-bold tracking-tight text-[#3d3327] sm:text-5xl">
                  {parisEveningWalk2022Detail.heroTitle}
                </h1>
                <p className="mt-3 text-xl text-[#6e5a45]">
                  {parisEveningWalk2022Detail.heroSubtitle}
                </p>
                <p className="mt-6 max-w-3xl text-base leading-8 text-[#56493a]">
                  {parisEveningWalk2022Detail.heroDescription}
                </p>

                <div className="mt-8 space-y-4 border-y border-[#d8c7b5]/80 py-4 text-[#3d3327]">
                  <LongFormWalkStatsRow stats={topRowStats} />
                </div>
              </div>

              <div className="relative hidden overflow-hidden rounded-[2rem] border border-[#d8c7b5] bg-white shadow-sm lg:block">
                <div className="relative aspect-[4/3] w-full">
                  <img
                    src={heroImagePath}
                    alt="Paris evening walk placeholder hero image"
                    className="h-full w-full object-cover"
                    loading="eager"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="video"
          className="mx-auto max-w-6xl px-6 pb-6 pt-6 lg:px-10 lg:pb-6 lg:pt-14"
        >
          <div className="overflow-hidden rounded-[2rem] border border-[#d8c7b5] shadow-lg">
            <div className="aspect-video w-full bg-black">
              <iframe
                className="h-full w-full"
                src={`https://www.youtube.com/embed/${youtubeVideoId}?rel=0&playsinline=1`}
                title="Paris France evening walk 2022"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
        </section>

        <section
          id="highlights"
          className="scroll-mt-32 mx-auto max-w-6xl rounded-[2rem] border border-[#e4d3b2] bg-gradient-to-br from-[#f4e6bc] via-[#fbf3dc] to-[#f7ede3] px-6 py-6 lg:px-10"
        >
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#9a735a]">
                Video Highlights
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#3d3327]">
                Jump to highlights
              </h2>
            </div>
          </div>

          <div className="mt-8 flex gap-4 overflow-x-auto scroll-smooth pb-2">
            {highlights.map((highlight) => (
              <div
                key={`${highlight.title}-${highlight.seconds}`}
                className="w-[280px] shrink-0"
              >
                <a
                  href={`https://youtu.be/${youtubeVideoId}?t=${highlight.seconds}`}
                  target="_blank"
                  rel="noreferrer"
                  className="block w-full overflow-hidden rounded-[1.5rem] border border-[#d8c7b5] bg-white text-left shadow-sm transition hover:-translate-y-1 hover:border-[#167fd5] hover:shadow-lg"
                >
                  <div className="relative flex aspect-[16/10] items-end overflow-hidden bg-gradient-to-br from-[#d7e6f0] via-[#f8efe2] to-[#e5d3b8] p-4">
                    <img
                      src={highlight.imageSrc}
                      alt={highlight.alt}
                      className="absolute inset-0 h-full w-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
                    <span className="relative rounded-full bg-white/90 px-3 py-1 text-sm font-semibold text-[#3d3327] shadow-sm">
                      {highlight.timeLabel}
                    </span>
                  </div>

                  <div className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-sm font-semibold text-[#3d3327]">
                        {highlight.title}
                      </p>
                      <p className="shrink-0 text-sm text-[#8a7a68]">
                        {highlight.timeLabel}
                      </p>
                    </div>

                    <p className="mt-2 text-sm leading-6 text-[#56493a]">
                      {highlight.description}
                    </p>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </section>

        <section
          id="route-map"
          className="scroll-mt-32 mx-auto max-w-6xl px-6 py-8 lg:px-10 lg:py-10"
        >
          <MapSection
            eyebrow="Route map"
            heading="Explore the route"
            description={parisEveningWalk2022Detail.routeMapDescription}
            iframeSrc={fullMapEmbedUrl}
            iframeTitle="Paris evening walk route map"
            eyebrowClassName="text-sm font-semibold uppercase tracking-[0.22em] text-[#9a735a]"
            headingClassName="mt-3 text-3xl font-bold tracking-tight text-[#3d3327]"
            descriptionClassName="mt-4 max-w-3xl text-base leading-8 text-[#56493a]"
            mapCardClassName="mt-8 overflow-hidden rounded-[1.5rem] border border-[#d8c7b5] shadow-lg sm:rounded-[2rem]"
            mapBackgroundClassName="h-[420px] w-full bg-zinc-100 sm:h-[480px] lg:h-auto lg:aspect-[16/9]"
          >
            <div className="mt-6 rounded-[1.75rem] border border-[#d8c7b5] bg-[#fcfaf6] p-5 shadow-sm">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="max-w-xl">
                  <p className="text-lg font-semibold tracking-tight text-[#3d3327] sm:text-xl">
                    Take this route with you
                  </p>
                  <p className="mt-3 text-[15px] leading-7 text-[#56493a]">
                    Scan to open the Paris evening route on your phone using
                    Google Maps.
                  </p>
                  <a
                    href={fullMapUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex items-center justify-center rounded-full border border-[#167fd5] bg-white px-4 py-2 text-sm font-semibold text-[#167fd5] shadow-sm transition hover:bg-[#edf6fd]"
                  >
                    Open the route in Google Maps
                  </a>
                </div>

                <a
                  href={fullMapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="self-start rounded-[1.5rem] border border-[#e5d7c6] bg-white p-3 shadow-sm transition hover:border-[#cdb7a0]"
                  aria-label="Open the Paris evening route map on your phone"
                >
                  <img
                    src={fullMapQrUrl}
                    alt="QR code for opening the Paris evening route in Google Maps"
                    width="132"
                    height="132"
                    className="h-[132px] w-[132px] rounded-xl"
                  />
                </a>
              </div>
            </div>
          </MapSection>
        </section>

        <section
          id="licensing"
          className="scroll-mt-32 mx-auto max-w-6xl px-6 pb-14 lg:px-10"
        >
          <div className="rounded-[2rem] border border-[#d8c7b5] bg-[#f7efe4] p-7 shadow-xl lg:p-8">
            <div className="grid gap-7 lg:grid-cols-[1.05fr_0.95fr]">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#9a735a]">
                  Licensing Hub
                </p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#3d3327]">
                  License this Paris footage
                </h2>

                <p className="mt-5 max-w-2xl text-base leading-8 text-[#56493a]">
                  {parisEveningWalk2022Detail.licensingDescription[0]}
                </p>

                <p className="mt-5 max-w-2xl text-base leading-8 text-[#56493a]">
                  {parisEveningWalk2022Detail.licensingDescription[1]}
                </p>
              </div>

              <div className="rounded-[1.75rem] border border-[#d8c7b5] bg-white p-5 shadow-sm sm:p-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[1.25rem] border border-[#eadfce] bg-[#fcfaf6] p-4">
                    <div className="space-y-3">
                      <div className="border-b border-[#efe3d3] pb-3">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#9a735a]">
                          Camera
                        </p>
                        <span className="mt-1 block text-sm font-semibold text-[#5c4c33]">
                          Sony A7S III
                        </span>
                      </div>
                      <div className="border-b border-[#efe3d3] pb-3">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#9a735a]">
                          Lens
                        </p>
                        <span className="mt-1 block text-sm font-semibold text-[#5c4c33]">
                          Sony FE PZ 16-35mm G
                        </span>
                      </div>
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#9a735a]">
                          Microphone
                        </p>
                        <span className="mt-1 block text-sm font-semibold text-[#5c4c33]">
                          Sony ECM-M1
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-[1.25rem] border border-[#eadfce] bg-[#fcfaf6] p-4">
                    <div className="space-y-3">
                      <div className="border-b border-[#efe3d3] pb-3">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#9a735a]">
                          Resolution
                        </p>
                        <span className="mt-1 block text-sm font-semibold text-[#5c4c33]">
                          4K UHD
                        </span>
                      </div>
                      <div className="border-b border-[#efe3d3] pb-3">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#9a735a]">
                          Frame Rate
                        </p>
                        <span className="mt-1 block text-sm font-semibold text-[#5c4c33]">
                          59.94 fps
                        </span>
                      </div>
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#9a735a]">
                          Color
                        </p>
                        <span className="mt-1 block text-sm font-semibold text-[#5c4c33]">
                          Rec. 709
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-5 flex justify-center">
                  <a
                    href="/licensing"
                    className="inline-flex min-w-[220px] items-center justify-center rounded-2xl bg-[#167fd5] px-8 py-4 text-center text-base font-semibold text-white shadow-sm transition hover:bg-[#09679e]"
                  >
                    Request License Quote
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="related-tours"
          className="scroll-mt-32 mx-auto max-w-6xl px-6 pb-16 lg:px-10"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#9a735a]">
            Related France Tours
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#3d3327]">
            Explore more from France
          </h2>

          <p className="mt-4 max-w-3xl text-base leading-8 text-[#56493a]">
            Continue through France with more long-form city walks, destination
            hubs, and regional pages.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {relatedTours.map((tour) => (
              <a
                key={tour.href}
                href={tour.href}
                className="group rounded-[1.5rem] border border-[#d8c7b5] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-[#167fd5] hover:shadow-lg"
              >
                <div className="mb-4 overflow-hidden rounded-[1rem] border border-[#eadfce]">
                  <img
                    src={tour.imageSrc}
                    alt={tour.imageAlt}
                    className="aspect-video w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <p className="text-sm font-semibold text-[#3d3327]">
                  {tour.title}
                </p>
                <p className="mt-2 text-sm leading-7 text-[#6e5a45]">
                  {tour.description}
                </p>
                <p className="mt-4 text-sm font-semibold text-[#167fd5]">
                  View tour -&gt;
                </p>
              </a>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 pb-20 lg:px-10">
          <div className="rounded-[2rem] border border-[#d8c7b5] bg-gradient-to-br from-[#f4e6bc] via-[#fcfaf6] to-[#e7f1f8] p-8 shadow-sm lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#9a735a]">
                  Stay Connected
                </p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#3d3327]">
                  Don&apos;t miss the next walk
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-8 text-[#56493a]">
                  Get updates when new walks, destination pages, and long-form
                  France videos go live on ProWalk Tours.
                </p>
                <p className="mt-3 text-sm text-[#8a7a68]">
                  Occasional updates only. Unsubscribe anytime.
                </p>
                <a
                  href="https://www.youtube.com/@ProWalkTours?sub_confirmation=1"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex items-center justify-center rounded-full bg-[#d52b1e] px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#b82217]"
                >
                  Join the Journey - Subscribe to ProWalk Tours
                </a>
              </div>

              <div className="rounded-[1.75rem] border border-[#d8c7b5] bg-white p-6 shadow-sm">
                <div className="grid gap-4">
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-[#5c4c33]">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="w-full rounded-xl border border-[#d8c7b5] bg-[#fcfaf6] px-4 py-2.5 text-sm outline-none transition focus:border-[#167fd5]"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-semibold text-[#5c4c33]">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full rounded-xl border border-[#d8c7b5] bg-[#fcfaf6] px-4 py-2.5 text-sm outline-none transition focus:border-[#167fd5]"
                    />
                  </div>

                  <button
                    type="button"
                    className="mt-2 rounded-2xl bg-[#167fd5] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#09679e]"
                  >
                    Notify Me
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </LongFormWalkPage>
    </>
  );
}
