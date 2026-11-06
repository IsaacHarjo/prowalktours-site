"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import GearPage, { GearTile } from "../../components/GearPage";

const collections = [
  { title: "Sony camera setup", list: "1L6PQUTCQN71B", image: "/images/gear/sony-camera-product.jpg", alt: "Sony A7S III camera with a lens" },
  { title: "DJI Osmo Pocket", list: "2TUO3LFZMZBJC", image: "/images/gear/pocket-official.png", alt: "DJI Osmo Pocket 3 camera" },
  { title: "360 video gear", list: "3RYG94PM51ET", image: "/images/gear/x6-official.png", alt: "Insta360 X6 camera" },
  { title: "Drone filming gear", list: "3PQ8ILZ53X6MG", image: "/images/gear/mini-5-pro-product.png", alt: "DJI Mini 5 Pro drone" },
  { title: "GoPro setup", list: "1C8ESGJAKQ2ZJ", image: "/images/gear/gopro-official.png", alt: "GoPro HERO13 Black camera" },
  { title: "Phone setup", list: "1SMWPJAVO33WX", image: "/images/gear/mobile-official.png", alt: "DJI Osmo Mobile 8 phone gimbal" },
  { title: "Microphones & audio", list: "GF1VB6YYCD55", image: "/images/gear/audio-category.png", alt: "Zoom H1essential recorder" },
  { title: "Travel accessories", list: "19K176LZAC8TD", image: "/images/gear/travel-adapters.jpg", alt: "Travel power adapters" },
];

export default function FilmingGearClient() {
  const rigDialog = useRef<HTMLDialogElement>(null);
  const [rigOpen, setRigOpen] = useState(false);

  useEffect(() => {
    if (!rigOpen) return;
    const dialog = rigDialog.current;
    const alreadyLocked = document.body.classList.contains("overflow-hidden");
    dialog?.showModal();
    document.body.classList.add("overflow-hidden");
    return () => {
      dialog?.close();
      if (!alreadyLocked) document.body.classList.remove("overflow-hidden");
    };
  }, [rigOpen]);

  return <GearPage title="Filming Gear & Recommendations" intro="Gear I use or recommend. Choose a collection to browse it on Amazon.">
    <section aria-label="Behind the camera" className="grid gap-4 md:grid-cols-[2fr_1fr]">
      <figure className="overflow-hidden rounded-2xl border border-[#dce2d9] bg-white">
        <div className="relative aspect-[16/9] md:aspect-auto md:h-[420px]">
          <Image src="/images/gear/filming-in-colmar.jpg" alt="Filming with my camera in Colmar at Christmas" fill priority sizes="(min-width: 768px) 740px, 100vw" className="object-cover object-left" />
        </div>
        <figcaption className="px-5 py-3 text-sm text-[#56665d]">Out filming in Colmar.</figcaption>
      </figure>
      <figure className="overflow-hidden rounded-2xl border border-[#dce2d9] bg-white">
        <button type="button" onClick={() => setRigOpen(true)} aria-label="Enlarge my Sony camera and DJI gimbal photo" aria-haspopup="dialog" className="group relative block h-[340px] w-full cursor-zoom-in focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-[#315d49] md:h-[420px]">
          <Image src="/images/gear/sony-current-rig.png" alt="My current Sony camera setup on the DJI RS 4 Mini gimbal" fill sizes="(min-width: 768px) 370px, 100vw" className="object-contain p-5" />
          <span className="absolute bottom-3 right-3 rounded-full bg-[#243b32] px-3 py-1.5 text-xs font-semibold text-white shadow-sm group-hover:bg-[#315d49]">View larger ↗</span>
        </button>
        <figcaption className="px-5 py-3 text-sm text-[#56665d]">My Sony camera and DJI RS 4 Mini gimbal.</figcaption>
      </figure>
    </section>
    <dialog ref={rigDialog} onClose={() => setRigOpen(false)} aria-label="My Sony camera and DJI RS 4 Mini gimbal" className="fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none bg-[#fcfaf6] p-0 text-[#243b32] backdrop:bg-black/70">
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between gap-4 border-b border-[#dce2d9] px-4 py-3 sm:px-6">
          <p className="text-sm font-semibold sm:text-base">My Sony camera and DJI RS 4 Mini gimbal</p>
          <button type="button" onClick={() => setRigOpen(false)} className="shrink-0 rounded-full border border-[#dce2d9] bg-white px-4 py-2 font-semibold hover:bg-[#edf0e9] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#315d49]">Close ×</button>
        </div>
        <div className="relative min-h-0 flex-1">
          {rigOpen && <Image src="/images/gear/sony-current-rig.png" alt="Close-up of my Sony camera, microphone and DJI RS 4 Mini gimbal" fill sizes="100vw" className="object-contain p-4 sm:p-6" />}
        </div>
      </div>
    </dialog>
    <nav aria-label="Gear collections on Amazon" className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {collections.map(collection => {
        const href = "https://www.amazon.com/shop/prowalktours/list/" + collection.list;
        return <GearTile key={collection.list} href={href} image={collection.image} title={collection.title} alt={collection.alt} />;
      })}
    </nav>
    <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm font-semibold text-[#26634e]">
      <a href="https://www.amazon.com/shop/prowalktours" target="_blank" rel="sponsored noopener noreferrer" className="underline underline-offset-4">See my full Amazon storefront ↗</a>
      <a href="https://soundprofessionals.com/product/ms-ehb-2-mkii/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">My Sound Professionals binaural microphones ↗</a>
      <a href="https://soundprofessionals.com/product/sp-spsb-10-13004/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">Microphone power supply ↗</a>
    </div>
  </GearPage>;
}
