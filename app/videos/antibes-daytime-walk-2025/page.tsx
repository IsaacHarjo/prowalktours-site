import type { Metadata } from "next";
import Script from "next/script";
import AntibesDaytimeWalk2025Client from "./AntibesDaytimeWalk2025Client";

const siteUrl = "https://www.prowalktours.com";
const pageUrl = `${siteUrl}/videos/antibes-daytime-walk-2025`;
const heroImagePath = "/antibes-daytime-walk-2025/antibes-hero-image.jpg";
const ogImageUrl = `${siteUrl}${heroImagePath}`;
const metadataTitle =
  "Antibes, France Walking Tour | Old Town, Picasso Museum, Market and Seafront";
const metadataDescription =
  "Antibes, France 4K walking tour: Old Town, waterfront promenade, marina, market streets, and beaches along the Côte d'Azur.";

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
        alt: "Antibes Old Town and French Riviera seafront",
      },
    ],
  },
};

export default function AntibesDaytimeWalk2025Page() {
  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name: "Countries", item: `${siteUrl}/countries` },
      { "@type": "ListItem", position: 3, name: "France", item: `${siteUrl}/destinations/france` },
      { "@type": "ListItem", position: 4, name: "French Riviera", item: `${siteUrl}/destinations/france/french-riviera` },
      { "@type": "ListItem", position: 5, name: "Antibes, France Walking Tour", item: pageUrl },
    ],
  };

  const videoStructuredData = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: "Antibes, France Walking Tour",
    description: metadataDescription,
    thumbnailUrl: [ogImageUrl],
    embedUrl: "https://www.youtube.com/embed/LECdWNv2kzA",
    contentUrl: "https://www.youtube.com/watch?v=LECdWNv2kzA",
    uploadDate: "2025-09-12",
    duration: "PT2H16M36S",
    url: pageUrl,
  };

  return (
    <>
      <Script
        id="antibes-breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData),
        }}
      />
      <Script
        id="antibes-video-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(videoStructuredData),
        }}
      />
      <AntibesDaytimeWalk2025Client />
    </>
  );
}
