#!/usr/bin/env node
/**
 * scripts/import-france-csv.js
 *
 * Single command to import france.csv and regenerate all derived data files.
 * Run this after every Google Sheet export of france.csv.
 *
 * What it does:
 *   1. Reads data/maps/france.csv
 *   2. Regenerates data/videos/france.ts  (video catalog for pages + search)
 *   3. Generates  data/maps/france.ts     (Mapbox map features for ExploreVideoMap)
 *
 * Preserves existing highlight arrays in data/videos/france.ts.
 *
 * Usage:
 *   node scripts/import-france-csv.js
 *   node scripts/import-france-csv.js --dry-run
 */
'use strict';

const fs   = require('fs');
const path = require('path');

const ROOT          = path.resolve(__dirname, '..');
const CSV_PATH      = path.join(ROOT, 'data', 'maps', 'france.csv');
const CATALOG_PATH  = path.join(ROOT, 'data', 'videos', 'france.ts');
const MAP_PATH      = path.join(ROOT, 'data', 'maps', 'france.ts');
const dryRun        = process.argv.includes('--dry-run');

// ─── CSV parser ──────────────────────────────────────────────────────────────

function parseCsv(content) {
  const rows = [];
  let currentRow = [];
  let currentValue = '';
  let inQuotes = false;

  for (let i = 0; i < content.length; i++) {
    const c = content[i];
    const next = content[i + 1];
    if (c === '"') {
      if (inQuotes && next === '"') { currentValue += '"'; i++; }
      else { inQuotes = !inQuotes; }
      continue;
    }
    if (c === ',' && !inQuotes) { currentRow.push(currentValue); currentValue = ''; continue; }
    if ((c === '\n' || c === '\r') && !inQuotes) {
      if (c === '\r' && next === '\n') i++;
      currentRow.push(currentValue);
      if (currentRow.some(v => v !== '')) rows.push(currentRow);
      currentRow = []; currentValue = '';
      continue;
    }
    currentValue += c;
  }
  currentRow.push(currentValue);
  if (currentRow.some(v => v !== '')) rows.push(currentRow);
  return rows;
}

// ─── Read CSV ────────────────────────────────────────────────────────────────

const csvContent = fs.readFileSync(CSV_PATH, 'utf8');
const [headerRow, ...dataRows] = parseCsv(csvContent);
const col = {};
headerRow.forEach((h, i) => { col[h] = i; });

function get(row, name) { return (row[col[name]] || '').trim(); }
function splitList(val) { return val ? val.split(',').map(s => s.trim()).filter(Boolean) : []; }

// Map free-form CSV theme strings to ExploreThemeTag values for Mapbox
// The catalog (data/videos/france.ts) keeps original theme strings;
// the map file (data/maps/france.ts) needs typed tags.
const THEME_TAG_MAP = {
  'coastal': 'coastal',
  'waterfront': 'waterfront',
  'island': 'island',
  'beach': 'beach',
  'ancient-site': 'ancient-site',
  'roman-ruins': 'roman-ruins',
  'archaeological-site': 'archaeological-site',
  'amphitheater': 'amphitheater',
  'historic-center': 'historic-center',
  'old-town': 'old-town',
  'world-heritage-site': 'world-heritage-site',
};

// Keywords in CSV theme strings that map to ExploreThemeTag
const THEME_KEYWORD_MAP = [
  { keywords: ['coastal', 'riviera', 'seafront'], tag: 'coastal' },
  { keywords: ['waterfront', 'harbor', 'marina'], tag: 'waterfront' },
  { keywords: ['beach'], tag: 'beach' },
  { keywords: ['historic center', 'historic centres'], tag: 'historic-center' },
  { keywords: ['old town', 'medieval', 'old towns'], tag: 'old-town' },
  { keywords: ['world heritage'], tag: 'world-heritage-site' },
  { keywords: ['island'], tag: 'island' },
  { keywords: ['ancient'], tag: 'ancient-site' },
  { keywords: ['roman ruin'], tag: 'roman-ruins' },
  { keywords: ['amphitheater', 'amphitheatre'], tag: 'amphitheater' },
  { keywords: ['archaeological'], tag: 'archaeological-site' },
];

function toMapThemeTags(csvThemes) {
  const tags = new Set();
  for (const theme of csvThemes) {
    const lower = theme.toLowerCase();
    // Direct match first
    if (THEME_TAG_MAP[lower]) { tags.add(THEME_TAG_MAP[lower]); continue; }
    // Keyword match
    for (const { keywords, tag } of THEME_KEYWORD_MAP) {
      if (keywords.some(kw => lower.includes(kw))) tags.add(tag);
    }
  }
  return [...tags];
}

// ─── Parse all rows ──────────────────────────────────────────────────────────

const allTours = [];

