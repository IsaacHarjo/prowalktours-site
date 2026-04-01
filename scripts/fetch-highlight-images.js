#!/usr/bin/env node
/**
 * scripts/fetch-highlight-images.js
 *
 * Fetches a YouTube video frame at each highlight timestamp for a given
 * tour slug and saves it to public/[slug]/highlights/.
 *
 * Strategy:
 *   1. Download the full video once to a temp file (yt-dlp, 720p)
 *   2. Extract all frames from the local file (ffmpeg, instant seeks)
 *   3. Delete the temp file
 *
 * This is much faster than seeking a remote HTTP stream per frame.
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
 * Examples:
 *   node scripts/fetch-highlight-images.js avignon-walking-tour-2025 --dry-run
 *   node scripts/fetch-highlight-images.js paris-latin-quarter-marais-evening-walk-2020
 */
'use strict';

const { spawnSync, execFileSync } = require('child_process');
const fs   = require('fs');
const os   = require('os');
const path = require('path');

// ─── CLI args ────────────────────────────────────────────────────────────────

const args   = process.argv.slice(2);
const slug   = args.find(a => !a.startsWith('--'));
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
 *   "Hôtel de Ville"                      → "hotel-de-ville"
 */
function slugify(str) {
  return str
    .replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
    .replace(/\([^)]*\)/g, '')             // strip parenthetical content
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')       // strip combining accent marks
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')          // non-alphanumeric runs → single hyphen
    .replace(/^-+|-+$/g, '');             // trim leading/trailing hyphens
}

/** Formats raw seconds as HH:MM:SS for readable console output. */
function fmtTime(totalSeconds) {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
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

if (!dryRun) {
  requireTool('yt-dlp');
  requireTool('ffmpeg');
}

// ─── Parse catalog (france.ts / italy.ts) → city + videoId ──────────────────

function parseCatalog() {
  for (const file of CATALOG_PATHS) {
    if (!fs.existsSync(file)) continue;

    const text = fs.readFileSync(file, 'utf8');

    const slugRx = new RegExp(`slug:\\s*["']${slug}["']`);
    const m = slugRx.exec(text);
    if (!m) continue;

    let start = text.lastIndexOf('{', m.index);
    let depth = 0;
    let end = start;
    for (let i = start; i < text.length; i++) {
      if (text[i] === '{') depth++;
      else if (text[i] === '}') { depth--; if (depth === 0) { end = i; break; } }
    }
    const block = text.slice(start, end + 1);

    const cityM = /city:\s*["']([^"']+)["']/.exec(block);
    const urlM  = /youtubeUrl:\s*["']([^"']+)["']/.exec(block);

    if (!cityM) console.warn(`⚠  No "city" field for slug "${slug}" — using slug as prefix.`);
    if (!urlM)  { console.error(`✗ No "youtubeUrl" for slug "${slug}".`); process.exit(1); }

    const city   = cityM ? cityM[1] : slug;
    const rawUrl = urlM[1];
    const idM    = /(?:youtu\.be\/|[?&]v=|\/embed\/)([A-Za-z0-9_-]{11})/.exec(rawUrl);
    if (!idM) { console.error(`✗ Could not parse YouTube ID from: ${rawUrl}`); process.exit(1); }

    return { city, videoId: idM[1] };
  }

  console.error(`✗ Slug "${slug}" not found in catalog.`);
  console.error('  Checked:', CATALOG_PATHS.map(p => path.relative(ROOT, p)).join(', '));
  process.exit(1);
}

// ─── Parse video-details/[slug].ts → highlights ──────────────────────────────

function parseHighlights() {
  if (!fs.existsSync(DETAIL_PATH)) {
    console.error(`✗ Detail file not found: ${DETAIL_PATH}`);
    process.exit(1);
  }

  const text = fs.readFileSync(DETAIL_PATH, 'utf8');

  const hlIdx = text.indexOf('highlights:');
  if (hlIdx === -1) { console.warn('⚠  No "highlights:" field.'); return []; }
  const arrIdx = text.indexOf('[', hlIdx);
  if (arrIdx === -1) return [];

  let depth = 0, arrEnd = arrIdx;
  for (let i = arrIdx; i < text.length; i++) {
    if (text[i] === '[') depth++;
    else if (text[i] === ']') { depth--; if (depth === 0) { arrEnd = i; break; } }
  }
  const hlBlock = text.slice(arrIdx, arrEnd + 1);

  const highlights = [];

  // Format B: h("title", "timeLabel", seconds, …)
  if (/\bconst h\s*=/.test(text)) {
    const re = /\bh\(\s*["']((?:[^"'\\]|\\.)*?)["']\s*,\s*["'][^"']*["']\s*,\s*(\d+)/g;
    let m;
    while ((m = re.exec(hlBlock)) !== null) {
      highlights.push({ title: m[1], seconds: parseInt(m[2], 10) });
    }
    return highlights;
  }

  // Format A: { title: "…", seconds: NNN, … }
  let pos = 0;
  while (pos < hlBlock.length) {
    const objStart = hlBlock.indexOf('{', pos);
    if (objStart === -1) break;
    let d = 0, objEnd = objStart;
    for (let i = objStart; i < hlBlock.length; i++) {
      if (hlBlock[i] === '{') d++;
      else if (hlBlock[i] === '}') { d--; if (d === 0) { objEnd = i; break; } }
    }
    const obj = hlBlock.slice(objStart, objEnd + 1);
    const titleM   = /title:\s*"((?:[^"\\]|\\.)*)"/.exec(obj);
    const secondsM = /\bseconds:\s*(\d+)/.exec(obj);
    if (titleM && secondsM) {
      highlights.push({ title: titleM[1], seconds: parseInt(secondsM[1], 10) });
    }
    pos = objEnd + 1;
  }

  return highlights;
}

