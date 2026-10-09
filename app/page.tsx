import HomeClient from "./HomeClient";
import { discoveryVideos, worldTours } from "../lib/tours/server";
import { pageMetadata } from "../lib/seo/pageMetadata";
import PageJsonLd from "../components/PageJsonLd";

export const metadata = pageMetadata("4K Walking Tours & Destination Maps", "Discover immersive Prowalk Tours videos by country, city, landmark, and theme. Explore 4K walks, binaural sound, Christmas markets, and interactive route maps.", "");

export default function HomePage() {
  return <><PageJsonLd title="Home" pathname="" /><HomeClient videos={discoveryVideos} mappedTours={worldTours} /></>;
}