for (const row of dataRows) {
  const tourId = get(row, 'tour_id');
  const status = get(row, 'status');
  const slug = get(row, 'slug_override') || get(row, 'slug');
  if (!slug || !tourId) continue;

  const youtubeUrl = get(row, 'youtube_url');
  const idMatch = /(?:youtu\.be\/|[?&]v=|\/embed\/)([A-Za-z0-9_-]{11})/.exec(youtubeUrl);
  const videoId = idMatch ? idMatch[1] : '';

  const title = get(row, 'title');
  const country = get(row, 'country');
  const region = get(row, 'region');
  const city = get(row, 'city');
  const location = get(row, 'location');
  const filmedDateIso = get(row, 'filmed_date_iso');
  const filmedYear = get(row, 'filmed_year');
  const tempF = get(row, 'temp_f');
  const tempC = get(row, 'temp_c');
  const weather = tempF && tempC ? `${tempF} F / ${tempC} C` : '';
  const videoType = get(row, 'video_type') || 'day-walk';
  const themes = splitList(get(row, 'themes'));
  const durationLabel = get(row, 'duration_label');
  const durationSecondsRaw = get(row, 'duration_seconds').replace(/[",]/g, '');
  const durationSeconds = parseInt(durationSecondsRaw, 10) || 0;
  const descriptionShort = get(row, 'description_short');
  const descriptionLong = get(row, 'description_long') || descriptionShort;
  const landmarks = splitList(get(row, 'landmarks'));
  const keywords = splitList(get(row, 'keywords'));
  const lat = parseFloat(get(row, 'latitude')) || 0;
  const lng = parseFloat(get(row, 'longitude')) || 0;
  const mapUrl = get(row, 'map_url');
  const thumbnailPath = get(row, 'thumbnail_path');
  const thumbnailSrc = thumbnailPath || (videoId ? `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg` : '');

  let filmingMonthYear = '';
  if (filmedDateIso) {
    const d = new Date(`${filmedDateIso}T12:00:00`);
    filmingMonthYear = d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  }

  allTours.push({
    tourId, slug, title, country, region, city, location,
    youtubeUrl, videoId, videoType, themes, filmedDateIso,
    filmedYear: filmedYear ? parseInt(filmedYear, 10) : null,
    filmingMonthYear, tempF, tempC, weather,
    durationLabel, durationSeconds,
    descriptionShort, descriptionLong,
    landmarks, keywords, lat, lng, mapUrl,
    thumbnailPath, thumbnailSrc, status,
  });
}

const readyTours = allTours.filter(t => t.status === 'ready');

console.log(`\n${'═'.repeat(60)}`);
console.log(`  import-france-csv${dryRun ? '  [DRY RUN]' : ''}`);
console.log(`${'═'.repeat(60)}`);
console.log(`  CSV rows:     ${dataRows.length}`);
console.log(`  Total tours:  ${allTours.length}`);
console.log(`  Ready tours:  ${readyTours.length}`);
console.log();

// ═══════════════════════════════════════════════════════════════════════════════
// 1. Regenerate data/videos/france.ts
// ═══════════════════════════════════════════════════════════════════════════════

// Preserve existing highlights from current file
function getExistingHighlights() {
  if (!fs.existsSync(CATALOG_PATH)) return {};
  const text = fs.readFileSync(CATALOG_PATH, 'utf8');
  const map = {};
  const slugRe = /slug:\s*"([^"]+)"/g;
  let m;
  while ((m = slugRe.exec(text)) !== null) {
    const s = m[1];
    const hlIdx = text.indexOf('highlights:', m.index);
    if (hlIdx === -1 || hlIdx - m.index > 5000) continue;
    const arrStart = text.indexOf('[', hlIdx);
    if (arrStart === -1) continue;
    let depth = 0, arrEnd = arrStart;
    for (let i = arrStart; i < text.length; i++) {
      if (text[i] === '[') depth++;
      else if (text[i] === ']') { depth--; if (depth === 0) { arrEnd = i; break; } }
    }
    const hlBlock = text.slice(arrStart, arrEnd + 1).trim();
    if (hlBlock !== '[]') map[s] = hlBlock;
  }
  return map;
}

const existingHighlights = getExistingHighlights();

function jsonStr(val) {
  return JSON.stringify(val, null, 2).replace(/\n/g, '\n  ');
}

