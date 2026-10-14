import type { Metadata } from "next";
import { discoveryVideos, worldTours } from "../../lib/tours/server";
import { buildChristmasCatalog, emptyChristmasFilters } from "../../lib/christmas/catalog";
import { colmarPhotos } from "../../lib/christmas/colmar-photos";
import { stringifyJsonLd } from "../../lib/seo/jsonLd";
import ChristmasMarketsClient from "./ChristmasMarketsClient";

const url = "https://www.prowalktours.com/christmas-markets";
const title = "European Christmas Markets 2026: Guides & Walking Tours | ProWalk Tours";
const description = "Plan your Christmas market trip with my Colmar guide, photos and walking tours from across Europe, plus ideas from my own trips.";
export const metadata: Metadata = {
  title, description, alternates: { canonical: url },
  openGraph: { title, description, url, images: [{ url: colmarPhotos.C157.src, alt: colmarPhotos.C157.alt }] },
};

export default async function ChristmasMarketsPage({ searchParams }: { searchParams: Promise<{ country?: string | string[]; city?: string | string[] }> }) {
  const walks = buildChristmasCatalog(discoveryVideos, worldTours);
  const params = await searchParams;
  const country = typeof params.country === "string" && walks.some(walk => walk.country === params.country) ? params.country : "";
  const city = typeof params.city === "string" && walks.some(walk => walk.city === params.city && (!country || walk.country === country)) ? params.city : "";
  const ids = new Set(walks.map((walk) => walk.id));
  const points = worldTours.filter((point) => ids.has(point.tourId));
  const structuredData = {
    "@context": "https://schema.org", "@graph": [
      { "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.prowalktours.com" },
        { "@type": "ListItem", position: 2, name: "Christmas Markets", item: url },
      ] },
      { "@type": "CollectionPage", name: title, description, url,
        mainEntity: { "@type": "ItemList", numberOfItems: walks.length,
          itemListElement: walks.map((walk, index) => ({ "@type": "ListItem", position: index + 1,
            name: walk.siteTitle, url: walk.watchHref.startsWith("/") ? `https://www.prowalktours.com${walk.watchHref}` : walk.watchHref })),
        },
      },
    ],
  };
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: stringifyJsonLd(structuredData) }} />
    <ChristmasMarketsClient key={`${country}/${city}`} walks={walks} points={points} initialFilters={{ ...emptyChristmasFilters, country, city }} />
  </>;
}
