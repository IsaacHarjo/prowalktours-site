import type { GuideMapData, MapCoordinate } from '../guides/map-types';
import { colmarRoutes } from './colmar-routes';
import { colmarPhotos as photos } from './colmar-photos';

// Coordinates come from the owner's route pins, except Koifhus and the current
// Gourmet Market, which use the official tourist office's map markers.
// Route-pin timestamps have small inconsistencies; playback uses the existing
// enriched video details / reviewed caption moments, never the raw KML labels.
function eveningPoint(prefix: string): MapCoordinate {
  const point = colmarRoutes.find(route => route.tourId === 'fr-0026')?.points.find(point => point.name.startsWith(prefix));
  if (!point) throw new Error(`Missing Colmar route point: ${prefix}`);
  return point.coordinates;
}
const moments = (day: number, evening: number) => [
  { tourId: 'fr-0027', seconds: day }, { tourId: 'fr-0026', seconds: evening },
];

export const colmarMap: GuideMapData = {
  routes: colmarRoutes,
  stops: [
    { id: 'dominicains', name: 'Place des Dominicains', marketIndex: 0, coordinates: eveningPoint('1.'), photo: photos.C188, moments: moments(604, 52) },
    { id: 'ancienne-douane', name: 'Place de l’Ancienne Douane', marketIndex: 1, coordinates: eveningPoint('7.'), photo: photos.C254, moments: moments(3014, 2187) },
    { id: 'koifhus', name: 'Koïfhus', marketIndex: 2, coordinates: [7.3595044429222, 48.075911473952], moments: [{ tourId: 'fr-0026', seconds: 2018 }] },
    { id: 'jeanne-arc', name: 'Place Jeanne d’Arc', marketIndex: 3, coordinates: eveningPoint('9.'), moments: moments(3657, 2796) },
    { id: 'petite-venise', name: 'Petite Venise', marketIndex: 4, coordinates: eveningPoint('16.'), moments: moments(5900, 4884) },
    { id: 'gourmet', name: 'The Gourmet Market', marketIndex: 5, coordinates: [7.3603054566696, 48.075226387254], moments: moments(4728, 3656) },
    { id: 'saint-martin', name: 'Saint-Martin', coordinates: eveningPoint('5.'), text: 'The church at the heart of the old town, between the northern market squares and Rue des Marchands.', photo: photos.C198, moments: moments(1484, 1068) },
    { id: 'canals', name: 'The canals', coordinates: eveningPoint('14.'), text: 'Half-timbered houses and waterside streets around Little Venice. Continue toward the covered market for more views along the canal.', photo: photos.C147, moments: moments(5039, 3925) },
  ],
};
