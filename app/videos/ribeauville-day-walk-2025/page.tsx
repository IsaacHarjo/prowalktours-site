import type { Metadata } from "next";
import Script from "next/script";
import RibeauvilleDayWalk2025Client from "./RibeauvilleDayWalk2025Client";

const siteUrl = "https://www.prowalktours.com";
const pageUrl = `${siteUrl}/videos/ribeauville-day-walk-2025`;
const heroImagePath = "/ribeauville-day-walk-2025/hero.jpg";
const ogImageUrl = `${siteUrl}${heroImagePath}`;
const metadataTitle = "Ribeauvillé, France Medieval Christmas Market Walk (2025)";
const metadataDescription = "Ribeauvillé, France Medieval Christmas Market Walk in 4K. This walk explores the Ribeauvillé Medieval Christmas Market, one of the most distinctive holi...";

export const metadata: Metadata = {
  title: metadataTitle,
  description: metadataDescription,
  alternates: { canonical: pageUrl },
  openGraph: {
    title: metadataTitle,
    description: metadataDescription,
    url: pageUrl,
    images: [{ url: ogImageUrl, alt: "Ribeauvillé, France Medieval Christmas Market Walk (2025)" }],
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
      { "@type": "ListItem", position: 4, name: "RibeauvilléMedieval Christmas Market Walk", item: pageUrl }
    ],
  };

  const videoStructuredData = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: metadataTitle,
    description: metadataDescription,
    thumbnailUrl: ["https://i.ytimg.com/vi/4AYDKWizfmY/maxresdefault.jpg", ogImageUrl],
    embedUrl: "https://www.youtube.com/embed/4AYDKWizfmY",
    contentUrl: "https://www.youtube.com/watch?v=4AYDKWizfmY",
    uploadDate: "2025-12-13",
    duration: "PT2H18M24S",
    url: pageUrl,
  };

  return (
    <>
      <Script id="ribeauville-day-walk-2025-bc-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }} />
      <Script id="ribeauville-day-walk-2025-video-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoStructuredData) }} />
      <RibeauvilleDayWalk2025Client />
    </>
  );
}
