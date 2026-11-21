import FranceClient from "./FranceClient";
import { pageMetadata } from "../../../lib/seo/pageMetadata";
import PageJsonLd from "../../../components/PageJsonLd";
import FranceWalkList from "./FranceWalkList";
import { discoveryVideos, worldTours } from "../../../lib/tours/server";
import { franceMapFeatures } from "../../../data/maps/france";
import type { ExploreMapFeature } from "../../../data/maps/types";

const publicWalks = new Map(discoveryVideos.filter(walk => walk.country === "France").map(walk => [walk.id, walk]));
const mapFeatures: ExploreMapFeature[] = franceMapFeatures.filter(feature => publicWalks.has(feature.tourId)).map(feature => ({
  ...feature,
  href: publicWalks.get(feature.tourId)!.watchHref,
  watchHref: publicWalks.get(feature.tourId)!.watchHref,
}));
// Include public additions that have coordinates but are not in the older map export.
for (const point of worldTours.filter(point => point.country === "France" && !mapFeatures.some(feature => feature.tourId === point.tourId))) {
  const walk = publicWalks.get(point.tourId)!;
  const feature: ExploreMapFeature = {
    tourId: walk.id, country: walk.country, region: walk.region, city: walk.city,
    location: walk.city, title: walk.siteTitle, slug: walk.slug, videoType: walk.videoType,
    themes: [], filmedDateIso: walk.filmingDates[0] || null, filmedYear: point.filmedYear,
    youtubeUrl: walk.youtubeUrl, mapUrl: null, latitude: point.latitude, longitude: point.longitude,
    durationLabel: walk.durationLabel, durationSeconds: walk.durationSeconds,
    descriptionShort: walk.shortDescription, descriptionLong: walk.shortDescription,
    landmarks: walk.landmarks, keywords: walk.keywords, status: "published",
    thumbnailPath: null, thumbnailSrc: walk.thumbnail, href: walk.watchHref, watchHref: walk.watchHref,
  };
  mapFeatures.push(feature);
}

export const metadata = pageMetadata("France Walking Tours", "Explore France with Prowalk Tours. Browse the destination archive, available route maps, and walking tour videos.", "/destinations/france");

export default function Page() { return <><PageJsonLd title="France Walking Tours" pathname="/destinations/france" /><FranceClient mapFeatures={mapFeatures}><FranceWalkList /></FranceClient></>; }
