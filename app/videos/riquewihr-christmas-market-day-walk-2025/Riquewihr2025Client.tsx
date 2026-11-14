"use client";

import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useRef, useState } from 'react';
import LongFormWalkPage, { LongFormWalkStatsRow } from '../../../components/LongFormWalkPage';
import { useInitialVideoStartTime } from '../../../lib/hooks/useInitialVideoStartTime';
import { riquewihr2025Tour as tour, riquewihrChristmasMarketDayWalk2025Detail as detail, riquewihr2025FilmedMap } from '../../../data/video-details/riquewihr-christmas-market-day-walk-2025';

const VisitorRouteMap = dynamic(() => import('../../../components/guides/VisitorRouteMap'), {
  ssr: false, loading: () => <p className="rounded-2xl bg-[#edf1ed] p-8" role="status">Loading the route I filmed…</p>,
});
const width = 'mx-auto max-w-6xl px-5 sm:px-8';
const linkStyle = 'font-semibold text-[#176347] underline underline-offset-4';
const featured = tour.chapters.filter(chapter => chapter.photo);
const filmedDate = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(tour.filmedDate));
function timeLabel(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const tail = String(seconds % 60).padStart(2, '0');
  return minutes < 60 ? `${minutes}:${tail}` : `${Math.floor(minutes / 60)}:${String(minutes % 60).padStart(2, '0')}:${tail}`;
}

