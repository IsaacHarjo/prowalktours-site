import type { VisitorMapData, VisitorMapStop } from '../guides/visitor-map-types';
import type { MapCoordinate } from '../guides/map-types';
import type { GuidePhoto } from '../guides/types';
import { withWatchTimestamp } from '../tours/links';
import source from './nuremberg-route.json';

// The route I filmed, not a separately planned visitor route. Geometry, stop
// positions and timestamps come from my four public My Maps for the 2022 and
// 2024 walks (scripts/prepare-nuremberg-route.cjs). Stop text reuses the
// highlight descriptions already published on those walk pages.

type WalkKey = 'day2024' | 'evening2024' | 'day2022' | 'evening2022';
const walkLabels: Record<WalkKey, string> = {
  day2024: '2024 daytime walk', evening2024: '2024 evening walk', day2022: '2022 daytime walk', evening2022: '2022 evening walk',
};
const walkSlug = Object.fromEntries(source.walks.map(walk => [walk.key, walk.slug])) as Record<WalkKey, string>;
const timeLabel = (seconds: number) => {
  const h = Math.floor(seconds / 3600), m = Math.floor(seconds % 3600 / 60), s = seconds % 60;
  return h ? `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}` : `${m}:${String(s).padStart(2, '0')}`;
};

// Stills from my walks (1280×720 frames) and photos from my visits.
const still = (walk: WalkKey, file: string, alt: string, year: number): GuidePhoto => ({ src: `/${walkSlug[walk]}/highlights/${file}`, alt, year, width: 1280, height: 720 });
const photo = (file: string, alt: string, year: number): GuidePhoto => ({ src: `/nuremberg-christmas-guide/${file}.webp`, alt, year, width: 1600, height: 900 });

