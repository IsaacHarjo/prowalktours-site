"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import Map, { AttributionControl, Marker, type MapRef } from "react-map-gl/mapbox";
import type { CountryOrientation as CountryOrientationData } from "../../lib/christmas/germany-orientation";
import "mapbox-gl/dist/mapbox-gl.css";

// "Where it fits in your trip" for guides outside Alsace: three views (the
// country, nearby markets I've filmed, the town), with the same look as the
// Alsace overview. Data comes from buildGermanyOrientation (or a sibling
// builder for another country).

const motionQuery = "(prefers-reduced-motion: reduce)";
function subscribeMotion(callback: () => void) {
  const query = window.matchMedia(motionQuery);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}
const readMotion = () => window.matchMedia(motionQuery).matches;
const readServerMotion = () => false;

export default function CountryOrientation({ data }: { data: CountryOrientationData }) {
  const { stages, places, focusCity, country } = data;
  const mapRef = useRef<MapRef>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const [stage, setStage] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const reduceMotion = useSyncExternalStore(subscribeMotion, readMotion, readServerMotion);
  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
  const current = stages[stage];
  const otherPlaces = places.filter(place => place.city !== focusCity && current.cities.includes(place.city));
  const focusPlace = places.find(place => place.city === focusCity);
  const available = loaded && !failed && !!token;

  const stop = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    mapRef.current?.stop();
    setPlaying(false);
  }, []);

  function moveTo(index: number, duration = 2400) {
    setStage(index);
    mapRef.current?.fitBounds(stages[index].bounds, { padding: 55, duration: reduceMotion ? 0 : duration, essential: false, retainPadding: false });
  }
  function chooseStage(index: number) { stop(); moveTo(index); }
  function play() {
    stop();
    moveTo(0, 0);
    setPlaying(true);
    timers.current = [
      setTimeout(() => moveTo(1, 4000), 1800),
      setTimeout(() => moveTo(2, 4000), 8000),
      setTimeout(() => { setPlaying(false); timers.current = []; }, 13000),
    ];
  }

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const observer = new IntersectionObserver(([entry]) => { if (!entry.isIntersecting) stop(); });
    observer.observe(container);
    const onVisibility = () => { if (document.hidden) stop(); };
    document.addEventListener("visibilitychange", onVisibility);
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", onVisibility); timers.current.forEach(clearTimeout); };
  }, [stop]);

  return <div ref={containerRef} className="mt-8 overflow-hidden rounded-3xl border border-[#dce1d6] bg-white">
    <div className="grid lg:grid-cols-[320px_1fr]">
      <div className="flex flex-col bg-[#25382f] p-6 text-white sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#c5d4c8]">Where is {focusCity}?</p>
        <h3 className="mt-3 font-serif text-3xl leading-tight">{country}. Nearby markets.<br />And a little closer.</h3>
        <p className="mt-4 text-sm leading-7 text-[#e0e8e1]">A short journey on the map, from the {country === "Germany" ? "German" : country} Christmas markets I’ve filmed to {focusCity} itself.</p>
        <div className="mt-5">
          {reduceMotion ? <p className="text-sm leading-6 text-[#d6e2d8]">Choose a view. Reduced motion is on.</p> : <button type="button" disabled={!available} onClick={playing ? stop : play}
            className="inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-full border border-white/50 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white disabled:opacity-50">
            <span aria-hidden="true">{playing ? "■" : "▶"}</span>{playing ? "Stop animation" : "Play the overview"}
          </button>}
        </div>
        <div role="group" aria-label="Choose a geographic view" className="mt-6 grid grid-cols-3 gap-2 lg:grid-cols-1">
          {stages.map((item, index) => <button key={item.label} type="button" aria-pressed={stage === index} onClick={() => chooseStage(index)}
            className={`flex min-h-14 flex-col items-center justify-center gap-1 rounded-xl border px-2 py-3 text-center text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white lg:flex-row lg:justify-start lg:gap-3 lg:px-4 lg:text-left ${stage === index ? "border-[#f4e4bc] bg-[#f4e4bc] text-[#25382f]" : "border-white/25 text-white hover:bg-white/10"}`}>
            <span className={`text-xs tabular-nums ${stage === index ? "text-[#716044]" : "text-[#c5d4c8]"}`}>0{index + 1}</span>{item.label}
          </button>)}
        </div>
      </div>
      <div className="min-w-0">
        <div className="relative h-[400px] bg-[#f7f4eb] sm:h-[460px] lg:h-[520px]" role="region" aria-label={`Regional map for ${focusCity}`}>
          {token && <Map ref={mapRef} mapboxAccessToken={token} mapStyle="mapbox://styles/mapbox/light-v11"
            initialViewState={{ bounds: stages[0].bounds, fitBoundsOptions: { padding: 55 } }}
            interactive={false} attributionControl={false}
            onLoad={() => { setLoaded(true); moveTo(stage, 0); }}
            onResize={() => mapRef.current?.fitBounds(current.bounds, { padding: 55, duration: 0, retainPadding: false })}
            onError={() => { stop(); setFailed(true); }}>
            <AttributionControl compact />
            {/* Towns can sit a few kilometres apart, so only the focus town gets a
                labelled pill; the others are small dots, named in the links below. */}
            {otherPlaces.map(place => <Marker key={place.city} longitude={place.longitude} latitude={place.latitude} anchor="center">
              <Link href={place.href} title={place.city} aria-label={place.marketGuide ? `Read my ${place.city} guide` : `Watch my ${place.city} walks`} onClick={() => stop()}
                className="flex h-11 w-11 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#176347]">
                <span aria-hidden="true" className="h-3.5 w-3.5 rounded-full border-2 border-white bg-[#176347] shadow-md" />
              </Link>
            </Marker>)}
            {focusPlace && current.cities.includes(focusCity) && <Marker longitude={focusPlace.longitude} latitude={focusPlace.latitude} anchor="bottom" className="z-10">
              <Link href={focusPlace.href} aria-label={`${focusCity}: you are here`} onClick={() => stop()}
                className="flex min-h-11 items-center gap-2 rounded-full border-2 border-white bg-[#176347] px-3 py-2 text-xs font-semibold text-white shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#176347] sm:text-sm">
                <span aria-hidden="true" className="h-2 w-2 rounded-full bg-[#f4e4bc]" /><span className="underline underline-offset-2">{focusCity}</span>
              </Link>
            </Marker>}
          </Map>}
          {(!token || failed || !loaded) && <div role="status" className="absolute inset-0 flex items-center justify-center bg-[#f7f4eb] p-8 text-center text-sm leading-7 text-[#526258]">
            {!token || failed ? `The map is unavailable. You can still use the three views to read about ${focusCity}’s location.` : "Loading the regional map…"}
          </div>}
          <span className="pointer-events-none absolute left-4 top-4 rounded-full border border-[#dce1d6] bg-white/95 px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-[#526258]">{current.label}</span>
        </div>
        <div className="border-t border-[#dce1d6] p-5 sm:p-6" aria-live="polite" aria-atomic="true">
          <h4 className="text-lg font-semibold text-[#25382f]">{current.title}</h4>
          <p className="mt-2 text-sm leading-7 text-[#657069]">{current.text}</p>
          {otherPlaces.length > 0 && <ul className="mt-2 flex flex-wrap gap-x-5">{otherPlaces.map(place => <li key={place.city}>
            <Link href={place.href} className="inline-flex min-h-11 items-center text-sm font-semibold text-[#176347] underline underline-offset-4">{place.city}{place.marketGuide ? " guide" : ""} →</Link>
          </li>)}</ul>}
        </div>
      </div>
    </div>
    <p className="border-t border-[#dce1d6] bg-[#f5f6f1] px-6 py-3 text-xs leading-6 text-[#657069]">Play the overview or choose one of the three views. Select a town to open its Christmas market guide or my walks there.</p>
  </div>;
}
