export type ExploreMapFeature = {
  tourId: string;
  country: string;
  region: string;
  city: string;
  location: string;
  title: string;
  slug: string;
  videoType: string;
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

export type ExploreMapFilterOption = {
  value: string;
  label: string;
};
