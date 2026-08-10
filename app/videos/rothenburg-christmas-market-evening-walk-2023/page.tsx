import type { Metadata } from "next";
import RothenburgChristmasMarketEveningWalk2023Client from "./RothenburgChristmasMarketEveningWalk2023Client";
import { rothenburgChristmasMarketEveningWalk2023Detail } from "../../../data/video-details/rothenburg-christmas-market-evening-walk-2023";
import { germanyVideos } from "../../../data/videos/germany";
import { stringifyJsonLd } from "../../../lib/seo/jsonLd";
import { buildVideoClips } from "../../../lib/seo/videoClips";

const siteUrl = "https://www.prowalktours.com";
const pageUrl = `${siteUrl}/videos/rothenburg-christmas-market-evening-walk-2023`;
const heroImagePath = "/rothenburg-christmas-market-evening-walk-2023/hero.jpg";
const ogImageUrl = `${siteUrl}${heroImagePath}`;
const metadataTitle = "Rothenburg ob der Tauber, Germany Christmas Market Evening Walk (2023)";
const metadataDescription = "Rothenburg ob der Tauber, Germany Christmas Market Evening Walk in 4K. This walking tour around the Christmas markets of Rothenburg ob der Tauber.";

const videoRecord = germanyVideos.find(
  (video) => video.slug === "rothenburg-christmas-market-evening-walk-2023"
);

export const metadata: Metadata = {
  title: metadataTitle,
  description: metadataDescription,
  alternates: { canonical: pageUrl },
  openGraph: {
    title: metadataTitle,
    description: metadataDescription,
    url: pageUrl,
    images: [{ url: ogImageUrl, alt: "Rothenburg ob der Tauber, Germany Christmas Market Evening Walk (2023)" }],
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
    thumbnailUrl: ["https://i.ytimg.com/vi/jur8EnASUp0/maxresdefault.jpg", ogImageUrl],
    embedUrl: "https://www.youtube.com/embed/jur8EnASUp0",
    contentUrl: "https://www.youtube.com/watch?v=jur8EnASUp0",
    uploadDate: "2023-12-01",
    duration: "PT1H38M0S",
    url: pageUrl,
      hasPart: buildVideoClips({
      highlights: rothenburgChristmasMarketEveningWalk2023Detail.highlights,
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
      <RothenburgChristmasMarketEveningWalk2023Client />
    </>
  );
}
