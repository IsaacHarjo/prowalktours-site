import type { VideoCatalogRecord } from "../../data/video-types";

export type WatchDestination = "internal-page" | "youtube";
export type DiscoveryVideo = VideoCatalogRecord & {
  watchHref: string;
  watchDestinationType: WatchDestination;
};

export type TourRecord = DiscoveryVideo & {
  tourId: string;
  sourceFile: string;
  sourceStatus: "draft" | "ready" | "published";
  productionStage: "unknown" | "filmed" | "editing" | "ready-to-upload";
  youtubeAvailability: "unknown" | "unpublished" | "public" | "members-only" | "unavailable";
  availabilityEvidence: "explicit" | "project-notes" | "legacy-ready" | "unknown";
  websiteStatus: "draft" | "published";
  youtubeId: string | null;
  latitude: number | null;
  longitude: number | null;
  filmedYear: number | null;
  location: string;
  distanceMiles: number | null;
  distanceKm: number | null;
  mapUrl: string;
};

export type WorldTour = {
  tourId: string;
  slug: string;
  title: string;
  city: string;
  country: string;
  mapGroup: string;
  region: string;
  themes: string[];
  videoType: string;
  filmedYear: number | null;
  durationLabel: string;
  youtubeUrl: string;
  watchHref: string;
  watchDestinationType: WatchDestination;
  latitude: number;
  longitude: number;
};
