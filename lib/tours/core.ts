import type { VideoCatalogRecord } from "../../data/video-types";
import type { TourRecord } from "./types";

export type SourceRow = Record<string, string>;

/** Quoted CSV including embedded newlines, escaped quotes and UTF-8 BOM. */
export function parseTourCsv(content: string, source: string): SourceRow[] {
  const rows: string[][] = [];
  let row: string[] = [], value = "", quoted = false;
  const input = content.replace(/^\uFEFF/, "");
  for (let i = 0; i < input.length; i++) {
    const c = input[i];
    if (c === '"') {
      if (quoted && input[i + 1] === '"') { value += '"'; i++; }
      else quoted = !quoted;
    } else if (c === "," && !quoted) { row.push(value); value = ""; }
    else if ((c === "\n" || c === "\r") && !quoted) {
      if (c === "\r" && input[i + 1] === "\n") i++;
      row.push(value);
      if (row.some((v) => v.trim())) rows.push(row);
      row = []; value = "";
    } else value += c;
  }
  if (quoted) throw new Error(`${source}: unclosed CSV quote`);
  row.push(value);
  if (row.some((v) => v.trim())) rows.push(row);
  const [headers, ...data] = rows;
  if (!headers) throw new Error(`${source}: empty CSV`);
  const names = headers.map((h) => h.trim());
  if (new Set(names).size !== names.length) throw new Error(`${source}: duplicate columns`);
  for (const required of ["tour_id", "slug", "country", "title", "youtube_url", "status", "latitude", "longitude"]) {
    if (!names.includes(required)) throw new Error(`${source}: missing ${required}`);
  }
  return data.map((values, index) => {
    if (values.length !== names.length) throw new Error(`${source}:${index + 2}: incorrect column count`);
    return Object.fromEntries(names.map((name, i) => [name, values[i].trim()]));
  });
}

export function youtubeIdFromUrl(value: string): string | null {
  if (!value) return null;
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" && url.protocol !== "http:") return null;
    const host = url.hostname.toLowerCase().replace(/^www\./, "");
    const id = host === "youtu.be" ? url.pathname.slice(1)
      : ["youtube.com", "m.youtube.com", "youtube-nocookie.com"].includes(host)
        ? url.pathname === "/watch" ? url.searchParams.get("v")
          : /^\/(embed|shorts|live)\//.test(url.pathname) ? url.pathname.split("/")[2] : null
        : null;
    return id && /^[\w-]{11}$/.test(id) ? id : null;
  } catch { return null; }
}

const categoryAliases: Record<string, string[]> = {
  "christmas-markets": ["christmas-market"],
  "historic-centers-old-towns": ["historic-center", "old-town"],
  "french-riviera-coastal-towns": ["coastal"],
  "waterfronts-seawalls": ["waterfront"],
  "beaches": ["beach"],
  "beaches-parks": ["beach", "park"],
  "parks-nature": ["park", "nature"],
  "evening-night-walks": ["evening-walk", "night-walk"],
  "bike-tours": ["bike-tour"],
  "city-walks": ["city-walk"],
  "historic-districts": ["historic-center"],
  "markets-food-halls": ["market", "food-hall"],
};
export function normalizeCategories(values: string[]): string[] {
  return [...new Set(values.flatMap((value) => {
    const key = value.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase()
      .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    return key ? categoryAliases[key] ?? [key] : [];
  }))];
}
export const splitList = (value: string) => value.split(",").map((v) => v.trim()).filter(Boolean);

function numberField(row: SourceRow, field: string, source: string): number | null {
  if (!row[field]) return null;
  const value = Number(row[field].replace(/,/g, ""));
  if (!Number.isFinite(value)) throw new Error(`${source} ${row.tour_id}: invalid ${field}`);
  return value;
}

// These exceptions are documented in AGENTS.md. No availability is inferred
// from a folder name, weather, or the existence of an internal video page.
const membersOnlyIds = new Set(["de-0009", "de-0018"]);

