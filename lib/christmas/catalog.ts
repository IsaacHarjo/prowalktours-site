import type { DiscoveryVideo, WorldTour } from "../tours/types";

export type ChristmasWalk = DiscoveryVideo & { filmedYear: number | null };
export type ChristmasFilters = { country: string; region: string; city: string; year: string; query: string };
export const emptyChristmasFilters: ChristmasFilters = { country: "", region: "", city: "", year: "", query: "" };
const normalize = (value: string) => value.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

export function buildChristmasCatalog(videos: DiscoveryVideo[], points: WorldTour[]): ChristmasWalk[] {
  const years = new Map(points.map((point) => [point.tourId, point.filmedYear]));
  return videos.filter((video) => video.themes.includes("christmas-market")).map((video) => ({
    ...video,
    filmedYear: years.get(video.id) ?? (video.filmingDates[0] ? Number(video.filmingDates[0].slice(0, 4)) : null),
  })).sort((a, b) => a.country.localeCompare(b.country) || a.region.localeCompare(b.region) || a.city.localeCompare(b.city) || (b.filmedYear ?? 0) - (a.filmedYear ?? 0) || a.siteTitle.localeCompare(b.siteTitle));
}

export function filterChristmasWalks(walks: ChristmasWalk[], filters: ChristmasFilters): ChristmasWalk[] {
  const words = normalize(filters.query).split(" ").filter(Boolean);
  return walks.filter((walk) => (!filters.country || walk.country === filters.country)
    && (!filters.region || walk.region === filters.region)
    && (!filters.city || walk.city === filters.city)
    && (!filters.year || String(walk.filmedYear) === filters.year)
    && words.every((word) => normalize([walk.siteTitle, walk.country, walk.region, walk.city, ...walk.landmarks, ...walk.keywords].join(" ")).includes(word)));
}

export const christmasHero = {
  src: "/strasbourg-christmas-market-evening-walk-2023/highlights/strasbourg-place-kleber.jpg",
  alt: "Christmas tree and crowds in Place Kléber, filmed in Strasbourg in 2023",
  caption: "Place Kléber, Strasbourg · filmed in 2023",
};

// Editorial journey records, separate from the reusable video inventory.
// 2022–2024: itinerary documents and filming folders supplied by Isaac. 2025: dated filming folders
// and Isaac's recollection. These are not transport or current-season schedules.
export const christmasJourneys = [
  {
    id: "winter-2022", title: "Budapest to Strasbourg", label: "The 2022 journey",
    description: "A Christmas filming journey through Budapest, Vienna, Prague and Germany, continuing to Basel and Strasbourg. Several markets on this trip were filmed in snow—a distinctive part of the 2022 archive.",
    note: "The stop order is supported by my trip records. Individual snowy walks and transport details still need to be checked before this becomes a day-by-day itinerary.",
    stops: [
      { city: "Budapest", country: "Hungary" }, { city: "Vienna", country: "Austria" },
      { city: "Prague", country: "Czech Republic" }, { city: "Dresden", country: "Germany" },
      { city: "Nuremberg", country: "Germany" }, { city: "Stuttgart", country: "Germany" },
      { city: "Basel", country: "Switzerland" }, { city: "Strasbourg", country: "France" },
    ],
  },
  {
    id: "germany-alsace-2023", title: "Cologne to Alsace", label: "The 2023 journey",
    description: "This filming journey connects Cologne and Aachen with Rothenburg ob der Tauber, then continues into Alsace through Strasbourg, Colmar and Riquewihr. I returned to Colmar for another daytime walk after filming in Riquewihr.",
    note: "This outline follows the recorded filming sequence, including the return to Colmar. Overnight stays and transport connections still need to be checked before adding a day-by-day itinerary.",
    stops: [
      { city: "Cologne", country: "Germany" }, { city: "Aachen", country: "Germany" },
      { city: "Rothenburg ob der Tauber", country: "Germany" },
      { city: "Strasbourg", country: "France" }, { city: "Colmar", country: "France" },
      { city: "Riquewihr", country: "France" }, { city: "Colmar", country: "France" },
    ],
  },
  {
    id: "dresden-esslingen-2024", title: "Dresden, Prague & southern Germany", label: "The 2024 journey",
    description: "Starting in Dresden, this Christmas filming journey continues to Prague, then through Nuremberg, Munich and Rothenburg ob der Tauber before finishing with Stuttgart and Esslingen.",
    note: "The filming records establish this sequence of destinations. Overnight bases, travel legs and time spent at each stop remain to be verified for a practical itinerary.",
    stops: [
      { city: "Dresden", country: "Germany" }, { city: "Prague", country: "Czech Republic" },
      { city: "Nuremberg", country: "Germany" }, { city: "Munich", country: "Germany" },
      { city: "Rothenburg ob der Tauber", country: "Germany" },
      { city: "Stuttgart", country: "Germany" }, { city: "Esslingen", country: "Germany" },
    ],
  },
  {
    id: "basel-alsace-2025", title: "Basel, Alsace & Freiburg", label: "The December 2025 filming route",
    description: "Arriving in the Basel / EuroAirport area, I filmed Basel and a series of Alsace towns, followed by Freiburg and Strasbourg. These destinations form the starting point for a future regional itinerary.",
    note: "This sequence follows my filming dates. Travel legs, overnight bases and realistic daily timings are still being verified.",
    stops: [
      { city: "Basel", country: "Switzerland" }, { city: "Kaysersberg", country: "France" },
      { city: "Ribeauvillé", country: "France" }, { city: "Riquewihr", country: "France" },
      { city: "Colmar", country: "France" }, { city: "Freiburg", country: "Germany" },
      { city: "Strasbourg", country: "France" },
    ],
  },
];
