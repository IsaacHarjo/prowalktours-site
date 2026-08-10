import type { Metadata } from "next";
import ColmarChristmasMarketDayWalk2023Client from "./ColmarChristmasMarketDayWalk2023Client";
import { colmarChristmasMarketDayWalk2023Detail } from "../../../data/video-details/colmar-christmas-market-day-walk-2023";
import { franceVideos } from "../../../data/videos/france";
import { stringifyJsonLd } from "../../../lib/seo/jsonLd";
import { buildVideoClips } from "../../../lib/seo/videoClips";

const siteUrl = "https://www.prowalktours.com";
const pageUrl = `${siteUrl}/videos/colmar-christmas-market-day-walk-2023`;
const heroImagePath = "/colmar-christmas-market-day-walk-2023/hero.jpg";
const ogImageUrl = `${siteUrl}${heroImagePath}`;
const metadataTitle = "Colmar, France Christmas Market Day Walk (2023)";
const metadataDescription = "Colmar, France Christmas Market Day Walk in 4K. This daytime walk through Colmar’s Christmas markets follows many of the same famous streets and squ.";

const videoRecord = franceVideos.find(
  (video) => video.slug === "colmar-christmas-market-day-walk-2023"
);

export const metadata: Metadata = {
  title: metadataTitle,
  description: metadataDescription,
  alternates: { canonical: pageUrl },
  openGraph: {
    title: metadataTitle,
    description: metadataDescription,
    url: pageUrl,
    images: [{ url: ogImageUrl, alt: "Colmar, France Christmas Market Day Walk (2023)" }],
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
      { "@type": "ListItem", position: 4, name: "ColmarChristmas Market Day Walk", item: pageUrl }
    ],
  };

  const videoStructuredData = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: metadataTitle,
    description: metadataDescription,
    thumbnailUrl: ["https://i.ytimg.com/vi/kjY8okFmuZo/maxresdefault.jpg", ogImageUrl],
    embedUrl: "https://www.youtube.com/embed/kjY8okFmuZo",
    contentUrl: "https://www.youtube.com/watch?v=kjY8okFmuZo",
    uploadDate: "2023-12-06",
    duration: "PT2H9M7S",
    url: pageUrl,
      hasPart: buildVideoClips({
      highlights: colmarChristmasMarketDayWalk2023Detail.highlights,
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
      <ColmarChristmasMarketDayWalk2023Client />
    </>
  );
}
