import type { Metadata } from "next";
import Script from "next/script";
import NaplesDaytimeWalk2023Client from "./NaplesDaytimeWalk2023Client";

const siteUrl = "https://www.prowalktours.com";
const pageUrl = `${siteUrl}/videos/naples-daytime-walk-2023`;
const metadataDescription =
  "Naples Italy 4K walking tour: historic city center, Spaccanapoli, Piazza del Plebiscito, and sweeping bay views. Filmed July 2023. 5h 45m.";

export const metadata: Metadata = {
  title: "Naples Italy 4K Walking Tour | Naples, Campania, Italy (2023)",
  description: metadataDescription,
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "Naples Italy 4K Walking Tour | Naples, Campania, Italy (2023)",
    description: metadataDescription,
    url: pageUrl,
    siteName: "Prowalk Tours",
    images: [
      {
        url: `${siteUrl}/naples-day-july-2023/naples-iconic-view.jpg`,
        width: 1280,
        height: 720,
        alt: "Panoramic view of Naples, the bay, and Mount Vesuvius",
      },
    ],
    type: "video.other",
  },
  twitter: {
    card: "summary_large_image",
    title: "Naples Italy 4K Walking Tour | Naples, Campania, Italy (2023)",
    description: metadataDescription,
    images: [`${siteUrl}/naples-day-july-2023/naples-iconic-view.jpg`],
  },
};

const breadcrumbStructuredData = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: siteUrl,
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
      name: "Italy",
      item: `${siteUrl}/destinations/italy`,
    },
    {
      "@type": "ListItem",
      position: 4,
      name: "Campania",
      item: `${siteUrl}/destinations/italy/campania`,
    },
    {
      "@type": "ListItem",
      position: 5,
      name: "Naples",
      item: `${siteUrl}/destinations/italy/campania/naples`,
    },
    {
      "@type": "ListItem",
      position: 6,
      name: "Naples Day Walk (July 2023)",
      item: pageUrl,
    },
  ],
};

const videoStructuredData = {
  "@context": "https://schema.org",
  "@type": "VideoObject",
  name: "Naples Italy 4K Walking Tour (July 2023)",
  description: metadataDescription,
  thumbnailUrl: `${siteUrl}/naples-day-july-2023/naples-iconic-view.jpg`,
  uploadDate: "2023-07-06",
  duration: "PT5H45M",
  contentUrl: "https://www.youtube.com/watch?v=990AqbKb18c",
  embedUrl: "https://www.youtube.com/embed/990AqbKb18c",
  author: {
    "@type": "Organization",
    name: "Prowalk Tours",
    url: siteUrl,
  },
};

export default function NaplesDaytimeWalk2023Page() {
  return (
    <>
      <Script
        id="breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData),
        }}
      />
      <Script
        id="video-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(videoStructuredData),
        }}
      />
      <NaplesDaytimeWalk2023Client />
    </>
  );
}
