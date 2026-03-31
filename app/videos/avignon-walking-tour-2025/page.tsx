import type { Metadata } from "next";
import Script from "next/script";
import AvignonWalkingTour2025Client from "./AvignonWalkingTour2025Client";

const siteUrl = "https://www.prowalktours.com";
const pageUrl = `${siteUrl}/videos/avignon-walking-tour-2025`;
const heroImagePath = "/avignon-walking-tour-2025/avignon-hero-image.png";
const ogImageUrl = `${siteUrl}${heroImagePath}`;
const metadataTitle =
  "Avignon, France Walking Tour | Palace of the Popes, Old Town, Pont d'Avignon";
const metadataDescription =
  "Avignon, France 4K walking tour: Palace of the Popes, Pont Saint-Bénézet, city ramparts, Les Halles, and the historic streets of Old Town.";

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
        alt: "Avignon historic center and papal landmarks",
      },
    ],
  },
};

export default function AvignonWalkingTour2025Page() {
  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name: "Countries", item: `${siteUrl}/countries` },
      { "@type": "ListItem", position: 3, name: "France", item: `${siteUrl}/destinations/france` },
      { "@type": "ListItem", position: 4, name: "Provence", item: `${siteUrl}/destinations/france/provence` },
      { "@type": "ListItem", position: 5, name: "Avignon, France Walking Tour", item: pageUrl },
    ],
  };

  const videoStructuredData = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: "Avignon, France Walking Tour",
    description: metadataDescription,
    thumbnailUrl: [ogImageUrl],
    embedUrl: "https://www.youtube.com/embed/2iQh_R4t2Uw",
    contentUrl: "https://www.youtube.com/watch?v=2iQh_R4t2Uw",
    uploadDate: "2025-09-18",
    duration: "PT2H23M39S",
    url: pageUrl,
  };

  return (
    <>
      <Script
        id="avignon-breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData),
        }}
      />
      <Script
        id="avignon-video-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(videoStructuredData),
        }}
      />
      <AvignonWalkingTour2025Client />
    </>
  );
}
