const fs = require('node:fs');
const sharp = require('sharp');
const load = require('./lib/load-typescript.cjs');
const { worldTours } = load('lib/tours/server.ts');
const { mapThumbnailSources } = load('lib/tours/thumbnails.ts');

async function main() {
  const results = [];
  let next = 0;
  async function worker() {
    while (next < worldTours.length) {
      const tour = worldTours[next++];
      const checks = [];
      for (const url of mapThumbnailSources(tour.youtubeUrl)) {
        const response = await fetch(url, { signal: AbortSignal.timeout(20000) });
        if ([403, 429].includes(response.status)) throw new Error(`Service refused audit: HTTP ${response.status}`);
        const metadata = response.ok ? await sharp(Buffer.from(await response.arrayBuffer())).metadata() : {};
        const ok = response.ok && metadata.width > 120 && metadata.height > 90;
        checks.push({ url, status: response.status, width: metadata.width, height: metadata.height, ok });
        if (ok) break;
      }
      results.push({ tourId: tour.tourId, title: tour.title, watchHref: tour.watchHref, checks, ok: checks.some(check => check.ok) });
      if (results.length % 100 === 0) console.log(`Checked ${results.length}/${worldTours.length}`);
    }
  }
  await Promise.all(Array.from({ length: 4 }, worker));
  results.sort((a, b) => a.tourId.localeCompare(b.tourId));
  const report = { checkedAt: new Date().toISOString(), total: results.length, passed: results.filter(r => r.ok).length, results };
  fs.writeFileSync('docs/map-import/thumbnail-audit.json', JSON.stringify(report, null, 2) + '\n');
  console.log(JSON.stringify({ total: report.total, passed: report.passed, failures: results.filter(r => !r.ok) }, null, 2));
  if (report.passed !== report.total) process.exitCode = 1;
}
main().catch(error => { console.error(error); process.exitCode = 1; });
