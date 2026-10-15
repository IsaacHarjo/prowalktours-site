"use client";

import type { ComponentProps } from "react";
import Image from "next/image";
import Link from "next/link";
import LiveSearchBar from "../../components/LiveSearchBar";
import WorldMapClient from "../../components/WorldMapClient";

type Props = {
  videos: ComponentProps<typeof LiveSearchBar>["videos"];
  tours: ComponentProps<typeof WorldMapClient>["tours"];
};

const services = [
  {
    number: "01",
    title: "ProWalk Approved Stays",
    subtitle: "Find the right place to stay.",
    description: "Places I’ve stayed in or visited, with notes about the neighborhood and what to know before you book.",
  },
  {
    number: "02",
    title: "ProWalk Tours & Guides",
    subtitle: "Meet the people who know the place.",
    description: "Discover local tours, private guides, and drivers to help you explore. I’ll make it clear which recommendations come from my own experience and which are partner listings.",
  },
  {
    number: "03",
    title: "Travel consultations",
    subtitle: "Talk through your trip with me.",
    description: "Get help choosing a base, working out how to get around, and deciding what to see in places I’ve visited.",
  },
];

const destinations = [
  { name: "Amalfi Coast", image: "amalfi-coast", href: "/destinations/italy/campania", detail: "Coastal paths & village streets" },
  { name: "Paris", image: "paris", href: "/destinations/france/paris", detail: "Landmarks & everyday life" },
  { name: "French Riviera", image: "french-riviera", href: "/destinations/france/french-riviera", detail: "Old towns & Mediterranean light" },
];

