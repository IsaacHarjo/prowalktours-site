import type { Metadata } from "next";
import EsslingenChristmasMarketDayWalk2024Client from "./EsslingenChristmasMarketDayWalk2024Client";
import { esslingenChristmasMarketDayWalk2024Detail } from "../../../data/video-details/esslingen-christmas-market-day-walk-2024";
import { germanyVideos } from "../../../data/videos/germany";
import { stringifyJsonLd } from "../../../lib/seo/jsonLd";
import { buildVideoClips } from "../../../lib/seo/videoClips";

const siteUrl = "https://www.prowalktours.com";
const pageUrl = `${siteUrl}/videos/esslingen-christmas-market-day-walk-2024`;
const heroImagePath = "/esslingen-christmas-market-day-walk-2024/hero.jpg";
const ogImageUrl = `${siteUrl}${heroImagePath}`;
const metadataTitle = "Esslingen, Germany Christmas Market Day Walk (2024)";
const metadataDescription = "Esslingen, Germany Christmas Market Day Walk in 4K. This is a tour through the medieval Christmas Markets in Esslingen.";

const videoRecord = germanyVideos.find(
  (video) => video.slug === "esslingen-christmas-market-day-walk-2024"
);

export const metadata: Metadata = {
  title: metadataTitle,
  description: metadataDescription,
  alternates: { canonical: pageUrl },
  openGraph: {
    title: metadataTitle,
    description: metadataDescription,
    url: pageUrl,
    images: [{ url: ogImageUrl, alt: "Esslingen, Germany Christmas Market Day Walk (2024)" }],
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
      { "@type": "ListItem", position: 4, name: "Esslingen, Germany Christmas Market Day Walk", item: pageUrl }
    ],
  };

  const videoStructuredData = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: metadataTitle,
    description: metadataDescription,
    thumbnailUrl: ["https://i.ytimg.com/vi/I0BUehZBcOI/maxresdefault.jpg", ogImageUrl],
    embedUrl: "https://www.youtube.com/embed/I0BUehZBcOI",
    contentUrl: "https://www.youtube.com/watch?v=I0BUehZBcOI",
    uploadDate: "2024-12-15",
    duration: "PT1H35M0S",
    url: pageUrl,
      hasPart: buildVideoClips({
      highlights: esslingenChristmasMarketDayWalk2024Detail.highlights,
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
      <EsslingenChristmasMarketDayWalk2024Client />
    </>
  );
}
