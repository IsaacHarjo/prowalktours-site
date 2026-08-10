import type { Metadata } from "next";
import VancouverBikeTour2025Client from "./VancouverBikeTour2025Client";
import { vancouverBikeTour2025Detail } from "../../../data/video-details/vancouver-bike-tour-2025";
import { canadaVideos } from "../../../data/videos/canada";
import { stringifyJsonLd } from "../../../lib/seo/jsonLd";
import { buildVideoClips } from "../../../lib/seo/videoClips";

const siteUrl = "https://www.prowalktours.com";
const pageUrl = "https://www.prowalktours.com/videos/vancouver-bike-tour-2025";
const ogImageUrl = "https://img.youtube.com/vi/dfWwFF4h5Sk/maxresdefault.jpg";
const metadataTitle = "Vancouver Seawall & Downtown Bike Tour (2025) | 45 Miles Through Stanley Park & Kitsilano";
const metadataDescription = "Ride 45 miles through Vancouver in this 4K bike tour from Canada Place around Stanley Park, the False Creek Seawall, Kitsilano, Gastown, and downtown.";

const videoRecord = canadaVideos.find(
  (video) => video.slug === "vancouver-bike-tour-2025"
);

export const metadata: Metadata = {
  title: metadataTitle,
  description: metadataDescription,
  alternates: { canonical: pageUrl },
  openGraph: {
    title: metadataTitle,
    description: metadataDescription,
    url: pageUrl,
    images: [{ url: ogImageUrl, alt: "Vancouver bike tour through the seawall and downtown" }],
  },
};

export default function VancouverBikeTour2025Page() {
  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name: "Countries", item: `${siteUrl}/countries` },
      { "@type": "ListItem", position: 3, name: "Canada", item: `${siteUrl}/destinations/canada` },
      { "@type": "ListItem", position: 4, name: "Vancouver Bike Tour", item: pageUrl },
    ],
  };
  const videoStructuredData = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: "Vancouver Seawall & Downtown Bike Tour",
    description: metadataDescription,
    thumbnailUrl: [ogImageUrl],
    embedUrl: "https://www.youtube.com/embed/dfWwFF4h5Sk",
    contentUrl: "https://www.youtube.com/watch?v=dfWwFF4h5Sk",
    uploadDate: "2025-04-04",
    duration: "PT4H16M47S",
    url: pageUrl,
      hasPart: buildVideoClips({
      highlights: vancouverBikeTour2025Detail.highlights,
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
      <VancouverBikeTour2025Client />
    </>
  );
}