export default function HomePreviewClient({ videos, tours }: Props) {
  const countryCount = new Set(tours.map((tour) => tour.country)).size;
  return (
    <div className="bg-white text-neutral-900 selection:bg-green-100">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-green-100 bg-green-50 px-5 py-3 text-xs text-green-900 sm:px-10">
        <span className="font-semibold uppercase tracking-widest">Homepage design preview</span>
        <Link href="/" className="underline underline-offset-4">View current homepage →</Link>
      </div>

      <section className="relative isolate">
        <Image src="/images/homepage/amalfi-coast.jpg" alt="Hillside buildings along the Amalfi Coast" fill priority sizes="100vw" className="-z-20 object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/80 via-black/50 to-black/20" />
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-10 sm:py-20 lg:py-24">
          <div className="flex items-center gap-4">
            <Image src="/logo/Prowalk Logo2.png" alt="ProWalk Tours" width={96} height={96} className="h-20 w-20 rounded-full bg-white object-contain sm:h-24 sm:w-24" priority />
            <p className="max-w-48 text-xs font-semibold uppercase leading-6 tracking-[0.2em] text-white">See the place.<br />Know the journey.</p>
          </div>
          <h1 className="mt-7 max-w-3xl font-serif text-4xl leading-tight text-white sm:text-6xl lg:text-7xl">Your next journey<br />starts with a walk.</h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-white/90">Get to know a place before you go. Watch my walks, then use what I’ve learned on those trips to help plan your own visit.</p>
          <div className="relative z-10 mt-8 max-w-2xl rounded-2xl bg-white p-4 shadow-xl sm:p-5">
            <p className="mb-3 text-sm font-semibold text-green-900">Where would you like to explore?</p>
            <LiveSearchBar videos={videos} placeholder="Search a place, landmark, or theme…" />
          </div>
          <div className="mt-6 flex flex-wrap gap-x-7 gap-y-4 text-sm font-semibold text-white">
            <Link href="/countries" className="underline decoration-white/50 underline-offset-8 hover:decoration-white">Browse countries</Link>
            <a href="#preview-world-map" className="underline decoration-white/50 underline-offset-8 hover:decoration-white">Explore the map</a>
            <a href="#plan-your-visit" className="underline decoration-white/50 underline-offset-8 hover:decoration-white">Plan your visit</a>
          </div>
        </div>
      </section>

      <div className="border-b border-neutral-200">
        <div className="mx-auto grid max-w-7xl gap-4 px-5 py-6 text-sm font-medium text-green-900 sm:grid-cols-3 sm:px-10">
          <p>First-person films. Real street sounds.</p>
          <p>A closer look before you go.</p>
          <p>Places I’ve explored on foot.</p>
        </div>
      </div>

      <section className="mx-auto grid max-w-7xl gap-8 px-5 py-14 sm:px-10 lg:grid-cols-2 lg:items-center lg:gap-14 lg:py-20">
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
          <Image src="/stuttgart-christmas-market-evening-walk-2024/highlights/stuttgart-schlossplatz.jpg" alt="Christmas lights and market stalls in Stuttgart" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-green-800">Seasonal spotlight · Christmas in Europe</p>
          <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">Find a little<br />Christmas wonder.</h2>
          <p className="mt-5 max-w-lg text-base leading-8 text-neutral-600">Wander through glowing market squares, listen to the streets, and discover the towns behind the festivities. Start with a walk and find the places you would love to visit.</p>
          <Link href="/christmas-markets" className="mt-7 inline-flex min-h-12 items-center rounded-full bg-red-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-800">Explore Christmas markets →</Link>
        </div>
      </section>

      <section id="plan-your-visit" className="scroll-mt-20 border-y border-neutral-200 bg-neutral-50">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-10 lg:py-20">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-green-800">From watching to being there</p>
          <h2 className="mt-4 font-serif text-4xl sm:text-5xl">Make the place your next trip.</h2>
          <p className="mt-5 max-w-2xl leading-7 text-neutral-600">I’m working on more ways to help you plan a trip to the places I’ve filmed.</p>
          <div className="mt-10 grid gap-10 lg:grid-cols-3">
            {services.map((service) => (
              <article key={service.number} className="border-t-2 border-green-700 pt-6">
                <span className="text-sm font-semibold text-green-800">{service.number}</span>
                <h3 className="mt-4 text-2xl font-semibold">{service.title}</h3>
                <p className="mt-3 font-medium text-green-900">{service.subtitle}</p>
                <p className="mt-4 text-sm leading-7 text-neutral-600">{service.description}</p>
                <p className="mt-6 inline-block rounded-full border border-neutral-300 px-3 py-1 text-xs font-medium text-neutral-600">In development</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="preview-world-map" className="mx-auto max-w-7xl scroll-mt-20 px-5 py-14 sm:px-10 lg:py-20">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-green-800">Follow your curiosity</p>
            <h2 className="mt-4 font-serif text-4xl sm:text-5xl">A world of walks.<br />Where will you begin?</h2>
          </div>
          <p className="max-w-md leading-7 text-neutral-600">Explore {tours.length} mapped tours across {countryCount} countries. Choose a marker to discover a walk, or browse by country to get your bearings.</p>
        </div>
        <div className="mt-8">
          <WorldMapClient tours={tours} fullWidth heightClassName="h-[420px] sm:h-[520px]" />
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          {["Italy", "France", "Germany", "Canada"].map((country) => <Link key={country} href={`/destinations/${country.toLowerCase()}`} className="rounded-full border border-green-800 px-5 py-2 text-sm font-semibold text-green-900 hover:bg-green-50">{country}</Link>)}
          <Link href="/countries" className="px-5 py-2 text-sm font-semibold text-green-900 underline underline-offset-4">All countries →</Link>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {destinations.map((destination) => <Link key={destination.name} href={destination.href} className="group">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl"><Image src={`/images/homepage/${destination.image}.jpg`} alt={destination.name} fill sizes="(min-width: 640px) 33vw, 100vw" className="object-cover transition duration-500 group-hover:scale-105" /></div>
            <h3 className="mt-4 text-xl font-semibold group-hover:text-green-800">{destination.name} →</h3>
            <p className="mt-1 text-sm text-neutral-600">{destination.detail}</p>
          </Link>)}
        </div>
      </section>

      <section className="bg-green-950 text-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-14 sm:px-10 lg:grid-cols-2 lg:gap-20 lg:py-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-green-200">For hosts, guides & travel partners</p>
            <h2 className="mt-4 font-serif text-3xl sm:text-4xl">Be part of the journey.</h2>
            <p className="mt-5 leading-7 text-green-50">Run a memorable place to stay or help travelers discover your corner of the world? A dedicated partnership inquiry page is on the way.</p>
            <p className="mt-5 text-sm leading-6 text-green-200">Hosted visits won’t guarantee approval. Partner listings and personal recommendations will be clearly distinguished.</p>
            <p className="mt-6 text-sm font-semibold">Partner inquiries · In development</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-green-200">For filmmakers, media & organizations</p>
            <h2 className="mt-4 font-serif text-3xl sm:text-4xl">Bring the world to your audience.</h2>
            <p className="mt-5 leading-7 text-green-50">Explore licensing for immersive destination footage, from atmospheric street scenes to the landmarks that tell a place’s story.</p>
            <Link href="/licensing" className="mt-7 inline-flex min-h-12 items-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-green-950 hover:bg-green-50">Explore footage licensing →</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
