"use client";

import Image from "next/image";
import GuideHeroVideo from "./GuideHeroVideo";
import Link from "next/link";
import dynamic from "next/dynamic";
import type { ChristmasWalk } from "../../lib/christmas/catalog";
import type { OrientationPlace } from "../../lib/guides/types";
import GuideWalkVideos from "./GuideWalkVideos";
import GuideFaqs from "./GuideFaqs";
import GuideDisclosure from "./GuideDisclosure";
import { kaysersbergFaq } from "../../lib/christmas/kaysersberg-faq";
import { youtubeIdFromUrl } from "../../lib/tours/core";
import GuideSectionHeading from "./GuideSectionHeading";
import PanoramaPhoto from "./PanoramaPhoto";
import KaysersbergShuttles from "./KaysersbergShuttles";
import DestinationPersonalTake from "./DestinationPersonalTake";
import { kaysersbergVisitorMap } from "../../lib/christmas/kaysersberg-visitor-map";

const AlsaceOrientation = dynamic(() => import("./AlsaceOrientation"), { ssr: false });
const VisitorRouteMap = dynamic(() => import("./VisitorRouteMap"), { ssr: false });
const officialUrl = "https://www.kaysersberg.com/en/visit/an-authentic-christmas-in-the-kaysersberg-valley-in-alsace/";
const width = "mx-auto max-w-7xl px-5 sm:px-8 lg:px-10";
const linkStyle = "inline-flex min-h-11 items-center font-semibold text-[#176347] underline underline-offset-4";

