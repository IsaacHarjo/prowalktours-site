import type { Metadata } from "next";
import NaplesNightWalk2025Client from "./NaplesNightWalk2025Client";
import { naplesNightWalk2025Detail } from "../../../data/video-details/naples-night-walk-2025";
import { italyVideos } from "../../../data/videos/italy";
import { stringifyJsonLd } from "../../../lib/seo/jsonLd";
import { buildVideoClips } from "../../../lib/seo/videoClips";

const siteUrl = "https://www.prowalktours.com";
const pageUrl = `${siteUrl}/videos/naples-night-walk-2025`;
const heroImageSrc = "/naples/night-walks.jpg";
const ogImageUrl = `${siteUrl}${heroImageSrc}`;
const metadataTitle =
  "Naples Night Walk 2025 | Via Toledo, Spanish Quarter, Waterfront";
const metadataDescription =
  "Naples night walk in 4K: Via Toledo, Spanish Quarter, Galleria Umberto I, Piazza del Plebiscito, and the waterfront to Castel dell'Ovo.";
const youtubeVideoId = "Cv1zIRhxvHU";

const videoRecord = italyVideos.find(
  (video) => video.slug === "naples-night-walk-2025"
);

export const metadata: Metadata = {
  title: metadataTitle,
  description: metadataDescription,
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: metadataTitle,
    description: metadataDescription,
    url: pageUrl,
    images: [
      {
        url: ogImageUrl,
        alt: "Naples streets and waterfront at night",
      },
    ],
  },
};

export default function NaplesNightWalk2025Page() {
  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${siteUrl}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Countries",
        item: `${siteUrl}/countries`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Italy",
        item: `${siteUrl}/destinations/italy`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Campania",
        item: `${siteUrl}/destinations/italy/campania`,
      },
      {
        "@type": "ListItem",
        position: 5,
        name: "Naples",
        item: `${siteUrl}/destinations/italy/campania/naples`,
      },
      {
        "@type": "ListItem",
        position: 6,
        name: "Naples Night Walk (June 2025)",
        item: pageUrl,
      },
    ],
  };

  const videoStructuredData = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: metadataTitle,
    description: metadataDescription,
    thumbnailUrl: [
      `https://i.ytimg.com/vi/${youtubeVideoId}/maxresdefault.jpg`,
      ogImageUrl,
    ],
    uploadDate: "2025-06-07",
    duration: "PT2H12M",
    embedUrl: `https://www.youtube.com/embed/${youtubeVideoId}`,
    contentUrl: "https://youtu.be/Cv1zIRhxvHU",
    url: pageUrl,
      hasPart: buildVideoClips({
      highlights: naplesNightWalk2025Detail.highlights,
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
      <NaplesNightWalk2025Client />
    </>
  );
}
