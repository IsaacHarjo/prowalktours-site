"use client";

import Image from "next/image";
import { useRef, useState } from "react";

export default function NaplesDaytimeWalk2023Page() {
  const [currentStart, setCurrentStart] = useState(0);

const overviewSectionRef = useRef<HTMLElement | null>(null);
const videoSectionRef = useRef<HTMLDivElement | null>(null);
const highlightsSectionRef = useRef<HTMLElement | null>(null);
const highlightsRef = useRef<HTMLDivElement | null>(null);
const routeMapRef = useRef<HTMLElement | null>(null);
const licensingHubRef = useRef<HTMLElement | null>(null);
const relatedToursRef = useRef<HTMLElement | null>(null);

  const highlights = [
    {
      title: "Pignasecca Market",
      timeLabel: "7:21",
      seconds: 441,
      imageSrc: "/naples/highlights/pignasecca.jpg",
      alt: "Pignasecca Market in Naples",
    },
    {
      title: "Spaccanapoli",
      timeLabel: "28:05",
      seconds: 1685,
      imageSrc: "/naples/highlights/spaccanapoli.jpg",
      alt: "Spaccanapoli in Naples",
    },
    {
      title: "Leather Shop",
      timeLabel: "30:44",
      seconds: 1844,
      imageSrc: "/naples/highlights/leather-shop.jpg",
      alt: "Leather shop in Naples",
    },
    {
      title: "Gesù Nuovo",
      timeLabel: "35:48",
      seconds: 2148,
      imageSrc: "/naples/highlights/gesu-nuovo.jpg",
      alt: "Gesù Nuovo in Naples",
    },
    {
      title: "Palazzo Venezia",
      timeLabel: "59:20",
      seconds: 3560,
      imageSrc: "/naples/highlights/palazzo-venezia.jpg",
      alt: "Palazzo Venezia in Naples",
    },
    {
      title: "Piazza San Domenico Maggiore",
      timeLabel: "1:09:47",
      seconds: 4187,
      imageSrc: "/naples/highlights/piazza-san-domenico-maggiore.jpg",
      alt: "Piazza San Domenico Maggiore in Naples",
    },
    {
      title: "Doll Hospital",
      timeLabel: "1:29:17",
      seconds: 5357,
      imageSrc: "/naples/highlights/doll-hospital.jpg",
      alt: "Doll Hospital in Naples",
    },
    {
      title: "Via dei Tribunali",
      timeLabel: "1:48:40",
      seconds: 6520,
      imageSrc: "/naples/highlights/via-dei-tribunali.jpg",
      alt: "Via dei Tribunali in Naples",
    },
    {
      title: "Duomo di Napoli",
      timeLabel: "1:50:18",
      seconds: 6618,
      imageSrc: "/naples/highlights/duomo.jpg",
      alt: "Duomo di Napoli",
    },
    {
      title: "San Lorenzo Maggiore",
      timeLabel: "2:14:59",
      seconds: 8099,
      imageSrc: "/naples/highlights/san-lorenzo-maggiore.jpg",
      alt: "San Lorenzo Maggiore in Naples",
    },
    {
      title: "San Gregorio Armeno",
      timeLabel: "2:22:39",
      seconds: 8559,
      imageSrc: "/naples/highlights/san-gregorio-armeno.jpg",
      alt: "San Gregorio Armeno in Naples",
    },
    {
      title: "Bust of Pulcinella",
      timeLabel: "2:48:56",
      seconds: 10136,
      imageSrc: "/naples/highlights/bust-of-pulcinella.jpg",
      alt: "Bust of Pulcinella in Naples",
    },
    {
      title: "Piazza Vincenzo Bellini",
      timeLabel: "2:57:33",
      seconds: 10653,
      imageSrc: "/naples/highlights/piazza-vincenzo-bellini.jpg",
      alt: "Piazza Vincenzo Bellini in Naples",
    },
    {
      title: "Via Port’Alba",
      timeLabel: "3:03:09",
      seconds: 10989,
      imageSrc: "/naples/highlights/via-portalba.jpg",
      alt: "Via Port'Alba in Naples",
    },
    {
      title: "Piazza Dante",
      timeLabel: "3:06:24",
      seconds: 11184,
      imageSrc: "/naples/highlights/piazza-dante.jpg",
      alt: "Piazza Dante in Naples",
    },
    {
      title: "National Archaeological Museum",
      timeLabel: "3:16:09",
      seconds: 11769,
      imageSrc: "/naples/highlights/archaeological-museum.jpg",
      alt: "National Archaeological Museum of Naples",
    },
    {
      title: "Largo Maradona",
      timeLabel: "4:18:41",
      seconds: 15521,
      imageSrc: "/naples/highlights/largo-maradona.jpg",
      alt: "Largo Maradona in Naples",
    },
    {
      title: "Piazza del Plebiscito",
      timeLabel: "4:53:22",
      seconds: 17602,
      imageSrc: "/naples/highlights/piazza-del-plebiscito.jpg",
      alt: "Piazza del Plebiscito in Naples",
    },
    {
      title: "Castel dell’Ovo",
      timeLabel: "5:18:53",
      seconds: 19133,
      imageSrc: "/naples/highlights/castel-dellovo.jpg",
      alt: "Castel dell'Ovo in Naples",
    },
  ];

  const handleHighlightClick = (seconds: number) => {
    setCurrentStart(seconds);
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

  const youtubeEmbedUrl = `https://www.youtube.com/embed/990AqbKb18c?start=${currentStart}&autoplay=1`;

  const techBadges = [
    "4K UHD",
    "59.94fps",
    "2-Channel LPCM16",
    "Sony A7S III",
    "Sony 16–35mm PZ",
    "HLG / Rec.2020",
    "Raw Footage Available",
  ];

  return (
    <div className="min-h-screen bg-[#fcfaf6] text-[#3d3327]">
       <section className="sticky top-16 z-40 border-y border-[#7f5f49] bg-[#3d3327]/95 text-white backdrop-blur">
  <nav className="mx-auto grid max-w-6xl grid-cols-[1fr_auto_1fr] items-center px-6 py-3 lg:px-10">
    <div className="justify-self-start">
      <a
        href="/destinations/italy/campania/naples"
        className="inline-flex items-center gap-2 rounded-full border border-[#8f735c] bg-[#4a3c2f] px-3 py-1.5 text-sm font-semibold text-white/90 transition hover:bg-[#5a4838] hover:text-white"
      >
        <span aria-hidden="true">←</span>
        <span>Back to Naples</span>
      </a>
    </div>

    <div className="justify-self-center">
      <div className="flex min-w-max items-center gap-6 text-sm font-semibold text-white/90">
        <button
          onClick={scrollToOverview}
          className="transition hover:text-white"
          type="button"
        >
          Overview
        </button>

        <button
          onClick={scrollToHighlights}
          className="transition hover:text-white"
          type="button"
        >
          Highlights
        </button>

        <button
          onClick={scrollToRouteMap}
          className="transition hover:text-white"
          type="button"
        >
          Route Map
        </button>

        <button
          onClick={scrollToLicensing}
          className="transition hover:text-white"
          type="button"
        >
          Licensing
        </button>

        <button
          onClick={scrollToRelatedTours}
          className="transition hover:text-white"
          type="button"
        >
          Related Tours
        </button>

        <a
          href="https://youtu.be/990AqbKb18c"
          target="_blank"
          rel="noreferrer"
          className="transition hover:text-white"
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
    <div className="mt-6 space-y-2 text-base font-semibold text-[#3d3327]">
            <div className="flex items-center gap-2">
              <span aria-hidden="true">📅</span>
              <span>Filmed July 2023</span>
            </div>
            <div className="flex items-center gap-2">
              <span aria-hidden="true">☀️</span>
              <span>Sunny • 89°F</span>
            </div>
            <div className="flex items-center gap-2">
              <span aria-hidden="true">🕒</span>
              <span>Approx. runtime: 5h 45m</span>
            </div>
          </div>
  </div>

  <div className="relative overflow-hidden rounded-[2rem] border border-[#d8c7b5] bg-white shadow-sm">
    <div className="relative aspect-[4/3] w-full">
      <Image
        src="/naples/naples-iconic-view.jpg"
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
        className="mx-auto max-w-6xl px-6 pt-12 pb-6 lg:px-10 lg:pt-14 lg:pb-6"
      >
        <div className="overflow-hidden rounded-[2rem] border border-[#d8c7b5] shadow-lg">
          <div className="aspect-video w-full bg-black">
            <iframe
              key={currentStart}
              className="h-full w-full"
              src={youtubeEmbedUrl}
              title="Naples Italy ASMR walking tour"
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

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href="https://www.google.com/maps/d/edit?mid=1E_nqyiPSRDss1zSiWuRzH2bBrAm3tBU&usp=sharing"
            target="_blank"
            rel="noreferrer"
            className="rounded-2xl border border-[#167fd5] bg-white px-5 py-3 text-sm font-semibold text-[#167fd5] shadow-sm transition hover:bg-[#edf6fd]"
          >
            Open Full Interactive Map
          </a>
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