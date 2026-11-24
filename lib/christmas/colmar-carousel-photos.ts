import type { GuidePhoto } from "../guides/types";
import { colmarStopGalleries } from "./colmar-stop-galleries";

// Owner-selected originals, in the requested order. Independent of the map stop galleries.
export const colmarCarouselPhotos: GuidePhoto[] = [
  {
    "src": "/images/guides/colmar/colmar-carousel-sign-2025.webp",
    "alt": "Large red Colmar letters among Christmas decorations in Parc du Champ-de-Mars.",
    "caption": "The Colmar sign",
    "year": 2025,
    "width": 1600,
    "height": 900
  },
  {
    "src": "/images/guides/colmar/colmar-carousel-dominicains-day-1-2023.webp",
    "alt": "A decorated Christmas tree and market visitors beside the Dominican Church in daylight.",
    "caption": "Christmas at Place des Dominicains",
    "year": 2023,
    "width": 1600,
    "height": 901
  },
  {
    "src": "/images/guides/colmar/colmar-carousel-dominicains-day-2-2023.webp",
    "alt": "Visitors around a Christmas tree, market stalls and half-timbered houses at Place des Dominicains.",
    "caption": "Around the Christmas tree",
    "year": 2023,
    "width": 1600,
    "height": 901
  },
  {
    "src": "/images/guides/colmar/colmar-carousel-dominicains-night-2023.webp",
    "alt": "Warm lights in the trees above Christmas stalls and half-timbered houses at night.",
    "caption": "Evening at Place des Dominicains",
    "year": 2023,
    "width": 1600,
    "height": 899
  },
  {
    "src": "/images/guides/colmar/colmar-carousel-cathedral-1-2023.webp",
    "alt": "Half-timbered buildings around Place de la Cathédrale, with white decorative trees and snow on the roofs.",
    "caption": "Place de la Cathédrale",
    "year": 2023,
    "width": 1600,
    "height": 901
  },
  {
    "src": "/images/guides/colmar/colmar-carousel-cathedral-2-2023.webp",
    "alt": "Saint-Martin church beside white Christmas trees, with a light covering of snow on its roof.",
    "caption": "Saint-Martin at Christmas",
    "year": 2023,
    "width": 1600,
    "height": 901
  },
  {
    "src": "/images/guides/colmar/colmar-carousel-koifhus-day-2025.webp",
    "alt": "Decorated half-timbered houses and a busy market street seen from the Koïfhus steps in daylight.",
    "caption": "The view from the Koïfhus steps",
    "year": 2025,
    "width": 1448,
    "height": 1086
  },
  {
    "src": "/images/guides/colmar/colmar-carousel-koifhus-lights-2025.webp",
    "alt": "Warm Christmas lights tracing the gables and windows of a half-timbered building at blue hour.",
    "caption": "Christmas lights by the Koïfhus",
    "year": 2025,
    "width": 1448,
    "height": 1086
  },
  {
    "src": "/images/guides/colmar/colmar-carousel-koifhus-evening-2025.webp",
    "alt": "Crowds below illuminated half-timbered houses and Christmas stalls at blue hour.",
    "caption": "Blue hour from the Koïfhus steps",
    "year": 2025,
    "width": 1600,
    "height": 900
  },
  {
    "src": "/images/guides/colmar/colmar-carousel-petite-venise-2025.webp",
    "alt": "Christmas decorations beside the Petite Venise canal, with half-timbered houses and a Ferris wheel beyond the bridge.",
    "caption": "Petite Venise canal view",
    "year": 2025,
    "width": 1600,
    "height": 901
  }
];

// One view for each market, in the same order as colmarGuide.markets.
// Keep the owner's original ten-photo selection above for future galleries.
export const colmarMarketPhotos: GuidePhoto[] = [
  colmarCarouselPhotos[1],
  colmarStopGalleries["ancienne-douane"][2],
  colmarStopGalleries.koifhus[1],
  {
    src: "/colmar-christmas-market-evening-walk-2023/highlights/colmar-christmas-market-3-place-jeanne-d-arc.jpg",
    alt: "Visitors browsing illuminated wooden stalls at Place Jeanne d’Arc at blue hour.",
    year: 2023, width: 1280, height: 720,
  },
  colmarStopGalleries["petite-venise"][0],
  {
    src: "/colmar-christmas-market-evening-walk-2023/highlights/colmar-gourmet-market.jpg",
    alt: "The Gourmet Market entrance beside the illuminated Ferris wheel at night.",
    year: 2023, width: 1280, height: 720,
  },
];

export const colmarMarketPortrait: GuidePhoto = {
  "src": "/images/guides/colmar/colmar-marshmallow-break-2025.webp",
  "alt": "Me holding a chocolate-covered marshmallow and my camera at a Christmas market stall in Colmar.",
  "caption": "A chocolate-covered marshmallow break on my Colmar walk.",
  "year": 2025,
  "width": 900,
  "height": 1600
};
