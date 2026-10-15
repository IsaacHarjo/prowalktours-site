"use client";

import { useEffect, useRef, useState } from "react";

export type GuideVideoPreview = { src: string };

export default function GuideHeroVideo({ preview }: { preview: GuideVideoPreview }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      if (preference.matches) video.pause();
      else {
        video.src = preview.src;
        void video.play().catch(() => setPlaying(false));
      }
    };
    update();
    preference.addEventListener("change", update);
    return () => { preference.removeEventListener("change", update); video.pause(); };
  }, [preview.src]);

  return <>
    <video
      ref={videoRef}
      muted loop playsInline preload="none"
      aria-hidden="true" tabIndex={-1}
      onPlaying={() => setPlaying(true)} onPause={() => setPlaying(false)}
      onError={() => setFailed(true)}
      className={`pointer-events-none absolute inset-0 h-full w-full object-cover ${failed ? "hidden" : ""}`}
    />
    {!failed && <button type="button" onClick={() => {
      const video = videoRef.current;
      if (!video) return;
      if (playing) video.pause();
      else {
        if (!video.getAttribute("src")) video.src = preview.src;
        void video.play().catch(() => setPlaying(false));
      }
    }} className="absolute right-4 top-4 z-10 min-h-11 rounded-full border border-white/60 bg-black/60 px-4 py-2 text-sm font-semibold text-white hover:bg-black/80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
      {playing ? "Pause video" : "Play video"}
    </button>}
  </>;
}
