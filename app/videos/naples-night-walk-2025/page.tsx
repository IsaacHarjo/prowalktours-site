import type { Metadata } from "next";
import Script from "next/script";
import NaplesNightWalk2025Client from "./NaplesNightWalk2025Client";

const siteUrl = "https://www.prowalktours.com";
const pageUrl = `${siteUrl}/videos/naples-night-walk-2025`;
const heroImageSrc = "/naples/night-walks.jpg";
const ogImageUrl = `${siteUrl}${heroImageSrc}`;
const metadataTitle =
  "Naples Night Walk 2025 | Via Toledo, Spanish Quarter, Waterfront";
const metadataDescription =
  "Explore Naples at night in this 4K walking tour through Via Toledo, the Spanish Quarter, Galleria Umberto I, Piazza del Plebiscito, Via Chiaia, and the waterfront to Castel dell'Ovo.";
const youtubeVideoId = "Cv1zIRhxvHU";

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
  };

  return (
    <>
      <Script
        id="naples-night-walk-breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData),
        }}
      />
      <Script
        id="naples-night-walk-video-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(videoStructuredData),
        }}
      />
      <NaplesNightWalk2025Client />
    </>
  );
}
