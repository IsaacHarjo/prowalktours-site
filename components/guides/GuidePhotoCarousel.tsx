"use client";

import Image from "next/image";
import { useId, useRef } from "react";
import type { GuidePhoto } from "../../lib/guides/types";

export default function GuidePhotoCarousel({ photos }: { photos: GuidePhoto[] }) {
  const rail = useRef<HTMLUListElement>(null);
  const railId = useId();

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
      advance(event.key === "ArrowLeft" ? -1 : 1);
    }}>
    <ul ref={rail} id={railId} tabIndex={0} aria-label="Colmar photos" className="flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain rounded-2xl pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#176347]">
      {photos.map((photo, index) => <li key={photo.src} className="min-w-0 shrink-0 basis-full snap-start sm:basis-[calc((100%-1rem)/2)] lg:basis-[calc((100%-3rem)/4)]" aria-label={`Photo ${index + 1} of ${photos.length}`}>
        <figure>
          <div className="relative aspect-video overflow-hidden rounded-2xl bg-[#edf1ed]">
            <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 1280px) 288px, (min-width: 1024px) 23vw, (min-width: 640px) 45vw, 90vw" className="object-contain" />
          </div>
          <figcaption className="mt-3 text-sm font-semibold leading-6">{photo.caption}</figcaption>
        </figure>
      </li>)}
    </ul>
    {photos.length > 1 && <>
      <button type="button" aria-label="Previous Colmar photo" aria-controls={railId} onClick={() => advance(-1)} className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-full items-center justify-center rounded-full border border-[#dce1d6] bg-white/95 text-2xl text-[#25382f] shadow-md hover:bg-[#e6eee3] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#176347]"><span aria-hidden="true">←</span></button>
      <button type="button" aria-label="Next Colmar photo" aria-controls={railId} onClick={() => advance(1)} className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-full items-center justify-center rounded-full border border-[#dce1d6] bg-white/95 text-2xl text-[#25382f] shadow-md hover:bg-[#e6eee3] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#176347]"><span aria-hidden="true">→</span></button>
    </>}
  </div>;
}
