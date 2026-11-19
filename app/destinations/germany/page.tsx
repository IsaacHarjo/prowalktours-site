import GermanyClient from "./GermanyClient";
import { pageMetadata } from "../../../lib/seo/pageMetadata";
import PageJsonLd from "../../../components/PageJsonLd";
import GermanyWalkList from "./GermanyWalkList";
import { discoveryVideos } from "../../../lib/tours/server";
import { germanyMapFeatures } from "../../../data/maps/germany";

const publicWalks = new Map(discoveryVideos.filter(walk => walk.country === "Germany").map(walk => [walk.id, walk]));
const mapFeatures = germanyMapFeatures.filter(feature => publicWalks.has(feature.tourId)).map(feature => ({
  ...feature,
  href: publicWalks.get(feature.tourId)!.watchHref,
}));

export const metadata = pageMetadata("Germany Walking Tours", "Explore Germany with Prowalk Tours. Browse the destination archive, available route maps, and walking tour videos.", "/destinations/germany");

export default function Page() { return <><PageJsonLd title="Germany Walking Tours" pathname="/destinations/germany" /><GermanyClient mapFeatures={mapFeatures}><GermanyWalkList /></GermanyClient></>; }
