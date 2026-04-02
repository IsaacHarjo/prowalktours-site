import type { Metadata } from "next";
import Script from "next/script";
import StrasbourgChristmasMarketDayWalk2022Client from "./StrasbourgChristmasMarketDayWalk2022Client";

const siteUrl = "https://www.prowalktours.com";
const pageUrl = `${siteUrl}/videos/strasbourg-christmas-market-day-walk-2022`;
const heroImagePath = "/strasbourg-christmas-market-day-walk-2022/hero.jpg";
const ogImageUrl = `${siteUrl}${heroImagePath}`;
const metadataTitle = "Strasbourg, France Christmas Market Day Walk (2022)";
const metadataDescription = "Strasbourg, France Christmas Market Day Walk in 4K. This daytime walk through Strasbourg’s Christmas markets follows a long route through the historic c.";

export const metadata: Metadata = {
  title: metadataTitle,
  description: metadataDescription,
  alternates: { canonical: pageUrl },
  openGraph: {
    title: metadataTitle,
    description: metadataDescription,
    url: pageUrl,
    images: [{ url: ogImageUrl, alt: "Strasbourg, France Christmas Market Day Walk (2022)" }],
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
    thumbnailUrl: ["https://i.ytimg.com/vi/B-wi7hIrgf8/maxresdefault.jpg", ogImageUrl],
    embedUrl: "https://www.youtube.com/embed/B-wi7hIrgf8",
    contentUrl: "https://www.youtube.com/watch?v=B-wi7hIrgf8",
    uploadDate: "2022-12-08",
    duration: "PT2H24M49S",
    url: pageUrl,
  };

  return (
    <>
      <Script id="strasbourg-christmas-market-day-walk-2022-bc-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }} />
      <Script id="strasbourg-christmas-market-day-walk-2022-video-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoStructuredData) }} />
      <StrasbourgChristmasMarketDayWalk2022Client />
    </>
  );
}
