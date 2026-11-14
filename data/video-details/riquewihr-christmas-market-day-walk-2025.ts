import tour from './riquewihr-christmas-market-day-walk-2025.json';
import routeFeatures from './riquewihr-christmas-market-day-walk-2025-route.json';
import type { VideoDetailRecord } from '../video-types';
import type { VisitorMapData } from '../../lib/guides/visitor-map-types';
import type { MapCoordinate } from '../../lib/guides/map-types';

export { tour as riquewihr2025Tour };
export const riquewihrChristmasMarketDayWalk2025Detail: VideoDetailRecord = {
  slug: tour.slug,
  heroEyebrow: 'Alsace, France · Filmed December 2025',
  heroTitle: tour.title,
  heroSubtitle: 'Inside the shops, cellars and courtyards',
  heroDescription: tour.description,
  routeMapDescription: 'Follow the route I filmed on 14 December 2025. The line comes from my map of this walk; indoor detours are shown in the video chapters.',
  licensingDescription: [
    'My footage includes the decorated streets, wine cellars, food courtyards, Dolder museum and Christmas market during my December 2025 visit.',
    'For a licensing request, send me the chapter or time range, intended use and delivery requirements. I can confirm the available footage and technical specifications for those shots.',
  ],
  highlights: tour.chapters.map(chapter => ({
    title: chapter.title, timeLabel: chapter.timeLabel, seconds: chapter.seconds,
    imageSrc: chapter.photo?.src ?? '', alt: chapter.photo?.alt ?? '', caption: chapter.title,
    description: chapter.description,
  })),
};

// Match only named points in the supplied filmed-route export. Do not borrow
// coordinates or ordering from the guide's different suggested itinerary.
const mapChapters: [string, number][] = [
  ['1. Start of the Walk', 1],
  ['Domaine Jung Gustave & Fils', 3], ['La cave a fromages', 4], ["Restaurant L'Ecurie", 5],
  ['Fortwenger LEBKUCHEN', 6], ['Le Comptoir des Authentics', 7], ['Kouglopf & Cie', 10],
  ['3. Sainte-Marguerite Protestant Church', 13], ['Maison Zimmer', 15],
  ['4. La Cour des Nobles', 16], ['5. La Cour Gourmande', 17], ['La Nougaterie de Riquewihr', 18],
  ['La Dime', 19], ['6. Dolder Tower & Square', 20], ['7. Fontaine de la Sinne', 25],
  ['8. La Porte Haute', 26], ['Féerie De Noël', 30], ['Les Cachotteries De Charlotte', 32],
  ['9. Marché de Noël - Christmas Market', 35], ['End of the Walk', 36],
];
const routeLine = routeFeatures.find(feature => feature.type === 'LineString');
if (!routeLine) throw new Error('Missing Riquewihr 2025 filmed route');
export const riquewihr2025FilmedMap: VisitorMapData = {
  city: 'Riquewihr', sourceUrl: tour.mapUrl, importedOn: '2026-11-13',
  routeKind: 'filmed', routeTitle: 'The route I filmed in 2025', routeLabel: 'Filmed route',
  defaultToItinerary: true,
  itinerary: {
    title: 'Follow my filmed walk',
    introduction: 'These mapped stops follow the order of my walk. Use the full chapter list for the indoor visits and other moments along the way.',
    steps: mapChapters.map(([, index]) => ({
      stopId: `riquewihr-2025-${index}`, title: tour.chapters[index].title,
      label: tour.chapters[index].timeLabel,
      text: tour.chapters[index].description ?? `Follow this part of my walk at ${tour.chapters[index].timeLabel}.`,
    })),
  },
  route: routeLine.coordinates as MapCoordinate[], stationApproach: [],
  routeDistanceNote: 'My recorded walk was 3.2 km, including indoor detours. The mapped street line is approximate.',
  stops: mapChapters.map(([name, index]) => {
    const point = routeFeatures.find(feature => feature.name.trim() === name);
    if (!point) throw new Error(`Missing filmed-route point: ${name}`);
    const chapter = tour.chapters[index];
    return {
      id: `riquewihr-2025-${index}`, name: chapter.title,
      shortName: chapter.title, category: index === 35 ? 'market' : 'photo', icon: index === 35 ? 'market' : 'camera',
      marketNumber: index === 35 ? 1 : undefined,
      coordinates: point.coordinates[0] as MapCoordinate,
      text: chapter.description ?? `Follow this part of my walk at ${chapter.timeLabel}.`,
      photo: chapter.photo,
      watch: [{ label: `Watch at ${chapter.timeLabel}`, href: `/videos/${tour.slug}?t=${chapter.seconds}#watch` }],
    };
  }),
};
