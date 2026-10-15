"use client";

import type { VisitorMapStop } from "../../lib/guides/visitor-map-types";

export default function StopVideo({ video }: { video: NonNullable<VisitorMapStop["video"]> }) {
  return <iframe
    src={`https://player.mediadelivery.net/embed/${video.libraryId}/${video.videoId}?autoplay=true&muted=true&loop=false&playsinline=true&rememberPosition=false`}
    title={video.title}
    allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
    allowFullScreen
    referrerPolicy="strict-origin-when-cross-origin"
    className="mt-4 block aspect-video w-full rounded-xl border-0 bg-[#25382f]"
  />;
}
