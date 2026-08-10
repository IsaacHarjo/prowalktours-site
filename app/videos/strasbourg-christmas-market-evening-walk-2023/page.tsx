import type { Metadata } from "next";
import StrasbourgChristmasMarketEveningWalk2023Client from "./StrasbourgChristmasMarketEveningWalk2023Client";
import { strasbourgChristmasMarketEveningWalk2023Detail } from "../../../data/video-details/strasbourg-christmas-market-evening-walk-2023";
import { franceVideos } from "../../../data/videos/france";
import { stringifyJsonLd } from "../../../lib/seo/jsonLd";
import { buildVideoClips } from "../../../lib/seo/videoClips";

const siteUrl = "https://www.prowalktours.com";
const pageUrl = `${siteUrl}/videos/strasbourg-christmas-market-evening-walk-2023`;
const heroImagePath = "/strasbourg-christmas-market-evening-walk-2023/hero.jpg";
const ogImageUrl = `${siteUrl}${heroImagePath}`;
const metadataTitle = "Strasbourg, France Christmas Market Evening Walk (2023)";
const metadataDescription = "Strasbourg, France Christmas Market Evening Walk in 4K. This evening walk through Strasbourg’s Christmas markets begins in Petite France and gradually w...";

const videoRecord = franceVideos.find(
  (video) => video.slug === "strasbourg-christmas-market-evening-walk-2023"
);

export const metadata: Metadata = {
  title: metadataTitle,
  description: metadataDescription,
  alternates: { canonical: pageUrl },
  openGraph: {
    title: metadataTitle,
    description: metadataDescription,
    url: pageUrl,
    images: [{ url: ogImageUrl, alt: "Strasbourg, France Christmas Market Evening Walk (2023)" }],
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
      { "@type": "ListItem", position: 4, name: "StrasbourgChristmas Market Evening Walk", item: pageUrl }
    ],
  };

  const videoStructuredData = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: metadataTitle,
    description: metadataDescription,
    thumbnailUrl: ["https://i.ytimg.com/vi/sLkoeB_d93Q/maxresdefault.jpg", ogImageUrl],
    embedUrl: "https://www.youtube.com/embed/sLkoeB_d93Q",
    contentUrl: "https://www.youtube.com/watch?v=sLkoeB_d93Q",
    uploadDate: "2023-12-03",
    duration: "PT2H33M53S",
    url: pageUrl,
      hasPart: buildVideoClips({
      highlights: strasbourgChristmasMarketEveningWalk2023Detail.highlights,
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
      <StrasbourgChristmasMarketEveningWalk2023Client />
    </>
  );
}
