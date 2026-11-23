"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { VisitorMapStop } from "../../lib/guides/visitor-map-types";

export default function StopVideo({ video, poster }: { video: NonNullable<VisitorMapStop["video"]>; poster?: string }) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    // Only the visible stop plays. Leaving the map or closing the mobile
    // sheet unloads the player, so hidden clips don't keep streaming.
    const observer = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting);
      if (!entry.isIntersecting) setLoaded(false);
    }, { threshold: 0.1 });
    observer.observe(frame);
    return () => observer.disconnect();
  }, []);
  return <div ref={frameRef} className="relative mt-4 aspect-video w-full overflow-hidden rounded-xl bg-[#e9eae3]">
    {poster && <Image src={poster} alt="" fill sizes="(min-width: 1024px) 370px, 100vw" className="object-cover" />}
    {visible && <iframe
    src={`https://player.mediadelivery.net/embed/${video.libraryId}/${video.videoId}?autoplay=true&muted=true&loop=true&playsinline=true&rememberPosition=false`}
    title={video.title}
    allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
    allowFullScreen
    referrerPolicy="strict-origin-when-cross-origin"
    onLoad={() => setLoaded(true)}
    className={`absolute inset-0 h-full w-full border-0 ${poster && !loaded ? "opacity-0" : "opacity-100"}`}
  />}
  </div>;
}
