"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import ThumbnailImg from "../../components/ThumbnailImg";
import CompactWalkList from "../../components/guides/CompactWalkList";
import type { WorldTour } from "../../lib/tours/types";
import { colmarPhotos } from "../../lib/christmas/colmar-photos";
import { featuredChristmasCities, christmasDestinationImages } from "../../lib/christmas/destinations";
import { christmasJourneys, emptyChristmasFilters, filterChristmasWalks, type ChristmasWalk, type ChristmasFilters } from "../../lib/christmas/catalog";

const WorldMap = dynamic(() => import("../../components/WorldMapClient"), { ssr: false, loading: () => <div className="flex h-[420px] items-center justify-center rounded-2xl bg-[#edf1ed] sm:h-[480px]" role="status">Loading the Christmas walk map…</div> });
const width = "mx-auto max-w-7xl px-5 sm:px-8 lg:px-10";
const eyebrow = "text-xs font-semibold uppercase tracking-[0.18em] text-[#607767]";
const labelClass = "flex min-w-0 flex-col gap-2 text-sm font-semibold text-[#526258]";
const inputClass = "min-h-11 w-full min-w-0 rounded-xl border border-[#cbd6c8] bg-white px-3 py-2 text-base text-[#25382f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#176347]";
const buttonClass = "inline-flex min-h-11 items-center justify-center rounded-full bg-[#176347] px-5 py-3 text-sm font-semibold text-white hover:bg-[#25382f]";
const textLink = "inline-flex min-h-11 items-center text-sm font-semibold text-[#176347] underline-offset-4 hover:underline";
const unique = (values: string[]) => [...new Set(values.filter(Boolean))].sort((a, b) => a.localeCompare(b));
type Props = { walks: ChristmasWalk[]; points: WorldTour[]; initialFilters: ChristmasFilters };

