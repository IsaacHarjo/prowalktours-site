#!/usr/bin/env node
/**
 * scripts/fetch-highlight-images.js
 *
 * Fetches a YouTube video frame at each highlight timestamp for a given
 * tour slug and saves it to public/[slug]/highlights/.
 *
 * Naming:  [city]-[slugified-landmark-title].jpg  (no trailing number)
 * Skips:   any file that already exists (never overwrites)
 *
 * Usage:
 *   node scripts/fetch-highlight-images.js <slug> [--dry-run]
 *
 * Requirements (must be on PATH):
 *   yt-dlp  →  https://github.com/yt-dlp/yt-dlp#installation
 *   ffmpeg  →  https://ffmpeg.org/download.html
 *
 * Example:
 *   node scripts/fetch-highlight-images.js avignon-walking-tour-2025 --dry-run
 *   node scripts/fetch-highlight-images.js avignon-walking-tour-2025
 */
'use strict';

const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// ─── CLI args ────────────────────────────────────────────────────────────────

const args = process.argv.slice(2);
const slug = args.find(a => !a.startsWith('--'));
const dryRun = args.includes('--dry-run');

if (!slug) {
  console.error('Usage: node scripts/fetch-highlight-images.js <slug> [--dry-run]');
  process.exit(1);
}

// ─── Paths ───────────────────────────────────────────────────────────────────

const ROOT = path.resolve(__dirname, '..');
const CATALOG_PATHS = [
  path.join(ROOT, 'data', 'videos', 'france.ts'),
  path.join(ROOT, 'data', 'videos', 'italy.ts'),
];
const DETAIL_PATH = path.join(ROOT, 'data', 'video-details', `${slug}.ts`);
const OUTPUT_DIR  = path.join(ROOT, 'public', slug, 'highlights');

// ─── Utility ─────────────────────────────────────────────────────────────────

/**
 * Converts a display string to a lowercase hyphen-separated slug.
 * Strips parenthetical content, accents, and non-alphanumeric characters.
 *
 * Examples:
 *   "Pont Saint-Bénézet (Pont d'Avignon)" → "pont-saint-benezet"
 *   "Cathédrale Notre-Dame des Doms"      → "cathedrale-notre-dame-des-doms"
 *   "Place de l'Horloge"                  → "place-de-l-horloge"
 */
function slugify(str) {
  return str
    .replace(/\([^)]*\)/g, '')             // strip parenthetical (sub-title) content
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')       // strip combining accent marks
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')          // non-alphanumeric runs → single hyphen
    .replace(/^-+|-+$/g, '');             // trim leading/trailing hyphens
}

/** Formats raw seconds as HH:MM:SS for readable console output. */
function fmtTime(totalSeconds) {
  const h  = Math.floor(totalSeconds / 3600);
  const m  = Math.floor((totalSeconds % 3600) / 60);
  const s  = totalSeconds % 60;
  return [h, m, s].map(v => String(v).padStart(2, '0')).join(':');
}

// ─── Tool availability check ─────────────────────────────────────────────────

function requireTool(name) {
  const r = spawnSync(name, ['--version'], { encoding: 'utf8' });
  if (r.error) {
    console.error(`\n✗ "${name}" not found on PATH.\n`);
    if (name === 'yt-dlp') {
      console.error('  Install: https://github.com/yt-dlp/yt-dlp#installation');
      console.error('  Windows: winget install yt-dlp  or  scoop install yt-dlp');
    }
    if (name === 'ffmpeg') {
      console.error('  Install: https://ffmpeg.org/download.html');
      console.error('  Windows: winget install ffmpeg  or  scoop install ffmpeg');
    }
    process.exit(1);
  }
}

// Check tools upfront (skip in dry-run — no downloads needed)
if (!dryRun) {
  requireTool('yt-dlp');
  requireTool('ffmpeg');
}

// ─── Parse catalog (france.ts / italy.ts) → city + videoId ──────────────────

/**
 * Reads the catalog files to find the entry for `slug` and returns the
 * city name and YouTube video ID.
 *
 * Parses TypeScript source files as text using targeted regex — works
 * because catalog entries follow a consistent schema.
 */
