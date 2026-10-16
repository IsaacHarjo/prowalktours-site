"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import type { DestinationGuide, GuideSeason, GuideSource, GuideWalk, OrientationPlace } from "../../lib/guides/types";
import ChristmasShuttles from "./ChristmasShuttles";
import GuideDisclosure from "./GuideDisclosure";
import GuideSectionHeading from "./GuideSectionHeading";
import GuideWalkVideos from "./GuideWalkVideos";
import GuideHeroVideo, { type GuideVideoPreview } from "./GuideHeroVideo";
import GuideFaqs from "./GuideFaqs";
import type { GuideMapData } from "../../lib/guides/map-types";
import type { VisitorMapData } from "../../lib/guides/visitor-map-types";

const GuideRouteMap = dynamic(() => import("./GuideRouteMap"), {
  ssr: false,
  loading: () => <div className="mt-8 flex h-[420px] items-center justify-center rounded-2xl bg-[#f5f6f1] text-sm text-[#657069] sm:h-[480px]" role="status">Loading the Colmar map…</div>,
});

const VisitorRouteMap = dynamic(() => import("./VisitorRouteMap"), {
  ssr: false,
  loading: () => <div className="mt-8 flex h-[480px] items-center justify-center rounded-2xl bg-[#f5f6f1] text-sm text-[#657069]" role="status">Loading the suggested walking route…</div>,
});

const AlsaceOrientation = dynamic(() => import("./AlsaceOrientation"), {
  ssr: false,
  loading: () => <div className="mt-8 flex min-h-[400px] items-center justify-center rounded-3xl bg-[#edf1ed] text-sm text-[#657069]" role="status">Loading the regional overview…</div>,
});

const width = "mx-auto max-w-7xl px-5 sm:px-8 lg:px-10";
const linkClass = "inline-flex min-h-11 items-center text-sm font-semibold text-[#176347] underline underline-offset-4 hover:text-[#25382f]";

function SourceLink({ source }: { source: GuideSource }) {
  return <a href={source.href} target="_blank" rel="noreferrer" className={linkClass}>{source.label} ↗</a>;
}

