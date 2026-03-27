export type ExploreMapVideoType =
  | "day-walk"
  | "evening-walk"
  | "bike-tour"
  | "boat-tour"
  | "hike"
  | "360-tour"
  | "drone-tour"
  | "drive-tour"
  | "scooter-tour";

export type ExploreMapFeature = {
  tourId: string;
  country: string;
  region: string;
  city: string;
  location: string;
  title: string;
  slug: string;
  videoType: string;
  themes: string[];
  filmedDateIso: string | null;
  filmedYear: number | null;
  youtubeUrl: string;
  mapUrl: string | null;
  latitude: number;
  longitude: number;
  durationLabel: string;
  durationSeconds: number;
  descriptionShort: string;
  descriptionLong: string;
  landmarks: string[];
  keywords: string[];
  status: string;
  thumbnailPath: string | null;
  href: string;
  thumbnailSrc: string;
};

export type ExploreMapWatchDestinationType = "internal-page" | "youtube";

export type ExploreMapFilterOption = {
  value: string;
  label: string;
};
