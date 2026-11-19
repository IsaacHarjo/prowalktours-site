import Link from "next/link";
import ThumbnailImg from "../../../components/ThumbnailImg";
import { discoveryVideos } from "../../../lib/tours/server";

// Server-render every public walk so browsing and discovery don't depend on the map.
// Use the public projection: existing page folders alone do not establish availability.
const walks = discoveryVideos.filter(walk => walk.country === "Germany");
const cities = [...new Set(walks.map(walk => walk.city))].sort((a, b) => a.localeCompare(b));

export default function GermanyWalkList() {
  return <section id="walks" aria-labelledby="germany-walks-heading" className="scroll-mt-24 border-t border-[#eadfce] pt-10">
    <h2 id="germany-walks-heading" className="text-3xl font-bold">My walks in Germany</h2>
    <p className="mt-3 max-w-3xl text-[17px] leading-8 text-[#6c5b49]">Browse my {walks.length} published walks across {cities.length} cities. Open a walk for chapters and route information, or follow the YouTube link where I haven’t added a video page yet.</p>
    <nav aria-label="Jump to a German city" className="mt-5 flex flex-wrap gap-2">
      {cities.map((city, index) => <a key={city} href={`#germany-city-${index}`} className="inline-flex min-h-11 items-center rounded-full border border-[#d8c7b5] bg-white px-4 py-2 text-sm font-semibold hover:bg-[#f8f3ec] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#176347]">{city}</a>)}
    </nav>
    {cities.map((city, index) => <section key={city} id={`germany-city-${index}`} aria-labelledby={`germany-city-${index}-heading`} className="scroll-mt-24 pt-10">
      <h3 id={`germany-city-${index}-heading`} className="mb-5 text-2xl font-bold">{city}</h3>
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {walks.filter(walk => walk.city === city).sort((a, b) => (b.filmingDates[0] || "").localeCompare(a.filmingDates[0] || "") || a.siteTitle.localeCompare(b.siteTitle)).map(walk => {
          const external = walk.watchDestinationType === "youtube";
          return <li key={walk.id} className="flex" data-tour-id={walk.id}>
            <Link href={walk.watchHref} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} className="group flex w-full flex-col overflow-hidden rounded-2xl border border-[#eadfce] bg-white shadow-sm hover:border-[#bba893] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#176347]">
              <ThumbnailImg src={walk.thumbnail} alt="" className="aspect-video w-full object-cover" />
              <div className="flex flex-1 flex-col p-5">
                <h4 className="text-lg font-semibold leading-7 group-hover:underline">{walk.siteTitle}</h4>
                <p className="mt-3 text-sm leading-6 text-[#6c5b49]">{walk.city} · {walk.filmingMonthYear || "Filming date unknown"}</p>
                <p className="mt-1 text-sm leading-6 text-[#6c5b49]">{walk.videoType.replace(/-/g, " ")}{walk.durationLabel ? ` · ${walk.durationLabel}` : ""}</p>
                <span className="mt-auto pt-5 font-semibold text-[#176347]">{external ? "Watch on YouTube ↗" : "View walk →"}{external && <span className="sr-only"> (opens in a new tab)</span>}</span>
              </div>
            </Link>
          </li>;
        })}
      </ul>
    </section>)}
  </section>;
}
