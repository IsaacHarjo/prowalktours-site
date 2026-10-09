"use client";

import Link from "next/link";
import LiveSearchBar from "../components/LiveSearchBar";
import Image from "next/image";
import ThumbnailImg from "../components/ThumbnailImg";
import WorldMapClient from "../components/WorldMapClient";
import type { DiscoveryVideo, WorldTour } from "../lib/tours/types";

// ─── Top destinations data ───────────────────────────────────────────────────

const topDestinations = [
  {
    name: "Naples & Campania",
    description: "Browse Naples walks",
    href: "/search?q=Naples",
    img: "/images/homepage/naples-campania.jpg",
  },
  {
    name: "Venice",
    description: "Browse Venice walks",
    href: "/search?q=Venice",
    img: "/images/homepage/venice.jpg",
  },
  {
    name: "Amalfi Coast",
    description: "Browse coastal walks",
    href: "/search?q=Amalfi",
    img: "/images/homepage/amalfi-coast.jpg",
  },
  {
    name: "French Riviera",
    description: "Explore Riviera walks",
    href: "/search?q=Riviera",
    img: "/images/homepage/french-riviera.jpg",
  },
  {
    name: "Rome",
    description: "Browse Rome walks",
    href: "/search?q=Rome",
    img: "/images/homepage/rome.jpg",
  },
  {
    name: "Paris",
    description: "Explore Paris walks",
    href: "/search?q=Paris",
    img: "/images/homepage/paris.jpg",
  },
];


const sectionWidth = "mx-auto max-w-7xl px-5 sm:px-8 lg:px-10";
const eyebrow = "text-xs font-semibold uppercase tracking-[0.18em] text-[#607767]";
const textLink = "inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#176347] underline-offset-4 hover:underline";

