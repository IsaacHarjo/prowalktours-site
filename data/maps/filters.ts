import type {
  ExploreMapFeature,
  ExploreMapFilterOption,
  ExploreThemeTag,
  ExploreMapVideoType,
  ExploreMapWatchDestinationType,
} from "./types";

const VIDEO_TYPE_ORDER: readonly ExploreMapVideoType[] = [
  "day-walk",
  "evening-walk",
  "bike-tour",
  "boat-tour",
  "hike",
  "360-tour",
  "drone-tour",
  "drive-tour",
  "scooter-tour",
] as const;

const ORDERED_VIDEO_TYPE_SET: ReadonlySet<string> = new Set(VIDEO_TYPE_ORDER);

const FILMED_YEAR_RANGE = [
  "2017",
  "2018",
  "2019",
  "2020",
  "2021",
  "2022",
  "2023",
  "2024",
  "2025",
] as const;

const INTERNAL_WALK_PAGE_BY_TOUR_ID: Record<string, string> = {
  "it-0091": "/videos/naples-night-walk-2025",
  "it-0092": "/videos/naples-daytime-walk-2023",
};

const CURATED_THEME_FILTERS = [
  {
    value: "coastal-towns",
    label: "Coastal Towns",
    tags: ["coastal", "waterfront", "island", "beach"],
  },
  {
    value: "ancient-sites-roman-ruins",
    label: "Ancient Sites & Roman Ruins",
    tags: ["ancient-site", "roman-ruins", "archaeological-site", "amphitheater"],
  },
  {
    value: "historic-centers",
    label: "Historic Centers",
    tags: ["historic-center", "old-town"],
  },
  {
    value: "world-heritage-sites",
    label: "World Heritage Sites",
    tags: ["world-heritage-site"],
  },
] as const;

const APPROVED_THEME_TAGS: readonly ExploreThemeTag[] = [
  "coastal",
  "waterfront",
  "island",
  "beach",
  "ancient-site",
  "roman-ruins",
  "archaeological-site",
  "amphitheater",
  "historic-center",
  "old-town",
  "world-heritage-site",
] as const;

const APPROVED_THEME_TAG_SET: ReadonlySet<string> = new Set(APPROVED_THEME_TAGS);

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
  const orderLookup = new Map(
    VIDEO_TYPE_ORDER.map((value, index) => [value, index])
  );

  const uniqueVideoTypes = Array.from(
    new Set(features.map((feature) => feature.videoType))
  ).filter(Boolean);

  const orderedVideoTypes = uniqueVideoTypes
    .filter((value): value is ExploreMapVideoType =>
      ORDERED_VIDEO_TYPE_SET.has(value)
    )
    .sort((a, b) => {
      const aIndex = orderLookup.get(a) ?? Number.MAX_SAFE_INTEGER;
      const bIndex = orderLookup.get(b) ?? Number.MAX_SAFE_INTEGER;

      if (aIndex !== bIndex) {
        return aIndex - bIndex;
      }

      return formatVideoTypeLabel(a).localeCompare(formatVideoTypeLabel(b));
    });

  const extraVideoTypes = uniqueVideoTypes
    .filter((value) => !ORDERED_VIDEO_TYPE_SET.has(value))
    .sort((a, b) => formatVideoTypeLabel(a).localeCompare(formatVideoTypeLabel(b)));

  return [...orderedVideoTypes, ...extraVideoTypes]
    .map((value) => ({
      value,
      label: formatVideoTypeLabel(value),
    }));
}

export function getFilmedYearFilterOptions(): ExploreMapFilterOption[] {
  return FILMED_YEAR_RANGE.map((value) => ({
    value,
    label: value,
  }));
}

export function getThemeFilterOptions(
  features: ExploreMapFeature[]
): ExploreMapFilterOption[] {
  const availableThemes = new Set<ExploreThemeTag>(
    features.flatMap((feature) => feature.themes ?? [])
  );

  return CURATED_THEME_FILTERS.filter((theme) =>
    theme.tags.some((tag) => availableThemes.has(tag))
  ).map((theme) => ({
    value: theme.value,
    label: theme.label,
  }));
}

export function getMapDisplayTitle(title: string) {
  return title
    .replace(/\b4K\b/gi, "")
    .replace(/\s+\(\d{4}\)\s*$/u, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}

export function hasInternalMapWatchPage(feature: ExploreMapFeature) {
  return (
    Boolean(INTERNAL_WALK_PAGE_BY_TOUR_ID[feature.tourId]) ||
    feature.href.startsWith("/videos/")
  );
}

export function getMapWatchDestinationType(
  feature: ExploreMapFeature
): ExploreMapWatchDestinationType {
  return hasInternalMapWatchPage(feature) ? "internal-page" : "youtube";
}

export function getMapWatchHref(feature: ExploreMapFeature) {
  if (INTERNAL_WALK_PAGE_BY_TOUR_ID[feature.tourId]) {
    return INTERNAL_WALK_PAGE_BY_TOUR_ID[feature.tourId];
  }
  if (feature.href.startsWith("/videos/")) {
    return feature.href;
  }
  return feature.youtubeUrl;
}

export function filterExploreMapFeatures(
  features: ExploreMapFeature[],
  selectedVideoTypes: string[],
  selectedFilmedYears: string[],
  selectedThemes: string[]
) {
  if (
    selectedVideoTypes.length === 0 &&
    selectedFilmedYears.length === 0 &&
    selectedThemes.length === 0
  ) {
    return features;
  }

  const selectedTypes = new Set(selectedVideoTypes);
  const selectedYears = new Set(selectedFilmedYears);
  const selectedThemeSet = new Set(selectedThemes);
  const selectedThemeTags = new Set<ExploreThemeTag>(
    CURATED_THEME_FILTERS.filter((theme) => selectedThemeSet.has(theme.value))
      .flatMap((theme) => theme.tags)
  );

  return features.filter((feature) => {
    const matchesType =
      selectedTypes.size === 0 || selectedTypes.has(feature.videoType);
    const matchesYear =
      selectedYears.size === 0 ||
      (feature.filmedYear !== null &&
        selectedYears.has(String(feature.filmedYear)));
    const matchesTheme =
      selectedThemeSet.size === 0 ||
      feature.themes.some((theme) => selectedThemeTags.has(theme));

    return matchesType && matchesYear && matchesTheme;
  });
}

export function isExploreThemeTag(value: string): value is ExploreThemeTag {
  return APPROVED_THEME_TAG_SET.has(value);
}
