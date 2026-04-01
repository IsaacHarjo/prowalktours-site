import type { Metadata } from "next";
import Script from "next/script";
import ParisLuxemburgGardensDayWalk2020Client from "./ParisLuxemburgGardensDayWalk2020Client";

const siteUrl = "https://www.prowalktours.com";
const pageUrl = `${siteUrl}/videos/paris-luxemburg-gardens-day-walk-2020`;
const heroImagePath = "/paris-luxemburg-gardens-day-walk-2020/hero.jpg";
const ogImageUrl = `${siteUrl}${heroImagePath}`;
const metadataTitle =
  "Paris Luxembourg Gardens Walk (2020) | Grand Basin, Palais du Luxembourg";
const metadataDescription =
  "Paris Luxembourg Gardens walk in 4K: Grand Basin sailboats, Statue of Liberty, Orangerie du S\u00e9nat, rose garden, and Palais du Luxembourg.";

export const metadata: Metadata = {
  title: metadataTitle,
  description: metadataDescription,
  alternates: { canonical: pageUrl },
  openGraph: {
    title: metadataTitle,
    description: metadataDescription,
    url: pageUrl,
    images: [{ url: ogImageUrl, alt: "Luxembourg Gardens in Paris" }],
  },
};

export default function ParisLuxemburgGardensDayWalk2020Page() {
  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name: "Countries", item: `${siteUrl}/countries` },
      { "@type": "ListItem", position: 3, name: "France", item: `${siteUrl}/destinations/france` },
      { "@type": "ListItem", position: 4, name: "Paris", item: `${siteUrl}/destinations/france/paris` },
      { "@type": "ListItem", position: 5, name: "Luxembourg Gardens Walk (2020)", item: pageUrl },
    ],
  };

  const videoStructuredData = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: metadataTitle,
    description: metadataDescription,
    thumbnailUrl: ["https://i.ytimg.com/vi/bibZZXvk-UE/maxresdefault.jpg", ogImageUrl],
    embedUrl: "https://www.youtube.com/embed/bibZZXvk-UE",
    contentUrl: "https://www.youtube.com/watch?v=bibZZXvk-UE",
    uploadDate: "2020-07-19",
    duration: "PT29M9S",
    url: pageUrl,
  };

  return (
    <>
      <Script id="luxembourg-gardens-breadcrumb-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }} />
      <Script id="luxembourg-gardens-video-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoStructuredData) }} />
      <ParisLuxemburgGardensDayWalk2020Client />
    </>
  );
}