function toCatalogEntry(t) {
  const hl = existingHighlights[t.slug] || '[]';
  return `  {
    id: ${JSON.stringify(t.slug)},
    slug: ${JSON.stringify(t.slug)},
    siteTitle: ${JSON.stringify(t.title)},
    youtubeTitle: ${JSON.stringify(t.title)},
    youtubeUrl: ${JSON.stringify(t.youtubeUrl)},
    thumbnail: ${JSON.stringify(t.thumbnailSrc)},
    country: ${JSON.stringify(t.country)},
    region: ${JSON.stringify(t.region)},
    city: ${JSON.stringify(t.city)},
    filmingDates: ${JSON.stringify(t.filmedDateIso ? [t.filmedDateIso] : [])},
    filmingMonthYear: ${JSON.stringify(t.filmingMonthYear)},
    durationLabel: ${JSON.stringify(t.durationLabel)},
    durationSeconds: ${t.durationSeconds},
    weather: ${JSON.stringify(t.weather)},
    shortDescription:\n      ${JSON.stringify(t.descriptionLong)},
    keywords: ${jsonStr(t.keywords)},
    landmarks: ${jsonStr(t.landmarks)},
    themes: ${jsonStr(t.themes)},
    timeOfDay: ${JSON.stringify(t.videoType.includes('evening') ? 'evening' : 'daytime')},
    videoType: ${JSON.stringify(t.videoType.replace(/-/g, ' '))},
    visibility: "public",
    highlights: ${hl},
  }`;
}

const catalogOutput = `import type { VideoCatalogRecord } from "../video-types";

// Auto-generated from data/maps/france.csv by scripts/import-france-csv.js
// Only tours with status "ready" are included.
// Last refreshed: ${new Date().toISOString().slice(0, 10)}
export const franceVideos: VideoCatalogRecord[] = [
${readyTours.map(toCatalogEntry).join(',\n')}
];
`;

const catalogHlCount = readyTours.filter(t => (existingHighlights[t.slug] || '[]') !== '[]').length;
console.log(`  [1/2] data/videos/france.ts`);
console.log(`        ${readyTours.length} ready tours, ${catalogHlCount} with highlights`);

// ═══════════════════════════════════════════════════════════════════════════════
// 2. Generate data/maps/france.ts (Mapbox features)
// ═══════════════════════════════════════════════════════════════════════════════

// Include all tours with valid lat/lng (not just ready — drafts can appear on map)
const mapTours = allTours.filter(t => t.lat !== 0 && t.lng !== 0);

function toMapFeature(t) {
  const videoId = t.videoId;
  const thumbSrc = t.thumbnailSrc;

  // Build href: if a page directory exists, link internally; otherwise link to YouTube
  const pageDir = path.join(ROOT, 'app', 'videos', t.slug);
  const href = fs.existsSync(pageDir) ? `/videos/${t.slug}` : t.youtubeUrl;

  return {
    tourId: t.tourId,
    country: t.country,
    region: t.region,
    city: t.city,
    location: t.location,
    title: t.title,
    slug: t.slug,
    videoType: t.videoType,
    themes: toMapThemeTags(t.themes),
    filmedDateIso: t.filmedDateIso || null,
    filmedYear: t.filmedYear,
    youtubeUrl: t.youtubeUrl,
    mapUrl: t.mapUrl || null,
    latitude: t.lat,
    longitude: t.lng,
    durationLabel: t.durationLabel,
    durationSeconds: t.durationSeconds,
    descriptionShort: t.descriptionShort,
    descriptionLong: t.descriptionLong,
    landmarks: t.landmarks,
    keywords: t.keywords,
    status: t.status,
    thumbnailPath: t.thumbnailPath || null,
    href,
    thumbnailSrc: thumbSrc,
  };
}

const mapFeatures = mapTours.map(toMapFeature);
const mapOutput = `import type { ExploreMapFeature } from './types';

// Auto-generated from data/maps/france.csv by scripts/import-france-csv.js
// Last refreshed: ${new Date().toISOString().slice(0, 10)}
export const franceMapFeatures: ExploreMapFeature[] = ${JSON.stringify(mapFeatures, null, 2)};
`;

console.log(`  [2/2] data/maps/france.ts`);
console.log(`        ${mapFeatures.length} tours with coordinates (for Mapbox)`);

// ═══════════════════════════════════════════════════════════════════════════════
// Write files
// ═══════════════════════════════════════════════════════════════════════════════

if (dryRun) {
  console.log(`\n${'─'.repeat(60)}`);
  console.log('  Dry run — no files written.');
  console.log(`  Would write:`);
  console.log(`    data/videos/france.ts  (${catalogOutput.length} bytes)`);
  console.log(`    data/maps/france.ts    (${mapOutput.length} bytes)`);
  console.log(`${'─'.repeat(60)}\n`);
  process.exit(0);
}

fs.writeFileSync(CATALOG_PATH, catalogOutput, 'utf8');
fs.writeFileSync(MAP_PATH, mapOutput, 'utf8');

console.log(`\n  ✓ data/videos/france.ts  written (${catalogOutput.length} bytes)`);
console.log(`  ✓ data/maps/france.ts    written (${mapOutput.length} bytes)`);
console.log(`${'═'.repeat(60)}\n`);
