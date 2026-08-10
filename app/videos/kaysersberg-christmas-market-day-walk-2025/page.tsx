import type { Metadata } from "next";
import KaysersbergChristmasMarketDayWalk2025Client from "./KaysersbergChristmasMarketDayWalk2025Client";
import { kaysersbergChristmasMarketDayWalk2025Detail } from "../../../data/video-details/kaysersberg-christmas-market-day-walk-2025";
import { franceVideos } from "../../../data/videos/france";
import { stringifyJsonLd } from "../../../lib/seo/jsonLd";
import { buildVideoClips } from "../../../lib/seo/videoClips";

const siteUrl = "https://www.prowalktours.com";
const pageUrl = `${siteUrl}/videos/kaysersberg-christmas-market-day-walk-2025`;
const heroImagePath = "/kaysersberg-christmas-market-day-walk-2025/hero.jpg";
const ogImageUrl = `${siteUrl}${heroImagePath}`;
const metadataTitle = "Kaysersberg, France Christmas Market Day Walk (2025)";
const metadataDescription = "Kaysersberg, France Christmas Market Day Walk in 4K. This daytime Christmas market walk through Kaysersberg follows the town’s decorated streets, market .";

const videoRecord = franceVideos.find(
  (video) => video.slug === "kaysersberg-christmas-market-day-walk-2025"
);

export const metadata: Metadata = {
  title: metadataTitle,
  description: metadataDescription,
  alternates: { canonical: pageUrl },
  openGraph: {
    title: metadataTitle,
    description: metadataDescription,
    url: pageUrl,
    images: [{ url: ogImageUrl, alt: "Kaysersberg, France Christmas Market Day Walk (2025)" }],
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
      { "@type": "ListItem", position: 4, name: "KaysersbergChristmas Market Day Walk", item: pageUrl }
    ],
  };

  const videoStructuredData = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: metadataTitle,
    description: metadataDescription,
    thumbnailUrl: ["https://i.ytimg.com/vi/nViNTHYAgXg/maxresdefault.jpg", ogImageUrl],
    embedUrl: "https://www.youtube.com/embed/nViNTHYAgXg",
    contentUrl: "https://www.youtube.com/watch?v=nViNTHYAgXg",
    uploadDate: "2025-12-12",
    duration: "PT1H25M9S",
    url: pageUrl,
      hasPart: buildVideoClips({
      highlights: kaysersbergChristmasMarketDayWalk2025Detail.highlights,
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
      <KaysersbergChristmasMarketDayWalk2025Client />
    </>
  );
}
