import type { Metadata } from "next";
import Script from "next/script";
import MontmartreEveningWalk2022Client from "./MontmartreEveningWalk2022Client";

const siteUrl = "https://www.prowalktours.com";
const pageUrl = `${siteUrl}/videos/montmartre-evening-walk-2022`;
const heroImagePath = "/montmartre-evening-walk-2022/hero.jpg";
const ogImageUrl = `${siteUrl}${heroImagePath}`;
const metadataTitle =
  "Montmartre, France Evening Walk (2022) | Sacr\u00e9-C\u0153ur, Place du Tertre, Rue Lepic";
const metadataDescription =
  "Montmartre evening walk in 4K: Place du Tertre, Sacr\u00e9-C\u0153ur, Place des Abbesses, Rue Lepic, and Place Blanche at dusk.";

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
        alt: "Montmartre evening walk with Sacr\u00e9-C\u0153ur",
      },
    ],
  },
};

export default function MontmartreEveningWalk2022Page() {
  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name: "Countries", item: `${siteUrl}/countries` },
      { "@type": "ListItem", position: 3, name: "France", item: `${siteUrl}/destinations/france` },
      { "@type": "ListItem", position: 4, name: "Paris", item: `${siteUrl}/destinations/france/paris` },
      { "@type": "ListItem", position: 5, name: "Montmartre Evening Walk (2022)", item: pageUrl },
    ],
  };

  const videoStructuredData = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: metadataTitle,
    description: metadataDescription,
    thumbnailUrl: [
      "https://i.ytimg.com/vi/hLa9PRc9DFk/maxresdefault.jpg",
      ogImageUrl,
    ],
    embedUrl: "https://www.youtube.com/embed/hLa9PRc9DFk",
    contentUrl: "https://www.youtube.com/watch?v=hLa9PRc9DFk",
    uploadDate: "2022-07-24",
    duration: "PT55M25S",
    url: pageUrl,
  };

  return (
    <>
      <Script
        id="montmartre-evening-breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
      />
      <Script
        id="montmartre-evening-video-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoStructuredData) }}
      />
      <MontmartreEveningWalk2022Client />
    </>
  );
}
