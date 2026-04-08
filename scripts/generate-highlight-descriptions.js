#!/usr/bin/env node
/**
 * scripts/generate-highlight-descriptions.js
 *
 * Auto-generates descriptions, captions, and alt text for video
 * highlights that have empty description fields. Uses Claude API.
 *
 * Usage:
 *   ANTHROPIC_API_KEY=sk-... node scripts/generate-highlight-descriptions.js
 *   node scripts/generate-highlight-descriptions.js --dry-run          # preview without writing
 *   node scripts/generate-highlight-descriptions.js --file aachen-christmas-market-evening-walk-2024  # single file
 *
 * Requires: ANTHROPIC_API_KEY environment variable
 */
'use strict';

const fs = require('fs');
const path = require('path');
const https = require('https');

const ROOT = path.resolve(__dirname, '..');
const DETAIL_DIR = path.join(ROOT, 'data', 'video-details');
const dryRun = process.argv.includes('--dry-run');
const singleFileArg = process.argv.find((a, i) => i > 0 && process.argv[i - 1] === '--file');
const API_KEY = process.env.ANTHROPIC_API_KEY;

if (!API_KEY) {
  console.error('Error: ANTHROPIC_API_KEY environment variable is required.');
  console.error('Set it with: set ANTHROPIC_API_KEY=sk-ant-...');
  process.exit(1);
}

// ─── Claude API call ─────────────────────────────────────────────────────────

function callClaude(prompt) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 300,
      messages: [{ role: 'user', content: prompt }],
    });

    const options = {
      hostname: 'api.anthropic.com',
      port: 443,
      path: '/v1/messages',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
        'anthropic-version': '2023-06-01',
        'Content-Length': Buffer.byteLength(body),
      },
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.error) {
            reject(new Error(json.error.message || JSON.stringify(json.error)));
          } else {
            const text = json.content?.[0]?.text || '';
            resolve(text.trim());
          }
        } catch (e) {
          reject(new Error('Failed to parse API response: ' + data.substring(0, 200)));
        }
      });
    });

    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

// ─── Parse highlight from a .ts file ─────────────────────────────────────────

function extractTourMeta(text) {
  const titleMatch = /heroTitle:\s*"([^"]*)"/.exec(text) || /heroTitle:\s*"((?:[^"\\]|\\.)*)"/.exec(text);
  const slugMatch = /slug:\s*"([^"]*)"/.exec(text);
  const title = titleMatch ? titleMatch[1] : '';
  const slug = slugMatch ? slugMatch[1] : '';

  // Guess city and country from title
  // e.g. "Aachen, Germany Christmas Market Evening Walk (2024)"
  const cityCountryMatch = /^([^,]+),\s*(\w+)/.exec(title);
  const city = cityCountryMatch ? cityCountryMatch[1] : '';
  const country = cityCountryMatch ? cityCountryMatch[2] : '';

  return { title, slug, city, country };
}

