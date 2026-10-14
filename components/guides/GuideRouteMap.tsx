"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Map, { FullscreenControl, Layer, Marker, NavigationControl, Source, type MapRef } from "react-map-gl/mapbox";
import type { Feature, LineString } from "geojson";
import type { GuideMapData, GuideMapStop } from "../../lib/guides/map-types";
import type { DestinationGuide, GuideWalk } from "../../lib/guides/types";
import { withWatchTimestamp } from "../../lib/tours/links";
import "mapbox-gl/dist/mapbox-gl.css";

function timeLabel(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  return `${hours ? `${hours}:` : ""}${hours ? String(Math.floor(seconds / 60) % 60).padStart(2, "0") : Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
}

export default function GuideRouteMap({ data, markets, walks, year }: {
  data: GuideMapData; markets: DestinationGuide["markets"]; walks: GuideWalk[]; year: number;
}) {
  const mapRef = useRef<MapRef>(null);
  const [routeId, setRouteId] = useState(data.routes[0].tourId);
  const [selectedId, setSelectedId] = useState(data.stops[0].id);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [mapView, setMapView] = useState<"street" | "satellite">("street");
  const route = data.routes.find(item => item.tourId === routeId) ?? data.routes[0];
  const selected = data.stops.find(stop => stop.id === selectedId) ?? data.stops[0];
  const routeWalk = walks.find(walk => walk.id === route.tourId);
  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
  const line: Feature<LineString> = { type: "Feature", properties: {}, geometry: { type: "LineString", coordinates: route.coordinates } };
  const routeColor = mapView === "satellite"
    ? (route.label === "Evening" ? "#ffe39f" : "#b9f3bb")
    : (route.label === "Evening" ? "#93672e" : "#176347");
  const start = route.points.find(point => /^start/i.test(point.name));
  const end = route.points.find(point => /^end$/i.test(point.name));
  const selectedMarket = selected.marketIndex === undefined ? undefined : markets[selected.marketIndex];
  const allCoordinates = [...data.routes.flatMap(item => item.coordinates), ...data.stops.map(stop => stop.coordinates)];
  const bounds: [[number, number], [number, number]] = [
    [Math.min(...allCoordinates.map(point => point[0])), Math.min(...allCoordinates.map(point => point[1]))],
    [Math.max(...allCoordinates.map(point => point[0])), Math.max(...allCoordinates.map(point => point[1]))],
  ];

  function overview(duration = 500) {
    mapRef.current?.fitBounds(bounds, { padding: { top: 65, bottom: 50, left: 45, right: 50 }, duration, maxZoom: 16, retainPadding: false });
  }
  function selectStop(stop: GuideMapStop) {
    setSelectedId(stop.id);
    mapRef.current?.easeTo({ center: stop.coordinates, zoom: 16.5, duration: 500 });
  }
  function styleStreetMap() {
    if (mapView !== "street") return;
    const map = mapRef.current?.getMap();
    if (map) {
      for (const layer of map.getStyle()?.layers ?? []) {
        if (layer.type === "background" && map.getPaintProperty(layer.id, "background-color") !== "#f7f5ef") map.setPaintProperty(layer.id, "background-color", "#f7f5ef");
      }
      if (map.getLayer("water") && map.getPaintProperty("water", "fill-color") !== "#b9d4cd") map.setPaintProperty("water", "fill-color", "#b9d4cd");
      if (map.getLayer("building") && map.getPaintProperty("building", "fill-color") !== "#e0ddd2") map.setPaintProperty("building", "fill-color", "#e0ddd2");
    }
  }
  function handleLoad() {
    styleStreetMap();
    setLoaded(true);
    setFailed(false);
    overview(0);
  }

  return <div className="mt-8">
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-t-2xl border border-b-0 border-[#dce1d6] bg-[#f5f6f1] p-4 sm:px-5">
      <div role="group" aria-label="Choose a route on the Colmar map" className="flex flex-wrap gap-2">
        {data.routes.map(item => <button key={item.tourId} type="button" aria-label={`${item.label} route · ${item.year}`} aria-pressed={item.tourId === route.tourId}
          onClick={() => { setRouteId(item.tourId); overview(); }}
          className={`min-h-11 rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${item.tourId === route.tourId ? "border-[#25382f] bg-[#25382f] text-white" : "border-[#cbd6c8] bg-white text-[#25382f] hover:border-[#176347]"}`}>
          {item.label}<span className="hidden sm:inline"> route</span> · {item.year}
        </button>)}
      </div>
      <button type="button" onClick={() => overview()} disabled={!loaded || failed} className="min-h-11 rounded-full px-4 text-sm font-semibold text-[#176347] underline underline-offset-4 disabled:opacity-40">Show whole walk</button>
    </div>

    <div className="grid overflow-hidden rounded-b-2xl border border-[#dce1d6] lg:grid-cols-[1fr_300px]">
      <div className="min-w-0">
        <div role="region" aria-label="Interactive Colmar market and walking route map" className="relative h-[420px] w-full bg-[#f7f5ef] sm:h-[480px] lg:h-[550px]">
          {token && <Map key={attempt} ref={mapRef} mapboxAccessToken={token}
            mapStyle={mapView === "satellite" ? "mapbox://styles/mapbox/satellite-streets-v12" : "mapbox://styles/mapbox/light-v11"}
            styleDiffing={false}
            initialViewState={{ bounds, fitBoundsOptions: { padding: 55 } }}
            minZoom={13} maxZoom={19} maxBounds={[[7.31, 48.04], [7.41, 48.11]]}
            scrollZoom={true} dragRotate={false} touchPitch={false}
            onLoad={handleLoad} onStyleData={styleStreetMap} onError={event => {
              console.warn("Guide map could not load:", event.error.message.replace(/access_token=[^&\s]+/g, "access_token=[redacted]"));
              setFailed(true);
            }}>
            <NavigationControl position="top-right" showCompass={false} />
            <FullscreenControl position="top-right" />
            <Source id="guide-walk-route" type="geojson" data={line}>
              <Layer id="guide-route-halo" type="line" layout={{ "line-join": "round", "line-cap": "round" }} paint={{ "line-color": mapView === "satellite" ? "#25382f" : "#ffffff", "line-width": 7, "line-opacity": 0.95 }} />
              <Layer id="guide-route-line" type="line" layout={{ "line-join": "round", "line-cap": "round" }} paint={{ "line-color": routeColor, "line-width": 3.5, "line-opacity": 0.9 }} />
            </Source>
            {data.stops.map(stop => <Marker key={stop.id} longitude={stop.coordinates[0]} latitude={stop.coordinates[1]}
              offset={stop.id === "koifhus" ? [20, 22] : stop.id === "ancienne-douane" ? [-15, -8] : [0, 0]}>
              <button type="button" aria-label={`Show ${stop.name} on the map`} aria-pressed={selected.id === stop.id}
                onClick={() => selectStop(stop)} className="group flex min-h-11 min-w-11 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#176347]">
                {stop.marketIndex !== undefined
                  ? <span className={`flex h-8 w-8 items-center justify-center rounded-full border-2 border-white text-sm font-bold shadow-md transition-transform group-hover:scale-110 ${selected.id === stop.id ? "bg-[#25382f] text-white ring-4 ring-[#25382f]/20" : "bg-[#176347] text-white"}`}>{stop.marketIndex + 1}</span>
                  : <span className={`whitespace-nowrap rounded-full border border-white px-2.5 py-1 text-xs font-semibold shadow-sm ${selected.id === stop.id ? "bg-[#25382f] text-white" : "bg-[#faf8f0] text-[#59492d]"}`}>{stop.name}</span>}
              </button>
            </Marker>)}
            {start && <Marker longitude={start.coordinates[0]} latitude={start.coordinates[1]} anchor="bottom" offset={[0, -21]}><span className="rounded-md border border-white bg-[#25382f] px-2 py-1 text-[10px] font-bold tracking-wide text-white shadow-sm">{end ? "START" : "START / FINISH"}</span></Marker>}
            {end && <Marker longitude={end.coordinates[0]} latitude={end.coordinates[1]} anchor="bottom" offset={[0, -10]}><span className="rounded-md border border-white bg-[#25382f] px-2 py-1 text-[10px] font-bold tracking-wide text-white shadow-sm">FINISH</span></Marker>}
          </Map>}
          <div role="group" aria-label="Map background" className="absolute left-3 top-3 flex gap-1 rounded-xl border border-[#dce1d6] bg-white p-1 shadow-sm">
            {(["street", "satellite"] as const).map(view => <button key={view} type="button" aria-pressed={mapView === view}
              onClick={() => { setMapView(view); setFailed(false); }}
              className={`min-h-11 rounded-lg px-3 text-sm font-semibold transition-colors ${mapView === view ? "bg-[#25382f] text-white" : "text-[#25382f] hover:bg-[#edf1ed]"}`}>
              {view === "street" ? "Street" : "Satellite"}
            </button>)}
          </div>
          {(!token || failed || !loaded) && <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#f7f5ef] px-8 text-center">
            <p role="status" className="text-sm text-[#526258]">{!token || failed ? "The interactive map is unavailable. You can still explore the stops and watch links below." : "Loading your walk through Colmar…"}</p>
            {failed && <button type="button" onClick={() => { setFailed(false); setLoaded(false); setAttempt(value => value + 1); }} className="min-h-11 rounded-full border border-[#176347] px-5 text-sm font-semibold text-[#176347]">Try the map again</button>}
            {(!token || failed) && <a href={route.sourceUrl} target="_blank" rel="noreferrer" className="min-h-11 text-sm font-semibold text-[#176347] underline underline-offset-4">Open the original route map ↗</a>}
          </div>}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#dce1d6] px-5 py-3 text-xs leading-6 text-[#657069]">
          <span className="flex items-center gap-2"><span aria-hidden="true" className={`h-1 w-7 rounded-full ${mapView === "satellite" ? (route.label === "Evening" ? "bg-[#ffe39f] ring-1 ring-[#25382f]" : "bg-[#b9f3bb] ring-1 ring-[#25382f]") : (route.label === "Evening" ? "bg-[#93672e]" : "bg-[#176347]")}`} />{route.label} filmed route · {route.year}{routeWalk?.durationLabel ? ` · ${routeWalk.durationLabel}` : ""}</span>
          <span>Drag to explore · Scroll or use + / − to zoom</span>
        </div>
      </div>

      <aside className="border-t border-[#dce1d6] bg-[#fafbf7] p-5 lg:border-l lg:border-t-0">
        <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-[#607767]">The six markets · {year}</h3>
        <p className="mt-2 text-sm leading-6 text-[#657069]">Choose a stop to explore it.</p>
        <ol className="mt-4 grid gap-1 sm:grid-cols-2 lg:grid-cols-1">
          {data.stops.filter(stop => stop.marketIndex !== undefined).map(stop => <li key={stop.id}>
            <button type="button" aria-pressed={selected.id === stop.id} onClick={() => selectStop(stop)} className={`flex min-h-14 w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold transition-colors ${selected.id === stop.id ? "bg-[#e6eee3] text-[#176347]" : "text-[#25382f] hover:bg-[#eef1e9]"}`}>
              <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs ${selected.id === stop.id ? "bg-[#176347] text-white" : "border border-[#becdbc]"}`}>{stop.marketIndex! + 1}</span>{markets[stop.marketIndex!].name}
            </button>
          </li>)}
        </ol>
        <p className="mt-5 border-t border-[#dce1d6] pt-4 text-xs font-semibold uppercase tracking-[0.12em] text-[#607767]">Along the way</p>
        <div className="mt-2 flex flex-wrap gap-2">{data.stops.filter(stop => stop.marketIndex === undefined).map(stop => <button key={stop.id} type="button" onClick={() => selectStop(stop)} aria-pressed={selected.id === stop.id} className={`min-h-11 rounded-full border px-3 text-xs font-semibold ${selected.id === stop.id ? "border-[#25382f] bg-[#25382f] text-white" : "border-[#cbd6c8] bg-white text-[#526258]"}`}>{stop.name}</button>)}</div>
      </aside>
    </div>

    <article aria-label="Selected map stop" className="mt-5 grid gap-5 rounded-2xl bg-[#edf1ed] p-5 sm:grid-cols-[180px_1fr] sm:p-6">
      {selected.photo && <figure><Image src={selected.photo.src} alt={selected.photo.alt} width={selected.photo.width} height={selected.photo.height} sizes="(min-width: 640px) 180px, 90vw" className="aspect-[16/10] w-full rounded-xl object-cover" /><figcaption className="mt-2 text-[11px] text-[#657069]">Archive photograph · {selected.photo.year}</figcaption></figure>}
      <div className={selected.photo ? "min-w-0" : "sm:col-span-2"}>
        <h3 className="text-xl font-semibold">{selectedMarket?.name ?? selected.name}</h3>
        <p className="mt-2 max-w-3xl text-sm leading-7 text-[#526258]">{selectedMarket?.text ?? selected.text}</p>
        <div className="mt-2 flex flex-wrap gap-x-6 gap-y-1">{selected.moments.map(moment => {
          const walk = walks.find(item => item.id === moment.tourId);
          if (!walk) return null;
          return <Link key={moment.tourId} href={withWatchTimestamp(walk.watchHref, moment.seconds)} className="inline-flex min-h-11 items-center text-sm font-semibold text-[#176347] underline underline-offset-4 hover:text-[#25382f]">{walk.videoType === "evening-walk" ? "Evening" : "Daytime"} film · {timeLabel(moment.seconds)} →</Link>;
        })}</div>
      </div>
    </article>
    <p className="mt-4 max-w-3xl text-xs leading-6 text-[#657069]">Lines follow my mapped 2023 walks; numbered pins identify the {year} market areas. The films show earlier seasons. This is a guide to exploring the old town, not turn-by-turn navigation.</p>
  </div>;
}
