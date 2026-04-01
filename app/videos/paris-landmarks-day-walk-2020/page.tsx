import type { Metadata } from "next";
import Script from "next/script";
import ParisLandmarksDayWalk2020Client from "./ParisLandmarksDayWalk2020Client";

const siteUrl = "https://www.prowalktours.com";
const pageUrl = `${siteUrl}/videos/paris-landmarks-day-walk-2020`;
const heroImagePath = "/paris-landmarks-day-walk-2020/hero.jpg";
const ogImageUrl = `${siteUrl}${heroImagePath}`;
const metadataTitle =
  "Paris, France Day Walk (2020) | Panth\u00e9on, Louvre, Champs-\u00c9lys\u00e9es, Eiffel Tower";
const metadataDescription =
  "Paris day walk in 4K: Rue Mouffetard, Panth\u00e9on, Luxembourg Gardens, Notre-Dame, the Louvre, Champs-\u00c9lys\u00e9es, Arc de Triomphe, and the Eiffel Tower.";

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
        alt: "Paris day walk landmarks",
      },
    ],
  },
};

export default function ParisLandmarksDayWalk2020Page() {
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
        name: "Paris",
        item: `${siteUrl}/destinations/france/paris`,
      },
      {
        "@type": "ListItem",
        position: 5,
        name: "Paris, France Day Walk (2020)",
        item: pageUrl,
      },
    ],
  };

  const videoStructuredData = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: metadataTitle,
    description: metadataDescription,
    thumbnailUrl: [
      "https://i.ytimg.com/vi/oz1Mgu8e1N4/maxresdefault.jpg",
      ogImageUrl,
    ],
    embedUrl: "https://www.youtube.com/embed/oz1Mgu8e1N4",
    contentUrl: "https://www.youtube.com/watch?v=oz1Mgu8e1N4",
    uploadDate: "2020-07-19",
    duration: "PT5H38M18S",
    url: pageUrl,
  };

  return (
    <>
      <Script
        id="paris-landmarks-breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData),
        }}
      />
      <Script
        id="paris-landmarks-video-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(videoStructuredData),
        }}
      />
      <ParisLandmarksDayWalk2020Client />
    </>
  );
}
