import type { Metadata } from "next";
import SirmioneDayWalk2026Client from "./SirmioneDayWalk2026Client";
import { sirmioneDayWalk2026Detail } from "../../../data/video-details/sirmione-day-walk-2026";
import { italyVideos } from "../../../data/videos/italy";
import { stringifyJsonLd } from "../../../lib/seo/jsonLd";
import { buildVideoClips } from "../../../lib/seo/videoClips";

const siteUrl = "https://www.prowalktours.com";
const pageUrl = `${siteUrl}/videos/sirmione-day-walk-2026`;
const heroImagePath = "/sirmione-day-walk-2026/hero.jpg";
const ogImageUrl = `${siteUrl}${heroImagePath}`;
const metadataTitle = "Sirmione 4K Walking Tour — Lake Garda's Peninsula Town, Italy";
const metadataDescription = "Sirmione 4K Walking Tour — Lake Garda's Peninsula Town, Italy in 4K. Sirmione is a walled town at the tip of a narrow peninsula on Lake Garda, entered a...";

const videoRecord = italyVideos.find(
  (video) => video.slug === "sirmione-day-walk-2026"
);

export const metadata: Metadata = {
  title: metadataTitle,
  description: metadataDescription,
  alternates: { canonical: pageUrl },
  openGraph: {
    title: metadataTitle,
    description: metadataDescription,
    url: pageUrl,
    images: [{ url: ogImageUrl, alt: "Sirmione 4K Walking Tour — Lake Garda's Peninsula Town, Italy" }],
  },
};

export default function Page() {
  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name: "Countries", item: `${siteUrl}/countries` },
      { "@type": "ListItem", position: 3, name: "Italy", item: `${siteUrl}/destinations/italy` },
      { "@type": "ListItem", position: 4, name: "Sirmione 4K Walking Tour — Lake Garda's Peninsula Town", item: pageUrl }
    ],
  };

  const videoStructuredData = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: metadataTitle,
    description: metadataDescription,
    thumbnailUrl: ["https://i.ytimg.com/vi/74gEAesaNiE/maxresdefault.jpg", ogImageUrl],
    embedUrl: "https://www.youtube.com/embed/74gEAesaNiE",
    contentUrl: "https://www.youtube.com/watch?v=74gEAesaNiE",
    uploadDate: "2026-07-24",
    duration: "PT3H9M52S",
    url: pageUrl,
    hasPart: buildVideoClips({
      highlights: sirmioneDayWalk2026Detail.highlights,
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
      <SirmioneDayWalk2026Client />
    </>
  );
}
