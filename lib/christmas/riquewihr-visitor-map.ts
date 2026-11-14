import importedRoute from './riquewihr-route.json';
import stopPhotos from './riquewihr-stop-photos.json';
import type { MapCoordinate } from '../guides/map-types';
import type { GuidePhoto } from '../guides/types';
import type { VisitorMapData, VisitorMapStop } from '../guides/visitor-map-types';

const base = '/riquewihr-christmas-guide';
function coordinates(name: string): MapCoordinate[] {
  const feature = importedRoute.find(item => item.name === name);
  if (!feature) throw new Error(`Missing Riquewihr map feature: ${name}`);
  return feature.coordinates.map(point => [point[0], point[1]]);
}
const photo = (file: string, alt: string, year = 2025, width = 1920, height = 1081): GuidePhoto => ({ src: `${base}/${file}.webp`, alt, year, width, height });
type WalkStop = Omit<VisitorMapStop, 'coordinates' | 'shortName'> & { source: string; shortName?: string; onward?: string };
const walkStops: WalkStop[] = [
  { id: 'riquewihr-start', source: '1 - Start of the Walk', name: 'Town hall: start the walk', category: 'photo', icon: 'start',
    text: 'Start beneath the Hôtel de Ville arch at the lower end of town. From here, Rue du Général de Gaulle leads uphill through the decorated streets to the Dolder. I saved the main Christmas market beside the town hall for the end, so the walk brings you back here.',
    tip: 'Short on time? Walk up the main street to the Upper Gate and come back. The courtyard and side-street stops are there if you have longer.',
    photos: stopPhotos['riquewihr-start'], onward: 'Pass through the arch and follow the main street uphill.' },
  { id: 'riquewihr-main-street', source: '2. Rue du Genearl de Gaulle', name: 'Rue du Général de Gaulle: the Christmas street', shortName: 'The Christmas street', category: 'photo', icon: 'camera',
    text: 'For me, this street is the heart of a Christmas visit to Riquewihr. Look above the shop windows at the half-timbered houses, then take your time with the bakeries, cheese shops and little passages. In 2025 I kept ducking into shops and cellars to show more than the street outside.',
    tip: 'Walk it in both directions. By midday it was packed, but just a street or two away I found much more room.',
    photos: stopPhotos['riquewihr-main-street'] },
  { id: 'riquewihr-ecurie', source: "Restaurant L'Ecurie", name: 'L’Écurie: a courtyard detour', category: 'market', icon: 'food',
    text: 'Step off the main street into L’Écurie’s courtyard. I found food, shops and Christmas decorations tucked inside. These little detours are a big part of what I enjoyed here; it is easy to walk past an entrance without realising what is behind it.',
    tip: 'Courtyards and businesses keep their own hours. Explore when open and leave room for people coming through.' },
  { id: 'riquewihr-nobles', source: 'La Cour des Nobles', name: 'La Cour des Nobles', category: 'market', icon: 'food',
    text: 'Another courtyard worth stepping into as you work your way uphill. I walked through here during my 2025 visit, looking around the food and shops before returning to the main street. Give yourself permission to wander a little instead of treating the route as a checklist.' },
  { id: 'riquewihr-gourmande', source: 'La Cour Gourmande', name: 'La Cour Gourmande: a place to sit', category: 'market', icon: 'food',
    text: 'This food courtyard is a useful place to remember when you want a break. When I visited in 2025, there was indoor seating at the back as well as the food stalls. Look through the courtyard before deciding where to stop.',
    tip: 'The seating I found was part of the food courtyard. Check what is available during your visit, especially at busy meal times.' },
  { id: 'riquewihr-dime', source: 'La Dime', name: 'La Dîme courtyard', category: 'market', icon: 'food',
    text: 'I took a short look into this courtyard just before reaching the Dolder square. It is another reason to slow down near the top of the main street: there is more to explore than the tower itself.', onward: 'Continue to the square below the Dolder and the Fontaine de la Sinne.' },
  { id: 'riquewihr-dolder', source: '3. Dolder Tower and Square', name: 'The Dolder, fountain & tower views', shortName: 'Dolder & fountain square', category: 'photo', icon: 'landmark',
    text: 'This is one of the places I kept photographing: the Dolder above the street, the colourful houses and the Fontaine de la Sinne. I also went into the tower museum in 2025. I was the only visitor upstairs, and it felt remarkably quiet after the crowded street below. The view through the window was a highlight.',
    tip: 'The museum has steep stairs and a separate admission charge. Its displays explain the town’s walls, defences and the life of the watchman. Check opening times before counting on a visit.',
    informationUrl: 'https://musee-riquewihr.fr/en/dolder-museum/', informationLabel: 'Dolder Museum information',
    photos: [photo('dolder', 'The Dolder and its square during my quiet morning walk'), photo('tower-view', 'My view over the square and rooftops from the Dolder window')],
    panoramas: [
      { src: `${base}/dolder-360-1.jpg`, label: 'From the tower window' },
      { src: `${base}/dolder-360-2.jpg`, label: 'Below the Dolder' },
      { src: `${base}/dolder-360-3.jpg`, label: 'Along the square' },
      { src: `${base}/dolder-360-4.jpg`, label: 'Fountain square' },
      { src: `${base}/dolder-360-5.jpg`, label: 'Looking toward the tower' },
    ], onward: 'Take Rue des Juifs for the short detour to the Thieves’ Tower, then return toward the Dolder.' },
  { id: 'riquewihr-thieves', source: '4. Thieves Tower', name: 'Tour des Voleurs: the Thieves’ Tower', category: 'photo', icon: 'landmark',
    text: 'I walked to the Thieves’ Tower but did not go inside, and I wish I had. The museum combines the old defensive tower and prison with a winegrower’s house. It would add a different side of Riquewihr to a day spent among the Christmas decorations.',
    tip: 'The museum includes a historic torture chamber and displays about punishment. Consider that if you are visiting with children, and check current opening times.',
    informationUrl: 'https://musee-riquewihr.fr/', informationLabel: 'Riquewihr museums' },
  { id: 'riquewihr-upper-gate', source: '5. La Porte Haute', name: 'The Upper Gate & town walls', category: 'photo', icon: 'landmark',
    text: 'Continue beyond the Dolder to La Porte Haute, also called the Obertor. Looking back from outside helps you see Riquewihr as a fortified town, with gates and walls enclosing the streets you have just walked through.',
    tip: 'The map has two optional extras: the outer wall walk and the climb for a view over town. The wall route includes steps; save the hill walk for daylight and suitable weather.',
    photo: photo('upper-gate', 'The stone Upper Gate viewed from outside the town', 2025, 810, 1440), onward: 'Return through the gate toward the Dolder for the Christmas shop, then continue back down through town.' },
  { id: 'riquewihr-feerie', source: 'Féerie De Noël', name: 'Féerie de Noël: inside the Christmas shop', category: 'market', icon: 'basket',
    text: 'I came back to this Christmas shop before its 10am opening in 2025 and there was already a small queue. Inside, I spent about fifteen minutes filming the decorations. If you enjoy Christmas ornaments, allow some time here rather than just looking at the windows.',
    tip: 'Opening times are separate from the market. My 10am visit describes that day in 2025; check the shop’s hours when planning.' },
  { id: 'riquewihr-protestant', source: '6. Sainte-Marguerite Protestant Church', name: 'Sainte-Marguerite Protestant Church', category: 'photo', icon: 'landmark',
    text: 'Leave the busy main street for the Protestant church and the surrounding lanes. I stepped inside during my 2025 walk. It made a short, quieter pause between the shops and courtyards.',
    tip: 'There are two Sainte-Marguerite churches on this walk. This is the Protestant church; the Catholic church is farther across town. Enter only when open to visitors and respect services.' },
  { id: 'riquewihr-catholic', source: '7. Sainte-Marguerite Catholic Church', name: 'Sainte-Marguerite Catholic Church', category: 'photo', icon: 'landmark',
    text: 'This stop takes you away from the main shopping street to the Catholic church on the other side of town. Use the surrounding lanes for a slower look at Riquewihr before returning to the market beside the town hall.',
    tip: 'The route includes the exterior. An indoor visit depends on opening times and services.' },
  { id: 'riquewihr-market', source: '8. Christmas Market', name: 'The Christmas market: finish beside the town hall', shortName: 'Christmas market', category: 'market', icon: 'market',
    text: 'I saved the main market at Place Fernand Zeyer, beside the town hall, for the end of my 2025 daytime walk. After exploring the town, take your time with the stalls and something to eat. You are now close to where you started.',
    tip: 'The stalls are only one part of the visit. If you arrived here first, use the town hall arch to begin the walk through the streets and courtyards.', onward: 'Return to the town hall arch to complete the loop.' },
];

