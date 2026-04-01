#!/usr/bin/env node
/**
 * scripts/refresh-france-catalog.js
 *
 * Reads data/maps/france.csv and regenerates data/videos/france.ts
 * with all tours that have status "ready".
 *
 * Preserves existing highlight arrays from the current france.ts
 * for tours that already have them.
 *
 * Usage:
 *   node scripts/refresh-france-catalog.js
 *   node scripts/refresh-france-catalog.js --dry-run
 */
'use strict';

const fs   = require('fs');
const path = require('path');

const ROOT     = path.resolve(__dirname, '..');
const CSV_PATH = path.join(ROOT, 'data', 'maps', 'france.csv');
const TS_PATH  = path.join(ROOT, 'data', 'videos', 'france.ts');
const dryRun   = process.argv.includes('--dry-run');

// ─── CSV parser (handles quoted fields) ──────────────────────────────────────

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
    if (c === ',' && !inQuotes) {
      currentRow.push(currentValue);
      currentValue = '';
      continue;
    }
    if ((c === '\n' || c === '\r') && !inQuotes) {
      if (c === '\r' && next === '\n') i++;
      currentRow.push(currentValue);
      if (currentRow.some(v => v !== '')) rows.push(currentRow);
      currentRow = [];
      currentValue = '';
      continue;
    }
    currentValue += c;
  }
  currentRow.push(currentValue);
  if (currentRow.some(v => v !== '')) rows.push(currentRow);
  return rows;
}

// ─── Read existing highlights from current france.ts ─────────────────────────

function getExistingHighlights() {
  if (!fs.existsSync(TS_PATH)) return {};

  const text = fs.readFileSync(TS_PATH, 'utf8');
  const map = {};

  // Find each entry's slug and highlights array
  const slugRe = /slug:\s*"([^"]+)"/g;
  let m;
  while ((m = slugRe.exec(text)) !== null) {
    const slug = m[1];
    // Find the highlights array for this entry
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
    if (hlBlock !== '[]') {
      map[slug] = hlBlock;
    }
  }
  return map;
}

// ─── Parse CSV ───────────────────────────────────────────────────────────────

const csvContent = fs.readFileSync(CSV_PATH, 'utf8');
const [headerRow, ...dataRows] = parseCsv(csvContent);
const col = {};
headerRow.forEach((h, i) => { col[h] = i; });

function get(row, name) {
  return (row[col[name]] || '').trim();
}

// ─── Build records ───────────────────────────────────────────────────────────

const existingHighlights = getExistingHighlights();
const records = [];

