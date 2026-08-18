import type { Metadata } from "next";
import OtrantoDayWalk2026Client from "./OtrantoDayWalk2026Client";
import { otrantoDayWalk2026Detail } from "../../../data/video-details/otranto-day-walk-2026";
import { italyVideos } from "../../../data/videos/italy";
import { stringifyJsonLd } from "../../../lib/seo/jsonLd";
import { buildVideoClips } from "../../../lib/seo/videoClips";

const siteUrl = "https://www.prowalktours.com";
const pageUrl = `${siteUrl}/videos/otranto-day-walk-2026`;
const heroImagePath = "/otranto-day-walk-2026/hero.jpg";
const ogImageUrl = `${siteUrl}${heroImagePath}`;
const metadataTitle = "Otranto, Italy Walking Tour 2026 - 4K - with Captions";
const metadataDescription = "Otranto, Italy Walking Tour 2026 - 4K - with Captions in 4K. Otranto is the easternmost town in Italy — on a clear day you can see Albania across the st...";

const videoRecord = italyVideos.find(
  (video) => video.slug === "otranto-day-walk-2026"
);

export const metadata: Metadata = {
  title: metadataTitle,
  description: metadataDescription,
  alternates: { canonical: pageUrl },
  openGraph: {
    title: metadataTitle,
    description: metadataDescription,
    url: pageUrl,
    images: [{ url: ogImageUrl, alt: "Otranto, Italy Walking Tour 2026 - 4K - with Captions" }],
  },
};

export default function Page() {
  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name: "Countries", item: `${siteUrl}/countries` },
      { "@type": "ListItem", position: 3, name: "Italy", item: `${siteUrl}/destinations/italy` },
      { "@type": "ListItem", position: 4, name: "Otranto Walking Tour 2026 - 4K - with Captions", item: pageUrl }
    ],
  };

  const videoStructuredData = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: metadataTitle,
    description: metadataDescription,
    thumbnailUrl: ["https://i.ytimg.com/vi/QMe441s-s4Q/maxresdefault.jpg", ogImageUrl],
    embedUrl: "https://www.youtube.com/embed/QMe441s-s4Q",
    contentUrl: "https://www.youtube.com/watch?v=QMe441s-s4Q",
    uploadDate: "2026-07-19",
    duration: "PT1H47M44S",
    url: pageUrl,
    hasPart: buildVideoClips({
      highlights: otrantoDayWalk2026Detail.highlights,
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
      <OtrantoDayWalk2026Client />
    </>
  );
}
