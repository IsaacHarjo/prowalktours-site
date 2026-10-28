import type { MapCoordinate } from './map-types';
import type { GuidePhoto } from './types';

export type VisitorStopCategory = 'market' | 'photo' | 'arrival' | 'useful';
export type VisitorStopIcon = 'market' | 'camera' | 'train' | 'parking' | 'basket' | 'food' | 'boat' | 'landmark' | 'fair' | 'start' | 'wc' | 'information';
export type VisitorMapStop = {
  id: string;
  name: string;
  shortName: string;
  category: VisitorStopCategory;
  icon: VisitorStopIcon;
  coordinates: MapCoordinate;
  marketNumber?: number;
  approximateLocation?: boolean;
  informationUrl?: string;
  informationLabel?: string;
  text: string;
  tip?: string;
  photo?: GuidePhoto;
  photos?: GuidePhoto[];
  panorama?: { src: string };
  panoramas?: { src: string; label: string }[];
  video?: { libraryId: string; videoId: string; title: string };
};
export type VisitorItineraryStep = {
  stopId: string;
  title: string;
  label: string;
  text: string;
  highlights?: string[];
  tip?: string;
  onward?: string;
};
export type VisitorMapData = {
  city: string;
  sourceUrl: string;
  importedOn: string;
  route: MapCoordinate[];
  stationApproach: MapCoordinate[];
  approachLabel?: string;
  routeDistanceNote?: string;
  showItineraryTips?: boolean;
  defaultToItinerary?: boolean;
  descriptionBeforeMedia?: boolean;
  optionalRoute?: { label: string; coordinates: MapCoordinate[]; stopIds?: string[] };
  stops: VisitorMapStop[];
  itinerary?: {
    title: string;
    introduction: string;
    steps: VisitorItineraryStep[];
  };
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