const stops: VisitorMapStop[] = walkStops.map(stop => ({ ...stop, shortName: stop.shortName ?? stop.name, coordinates: coordinates(stop.source)[0] }));
for (const name of ['Parking Lot A', 'Parking Lot B', 'Parking Lot C']) stops.push({ id: `riquewihr-parking-${name.slice(-1).toLowerCase()}`, name, shortName: name, coordinates: coordinates(name)[0], category: 'arrival', icon: 'parking', text: 'A parking location on my suggested map near the lower end of town. Follow local signs for access, charges and any event restrictions; a pin does not guarantee an available space.', tip: 'At busy weekends, consider the Naturoparc park-and-ride in Hunawihr.' });
stops.push({ id: 'riquewihr-wc', name: 'Public toilets — Rue de la Première Armée', shortName: 'Public toilets', coordinates: coordinates('WC')[0], category: 'useful', icon: 'wc', text: 'Public toilets marked on my route, just off the main street. I passed a long queue during my 2025 walk, so allow extra time on busy days.' });

export const riquewihrVisitorMap: VisitorMapData = {
  city: 'Riquewihr', sourceUrl: 'https://www.google.com/maps/d/viewer?mid=1VqpIJNHAFGSj_BWdE07EGB1lVGUWcYM', importedOn: '2026-10-29',
  route: coordinates('Line 1'), stationApproach: [], defaultToItinerary: true, descriptionBeforeMedia: true, showItineraryTips: true,
  routeDistanceNote: 'Suggested loop. Optional walks, indoor visits and extra wandering are not included.',
  optionalRoutes: [{ id: 'riquewihr-wall-route', label: 'optional wall walk', coordinates: coordinates('Outer Wall Walk') }, { id: 'riquewihr-view-route', label: 'optional hill viewpoint', coordinates: coordinates('Scenic View Walk') }],
  stops,
  itinerary: { title: 'My suggested Riquewihr walk', introduction: 'Start at the town hall, explore uphill through the courtyards to the Dolder and Upper Gate, then return through the quieter streets to the Christmas market.', steps: walkStops.map(stop => ({ stopId: stop.id, title: stop.name, label: 'Streets & courtyards', text: stop.text, tip: stop.tip, onward: stop.onward })) },
};