export default function ChristmasMarketsClient({ walks, points, initialFilters }: Props) {
  const [filters, setFilters] = useState(initialFilters);
  const [allDestinations, setAllDestinations] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [visibleCount, setVisibleCount] = useState(8);
  const countries = unique(walks.map(walk => walk.country));
  const regions = unique(walks.filter(walk => !filters.country || walk.country === filters.country).map(walk => walk.region));
  const cities = unique(walks.filter(walk => (!filters.country || walk.country === filters.country) && (!filters.region || walk.region === filters.region)).map(walk => walk.city));
  const years = unique(walks.flatMap(walk => walk.filmedYear ? [String(walk.filmedYear)] : [])).reverse();
  const filtered = useMemo(() => filterChristmasWalks(walks, filters), [walks, filters]);
  const filteredIds = new Set(filtered.map(walk => walk.id));
  const filteredPoints = points.filter(point => filteredIds.has(point.tourId));
  const destinationCount = new Set(walks.map(walk => `${walk.country}/${walk.city}`)).size;
  const filteredDestinationCount = new Set(filtered.map(walk => `${walk.country}/${walk.city}`)).size;
  const filterActive = Object.values(filters).some(Boolean);
  const featuredCountries = ["France", "Germany", "Switzerland"].filter(country => countries.includes(country));
  const directoryCountries = allDestinations ? [...featuredCountries, ...countries.filter(country => !featuredCountries.includes(country))] : featuredCountries;
  const featuredRoute = christmasJourneys.find(journey => journey.id === "basel-alsace-2025")!;
  function updateFilters(next: ChristmasFilters) { setFilters(next); setVisibleCount(8); }
  function browsePlace(country: string, city = "") {
    updateFilters({ ...emptyChristmasFilters, country, city });
    document.getElementById("browse-walks")?.scrollIntoView({ behavior: "smooth" });
    document.getElementById("christmas-country")?.focus({ preventScroll: true });
  }
  function resolveCountry(country: string) { return country === "Czech Republic" && countries.includes("Czechia") ? "Czechia" : country; }

  return <div className="bg-[#fcfaf7] text-[#25382f]">
    <section className={width + " pb-12 pt-6 sm:pb-16"}>
      <nav aria-label="Breadcrumb" className="mb-8 text-sm text-[#657069]"><Link href="/" className="hover:underline">Home</Link><span aria-hidden="true"> / </span><span aria-current="page">Christmas Markets</span></nav>
      <div className="grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
        <div><p className={eyebrow}>Europe, one winter walk at a time</p><h1 className="mt-4 font-serif text-5xl leading-[1.06] tracking-tight sm:text-6xl">Christmas Markets</h1><p className="mt-6 text-lg leading-8 text-[#657069]">Explore Europe’s Christmas markets, whether you’re planning a trip or enjoying the sights and sounds from home.</p><p className="mt-4 leading-7 text-[#657069]">I’m Isaac, the filmmaker behind ProWalk Tours. Start with a destination, look around through the films, and find ideas for your own winter journey.</p><div className="mt-7 flex flex-wrap gap-4"><a href="#destinations" className={buttonClass}>Choose a destination</a><a href="#browse-walks" className={textLink}>Watch the walks ↓</a></div><p className="mt-6 text-xs leading-6 text-[#657069]">{walks.length} walks · {destinationCount} destinations · {countries.length} countries</p></div>
        <Link href="/christmas-markets/colmar" className="group overflow-hidden rounded-[1.5rem] border border-[#dce1d6] bg-white"><Image src={colmarPhotos.C157.src} alt={colmarPhotos.C157.alt} width={colmarPhotos.C157.width} height={colmarPhotos.C157.height} unoptimized loading="eager" sizes="(min-width: 1024px) 55vw, 100vw" className="aspect-[16/10] w-full object-cover transition duration-500 group-hover:scale-[1.015]" /><div className="p-6"><p className={eyebrow}>The first destination guide · Alsace, France</p><h2 className="mt-2 text-2xl font-semibold">Christmas in Colmar <span aria-hidden="true">→</span></h2><p className="mt-3 text-sm leading-6 text-[#657069]">2026 dates, market squares and ways to arrive, with photographs and two walks through the old town.</p><p className="mt-3 text-xs text-[#657069]">Photographed in December 2025</p></div></Link>
      </div>
    </section>

    <section aria-labelledby="route-inspiration-heading" className="bg-[#25382f] text-white"><div className={width + " grid gap-7 py-9 lg:grid-cols-[0.75fr_1.25fr] lg:gap-12"}><div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#c0d3c5]">A route to build a trip around</p><h2 id="route-inspiration-heading" className="mt-3 text-2xl font-semibold">Basel, Alsace & Freiburg</h2><a href="#journeys" className="mt-3 inline-flex min-h-11 items-center text-sm font-semibold underline underline-offset-4">Explore the filming journeys ↓</a></div><div><ol className="flex flex-wrap gap-x-3 gap-y-2" aria-label="Featured December 2025 filming route">{featuredRoute.stops.map((stop, index) => <li key={stop.city} className="flex items-center gap-3">{index > 0 && <span aria-hidden="true" className="text-[#c0d3c5]">→</span>}<span className="py-2 text-sm font-semibold">{stop.city}</span></li>)}</ol><p className="mt-3 text-sm leading-7 text-[#c0d3c5]">My December 2025 filming route is a starting point for a regional trip. Day-by-day timings, travel connections and overnight bases will follow the trip notes.</p></div></div></section>

    <section id="destinations" aria-labelledby="destinations-heading" className={width + " scroll-mt-20 py-14 sm:py-16"}><p className={eyebrow}>Choose your next stop</p><h2 id="destinations-heading" className="mt-3 text-3xl font-semibold tracking-tight">Start with a destination</h2><p className="mt-4 max-w-2xl leading-7 text-[#657069]">Browse the places in the Christmas collection. Colmar has our first planning guide; the other destinations open their available walks.</p>
      {directoryCountries.map(country => {
        const countryWalks = walks.filter(walk => walk.country === country);
        const places = unique(countryWalks.map(walk => walk.city));
        const shown = allDestinations ? places : (featuredChristmasCities[country] ?? places.slice(0, 3)).filter(city => places.includes(city));
        return <div key={country} className="mt-9"><div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#dce1d6] pt-5"><h3 className="text-xl font-semibold">{country}</h3><button type="button" onClick={() => browsePlace(country)} className={textLink}>{countryWalks.length === 1 ? "View the walk" : `All ${countryWalks.length} walks`} in {country} →</button></div><div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{shown.map(city => {
          const cityWalks = countryWalks.filter(walk => walk.city === city);
          const representative = cityWalks[0];
          const isColmar = country === "France" && city === "Colmar";
          const content = <><div className="aspect-[16/9] overflow-hidden rounded-xl bg-[#e6e7de]">{isColmar ? <Image src={colmarPhotos.C258.src} alt={colmarPhotos.C258.alt} width={1400} height={1050} sizes="(min-width: 1024px) 380px, (min-width: 640px) 45vw, 100vw" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /> : <ThumbnailImg src={christmasDestinationImages[`${country}/${city}`] ?? representative.thumbnail} alt={`${city} in the Christmas walking tour archive`} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />}</div><div className="pt-4"><p className="text-xs text-[#657069]">{representative.region || country} · {cityWalks.length} {cityWalks.length === 1 ? "walk" : "walks"}</p><h4 className="mt-1 text-xl font-semibold">{city}</h4><span className={textLink}>{isColmar ? "Read the 2026 guide" : "Explore the walks"} →</span></div></>;
          return isColmar ? <Link key={city} href="/christmas-markets/colmar" className="group block rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#176347]">{content}</Link> : <button key={city} type="button" onClick={() => browsePlace(country, city)} className="group block rounded-xl text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#176347]">{content}</button>;
        })}</div></div>;
      })}
      <button type="button" aria-expanded={allDestinations} onClick={() => setAllDestinations(!allDestinations)} className="mt-9 min-h-11 rounded-full border border-[#cbd6c8] bg-white px-6 py-3 text-sm font-semibold hover:border-[#176347]">{allDestinations ? "Show featured destinations" : `Show all ${destinationCount} destinations across ${countries.length} countries`}</button>
    </section>

    <section id="browse-walks" aria-labelledby="walks-heading" className="scroll-mt-20 border-y border-[#dce1d6] bg-white"><div className={width + " py-14 sm:py-16"}><p className={eyebrow}>The complete Christmas collection</p><h2 id="walks-heading" className="mt-3 text-3xl font-semibold tracking-tight">Find your next walk</h2><p className="mt-4 max-w-2xl leading-7 text-[#657069]">Choose a place or filming year, search for a landmark, or open the map. The films show each market as it appeared on that visit.</p>
      <div className="mt-7 rounded-2xl bg-[#f1f3ed] p-4 sm:p-6"><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <label className={labelClass}>Country<select id="christmas-country" className={inputClass} value={filters.country} onChange={event => updateFilters({ ...filters, country: event.target.value, region: "", city: "" })}><option value="">All countries</option>{countries.map(value => <option key={value}>{value}</option>)}</select></label>
        <label className={labelClass}>Region<select className={inputClass} value={filters.region} onChange={event => updateFilters({ ...filters, region: event.target.value, city: "" })}><option value="">All regions</option>{regions.map(value => <option key={value}>{value}</option>)}</select></label>
        <label className={labelClass}>City / destination<select className={inputClass} value={filters.city} onChange={event => updateFilters({ ...filters, city: event.target.value })}><option value="">All destinations</option>{cities.map(value => <option key={value}>{value}</option>)}</select></label>
        <label className={labelClass}>Filming year<select className={inputClass} value={filters.year} onChange={event => updateFilters({ ...filters, year: event.target.value })}><option value="">All years</option>{years.map(value => <option key={value}>{value}</option>)}</select></label>
      </div><div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end"><label className={labelClass + " flex-1"}>Search this collection<input type="search" placeholder="Try Colmar or a landmark" className={inputClass} value={filters.query} onChange={event => updateFilters({ ...filters, query: event.target.value })} /></label><button type="button" disabled={!filterActive} onClick={() => updateFilters(emptyChristmasFilters)} className="min-h-11 rounded-full border border-[#cbd6c8] bg-white px-5 py-2 text-sm font-semibold disabled:opacity-40">Clear filters</button></div></div>
      <div className="my-5 flex flex-wrap items-center justify-between gap-3"><p role="status" className="text-sm font-semibold">{filtered.length} {filtered.length === 1 ? "walk" : "walks"} · {filteredDestinationCount} {filteredDestinationCount === 1 ? "destination" : "destinations"}</p><button aria-expanded={showMap} aria-controls="christmas-map" onClick={() => setShowMap(!showMap)} className={textLink}>{showMap ? "Hide map ↑" : "Explore these walks on the map ↓"}</button></div>
      {showMap && <div id="christmas-map" className="mb-6">{filteredPoints.length ? <WorldMap key={filteredPoints.map(point => point.tourId).join(",")} tours={filteredPoints} fitToTours heightClassName="h-[420px] sm:h-[480px]" /> : <p className="rounded-2xl bg-[#edf1ed] p-6">No mapped walks match this selection.</p>}<p className="mt-3 text-xs leading-6 text-[#657069]">{filteredPoints.length} mapped walks. Select a numbered group to browse nearby films, or zoom in to separate locations. Markers show filming start points.</p></div>}
      <div id="walk-results" className="scroll-mt-20">{filtered.length ? <><CompactWalkList walks={filtered.slice(0, visibleCount)} />{filtered.length > visibleCount && <button onClick={() => setVisibleCount(visibleCount + 12)} className="mt-5 min-h-11 rounded-full border border-[#cbd6c8] px-6 py-3 text-sm font-semibold hover:bg-[#edf1ed]">Show more walks ({filtered.length - visibleCount} remaining)</button>}</> : <div className="rounded-2xl bg-[#f1f3ed] p-8 text-center"><h3 className="text-xl font-semibold">No walks match this selection</h3><p className="mt-3 text-[#657069]">Try another place or clear the filters.</p><button className={buttonClass + " mt-5"} onClick={() => updateFilters(emptyChristmasFilters)}>Show all Christmas walks</button></div>}</div>
    </div></section>

    <section id="journeys" aria-labelledby="journeys-heading" className={width + " scroll-mt-20 py-14 sm:py-16"}><p className={eyebrow}>From my filming journeys</p><h2 id="journeys-heading" className="mt-3 text-3xl font-semibold tracking-tight">Places that connect</h2><p className="mt-4 max-w-3xl leading-7 text-[#657069]">Follow the destinations from my Christmas travels. These historical filming sequences offer route ideas; practical day-by-day itineraries will follow as I check the trip notes.</p><div className="mt-8 grid gap-6 lg:grid-cols-2">{[featuredRoute, ...christmasJourneys.filter(journey => journey.id !== featuredRoute.id)].map(journey => <article key={journey.id} className="rounded-2xl border border-[#dce1d6] bg-white p-6 sm:p-8"><p className={eyebrow}>{journey.label}</p><h3 className="mt-3 text-2xl font-semibold">{journey.title}</h3><p className="mt-4 text-sm leading-7 text-[#657069]">{journey.description}</p><ol className="mt-5 flex flex-wrap gap-2" aria-label={`${journey.title} stop order`}>{journey.stops.map((stop, index) => {
      const country = resolveCountry(stop.country);
      const available = walks.some(walk => walk.city === stop.city && walk.country === country);
      return <li key={`${journey.id}-${index}`} className="flex items-center gap-2">{index > 0 && <span aria-hidden="true" className="text-[#947a50]">→</span>}{available ? <button type="button" onClick={() => browsePlace(country, stop.city)} className="min-h-11 rounded-full border border-[#dce1d6] px-3 py-2 text-sm font-semibold text-[#176347] hover:bg-[#edf1ed]" aria-label={`Browse ${stop.city} walks, all filming years`}>{stop.city}</button> : <span className="px-1 py-2 text-sm text-[#657069]">{stop.city}</span>}</li>;
    })}</ol><p className="mt-5 border-t border-[#e1e3d9] pt-4 text-xs leading-6 text-[#657069]">{journey.note} Linked stops show available walks across all filming years.</p></article>)}</div></section>
    <section className="bg-[#edf1ed]"><div className={width + " flex flex-col justify-between gap-5 py-9 sm:flex-row sm:items-center"}><div><h2 className="text-xl font-semibold">Another winter, another walk</h2><p className="mt-2 text-sm leading-7 text-[#657069]">The archive grows as more films from my travels are published.</p></div><a href="https://www.youtube.com/@ProwalkTours" target="_blank" rel="noreferrer" className={textLink}>Follow ProWalk Tours on YouTube ↗</a></div></section>
  </div>;
}
