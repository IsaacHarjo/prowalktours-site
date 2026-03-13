"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { naplesDaytimeWalk2023Detail } from "../../../data/video-details/naples-daytime-walk-2023";
import { videos } from "../../../data/videos/index";

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

export default function NaplesDaytimeWalk2023Page() {
  const [isRatingsOpen, setIsRatingsOpen] = useState(false);
  const buildYoutubeEmbedUrl = (start: number, autoplay: boolean) =>
    `https://www.youtube.com/embed/990AqbKb18c?start=${start}&autoplay=${
      autoplay ? 1 : 0
    }&rel=0&enablejsapi=1&playsinline=1`;
  const initialYoutubeEmbedUrl = buildYoutubeEmbedUrl(0, false);
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Countries", href: "/countries" },
    { label: "Italy", href: "/destinations/italy" },
    { label: "Campania", href: "/destinations/italy/campania" },
    { label: "Naples", href: "/destinations/italy/campania/naples" },
    { label: "Naples Day Walk (July 2023)" },
  ];

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

  const highlights = naplesDaytimeWalk2023Detail.highlights;

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
    if (!highlightsRef.current) return;

    const amount = 340;
    highlightsRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
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
  const scrollToLicensingHub = () => {
  licensingHubRef.current?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};

  const techBadges = [
    "4K UHD",
    "59.94fps",
    "2-Channel LPCM16",
    "Sony A7S III",
    "Sony 16–35mm PZ",
    "HLG / Rec.2020",
    "Raw Footage Available",
  ];

  const gearBadges = ["Sony A7S III", "Sony 16-35mm PZ"];
  const formatBadges = [
    "4K UHD",
    "59.94fps",
    "2-Channel LPCM16",
    "HLG / Rec.2020",
    "Raw Footage Available",
  ];

  const proRatings = [
    {
      category: "Intensity",
      score: 2,
      icon: "◦",
      iconClassName: "text-[#8a7a68]",
      activeBarClassName: "bg-[#8a7a68]",
      description: "A steady, long-form walk but lacks major climbs.",
    },
    {
      category: "Scenery",
      score: 5,
      icon: "✦",
      iconClassName: "text-[#167fd5]",
      activeBarClassName: "bg-[#167fd5]",
      description:
        "Sweeping bay views and the dense, textured streets of the Old Town.",
    },
    {
      category: "Crowds",
      score: 4,
      icon: "◌",
      iconClassName: "text-[#b7791f]",
      activeBarClassName: "bg-[#d08a2f]",
      description: "High energy; expect heavy foot traffic in the markets.",
    },
    {
      category: "History",
      score: 5,
      icon: "▦",
      iconClassName: "text-[#167fd5]",
      activeBarClassName: "bg-[#167fd5]",
      description:
        "Passes through the UNESCO World Heritage heart of Naples.",
    },
    {
      category: "Variation",
      score: 4,
      icon: "✳",
      iconClassName: "text-[#167fd5]",
      activeBarClassName: "bg-[#167fd5]",
      description: "Endless side alleys to explore if you go off-script.",
    },
  ];

  const fullMapUrl =
    "https://www.google.com/maps/d/edit?mid=1E_nqyiPSRDss1zSiWuRzH2bBrAm3tBU&usp=sharing";
  const fullMapQrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(fullMapUrl)}`;
  const naplesVideo = videos.find(
    (video) => video.slug === "naples-daytime-walk-2023"
  );
  const pageTitle = naplesVideo?.siteTitle ?? naplesDaytimeWalk2023Detail.heroTitle;
  const pageSubtitle = naplesDaytimeWalk2023Detail.heroSubtitle;
  const pageShortDescription = naplesDaytimeWalk2023Detail.heroDescription;
  const topRowStats = [
    {
      icon: "📅",
      label: "Date",
      value: "July 6, 2023 / July 22, 2023 / July 23, 2023",
    },
    { icon: "📏", label: "Distance", value: "8.3 mi / 13.3 km" },
    { icon: "🕒", label: "Duration", value: "5h 45m" },
    { icon: "☀️", label: "Weather", value: naplesVideo?.weather ?? "Sunny, 90°F / 32°C" },
  ];
  const overallScoreStat = {
    icon: "⭐",
    label: "Overall Score",
    value: "4.2 / 5",
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

    <div className="hidden justify-self-end md:flex shrink-0 items-center gap-2 rounded-full border border-[#8f735c] bg-[#4a3c2f] px-3 py-1.5 text-sm font-semibold text-white/90">
      <div className="h-4 w-6 overflow-hidden rounded-[2px] border border-white/20">
        <div className="grid h-full grid-cols-3">
          <div className="bg-green-600" />
          <div className="bg-white" />
          <div className="bg-red-600" />
        </div>
      </div>
      <span>Italy</span>
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
              <div
                key={item.label}
                className="inline-flex items-center gap-2"
              >
                {item.href ? (
                  <a
                    href={item.href}
                    className="transition hover:text-[#167fd5]"
                  >
                    {item.label}
                  </a>
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
      {naplesDaytimeWalk2023Detail.heroEyebrow}
    </p>

    <h1 className="mt-3 text-4xl font-bold tracking-tight text-[#3d3327] sm:text-5xl">
      {pageTitle}
    </h1>

    <p className="mt-3 text-xl text-[#6e5a45]">
      {pageSubtitle}
    </p>

    <p className="mt-6 max-w-3xl text-base leading-8 text-[#56493a]">
      {pageShortDescription}
    </p>
    <div className="mt-8 space-y-4 border-y border-[#d8c7b5]/80 py-4 text-[#3d3327]">
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
        {topRowStats.map((stat) => (
          <div
            key={stat.label}
            className="inline-flex min-w-0 items-center gap-3"
          >
            <span aria-hidden="true" className="text-base leading-none">
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
          <span aria-hidden="true" className="text-base leading-none">
            {overallScoreStat.icon}
          </span>
          <span className="flex min-w-0 items-baseline gap-2">
            <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#9a735a]">
              {overallScoreStat.label}
            </span>
            <span className="text-base font-bold leading-6 text-[#3d3327] sm:text-lg">
              {overallScoreStat.value}
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
        src="/naples-day-july-2023/naples-iconic-view.jpg"
        alt="Panoramic view of Naples, the bay, and Mount Vesuvius from above the waterfront"
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
        className="mx-auto max-w-6xl px-6 pt-6 pb-6 lg:px-10 lg:pt-14 lg:pb-6"
      >
        <div className="overflow-hidden rounded-[2rem] border border-[#d8c7b5] shadow-lg">
          <div className="aspect-video w-full bg-black">
            <iframe
              ref={playerIframeRef}
              className="h-full w-full"
              src={initialYoutubeEmbedUrl}
              title="Naples Italy ASMR walking tour"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>

        <div className="hidden">
          <a
            href="https://www.youtube.com/@ProWalkTours?sub_confirmation=1"
            target="_blank"
            rel="noreferrer"
            className="inline-flex w-full items-center justify-center rounded-2xl bg-[#d52b1e] px-6 py-4 text-center text-base font-bold text-white shadow-lg transition hover:bg-[#b82217] sm:w-auto"
          >
            Join the Journey — Subscribe to ProWalk Tours
          </a>
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
              Jump to major landmarks
            </h2>
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <button
              onClick={() => scrollHighlights("left")}
              className="rounded-full border border-[#cdb7a0] bg-white px-4 py-3 text-2xl font-semibold text-[#7f5f49] shadow-sm transition hover:border-[#9a735a] hover:bg-[#fff7ee]"
              aria-label="Scroll highlights left"
            >
              ‹
            </button>
            <button
              onClick={() => scrollHighlights("right")}
              className="rounded-full border border-[#cdb7a0] bg-white px-4 py-3 text-2xl font-semibold text-[#7f5f49] shadow-sm transition hover:border-[#9a735a] hover:bg-[#fff7ee]"
              aria-label="Scroll highlights right"
            >
              ›
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

                  <p className="mt-2 text-sm leading-6 text-[#6e5a45]">
                    {highlight.caption}
                  </p>

                  {highlight.proTip ? (
                    <p className="mt-3 text-sm leading-6 text-[#56493a]">
                      <span className="font-semibold text-[#3d3327]">
                        {highlight.proTip.label}:
                      </span>{" "}
                      {highlight.proTip.text}
                    </p>
                  ) : null}
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
          {naplesDaytimeWalk2023Detail.routeMapDescription}
        </p>

        <div className="mt-8 overflow-hidden rounded-[2rem] border border-[#d8c7b5] shadow-lg">
          <div className="aspect-[16/9] w-full bg-zinc-100">
            <iframe
              className="h-full w-full"
              src="https://www.google.com/maps/d/u/0/embed?mid=1E_nqyiPSRDss1zSiWuRzH2bBrAm3tBU"
              title="Naples walking route map"
            />
          </div>
        </div>

        <div className="mt-6 rounded-[1.75rem] border border-[#d8c7b5] bg-[#fcfaf6] p-5 shadow-sm">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-xl">
              <p className="text-lg font-semibold tracking-tight text-[#3d3327] sm:text-xl">
                📱 Take this route with you
              </p>
              <p className="mt-3 text-[15px] leading-7 text-[#56493a]">
                Scan to open the Naples walking route on your phone using
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
              aria-label="Open the Naples route map on your phone"
            >
              <img
                src={fullMapQrUrl}
                alt="QR code for opening the Naples walking route in Google Maps"
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
                License this Naples footage
              </h2>

              <p className="mt-5 max-w-2xl text-base leading-8 text-[#56493a]">
                {naplesDaytimeWalk2023Detail.licensingDescription[0]}
              </p>

              <p className="mt-5 max-w-2xl text-base leading-8 text-[#56493a]">
                {naplesDaytimeWalk2023Detail.licensingDescription[1]}
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
                      <span className="mt-1 block text-sm font-semibold text-[#5c4c33] underline-offset-4 transition hover:text-[#167fd5]">
                        Sony A7S III
                      </span>
                    </div>
                    <div className="border-b border-[#efe3d3] pb-3">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#9a735a]">
                        Lens
                      </p>
                      <span className="mt-1 block text-sm font-semibold text-[#5c4c33] underline-offset-4 transition hover:text-[#167fd5]">
                        Sony FE PZ 16-35mm G
                      </span>
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#9a735a]">
                        Microphone
                      </p>
                      <span className="mt-1 block text-sm font-semibold text-[#5c4c33] underline-offset-4 transition hover:text-[#167fd5]">
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
                        HLG / Rec.2020 HDR
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
  ref={relatedToursRef}
  className="scroll-mt-32 mx-auto max-w-6xl px-6 pb-16 lg:px-10"
>
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#9a735a]">
          Related Naples Tours
        </p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#3d3327]">
          Explore more from Naples
        </h2>

        <p className="mt-4 max-w-3xl text-base leading-8 text-[#56493a]">
          Continue exploring Naples with more walks, immersive videos, and
          specialty tours from the city.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <a
            href="/destinations/italy/campania/naples"
            className="group rounded-[1.5rem] border border-[#d8c7b5] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-[#167fd5] hover:shadow-lg"
          >
            <div className="mb-4 overflow-hidden rounded-[1rem] border border-[#eadfce]">
              <img
                src="https://i.ytimg.com/vi/Cv1zIRhxvHU/maxresdefault.jpg"
                alt="Naples Night Walk video thumbnail"
                className="aspect-video w-full object-cover"
                loading="lazy"
                onError={(event) => {
                  const image = event.currentTarget;
                  image.onerror = null;
                  image.src = "https://i.ytimg.com/vi/Cv1zIRhxvHU/hqdefault.jpg";
                }}
              />
            </div>
            <p className="text-sm font-semibold text-[#3d3327]">
              Naples Night Walk
            </p>
            <p className="mt-2 text-sm leading-7 text-[#6e5a45]">
              Explore Naples after dark with evening atmosphere, lit streets,
              and neighborhood energy.
            </p>
            <p className="mt-4 text-sm font-semibold text-[#167fd5]">
              View tour →
            </p>
          </a>

          <a
            href="/destinations/italy/campania/naples"
            className="group rounded-[1.5rem] border border-[#d8c7b5] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-[#167fd5] hover:shadow-lg"
          >
            <div className="mb-4 overflow-hidden rounded-[1rem] border border-[#eadfce]">
              <img
                src="/naples-day-july-2023/naples-360-tour-thumbnail.jpg"
                alt="Naples 360 Tour video thumbnail"
                className="aspect-video w-full object-cover"
                loading="lazy"
              />
            </div>
            <p className="text-sm font-semibold text-[#3d3327]">
              Naples 360 Tour
            </p>
            <p className="mt-2 text-sm leading-7 text-[#6e5a45]">
              Immerse yourself in Naples with interactive 360-degree views and
              street-level exploration.
            </p>
            <p className="mt-4 text-sm font-semibold text-[#167fd5]">
              View tour →
            </p>
          </a>

          <a
            href="/destinations/italy/campania/naples"
            className="group rounded-[1.5rem] border border-[#d8c7b5] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-[#167fd5] hover:shadow-lg"
          >
            <p className="text-sm font-semibold text-[#3d3327]">
              Naples Drone Tour
            </p>
            <p className="mt-2 text-sm leading-7 text-[#6e5a45]">
              See Naples from above with cinematic aerial views of the city,
              bay, and waterfront.
            </p>
            <p className="mt-4 text-sm font-semibold text-[#167fd5]">
              View tour →
            </p>
          </a>

          <a
            href="/destinations/italy/campania/naples"
            className="group rounded-[1.5rem] border border-[#d8c7b5] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-[#167fd5] hover:shadow-lg"
          >
            <div className="mb-4 overflow-hidden rounded-[1rem] border border-[#eadfce]">
              <img
                src="https://i.ytimg.com/vi/IHXZnU2bmc8/maxresdefault.jpg"
                alt="Naples Biking Tour video thumbnail"
                className="aspect-video w-full object-cover"
                loading="lazy"
                onError={(event) => {
                  const image = event.currentTarget;
                  image.onerror = null;
                  image.src = "https://i.ytimg.com/vi/IHXZnU2bmc8/hqdefault.jpg";
                }}
              />
            </div>
            <p className="text-sm font-semibold text-[#3d3327]">
              Naples Biking Tour
            </p>
            <p className="mt-2 text-sm leading-7 text-[#6e5a45]">
              Ride through Naples with fast-moving street scenes, neighborhood
              energy, and waterfront views across the city.
            </p>
            <p className="mt-4 text-sm font-semibold text-[#167fd5]">
              View tour →
            </p>
          </a>
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
          Don’t miss the next walk
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-8 text-[#56493a]">
          Get updates when new walks, night tours, 360 videos, and destination
          pages go live on Prowalk Tours.
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
          Join the Journey — Subscribe to ProWalk Tours
        </a>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
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


