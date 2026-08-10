import type { Metadata } from "next";
import MontmartreDayWalk2020Client from "./MontmartreDayWalk2020Client";
import { montmartreDayWalk2020Detail } from "../../../data/video-details/montmartre-day-walk-2020";
import { franceVideos } from "../../../data/videos/france";
import { stringifyJsonLd } from "../../../lib/seo/jsonLd";
import { buildVideoClips } from "../../../lib/seo/videoClips";

const siteUrl = "https://www.prowalktours.com";
const pageUrl = `${siteUrl}/videos/montmartre-day-walk-2020`;
const heroImagePath = "/montmartre-day-walk-2020/hero.jpg";
const ogImageUrl = `${siteUrl}${heroImagePath}`;
const metadataTitle =
  "Montmartre, France Day Walk (2020) | Sacr\u00e9-C\u0153ur, Place du Tertre, La Maison Rose";
const metadataDescription =
  "Montmartre day walk in 4K: Moulin Rouge, Rue Lepic, La Maison Rose, Place du Tertre, Sacr\u00e9-C\u0153ur dome views, and the hilltop streets of Paris.";

const videoRecord = franceVideos.find(
  (video) => video.slug === "montmartre-day-walk-2020"
);

export const metadata: Metadata = {
  title: metadataTitle,
  description: metadataDescription,
  alternates: { canonical: pageUrl },
  openGraph: {
    title: metadataTitle,
    description: metadataDescription,
    url: pageUrl,
    images: [{ url: ogImageUrl, alt: "Montmartre day walk hilltop streets" }],
  },
};

export default function MontmartreDayWalk2020Page() {
  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name: "Countries", item: `${siteUrl}/countries` },
      { "@type": "ListItem", position: 3, name: "France", item: `${siteUrl}/destinations/france` },
      { "@type": "ListItem", position: 4, name: "Paris", item: `${siteUrl}/destinations/france/paris` },
      { "@type": "ListItem", position: 5, name: "Montmartre Day Walk (2020)", item: pageUrl },
    ],
  };

  const videoStructuredData = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: metadataTitle,
    description: metadataDescription,
    thumbnailUrl: ["https://i.ytimg.com/vi/yqOlY5uBBbo/maxresdefault.jpg", ogImageUrl],
    embedUrl: "https://www.youtube.com/embed/yqOlY5uBBbo",
    contentUrl: "https://www.youtube.com/watch?v=yqOlY5uBBbo",
    uploadDate: "2020-07-18",
    duration: "PT1H53M27S",
    url: pageUrl,
      hasPart: buildVideoClips({
      highlights: montmartreDayWalk2020Detail.highlights,
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
      <MontmartreDayWalk2020Client />
    </>
  );
}