function parseCatalog() {
  for (const file of CATALOG_PATHS) {
    if (!fs.existsSync(file)) continue;

    const text = fs.readFileSync(file, 'utf8');

    // Find the object entry that contains `slug: "<slug>"`
    const slugRx = new RegExp(`slug:\\s*["']${slug}["']`);
    const m = slugRx.exec(text);
    if (!m) continue;

    // Walk backward to find the opening { of this catalog entry
    let start = text.lastIndexOf('{', m.index);

    // Walk forward counting braces to find the matching closing }
    let depth = 0;
    let end = start;
    for (let i = start; i < text.length; i++) {
      if (text[i] === '{') depth++;
      else if (text[i] === '}') {
        depth--;
        if (depth === 0) { end = i; break; }
      }
    }
    const block = text.slice(start, end + 1);

    // Extract city and youtubeUrl from within the entry block
    const cityM  = /city:\s*["']([^"']+)["']/.exec(block);
    const urlM   = /youtubeUrl:\s*["']([^"']+)["']/.exec(block);

    if (!cityM) {
      console.warn(`⚠  No "city" field found for slug "${slug}" — using slug as city prefix.`);
    }
    if (!urlM) {
      console.error(`✗ No "youtubeUrl" field found for slug "${slug}".`);
      process.exit(1);
    }

    const city   = cityM ? cityM[1] : slug;
    const rawUrl = urlM[1];

    // Support all common YouTube URL formats:
    //   https://youtu.be/ID
    //   https://www.youtube.com/watch?v=ID
    //   https://www.youtube.com/embed/ID
    const idM = /(?:youtu\.be\/|[?&]v=|\/embed\/)([A-Za-z0-9_-]{11})/.exec(rawUrl);
    if (!idM) {
      console.error(`✗ Could not parse a YouTube video ID from URL: ${rawUrl}`);
      process.exit(1);
    }

    return { city, videoId: idM[1] };
  }

  console.error(`✗ Slug "${slug}" not found in any catalog file.`);
  console.error('  Checked:', CATALOG_PATHS.map(p => path.relative(ROOT, p)).join(', '));
  process.exit(1);
}

// ─── Parse video-details/[slug].ts → highlights ──────────────────────────────

/**
 * Extracts the list of { title, seconds } pairs from the detail file.
 *
 * Handles two formats used in this codebase:
 *
 * Format A — direct object literals (Avignon, Menton, Antibes, …):
 *   highlights: [
 *     { title: "Landmark Name", timeLabel: "0:42", seconds: 42, … },
 *     …
 *   ]
 *
 * Format B — h() helper shorthand (Paris Catacombs, Paris Evening Walk, …):
 *   const h = (title, timeLabel, seconds, …) => ({ … })
 *   highlights: [
 *     h("Landmark Name", "0:42", 42, …),
 *     …
 *   ]
 */