export default function KaysersbergGuideClient({ hero, walks, orientationPlaces }: { hero: string; walks: ChristmasWalk[]; orientationPlaces: OrientationPlace[] }) {
  const videoWalks = walks.flatMap(walk => {
    const youtubeId = youtubeIdFromUrl(walk.youtubeUrl);
    return youtubeId ? [{ ...walk, youtubeId }] : [];
  });
  return <main className="bg-[#fcfaf7] text-[#25382f] [--guide-scroll-offset:10rem]">
    <div className={width + " py-5"}><nav aria-label="Breadcrumb" className="flex gap-2 text-sm text-[#657069]"><Link href="/">Home</Link><span>/</span><Link href="/christmas-markets">Christmas Markets</Link><span>/</span><span aria-current="page">Kaysersberg</span></nav></div>
    <nav aria-label="In this guide" className="sticky top-[65px] z-40 border-b border-[#dce1d6] bg-[#fcfaf7]/95 shadow-sm backdrop-blur"><div className={width + " flex gap-2 overflow-x-auto overscroll-x-contain py-3 sm:gap-3 lg:grid lg:grid-cols-5"}>{[["explore", "Explore the walk"], ["dates", "2026 dates"], ["getting-there", "Plan the trip"], ["christmas-shuttles", "Christmas Shuttles"], ["watch-walks", "Watch my walks"]].map(([id, title]) => <a key={id} href={`#${id}`} className="flex min-h-11 shrink-0 items-center justify-center whitespace-nowrap rounded-xl bg-[#25382f] px-4 py-2 text-center text-sm font-semibold leading-6 text-white transition-colors hover:bg-[#176347] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#176347] lg:min-h-14 lg:px-3 lg:py-3 lg:text-base">{title}</a>)}</div></nav>
    <header className={width + " pt-5"}><div className="relative isolate flex min-h-[420px] items-end overflow-hidden rounded-3xl bg-[#25382f] lg:min-h-[520px]"><Image src={hero} alt="Kaysersberg at Christmas, from my walking tour" fill priority sizes="(min-width: 1280px) 1200px, 100vw" className="object-cover" /><GuideHeroVideo preview={{ src: "https://vz-76a3e58b-c05.b-cdn.net/ef13d3b9-3f41-42e5-b2e8-8350d79a5ac5/play_1080p.mp4" }} /><div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/20 to-transparent" /><div className="relative max-w-3xl p-6 text-white sm:p-10"><p className="text-xs font-semibold uppercase tracking-[0.2em]">Alsace, France</p><h1 className="mt-3 font-serif text-5xl sm:text-7xl">Christmas in Kaysersberg</h1><p className="mt-5 max-w-xl leading-7">Explore the Christmas market, old-town streets and fortified bridge through my walks, then plan a visit of your own.</p></div></div></header>
    <div className={width + " pb-9 pt-5 sm:pb-12 sm:pt-7"}>
      <DestinationPersonalTake portrait="/images/isaac/portrait-camera.webp" filmingPhoto="/kaysersberg-christmas-market-day-walk-2025/kaysersberg-introduction.webp" photoAlt="Half-timbered houses, Christmas lights and a decorated tree in Kaysersberg" headingId="why-kaysersberg" title="Why I love Kaysersberg at Christmas" href="#explore">
        <p>I walked into the historic centre along Rue des Forgerons, and arriving at Pont Fortifié stopped me in my tracks. The bridge, the water, the colourful half-timbered houses, and all the sounds and smells of Christmas—it was a delight for the senses. Kaysersberg is compact, but the whole walk feels like a Christmas postcard, with as much to enjoy between the stalls as in the market itself.</p>
        <p>Walk the street in both directions—it’s worth it. The houses and decorations look different on the way back, and around the fortified bridge over the Weiss there’s another photo waiting whichever way you turn. For me, that mix of bridges, water and Christmas lights makes the historic centre feel like a fairy tale.</p>
      </DestinationPersonalTake>
    </div>
    <section id="explore" aria-labelledby="explore-heading" className="scroll-mt-[var(--guide-scroll-offset,5rem)] border-y border-[#e1e3d9] bg-white">
      <div className={width + " py-14 sm:py-16"}>
      <GuideSectionHeading id="explore-heading" eyebrow="Explore Kaysersberg on foot" title="Take a walk through Kaysersberg’s Christmas market" icon="walking" />
      <p className="mt-4 hidden max-w-3xl leading-7 text-[#657069] lg:block">I filmed Kaysersberg in 2025. This walk takes you through the old town, around the market and along the Weiss, with an optional climb to the castle.</p>
      <p className="mt-3 text-sm leading-6 text-[#657069] lg:text-base lg:leading-7">Start with the first stop below. Choose Next stop to continue the walk, or select a place on the map.</p>
      <p className="mt-3 text-xs leading-6 text-[#526258] lg:hidden">2 hours to a half-day · Friday–Sunday on market weekends · Start near the Colmar Christmas Shuttle</p>
      <dl className="mt-6 hidden gap-3 lg:grid lg:grid-cols-3">{[
        { label: "How much time", value: "2 hours to a half-day" },
        { label: "When to visit", value: "Friday–Sunday on market weekends" },
        { label: "Where to start", value: "Entrance near the Colmar Christmas Shuttle" },
      ].map(item => <div key={item.label} className="rounded-xl bg-[#eaf0e8] px-5 py-4"><dt className="text-xs font-semibold uppercase tracking-wide text-[#526258]">{item.label}</dt><dd className="mt-1 font-semibold">{item.value}</dd></div>)}</dl>
      <VisitorRouteMap data={kaysersbergVisitorMap} />
      <PanoramaPhoto src="/kaysersberg-christmas-market-day-walk-2025/kaysersberg-christmas-market-360.jpg" poster="/kaysersberg-christmas-market-day-walk-2025/kaysersberg-360-preview.webp" />
      <aside aria-labelledby="castle-options" className="mt-8 rounded-2xl border border-[#dce1d6] bg-[#edf1ed] p-6 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#607767]">A little further on foot</p>
        <h3 id="castle-options" className="mt-2 font-serif text-2xl sm:text-3xl">Make time for the view from the castle</h3>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-[#526258]">I wish I had walked up to the castle for the view over town. I didn’t make the climb on this visit, but I’d leave time for it after exploring the markets. The trail is near the start of the walk, so you can also go up first. Allow about 10–15 minutes for the climb if you’re comfortable with steps.</p>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <div><h4 className="font-semibold">Keeping it short?</h4><p className="mt-2 text-sm leading-7 text-[#526258]">Take the steps up and return the same way. You can enjoy the view without adding the longer loop to your day.</p></div>
          <div><h4 className="font-semibold">Have more time?</h4><p className="mt-2 text-sm leading-7 text-[#526258]">You can make a longer loop along the vineyard track above town instead of coming straight back down the steps.</p></div>
        </div>
        <p className="mt-5 border-t border-[#cbd6cc] pt-4 text-sm leading-7 text-[#526258]">Back in town, leave time for the bakeries and pastry shops. Wine tasting is another option in the area, though I didn’t try it on my visit.</p>
      </aside>
      </div>
    </section>
    <section id="dates" aria-labelledby="dates-heading" className="scroll-mt-40 border-y border-[#dce1d6] bg-white">
      <div className={width + " py-12 sm:py-16"}>
        <GuideSectionHeading id="dates-heading" eyebrow="Plan a journey of your own" title="Kaysersberg Christmas market essentials" icon="planning" />
        <div className="mt-7 overflow-hidden rounded-2xl border border-[#dce1d6] lg:grid lg:grid-cols-[1fr_1.2fr]">
          <div className="bg-[#713b42] p-6 text-white sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#f4e4b8]">2026 · Four market weekends</p>
            <h3 className="mt-3 font-serif text-3xl leading-tight">Make it a Christmas weekend</h3>
            <p className="mt-4 text-sm leading-7 text-[#fff4ed]">The main market opens Friday to Sunday. Plan your visit around one of these four weekends.</p>
            <ul className="mt-5 grid grid-cols-2 gap-x-5 gap-y-4 border-t border-white/25 pt-5 text-sm font-semibold">{["27–29 November", "4–6 December", "11–13 December", "18–20 December"].map(date => <li key={date}>{date}</li>)}</ul>
          </div>
          <div className="bg-[#fcfaf7] p-6 sm:p-8">
            <dl className="divide-y divide-[#dce1d6] text-sm leading-7">
              <div className="pb-4"><dt className="font-semibold text-[#25382f]">Opening hours</dt><dd className="text-[#526258]">10am–8pm, Friday through Sunday on market weekends.</dd></div>
              <div className="py-4"><dt className="font-semibold text-[#25382f]">Where to go</dt><dd className="text-[#526258]">Cour de l’Arsenal and behind Sainte-Croix church, in the old town.</dd></div>
              <div className="pt-4"><dt className="font-semibold text-[#25382f]">Getting there</dt><dd className="text-[#526258]">Take a Christmas Shuttle from Colmar, or use the weekend park-and-ride.</dd></div>
            </dl>
            <a href="#christmas-shuttles" className={linkStyle + " mt-3 text-sm"}>Find your shuttle or parking option →</a>
          </div>
        </div>
        <p className="mt-6 max-w-3xl text-sm leading-7 text-[#526258]"><strong className="text-[#25382f]">My timing tip:</strong> I’d aim for around 2–5pm, so you can see the town in daylight and stay as the Christmas lights come on. I spent most of the day here filming on 12 December 2025, but you don’t need a whole day just to enjoy the market. Two hours to a half-day leaves room to explore at your own pace.</p>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-[#526258]"><strong className="text-[#25382f]">Also in 2026:</strong> The Christmas exhibition’s theme is “Memories of our childhood winters.” Look at the official visitor information below if you’d like to include it in your visit.</p>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-1"><p className="max-w-2xl text-sm leading-6 text-[#526258]">These dates cover the main Christmas market; other events may have different hours.</p><a href={officialUrl} target="_blank" rel="noreferrer" className={linkStyle + " text-sm"}>Official dates & visitor information ↗</a></div>
      </div>
    </section>
    <section id="getting-there" aria-labelledby="trip-heading" className={width + " scroll-mt-40 py-12"}><GuideSectionHeading id="trip-heading" eyebrow="Plan the wider trip" title="Where Kaysersberg fits in your trip" icon="region" /><p className="mt-4 max-w-3xl leading-7 text-[#526258]">Use the map to see Kaysersberg alongside Colmar and the other Alsace market towns.</p><AlsaceOrientation focusCity="Kaysersberg" places={orientationPlaces} /></section>
    <KaysersbergShuttles />
    <GuideWalkVideos city="Kaysersberg" walks={videoWalks} introduction="Walk with me through Kaysersberg in daylight, or choose the 360° walk to look around as you go. Put on your headphones for the sounds of the streets and markets." />
    <GuideFaqs city="Kaysersberg" questions={kaysersbergFaq} />
    <section className={width + " py-14 sm:py-16"} aria-labelledby="nearby-heading">
      <GuideSectionHeading id="nearby-heading" eyebrow="Keep exploring" title="More walks around Alsace" icon="explore" />
      <div className="mt-7 grid gap-5 md:grid-cols-3">{[
        { city: "Colmar", text: "Follow my walk through the six Christmas markets and the streets between them.", href: "/christmas-markets/colmar", label: "Explore Colmar" },
        { city: "Riquewihr", text: "Take a look around another Alsace village through my Christmas walks.", href: "/christmas-markets?city=Riquewihr#browse-walks", label: "Browse the walks" },
        { city: "Strasbourg", text: "Explore a larger city’s Christmas squares and lights with me.", href: "/christmas-markets?city=Strasbourg#browse-walks", label: "Browse the walks" },
      ].map(place => <Link key={place.city} href={place.href} className="rounded-2xl border border-[#dce1d6] bg-white p-6 hover:border-[#176347]"><h3 className="text-xl font-semibold">{place.city}</h3><p className="mt-3 text-sm leading-7 text-[#657069]">{place.text}</p><span className={linkStyle + " mt-3"}>{place.label} →</span></Link>)}</div>
      <div id="regional-route" className="mt-8 scroll-mt-[var(--guide-scroll-offset,5rem)]">
        <GuideDisclosure title="My Christmas filming trip around Alsace">
          <h3 className="text-lg font-semibold">Kaysersberg was one stop on my December trip</h3>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-[#657069]">I filmed Kaysersberg on 12 December 2025, spending most of the day exploring and recording the town. It was part of a wider Christmas trip through Alsace, with stops in Switzerland and Germany too. These walks can help you decide where else you’d like to go.</p>
          <ol className="mt-5 flex flex-wrap gap-3" aria-label="December 2025 filming route">{["Basel", "Kaysersberg", "Ribeauvillé", "Riquewihr", "Colmar", "Freiburg", "Strasbourg"].map((stop, index) => <li key={stop} className="flex items-center gap-3">{index > 0 && <span aria-hidden="true" className="text-[#657069]">→</span>}<span className={`rounded-full border px-4 py-2 text-sm ${stop === "Kaysersberg" ? "border-[#25382f] bg-[#25382f] font-semibold text-white" : "border-[#dce1d6]"}`}>{stop}</span></li>)}</ol>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-[#657069]">This is the order I filmed the towns, rather than a route you need to follow. Pick the places that appeal to you and leave time to enjoy each one.</p>
          <Link href="/christmas-markets#journeys" className={linkStyle + " mt-3"}>See my other Christmas trips →</Link>
        </GuideDisclosure>
      </div>
      <div className="mt-10 flex flex-wrap justify-between gap-4 border-t border-[#dce1d6] pt-5"><Link href="/christmas-markets" className={linkStyle}>← All Christmas destinations</Link><Link href="/licensing" className={linkStyle}>License footage from the walks →</Link></div>
    </section>
  </main>;
}
