"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import GuideDisclosure from './GuideDisclosure';
import ChristmasLights from './ChristmasLights';
import StopPhotoGallery from './StopPhotoGallery';
import StopVideo from './StopVideo';
import Map, { FullscreenControl, Layer, Marker, NavigationControl, Source, type MapRef } from 'react-map-gl/mapbox';
import type { Feature, LineString } from 'geojson';
import type { MapCoordinate } from '../../lib/guides/map-types';
import { walkingDistanceKm, type VisitorMapData, type VisitorMapStop, type VisitorStopCategory, type VisitorStopIcon } from '../../lib/guides/visitor-map-types';
import 'mapbox-gl/dist/mapbox-gl.css';

type MapCategory = VisitorStopCategory | 'all';
const categories: { id: MapCategory; label: string }[] = [
  { id: 'market', label: 'Christmas markets' }, { id: 'all', label: 'All stops' },
  { id: 'photo', label: 'Photo spots' }, { id: 'arrival', label: 'Arriving' }, { id: 'useful', label: 'Useful stops' },
];
const colors = {
  market: 'bg-[#176347] text-white', photo: 'bg-[#842d3f] text-white',
  arrival: 'bg-[#315d87] text-white', useful: 'bg-[#fffaf0] text-[#65543b]',
};

function StopIcon({ icon }: { icon: VisitorStopIcon }) {
  if (icon === 'information') return <span aria-hidden="true" className="font-serif text-2xl font-bold leading-none normal-case">i</span>;
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
    {stop.icon === 'wc' ? <span className="text-[11px] font-bold">WC</span> : <StopIcon icon={stop.category === 'market' ? 'market' : stop.icon} />}
  </span>;
}

