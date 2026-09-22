"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import ThumbnailImg from "../../components/ThumbnailImg";
import type { WorldTour } from "../../lib/tours/types";
import { christmasHero, christmasJourneys, emptyChristmasFilters, filterChristmasWalks, type ChristmasWalk, type ChristmasFilters } from "../../lib/christmas/catalog";

const WorldMap = dynamic(() => import("../../components/WorldMapClient"), {
  ssr: false, loading: () => <div className="flex h-[420px] items-center justify-center rounded-3xl bg-[#f5f0e8] text-[#6c5b49] sm:h-[480px]" role="status">Loading the Christmas walk map…</div>,
});
const labelClass = "flex min-w-0 flex-col gap-2 text-sm font-semibold text-[#5c4c33]";
const inputClass = "min-h-11 w-full min-w-0 rounded-xl border border-[#d8c7b5] bg-white px-3 py-2 text-base text-[#2f261d] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#167fd5]";
const buttonClass = "inline-flex min-h-11 items-center justify-center rounded-full bg-[#009246] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#007a3a] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#009246]";
const unique = (values: string[]) => [...new Set(values.filter(Boolean))].sort((a, b) => a.localeCompare(b));

export default function ChristmasMarketsClient({ walks, points }: { walks: ChristmasWalk[]; points: WorldTour[] }) {
  const [filters, setFilters] = useState<ChristmasFilters>(emptyChristmasFilters);
  const countries = unique(walks.map((walk) => walk.country));
  const regions = unique(walks.filter((walk) => !filters.country || walk.country === filters.country).map((walk) => walk.region));
  const cities = unique(walks.filter((walk) => (!filters.country || walk.country === filters.country) && (!filters.region || walk.region === filters.region)).map((walk) => walk.city));
  const years = unique(walks.flatMap((walk) => walk.filmedYear ? [String(walk.filmedYear)] : [])).reverse();
  const filtered = useMemo(() => filterChristmasWalks(walks, filters), [walks, filters]);
  const filteredIds = new Set(filtered.map((walk) => walk.id));
  const filteredPoints = points.filter((point) => filteredIds.has(point.tourId));
  const groups = unique(filtered.map((walk) => `${walk.country}\u0000${walk.region}\u0000${walk.city}`));
  const destinationCount = new Set(walks.map((walk) => `${walk.country}/${walk.city}`)).size;
  const filterActive = Object.values(filters).some(Boolean);

  function browsePlace(country: string, city = "") {
    setFilters({ ...emptyChristmasFilters, country, city });
    document.getElementById("browse-walks")?.scrollIntoView({ behavior: "smooth" });
    document.getElementById("christmas-country")?.focus({ preventScroll: true });
  }

  return <div className="bg-[#fcfaf7] text-[#2f261d]">
    <section className="mx-auto max-w-7xl px-4 pb-12 pt-6 sm:px-6 lg:px-10">
      <nav aria-label="Breadcrumb" className="mb-7 text-sm text-[#6c5b49]"><Link href="/" className="hover:underline">Home</Link><span aria-hidden="true"> / </span><span aria-current="page">Christmas Markets</span></nav>
      <div className="grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9a7a52]">Europe, one winter walk at a time</p>
          <h1 className="mt-3 text-4xl font-bold leading-tight sm:text-5xl">Christmas Markets</h1>
          <p className="mt-5 text-lg leading-8 text-[#6c5b49]">Walk through the lights, listen to the streets, and get to know a place before you go.</p>
          <p className="mt-4 leading-7 text-[#6c5b49]">I’m Isaac, the filmmaker behind ProWalk Tours. These are markets and streets I’ve walked myself, filmed across several Christmas seasons. Explore the walks by destination, then follow the journeys that connect them.</p>
          <div className="mt-6 flex flex-wrap gap-3"><a href="#browse-walks" className={buttonClass}>Find a Christmas walk</a><a href="#journeys" className="inline-flex min-h-11 items-center rounded-full border border-[#d8c7b5] px-5 py-2.5 text-sm font-semibold hover:bg-white">Explore my journeys →</a></div>
          <p className="mt-6 text-sm font-semibold text-[#9a7a52]">{walks.length} walks · {destinationCount} destinations · {countries.length} countries in this collection</p>
        </div>
        <figure className="overflow-hidden rounded-[1.5rem] border border-[#eadfce] bg-white shadow-sm">
          <Image src={christmasHero.src} alt={christmasHero.alt} width={1280} height={720} priority sizes="(min-width: 1024px) 55vw, 100vw" className="aspect-[16/10] w-full object-cover" />
          <figcaption className="px-5 py-3 text-xs text-[#6c5b49]">{christmasHero.caption}</figcaption>
        </figure>
      </div>
    </section>

    <section aria-labelledby="destinations-heading" className="border-y border-[#eadfce] bg-white">
      <div className="mx-auto max-w-7xl px-4 py-9 sm:px-6 lg:px-10">
        <h2 id="destinations-heading" className="text-2xl font-bold">Start with a destination</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">{countries.map((country) => {
          const countryWalks = walks.filter((walk) => walk.country === country);
          const places = unique(countryWalks.map((walk) => walk.city));
          return <button key={country} type="button" onClick={() => browsePlace(country)} className="rounded-2xl border border-[#eadfce] bg-[#fcfaf7] p-5 text-left transition hover:border-[#009246] hover:shadow-sm focus-visible:outline-2 focus-visible:outline-[#009246]">
            <span className="flex items-baseline justify-between gap-3"><span className="text-xl font-bold">{country}</span><span className="text-sm text-[#6c5b49]">{countryWalks.length} walks</span></span>
            <span className="mt-3 block text-sm leading-6 text-[#6c5b49]">{places.join(" · ")}</span>
            <span className="mt-4 block text-sm font-semibold text-[#167fd5]">Browse {country} →</span>
          </button>;
        })}</div>
      </div>
    </section>

    <section id="browse-walks" aria-labelledby="walks-heading" className="mx-auto max-w-7xl scroll-mt-20 px-4 py-12 sm:px-6 lg:px-10">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9a7a52]">The Christmas collection</p>
      <h2 id="walks-heading" className="mt-2 text-3xl font-bold">Find your next walk</h2>
      <p className="mt-3 max-w-3xl leading-7 text-[#6c5b49]">Choose a place or filming year. The map and walk list show the same selection, with day, evening and 360° tours where available.</p>
      <div className="mt-6 rounded-2xl border border-[#eadfce] bg-white p-4 sm:p-5">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <label className={labelClass}>Country<select id="christmas-country" className={inputClass} value={filters.country} onChange={(event) => setFilters({ ...filters, country: event.target.value, region: "", city: "" })}><option value="">All countries</option>{countries.map((value) => <option key={value}>{value}</option>)}</select></label>
          <label className={labelClass}>Region<select className={inputClass} value={filters.region} onChange={(event) => setFilters({ ...filters, region: event.target.value, city: "" })}><option value="">All regions</option>{regions.map((value) => <option key={value}>{value}</option>)}</select></label>
          <label className={labelClass}>City / destination<select className={inputClass} value={filters.city} onChange={(event) => setFilters({ ...filters, city: event.target.value })}><option value="">All destinations</option>{cities.map((value) => <option key={value}>{value}</option>)}</select></label>
          <label className={labelClass}>Filming year<select className={inputClass} value={filters.year} onChange={(event) => setFilters({ ...filters, year: event.target.value })}><option value="">All years</option>{years.map((value) => <option key={value}>{value}</option>)}</select></label>
        </div>
        <div className="mt-4 flex flex-col items-stretch gap-4 sm:flex-row sm:items-end"><label className={`${labelClass} min-w-0 flex-1`}>Search this collection<input type="search" placeholder="Try Colmar or a landmark" className={inputClass} value={filters.query} onChange={(event) => setFilters({ ...filters, query: event.target.value })} /></label><button type="button" onClick={() => setFilters(emptyChristmasFilters)} disabled={!filterActive} className="min-h-11 rounded-full border border-[#d8c7b5] px-5 text-sm font-semibold hover:bg-[#f8f3ec] disabled:opacity-40">Clear filters</button></div>
      </div>
      <div className="my-5 flex flex-wrap items-center justify-between gap-3"><p role="status" className="font-semibold">{filtered.length} {filtered.length === 1 ? "walk" : "walks"} · {groups.length} {groups.length === 1 ? "destination" : "destinations"}</p><a href="#walk-results" className="text-sm font-semibold text-[#167fd5] hover:underline">Skip map to walk list ↓</a></div>
      {filteredPoints.length > 0 ? <WorldMap key={filteredPoints.map((point) => point.tourId).join(",")} tours={filteredPoints} fitToTours heightClassName="h-[420px] sm:h-[480px]" /> : <div className="rounded-2xl border border-[#eadfce] bg-white p-8 text-[#6c5b49]">{filtered.length ? "These walks do not yet have map locations. You can still watch them below." : "No mapped walks match these filters."}</div>}
      <p className="mt-3 text-sm leading-6 text-[#6c5b49]">{filteredPoints.length} mapped walks. Numbers group nearby walks; select a cluster to browse its videos, or zoom in to separate locations. Markers show filming start points.</p>
      <div id="walk-results" className="scroll-mt-20">
        {!filtered.length ? <div className="mt-8 rounded-2xl border border-[#eadfce] bg-white p-8 text-center"><h3 className="text-xl font-bold">No walks match this selection</h3><p className="mt-2 text-[#6c5b49]">Try another place, remove the filming year, or clear the filters.</p><button className={`${buttonClass} mt-5`} onClick={() => setFilters(emptyChristmasFilters)}>Show all Christmas walks</button></div> : groups.map((group) => {
          const [country, region, city] = group.split("\u0000");
          const cityWalks = filtered.filter((walk) => walk.country === country && walk.region === region && walk.city === city);
          return <section key={group} className="mt-10"><p className="text-xs font-semibold uppercase tracking-wider text-[#9a7a52]">{country} · {region}</p><h3 className="mt-2 text-2xl font-bold">{city}</h3><div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{cityWalks.map((walk) => <article key={walk.id} className="overflow-hidden rounded-2xl border border-[#eadfce] bg-white shadow-sm">
            <div className="aspect-video overflow-hidden bg-[#2f261d]"><ThumbnailImg src={walk.thumbnail} alt={walk.siteTitle} className="h-full w-full object-cover" /></div>
            <div className="p-5"><p className="text-xs font-semibold uppercase tracking-wider text-[#9a7a52]">{walk.videoType.replace(/-/g, " ")} · Filmed {walk.filmedYear ?? "date unknown"}</p><h4 className="mt-2 text-lg font-bold leading-7">{walk.siteTitle}</h4>{walk.durationLabel && <p className="mt-3 text-sm text-[#6c5b49]">Video length: {walk.durationLabel}</p>}<Link href={walk.watchHref} target={walk.watchDestinationType === "youtube" ? "_blank" : undefined} rel={walk.watchDestinationType === "youtube" ? "noreferrer" : undefined} className="mt-4 inline-flex min-h-11 items-center rounded-full bg-[#167fd5] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#0f6db9]">{walk.watchDestinationType === "youtube" ? "Watch on YouTube ↗" : "Explore this walk →"}<span className="sr-only"> {walk.siteTitle}</span></Link></div>
          </article>)}</div></section>;
        })}
      </div>
    </section>

    <section id="journeys" aria-labelledby="journeys-heading" className="scroll-mt-20 border-y border-[#eadfce] bg-[#f5f0e8]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-10"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9a7a52]">From my filming journeys</p><h2 id="journeys-heading" className="mt-2 text-3xl font-bold">Places that connect</h2><p className="mt-3 max-w-3xl leading-7 text-[#6c5b49]">These are routes I traveled, shared as starting points for exploring the footage. Detailed itineraries will follow as I check my travel notes. They are not yet day-by-day trip plans.</p>
        <div className="mt-6 grid gap-6 lg:grid-cols-2">{christmasJourneys.map((journey) => <article key={journey.id} className="rounded-3xl border border-[#eadfce] bg-white p-6 sm:p-8"><p className="text-xs font-semibold uppercase tracking-wider text-[#9a7a52]">{journey.label}</p><h3 className="mt-3 text-2xl font-bold">{journey.title}</h3><p className="mt-4 leading-7 text-[#6c5b49]">{journey.description}</p><ol className="mt-5 flex flex-wrap items-center gap-2" aria-label={`${journey.title} stop order`}>{journey.stops.map((stop, index) => {
          const available = walks.some((walk) => walk.city === stop.city && walk.country === stop.country);
          return <li key={stop.city} className="flex items-center gap-2">{index > 0 && <span aria-hidden="true" className="text-[#9a7a52]">→</span>}{available ? <button type="button" onClick={() => browsePlace(stop.country, stop.city)} className="min-h-11 rounded-full border border-[#d8c7b5] px-3 py-2 text-sm font-semibold text-[#167fd5] hover:bg-[#edf6fd]" aria-label={`Browse ${stop.city} walks, all filming years`}>{stop.city}</button> : <span className="px-1 py-2 text-sm text-[#6c5b49]">{stop.city}</span>}</li>;
        })}</ol><p className="mt-4 text-xs leading-5 text-[#6c5b49]">Select a linked stop to see available walks from that destination across all filming years. Other stops are not yet available in this collection.</p><p className="mt-5 border-t border-[#eadfce] pt-4 text-sm leading-6 text-[#6c5b49]">{journey.note}</p></article>)}</div>
      </div>
    </section>
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-10"><div className="grid gap-8 md:grid-cols-2"><div><h2 className="text-2xl font-bold">About the filming dates</h2><p className="mt-3 leading-7 text-[#6c5b49]">These films show the markets as I experienced them in their filming years. They do not confirm 2026 opening dates, market layouts, snow or transport services. Current-season planning details will be added separately after verification.</p></div><div><h2 className="text-2xl font-bold">More walks from the archive</h2><p className="mt-3 leading-7 text-[#6c5b49]">I’m preparing more Christmas-market films from my travels. This collection will grow as those walks are published.</p><a href="https://www.youtube.com/@ProwalkTours" target="_blank" rel="noreferrer" className="mt-4 inline-flex min-h-11 items-center text-sm font-semibold text-[#167fd5] hover:underline">Follow ProWalk Tours on YouTube ↗</a></div></div></section>
  </div>;
}
