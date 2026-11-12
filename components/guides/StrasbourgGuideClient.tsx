"use client";

import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import type { ChristmasWalk } from '../../lib/christmas/catalog';
import type { OrientationPlace } from '../../lib/guides/types';
import { youtubeIdFromUrl } from '../../lib/tours/core';
import { strasbourgVisitorMap } from '../../lib/christmas/strasbourg-visitor-map';
import DestinationPersonalTake from './DestinationPersonalTake';
import GuideSectionHeading from './GuideSectionHeading';
import GuideWalkVideos from './GuideWalkVideos';
import GuideFaqs from './GuideFaqs';
import GuideDisclosure from './GuideDisclosure';
import CheckedNote from './CheckedNote';
import GuideNavFade, { crumbClass, navScrollPad } from './GuideNavFade';

const VisitorRouteMap = dynamic(() => import('./VisitorRouteMap'), { ssr: false });
const AlsaceOrientation = dynamic(() => import('./AlsaceOrientation'), { ssr: false });
const width = 'mx-auto max-w-7xl px-5 sm:px-8 lg:px-10';
const linkStyle = 'inline-flex min-h-11 items-center font-semibold text-[#176347] underline underline-offset-4';
const official = 'https://noel.strasbourg.eu/en/';
const faq = `${official}frequently-asked-questions`;
const cts = 'https://www.cts-strasbourg.eu/en/home/';
// Date the official FAQ, market and CTS pages were last checked.
const checkedOn = '2026-11-11';
const photoBase = '/strasbourg-christmas-guide';
const markets = [
  ['Autour de la Cathédrale', 'Place de la Cathédrale & Place du Château'],
  ['Le Quai des Délices', 'Terrasse Rohan & Place du Marché-aux-Poissons'],
  ['Chrìstkìndelsmärik', 'Place Broglie'],
  ['Au pied du Grand Sapin', 'Place Kléber'],
  ['Le marché du Carré d’Or', 'Place du Temple Neuf'],
  ['La Petite France', 'Place Benjamin Zix & Place Saint-Thomas'],
  ['Le marché OFF', 'Place Grimmeissen'],
  ['Les Irréductibles Petits Producteurs d’Alsace', 'Square Louise Weiss'],
];

