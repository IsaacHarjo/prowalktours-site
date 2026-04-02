import type { Metadata } from "next";
import Script from "next/script";
import StrasbourgChristmasMarketEveningWalk2022Client from "./StrasbourgChristmasMarketEveningWalk2022Client";

const siteUrl = "https://www.prowalktours.com";
const pageUrl = `${siteUrl}/videos/strasbourg-christmas-market-evening-walk-2022`;
const heroImagePath = "/strasbourg-christmas-market-evening-walk-2022/hero.jpg";
const ogImageUrl = `${siteUrl}${heroImagePath}`;
const metadataTitle = "Strasbourg, France Christmas Market Evening Walk (2022)";
const metadataDescription = "Strasbourg, France Christmas Market Evening Walk in 4K. This evening walk through Strasbourg’s Christmas markets moves across the old town and Petite Fr...";

export const metadata: Metadata = {
  title: metadataTitle,
  description: metadataDescription,
  alternates: { canonical: pageUrl },
  openGraph: {
    title: metadataTitle,
    description: metadataDescription,
    url: pageUrl,
    images: [{ url: ogImageUrl, alt: "Strasbourg, France Christmas Market Evening Walk (2022)" }],
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
      { "@type": "ListItem", position: 4, name: "StrasbourgChristmas Market Evening Walk", item: pageUrl }
    ],
  };

  const videoStructuredData = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: metadataTitle,
    description: metadataDescription,
    thumbnailUrl: ["https://i.ytimg.com/vi/llOvsepGHZI/maxresdefault.jpg", ogImageUrl],
    embedUrl: "https://www.youtube.com/embed/llOvsepGHZI",
    contentUrl: "https://www.youtube.com/watch?v=llOvsepGHZI",
    uploadDate: "2022-12-18",
    duration: "PT2H3M15S",
    url: pageUrl,
  };

  return (
    <>
      <Script id="strasbourg-christmas-market-evening-walk-2022-bc-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }} />
      <Script id="strasbourg-christmas-market-evening-walk-2022-video-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoStructuredData) }} />
      <StrasbourgChristmasMarketEveningWalk2022Client />
    </>
  );
}
