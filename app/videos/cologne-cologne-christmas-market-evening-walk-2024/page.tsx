import type { Metadata } from "next";
import Script from "next/script";
import CologneCologneChristmasMarketEveningWalk2024Client from "./CologneCologneChristmasMarketEveningWalk2024Client";

const siteUrl = "https://www.prowalktours.com";
const pageUrl = `${siteUrl}/videos/cologne-cologne-christmas-market-evening-walk-2024`;
const heroImagePath = "/cologne-cologne-christmas-market-evening-walk-2024/hero.jpg";
const ogImageUrl = `${siteUrl}${heroImagePath}`;
const metadataTitle = "Cologne, Germany Christmas Market Evening Walk (2023)";
const metadataDescription = "Cologne, Germany Christmas Market Evening Walk in 4K. This is an evening walk through the Christmas markets in Cologne.";

export const metadata: Metadata = {
  title: metadataTitle,
  description: metadataDescription,
  alternates: { canonical: pageUrl },
  openGraph: {
    title: metadataTitle,
    description: metadataDescription,
    url: pageUrl,
    images: [{ url: ogImageUrl, alt: "Cologne, Germany Christmas Market Evening Walk (2023)" }],
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
      { "@type": "ListItem", position: 4, name: "Cologne, Germany Christmas Market Evening Walk", item: pageUrl }
    ],
  };

  const videoStructuredData = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: metadataTitle,
    description: metadataDescription,
    thumbnailUrl: ["https://i.ytimg.com/vi//maxresdefault.jpg", ogImageUrl],
    embedUrl: "https://www.youtube.com/embed/",
    contentUrl: "https://www.youtube.com/watch?v=",
    uploadDate: "2024-11-28",
    duration: "PT2H7M13S",
    url: pageUrl,
  };

  return (
    <>
      <Script id="cologne-cologne-christmas-market-evening-walk-2024-bc-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }} />
      <Script id="cologne-cologne-christmas-market-evening-walk-2024-video-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoStructuredData) }} />
      <CologneCologneChristmasMarketEveningWalk2024Client />
    </>
  );
}
