/**
 * Catalog records belong in data/videos/[country].ts.
 * Detail records belong in data/video-details/[slug].ts.
 * The search page reads from the catalog records.
 * The video page reads from the detail record.
 */

import type {
  VideoCatalogRecord,
  VideoDetailRecord,
} from "./video-types";

export const blankVideoCatalogRecord: VideoCatalogRecord = {
  id: "sample-video-id",
  slug: "sample-video-slug",
  siteTitle: "City, Country — Month Year",
  youtubeTitle: "City, Country — Month Year",
  youtubeUrl: "https://www.youtube.com/watch?v=VIDEO_ID",
  thumbnail: "https://i.ytimg.com/vi/VIDEO_ID/maxresdefault.jpg",
  country: "Country",
  region: "Region",
  city: "City",
  filmingDates: ["2026-01-01"],
  filmingMonthYear: "January 2026",
  durationLabel: "1h 00m",
  durationSeconds: 3600,
  weather: "Sunny, 75°F / 24°C",
  shortDescription:
    "Brief searchable summary of the route, atmosphere, and major areas covered.",
  keywords: ["city walk", "travel", "landmark"],
  landmarks: ["Major Landmark"],
  themes: ["street life", "historic center"],
  timeOfDay: "daytime",
  videoType: "walking tour",
  visibility: "public",
  highlights: [
    {
      title: "Sample Highlight",
      timeLabel: "12:34",
      seconds: 754,
      imageSrc: "/sample-video/highlights/sample-highlight.jpg",
      alt: "Sample highlight scene in City, Country",
    },
  ],
};

export const blankVideoDetailRecord: VideoDetailRecord = {
  slug: "sample-video-slug",
  heroEyebrow: "Featured Walk",
  heroTitle: "City, Country — Month Year",
  heroSubtitle: "Neighborhoods, Landmarks & Atmosphere",
  heroDescription:
    "Long-form intro for the video page describing the route, mood, and major stops.",
  routeMapDescription:
    "Short description of where the route begins, where it passes through, and where it ends.",
  licensingDescription: [
    "Licensing paragraph describing the types of footage included in this walk.",
    "Second licensing paragraph for additional availability or supporting footage.",
  ],
  highlights: [
    {
      title: "Sample Highlight",
      timeLabel: "12:34",
      seconds: 754,
      imageSrc: "/sample-video/highlights/sample-highlight.jpg",
      alt: "Sample highlight scene in City, Country",
      caption: "Short highlight caption",
      proTip: {
        label: "Tip",
        text: "Optional page-specific note for this highlight.",
      },
    },
  ],
};