for (const row of dataRows) {
  if (get(row, 'status') !== 'ready') continue;

  const slug = get(row, 'slug_override') || get(row, 'slug');
  if (!slug) continue;

  const youtubeUrl = get(row, 'youtube_url');
  const videoIdMatch = /(?:youtu\.be\/|[?&]v=|\/embed\/)([A-Za-z0-9_-]{11})/.exec(youtubeUrl);
  const videoId = videoIdMatch ? videoIdMatch[1] : '';

  const title = get(row, 'title');
  const country = get(row, 'country');
  const region = get(row, 'region');
  const city = get(row, 'city');
  const filmedDateIso = get(row, 'filmed_date_iso');
  const filmedYear = get(row, 'filmed_year');
  const tempF = get(row, 'temp_f');
  const tempC = get(row, 'temp_c');
  const weather = tempF && tempC ? `${tempF} F / ${tempC} C` : '';
  const durationLabel = get(row, 'duration_label');
  const durationSecondsRaw = get(row, 'duration_seconds').replace(/[",]/g, '');
  const durationSeconds = parseInt(durationSecondsRaw, 10) || 0;
  const shortDesc = get(row, 'description_long') || get(row, 'description_short');
  const thumbnailPath = get(row, 'thumbnail_path') || (videoId ? `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg` : '');

  const splitList = (val) => val ? val.split(',').map(s => s.trim()).filter(Boolean) : [];

  const landmarks = splitList(get(row, 'landmarks'));
  const keywords = splitList(get(row, 'keywords'));
  const themes = splitList(get(row, 'themes'));

  const videoType = get(row, 'video_type') || 'walking tour';
  const timeOfDay = videoType.includes('evening') ? 'evening' : 'daytime';

  // Format filming month/year
  let filmingMonthYear = '';
  if (filmedDateIso) {
    const d = new Date(`${filmedDateIso}T12:00:00`);
    filmingMonthYear = d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  }

  records.push({
    id: slug,
    slug,
    siteTitle: title,
    youtubeTitle: title,
    youtubeUrl,
    thumbnail: thumbnailPath,
    country,
    region,
    city,
    filmingDates: filmedDateIso ? [filmedDateIso] : [],
    filmingMonthYear,
    durationLabel,
    durationSeconds,
    weather,
    shortDescription: shortDesc,
    keywords,
    landmarks,
    themes,
    timeOfDay,
    videoType: videoType.replace(/-/g, ' '),
    visibility: 'public',
    highlightsRaw: existingHighlights[slug] || '[]',
  });
}

// ─── Generate TypeScript ─────────────────────────────────────────────────────

function jsonStr(val) {
  return JSON.stringify(val, null, 2).replace(/\n/g, '\n  ');
}

function toEntry(r) {
  return `  {
    id: ${JSON.stringify(r.id)},
    slug: ${JSON.stringify(r.slug)},
    siteTitle: ${JSON.stringify(r.siteTitle)},
    youtubeTitle: ${JSON.stringify(r.youtubeTitle)},
    youtubeUrl: ${JSON.stringify(r.youtubeUrl)},
    thumbnail: ${JSON.stringify(r.thumbnail)},
    country: ${JSON.stringify(r.country)},
    region: ${JSON.stringify(r.region)},
    city: ${JSON.stringify(r.city)},
    filmingDates: ${JSON.stringify(r.filmingDates)},
    filmingMonthYear: ${JSON.stringify(r.filmingMonthYear)},
    durationLabel: ${JSON.stringify(r.durationLabel)},
    durationSeconds: ${r.durationSeconds},
    weather: ${JSON.stringify(r.weather)},
    shortDescription:\n      ${JSON.stringify(r.shortDescription)},
    keywords: ${jsonStr(r.keywords)},
    landmarks: ${jsonStr(r.landmarks)},
    themes: ${jsonStr(r.themes)},
    timeOfDay: ${JSON.stringify(r.timeOfDay)},
    videoType: ${JSON.stringify(r.videoType)},
    visibility: ${JSON.stringify(r.visibility)},
    highlights: ${r.highlightsRaw},
  }`;
}

const output = `import type { VideoCatalogRecord } from "../video-types";

// Auto-generated from data/maps/france.csv by scripts/refresh-france-catalog.js
// Only tours with status "ready" are included.
// Last refreshed: ${new Date().toISOString().slice(0, 10)}
export const franceVideos: VideoCatalogRecord[] = [
${records.map(toEntry).join(',\n')}
];
`;

console.log(`\nFrance catalog refresh`);
console.log(`  CSV rows:    ${dataRows.length}`);
console.log(`  Ready tours: ${records.length}`);
console.log(`  With highlights: ${records.filter(r => r.highlightsRaw !== '[]').length}`);
console.log(`  Output: data/videos/france.ts`);

if (dryRun) {
  console.log(`\n  [DRY RUN] Would write ${output.length} bytes. No files changed.\n`);
  // Print slugs
  records.forEach(r => {
    const hl = r.highlightsRaw !== '[]' ? ' (has highlights)' : '';
    console.log(`    ${r.slug}${hl}`);
  });
  process.exit(0);
}

fs.writeFileSync(TS_PATH, output, 'utf8');
console.log(`\n  ✓ Written ${output.length} bytes to data/videos/france.ts\n`);
