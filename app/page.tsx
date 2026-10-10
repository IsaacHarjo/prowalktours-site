import HomeClient from "./HomeClient";
import { discoveryVideos, worldTours } from "../lib/tours/server";
import { pageMetadata } from "../lib/seo/pageMetadata";
import PageJsonLd from "../components/PageJsonLd";
import { getNewestWalk } from "../lib/youtube/server";

export const revalidate = 900;

export const metadata = pageMetadata("4K Walking Tours & Destination Maps", "Discover immersive Prowalk Tours videos by country, city, landmark, and theme. Explore 4K walks, binaural sound, Christmas markets, and interactive route maps.", "");

export default async function HomePage() {
  const fallback = discoveryVideos.find(video => video.youtubeUrl.includes("snBqLG2Piyo"));
  const featuredVideo = await getNewestWalk(fallback);
  return <><PageJsonLd title="Home" pathname="" /><HomeClient videos={discoveryVideos} mappedTours={worldTours} featuredVideo={featuredVideo} /></>;
}
