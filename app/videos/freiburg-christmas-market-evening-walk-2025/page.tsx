import type { Metadata } from "next";
import FreiburgChristmasMarketEveningWalk2025Client from "./FreiburgChristmasMarketEveningWalk2025Client";
import { freiburgChristmasMarketEveningWalk2025Detail } from "../../../data/video-details/freiburg-christmas-market-evening-walk-2025";
import { germanyVideos } from "../../../data/videos/germany";
import { stringifyJsonLd } from "../../../lib/seo/jsonLd";
import { buildVideoClips } from "../../../lib/seo/videoClips";

const siteUrl = "https://www.prowalktours.com";
const pageUrl = `${siteUrl}/videos/freiburg-christmas-market-evening-walk-2025`;
const heroImagePath = "/freiburg-christmas-market-evening-walk-2025/hero.jpg";
const ogImageUrl = `${siteUrl}${heroImagePath}`;
const metadataTitle = "Freiburg, Germany Christmas Market Evening Walk (2025)";
const metadataDescription = "Freiburg, Germany Christmas Market Evening Walk in 4K. Freiburg’s Christmas Market is known for its cozy.";

const videoRecord = germanyVideos.find(
  (video) => video.slug === "freiburg-christmas-market-evening-walk-2025"
);

export const metadata: Metadata = {
  title: metadataTitle,
  description: metadataDescription,
  alternates: { canonical: pageUrl },
  openGraph: {
    title: metadataTitle,
    description: metadataDescription,
    url: pageUrl,
    images: [{ url: ogImageUrl, alt: "Freiburg, Germany Christmas Market Evening Walk (2025)" }],
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
      { "@type": "ListItem", position: 4, name: "Freiburg, Germany Christmas Market Evening Walk", item: pageUrl }
    ],
  };

  const videoStructuredData = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: metadataTitle,
    description: metadataDescription,
    thumbnailUrl: ["https://i.ytimg.com/vi/4bQoSIwQHZM/maxresdefault.jpg", ogImageUrl],
    embedUrl: "https://www.youtube.com/embed/4bQoSIwQHZM",
    contentUrl: "https://www.youtube.com/watch?v=4bQoSIwQHZM",
    uploadDate: "2025-12-16",
    duration: "PT1H48M23S",
    url: pageUrl,
      hasPart: buildVideoClips({
      highlights: freiburgChristmasMarketEveningWalk2025Detail.highlights,
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
      <FreiburgChristmasMarketEveningWalk2025Client />
    </>
  );
}
