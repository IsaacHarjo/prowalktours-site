"use client";

import { useEffect, useRef, useState } from 'react';
import StopPhotoGallery from './StopPhotoGallery';
import StopVideo from './StopVideo';
import Map, { FullscreenControl, Layer, Marker, NavigationControl, Source, type MapRef } from 'react-map-gl/mapbox';
import type { Feature, LineString } from 'geojson';
import type { MapCoordinate } from '../../lib/guides/map-types';
import { walkingDistanceKm, type VisitorMapData, type VisitorMapStop, type VisitorStopCategory, type VisitorStopIcon } from '../../lib/guides/visitor-map-types';
import 'mapbox-gl/dist/mapbox-gl.css';

const categories: { id: VisitorStopCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'All stops' }, { id: 'market', label: 'Markets' },
  { id: 'photo', label: 'Photo spots' }, { id: 'arrival', label: 'Arriving' }, { id: 'useful', label: 'Useful stops' },
];
const colors = {
  market: 'bg-[#176347] text-white', photo: 'bg-[#b26723] text-white',
  arrival: 'bg-[#315d87] text-white', useful: 'bg-[#fffaf0] text-[#65543b]',
};

function StopIcon({ icon }: { icon: VisitorStopIcon }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-5 w-5 shrink-0">
    {icon === 'camera' && <><path d="M3 7h4l2-3h6l2 3h4v13H3Z" /><circle cx="12" cy="13" r="4" /></>}
    {icon === 'train' && <><rect x="5" y="3" width="14" height="15" rx="3" /><path d="M5 11h14M8 18l-2 3m10-3 2 3M12 4v7" /><path d="M8 15h1m6 0h1" /></>}
    {icon === 'parking' && <path d="M8 21V3h6a5 5 0 0 1 0 10H8" />}
    {icon === 'basket' && <><path d="m3 10 3 11h12l3-11ZM7 10l5-8 5 8M9 14v3m6-3v3" /></>}
    {icon === 'food' && <><path d="M5 3v7m3-7v7m3-7v7M5 7h6M8 10v11M19 3v18m0-18c-5 4-5 10 0 10" /></>}
    {icon === 'boat' && <><path d="M3 12h18l-3 6H6ZM7 12V7h10v5M12 7V3M2 21c2-2 3 2 5 0s3 2 5 0 3 2 5 0 3 2 5 0" /></>}
    {icon === 'landmark' && <><path d="m3 9 9-6 9 6ZM3 21h18M5 12v6m7-6v6m7-6v6" /></>}
    {icon === 'fair' && <><circle cx="12" cy="10" r="8" /><path d="m7 22 5-12 5 12M12 2v8m8 0h-8M4 10h8m-5-6 5 6 6-6M6 16l6-6 6 6" /></>}
    {icon === 'start' && <><path d="M6 22V3m0 0h13l-3 5 3 5H6" /></>}
    {icon === 'market' && <><path d="m3 9 2-6h14l2 6v3H3ZM5 12v9h14v-9M9 21v-6h6v6" /></>}
  </svg>;
}

