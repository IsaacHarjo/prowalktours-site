import type { WorldTour } from "./types";

// When clusters dissolve at high zoom, coincident pins still need a full list.
export function toursAtSamePoint(tours: WorldTour[], selected: WorldTour): WorldTour[] {
  return tours.filter(tour => tour.mapGroup === selected.mapGroup
    && Math.abs(tour.latitude - selected.latitude) < 0.000001
    && Math.abs(tour.longitude - selected.longitude) < 0.000001);
}
