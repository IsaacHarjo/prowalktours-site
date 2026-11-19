"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import LongFormWalkPage, { LongFormWalkStatsRow } from '../../../components/LongFormWalkPage';
import { useInitialVideoStartTime } from '../../../lib/hooks/useInitialVideoStartTime';
type StrasbourgTour = typeof import('../../../data/video-details/strasbourg-christmas-market-evening-walk-2025.json');

const width = 'mx-auto max-w-6xl px-5 sm:px-8';
const linkStyle = 'font-semibold text-[#176347] underline underline-offset-4';
function timeLabel(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const tail = String(seconds % 60).padStart(2, '0');
  return minutes < 60 ? `${minutes}:${tail}` : `${Math.floor(minutes / 60)}:${String(minutes % 60).padStart(2, '0')}:${tail}`;
}

export default function Strasbourg2025Client({ tour }: { tour: StrasbourgTour }) {
  const filmedDate = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(tour.filmedDate));
  const initialStart = useInitialVideoStartTime();
  const [selectedTime, setSelectedTime] = useState<number | null>(null);
  const videoRef = useRef<HTMLElement>(null);
  const start = Math.min(tour.durationSeconds - 1, selectedTime ?? initialStart);
  function seek(seconds: number) {
    setSelectedTime(seconds);
    const url = new URL(window.location.href);
    url.searchParams.set('t', String(seconds));
    url.hash = 'watch';
    window.history.replaceState(null, '', url);
    videoRef.current?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
  }
  return <LongFormWalkPage stickyNav={
    <nav aria-label="In this video page" className="sticky top-[65px] z-30 border-b border-[#e1d9cd] bg-[#fcfaf6]/95 backdrop-blur">
      <div className={`${width} flex gap-6 overflow-x-auto py-4 text-sm font-semibold`}>
        <a href="#watch" className="whitespace-nowrap hover:text-[#176347]">Watch the walk</a>
        <a href="#chapters" className="hover:text-[#176347]">Chapters</a>
        <a href="#route" className="whitespace-nowrap hover:text-[#176347]">Filmed route</a>
        <Link href={tour.guideHref} className="whitespace-nowrap text-[#176347]">Strasbourg guide ↗</Link>
      </div>
    </nav>
  }>
    <header className={`${width} py-8 sm:py-12`}>
      <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap gap-2 text-sm text-[#6e5a45]"><Link href="/">Home</Link><span>/</span><Link href="/destinations/france">France</Link><span>/</span><span>Strasbourg 2025 evening walk</span></nav>
      <p className="text-sm font-semibold uppercase tracking-widest text-[#176347]">Alsace, France · Filmed December 2025</p>
      <h1 className="mt-3 max-w-4xl font-serif text-4xl leading-tight sm:text-5xl">{tour.title}</h1>
      <p className="mt-4 text-xl text-[#6e5a45]">From the cathedral markets to the Grand Sapin and Petite France</p>
      <p className="mt-5 max-w-3xl text-base leading-8 text-[#56493a]">{tour.description}</p>
      <div className="mt-7"><LongFormWalkStatsRow stats={[
        { icon: '📅', label: 'Filmed', value: filmedDate },
        { icon: '🕐', label: 'Start', value: tour.startTime },
        { icon: '▶', label: 'Duration', value: tour.durationLabel },
      ]} /></div>
      <Image src={tour.hero} alt={tour.heroAlt} width={1920} height={1080} priority sizes="(min-width: 1152px) 1088px, 100vw" className="mt-8 aspect-video w-full rounded-2xl object-cover" />
    </header>

    <section id="watch" ref={videoRef} aria-labelledby="watch-heading" className={`${width} scroll-mt-40 pb-12`}>
      <h2 id="watch-heading" className="font-serif text-3xl">Watch my Strasbourg evening walk</h2>
      <p className="mb-5 mt-3 text-[#56493a]">Put on your headphones and turn on closed captions for my history notes and travel tips. Choose a chapter to cue that moment, then press Play.</p>
      <div className="aspect-video overflow-hidden rounded-2xl bg-black">
        <iframe key={start} title={tour.youtubeTitle} src={`https://www.youtube.com/embed/${tour.youtubeId}?start=${start}&autoplay=0&rel=0&playsinline=1`} className="h-full w-full" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
      </div>
      <div className="mt-4 flex flex-wrap justify-between gap-3 text-sm"><p role="status" aria-live="polite">{start > 0 ? `Cued to ${timeLabel(start)}` : `Full walk · ${tour.durationLabel}`}</p><a className={linkStyle} href={`https://www.youtube.com/watch?v=${tour.youtubeId}&t=${start}s`} target="_blank" rel="noreferrer">Watch on YouTube ↗</a></div>
    </section>

    <section id="chapters" aria-labelledby="chapters-heading" className={`${width} scroll-mt-40 py-10`}>
      <h2 id="chapters-heading" className="font-serif text-3xl">Every chapter in the walk</h2>
      <ol className="mt-6 grid gap-x-8 md:grid-cols-2">{tour.chapters.map(chapter => <li key={chapter.seconds} className="border-b border-[#e1d9cd]"><button type="button" onClick={() => seek(chapter.seconds)} className="flex min-h-14 w-full items-start gap-4 py-4 text-left hover:text-[#176347] focus-visible:outline-2 focus-visible:outline-[#176347]"><span className="w-16 shrink-0 font-mono text-sm font-semibold text-[#176347]">{chapter.timeLabel}</span><span>{chapter.title}</span></button></li>)}</ol>
    </section>

    <section id="route" aria-labelledby="route-heading" className={`${width} scroll-mt-40 py-12`}>
      <h2 id="route-heading" className="font-serif text-3xl">Follow my route</h2>
      <p className="mt-4 max-w-3xl leading-8 text-[#56493a]">I began at Place Gutenberg and returned to Rue Mercière and the cathedral at the end of the walk. My filmed route is linked below. For current market information and a suggested route for your own visit, use my Strasbourg Christmas guide.</p>
      <div className="mt-5 flex flex-wrap gap-6"><a href={tour.mapUrl} className={linkStyle} target="_blank" rel="noreferrer">Open my filmed route ↗</a><Link href={tour.guideHref} className={linkStyle}>Plan a visit to Strasbourg →</Link></div>
    </section>
    <section aria-labelledby="licensing-heading" className={`${width} pb-14`}>
      <div className="rounded-2xl border border-[#e1d9cd] bg-white p-6 sm:p-8"><h2 id="licensing-heading" className="font-serif text-3xl">License footage from this walk</h2><p className="mt-4 max-w-3xl leading-8 text-[#56493a]">For a licensing request, send me the chapter or time range, intended use and delivery requirements. I can confirm the available footage and technical specifications for those shots.</p><Link href="/licensing" className="mt-6 inline-flex min-h-11 items-center rounded-xl bg-[#176347] px-6 py-3 font-semibold text-white">Request a licensing quote</Link></div>
    </section>
  </LongFormWalkPage>;
}
