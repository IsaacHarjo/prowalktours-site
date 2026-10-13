"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { DestinationGuide, GuidePhoto, GuideSeason, GuideSource, GuideWalk } from "../../lib/guides/types";
import { withWatchTimestamp } from "../../lib/tours/links";
import CompactWalkList from "./CompactWalkList";

const width = "mx-auto max-w-7xl px-5 sm:px-8 lg:px-10";
const eyebrow = "text-xs font-semibold uppercase tracking-[0.18em] text-[#607767]";
const linkClass = "inline-flex min-h-11 items-center text-sm font-semibold text-[#176347] underline underline-offset-4 hover:text-[#25382f]";
const buttonClass = "inline-flex min-h-11 items-center justify-center rounded-full bg-[#176347] px-6 py-3 text-sm font-semibold text-white hover:bg-[#25382f]";

function Photo({ photo, className = "aspect-[4/3]", sizes = "(min-width: 768px) 50vw, 100vw" }: { photo: GuidePhoto; className?: string; sizes?: string }) {
  return <figure><Image src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} sizes={sizes} className={`w-full rounded-2xl object-cover ${className}`} /><figcaption className="mt-2 text-xs leading-5 text-[#657069]">ProWalk Tours photo · {photo.year}</figcaption></figure>;
}
function SourceLink({ source }: { source: GuideSource }) {
  return <a href={source.href} target="_blank" rel="noreferrer" className={linkClass}>{source.label} ↗</a>;
}
function timeLabel(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return `${hours ? `${hours}:` : ""}${hours ? String(minutes).padStart(2, "0") : minutes}:${String(seconds % 60).padStart(2, "0")}`;
}

