"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { useInitialVideoStartTime } from '../lib/hooks/useInitialVideoStartTime';

export type ImmersiveWalk = {
  title: string; city: string; description: string; youtubeId: string;
  filmedDate: string; startTime: string; durationSeconds: number; durationLabel: string;
  hero: string; heroAlt: string; guideHref: string;
  chapters: { seconds: number; title: string }[];
};
function timeLabel(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const tail = String(seconds % 60).padStart(2, '0');
  return minutes < 60 ? `${minutes}:${tail}` : `${Math.floor(minutes / 60)}:${String(minutes % 60).padStart(2, '0')}:${tail}`;
}
export default function ImmersiveWalkClient({ tour }: { tour: ImmersiveWalk }) {
  const filmedDate = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(tour.filmedDate));
  const initial = useInitialVideoStartTime();
  const [selected, setSelected] = useState<number | null>(null);
  const player = useRef<HTMLElement>(null);
  const start = Math.max(0, Math.min(tour.durationSeconds - 1, selected ?? initial));
  const seek = (seconds: number) => {
    setSelected(seconds);
    const url = new URL(window.location.href);
    url.searchParams.set('t', String(seconds)); url.hash = 'watch';
    window.history.replaceState(null, '', url);
    player.current?.scrollIntoView({ block: 'start', behavior: 'auto' });
  };
  return <div className="mx-auto max-w-6xl px-5 py-10 text-[#2f261d] sm:px-8">
    <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap gap-3 text-sm"><Link href="/">Home</Link><span>/</span><Link href={tour.guideHref}>{tour.city} guide</Link><span>/</span><span>360° walk</span></nav>
    <p className="font-semibold uppercase tracking-widest text-[#176347]">360° walk · Filmed in 2025</p>
    <h1 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">{tour.title}</h1>
    <p className="mt-6 max-w-3xl leading-8">{tour.description}</p>
    <p className="mt-5 text-sm">Filmed {filmedDate} · Start {tour.startTime} · {tour.durationLabel}</p>
    <Image src={tour.hero} alt={tour.heroAlt} width={1920} height={1080} priority sizes="(min-width: 1152px) 1088px, 100vw" className="mt-8 aspect-video w-full rounded-2xl object-cover" />
    <section id="watch" ref={player} className="scroll-mt-24 py-10">
      <h2 className="font-serif text-3xl">Watch in 360°</h2>
      <p className="my-5 max-w-3xl leading-7">On a computer, drag inside the video to look around. On a phone, open it in the YouTube app and swipe to choose your view. Turn on captions for my history notes and travel tips.</p>
      <iframe title={tour.title} src={`https://www.youtube.com/embed/${tour.youtubeId}?start=${start}&rel=0`} className="aspect-video w-full rounded-2xl border-0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
      <a href={`https://www.youtube.com/watch?v=${tour.youtubeId}&t=${start}s`} className="mt-4 inline-flex min-h-11 items-center font-semibold text-[#176347] underline">Open in YouTube ↗</a>
    </section>
    <section className="py-6"><h2 className="font-serif text-3xl">Chapters</h2>
      <ol className="mt-5 grid gap-3 sm:grid-cols-2">{tour.chapters.map(chapter => <li key={chapter.seconds}><button onClick={() => seek(chapter.seconds)} className="flex min-h-12 w-full gap-3 rounded-xl border border-[#ded8ca] p-4 text-left hover:bg-[#edf2eb]"><span className="shrink-0 font-mono text-[#176347]">{timeLabel(chapter.seconds)}</span><span>{chapter.title}</span></button></li>)}</ol>
    </section>
    <Link href={tour.guideHref} className="my-8 inline-flex min-h-11 items-center rounded-full bg-[#176347] px-6 py-3 font-semibold text-white">Read my {tour.city} guide →</Link>
  </div>;
}
