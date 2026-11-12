import CountriesClient from "./CountriesClient";
import { pageMetadata } from "../../lib/seo/pageMetadata";
import PageJsonLd from "../../components/PageJsonLd";
import { discoveryVideos } from "../../lib/tours/server";

export const metadata = pageMetadata("Browse Countries", "Browse Prowalk Tours by country. Explore destination maps, cities, and immersive walking tour videos.", "/countries");

export default function Page() {
  // Only per-country counts of public walks reach the client.
  const walkCounts: Record<string, number> = {};
  for (const video of discoveryVideos) {
    walkCounts[video.country] = (walkCounts[video.country] ?? 0) + 1;
  }
  return <><PageJsonLd title="Browse Countries" pathname="/countries" /><CountriesClient walkCounts={walkCounts} /></>;
}
