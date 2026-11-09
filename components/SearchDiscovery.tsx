"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

const destinations = [
  { name: "Venice", detail: "Canals, bridges & quiet lanes", query: "Venice", image: "venice" },
  { name: "Paris", detail: "Landmarks & neighborhood walks", query: "Paris", image: "paris" },
  { name: "Naples", detail: "Street life & historic quarters", query: "Naples", image: "naples" },
  { name: "Amalfi Coast", detail: "Coastal views & hillside towns", query: "Amalfi", image: "amalfi" },
  { name: "French Riviera", detail: "Seaside promenades & old towns", query: "Riviera", image: "riviera" },
  { name: "Rome", detail: "Ancient streets & city squares", query: "Rome", image: "rome" },
];

export default function SearchDiscovery() {
  const rail = useRef<HTMLDivElement>(null);
  function scroll(direction: number) {
    const element = rail.current;
    if (!element) return;
    element.scrollBy({ left: direction * element.clientWidth * 0.85, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }
  return <div className="space-y-12">
    <section aria-labelledby="discover-heading">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#607767]">A little inspiration</p>
          <h2 id="discover-heading" className="mt-2 text-2xl font-semibold tracking-tight text-[#25382f] sm:text-3xl">Where would you like to walk?</h2>
          <p className="mt-2 text-sm leading-6 text-[#526258]">Choose a place to explore my filmed walks. Swipe or use the arrows to browse.</p>
        </div>
        <div className="flex shrink-0 gap-2">
          <button type="button" aria-label="Scroll destinations left" aria-controls="search-destinations" onClick={() => scroll(-1)} className="flex h-11 w-11 items-center justify-center rounded-full border border-[#bacbbb] bg-white text-xl text-[#176347] hover:bg-[#e6eee3] focus-visible:outline-2 focus-visible:outline-offset-4">←</button>
          <button type="button" aria-label="Scroll destinations right" aria-controls="search-destinations" onClick={() => scroll(1)} className="flex h-11 w-11 items-center justify-center rounded-full border border-[#bacbbb] bg-white text-xl text-[#176347] hover:bg-[#e6eee3] focus-visible:outline-2 focus-visible:outline-offset-4">→</button>
        </div>
      </div>
      <div ref={rail} id="search-destinations" className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-5">
        {destinations.map(place => <Link key={place.query} href={`/search?q=${encodeURIComponent(place.query)}`} className="group w-[82%] shrink-0 snap-start overflow-hidden rounded-2xl border border-[#e0e5dc] bg-white focus-visible:outline-2 focus-visible:outline-offset-2 sm:w-[45%] lg:w-[31%]">
          <div className="relative aspect-[16/11] overflow-hidden">
            <Image src={`/images/homepage/${place.image}-selected.webp`} alt={place.name} fill unoptimized sizes="(min-width: 1024px) 350px, (min-width: 640px) 45vw, 82vw" className="object-cover" />
          </div>
          <div className="p-5">
            <div className="flex items-center justify-between gap-3"><h3 className="text-xl font-semibold text-[#25382f]">{place.name}</h3><span aria-hidden="true" className="text-[#176347]">↗</span></div>
            <p className="mt-1 text-sm text-[#657069]">{place.detail}</p>
            <p className="mt-4 text-sm font-semibold text-[#176347] group-hover:underline">Explore the walks →</p>
          </div>
        </Link>)}
      </div>
    </section>

    <section aria-labelledby="search-ideas-heading" className="rounded-2xl bg-[#eaf0e8] p-6 sm:p-8">
      <h2 id="search-ideas-heading" className="text-xl font-semibold text-[#25382f]">Follow your curiosity</h2>
      <p className="mt-2 text-sm leading-6 text-[#526258]">A landmark, a season, or a different way to explore.</p>
      <div className="mt-5 flex flex-wrap gap-3">
        {[
          ["Christmas markets", "/search?q=christmas%20market"],
          ["Evening walks", "/search?type=evening-walk"],
          ["Bike tours", "/search?type=bike-tour"],
          ["Boat tours", "/search?type=boat-tour"],
          ["Eiffel Tower", "/search?q=Eiffel%20Tower"],
          ["360° walks", "/search?type=360-tour"],
          ["Amalfi Coast", "/search?q=Amalfi"],
          ["Italy", "/search?country=Italy"],
          ["USA", "/search?country=USA"],
          ["Hiking tours", "/search?type=hike"],
        ].map(([label, href]) => <Link key={href} href={href} className="inline-flex min-h-11 items-center gap-4 rounded-full border border-[#cbd7c7] bg-white px-5 py-2 text-sm font-medium text-[#25382f] hover:border-[#176347] hover:text-[#176347]">{label}<span aria-hidden="true">→</span></Link>)}
      </div>
    </section>

    <Link href="/christmas-markets" className="group grid overflow-hidden rounded-2xl bg-[#25382f] text-white sm:grid-cols-2">
      <div className="relative min-h-56 sm:min-h-72"><Image src="/images/homepage/rothenburg-christmas-collection.jpeg" alt="Christmas lights and half-timbered houses in Rothenburg" fill sizes="(min-width: 640px) 50vw, 100vw" className="object-cover" /></div>
      <div className="flex flex-col justify-center p-7 sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#dbcd9b]">From watching to visiting</p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">Plan your Christmas market trip</h2>
        <p className="mt-4 text-sm leading-7 text-white/80">Watch my market walks, then use the available 2026 guides for practical tips and a suggested walking route.</p>
        <span className="mt-6 font-semibold group-hover:underline">Explore Christmas markets →</span>
      </div>
    </Link>
  </div>;
}
