"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import type { StandardGuide } from "../../lib/guides/standard-guide";
import type { GuideSource, GuideWalk } from "../../lib/guides/types";
import type { VisitorMapData } from "../../lib/guides/visitor-map-types";
import type { CountryOrientation as CountryOrientationData } from "../../lib/christmas/germany-orientation";
import CheckedNote from "./CheckedNote";
import DestinationPersonalTake from "./DestinationPersonalTake";
import GuideFaqs from "./GuideFaqs";
import GuideNavFade, { crumbClass, navScrollPad } from "./GuideNavFade";
import GuideSectionHeading from "./GuideSectionHeading";
import GuideWalkVideos from "./GuideWalkVideos";

// The standard Christmas market guide (piloted with Nuremberg): breadcrumb,
// in-guide nav, hero, optional personal take, the walking map, dated official
// information, getting there with the regional map, my walks, photos,
// questions, nearby markets and my visits.

const VisitorRouteMap = dynamic(() => import("./VisitorRouteMap"), {
  ssr: false,
  loading: () => <div className="mt-8 flex h-[480px] items-center justify-center rounded-2xl bg-[#f5f6f1] text-sm text-[#657069]" role="status">Loading the walking map…</div>,
});
const CountryOrientation = dynamic(() => import("./CountryOrientation"), {
  ssr: false,
  loading: () => <div className="mt-8 flex min-h-[400px] items-center justify-center rounded-3xl bg-[#edf1ed] text-sm text-[#657069]" role="status">Loading the regional overview…</div>,
});

const width = "mx-auto max-w-7xl px-5 sm:px-8 lg:px-10";
const linkClass = "inline-flex min-h-11 items-center text-sm font-semibold text-[#176347] underline underline-offset-4 hover:text-[#25382f]";

function SourceLink({ source }: { source: GuideSource }) {
  return <a href={source.href} target="_blank" rel="noreferrer" className={linkClass}>{source.label} ↗</a>;
}

