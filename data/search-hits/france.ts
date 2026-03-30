import type { VideoDetailRecord } from "../video-types";
import { franceVideos } from "../videos/france";
import { avignonWalkingTour2025Detail } from "../video-details/avignon-walking-tour-2025";
import { antibesDaytimeWalk2025Detail } from "../video-details/antibes-daytime-walk-2025";
import { mentonFranceWalkingTour2025Detail } from "../video-details/menton-france-walking-tour-2025";

const searchableTerms = (...values: Array<string | undefined>) =>
  Array.from(
    new Set(
      values
        .flatMap((value) =>
          value ? value.split(/[|,]/).map((item) => item.trim()) : []
        )
        .filter(Boolean)
    )
  );

const videoBySlug = new Map(franceVideos.map((video) => [video.slug, video]));

const manualAliases: Record<string, Record<string, string[]>> = {
  "avignon-walking-tour-2025": {
    "Pont Saint-Bénézet (Pont d’Avignon)": [
      "Pont d'Avignon",
      "Pont Saint-Benezet",
      "bridge",
    ],
    "Cathédrale Notre-Dame des Doms": ["Notre-Dame des Doms", "cathedral"],
    "Place du Palais": ["Palais des Papes", "Palace of the Popes", "papal square"],
    "Rue des Teinturiers": ["water wheel street", "canal street"],
    "Les Halles d'Avignon": ["market hall", "covered market"],
  },
  "antibes-daytime-walk-2025": {
    "Promenade Amiral de Grasse": ["seafront promenade", "waterfront promenade"],
    "Musee Picasso": ["Picasso Museum", "museum"],
    "Antibes Cathedral": ["cathedral", "Notre-Dame de l'Immaculee Conception"],
    "le Marche provencal Outdoor Market": ["market", "provencal market", "food market"],
    "Plage de la Gravette Beach": ["beach", "Gravette"],
    "Le Nomade Sculpture": ["sculpture", "Nomade"],
  },
  "menton-france-walking-tour-2025": {
    "Sablettes Beach (West)": ["beach", "blue Menton sign", "Sablettes"],
    "Les Rampes Saint-Michel": ["stairs", "donkey steps"],
    "Rue du Vieux Chateau": ["old castle street", "castle path"],
    "Cimetiere du Vieux Chateau": ["castle cemetery", "viewpoint", "sea views"],
    "Promenade du Soleil": ["promenade", "seafront"],
  },
};

const buildHitRows = (tourId: string, detail: VideoDetailRecord) => {
  const video = videoBySlug.get(detail.slug);

  if (!video) {
    return [];
  }

  return detail.highlights.map((highlight) => ({
    tour_id: tourId,
    slug: detail.slug,
    title: video.siteTitle,
    youtube_url: video.youtubeUrl,
    time_label: highlight.timeLabel,
    seconds: highlight.seconds,
    highlight_title: highlight.title,
    landmark: highlight.title,
    search_terms: searchableTerms(
      highlight.title,
      highlight.caption,
      highlight.description,
      ...(manualAliases[detail.slug]?.[highlight.title] ?? [])
    ),
  }));
};

export const franceSearchHits = [
  ...buildHitRows("fr-0001", avignonWalkingTour2025Detail),
  ...buildHitRows("fr-0002", antibesDaytimeWalk2025Detail),
  ...buildHitRows("fr-0003", mentonFranceWalkingTour2025Detail),
];
