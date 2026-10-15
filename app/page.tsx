import HomeClient from "./HomeClient";
import { discoveryVideos, worldTours } from "../lib/tours/server";
import { pageMetadata } from "../lib/seo/pageMetadata";
import PageJsonLd from "../components/PageJsonLd";
import { getNewestWalk } from "../lib/youtube/server";

export const revalidate = 900;

const homeMetadata = pageMetadata("4K Walking Tours & Destination Maps", "Explore through my walks. Plan a journey of your own with 4K walking tours, destination maps, and firsthand travel guides.", "");
export const metadata = {
  ...homeMetadata,
  openGraph: { ...homeMetadata.openGraph, title: "Prowalk Tours — Your first step before you travel." },
};

export default async function HomePage() {
  const fallback = discoveryVideos.find(video => video.youtubeUrl.includes("snBqLG2Piyo"));
  const featuredVideo = await getNewestWalk(fallback);
  return <><PageJsonLd title="Home" pathname="" /><HomeClient videos={discoveryVideos} mappedTours={worldTours} featuredVideo={featuredVideo} /></>;
}