export default function StandardGuideClient({ guide, walks, visitorMapData, orientation }: { guide: StandardGuide; walks: GuideWalk[]; visitorMapData: VisitorMapData; orientation: CountryOrientationData }) {
  const { season } = guide;
  const navigation = [
    ["explore", "Explore the walk"],
    ["dates", `${season.year} dates`],
    ["getting-there", "Plan the trip"],
    ["watch-walks", "Watch my walks"],
  ];

  return <div className="bg-[#fcfaf7] text-[#25382f] [--guide-scroll-offset:10rem]">
    <div className={width + " pb-2 pt-5"}>
      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm text-[#657069]"><Link href="/" className={crumbClass}>Home</Link><span aria-hidden="true">/</span><Link href="/christmas-markets" className={crumbClass}>Christmas Markets</Link><span aria-hidden="true">/</span><span aria-current="page">{guide.city}</span></nav>
    </div>
    <nav aria-label="In this guide" className="sticky top-[65px] z-40 border-b border-[#dce1d6] bg-[#fcfaf7]/95 shadow-sm backdrop-blur">
      <div className={`${width} ${navScrollPad} flex gap-2 overflow-x-auto overscroll-x-contain py-3 sm:gap-3 lg:grid lg:grid-cols-4`}>
        {navigation.map(([id, label]) => <a key={id} href={`#${id}`} className="flex min-h-11 shrink-0 items-center justify-center whitespace-nowrap rounded-xl bg-[#25382f] px-4 py-2 text-center text-sm font-semibold leading-6 text-white transition-colors hover:bg-[#176347] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#176347] lg:min-h-14 lg:px-3 lg:py-3 lg:text-base">{label}</a>)}
      </div>
      <GuideNavFade />
    </nav>

    <header className={width + " pb-4 pt-5 sm:pb-6"}>
      <div className="relative isolate flex min-h-[460px] items-end overflow-hidden rounded-3xl bg-[#25382f] sm:min-h-[440px] lg:min-h-[520px]">
        <picture className="absolute inset-0">
          <source media="(max-width: 639px)" srcSet={guide.mobileHero.src} />
          <Image src={guide.hero.src} alt={guide.hero.alt} width={guide.hero.width} height={guide.hero.height} unoptimized loading="eager" fetchPriority="high" className="h-full w-full object-cover" />
        </picture>
        <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-[#091811]/95 via-[#091811]/35 to-[#091811]/5" />
        <div className="relative max-w-3xl px-6 pb-8 pt-28 sm:p-10 lg:p-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/85">{guide.regionLabel}</p>
          <h1 className="mt-3 font-serif text-5xl leading-[1.04] tracking-tight text-white sm:text-6xl lg:text-7xl">{guide.title}</h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-white/90 sm:text-lg sm:leading-8">{guide.introduction}</p>
        </div>
      </div>
    </header>

    {guide.personalTake && <div className={width + " pb-9 pt-5 sm:pb-12 sm:pt-7"}>
      <DestinationPersonalTake portrait="/images/isaac/portrait-camera.webp" filmingPhoto={guide.personalTake.filmingPhoto} photoAlt={guide.personalTake.photoAlt} headingId={`why-${guide.slug}`} title={guide.personalTake.title} href="#explore">
        {guide.personalTake.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
      </DestinationPersonalTake>
    </div>}

    <section id="explore" aria-labelledby="explore-heading" className="scroll-mt-[var(--guide-scroll-offset,5rem)] border-y border-[#e1e3d9] bg-white">
      <div className={width + " py-14 sm:py-16"}>
        <GuideSectionHeading id="explore-heading" eyebrow={`Explore ${guide.city} on foot`} title={`Take a walk through ${guide.city}’s Christmas market`} icon="walking" />
        <p className="mt-4 max-w-3xl leading-7 text-[#657069]">{guide.routeIntroduction}</p>
        <dl className="mt-6 grid gap-3 sm:grid-cols-3">{[...guide.glance, ...(guide.tips ?? [])].map(item => <div key={item.label} className="rounded-xl bg-[#eaf0e8] px-5 py-4"><dt className="text-xs font-semibold uppercase tracking-wide text-[#526258]">{item.label}</dt><dd className="mt-1 font-semibold">{item.value}</dd></div>)}</dl>
        <VisitorRouteMap data={visitorMapData} />
      </div>
    </section>

    <section id="dates" aria-labelledby="dates-heading" className={width + " scroll-mt-[var(--guide-scroll-offset,5rem)] py-14 sm:py-16"}>
      <GuideSectionHeading id="dates-heading" eyebrow="Plan a journey of your own" title={`${guide.city} Christmas market essentials`} icon="planning" />
      <div className="mt-7 overflow-hidden rounded-2xl border border-[#dce1d6] lg:grid lg:grid-cols-[1fr_1.2fr]">
        <div className="bg-[#713b42] p-6 text-white sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#f4e4b8]">{season.year} · {season.datesLabel}</p>
          <h3 className="mt-3 font-serif text-3xl leading-tight">{season.dates}</h3>
          <dl className="mt-5 divide-y divide-white/25 border-t border-white/25">{season.hours.map(item => <div key={item.label} className="flex flex-wrap justify-between gap-3 py-3"><dt className="text-[#fff4ed]">{item.label}</dt><dd className="font-semibold tabular-nums">{item.value}</dd></div>)}</dl>
        </div>
        <div className="bg-[#fcfaf7] p-6 sm:p-8">
          <dl className="divide-y divide-[#dce1d6] text-sm leading-7">{season.extras.map(item => <div key={item.title} className="py-4 first:pt-0 last:pb-0"><dt className="font-semibold text-[#25382f]">{item.title}</dt><dd className="text-[#526258]">{item.text}</dd></div>)}</dl>
        </div>
      </div>
      {season.notes?.map(note => <p key={note} className="mt-5 max-w-3xl text-sm leading-7 text-[#526258]">{note}</p>)}
      <div className="mt-3 flex flex-wrap gap-x-6">{[season.source, ...season.extras.map(item => item.source)].filter((source, index, all) => all.findIndex(other => other.href === source.href) === index).map(source => <SourceLink key={source.href} source={source} />)}</div>
      <CheckedNote on={season.checkedOn} label="Dates and hours checked on the official pages" />
    </section>

    <section id="getting-there" aria-labelledby="trip-heading" className={width + " scroll-mt-[var(--guide-scroll-offset,5rem)] pb-14 sm:pb-16"}>
      <GuideSectionHeading id="trip-heading" eyebrow="Plan the wider trip" title={`Where ${guide.city} fits in your trip`} icon="region" />
      <p className="mt-4 max-w-3xl leading-7 text-[#526258]">Use the map to see {guide.city} alongside the other {guide.country === "Germany" ? "German" : guide.country} Christmas markets I’ve filmed.</p>
      <CountryOrientation data={orientation} />
      <div className="mt-8 grid gap-6 md:grid-cols-2">{guide.transport.map(item => <article key={item.title} className="rounded-2xl border border-[#dce1d6] bg-white p-6"><h3 className="text-lg font-semibold">{item.title}</h3><p className="mt-3 text-sm leading-7 text-[#526258]">{item.text}</p><SourceLink source={item.source} /><CheckedNote on={item.checkedOn} /></article>)}</div>
    </section>

    <GuideWalkVideos city={guide.city} walks={walks} introduction={guide.walksIntroduction} />

    {guide.gallery.length > 0 && <section aria-labelledby="photos-heading" className={width + " py-14 sm:py-16"}>
      <GuideSectionHeading id="photos-heading" eyebrow="From my visits" title={`${guide.city} at Christmas in photos`} icon="explore" />
      <ul className="mt-7 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">{guide.gallery.map(item => <li key={item.src}>
        <figure><Image src={item.src} alt={item.alt} width={item.width} height={item.height} sizes="(min-width: 1024px) 33vw, 50vw" className="aspect-[16/10] w-full rounded-xl object-cover" />
          {item.year && <figcaption className="mt-1 text-xs text-[#657069]">Photographed in {item.year}</figcaption>}</figure>
      </li>)}</ul>
    </section>}

    <GuideFaqs city={guide.city} questions={guide.faq} />

    <section className={width + " py-14 sm:py-16"} aria-labelledby="nearby-heading">
      <GuideSectionHeading id="nearby-heading" eyebrow="Keep exploring" title={`More Christmas walks around ${guide.country}`} icon="explore" />
      <div className="mt-7 grid gap-5 md:grid-cols-3">{guide.nearby.map(place => <Link key={place.city} href={place.href} className="rounded-2xl border border-[#dce1d6] bg-white p-6 hover:border-[#176347]"><h3 className="text-xl font-semibold">{place.city}</h3><p className="mt-3 text-sm leading-7 text-[#657069]">{place.text}</p><span className={linkClass + " mt-3"}>{place.label} →</span></Link>)}</div>
      <div className="mt-8 rounded-2xl border border-[#dce1d6] bg-white p-6">
        <h3 className="text-lg font-semibold">{guide.visits.title}</h3>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-[#657069]">{guide.visits.text}</p>
      </div>
      <div className="mt-10 flex flex-wrap justify-between gap-4 border-t border-[#dce1d6] pt-5"><Link href="/christmas-markets" className={linkClass}>← All Christmas destinations</Link><Link href="/licensing" className={linkClass}>License footage from the walks →</Link></div>
    </section>
  </div>;
}
