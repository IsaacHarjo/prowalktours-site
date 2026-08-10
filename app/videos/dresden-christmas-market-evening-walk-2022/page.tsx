import type { Metadata } from "next";
import DresdenChristmasMarketEveningWalk2022Client from "./DresdenChristmasMarketEveningWalk2022Client";
import { dresdenChristmasMarketEveningWalk2022Detail } from "../../../data/video-details/dresden-christmas-market-evening-walk-2022";
import { germanyVideos } from "../../../data/videos/germany";
import { stringifyJsonLd } from "../../../lib/seo/jsonLd";
import { buildVideoClips } from "../../../lib/seo/videoClips";

const siteUrl = "https://www.prowalktours.com";
const pageUrl = `${siteUrl}/videos/dresden-christmas-market-evening-walk-2022`;
const heroImagePath = "/dresden-christmas-market-evening-walk-2022/hero.jpg";
const ogImageUrl = `${siteUrl}${heroImagePath}`;
const metadataTitle = "Dresden, Germany Christmas Market Evening Walk (2022)";
const metadataDescription = "Dresden, Germany Christmas Market Evening Walk in 4K. This is an evening tour around the Christmas Market's in Dresden.";

const videoRecord = germanyVideos.find(
  (video) => video.slug === "dresden-christmas-market-evening-walk-2022"
);

export const metadata: Metadata = {
  title: metadataTitle,
  description: metadataDescription,
  alternates: { canonical: pageUrl },
  openGraph: {
    title: metadataTitle,
    description: metadataDescription,
    url: pageUrl,
    images: [{ url: ogImageUrl, alt: "Dresden, Germany Christmas Market Evening Walk (2022)" }],
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
      { "@type": "ListItem", position: 4, name: "Dresden, Germany Christmas Market Evening Walk", item: pageUrl }
    ],
  };

  const videoStructuredData = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: metadataTitle,
    description: metadataDescription,
    thumbnailUrl: ["https://i.ytimg.com/vi/9JCm5Nzqzfg/maxresdefault.jpg", ogImageUrl],
    embedUrl: "https://www.youtube.com/embed/9JCm5Nzqzfg",
    contentUrl: "https://www.youtube.com/watch?v=9JCm5Nzqzfg",
    uploadDate: "2022-12-11",
    duration: "PT2H5M31S",
    url: pageUrl,
      hasPart: buildVideoClips({
      highlights: dresdenChristmasMarketEveningWalk2022Detail.highlights,
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
      <DresdenChristmasMarketEveningWalk2022Client />
    </>
  );
}
