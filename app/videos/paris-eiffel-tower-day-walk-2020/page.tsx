import type { Metadata } from "next";
import Script from "next/script";
import ParisEiffelTowerDayWalk2020Client from "./ParisEiffelTowerDayWalk2020Client";

const siteUrl = "https://www.prowalktours.com";
const pageUrl = `${siteUrl}/videos/paris-eiffel-tower-day-walk-2020`;
const heroImagePath = "/paris-eiffel-tower-day-walk-2020/hero.jpg";
const ogImageUrl = `${siteUrl}${heroImagePath}`;
const metadataTitle =
  "Paris Eiffel Tower Tour (2020) | Summit, Level 2, Level 1, Full Experience";
const metadataDescription =
  "Eiffel Tower tour in 4K: entrance, elevator rides, Level 2, the summit interior and exterior panoramic views, Level 1 glass floor, and stairs down.";

export const metadata: Metadata = {
  title: metadataTitle,
  description: metadataDescription,
  alternates: { canonical: pageUrl },
  openGraph: {
    title: metadataTitle,
    description: metadataDescription,
    url: pageUrl,
    images: [{ url: ogImageUrl, alt: "Eiffel Tower tour from ground to summit" }],
  },
};

export default function ParisEiffelTowerDayWalk2020Page() {
  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name: "Countries", item: `${siteUrl}/countries` },
      { "@type": "ListItem", position: 3, name: "France", item: `${siteUrl}/destinations/france` },
      { "@type": "ListItem", position: 4, name: "Paris", item: `${siteUrl}/destinations/france/paris` },
      { "@type": "ListItem", position: 5, name: "Eiffel Tower Tour (2020)", item: pageUrl },
    ],
  };

  const videoStructuredData = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: metadataTitle,
    description: metadataDescription,
    thumbnailUrl: ["https://i.ytimg.com/vi/Lrj8LEZ9FA4/maxresdefault.jpg", ogImageUrl],
    embedUrl: "https://www.youtube.com/embed/Lrj8LEZ9FA4",
    contentUrl: "https://www.youtube.com/watch?v=Lrj8LEZ9FA4",
    uploadDate: "2020-07-19",
    duration: "PT52M45S",
    url: pageUrl,
  };

  return (
    <>
      <Script id="eiffel-tower-breadcrumb-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }} />
      <Script id="eiffel-tower-video-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoStructuredData) }} />
      <ParisEiffelTowerDayWalk2020Client />
    </>
  );
}
