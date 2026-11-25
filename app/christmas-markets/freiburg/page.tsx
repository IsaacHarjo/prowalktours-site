import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import DestinationPersonalTake from "../../../components/guides/DestinationPersonalTake";
import { freiburgGuide as guide } from "../../../lib/christmas/freiburg";
import { stringifyJsonLd } from "../../../lib/seo/jsonLd";

export const metadata: Metadata = {
  title: guide.title,
  description: guide.description,
  alternates: { canonical: guide.url },
  openGraph: {
    title: guide.title, description: guide.description, url: guide.url,
    images: [{ url: guide.hero.src, alt: guide.hero.alt }],
  },
};

export default function FreiburgChristmasPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebPage", name: guide.title, description: guide.description, url: guide.url,
        dateModified: guide.season.checkedOn, about: { "@type": "Place", name: "Freiburg im Breisgau, Germany" } },
      { "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.prowalktours.com" },
        { "@type": "ListItem", position: 2, name: "Christmas Markets", item: "https://www.prowalktours.com/christmas-markets" },
        { "@type": "ListItem", position: 3, name: "Freiburg", item: guide.url },
      ] },
    ],
  };
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: stringifyJsonLd(structuredData) }} />
    <div className="bg-[#faf9f5] pb-16 text-[#25382f]">
      <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-6">
        <nav aria-label="Breadcrumb" className="mb-5 flex flex-wrap gap-2 text-xs leading-6 text-[#526258]">
          <Link href="/" className="hover:underline">Home</Link><span aria-hidden="true">/</span>
          <Link href="/christmas-markets" className="hover:underline">Christmas Markets</Link><span aria-hidden="true">/</span>
          <span aria-current="page">Freiburg</span>
        </nav>
        <header className="relative isolate flex min-h-[380px] items-end overflow-hidden rounded-3xl bg-[#25382f] sm:min-h-[480px]">
          <Image src={guide.hero.src} alt={guide.hero.alt} fill priority sizes="(min-width: 1152px) 1104px, 100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
          <div className="relative px-6 py-8 text-white sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em]">Baden-Württemberg, Germany</p>
            <h1 className="mt-3 max-w-3xl font-serif text-4xl leading-tight sm:text-6xl">Freiburg Christmas Market</h1>
            <p className="mt-4 max-w-xl text-base leading-7">Explore the market squares and Old Town with me, from Turmstraße to Colombipark.</p>
          </div>
        </header>
        <nav aria-label="On this page" className="my-6 flex flex-wrap gap-2">
          {[["#my-visit", "My visit"], ["#dates", "Dates & hours"], ["#my-walk", "Explore my walk"], ["#getting-there", "Plan your visit"]].map(([href, label]) => <a key={href} href={href} className="inline-flex min-h-11 items-center rounded-full border border-[#cbd5ca] bg-white px-5 py-2 text-sm font-semibold hover:bg-[#edf1e9] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#176347]">{label}</a>)}
        </nav>
        <div id="my-visit" className="mt-10 scroll-mt-24">
          <DestinationPersonalTake headingId="my-visit-heading" title="Why I enjoyed Christmas in Freiburg" href="#my-walk">
            <p>{guide.personalTake}</p>
            <p>{guide.personalTakeMore}</p>
            <p className="text-sm">Filmed {guide.filmedOn} · {guide.weather}</p>
          </DestinationPersonalTake>
        </div>
        <section id="dates" aria-labelledby="dates-heading" className="mt-12 scroll-mt-24 rounded-3xl border border-[#dce1d6] bg-white p-6 sm:p-8">
          <div className="grid gap-6 md:grid-cols-2 md:gap-12">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#842d3f]">Plan for this season</p>
              <h2 id="dates-heading" className="mt-3 font-serif text-3xl">2026 dates & opening hours</h2>
              <p className="mt-4 text-lg font-semibold">{guide.season.dates}</p>
              <a href={guide.sources.official} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex min-h-11 items-center text-sm font-semibold text-[#176347] underline underline-offset-4">Check the organizer’s latest information ↗</a>
            </div>
            <div>
              <dl className="divide-y divide-[#dce1d6]">{guide.season.hours.map(row => <div key={row.label} className="flex flex-wrap justify-between gap-3 py-3"><dt>{row.label}</dt><dd className="font-semibold">{row.time}</dd></div>)}</dl>
              <p className="mt-4 text-sm leading-7 text-[#526258]">{guide.season.exceptions}</p>
              <p className="mt-3 text-xs text-[#526258]">I checked these details on 25 November 2026.</p>
            </div>
          </div>
        </section>
        <section id="my-walk" aria-labelledby="walk-heading" className="mt-12 scroll-mt-24">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#842d3f]">From my December 2025 walk</p>
          <h2 id="walk-heading" className="mt-3 font-serif text-3xl sm:text-4xl">Market squares & Old Town stops</h2>
          <p className="mt-4 max-w-3xl text-base leading-7 text-[#526258]">Here are the main places I explored. My filmed route includes return visits to some streets; use the map to see the path I took.</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a href={guide.filmedRouteUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center rounded-xl bg-[#176347] px-5 py-3 text-sm font-semibold text-white hover:bg-[#25382f]">Open my filmed route in Google Maps ↗</a>
            <a href={guide.sources.map} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center rounded-xl border border-[#cbd5ca] bg-white px-5 py-3 text-sm font-semibold hover:bg-[#edf1e9]">Official 2026 market map ↗</a>
          </div>
          <ol className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {guide.stops.map(stop => <li key={stop.name} className="rounded-2xl border border-[#dce1d6] bg-white p-6">
              <p className="text-xs leading-5 text-[#526258]">{stop.subtitle}</p>
              <h3 className="mt-2 font-serif text-2xl">{stop.name}</h3>
              <p className="mt-3 text-sm leading-7 text-[#526258]">{stop.text}</p>
            </li>)}
          </ol>
          <p className="mt-5 max-w-3xl text-sm leading-7 text-[#526258]">For this year’s complete stall locations, toilets and accessible tables, I’ve linked the organizer’s map above. It also marks the extra Christmas stalls on Kaiser-Joseph-Straße that open on Advent Sundays.</p>
        </section>
        <section id="getting-there" aria-labelledby="planning-heading" className="mt-12 scroll-mt-24 border-t border-[#dce1d6] pt-9">
          <h2 id="planning-heading" className="font-serif text-3xl">Plan your visit</h2>
          <div className="mt-5 space-y-3">
            {guide.visitDetails.map(detail => <details key={detail.title} className="group rounded-2xl border border-[#dce1d6] bg-white">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 rounded-2xl px-5 py-4 font-semibold hover:bg-[#edf1e9] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#176347] [&::-webkit-details-marker]:hidden">
                {detail.title}<span aria-hidden="true" className="shrink-0 text-xl text-[#176347] group-open:rotate-45">+</span>
              </summary>
              <div className="space-y-3 px-5 pb-5 text-sm leading-7 text-[#526258]">
                {detail.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
                <div className="flex flex-wrap gap-x-5">{detail.links.map(link => <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center font-semibold text-[#176347] underline underline-offset-4">{link.label} ↗</a>)}</div>
              </div>
            </details>)}
          </div>
          <div className="mt-5 grid gap-7 md:grid-cols-2">
            <div><h3 className="text-lg font-semibold">Getting to Freiburg</h3>
              <p className="mt-3 text-sm leading-7 text-[#526258]">Freiburg is on the Frankfurt–Karlsruhe–Basel rail corridor. I’ve linked the rail planner for current connections and the organizer’s arrival guide for parking and Park & Ride information.</p>
              <div className="mt-2 flex flex-wrap gap-x-5"><a href={guide.sources.trains} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center text-sm font-semibold text-[#176347] underline underline-offset-4">Plan a train journey ↗</a><a href={guide.sources.directions} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center text-sm font-semibold text-[#176347] underline underline-offset-4">Arrival & parking information ↗</a></div>
            </div>
            <div><h3 className="text-lg font-semibold">More from my Christmas market trip</h3>
              <p className="mt-3 text-sm leading-7 text-[#526258]">I also visited Basel and the Alsace towns on this trip. My other guides can help you plan the next part of your visit.</p>
              <div className="mt-2 flex flex-wrap gap-x-5">{[["basel", "Basel"], ["colmar", "Colmar"], ["strasbourg", "Strasbourg"]].map(([slug, name]) => <Link key={slug} href={`/christmas-markets/${slug}`} className="inline-flex min-h-11 items-center text-sm font-semibold text-[#176347] underline underline-offset-4">{name} →</Link>)}</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </>;
}