export default function Riquewihr2025Client() {
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
        <a href="#highlights" className="hover:text-[#176347]">Highlights</a>
        <a href="#chapters" className="hover:text-[#176347]">Chapters</a>
        <a href="#route" className="whitespace-nowrap hover:text-[#176347]">Filmed route</a>
        <Link href="/christmas-markets/riquewihr" className="whitespace-nowrap text-[#176347]">Riquewihr guide ↗</Link>
      </div>
    </nav>
  }>
    <header className={`${width} py-8 sm:py-12`}>
      <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap gap-2 text-sm text-[#6e5a45]"><Link href="/">Home</Link><span>/</span><Link href="/destinations/france">France</Link><span>/</span><span>Riquewihr 2025 day walk</span></nav>
      <p className="text-xs font-semibold uppercase tracking-widest text-[#176347]">{detail.heroEyebrow}</p>
      <h1 className="mt-3 max-w-4xl font-serif text-4xl leading-tight sm:text-5xl">{tour.title}</h1>
      <p className="mt-4 text-xl text-[#6e5a45]">{detail.heroSubtitle}</p>
      <p className="mt-5 max-w-3xl text-base leading-8 text-[#56493a]">{tour.description}</p>
      <div className="mt-7"><LongFormWalkStatsRow stats={[
        { icon: '📅', label: 'Filmed', value: filmedDate },
        { icon: '🕐', label: 'Start', value: tour.startTime },
        { icon: '📏', label: 'Distance', value: `${tour.distanceMiles.toFixed(1)} mi / ${tour.distanceKm} km` },
        { icon: '▶', label: 'Duration', value: tour.durationLabel },
        { icon: '☁', label: 'Weather', value: tour.weather },
      ]} /></div>
      <Image src={tour.hero} alt={tour.heroAlt} width={1920} height={1080} priority sizes="(min-width: 1152px) 1088px, 100vw" className="mt-8 aspect-[16/7] w-full rounded-2xl object-cover" />
    </header>

    <section id="watch" ref={videoRef} aria-labelledby="watch-heading" className={`${width} scroll-mt-40 pb-12`}>
      <h2 id="watch-heading" className="font-serif text-3xl">Watch my Riquewihr walk</h2>
      <p className="mb-5 mt-3 text-[#56493a]">Put on your headphones and turn on closed captions for my history notes and travel tips. Choose a chapter to cue that moment, then press Play.</p>
      <div className="aspect-video overflow-hidden rounded-2xl bg-black">
        <iframe key={start} title={tour.youtubeTitle} src={`https://www.youtube.com/embed/${tour.youtubeId}?start=${start}&autoplay=0&rel=0&playsinline=1`} className="h-full w-full" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
      </div>
      <div className="mt-4 flex flex-wrap justify-between gap-3 text-sm"><p role="status" aria-live="polite">{start > 0 ? `Cued to ${timeLabel(start)}` : `Full walk · ${tour.durationLabel}`}</p><a className={linkStyle} href={`https://www.youtube.com/watch?v=${tour.youtubeId}&t=${start}s`} target="_blank" rel="noreferrer">Watch on YouTube ↗</a></div>
    </section>

    <section id="highlights" aria-labelledby="highlights-heading" className={`${width} scroll-mt-40 py-10`}>
      <p className="text-xs font-semibold uppercase tracking-widest text-[#176347]">A few places along the way</p><h2 id="highlights-heading" className="mt-3 font-serif text-3xl">Highlights from my walk</h2>
      <div className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{featured.map(chapter => <article key={chapter.seconds} className="overflow-hidden rounded-2xl border border-[#e1d9cd] bg-white">
        <button type="button" onClick={() => seek(chapter.seconds)} aria-label={`Watch ${chapter.title} at ${chapter.timeLabel}`} className="group block w-full text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#176347]">
          <div className="relative aspect-video"><Image src={chapter.photo!.src} alt={chapter.photo!.alt} fill sizes="(min-width: 1024px) 350px, (min-width: 640px) 50vw, 100vw" className="object-cover" /><span className="absolute bottom-3 left-3 rounded-full bg-black/75 px-3 py-1 text-sm font-semibold text-white">▶ {chapter.timeLabel}</span></div>
          <h3 className="px-5 pt-5 text-lg font-semibold group-hover:text-[#176347]">{chapter.title}</h3>
        </button><p className="px-5 pb-5 pt-3 text-sm leading-7 text-[#56493a]">{chapter.description}</p>
      </article>)}</div>
    </section>

    <section id="chapters" aria-labelledby="chapters-heading" className={`${width} scroll-mt-40 py-10`}>
      <h2 id="chapters-heading" className="font-serif text-3xl">Every chapter in the walk</h2>
      <ol className="mt-6 grid gap-x-8 md:grid-cols-2">{tour.chapters.map(chapter => <li key={chapter.seconds} className="border-b border-[#e1d9cd]"><button type="button" onClick={() => seek(chapter.seconds)} className="flex min-h-14 w-full items-start gap-4 py-4 text-left hover:text-[#176347] focus-visible:outline-2 focus-visible:outline-[#176347]"><span className="w-16 shrink-0 font-mono text-sm font-semibold text-[#176347]">{chapter.timeLabel}</span><span>{chapter.title}</span></button></li>)}</ol>
    </section>

    <section aria-labelledby="notes-heading" className={`${width} py-12`}>
      <h2 id="notes-heading" className="font-serif text-3xl">A few notes from filming</h2>
      <div className="mt-6 grid gap-8 md:grid-cols-2">
        <div><h3 className="text-xl font-semibold">The streets before the stalls</h3><p className="mt-3 leading-8 text-[#56493a]">I arrived with Bobby at 8:45 AM, then started this daytime walk at 12:55 PM. By then the main street was packed. I saved the market at Place Fernand Zeyer for the end because I wanted to show the houses, shops and courtyards first.</p></div>
        <div><h3 className="text-xl font-semibold">A quiet moment in the Dolder</h3><p className="mt-3 leading-8 text-[#56493a]">I was the only visitor upstairs in the museum. After the busy street, having that space to myself and looking out over the rooftops was a highlight. Thank you to the museum staff for letting me film inside.</p></div>
        <div><h3 className="text-xl font-semibold">Inside the Christmas shop</h3><p className="mt-3 leading-8 text-[#56493a]">I waited for Féerie de Noël to open at 10 AM and filmed inside before starting the main walk. I included that earlier visit when the route reaches the shop. The video brings those parts of my day together.</p></div>
        <div><h3 className="text-xl font-semibold">Planning your own visit</h3><p className="mt-3 leading-8 text-[#56493a]">La Cour Gourmande had indoor seating at the back when I visited. The side streets also gave me a quieter break from the main street. For current dates, transport and my suggested visitor route, use my <Link className={linkStyle} href="/christmas-markets/riquewihr">Riquewihr Christmas guide</Link>.</p></div>
      </div>
    </section>

    <section id="route" aria-labelledby="route-heading" className={`${width} scroll-mt-40 py-10`}>
      <h2 id="route-heading" className="font-serif text-3xl">Follow the filmed route</h2><p className="mb-6 mt-4 max-w-3xl leading-8 text-[#56493a]">{detail.routeMapDescription}</p><VisitorRouteMap data={riquewihr2025FilmedMap} />
    </section>
    <section aria-labelledby="licensing-heading" className={`${width} py-12`}>
      <div className="rounded-2xl border border-[#e1d9cd] bg-white p-6 sm:p-8"><h2 id="licensing-heading" className="font-serif text-3xl">License footage from this walk</h2>{detail.licensingDescription.map(text => <p key={text} className="mt-4 max-w-3xl leading-8 text-[#56493a]">{text}</p>)}<Link href="/licensing" className="mt-6 inline-flex min-h-11 items-center rounded-xl bg-[#176347] px-6 py-3 font-semibold text-white">Request a licensing quote</Link></div>
      <div className="mt-10 flex flex-wrap justify-between gap-5"><Link href="/christmas-markets/riquewihr" className={linkStyle}>Plan a visit to Riquewihr →</Link><a href="https://youtu.be/uH54xuhW6U4" className={linkStyle} target="_blank" rel="noreferrer">Watch next: my Basel Christmas walk ↗</a></div>
    </section>
  </LongFormWalkPage>;
}
