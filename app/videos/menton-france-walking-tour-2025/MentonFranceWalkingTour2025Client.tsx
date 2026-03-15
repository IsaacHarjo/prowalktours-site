"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type Highlight = {
  title: string;
  timeLabel: string;
  seconds: number;
  imageSrc: string;
  alt: string;
  description: string;
};

type RelatedVideo = {
  title: string;
  href: string;
  description: string;
  thumbnail: string;
};

type YouTubePlayer = {
  seekTo: (seconds: number, allowSeekAhead?: boolean) => void;
  playVideo: () => void;
  destroy: () => void;
};

type YouTubePlayerNamespace = {
  Player: new (
    element: HTMLIFrameElement,
    options?: {
      events?: {
        onReady?: () => void;
      };
    }
  ) => YouTubePlayer;
};

declare global {
  interface Window {
    YT?: YouTubePlayerNamespace;
    onYouTubeIframeAPIReady?: () => void;
  }
}

const youtubeVideoId = "ulReotWQvO0";
const heroImageSrc = "/menton-france-walking-tour-2025/menton-hero-image.jpg";
const fullMapUrl =
  "https://www.google.com/maps/d/u/0/edit?mid=10Hd2GhEptpOzBdjYhG4z08uxX0gGyf0&usp=sharing";
const fullMapEmbedUrl =
  "https://www.google.com/maps/d/u/0/embed?mid=10Hd2GhEptpOzBdjYhG4z08uxX0gGyf0";
const fullMapQrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(fullMapUrl)}`;

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Countries", href: "/countries" },
  { label: "France", href: "/destinations/france" },
  { label: "French Riviera", href: "/destinations/france/french-riviera" },
  { label: "Menton, France Walking Tour" },
];

const highlights: Highlight[] = [
  {
    title: "Sablettes Beach (West)",
    timeLabel: "1:10",
    seconds: 70,
    imageSrc:
      "/menton-france-walking-tour-2025/highlights/menton-plage-des-sablettes-ouest-beach.jpg",
    alt: "Sablettes Beach in Menton",
    description: "The walk starts beside the blue Menton sign at the beach.",
  },
  {
    title: "Les Rampes Saint-Michel",
    timeLabel: "8:08",
    seconds: 488,
    imageSrc:
      "/menton-france-walking-tour-2025/highlights/menton-les-rampes-saint-michel-stairs.jpg",
    alt: "Les Rampes Saint-Michel stairs in Menton",
    description: "Historic donkey steps lead uphill toward the old quarter.",
  },
  {
    title: "Rue Longue",
    timeLabel: "11:17",
    seconds: 677,
    imageSrc:
      "/menton-france-walking-tour-2025/highlights/menton-rue-longue.jpg",
    alt: "Rue Longue in Menton",
    description: "A narrow Old Town street with color, texture, and shade.",
  },
  {
    title: "Place Logettes",
    timeLabel: "12:25",
    seconds: 745,
    imageSrc:
      "/menton-france-walking-tour-2025/highlights/menton-place-logettes-town-square.jpg",
    alt: "Place Logettes in Menton",
    description: "A compact square surrounded by old buildings and local life.",
  },
  {
    title: "Place du Cap",
    timeLabel: "15:02",
    seconds: 902,
    imageSrc:
      "/menton-france-walking-tour-2025/highlights/menton-place-du-cap-town-square.jpg",
    alt: "Place du Cap in Menton",
    description: "A bright stopping point on the climb through Old Town.",
  },
  {
    title: "Rue Saint-Michel",
    timeLabel: "18:35",
    seconds: 1115,
    imageSrc:
      "/menton-france-walking-tour-2025/highlights/menton-rue-saint-michel-street.jpg",
    alt: "Rue Saint-Michel in Menton",
    description: "Stone streets and warm facades define this central stretch.",
  },
  {
    title: "Place aux Herbes",
    timeLabel: "19:48",
    seconds: 1188,
    imageSrc:
      "/menton-france-walking-tour-2025/highlights/menton-place-aux-herbes-town-square.jpg",
    alt: "Place aux Herbes in Menton",
    description: "An atmospheric square tucked into the historic center.",
  },
  {
    title: "Place Clemenceau",
    timeLabel: "25:09",
    seconds: 1509,
    imageSrc:
      "/menton-france-walking-tour-2025/highlights/menton-place-clemenceau-town-square.jpg",
    alt: "Place Clemenceau in Menton",
    description: "The route opens into a wider civic space before heading on.",
  },
  {
    title: "Mairie de Menton",
    timeLabel: "31:32",
    seconds: 1892,
    imageSrc:
      "/menton-france-walking-tour-2025/highlights/menton-mairie-de-menton-town-hall-building.jpg",
    alt: "Mairie de Menton building",
    description: "The town hall anchors a quieter moment in the walk.",
  },
  {
    title: "Place Ardoino",
    timeLabel: "32:10",
    seconds: 1930,
    imageSrc:
      "/menton-france-walking-tour-2025/highlights/menton-place-ardoono-park.jpg",
    alt: "Place Ardoino in Menton",
    description: "A green pause between the beach edge and the town streets.",
  },
  {
    title: "Plage du Fossan",
    timeLabel: "36:41",
    seconds: 2201,
    imageSrc:
      "/menton-france-walking-tour-2025/highlights/menton-plage-du-fossan-beach.jpg",
    alt: "Plage du Fossan in Menton",
    description: "The shoreline returns with bright light and open sea views.",
  },
  {
    title: "Promenade du Soleil",
    timeLabel: "38:20",
    seconds: 2300,
    imageSrc:
      "/menton-france-walking-tour-2025/highlights/menton-promenade-du-soleil-street.jpg",
    alt: "Promenade du Soleil in Menton",
    description: "A classic Riviera promenade line with beach and road together.",
  },
  {
    title: "Parc Plage de Fossan",
    timeLabel: "43:37",
    seconds: 2617,
    imageSrc:
      "/menton-france-walking-tour-2025/highlights/menton-parc-plage-de-fossan-park.jpg",
    alt: "Parc Plage de Fossan in Menton",
    description: "Palm-lined open space near the waterfront and town center.",
  },
  {
    title: "Quai Napoleon III",
    timeLabel: "48:33",
    seconds: 2913,
    imageSrc:
      "/menton-france-walking-tour-2025/highlights/menton-quai-napoleon-iii.jpg",
    alt: "Quai Napoleon III in Menton",
    description: "The walk follows the harbor side with boats and sea light.",
  },
  {
    title: "Esplanade des Sablettes",
    timeLabel: "59:40",
    seconds: 3580,
    imageSrc:
      "/menton-france-walking-tour-2025/highlights/menton-esplanadee-des-sablettes-street.jpg",
    alt: "Esplanade des Sablettes in Menton",
    description: "Back along the broad waterfront esplanade facing the beach.",
  },
  {
    title: "Quai Imperatrice Eugenie",
    timeLabel: "1:03:05",
    seconds: 3785,
    imageSrc:
      "/menton-france-walking-tour-2025/highlights/menton-quai-imperatrice-eugenie-pier.jpg",
    alt: "Quai Imperatrice Eugenie in Menton",
    description: "The route continues along the water with marina views.",
  },
  {
    title: "Sablettes Beach (West)",
    timeLabel: "1:08:12",
    seconds: 4092,
    imageSrc:
      "/menton-france-walking-tour-2025/highlights/menton-plage-des-sablettes-ouest-beach-2.jpg",
    alt: "Sablettes Beach west section in Menton",
    description: "The beach returns before the second climb into Old Town.",
  },
  {
    title: "Place du Cap",
    timeLabel: "1:11:31",
    seconds: 4291,
    imageSrc:
      "/menton-france-walking-tour-2025/highlights/menton-place-du-cap-town-square.jpg",
    alt: "Place du Cap on the return climb in Menton",
    description: "A second pass through a key square above the seafront.",
  },
  {
    title: "Parvis de la Basilique Saint-Michel",
    timeLabel: "1:15:27",
    seconds: 4527,
    imageSrc:
      "/menton-france-walking-tour-2025/highlights/menton-parvis-de-la-basilique-saint-michel-church.jpg",
    alt: "Parvis de la Basilique Saint-Michel in Menton",
    description: "One of the best viewpoints in town beside the basilica.",
  },
  {
    title: "Rue du Vieux Chateau",
    timeLabel: "1:17:42",
    seconds: 4662,
    imageSrc:
      "/menton-france-walking-tour-2025/highlights/menton-rue-du-vieux-chateau-alley.jpg",
    alt: "Rue du Vieux Chateau in Menton",
    description: "A steeper lane leads up toward the castle ruins overlook.",
  },
  {
    title: "Cimetiere du Vieux Chateau",
    timeLabel: "1:24:46",
    seconds: 5086,
    imageSrc:
      "/menton-france-walking-tour-2025/highlights/menton-cimetiere-du-vieux-chateau-cemetery.jpg",
    alt: "Cimetiere du Vieux Chateau in Menton",
    description: "The high point of the route with broad sea and town views.",
  },
  {
    title: "Rue Longue",
    timeLabel: "1:42:19",
    seconds: 6139,
    imageSrc:
      "/menton-france-walking-tour-2025/highlights/menton-rue-longue-2-street.jpg",
    alt: "Rue Longue later in the walk in Menton",
    description: "The route drops back through the same lively old lanes.",
  },
  {
    title: "Back to the Beach",
    timeLabel: "1:47:44",
    seconds: 6464,
    imageSrc:
      "/menton-france-walking-tour-2025/highlights/menton-blue-sign-buildings.jpg",
    alt: "Back at the beach in Menton",
    description: "The walk finishes where it began beside the sea.",
  },
];

const relatedFranceVideos: RelatedVideo[] = [
  {
    title: "France Walk 1",
    href: "https://youtu.be/oz1Mgu8e1N4",
    description: "Watch another France walking tour on YouTube.",
    thumbnail: "https://i.ytimg.com/vi/oz1Mgu8e1N4/maxresdefault.jpg",
  },
  {
    title: "France Walk 2",
    href: "https://youtu.be/1_XzrxXnwMM",
    description: "Continue exploring France with another long-form walk.",
    thumbnail: "https://i.ytimg.com/vi/1_XzrxXnwMM/maxresdefault.jpg",
  },
  {
    title: "France Walk 3",
    href: "https://youtu.be/ALXKzjfWj8E",
    description: "Open a third related France walk directly on YouTube.",
    thumbnail: "https://i.ytimg.com/vi/ALXKzjfWj8E/maxresdefault.jpg",
  },
];

const topRowStats = [
  { icon: "DATE", label: "Filmed", value: "Tuesday, September 9, 2025" },
  { icon: "TIME", label: "Start Time", value: "1:05 PM" },
  { icon: "AREA", label: "Region", value: "French Riviera" },
  { icon: "WX", label: "Weather", value: "79F / 26C" },
];

const proRatings = [
  {
    category: "Intensity",
    score: 3,
    icon: "I",
    iconClassName: "text-[#8a7a68]",
    activeBarClassName: "bg-[#8a7a68]",
  },
  {
    category: "Scenery",
    score: 5,
    icon: "S",
    iconClassName: "text-[#167fd5]",
    activeBarClassName: "bg-[#167fd5]",
  },
  {
    category: "Crowds",
    score: 3,
    icon: "C",
    iconClassName: "text-[#b7791f]",
    activeBarClassName: "bg-[#d08a2f]",
  },
  {
    category: "History",
    score: 4,
    icon: "H",
    iconClassName: "text-[#167fd5]",
    activeBarClassName: "bg-[#167fd5]",
  },
  {
    category: "Variation",
    score: 5,
    icon: "V",
    iconClassName: "text-[#167fd5]",
    activeBarClassName: "bg-[#167fd5]",
  },
];

export default function MentonFranceWalkingTour2025Page() {
  const [isRatingsOpen, setIsRatingsOpen] = useState(false);
  const buildYoutubeEmbedUrl = (start: number, autoplay: boolean) =>
    `https://www.youtube.com/embed/${youtubeVideoId}?start=${start}&autoplay=${
      autoplay ? 1 : 0
    }&rel=0&enablejsapi=1&playsinline=1`;
  const initialYoutubeEmbedUrl = buildYoutubeEmbedUrl(0, false);

  const overviewSectionRef = useRef<HTMLElement | null>(null);
  const videoSectionRef = useRef<HTMLDivElement | null>(null);
  const highlightsSectionRef = useRef<HTMLElement | null>(null);
  const highlightsRef = useRef<HTMLDivElement | null>(null);
  const routeMapRef = useRef<HTMLElement | null>(null);
  const licensingHubRef = useRef<HTMLElement | null>(null);
  const relatedToursRef = useRef<HTMLElement | null>(null);
  const ratingsPopoverRef = useRef<HTMLDivElement | null>(null);
  const playerIframeRef = useRef<HTMLIFrameElement | null>(null);
  const playerRef = useRef<YouTubePlayer | null>(null);
  const pendingSeekRef = useRef<number | null>(null);

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      if (
        ratingsPopoverRef.current &&
        !ratingsPopoverRef.current.contains(event.target as Node)
      ) {
        setIsRatingsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsRatingsOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    let isUnmounting = false;

    const initializePlayer = () => {
      if (
        isUnmounting ||
        playerRef.current ||
        !playerIframeRef.current ||
        !window.YT?.Player
      ) {
        return;
      }

      playerRef.current = new window.YT.Player(playerIframeRef.current, {
        events: {
          onReady: () => {
            if (pendingSeekRef.current === null) {
              return;
            }

            const seconds = pendingSeekRef.current;
            pendingSeekRef.current = null;
            playerRef.current?.seekTo(seconds, true);
            playerRef.current?.playVideo();
          },
        },
      });
    };

    const previousReadyHandler = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previousReadyHandler?.();
      initializePlayer();
    };

    if (window.YT?.Player) {
      initializePlayer();
    } else if (
      !document.querySelector('script[src="https://www.youtube.com/iframe_api"]')
    ) {
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

    if (playerRef.current) {
      pendingSeekRef.current = null;
    }

    setTimeout(() => {
      videoSectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 50);
  };

  const scrollToOverview = () => {
    overviewSectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const scrollHighlights = (direction: "left" | "right") => {
    if (!highlightsRef.current) {
      return;
    }

    highlightsRef.current.scrollBy({
      left: direction === "left" ? -340 : 340,
      behavior: "smooth",
    });
  };

  const scrollToHighlights = () => {
    highlightsSectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const scrollToRouteMap = () => {
    routeMapRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const scrollToLicensing = () => {
    licensingHubRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const scrollToRelatedTours = () => {
    relatedToursRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="min-h-screen bg-[#fcfaf6] text-[#3d3327]">
      <section className="sticky top-16 z-40 border-y border-[#7f5f49] bg-[#3d3327]/95 text-white backdrop-blur">
        <nav className="mx-auto grid max-w-6xl grid-cols-[1fr_auto] items-center px-6 py-2 sm:py-3 lg:px-10">
          <div className="justify-self-end sm:justify-self-start">
            <div className="flex min-w-max items-center gap-4 text-xs font-semibold text-white/90 sm:gap-6 sm:text-sm">
              <button
                onClick={scrollToOverview}
                className="hidden transition hover:text-white sm:inline-flex"
                type="button"
              >
                Overview
              </button>
              <button
                onClick={scrollToHighlights}
                className="hidden transition hover:text-white sm:inline-flex"
                type="button"
              >
                Highlights
              </button>
              <button
                onClick={scrollToRouteMap}
                className="hidden transition hover:text-white sm:inline-flex"
                type="button"
              >
                Route Map
              </button>
              <button
                onClick={scrollToLicensing}
                className="hidden transition hover:text-white sm:inline-flex"
                type="button"
              >
                Licensing
              </button>
              <button
                onClick={scrollToRelatedTours}
                className="hidden transition hover:text-white sm:inline-flex"
                type="button"
              >
                Related Tours
              </button>
            </div>
          </div>

          <div className="hidden shrink-0 items-center gap-2 rounded-full border border-[#8f735c] bg-[#4a3c2f] px-3 py-1.5 text-sm font-semibold text-white/90 md:flex">
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

      <section
        id="overview"
        ref={overviewSectionRef}
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
                France Walk
              </p>
              <h1 className="mt-3 text-4xl font-bold tracking-tight text-[#3d3327] sm:text-5xl">
                Menton, France Walking Tour
              </h1>
              <p className="mt-3 text-xl text-[#6e5a45]">
                Old Town, Seafront, and Castle Views
              </p>
              <p className="mt-6 max-w-3xl text-base leading-8 text-[#56493a]">
                This walk begins on the beach beside the iconic blue Menton sign,
                then climbs the historic donkey steps, winds through the colorful
                alleys of Old Town, and rises to stunning sea views from the castle
                ruins at Cimetiere du Vieux Chateau. The walk then returns through
                town and ends back at the beach.
              </p>
              <p className="mt-4 max-w-3xl text-base leading-8 text-[#56493a]">
                If you are dreaming of the French Riviera, or just need a little
                sunny escape, come along for the walk.
              </p>

              <div className="mt-8 space-y-4 border-y border-[#d8c7b5]/80 py-4 text-[#3d3327]">
                <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                  {topRowStats.map((stat) => (
                    <div
                      key={stat.label}
                      className="inline-flex min-w-0 items-center gap-3"
                    >
                      <span
                        aria-hidden="true"
                        className="text-[11px] font-bold uppercase leading-none text-[#8a7a68]"
                      >
                        {stat.icon}
                      </span>
                      <div className="flex min-w-0 items-baseline gap-2">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#9a735a]">
                          {stat.label}
                        </p>
                        <p className="text-sm font-bold leading-6 text-[#3d3327] sm:text-[15px]">
                          {stat.value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div
                  ref={ratingsPopoverRef}
                  className="relative inline-flex min-w-0 items-center gap-3"
                  onMouseEnter={() => setIsRatingsOpen(true)}
                  onMouseLeave={() => setIsRatingsOpen(false)}
                >
                  <button
                    type="button"
                    className="inline-flex min-w-0 items-center gap-3 rounded-full transition hover:text-[#167fd5]"
                    onClick={() => setIsRatingsOpen((open) => !open)}
                    onFocus={() => setIsRatingsOpen(true)}
                    aria-expanded={isRatingsOpen}
                    aria-haspopup="dialog"
                  >
                    <span
                      aria-hidden="true"
                      className="text-[11px] font-bold uppercase leading-none text-[#8a7a68]"
                    >
                      RATE
                    </span>
                    <span className="flex min-w-0 items-baseline gap-2">
                      <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#9a735a]">
                        Overall Score
                      </span>
                      <span className="text-base font-bold leading-6 text-[#3d3327] sm:text-lg">
                        4.6 / 5
                      </span>
                    </span>
                  </button>

                  {isRatingsOpen ? (
                    <div className="absolute left-0 top-full z-20 mt-3 w-[min(22rem,calc(100vw-3rem))] rounded-[1.5rem] border border-[#d8c7b5] bg-white/95 p-4 shadow-xl backdrop-blur-sm">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9a735a]">
                        ProWalk Rating
                      </p>
                      <div className="mt-3 space-y-3">
                        {proRatings.map((rating) => (
                          <div
                            key={rating.category}
                            className="flex items-center justify-between gap-4"
                          >
                            <div className="inline-flex min-w-0 items-center gap-2">
                              <span
                                aria-hidden="true"
                                className={`text-[11px] leading-none ${rating.iconClassName}`}
                              >
                                {rating.icon}
                              </span>
                              <span className="text-sm font-semibold text-[#3d3327]">
                                {rating.category}
                              </span>
                            </div>
                            <div className="inline-flex items-center gap-2">
                              <div
                                className="flex items-center gap-1"
                                aria-label={`${rating.category} rating ${rating.score} out of 5`}
                              >
                                {[1, 2, 3, 4, 5].map((segment) => (
                                  <span
                                    key={segment}
                                    className={`h-1.5 w-4 rounded-full ${
                                      segment <= rating.score
                                        ? rating.activeBarClassName
                                        : "bg-[#d9c9b5]"
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-sm font-bold text-[#3d3327]">
                                {rating.score}/5
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="relative hidden overflow-hidden rounded-[2rem] border border-[#d8c7b5] bg-white shadow-sm lg:block">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={heroImageSrc}
                  alt="Menton waterfront and Old Town on the French Riviera"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        ref={videoSectionRef}
        className="mx-auto max-w-6xl px-6 pb-6 pt-6 lg:px-10 lg:pb-6 lg:pt-14"
      >
        <div className="overflow-hidden rounded-[2rem] border border-[#d8c7b5] shadow-lg">
          <div className="aspect-video w-full bg-black">
            <iframe
              ref={playerIframeRef}
              className="h-full w-full"
              src={initialYoutubeEmbedUrl}
              title="Menton France walking tour"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      <section
        id="highlights"
        ref={highlightsSectionRef}
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

          <div className="hidden items-center gap-3 md:flex">
            <button
              onClick={() => scrollHighlights("left")}
              className="rounded-full border border-[#cdb7a0] bg-white px-4 py-3 text-2xl font-semibold text-[#7f5f49] shadow-sm transition hover:border-[#9a735a] hover:bg-[#fff7ee]"
              aria-label="Scroll highlights left"
            >
              &lt;
            </button>
            <button
              onClick={() => scrollHighlights("right")}
              className="rounded-full border border-[#cdb7a0] bg-white px-4 py-3 text-2xl font-semibold text-[#7f5f49] shadow-sm transition hover:border-[#9a735a] hover:bg-[#fff7ee]"
              aria-label="Scroll highlights right"
            >
              &gt;
            </button>
          </div>
        </div>

        <div
          ref={highlightsRef}
          className="mt-8 flex gap-4 overflow-x-auto scroll-smooth pb-2"
        >
          {highlights.map((highlight) => (
            <div
              key={`${highlight.title}-${highlight.seconds}`}
              className="w-[280px] shrink-0"
            >
              <button
                onClick={() => handleHighlightClick(highlight.seconds)}
                className="w-full overflow-hidden rounded-[1.5rem] border border-[#d8c7b5] bg-white text-left shadow-sm transition hover:-translate-y-1 hover:border-[#167fd5] hover:shadow-lg"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={highlight.imageSrc}
                    alt={highlight.alt}
                    fill
                    sizes="280px"
                    className="object-cover transition duration-300 hover:scale-105"
                  />
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
        ref={routeMapRef}
        className="scroll-mt-32 mx-auto max-w-6xl px-6 py-8 lg:px-10 lg:py-10"
      >
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#9a735a]">
          Route map
        </p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#3d3327]">
          Explore the route
        </h2>

        <p className="mt-4 max-w-3xl text-base leading-8 text-[#56493a]">
          This route starts beside the beach and blue Menton sign, climbs through
          the old donkey steps and colorful lanes of Old Town, reaches sweeping
          sea views near Cimetiere du Vieux Chateau, and then works back through
          town to finish at the beach.
        </p>

        <div className="mt-8 overflow-hidden rounded-[2rem] border border-[#d8c7b5] shadow-lg">
          <div className="aspect-[16/9] w-full bg-zinc-100">
            <iframe
              className="h-full w-full"
              src={fullMapEmbedUrl}
              title="Menton walking route map"
            />
          </div>
        </div>

        <div className="mt-6 rounded-[1.75rem] border border-[#d8c7b5] bg-[#fcfaf6] p-5 shadow-sm">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-xl">
              <p className="text-lg font-semibold tracking-tight text-[#3d3327] sm:text-xl">
                Take this route with you
              </p>
              <p className="mt-3 text-[15px] leading-7 text-[#56493a]">
                Scan to open the Menton walking route on your phone using Google
                Maps.
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
              aria-label="Open the Menton route map on your phone"
            >
              <img
                src={fullMapQrUrl}
                alt="QR code for opening the Menton walking route in Google Maps"
                width="132"
                height="132"
                className="h-[132px] w-[132px] rounded-xl"
              />
            </a>
          </div>
        </div>
      </section>

      <section
        id="licensing"
        ref={licensingHubRef}
        className="scroll-mt-32 mx-auto max-w-6xl px-6 pb-14 lg:px-10"
      >
        <div className="rounded-[2rem] border border-[#d8c7b5] bg-[#f7efe4] p-7 shadow-xl lg:p-8">
          <div className="grid gap-7 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#9a735a]">
                Licensing Hub
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#3d3327]">
                License this Menton footage
              </h2>

              <p className="mt-5 max-w-2xl text-base leading-8 text-[#56493a]">
                This Menton walk was filmed as a clean, long-form street and
                seafront record of the French Riviera. It is well suited for travel
                editorial, background plates, tourism storytelling, location
                research, and atmosphere-driven video use.
              </p>

              <p className="mt-5 max-w-2xl text-base leading-8 text-[#56493a]">
                If you need licensed access to this footage for commercial,
                documentary, or creative use, use the licensing page to request a
                quote and describe the exact shots or time ranges you need.
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
                        Rec.709
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-5 flex justify-center">
                <Link
                  href="/licensing"
                  className="inline-flex min-w-[220px] items-center justify-center rounded-2xl bg-[#167fd5] px-8 py-4 text-center text-base font-semibold text-white shadow-sm transition hover:bg-[#09679e]"
                >
                  Request License Quote
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="related-tours"
        ref={relatedToursRef}
        className="scroll-mt-32 mx-auto max-w-6xl px-6 pb-16 lg:px-10"
      >
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#9a735a]">
          Related France Videos
        </p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#3d3327]">
          Explore more from France
        </h2>

        <p className="mt-4 max-w-3xl text-base leading-8 text-[#56493a]">
          Continue exploring France with more walking tours on YouTube.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {relatedFranceVideos.map((tour) => (
            <a
              key={tour.href}
              href={tour.href}
              target="_blank"
              rel="noreferrer"
              className="group rounded-[1.5rem] border border-[#d8c7b5] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-[#167fd5] hover:shadow-lg"
            >
              <div className="mb-4 overflow-hidden rounded-[1rem] border border-[#eadfce]">
                <img
                  src={tour.thumbnail}
                  alt={`${tour.title} video thumbnail`}
                  className="aspect-video w-full object-cover"
                  loading="lazy"
                  onError={(event) => {
                    const image = event.currentTarget;
                    image.onerror = null;
                    image.src = tour.thumbnail.replace(
                      "/maxresdefault.jpg",
                      "/hqdefault.jpg"
                    );
                  }}
                />
              </div>
              <p className="text-sm font-semibold text-[#3d3327]">{tour.title}</p>
              <p className="mt-2 text-sm leading-7 text-[#6e5a45]">
                {tour.description}
              </p>
              <p className="mt-4 text-sm font-semibold text-[#167fd5]">
                Watch on YouTube -&gt;
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
                Get updates when new walks, night tours, 360 videos, and
                destination pages go live on ProWalk Tours.
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

            <form
              onSubmit={(event) => {
                event.preventDefault();
                alert(
                  "This sign-up box is just the layout for now. It still needs to be connected to an email service."
                );
              }}
              className="rounded-[1.75rem] border border-[#d8c7b5] bg-white p-6 shadow-sm"
            >
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
                  type="submit"
                  className="mt-2 rounded-2xl bg-[#167fd5] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#09679e]"
                >
                  Notify Me
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
