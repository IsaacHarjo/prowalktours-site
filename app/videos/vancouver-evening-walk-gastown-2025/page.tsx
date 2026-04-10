import type { Metadata } from "next";
import Script from "next/script";
import VancouverEveningWalkGastown2025Client from "./VancouverEveningWalkGastown2025Client";

const siteUrl = "https://www.prowalktours.com";
const pageUrl = "https://www.prowalktours.com/videos/vancouver-evening-walk-gastown-2025";
const ogImageUrl = "https://img.youtube.com/vi/idp8quobV8o/maxresdefault.jpg";
const metadataTitle = "Vancouver Evening Walk | Coal Harbour, Gastown, Chinatown & Granville Street (2025)";
const metadataDescription = "An evening walk through Vancouver in 4K featuring Coal Harbour, Canada Place, the Gastown Steam Clock, Chinatown, and Granville Street under spring evening light.";

export const metadata: Metadata = {
  title: metadataTitle,
  description: metadataDescription,
  alternates: { canonical: pageUrl },
  openGraph: {
    title: metadataTitle,
    description: metadataDescription,
    url: pageUrl,
    images: [{ url: ogImageUrl, alt: "Vancouver evening walk through Gastown and Chinatown" }],
  },
};

export default function VancouverEveningWalkGastown2025Page() {
  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name: "Countries", item: `${siteUrl}/countries` },
      { "@type": "ListItem", position: 3, name: "Canada", item: `${siteUrl}/destinations/canada` },
      { "@type": "ListItem", position: 4, name: "Vancouver Evening Walk — Gastown", item: pageUrl },
    ],
  };
  const videoStructuredData = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: "Vancouver Evening Walk — Coal Harbour, Gastown, Chinatown & Granville Street",
    description: metadataDescription,
    thumbnailUrl: [ogImageUrl],
    embedUrl: "https://www.youtube.com/embed/idp8quobV8o",
    contentUrl: "https://www.youtube.com/watch?v=idp8quobV8o",
    uploadDate: "2025-04-05",
    duration: "PT1H46M4S",
    url: pageUrl,
  };
  return (
    <>
      <Script id="gastown-evening-breadcrumb-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }} />
      <Script id="gastown-evening-video-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoStructuredData) }} />
      <VancouverEveningWalkGastown2025Client />
    </>
  );
}
