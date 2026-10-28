"use client";

import Image from "next/image";
import { useState } from "react";
import type { VisitorMapStop } from "../../lib/guides/visitor-map-types";

export default function StopVideo({ video, poster }: { video: NonNullable<VisitorMapStop["video"]>; poster?: string }) {
  const [playing, setPlaying] = useState(false);
  if (!playing) return <button type="button" onClick={() => setPlaying(true)} aria-label={`Play highlight: ${video.title}`} className="relative isolate mt-4 flex overflow-hidden aspect-video w-full flex-col items-center justify-center gap-3 rounded-xl bg-[#25382f] px-5 text-white hover:bg-[#176347] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#176347]">{poster && <><Image src={poster} alt="" fill sizes="(min-width: 1024px) 370px, 100vw" className="-z-20 object-cover" /><span className="absolute inset-0 -z-10 bg-black/55" /></>}<span aria-hidden="true" className="flex h-14 w-14 items-center justify-center rounded-full border border-white/60 text-2xl">▶</span><span className="font-semibold">Play highlight</span><span className="text-sm text-white/80">A short clip from my walk</span></button>;
  return <iframe
    src={`https://player.mediadelivery.net/embed/${video.libraryId}/${video.videoId}?autoplay=true&muted=true&loop=false&playsinline=true&rememberPosition=false`}
    title={video.title}
    allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
    allowFullScreen
    referrerPolicy="strict-origin-when-cross-origin"
    className="mt-4 block aspect-video w-full rounded-xl border-0 bg-[#25382f]"
  />;
}