// ─── Download video to temp file ─────────────────────────────────────────────

/**
 * Downloads the YouTube video at 720p to a temp .mp4 file.
 * Returns the path to the temp file.
 * Prefers formats that produce a single muxed MP4 for reliable ffmpeg seeking.
 */
function downloadVideo(videoId) {
  const tmpFile = path.join(os.tmpdir(), `prowalk-${videoId}.mp4`);

  if (fs.existsSync(tmpFile)) {
    console.log(`   ✓ Temp file already exists, reusing: ${tmpFile}\n`);
    return tmpFile;
  }

  console.log(`\n⟳  Downloading video ${videoId} to temp file…`);
  console.log(`   This may take several minutes. The file will be deleted when done.\n`);

  const r = spawnSync('yt-dlp', [
    // Prefer a pre-muxed progressive MP4 up to 720p — best for local ffmpeg seeking.
    // Fall back to best available MP4, then anything ≤720p.
    '-f', 'best[height<=720][ext=mp4]/best[height<=720]/bestvideo[ext=mp4]+bestaudio[ext=m4a]/best',
    '--merge-output-format', 'mp4',
    '-o', tmpFile,
    `https://www.youtube.com/watch?v=${videoId}`,
  ], {
    encoding: 'utf8',
    // Stream output to console so the user sees download progress
    stdio: ['ignore', 'inherit', 'inherit'],
  });

  if (r.error || r.status !== 0) {
    console.error('\n✗ yt-dlp download failed.');
    process.exit(1);
  }

  if (!fs.existsSync(tmpFile)) {
    // yt-dlp may have chosen a different extension — find whatever it wrote
    const guesses = ['.mkv', '.webm', '.mp4'].map(ext =>
      path.join(os.tmpdir(), `prowalk-${videoId}${ext}`)
    );
    const found = guesses.find(p => fs.existsSync(p));
    if (!found) {
      console.error('✗ Downloaded file not found at expected path.');
      process.exit(1);
    }
    return found;
  }

  console.log(`\n   ✓ Download complete: ${tmpFile}\n`);
  return tmpFile;
}

// ─── Extract a single frame from a local file via ffmpeg ─────────────────────

