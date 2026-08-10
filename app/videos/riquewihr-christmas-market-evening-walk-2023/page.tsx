import type { Metadata } from "next";
import RiquewihrChristmasMarketEveningWalk2023Client from "./RiquewihrChristmasMarketEveningWalk2023Client";
import { riquewihrChristmasMarketEveningWalk2023Detail } from "../../../data/video-details/riquewihr-christmas-market-evening-walk-2023";
import { franceVideos } from "../../../data/videos/france";
import { stringifyJsonLd } from "../../../lib/seo/jsonLd";
import { buildVideoClips } from "../../../lib/seo/videoClips";

const siteUrl = "https://www.prowalktours.com";
const pageUrl = `${siteUrl}/videos/riquewihr-christmas-market-evening-walk-2023`;
const heroImagePath = "/riquewihr-christmas-market-evening-walk-2023/hero.jpg";
const ogImageUrl = `${siteUrl}${heroImagePath}`;
const metadataTitle = "Riquewihr, France Christmas Market Evening Walk (2023)";
const metadataDescription = "Riquewihr, France Christmas Market Evening Walk in 4K. This evening walk through Riquewihr’s Christmas market follows the old town through its decorated...";

const videoRecord = franceVideos.find(
  (video) => video.slug === "riquewihr-christmas-market-evening-walk-2023"
);

export const metadata: Metadata = {
  title: metadataTitle,
  description: metadataDescription,
  alternates: { canonical: pageUrl },
  openGraph: {
    title: metadataTitle,
    description: metadataDescription,
    url: pageUrl,
    images: [{ url: ogImageUrl, alt: "Riquewihr, France Christmas Market Evening Walk (2023)" }],
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
      { "@type": "ListItem", position: 4, name: "RiquewihrChristmas Market Evening Walk", item: pageUrl }
    ],
  };

  const videoStructuredData = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: metadataTitle,
    description: metadataDescription,
    thumbnailUrl: ["https://i.ytimg.com/vi/fXbDgbvA3o0/maxresdefault.jpg", ogImageUrl],
    embedUrl: "https://www.youtube.com/embed/fXbDgbvA3o0",
    contentUrl: "https://www.youtube.com/watch?v=fXbDgbvA3o0",
    uploadDate: "2023-12-05",
    duration: "PT1H17M17S",
    url: pageUrl,
      hasPart: buildVideoClips({
      highlights: riquewihrChristmasMarketEveningWalk2023Detail.highlights,
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
      <RiquewihrChristmasMarketEveningWalk2023Client />
    </>
  );
}
