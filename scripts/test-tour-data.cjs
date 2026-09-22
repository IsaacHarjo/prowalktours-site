// Run with node scripts/test-tour-data.cjs. Uses the project's TypeScript
// compiler to test the actual server loader without a Next.js browser bundle.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const cache = new Map();
function load(relativePath) {
  let file = path.resolve(relativePath);
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

const core = load('lib/tours/core.ts');
const data = load('lib/tours/server.ts');
const { withWatchTimestamp } = load('lib/tours/links.ts');
assert.equal(data.tours.length, 449, 'Review this baseline when importing new tours');
assert.equal(data.publicTours.length, 427);
assert.deepEqual(new Set(data.worldTours.map(t => t.tourId)), new Set(data.discoveryVideos.map(v => v.id)));
assert.equal(data.publicTours.filter(t => t.themes.includes('christmas-market')).length, 35);
assert.equal(data.tours.find(t => t.tourId === 'de-0009').youtubeAvailability, 'members-only');
assert.equal(data.tours.find(t => t.tourId === 'de-0018').youtubeAvailability, 'members-only');
assert(!data.discoveryVideos.some(v => ['de-0009', 'de-0018', 'it-0373'].includes(v.id)));
assert.equal(data.publicTours.find(t => t.tourId === 'it-0091').watchHref, '/videos/naples-night-walk-2025');
assert.equal(data.publicTours.find(t => t.tourId === 'it-0092').watchHref, '/videos/naples-daytime-walk-2023');
assert.equal(data.publicTours.find(t => t.tourId === 'it-0001').watchDestinationType, 'youtube');
assert.equal(data.publicTours.find(t => t.tourId === 'it-0374').distanceMiles, 5.5);
assert.equal(data.publicTours.find(t => t.tourId === 'it-0375').distanceKm, 5);
assert(data.publicTours.find(t => t.tourId === 'fr-0013').keywords.includes('Van Gogh Arles'));
for (const video of data.discoveryVideos) {
  if (video.watchDestinationType === 'internal-page') {
    assert(fs.existsSync(path.join('app/videos', video.slug, 'page.tsx')), video.slug);
  } else assert(core.youtubeIdFromUrl(video.watchHref), video.slug);
}
for (const hit of data.searchHits) {
  assert(data.publicTours.some(t => t.tourId === hit.tour_id && t.slug === hit.slug));
}

const sourceRows = core.parseTourCsv(fs.readFileSync('data/maps/italy.csv', 'utf8'), 'test.csv');
const original = sourceRows[0];
function build(changes = {}, editorial = [], pages = new Set()) {
  return core.buildTours([{source: 'test.csv', rows: [{...original, ...changes}]}], editorial, pages)[0];
}
assert(!core.isPublicTour(build({status: 'draft'})), 'Draft with URL stays private');
assert(!core.isPublicTour(build({youtube_availability: 'unpublished'})), 'Unpublished stays private');
assert(!core.isPublicTour(build({youtube_availability: 'members-only'})));
assert(!core.isPublicTour(build({youtube_availability: 'unavailable'})));
assert(!core.isPublicTour(build({youtube_availability: 'unknown'})));
assert.equal(build({latitude: '0', longitude: '0'}).latitude, 0, 'Zero is a valid coordinate');
assert.equal(build({latitude: '', longitude: ''}).latitude, null);
assert.throws(() => build({latitude: '91'}), /coordinate/);
assert.throws(() => build({latitude: '', longitude: '10'}), /coordinate/);
assert.throws(() => build({filmed_date_iso: '2026-02-30'}), /filming date/);
assert.throws(() => build({youtube_url: 'https://example.com/watch?v=abcdefghijk'}), /YouTube/);
assert.throws(() => build({status: 'ready', youtube_url: ''}), /YouTube/);
assert.throws(() => build({status: 'typo'}), /status/);
assert.throws(() => build({production_stage: 'typo'}), /production stage/);
assert.equal(build({duration_seconds: '6,670.00'}).durationSeconds, 6670);
assert.deepEqual(core.normalizeCategories(['Christmas Markets', 'christmas-market']), ['christmas-market']);
assert.throws(() => core.buildTours([{source: 'duplicate', rows: [original, original]}], [], new Set()), /duplicate/);
const legacy = load('data/videos/index.ts').videos;
const naples = sourceRows.find(r => r.tour_id === 'it-0091');
const preserved = core.buildTours([{source:'fresh-export',rows:[{...naples,slug_override:''}]}],legacy,new Set(['naples-night-walk-2025']));
assert.equal(preserved[0].slug,'naples-night-walk-2025','Missing Sheet override cannot rename a live page');
const newTour = build({tour_id:'it-9999',slug:'new-tour',slug_override:'',youtube_url:'https://youtu.be/abcdefghijk'});
assert(core.isPublicTour(newTour));
assert.equal(newTour.watchHref,'https://www.youtube.com/watch?v=abcdefghijk');
assert.equal(withWatchTimestamp('/videos/test',1192),'/videos/test?t=1192');
assert.equal(withWatchTimestamp('https://youtu.be/abcdefghijk?t=3',1192),'https://youtu.be/abcdefghijk?t=1192');
assert.equal(withWatchTimestamp('https://www.youtube.com/embed/abcdefghijk',0),'https://www.youtube.com/embed/abcdefghijk?start=0');
const csv = '\uFEFFtour_id,slug,country,title,youtube_url,status,latitude,longitude\r\nit-test,test,Italy,"A, quoted ""title""\nsecond line",,draft,,\r\n';
assert.equal(core.parseTourCsv(csv,'quoted.csv')[0].title,'A, quoted "title"\nsecond line');
assert.throws(() => core.parseTourCsv('tour_id,slug\n1,test','bad.csv'),/missing/);
assert.throws(() => core.parseTourCsv(csv+'"unfinished','bad.csv'),/unclosed/);
console.log('PASS: 449 records; 427 shared map/search tours; 35 Christmas tours; routing, privacy, IDs, categories and validation checks.');
