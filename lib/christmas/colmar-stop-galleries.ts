import type { GuidePhoto } from "../guides/types";
import { colmarPhotos as photos } from "./colmar-photos";

// Selected from the owner’s named location folders; full provenance is in docs/christmas-markets.
export const colmarStopGalleries: Record<string, GuidePhoto[]> = {
  "dominicains": [
    photos.C188,
    {"src":"/images/guides/colmar/colmar-dominicains-tree-and-stalls-2023.webp","alt":"A Christmas tree and market stalls beside the Dominican Church in Colmar.","year":2023,"width":1400,"height":788},
    {"src":"/images/guides/colmar/colmar-dominicains-church-and-chalets-2023.webp","alt":"Rows of Christmas chalets beneath the tall windows of the Dominican Church.","year":2023,"width":1400,"height":788},
    photos.C080,
  ],
  "ancienne-douane": [
    photos.C254,
    {"src":"/images/guides/colmar/colmar-ancienne-douane-canal-daytime-2023.webp","alt":"Visitors walking beside the canal and half-timbered houses at Place de l’Ancienne Douane.","year":2023,"width":1400,"height":788},
    {"src":"/images/guides/colmar/colmar-ancienne-douane-schwendi-fountain-2023.webp","alt":"The Schwendi Fountain surrounded by Christmas stalls and half-timbered houses at night.","year":2023,"width":1400,"height":787},
    {"src":"/images/guides/colmar/colmar-ancienne-douane-koifhus-night-2023.webp","alt":"The decorated Schwendi Fountain in front of the illuminated Koïfhus at night.","year":2023,"width":1400,"height":787},
  ],
  "koifhus": [
    {"src":"/images/guides/colmar/colmar-koifhus-decorated-balcony-day-2025.webp","alt":"The Koïfhus exterior with festive figures lining its wooden balcony in daylight.","year":2025,"width":1400,"height":1050},
    {"src":"/images/guides/colmar/colmar-koifhus-decorated-balcony-evening-2025.webp","alt":"Pink Christmas lighting on the decorated Koïfhus balcony at blue hour.","year":2025,"width":1400,"height":1050},
    {"src":"/images/guides/colmar/colmar-koifhus-illuminated-facade-2025.webp","alt":"Snowflake projections on the Koïfhus facade beneath its clock and roof.","year":2025,"width":1400,"height":1050},
  ],
  "petite-venise": [
    {"src":"/images/guides/colmar/colmar-petite-venise-childrens-market-day-2023.webp","alt":"Visitors around the children’s Christmas market and carousel at Petite Venise.","year":2023,"width":1400,"height":788},
    photos.C264,
    {"src":"/images/guides/colmar/colmar-petite-venise-childrens-decorations-2025.webp","alt":"A teddy bear and colorful Christmas decorations at the children’s market in Petite Venise.","year":2025,"width":1050,"height":1400},
  ],
  "gourmet": [
    {"src":"/images/guides/colmar/colmar-gourmet-market-ferris-wheel-2025.webp","alt":"The Ferris wheel beside the Gourmet Market in the Montagne Verte area.","year":2025,"width":1050,"height":1400},
  ],
};
