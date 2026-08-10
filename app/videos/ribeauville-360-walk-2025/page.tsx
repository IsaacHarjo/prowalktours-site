import type { Metadata } from "next";
import Ribeauville360Walk2025Client from "./Ribeauville360Walk2025Client";
import { ribeauville360Walk2025Detail } from "../../../data/video-details/ribeauville-360-walk-2025";
import { franceVideos } from "../../../data/videos/france";
import { stringifyJsonLd } from "../../../lib/seo/jsonLd";
import { buildVideoClips } from "../../../lib/seo/videoClips";

const siteUrl = "https://www.prowalktours.com";
const pageUrl = `${siteUrl}/videos/ribeauville-360-walk-2025`;
const heroImagePath = "/ribeauville-360-walk-2025/hero.jpg";
const ogImageUrl = `${siteUrl}${heroImagePath}`;
const metadataTitle = "Ribeauvillé, France Christmas Market 360° Walk (2025)";
const metadataDescription = "Ribeauvillé, France Christmas Market 360° Walk in 4K. This 360 VR walk through the Ribeauvillé Christmas Market captures the event’s medieval atmosphere w.";

const videoRecord = franceVideos.find(
  (video) => video.slug === "ribeauville-360-walk-2025"
);

export const metadata: Metadata = {
  title: metadataTitle,
  description: metadataDescription,
  alternates: { canonical: pageUrl },
  openGraph: {
    title: metadataTitle,
    description: metadataDescription,
    url: pageUrl,
    images: [{ url: ogImageUrl, alt: "Ribeauvillé, France Christmas Market 360° Walk (2025)" }],
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
      { "@type": "ListItem", position: 4, name: "RibeauvilléChristmas Market 360° Walk", item: pageUrl }
    ],
  };

  const videoStructuredData = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: metadataTitle,
    description: metadataDescription,
    thumbnailUrl: ["https://i.ytimg.com/vi/ccCz_dKYS5c/maxresdefault.jpg", ogImageUrl],
    embedUrl: "https://www.youtube.com/embed/ccCz_dKYS5c",
    contentUrl: "https://www.youtube.com/watch?v=ccCz_dKYS5c",
    uploadDate: "2025-12-13",
    duration: "PT1H29M35S",
    url: pageUrl,
      hasPart: buildVideoClips({
      highlights: ribeauville360Walk2025Detail.highlights,
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
      <Ribeauville360Walk2025Client />
    </>
  );
}
