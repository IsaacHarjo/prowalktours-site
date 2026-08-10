import type { Metadata } from "next";
import StanleyParkSeawallWalkVancouverClient from "./StanleyParkSeawallWalkVancouverClient";
import { stanleyParkSeawallWalkVancouverDetail } from "../../../data/video-details/stanley-park-seawall-walk-vancouver";
import { canadaVideos } from "../../../data/videos/canada";
import { stringifyJsonLd } from "../../../lib/seo/jsonLd";
import { buildVideoClips } from "../../../lib/seo/videoClips";

const siteUrl = "https://www.prowalktours.com";
const pageUrl = "https://www.prowalktours.com/videos/stanley-park-seawall-walk-vancouver";
const ogImageUrl = "https://img.youtube.com/vi/uN7UkfKc-_w/maxresdefault.jpg";
const metadataTitle = "Stanley Park Seawall Walking Tour | Full Loop — Vancouver BC";
const metadataDescription = "Walk the full Stanley Park Seawall loop in this 4K walking tour featuring waterfront views, beaches, sculptures, and the Lions Gate Bridge in Vancouver, British Columbia.";

const videoRecord = canadaVideos.find(
  (video) => video.slug === "stanley-park-seawall-walk-vancouver"
);

export const metadata: Metadata = {
  title: metadataTitle,
  description: metadataDescription,
  alternates: { canonical: pageUrl },
  openGraph: {
    title: metadataTitle,
    description: metadataDescription,
    url: pageUrl,
    images: [{ url: ogImageUrl, alt: "Stanley Park Seawall walking tour in Vancouver" }],
  },
};

export default function StanleyParkSeawallWalkVancouverPage() {
  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name: "Countries", item: `${siteUrl}/countries` },
      { "@type": "ListItem", position: 3, name: "Canada", item: `${siteUrl}/destinations/canada` },
      { "@type": "ListItem", position: 4, name: "Stanley Park Seawall Walk", item: pageUrl },
    ],
  };
  const videoStructuredData = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: "Stanley Park Seawall Walking Tour",
    description: metadataDescription,
    thumbnailUrl: [ogImageUrl],
    embedUrl: "https://www.youtube.com/embed/uN7UkfKc-_w",
    contentUrl: "https://www.youtube.com/watch?v=uN7UkfKc-_w",
    uploadDate: "2018-07-29",
    duration: "PT2H4M52S",
    url: pageUrl,
      hasPart: buildVideoClips({
      highlights: stanleyParkSeawallWalkVancouverDetail.highlights,
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
      <StanleyParkSeawallWalkVancouverClient />
    </>
  );
}
