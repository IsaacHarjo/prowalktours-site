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
    description: "My 2022 trip took me through Budapest, Vienna, Prague and Germany, then on to Basel and Strasbourg. There was snow at several of the markets I filmed that year.",
    note: "This is the order I visited the towns. I’m still working through my trip notes to add the travel details you’d need to follow the route yourself.",
    stops: [
      { city: "Budapest", country: "Hungary" }, { city: "Vienna", country: "Austria" },
      { city: "Prague", country: "Czech Republic" }, { city: "Dresden", country: "Germany" },
      { city: "Nuremberg", country: "Germany" }, { city: "Stuttgart", country: "Germany" },
      { city: "Basel", country: "Switzerland" }, { city: "Strasbourg", country: "France" },
    ],
  },
  {
    id: "germany-alsace-2023", title: "Cologne to Alsace", label: "The 2023 journey",
    description: "From Cologne and Aachen, I continued to Rothenburg ob der Tauber, then Strasbourg, Colmar and Riquewihr. After filming in Riquewihr, I returned to Colmar for another daytime walk.",
    note: "Colmar appears twice because I went back to film there. I’ll add where I stayed and how I traveled between towns as I work through my notes.",
    stops: [
      { city: "Cologne", country: "Germany" }, { city: "Aachen", country: "Germany" },
      { city: "Rothenburg ob der Tauber", country: "Germany" },
      { city: "Strasbourg", country: "France" }, { city: "Colmar", country: "France" },
      { city: "Riquewihr", country: "France" }, { city: "Colmar", country: "France" },
    ],
  },
  {
    id: "dresden-esslingen-2024", title: "Dresden, Prague & southern Germany", label: "The 2024 journey",
    description: "This trip started in Dresden and continued to Prague, Nuremberg, Munich and Rothenburg ob der Tauber. Stuttgart and Esslingen were the last two stops.",
    note: "The towns are in the order I filmed them. Accommodation, travel connections and time at each stop will follow as I work through my trip notes.",
    stops: [
      { city: "Dresden", country: "Germany" }, { city: "Prague", country: "Czech Republic" },
      { city: "Nuremberg", country: "Germany" }, { city: "Munich", country: "Germany" },
      { city: "Rothenburg ob der Tauber", country: "Germany" },
      { city: "Stuttgart", country: "Germany" }, { city: "Esslingen", country: "Germany" },
    ],
  },
  {
    id: "basel-alsace-2025", title: "Basel, Alsace & Freiburg", label: "The December 2025 filming route",
    description: "I arrived in the Basel / EuroAirport area and filmed Basel and several Alsace towns, followed by Freiburg and Strasbourg. Watch the walks to help choose which places to include in your own trip.",
    note: "These stops follow my filming dates. I’m still adding where I stayed, how I got around and how much time to allow for each town.",
    stops: [
      { city: "Basel", country: "Switzerland" }, { city: "Kaysersberg", country: "France" },
      { city: "Ribeauvillé", country: "France" }, { city: "Riquewihr", country: "France" },
      { city: "Colmar", country: "France" }, { city: "Freiburg", country: "Germany" },
      { city: "Strasbourg", country: "France" },
    ],
  },
];