function parseHighlights() {
  if (!fs.existsSync(DETAIL_PATH)) {
    console.error(`✗ Detail file not found: ${DETAIL_PATH}`);
    process.exit(1);
  }

  const text = fs.readFileSync(DETAIL_PATH, 'utf8');

  // Find the highlights array
  const hlIdx = text.indexOf('highlights:');
  if (hlIdx === -1) {
    console.warn('⚠  No "highlights:" field found in detail file.');
    return [];
  }
  const arrIdx = text.indexOf('[', hlIdx);
  if (arrIdx === -1) return [];

  // Find the matching closing ] by counting brackets
  let depth = 0;
  let arrEnd = arrIdx;
  for (let i = arrIdx; i < text.length; i++) {
    if (text[i] === '[') depth++;
    else if (text[i] === ']') {
      depth--;
      if (depth === 0) { arrEnd = i; break; }
    }
  }
  const hlBlock = text.slice(arrIdx, arrEnd + 1);

  const highlights = [];

  // ── Format B: h("title", "timeLabel", seconds, …) ──────────────────────
  if (/\bconst h\s*=/.test(text)) {
    // Match: h( "title" , "timeLabel" , seconds
    const re = /\bh\(\s*["']((?:[^"'\\]|\\.)*?)["']\s*,\s*["'][^"']*["']\s*,\s*(\d+)/g;
    let m;
    while ((m = re.exec(hlBlock)) !== null) {
      highlights.push({ title: m[1], seconds: parseInt(m[2], 10) });
    }
    return highlights;
  }

  // ── Format A: { title: "…", seconds: NNN, … } ──────────────────────────
  // Parse each individual object in the array to avoid false matches
  // from fields like `durationSeconds` elsewhere in the file.
  let pos = 0;
  while (pos < hlBlock.length) {
    const objStart = hlBlock.indexOf('{', pos);
    if (objStart === -1) break;

    // Find the matching } for this object
    let d = 0;
    let objEnd = objStart;
    for (let i = objStart; i < hlBlock.length; i++) {
      if (hlBlock[i] === '{') d++;
      else if (hlBlock[i] === '}') {
        d--;
        if (d === 0) { objEnd = i; break; }
      }
    }
    const obj = hlBlock.slice(objStart, objEnd + 1);

    // TypeScript property values are double-quoted; don't treat ' as a delimiter.
    const titleM   = /title:\s*"((?:[^"\\]|\\.)*)"/.exec(obj);
    const secondsM = /\bseconds:\s*(\d+)/.exec(obj);

    if (titleM && secondsM) {
      highlights.push({ title: titleM[1], seconds: parseInt(secondsM[1], 10) });
    }
    pos = objEnd + 1;
  }

  return highlights;
}

// ─── Get YouTube stream URL via yt-dlp ───────────────────────────────────────

/**
 * Calls yt-dlp once to obtain a direct video stream URL for the given
 * YouTube video ID. We prefer 720p MP4 for good quality and seeking support.
 *
 * The URL is used by ffmpeg to seek and extract frames — yt-dlp is only
 * called once per script run, regardless of highlight count.
 */
function getStreamUrl(videoId) {
  console.log(`\n⟳  Getting stream URL for ${videoId} …`);

  const r = spawnSync('yt-dlp', [
    '-f',
    // Prefer 720p MP4 (best for HTTP range-based seeking by ffmpeg).
    // Fall through to best available if not found.
    'bestvideo[height<=720][ext=mp4]/bestvideo[height<=720]/best[height<=720]',
    '-g',
    `https://www.youtube.com/watch?v=${videoId}`,
  ], { encoding: 'utf8' });

  if (r.error || r.status !== 0) {
    console.error('✗ yt-dlp failed:');
    console.error(r.stderr || r.error?.message || '(no output)');
    process.exit(1);
  }

  // yt-dlp may return two lines (video + audio) for adaptive formats;
  // we only need the video stream line for frame extraction.
  const url = r.stdout.trim().split('\n')[0].trim();
  if (!url) {
    console.error('✗ yt-dlp returned an empty URL.');
    process.exit(1);
  }

  console.log('   ✓ Stream URL obtained.\n');
  return url;
}

// ─── Extract a single frame via ffmpeg ───────────────────────────────────────

/**
 * Asks ffmpeg to seek to `seconds` in the remote stream and save one frame.
 * Using -ss before -i (input seek) is fast and works well with HTTP streams.
 * Returns true on success, false on error (does not exit — allows other
 * frames to continue).
 */
