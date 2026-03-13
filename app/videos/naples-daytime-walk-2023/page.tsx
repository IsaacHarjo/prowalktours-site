"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

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

  const highlights = [
    {
      title: "Pignasecca Market",
      timeLabel: "7:21",
      seconds: 441,
      imageSrc: "/naples-day-july-2023/highlights/pignasecca.jpg",
      alt: "Fruit stall at Pignasecca Market in Naples, Italy",
      caption: "Fruit stall at Pignasecca Market",
      proTip: {
        label: "Eat Local",
        text: "Grab a cuoppo di pesce fritto (fried fish cone) here. It's the most authentic street food experience in the city.",
      },
    },
    {
      title: "Spaccanapoli",
      timeLabel: "28:05",
      seconds: 1685,
      imageSrc: "/naples-day-july-2023/highlights/spaccanapoli.jpg",
      alt: "Crowded Spaccanapoli street in Naples, Italy",
      caption: "Street scene on Spaccanapoli",
    },
    {
      title: "Leather Shop",
      timeLabel: "30:44",
      seconds: 1844,
      imageSrc: "/naples-day-july-2023/highlights/leather-shop.jpg",
      alt: "Leather craftsman working in a small shop in Naples, Italy",
      caption: "Local leather workshop in Naples",
    },
    {
      title: "Piazza del Gesu Nuovo",
      timeLabel: "33:48",
      seconds: 2028,
      imageSrc: "/naples-day-july-2023/highlights/naples-piazza-gesu-nuovo.jpg",
      alt: "Piazza del Gesu Nuovo with cafes and street decorations in Naples, Italy",
      caption: "Piazza del Gesu Nuovo",
    },
    {
      title: "Church of Gesu Nuovo",
      timeLabel: "35:48",
      seconds: 2148,
      imageSrc: "/naples-day-july-2023/highlights/naples-church-of-gesu-nuovo.jpg",
      alt: "Interior of Gesu Nuovo Church in Naples, Italy",
      caption: "Inside Gesu Nuovo Church",
    },
    {
      title: "Basilica di Santa Chiara",
      timeLabel: "48:23",
      seconds: 2903,
      imageSrc: "/naples-day-july-2023/highlights/naples-basilica-di-santa-chiara-church.jpg",
      alt: "Facade of the Basilica di Santa Chiara in Naples, Italy",
      caption: "Facade of Santa Chiara",
    },
    {
      title: "Palazzo Venezia",
      timeLabel: "59:20",
      seconds: 3560,
      imageSrc: "/naples-day-july-2023/highlights/palazzo-venezia.jpg",
      alt: "Courtyard entrance of Palazzo Venezia in Naples, Italy",
      caption: "Palazzo Venezia courtyard",
    },
    {
      title: "Piazza San Domenico Maggiore",
      timeLabel: "1:09:47",
      seconds: 4187,
      imageSrc: "/naples-day-july-2023/highlights/piazza-san-domenico-maggiore.jpg",
      alt: "Piazza San Domenico Maggiore in Naples, Italy",
      caption: "Piazza San Domenico Maggiore",
    },
    {
      title: "Piazzetta Nilo",
      timeLabel: "1:13:37",
      seconds: 4417,
      imageSrc: "/naples-day-july-2023/highlights/naples-piazzetta-nilo-town-square.jpg",
      alt: "Piazzetta Nilo with cafes and flags in Naples, Italy",
      caption: "Piazzetta Nilo",
    },
    {
      title: "Doll Hospital",
      timeLabel: "1:29:17",
      seconds: 5357,
      imageSrc: "/naples-day-july-2023/highlights/doll-hospital.jpg",
      alt: "Vintage doll display inside the Doll Hospital in Naples, Italy",
      caption: "Inside Naples' Doll Hospital",
    },
    {
      title: "San Gennaro Mural",
      timeLabel: "1:42:14",
      seconds: 6134,
      imageSrc: "/naples-day-july-2023/highlights/naples-san-gennaro-mural-painting.jpg",
      alt: "San Gennaro mural on a narrow street in Naples, Italy",
      caption: "San Gennaro mural",
    },
    {
      title: "Via dei Tribunali",
      timeLabel: "1:48:40",
      seconds: 6520,
      imageSrc: "/naples-day-july-2023/highlights/via-dei-tribunali.jpg",
      alt: "Busy Via dei Tribunali in Naples, Italy",
      caption: "Street life on Via dei Tribunali",
    },
    {
      title: "Duomo di Napoli",
      timeLabel: "1:50:18",
      seconds: 6618,
      imageSrc: "/naples-day-july-2023/highlights/duomo.jpg",
      alt: "Facade of Naples Cathedral in Naples, Italy",
      caption: "Naples Cathedral facade",
    },
    {
      title: "San Lorenzo Maggiore",
      timeLabel: "2:14:59",
      seconds: 8099,
      imageSrc: "/naples-day-july-2023/highlights/san-lorenzo-maggiore.jpg",
      alt: "Interior of San Lorenzo Maggiore in Naples, Italy",
      caption: "Inside San Lorenzo Maggiore",
    },
    {
      title: "San Gregorio Armeno",
      timeLabel: "2:22:39",
      seconds: 8559,
      imageSrc: "/naples-day-july-2023/highlights/san-gregorio-armeno.jpg",
      alt: "Crowded San Gregorio Armeno street in Naples, Italy",
      caption: "San Gregorio Armeno",
    },
    {
      title: "Bust of Pulcinella",
      timeLabel: "2:48:56",
      seconds: 10136,
      imageSrc: "/naples-day-july-2023/highlights/bust-of-pulcinella.jpg",
      alt: "Bust of Pulcinella in Naples, Italy",
      caption: "Bust of Pulcinella",
    },
    {
      title: "Piazza Vincenzo Bellini",
      timeLabel: "2:57:33",
      seconds: 10653,
      imageSrc: "/naples-day-july-2023/highlights/piazza-vincenzo-bellini.jpg",
      alt: "Piazza Vincenzo Bellini in Naples, Italy",
      caption: "Piazza Vincenzo Bellini",
    },
    {
      title: "Via Port'Alba",
      timeLabel: "3:03:09",
      seconds: 10989,
      imageSrc: "/naples-day-july-2023/highlights/via-portalba.jpg",
      alt: "Archway entrance on Via Port'Alba in Naples, Italy",
      caption: "Via Port'Alba archway",
    },
    {
      title: "Piazza Dante",
      timeLabel: "3:06:24",
      seconds: 11184,
      imageSrc: "/naples-day-july-2023/highlights/piazza-dante.jpg",
      alt: "Piazza Dante with curved facade and clock tower in Naples, Italy",
      caption: "Piazza Dante",
    },
    {
      title: "Galleria Principe di Napoli",
      timeLabel: "3:13:42",
      seconds: 11622,
      imageSrc: "/naples-day-july-2023/highlights/naples-galleria-principe-di-napoli.jpg",
      alt: "Entrance to Galleria Principe di Napoli in Naples, Italy",
      caption: "Galleria Principe di Napoli",
    },
    {
      title: "National Archaeological Museum",
      timeLabel: "3:16:09",
      seconds: 11769,
      imageSrc: "/naples-day-july-2023/highlights/archaeological-museum.jpg",
      alt: "National Archaeological Museum of Naples in Naples, Italy",
      caption: "National Archaeological Museum",
    },
    {
      title: "Piazza Cavour",
      timeLabel: "3:18:26",
      seconds: 11906,
      imageSrc: "/naples-day-july-2023/highlights/naples-piazza-cavour.jpg",
      alt: "Fountain and buildings at Piazza Cavour in Naples, Italy",
      caption: "Piazza Cavour",
    },
    {
      title: "Via Vergini (Outdoor Market)",
      timeLabel: "3:26:12",
      seconds: 12372,
      imageSrc: "/naples-day-july-2023/highlights/naples-via-vergini-market.jpg",
      alt: "Outdoor market on Via Vergini in Naples, Italy",
      caption: "Outdoor market on Via Vergini",
    },
    {
      title: "Palazzo dello Spagnolo",
      timeLabel: "3:31:06",
      seconds: 12666,
      imageSrc: "/naples-day-july-2023/highlights/naples-palazzo-dello-spagnolo.jpg",
      alt: "Interior courtyard of Palazzo dello Spagnolo in Naples, Italy",
      caption: "Palazzo dello Spagnolo",
    },
    {
      title: "San Felice Palace",
      timeLabel: "3:39:18",
      seconds: 13158,
      imageSrc: "/naples-day-july-2023/highlights/naples-san-felice-palace.jpg",
      alt: "Courtyard facade of Palazzo San Felice in Naples, Italy",
      caption: "Palazzo San Felice",
    },
    {
      title: "Basilica di Santa Maria della Sanita",
      timeLabel: "3:44:21",
      seconds: 13461,
      imageSrc:
        "/naples-day-july-2023/highlights/naples-basilica-di-santa-maria-della-sanita-church.jpg",
      alt: "Basilica di Santa Maria della Sanita in Naples, Italy",
      caption: "Basilica di Santa Maria della Sanita",
    },
    {
      title: "Ponte Maddalena Cerasuolo",
      timeLabel: "3:47:25",
      seconds: 13645,
      imageSrc: "/naples-day-july-2023/highlights/naples-ponte-maddalena-cerasuolo.jpg",
      alt: "Ponte Maddalena Cerasuolo arch in Naples, Italy",
      caption: "Ponte Maddalena Cerasuolo",
    },
    {
      title: "Piazza Dante",
      timeLabel: "3:55:46",
      seconds: 14146,
      imageSrc: "/naples-day-july-2023/highlights/naples-piazza-dante-2.jpg",
      alt: "People relaxing in Piazza Dante in Naples, Italy",
      caption: "Street life in Piazza Dante",
    },
    {
      title: "Via Toledo",
      timeLabel: "3:58:55",
      seconds: 14335,
      imageSrc: "/naples-day-july-2023/highlights/naples-via-toledo-2-street.jpg",
      alt: "Pedestrians on Via Toledo in Naples, Italy",
      caption: "Walking along Via Toledo",
    },
    {
      title: "Quartieri Spagnoli",
      timeLabel: "4:09:16",
      seconds: 14956,
      imageSrc: "/naples-day-july-2023/highlights/naples-spanish-quarter-2.jpg",
      alt: "Decorated street in Quartieri Spagnoli in Naples, Italy",
      caption: "Street in Quartieri Spagnoli",
    },
    {
      title: "Largo Maradona",
      timeLabel: "4:18:41",
      seconds: 15521,
      imageSrc: "/naples-day-july-2023/highlights/largo-maradona.jpg",
      alt: "Diego Maradona mural at Largo Maradona in Naples, Italy",
      caption: "Maradona mural at Largo Maradona",
    },
    {
      title: "Galleria Umberto I",
      timeLabel: "4:42:01",
      seconds: 16921,
      imageSrc: "/naples-day-july-2023/highlights/naples-galleria-umberto-i.jpg",
      alt: "Interior of Galleria Umberto I in Naples, Italy",
      caption: "Inside Galleria Umberto I",
    },
    {
      title: "Gran Caffe Gambrinus",
      timeLabel: "4:50:58",
      seconds: 17458,
      imageSrc: "/naples-day-july-2023/highlights/naples-gambrinus-cafe.jpg",
      alt: "Exterior of Gran Caffe Gambrinus in Naples, Italy",
      caption: "Gran Caffe Gambrinus",
    },
    {
      title: "Piazza del Plebiscito",
      timeLabel: "4:53:22",
      seconds: 17602,
      imageSrc: "/naples-day-july-2023/highlights/piazza-del-plebiscito.jpg",
      alt: "Piazza del Plebiscito and Basilica of San Francesco di Paola in Naples, Italy",
      caption: "Piazza del Plebiscito",
    },
    {
      title: "Waterfront Lungomare",
      timeLabel: "5:00:45",
      seconds: 18045,
      imageSrc: "/naples-day-july-2023/highlights/naples-waterfront-1.jpg",
      alt: "Lungomare waterfront promenade in Naples, Italy",
      caption: "Naples Lungomare waterfront",
    },
    {
      title: "Rotonda Swimming Hole",
      timeLabel: "5:04:52",
      seconds: 18292,
      imageSrc: "/naples-day-july-2023/highlights/naples-rotonda-via-nazario-sauro-2.jpg",
      alt: "People swimming near Via Nazario Sauro on the Naples waterfront, Italy",
      caption: "Swimming spot on the waterfront",
    },
    {
      title: "Fontana del Gigante",
      timeLabel: "5:15:57",
      seconds: 18957,
      imageSrc: "/naples-day-july-2023/highlights/naples-fontana-del-gigante-fountain.jpg",
      alt: "Fontana del Gigante near the waterfront in Naples, Italy",
      caption: "Fontana del Gigante",
    },
    {
      title: "Castel dell'Ovo",
      timeLabel: "5:18:53",
      seconds: 19133,
      imageSrc: "/naples-day-july-2023/highlights/castel-dellovo.jpg",
      alt: "Walkway leading to Castel dell'Ovo in Naples, Italy",
      caption: "Approaching Castel dell'Ovo",
    },
    {
      title: "Via Partenope",
      timeLabel: "5:33:05",
      seconds: 19985,
      imageSrc: "/naples-day-july-2023/highlights/naples-waterfront2.jpg",
      alt: "Via Partenope waterfront road in Naples, Italy",
      caption: "Via Partenope waterfront",
    },
  ];

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
  const topRowStats = [
    {
      icon: "📅",
      label: "Date",
      value: "July 6, 2023 / July 22, 2023 / July 23, 2023",
    },
    { icon: "📏", label: "Distance", value: "8.3 mi / 13.3 km" },
    { icon: "🕒", label: "Duration", value: "5h 45m" },
    { icon: "☀️", label: "Weather", value: "Sunny, 90°F / 32°C" },
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
      long-form walking tour filmed over three days in July 2023. Along
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


