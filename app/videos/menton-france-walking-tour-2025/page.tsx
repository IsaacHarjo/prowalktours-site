import type { Metadata } from "next";
import Script from "next/script";
import MentonFranceWalkingTour2025Client from "./MentonFranceWalkingTour2025Client";

const siteUrl = "https://www.prowalktours.com";
const pageUrl = "https://www.prowalktours.com/videos/menton-france-walking-tour-2025";
const ogImageUrl =
  "https://www.prowalktours.com/menton-france-walking-tour-2025/menton-hero-image.jpg";
const metadataTitle =
  "Menton, France Walking Tour | French Riviera Old Town and Seafront";
const metadataDescription =
  "Explore Menton on the French Riviera in this 4K walking tour from Sablettes Beach through Old Town, Rue du Vieux Chateau, and the castle ruins at Cimetiere du Vieux Chateau.";

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
        alt: "Menton waterfront and Old Town on the French Riviera",
      },
    ],
  },
};

export default function MentonFranceWalkingTour2025Page() {
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
        name: "Menton, France Walking Tour",
        item: pageUrl,
      },
    ],
  };

  const videoStructuredData = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: "Menton, France Walking Tour",
    description: metadataDescription,
    thumbnailUrl: [ogImageUrl],
    embedUrl: "https://www.youtube.com/embed/ulReotWQvO0",
    contentUrl: "https://www.youtube.com/watch?v=ulReotWQvO0",
    uploadDate: "2025-09-09",
    url: pageUrl,
  };

  return (
    <>
      <Script
        id="menton-breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData),
        }}
      />
      <Script
        id="menton-video-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(videoStructuredData),
        }}
      />
      <MentonFranceWalkingTour2025Client />
    </>
  );
}