export function buildTours(
  sources: { source: string; rows: SourceRow[] }[],
  editorialVideos: VideoCatalogRecord[],
  pageSlugs: Set<string>,
): TourRecord[] {
  const ids = new Set<string>(), slugs = new Set<string>(), youtubeIds = new Set<string>();
  const editorialBySlug = new Map(editorialVideos.map((video) => [video.slug, video]));
  const editorialByYoutubeId = new Map(editorialVideos.map((video) => [youtubeIdFromUrl(video.youtubeUrl), video]));
  const result: TourRecord[] = [];
  for (const { source, rows } of sources) for (const row of rows) {
    const id = row.tour_id;
    const sourceSlug = row.slug_override || row.slug;
    const existingVideo = editorialByYoutubeId.get(youtubeIdFromUrl(row.youtube_url));
    // A fresh Sheet export must never silently rename an already-built page.
    const slug = existingVideo && pageSlugs.has(existingVideo.slug) ? existingVideo.slug : sourceSlug;
    if (!id || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) throw new Error(`${source} ${id}: invalid ID or slug`);
    if (ids.has(id) || slugs.has(slug)) throw new Error(`${source} ${id}: duplicate ID or slug`);
    ids.add(id); slugs.add(slug);
    if (!row.title || !row.country) throw new Error(`${source} ${id}: missing title or country`);
    if (!["draft", "ready", "published"].includes(row.status)) throw new Error(`${source} ${id}: unknown status ${row.status}`);
    const sourceStatus = row.status as TourRecord["sourceStatus"];
    const youtubeId = youtubeIdFromUrl(row.youtube_url);
    if (row.youtube_url && !youtubeId) throw new Error(`${source} ${id}: invalid YouTube URL`);
    if (sourceStatus !== "draft" && !youtubeId) throw new Error(`${source} ${id}: ready/published tour needs a YouTube URL`);
    if (youtubeId && youtubeIds.has(youtubeId)) throw new Error(`${source} ${id}: duplicate YouTube ID`);
    if (youtubeId) youtubeIds.add(youtubeId);
    const latitude = numberField(row, "latitude", source), longitude = numberField(row, "longitude", source);
    if ((latitude === null) !== (longitude === null) || (latitude !== null && Math.abs(latitude) > 90) || (longitude !== null && Math.abs(longitude) > 180)) {
      throw new Error(`${source} ${id}: invalid coordinate pair`);
    }
    const filmedDate = row.filmed_date_iso;
    if (filmedDate && (!/^\d{4}-\d{2}-\d{2}$/.test(filmedDate) || !Number.isFinite(Date.parse(filmedDate)) || new Date(filmedDate).toISOString().slice(0, 10) !== filmedDate)) {
      throw new Error(`${source} ${id}: invalid filming date`);
    }
    const durationSeconds = numberField(row, "duration_seconds", source) ?? 0;
    const distanceMiles = numberField(row, "distance_miles", source), distanceKm = numberField(row, "distance_km", source);
    if (durationSeconds < 0 || (distanceMiles !== null && distanceMiles < 0) || (distanceKm !== null && distanceKm < 0)) throw new Error(`${source} ${id}: negative duration/distance`);
    const explicitAvailability = row.youtube_availability;
    if (explicitAvailability && !["unknown", "unpublished", "public", "members-only", "unavailable"].includes(explicitAvailability)) throw new Error(`${source} ${id}: unknown YouTube availability`);
    const productionStage = row.production_stage || "unknown";
    if (!["unknown", "filmed", "editing", "ready-to-upload"].includes(productionStage)) throw new Error(`${source} ${id}: unknown production stage`);
    const youtubeAvailability: TourRecord["youtubeAvailability"] = explicitAvailability
      ? explicitAvailability as TourRecord["youtubeAvailability"]
      : membersOnlyIds.has(id) ? "members-only"
      : sourceStatus !== "draft" && youtubeId ? "public" : "unknown";
    const editorial = editorialBySlug.get(slug);
    const watchDestinationType = pageSlugs.has(slug) ? "internal-page" : "youtube";
    const youtubeUrl = youtubeId ? `https://www.youtube.com/watch?v=${youtubeId}` : "";
    result.push({
      id, tourId: id, slug, sourceFile: source, sourceStatus,
      productionStage: productionStage as TourRecord["productionStage"], youtubeAvailability,
      availabilityEvidence: explicitAvailability ? "explicit" : membersOnlyIds.has(id) ? "project-notes" : youtubeAvailability === "public" ? "legacy-ready" : "unknown",
      websiteStatus: pageSlugs.has(slug) && sourceStatus !== "draft" ? "published" : "draft",
      youtubeId, youtubeUrl, watchDestinationType,
      watchHref: watchDestinationType === "internal-page" ? `/videos/${slug}` : youtubeUrl,
      latitude, longitude, filmedYear: numberField(row, "filmed_year", source),
      location: row.location, distanceMiles, distanceKm, mapUrl: row.map_url,
      siteTitle: editorial?.siteTitle || row.title,
      youtubeTitle: editorial?.youtubeTitle || row.title,
      thumbnail: row.thumbnail_path || editorial?.thumbnail || (youtubeId ? `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg` : ""),
      country: row.country, region: row.region, city: row.city,
      filmingDates: editorial?.filmingDates.length ? editorial.filmingDates : filmedDate ? [filmedDate] : [],
      filmingMonthYear: filmedDate ? new Date(`${filmedDate}T12:00:00Z`).toLocaleDateString("en-US", { month: "long", year: "numeric", timeZone: "UTC" }) : "",
      durationLabel: row.duration_label, durationSeconds,
      weather: editorial?.weather || row.weather_summary,
      shortDescription: editorial?.shortDescription || row.description_short || row.description_long,
      keywords: [...new Set([...splitList(row.keywords), ...splitList(row.themes), ...(editorial?.keywords ?? []),
        ...(normalizeCategories(splitList(row.themes)).includes("christmas-market") ? ["Christmas Markets"] : [])])],
      landmarks: [...new Set([...splitList(row.landmarks), ...(editorial?.landmarks ?? [])])],
      themes: normalizeCategories([...splitList(row.themes), ...(editorial?.themes ?? [])]),
      timeOfDay: editorial?.timeOfDay || "", videoType: row.video_type,
      visibility: youtubeAvailability, highlights: [],
    });
  }
  return result;
}

export function isPublicTour(tour: TourRecord): boolean {
  return tour.sourceStatus !== "draft" && tour.youtubeAvailability === "public" && Boolean(tour.youtubeId);
}
