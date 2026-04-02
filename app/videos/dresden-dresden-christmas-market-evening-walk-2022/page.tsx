import type { Metadata } from "next";
import Script from "next/script";
import DresdenDresdenChristmasMarketEveningWalk2022Client from "./DresdenDresdenChristmasMarketEveningWalk2022Client";

const siteUrl = "https://www.prowalktours.com";
const pageUrl = `${siteUrl}/videos/dresden-dresden-christmas-market-evening-walk-2022`;
const heroImagePath = "/dresden-dresden-christmas-market-evening-walk-2022/hero.jpg";
const ogImageUrl = `${siteUrl}${heroImagePath}`;
const metadataTitle = "Dresden, Germany Christmas Market Evening Walk (2022)";
const metadataDescription = "Dresden, Germany Christmas Market Evening Walk in 4K. This is an evening tour around the Christmas Market's in Dresden.";

export const metadata: Metadata = {
  title: metadataTitle,
  description: metadataDescription,
  alternates: { canonical: pageUrl },
  openGraph: {
    title: metadataTitle,
    description: metadataDescription,
    url: pageUrl,
    images: [{ url: ogImageUrl, alt: "Dresden, Germany Christmas Market Evening Walk (2022)" }],
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
      { "@type": "ListItem", position: 4, name: "Dresden, Germany Christmas Market Evening Walk", item: pageUrl }
    ],
  };

  const videoStructuredData = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: metadataTitle,
    description: metadataDescription,
    thumbnailUrl: ["https://i.ytimg.com/vi/9JCm5Nzqzfg/maxresdefault.jpg", ogImageUrl],
    embedUrl: "https://www.youtube.com/embed/9JCm5Nzqzfg",
    contentUrl: "https://www.youtube.com/watch?v=9JCm5Nzqzfg",
    uploadDate: "2022-12-11",
    duration: "PT2H5M31S",
    url: pageUrl,
  };

  return (
    <>
      <Script id="dresden-dresden-christmas-market-evening-walk-2022-bc-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }} />
      <Script id="dresden-dresden-christmas-market-evening-walk-2022-video-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoStructuredData) }} />
      <DresdenDresdenChristmasMarketEveningWalk2022Client />
    </>
  );
}