// Small leader lines retain the exact pin locations while separating nearby
// controls at the customs house, canal and Place Rapp. No coordinates are moved.
const markerOffsets: Record<string, { x: number; y: number; className: string }> = {
  'wc-rapp': { x: -28, y: 22, className: '-translate-x-7 translate-y-[22px]' },
  'wc-parking-rapp': { x: 25, y: -22, className: 'translate-x-[25px] -translate-y-[22px]' },
  'wc-ancienne-douane': { x: -26, y: 30, className: '-translate-x-[26px] translate-y-[30px]' },
  'wc-covered-market': { x: -28, y: -30, className: '-translate-x-7 -translate-y-[30px]' },
  'wc-children': { x: 30, y: 20, className: 'translate-x-[30px] translate-y-5' },
  'wc-gourmet': { x: 32, y: -20, className: 'translate-x-8 -translate-y-5' },
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

function subscribeToMobile(callback: () => void) {
  const query = window.matchMedia('(max-width: 1023px)');
  query.addEventListener('change', callback);
  return () => query.removeEventListener('change', callback);
}
const getMobileSnapshot = () => window.matchMedia('(max-width: 1023px)').matches;
const getServerSnapshot = () => false;

export default function VisitorRouteMap({ data }: { data: VisitorMapData }) {
  const isMobile = useSyncExternalStore(subscribeToMobile, getMobileSnapshot, getServerSnapshot);
  const sheetRef = useRef<HTMLDialogElement>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  function openSheet() {
    if (!isMobile) return;
    setSheetOpen(true);
    sheetRef.current?.showModal();
  }
  const mapRef = useRef<MapRef>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const detailRef = useRef<HTMLElement>(null);
  const steps = data.itinerary?.steps ?? [];
  const [mode, setMode] = useState<'itinerary' | 'explore'>(steps.length ? 'itinerary' : 'explore');
  const [selectedId, setSelectedId] = useState(steps[0]?.stopId ?? data.stops[0].id);
  const [category, setCategory] = useState<MapCategory>('market');
  const [mapView, setMapView] = useState<'street' | 'satellite'>('street');
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const selected = data.stops.find(stop => stop.id === selectedId) ?? data.stops[0];
  const stepIndex = steps.findIndex(step => step.stopId === selected.id);
  const activeStep = mode === 'itinerary' ? steps[stepIndex] : undefined;
  const visibleStops = data.stops.filter(stop => category === 'all' || stop.category === category || (category === 'market' && !!activeStep && stop.id === selectedId));
  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
  const distance = walkingDistanceKm(data.route).toFixed(1);
  const stationDistance = walkingDistanceKm(data.stationApproach).toFixed(1);
  const satellite = mapView === 'satellite';
  const approachLabel = data.approachLabel ?? 'Station approach';
  const isColmar = data.city === 'Colmar';
  const [showOptional, setShowOptional] = useState(false);

  useEffect(() => {
    detailRef.current?.scrollTo({ top: 0 });
    sheetRef.current?.scrollTo({ top: 0 });
  }, [selectedId, mode]);

  useEffect(() => {
    if (!isMobile) sheetRef.current?.close();
  }, [isMobile]);

  useEffect(() => {
    if (!sheetOpen || !isMobile) return;
    const root = document.documentElement;
    const alreadyLocked = root.classList.contains('overflow-hidden');
    root.classList.add('overflow-hidden');
    return () => { if (!alreadyLocked) root.classList.remove('overflow-hidden'); };
  }, [sheetOpen, isMobile]);

  function overview(duration = 500, filter: MapCategory = category) {
    const narrow = (mapContainerRef.current?.clientWidth ?? 800) < 500;
    const walkBounds = filter === 'market' ? boundsFor(data.route) : boundsFor([...data.route, ...data.stops.filter(stop => filter === 'all' || stop.category === filter).map(stop => stop.coordinates)]);
    mapRef.current?.fitBounds(walkBounds, { padding: { top: isMobile ? 120 : 35, bottom: isMobile ? 75 : 35, left: isMobile ? 25 : narrow ? 140 : 155, right: 35 }, maxZoom: 16, duration, retainPadding: false });
  }
  function selectStop(stop: VisitorMapStop, fromList = false) {
    setMode(steps.some(step => step.stopId === stop.id) ? 'itinerary' : 'explore');
    setSelectedId(stop.id);
    if (data.optionalRoute?.stopIds?.includes(stop.id)) setShowOptional(true);
    mapRef.current?.easeTo({ center: stop.coordinates, zoom: 16.7, duration: 500 });
    if (isMobile) openSheet();
    if (fromList && !isMobile) {
      detailRef.current?.focus({ preventScroll: true });
      detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
  function selectStep(index: number) {
    const step = steps[index];
    const stop = step && data.stops.find(item => item.id === step.stopId);
    if (!stop) return;
    setMode('itinerary');
    setCategory('market');
    selectStop(stop, true);
  }
  function chooseCategory(next: MapCategory) {
    setCategory(next);
    if (next !== 'all' && next !== 'market' && selected.category !== next) {
      const stop = data.stops.find(stop => stop.category === next);
      if (stop) {
        setSelectedId(stop.id);
        setMode(steps.some(step => step.stopId === stop.id) ? 'itinerary' : 'explore');
      }
    }
    overview(500, next);
  }
  function arrival(id: string) {
    setMode('explore');
    setCategory('arrival');
    const stop = data.stops.find(item => item.id === id)!;
    setSelectedId(id);
    openSheet();
    const coordinates = id === 'station' ? [...data.stationApproach, stop.coordinates] : [...data.stationApproach.slice(-1), stop.coordinates, data.stops.find(item => item.id === 'dominicains')!.coordinates];
    mapRef.current?.fitBounds(boundsFor(coordinates), { padding: 70, duration: 500, maxZoom: 16, retainPadding: false });
  }
  function styleMap() {
    const map = mapRef.current?.getMap();
    if (!map || satellite) return;
    if (map.getLayer('water') && map.getPaintProperty('water', 'fill-color') !== '#b9d4cd') map.setPaintProperty('water', 'fill-color', '#b9d4cd');
    if (map.getLayer('building') && map.getPaintProperty('building', 'fill-color') !== '#e0ddd2') map.setPaintProperty('building', 'fill-color', '#e0ddd2');
  }

  const stopDetails = <>
        {activeStep ? <>
          <p role="status" aria-live="polite" aria-atomic="true" className="lg:min-h-8 text-xs font-semibold uppercase tracking-[0.12em] text-[#176347]">Step {stepIndex + 1} of {steps.length} · {activeStep.label}</p>
          <h3 className="mb-4 mt-3 lg:min-h-[84px] text-xl font-semibold leading-7 text-[#25382f]">{activeStep.title}</h3>
          {selected.video ? <StopVideo key={selected.id} video={selected.video} /> : <StopPhotoGallery key={selected.id} name={selected.name} photos={selected.photos?.length ? selected.photos : selected.photo ? [selected.photo] : []} />}
          <nav aria-label="Itinerary steps" className="mt-4 grid grid-cols-2 gap-2">
            <button type="button" disabled={stepIndex === 0} onClick={() => selectStep(stepIndex - 1)} className="min-h-11 rounded-lg border border-[#bacbbb] bg-white px-3 py-2 text-sm font-semibold text-[#25382f] hover:bg-[#e6eee3] disabled:cursor-default disabled:opacity-40">← Previous stop</button>
            <button type="button" onClick={() => selectStep(stepIndex === steps.length - 1 ? 0 : stepIndex + 1)} className="min-h-11 rounded-lg bg-[#176347] px-3 py-2 text-sm font-semibold text-white hover:bg-[#25382f]">{stepIndex === steps.length - 1 ? 'Back to the start' : 'Next stop →'}</button>
          </nav>
          <p className="mt-3 text-sm leading-7 text-[#526258]">{activeStep.text}</p>
          {data.showItineraryTips && activeStep.tip && <p className="mt-4 border-l-2 border-[#b18b45] pl-4 text-sm leading-6 text-[#65543b]">{activeStep.tip}</p>}
          <GuideDisclosure key={`details-${selected.id}`} title="More about this stop" className="mt-4">
          {activeStep.highlights && <div className="mt-5"><h4 className="text-sm font-semibold text-[#25382f]">Look around this stop</h4><ul className="mt-2 list-disc space-y-2 pl-4 text-sm leading-6 text-[#526258]">{activeStep.highlights.map(text => <li key={text}>{text}</li>)}</ul></div>}
          {!data.showItineraryTips && activeStep.tip && <p className="mt-4 border-l-2 border-[#b18b45] pl-4 text-sm leading-6 text-[#65543b]">{activeStep.tip}</p>}
          {activeStep.onward && <div className="mt-4 rounded-xl bg-[#eaf0e8] p-4"><h4 className="text-sm font-semibold text-[#25382f]">Continue the walk</h4><p className="mt-1 text-sm leading-6 text-[#526258]">{activeStep.onward}</p></div>}
        <a href={`https://www.google.com/maps/dir/?api=1&destination=${selected.coordinates[1]},${selected.coordinates[0]}&travelmode=walking`} target="_blank" rel="noreferrer" className="mt-4 inline-flex min-h-11 items-center text-sm font-semibold text-[#176347] underline underline-offset-4">{selected.approximateLocation ? 'Walking directions to this area ↗' : 'Walking directions to this stop ↗'}</a>
          </GuideDisclosure>
        </> : <>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#607767]"><Badge stop={selected} />{selected.category === 'market' ? `Market ${selected.marketNumber} of ${data.stops.filter(stop => stop.category === 'market').length}` : categories.find(item => item.id === selected.category)?.label}</div>
          <h3 className="mt-4 text-xl font-semibold leading-7 text-[#25382f]">{selected.name}</h3>
          {selected.video ? <StopVideo key={selected.id} video={selected.video} /> : <StopPhotoGallery key={selected.id} name={selected.name} photos={selected.photos?.length ? selected.photos : selected.photo ? [selected.photo] : []} />}
          <p className="mt-4 text-sm leading-7 text-[#526258]">{selected.text}</p>
          {selected.informationUrl && <a href={selected.informationUrl} target="_blank" rel="noreferrer" className="mt-3 inline-block text-sm font-semibold text-[#176347] underline underline-offset-4">{selected.informationLabel ?? 'Official 2026 market map'} ↗</a>}
          {selected.tip && <p className="mt-4 border-l-2 border-[#b18b45] pl-4 text-sm leading-6 text-[#65543b]">{selected.tip}</p>}
          {steps.length > 0 && <button type="button" onClick={() => selectStep(stepIndex < 0 || selected.category === 'arrival' ? 0 : stepIndex)} className="mt-4 min-h-11 rounded-lg bg-[#176347] px-4 py-2 text-sm font-semibold text-white hover:bg-[#25382f]">{stepIndex < 0 || selected.category === 'arrival' ? `Start the ${data.city} walk →` : 'Follow the itinerary from here →'}</button>}
        </>}
        {!activeStep && <>
        <a href={`https://www.google.com/maps/dir/?api=1&destination=${selected.coordinates[1]},${selected.coordinates[0]}&travelmode=walking`} target="_blank" rel="noreferrer" className="mt-4 inline-flex min-h-11 items-center text-sm font-semibold text-[#176347] underline underline-offset-4">{selected.approximateLocation ? 'Walking directions to this area ↗' : 'Walking directions to this stop ↗'}</a>
        </>}
  </>;
  const arrivalControls = isColmar ? <>
    <div className="">
      <GuideDisclosure title="Getting to the Colmar sign">
        <p className="mb-4 text-sm leading-6 text-[#526258]">Start at the Colmar sign in Parc du Champ de Mars. From the station, follow the blue line through the park. Choose your arrival point below to see the approach; the walk finishes at Parking Rapp.</p>
      <div role="group" aria-label="Plan your arrival" className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
        <button type="button" onClick={() => arrival('station')} className="flex min-h-14 flex-col items-center justify-center gap-1 rounded-xl border border-[#bacbbb] bg-white px-2 py-2 text-xs sm:min-h-11 sm:flex-row sm:gap-2 sm:rounded-full sm:px-4 sm:text-sm font-semibold text-[#25382f] hover:bg-[#e6eee3]"><StopIcon icon="train" />From the station</button>
        <button type="button" onClick={() => arrival('parking-rapp')} className="flex min-h-14 flex-col items-center justify-center gap-1 rounded-xl border border-[#bacbbb] bg-white px-2 py-2 text-xs sm:min-h-11 sm:flex-row sm:gap-2 sm:rounded-full sm:px-4 sm:text-sm font-semibold text-[#25382f] hover:bg-[#e6eee3]"><StopIcon icon="parking" />From Parking Rapp</button>
      </div>
      </GuideDisclosure>
    </div>
  </> : null;

  return <div className="mt-4 lg:mt-8">
    {arrivalControls && <div className="mb-6 hidden lg:block">{arrivalControls}</div>}
    <div className="hidden overflow-hidden rounded-t-2xl lg:block"><ChristmasLights /></div>
    <div className="hidden flex-wrap items-center justify-between gap-4 bg-[#25382f] px-5 py-5 text-white sm:px-6 lg:flex">
      <div><h3 className="text-xl font-semibold">Your walk through {data.city}</h3><p className="mt-1 text-sm leading-6 text-white/80">About {distance} km · {approachLabel}: {stationDistance} km · Leave time to browse, eat and take photos</p></div>
      <a href={data.sourceUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-11 w-full shrink-0 items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-[#25382f] transition-colors hover:bg-[#eaf0e8] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:w-auto">Open in Google Maps ↗</a>
    </div>
    <div className="grid overflow-hidden rounded-t-2xl border lg:rounded-none border-[#dce1d6] lg:grid-cols-[minmax(0,1fr)_420px]">
      <div ref={mapContainerRef} role="region" aria-label={`Suggested ${data.city} walking route map`} className="relative h-[480px] min-w-0 scroll-mt-[var(--guide-scroll-offset,5rem)] bg-[#f4f2ec] sm:h-[570px] lg:h-[640px]">
        {token && <Map key={attempt} ref={mapRef} mapboxAccessToken={token} mapStyle={satellite ? 'mapbox://styles/mapbox/satellite-streets-v12' : 'mapbox://styles/mapbox/light-v11'} styleDiffing={false}
          initialViewState={{ bounds: boundsFor(data.route), fitBoundsOptions: { padding: 35 } }} minZoom={12} maxZoom={19} maxBounds={isColmar ? [[7.31, 48.04], [7.41, 48.11]] : undefined}
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
          {showOptional && data.optionalRoute && <Source id="optional-walk" type="geojson" data={routeFeature(data.optionalRoute.coordinates)}><Layer id="optional-walk-halo" type="line" paint={{ 'line-color': '#ffffff', 'line-width': 6 }} /><Layer id="optional-walk-line" type="line" paint={{ 'line-color': '#842d3f', 'line-width': 3, 'line-dasharray': [2, 1] }} /></Source>}
          {visibleStops.map(stop => {
            const offset = markerOffsets[stop.id];
            const active = selected.id === stop.id;
            return <Marker key={stop.id} longitude={stop.coordinates[0]} latitude={stop.coordinates[1]} className={active ? 'z-20' : stop.category === 'photo' ? 'z-10' : 'z-0'}>
              <div className="pointer-events-none relative h-11 w-11">
                {offset && <svg aria-hidden="true" width="44" height="44" className="absolute inset-0 overflow-visible"><line x1="22" y1="22" x2={22 + offset.x} y2={22 + offset.y} stroke={satellite ? '#ffffff' : '#526258'} strokeWidth="1.5" /><circle cx="22" cy="22" r="2" fill={satellite ? '#ffffff' : '#526258'} /></svg>}
                <button type="button" title={stop.name} aria-label={`Show ${stop.name} on map`} aria-pressed={active} onClick={() => selectStop(stop)} className={`pointer-events-auto relative flex h-11 w-11 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#176347] ${offset?.className ?? ''}`}>
                  <span className={`rounded-full border-2 border-white shadow-md ${active ? 'ring-4 ring-[#c29a53]/70' : ''}`}><Badge stop={stop} /></span>
                  {active && <span className="pointer-events-none absolute bottom-full mb-1 whitespace-nowrap rounded-md bg-[#f3e2b6] px-2 py-1 text-xs font-semibold text-[#25382f] shadow">{stop.shortName}</span>}
                </button>
              </div>
            </Marker>;
          })}
        </Map>}
        <div className="absolute left-3 top-3 z-30 flex flex-col items-start gap-3">
          <div role="group" aria-label="Visitor map background" className="flex rounded-xl border border-[#dce1d6] bg-white p-1 shadow-md">
            {(['street', 'satellite'] as const).map(view => <button key={view} type="button" aria-pressed={mapView === view} onClick={() => { setMapView(view); setFailed(false); }} className={`min-h-11 rounded-lg px-3 text-xs font-semibold ${mapView === view ? 'bg-[#25382f] text-white' : 'text-[#25382f] hover:bg-[#edf1ed]'}`}>{view === 'street' ? 'Street' : 'Satellite'}</button>)}
          </div>
          <label className="flex min-h-11 items-center gap-2 rounded-xl border border-[#dce1d6] bg-white px-3 text-xs font-semibold text-[#25382f] shadow-md lg:hidden">
            Show:
            <select aria-label="Show stops on map" value={category} onChange={event => chooseCategory(event.target.value as MapCategory)} className="min-h-11 max-w-40 bg-white text-xs">
              {categories.map(item => <option key={item.id} value={item.id}>{item.label}</option>)}
            </select>
          </label>
          <div role="group" aria-label="Show map categories" className="hidden w-32 flex-col rounded-xl lg:flex border border-[#dce1d6] bg-white p-1 shadow-md">
            {categories.map(item => <button key={item.id} type="button" aria-pressed={category === item.id} onClick={() => chooseCategory(item.id)} className={`flex min-h-11 items-center gap-2 rounded-lg px-3 text-left text-xs font-semibold ${category === item.id ? 'bg-[#25382f] text-white' : 'text-[#25382f] hover:bg-[#edf1ed]'}`}>
              <span aria-hidden="true" className={`h-2.5 w-2.5 shrink-0 rounded-full border ${item.id === 'all' ? 'bg-[#c29a53] border-[#c29a53]' : colors[item.id]}`} />{item.label}
            </button>)}
          </div>
        </div>
        {data.optionalRoute && <button type="button" aria-pressed={showOptional} onClick={() => { const next = !showOptional; setShowOptional(next); if (next && data.optionalRoute) mapRef.current?.fitBounds(boundsFor([...data.route, ...data.optionalRoute.coordinates]), {padding: 70, duration: 500, retainPadding: false}); else overview(); }} className={`absolute bottom-24 left-3 z-30 min-h-11 max-w-48 rounded-xl border px-3 py-2 text-left text-xs font-semibold shadow-md lg:bottom-10 ${showOptional ? 'border-[#842d3f] bg-[#842d3f] text-white' : 'border-[#dce1d6] bg-white text-[#842d3f]'}`}>{showOptional ? 'Hide optional route' : `Show ${data.optionalRoute.label.toLowerCase()}`}</button>}
        {steps.length > 0 && <button type="button" onClick={() => selectStep(0)} className="absolute bottom-8 left-1/2 z-30 min-h-11 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#176347] px-5 text-sm font-semibold text-white shadow-lg lg:hidden">Start the walk →</button>}
        {(!token || failed || !loaded) && <div role="status" className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[#f4f2ec] p-8 text-center text-sm leading-7 text-[#526258]">
          <p>{!token || failed ? 'The interactive map is unavailable. Explore the stops below or open the route in Google Maps.' : 'Loading your suggested walk…'}</p>
          {failed && <button type="button" onClick={() => { setFailed(false); setLoaded(false); setAttempt(value => value + 1); }} className="min-h-11 rounded-full border border-[#176347] px-5 font-semibold">Try again</button>}
          {(!token || failed) && <a href={data.sourceUrl} target="_blank" rel="noreferrer" className="underline underline-offset-4">Open the visitor route ↗</a>}
        </div>}
      </div>
      <aside ref={detailRef} tabIndex={-1} aria-label="Selected visitor map stop" className="hidden lg:block lg:order-last scroll-mt-[var(--guide-scroll-offset,5rem)] border-t border-[#dce1d6] bg-[#fafbf7] p-5 focus-visible:outline-2 focus-visible:outline-[#176347] sm:p-6 lg:max-h-[640px] lg:overflow-y-auto lg:border-l lg:border-t-0">
        {!isMobile && stopDetails}
      </aside>
    </div>
    <div className="flex flex-wrap gap-x-6 gap-y-2 rounded-b-2xl border border-t-0 border-[#dce1d6] bg-[#f5f6f1] px-5 py-3 text-xs leading-6 text-[#526258]">
      <span className="flex items-center gap-2"><span className="h-1 w-7 rounded-full bg-[#176347]" />Suggested walk · {distance} km{data.routeDistanceNote && <span> · {data.routeDistanceNote}</span>}</span>
      <span className="flex items-center gap-2"><span className="w-7 border-t-[3px] border-dashed border-[#315d87]" />{approachLabel} · {stationDistance} km</span>
      <span className="hidden items-center gap-2 lg:flex"><span className="text-[#176347]"><StopIcon icon="market" /></span>Green stall icons mark the Christmas markets. Follow Next stop for the walking order.</span>
      <span className="hidden lg:inline">Drag to explore · Scroll or use + / − to zoom</span>
    </div>
    <div className="mt-4 space-y-3 lg:hidden">
      <p className="text-sm text-[#526258]">Tap a stop to explore it, or start the suggested walk.</p>
      {arrivalControls}
      <a href={data.sourceUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center text-sm font-semibold text-[#176347] underline underline-offset-4">Open the walking map in Google Maps ↗</a>
    </div>
    <dialog ref={sheetRef} aria-label="Selected walking stop" onClose={() => setSheetOpen(false)} className="fixed inset-x-0 bottom-0 top-auto z-50 m-0 max-h-[85dvh] w-full max-w-none overflow-y-auto overscroll-contain rounded-t-3xl border-0 bg-[#fafbf7] p-5 pb-8 text-[#25382f] shadow-2xl backdrop:bg-black/35 motion-safe:transition-transform motion-safe:duration-300 starting:translate-y-full">
      <div className="sticky -top-5 z-10 -mx-5 -mt-5 mb-3 flex justify-end border-b border-[#dce1d6] bg-[#fafbf7] px-4 py-2">
        <button type="button" autoFocus onClick={() => sheetRef.current?.close()} className="min-h-11 rounded-lg px-3 text-sm font-semibold text-[#176347]">Back to map ✕</button>
      </div>
      {isMobile && sheetOpen && stopDetails}
    </dialog>
    {data.itinerary ? <GuideDisclosure title="Choose a different stop" className="mt-6">
      <h3 className="text-lg font-semibold text-[#25382f]">{data.itinerary.title}</h3>
      <p className="mt-2 max-w-3xl text-sm leading-6 text-[#657069]">{data.itinerary.introduction}</p>
      <p className="mt-2 text-xs leading-6 text-[#657069]">The steps below follow the walking order, including the markets and stops along the way.</p>
      <ol className="mt-4 grid gap-2 sm:grid-cols-2">{steps.map((step, index) => <li key={step.stopId}>
        <button type="button" aria-current={selected.id === step.stopId ? 'step' : undefined} onClick={() => selectStep(index)} className={`flex min-h-20 w-full items-center gap-3 rounded-xl border p-3 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#176347] ${selected.id === step.stopId ? 'border-[#b18b45] bg-[#fbf2dc]' : 'border-[#e1e3d9] bg-white hover:bg-[#f5f6f1]'}`}>
          <span className="w-12 shrink-0 text-center"><span className="block text-[10px] font-semibold uppercase tracking-wider text-[#607767]">Step</span><span className="text-xl font-semibold text-[#25382f]">{index + 1}</span></span>
          <span><span className="block text-sm font-semibold leading-6 text-[#25382f]">{step.title}</span><span className="mt-1 block text-xs text-[#607767]">{step.label}</span></span>
        </button>
      </li>)}</ol>
    </GuideDisclosure> : <div className="mt-6"><h3 className="text-lg font-semibold text-[#25382f]">{category === 'all' ? 'Choose a stop along the way' : categories.find(item => item.id === category)?.label}</h3>
      <p className="mt-2 text-sm leading-6 text-[#657069]">Choose a stop to see photos and tips for your visit. Green stall icons identify the markets; you can join the walk wherever suits your arrival.</p>
      <ul className="mt-4 grid gap-2 sm:grid-cols-2 xl:grid-cols-3">{visibleStops.map(stop => {
        const photoCount = stop.photos?.length || (stop.photo ? 1 : 0);
        return <li key={stop.id}><button type="button" aria-pressed={selected.id === stop.id} onClick={() => selectStop(stop, true)} className={`flex min-h-16 w-full items-center gap-3 rounded-xl border px-3 py-3 text-left text-sm font-semibold ${selected.id === stop.id ? 'border-[#b18b45] bg-[#fbf2dc] text-[#176347]' : 'border-[#e1e3d9] text-[#25382f] hover:bg-[#f5f6f1]'}`}><Badge stop={stop} /><span>{stop.name}{photoCount > 0 && <span className="mt-1 block text-xs font-normal text-[#607767]">{photoCount} {photoCount === 1 ? 'photo' : 'photos'}</span>}</span></button></li>;
      })}</ul>
    </div>}
    <p className="mt-3 max-w-3xl text-xs leading-6 text-[#657069]">Seasonal displays and access can change. You can find the routes I filmed on the full walking-tour pages.</p>
  </div>;
}
