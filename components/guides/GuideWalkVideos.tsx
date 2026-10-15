"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { GuideWalk } from "../../lib/guides/types";
import GuideSectionHeading from "./GuideSectionHeading";

export default function GuideWalkVideos({ city, walks }: { city: string; walks: GuideWalk[] }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const orderedWalks = [...walks].sort((a, b) => Number(a.videoType === "evening-walk") - Number(b.videoType === "evening-walk"));

  return <section id="watch-walks" aria-labelledby="watch-heading" className="scroll-mt-[var(--guide-scroll-offset,5rem)] bg-[#edf1ed]">
    <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16 lg:px-10">
      <GuideSectionHeading id="watch-heading" eyebrow="Prowalk Tours" title={`My ${city} walking tours`} icon="prowalk" />
      <p className="mt-4 max-w-3xl leading-7 text-[#526258]">Walk with me in daylight or after dark. Put on your headphones for the sounds of the streets and markets.</p>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {orderedWalks.map(walk => {
          const label = walk.videoType === "evening-walk" ? "Evening walk" : "Daytime walk";
          const isSelected = walk.id === selectedId;
          return <article key={walk.id} className="min-w-0 overflow-hidden rounded-2xl border border-[#dce1d6] bg-white">
            {isSelected ? <iframe
              key={walk.id}
              src={`https://www.youtube.com/embed/${walk.youtubeId}?rel=0`}
              title={`${label} — ${walk.siteTitle}`}
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
              className="aspect-video w-full border-0 bg-[#25382f]"
            /> : <button
              type="button"
              onClick={() => setSelectedId(walk.id)}
              aria-label={`Open ${label.toLowerCase()} player${walk.filmedYear ? `, filmed in ${walk.filmedYear}` : ""}`}
              className="group/video relative block aspect-video w-full overflow-hidden bg-[#25382f] text-white focus-visible:outline-4 focus-visible:-outline-offset-4 focus-visible:outline-[#dcbf7c]"
            >
              <Image src={walk.thumbnail} alt="" fill sizes="(min-width: 1280px) 588px, (min-width: 768px) 46vw, 100vw" className="object-cover transition-transform duration-500 group-hover/video:scale-[1.03] motion-reduce:transform-none motion-reduce:transition-none" />
              <span aria-hidden="true" className="absolute inset-0 flex items-center justify-center bg-black/15 transition-colors group-hover/video:bg-black/30">
                <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/70 bg-[#25382f]/85 shadow-lg">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="ml-1 h-7 w-7"><path d="m8 5 11 7-11 7V5Z" /></svg>
                </span>
              </span>
              <span className="absolute bottom-3 right-3 rounded-md bg-black/80 px-3 py-1.5 text-xs font-semibold">Open video</span>
            </button>}
            <div className="px-5 py-5 sm:px-6">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
                <h3 className="text-xl font-semibold">{label}</h3>
                <p className="text-sm text-[#657069]">{[walk.filmedYear ? `Filmed in ${walk.filmedYear}` : null, walk.durationLabel].filter(Boolean).join(" · ")}</p>
              </div>
              <Link href={walk.watchHref} target={walk.watchDestinationType === "youtube" ? "_blank" : undefined} rel={walk.watchDestinationType === "youtube" ? "noreferrer" : undefined} className="mt-2 inline-flex min-h-11 items-center text-sm font-semibold text-[#176347] underline underline-offset-4 hover:text-[#25382f]">
                {walk.watchDestinationType === "youtube" ? "Watch on YouTube ↗" : "Full walk, highlights & route →"}
                <span className="sr-only"> — {label}</span>
              </Link>
            </div>
          </article>;
        })}
      </div>
    </div>
  </section>;
}
