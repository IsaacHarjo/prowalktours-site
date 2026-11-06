"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";

export type FilmingPhoto = { src: string; alt: string; caption: string; focus?: "left" | "center-left" | "center" };

export default function FilmingPhotoGallery({ photos }: { photos: FilmingPhoto[] }) {
  const [selected, setSelected] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const trackId = useId();
  const scrollPhotos = (direction: number) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: direction * (track.firstElementChild?.getBoundingClientRect().width ?? track.clientWidth) + direction * 20, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  };
  const open = selected !== null;

  useEffect(() => {
    if (!open) return;
    const dialog = dialogRef.current;
    const locked = document.body.classList.contains("overflow-hidden");
    document.body.classList.add("overflow-hidden");
    dialog?.showModal();
    return () => {
      dialog?.close();
      if (!locked) document.body.classList.remove("overflow-hidden");
    };
  }, [open]);

  const photo = selected === null ? null : photos[selected];
  return <>
    <div className="mb-3 flex items-center justify-between gap-3">
      <span className="text-sm text-[#56665d]">Scroll through the photos · Click to enlarge</span>
      <div className="flex shrink-0 gap-2">
        <button type="button" aria-label="Scroll photos left" aria-controls={trackId} onClick={() => scrollPhotos(-1)} className="rounded-full border px-3 py-1 hover:bg-[#edf0e9] focus-visible:outline-2">←</button>
        <button type="button" aria-label="Scroll photos right" aria-controls={trackId} onClick={() => scrollPhotos(1)} className="rounded-full border px-3 py-1 hover:bg-[#edf0e9] focus-visible:outline-2">→</button>
      </div>
    </div>
    <div ref={trackRef} id={trackId} role="region" aria-label="Filming photo carousel" tabIndex={0} className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 focus-visible:outline-2 focus-visible:outline-offset-4">
      {photos.map((item, index) => <figure key={item.src} className="w-[78%] shrink-0 snap-start sm:w-[38%]">
        <button type="button" aria-label={`View larger: ${item.caption}`} aria-haspopup="dialog" onClick={() => setSelected(index)} className="group relative block aspect-[3/4] w-full cursor-zoom-in overflow-hidden rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#315d49]">
          <Image src={item.src} alt={item.alt} fill sizes="(min-width: 768px) 300px, 50vw" className={`object-cover transition-transform group-hover:scale-[1.03] motion-reduce:transform-none ${item.focus === "left" ? "object-left" : item.focus === "center-left" ? "object-[35%_center]" : "object-center"}`} />
          <span aria-hidden="true" className="absolute bottom-2 right-2 rounded-full bg-black/70 px-2 py-1 text-xs text-white">View larger ↗</span>
        </button>
        <figcaption className="mt-2 text-sm leading-5 text-[#56665d]">{item.caption}</figcaption>
      </figure>)}
    </div>
    <dialog ref={dialogRef} onClose={() => setSelected(null)} aria-label="Filming photos" onKeyDown={(event) => {
      if (selected === null) return;
      if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
        event.preventDefault();
        setSelected((selected + (event.key === "ArrowRight" ? 1 : -1) + photos.length) % photos.length);
      }
    }} className="fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none bg-[#fcfaf6] p-0 text-[#243b32] backdrop:bg-black/70">
      {photo && <div className="flex h-full flex-col">
        <div className="flex items-center justify-between gap-4 border-b border-[#dce2d9] px-4 py-3">
          <p className="text-sm font-semibold">{photo.caption}</p>
          <button type="button" onClick={() => setSelected(null)} className="shrink-0 rounded-full border px-4 py-2 font-semibold focus-visible:outline-2">Close ×</button>
        </div>
        <div className="relative min-h-0 flex-1"><Image src={photo.src} alt={photo.alt} fill sizes="100vw" className="object-contain p-3" /></div>
        <div className="flex items-center justify-center gap-5 px-4 py-3">
          <button type="button" onClick={() => setSelected((selected! - 1 + photos.length) % photos.length)} className="rounded-full border px-4 py-2 focus-visible:outline-2">← Previous</button>
          <span aria-live="polite" className="text-sm">{selected! + 1} / {photos.length}</span>
          <button type="button" onClick={() => setSelected((selected! + 1) % photos.length)} className="rounded-full border px-4 py-2 focus-visible:outline-2">Next →</button>
        </div>
      </div>}
    </dialog>
  </>;
}