type StopText = { name: string; shortName: string; market?: boolean; icon?: VisitorMapStop['icon']; text: string; photos?: GuidePhoto[] };
const stopText: Record<string, StopText> = {
  'fleischbrucke': { name: 'Fleischbrücke', shortName: 'Fleischbrücke', icon: 'start', text: 'The Renaissance Fleischbrücke in winter daylight reveals the full elegance of its single stone arch — modelled on Venice’s Rialto Bridge and completed in 1598, it remains one of Nuremberg’s finest structures.', photos: [still('day2024', 'nuremberg-fleischbrucke.jpg', 'Fleischbrücke Renaissance bridge over the Pegnitz River in Nuremberg in winter daylight 2024', 2024)] },
  'hauptmarkt': { name: 'Christkindlesmarkt — Hauptmarkt', shortName: 'Hauptmarkt', market: true, text: 'The Christkindlesmarkt spreads across Hauptmarkt — the red-and-white striped stalls, the golden Schöner Brunnen and the Frauenkirche all visible at once.', photos: [photo('hauptmarkt-snow', 'Snow-covered Christmas market stalls on Hauptmarkt in front of the Frauenkirche, 2022', 2022), still('day2024', 'nuremberg-hauptmarkt-christmas-market.jpg', 'Nuremberg Hauptmarkt Christmas market in daytime 2024 with striped stalls and Frauenkirche backdrop', 2024)] },
  'schoner-brunnen': { name: 'Schöner Brunnen', shortName: 'Schöner Brunnen', text: 'In daylight the Schöner Brunnen’s 40 carved figures are visible in full detail — saints, prophets and secular rulers arranged in tiers around the Gothic spire that has watched over Hauptmarkt since 1396.', photos: [photo('schoner-brunnen', 'The Schöner Brunnen fountain beside the Christmas market, with the Frauenkirche behind', 2022), still('day2024', 'nuremberg-schoner-brunnen.jpg', 'Schöner Brunnen Gothic fountain on Hauptmarkt in Nuremberg in winter daylight 2024 with carved figures', 2024)] },
  'original-regional': { name: 'Original Regional Market', shortName: 'Regional Market', market: true, text: 'The Original Regional Market presents Franconian food culture — local farmers and producers selling smoked meats, artisan cheeses and regional crafts in a corner of the wider market.', photos: [still('day2024', 'nuremberg-original-regional-market.jpg', 'Original Regional Christmas market in Nuremberg 2024 with Franconian local food and craft stalls by day', 2024)] },
  'st-sebaldus': { name: 'St. Sebaldus Church', shortName: 'St. Sebaldus', icon: 'landmark', text: 'St. Sebaldus church shows the full beauty of its twin Gothic towers — built between the 13th and 15th centuries and home to the elaborate bronze shrine of St. Sebaldus inside.', photos: [still('day2024', 'nuremberg-st-sebaldus-church.jpg', 'St. Sebaldus Church twin Gothic towers in Nuremberg old town in winter daylight 2024', 2024)] },
  'sister-cities': { name: 'Sister Cities Market — Rathausplatz', shortName: 'Sister Cities Market', market: true, text: 'The Sister Cities Market beside the Rathaus brings an international flavour to the Christkindlesmarkt — vendors from Nuremberg’s partner cities offering food and crafts from across the world.', photos: [still('day2024', 'nuremberg-sister-cities-market.jpg', 'Sister Cities Christmas market in Nuremberg 2024 by day with international stalls near the Rathaus', 2024)] },
  'childrens-market': { name: 'Children’s Christmas Market — Hans-Sachs-Platz', shortName: 'Children’s Market', market: true, text: 'The Children’s Christmas Market is alive with activity — rides spinning, craft workshops busy and younger visitors filling every corner of this dedicated festive area.', photos: [still('day2024', 'nuremberg-children-s-christmas-market.jpg', 'Children’s Christmas market in Nuremberg by day 2024 with rides and craft activities for families', 2024)] },
  'heubrucke': { name: 'Heubrücke', shortName: 'Heubrücke', text: 'The Heubrücke crosses the Pegnitz at the old town’s southern edge — a simple stone bridge with views along the river towards the island quarter beyond.', photos: [still('day2024', 'nuremberg-heubrucke.jpg', 'Heubrücke bridge over the Pegnitz River in Nuremberg old town in winter daylight 2024', 2024)] },
  'museum-bridge': { name: 'Museum Bridge', shortName: 'Museum Bridge', text: 'The Museum Bridge crosses the Pegnitz — a calm moment in the walk with views upstream towards Nuremberg’s medieval island quarter.', photos: [still('evening2024', 'nuremberg-museum-bridge.jpg', 'Museum Bridge over the Pegnitz in Nuremberg at night 2024', 2024)] },
  'pegnitz-riverside': { name: 'Along the Pegnitz', shortName: 'Pegnitz riverside', text: 'A riverside stretch along the Pegnitz shows a quieter side of Nuremberg — medieval walls and half-timbered buildings lining the water between the bridges of the old town.', photos: [still('day2024', 'nuremberg-walk-along-pegnitz-river.jpg', 'Pegnitz riverside walk in Nuremberg with medieval walls and half-timbered buildings in winter daylight 2024', 2024)] },
  'konigstrasse': { name: 'Königstraße', shortName: 'Königstraße', text: 'Königstraße is Nuremberg’s main pedestrian street — Christmas decorations overhead and historic shopfronts stretching from the train station up towards Hauptmarkt.', photos: [photo('christkindlesmarkt-sign', 'An illuminated Christkindlesmarkt sign with an angel hanging over a shopping street at night, 2024', 2024), still('day2024', 'nuremberg-king-street.jpg', 'Königstraße pedestrian street in Nuremberg with Christmas decorations in winter daylight 2024', 2024)] },
  'st-lorenz': { name: 'Church of St. Lorenz (Lorenzkirche)', shortName: 'St. Lorenz', icon: 'landmark', text: 'The Lorenzkirche’s twin spires rise above the southern old town — one of Germany’s most important late-Gothic churches, with the Angelic Salutation by Veit Stoss inside.', photos: [still('day2024', 'nuremberg-church-of-st-lorenz.jpg', 'Church of St. Lorenz twin Gothic spires in Nuremberg southern old town in winter daylight 2024', 2024)] },
  'handwerkerhof': { name: 'Craftsmen’s Courtyard (Handwerkerhof)', shortName: 'Handwerkerhof', market: true, text: 'The Handwerkerhof is a recreated artisan village near the main station, with craftspeople such as glassblowers, tinsmiths and gingerbread bakers working in its open workshops.', photos: [photo('handwerkerhof-gate', 'The arched entrance to the Handwerkerhof framed by two Christmas trees covered in lights, 2024', 2024), still('day2024', 'nuremberg-craftsmen-s-courtyard.jpg', 'Handwerkerhof craftsmen’s courtyard in Nuremberg by day 2024 with artisan workshops and traditional stalls', 2024)] },
  'central-station': { name: 'Nürnberg Hauptbahnhof', shortName: 'Main station', icon: 'train', text: 'My 2022 daytime and evening walks pass the main station between the Handwerkerhof and Karolinenstraße.' },
  'karolinenstrasse': { name: 'Karolinenstraße', shortName: 'Karolinenstraße', text: 'Karolinenstraße runs wide through Nuremberg’s shopping district — festive decorations and shop windows along a broad pedestrian street.', photos: [still('day2024', 'nuremberg-caroline-street.jpg', 'Karolinenstraße shopping street in Nuremberg with Christmas decorations in winter daylight 2024', 2024)] },
  'hefnersplatz': { name: 'Hefnersplatz', shortName: 'Hefnersplatz', text: 'Hefnersplatz is a quieter square on the western side of the old town, in a lesser-visited corner of Nuremberg’s historic centre.', photos: [still('day2024', 'nuremberg-hefnersplatz.jpg', 'Hefnersplatz square in Nuremberg old town in winter daylight 2024', 2024)] },
  'ludwigsplatz': { name: 'Ludwigsplatz', shortName: 'Ludwigsplatz', text: 'Ludwigsplatz marks the change from Nuremberg’s medieval core to the 19th-century city — a wide open square where the tight old-town streets give way to broader streets.', photos: [still('day2024', 'nuremberg-ludwigsplatz.jpg', 'Ludwigsplatz square in Nuremberg in winter daylight 2024', 2024)] },
  'ehekarussell': { name: 'Ehekarussell fountain', shortName: 'Ehekarussell', icon: 'landmark', text: 'The Ehekarussell fountain’s bronze scenes of marriage, from courtship to old age, are among Nuremberg’s most talked-about public artworks.', photos: [still('day2024', 'nuremberg-marriage-merry-go-round-fountain.jpg', 'Ehekarussell marriage merry-go-round fountain in Nuremberg in winter daylight 2024', 2024)] },
  'jakobsplatz': { name: 'Jakobsplatz Christmas market', shortName: 'Jakobsplatz', market: true, text: 'The Jakobsplatz market in front of St. Jakob church is one of the quieter market stops on the walk — local stalls and a decorated tree in the square.', photos: [still('day2024', 'nuremberg-jakobsplatz-christmas-market.jpg', 'Jakobsplatz Christmas market in front of St. Jakob church in Nuremberg 2024', 2024)] },
  'karlsbrucke': { name: 'Karlsbrücke', shortName: 'Karlsbrücke', text: 'The Karlsbrücke gives clear views along the Pegnitz towards the historic island quarter, with the Henkersteg downstream and the half-timbered Trödelmarkt buildings on both banks.', photos: [still('day2024', 'nuremberg-karlsbucke.jpg', 'View from the Karlsbrücke along the Pegnitz in Nuremberg in winter daylight 2024', 2024)] },
  'trodelmarkt': { name: 'Trödelmarkt', shortName: 'Trödelmarkt', text: 'The Trödelmarkt island is one of Nuremberg’s most picturesque corners — half-timbered buildings around the island square and the Pegnitz flowing around all sides.', photos: [still('day2024', 'nuremberg-trodelmarkt.jpg', 'Trödelmarkt island with half-timbered buildings in Nuremberg in winter daylight 2024', 2024)] },
  'hangmans-bridge': { name: 'Henkersteg (Hangman’s Bridge)', shortName: 'Henkersteg', text: 'The Henkersteg is a covered wooden bridge connecting the former executioner’s tower to the city.', photos: [photo('henkersteg-snow', 'The covered Henkersteg bridge and stone arches over the Pegnitz after snowfall, 2022', 2022), still('day2024', 'nuremberg-hangman-s-bridge.jpg', 'Henkersteg covered wooden bridge over the Pegnitz in Nuremberg in winter daylight 2024', 2024)] },
  'maxbrucke': { name: 'Maxbrücke', shortName: 'Maxbrücke', text: 'The Maxbrücke gives a clear view along the Pegnitz, with the Henkersteg and Trödelmarkt island upstream.', photos: [still('day2024', 'nuremberg-maxbrucke.jpg', 'View from the Maxbrücke along the Pegnitz towards the Henkersteg in Nuremberg 2024', 2024)] },
  'feuerzangenbowle': { name: 'Feuerzangenbowle', shortName: 'Feuerzangenbowle', icon: 'food', text: 'Feuerzangenbowle is a German winter tradition — a rum-soaked sugar cone set alight above a cauldron of spiced red wine.', photos: [still('day2024', 'nuremberg-feuerzangenbowle.jpg', 'Feuerzangenbowle stall with a flaming punch cauldron at the Nuremberg Christmas market 2024', 2024)] },
};

