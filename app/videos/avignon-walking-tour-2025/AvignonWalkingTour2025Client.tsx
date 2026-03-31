"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import LongFormWalkPage, {
  LongFormWalkStatsRow,
} from "../../../components/LongFormWalkPage";
import MapSection from "../../../components/MapSection";
import { avignonWalkingTour2025Detail } from "../../../data/video-details/avignon-walking-tour-2025";
import { franceVideos } from "../../../data/videos/france";

type YouTubePlayer = {
  seekTo: (seconds: number, allowSeekAhead?: boolean) => void;
  playVideo: () => void;
  destroy: () => void;
};

type YouTubePlayerNamespace = {
  Player: new (
    element: HTMLIFrameElement,
    options?: { events?: { onReady?: () => void } }
  ) => YouTubePlayer;
};

declare global {
  interface Window {
    YT?: YouTubePlayerNamespace;
    onYouTubeIframeAPIReady?: () => void;
  }
}

export default function AvignonWalkingTour2025Client() {
  const avignonVideo = franceVideos.find(v => v.slug === "avignon-walking-tour-2025");
  const youtubeVideoId = avignonVideo?.youtubeUrl.split("/").pop() ?? "2iQh_R4t2Uw";
  const heroImagePath = "/avignon-walking-tour-2025/avignon-hero-image.png";
  const fullMapUrl = "https://www.google.com/maps/d/edit?mid=1_oLp6WjK3xM6gcGq2TYxER83Vzo788w&usp=sharing";
  const fullMapEmbedUrl = "https://www.google.com/maps/d/u/0/embed?mid=1_oLp6WjK3xM6gcGq2TYxER83Vzo788w";
  const fullMapQrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(fullMapUrl)}`;
  const formattedFilmingDate = avignonVideo?.filmingDates[0]
    ? new Date(`${avignonVideo.filmingDates[0]}T12:00:00`).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })
    : "Thursday, September 18, 2025";
  const topRowStats = [
    { icon: "📅", label: "Date", value: formattedFilmingDate },
    { icon: "📏", label: "Distance", value: "4.5 miles" },
    { icon: "🕒", label: "Duration", value: avignonVideo?.durationLabel ?? "2h 21m" },
    { icon: "☀️", label: "Weather", value: avignonVideo?.weather ?? "29°C / 85°F" },
  ];
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Countries", href: "/countries" },
    { label: "France", href: "/destinations/france" },
    { label: "Provence", href: "/destinations/france/provence" },
    { label: "Avignon" },
  ];
  const highlights = avignonWalkingTour2025Detail.highlights;
  const relatedTours = [
    { title: "Explore Provence", href: "/destinations/france/provence", description: "Return to the Provence hub to browse Avignon and follow future regional walking tours.", imageSrc: heroImagePath, imageAlt: "Avignon and Provence walking tour map preview" },
    { title: "France Destination Hub", href: "/destinations/france", description: "Browse France by major destination hub, including Provence and the French Riviera.", imageSrc: "https://i.ytimg.com/vi/naBkJ0bLzD0/maxresdefault.jpg", imageAlt: "France destination page preview" },
    { title: "Menton Walking Tour", href: "/videos/menton-france-walking-tour-2025", description: "Continue exploring France with another long-form walk on the French Riviera.", imageSrc: "https://i.ytimg.com/vi/naBkJ0bLzD0/maxresdefault.jpg", imageAlt: "Menton France walking tour thumbnail" },
  ];

  const videoSectionRef = useRef<HTMLDivElement | null>(null);
  const highlightsRef = useRef<HTMLDivElement | null>(null);
  const playerIframeRef = useRef<HTMLIFrameElement | null>(null);
  const playerRef = useRef<YouTubePlayer | null>(null);
  const pendingSeekRef = useRef<number | null>(null);

  useEffect(() => {
    let isUnmounting = false;
    const initializePlayer = () => {
      if (isUnmounting || playerRef.current || !playerIframeRef.current || !window.YT?.Player) return;
      playerRef.current = new window.YT.Player(playerIframeRef.current, {
        events: {
          onReady: () => {
            if (pendingSeekRef.current === null) return;
            const seconds = pendingSeekRef.current;
            pendingSeekRef.current = null;
            playerRef.current?.seekTo(seconds, true);
            playerRef.current?.playVideo();
          },
        },
      });
    };
    const previousReadyHandler = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => { previousReadyHandler?.(); initializePlayer(); };
    if (window.YT?.Player) {
      initializePlayer();
    } else if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(script);
    }
    return () => {
      isUnmounting = true;
      window.onYouTubeIframeAPIReady = previousReadyHandler;
      playerRef.current?.destroy();
      playerRef.current = null;
    };
  }, []);

  const handleHighlightClick = (seconds: number) => {
    pendingSeekRef.current = seconds;
    playerRef.current?.seekTo(seconds, true);
    playerRef.current?.playVideo();
    if (playerRef.current) pendingSeekRef.current = null;
    setTimeout(() => {
      videoSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  const scrollHighlights = (direction: "left" | "right") => {
    if (!highlightsRef.current) return;
    highlightsRef.current.scrollBy({ left: direction === "left" ? -340 : 340, behavior: "smooth" });
  };

  return (
    <LongFormWalkPage
      stickyNav={
        <section className="sticky top-16 z-40 border-y border-[#7f5f49] bg-[#3d3327]/95 text-white backdrop-blur">
          <nav className="mx-auto grid max-w-6xl grid-cols-[1fr_auto] items-center px-6 py-2 sm:py-3 lg:px-10">
            <div className="justify-self-end sm:justify-self-start">
              <div className="flex min-w-max items-center gap-4 text-xs font-semibold text-white/90 sm:gap-6 sm:text-sm">
                <a href="#overview" className="hidden transition hover:text-white sm:inline-flex">
                  Overview
                </a>
                <a href="#highlights" className="hidden transition hover:text-white sm:inline-flex">
                  Highlights
                </a>
                <a href="#route-map" className="hidden transition hover:text-white sm:inline-flex">
                  Route Map
                </a>
                <a href="#licensing" className="hidden transition hover:text-white sm:inline-flex">
                  Licensing
                </a>
                <a href="#related-tours" className="hidden transition hover:text-white sm:inline-flex">
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
                  <Link href={item.href} className="transition hover:text-[#167fd5]">
                    {item.label}
                  </Link>
                ) : (
                  <span className="font-medium text-[#5c4c33]">{item.label}</span>
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
                {avignonWalkingTour2025Detail.heroEyebrow}
              </p>
              <h1 className="mt-3 text-4xl font-bold tracking-tight text-[#3d3327] sm:text-5xl">
                {avignonWalkingTour2025Detail.heroTitle}
              </h1>
              <p className="mt-3 text-xl text-[#6e5a45]">
                {avignonWalkingTour2025Detail.heroSubtitle}
              </p>
              <p className="mt-6 max-w-3xl text-base leading-8 text-[#56493a]">
                {avignonWalkingTour2025Detail.heroDescription}
              </p>

              <div className="mt-8 space-y-4 border-y border-[#d8c7b5]/80 py-4 text-[#3d3327]">
                <LongFormWalkStatsRow stats={topRowStats} />
              </div>
            </div>

            <div className="relative hidden overflow-hidden rounded-[2rem] border border-[#d8c7b5] bg-white shadow-sm lg:block">
              <div className="relative aspect-[4/3] w-full">
                <img
                  src={heroImagePath}
                  alt="Avignon walking tour hero image"
                  className="h-full w-full object-cover"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        ref={videoSectionRef}
        id="video"
        className="mx-auto max-w-6xl px-6 pb-6 pt-6 lg:px-10 lg:pb-6 lg:pt-14"
      >
        <div className="overflow-hidden rounded-[2rem] border border-[#d8c7b5] shadow-lg">
          <div className="aspect-video w-full bg-black">
            <iframe
              ref={playerIframeRef}
              className="h-full w-full"
              src={`https://www.youtube.com/embed/${youtubeVideoId}?rel=0&playsinline=1&enablejsapi=1`}
              title="Avignon France walking tour"
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
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#9a735a]">Video Highlights</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#3d3327]">Jump to highlights</h2>
          </div>
          <div className="hidden items-center gap-3 md:flex">
            <button onClick={() => scrollHighlights("left")} className="rounded-full border border-[#cdb7a0] bg-white px-4 py-3 text-2xl font-semibold text-[#7f5f49] shadow-sm transition hover:border-[#9a735a] hover:bg-[#fff7ee]" aria-label="Scroll highlights left">‹</button>
            <button onClick={() => scrollHighlights("right")} className="rounded-full border border-[#cdb7a0] bg-white px-4 py-3 text-2xl font-semibold text-[#7f5f49] shadow-sm transition hover:border-[#9a735a] hover:bg-[#fff7ee]" aria-label="Scroll highlights right">›</button>
          </div>
        </div>

        <div
          ref={highlightsRef}
          className="mt-8 flex gap-4 overflow-x-auto scroll-smooth pb-2"
        >
          {highlights.map((highlight) => (
            <div key={`${highlight.title}-${highlight.seconds}`} className="w-[280px] shrink-0">
              <button
                onClick={() => handleHighlightClick(highlight.seconds)}
                className="w-full overflow-hidden rounded-[1.5rem] border border-[#d8c7b5] bg-white text-left shadow-sm transition hover:-translate-y-1 hover:border-[#167fd5] hover:shadow-lg"
              >
                <div className="relative flex aspect-[16/10] items-end overflow-hidden bg-gradient-to-br from-[#d7e6f0] via-[#f8efe2] to-[#e5d3b8] p-4">
                  <img src={highlight.imageSrc} alt={highlight.alt} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
                  <span className="relative rounded-full bg-white/90 px-3 py-1 text-sm font-semibold text-[#3d3327] shadow-sm">{highlight.timeLabel}</span>
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
              </button>
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
          description={avignonWalkingTour2025Detail.routeMapDescription}
          iframeSrc={fullMapEmbedUrl}
          iframeTitle="Avignon walking route map"
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
                  Scan to open the Avignon walking route on your phone using Google Maps.
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
                aria-label="Open the Avignon route map on your phone"
              >
                <img
                  src={fullMapQrUrl}
                  alt="QR code for opening the Avignon walking route in Google Maps"
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
                License this Avignon footage
              </h2>

              <p className="mt-5 max-w-2xl text-base leading-8 text-[#56493a]">
                {avignonWalkingTour2025Detail.licensingDescription[0]}
              </p>

              <p className="mt-5 max-w-2xl text-base leading-8 text-[#56493a]">
                {avignonWalkingTour2025Detail.licensingDescription[1]}
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
          Continue through Provence, revisit the France destination hub, or queue up another long-form walk from the French Riviera.
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
              <p className="text-sm font-semibold text-[#3d3327]">{tour.title}</p>
              <p className="mt-2 text-sm leading-7 text-[#6e5a45]">{tour.description}</p>
              <p className="mt-4 text-sm font-semibold text-[#167fd5]">View tour -&gt;</p>
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
                Get updates when new walks, regional pages, and long-form France videos go live on Prowalk Tours.
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
  );
}
