"use client";

import Image from "next/image";
import { useRef, useState } from "react";

export default function NaplesDaytimeWalk2023Page() {
  const [currentStart, setCurrentStart] = useState(0);

  const videoSectionRef = useRef<HTMLDivElement | null>(null);
  const highlightsRef = useRef<HTMLDivElement | null>(null);

  const highlights = [
    {
      title: "Pignasecca Market",
      timeLabel: "7:21",
      seconds: 441,
      imageSrc: "/naples/highlights/pignasecca.jpg",
      alt: "Pignasecca Market in Naples",
    },
    {
      title: "Gesù Nuovo",
      timeLabel: "35:48",
      seconds: 2148,
      imageSrc: "/naples/highlights/gesu-nuovo.jpg",
      alt: "Gesù Nuovo in Naples",
    },
    {
      title: "Duomo di Napoli",
      timeLabel: "1:50:18",
      seconds: 6618,
      imageSrc: "/naples/highlights/duomo.jpg",
      alt: "Duomo di Napoli",
    },
    {
      title: "San Gregorio Armeno",
      timeLabel: "2:22:39",
      seconds: 8559,
      imageSrc: "/naples/highlights/san-gregorio-armeno.jpg",
      alt: "San Gregorio Armeno in Naples",
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

  const gallery = [
    { src: "/naples/day-walks.jpg", alt: "Daytime street scene in Naples" },
    { src: "/naples/historic-center.jpg", alt: "Historic center street in Naples" },
    { src: "/naples/markets.jpg", alt: "Market scene in Naples" },
    { src: "/naples/waterfront.jpg", alt: "Naples waterfront with boats" },
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

  const scrollHighlights = (direction: "left" | "right") => {
    if (!highlightsRef.current) return;

    const amount = 340;
    highlightsRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  const youtubeEmbedUrl = `https://www.youtube.com/embed/990AqbKb18c?start=${currentStart}&autoplay=1`;

  return (
    <div className="min-h-screen bg-white text-zinc-900">
      <section className="border-b border-zinc-200">
        <div className="mx-auto max-w-5xl px-6 py-12 lg:px-10 lg:py-16">
          <div className="mb-8">
            <a
              href="/destinations/italy/campania/naples"
              className="inline-flex items-center rounded-full border border-zinc-300 bg-white px-3 py-1 text-sm font-medium text-zinc-700"
            >
              ← Back to Naples
            </a>
          </div>

          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-zinc-500">
            Featured Naples Walk
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Naples, Italy Daytime Walking Tour
          </h1>

          <p className="mt-3 text-xl text-zinc-700">
            Historic Center, Sanità & Waterfront
          </p>

          <p className="mt-6 max-w-3xl text-base leading-8 text-zinc-700">
            Explore Naples from Montesanto through the historic center, Sanità,
            the Spanish Quarter, and the waterfront in this immersive long-form
            walking tour filmed over two days in July 2023. Along the route,
            you’ll pass markets, churches, piazzas, narrow historic streets,
            panoramic viewpoints, and the bay near Castel dell’Ovo.
          </p>

          <p className="mt-4 text-sm text-zinc-500">
            Filmed over two days in July 2023 • Approx. runtime: 5h 45m
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="https://youtu.be/990AqbKb18c"
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl bg-zinc-900 px-5 py-3 text-sm font-semibold text-white shadow-sm"
            >
              Watch on YouTube
            </a>
            <a
              href="https://www.google.com/maps/d/edit?mid=1E_nqyiPSRDss1zSiWuRzH2bBrAm3tBU&usp=sharing"
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl border border-zinc-300 bg-white px-5 py-3 text-sm font-semibold text-zinc-900"
            >
              View Route Map
            </a>
            <a
              href="/destinations/italy/campania/naples"
              className="rounded-2xl border border-zinc-300 bg-white px-5 py-3 text-sm font-semibold text-zinc-900"
            >
              Camera & Gear
            </a>
            <a
              href="/destinations/italy/campania/naples"
              className="rounded-2xl border border-zinc-300 bg-white px-5 py-3 text-sm font-semibold text-zinc-900"
            >
              License This Footage
            </a>
          </div>
        </div>
      </section>

      <section
        ref={videoSectionRef}
        className="mx-auto max-w-6xl px-6 py-12 lg:px-10 lg:py-14"
      >
        <div className="overflow-hidden rounded-[2rem] border border-zinc-200 shadow-lg">
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

      <section className="mx-auto max-w-6xl px-6 py-2 lg:px-10">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-zinc-500">
              Video Highlights
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight">
              Jump to major landmarks
            </h2>
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <button
              onClick={() => scrollHighlights("left")}
              className="rounded-full border border-zinc-200 bg-white px-4 py-3 text-2xl font-semibold text-zinc-700 shadow-sm transition hover:bg-zinc-50"
              aria-label="Scroll highlights left"
            >
              ‹
            </button>
            <button
              onClick={() => scrollHighlights("right")}
              className="rounded-full border border-zinc-200 bg-white px-4 py-3 text-2xl font-semibold text-zinc-700 shadow-sm transition hover:bg-zinc-50"
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
              className="group w-[280px] shrink-0 overflow-hidden rounded-[1.5rem] border border-zinc-200 bg-white text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
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
                <p className="text-sm font-semibold text-zinc-900">
                  {highlight.title}
                </p>
                <p className="mt-1 text-sm text-zinc-500">
                  {highlight.timeLabel}
                </p>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-8 lg:px-10 lg:py-10">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-zinc-500">
          Route map
        </p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight">
          Explore the route
        </h2>

        <p className="mt-4 max-w-3xl text-base leading-8 text-zinc-700">
          This walk begins near Montesanto and crosses the historic center,
          Sanità, the Spanish Quarter, and the waterfront.
        </p>

        <div className="mt-8 overflow-hidden rounded-[2rem] border border-zinc-200 shadow-lg">
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
            className="rounded-2xl border border-zinc-300 bg-white px-5 py-3 text-sm font-semibold text-zinc-900"
          >
            Open Full Interactive Map
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12 lg:px-10">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-zinc-500">
          Photo gallery
        </p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight">
          Scenes from the walk
        </h2>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {gallery.map((item) => (
            <div
              key={item.src}
              className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] border border-zinc-200 shadow-sm"
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

        <p className="mt-4 text-sm text-zinc-500">
          Temporary placeholder images for layout. Replace later with
          screenshots from this exact walk.
        </p>
      </section>
    </div>
  );
}