import type { Metadata } from "next";
import Script from "next/script";
import ParisCatacombsTour2020Client from "./ParisCatacombsTour2020Client";

const siteUrl = "https://www.prowalktours.com";
const pageUrl = `${siteUrl}/videos/paris-catacombs-tour-2020`;
const heroImagePath = "/paris-catacombs-tour-2020/hero.jpg";
const ogImageUrl = `${siteUrl}${heroImagePath}`;
const metadataTitle = "Paris Catacombs Tour | Paris, France (2020)";
const metadataDescription =
  "Explore the Paris Catacombs in this 4K tour through the entrance, underground ossuary, stacked bones and skulls, and one of Paris's most unusual historic sites.";

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
        alt: "Paris Catacombs tour hero image",
      },
    ],
  },
};

export default function ParisCatacombsTour2020Page() {
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
        name: "Paris Catacombs Tour",
        item: pageUrl,
      },
    ],
  };

  const videoStructuredData = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: metadataTitle,
    description: metadataDescription,
    thumbnailUrl: [ogImageUrl],
    embedUrl: "https://www.youtube.com/embed/PEfRzws5ajk",
    contentUrl: "https://www.youtube.com/watch?v=PEfRzws5ajk",
    uploadDate: "2020-07-19",
    duration: "PT22M59S",
    url: pageUrl,
  };

  return (
    <>
      <Script
        id="paris-catacombs-breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData),
        }}
      />
      <Script
        id="paris-catacombs-video-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(videoStructuredData),
        }}
      />
      <ParisCatacombsTour2020Client />
    </>
  );
}
