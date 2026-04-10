import type { Metadata } from "next";
import Script from "next/script";
import GranvilleIslandWalkingTourVancouverClient from "./GranvilleIslandWalkingTourVancouverClient";

const siteUrl = "https://www.prowalktours.com";
const pageUrl = "https://www.prowalktours.com/videos/granville-island-walking-tour-vancouver";
const ogImageUrl = "https://img.youtube.com/vi/fyQqc6cZNA8/maxresdefault.jpg";
const metadataTitle = "Granville Island Walking Tour | Public Market, Boardwalks & Boat Yards — Vancouver";
const metadataDescription = "Explore Granville Island in this 4K walking tour through the Public Market, waterfront boardwalks, Ron Basford Park, and the boat yards in Vancouver.";

export const metadata: Metadata = {
  title: metadataTitle,
  description: metadataDescription,
  alternates: { canonical: pageUrl },
  openGraph: {
    title: metadataTitle,
    description: metadataDescription,
    url: pageUrl,
    images: [{ url: ogImageUrl, alt: "Granville Island walking tour in Vancouver" }],
  },
};

export default function GranvilleIslandWalkingTourVancouverPage() {
  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name: "Countries", item: `${siteUrl}/countries` },
      { "@type": "ListItem", position: 3, name: "Canada", item: `${siteUrl}/destinations/canada` },
      { "@type": "ListItem", position: 4, name: "Granville Island Walking Tour", item: pageUrl },
    ],
  };
  const videoStructuredData = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: "Granville Island Walking Tour",
    description: metadataDescription,
    thumbnailUrl: [ogImageUrl],
    embedUrl: "https://www.youtube.com/embed/fyQqc6cZNA8",
    contentUrl: "https://www.youtube.com/watch?v=fyQqc6cZNA8",
    uploadDate: "2025-07-28",
    duration: "PT46M44S",
    url: pageUrl,
  };
  return (
    <>
      <Script id="granville-island-breadcrumb-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }} />
      <Script id="granville-island-video-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoStructuredData) }} />
      <GranvilleIslandWalkingTourVancouverClient />
    </>
  );
}
