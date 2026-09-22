import type { Metadata } from "next";
import { discoveryVideos, worldTours } from "../../lib/tours/server";
import { buildChristmasCatalog, christmasHero } from "../../lib/christmas/catalog";
import { stringifyJsonLd } from "../../lib/seo/jsonLd";
import ChristmasMarketsClient from "./ChristmasMarketsClient";

const url = "https://www.prowalktours.com/christmas-markets";
const title = "European Christmas Markets: Walks & Journey Inspiration | ProWalk Tours";
const description = "Explore European Christmas markets through Isaac's walking tours. Browse by country and city, discover walks on the map, and explore the journeys behind the films.";
export const metadata: Metadata = {
  title, description, alternates: { canonical: url },
  openGraph: { title, description, url, images: [{ url: christmasHero.src, alt: christmasHero.alt }] },
};

export default function ChristmasMarketsPage() {
  const walks = buildChristmasCatalog(discoveryVideos, worldTours);
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
    <ChristmasMarketsClient walks={walks} points={points} />
  </>;
}