export default function DestinationGuideClient({ guide, season, walks, mapData, visitorMapData, orientationPlaces, videoPreview }: { guide: DestinationGuide; season: GuideSeason; walks: GuideWalk[]; mapData?: GuideMapData; visitorMapData?: VisitorMapData; orientationPlaces?: OrientationPlace[]; videoPreview?: GuideVideoPreview }) {
  const parkingStops = visitorMapData?.stops.filter(stop => stop.icon === "parking") ?? [];
  const checkedDate = new Date(`${season.checkedOn}T12:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
  const navigation = [
    ["market-squares", "Explore the walk"],
    ["plan-your-visit", `${season.year} dates`],
    ["getting-there", "Plan the trip"],
    ...(season.shuttles ? [["christmas-shuttles", "Christmas Shuttles"]] : []),
    ["watch-walks", "Watch my walks"],
  ];

  return <div className="bg-[#fcfaf7] text-[#25382f] [--guide-scroll-offset:10rem]">
    <div className={width + " pb-2 pt-5"}>
      <nav aria-label="Breadcrumb" className="flex flex-wrap gap-2 text-sm text-[#657069]"><Link href="/" className="hover:underline">Home</Link><span aria-hidden="true">/</span><Link href="/christmas-markets" className="hover:underline">Christmas Markets</Link><span aria-hidden="true">/</span><span aria-current="page">{guide.city}</span></nav>
    </div>
    <nav aria-label="In this guide" className="sticky top-[65px] z-40 border-b border-[#dce1d6] bg-[#fcfaf7]/95 shadow-sm backdrop-blur">
      <div className={width + ` flex gap-2 overflow-x-auto overscroll-x-contain py-3 sm:gap-3 lg:grid ${season.shuttles ? "lg:grid-cols-5" : "lg:grid-cols-4"}`}>
        {navigation.map(([id, label]) => (
          <a key={id} href={`#${id}`} className="flex min-h-11 shrink-0 items-center justify-center whitespace-nowrap rounded-xl bg-[#25382f] px-4 py-2 text-center text-sm font-semibold leading-6 text-white transition-colors hover:bg-[#176347] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#176347] lg:min-h-14 lg:px-3 lg:py-3 lg:text-base">{label}</a>
        ))}
      </div>
    </nav>
    <header className={width + " pb-4 pt-5 sm:pb-6"}>
      <div className="relative isolate flex min-h-[460px] items-end overflow-hidden rounded-3xl bg-[#25382f] sm:min-h-[440px] lg:min-h-[520px]">
        <picture className="absolute inset-0">
          <source media="(max-width: 639px)" srcSet={guide.mobileHero.src} />
          {/* Both compositions are already compressed WebP exports, each under 300 KB. */}
          <Image src={guide.hero.src} alt={`Christmas lights and half-timbered buildings in ${guide.city}`} width={guide.hero.width} height={guide.hero.height} unoptimized loading="eager" fetchPriority="high" className="h-full w-full object-cover" />
        </picture>
        {videoPreview && <GuideHeroVideo preview={videoPreview} />}
        <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-[#091811]/95 via-[#091811]/35 to-[#091811]/5" />
        <div className="relative max-w-3xl px-6 pb-8 pt-28 sm:p-10 lg:p-12">
          <h1 className="font-serif text-5xl leading-[1.04] tracking-tight text-white sm:text-6xl lg:text-7xl">{guide.title}</h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-white/90 sm:text-lg sm:leading-8">{guide.introduction}</p>
        </div>
      </div>
    </header>

    <section id="market-squares" className="scroll-mt-[var(--guide-scroll-offset,5rem)] border-y border-[#e1e3d9] bg-white" aria-labelledby="markets-heading">
      <div className={width + " py-14 sm:py-16"}>
        <GuideSectionHeading id="markets-heading" eyebrow={`Explore ${guide.city} on foot`} title={`Take a walk through ${guide.city}’s Christmas markets`} icon="walking" />
        <p className="mt-3 text-sm leading-6 text-[#657069] lg:hidden">Preview all six markets through my clips, then follow my suggested walk when you get here.</p>
        <p className="mt-4 hidden max-w-3xl leading-7 text-[#657069] lg:block">I filmed Colmar’s Christmas markets in 2023 and 2025 and spent a lot of time planning a walk that includes all six markets. This is the route I’d recommend, with photo spots, useful stops and tips along the way.</p>
        <p className="mt-3 hidden max-w-3xl leading-7 text-[#657069] lg:block">Start with the first stop below. Watch a short clip, see where you are on the map, then choose Next stop to continue the walk.</p>
        <p className="mt-3 text-xs leading-6 text-[#526258] lg:hidden">Allow at least 3 hours · Best around sunset · Start at the Colmar sign</p>
        {guide.visitEssentials && <dl className="mt-6 hidden gap-3 lg:grid lg:grid-cols-3">{guide.visitEssentials.filter(item => item.label !== "Arriving by train").map(item => <div key={item.label} className="rounded-xl bg-[#eaf0e8] px-5 py-4"><dt className="text-xs font-semibold uppercase tracking-wide text-[#526258]">{item.label}</dt><dd className="mt-1 font-semibold">{item.value}</dd></div>)}</dl>}
        {visitorMapData ? <VisitorRouteMap data={visitorMapData} /> : mapData ? <GuideRouteMap data={mapData} markets={guide.markets} walks={walks} year={season.year} /> : <ol className="mt-8 grid gap-x-12 md:grid-cols-2">{guide.markets.map((market, index) => <li key={market.name} className="flex gap-4 border-t border-[#e1e3d9] py-6"><span className="pt-1 font-serif text-xl text-[#947a50]">{String(index + 1).padStart(2, "0")}</span><div><h3 className="text-lg font-semibold">{market.name}</h3><p className="mt-2 text-sm leading-7 text-[#657069]">{market.text}</p></div></li>)}</ol>}
        <SourceLink source={guide.marketsSource} />
      </div>
    </section>

    <section id="plan-your-visit" className={width + " scroll-mt-[var(--guide-scroll-offset,5rem)] py-14 sm:py-16"} aria-labelledby="visit-heading">
      <GuideSectionHeading id="visit-heading" eyebrow="The season ahead" title={`${season.year} dates & opening hours`} icon="planning" />
      <div className="mt-6 grid items-start gap-5 sm:grid-cols-2 sm:gap-10">
        <div>
          <p className="text-2xl font-medium leading-9">{season.dates}</p>
          <p className="mt-1 text-sm text-[#657069]">Main Christmas markets</p>
          <SourceLink source={season.source} />
          <p className="mt-2 max-w-lg text-xs leading-6 text-[#657069]">Check the official opening hours before your visit. Last checked <time dateTime={season.checkedOn}>{checkedDate}</time>.</p>
        </div>
        <dl className="divide-y divide-[#dce1d6] border-y border-[#dce1d6]">{season.hours.map(hours => <div key={hours.label} className="flex flex-wrap justify-between gap-3 py-4"><dt className="text-[#657069]">{hours.label}</dt><dd className="font-semibold tabular-nums">{hours.value}</dd></div>)}</dl>
      </div>
      <GuideDisclosure title="Holiday hours & Gourmet Market dates" className="mt-8">
        <div className="grid gap-8 sm:grid-cols-2">
          <div><h3 className="font-semibold">Christmas holiday hours</h3><p className="mt-3 text-sm leading-7 text-[#657069]">{season.exceptions}</p></div>
          <div><h3 className="font-semibold">{season.extraMarket.title}</h3><p className="mt-3 text-sm font-semibold leading-7">{season.extraMarket.dates}</p><p className="mt-2 text-sm leading-7 text-[#657069]">{season.extraMarket.hours}</p><SourceLink source={season.extraMarket.source} /></div>
        </div>
      </GuideDisclosure>
    </section>

    <section id="getting-there" className={width + " scroll-mt-[var(--guide-scroll-offset,5rem)] py-14 sm:py-16"} aria-labelledby="transport-heading">
      <GuideSectionHeading id="transport-heading" eyebrow="Plan the wider trip" title={`Where ${guide.city} fits in your trip`} icon="region" />
      <p className="mt-4 max-w-3xl leading-7 text-[#657069]">If you’re visiting several market towns, use this map to see how they fit together. The transport options below can help you decide how to get around.</p>
      {orientationPlaces && <AlsaceOrientation key={guide.city} focusCity={guide.city} places={orientationPlaces} />}
      <GuideDisclosure title={parkingStops.length ? "Train connections, parking & local transport" : "Train connections & local transport"} className="mt-8">
        <div className="grid gap-8 sm:grid-cols-2">{season.transport.map(item => <article key={item.title}><h3 className="text-lg font-semibold">{item.title}</h3><p className="mt-3 text-sm leading-7 text-[#657069]">{item.text}</p><SourceLink source={item.source} /></article>)}</div>
        {parkingStops.length > 0 && <div className="mt-6 border-t border-[#dce1d6] pt-6">
          <h3 className="text-lg font-semibold">Parking near the walk</h3>
          <div className="mt-4 grid gap-6 sm:grid-cols-2">{parkingStops.map(stop => <article key={stop.id}><h4 className="font-semibold">{stop.shortName}</h4><p className="mt-2 text-sm leading-7 text-[#657069]">{stop.text}</p>{stop.tip && <p className="mt-2 text-sm leading-7 text-[#657069]">{stop.tip}</p>}</article>)}</div>
          <a href="#market-squares" className={linkClass + " mt-3"}>Find these stops on the walking map ↓</a>
        </div>}
      </GuideDisclosure>
    </section>

    {season.shuttles && <ChristmasShuttles service={season.shuttles} />}





    <GuideWalkVideos city={guide.city} walks={walks} />

    {guide.faq && guide.faq.length > 0 && <GuideFaqs city={guide.city} questions={guide.faq} />}



    <section className={width + " py-14 sm:py-16"} aria-labelledby="nearby-heading">
      <GuideSectionHeading id="nearby-heading" eyebrow="Keep exploring" title={`More walks around ${guide.region}`} icon="explore" />
      <div className="mt-7 grid gap-5 md:grid-cols-3">{guide.nearby.map(place => <Link key={place.city} href={place.href} className="rounded-2xl border border-[#dce1d6] bg-white p-6 hover:border-[#176347]"><h3 className="text-xl font-semibold">{place.city}</h3><p className="mt-3 text-sm leading-7 text-[#657069]">{place.text}</p><span className={linkClass + " mt-3"}>Browse the walks →</span></Link>)}</div>
      <div id="regional-route" className="mt-8 scroll-mt-[var(--guide-scroll-offset,5rem)]">
        <GuideDisclosure title="My Christmas filming trip around Alsace">
          <h3 className="text-lg font-semibold">{guide.route.title}</h3>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-[#657069]">{guide.route.text}</p>
          <ol className="mt-5 flex flex-wrap gap-3" aria-label="December 2025 filming route">{guide.route.stops.map((stop, index) => <li key={stop} className="flex items-center gap-3">{index > 0 && <span aria-hidden="true" className="text-[#657069]">→</span>}<span className={`rounded-full border px-4 py-2 text-sm ${stop === guide.city ? "border-[#25382f] bg-[#25382f] font-semibold text-white" : "border-[#dce1d6]"}`}>{stop}</span></li>)}</ol>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-[#657069]">{guide.route.note}</p>
          <Link href="/christmas-markets#journeys" className={linkClass + " mt-3"}>See my other Christmas trips →</Link>
        </GuideDisclosure>
      </div>
      <div className="mt-10 flex flex-wrap justify-between gap-4 border-t border-[#dce1d6] pt-5"><Link href="/christmas-markets" className={linkClass}>← All Christmas destinations</Link><Link href="/licensing" className={linkClass}>License footage from the walks →</Link></div>
    </section>
  </div>;
}
