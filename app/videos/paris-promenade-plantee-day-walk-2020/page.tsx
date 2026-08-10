import type { Metadata } from "next";
import ParisPromenadePlanteeDayWalk2020Client from "./ParisPromenadePlanteeDayWalk2020Client";
import { parisPromenadePlanteeDayWalk2020Detail } from "../../../data/video-details/paris-promenade-plantee-day-walk-2020";
import { franceVideos } from "../../../data/videos/france";
import { stringifyJsonLd } from "../../../lib/seo/jsonLd";
import { buildVideoClips } from "../../../lib/seo/videoClips";

const siteUrl = "https://www.prowalktours.com";
const pageUrl = `${siteUrl}/videos/paris-promenade-plantee-day-walk-2020`;
const heroImagePath = "/paris-promenade-plantee-day-walk-2020/hero.jpg";
const ogImageUrl = `${siteUrl}${heroImagePath}`;
const metadataTitle =
  "Paris Promenade Plant\u00e9e Walk (2020) | Coul\u00e9e Verte, Jardin de Reuilly";
const metadataDescription =
  "Paris Promenade Plant\u00e9e walk in 4K: the Coul\u00e9e Verte Ren\u00e9-Dumont elevated greenway, Viaduc des Arts, and Jardin de Reuilly.";

const videoRecord = franceVideos.find(
  (video) => video.slug === "paris-promenade-plantee-day-walk-2020"
);

export const metadata: Metadata = {
  title: metadataTitle,
  description: metadataDescription,
  alternates: { canonical: pageUrl },
  openGraph: {
    title: metadataTitle,
    description: metadataDescription,
    url: pageUrl,
    images: [{ url: ogImageUrl, alt: "Paris Promenade Plant\u00e9e elevated greenway" }],
  },
};

export default function ParisPromenadePlanteeDayWalk2020Page() {
  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name: "Countries", item: `${siteUrl}/countries` },
      { "@type": "ListItem", position: 3, name: "France", item: `${siteUrl}/destinations/france` },
      { "@type": "ListItem", position: 4, name: "Paris", item: `${siteUrl}/destinations/france/paris` },
      { "@type": "ListItem", position: 5, name: "Promenade Plant\u00e9e Walk (2020)", item: pageUrl },
    ],
  };

  const videoStructuredData = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: metadataTitle,
    description: metadataDescription,
    thumbnailUrl: ["https://i.ytimg.com/vi/KoORZY4TygU/maxresdefault.jpg", ogImageUrl],
    embedUrl: "https://www.youtube.com/embed/KoORZY4TygU",
    contentUrl: "https://www.youtube.com/watch?v=KoORZY4TygU",
    uploadDate: "2020-07-19",
    duration: "PT57M40S",
    url: pageUrl,
      hasPart: buildVideoClips({
      highlights: parisPromenadePlanteeDayWalk2020Detail.highlights,
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
      <ParisPromenadePlanteeDayWalk2020Client />
    </>
  );
}
