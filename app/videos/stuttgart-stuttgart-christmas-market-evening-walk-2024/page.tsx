import type { Metadata } from "next";
import Script from "next/script";
import StuttgartStuttgartChristmasMarketEveningWalk2024Client from "./StuttgartStuttgartChristmasMarketEveningWalk2024Client";

const siteUrl = "https://www.prowalktours.com";
const pageUrl = `${siteUrl}/videos/stuttgart-stuttgart-christmas-market-evening-walk-2024`;
const heroImagePath = "/stuttgart-stuttgart-christmas-market-evening-walk-2024/hero.jpg";
const ogImageUrl = `${siteUrl}${heroImagePath}`;
const metadataTitle = "Stuttgart, Germany Christmas Market Evening Walk (2024)";
const metadataDescription = "Stuttgart, Germany Christmas Market Evening Walk in 4K. Join us for an immersive tour that captures all the beautiful sights and festive sounds of the m...";

export const metadata: Metadata = {
  title: metadataTitle,
  description: metadataDescription,
  alternates: { canonical: pageUrl },
  openGraph: {
    title: metadataTitle,
    description: metadataDescription,
    url: pageUrl,
    images: [{ url: ogImageUrl, alt: "Stuttgart, Germany Christmas Market Evening Walk (2024)" }],
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
    thumbnailUrl: ["https://i.ytimg.com/vi/1umZtnFfm60/maxresdefault.jpg", ogImageUrl],
    embedUrl: "https://www.youtube.com/embed/1umZtnFfm60",
    contentUrl: "https://www.youtube.com/watch?v=1umZtnFfm60",
    uploadDate: "2024-12-14",
    duration: "PT1H34M35S",
    url: pageUrl,
  };

  return (
    <>
      <Script id="stuttgart-stuttgart-christmas-market-evening-walk-2024-bc-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }} />
      <Script id="stuttgart-stuttgart-christmas-market-evening-walk-2024-video-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoStructuredData) }} />
      <StuttgartStuttgartChristmasMarketEveningWalk2024Client />
    </>
  );
}
