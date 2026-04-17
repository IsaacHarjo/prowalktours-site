import type { Metadata } from "next";
import Script from "next/script";
import ArlesRomanOldTownDayWalk2025Client from "./ArlesRomanOldTownDayWalk2025Client";

const siteUrl = "https://www.prowalktours.com";
const pageUrl = `${siteUrl}/videos/arles-roman-old-town-day-walk-2025`;
const ogImageUrl = "https://img.youtube.com/vi/vRdoJsGj0Z4/maxresdefault.jpg";
const metadataTitle =
  "Arles, France Walking Tour | Roman Amphitheatre, Saint-Trophime & Wednesday Market";
const metadataDescription =
  "Explore Arles in this 4K walking tour through the Roman amphitheatre, ancient theatre, Saint-Trophime cloister, Cryptoportiques, and the famous Wednesday market along Boulevard des Lices.";

export const metadata: Metadata = {
  title: metadataTitle,
  description: metadataDescription,
  alternates: { canonical: pageUrl },
  openGraph: {
    title: metadataTitle,
    description: metadataDescription,
    url: pageUrl,
    images: [
      {
        url: ogImageUrl,
        alt: "Arles Roman old town and amphitheatre in Provence",
      },
    ],
  },
};

export default function ArlesRomanOldTownDayWalk2025Page() {
  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name: "Countries", item: `${siteUrl}/countries` },
      { "@type": "ListItem", position: 3, name: "France", item: `${siteUrl}/destinations/france` },
      { "@type": "ListItem", position: 4, name: "Provence", item: `${siteUrl}/destinations/france/provence` },
      { "@type": "ListItem", position: 5, name: "Arles, France Walking Tour", item: pageUrl },
    ],
  };

  const videoStructuredData = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: "Arles, France Roman Old Town Walk",
    description: metadataDescription,
    thumbnailUrl: [ogImageUrl],
    embedUrl: "https://www.youtube.com/embed/vRdoJsGj0Z4",
    contentUrl: "https://www.youtube.com/watch?v=vRdoJsGj0Z4",
    uploadDate: "2025-09-17",
    duration: "PT3H11M12S",
    url: pageUrl,
  };

  return (
    <>
      <Script
        id="arles-breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData),
        }}
      />
      <Script
        id="arles-video-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(videoStructuredData),
        }}
      />
      <ArlesRomanOldTownDayWalk2025Client />
    </>
  );
}
