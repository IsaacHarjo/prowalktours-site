"use client";

import Link from "next/link";
import LiveSearchBar from "../components/LiveSearchBar";
import Image from "next/image";
import WorldMapClient from "../components/WorldMapClient";
import type { DiscoveryVideo, WorldTour } from "../lib/tours/types";

// ─── Top destinations data ───────────────────────────────────────────────────

const topDestinations = [
  {
    name: "Naples & Campania",
    description: "Explore Campania walks",
    href: "/destinations/italy/campania",
    img: "/images/homepage/naples-campania.jpg",
  },
  {
    name: "Venice",
    description: "Explore on the Italy map",
    href: "/destinations/italy#tour-map",
    img: "/images/homepage/venice.jpg",
  },
  {
    name: "Amalfi Coast",
    description: "Explore coastal Campania",
    href: "/destinations/italy/campania",
    img: "/images/homepage/amalfi-coast.jpg",
  },
  {
    name: "French Riviera",
    description: "Explore Riviera walks",
    href: "/destinations/france/french-riviera",
    img: "/images/homepage/french-riviera.jpg",
  },
  {
    name: "Rome",
    description: "Explore on the Italy map",
    href: "/destinations/italy#tour-map",
    img: "/images/homepage/rome.jpg",
  },
  {
    name: "Paris",
    description: "Explore Paris walks",
    href: "/destinations/france/paris",
    img: "/images/homepage/paris.jpg",
  },
];


const sectionWidth = "mx-auto max-w-7xl px-5 sm:px-8 lg:px-10";
const eyebrow = "text-xs font-semibold uppercase tracking-[0.18em] text-[#607767]";
const textLink = "inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#176347] underline-offset-4 hover:underline";

