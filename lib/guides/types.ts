import type { ChristmasWalk } from "../christmas/catalog";

export type GuidePhoto = { src: string; alt: string; year: number; width: number; height: number };
export type GuideSource = { label: string; href: string };
export type OrientationPlace = { city: string; country?: string; longitude: number; latitude: number; href: string; external?: boolean; marketGuide?: boolean; labelSide?: "left" | "right" };
export type GuideShuttleService = {
  checkedOn: string;
  introduction: string;
  dates: string;
  departure: string;
  booking: string;
  fares: { label: string; value: string }[];
  children: string;
  routes: { label: string; destinations: string; days: string }[];
  note: string;
  source: GuideSource;
};
export type GuideSeason = {
  year: number;
  checkedOn: string;
  dates: string;
  hours: { label: string; value: string }[];
  exceptions: string;
  source: GuideSource;
  extraMarket: { title: string; dates: string; hours: string; source: GuideSource };
  transport: { title: string; text: string; source: GuideSource }[];
  shuttles?: GuideShuttleService;
};
export type GuideMoment = { title: string; text: string; photo: GuidePhoto; tourId: string; seconds: number };
export type DestinationGuide = {
  slug: string;
  city: string;
  region: string;
  country: string;
  title: string;
  introduction: string;
  hero: GuidePhoto;
  mobileHero: GuidePhoto;
  markets: { name: string; text: string }[];
  marketsSource: GuideSource;
  moments: GuideMoment[];
  featuredTourId: string;
  fieldNote: { title: string; text: string; photo: GuidePhoto; tourId: string; seconds: number };
  gallery: GuidePhoto[];
  route: { title: string; text: string; stops: string[]; note: string };
  nearby: { city: string; text: string; href: string }[];
};
export type GuideWalk = ChristmasWalk & { youtubeId: string };
