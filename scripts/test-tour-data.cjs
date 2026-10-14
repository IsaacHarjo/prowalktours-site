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

const core = load('lib/tours/core.ts');
const data = load('lib/tours/server.ts');
const { withWatchTimestamp } = load('lib/tours/links.ts');
const christmas = load('lib/christmas/catalog.ts');
const christmasWalks = christmas.buildChristmasCatalog(data.discoveryVideos, data.worldTours);
const orientation = load('lib/christmas/orientation.ts');
const guideLinks = load('lib/christmas/guide-links.ts');
const regionTowns = load('lib/christmas/colmar-region-towns.json');
for (const city of ['Colmar', 'Ribeauvillé', 'Kaysersberg', 'Riquewihr', 'Strasbourg', 'Basel']) {
  const places = orientation.buildAlsacePlaces(data.worldTours, christmasWalks, city);
  const stages = orientation.buildOrientationStages(places, city);
  const focus = places.find(place => place.city === city);
  const [[west, south], [east, north]] = stages[2].bounds;
  const mercatorY = lat => Math.log(Math.tan(Math.PI / 4 + lat * Math.PI / 360));
  assert(Math.abs((west + east) / 2 - focus.longitude) < 1e-9, `${city}: final longitude centers on its own pin`);
  assert(Math.abs((mercatorY(south) + mercatorY(north)) / 2 - mercatorY(focus.latitude)) < 1e-9, `${city}: final latitude centers visually in Mercator`);
  assert(stages[2].label.includes(city));
  assert(fs.existsSync(path.join('app', guideLinks.christmasMarketHref(city), 'page.tsx')));
  for (const linkedCity of ['Strasbourg', 'Basel']) {
    const place = places.find(place => place.city === linkedCity);
    assert(place.marketGuide && !place.external);
    assert.equal(place.href, linkedCity === city ? '#market-films' : guideLinks.christmasMarketHref(linkedCity));
  }
  if (regionTowns.some(town => town.city === city)) {
    assert.equal(stages[2].outline, 'colmar');
    assert(regionTowns.every(town => town.longitude >= west && town.longitude <= east && town.latitude >= south && town.latitude <= north), `${city}: retain all ten regional towns`);
  }
  assert.equal(places.find(place => place.city === 'Basel').country, 'Switzerland');
}
assert.equal(christmasWalks.length, 44);
assert(!christmasWalks.some(w => ['de-0009', 'de-0018'].includes(w.id)));
const selectChristmas = (filters) => christmas.filterChristmasWalks(christmasWalks, { ...christmas.emptyChristmasFilters, ...filters });
assert.equal(selectChristmas({ country: 'France' }).length, 12);
assert.equal(selectChristmas({ country: 'Germany', region: 'Bavaria', year: '2022' }).length, 2);
assert.equal(selectChristmas({ query: 'ribeauville' }).length, 2, 'Accent-insensitive destination search');
assert.equal(selectChristmas({ country: 'Italy', city: 'Colmar' }).length, 0);
assert.equal(selectChristmas({ query: 'no-such-market-zzzz' }).length, 0);
assert.equal(christmas.buildChristmasCatalog(data.discoveryVideos, []).length, 44, 'Missing coordinates must not remove searchable Christmas walks');
assert.equal(christmas.buildChristmasCatalog(data.discoveryVideos, []).find(w => w.id === 'hu-0002').filmedYear, null, 'An unverified filming date stays unknown');
assert(fs.existsSync(path.join('public', christmas.christmasHero.src)));
assert.equal(data.tours.length, 561, 'Review this baseline when importing new tours');
assert.equal(data.publicTours.length, 539);
assert.deepEqual(new Set(data.worldTours.map(t => t.tourId)), new Set(data.discoveryVideos.map(v => v.id)));
assert.equal(data.publicTours.filter(t => t.themes.includes('christmas-market')).length, 44);
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
// Guide references must survive catalogue refreshes and resolve only to public films.
const { colmarGuide } = load('lib/christmas/colmar.ts');
const { colmarPhotos } = load('lib/christmas/colmar-photos.ts');
const { colmar2026 } = load('lib/christmas/seasons/colmar-2026.ts');
assert.equal(core.youtubeIdFromUrl(data.discoveryVideos.find(w => w.id === 'fr-0026').youtubeUrl), 'NMQ4Sy3e-Ec');
assert.equal(core.youtubeIdFromUrl(data.discoveryVideos.find(w => w.id === 'fr-0027').youtubeUrl), 'kjY8okFmuZo');
for (const moment of [...colmarGuide.moments, colmarGuide.fieldNote]) {
  const walk = christmasWalks.find(w => w.id === moment.tourId);
  assert(walk, `Missing public guide film: ${moment.tourId}`);
  assert(moment.seconds >= 0 && moment.seconds < walk.durationSeconds, `Timestamp outside ${walk.slug}`);
  assert(fs.existsSync(path.join('app/videos', walk.slug, 'page.tsx')));
  assert.equal(new URL(withWatchTimestamp(walk.watchHref, moment.seconds), 'https://www.prowalktours.com').searchParams.get('t'), String(moment.seconds));
}
for (const photo of Object.values(colmarPhotos)) {
  assert(fs.existsSync(path.join('public', photo.src)), `Missing guide image: ${photo.src}`);
  assert(fs.statSync(path.join('public', photo.src)).size < 600000, `Unoptimized guide image: ${photo.src}`);
}
assert.equal(colmar2026.year, 2026);
assert.equal(colmar2026.checkedOn, '2026-10-13');
const { colmarMap } = load('lib/christmas/colmar-map.ts');
assert.equal(colmarMap.routes.length, 2);
assert.deepEqual(colmarMap.stops.filter(stop => stop.marketIndex !== undefined).map(stop => stop.marketIndex).sort(), [0, 1, 2, 3, 4, 5]);
for (const route of colmarMap.routes) {
  assert(christmasWalks.some(walk => walk.id === route.tourId));
  const sourceFile = route.tourId === 'fr-0027' ? 'colmar-day-2023' : 'colmar-evening-2023';
  const sourceXml = fs.readFileSync(`docs/christmas-markets/routes/${sourceFile}.kml`, 'utf8');
  const sourceCoordinates = sourceXml.match(/<LineString>[\s\S]*?<coordinates>([\s\S]*?)<\/coordinates>/)[1]
    .trim().split(/\s+/).map(point => point.split(',').slice(0, 2).map(Number));
  assert.deepEqual(route.coordinates, sourceCoordinates, 'Preserve every original route coordinate, in order');
  for (const [lng, lat] of [...route.coordinates, ...route.points.map(point => point.coordinates)]) {
    assert(lng > 7.34 && lng < 7.38 && lat > 48.06 && lat < 48.09, 'Route coordinate outside Colmar');
  }
}
for (const stop of colmarMap.stops) {
  if (stop.photo) assert(fs.existsSync(path.join('public', stop.photo.src)));
  for (const moment of stop.moments) {
    const walk = christmasWalks.find(walk => walk.id === moment.tourId);
    assert(walk && moment.seconds >= 0 && moment.seconds < walk.durationSeconds, 'Invalid map video timestamp');
  }
}
const { colmarVisitorMap } = load('lib/christmas/colmar-visitor-map.ts');
const { walkingDistanceKm } = load('lib/guides/visitor-map-types.ts');
const visitorSource = load('lib/christmas/colmar-visitor-route.json');
const visitorKml = fs.readFileSync('docs/christmas-markets/routes/colmar-visitor-walk.kml', 'utf8');
const visitorLines = [...visitorKml.matchAll(/<LineString>[\s\S]*?<coordinates>([\s\S]*?)<\/coordinates>[\s\S]*?<\/LineString>/g)]
  .map(match => match[1].trim().split(/\s+/).map(point => point.split(',').slice(0, 2).map(Number)));
