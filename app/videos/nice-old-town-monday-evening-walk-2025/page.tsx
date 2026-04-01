import type { Metadata } from "next";
import Script from "next/script";
import NiceOldTownMondayEveningWalk2025Client from "./NiceOldTownMondayEveningWalk2025Client";

const siteUrl = "https://www.prowalktours.com";
const pageUrl = `${siteUrl}/videos/nice-old-town-monday-evening-walk-2025`;
const heroImagePath = "/nice-old-town-monday-evening-walk-2025/hero.jpg";
const ogImageUrl = `${siteUrl}${heroImagePath}`;
const metadataTitle =
  "Nice, France Evening Walk (2025) | Place Masséna, Vieux Nice, Cours Saleya";
const metadataDescription =
  "Nice evening walk in 4K: Place Masséna, Vieux Nice old town, Cours Saleya, and the French Riviera waterfront at dusk.";

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
        alt: "Nice evening walk along the French Riviera waterfront",
      },
    ],
  },
};

export default function NiceOldTownMondayEveningWalk2025Page() {
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
        name: "French Riviera",
        item: `${siteUrl}/destinations/france/french-riviera`,
      },
      {
        "@type": "ListItem",
        position: 5,
        name: "Nice, France Evening Walk (2025)",
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
      "https://i.ytimg.com/vi/br0MPT2SdTE/maxresdefault.jpg",
      ogImageUrl,
    ],
    embedUrl: "https://www.youtube.com/embed/br0MPT2SdTE",
    contentUrl: "https://www.youtube.com/watch?v=br0MPT2SdTE",
    uploadDate: "2025-09-08",
    duration: "PT1H30M55S",
    url: pageUrl,
  };

  return (
    <>
      <Script
        id="nice-evening-walk-breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData),
        }}
      />
      <Script
        id="nice-evening-walk-video-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(videoStructuredData),
        }}
      />
      <NiceOldTownMondayEveningWalk2025Client />
    </>
  );
}
