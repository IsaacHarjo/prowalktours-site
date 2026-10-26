import type { OrientationPlace } from "../guides/types";
import type { WorldTour } from "../tours/types";
import type { ChristmasWalk } from "./catalog";
import { christmasMarketHref } from "./guide-links";
import regionTowns from "./colmar-region-towns.json";

type Bounds = [[number, number], [number, number]];
export type OrientationStage = { label: string; title: string; text: string; bounds: Bounds; cities: string[]; outline?: "alsace" | "colmar" };
const colmarBounds: Bounds = [[6.9796, 47.8245], [7.622, 48.2649]];
const mercatorY = (latitude: number) => Math.log(Math.tan(Math.PI / 4 + latitude * Math.PI / 360));
const latitudeFromY = (y: number) => (2 * Math.atan(Math.exp(y)) - Math.PI / 2) * 180 / Math.PI;

export function buildAlsacePlaces(points: WorldTour[], walks: ChristmasWalk[], focusCity: string): OrientationPlace[] {
  const destinationHref = (city: string) => city === focusCity ? city === "Colmar" ? "#market-squares" : city === "Kaysersberg" ? "#explore" : "#market-films" : christmasMarketHref(city);
  const places: OrientationPlace[] = ["Paris", "Strasbourg", "Basel"].flatMap(city => {
    const tour = points.find(point => point.city === city);
    if (!tour) return [];
    return [{ city, country: tour.country, longitude: tour.longitude, latitude: tour.latitude,
      href: city === "Paris" ? "/search?q=Paris" : destinationHref(city)!,
      marketGuide: !!christmasMarketHref(city), labelSide: city === "Paris" ? undefined : "right" }];
  });
  return [...places, ...regionTowns.map(town => {
    const guideHref = christmasMarketHref(town.city);
    const hasWalk = walks.some(walk => walk.city === town.city);
    return { city: town.city, country: "France", longitude: town.longitude, latitude: town.latitude,
      labelSide: town.labelSide as "left" | "right", marketGuide: !!guideHref,
      href: destinationHref(town.city) ?? (hasWalk ? `/christmas-markets?city=${encodeURIComponent(town.city)}#browse-walks` : town.officialHref),
      external: !guideHref && !hasWalk && town.city !== focusCity };
  })];
}

export function buildOrientationStages(places: OrientationPlace[], focusCity: string): OrientationStage[] {
  const focus = places.find(place => place.city === focusCity);
  if (!focus) throw new Error(`Missing regional map location for ${focusCity}`);
  const inColmarRegion = regionTowns.some(town => town.city === focusCity);
  const focusY = mercatorY(focus.latitude);
  // Symmetric Mercator bounds put the town at the exact visual center. For the
  // Pays de Colmar towns, retain the complete boundary and all ten town pins.
  const halfWidth = inColmarRegion ? Math.max(focus.longitude - colmarBounds[0][0], colmarBounds[1][0] - focus.longitude) : 0.35;
  const halfHeight = inColmarRegion ? Math.max(focusY - mercatorY(colmarBounds[0][1]), mercatorY(colmarBounds[1][1]) - focusY) : (mercatorY(colmarBounds[1][1]) - mercatorY(colmarBounds[0][1])) / 2;
  const finalBounds: Bounds = [[focus.longitude - halfWidth, latitudeFromY(focusY - halfHeight)], [focus.longitude + halfWidth, latitudeFromY(focusY + halfHeight)]];
  return [
    { label: "France", title: "Start with the bigger picture", text: `Find ${focusCity} in ${focus.country ?? "France"}, then zoom into the region and its Christmas market towns.`, bounds: [[-5.2, 41.3], [9, 51.2]], cities: ["Paris", focusCity] },
    { label: "Alsace", title: "Between the Vosges and the Rhine", text: inColmarRegion ? `The green outline shows Alsace in eastern France. Find ${focusCity} between Strasbourg to the north and Basel to the south, across the Swiss border.` : "The green outline shows Alsace in eastern France, with Strasbourg in the north and Basel just across the Swiss border to the south.", bounds: [[6.841, 47.4203], [8.2325, 49.0778]], cities: [...new Set(["Strasbourg", focusCity, "Basel"])], outline: "alsace" },
    { label: `Around ${focusCity}`, title: `${focusCity} and the surrounding area`, text: inColmarRegion ? `Explore the Pays de Colmar with ${focusCity} at the center. The outline connects the vineyard villages, the Munster valley and the Rhine.` : `Take a closer look around ${focusCity}${focus.country === "Switzerland" ? ", Switzerland" : ""}. Use the Alsace view to explore the other market towns.`, bounds: finalBounds, cities: places.filter(place => place.city !== "Paris").map(place => place.city), outline: inColmarRegion ? "colmar" : "alsace" },
  ];
}