export default function HomeClient({ videos, mappedTours }: { videos: DiscoveryVideo[]; mappedTours: WorldTour[] }) {
  const countryCount = new Set(mappedTours.map(tour => tour.country)).size;
  const featuredVideo = videos.find(video => video.slug === "nice-old-town-monday-evening-walk-2025");
  return (
    <div className="bg-[#fcfaf7] text-[#25382f]">
      <section className={sectionWidth + " pt-8 pb-12 sm:pt-12 lg:pb-16"}>
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="relative z-10 py-2 lg:py-6">
            <p className={eyebrow}>The world, at walking pace</p>
            <h1 className="mt-5 max-w-xl text-4xl font-semibold leading-[1.08] tracking-[-0.035em] sm:text-5xl lg:text-6xl">A new place.<br />A different perspective.</h1>
            <p className="mt-6 max-w-lg text-base leading-7 text-[#657069] sm:text-lg sm:leading-8">Wander historic streets, follow the coast, and hear a city come to life. Immersive 4K walking tours, with the sounds of being there.</p>
            <div className="mt-8 max-w-xl">
              <p className="mb-3 text-sm font-semibold">Where would you like to explore?</p>
              <LiveSearchBar videos={videos} />
              <div className="mt-3 flex flex-wrap gap-x-6">
                <Link href="/countries" className={textLink}>Browse countries <span aria-hidden="true">→</span></Link>
                <Link href="#world-map" className={textLink}>Explore the globe <span aria-hidden="true">↓</span></Link>
              </div>
            </div>
            <p className="mt-6 text-xs leading-6 tracking-wide text-[#657069]">{mappedTours.length} tours · {countryCount} countries · 4K video & binaural audio</p>
          </div>
          <Link href="/destinations/italy/campania" className="group relative block h-[280px] overflow-hidden rounded-[1.5rem] sm:h-[380px] lg:h-[510px]" aria-label="Explore Naples and Campania">
            <Image src="/images/homepage/hero.jpg" alt="Fishing boats on the Bay of Naples with Mount Vesuvius beyond" fill priority sizes="(min-width: 1024px) 560px, 100vw" className="object-cover transition duration-700 group-hover:scale-[1.025]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute inset-x-6 bottom-6 flex items-end justify-between text-white">
              <div><p className="text-xs uppercase tracking-[0.16em] text-white/80">Through the lens</p><p className="mt-2 text-xl font-semibold">Naples, Italy</p></div>
              <span aria-hidden="true" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/60 text-xl">↗</span>
            </div>
          </Link>
        </div>
      </section>

      <section className={sectionWidth + " pb-14 lg:pb-20"} aria-labelledby="destinations-heading">
        <div className="flex flex-wrap items-end justify-between gap-3 border-t border-[#dddcd2] pt-9">
          <div><p className={eyebrow}>Choose your next stop</p><h2 id="destinations-heading" className="mt-2 text-3xl font-semibold tracking-tight">Places worth getting lost in</h2></div>
          <Link href="/countries" className={textLink}>All destinations →</Link>
        </div>
        <div className="mt-7 grid grid-cols-2 gap-x-4 gap-y-7 sm:grid-cols-3 lg:grid-cols-6 lg:gap-5">
          {topDestinations.map(dest => <Link key={dest.name} href={dest.href} className="group block min-w-0">
            <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-[#e6e7de]">
              <Image src={dest.img} alt={dest.name} fill sizes="(min-width: 1024px) 190px, (min-width: 640px) 30vw, 45vw" className="object-cover transition duration-500 group-hover:scale-105" />
            </div>
            <h3 className="mt-3 text-base font-semibold group-hover:underline">{dest.name}</h3>
            <p className="mt-1 text-xs leading-5 text-[#657069]">{dest.description}</p>
          </Link>)}
        </div>
      </section>

      <section id="world-map" className="scroll-mt-20 bg-[#edf1ed] py-12 lg:py-16" aria-labelledby="map-heading">
        <div className={sectionWidth}>
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div><p className={eyebrow}>Follow your curiosity</p><h2 id="map-heading" className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">A world of walks. One map.</h2></div>
            <p className="max-w-sm text-sm leading-6 text-[#657069]">Spin the globe, zoom into a place, and choose a tour. Your next walk can start anywhere.</p>
          </div>
          <div className="mt-7 overflow-hidden rounded-2xl border border-[#d8e0d7] bg-[#10151c]">
            <WorldMapClient tours={mappedTours} fullWidth fitToTours globeOverview heightClassName="h-[420px] sm:h-[500px]" />
          </div>
          <div className="mt-4 flex flex-col justify-between gap-2 text-xs leading-5 text-[#657069] sm:flex-row">
            <p>{mappedTours.length} tours across {countryCount} countries · Select a pin or numbered group to watch.</p>
            <p>Approximate destination pins are labeled.</p>
          </div>
        </div>
      </section>

      <section className={sectionWidth + " py-14 lg:py-20"} aria-labelledby="featured-heading">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div><p className={eyebrow}>Stay a little longer</p><h2 id="featured-heading" className="mt-2 text-3xl font-semibold tracking-tight">Find a walk for your mood</h2></div>
          <Link href="/search" className={textLink}>Browse all walks →</Link>
        </div>
        <div className="mt-7 grid gap-10 md:grid-cols-2 md:gap-8">
          {featuredVideo && <article>
            <Link href={featuredVideo.watchHref} className="group relative block aspect-video overflow-hidden rounded-2xl bg-[#e6e7de]">
              <Image src="/nice-old-town-monday-evening-walk-2025/hero.jpg" alt={featuredVideo.siteTitle} fill sizes="(min-width: 768px) 560px, 100vw" className="object-cover transition duration-500 group-hover:scale-[1.025]" />
              <span className="absolute bottom-4 left-4 rounded-full bg-white px-4 py-2 text-xs font-semibold">Featured walk</span>
            </Link>
            <p className={eyebrow + " mt-5"}>{featuredVideo.city}, {featuredVideo.country}</p>
            <h3 className="mt-2 text-2xl font-semibold leading-snug"><Link href={featuredVideo.watchHref} className="hover:underline">{featuredVideo.siteTitle}</Link></h3>
            <p className="mt-3 text-sm leading-7 text-[#657069]">{featuredVideo.shortDescription}</p>
            <Link href={featuredVideo.watchHref} className={textLink + " mt-2"}>Watch the tour →</Link>
          </article>}
          <article>
            <Link href="/christmas-markets" className="group relative block aspect-video overflow-hidden rounded-2xl bg-[#e6e7de]">
              <Image src="/colmar-christmas-market-evening-walk-2023/hero.jpg" alt="Colmar Christmas market evening walking tour" fill sizes="(min-width: 768px) 560px, 100vw" className="object-cover transition duration-500 group-hover:scale-[1.025]" />
              <span className="absolute bottom-4 left-4 rounded-full bg-white px-4 py-2 text-xs font-semibold">The Christmas collection</span>
            </Link>
            <p className={eyebrow + " mt-5"}>Lights, markets & winter evenings</p>
            <h3 className="mt-2 text-2xl font-semibold leading-snug"><Link href="/christmas-markets" className="hover:underline">A little Christmas, whenever you like</Link></h3>
            <p className="mt-3 text-sm leading-7 text-[#657069]">Wander through Europe’s festive squares and market stalls. Explore the collection by destination and discover the journeys behind the films.</p>
            <Link href="/christmas-markets" className={textLink + " mt-2"}>Explore Christmas markets →</Link>
          </article>
        </div>
      </section>

      <section className="bg-[#25382f] text-white">
        <div className={sectionWidth + " grid gap-10 py-12 lg:grid-cols-[1.4fr_1fr] lg:gap-20 lg:py-16"}>
          <div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#c0d3c5]">Behind the walks</p><h2 className="mt-3 text-3xl font-semibold tracking-tight">The atmosphere is the story.</h2><p className="mt-4 max-w-xl text-base leading-7 text-[#d1dcd4]">Prowalk Tours brings you closer to a place through its streets, everyday moments, and binaural sound. Put on your headphones and come along. New walks arrive on YouTube every Saturday.</p><Link href="/about" className="mt-4 inline-flex min-h-11 items-center text-sm font-semibold underline underline-offset-4">About Prowalk Tours →</Link></div>
          <div className="border-t border-white/20 pt-8 lg:border-t-0 lg:border-l lg:pl-10 lg:pt-0"><h3 className="text-xl font-semibold">Bring these places to your audience.</h3><p className="mt-3 text-sm leading-7 text-[#d1dcd4]">Footage for film, television, hospitality, and spaces that could use a window to the world.</p><Link href="/licensing" className="mt-5 inline-flex min-h-11 items-center rounded-full border border-white/50 px-5 text-sm font-semibold hover:bg-white/10">Explore footage licensing →</Link></div>
        </div>
        <div className="border-t border-white/15"><div className={sectionWidth + " flex flex-wrap items-center justify-between gap-3 py-5 text-xs leading-6 text-[#d1dcd4]"}><p>Featured in The Wall Street Journal · Distribution through Janson Media</p><Link href="/press" className="underline underline-offset-4">Press & partnerships →</Link></div></div>
      </section>
    </div>
  );
}
