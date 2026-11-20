import Link from "next/link";
import ThumbnailImg from "../../../components/ThumbnailImg";
import { italyWalks } from "./walks";
import ItalyWalkFilters from "./ItalyWalkFilters";

// Server-render every public walk so browsing and discovery don't depend on the map.
// Use the public projection: existing page folders alone do not establish availability.
const walks = italyWalks.map(walk => ({ ...walk, destination: walk.city === "Anacapri" ? "Capri" : walk.city }));
const cities = [...new Set(walks.map(walk => walk.destination))].sort((a, b) => a.localeCompare(b));
const groups = cities.flatMap(city => [...new Set(walks.filter(walk => walk.destination === city).map(walk => walk.region))].sort().map(region => ({ city, region, searchText: [city, ...walks.filter(walk => walk.destination === city).map(walk => walk.city)].join(" "), count: walks.filter(walk => walk.destination === city && walk.region === region).length })));

export default function ItalyWalkList() {
  return <section id="walks" aria-labelledby="italy-walks-heading" className="scroll-mt-24 border-t border-[#eadfce] pt-10">
    <h2 id="italy-walks-heading" className="text-3xl font-bold">My walks in Italy</h2>
    <p className="mt-3 max-w-3xl text-[17px] leading-8 text-[#6c5b49]">Browse my {walks.length} published tours across {cities.length} destinations. Choose a region or search for a city below. Open a walk for chapters and route information, or follow the YouTube link where I haven’t added a video page yet.</p>
    <ItalyWalkFilters groups={groups}>
    {groups.map(({ city, region }, index) => <section key={`${city}/${region}`} id={`italy-city-${index}`} aria-labelledby={`italy-city-${index}-heading`} className="scroll-mt-24 pt-10">
      <h3 id={`italy-city-${index}-heading`} className="text-2xl font-bold">{city}</h3>
      <p className="mb-5 mt-1 text-sm text-[#6c5b49]">{region}</p>
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {walks.filter(walk => walk.destination === city && walk.region === region).sort((a, b) => (b.filmingDates[0] || "").localeCompare(a.filmingDates[0] || "") || a.siteTitle.localeCompare(b.siteTitle)).map(walk => {
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
    </ItalyWalkFilters>
  </section>;
}