function extractFrame(streamUrl, seconds, outputPath) {
  const r = spawnSync('ffmpeg', [
    '-ss', String(seconds),
    '-i',  streamUrl,
    '-frames:v', '1',
    '-q:v', '2',             // JPEG quality: 2 = near-lossless (scale 1–31)
    '-y',                    // overwrite safety (file won't exist — we check first)
    outputPath,
  ], { encoding: 'utf8' });

  if (r.error || r.status !== 0) {
    // Surface only the error lines from ffmpeg's verbose stderr
    const errLines = (r.stderr || '')
      .split('\n')
      .filter(l => /error|invalid|failed/i.test(l))
      .join('\n');
    console.error(`   ✗ ffmpeg error:`, errLines || r.error?.message || '(unknown)');
    return false;
  }
  return true;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

console.log(`\n${'═'.repeat(60)}`);
console.log(`  fetch-highlight-images: ${slug}${dryRun ? '  [DRY RUN]' : ''}`);
console.log(`${'═'.repeat(60)}\n`);

// 1. Resolve city + YouTube video ID from catalog data
const { city, videoId } = parseCatalog();
console.log(`City:       ${city}`);
console.log(`Video ID:   ${videoId}`);

// 2. Parse highlights from the detail file
const highlights = parseHighlights();
console.log(`Highlights: ${highlights.length}\n`);

if (highlights.length === 0) {
  console.log('No highlights to process. Done.');
  process.exit(0);
}

// 3. Build the work list — determine filename and existence for each highlight
const cityPrefix = slugify(city);
const tasks = [];
const seenFilenames = new Set();

for (const h of highlights) {
  let filename = `${cityPrefix}-${slugify(h.title)}.jpg`;

  // Handle duplicate generated filenames (e.g. two highlights with the same
  // title). The first one is written; subsequent duplicates are logged only.
  // We do NOT add a number suffix — see CLAUDE.md highlight image rules.
  const isDuplicate = seenFilenames.has(filename);
  seenFilenames.add(filename);

  const outputPath = path.join(OUTPUT_DIR, filename);
  const exists = fs.existsSync(outputPath);

  tasks.push({
    title:    h.title,
    seconds:  h.seconds,
    filename,
    outputPath,
    exists,
    isDuplicate,
  });
}

const toFetch = tasks.filter(t => !t.exists && !t.isDuplicate);
const toSkip  = tasks.filter(t =>  t.exists || t.isDuplicate);

console.log(`To download: ${toFetch.length}`);
console.log(`To skip:     ${toSkip.length}  (already exist or duplicate title)\n`);

// Print full preview table
const COL = 12;
console.log(`${'Time'.padEnd(COL)}${'Status'.padEnd(12)}Filename`);
console.log(`${'-'.repeat(COL)}${'-'.repeat(12)}${'-'.repeat(50)}`);
for (const t of tasks) {
  let statusLabel;
  if (t.isDuplicate && !t.exists) statusLabel = 'DUP-SKIP';
  else if (t.exists)              statusLabel = 'EXISTS';
  else                            statusLabel = 'FETCH';

  console.log(`${fmtTime(t.seconds).padEnd(COL)}${statusLabel.padEnd(12)}${t.filename}`);
}

// Stop here for dry-run
if (dryRun) {
  console.log(`\n${'─'.repeat(60)}`);
  console.log('  Dry run complete — no files written.');
  console.log(`  Output directory would be: ${path.relative(ROOT, OUTPUT_DIR)}`);
  console.log(`${'─'.repeat(60)}\n`);
  process.exit(0);
}

// Stop early if nothing to do
if (toFetch.length === 0) {
  console.log(`\n✓ All highlight images already exist — nothing to download.\n`);
  process.exit(0);
}

// 4. Ensure the output directory exists before writing
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

// 5. Get the YouTube stream URL (one yt-dlp call for the whole video)
const streamUrl = getStreamUrl(videoId);

// 6. Extract frames
let saved = 0;
let failed = 0;
console.log(`${'─'.repeat(60)}`);
console.log('  Extracting frames…\n');

for (const t of toFetch) {
  process.stdout.write(`  [${fmtTime(t.seconds)}]  ${t.filename}  … `);
  const ok = extractFrame(streamUrl, t.seconds, t.outputPath);
  if (ok) {
    console.log('✓');
    saved++;
  } else {
    failed++;
  }
}

console.log(`\n${'═'.repeat(60)}`);
console.log(`  Done`);
console.log(`  Saved:   ${saved}`);
console.log(`  Failed:  ${failed}`);
console.log(`  Skipped: ${toSkip.length}`);
console.log(`  Output:  ${path.relative(ROOT, OUTPUT_DIR)}`);
console.log(`${'═'.repeat(60)}\n`);

if (failed > 0) process.exit(1);
