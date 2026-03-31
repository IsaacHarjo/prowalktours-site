import type { Metadata } from "next";
import Script from "next/script";
import { italyVideos } from "../../../data/videos/italy";
import NaplesBikeTour2020Client from "./NaplesBikeTour2020Client";

const siteUrl = "https://www.prowalktours.com";
const pageUrl = `${siteUrl}/videos/naples-bike-tour-2020`;
const bikeVideo = italyVideos.find(v => v.slug === "naples-bike-tour-2020");
const youtubeUrl = bikeVideo?.youtubeUrl ?? "https://youtu.be/IHXZnU2bmc8";
const youtubeVideoId = youtubeUrl.split("/").pop() ?? "IHXZnU2bmc8";
const ogImageUrl = bikeVideo?.thumbnail ?? `https://i.ytimg.com/vi/${youtubeVideoId}/maxresdefault.jpg`;
const metadataTitle = "Naples, Italy Bike Tour - May 2020";
const metadataDescription =
  bikeVideo?.shortDescription ??
  "Naples Italy bike tour through Posillipo, the waterfront, Piazza del Plebiscito, and the historic center. Filmed May 2020.";

const breadcrumbStructuredData = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
    { "@type": "ListItem", position: 2, name: "Countries", item: `${siteUrl}/countries` },
    { "@type": "ListItem", position: 3, name: "Italy", item: `${siteUrl}/destinations/italy` },
    { "@type": "ListItem", position: 4, name: "Campania", item: `${siteUrl}/destinations/italy/campania` },
    { "@type": "ListItem", position: 5, name: "Naples", item: `${siteUrl}/destinations/italy/campania/naples` },
    { "@type": "ListItem", position: 6, name: "Naples Bike Tour - May 2020", item: pageUrl },
  ],
};

const videoStructuredData = {
  "@context": "https://schema.org",
  "@type": "VideoObject",
  name: metadataTitle,
  description: metadataDescription,
  thumbnailUrl: [ogImageUrl],
  embedUrl: `https://www.youtube.com/embed/${youtubeVideoId}`,
  contentUrl: youtubeUrl,
  uploadDate: "2020-05-23",
  duration: "PT1H54M",
  url: pageUrl,
};

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
        alt: "Naples bike tour across Posillipo and the waterfront",
      },
    ],
  },
};

export default function NaplesBikeTour2020Page() {
  return (
    <>
      <Script
        id="naples-bike-tour-breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData),
        }}
      />
      <Script
        id="naples-bike-tour-video-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(videoStructuredData),
        }}
      />
      <NaplesBikeTour2020Client />
    </>
  );
}
