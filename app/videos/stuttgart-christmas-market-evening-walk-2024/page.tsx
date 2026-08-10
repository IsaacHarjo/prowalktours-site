import type { Metadata } from "next";
import StuttgartChristmasMarketEveningWalk2024Client from "./StuttgartChristmasMarketEveningWalk2024Client";
import { stuttgartChristmasMarketEveningWalk2024Detail } from "../../../data/video-details/stuttgart-christmas-market-evening-walk-2024";
import { germanyVideos } from "../../../data/videos/germany";
import { stringifyJsonLd } from "../../../lib/seo/jsonLd";
import { buildVideoClips } from "../../../lib/seo/videoClips";

const siteUrl = "https://www.prowalktours.com";
const pageUrl = `${siteUrl}/videos/stuttgart-christmas-market-evening-walk-2024`;
const heroImagePath = "/stuttgart-christmas-market-evening-walk-2024/hero.jpg";
const ogImageUrl = `${siteUrl}${heroImagePath}`;
const metadataTitle = "Stuttgart, Germany Christmas Market Evening Walk (2024)";
const metadataDescription = "Stuttgart, Germany Christmas Market Evening Walk in 4K. Join us for an immersive tour that captures all the beautiful sights and festive sounds of the m...";

const videoRecord = germanyVideos.find(
  (video) => video.slug === "stuttgart-christmas-market-evening-walk-2024"
);

export const metadata: Metadata = {
  title: metadataTitle,
  description: metadataDescription,
  alternates: { canonical: pageUrl },
  openGraph: {
    title: metadataTitle,
    description: metadataDescription,
    url: pageUrl,
    images: [{ url: ogImageUrl, alt: "Stuttgart, Germany Christmas Market Evening Walk (2024)" }],
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
      { "@type": "ListItem", position: 4, name: "Stuttgart, Germany Christmas Market Evening Walk", item: pageUrl }
    ],
  };

  const videoStructuredData = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: metadataTitle,
    description: metadataDescription,
    thumbnailUrl: ["https://i.ytimg.com/vi/1umZtnFfm60/maxresdefault.jpg", ogImageUrl],
    embedUrl: "https://www.youtube.com/embed/1umZtnFfm60",
    contentUrl: "https://www.youtube.com/watch?v=1umZtnFfm60",
    uploadDate: "2024-12-14",
    duration: "PT1H34M35S",
    url: pageUrl,
      hasPart: buildVideoClips({
      highlights: stuttgartChristmasMarketEveningWalk2024Detail.highlights,
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
      <StuttgartChristmasMarketEveningWalk2024Client />
    </>
  );
}
