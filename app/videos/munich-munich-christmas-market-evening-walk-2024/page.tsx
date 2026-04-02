import type { Metadata } from "next";
import Script from "next/script";
import MunichMunichChristmasMarketEveningWalk2024Client from "./MunichMunichChristmasMarketEveningWalk2024Client";

const siteUrl = "https://www.prowalktours.com";
const pageUrl = `${siteUrl}/videos/munich-munich-christmas-market-evening-walk-2024`;
const heroImagePath = "/munich-munich-christmas-market-evening-walk-2024/hero.jpg";
const ogImageUrl = `${siteUrl}${heroImagePath}`;
const metadataTitle = "Munich, Germany Christmas Market Evening Walk (2024)";
const metadataDescription = "Munich, Germany Christmas Market Evening Walk in 4K. This is an evening tour through the Christmas Markets in Munich.";

export const metadata: Metadata = {
  title: metadataTitle,
  description: metadataDescription,
  alternates: { canonical: pageUrl },
  openGraph: {
    title: metadataTitle,
    description: metadataDescription,
    url: pageUrl,
    images: [{ url: ogImageUrl, alt: "Munich, Germany Christmas Market Evening Walk (2024)" }],
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
      { "@type": "ListItem", position: 4, name: "Munich, Germany Christmas Market Evening Walk", item: pageUrl }
    ],
  };

  const videoStructuredData = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: metadataTitle,
    description: metadataDescription,
    thumbnailUrl: ["https://i.ytimg.com/vi/g1akZNSsS14/maxresdefault.jpg", ogImageUrl],
    embedUrl: "https://www.youtube.com/embed/g1akZNSsS14",
    contentUrl: "https://www.youtube.com/watch?v=g1akZNSsS14",
    uploadDate: "2024-12-12",
    duration: "PT1H54M16S",
    url: pageUrl,
  };

  return (
    <>
      <Script id="munich-munich-christmas-market-evening-walk-2024-bc-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }} />
      <Script id="munich-munich-christmas-market-evening-walk-2024-video-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoStructuredData) }} />
      <MunichMunichChristmasMarketEveningWalk2024Client />
    </>
  );
}
