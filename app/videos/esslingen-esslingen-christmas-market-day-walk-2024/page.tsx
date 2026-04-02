import type { Metadata } from "next";
import Script from "next/script";
import EsslingenEsslingenChristmasMarketDayWalk2024Client from "./EsslingenEsslingenChristmasMarketDayWalk2024Client";

const siteUrl = "https://www.prowalktours.com";
const pageUrl = `${siteUrl}/videos/esslingen-esslingen-christmas-market-day-walk-2024`;
const heroImagePath = "/esslingen-esslingen-christmas-market-day-walk-2024/hero.jpg";
const ogImageUrl = `${siteUrl}${heroImagePath}`;
const metadataTitle = "Esslingen, Germany Christmas Market Day Walk (2024)";
const metadataDescription = "Esslingen, Germany Christmas Market Day Walk in 4K. This is a tour through the medieval Christmas Markets in Esslingen.";

export const metadata: Metadata = {
  title: metadataTitle,
  description: metadataDescription,
  alternates: { canonical: pageUrl },
  openGraph: {
    title: metadataTitle,
    description: metadataDescription,
    url: pageUrl,
    images: [{ url: ogImageUrl, alt: "Esslingen, Germany Christmas Market Day Walk (2024)" }],
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
      { "@type": "ListItem", position: 4, name: "Esslingen, Germany Christmas Market Day Walk", item: pageUrl }
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
    uploadDate: "2024-12-15",
    duration: "PT1H35M0S",
    url: pageUrl,
  };

  return (
    <>
      <Script id="esslingen-esslingen-christmas-market-day-walk-2024-bc-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }} />
      <Script id="esslingen-esslingen-christmas-market-day-walk-2024-video-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoStructuredData) }} />
      <EsslingenEsslingenChristmasMarketDayWalk2024Client />
    </>
  );
}
