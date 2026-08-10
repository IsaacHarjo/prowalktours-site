import type { Metadata } from "next";
import ColmarChristmasMarketEveningWalk2023Client from "./ColmarChristmasMarketEveningWalk2023Client";
import { colmarChristmasMarketEveningWalk2023Detail } from "../../../data/video-details/colmar-christmas-market-evening-walk-2023";
import { franceVideos } from "../../../data/videos/france";
import { stringifyJsonLd } from "../../../lib/seo/jsonLd";
import { buildVideoClips } from "../../../lib/seo/videoClips";

const siteUrl = "https://www.prowalktours.com";
const pageUrl = `${siteUrl}/videos/colmar-christmas-market-evening-walk-2023`;
const heroImagePath = "/colmar-christmas-market-evening-walk-2023/hero.jpg";
const ogImageUrl = `${siteUrl}${heroImagePath}`;
const metadataTitle = "Colmar, France Christmas Market Evening Walk (2023)";
const metadataDescription = "Colmar, France Christmas Market Evening Walk in 4K. This evening walk through Colmar’s Christmas markets follows the old town through several of the cit.";

const videoRecord = franceVideos.find(
  (video) => video.slug === "colmar-christmas-market-evening-walk-2023"
);

export const metadata: Metadata = {
  title: metadataTitle,
  description: metadataDescription,
  alternates: { canonical: pageUrl },
  openGraph: {
    title: metadataTitle,
    description: metadataDescription,
    url: pageUrl,
    images: [{ url: ogImageUrl, alt: "Colmar, France Christmas Market Evening Walk (2023)" }],
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
      { "@type": "ListItem", position: 4, name: "ColmarChristmas Market Evening Walk", item: pageUrl }
    ],
  };

  const videoStructuredData = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: metadataTitle,
    description: metadataDescription,
    thumbnailUrl: ["https://i.ytimg.com/vi/NMQ4Sy3e-Ec/maxresdefault.jpg", ogImageUrl],
    embedUrl: "https://www.youtube.com/embed/NMQ4Sy3e-Ec",
    contentUrl: "https://www.youtube.com/watch?v=NMQ4Sy3e-Ec",
    uploadDate: "2023-12-04",
    duration: "PT1H48M39S",
    url: pageUrl,
      hasPart: buildVideoClips({
      highlights: colmarChristmasMarketEveningWalk2023Detail.highlights,
      canonicalUrl: pageUrl,
      videoDurationSeconds: videoRecord?.durationSeconds,
    }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: stringifyJsonLd(breadcrumbStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: stringifyJsonLd(videoStructuredData),
        }}
      />
      <ColmarChristmasMarketEveningWalk2023Client />
    </>
  );
}