export default function DestinationGuideClient({ guide, season, walks }: { guide: DestinationGuide; season: GuideSeason; walks: GuideWalk[] }) {
  const [selectedId, setSelectedId] = useState(guide.featuredTourId);
  const selected = walks.find(walk => walk.id === selectedId) ?? walks[0];
  const checkedDate = new Date(`${season.checkedOn}T12:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
  const fieldWalk = walks.find(walk => walk.id === guide.fieldNote.tourId);

  return <div className="bg-[#fcfaf7] text-[#25382f]">
    <section className={width + " pb-10 pt-6 sm:pb-14"}>
      <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap gap-2 text-sm text-[#657069]"><Link href="/" className="hover:underline">Home</Link><span aria-hidden="true">/</span><Link href="/christmas-markets" className="hover:underline">Christmas Markets</Link><span aria-hidden="true">/</span><span aria-current="page">{guide.city}</span></nav>
      <div className="grid items-center gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
        <div><p className={eyebrow}>{guide.region}, {guide.country} · A guide from the walks</p><h1 className="mt-4 font-serif text-5xl leading-[1.06] tracking-tight sm:text-6xl">{guide.title}</h1><p className="mt-6 text-lg leading-8 text-[#657069]">{guide.introduction}</p><div className="mt-7 flex flex-wrap gap-4"><a href="#plan-your-visit" className={buttonClass}>Plan your {season.year} visit</a><a href="#watch-walks" className={linkClass}>Walk with me ↓</a></div><p className="mt-6 text-xs leading-6 text-[#657069]">By Isaac · ProWalk Tours<br />Photographs from the archive · Day & evening films from 2023</p></div>
        <figure className="min-w-0">
          <picture><source media="(max-width: 639px)" srcSet={guide.mobileHero.src} />
            {/* Both compositions are already compressed WebP exports, each under 300 KB. */}
            <Image src={guide.hero.src} alt={`Christmas lights and half-timbered buildings in ${guide.city}`} width={guide.hero.width} height={guide.hero.height} unoptimized loading="eager" className="aspect-[4/3] w-full rounded-[1.5rem] object-cover sm:aspect-[5/4] lg:aspect-[4/3]" />
          </picture>
          <figcaption className="mt-3 text-xs text-[#657069]">{guide.city} in the Christmas lights · ProWalk Tours, {guide.hero.year}</figcaption>
        </figure>
      </div>
    </section>

    <nav aria-label="In this guide" className="border-y border-[#dce1d6] bg-white"><div className={width + " flex flex-wrap gap-x-7 gap-y-1 py-3 text-sm font-semibold"}>{[["plan-your-visit", `${season.year} dates`], ["market-squares", "The markets"], ["getting-there", "Getting there"], ["seen-on-the-walks", "Places to explore"], ["watch-walks", "Watch the walks"], ["regional-route", `Beyond ${guide.city}`]].map(([id, label]) => <a key={id} href={`#${id}`} className="flex min-h-11 items-center hover:text-[#176347] hover:underline">{label}</a>)}</div></nav>

    <section id="plan-your-visit" className={width + " scroll-mt-20 py-14 sm:py-16"} aria-labelledby="visit-heading">
      <div className="grid gap-9 lg:grid-cols-[1.2fr_0.8fr]">
        <div><p className={eyebrow}>The season ahead</p><h2 id="visit-heading" className="mt-3 text-3xl font-semibold tracking-tight">Plan your {season.year} visit</h2><p className="mt-5 text-2xl font-medium leading-9">{season.dates}</p><p className="mt-1 text-sm text-[#657069]">Main Christmas markets</p><dl className="mt-6 max-w-lg divide-y divide-[#dce1d6] border-y border-[#dce1d6]">{season.hours.map(hours => <div key={hours.label} className="flex flex-wrap justify-between gap-3 py-4"><dt className="text-[#657069]">{hours.label}</dt><dd className="font-semibold tabular-nums">{hours.value}</dd></div>)}</dl><p className="mt-4 max-w-lg text-sm leading-6 text-[#657069]">{season.exceptions}</p><SourceLink source={season.source} /></div>
        <aside className="self-start rounded-2xl bg-[#eaf0e8] p-6 sm:p-8"><p className={eyebrow}>A separate schedule</p><h3 className="mt-3 text-xl font-semibold">{season.extraMarket.title}</h3><p className="mt-4 font-semibold leading-7">{season.extraMarket.dates}</p><p className="mt-3 text-sm leading-7 text-[#526258]">{season.extraMarket.hours}</p><SourceLink source={season.extraMarket.source} /><p className="mt-5 border-t border-[#cbd6c8] pt-4 text-xs leading-6 text-[#526258]">Official information checked <time dateTime={season.checkedOn}>{checkedDate}</time>. Recheck the organizer’s page before traveling. Archive photos and films show earlier seasons.</p></aside>
      </div>
    </section>

    <section id="market-squares" className="scroll-mt-20 border-y border-[#e1e3d9] bg-white" aria-labelledby="markets-heading"><div className={width + " py-14 sm:py-16"}><p className={eyebrow}>Find your bearings</p><h2 id="markets-heading" className="mt-3 text-3xl font-semibold tracking-tight">Six markets, an old town to explore</h2><p className="mt-4 max-w-2xl leading-7 text-[#657069]">Think of the markets as stops along a walk through Colmar. Between them are the streets, shopfronts and canals that give the visit its character.</p><ol className="mt-8 grid gap-x-12 md:grid-cols-2">{guide.markets.map((market, index) => <li key={market.name} className="flex gap-4 border-t border-[#e1e3d9] py-6"><span className="pt-1 font-serif text-xl text-[#947a50]">{String(index + 1).padStart(2, "0")}</span><div><h3 className="text-lg font-semibold">{market.name}</h3><p className="mt-2 text-sm leading-7 text-[#657069]">{market.text}</p></div></li>)}</ol><SourceLink source={guide.marketsSource} /></div></section>

    <section id="getting-there" className={width + " scroll-mt-20 py-14 sm:py-16"} aria-labelledby="transport-heading"><p className={eyebrow}>Getting there & around</p><h2 id="transport-heading" className="mt-3 text-3xl font-semibold tracking-tight">Arrive in {guide.city}. Then explore.</h2><div className="mt-8 grid gap-8 lg:grid-cols-3">{season.transport.map(item => <article key={item.title} className="border-t border-[#cbd6c8] pt-5"><h3 className="text-xl font-semibold">{item.title}</h3><p className="mt-3 text-sm leading-7 text-[#657069]">{item.text}</p><SourceLink source={item.source} /></article>)}</div></section>

    <section id="seen-on-the-walks" className="scroll-mt-20 bg-[#edf1ed]" aria-labelledby="moments-heading"><div className={width + " py-14 sm:py-16"}><p className={eyebrow}>Seen along the way</p><h2 id="moments-heading" className="mt-3 text-3xl font-semibold tracking-tight">A few places to linger</h2><p className="mt-4 max-w-2xl leading-7 text-[#657069]">A preview through my photographs, with links to the same places in the 2023 films. Choose a moment to join the walk there.</p><div className="mt-9 grid gap-x-8 gap-y-10 md:grid-cols-2">{guide.moments.map(moment => {
      const walk = walks.find(item => item.id === moment.tourId);
      return <article key={moment.title}><Photo photo={moment.photo} className="aspect-[16/10]" /><h3 className="mt-5 text-xl font-semibold">{moment.title}</h3><p className="mt-3 max-w-xl text-sm leading-7 text-[#657069]">{moment.text}</p>{walk && <Link href={withWatchTimestamp(walk.watchHref, moment.seconds)} className={linkClass}>See it in the {walk.videoType === "evening-walk" ? "evening" : "daytime"} walk · {timeLabel(moment.seconds)} →</Link>}</article>;
    })}</div></div></section>

    <section id="watch-walks" className={width + " scroll-mt-20 py-14 sm:py-16"} aria-labelledby="watch-heading"><div className="grid items-start gap-10 lg:grid-cols-[1.6fr_1fr]"><div><p className={eyebrow}>Put on your headphones</p><h2 id="watch-heading" className="mt-3 text-3xl font-semibold tracking-tight">Walk through {guide.city}</h2><p className="mt-4 leading-7 text-[#657069]">Take your time with the full films. Compare the daytime streets with the lights and sounds of the evening.</p>{selected && <><div role="group" aria-label={`Choose a ${guide.city} walk`} className="my-6 flex flex-wrap gap-3">{walks.map(walk => <button key={walk.id} onClick={() => setSelectedId(walk.id)} aria-pressed={walk.id === selected.id} className={`min-h-11 rounded-full border px-5 py-2 text-sm font-semibold ${walk.id === selected.id ? "border-[#176347] bg-[#176347] text-white" : "border-[#cbd6c8] bg-white hover:border-[#176347]"}`}>{walk.videoType === "evening-walk" ? "Evening walk" : "Daytime walk"} · {walk.filmedYear}</button>)}</div><iframe key={selected.id} src={`https://www.youtube.com/embed/${selected.youtubeId}?rel=0`} title={selected.siteTitle} loading="lazy" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" className="aspect-video w-full rounded-2xl border-0 bg-[#25382f]" /><p className="mt-3 text-sm leading-6 text-[#657069]">{selected.siteTitle} · {selected.durationLabel}</p></>}</div><aside className="rounded-2xl border border-[#dce1d6] bg-white p-6"><h3 className="text-xl font-semibold">The {guide.city} films</h3><p className="mt-3 text-sm leading-7 text-[#657069]">Open a walk for its highlights and route. Filming dates describe the archive; use the dates above for this season.</p><CompactWalkList walks={walks} /></aside></div></section>

    <section className={width + " pb-14 sm:pb-16"}><div className="grid items-center gap-8 border-t border-[#dce1d6] pt-12 md:grid-cols-2 lg:gap-14"><Photo photo={guide.fieldNote.photo} /><div><p className={eyebrow}>A note from the walk</p><h2 className="mt-3 font-serif text-4xl leading-tight">{guide.fieldNote.title}</h2><p className="mt-5 leading-8 text-[#657069]">{guide.fieldNote.text}</p>{fieldWalk && <Link href={withWatchTimestamp(fieldWalk.watchHref, guide.fieldNote.seconds)} className={linkClass + " mt-3"}>Watch the chimney cakes being made · {timeLabel(guide.fieldNote.seconds)} →</Link>}</div></div><div className="mt-12 grid grid-cols-3 gap-3 sm:gap-6">{guide.gallery.map(photo => <Photo key={photo.src} photo={photo} className="aspect-[3/4]" sizes="(min-width: 1024px) 380px, 30vw" />)}</div></section>

    <section id="regional-route" className="scroll-mt-20 bg-[#25382f] text-white"><div className={width + " py-14 sm:py-16"}><p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#c0d3c5]">Beyond one destination</p><h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight">{guide.route.title}</h2><p className="mt-5 max-w-3xl leading-8 text-[#d1dcd4]">{guide.route.text}</p><ol className="mt-7 flex flex-wrap gap-3" aria-label="December 2025 filming route">{guide.route.stops.map((stop, index) => <li key={stop} className="flex items-center gap-3">{index > 0 && <span aria-hidden="true" className="text-[#c0d3c5]">→</span>}<span className={`rounded-full border px-4 py-2 text-sm ${stop === guide.city ? "border-white bg-white font-semibold text-[#25382f]" : "border-white/30"}`}>{stop}</span></li>)}</ol><p className="mt-6 max-w-3xl text-sm leading-7 text-[#c0d3c5]">{guide.route.note}</p><Link href="/christmas-markets#journeys" className="mt-4 inline-flex min-h-11 items-center text-sm font-semibold underline underline-offset-4">Explore the Christmas filming journeys →</Link></div></section>

    <section className={width + " py-14 sm:py-16"}><p className={eyebrow}>Keep exploring</p><h2 className="mt-3 text-3xl font-semibold tracking-tight">More walks around {guide.region}</h2><div className="mt-7 grid gap-5 md:grid-cols-3">{guide.nearby.map(place => <Link key={place.city} href={place.href} className="rounded-2xl border border-[#dce1d6] bg-white p-6 hover:border-[#176347]"><h3 className="text-xl font-semibold">{place.city}</h3><p className="mt-3 text-sm leading-7 text-[#657069]">{place.text}</p><span className={linkClass + " mt-3"}>Browse the walks →</span></Link>)}</div><div className="mt-10 flex flex-wrap justify-between gap-4 border-t border-[#dce1d6] pt-5"><Link href="/christmas-markets" className={linkClass}>← All Christmas destinations</Link><Link href="/licensing" className={linkClass}>License footage from the walks →</Link></div></section>
  </div>;
}
