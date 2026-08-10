import type { Metadata } from "next";
import KaysersbergChristmasMarket360Tour2025Client from "./KaysersbergChristmasMarket360Tour2025Client";
import { kaysersbergChristmasMarket360Tour2025Detail } from "../../../data/video-details/kaysersberg-christmas-market-360-tour-2025";
import { franceVideos } from "../../../data/videos/france";
import { stringifyJsonLd } from "../../../lib/seo/jsonLd";
import { buildVideoClips } from "../../../lib/seo/videoClips";

const siteUrl = "https://www.prowalktours.com";
const pageUrl = `${siteUrl}/videos/kaysersberg-christmas-market-360-tour-2025`;
const heroImagePath = "/kaysersberg-christmas-market-360-tour-2025/hero.jpg";
const ogImageUrl = `${siteUrl}${heroImagePath}`;
const metadataTitle = "Kaysersberg, France Christmas Market 360° VR Walk (2025)";
const metadataDescription = "Kaysersberg, France Christmas Market 360° VR Walk in 4K. This 360° Christmas market walk through Kaysersberg explores one of the most atmospheric holida...";

const videoRecord = franceVideos.find(
  (video) => video.slug === "kaysersberg-christmas-market-360-tour-2025"
);

export const metadata: Metadata = {
  title: metadataTitle,
  description: metadataDescription,
  alternates: { canonical: pageUrl },
  openGraph: {
    title: metadataTitle,
    description: metadataDescription,
    url: pageUrl,
    images: [{ url: ogImageUrl, alt: "Kaysersberg, France Christmas Market 360° VR Walk (2025)" }],
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
      { "@type": "ListItem", position: 4, name: "KaysersbergChristmas Market 360° VR Walk", item: pageUrl }
    ],
  };

  const videoStructuredData = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: metadataTitle,
    description: metadataDescription,
    thumbnailUrl: ["https://i.ytimg.com/vi/6KwYy8woxV4/maxresdefault.jpg", ogImageUrl],
    embedUrl: "https://www.youtube.com/embed/6KwYy8woxV4",
    contentUrl: "https://www.youtube.com/watch?v=6KwYy8woxV4",
    uploadDate: "2025-12-12",
    duration: "PT0H47M13S",
    url: pageUrl,
      hasPart: buildVideoClips({
      highlights: kaysersbergChristmasMarket360Tour2025Detail.highlights,
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
      <KaysersbergChristmasMarket360Tour2025Client />
    </>
  );
}
