import type { OrientationPlace } from "../guides/types";
import type { WorldTour } from "../tours/types";
import type { ChristmasWalk } from "./catalog";
import { christmasMarketHref } from "./guide-links";

// Data for the "Where it fits in your trip" map on German Christmas market
// guides: every German Christmas market I have filmed, from the public tour
// data, in three views (Germany, nearby markets, the town itself).

type Bounds = [[number, number], [number, number]];
export type CountryOrientationStage = { label: string; title: string; text: string; bounds: Bounds; cities: string[] };
export type CountryOrientation = { country: string; focusCity: string; places: OrientationPlace[]; stages: CountryOrientationStage[] };

const germanyBounds: Bounds = [[5.6, 47.2], [15.3, 55.1]];
const nearbyKm = 250;

function distanceKm(a: OrientationPlace, b: OrientationPlace) {
  const radians = Math.PI / 180;
  const arc = Math.sin((b.latitude - a.latitude) * radians / 2) ** 2
    + Math.cos(a.latitude * radians) * Math.cos(b.latitude * radians) * Math.sin((b.longitude - a.longitude) * radians / 2) ** 2;
  return 6371 * 2 * Math.asin(Math.sqrt(arc));
}

function boundsAround(places: OrientationPlace[]): Bounds {
  const longitudes = places.map(place => place.longitude), latitudes = places.map(place => place.latitude);
  const pad = 0.35;
  return [[Math.min(...longitudes) - pad, Math.min(...latitudes) - pad], [Math.max(...longitudes) + pad, Math.max(...latitudes) + pad]];
}

const list = (items: string[]) => items.length <= 1 ? items.join("") : `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;

export function buildGermanyOrientation(points: WorldTour[], walks: ChristmasWalk[], focusCity: string): CountryOrientation {
  const cities = [...new Set(walks.filter(walk => walk.country === "Germany").map(walk => walk.city))].sort((a, b) => a.localeCompare(b));
  const places: OrientationPlace[] = cities.flatMap(city => {
    const point = points.find(item => item.city === city && item.country === "Germany");
    if (!point) return [];
    const guide = christmasMarketHref(city);
    return [{
      city, country: "Germany", longitude: point.longitude, latitude: point.latitude,
      href: city === focusCity ? "#explore" : guide ?? `/christmas-markets?city=${encodeURIComponent(city)}#browse-walks`,
      marketGuide: !!guide,
    }];
  });
  const focus = places.find(place => place.city === focusCity);
  if (!focus) throw new Error(`No public Christmas walk location for ${focusCity}`);
  const nearby = places.filter(place => place !== focus && distanceKm(focus, place) <= nearbyKm)
    .sort((a, b) => distanceKm(focus, a) - distanceKm(focus, b));
  const nearbyText = nearby.length
    ? `Other Christmas markets I’ve filmed within about ${nearbyKm} km of ${focusCity}, as the crow flies: ${list(nearby.map(place => `${place.city} (${Math.round(distanceKm(focus, place) / 5) * 5} km)`))}.`
    : `None of the other German Christmas markets I’ve filmed is within about ${nearbyKm} km of ${focusCity}.`;
  return {
    country: "Germany", focusCity, places,
    stages: [
      { label: "Germany", title: "The German Christmas markets I’ve filmed", text: `${focusCity} is highlighted. Select another town to read its guide or watch my walks there.`, bounds: germanyBounds, cities: places.map(place => place.city) },
      { label: "Nearby", title: `Christmas markets near ${focusCity}`, text: nearbyText, bounds: boundsAround([focus, ...nearby]), cities: [focusCity, ...nearby.map(place => place.city)] },
      { label: focusCity, title: `${focusCity} up close`, text: `The old town of ${focusCity}, where the walks on this page take place.`, bounds: [[focus.longitude - 0.12, focus.latitude - 0.07], [focus.longitude + 0.12, focus.latitude + 0.07]], cities: [focusCity] },
    ],
  };
}
