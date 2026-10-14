import type { GuidePhoto } from './types';

export type MapCoordinate = [number, number];
export type GuideMapRoute = {
  tourId: string;
  label: string;
  year: number;
  sourceUrl: string;
  coordinates: MapCoordinate[];
  points: { name: string; coordinates: MapCoordinate }[];
};
export type GuideMapStop = {
  id: string;
  name: string;
  coordinates: MapCoordinate;
  marketIndex?: number;
  text?: string;
  photo?: GuidePhoto;
  moments: { tourId: string; seconds: number }[];
};
export type GuideMapData = { routes: GuideMapRoute[]; stops: GuideMapStop[] };
