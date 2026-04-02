import type { Metadata } from "next";
import Script from "next/script";
import NurembergChristmasMarketEveningWalk2024Client from "./NurembergChristmasMarketEveningWalk2024Client";

const siteUrl = "https://www.prowalktours.com";
const pageUrl = `${siteUrl}/videos/nuremberg-christmas-market-evening-walk-2024`;
const heroImagePath = "/nuremberg-christmas-market-evening-walk-2024/hero.jpg";
const ogImageUrl = `${siteUrl}${heroImagePath}`;
const metadataTitle = "Nuremberg, Germany Christmas Market Evening Walk (2024)";
const metadataDescription = "Nuremberg, Germany Christmas Market Evening Walk in 4K. This walking tour through the Nuremberg Christmas Markets (Nürnberger Christkindlesmarkt) in Ger...";

export const metadata: Metadata = {
  title: metadataTitle,
  description: metadataDescription,
  alternates: { canonical: pageUrl },
  openGraph: {
    title: metadataTitle,
    description: metadataDescription,
    url: pageUrl,
    images: [{ url: ogImageUrl, alt: "Nuremberg, Germany Christmas Market Evening Walk (2024)" }],
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
      { "@type": "ListItem", position: 4, name: "Nuremberg, Germany Christmas Market Evening Walk", item: pageUrl }
    ],
  };

  const videoStructuredData = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: metadataTitle,
    description: metadataDescription,
    thumbnailUrl: ["https://i.ytimg.com/vi/CRAigMYQ4cM/maxresdefault.jpg", ogImageUrl],
    embedUrl: "https://www.youtube.com/embed/CRAigMYQ4cM",
    contentUrl: "https://www.youtube.com/watch?v=CRAigMYQ4cM",
    uploadDate: "2024-12-11",
    duration: "PT2H9M53S",
    url: pageUrl,
  };

  return (
    <>
      <Script id="nuremberg-christmas-market-evening-walk-2024-bc-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }} />
      <Script id="nuremberg-christmas-market-evening-walk-2024-video-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoStructuredData) }} />
      <NurembergChristmasMarketEveningWalk2024Client />
    </>
  );
}
