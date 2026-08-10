import type { Metadata } from "next";
import RothenburgChristmasMarketEveningWalk2024Client from "./RothenburgChristmasMarketEveningWalk2024Client";
import { rothenburgChristmasMarketEveningWalk2024Detail } from "../../../data/video-details/rothenburg-christmas-market-evening-walk-2024";
import { germanyVideos } from "../../../data/videos/germany";
import { stringifyJsonLd } from "../../../lib/seo/jsonLd";
import { buildVideoClips } from "../../../lib/seo/videoClips";

const siteUrl = "https://www.prowalktours.com";
const pageUrl = `${siteUrl}/videos/rothenburg-christmas-market-evening-walk-2024`;
const heroImagePath = "/rothenburg-christmas-market-evening-walk-2024/hero.jpg";
const ogImageUrl = `${siteUrl}${heroImagePath}`;
const metadataTitle = "Rothenburg ob der Tauber, Germany Christmas Market Evening Walk (2024)";
const metadataDescription = "Rothenburg ob der Tauber, Germany Christmas Market Evening Walk in 4K. This is an evening tour through the city and Christmas Markets of Rothenburg ob d...";

const videoRecord = germanyVideos.find(
  (video) => video.slug === "rothenburg-christmas-market-evening-walk-2024"
);

export const metadata: Metadata = {
  title: metadataTitle,
  description: metadataDescription,
  alternates: { canonical: pageUrl },
  openGraph: {
    title: metadataTitle,
    description: metadataDescription,
    url: pageUrl,
    images: [{ url: ogImageUrl, alt: "Rothenburg ob der Tauber, Germany Christmas Market Evening Walk (2024)" }],
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
      { "@type": "ListItem", position: 4, name: "Rothenburg ob der Tauber, Germany Christmas Market Evening Walk", item: pageUrl }
    ],
  };

  const videoStructuredData = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: metadataTitle,
    description: metadataDescription,
    thumbnailUrl: ["https://i.ytimg.com/vi/rNwRKSRIVgk/maxresdefault.jpg", ogImageUrl],
    embedUrl: "https://www.youtube.com/embed/rNwRKSRIVgk",
    contentUrl: "https://www.youtube.com/watch?v=rNwRKSRIVgk",
    uploadDate: "2024-12-13",
    duration: "PT2H22M30S",
    url: pageUrl,
      hasPart: buildVideoClips({
      highlights: rothenburgChristmasMarketEveningWalk2024Detail.highlights,
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
      <RothenburgChristmasMarketEveningWalk2024Client />
    </>
  );
}