assert.deepEqual([colmarVisitorMap.route, colmarVisitorMap.stationApproach], visitorLines, 'Preserve both owner-drawn visitor paths without simplifying or reversing');
assert.deepEqual(colmarVisitorMap.stationApproach.at(-1), colmarVisitorMap.route[0], 'Station approach must connect to visitor route');
assert.deepEqual(colmarVisitorMap.stops.filter(stop => stop.category === 'market').map(stop => stop.marketNumber), [1, 2, 3, 4, 5, 6]);
assert.equal(colmarVisitorMap.stops.filter(stop => stop.category === 'photo').length, 4);
assert.equal(new Set(colmarVisitorMap.stops.map(stop => stop.id)).size, colmarVisitorMap.stops.length);
for (const stop of colmarVisitorMap.stops) {
  assert(visitorSource.points.some(point => JSON.stringify(point.coordinates) === JSON.stringify(stop.coordinates)), `Visitor stop ${stop.id} must retain the owner's coordinates`);
  if (stop.photo) assert(fs.existsSync(path.join('public', stop.photo.src)));
  assert(stop.text.length > 0);
}
assert(walkingDistanceKm(colmarVisitorMap.route) > 4.8 && walkingDistanceKm(colmarVisitorMap.route) < 5);
assert(walkingDistanceKm(colmarVisitorMap.stationApproach) > 0.8 && walkingDistanceKm(colmarVisitorMap.stationApproach) < 0.9);
assert.equal(walkingDistanceKm([[7, 48], [7, 48]]), 0);
assert(Math.abs(walkingDistanceKm([[0, 0], [0, 1]]) - 111.195) < 0.01);
const sitemap = load('app/sitemap.ts').default();
assert.equal(sitemap.filter(entry => entry.url.endsWith('/christmas-markets/colmar')).length, 1);
assert(!sitemap.some(entry => entry.url.includes('home-preview')));
console.log('PASS: 561 records; 539 shared map/search tours; 44 Christmas tours; Colmar film links, timestamps, photos, sitemap and data validation.');
