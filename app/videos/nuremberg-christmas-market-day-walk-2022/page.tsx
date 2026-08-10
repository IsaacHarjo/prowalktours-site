import type { Metadata } from "next";
import NurembergChristmasMarketDayWalk2022Client from "./NurembergChristmasMarketDayWalk2022Client";
import { nurembergChristmasMarketDayWalk2022Detail } from "../../../data/video-details/nuremberg-christmas-market-day-walk-2022";
import { germanyVideos } from "../../../data/videos/germany";
import { stringifyJsonLd } from "../../../lib/seo/jsonLd";
import { buildVideoClips } from "../../../lib/seo/videoClips";

const siteUrl = "https://www.prowalktours.com";
const pageUrl = `${siteUrl}/videos/nuremberg-christmas-market-day-walk-2022`;
const heroImagePath = "/nuremberg-christmas-market-day-walk-2022/hero.jpg";
const ogImageUrl = `${siteUrl}${heroImagePath}`;
const metadataTitle = "Nuremberg, Germany Christmas Market Day Walk (2022)";
const metadataDescription = "Nuremberg, Germany Christmas Market Day Walk in 4K. Germany while it is snowing outside.";

const videoRecord = germanyVideos.find(
  (video) => video.slug === "nuremberg-christmas-market-day-walk-2022"
);

export const metadata: Metadata = {
  title: metadataTitle,
  description: metadataDescription,
  alternates: { canonical: pageUrl },
  openGraph: {
    title: metadataTitle,
    description: metadataDescription,
    url: pageUrl,
    images: [{ url: ogImageUrl, alt: "Nuremberg, Germany Christmas Market Day Walk (2022)" }],
  },
};

export default function Page() {
  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name: "Countries", item: `${siteUrl}/countries` },
      { "@type": "ListItem", position: 3, name: "Germany", item: `${siteUrl}/destinations/germany` },
      { "@type": "ListItem", position: 4, name: "Nuremberg, Germany Christmas Market Day Walk", item: pageUrl }
    ],
  };

  const videoStructuredData = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: metadataTitle,
    description: metadataDescription,
    thumbnailUrl: ["https://i.ytimg.com/vi/l6aGKVxo2kw/maxresdefault.jpg", ogImageUrl],
    embedUrl: "https://www.youtube.com/embed/l6aGKVxo2kw",
    contentUrl: "https://www.youtube.com/watch?v=l6aGKVxo2kw",
    uploadDate: "2022-12-14",
    duration: "PT1H45M30S",
    url: pageUrl,
      hasPart: buildVideoClips({
      highlights: nurembergChristmasMarketDayWalk2022Detail.highlights,
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
      <NurembergChristmasMarketDayWalk2022Client />
    </>
  );
}
