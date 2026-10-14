"use client";

import Image from 'next/image';
import { useId, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react';
import type { GuidePhoto } from '../../lib/guides/types';

// Remount with the stop's key so each location opens on its first photo.
export default function StopPhotoGallery({ photos, name }: { photos: GuidePhoto[]; name: string }) {
  const [current, setCurrent] = useState(0);
  const [failed, setFailed] = useState<string[]>([]);
  const [expanded, setExpanded] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const gesture = useRef<{ x: number; y: number } | null>(null);
  const titleId = useId();
  const available = photos.filter(photo => !failed.includes(photo.src));
  const activeIndex = current % Math.max(available.length, 1);
  const photo = available[activeIndex];

  function advance(direction: number) {
    setCurrent((activeIndex + direction + available.length) % Math.max(available.length, 1));
  }
  function keyboard(event: KeyboardEvent) {
    if (available.length < 2 || !['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
    event.preventDefault();
    event.stopPropagation();
    advance(event.key === 'ArrowRight' ? 1 : -1);
  }
  function startSwipe(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== 'touch' || !event.isPrimary) return;
    gesture.current = { x: event.clientX, y: event.clientY };
    event.currentTarget.setPointerCapture(event.pointerId);
  }
  function endSwipe(event: PointerEvent<HTMLDivElement>) {
    const start = gesture.current;
    gesture.current = null;
    if (!start || available.length < 2) return;
    const dx = event.clientX - start.x, dy = event.clientY - start.y;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.5) advance(dx < 0 ? 1 : -1);
  }
  function imageFrame(large = false) {
    return photo ? <div className={`relative touch-pan-y overflow-hidden rounded-xl bg-[#e9eae3] ${large ? 'h-[min(62dvh,680px)]' : 'aspect-[4/3]'}`}
      onPointerDown={startSwipe} onPointerUp={endSwipe} onPointerCancel={() => { gesture.current = null; }}>
      <Image key={photo.src} src={photo.src} alt={photo.alt} fill sizes={large ? '(min-width: 1024px) 960px, 92vw' : '(min-width: 1024px) 272px, 90vw'}
        className="select-none object-contain" draggable={false} onError={() => setFailed(previous => previous.includes(photo.src) ? previous : [...previous, photo.src])} />
    </div> : <p className="rounded-xl bg-[#edf1ed] p-5 text-sm leading-6 text-[#526258]">These photos couldn’t load. You can still explore this stop on the map.</p>;
  }
  function controls() {
    return <div className="mt-2 flex items-center justify-between gap-2">
      {available.length > 1 && <button type="button" aria-label="Previous photo" onClick={() => advance(-1)} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#bdcbbd] bg-white text-xl text-[#25382f] hover:bg-[#e6eee3] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#176347]">←</button>}
      <p role="status" aria-live="polite" aria-atomic="true" className="flex-1 text-center text-xs leading-6 text-[#526258]">{photo && <>Photo {activeIndex + 1} of {available.length} · {photo.year}</>}</p>
      {available.length > 1 && <button type="button" aria-label="Next photo" onClick={() => advance(1)} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#bdcbbd] bg-white text-xl text-[#25382f] hover:bg-[#e6eee3] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#176347]">→</button>}
    </div>;
  }

  if (!photos.length) return null;

  return <div className="mt-4" role="region" aria-label={`Photos of ${name}`} aria-roledescription={available.length > 1 ? 'carousel' : undefined} onKeyDown={keyboard}>
    {imageFrame()}
    {controls()}
    {photo && <button type="button" onClick={() => { setExpanded(true); dialogRef.current?.showModal(); }} className="mt-1 min-h-11 w-full rounded-lg text-sm font-semibold text-[#176347] underline underline-offset-4 hover:bg-[#edf1ed] focus-visible:outline-2 focus-visible:outline-[#176347]">Enlarge photos</button>}
    <dialog ref={dialogRef} aria-labelledby={titleId} onClose={() => setExpanded(false)} onClick={event => { if (event.target === event.currentTarget) dialogRef.current?.close(); }}
      className="fixed inset-0 m-auto max-h-[94dvh] w-[calc(100%-2rem)] max-w-5xl overflow-y-auto overscroll-contain rounded-2xl border border-[#dce1d6] bg-[#fafbf7] p-4 text-[#25382f] shadow-2xl backdrop:bg-black/75 sm:p-6">
      <div className="mb-4 flex items-start justify-between gap-4"><h4 id={titleId} className="text-lg font-semibold sm:text-xl">{name}</h4><button type="button" aria-label="Close photos" onClick={() => dialogRef.current?.close()} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#bdcbbd] text-2xl hover:bg-[#edf1ed] focus-visible:outline-2 focus-visible:outline-[#176347]">×</button></div>
      {expanded && <>{imageFrame(true)}{controls()}{photo && <p className="mt-2 text-center text-sm leading-6 text-[#526258]">{photo.alt}</p>}</>}
    </dialog>
  </div>;
}
