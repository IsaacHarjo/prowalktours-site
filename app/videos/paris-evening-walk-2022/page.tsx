import type { Metadata } from "next";
import ParisEveningWalk2022Client from "./ParisEveningWalk2022Client";
import { parisEveningWalk2022Detail } from "../../../data/video-details/paris-evening-walk-2022";
import { franceVideos } from "../../../data/videos/france";
import { stringifyJsonLd } from "../../../lib/seo/jsonLd";
import { buildVideoClips } from "../../../lib/seo/videoClips";

const siteUrl = "https://www.prowalktours.com";
const pageUrl = `${siteUrl}/videos/paris-evening-walk-2022`;
const videoRecord = franceVideos.find(
  (video) => video.slug === "paris-evening-walk-2022"
);
const heroImagePath = "/paris-evening-walk-2022/paris-evening-walk-placeholder-hero.svg";
const ogImageUrl = `${siteUrl}${heroImagePath}`;
const metadataTitle = "Paris, France Evening Walk (2022)";
const metadataDescription =
  "Paris evening walk in 4K: Saint-Michel, Notre-Dame, the Marais, Bastille, Eiffel Tower, the Louvre, Pont Neuf, and the Panth\u00e9on. Long-form, Paris, France.";

const breadcrumbStructuredData = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
    { "@type": "ListItem", position: 2, name: "Countries", item: `${siteUrl}/countries` },
    { "@type": "ListItem", position: 3, name: "France", item: `${siteUrl}/destinations/france` },
    { "@type": "ListItem", position: 4, name: "Paris, France Evening Walk (2022)", item: pageUrl },
  ],
};

const videoStructuredData = {
  "@context": "https://schema.org",
  "@type": "VideoObject",
  name: metadataTitle,
  description: metadataDescription,
  thumbnailUrl: [ogImageUrl],
  embedUrl: "https://www.youtube.com/embed/fKgP6JGAM_A",
  contentUrl: "https://www.youtube.com/watch?v=fKgP6JGAM_A",
  uploadDate: "2022-07-23",
  duration: "PT2H25M33S",
  url: pageUrl,
    hasPart: buildVideoClips({
      highlights: parisEveningWalk2022Detail.highlights,
      canonicalUrl: pageUrl,
      videoDurationSeconds: videoRecord?.durationSeconds,
    }),
  };

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
        alt: "Paris evening walk placeholder hero image",
      },
    ],
  },
};

export default function ParisEveningWalk2022Page() {
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
      <ParisEveningWalk2022Client />
    </>
  );
}
