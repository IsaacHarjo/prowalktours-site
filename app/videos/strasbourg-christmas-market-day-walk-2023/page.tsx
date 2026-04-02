import type { Metadata } from "next";
import Script from "next/script";
import StrasbourgChristmasMarketDayWalk2023Client from "./StrasbourgChristmasMarketDayWalk2023Client";

const siteUrl = "https://www.prowalktours.com";
const pageUrl = `${siteUrl}/videos/strasbourg-christmas-market-day-walk-2023`;
const heroImagePath = "/strasbourg-christmas-market-day-walk-2023/hero.jpg";
const ogImageUrl = `${siteUrl}${heroImagePath}`;
const metadataTitle = "Strasbourg, France Christmas Market Day Walk (2023)";
const metadataDescription = "Strasbourg, France Christmas Market Day Walk in 4K. This daytime walk through Strasbourg’s Christmas markets moves through both the historic center and .";

export const metadata: Metadata = {
  title: metadataTitle,
  description: metadataDescription,
  alternates: { canonical: pageUrl },
  openGraph: {
    title: metadataTitle,
    description: metadataDescription,
    url: pageUrl,
    images: [{ url: ogImageUrl, alt: "Strasbourg, France Christmas Market Day Walk (2023)" }],
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
      { "@type": "ListItem", position: 4, name: "StrasbourgChristmas Market Day Walk", item: pageUrl }
    ],
  };

  const videoStructuredData = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: metadataTitle,
    description: metadataDescription,
    thumbnailUrl: ["https://i.ytimg.com/vi/07LDvkp7jgc/maxresdefault.jpg", ogImageUrl],
    embedUrl: "https://www.youtube.com/embed/07LDvkp7jgc",
    contentUrl: "https://www.youtube.com/watch?v=07LDvkp7jgc",
    uploadDate: "2023-12-03",
    duration: "PT2H19M1S",
    url: pageUrl,
  };

  return (
    <>
      <Script id="strasbourg-christmas-market-day-walk-2023-bc-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }} />
      <Script id="strasbourg-christmas-market-day-walk-2023-video-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoStructuredData) }} />
      <StrasbourgChristmasMarketDayWalk2023Client />
    </>
  );
}
