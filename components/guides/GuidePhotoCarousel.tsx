"use client";

import Image from "next/image";
import { useId, useRef, useState } from "react";
import type { GuidePhoto } from "../../lib/guides/types";

export default function GuidePhotoCarousel({ photos }: { photos: GuidePhoto[] }) {
  const rail = useRef<HTMLUListElement>(null);
  const railId = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const dialogTitleId = useId();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const selectedPhoto = selectedIndex === null ? undefined : photos[selectedIndex];

  function advanceEnlarged(direction: -1 | 1) {
    setSelectedIndex(index => index === null ? null : (index + direction + photos.length) % photos.length);
  }

  function advance(direction: -1 | 1) {
    const list = rail.current;
    if (!list || !list.firstElementChild) return;
    const step = list.firstElementChild.getBoundingClientRect().width + 16;
    const end = list.scrollWidth - list.clientWidth;
    const left = direction === -1 && list.scrollLeft < 2 ? end
      : direction === 1 && list.scrollLeft >= end - 2 ? 0
      : list.scrollLeft + direction * step;
    list.scrollTo({ left, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }

  if (!photos.length) return null;

  return <div role="region" aria-label="Photos from my Colmar visits" aria-roledescription="carousel" className="relative mt-5"
    onKeyDown={event => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      event.preventDefault();
      const direction = event.key === "ArrowLeft" ? -1 : 1;
      if (dialogRef.current?.open) {
        event.stopPropagation();
        advanceEnlarged(direction);
      } else advance(direction);
    }}>
    <ul ref={rail} id={railId} tabIndex={0} aria-label="Colmar photos" className="flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain rounded-2xl pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#176347]">
      {photos.map((photo, index) => <li key={photo.src} className="min-w-0 shrink-0 basis-full snap-start sm:basis-[calc((100%-1rem)/2)] lg:basis-[calc((100%-3rem)/4)]" aria-label={`Photo ${index + 1} of ${photos.length}`}>
        <figure>
          <button type="button" aria-label={`Enlarge photo: ${photo.caption ?? photo.alt}`} aria-haspopup="dialog"
            onClick={() => { setSelectedIndex(index); dialogRef.current?.showModal(); }}
            className="group/photo relative block aspect-video w-full cursor-zoom-in overflow-hidden rounded-2xl bg-[#edf1ed] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#176347]">
            <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 1280px) 288px, (min-width: 1024px) 23vw, (min-width: 640px) 45vw, 90vw" className="object-contain" />
            <span aria-hidden="true" className="absolute bottom-2 right-2 rounded-md bg-black/65 px-2 py-1 text-xs font-semibold text-white">Enlarge ↗</span>
          </button>
          <figcaption className="mt-3 text-sm font-semibold leading-6">{photo.caption}</figcaption>
        </figure>
      </li>)}
    </ul>
    {photos.length > 1 && <>
      <button type="button" aria-label="Previous Colmar photo" aria-controls={railId} onClick={() => advance(-1)} className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-full items-center justify-center rounded-full border border-[#dce1d6] bg-white/95 text-2xl text-[#25382f] shadow-md hover:bg-[#e6eee3] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#176347]"><span aria-hidden="true">←</span></button>
      <button type="button" aria-label="Next Colmar photo" aria-controls={railId} onClick={() => advance(1)} className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-full items-center justify-center rounded-full border border-[#dce1d6] bg-white/95 text-2xl text-[#25382f] shadow-md hover:bg-[#e6eee3] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#176347]"><span aria-hidden="true">→</span></button>
    </>}
    <dialog ref={dialogRef} aria-labelledby={dialogTitleId} onClose={() => setSelectedIndex(null)}
      onClick={event => { if (event.target === event.currentTarget) dialogRef.current?.close(); }}
      className="fixed inset-0 m-auto max-h-[94dvh] w-[calc(100%-2rem)] max-w-6xl overflow-y-auto overscroll-contain rounded-2xl border border-[#dce1d6] bg-[#fcfaf7] p-4 text-[#25382f] shadow-2xl backdrop:bg-black/80 sm:p-6">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h2 id={dialogTitleId} className="text-xl font-semibold">Photos from my Colmar visits</h2>
        <button type="button" aria-label="Close enlarged photo" onClick={() => dialogRef.current?.close()} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#bdcbbd] text-2xl hover:bg-[#e6eee3] focus-visible:outline-2 focus-visible:outline-[#176347]">×</button>
      </div>
      {selectedPhoto && <>
        <Image key={selectedPhoto.src} src={selectedPhoto.src} alt={selectedPhoto.alt} width={selectedPhoto.width} height={selectedPhoto.height} sizes="(min-width: 1280px) 1100px, 92vw" className="mx-auto h-auto max-h-[65dvh] w-auto max-w-full rounded-xl object-contain" />
        <div className="mt-4 flex items-center justify-between gap-3">
          {photos.length > 1 && <button type="button" aria-label="Previous enlarged photo" onClick={() => advanceEnlarged(-1)} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#bdcbbd] bg-white text-2xl hover:bg-[#e6eee3] focus-visible:outline-2 focus-visible:outline-[#176347]">←</button>}
          <div role="status" aria-live="polite" aria-atomic="true" className="flex-1 text-center">
            <p className="text-sm font-semibold leading-6">{selectedPhoto.caption}</p>
            <p className="text-xs leading-6 text-[#526258]">Photo {selectedIndex! + 1} of {photos.length}</p>
          </div>
          {photos.length > 1 && <button type="button" aria-label="Next enlarged photo" onClick={() => advanceEnlarged(1)} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#bdcbbd] bg-white text-2xl hover:bg-[#e6eee3] focus-visible:outline-2 focus-visible:outline-[#176347]">→</button>}
        </div>
      </>}
    </dialog>
  </div>;
}
