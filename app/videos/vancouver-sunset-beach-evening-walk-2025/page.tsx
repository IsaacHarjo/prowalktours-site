import type { Metadata } from "next";
import VancouverSunsetBeachEveningWalk2025Client from "./VancouverSunsetBeachEveningWalk2025Client";
import { vancouverSunsetBeachEveningWalk2025Detail } from "../../../data/video-details/vancouver-sunset-beach-evening-walk-2025";
import { canadaVideos } from "../../../data/videos/canada";
import { stringifyJsonLd } from "../../../lib/seo/jsonLd";
import { buildVideoClips } from "../../../lib/seo/videoClips";

const siteUrl = "https://www.prowalktours.com";
const pageUrl = "https://www.prowalktours.com/videos/vancouver-sunset-beach-evening-walk-2025";
const ogImageUrl = "https://img.youtube.com/vi/KQaXN949DW8/maxresdefault.jpg";
const metadataTitle = "Vancouver Sunset Beach Evening Walk (2025) | English Bay to Granville Island";
const metadataDescription = "An evening walk along Vancouver's waterfront from English Bay Beach and Sunset Beach to the False Creek ferry and Granville Island in 4K.";

const videoRecord = canadaVideos.find(
  (video) => video.slug === "vancouver-sunset-beach-evening-walk-2025"
);

export const metadata: Metadata = {
  title: metadataTitle,
  description: metadataDescription,
  alternates: { canonical: pageUrl },
  openGraph: {
    title: metadataTitle,
    description: metadataDescription,
    url: pageUrl,
    images: [{ url: ogImageUrl, alt: "Vancouver Sunset Beach evening walk" }],
  },
};

export default function VancouverSunsetBeachEveningWalk2025Page() {
  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name: "Countries", item: `${siteUrl}/countries` },
      { "@type": "ListItem", position: 3, name: "Canada", item: `${siteUrl}/destinations/canada` },
      { "@type": "ListItem", position: 4, name: "Vancouver Sunset Beach Evening Walk", item: pageUrl },
    ],
  };
  const videoStructuredData = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: "Vancouver Sunset Beach Evening Walk",
    description: metadataDescription,
    thumbnailUrl: [ogImageUrl],
    embedUrl: "https://www.youtube.com/embed/KQaXN949DW8",
    contentUrl: "https://www.youtube.com/watch?v=KQaXN949DW8",
    uploadDate: "2025-04-04",
    duration: "PT54M32S",
    url: pageUrl,
      hasPart: buildVideoClips({
      highlights: vancouverSunsetBeachEveningWalk2025Detail.highlights,
      canonicalUrl: pageUrl,
      videoDurationSeconds: videoRecord?.durationSeconds,
    }),
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: stringifyJsonLd(breadcrumbStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: stringifyJsonLd(videoStructuredData),
        }}
      />
      <VancouverSunsetBeachEveningWalk2025Client />
    </>
  );
}
