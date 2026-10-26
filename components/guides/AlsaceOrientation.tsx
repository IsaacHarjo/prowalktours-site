"use client";

import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Map, { AttributionControl, Layer, Marker, Source, type MapRef } from "react-map-gl/mapbox";
import type { OrientationPlace } from "../../lib/guides/types";
import RegionTownLabels, { type RegionMapFrame } from "./RegionTownLabels";
import { buildOrientationStages } from "../../lib/christmas/orientation";
import "mapbox-gl/dist/mapbox-gl.css";

const motionQuery = "(prefers-reduced-motion: reduce)";
function subscribeMotion(callback: () => void) {
  const query = window.matchMedia(motionQuery);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}
const readMotion = () => window.matchMedia(motionQuery).matches;
const readServerMotion = () => false;

export default function AlsaceOrientation({ places, focusCity }: { places: OrientationPlace[]; focusCity: string }) {
  const stages = useMemo(() => buildOrientationStages(places, focusCity), [places, focusCity]);
  const mapRef = useRef<MapRef>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const [stage, setStage] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const [settled, setSettled] = useState(true);
  const [selectedCity, setSelectedCity] = useState(focusCity);
  const [labelLayerId, setLabelLayerId] = useState<string>();
  const [labelContainer, setLabelContainer] = useState<HTMLElement | null>(null);
  const [mapFrame, setMapFrame] = useState<RegionMapFrame>({ width: 0, height: 0, points: [] });
  const reduceMotion = useSyncExternalStore(subscribeMotion, readMotion, readServerMotion);
  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
  const current = stages[stage];
  const shownPlaces = places.filter(place => current.cities.includes(place.city));
  const selectedPlace = places.find(place => place.city === selectedCity);
  const focusPlace = places.find(place => place.city === focusCity);
  const available = loaded && !failed && !!token;

  function updateTownPositions() {
    const map = mapRef.current;
    if (!map) return;
    const canvas = map.getCanvas();
    setMapFrame({
      width: canvas.clientWidth, height: canvas.clientHeight,
      points: places.filter(place => place.labelSide).map(place => {
        const point = map.project([place.longitude, place.latitude]);
        return { place, x: point.x, y: point.y };
      }),
    });
  }

  const stop = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    mapRef.current?.stop();
    setPlaying(false);
    setSettled(true);
  }, []);

  function moveTo(index: number, duration = 2400) {
    setStage(index);
    setSelectedCity(focusCity);
    setSettled(duration === 0 || reduceMotion);
    mapRef.current?.fitBounds(stages[index].bounds, {
      padding: { top: 55, bottom: 55, left: 55, right: 55 },
      duration: reduceMotion ? 0 : duration,
      linear: false,
      essential: false,
      retainPadding: false,
      bearing: 0,
      pitch: 0,
    });
  }

  function chooseStage(index: number) { stop(); moveTo(index); }
  function play() {
    stop();
    moveTo(0, 0);
    setPlaying(true);
    timers.current = [
      setTimeout(() => moveTo(1, 4300), 1800),
      setTimeout(() => moveTo(2, 4300), 8000),
      setTimeout(() => { setPlaying(false); timers.current = []; }, 14000),
    ];
  }

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const observer = new IntersectionObserver(([entry]) => { if (!entry.isIntersecting) stop(); });
    observer.observe(container);
    const onVisibility = () => { if (document.hidden) stop(); };
    document.addEventListener("visibilitychange", onVisibility);
    const preference = window.matchMedia(motionQuery);
    preference.addEventListener("change", stop);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      preference.removeEventListener("change", stop);
      timers.current.forEach(clearTimeout);
    };
  }, [stop]);

  function styleMap() {
    const map = mapRef.current?.getMap();
    if (!map) return;
    setLabelLayerId(map.getStyle()?.layers?.find(layer => layer.type === "symbol")?.id);
    for (const layer of map.getStyle()?.layers ?? []) {
      if (layer.type === "background") map.setPaintProperty(layer.id, "background-color", "#f7f4eb");
      // The basemap chooses larger towns at this zoom. Use our destination's
      // own label instead, without moving or renaming another town's location.
      if (layer.type === "symbol" && layer.id.includes("settlement")) {
        const originalFilter = map.getFilter(layer.id);
        const destinationFilter: import("mapbox-gl").FilterSpecification = ["all",
          ["!=", ["get", "name"], focusCity],
          ["!=", ["get", "name_en"], focusCity],
          ...(focusCity !== "Colmar" ? [
            ["!=", ["get", "name"], "Colmar"],
            ["!=", ["get", "name_en"], "Colmar"],
          ] : []),
        ] as import("mapbox-gl").FilterSpecification;
        map.setFilter(layer.id, originalFilter ? ["all", originalFilter, destinationFilter] : destinationFilter);
      }
    }
    if (map.getLayer("water")) map.setPaintProperty("water", "fill-color", "#b7d1ca");
    if (map.getLayer("landcover")) map.setPaintProperty("landcover", "fill-opacity", 0.35);
  }

  return <div ref={containerRef} className="mt-8 overflow-hidden rounded-3xl border border-[#dce1d6] bg-white">
    <div className="grid lg:grid-cols-[320px_1fr]">
      <div className="flex flex-col bg-[#25382f] p-6 text-white sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#c5d4c8]">Where is {focusCity}?</p>
        <h3 className="mt-3 font-serif text-3xl leading-tight">France. Alsace.<br />And a little closer.</h3>
        <p className="mt-4 text-sm leading-7 text-[#e0e8e1]">A short journey on the map, from France and its neighbors to the area around {focusCity}.</p>
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
        <div className="relative h-[400px] bg-[#f7f4eb] sm:h-[460px] lg:h-[520px]" role="region" aria-label={`Animated regional map for ${focusCity}`}>
          {token && <Map ref={mapRef} mapboxAccessToken={token} mapStyle="mapbox://styles/mapbox/light-v11"
            initialViewState={{ bounds: stages[0].bounds, fitBoundsOptions: { padding: 55 } }}
            interactive={false} dragPan={false} scrollZoom={false} doubleClickZoom={false}
            touchZoomRotate={false} keyboard={false} boxZoom={false}
            dragRotate={false} touchPitch={false} attributionControl={false}
            onLoad={() => { styleMap(); setLoaded(true); setLabelContainer(mapRef.current?.getCanvasContainer() ?? null); moveTo(stage, 0); updateTownPositions(); }}
            onMove={updateTownPositions} onResize={() => { mapRef.current?.fitBounds(current.bounds, { padding: 55, duration: 0, retainPadding: false }); updateTownPositions(); }}
            onMoveEnd={() => { setSettled(true); updateTownPositions(); }}
            onError={() => { stop(); setFailed(true); }}>
            <AttributionControl compact />
            {focusPlace && <Source id="destination-place-label" type="geojson" data={{ type: "Feature", properties: { name: focusCity }, geometry: { type: "Point", coordinates: [focusPlace.longitude, focusPlace.latitude] } }}>
              <Layer id="destination-place-label-text" type="symbol" layout={{
                "text-field": ["get", "name"], "text-size": 12,
                "text-font": ["DIN Pro Regular", "Arial Unicode MS Regular"],
                "text-anchor": "top", "text-offset": [0, 0.5],
                "text-allow-overlap": true,
                visibility: stage === 0 ? "none" : "visible",
              }} paint={{ "text-color": "#92999a", "text-halo-color": "#f7f4eb", "text-halo-width": 1 }} />
            </Source>}
            <Source id="france-boundary" type="geojson" data="/maps/france-boundary.geojson"
              attribution='<a href="https://www.naturalearthdata.com/" target="_blank" rel="noopener noreferrer">France boundary: Natural Earth</a>'>
              <Layer id="france-region-fill" type="fill" beforeId={labelLayerId} layout={{ visibility: stage === 0 ? "visible" : "none" }} paint={{ "fill-color": "#176347", "fill-opacity": 0.12 }} />
              <Layer id="france-region-halo" type="line" beforeId={labelLayerId} layout={{ visibility: stage === 0 ? "visible" : "none", "line-join": "round" }} paint={{ "line-color": "#ffffff", "line-width": 6, "line-opacity": 0.9 }} />
              <Layer id="france-region-border" type="line" beforeId={labelLayerId} layout={{ visibility: stage === 0 ? "visible" : "none", "line-join": "round" }} paint={{ "line-color": "#176347", "line-width": 2.5 }} />
            </Source>
            <Source id="alsace-boundary" type="geojson" data="/maps/alsace-boundary.geojson"
              attribution='<a href="https://www.data.gouv.fr/datasets/contours-administratifs" target="_blank" rel="noopener noreferrer">Alsace boundary: data.gouv.fr / IGN</a> · <a href="https://opendatacommons.org/licenses/odbl/1-0/" target="_blank" rel="noopener noreferrer">ODbL</a>'>
              <Layer id="alsace-region-fill" type="fill" beforeId={labelLayerId} layout={{ visibility: current.outline === "alsace" ? "visible" : "none" }} paint={{ "fill-color": "#176347", "fill-opacity": 0.12 }} />
              <Layer id="alsace-region-halo" type="line" beforeId={labelLayerId} layout={{ visibility: current.outline === "alsace" ? "visible" : "none", "line-join": "round" }} paint={{ "line-color": "#ffffff", "line-width": 6, "line-opacity": 0.9 }} />
              <Layer id="alsace-region-border" type="line" beforeId={labelLayerId} layout={{ visibility: current.outline === "alsace" ? "visible" : "none", "line-join": "round" }} paint={{ "line-color": "#176347", "line-width": 2.5 }} />
            </Source>
            <Source id="colmar-market-region" type="geojson" data="/maps/colmar-market-region.geojson"
              attribution='<a href="https://www.data.gouv.fr/datasets/contours-administratifs" target="_blank" rel="noopener noreferrer">Pays de Colmar boundary: data.gouv.fr / IGN</a> · <a href="https://opendatacommons.org/licenses/odbl/1-0/" target="_blank" rel="noopener noreferrer">ODbL</a>'>
              <Layer id="colmar-region-fill" type="fill" beforeId={labelLayerId} filter={["==", ["get", "kind"], "region"]} layout={{ visibility: current.outline === "colmar" ? "visible" : "none" }} paint={{ "fill-color": "#176347", "fill-opacity": 0.12 }} />
              <Layer id="colmar-region-areas" type="line" beforeId={labelLayerId} filter={["==", ["get", "kind"], "area"]} layout={{ visibility: current.outline === "colmar" ? "visible" : "none" }} paint={{ "line-color": "#176347", "line-width": 0.8, "line-opacity": 0.35 }} />
              <Layer id="colmar-region-halo" type="line" beforeId={labelLayerId} filter={["==", ["get", "kind"], "region"]} layout={{ visibility: current.outline === "colmar" ? "visible" : "none", "line-join": "round" }} paint={{ "line-color": "#ffffff", "line-width": 6, "line-opacity": 0.9 }} />
              <Layer id="colmar-region-border" type="line" beforeId={labelLayerId} filter={["==", ["get", "kind"], "region"]} layout={{ visibility: current.outline === "colmar" ? "visible" : "none", "line-join": "round" }} paint={{ "line-color": "#176347", "line-width": 2.5 }} />
            </Source>
            {stage !== 2 && shownPlaces.map(place => <Marker key={place.city} longitude={place.longitude} latitude={place.latitude} anchor="bottom">
              <Link href={place.href} aria-label={place.marketGuide ? `${place.city} Christmas market` : `Explore ${place.city}`} onClick={() => { stop(); setSelectedCity(place.city); }}
                className={`flex min-h-11 items-center gap-2 rounded-full border-2 px-3 py-2 text-xs font-semibold shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#176347] sm:text-sm ${place.city === focusCity ? "border-white bg-[#176347] text-white" : selectedCity === place.city ? "border-[#176347] bg-[#f4e4bc] text-[#25382f]" : "border-white bg-white text-[#25382f]"}`}>
                <span aria-hidden="true" className={`h-2 w-2 rounded-full ${place.city === focusCity ? "bg-[#f4e4bc]" : "bg-[#176347]"}`} /><span className="underline underline-offset-2">{place.city}</span>
              </Link>
            </Marker>)}
            {stage === 2 && available && settled && labelContainer && createPortal(
              <RegionTownLabels frame={mapFrame} focusCity={focusCity} selectedCity={selectedCity} onSelect={city => { stop(); setSelectedCity(city); }} />,
              labelContainer,
            )}
          </Map>}
          {(!token || failed || !loaded) && <div role="status" className="absolute inset-0 flex items-center justify-center bg-[#f7f4eb] p-8 text-center text-sm leading-7 text-[#526258]">
            {!token || failed ? `The animated map is unavailable. You can still use the three views to read about ${focusCity}’s location.` : "Loading the regional map…"}
          </div>}
          <span className="pointer-events-none absolute left-4 top-4 rounded-full border border-[#dce1d6] bg-white/95 px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-[#526258]">{current.label}</span>
        </div>
        <div className="border-t border-[#dce1d6] p-5 sm:p-6" aria-live="polite" aria-atomic="true">
          <h4 className="text-lg font-semibold text-[#25382f]">{current.title}</h4>
          <p className="mt-2 text-sm leading-7 text-[#657069]">{current.text}</p>
          {selectedPlace && (selectedPlace.external
            ? <a href={selectedPlace.href} target="_blank" rel="noreferrer" className="mt-2 inline-flex min-h-11 items-center text-sm font-semibold text-[#176347] underline underline-offset-4">Official {selectedPlace.city} market information ↗</a>
            : <Link href={selectedPlace.href} className="mt-2 inline-flex min-h-11 items-center text-sm font-semibold text-[#176347] underline underline-offset-4">{selectedPlace.city === "Colmar" ? "Explore Colmar’s markets" : selectedPlace.marketGuide ? `Explore ${selectedPlace.city} at Christmas` : `Explore the ${selectedPlace.city} walks`} →</Link>)}
        </div>
      </div>
    </div>
    <p className="border-t border-[#dce1d6] bg-[#f5f6f1] px-6 py-3 text-xs leading-6 text-[#657069]">Play the overview or choose one of the three numbered views to explore the region. Underlined towns open their Christmas market pages. Select another town for official market information.</p>
  </div>;
}
