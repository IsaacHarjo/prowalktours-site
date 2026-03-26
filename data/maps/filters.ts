import type { ExploreMapFeature, ExploreMapFilterOption } from "./types";

function titleCase(value: string) {
  return value.replace(/\b\w/g, (char) => char.toUpperCase());
}

export function formatVideoTypeLabel(videoType: string) {
  const normalized = videoType.trim().toLowerCase();

  switch (normalized) {
    case "day-walk":
      return "Day Walk";
    case "evening-walk":
      return "Evening Walk";
    case "night-walk":
      return "Night Walk";
    case "bike-tour":
      return "Bike Tour";
    case "drive-tour":
      return "Drive Tour";
    case "drone-tour":
      return "Drone Tour";
    case "boat-tour":
      return "Boat Tour";
    case "scooter-tour":
      return "Scooter Tour";
    case "360-tour":
      return "360 Tour";
    default:
      return titleCase(normalized.replace(/-/g, " "));
  }
}

export function getVideoTypeFilterOptions(
  features: ExploreMapFeature[]
): ExploreMapFilterOption[] {
  return Array.from(new Set(features.map((feature) => feature.videoType)))
    .filter(Boolean)
    .sort((a, b) => formatVideoTypeLabel(a).localeCompare(formatVideoTypeLabel(b)))
    .map((value) => ({
      value,
      label: formatVideoTypeLabel(value),
    }));
}

export function filterExploreMapFeatures(
  features: ExploreMapFeature[],
  selectedVideoTypes: string[]
) {
  if (selectedVideoTypes.length === 0) {
    return features;
  }

  const selected = new Set(selectedVideoTypes);
  return features.filter((feature) => selected.has(feature.videoType));
}