const stops: VisitorMapStop[] = source.stops.map(stop => {
  const copy = stopText[stop.id];
  if (!copy) throw new Error(`Missing Nuremberg stop text for ${stop.id}`);
  return {
    id: stop.id, name: copy.name, shortName: copy.shortName,
    category: copy.market ? 'market' : 'photo',
    icon: copy.icon ?? (copy.market ? 'market' : 'camera'),
    coordinates: stop.coordinates as MapCoordinate,
    text: copy.text,
    photos: copy.photos,
    watch: stop.watch.map(item => ({
      label: `${walkLabels[item.walk as WalkKey]} · ${timeLabel(item.seconds)}`,
      href: withWatchTimestamp(`/videos/${walkSlug[item.walk as WalkKey]}`, item.seconds),
    })),
  };
});

// The 2024 daytime walk is the main line; it passes every stop except the
// Museum Bridge and the station, which the other walks reach.
const mainStops = stops.filter(stop => source.stops.find(item => item.id === stop.id)!.watch.some(item => item.walk === 'day2024'));
const route = (key: WalkKey) => source.routes[key] as MapCoordinate[][];
const routeOptions = (['evening2024', 'day2022', 'evening2022'] as WalkKey[]).map(key => ({
  id: `route-${key}`,
  label: `Route of my ${walkLabels[key]}`,
  coordinates: route(key).flat(),
  segments: route(key),
  stopIds: source.stops.filter(stop => stop.watch.some(item => item.walk === key)).map(stop => stop.id),
}));

export const nurembergVisitorMap: VisitorMapData = {
  city: 'Nuremberg',
  sourceUrl: source.walks.find(walk => walk.key === 'day2024')!.sourceUrl,
  importedOn: source.importedOn,
  route: route('day2024').flat(),
  routeKind: 'filmed',
  routeLabel: 'The route I filmed in 2024',
  routeTitle: 'The route I filmed through Nuremberg',
  stationApproach: [],
  defaultToItinerary: true,
  optionalRoutes: routeOptions,
  stops,
  itinerary: {
    title: 'Stops on my 2024 daytime walk',
    introduction: 'These stops follow the order of my 2024 daytime walk. Each one links to the moment it appears in my walks.',
    steps: mainStops.map((stop, index) => ({ stopId: stop.id, title: stop.name, label: `Stop ${index + 1}`, text: stop.text })),
  },
};
