import type { MapCoordinate } from './map-types';
import type { GuidePhoto } from './types';

export type VisitorStopCategory = 'market' | 'photo' | 'arrival' | 'useful';
export type VisitorStopIcon = 'market' | 'camera' | 'train' | 'parking' | 'basket' | 'food' | 'landmark' | 'fair' | 'start';
export type VisitorMapStop = {
  id: string;
  name: string;
  shortName: string;
  category: VisitorStopCategory;
  icon: VisitorStopIcon;
  coordinates: MapCoordinate;
  marketNumber?: number;
  text: string;
  tip?: string;
  photo?: GuidePhoto;
};
export type VisitorMapData = {
  city: string;
  sourceUrl: string;
  importedOn: string;
  route: MapCoordinate[];
  stationApproach: MapCoordinate[];
  stops: VisitorMapStop[];
};

export function walkingDistanceKm(coordinates: MapCoordinate[]) {
  const radians = Math.PI / 180;
  return coordinates.slice(1).reduce((distance, point, index) => {
    const previous = coordinates[index];
    const arc = Math.sin((point[1] - previous[1]) * radians / 2) ** 2
      + Math.cos(previous[1] * radians) * Math.cos(point[1] * radians)
      * Math.sin((point[0] - previous[0]) * radians / 2) ** 2;
    return distance + 6371 * 2 * Math.asin(Math.sqrt(Math.min(1, arc)));
  }, 0);
}
