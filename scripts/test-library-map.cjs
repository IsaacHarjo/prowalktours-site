const assert = require('node:assert/strict');
const fs = require('node:fs');
const load = require('./lib/load-typescript.cjs');
const core = load('lib/tours/core.ts');
const data = load('lib/tours/server.ts');
const { toursAtSamePoint } = load('lib/tours/map.ts');
const metadata = require('../docs/map-import/youtube-metadata.json');
const review = require('../docs/map-import/import-review.json');
const routes = require('../docs/map-import/route-points.json');
const proposed = core.parseTourCsv(fs.readFileSync('docs/map-import/proposed-library-additions.csv', 'utf8'), 'proposed');
const imported = core.buildTours([{ source: 'library-additions.csv', rows: proposed }], [], new Set());
assert.equal(imported.length, 112);
assert.equal(imported.filter(t => t.locationAccuracy === 'tour-start').length, 92);
assert.equal(imported.filter(t => t.locationAccuracy === 'original-map-pin').length, 4);
assert.equal(imported.filter(t => t.locationAccuracy === 'approximate-destination').length, 16);
assert.equal(imported.filter(t => t.filmedYear === null).length, 13, 'Do not invent filming dates from upload dates');
for (const tour of imported) {
  assert.equal(metadata[tour.youtubeId].availability, 'public');
  assert.equal(metadata[tour.youtubeId].channel_id, 'UCNzul4dnciIlDg8BAcn5-cQ');
  assert(core.isPublicTour(tour));
  assert.equal(tour.watchDestinationType, 'youtube');
  assert.equal(core.youtubeIdFromUrl(tour.watchHref), tour.youtubeId);
  const evidence = review.find(r => r.id === tour.youtubeId);
  assert.equal(tour.latitude, evidence.latitude);
  assert.equal(tour.longitude, evidence.longitude);
  assert(tour.locationSource && evidence.sourcePages.length);
  if (tour.locationAccuracy === 'tour-start') {
    const starts = routes.find(r => r.id === tour.youtubeId).points.filter(p => /^(?:\d{1,2}:[\d:]+\s+)?start(?:\/end)?(?:\s+\d{1,2}:[\d:]+)?$/i.test(p.name.trim()));
    assert.equal(starts.length, 1);
    assert.equal(tour.latitude, starts[0].latitude);
    assert.equal(tour.longitude, starts[0].longitude);
  }
}
assert(!imported.some(t => t.youtubeId === 'w--o2nK4xQs'), 'Members-only Milan video remains excluded');

const sources = load('lib/tours/countries.ts').tourCountries.filter(c => c.source).map(c => ({ source: c.source, rows: core.parseTourCsv(fs.readFileSync('data/maps/' + c.source, 'utf8'), c.source) }));
const primaryRows = sources.flatMap(s => s.rows);
assert.equal(core.pendingLibraryRows(primaryRows, proposed).length, 112);
const original = proposed[0];
assert.equal(core.pendingLibraryRows([{ ...original, status: 'draft', latitude: '1' }], proposed).length, 111, 'A later master export overrides the import, including draft status');
assert.throws(() => core.pendingLibraryRows([{ ...original, youtube_url: 'https://youtu.be/abcdefghijk' }], proposed), /conflicts/);
assert.throws(() => core.pendingLibraryRows([{ ...original, tour_id: 'new-id' }], proposed), /preserve/);
assert.throws(() => core.buildTours([{source:'bad',rows:[{...original,location_accuracy:'guessed-exact'}]}], [], new Set()), /location accuracy/);
const combined = core.buildTours([...sources, { source: 'library-additions.csv', rows: proposed }], [], new Set());
assert.equal(combined.length, 561);
assert.equal(combined.filter(core.isPublicTour).length, 539);
assert.equal(new Set(combined.filter(core.isPublicTour).map(t => t.country)).size, 24);
for (const row of primaryRows) {
  const tour = combined.find(t => t.tourId === row.tour_id);
  assert.equal(tour.latitude, row.latitude ? Number(row.latitude) : null);
  assert.equal(tour.longitude, row.longitude ? Number(row.longitude) : null);
}
// Coincident points remain discoverable after Mapbox clusters dissolve.
const pin = { ...imported[0], mapGroup: 'USA' };
const duplicate = { ...pin, tourId: 'test-second' };
const elsewhere = { ...pin, tourId: 'test-elsewhere', latitude: pin.latitude + 0.001 };
assert.deepEqual(toursAtSamePoint([pin, duplicate, elsewhere], pin).map(t => t.tourId), [pin.tourId, duplicate.tourId]);
const cairos = imported.filter(t => t.city === 'Cairo' && t.locationAccuracy === 'approximate-destination').map(t => ({ ...t, mapGroup: t.country }));
assert.equal(toursAtSamePoint(cairos, cairos[0]).length, 3);
if (fs.existsSync('data/maps/library-additions.csv')) {
  assert.equal(data.worldTours.length, 539);
  assert.equal(data.discoveryVideos.length, 539);
  assert.equal(data.tours.filter(t => t.sourceFile === 'library-additions.csv').length, 112);
  for (const tour of data.tours.filter(t => t.sourceFile !== 'library-additions.csv')) {
    const row = primaryRows.find(r => r.tour_id === tour.tourId);
    assert(row, 'Existing permanent ID preserved');
    assert.equal(tour.latitude, row.latitude ? Number(row.latitude) : null);
    assert.equal(tour.longitude, row.longitude ? Number(row.longitude) : null);
  }
}
console.log('PASS: 112 verified public additions; 539 tours across 24 countries; provenance, coordinates, shared pins, master precedence and permanent IDs.');
