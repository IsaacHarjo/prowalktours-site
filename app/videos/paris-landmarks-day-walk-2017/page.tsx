import type { Metadata } from "next";
import Script from "next/script";
import ParisLandmarksDayWalk2017Client from "./ParisLandmarksDayWalk2017Client";

const siteUrl = "https://www.prowalktours.com";
const pageUrl = `${siteUrl}/videos/paris-landmarks-day-walk-2017`;
const heroImagePath = "/paris-landmarks-day-walk-2017/hero.jpg";
const ogImageUrl = `${siteUrl}${heroImagePath}`;
const metadataTitle =
  "Paris, France Landmarks Day Walk (2017) | Louvre, Notre-Dame, Eiffel Tower, Arc de Triomphe";
const metadataDescription =
  "Paris landmarks day walk in HD: the Louvre, Notre-Dame, Champs-\u00c9lys\u00e9es, Arc de Triomphe, the Eiffel Tower, Les Invalides, and Paris old streets.";

export const metadata: Metadata = {
  title: metadataTitle,
  description: metadataDescription,
  alternates: { canonical: pageUrl },
  openGraph: {
    title: metadataTitle,
    description: metadataDescription,
    url: pageUrl,
    images: [{ url: ogImageUrl, alt: "Paris landmarks day walk 2017" }],
  },
};

export default function ParisLandmarksDayWalk2017Page() {
  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name: "Countries", item: `${siteUrl}/countries` },
      { "@type": "ListItem", position: 3, name: "France", item: `${siteUrl}/destinations/france` },
      { "@type": "ListItem", position: 4, name: "Paris", item: `${siteUrl}/destinations/france/paris` },
      { "@type": "ListItem", position: 5, name: "Paris Landmarks Day Walk (2017)", item: pageUrl },
    ],
  };

  const videoStructuredData = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: metadataTitle,
    description: metadataDescription,
    thumbnailUrl: ["https://i.ytimg.com/vi/ME2zyNBh3JM/maxresdefault.jpg", ogImageUrl],
    embedUrl: "https://www.youtube.com/embed/ME2zyNBh3JM",
    contentUrl: "https://www.youtube.com/watch?v=ME2zyNBh3JM",
    uploadDate: "2017-08-05",
    duration: "PT3H8M7S",
    url: pageUrl,
  };

  return (
    <>
      <Script id="paris-2017-breadcrumb-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }} />
      <Script id="paris-2017-video-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoStructuredData) }} />
      <ParisLandmarksDayWalk2017Client />
    </>
  );
}
