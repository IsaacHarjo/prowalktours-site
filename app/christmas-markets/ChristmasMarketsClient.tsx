"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import ThumbnailImg from "../../components/ThumbnailImg";
import CompactWalkList from "../../components/guides/CompactWalkList";
import type { WorldTour } from "../../lib/tours/types";
import { colmarPhotos } from "../../lib/christmas/colmar-photos";
import { featuredChristmasCities, christmasDestinationImages, upcomingChristmasDestinations } from "../../lib/christmas/destinations";
import { emptyChristmasFilters, filterChristmasWalks, type ChristmasWalk, type ChristmasFilters } from "../../lib/christmas/catalog";

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
  const [destinationQuery, setDestinationQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(initialFilters.country);
  const [showWalks, setShowWalks] = useState(Object.values(initialFilters).some(Boolean));
  const [showMap, setShowMap] = useState(false);
  const [visibleCount, setVisibleCount] = useState(8);
  const countries = unique([...walks.map(walk => walk.country), ...upcomingChristmasDestinations.map(place => place.country)]);
  const regions = unique(walks.filter(walk => !filters.country || walk.country === filters.country).map(walk => walk.region));
  const cities = unique(walks.filter(walk => (!filters.country || walk.country === filters.country) && (!filters.region || walk.region === filters.region)).map(walk => walk.city));
  const years = unique(walks.flatMap(walk => walk.filmedYear ? [String(walk.filmedYear)] : [])).reverse();
  const filtered = useMemo(() => filterChristmasWalks(walks, filters), [walks, filters]);
  const filteredIds = new Set(filtered.map(walk => walk.id));
  const filteredPoints = points.filter(point => filteredIds.has(point.tourId));
  const filteredDestinationCount = new Set(filtered.map(walk => `${walk.country}/${walk.city}`)).size;
  const filterActive = Object.values(filters).some(Boolean);
  const featuredCountries = ["France", "Germany", "Switzerland"].filter(country => countries.includes(country));
  const directoryCountries = [...featuredCountries, ...countries.filter(country => !featuredCountries.includes(country))];
  const normalize = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
  const countryId = (country: string) => `markets-${country.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
  useEffect(() => {
    const reveal = () => { if (["#browse-walks", "#walk-results", "#christmas-map"].includes(window.location.hash)) setShowWalks(true); };
    reveal();
    window.addEventListener("hashchange", reveal);
    return () => window.removeEventListener("hashchange", reveal);
  }, []);
  function updateFilters(next: ChristmasFilters) { setFilters(next); setVisibleCount(8); }
  function browsePlace(country: string, city = "") {
    setShowWalks(true);
    updateFilters({ ...emptyChristmasFilters, country, city });
    document.getElementById("browse-walks")?.scrollIntoView({ behavior: "smooth" });

  }
  const guides: Record<string, { href: string; description: string; detail: string }> = {
    Colmar: { href: "/christmas-markets/colmar", description: "Explore the Christmas squares and the changing scenery between them, from Saint-Martin to Petite Venise.", detail: "Several markets, one historic centre" },
    Kaysersberg: { href: "/christmas-markets/kaysersberg", description: "Walk the decorated main street in both directions, with bridges and half-timbered houses along the Weiss.", detail: "A compact village & riverside views" },
    "Ribeauvillé": { href: "/christmas-markets/ribeauville", description: "Costumed performers, food over open fires and courtyard games make this feel like a medieval festival.", detail: "A medieval market on two weekends" },
    Riquewihr: { href: "/christmas-markets/riquewihr", description: "Look beyond the stalls: step into courtyards, browse Christmas shops and explore around the Dolder.", detail: "Christmas streets, shops & courtyards" },
  };
  const matches = (country: string, city: string, region: string) => normalize(`${country} ${city} ${region}`).includes(normalize(destinationQuery));
  const hasMatches = walks.some(walk => (!selectedCountry || walk.country === selectedCountry) && matches(walk.country, walk.city, walk.region || "")) || upcomingChristmasDestinations.some(place => (!selectedCountry || place.country === selectedCountry) && matches(place.country, place.city, place.region));

  return <div className="bg-[#fcfaf7] text-[#25382f]">
    <section id="destinations" aria-label="Christmas markets by country" className={width + " scroll-mt-24 pb-12"}>
      <div className="pb-3 pt-12 sm:pt-16">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <h1 className="font-serif text-4xl sm:text-5xl">Find your next Christmas market</h1>
            <p className="mt-4 max-w-2xl leading-7 text-[#526258]">Choose a country, find a market and plan a visit of your own. My guides bring together practical tips, suggested routes and the walks I filmed along the way.</p>
          </div>
          <a href="#browse-walks" onClick={() => setShowWalks(true)} className={textLink + " shrink-0"}>Just here to watch? ↓</a>
        </div>
        <div className="mt-7 grid gap-4 rounded-2xl border border-[#dce1d6] bg-white p-4 sm:grid-cols-[1fr_1.6fr] sm:p-5">
          <label className={labelClass}>Pick a country<select className={inputClass} value={selectedCountry} onChange={event => { setSelectedCountry(event.target.value); setDestinationQuery(""); }}><option value="">All countries</option>{directoryCountries.map(country => <option key={country}>{country}</option>)}</select></label>
          <label className={labelClass}>Find a market<input type="search" className={inputClass} placeholder="Try Alsace, Colmar or Germany" value={destinationQuery} onChange={event => { setDestinationQuery(event.target.value); setSelectedCountry(""); }} /></label>
        </div>
        <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Quick country selection">{["", ...featuredCountries].map(country => <button key={country} aria-pressed={selectedCountry === country} onClick={() => { setSelectedCountry(country); setDestinationQuery(""); }} className={`min-h-11 rounded-full border px-5 py-2 text-sm font-semibold ${selectedCountry === country ? "border-[#203d32] bg-[#203d32] text-white" : "border-[#cbd6c8] hover:border-[#176347]"}`}>{country || "All countries"}</button>)}</div>
      </div>
      {!hasMatches && <div role="status" className="py-12"><h2 className="text-2xl font-semibold">No markets match “{destinationQuery}”</h2><p className="mt-3 text-[#657069]">Try a town, region or country, or see all the places I’ve filmed.</p><button onClick={() => { setDestinationQuery(""); setSelectedCountry(""); }} className={buttonClass + " mt-4"}>Show all destinations</button></div>}
      {directoryCountries.map(country => {
        if (selectedCountry && selectedCountry !== country) return null;
        const countryWalks = walks.filter(walk => walk.country === country);
        const upcoming = upcomingChristmasDestinations.filter(place => place.country === country);
        const places = unique([...countryWalks.map(walk => walk.city), ...upcoming.map(place => place.city)]);
        const preferred = featuredChristmasCities[country] ?? [];
        const ordered = [...preferred.filter(city => places.includes(city)), ...places.filter(city => !preferred.includes(city))];
        const shown = ordered.filter(city => matches(country, city, countryWalks.find(walk => walk.city === city)?.region || upcoming.find(place => place.city === city)?.region || ""));
        if (!shown.length) return null;
        const ready = country === "France" ? shown.filter(city => guides[city]) : [];
        const other = shown.filter(city => !ready.includes(city));
        return <section key={country} id={countryId(country)} tabIndex={-1} aria-labelledby={`${countryId(country)}-heading`} className="scroll-mt-24 border-b border-[#dce1d6] py-10 outline-none sm:py-12">
          <div className="mb-7 flex flex-wrap items-end justify-between gap-3"><div><p className={eyebrow}>{country === "France" ? "Begin in Alsace" : "More places I’ve filmed"}</p><h2 id={`${countryId(country)}-heading`} className="mt-2 font-serif text-4xl">{country}</h2></div><p className="text-sm text-[#657069]">{ready.length ? `${ready.length} ${ready.length === 1 ? "guide" : "guides"} to help plan your visit` : "Explore my walks while I put the guides together"}</p></div>
          {ready.length > 0 && <div className="grid gap-6 sm:grid-cols-2">{ready.map(city => {
            const guide = guides[city];
            return <Link key={city} href={guide.href} className="group overflow-hidden rounded-2xl border border-[#dce1d6] bg-white transition hover:border-[#176347] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#176347]">
              <div className="relative aspect-[16/9] overflow-hidden bg-[#e6e7de]">{city === "Colmar" ? <Image src={colmarPhotos.C258.src} alt={colmarPhotos.C258.alt} width={1400} height={1050} sizes="(min-width: 640px) 50vw, 100vw" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /> : <ThumbnailImg src={christmasDestinationImages[`${country}/${city}`]} alt={`Christmas in ${city} during my visit`} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />}<span className="absolute bottom-4 left-4 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-[#176347]">2026 guide</span></div>
              <div className="p-5 sm:p-6"><p className="text-xs font-semibold uppercase tracking-wide text-[#657069]">{guide.detail}</p><h3 className="mt-2 text-2xl font-semibold">{city}</h3><p className="mt-3 text-sm leading-7 text-[#526258]">{guide.description}</p><span className={textLink + " mt-3"}>Read the 2026 guide →</span></div>
            </Link>;
          })}</div>}
          {other.length > 0 && <div className={ready.length ? "mt-9" : ""}>{ready.length > 0 && <h3 className="mb-4 text-lg font-semibold">More Christmas walks in {country}</h3>}<div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{other.map(city => { const walk = countryWalks.find(walk => walk.city === city); if (!walk) return <article key={city} className="flex min-h-28 flex-col justify-center rounded-xl border border-[#dce1d6] bg-[#edf1ed] p-5"><h3 className="font-semibold">{city}</h3><p className="mt-1 text-xs leading-5 text-[#657069]">Guide in preparation</p><p className="mt-1 text-sm text-[#526258]">Filmed in {upcoming.find(place => place.city === city)?.filmedYear} · Walk coming soon</p></article>; return <button key={city} type="button" onClick={() => browsePlace(country, city)} className="group flex items-center gap-4 rounded-xl border border-[#dce1d6] bg-white p-3 text-left hover:border-[#176347] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#176347]"><ThumbnailImg src={christmasDestinationImages[`${country}/${city}`] ?? walk.thumbnail} alt={`My Christmas walk in ${city}`} className="h-20 w-24 shrink-0 rounded-lg object-cover" /><span><span className="block font-semibold">{city}</span><span className="mt-1 block text-xs leading-5 text-[#657069]">Guide in preparation</span><span className="mt-1 block text-sm font-semibold text-[#176347]">Watch my walks →</span></span></button>; })}</div></div>}
        </section>;
      })}
    </section>

    <section id="browse-walks" aria-labelledby="walks-heading" className="scroll-mt-20 border-y border-[#dce1d6] bg-white"><div className={width + " py-14 sm:py-16"}><p className={eyebrow}>Come along for a walk</p><h2 id="walks-heading" className="mt-3 text-3xl font-semibold tracking-tight">Just want to explore from home?</h2><p className="mt-4 max-w-2xl leading-7 text-[#657069]">Put on your headphones and join me in the Christmas streets. Browse my published walks by place, year or landmark.</p><button type="button" aria-expanded={showWalks} aria-controls="walk-catalogue" onClick={() => setShowWalks(!showWalks)} className={buttonClass + " mt-5"}>{showWalks ? "Close the walk browser ↑" : "Browse all Christmas walks ↓"}</button><div id="walk-catalogue" hidden={!showWalks}>
      <div className="mt-7 rounded-2xl bg-[#f1f3ed] p-4 sm:p-6"><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <label className={labelClass}>Country<select id="christmas-country" className={inputClass} value={filters.country} onChange={event => updateFilters({ ...filters, country: event.target.value, region: "", city: "" })}><option value="">All countries</option>{countries.map(value => <option key={value}>{value}</option>)}</select></label>
        <label className={labelClass}>Region<select className={inputClass} value={filters.region} onChange={event => updateFilters({ ...filters, region: event.target.value, city: "" })}><option value="">All regions</option>{regions.map(value => <option key={value}>{value}</option>)}</select></label>
        <label className={labelClass}>City / destination<select className={inputClass} value={filters.city} onChange={event => updateFilters({ ...filters, city: event.target.value })}><option value="">All destinations</option>{cities.map(value => <option key={value}>{value}</option>)}</select></label>
        <label className={labelClass}>Filming year<select className={inputClass} value={filters.year} onChange={event => updateFilters({ ...filters, year: event.target.value })}><option value="">All years</option>{years.map(value => <option key={value}>{value}</option>)}</select></label>
      </div><div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end"><label className={labelClass + " flex-1"}>Search this collection<input type="search" placeholder="Try Colmar or a landmark" className={inputClass} value={filters.query} onChange={event => updateFilters({ ...filters, query: event.target.value })} /></label><button type="button" disabled={!filterActive} onClick={() => updateFilters(emptyChristmasFilters)} className="min-h-11 rounded-full border border-[#cbd6c8] bg-white px-5 py-2 text-sm font-semibold disabled:opacity-40">Clear filters</button></div></div>
      <div className="my-5 flex flex-wrap items-center justify-between gap-3"><p role="status" className="text-sm font-semibold">{filtered.length} {filtered.length === 1 ? "walk" : "walks"} · {filteredDestinationCount} {filteredDestinationCount === 1 ? "destination" : "destinations"}</p><button aria-expanded={showMap} aria-controls="christmas-map" onClick={() => setShowMap(!showMap)} className={textLink}>{showMap ? "Hide map ↑" : "Explore these walks on the map ↓"}</button></div>
      {showMap && <div id="christmas-map" className="mb-6">{filteredPoints.length ? <WorldMap key={filteredPoints.map(point => point.tourId).join(",")} tours={filteredPoints} fitToTours heightClassName="h-[420px] sm:h-[480px]" /> : <p className="rounded-2xl bg-[#edf1ed] p-6">No mapped walks match this selection.</p>}<p className="mt-3 text-xs leading-6 text-[#657069]">{filteredPoints.length} mapped walks. Select a numbered group to browse nearby films, or zoom in to separate locations. Markers show filming start points.</p></div>}
      <div id="walk-results" className="scroll-mt-20">{filtered.length ? <><CompactWalkList walks={filtered.slice(0, visibleCount)} />{filtered.length > visibleCount && <button onClick={() => setVisibleCount(visibleCount + 12)} className="mt-5 min-h-11 rounded-full border border-[#cbd6c8] px-6 py-3 text-sm font-semibold hover:bg-[#edf1ed]">Show more walks ({filtered.length - visibleCount} remaining)</button>}</> : <div className="rounded-2xl bg-[#f1f3ed] p-8 text-center"><h3 className="text-xl font-semibold">No walks match this selection</h3><p className="mt-3 text-[#657069]">Try another place or clear the filters.</p><button className={buttonClass + " mt-5"} onClick={() => updateFilters(emptyChristmasFilters)}>Show all Christmas walks</button></div>}</div>
    </div></div></section>

    <section className="bg-[#edf1ed]"><div className={width + " flex flex-col justify-between gap-5 py-9 sm:flex-row sm:items-center"}><div><h2 className="text-xl font-semibold">Another winter, another walk</h2><p className="mt-2 text-sm leading-7 text-[#657069]">You’ll find more walks here as I share videos from my trips.</p></div><a href="https://www.youtube.com/@ProwalkTours" target="_blank" rel="noreferrer" className={textLink}>Follow ProWalk Tours on YouTube ↗</a></div></section>
  </div>;
}
