"use client";

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import 'pannellum/build/pannellum.css';

type Group = { id: string; name: string; poster: string; photos: { src: string; label: string }[] };
type Viewer = { destroy: () => void; on: (event: string, callback: () => void) => void; getYaw: () => number; setYaw: (yaw: number) => void; getHfov: () => number; setHfov: (hfov: number) => void };
type PanoramaWindow = Window & { pannellum?: { viewer: (element: HTMLElement, options: Record<string, unknown>) => Viewer } };

function PanoramaScene({ src, name }: { src: string; name: string }) {
  const container = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<Viewer | null>(null);
  const [status, setStatus] = useState('loading');
  useEffect(() => {
    let cancelled = false;
    let viewer: Viewer | undefined;
    import('pannellum').then(() => {
      if (cancelled || !container.current) return;
      const api = (window as PanoramaWindow).pannellum;
      if (!api) throw new Error('Panorama viewer unavailable');
      viewer = api.viewer(container.current, { type: 'equirectangular', panorama: src, autoLoad: true, hfov: 100, minHfov: 50, maxHfov: 120, mouseZoom: false, autoRotate: 0, orientationOnByDefault: false, showControls: false, keyboardZoom: false, escapeHTML: true });
      viewerRef.current = viewer;
      viewer.on('load', () => { if (!cancelled) setStatus('ready'); });
      viewer.on('error', () => { if (!cancelled) setStatus('error'); });
    }).catch(() => { if (!cancelled) setStatus('error'); });
    return () => { cancelled = true; viewerRef.current = null; viewer?.destroy(); };
  }, [src]);
  const control = 'min-h-11 min-w-11 rounded-lg border border-[#c6d2c8] px-4 font-semibold disabled:opacity-40';
  return <div className="flex min-h-0 flex-1 flex-col">
    <div ref={container} tabIndex={0} role="region" aria-label={`Interactive 360° photo: ${name}`} className="min-h-[180px] flex-1 bg-[#25382f] focus-visible:outline-2 focus-visible:outline-[#176347]" />
    <div className="flex shrink-0 flex-wrap items-center justify-between gap-2 px-4 py-2">
      <p role="status" className="max-w-xl text-sm text-[#526258]">{status === 'loading' ? 'Opening the 360° photo…' : status === 'error' ? 'This view could not load. Choose another view or close and try again.' : 'Drag or swipe to look around. Use the buttons to turn and zoom.'}</p>
      <div className="flex gap-2" aria-label="Panorama controls">
        <button type="button" className={control} disabled={status !== 'ready'} aria-label="Look left" onClick={() => { const v = viewerRef.current; if (v) v.setYaw(v.getYaw() - 30); }}>←</button>
        <button type="button" className={control} disabled={status !== 'ready'} aria-label="Look right" onClick={() => { const v = viewerRef.current; if (v) v.setYaw(v.getYaw() + 30); }}>→</button>
        <button type="button" className={control} disabled={status !== 'ready'} aria-label="Zoom in panorama" onClick={() => { const v = viewerRef.current; if (v) v.setHfov(Math.max(50, v.getHfov() - 10)); }}>+</button>
        <button type="button" className={control} disabled={status !== 'ready'} aria-label="Zoom out panorama" onClick={() => { const v = viewerRef.current; if (v) v.setHfov(Math.min(120, v.getHfov() + 10)); }}>−</button>
      </div>
    </div>
  </div>;
}

export default function GuidePanoramaGallery({ groups }: { groups: Group[] }) {
  const [selected, setSelected] = useState<Group | null>(null);
  const [index, setIndex] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);
  useEffect(() => {
    if (!selected) return;
    const element = dialog.current;
    const previousOverflow = document.body.style.overflow;
    element?.showModal();
    document.body.style.overflow = 'hidden';
    return () => { element?.close(); document.body.style.overflow = previousOverflow; trigger.current?.focus(); };
  }, [selected]);
  return <>
    <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {groups.map(group => <button key={group.id} type="button" aria-label={`Look around ${group.name} in 360°`} onClick={event => { trigger.current = event.currentTarget; setIndex(0); setSelected(group); }} className="group overflow-hidden rounded-2xl border border-[#dce1d6] bg-white text-left shadow-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#176347]">
        <div className="relative aspect-video"><Image src={group.poster} alt={`My view of ${group.name}`} fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="object-cover" /><span className="absolute bottom-3 left-3 rounded-full bg-[#25382f] px-3 py-1 text-sm font-semibold text-white">360° photo</span></div>
        <span className="block p-4"><span className="block text-lg font-semibold">{group.name}</span><span className="mt-2 block text-sm text-[#526258]">{group.photos.length === 1 ? 'Look around →' : `${group.photos.length} viewpoints · Look around →`}</span></span>
      </button>)}
    </div>
    <dialog ref={dialog} aria-labelledby="panorama-title" onCancel={() => setSelected(null)} onClose={() => setSelected(null)} className="fixed inset-0 m-auto h-dvh max-h-dvh w-screen max-w-none overflow-hidden border-0 bg-[#fcfaf7] p-0 text-[#25382f] backdrop:bg-black/70 sm:h-[85dvh] sm:max-h-[900px] sm:w-[92vw] sm:max-w-6xl sm:rounded-2xl">
      {selected && <div className="flex h-full flex-col">
        <div className="flex shrink-0 items-start justify-between gap-3 border-b border-[#dce1d6] p-4"><h3 id="panorama-title" className="text-lg font-semibold sm:text-xl">{selected.name}</h3><button type="button" autoFocus aria-label="Close 360° gallery" onClick={() => setSelected(null)} className="min-h-11 shrink-0 rounded-lg border border-[#c6d2c8] px-4 font-semibold">Close ×</button></div>
        {selected.photos.length > 1 && <div className="flex shrink-0 items-center gap-3 px-4 py-2"><label htmlFor="panorama-view" className="text-sm font-semibold">Viewpoint</label><select id="panorama-view" value={index} onChange={event => setIndex(Number(event.target.value))} className="min-h-11 min-w-0 flex-1 rounded-lg border border-[#c6d2c8] bg-white px-3">{selected.photos.map((photo, i) => <option key={photo.src} value={i}>{photo.label} of {selected.photos.length}</option>)}</select></div>}
        <PanoramaScene key={selected.photos[index].src} src={selected.photos[index].src} name={selected.name} />
      </div>}
    </dialog>
  </>;
}
