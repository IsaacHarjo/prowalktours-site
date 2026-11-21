// Run with node scripts/test-tour-data.cjs. Uses the project's TypeScript
// compiler to test the actual server loader without a Next.js browser bundle.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const cache = new Map();
function load(relativePath) {
  let file = path.resolve(relativePath);
  if (file.endsWith('.json')) return JSON.parse(fs.readFileSync(file, 'utf8'));
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.ts');
  else if (!file.endsWith('.ts')) file += '.ts';
  if (cache.has(file)) return cache.get(file);
  const output = {};
  cache.set(file, output);
  const js = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true },
  }).outputText;
  new Function('exports', 'require', js)(output, (name) => name === 'server-only' ? {}
    : name.startsWith('.') ? load(path.resolve(path.dirname(file), name)) : require(name));
  return output;
}


const data = load('lib/tours/server.ts');
const { applyScheduledRelease } = load('lib/tours/scheduled-releases.ts');
const { buildChristmasCatalog } = load('lib/christmas/catalog.ts');
const releases = load('lib/tours/scheduled-releases.json');
const at = Date.parse('2026-11-21T14:00:00Z');
assert.equal(at, Date.parse('2026-11-21T06:00:00-08:00'));
for (const now of [at - 1, at, at + 1, at + 86400000]) {
 const published = data.getReleasedTours(now);
 const guide = buildChristmasCatalog(data.getReleasedDiscoveryVideos(now), data.worldTours);
 for (const release of releases) {
  assert.equal(published.some(t => t.tourId === release.tourId), now >= at);
  const card = guide.find(t => t.id === release.tourId);
  assert.equal(Boolean(card), now >= at);
  if (card) { assert.equal(card.watchHref, '/videos/' + release.slug); assert.equal(card.watchDestinationType, 'internal-page'); }
 }
 assert(!published.some(t => t.tourId === 'fr-0039'), 'Unrelated Riquewihr draft stays hidden');
}
for (const release of releases) {
 const record = data.tours.find(t => t.tourId === release.tourId);
 assert(record && record.sourceStatus === 'ready', 'Public Strasbourg exports are ready');
 const readyEarly = { ...record, sourceStatus: 'ready', youtubeAvailability: 'public' };
 assert.equal(applyScheduledRelease(readyEarly, at - 1).sourceStatus, 'draft');
 const mismatch = { ...record, youtubeId: 'different' };
 assert.equal(applyScheduledRelease(mismatch, at), mismatch, 'Never release another upload');
 assert(!('productionStage' in data.getReleasedDiscoveryVideos(at).find(t => t.id === record.tourId)), 'Private data must not reach client');
}
for (const route of ['app/christmas-markets/strasbourg/page.tsx', ...releases.map(r => 'app/videos/' + r.slug + '/page.tsx'), 'app/sitemap.ts']) {
 assert.match(fs.readFileSync(route, 'utf8'), /export const dynamic = ['"]force-dynamic['"]/, route + ' must avoid cached pre-release HTML');
}
console.log('PASS: release boundary, guide links, unrelated drafts, identity checks, private-data projection and request-time routes');
