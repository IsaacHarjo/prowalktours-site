import { existsSync } from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { discoveryVideos, worldTours } from "../../lib/tours/server";
import { buildChristmasCatalog } from "../../lib/christmas/catalog";
import { christmasMarketHref } from "../../lib/christmas/guide-links";
import { buildAlsacePlaces } from "../../lib/christmas/orientation";
import { stringifyJsonLd } from "../../lib/seo/jsonLd";
import ChristmasMarketPreviewClient from "./ChristmasMarketPreviewClient";

export type PreviewMarketCity = "Ribeauvillé" | "Kaysersberg" | "Riquewihr" | "Strasbourg" | "Basel";
const siteUrl = "https://www.prowalktours.com";

function marketContent(city: PreviewMarketCity) {
  const allWalks = buildChristmasCatalog(discoveryVideos, worldTours);
  const walks = allWalks.filter(walk => walk.city === city);
  const featured = walks.find(walk => walk.videoType === "day-walk") ?? walks[0];
  if (!featured) throw new Error(`Missing Christmas walks for ${city}`);
  const localHero = `/${featured.slug}/hero.jpg`;
  const hero = existsSync(path.join(process.cwd(), "public", localHero)) ? localHero : featured.thumbnail;
  return { walks, hero, country: featured.country, orientationPlaces: buildAlsacePlaces(worldTours, allWalks, city), url: `${siteUrl}${christmasMarketHref(city)}` };
}

export function marketPreviewMetadata(city: PreviewMarketCity): Metadata {
  const { hero, url } = marketContent(city);
  const title = `${city} Christmas Market & Walking Tours | ProWalk Tours`;
  const description = `Explore Christmas in ${city} through my walking tours and a map of nearby market towns. A guide to planning your visit is on the way.`;
  return {
    title, description, alternates: { canonical: url },
    openGraph: { title, description, url, images: [{ url: hero, alt: `Christmas in ${city}` }] },
  };
}

export default function ChristmasMarketPreview({ city }: { city: PreviewMarketCity }) {
  const { walks, hero, url, country, orientationPlaces } = marketContent(city);
  const structuredData = { "@context": "https://schema.org", "@graph": [
    { "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Christmas Markets", item: `${siteUrl}/christmas-markets` },
      { "@type": "ListItem", position: 3, name: city, item: url },
    ] },
    { "@type": "CollectionPage", name: `Christmas in ${city}`, url, about: { "@type": "Place", name: `${city}, ${country}` },
      mainEntity: { "@type": "ItemList", itemListElement: walks.map((walk, index) => ({ "@type": "ListItem", position: index + 1, name: walk.siteTitle, url: walk.watchHref.startsWith("/") ? `${siteUrl}${walk.watchHref}` : walk.watchHref })) } },
  ] };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: stringifyJsonLd(structuredData) }} /><ChristmasMarketPreviewClient city={city} country={country} hero={hero} walks={walks} orientationPlaces={orientationPlaces} /></>;
}