function Badge({ stop }: { stop: VisitorMapStop }) {
  return <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${colors[stop.category]}`}>
    {stop.marketNumber ?? <StopIcon icon={stop.icon} />}
  </span>;
}

// Small leader lines retain the exact pin locations while separating nearby
// controls at the customs house, canal and Place Rapp. No coordinates are moved.
const markerOffsets: Record<string, { x: number; y: number; className: string }> = {
  'photo-koifhus': { x: -38, y: -26, className: '-translate-x-[38px] -translate-y-[26px]' },
  koifhus: { x: -12, y: 24, className: '-translate-x-[12px] translate-y-6' },
  'ancienne-douane': { x: 21, y: -6, className: 'translate-x-[21px] -translate-y-1.5' },
  'photo-canal': { x: -15, y: 13, className: '-translate-x-[15px] translate-y-[13px]' },
  'covered-market': { x: 18, y: -8, className: 'translate-x-[18px] -translate-y-2' },
  'canal-restaurant': { x: 36, y: 32, className: 'translate-x-9 translate-y-8' },
  'canal-boats': { x: 24, y: 28, className: 'translate-x-6 translate-y-7' },
  'parking-rapp': { x: -18, y: -17, className: '-translate-x-[18px] -translate-y-[17px]' },
  'place-rapp': { x: 18, y: 13, className: 'translate-x-[18px] translate-y-[13px]' },
  'join-walk': { x: -18, y: -18, className: '-translate-x-[18px] -translate-y-[18px]' },
};

function boundsFor(coordinates: MapCoordinate[]): [MapCoordinate, MapCoordinate] {
  return [
    [Math.min(...coordinates.map(p => p[0])), Math.min(...coordinates.map(p => p[1]))],
    [Math.max(...coordinates.map(p => p[0])), Math.max(...coordinates.map(p => p[1]))],
  ];
}
function routeFeature(coordinates: MapCoordinate[]): Feature<LineString> {
  return { type: 'Feature', properties: {}, geometry: { type: 'LineString', coordinates } };
}

export default function VisitorRouteMap({ data }: { data: VisitorMapData }) {
  const mapRef = useRef<MapRef>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const detailRef = useRef<HTMLElement>(null);
  const steps = data.itinerary?.steps ?? [];
  const [mode, setMode] = useState<'itinerary' | 'explore'>(steps.length ? 'itinerary' : 'explore');
  const [selectedId, setSelectedId] = useState(steps[0]?.stopId ?? data.stops[0].id);
  const [category, setCategory] = useState<VisitorStopCategory | 'all'>('all');
  const [mapView, setMapView] = useState<'street' | 'satellite'>('street');
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const selected = data.stops.find(stop => stop.id === selectedId) ?? data.stops[0];
  const stepIndex = steps.findIndex(step => step.stopId === selected.id);
  const activeStep = mode === 'itinerary' ? steps[stepIndex] : undefined;
  const visibleStops = data.stops.filter(stop => category === 'all' || stop.category === category);
  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
  const bounds = boundsFor([...data.route, ...data.stationApproach, ...data.stops.map(stop => stop.coordinates)]);
  const distance = walkingDistanceKm(data.route).toFixed(1);
  const stationDistance = walkingDistanceKm(data.stationApproach).toFixed(1);
  const satellite = mapView === 'satellite';

  useEffect(() => {
    detailRef.current?.scrollTo({ top: 0 });
  }, [selectedId, mode]);

  function overview(duration = 500) {
    const narrow = (mapContainerRef.current?.clientWidth ?? 800) < 500;
    const walkBounds = narrow ? boundsFor([...data.route, ...data.stops.filter(stop => stop.category === 'photo').map(stop => stop.coordinates)]) : bounds;
    mapRef.current?.fitBounds(walkBounds, { padding: { top: 85, bottom: 45, left: narrow ? 30 : 55, right: narrow ? 30 : 55 }, maxZoom: 16, duration, retainPadding: false });
  }
  function selectStop(stop: VisitorMapStop, fromList = false) {
    if (mode === 'itinerary' && !steps.some(step => step.stopId === stop.id)) setMode('explore');
    setSelectedId(stop.id);
    mapRef.current?.easeTo({ center: stop.coordinates, zoom: 16.7, duration: 500 });
    if (fromList) {
      detailRef.current?.focus({ preventScroll: true });
      detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
  function selectStep(index: number) {
    const step = steps[index];
    const stop = step && data.stops.find(item => item.id === step.stopId);
    if (!stop) return;
    setMode('itinerary');
    setCategory('all');
    selectStop(stop, true);
  }
  function chooseMode(next: 'itinerary' | 'explore') {
    setMode(next);
    setCategory('all');
    if (next === 'itinerary' && stepIndex < 0) setSelectedId(steps[0].stopId);
    overview();
  }
  function chooseCategory(next: VisitorStopCategory | 'all') {
    setCategory(next);
    if (next !== 'all' && selected.category !== next) setSelectedId(data.stops.find(stop => stop.category === next)!.id);
    overview();
  }
  function arrival(id: string) {
    setMode('explore');
    setCategory('all');
    const stop = data.stops.find(item => item.id === id)!;
    setSelectedId(id);
    const coordinates = id === 'station' ? [...data.stationApproach, stop.coordinates] : [...data.stationApproach.slice(-1), stop.coordinates, data.stops.find(item => item.id === 'dominicains')!.coordinates];
    mapRef.current?.fitBounds(boundsFor(coordinates), { padding: 70, duration: 500, maxZoom: 16, retainPadding: false });
  }
  function styleMap() {
    const map = mapRef.current?.getMap();
    if (!map || satellite) return;
    if (map.getLayer('water') && map.getPaintProperty('water', 'fill-color') !== '#b9d4cd') map.setPaintProperty('water', 'fill-color', '#b9d4cd');
    if (map.getLayer('building') && map.getPaintProperty('building', 'fill-color') !== '#e0ddd2') map.setPaintProperty('building', 'fill-color', '#e0ddd2');
  }

  return <div className="mt-8">
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-t-2xl bg-[#25382f] px-5 py-5 text-white sm:px-6">
      <div><h3 className="text-xl font-semibold">Your walk through {data.city}</h3><p className="mt-1 text-sm leading-6 text-white/80">About {distance} km · Add {stationDistance} km from the station · Leave time to browse, eat and take photos</p></div>
      <a href={data.sourceUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-11 w-full shrink-0 items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-[#25382f] transition-colors hover:bg-[#eaf0e8] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:w-auto">Open in Google Maps ↗</a>
    </div>
    <div className="border-x border-[#dce1d6] bg-[#f5f6f1] p-4 sm:px-5">
      <div role="group" aria-label="Plan your arrival" className="grid grid-cols-3 gap-2 sm:flex sm:flex-wrap">
        <button type="button" onClick={() => { setCategory('all'); overview(); }} className="min-h-14 rounded-xl border border-[#bacbbb] bg-white px-2 py-2 text-xs sm:min-h-11 sm:rounded-full sm:px-4 sm:text-sm font-semibold text-[#25382f] hover:bg-[#e6eee3]">Show whole walk</button>
        <button type="button" onClick={() => arrival('station')} className="flex min-h-14 flex-col items-center justify-center gap-1 rounded-xl border border-[#bacbbb] bg-white px-2 py-2 text-xs sm:min-h-11 sm:flex-row sm:gap-2 sm:rounded-full sm:px-4 sm:text-sm font-semibold text-[#25382f] hover:bg-[#e6eee3]"><StopIcon icon="train" />From the station</button>
        <button type="button" onClick={() => arrival('parking-rapp')} className="flex min-h-14 flex-col items-center justify-center gap-1 rounded-xl border border-[#bacbbb] bg-white px-2 py-2 text-xs sm:min-h-11 sm:flex-row sm:gap-2 sm:rounded-full sm:px-4 sm:text-sm font-semibold text-[#25382f] hover:bg-[#e6eee3]"><StopIcon icon="parking" />From Parking Rapp</button>
      </div>
      {steps.length > 0 && <div role="group" aria-label="Choose how to explore" className="mt-4 flex gap-1 rounded-xl border border-[#bacbbb] bg-white p-1 sm:w-fit">
        <button type="button" aria-pressed={mode === 'itinerary'} onClick={() => chooseMode('itinerary')} className={`min-h-11 flex-1 rounded-lg px-4 py-2 text-sm font-semibold sm:flex-none ${mode === 'itinerary' ? 'bg-[#25382f] text-white' : 'text-[#526258] hover:bg-[#e6eee3]'}`}>Follow the itinerary</button>
        <button type="button" aria-pressed={mode === 'explore'} onClick={() => chooseMode('explore')} className={`min-h-11 flex-1 rounded-lg px-4 py-2 text-sm font-semibold sm:flex-none ${mode === 'explore' ? 'bg-[#25382f] text-white' : 'text-[#526258] hover:bg-[#e6eee3]'}`}>All map stops</button>
      </div>}
      {mode === 'itinerary' && <p className="mt-3 max-w-3xl text-sm leading-6 text-[#526258]">Start at the Colmar sign, explore all six markets, then return to Place Rapp. Choose a step below or use Next stop to follow the walk.</p>}
      {mode === 'explore' && <div role="group" aria-label="Show map categories" className="mt-4 grid grid-cols-3 gap-1 sm:flex sm:flex-wrap sm:gap-2">
        {categories.map(item => <button key={item.id} type="button" aria-pressed={category === item.id} onClick={() => chooseCategory(item.id)} className={`flex min-h-11 items-center justify-center gap-1.5 rounded-lg px-1.5 py-2 text-xs font-semibold sm:px-3 sm:text-sm ${category === item.id ? 'bg-[#25382f] text-white' : 'text-[#526258] hover:bg-[#e6eee3]'}`}>
          {item.id !== 'all' && <span aria-hidden="true" className={`h-2.5 w-2.5 rounded-full border border-current ${colors[item.id]}`} />}{item.label}
        </button>)}
      </div>}
    </div>
    <div className="grid overflow-hidden border border-[#dce1d6] lg:grid-cols-[minmax(0,1fr)_360px]">
      <div ref={mapContainerRef} role="region" aria-label="Suggested Colmar walking route map" className="relative h-[480px] min-w-0 scroll-mt-[var(--guide-scroll-offset,5rem)] bg-[#f4f2ec] sm:h-[570px] lg:h-[640px]">
        {token && <Map key={attempt} ref={mapRef} mapboxAccessToken={token} mapStyle={satellite ? 'mapbox://styles/mapbox/satellite-streets-v12' : 'mapbox://styles/mapbox/light-v11'} styleDiffing={false}
          initialViewState={{ bounds, fitBoundsOptions: { padding: 65 } }} minZoom={12} maxZoom={19} maxBounds={[[7.31, 48.04], [7.41, 48.11]]}
          scrollZoom={true} dragRotate={false} touchPitch={false}
          onLoad={() => { setLoaded(true); setFailed(false); styleMap(); overview(0); }} onStyleData={styleMap}
          onError={event => { if (!loaded || /style|unauthorized|forbidden|access token|webgl/i.test(event.error.message)) setFailed(true); }}>
          <NavigationControl position="top-right" showCompass={false} /><FullscreenControl position="top-right" />
          <Source id="visitor-route" type="geojson" data={routeFeature(data.route)}>
            <Layer id="visitor-route-halo" type="line" layout={{ 'line-join': 'round', 'line-cap': 'round' }} paint={{ 'line-color': satellite ? '#25382f' : '#ffffff', 'line-width': 7 }} />
            <Layer id="visitor-route-line" type="line" layout={{ 'line-join': 'round', 'line-cap': 'round' }} paint={{ 'line-color': satellite ? '#c4f5a5' : '#176347', 'line-width': 3.5 }} />
          </Source>
          <Source id="station-approach" type="geojson" data={routeFeature(data.stationApproach)}>
            <Layer id="station-route-halo" type="line" paint={{ 'line-color': satellite ? '#25382f' : '#ffffff', 'line-width': 7 }} />
            <Layer id="station-route-line" type="line" paint={{ 'line-color': satellite ? '#a9dfff' : '#315d87', 'line-width': 3.5, 'line-dasharray': [2, 1.5] }} />
          </Source>
          {visibleStops.map(stop => {
            const offset = markerOffsets[stop.id];
            const active = selected.id === stop.id;
            return <Marker key={stop.id} longitude={stop.coordinates[0]} latitude={stop.coordinates[1]} className={active ? 'z-20' : stop.category === 'photo' ? 'z-10' : 'z-0'}>
              <div className="pointer-events-none relative h-11 w-11">
                {offset && <svg aria-hidden="true" width="44" height="44" className="absolute inset-0 overflow-visible"><line x1="22" y1="22" x2={22 + offset.x} y2={22 + offset.y} stroke={satellite ? '#ffffff' : '#526258'} strokeWidth="1.5" /><circle cx="22" cy="22" r="2" fill={satellite ? '#ffffff' : '#526258'} /></svg>}
                <button type="button" title={stop.name} aria-label={`Show ${stop.name} on map`} aria-pressed={active} onClick={() => selectStop(stop)} className={`pointer-events-auto relative flex h-11 w-11 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#176347] ${offset?.className ?? ''}`}>
                  <span className={`rounded-full border-2 border-white shadow-md ${active ? 'ring-4 ring-[#25382f]/35' : ''}`}><Badge stop={stop} /></span>
                  {active && <span className="pointer-events-none absolute bottom-full mb-1 whitespace-nowrap rounded-md bg-[#25382f] px-2 py-1 text-xs font-semibold text-white shadow">{stop.shortName}</span>}
                </button>
              </div>
            </Marker>;
          })}
        </Map>}
        <div role="group" aria-label="Visitor map background" className="absolute left-3 top-3 flex gap-1 rounded-xl border border-[#dce1d6] bg-white p-1 shadow-sm">
          {(['street', 'satellite'] as const).map(view => <button key={view} type="button" aria-pressed={mapView === view} onClick={() => { setMapView(view); setFailed(false); }} className={`min-h-11 rounded-lg px-3 text-sm font-semibold ${mapView === view ? 'bg-[#25382f] text-white' : 'text-[#25382f] hover:bg-[#edf1ed]'}`}>{view === 'street' ? 'Street' : 'Satellite'}</button>)}
        </div>
        {(!token || failed || !loaded) && <div role="status" className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[#f4f2ec] p-8 text-center text-sm leading-7 text-[#526258]">
          <p>{!token || failed ? 'The interactive map is unavailable. Explore the stops below or open the route in Google Maps.' : 'Loading your suggested walk…'}</p>
          {failed && <button type="button" onClick={() => { setFailed(false); setLoaded(false); setAttempt(value => value + 1); }} className="min-h-11 rounded-full border border-[#176347] px-5 font-semibold">Try again</button>}
          {(!token || failed) && <a href={data.sourceUrl} target="_blank" rel="noreferrer" className="underline underline-offset-4">Open the visitor route ↗</a>}
        </div>}
      </div>
      <aside ref={detailRef} tabIndex={-1} aria-label="Selected visitor map stop" className="scroll-mt-[var(--guide-scroll-offset,5rem)] border-t border-[#dce1d6] bg-[#fafbf7] p-5 focus-visible:outline-2 focus-visible:outline-[#176347] sm:p-6 lg:max-h-[640px] lg:overflow-y-auto lg:border-l lg:border-t-0">
        {activeStep ? <>
          <p role="status" aria-live="polite" aria-atomic="true" className="min-h-8 text-xs font-semibold uppercase tracking-[0.12em] text-[#176347]">Step {stepIndex + 1} of {steps.length} · {activeStep.label}</p>
          <h3 className="mt-3 min-h-[84px] text-xl font-semibold leading-7 text-[#25382f]">{activeStep.title}</h3>
          {selected.video ? <StopVideo key={selected.id} video={selected.video} /> : <StopPhotoGallery key={selected.id} name={selected.name} photos={selected.photos?.length ? selected.photos : selected.photo ? [selected.photo] : []} />}
          <nav aria-label="Itinerary steps" className="mt-4 grid grid-cols-2 gap-2">
            <button type="button" disabled={stepIndex === 0} onClick={() => selectStep(stepIndex - 1)} className="min-h-11 rounded-lg border border-[#bacbbb] bg-white px-3 py-2 text-sm font-semibold text-[#25382f] hover:bg-[#e6eee3] disabled:cursor-default disabled:opacity-40">← Previous stop</button>
            <button type="button" onClick={() => selectStep(stepIndex === steps.length - 1 ? 0 : stepIndex + 1)} className="min-h-11 rounded-lg bg-[#176347] px-3 py-2 text-sm font-semibold text-white hover:bg-[#25382f]">{stepIndex === steps.length - 1 ? 'Back to the start' : 'Next stop →'}</button>
          </nav>
          <p className="mt-3 text-sm leading-7 text-[#526258]">{activeStep.text}</p>
          {activeStep.highlights && <div className="mt-5"><h4 className="text-sm font-semibold text-[#25382f]">Look around this stop</h4><ul className="mt-2 list-disc space-y-2 pl-4 text-sm leading-6 text-[#526258]">{activeStep.highlights.map(text => <li key={text}>{text}</li>)}</ul></div>}
          {activeStep.tip && <p className="mt-4 border-l-2 border-[#b26723] pl-4 text-sm leading-6 text-[#65543b]">{activeStep.tip}</p>}
          {activeStep.onward && <div className="mt-4 rounded-xl bg-[#eaf0e8] p-4"><h4 className="text-sm font-semibold text-[#25382f]">Continue the walk</h4><p className="mt-1 text-sm leading-6 text-[#526258]">{activeStep.onward}</p></div>}
        </> : <>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#607767]"><Badge stop={selected} />{selected.category === 'market' ? `Market ${selected.marketNumber} of 6` : categories.find(item => item.id === selected.category)?.label}</div>
          <h3 className="mt-4 text-xl font-semibold leading-7 text-[#25382f]">{selected.name}</h3>
          {selected.video ? <StopVideo key={selected.id} video={selected.video} /> : <StopPhotoGallery key={selected.id} name={selected.name} photos={selected.photos?.length ? selected.photos : selected.photo ? [selected.photo] : []} />}
          <p className="mt-4 text-sm leading-7 text-[#526258]">{selected.text}</p>
          {selected.tip && <p className="mt-4 border-l-2 border-[#b26723] pl-4 text-sm leading-6 text-[#65543b]">{selected.tip}</p>}
          {steps.length > 0 && <button type="button" onClick={() => selectStep(stepIndex < 0 || selected.category === 'arrival' ? 0 : stepIndex)} className="mt-4 min-h-11 rounded-lg bg-[#176347] px-4 py-2 text-sm font-semibold text-white hover:bg-[#25382f]">{stepIndex < 0 || selected.category === 'arrival' ? 'Start at the Colmar sign →' : 'Follow the itinerary from here →'}</button>}
        </>}
        <a href={`https://www.google.com/maps/dir/?api=1&destination=${selected.coordinates[1]},${selected.coordinates[0]}&travelmode=walking`} target="_blank" rel="noreferrer" className="mt-4 inline-flex min-h-11 items-center text-sm font-semibold text-[#176347] underline underline-offset-4">Walking directions to this stop ↗</a>
        <button type="button" onClick={() => mapContainerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })} className="mt-2 block min-h-11 text-sm font-semibold text-[#176347] underline underline-offset-4 lg:hidden">Back to the map ↑</button>
      </aside>
    </div>
    <div className="flex flex-wrap gap-x-6 gap-y-2 rounded-b-2xl border border-t-0 border-[#dce1d6] bg-[#f5f6f1] px-5 py-3 text-xs leading-6 text-[#526258]">
      <span className="flex items-center gap-2"><span className="h-1 w-7 rounded-full bg-[#176347]" />Suggested walk · {distance} km</span>
      <span className="flex items-center gap-2"><span className="w-7 border-t-[3px] border-dashed border-[#315d87]" />Station approach · {stationDistance} km</span>
      <span>Drag to explore · Scroll or use + / − to zoom</span>
    </div>
    {mode === 'itinerary' && data.itinerary ? <div className="mt-6">
      <h3 className="text-lg font-semibold text-[#25382f]">{data.itinerary.title}</h3>
      <p className="mt-2 max-w-3xl text-sm leading-6 text-[#657069]">{data.itinerary.introduction}</p>
      <p className="mt-2 text-xs leading-6 text-[#657069]">Steps follow the walking order. The green numbers on the map identify the six Christmas markets.</p>
      <ol className="mt-4 grid gap-2 sm:grid-cols-2">{steps.map((step, index) => <li key={step.stopId}>
        <button type="button" aria-current={selected.id === step.stopId ? 'step' : undefined} onClick={() => selectStep(index)} className={`flex min-h-20 w-full items-center gap-3 rounded-xl border p-3 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#176347] ${selected.id === step.stopId ? 'border-[#176347] bg-[#e6eee3]' : 'border-[#e1e3d9] bg-white hover:bg-[#f5f6f1]'}`}>
          <span className="w-12 shrink-0 text-center"><span className="block text-[10px] font-semibold uppercase tracking-wider text-[#607767]">Step</span><span className="text-xl font-semibold text-[#25382f]">{index + 1}</span></span>
          <span><span className="block text-sm font-semibold leading-6 text-[#25382f]">{step.title}</span><span className="mt-1 block text-xs text-[#607767]">{step.label}</span></span>
        </button>
      </li>)}</ol>
    </div> : <div className="mt-6"><h3 className="text-lg font-semibold text-[#25382f]">{category === 'all' ? 'Choose a stop along the way' : categories.find(item => item.id === category)?.label}</h3>
      <p className="mt-2 text-sm leading-6 text-[#657069]">Choose a stop to see photos and tips for your visit. Market numbers identify the six locations; you can join the walk wherever suits your arrival.</p>
      <ul className="mt-4 grid gap-2 sm:grid-cols-2 xl:grid-cols-3">{visibleStops.map(stop => {
        const photoCount = stop.photos?.length || (stop.photo ? 1 : 0);
        return <li key={stop.id}><button type="button" aria-pressed={selected.id === stop.id} onClick={() => selectStop(stop, true)} className={`flex min-h-16 w-full items-center gap-3 rounded-xl border px-3 py-3 text-left text-sm font-semibold ${selected.id === stop.id ? 'border-[#176347] bg-[#e6eee3] text-[#176347]' : 'border-[#e1e3d9] text-[#25382f] hover:bg-[#f5f6f1]'}`}><Badge stop={stop} /><span>{stop.name}{photoCount > 0 && <span className="mt-1 block text-xs font-normal text-[#607767]">{photoCount} {photoCount === 1 ? 'photo' : 'photos'}</span>}</span></button></li>;
      })}</ul>
    </div>}
    <p className="mt-5 max-w-3xl text-sm leading-7 text-[#657069]">Arriving by train? Follow the blue line from the station through Champ de Mars and Place Rapp to join the walk. The suggested route starts near Champ de Mars and finishes at Parking Rapp.</p>
    <p className="mt-3 max-w-3xl text-xs leading-6 text-[#657069]">Seasonal displays and access can change. You can find the routes I filmed on the day and evening video pages.</p>
  </div>;
}
