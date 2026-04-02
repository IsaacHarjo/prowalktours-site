import type { Metadata } from "next";
import Script from "next/script";
import ColmarChristmasMarketEveningWalk2023Client from "./ColmarChristmasMarketEveningWalk2023Client";

const siteUrl = "https://www.prowalktours.com";
const pageUrl = `${siteUrl}/videos/colmar-christmas-market-evening-walk-2023`;
const heroImagePath = "/colmar-christmas-market-evening-walk-2023/hero.jpg";
const ogImageUrl = `${siteUrl}${heroImagePath}`;
const metadataTitle = "Colmar, France Christmas Market Evening Walk (2023)";
const metadataDescription = "Colmar, France Christmas Market Evening Walk in 4K. This evening walk through Colmar’s Christmas markets follows the old town through several of the cit.";

export const metadata: Metadata = {
  title: metadataTitle,
  description: metadataDescription,
  alternates: { canonical: pageUrl },
  openGraph: {
    title: metadataTitle,
    description: metadataDescription,
    url: pageUrl,
    images: [{ url: ogImageUrl, alt: "Colmar, France Christmas Market Evening Walk (2023)" }],
  },
};

export default function Page() {
  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name: "Countries", item: `${siteUrl}/countries` },
      { "@type": "ListItem", position: 3, name: "France", item: `${siteUrl}/destinations/france` },
      { "@type": "ListItem", position: 4, name: "ColmarChristmas Market Evening Walk", item: pageUrl }
    ],
  };

  const videoStructuredData = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: metadataTitle,
    description: metadataDescription,
    thumbnailUrl: ["https://i.ytimg.com/vi/NMQ4Sy3e-Ec/maxresdefault.jpg", ogImageUrl],
    embedUrl: "https://www.youtube.com/embed/NMQ4Sy3e-Ec",
    contentUrl: "https://www.youtube.com/watch?v=NMQ4Sy3e-Ec",
    uploadDate: "2023-12-04",
    duration: "PT1H48M39S",
    url: pageUrl,
  };

  return (
    <>
      <Script id="colmar-christmas-market-evening-walk-2023-bc-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }} />
      <Script id="colmar-christmas-market-evening-walk-2023-video-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoStructuredData) }} />
      <ColmarChristmasMarketEveningWalk2023Client />
    </>
  );
}
