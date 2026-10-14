"use client";

import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import type { ChristmasWalk } from "../../lib/christmas/catalog";
import type { OrientationPlace } from "../../lib/guides/types";
import { christmasMarketHref } from "../../lib/christmas/guide-links";
import CompactWalkList from "./CompactWalkList";

const AlsaceOrientation = dynamic(() => import("./AlsaceOrientation"), {
  ssr: false,
  loading: () => <div className="mt-8 flex min-h-[400px] items-center justify-center rounded-3xl bg-[#edf1ed] text-sm text-[#657069]" role="status">Loading the regional overview…</div>,
});

export default function ChristmasMarketPreviewClient({ city, country, hero, walks, orientationPlaces }: { city: string; country: string; hero: string; walks: ChristmasWalk[]; orientationPlaces: OrientationPlace[] }) {
  return <div className="bg-[#faf9f5] pb-20 text-[#25382f]">
    <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-6">
      <nav aria-label="Breadcrumb" className="flex flex-wrap gap-2 text-xs leading-6 text-[#657069]">
        <Link href="/" className="hover:underline">Home</Link><span aria-hidden="true">/</span>
        <Link href="/christmas-markets" className="hover:underline">Christmas Markets</Link><span aria-hidden="true">/</span><span aria-current="page">{city}</span>
      </nav>
      <nav aria-label="Alsace and Basel Christmas market guides" className="my-5 flex flex-wrap gap-2">
        {["Colmar", "Ribeauvillé", "Kaysersberg", "Riquewihr", "Strasbourg", "Basel"].map(town => <Link key={town} href={christmasMarketHref(town)!} aria-current={town === city ? "page" : undefined}
          className={`inline-flex min-h-11 items-center rounded-full border px-5 py-2 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#176347] ${town === city ? "border-[#176347] bg-[#176347] text-white" : "border-[#cbd5ca] bg-white hover:bg-[#edf1e9]"}`}>{town}</Link>)}
      </nav>
      <header className="relative isolate flex min-h-[340px] items-end overflow-hidden rounded-3xl bg-[#25382f] sm:min-h-[420px]">
        <Image src={hero} alt={`Christmas in ${city}, from my walking tour`} fill priority sizes="(min-width: 1152px) 1104px, 100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
        <div className="relative px-6 py-8 text-white sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/85">{country === "France" ? "Alsace, France" : country}</p>
          <h1 className="mt-3 font-serif text-4xl leading-tight sm:text-6xl">Christmas in {city}</h1>
          <p className="mt-4 max-w-xl text-sm leading-7 sm:text-base">Explore the market and surrounding streets through my walking tours.</p>
        </div>
      </header>
      <section id="market-films" aria-labelledby="market-films-heading" className="mx-auto mt-10 max-w-3xl scroll-mt-24">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#657069]">Watch the walks</p>
        <h2 id="market-films-heading" className="mt-3 font-serif text-3xl">See {city} at Christmas</h2>
        <p className="mt-4 text-sm leading-7 text-[#657069]">I’m working on a guide to help you plan a visit. In the meantime, you can watch my walks below. The year beside each video tells you when I filmed it.</p>
        <div className="mt-5"><CompactWalkList walks={walks} /></div>
        <Link href="/christmas-markets/colmar#getting-there" className="mt-6 inline-flex min-h-11 items-center text-sm font-semibold text-[#176347] underline underline-offset-4">Back to the Colmar guide & regional map →</Link>
      </section>
      <section id="getting-there" aria-labelledby="region-heading" className="mt-14 scroll-mt-24">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#657069]">Find your bearings</p>
        <h2 id="region-heading" className="mt-3 font-serif text-3xl">{city} on the map</h2>
        <AlsaceOrientation key={city} focusCity={city} places={orientationPlaces} />
      </section>
    </div>
  </div>;
}
