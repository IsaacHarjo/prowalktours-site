import type { Metadata } from "next";
import RothenburgChristmasMarketMorningWalk2024Client from "./RothenburgChristmasMarketMorningWalk2024Client";
import { rothenburgChristmasMarketMorningWalk2024Detail } from "../../../data/video-details/rothenburg-christmas-market-morning-walk-2024";
import { germanyVideos } from "../../../data/videos/germany";
import { stringifyJsonLd } from "../../../lib/seo/jsonLd";
import { buildVideoClips } from "../../../lib/seo/videoClips";

const siteUrl = "https://www.prowalktours.com";
const pageUrl = `${siteUrl}/videos/rothenburg-christmas-market-morning-walk-2024`;
const heroImagePath = "/rothenburg-christmas-market-morning-walk-2024/hero.jpg";
const ogImageUrl = `${siteUrl}${heroImagePath}`;
const metadataTitle = "Rothenburg ob der Tauber, Germany Christmas Market Morning Walk (2024)";
const metadataDescription = "Rothenburg ob der Tauber, Germany Christmas Market Morning Walk in 4K. 2024 starting at 8:55 AM just outside my hotel.";

const videoRecord = germanyVideos.find(
  (video) => video.slug === "rothenburg-christmas-market-morning-walk-2024"
);

export const metadata: Metadata = {
  title: metadataTitle,
  description: metadataDescription,
  alternates: { canonical: pageUrl },
  openGraph: {
    title: metadataTitle,
    description: metadataDescription,
    url: pageUrl,
    images: [{ url: ogImageUrl, alt: "Rothenburg ob der Tauber, Germany Christmas Market Morning Walk (2024)" }],
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
      { "@type": "ListItem", position: 4, name: "Rothenburg ob der Tauber, Germany Christmas Market Morning Walk", item: pageUrl }
    ],
  };

  const videoStructuredData = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: metadataTitle,
    description: metadataDescription,
    thumbnailUrl: ["https://i.ytimg.com/vi/611ytxlZjv0/maxresdefault.jpg", ogImageUrl],
    embedUrl: "https://www.youtube.com/embed/611ytxlZjv0",
    contentUrl: "https://www.youtube.com/watch?v=611ytxlZjv0",
    uploadDate: "2024-12-14",
    duration: "PT0H48M0S",
    url: pageUrl,
      hasPart: buildVideoClips({
      highlights: rothenburgChristmasMarketMorningWalk2024Detail.highlights,
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
      <RothenburgChristmasMarketMorningWalk2024Client />
    </>
  );
}
