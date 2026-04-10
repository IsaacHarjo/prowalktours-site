#!/usr/bin/env node
/**
 * scripts/fix-encoding.js
 *
 * Fixes UTF-8 mojibake (double-encoded characters) in CSV and TS data files.
 * Common pattern: Google Sheets exports UTF-8, then re-interpreted as Latin-1.
 *
 * Usage: node scripts/fix-encoding.js [--dry-run]
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const dryRun = process.argv.includes("--dry-run");

// Mojibake replacement map: corrupted sequence -> correct character
// When UTF-8 text is re-interpreted through a Latin-1/Windows-1252 layer,
// the 3-byte UTF-8 sequences become 3 separate Unicode codepoints.
// e.g. em dash U+2014 = bytes E2 80 94 -> â (U+00E2) + € (U+20AC) + " (U+201D)
const replacements = [
  // Em dash: â€" -> —
  ["\u00e2\u20ac\u201d", "\u2014"],
  // En dash: â€" (different ending char) -> –
  ["\u00e2\u20ac\u201c", "\u2013"],
  // Right single quote: â€™ -> '
  ["\u00e2\u20ac\u2122", "\u2019"],
  // Left single quote: â€˜ -> '
  ["\u00e2\u20ac\u02dc", "\u2018"],
  // Left double quote: â€œ -> "
  ["\u00e2\u20ac\u0153", "\u201c"],
  // Right double quote: â€ (U+009D control char) -> "
  ["\u00e2\u20ac\u009d", "\u201d"],
  // Ellipsis: â€¦ -> …
  ["\u00e2\u20ac\u00a6", "\u2026"],
];

// Files to process
const filePaths = [];

// CSV files
const importDir = path.join(ROOT, "data", "import");
if (fs.existsSync(importDir)) {
  for (const f of fs.readdirSync(importDir)) {
    if (f.endsWith(".csv")) filePaths.push(path.join(importDir, f));
  }
}

// Video-detail TS files
const detailsDir = path.join(ROOT, "data", "video-details");
if (fs.existsSync(detailsDir)) {
  for (const f of fs.readdirSync(detailsDir)) {
    if (f.endsWith(".ts")) filePaths.push(path.join(detailsDir, f));
  }
}

let totalFixed = 0;

for (const filePath of filePaths) {
  const original = fs.readFileSync(filePath, "utf8");
  let content = original;
  let fileFixCount = 0;

  for (const [bad, good] of replacements) {
    const regex = new RegExp(escapeRegExp(bad), "g");
    const matches = content.match(regex);
    if (matches) {
      fileFixCount += matches.length;
      content = content.replace(regex, good);
    }
  }

  if (fileFixCount > 0) {
    const rel = path.relative(ROOT, filePath);
    if (dryRun) {
      console.log(`  would fix ${fileFixCount} corrupted sequences in ${rel}`);
    } else {
      fs.writeFileSync(filePath, content, "utf8");
      console.log(`  fixed ${fileFixCount} corrupted sequences in ${rel}`);
    }
    totalFixed += fileFixCount;
  }
}

console.log(`\nTotal: ${totalFixed} fixes ${dryRun ? "would be " : ""}applied.`);

function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
