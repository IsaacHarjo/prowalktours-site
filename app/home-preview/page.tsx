import type { Metadata } from "next";
import { discoveryVideos, worldTours } from "../../lib/tours/server";
import HomePreviewClient from "./HomePreviewClient";

export const metadata: Metadata = {
  title: "Homepage design preview | ProWalk Tours",
  description: "A work-in-progress homepage for ProWalk Tours.",
  robots: { index: false, follow: false },
};

export default function HomePreviewPage() {
  return <HomePreviewClient videos={discoveryVideos} tours={worldTours} />;
}
