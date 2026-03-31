import type { Metadata } from "next";
import Script from "next/script";
import ParisLatinQuarterMaraisEveningWalk2020Client from "./ParisLatinQuarterMaraisEveningWalk2020Client";

const siteUrl = "https://www.prowalktours.com";
const pageUrl = `${siteUrl}/videos/paris-latin-quarter-marais-evening-walk-2020`;
const heroImagePath = "/paris-latin-quarter-marais-evening-walk-2020/hero.jpg";
const ogImageUrl = `${siteUrl}${heroImagePath}`;
const metadataTitle =
  "Paris Latin Quarter & Marais Evening Walk | Paris, France (2020)";
const metadataDescription =
  "Paris Latin Quarter & Marais evening walk in 4K: Place Saint-Michel, Rue des Rosiers, Bastille, and a night bike ride past H\u00F4tel de Ville and the Louvre.";

export const metadata: Metadata = {
  title: metadataTitle,
  description: metadataDescription,
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: metadataTitle,
    description: metadataDescription,
    url: pageUrl,
    images: [
      {
        url: ogImageUrl,
        alt: "Paris Latin Quarter & Marais Evening Walk hero image",
      },
    ],
  },
};

export default function ParisLatinQuarterMaraisEveningWalk2020Page() {
  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${siteUrl}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Countries",
        item: `${siteUrl}/countries`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "France",
        item: `${siteUrl}/destinations/france`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Paris Latin Quarter & Marais Evening Walk",
        item: pageUrl,
      },
    ],
  };

  const videoStructuredData = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: "Paris Latin Quarter & Marais Evening Walk (2020)",
    description: metadataDescription,
    thumbnailUrl: [ogImageUrl],
    embedUrl: "https://www.youtube.com/embed/1_XzrxXnwMM",
    contentUrl: "https://www.youtube.com/watch?v=1_XzrxXnwMM",
    uploadDate: "2020-07-18",
    duration: "PT1H6M13S",
    url: pageUrl,
  };

  return (
    <>
      <Script
        id="paris-latin-quarter-breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData),
        }}
      />
      <Script
        id="paris-latin-quarter-video-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(videoStructuredData),
        }}
      />
      <ParisLatinQuarterMaraisEveningWalk2020Client />
    </>
  );
}
