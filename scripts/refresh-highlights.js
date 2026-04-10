#!/usr/bin/env node
/**
 * scripts/refresh-highlights.js
 *
 * Reads data/import/all-highlights.csv and updates the highlights array
 * in each matching data/video-details/[slug].ts file.
 *
 * Usage:
 *   node scripts/refresh-highlights.js              # update all slugs
 *   node scripts/refresh-highlights.js <slug>       # update one slug
 *   node scripts/refresh-highlights.js --dry-run    # preview without writing
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const HIGHLIGHTS_CSV = path.join(ROOT, "data", "import", "all-highlights.csv");
const DETAILS_DIR = path.join(ROOT, "data", "video-details");

const dryRun = process.argv.includes("--dry-run");
const filterSlug = process.argv
  .slice(2)
  .filter((a) => !a.startsWith("--"))[0];

// ─── CSV parser (handles quoted fields with commas, newlines, etc.) ──────────

function parseCsv(content) {
  const rows = [];
  let currentRow = [];
  let currentValue = "";
  let inQuotes = false;
  for (let i = 0; i < content.length; i++) {
    const c = content[i];
    const next = content[i + 1];
    if (c === '"') {
      if (inQuotes && next === '"') {
        currentValue += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }
    if (c === "," && !inQuotes) {
      currentRow.push(currentValue);
      currentValue = "";
      continue;
    }
    if ((c === "\n" || c === "\r") && !inQuotes) {
      if (c === "\r" && next === "\n") i++;
      currentRow.push(currentValue);
      if (currentRow.some((v) => v !== "")) rows.push(currentRow);
      currentRow = [];
      currentValue = "";
      continue;
    }
    currentValue += c;
  }
  currentRow.push(currentValue);
  if (currentRow.some((v) => v !== "")) rows.push(currentRow);
  return rows;
}

// ─── Load highlights CSV ─────────────────────────────────────────────────────

const csvContent = fs.readFileSync(HIGHLIGHTS_CSV, "utf8");
const [headerRow, ...dataRows] = parseCsv(csvContent);
const col = {};
headerRow.forEach((h, i) => {
  col[h.trim()] = i;
});

// Group by slug
const bySlug = {};
for (const row of dataRows) {
  const slug = (row[col["slug"]] || "").trim();
  if (!slug) continue;
  if (filterSlug && slug !== filterSlug) continue;

  const title = (row[col["highlight_title"]] || "").trim();
  const seconds = parseInt(row[col["seconds"]] || "0", 10);
  let timeLabel = (row[col["time_label"]] || "").trim();

  // Clean up time label: remove leading "0:" prefix for sub-hour timestamps
  // "0:01:40" → "1:40", "1:10:00" stays "1:10:00"
  timeLabel = timeLabel.replace(/^0:/, "");
  // Remove leading zeros from the first number: "01:40" → "1:40"
  timeLabel = timeLabel.replace(/^0+(\d)/, "$1");
  if (!timeLabel || timeLabel === "0" || timeLabel === "00") timeLabel = "0:00";

  if (!bySlug[slug]) bySlug[slug] = [];
  bySlug[slug].push({ title, timeLabel, seconds });
}

// ─── Update video-detail files ───────────────────────────────────────────────

let updated = 0;
let skipped = 0;

for (const [slug, highlights] of Object.entries(bySlug)) {
  const filePath = path.join(DETAILS_DIR, `${slug}.ts`);
  if (!fs.existsSync(filePath)) {
    console.log(`  ⚠ No video-detail file for ${slug} — skipping`);
    skipped++;
    continue;
  }

  const content = fs.readFileSync(filePath, "utf8");

  // Build highlight entries
  const entries = highlights.map((h) => {
    return `    { title: ${JSON.stringify(h.title)}, timeLabel: ${JSON.stringify(h.timeLabel)}, seconds: ${h.seconds}, imageSrc: "", alt: ${JSON.stringify(h.title)}, caption: ${JSON.stringify(h.title)}, description: "" }`;
  });
  const newHighlightsBlock = `highlights: [\n${entries.join(",\n")}\n  ],`;

  // Replace the existing highlights array (could be empty [] or multi-line populated)
  // Match from "highlights:" to the closing "]" that's followed by comma/semicolon/newline before "};"
  const highlightsPattern = /highlights:\s*\[[\s\S]*?\],?\s*(?=\n};)/;
  if (!highlightsPattern.test(content)) {
    console.log(`  ⚠ Could not find highlights array in ${slug}.ts — skipping`);
    skipped++;
    continue;
  }

  const newContent = content.replace(highlightsPattern, newHighlightsBlock);

  if (newContent === content) {
    console.log(`  — ${slug}: no changes needed (${highlights.length} highlights)`);
    continue;
  }

  if (dryRun) {
    console.log(
      `  ✓ ${slug}: would update with ${highlights.length} highlights`
    );
  } else {
    fs.writeFileSync(filePath, newContent, "utf8");
    console.log(`  ✓ ${slug}: updated with ${highlights.length} highlights`);
  }
  updated++;
}

console.log(
  `\nDone. ${updated} files ${dryRun ? "would be " : ""}updated, ${skipped} skipped.`
);
