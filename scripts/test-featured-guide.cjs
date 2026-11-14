const assert = require('node:assert/strict');
const load = require('./lib/load-typescript.cjs');
const { guideForFeaturedVideo: guide } = load('lib/youtube/featuredGuide.ts');
const { tours } = load('lib/tours/server.ts');
const { baselWalks } = load('lib/christmas/basel.ts');
const records = [...tours, ...baselWalks];
assert.equal(guide('https://youtu.be/yWwK6emeRqY', records).href, '/christmas-markets/riquewihr');
assert.equal(guide('https://www.youtube.com/watch?v=uH54xuhW6U4', records).href, '/christmas-markets/basel');
assert.equal(guide(undefined, records), undefined);
assert.equal(guide('https://youtu.be/unknown0001', records), undefined);
assert.equal(guide('invalid', records), undefined);
for (const [city, themes] of [['Freiburg', ['christmas-market']], ['Riquewihr', []]]) {
  assert.equal(guide('https://youtu.be/testvideo01', [{ youtubeUrl: 'https://youtu.be/testvideo01', city, themes }]), undefined);
}
console.log('Featured guide: known related ready guides only; Riquewihr and Basel passed.');