/**
 * Seeks to `seconds` in the local video file and saves one JPEG frame.
 * Local seeking is near-instant regardless of timestamp position.
 */
function extractFrame(localVideoPath, seconds, outputPath) {
  const r = spawnSync('ffmpeg', [
    '-ss', String(seconds),
    '-i',  localVideoPath,
    '-frames:v', '1',
    '-q:v', '2',      // JPEG quality 2 = near-lossless
    '-y',
    outputPath,
  ], { encoding: 'utf8' });

  if (r.error || r.status !== 0) {
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

const { city, videoId } = parseCatalog();
console.log(`City:       ${city}`);
console.log(`Video ID:   ${videoId}`);

const highlights = parseHighlights();
console.log(`Highlights: ${highlights.length}\n`);

if (highlights.length === 0) {
  console.log('No highlights to process. Done.');
  process.exit(0);
}

// Build work list
const cityPrefix = slugify(city);
const tasks = [];
const seenFilenames = new Set();

for (const h of highlights) {
  const filename    = `${cityPrefix}-${slugify(h.title)}.jpg`;
  const isDuplicate = seenFilenames.has(filename);
  seenFilenames.add(filename);
  const outputPath  = path.join(OUTPUT_DIR, filename);
  const exists      = fs.existsSync(outputPath);
  tasks.push({ title: h.title, seconds: h.seconds, filename, outputPath, exists, isDuplicate });
}

const toFetch = tasks.filter(t => !t.exists && !t.isDuplicate);
const toSkip  = tasks.filter(t =>  t.exists || t.isDuplicate);

console.log(`To download: ${toFetch.length}`);
console.log(`To skip:     ${toSkip.length}  (already exist or duplicate title)\n`);

const COL = 12;
console.log(`${'Time'.padEnd(COL)}${'Status'.padEnd(12)}Filename`);
console.log(`${'-'.repeat(COL)}${'-'.repeat(12)}${'-'.repeat(50)}`);
for (const t of tasks) {
  const statusLabel = (t.isDuplicate && !t.exists) ? 'DUP-SKIP' : t.exists ? 'EXISTS' : 'FETCH';
  console.log(`${fmtTime(t.seconds).padEnd(COL)}${statusLabel.padEnd(12)}${t.filename}`);
}

if (dryRun) {
  console.log(`\n${'─'.repeat(60)}`);
  console.log('  Dry run complete — no files written.');
  console.log(`  Output directory would be: ${path.relative(ROOT, OUTPUT_DIR)}`);
  console.log(`${'─'.repeat(60)}\n`);
  process.exit(0);
}

if (toFetch.length === 0) {
  console.log(`\n✓ All highlight images already exist — nothing to download.\n`);
  process.exit(0);
}

fs.mkdirSync(OUTPUT_DIR, { recursive: true });

// Download full video once to temp file
const tmpVideo = downloadVideo(videoId);

// Extract all frames from local file
let saved = 0, failed = 0;
console.log(`${'─'.repeat(60)}`);
console.log('  Extracting frames…\n');

for (const t of toFetch) {
  process.stdout.write(`  [${fmtTime(t.seconds)}]  ${t.filename}  … `);
  const ok = extractFrame(tmpVideo, t.seconds, t.outputPath);
  if (ok) { console.log('✓'); saved++; }
  else    { failed++; }
}

// Clean up temp video file
console.log(`\n  Cleaning up temp file…`);
try {
  fs.unlinkSync(tmpVideo);
  console.log(`  ✓ Deleted ${path.basename(tmpVideo)}\n`);
} catch (e) {
  console.warn(`  ⚠  Could not delete temp file: ${tmpVideo}`);
}

console.log(`${'═'.repeat(60)}`);
console.log(`  Done`);
console.log(`  Saved:   ${saved}`);
console.log(`  Failed:  ${failed}`);
console.log(`  Skipped: ${toSkip.length}`);
console.log(`  Output:  ${path.relative(ROOT, OUTPUT_DIR)}`);
console.log(`${'═'.repeat(60)}\n`);

if (failed > 0) process.exit(1);
