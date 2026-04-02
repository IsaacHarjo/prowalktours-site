import type { Metadata } from "next";
import Script from "next/script";
import RothenburgChristmasMarketDayWalk2023Client from "./RothenburgChristmasMarketDayWalk2023Client";

const siteUrl = "https://www.prowalktours.com";
const pageUrl = `${siteUrl}/videos/rothenburg-christmas-market-day-walk-2023`;
const heroImagePath = "/rothenburg-christmas-market-day-walk-2023/hero.jpg";
const ogImageUrl = `${siteUrl}${heroImagePath}`;
const metadataTitle = "Rothenburg ob der Tauber, Germany Christmas Market Day Walk (2023)";
const metadataDescription = "Rothenburg ob der Tauber, Germany Christmas Market Day Walk in 4K. A daytime walk in Rothenburg ob der Tauber, Germany.";

export const metadata: Metadata = {
  title: metadataTitle,
  description: metadataDescription,
  alternates: { canonical: pageUrl },
  openGraph: {
    title: metadataTitle,
    description: metadataDescription,
    url: pageUrl,
    images: [{ url: ogImageUrl, alt: "Rothenburg ob der Tauber, Germany Christmas Market Day Walk (2023)" }],
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
      { "@type": "ListItem", position: 4, name: "Rothenburg ob der Tauber, Germany Christmas Market Day Walk", item: pageUrl }
    ],
  };

  const videoStructuredData = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: metadataTitle,
    description: metadataDescription,
    thumbnailUrl: ["https://i.ytimg.com/vi/EzZhJgqsdYU/maxresdefault.jpg", ogImageUrl],
    embedUrl: "https://www.youtube.com/embed/EzZhJgqsdYU",
    contentUrl: "https://www.youtube.com/watch?v=EzZhJgqsdYU",
    uploadDate: "2023-12-01",
    duration: "PT1H38M11S",
    url: pageUrl,
  };

  return (
    <>
      <Script id="rothenburg-christmas-market-day-walk-2023-bc-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }} />
      <Script id="rothenburg-christmas-market-day-walk-2023-video-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoStructuredData) }} />
      <RothenburgChristmasMarketDayWalk2023Client />
    </>
  );
}