export default function StrasbourgGuideClient({ walks, orientationPlaces }: { walks: ChristmasWalk[]; orientationPlaces: OrientationPlace[] }) {
  const videoWalks = walks.flatMap(walk => { const youtubeId = youtubeIdFromUrl(walk.youtubeUrl); return youtubeId ? [{ ...walk, youtubeId }] : []; });
  return <div className="bg-[#fcfaf7] text-[#25382f] [--guide-scroll-offset:10rem]">
    <div className={width + ' py-5'}><nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm text-[#657069]"><Link href="/" className={crumbClass}>Home</Link><span aria-hidden="true">/</span><Link href="/christmas-markets" className={crumbClass}>Christmas Markets</Link><span aria-hidden="true">/</span><span aria-current="page">Strasbourg</span></nav></div>
    <nav aria-label="In this guide" className="sticky top-[65px] z-40 border-b border-[#dce1d6] bg-[#fcfaf7]/95 shadow-sm backdrop-blur"><div className={`${width} ${navScrollPad} flex gap-2 overflow-x-auto overscroll-x-contain py-3 sm:gap-3 lg:grid lg:grid-cols-5`}>{[['explore', 'Explore the walk'], ['dates', '2026 dates'], ['getting-there', 'Plan the trip'], ['transport', 'Trams & parking'], ['watch-walks', 'Watch my walks']].map(([id, title]) => <a key={id} href={`#${id}`} className="flex min-h-11 shrink-0 items-center justify-center whitespace-nowrap rounded-xl bg-[#25382f] px-4 py-2 text-center text-sm font-semibold leading-6 text-white transition-colors hover:bg-[#176347] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#176347] lg:min-h-14 lg:px-3 lg:py-3 lg:text-base">{title}</a>)}</div><GuideNavFade /></nav>
    <header className={width + ' pt-5'}><div className="relative isolate flex min-h-[420px] items-end overflow-hidden rounded-3xl bg-[#25382f] lg:min-h-[520px]">
      <Image src={`${photoBase}/hero.webp`} alt="My December 2025 view of Strasbourg Cathedral above the decorated houses of Rue Mercière" fill priority sizes="(min-width: 1280px) 1200px, 100vw" className="object-cover" />
      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/25 to-transparent" /><div className="relative max-w-3xl p-6 text-white sm:p-10"><p className="text-xs font-semibold uppercase tracking-[0.2em]">Alsace, France · My 2026 guide</p><h1 className="mt-3 font-serif text-5xl sm:text-7xl">Christmas in Strasbourg</h1><p className="mt-5 max-w-xl leading-7">From the cathedral markets to the canals of Petite France, follow my walk through the city’s Christmas streets and plan a visit of your own.</p><a href="#explore" className="mt-5 inline-flex min-h-12 items-center gap-3 rounded-full border border-white/70 bg-black/60 px-5 py-3 font-semibold text-white hover:bg-black/80">Explore the walk ↓</a></div>
    </div></header>
    <div className={width + ' pb-9 pt-5 sm:pb-12 sm:pt-7'}><DestinationPersonalTake portrait="/images/isaac/portrait-camera.webp" filmingPhoto={`${photoBase}/cathedral-market.webp`} photoAlt="The stalls beside the cathedral on my December 2025 visit" headingId="why-strasbourg" title="Why I keep coming back to Strasbourg" href="#explore">
      <p>Strasbourg has always been one of my favourite Christmas markets. It has the half-timbered houses, the water, the cathedral and markets spread through the old town—but there is also a whole city to explore between the stalls. I can step away from the busiest squares and still feel like I am part of it all.</p>
      <p>I filmed here in 2022, 2023 and again in 2025. My advice is to give the streets as much time as the markets, and save some of your visit for after dark. The decorations, the big tree on Place Kléber and the water around Petite France are worth coming back through a second time.</p>
    </DestinationPersonalTake></div>

    <section id="explore" aria-labelledby="explore-heading" className="scroll-mt-[var(--guide-scroll-offset)] border-y border-[#e1e3d9] bg-white"><div className={width + ' py-14 sm:py-16'}>
      <GuideSectionHeading id="explore-heading" eyebrow="Explore Strasbourg on foot" title="Take a walk through Strasbourg’s Christmas markets" icon="walking" />
      <p className="mt-4 hidden max-w-3xl leading-7 text-[#526258] lg:block">Start at Place Gutenberg and follow the loop through the cathedral markets, Place Kléber and Petite France. Coming from the station? Join at Kléber instead. From the south, Pont du Corbeau makes a natural entrance.</p>
      <p className="mt-4 text-sm leading-7 text-[#526258] lg:hidden">A full day · Daily, 27 November–24 December 2026 · Start at Place Gutenberg, or join at Kléber or Pont du Corbeau.</p>
      <dl className="mt-6 hidden gap-3 lg:grid lg:grid-cols-3">{[{ label: 'How much time', value: 'A full day' }, { label: 'When to visit', value: 'Daily, 27 November–24 December 2026' }, { label: 'Where to start', value: 'Place Gutenberg' }].map(item => <div key={item.label} className="rounded-xl bg-[#eaf0e8] px-5 py-4"><dt className="text-xs font-semibold uppercase tracking-wide text-[#526258]">{item.label}</dt><dd className="mt-1 font-semibold">{item.value}</dd></div>)}</dl>
      <p className="mt-5 text-sm leading-7 text-[#526258]">Choose a stop for my notes and use Next stop to follow the itinerary. The main loop is about 6 km; station approaches and the two optional extensions are extra. Their controls are inside the map.</p>
      <VisitorRouteMap data={strasbourgVisitorMap} />
      <div className="mt-8 grid gap-5 md:grid-cols-2"><aside className="rounded-2xl border border-[#dce1d6] bg-[#edf1ed] p-6 sm:p-8"><h3 className="font-serif text-2xl">Only a few hours?</h3><p className="mt-3 leading-7 text-[#526258]">I would concentrate on the cathedral streets, the Grand Sapin and Petite France. Leave out the Broglie detour and optional loops. That is the choice I made for my shorter evening walk in 2025 so I could enjoy more of the town before it was completely dark.</p></aside><aside className="rounded-2xl border border-[#dce1d6] bg-[#fcfaf7] p-6 sm:p-8"><h3 className="font-serif text-2xl">Stay for the lights</h3><p className="mt-3 leading-7 text-[#526258]">I started my 2025 evening walk before sunset and watched the lights come on as I went. If you can, see the cathedral streets in daylight and return after dark. I particularly liked Pâtisserie Christian’s decorated façade and the views around the water.</p></aside></div>
      <div className="mt-6"><GuideDisclosure title="Eight markets, spread across eleven locations"><p className="mb-4 text-sm leading-7 text-[#526258]">Some official market names cover two squares. I have included the square names on the walking map so you can tell the stops apart.</p><dl className="grid gap-x-8 gap-y-5 sm:grid-cols-2">{markets.map(([name, place]) => <div key={name}><dt className="font-semibold">{name}</dt><dd className="mt-1 text-sm text-[#526258]">{place}</dd></div>)}</dl><a href={`${official}markets`} target="_blank" rel="noreferrer" className={linkStyle + ' mt-5 text-sm'}>Official market locations ↗</a><CheckedNote on={checkedOn} /></GuideDisclosure></div>
    </div></section>

    <section id="dates" aria-labelledby="dates-heading" className="scroll-mt-40 border-b border-[#dce1d6] bg-white"><div className={width + ' py-12 sm:py-16'}>
      <GuideSectionHeading id="dates-heading" eyebrow="Plan a journey of your own" title="Strasbourg Christmas market essentials" icon="planning" />
      <div className="mt-7 overflow-hidden rounded-2xl border border-[#dce1d6] lg:grid lg:grid-cols-[1fr_1.2fr]"><div className="bg-[#713b42] p-6 text-white sm:p-8"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#f4e4b8]">2026 · Open every day</p><h3 className="mt-3 font-serif text-3xl">27 November–24 December</h3><p className="mt-4 leading-7 text-[#fff4ed]">Plan your visit before Christmas Day if you want to browse the stalls. They close on Christmas Eve and do not continue through New Year.</p></div><div className="bg-[#fcfaf7] p-6 sm:p-8"><dl className="divide-y divide-[#dce1d6] text-sm leading-7"><div className="pb-4"><dt className="font-semibold">Regular hours, Monday–Sunday</dt><dd>11am–9pm</dd></div><div className="py-4"><dt className="font-semibold">Opening Friday, 27 November</dt><dd>2pm–9pm</dd></div><div className="pt-4"><dt className="font-semibold">Christmas Eve, 24 December</dt><dd>11am–6pm</dd></div></dl></div></div>
      <a className={linkStyle + ' mt-5 text-sm'} href={faq} target="_blank" rel="noreferrer">Official 2026 dates & hours ↗</a><CheckedNote on={checkedOn} note="Cathedral visits, shops and individual events have separate schedules." />
    </div></section>

    <section id="getting-there" aria-labelledby="trip-heading" className={width + ' scroll-mt-40 py-12 sm:py-16'}>
      <GuideSectionHeading id="trip-heading" eyebrow="Make the most of your visit" title="Plan the trip" icon="region" />
      <p className="mt-4 max-w-3xl leading-7 text-[#526258]">Strasbourg is a bigger outing than the vineyard villages. I would give it a full day if you want the markets, the cathedral and an evening walk, rather than squeezing it into a day of several towns.</p>
      <div className="mt-7 grid gap-5 md:grid-cols-3">{[
        ['A route you can join anywhere', 'The walk returns to Place Gutenberg. If you arrive near Kléber or Pont du Corbeau, join there and follow the loop. Leave extra time for meals, shops and busy squares.'],
        ['Crowds & quieter corners', 'Rue du Maroquin and the cathedral area were especially busy on my visit. I found room to pause in Place du Marché Neuf and on streets away from the main stalls. You do not have to see everything in one visit.'],
        ['Steps & winter surfaces', 'Expect cobbled streets and crowds. The lower path near Pont Saint-Martin involves steps, and the optional extensions add distance. The full route is not a verified step-free itinerary; stay at street level if needed.'],
      ].map(([title, text]) => <article key={title} className="rounded-2xl border border-[#dce1d6] bg-white p-6"><h3 className="text-xl font-semibold">{title}</h3><p className="mt-3 text-sm leading-7 text-[#526258]">{text}</p></article>)}</div>
      <div className="mt-8 overflow-hidden rounded-2xl border border-[#dce1d6] bg-white md:grid md:grid-cols-2"><Image src={`${photoBase}/cathedral-interior.webp`} alt="My first visit inside Strasbourg Cathedral in December 2025" width={1920} height={1081} sizes="(min-width: 768px) 50vw, 100vw" className="h-full w-full object-cover" /><div className="p-6 sm:p-8"><h3 className="font-serif text-2xl">Leave time to go inside the cathedral</h3><p className="mt-3 text-sm leading-7 text-[#526258]">After filming Strasbourg on earlier trips, I finally went inside in 2025. I arrived in the morning and found very little queue. The astronomical clock and the interior deserve time of their own, so I would plan this separately from browsing the market stalls.</p><a href="https://www.cathedrale-strasbourg.fr/" target="_blank" rel="noreferrer" className={linkStyle + ' mt-3 text-sm'}>Cathedral visitor information ↗</a></div></div>
      <div className="mt-6"><GuideDisclosure title="Toilets, information points & a quick practical tip"><p className="text-sm leading-7 text-[#526258]">Use the official event map or Ici Toilettes to find toilets, including accessible facilities. Visitor information points are at the station square and Place Kléber. Drinks use a €1 returnable cup deposit: return the cup at a drinks stall or use a charity collection point.</p><a href={faq} target="_blank" rel="noreferrer" className={linkStyle + ' mt-3 text-sm'}>Official visitor information ↗</a><CheckedNote on={checkedOn} /></GuideDisclosure></div>
      <p className="mb-5 mt-10 max-w-3xl leading-7 text-[#526258]">Planning more of Alsace? Use the regional map to see where Strasbourg sits in relation to Colmar and the vineyard villages.</p><AlsaceOrientation focusCity="Strasbourg" places={orientationPlaces} />
    </section>

    <section id="transport" aria-labelledby="transport-heading" className="scroll-mt-40 border-y border-[#dce1d6] bg-white"><div className={width + ' py-14 sm:py-16'}><GuideSectionHeading id="transport-heading" eyebrow="Getting into the old town" title="Trams, trains & parking" icon="planning" />
      <p className="mt-4 max-w-3xl leading-7 text-[#526258]">Choose how to reach the centre before setting out. Once you are there, this is a walk through the streets and squares, with several places to join the route.</p>
      <div className="mt-7 grid gap-5 lg:grid-cols-3"><article className="rounded-2xl border border-[#dce1d6] bg-[#fcfaf7] p-6"><h3 className="text-xl font-semibold">Arriving by train</h3><p className="mt-3 text-sm leading-7 text-[#526258]">My mapped approaches from Gare Centrale are about 0.9 km to Place Kléber or 1.2 km to Place Gutenberg. Allow roughly 15–25 minutes on foot, with longer for crowds and stops. Both approaches are on the walking map.</p><a href="#explore" className={linkStyle + ' mt-3 text-sm'}>See the station approaches ↑</a></article>
      <article className="rounded-2xl border border-[#dce1d6] bg-[#fcfaf7] p-6"><h3 className="text-xl font-semibold">Park-and-ride & trams</h3><p className="mt-3 text-sm leading-7 text-[#526258]">CTS park-and-ride lets you leave the car outside the centre and continue by tram. The official market FAQ gives €4.20 per day, including a return tram ticket for everyone in the car. Check your return journey and Christmas service notices; central tram stops can have seasonal restrictions.</p><a href={faq} target="_blank" rel="noreferrer" className={linkStyle + ' mt-3 text-sm'}>Park-and-ride price (official FAQ) ↗</a><a href={cts} target="_blank" rel="noreferrer" className={linkStyle + ' text-sm'}>CTS routes, tickets & live notices ↗</a><CheckedNote on={checkedOn} /></article>
      <article className="rounded-2xl border border-[#dce1d6] bg-[#fcfaf7] p-6"><h3 className="text-xl font-semibold">Where I parked in 2025</h3><p className="mt-3 text-sm leading-7 text-[#526258]">I used Parking Austerlitz on Rue des Bœufs. From there, cross Pont du Corbeau and enter the Christmas streets near the riverside market. That was my experience in 2025; check access and spaces before relying on a central garage.</p><a href={faq} target="_blank" rel="noreferrer" className={linkStyle + ' mt-3 text-sm'}>Traffic & parking rules (official FAQ) ↗</a><CheckedNote on={checkedOn} /></article></div>
      <p className="mt-5 max-w-3xl text-sm leading-7 text-[#526258]">The Grande Île has Christmas traffic controls. Follow current access instructions and on-site signs. Use the live CTS planner for your travel date rather than assuming the normal network map shows every available stop.</p>
    </div></section>

    <GuideWalkVideos city="Strasbourg" walks={videoWalks} introduction="See Strasbourg in daylight and after dark through my published 2022 and 2023 walks. The snowy 2022 visit is still a favourite of mine. Put on your headphones for the sounds of the streets and markets; the suggested route above also draws on my return in 2025." />
    <GuideFaqs city="Strasbourg" questions={[
      { question: 'How many Christmas markets are there?', answer: 'The official website groups them into eight markets across eleven locations. Some names cover more than one square, so the walking map includes each square name to make the stops easier to recognise.', source: { label: 'Official market locations', href: `${official}markets` } },
      { question: 'Do I need to follow the whole route?', answer: 'No. I have drawn a loop so you can join at Gutenberg, Kléber or near Pont du Corbeau. For a shorter visit, I would focus on the cathedral streets, the tree on Place Kléber and Petite France, leaving out Broglie and the optional extensions.' },
      { question: 'Should I visit during the day or after dark?', answer: 'If you can, do both. I like being able to see the buildings in daylight and then coming back through the same streets with the lights on. My 2025 evening walk began before sunset, which gave me that transition without waiting around in one place.' },
      { question: 'Does the walk include going inside the cathedral?', answer: 'The suggested route passes the cathedral, but visiting inside is a separate stop. I went inside for the first time in 2025 and included that footage in my daytime film. Check current visiting arrangements, and allow extra time for entry and the astronomical clock.' },
      { question: 'Should I add Barrage Vauban?', answer: 'It is an optional extension if you have the time and energy. I turned back before it on my 2025 evening walk to stay closer to the Christmas markets. On my 2022 visit, the rooftop was already closed when I arrived, so check access before making the detour for the viewpoint.' },
      { question: 'Are these photos and walks from 2026?', answer: 'My visits were in 2022, 2023 and 2025; I did not film Strasbourg in 2024. The photographs and personal notes show those visits. The dates and hours in the planning section are for the 2026 market, so decorations and individual stalls may look different.' },
    ]} />
    <section className={width + ' py-14 sm:py-16'} aria-labelledby="nearby-heading"><GuideSectionHeading id="nearby-heading" eyebrow="Keep exploring" title="More Christmas walks around Alsace" icon="explore" /><div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{[['Colmar', 'colmar', 'Christmas squares and the streets between them.'], ['Kaysersberg', 'kaysersberg', 'Half-timbered houses and the Weiss riverside.'], ['Ribeauvillé', 'ribeauville', 'A medieval Christmas market on two weekends.'], ['Riquewihr', 'riquewihr', 'Decorated streets, shops and courtyards.']].map(([city, slug, text]) => <Link key={slug} href={`/christmas-markets/${slug}`} className="rounded-2xl border border-[#dce1d6] bg-white p-6 hover:border-[#176347]"><h3 className="text-xl font-semibold">{city}</h3><p className="mt-3 text-sm leading-7 text-[#657069]">{text}</p><span className={linkStyle + ' mt-3 text-sm'}>Read the 2026 guide →</span></Link>)}</div>
      <div className="mt-8"><GuideDisclosure title="My Christmas filming visits to Strasbourg"><p className="max-w-3xl text-sm leading-7 text-[#526258]">I visited in 2022 and 2023, then returned with Bobby on 17 December 2025 as the last stop of our Alsace Christmas trip. We drove up from Westhalten and parked at Austerlitz. After visiting the cathedral, I filmed a daytime walk, a 360° walk and an evening walk. That evening I left out Broglie and spent more time in Petite France. This suggested route brings those visits together; it is not the exact route of any one film.</p></GuideDisclosure></div>
      <div className="mt-10 flex flex-wrap justify-between gap-4 border-t border-[#dce1d6] pt-5"><Link href="/christmas-markets" className={linkStyle}>← All Christmas destinations</Link><Link href="/licensing" className={linkStyle}>License footage from the walks →</Link></div>
    </section>
  </div>;
}