function findEmptyHighlights(text) {
  // Find highlights with description: ""
  const results = [];
  const re = /\{\s*title:\s*"((?:[^"\\]|\\.)*)"\s*,\s*timeLabel:\s*"([^"]*)"\s*,\s*seconds:\s*(\d+)\s*,\s*imageSrc:[^,]*,\s*alt:\s*"((?:[^"\\]|\\.)*)"\s*,\s*caption:\s*"((?:[^"\\]|\\.)*)"\s*,\s*description:\s*""\s*\}/g;
  let m;
  while ((m = re.exec(text)) !== null) {
    results.push({
      fullMatch: m[0],
      title: m[1],
      timeLabel: m[2],
      seconds: parseInt(m[3], 10),
      alt: m[4],
      caption: m[5],
      index: m.index,
    });
  }
  return results;
}

// ─── Build prompt ────────────────────────────────────────────────────────────

function buildPrompt(tourTitle, city, country, highlight) {
  return `You are writing metadata for a 4K walking tour video page. Generate exactly three fields for this video highlight.

Tour: ${tourTitle}
City: ${city}, ${country}
Landmark/Location: ${highlight.title}
Timestamp: ${highlight.timeLabel}

Generate these three fields as JSON (no markdown, no code fences, just raw JSON):
{
  "description": "1-2 sentence description of what the viewer sees at this moment in the walk. Be specific to this landmark. Evocative but factual, present tense. Never start with I or You. Match this style: 'Produce stalls and market traffic create one of Naples' liveliest everyday street scenes.' and 'This narrow old-town artery slices straight through the dense historic center.'",
  "caption": "4-6 word label for this highlight, like 'Facade of Santa Chiara' or 'Street scene on Spaccanapoli'",
  "alt": "Screen reader alt text in format: '[Landmark] in [City], [Country] — [brief visual description]'"
}

Return ONLY the JSON object, nothing else.`;
}

// ─── Delay helper ────────────────────────────────────────────────────────────

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  const files = singleFileArg
    ? [`${singleFileArg}.ts`]
    : fs.readdirSync(DETAIL_DIR).filter(f => f.endsWith('.ts')).sort();

  console.log(`\n${'═'.repeat(60)}`);
  console.log(`  generate-highlight-descriptions${dryRun ? '  [DRY RUN]' : ''}`);
  console.log(`${'═'.repeat(60)}`);
  console.log(`  Files to check: ${files.length}\n`);

  let totalFilled = 0;
  let totalSkipped = 0;
  let totalErrors = 0;

  for (const file of files) {
    const filePath = path.join(DETAIL_DIR, file);
    if (!fs.existsSync(filePath)) {
      console.log(`  ⚠ File not found: ${file}`);
      continue;
    }

    const text = fs.readFileSync(filePath, 'utf8');
    const meta = extractTourMeta(text);
    const emptyHighlights = findEmptyHighlights(text);

    if (emptyHighlights.length === 0) {
      totalSkipped++;
      continue;
    }

    console.log(`\n  📄 ${file} — ${emptyHighlights.length} empty highlights`);

    let updatedText = text;
    let filledInFile = 0;

    for (const hl of emptyHighlights) {
      const prompt = buildPrompt(meta.title, meta.city, meta.country, hl);

      try {
        if (dryRun) {
          console.log(`    [DRY] Would generate for: "${hl.title}" @ ${hl.timeLabel}`);
          const response = await callClaude(prompt);
          let parsed;
          try {
            parsed = JSON.parse(response);
          } catch {
            console.log(`    ⚠ Failed to parse response: ${response.substring(0, 100)}`);
            totalErrors++;
            continue;
          }
          console.log(`    description: "${parsed.description}"`);
          console.log(`    caption: "${parsed.caption}"`);
          console.log(`    alt: "${parsed.alt}"`);
          filledInFile++;
        } else {
          process.stdout.write(`    "${hl.title}" @ ${hl.timeLabel} … `);
          const response = await callClaude(prompt);
          let parsed;
          try {
            parsed = JSON.parse(response);
          } catch {
            console.log(`⚠ parse error`);
            totalErrors++;
            continue;
          }

          // Escape for TypeScript string
          const safeDesc = parsed.description.replace(/"/g, '\\"');
          const safeCap = parsed.caption.replace(/"/g, '\\"');
          const safeAlt = parsed.alt.replace(/"/g, '\\"');

          // Build replacement with filled fields
          const replacement = hl.fullMatch
            .replace(/alt:\s*"(?:[^"\\]|\\.)*"/, `alt: "${safeAlt}"`)
            .replace(/caption:\s*"(?:[^"\\]|\\.)*"/, `caption: "${safeCap}"`)
            .replace(/description:\s*""/, `description: "${safeDesc}"`);

          updatedText = updatedText.replace(hl.fullMatch, replacement);
          console.log('✓');
          filledInFile++;
        }

        // Rate limit: small delay between API calls
        await delay(500);
      } catch (err) {
        console.log(`⚠ API error: ${err.message}`);
        totalErrors++;
      }
    }

    if (!dryRun && filledInFile > 0) {
      fs.writeFileSync(filePath, updatedText, 'utf8');
      console.log(`    ✓ Wrote ${filledInFile} descriptions to ${file}`);
    }

    totalFilled += filledInFile;
  }

  console.log(`\n${'═'.repeat(60)}`);
  console.log(`  Done`);
  console.log(`  Filled: ${totalFilled}`);
  console.log(`  Skipped (already has descriptions): ${totalSkipped}`);
  console.log(`  Errors: ${totalErrors}`);
  console.log(`${'═'.repeat(60)}\n`);
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
