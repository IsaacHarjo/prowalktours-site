import type { Metadata } from "next";
import StandardGuideClient from "../../../components/guides/StandardGuideClient";
import { buildChristmasCatalog } from "../../../lib/christmas/catalog";
import { buildGermanyOrientation } from "../../../lib/christmas/germany-orientation";
import { nurembergGuide } from "../../../lib/christmas/nuremberg";
import { nurembergVisitorMap } from "../../../lib/christmas/nuremberg-visitor-map";
import { stringifyJsonLd } from "../../../lib/seo/jsonLd";
import { youtubeIdFromUrl } from "../../../lib/tours/core";
import { discoveryVideos, worldTours } from "../../../lib/tours/server";

const url = "https://www.prowalktours.com/christmas-markets/nuremberg";
const title = "Nuremberg Christmas Market 2026: Dates, Route & Walking Tours | Prowalk Tours";
const description = "Plan a visit to Nuremberg’s Christkindlesmarkt with the route I filmed, official 2026 dates and opening hours, public transport, and my day and evening walks from 2022 and 2024.";
export const metadata: Metadata = {
  title, description, alternates: { canonical: url },
  openGraph: { title, description, url, images: [{ url: nurembergGuide.hero.src, width: nurembergGuide.hero.width, height: nurembergGuide.hero.height, alt: nurembergGuide.hero.alt }] },
};

export default function NurembergChristmasPage() {
  const christmasWalks = buildChristmasCatalog(discoveryVideos, worldTours);
  const walks = christmasWalks.filter(walk => walk.city === "Nuremberg").flatMap(walk => {
    const youtubeId = youtubeIdFromUrl(walk.youtubeUrl);
    return youtubeId ? [{ ...walk, youtubeId }] : [];
  });
  const structuredData = { "@context": "https://schema.org", "@graph": [
    { "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.prowalktours.com" },
      { "@type": "ListItem", position: 2, name: "Christmas Markets", item: "https://www.prowalktours.com/christmas-markets" },
      { "@type": "ListItem", position: 3, name: "Nuremberg", item: url },
    ] },
    { "@type": "CollectionPage", name: title, description, url, about: { "@type": "Place", name: "Nuremberg, Bavaria, Germany" }, dateModified: nurembergGuide.season.checkedOn,
      mainEntity: { "@type": "ItemList", itemListElement: walks.map((walk, index) => ({ "@type": "ListItem", position: index + 1, name: walk.siteTitle, url: walk.watchHref.startsWith("/") ? `https://www.prowalktours.com${walk.watchHref}` : walk.watchHref })) } },
  ] };
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: stringifyJsonLd(structuredData) }} />
    <StandardGuideClient guide={nurembergGuide} walks={walks} visitorMapData={nurembergVisitorMap} orientation={buildGermanyOrientation(worldTours, christmasWalks, "Nuremberg")} />
  </>;
}
