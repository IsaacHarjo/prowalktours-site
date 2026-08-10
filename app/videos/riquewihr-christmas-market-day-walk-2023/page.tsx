import type { Metadata } from "next";
import RiquewihrChristmasMarketDayWalk2023Client from "./RiquewihrChristmasMarketDayWalk2023Client";
import { riquewihrChristmasMarketDayWalk2023Detail } from "../../../data/video-details/riquewihr-christmas-market-day-walk-2023";
import { franceVideos } from "../../../data/videos/france";
import { stringifyJsonLd } from "../../../lib/seo/jsonLd";
import { buildVideoClips } from "../../../lib/seo/videoClips";

const siteUrl = "https://www.prowalktours.com";
const pageUrl = `${siteUrl}/videos/riquewihr-christmas-market-day-walk-2023`;
const heroImagePath = "/riquewihr-christmas-market-day-walk-2023/hero.jpg";
const ogImageUrl = `${siteUrl}${heroImagePath}`;
const metadataTitle = "Riquewihr, France Christmas Market Day Walk (2023)";
const metadataDescription = "Riquewihr, France Christmas Market Day Walk in 4K. This daytime walk through Riquewihr’s Christmas market explores the old town from the town hall and .";

const videoRecord = franceVideos.find(
  (video) => video.slug === "riquewihr-christmas-market-day-walk-2023"
);

export const metadata: Metadata = {
  title: metadataTitle,
  description: metadataDescription,
  alternates: { canonical: pageUrl },
  openGraph: {
    title: metadataTitle,
    description: metadataDescription,
    url: pageUrl,
    images: [{ url: ogImageUrl, alt: "Riquewihr, France Christmas Market Day Walk (2023)" }],
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
      { "@type": "ListItem", position: 4, name: "RiquewihrChristmas Market Day Walk", item: pageUrl }
    ],
  };

  const videoStructuredData = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: metadataTitle,
    description: metadataDescription,
    thumbnailUrl: ["https://i.ytimg.com/vi/MjtMfBRp4y4/maxresdefault.jpg", ogImageUrl],
    embedUrl: "https://www.youtube.com/embed/MjtMfBRp4y4",
    contentUrl: "https://www.youtube.com/watch?v=MjtMfBRp4y4",
    uploadDate: "2023-12-05",
    duration: "PT1H36M53S",
    url: pageUrl,
      hasPart: buildVideoClips({
      highlights: riquewihrChristmasMarketDayWalk2023Detail.highlights,
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
      <RiquewihrChristmasMarketDayWalk2023Client />
    </>
  );
}
