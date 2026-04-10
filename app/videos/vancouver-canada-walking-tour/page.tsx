import type { Metadata } from "next";
import Script from "next/script";
import VancouverCanadaWalkingTourClient from "./VancouverCanadaWalkingTourClient";

const siteUrl = "https://www.prowalktours.com";
const pageUrl = "https://www.prowalktours.com/videos/vancouver-canada-walking-tour";
const ogImageUrl =
  "https://img.youtube.com/vi/faUNhaRLpMc/maxresdefault.jpg";
const metadataTitle =
  "Vancouver, Canada Walking Tour | Stanley Park, Kitsilano, Downtown & Gastown";
const metadataDescription =
  "Explore Vancouver in this 4K walking tour from Stanley Park and Kitsilano Beach through False Creek, downtown, Gastown, and Canada Place.";

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
        alt: "Vancouver walking tour through Stanley Park and Gastown",
      },
    ],
  },
};

export default function VancouverCanadaWalkingTourPage() {
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
        name: "Canada",
        item: `${siteUrl}/destinations/canada`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Vancouver, Canada Walking Tour",
        item: pageUrl,
      },
    ],
  };

  const videoStructuredData = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: "Vancouver, Canada Walking Tour",
    description: metadataDescription,
    thumbnailUrl: [ogImageUrl],
    embedUrl: "https://www.youtube.com/embed/faUNhaRLpMc",
    contentUrl: "https://www.youtube.com/watch?v=faUNhaRLpMc",
    uploadDate: "2018-07-29",
    duration: "PT3H52M12S",
    url: pageUrl,
  };

  return (
    <>
      <Script
        id="vancouver-walking-breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData),
        }}
      />
      <Script
        id="vancouver-walking-video-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(videoStructuredData),
        }}
      />
      <VancouverCanadaWalkingTourClient />
    </>
  );
}
