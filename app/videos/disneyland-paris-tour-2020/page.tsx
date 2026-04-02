import type { Metadata } from "next";
import Script from "next/script";
import DisneylandParisTour2020Client from "./DisneylandParisTour2020Client";

const siteUrl = "https://www.prowalktours.com";
const pageUrl = `${siteUrl}/videos/disneyland-paris-tour-2020`;
const heroImagePath = "/disneyland-paris-tour-2020/hero.jpg";
const ogImageUrl = `${siteUrl}${heroImagePath}`;
const metadataTitle = "Disneyland, Paris 4K Tour (2020)";
const metadataDescription = "Disneyland, Paris 4K Tour in 4K. This tour explores Disneyland Paris across multiple themed lands, attractions, and character moments.";

export const metadata: Metadata = {
  title: metadataTitle,
  description: metadataDescription,
  alternates: { canonical: pageUrl },
  openGraph: {
    title: metadataTitle,
    description: metadataDescription,
    url: pageUrl,
    images: [{ url: ogImageUrl, alt: "Disneyland, Paris 4K Tour (2020)" }],
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
      { "@type": "ListItem", position: 4, name: "Paris", item: `${siteUrl}/destinations/france/paris` },
      { "@type": "ListItem", position: 5, name: "Disneyland, Paris 4K Tour", item: pageUrl }
    ],
  };

  const videoStructuredData = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: metadataTitle,
    description: metadataDescription,
    thumbnailUrl: ["https://i.ytimg.com/vi/ALXKzjfWj8E/maxresdefault.jpg", ogImageUrl],
    embedUrl: "https://www.youtube.com/embed/ALXKzjfWj8E",
    contentUrl: "https://www.youtube.com/watch?v=ALXKzjfWj8E",
    uploadDate: "2020-07-20",
    duration: "PT3H2M24S",
    url: pageUrl,
  };

  return (
    <>
      <Script id="disneyland-paris-tour-2020-bc-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }} />
      <Script id="disneyland-paris-tour-2020-video-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoStructuredData) }} />
      <DisneylandParisTour2020Client />
    </>
  );
}
