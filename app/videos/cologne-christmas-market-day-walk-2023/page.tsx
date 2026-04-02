import type { Metadata } from "next";
import Script from "next/script";
import CologneChristmasMarketDayWalk2023Client from "./CologneChristmasMarketDayWalk2023Client";

const siteUrl = "https://www.prowalktours.com";
const pageUrl = `${siteUrl}/videos/cologne-christmas-market-day-walk-2023`;
const heroImagePath = "/cologne-christmas-market-day-walk-2023/hero.jpg";
const ogImageUrl = `${siteUrl}${heroImagePath}`;
const metadataTitle = "Cologne, Germany Christmas Market Day Walk (2023)";
const metadataDescription = "Cologne, Germany Christmas Market Day Walk in 4K. This is a daytime tour through the Christmas markets in Cologne.";

export const metadata: Metadata = {
  title: metadataTitle,
  description: metadataDescription,
  alternates: { canonical: pageUrl },
  openGraph: {
    title: metadataTitle,
    description: metadataDescription,
    url: pageUrl,
    images: [{ url: ogImageUrl, alt: "Cologne, Germany Christmas Market Day Walk (2023)" }],
  },
};

export default function Page() {
  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name: "Countries", item: `${siteUrl}/countries` },
      { "@type": "ListItem", position: 3, name: "Germany", item: `${siteUrl}/destinations/germany` },
      { "@type": "ListItem", position: 4, name: "Cologne, Germany Christmas Market Day Walk", item: pageUrl }
    ],
  };

  const videoStructuredData = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: metadataTitle,
    description: metadataDescription,
    thumbnailUrl: ["https://i.ytimg.com/vi/GCsPZt5qUpg/maxresdefault.jpg", ogImageUrl],
    embedUrl: "https://www.youtube.com/embed/GCsPZt5qUpg",
    contentUrl: "https://www.youtube.com/watch?v=GCsPZt5qUpg",
    uploadDate: "2023-11-28",
    duration: "PT1H59M59S",
    url: pageUrl,
  };

  return (
    <>
      <Script id="cologne-christmas-market-day-walk-2023-bc-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }} />
      <Script id="cologne-christmas-market-day-walk-2023-video-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoStructuredData) }} />
      <CologneChristmasMarketDayWalk2023Client />
    </>
  );
}
