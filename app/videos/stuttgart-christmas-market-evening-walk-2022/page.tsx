import type { Metadata } from "next";
import Script from "next/script";
import StuttgartChristmasMarketEveningWalk2022Client from "./StuttgartChristmasMarketEveningWalk2022Client";

const siteUrl = "https://www.prowalktours.com";
const pageUrl = `${siteUrl}/videos/stuttgart-christmas-market-evening-walk-2022`;
const heroImagePath = "/stuttgart-christmas-market-evening-walk-2022/hero.jpg";
const ogImageUrl = `${siteUrl}${heroImagePath}`;
const metadataTitle = "Stuttgart, Germany Christmas Market Evening Walk (2022)";
const metadataDescription = "Stuttgart, Germany Christmas Market Evening Walk in 4K. This is an evening tour through the Christmas Markets of Stuttgart.";

export const metadata: Metadata = {
  title: metadataTitle,
  description: metadataDescription,
  alternates: { canonical: pageUrl },
  openGraph: {
    title: metadataTitle,
    description: metadataDescription,
    url: pageUrl,
    images: [{ url: ogImageUrl, alt: "Stuttgart, Germany Christmas Market Evening Walk (2022)" }],
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
      { "@type": "ListItem", position: 4, name: "Stuttgart, Germany Christmas Market Evening Walk", item: pageUrl }
    ],
  };

  const videoStructuredData = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: metadataTitle,
    description: metadataDescription,
    thumbnailUrl: ["https://i.ytimg.com/vi/DssVino8XPo/maxresdefault.jpg", ogImageUrl],
    embedUrl: "https://www.youtube.com/embed/DssVino8XPo",
    contentUrl: "https://www.youtube.com/watch?v=DssVino8XPo",
    uploadDate: "2022-12-15",
    duration: "PT1H4M32S",
    url: pageUrl,
  };

  return (
    <>
      <Script id="stuttgart-christmas-market-evening-walk-2022-bc-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }} />
      <Script id="stuttgart-christmas-market-evening-walk-2022-video-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoStructuredData) }} />
      <StuttgartChristmasMarketEveningWalk2022Client />
    </>
  );
}
