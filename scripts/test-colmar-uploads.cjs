const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const load = require('./lib/load-typescript.cjs');
const { PROWALK_CHANNEL_ID } = load('lib/youtube/latestWalk.ts');
const { colmarUploadsFromFeed, mergeColmarUploads, validateColmarArchive } = load('lib/youtube/colmarWalks.ts');
const { guideVideoCards } = load('lib/youtube/guideWalks.ts');
const { syncColmarUploads } = require('./sync-colmar-uploads.cjs');
const now = Date.parse('2026-11-29T12:00:00Z');
const entry = (id, title, date = '2026-11-28T14:00:00Z', channel = PROWALK_CHANNEL_ID, description = 'My walk.') => `<entry><yt:videoId>${id}</yt:videoId><yt:channelId>${channel}</yt:channelId><title>${title}</title><published>${date}</published><media:description>${description}</media:description></entry>`;
const feed = entries => `<feed><yt:channelId>${PROWALK_CHANNEL_ID}</yt:channelId>${entries}</feed>`;
const player = (id, seconds) => `var ytInitialPlayerResponse = ${JSON.stringify({playabilityStatus: {status: 'OK'}, videoDetails: {videoId: id, channelId: PROWALK_CHANNEL_ID, lengthSeconds: String(seconds)}})};`;

async function main() {
  const xml = feed([
    entry('colmar00001', 'Colmar Christmas Market | 4K Walking Tour'),
    entry('colmar00002', 'COLMAR, France — An evening in the old town', '2026-11-27'),
    entry('shorts00001', 'Colmar lights'),
    entry('labeled0001', 'Colmar #shorts'),
    entry('future00001', 'Colmar Christmas Market', '2099-11-28'),
    entry('unknown0001', 'Colmar canals'),
    entry('other000001', 'Strasbourg Christmas Market', '2026-11-28', PROWALK_CHANNEL_ID, 'Visit Colmar next!'),
    entry('other000002', 'Colmar Christmas Market', '2026-11-28', 'other-channel'),
    entry('nomatch0001', 'Colmarino walking tour'),
    entry('trailer0001', 'Colmar trailer'),
  ].join(''));
  const requested = [];
  const uploads = await colmarUploadsFromFeed(xml, async id => {
    requested.push(id);
    return id === 'shorts00001' ? 180 : id === 'unknown0001' ? null : 6420;
  }, now);
  assert.deepEqual(uploads.map(w => new URL(w.youtubeUrl).searchParams.get('v')), ['colmar00001', 'colmar00002']);
  assert.deepEqual(requested.sort(), ['colmar00001', 'colmar00002', 'shorts00001', 'unknown0001']);
  assert.equal(uploads[0].publishedAt, '2026-11-28T14:00:00.000Z');
  assert.deepEqual(validateColmarArchive(uploads, now), uploads);
  assert.deepEqual(mergeColmarUploads(uploads, []), uploads, 'Leaving the feed must not remove a discovered video');
  assert.equal(mergeColmarUploads(uploads, uploads).length, 2);
  for (const invalid of [null, [{...uploads[0], durationSeconds: 180}], [{...uploads[0], publishedAt: '2099-01-01'}], [{...uploads[0], youtubeUrl:'https://example.com/video'}], [uploads[0],uploads[0]]]) {
    assert.throws(() => validateColmarArchive(invalid, now));
  }

  const catalog = [{id: 'fr-test', youtubeId: 'colmar00002', slug: 'colmar-evening', videoType: 'evening-walk', filmedYear: 2025,
    siteTitle: 'My Colmar evening walk', thumbnail: '/existing.webp', durationLabel: '1:47:00', watchHref: '/videos/colmar-evening', watchDestinationType: 'internal-page'}];
  const cards = guideVideoCards(catalog, [...uploads, uploads[0]]);
  assert.equal(cards.length, 2, 'Catalog and feed copies of a video appear once');
  assert.equal(cards[0].label, uploads[0].siteTitle);
  assert.equal(cards[0].context, 'Published 28 Nov 2026', 'Never call publication year a filming year');
  assert.equal(cards[0].durationLabel, '1:47:00');
  assert.equal(cards[0].watchDestinationType, 'youtube');
  assert.equal(cards[1].watchHref, '/videos/colmar-evening', 'Keep enriched internal page links when cataloged');
  assert.equal(cards[1].context, 'Filmed in 2025');
  assert.deepEqual(guideVideoCards(catalog)[0], cards[1], 'Existing guide cards remain unchanged without automatic uploads');

  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'prowalk-colmar-'));
  const archivePath = path.join(directory, 'uploads.json');
  fs.writeFileSync(archivePath, '[]\n');
  try {
    let feedXml = feed(entry('colmar00001', 'Colmar Christmas Market'));
    let fail = false;
    let metadataReads = 0;
    const fetcher = async url => {
      if (fail) throw new Error('offline');
      const id = new URL(url).searchParams.get('v');
      if (id) metadataReads++;
      return {ok:true, text: async () => id ? player(id, 6420) : feedXml};
    };
    assert.equal((await syncColmarUploads({archivePath, fetcher, now, dryRun:true})).added, 1);
    assert.equal(fs.readFileSync(archivePath, 'utf8'), '[]\n', 'Dry run never writes');
    assert.equal((await syncColmarUploads({archivePath, fetcher, now})).added, 1);
    const saved = fs.readFileSync(archivePath, 'utf8');
    const reads = metadataReads;
    assert.equal((await syncColmarUploads({archivePath, fetcher, now})).changed, false, 'Repeated discovery is idempotent');
    assert.equal(metadataReads, reads, 'Reuse already verified duration for saved public feed entries');
    let feedAttempts = 0;
    const transientFetcher = async url => {
      if (!new URL(url).searchParams.has('v') && ++feedAttempts < 3) return { ok: false, status: 503 };
      return fetcher(url);
    };
    assert.equal((await syncColmarUploads({archivePath, fetcher: transientFetcher, now})).changed, false);
    assert.equal(feedAttempts, 3, 'Retry temporary YouTube 503 responses before failing the sync');
    feedXml = feed(entry('other000001', 'Strasbourg Christmas Market'));
    assert.equal((await syncColmarUploads({archivePath, fetcher, now})).total, 1);
    assert.equal(fs.readFileSync(archivePath, 'utf8'), saved);
    fail = true;
    await assert.rejects(syncColmarUploads({archivePath, fetcher, now}), /offline/);
    assert.equal(fs.readFileSync(archivePath, 'utf8'), saved, 'Network failure never erases the archive');
    fail = false;
    feedXml = '<html>Consent</html>';
    await assert.rejects(syncColmarUploads({archivePath, fetcher, now}), /Unexpected/);
    assert.equal(fs.readFileSync(archivePath, 'utf8'), saved);
  } finally { fs.unlinkSync(archivePath); fs.rmdirSync(directory); }
  console.log('Colmar automatic uploads: public scope, Shorts exclusion, persistence, deduplication, dates, and safe sync passed.');
}
main().catch(error => {console.error(error); process.exitCode = 1;});
