export type HighlightRecord = {
  title: string;
  timeLabel: string;
  seconds: number;
  imageSrc: string;
  alt: string;
  description?: string;
};

export type VideoCatalogRecord = {
  id: string;
  slug: string;
  siteTitle: string;
  youtubeTitle: string;
  youtubeUrl: string;
  thumbnail: string;
  country: string;
  region: string;
  city: string;
  filmingDates: string[];
  filmingMonthYear: string;
  durationLabel: string;
  durationSeconds: number;
  weather: string;
  shortDescription: string;
  keywords: string[];
  landmarks: string[];
  themes: string[];
  timeOfDay: string;
  videoType: string;
  visibility: string;
  highlights: HighlightRecord[];
};

export type VideoDetailRecord = {
  slug: string;
  heroEyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  routeMapDescription: string;
  licensingDescription: string[];
  highlights: Array<
    HighlightRecord & {
      caption: string;
      proTip?: {
        label: string;
        text: string;
      };
    }
  >;
};
