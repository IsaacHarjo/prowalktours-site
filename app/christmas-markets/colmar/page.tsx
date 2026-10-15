import type { Metadata } from "next";
import { discoveryVideos, worldTours } from "../../../lib/tours/server";
import { youtubeIdFromUrl } from "../../../lib/tours/core";
import { buildChristmasCatalog } from "../../../lib/christmas/catalog";
import { buildAlsacePlaces } from "../../../lib/christmas/orientation";
import { colmarGuide } from "../../../lib/christmas/colmar";
import { colmarPreview } from "../../../lib/christmas/colmar-preview";
import { colmarVisitorMap } from "../../../lib/christmas/colmar-visitor-map";
import { colmar2026 } from "../../../lib/christmas/seasons/colmar-2026";
import { stringifyJsonLd } from "../../../lib/seo/jsonLd";
import DestinationGuideClient from "../../../components/guides/DestinationGuideClient";

const url = "https://www.prowalktours.com/christmas-markets/colmar";
const title = "Colmar Christmas Markets 2026: Dates, Guide & Walking Tours | ProWalk Tours";
const description = "Plan your Colmar Christmas market visit with my suggested walking route, photo spots, 2026 market dates, transport information, and day and evening videos.";
export const metadata: Metadata = {
  title, description, alternates: { canonical: url },
  openGraph: { title, description, url, images: [{ url: colmarGuide.hero.src, width: colmarGuide.hero.width, height: colmarGuide.hero.height, alt: colmarGuide.hero.alt }] },
};

export default function ColmarChristmasPage() {
  const christmasWalks = buildChristmasCatalog(discoveryVideos, worldTours);
  const orientationPlaces = buildAlsacePlaces(worldTours, christmasWalks, "Colmar");
  const ids = new Set([colmarGuide.featuredTourId, ...colmarGuide.moments.map(moment => moment.tourId), colmarGuide.fieldNote.tourId]);
  const walks = christmasWalks.filter(walk => ids.has(walk.id)).flatMap(walk => {
    const youtubeId = youtubeIdFromUrl(walk.youtubeUrl);
    return youtubeId ? [{ ...walk, youtubeId }] : [];
  });
  const structuredData = { "@context": "https://schema.org", "@graph": [
    { "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.prowalktours.com" },
      { "@type": "ListItem", position: 2, name: "Christmas Markets", item: "https://www.prowalktours.com/christmas-markets" },
      { "@type": "ListItem", position: 3, name: "Colmar", item: url },
    ] },
    { "@type": "WebPage", name: title, description, url, image: `https://www.prowalktours.com${colmarGuide.hero.src}`, about: { "@type": "Place", name: "Colmar, Alsace, France" }, dateModified: colmar2026.checkedOn },
  ] };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: stringifyJsonLd(structuredData) }} /><DestinationGuideClient guide={colmarGuide} season={colmar2026} walks={walks} visitorMapData={colmarVisitorMap} orientationPlaces={orientationPlaces} videoPreview={colmarPreview} /></>;
}
