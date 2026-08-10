import type { Metadata } from "next";
import AachenChristmasMarketEveningWalk2024Client from "./AachenChristmasMarketEveningWalk2024Client";
import { aachenChristmasMarketEveningWalk2024Detail } from "../../../data/video-details/aachen-christmas-market-evening-walk-2024";
import { germanyVideos } from "../../../data/videos/germany";
import { stringifyJsonLd } from "../../../lib/seo/jsonLd";
import { buildVideoClips } from "../../../lib/seo/videoClips";

const siteUrl = "https://www.prowalktours.com";
const pageUrl = `${siteUrl}/videos/aachen-christmas-market-evening-walk-2024`;
const heroImagePath = "/aachen-christmas-market-evening-walk-2024/hero.jpg";
const ogImageUrl = `${siteUrl}${heroImagePath}`;
const metadataTitle = "Aachen, Germany Christmas Market Evening Walk (2024)";
const metadataDescription = "Aachen, Germany Christmas Market Evening Walk in 4K. This is an evening walking tour around the Christmas Markets in Aachen.";

const videoRecord = germanyVideos.find(
  (video) => video.slug === "aachen-christmas-market-evening-walk-2024"
);

export const metadata: Metadata = {
  title: metadataTitle,
  description: metadataDescription,
  alternates: { canonical: pageUrl },
  openGraph: {
    title: metadataTitle,
    description: metadataDescription,
    url: pageUrl,
    images: [{ url: ogImageUrl, alt: "Aachen, Germany Christmas Market Evening Walk (2024)" }],
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
      { "@type": "ListItem", position: 4, name: "Aachen, Germany Christmas Market Evening Walk", item: pageUrl }
    ],
  };

  const videoStructuredData = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: metadataTitle,
    description: metadataDescription,
    thumbnailUrl: ["https://i.ytimg.com/vi/sNUBp762Qik/maxresdefault.jpg", ogImageUrl],
    embedUrl: "https://www.youtube.com/embed/sNUBp762Qik",
    contentUrl: "https://www.youtube.com/watch?v=sNUBp762Qik",
    uploadDate: "2024-11-29",
    duration: "PT1H16M35S",
    url: pageUrl,
      hasPart: buildVideoClips({
      highlights: aachenChristmasMarketEveningWalk2024Detail.highlights,
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
      <AachenChristmasMarketEveningWalk2024Client />
    </>
  );
}
