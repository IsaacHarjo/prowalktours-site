"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function NaplesDaytimeWalk2023Page() {
  const [currentStart, setCurrentStart] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRatingsOpen, setIsRatingsOpen] = useState(false);

const overviewSectionRef = useRef<HTMLElement | null>(null);
const videoSectionRef = useRef<HTMLDivElement | null>(null);
const highlightsSectionRef = useRef<HTMLElement | null>(null);
const highlightsRef = useRef<HTMLDivElement | null>(null);
const routeMapRef = useRef<HTMLElement | null>(null);
const licensingHubRef = useRef<HTMLElement | null>(null);
const relatedToursRef = useRef<HTMLElement | null>(null);
const ratingsPopoverRef = useRef<HTMLDivElement | null>(null);

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

  const highlights = [
    {
      title: "Pignasecca Market",
      timeLabel: "7:21",
      seconds: 441,
      imageSrc: "/naples-day-july-2023/highlights/pignasecca.jpg",
      alt: "Pignasecca Market in Naples",
    },
    {
      title: "Spaccanapoli",
      timeLabel: "28:05",
      seconds: 1685,
      imageSrc: "/naples-day-july-2023/highlights/spaccanapoli.jpg",
      alt: "Spaccanapoli in Naples",
    },
    {
      title: "Leather Shop",
      timeLabel: "30:44",
      seconds: 1844,
      imageSrc: "/naples-day-july-2023/highlights/leather-shop.jpg",
      alt: "Leather shop in Naples",
    },
    {
      title: "Gesù Nuovo",
      timeLabel: "35:48",
      seconds: 2148,
      imageSrc: "/naples-day-july-2023/highlights/gesu-nuovo.jpg",
      alt: "Gesù Nuovo in Naples",
    },
    {
      title: "Palazzo Venezia",
      timeLabel: "59:20",
      seconds: 3560,
      imageSrc: "/naples-day-july-2023/highlights/palazzo-venezia.jpg",
      alt: "Palazzo Venezia in Naples",
    },
    {
      title: "Piazza San Domenico Maggiore",
      timeLabel: "1:09:47",
      seconds: 4187,
      imageSrc: "/naples-day-july-2023/highlights/piazza-san-domenico-maggiore.jpg",
      alt: "Piazza San Domenico Maggiore in Naples",
    },
    {
      title: "Doll Hospital",
      timeLabel: "1:29:17",
      seconds: 5357,
      imageSrc: "/naples-day-july-2023/highlights/doll-hospital.jpg",
      alt: "Doll Hospital in Naples",
    },
    {
      title: "Via dei Tribunali",
      timeLabel: "1:48:40",
      seconds: 6520,
      imageSrc: "/naples-day-july-2023/highlights/via-dei-tribunali.jpg",
      alt: "Via dei Tribunali in Naples",
    },
    {
      title: "Duomo di Napoli",
      timeLabel: "1:50:18",
      seconds: 6618,
      imageSrc: "/naples-day-july-2023/highlights/duomo.jpg",
      alt: "Duomo di Napoli",
    },
    {
      title: "San Lorenzo Maggiore",
      timeLabel: "2:14:59",
      seconds: 8099,
      imageSrc: "/naples-day-july-2023/highlights/san-lorenzo-maggiore.jpg",
      alt: "San Lorenzo Maggiore in Naples",
    },
    {
      title: "San Gregorio Armeno",
      timeLabel: "2:22:39",
      seconds: 8559,
      imageSrc: "/naples-day-july-2023/highlights/san-gregorio-armeno.jpg",
      alt: "San Gregorio Armeno in Naples",
    },
    {
      title: "Bust of Pulcinella",
      timeLabel: "2:48:56",
      seconds: 10136,
      imageSrc: "/naples-day-july-2023/highlights/bust-of-pulcinella.jpg",
      alt: "Bust of Pulcinella in Naples",
    },
    {
      title: "Piazza Vincenzo Bellini",
      timeLabel: "2:57:33",
      seconds: 10653,
      imageSrc: "/naples-day-july-2023/highlights/piazza-vincenzo-bellini.jpg",
      alt: "Piazza Vincenzo Bellini in Naples",
    },
    {
      title: "Via Port’Alba",
      timeLabel: "3:03:09",
      seconds: 10989,
      imageSrc: "/naples-day-july-2023/highlights/via-portalba.jpg",
      alt: "Via Port'Alba in Naples",
    },
    {
      title: "Piazza Dante",
      timeLabel: "3:06:24",
      seconds: 11184,
      imageSrc: "/naples-day-july-2023/highlights/piazza-dante.jpg",
      alt: "Piazza Dante in Naples",
    },
    {
      title: "National Archaeological Museum",
      timeLabel: "3:16:09",
      seconds: 11769,
      imageSrc: "/naples-day-july-2023/highlights/archaeological-museum.jpg",
      alt: "National Archaeological Museum of Naples",
    },
    {
      title: "Largo Maradona",
      timeLabel: "4:18:41",
      seconds: 15521,
      imageSrc: "/naples-day-july-2023/highlights/largo-maradona.jpg",
      alt: "Largo Maradona in Naples",
    },
    {
      title: "Piazza del Plebiscito",
      timeLabel: "4:53:22",
      seconds: 17602,
      imageSrc: "/naples-day-july-2023/highlights/piazza-del-plebiscito.jpg",
      alt: "Piazza del Plebiscito in Naples",
    },
    {
      title: "Castel dell’Ovo",
      timeLabel: "5:18:53",
      seconds: 19133,
      imageSrc: "/naples-day-july-2023/highlights/castel-dellovo.jpg",
      alt: "Castel dell'Ovo in Naples",
    },
  ];

  const handleHighlightClick = (seconds: number) => {
    setCurrentStart(seconds);
    setIsPlaying(true);
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

  const youtubeEmbedUrl = `https://www.youtube.com/embed/990AqbKb18c?start=${currentStart}&autoplay=${isPlaying ? 1 : 0}&rel=0`;

  const techBadges = [
    "4K UHD",
    "59.94fps",
    "2-Channel LPCM16",
    "Sony A7S III",
    "Sony 16–35mm PZ",
    "HLG / Rec.2020",
    "Raw Footage Available",
  ];

  

  const inlineWalkStats = [
    { icon: "📅", label: "Date", value: "Filmed on July 6, 2023 � July 22, 2023 � July 23, 2023" },
    { icon: "📏", label: "Distance", value: "8.3 mi / 13.3 km" },
    { icon: "🕒", label: "Duration", value: "5h 45m" },
    { icon: "🚶", label: "Pace", value: "Leisurely" },
    { icon: "☀️", label: "Vibe", value: "Vibrant / Sunny" },
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

  const topInlineStats = [
    { icon: "📅", label: "Date", value: "Filmed on July 6, 2023 � July 22, 2023 � July 23, 2023" },
    { icon: "📏", label: "Distance", value: "8.3 mi / 13.3 km" },
    { icon: "🕒", label: "Duration", value: "5h 45m" },
    { icon: "🚶", label: "Pace", value: "Leisurely" },
    { icon: "☀️", label: "Vibe", value: "Vibrant / Sunny" },
    { icon: "⭐", label: "Overall Score", value: "4.0 / 5" },
  ];

  const fullMapUrl =
    "https://www.google.com/maps/d/edit?mid=1E_nqyiPSRDss1zSiWuRzH2bBrAm3tBU&usp=sharing";
  const fullMapQrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(fullMapUrl)}`;
  const visibleTopInlineStats = [
    { icon: "📅", label: "Date", value: "Filmed on July 6, 2023 � July 22, 2023 � July 23, 2023" },
    { icon: "📏", label: "Distance", value: "8.3 mi / 13.3 km" },
    { icon: "🕒", label: "Duration", value: "5h 45m" },
    { icon: "🚶", label: "Pace", value: "Leisurely" },
    { icon: "☀️", label: "Vibe", value: "Vibrant / Sunny" },
    { icon: "⭐", label: "Overall Score", value: "4.2 / 5" },
  ];

  const topRowStats = [
    {
      icon: "📅",
      label: "Date",
      value: "July 6, 2023 / July 22, 2023 / July 23, 2023",
    },
    { icon: "📏", label: "Distance", value: "8.3 mi / 13.3 km" },
    { icon: "🕒", label: "Duration", value: "5h 45m" },
    { icon: "☀️", label: "Vibe", value: "Vibrant / Sunny" },
    { icon: "🚶", label: "Pace", value: "Leisurely" },
  ];
  const overallScoreStat = {
    icon: "⭐",
    label: "Overall Score",
    value: "4.2 / 5",
  };

  return (
    <div className="min-h-screen bg-[#fcfaf6] text-[#3d3327]">
       <section className="sticky top-16 z-40 border-y border-[#7f5f49] bg-[#3d3327]/95 text-white backdrop-blur">
  <nav className="mx-auto grid max-w-6xl grid-cols-[1fr_auto] items-center px-6 py-2 sm:grid-cols-[1fr_auto_1fr] sm:py-3 lg:px-10">
    <div className="justify-self-start">
      <a
        href="/destinations/italy/campania/naples"
        className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-[#8f735c] bg-[#4a3c2f] px-3 py-1.5 text-sm font-semibold text-white/90 transition hover:bg-[#5a4838] hover:text-white"
      >
        <span aria-hidden="true">←</span>
        <span>Back to Naples</span>
      </a>
    </div>

    <div className="justify-self-end sm:justify-self-center">
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

        <a
          href="https://youtu.be/990AqbKb18c"
          target="_blank"
          rel="noreferrer"
          className="whitespace-nowrap transition hover:text-white"
        >
          Watch on YouTube
        </a>
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
        

          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
  <div className="min-w-0">
    <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#9a735a]">
      Featured Naples Walk
    </p>

    <h1 className="mt-3 text-4xl font-bold tracking-tight text-[#3d3327] sm:text-5xl">
      Naples, Italy — July 2023
    </h1>

    <p className="mt-3 text-xl text-[#6e5a45]">
      Historic Center, Sanità & Waterfront
    </p>

    <p className="mt-6 max-w-3xl text-base leading-8 text-[#56493a]">
      Explore Naples from Montesanto through the historic center,
      Sanità, the Spanish Quarter, and the waterfront in this immersive
      long-form walking tour filmed over two days in July 2023. Along
      the route, you’ll pass markets, churches, piazzas, narrow
      historic streets, panoramic viewpoints, and the bay near Castel
      dell’Ovo.
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
        alt="The Iconic View of Naples Italy"
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
              key={`${currentStart}-${isPlaying ? "play" : "pause"}`}
              className="h-full w-full"
              src={youtubeEmbedUrl}
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
            <button
              key={`${highlight.title}-${highlight.seconds}`}
              onClick={() => handleHighlightClick(highlight.seconds)}
              className="group w-[280px] shrink-0 overflow-hidden rounded-[1.5rem] border border-[#d8c7b5] bg-white text-left shadow-sm transition hover:-translate-y-1 hover:border-[#167fd5] hover:shadow-lg"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
  src={highlight.imageSrc}
  alt={highlight.alt}
  fill
  sizes="280px"
  className="object-cover transition duration-300 group-hover:scale-105"
/>
              </div>

              <div className="p-4">
                <p className="text-sm font-semibold text-[#3d3327]">
                  {highlight.title}
                </p>
                <p className="mt-1 text-sm text-[#8a7a68]">
                  {highlight.timeLabel}
                </p>
              </div>
            </button>
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
          This walk begins near Montesanto and crosses the historic center,
          Sanità, the Spanish Quarter, and the waterfront.
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
                Google My Maps.
              </p>
              <a
                href={fullMapUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center justify-center rounded-full border border-[#167fd5] bg-white px-4 py-2 text-sm font-semibold text-[#167fd5] shadow-sm transition hover:bg-[#edf6fd]"
              >
                Open the route in Google My Maps
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
                alt="QR code linking to the Naples Google My Map"
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
        <div className="rounded-[2rem] border border-[#d8c7b5] bg-[#f7efe4] p-8 shadow-xl lg:p-10">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#9a735a]">
                Licensing Hub
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#3d3327]">
                License this Naples footage
              </h2>

              <p className="mt-5 max-w-2xl text-base leading-8 text-[#56493a]">
                Interested in licensing footage from this Naples walk for
                documentaries, television, travel programming, websites,
                editorial, or commercial projects? This page features long-form
                city footage from the historic center, Sanità, markets,
                churches, waterfront scenes, and views near Castel dell’Ovo.
              </p>

              <p className="mt-5 max-w-2xl text-base leading-8 text-[#56493a]">
                Additional Naples material, including supporting visuals and
                other Naples walks, may also be available on request.
              </p>
            </div>

            <div className="rounded-[1.75rem] border border-[#d8c7b5] bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#8a7a68]">
                Technical Specs
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {techBadges.map((badge) => (
                  <span
                    key={badge}
                    className="rounded-full border border-[#d8c7b5] bg-[#fcfaf6] px-4 py-2 text-sm font-semibold text-[#5c4c33]"
                  >
                    {badge}
                  </span>
                ))}
              </div>

              <div className="mt-8">
  <a
    href="/licensing"
    className="block w-full rounded-2xl bg-[#167fd5] px-6 py-5 text-center text-base font-semibold text-white shadow-sm transition hover:bg-[#09679e]"
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
            <p className="text-sm font-semibold text-[#3d3327]">
              Naples Churches Walk
            </p>
            <p className="mt-2 text-sm leading-7 text-[#6e5a45]">
              Focus on Naples churches, sacred spaces, and religious landmarks
              in the historic center.
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

