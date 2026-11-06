"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const src = "/images/about/sony-daytime-settings-focus.png";
const alt = "My Sony A7S III daytime guide: PZ 16–35mm F4 G lens, NiSi Swift VND filter, DJI RS 4 Mini, 4K 60p, shutter priority at 1/100, automatic aperture and ISO, and PP10 customized to HLG3. Continuous AF with Spot XL; AF transition speed and subject shift sensitivity both 3; Multi metering; Auto white balance with Shockless WB 3 (Slow). I’m still experimenting with how quickly focus shifts as I walk.";

export default function CameraSettingsGuide() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    dialog.current?.showModal();
    const wasLocked = document.body.classList.contains("overflow-hidden");
    document.body.classList.add("overflow-hidden");
    return () => {
      if (!wasLocked) document.body.classList.remove("overflow-hidden");
    };
  }, [open]);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} aria-label="View my daytime camera settings guide larger" className="mx-auto block w-full max-w-2xl overflow-hidden rounded-2xl border border-stone-200 bg-white text-left shadow-sm transition hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green-800">
        <Image src={src} alt={alt} width={1024} height={1536} sizes="(max-width: 768px) 100vw, 672px" className="h-auto w-full" />
        <span className="block px-5 py-3 text-center text-sm font-semibold text-green-900">View larger ↗</span>
      </button>
      <dialog ref={dialog} onClose={() => setOpen(false)} className="fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none bg-stone-100 p-0 backdrop:bg-black/75">
        {open && <div className="flex h-full flex-col">
          <div className="flex items-center justify-between gap-4 border-b border-stone-200 bg-white px-4 py-3">
            <h3 className="font-semibold">My daytime camera settings</h3>
            <button type="button" autoFocus onClick={() => dialog.current?.close()} className="rounded-lg border border-stone-300 px-4 py-2 font-semibold hover:bg-stone-100">Close ×</button>
          </div>
          <div className="min-h-0 flex-1 overflow-auto p-3 sm:p-6">
            <Image src={src} alt={alt} width={1024} height={1536} sizes="(max-width: 1024px) 100vw, 1024px" className="mx-auto h-auto w-full max-w-5xl" />
          </div>
        </div>}
      </dialog>
    </>
  );
}
