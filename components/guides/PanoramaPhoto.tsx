"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import "pannellum/build/pannellum.css";

type Viewer = { destroy: () => void; on: (event: string, callback: () => void) => void };
type PanoramaWindow = Window & { pannellum?: { viewer: (element: HTMLElement, options: Record<string, unknown>) => Viewer } };

export default function PanoramaPhoto({ src, poster }: { src: string; poster: string }) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState("loading");
  const container = useRef<HTMLDivElement>(null);
  const launch = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    let viewer: Viewer | undefined;
    import("pannellum").then(() => {
      if (cancelled || !container.current) return;
      const api = (window as PanoramaWindow).pannellum;
      if (!api) throw new Error("Panorama viewer unavailable");
      viewer = api.viewer(container.current, {
        type: "equirectangular", panorama: src, autoLoad: true,
        hfov: 100, minHfov: 50, maxHfov: 120,
        mouseZoom: "fullscreenonly", escapeHTML: true,
        orientationOnByDefault: false, showControls: true,
      });
      viewer.on("load", () => { if (!cancelled) setStatus("ready"); });
      viewer.on("error", () => { if (!cancelled) setStatus("error"); });
      container.current.focus();
    }).catch(() => { if (!cancelled) setStatus("error"); });
    return () => { cancelled = true; viewer?.destroy(); };
  }, [open, src]);
  return <section aria-labelledby="panorama-heading" className="mt-8 overflow-hidden rounded-2xl border border-[#dce1d6] bg-white">
    <div className="flex flex-wrap items-center justify-between gap-3 p-5">
      <div><h3 id="panorama-heading" className="text-xl font-semibold">Look around Kaysersberg in 360°</h3><p className="mt-2 text-sm leading-6 text-[#526258]">Stand where I took this photo and look around the square.</p></div>
      {open && <button type="button" onClick={() => { setOpen(false); requestAnimationFrame(() => launch.current?.focus()); }} className="min-h-11 rounded-lg border border-[#c6d2c8] px-4 font-semibold">Close 360° view</button>}
    </div>
    {open ? <>
      <div className="h-[360px] w-full sm:h-[500px]"><div ref={container} tabIndex={0} role="region" aria-label="Interactive 360 degree photo of Kaysersberg" className="h-full w-full bg-[#25382f] outline-offset-[-3px]" /></div>
      <p aria-live="polite" className="px-5 pt-3 text-sm text-[#526258]">{status === "loading" ? "Opening the 360° photo…" : status === "error" ? "The 360° view couldn’t open. Try closing it and opening it again." : "Drag or swipe to look around. Use + and − to zoom, or open fullscreen for a closer look."}</p>
      <p className="px-5 pb-4 pt-2 text-xs text-[#526258]">With the photo focused, you can also use the arrow keys to look around.</p>
    </> : <button ref={launch} type="button" onClick={() => { setStatus("loading"); setOpen(true); }} className="group relative block h-[360px] w-full overflow-hidden bg-[#25382f] sm:h-[500px]">
      <Image src={poster} alt="The square and half-timbered houses in my 360° photo of Kaysersberg" fill sizes="(min-width: 1280px) 1200px, 100vw" className="object-cover transition-transform group-hover:scale-105" />
      <span className="absolute inset-0 flex items-center justify-center bg-black/20"><span className="rounded-full bg-[#25382f] px-6 py-4 font-semibold text-white shadow-lg">Look around in 360°</span></span>
    </button>}
  </section>;
}