export default function HomeClient({ videos, mappedTours }: { videos: DiscoveryVideo[]; mappedTours: WorldTour[] }) {
  const countryCount = new Set(mappedTours.map(tour => tour.country)).size;
  // Matches the newest-tour feature on prowalktours.com, verified 2026-10-09.
  // Update this selection when the next tour is published; filming dates are not upload dates.
  const featuredVideo = videos.find(video => video.youtubeUrl.includes("snBqLG2Piyo"));
  return (
    <div className="bg-[#fcfaf7] text-[#25382f]">
      <section className={sectionWidth + " pt-8 pb-12 sm:pt-12 lg:pb-16"}>
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="relative z-10 py-2 lg:py-6">
            <p className={eyebrow}>The world, at walking pace</p>
            <h1 className="mt-5 max-w-xl text-4xl font-semibold leading-[1.08] tracking-[-0.035em] sm:text-5xl lg:text-6xl">Explore the world.<br />One walk at a time.</h1>
            <p className="mt-6 max-w-lg text-base leading-7 text-[#657069] sm:text-lg sm:leading-8">Wander historic streets, follow the coast, and hear a city come to life. Immersive 4K walking tours, with the sounds of being there.</p>
            <div className="mt-8 max-w-xl">
              <p className="mb-3 text-sm font-semibold">Where would you like to explore?</p>
              <LiveSearchBar videos={videos} />
              <div className="mt-3 flex flex-wrap gap-x-6">
                <a href={featuredVideo?.youtubeUrl ?? "https://www.youtube.com/@ProwalkTours/videos"} target="_blank" rel="noreferrer" className={textLink}>Watch the newest walk ↗</a>
                <Link href="/search" className={textLink}>Browse all walks <span aria-hidden="true">→</span></Link>
                <Link href="#world-map" className={textLink}>Explore the globe <span aria-hidden="true">↓</span></Link>
              </div>
            </div>
            <p className="mt-6 text-xs leading-6 tracking-wide text-[#657069]">{mappedTours.length} tours · {countryCount} countries · 4K video & binaural audio</p>
          </div>
          <Link href="/search?q=Naples" className="group relative block h-[280px] overflow-hidden rounded-[1.5rem] sm:h-[380px] lg:h-[510px]" aria-label="Browse Naples walking tours">
            <Image src="/images/homepage/hero.jpg" alt="Fishing boats on the Bay of Naples with Mount Vesuvius beyond" fill priority sizes="(min-width: 1024px) 560px, 100vw" className="object-cover transition duration-700 group-hover:scale-[1.025]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute inset-x-6 bottom-6 flex items-end justify-between text-white">
              <div><p className="text-xs uppercase tracking-[0.16em] text-white/80">Through the lens</p><p className="mt-2 text-xl font-semibold">Naples, Italy</p></div>
              <span aria-hidden="true" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/60 text-xl">↗</span>
            </div>
          </Link>
        </div>
      </section>

      <section className={sectionWidth + " scroll-mt-20 py-10 lg:py-14"} aria-labelledby="featured-heading" id="latest-walk">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div><p className={eyebrow}>Start watching</p><h2 id="featured-heading" className="mt-2 text-3xl font-semibold tracking-tight">Your next walk starts here</h2></div>
          <Link href="/search" className={textLink}>Browse all walks →</Link>
        </div>
        <div className="mt-7 grid gap-10 md:grid-cols-2 md:gap-8">
          {featuredVideo && <article>
            <Link href={featuredVideo.youtubeUrl} target="_blank" rel="noreferrer" className="group relative block aspect-video overflow-hidden rounded-2xl bg-[#e6e7de]">
              <ThumbnailImg src={featuredVideo.thumbnail} alt={featuredVideo.siteTitle} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.025]" />
              <span className="absolute bottom-4 left-4 rounded-full bg-white px-4 py-2 text-xs font-semibold">Newest walk</span>
            </Link>
            <p className={eyebrow + " mt-5"}>{featuredVideo.city}, {featuredVideo.country}</p>
            <h3 className="mt-2 text-2xl font-semibold leading-snug"><Link href={featuredVideo.youtubeUrl} target="_blank" rel="noreferrer" className="hover:underline">{featuredVideo.siteTitle}</Link></h3>
            <p className="mt-3 text-sm leading-7 text-[#657069]">{featuredVideo.shortDescription}</p>
            <Link href={featuredVideo.youtubeUrl} target="_blank" rel="noreferrer" className={textLink + " mt-2"}>Watch on YouTube ↗</Link>
          </article>}
          <article>
            <Link href="/christmas-markets" className="group relative block aspect-video overflow-hidden rounded-2xl bg-[#e6e7de]">
              <Image src="/images/homepage/christmas-collection-artwork.png" alt="Christmas collection artwork: illuminated market stalls and a Christmas tree in a European square" fill sizes="(min-width: 768px) 560px, 100vw" className="object-cover transition duration-500 group-hover:scale-[1.025]" />
              <span className="absolute bottom-4 left-4 rounded-full bg-white px-4 py-2 text-xs font-semibold">The Christmas collection</span>
            </Link>
            <p className={eyebrow + " mt-5"}>Lights, markets & winter evenings</p>
            <h3 className="mt-2 text-2xl font-semibold leading-snug"><Link href="/christmas-markets" className="hover:underline">A little Christmas, whenever you like</Link></h3>
            <p className="mt-3 text-sm leading-7 text-[#657069]">Wander through Europe’s festive squares and market stalls. Explore the collection by destination and discover the journeys behind the films.</p>
            <Link href="/christmas-markets" className={textLink + " mt-2"}>Explore Christmas markets →</Link>
          </article>
        </div>
      </section>

      <section id="world-map" className="scroll-mt-20 bg-[#edf1ed] py-12 lg:py-16" aria-labelledby="map-heading">
        <div className={sectionWidth}>
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div><p className={eyebrow}>Follow your curiosity</p><h2 id="map-heading" className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">A world of walks. One map.</h2></div>
            <p className="max-w-sm text-sm leading-6 text-[#657069]">Spin the globe, zoom into a place, and choose a tour. Your next walk can start anywhere.</p>
          </div>
          <div className="mt-7 overflow-hidden rounded-2xl border border-[#d8e0d7] bg-[#10151c]">
            <WorldMapClient tours={mappedTours} fullWidth fitToTours globeOverview heightClassName="h-[560px] sm:h-[665px]" />
          </div>
          <div className="mt-4 flex flex-col justify-between gap-2 text-xs leading-5 text-[#657069] sm:flex-row">
            <p>{mappedTours.length} tours across {countryCount} countries · Select a pin or numbered group to watch.</p>
            <p>Approximate destination pins are labeled.</p>
          </div>
        </div>
      </section>

      <section className={sectionWidth + " pt-12 pb-14 lg:pt-16 lg:pb-20"} aria-labelledby="destinations-heading">
        <div className="flex flex-wrap items-end justify-between gap-3 border-t border-[#dddcd2] pt-9">
          <div><p className={eyebrow}>Choose your next stop</p><h2 id="destinations-heading" className="mt-2 text-3xl font-semibold tracking-tight">Places worth getting lost in</h2></div>
          <Link href="/search" className={textLink}>Find a destination →</Link>
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

      <section className={sectionWidth + " py-14 lg:py-20"} aria-labelledby="work-heading">
        <p className={eyebrow}>Be part of the journey</p>
        <h2 id="work-heading" className="mt-2 text-3xl font-semibold tracking-tight">More ways to connect with Prowalk Tours</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {[
            { title: "License footage", text: "Bring our destinations into your production. Explore footage licensing for television, film, commercial projects, and public spaces.", href: "/licensing", action: "Explore licensing" },
            { title: "Become a sponsor", text: "Connect your brand with viewers who love travel and discovery. Let’s discuss a partnership that adds value to their experience.", href: "/sponsor", action: "Discuss a partnership" },
            { title: "Support our work", text: "Help make the next walk possible through YouTube membership, Patreon, or a one-time contribution through PayPal.", href: "/support", action: "Choose how to support" },
          ].map(item => <Link key={item.href} href={item.href} className="group flex flex-col rounded-2xl border border-[#d8e0d7] bg-white p-7 transition hover:border-[#176347] hover:shadow-sm">
            <h3 className="text-xl font-semibold">{item.title}</h3>
            <p className="mt-4 flex-1 text-sm leading-7 text-[#657069]">{item.text}</p>
            <span className={textLink + " mt-5 group-hover:underline"}>{item.action} →</span>
          </Link>)}
        </div>
      </section>

      <section className="bg-[#25382f] text-white">
        <div className={sectionWidth + " grid gap-10 py-12 lg:grid-cols-[1.4fr_1fr] lg:gap-20 lg:py-16"}>
          <div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#c0d3c5]">Behind the walks</p><h2 className="mt-3 text-3xl font-semibold tracking-tight">The atmosphere is the story.</h2><p className="mt-4 max-w-xl text-base leading-7 text-[#d1dcd4]">Prowalk Tours brings you closer to a place through its streets, everyday moments, and binaural sound. Put on your headphones and come along. New walks arrive on YouTube every Saturday.</p><Link href="/about" className="mt-4 inline-flex min-h-11 items-center text-sm font-semibold underline underline-offset-4">About Prowalk Tours →</Link></div>
          <div className="border-t border-white/20 pt-8 lg:border-t-0 lg:border-l lg:pl-10 lg:pt-0"><h3 className="text-xl font-semibold">Behind the camera</h3><p className="mt-3 text-sm leading-7 text-[#d1dcd4]">Explore the filming and audio equipment behind the walks, or find out how to contribute to the Prowalk Tours team.</p><div className="mt-4 flex flex-wrap gap-5"><Link href="/filming-gear" className="inline-flex min-h-11 items-center text-sm font-semibold underline underline-offset-4">Our filming gear →</Link><Link href="/join-us" className="inline-flex min-h-11 items-center text-sm font-semibold underline underline-offset-4">Join the team →</Link></div></div>
        </div>
        <div className="border-t border-white/15"><div className={sectionWidth + " flex flex-wrap items-center justify-between gap-3 py-5 text-xs leading-6 text-[#d1dcd4]"}><p>Featured in The Wall Street Journal · Distribution through Janson Media</p><Link href="/press" className="underline underline-offset-4">Press & partnerships →</Link></div></div>
      </section>
    </div>
  );
}
