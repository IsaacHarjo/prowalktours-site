import type { Metadata } from "next";
import ParisLatinQuarterMaraisEveningWalk2020Client from "./ParisLatinQuarterMaraisEveningWalk2020Client";
import { parisLatinQuarterMaraisEveningWalk2020Detail } from "../../../data/video-details/paris-latin-quarter-marais-evening-walk-2020";
import { franceVideos } from "../../../data/videos/france";
import { stringifyJsonLd } from "../../../lib/seo/jsonLd";
import { buildVideoClips } from "../../../lib/seo/videoClips";

const siteUrl = "https://www.prowalktours.com";
const pageUrl = `${siteUrl}/videos/paris-latin-quarter-marais-evening-walk-2020`;
const heroImagePath = "/paris-latin-quarter-marais-evening-walk-2020/hero.jpg";
const ogImageUrl = `${siteUrl}${heroImagePath}`;
const metadataTitle =
  "Paris Latin Quarter & Marais Evening Walk | Paris, France (2020)";
const metadataDescription =
  "Paris Latin Quarter & Marais evening walk in 4K: Place Saint-Michel, Rue des Rosiers, Bastille, and a night bike ride past H\u00F4tel de Ville and the Louvre.";

const videoRecord = franceVideos.find(
  (video) => video.slug === "paris-latin-quarter-marais-evening-walk-2020"
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
        alt: "Paris Latin Quarter & Marais Evening Walk hero image",
      },
    ],
  },
};

export default function ParisLatinQuarterMaraisEveningWalk2020Page() {
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
        name: "France",
        item: `${siteUrl}/destinations/france`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Paris",
        item: `${siteUrl}/destinations/france/paris`,
      },
      {
        "@type": "ListItem",
        position: 5,
        name: "Paris Latin Quarter & Marais Evening Walk",
        item: pageUrl,
      },
    ],
  };

  const videoStructuredData = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: "Paris Latin Quarter & Marais Evening Walk (2020)",
    description: metadataDescription,
    thumbnailUrl: [ogImageUrl],
    embedUrl: "https://www.youtube.com/embed/1_XzrxXnwMM",
    contentUrl: "https://www.youtube.com/watch?v=1_XzrxXnwMM",
    uploadDate: "2020-07-18",
    duration: "PT1H6M13S",
    url: pageUrl,
      hasPart: buildVideoClips({
      highlights: parisLatinQuarterMaraisEveningWalk2020Detail.highlights,
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
      <ParisLatinQuarterMaraisEveningWalk2020Client />
    </>
  );
}
