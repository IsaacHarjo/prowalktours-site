const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const load = require('./lib/load-typescript.cjs');
const { PROWALK_CHANNEL_ID, publicReleaseFromWatchPage } = load('lib/youtube/latestWalk.ts');
const { freiburgUploadsFromFeed, discoverFreiburgRelease, validateFreiburgArchive } = load('lib/youtube/freiburgWalks.ts');
const { syncFreiburgUploads } = require('./sync-freiburg-uploads.cjs');
const release = require('../data/youtube/freiburg-release.json');
const now = Date.parse('2026-12-02T18:00:00Z');
const nextCache = require('next/cache');
const originalCache = nextCache.unstable_cache;
nextCache.unstable_cache = fn => fn;
const server = load('lib/youtube/server.ts');
nextCache.unstable_cache = originalCache;
// Test against isolated archives: tomorrow's discoveries must not alter these fixtures.
const getGuide = (archive = []) => server.getFreiburgWalks([], archive);
const savedColmar = {youtubeUrl:'https://www.youtube.com/watch?v=mU3EWN1qY3U', thumbnail:'https://i.ytimg.com/vi/mU3EWN1qY3U/hqdefault.jpg', siteTitle:'Colmar Christmas Market', shortDescription:'My walk.', publishedAt:'2026-11-28', durationSeconds:7999};
const getHome = async () => server.getNewestWalk(undefined, [], [savedColmar, ...await getGuide()]);
const entry = (id, title, date = '2026-12-02', channel = PROWALK_CHANNEL_ID) => `<entry><yt:videoId>${id}</yt:videoId><yt:channelId>${channel}</yt:channelId><title>${title}</title><published>${date}</published><media:description>My Freiburg trip.</media:description></entry>`;
const feed = entries => `<feed><yt:channelId>${PROWALK_CHANNEL_ID}</yt:channelId>${entries}</feed>`;
const player = (details = {}, privacy = {}, status = 'OK') => `var ytInitialPlayerResponse = ${JSON.stringify({
  playabilityStatus: {status},
  videoDetails: {videoId: release.videoId, channelId: PROWALK_CHANNEL_ID, title: 'Freiburg Christmas Market', shortDescription: 'My walk.', lengthSeconds:'6520', isPrivate:false, ...details},
  microformat: {playerMicroformatRenderer: {isUnlisted:false, publishDate:'2026-11-25', ...privacy}},
})};`;

async function main() {
  const originalFetch = global.fetch, originalNow = Date.now;
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'prowalk-freiburg-'));
  const archivePath = path.join(directory, 'uploads.json');
  fs.writeFileSync(archivePath, '[]\n');
  try {
    const published = publicReleaseFromWatchPage(player(), release.videoId, release.publicReleaseDate, now);
    assert.equal(published.publishedAt, '2026-12-02', 'Use the supplied public release day, not the earlier members date');
    for (const html of [player({}, {}, 'UNPLAYABLE'), player({}, {}, 'LOGIN_REQUIRED'), player({isPrivate:true}),
      player({}, {isUnlisted:true}), player({}, {isUnlisted:undefined}), player({isUpcoming:true}), player({isLive:true}),
      player({channelId:'other'}), player({videoId:'4bQoSIwQHZM'}), player({lengthSeconds:'180'}), player({title:'Freiburg #shorts'}), '<html>Consent</html>']) {
      assert.equal(publicReleaseFromWatchPage(html, release.videoId, release.publicReleaseDate, now), null);
    }
    let requests = 0, html = player({}, {}, 'UNPLAYABLE'), xml = feed(''), offlineFeed = false;
    const fetcher = async url => {
      requests++;
      if (!new URL(url).searchParams.has('v') && offlineFeed) throw new Error('Feed offline');
      return {ok:true, text:async () => new URL(url).searchParams.has('v') ? html : xml};
    };
    assert.deepEqual(await discoverFreiburgRelease(fetcher, Date.parse('2026-11-28')), []);
    assert.equal(requests, 0, 'No early release lookup or display');
    assert.deepEqual(await discoverFreiburgRelease(fetcher, now), [], 'Members-only release remains hidden');
    html = player();
    assert.deepEqual(await discoverFreiburgRelease(fetcher, now), [published]);
    const incoming = await freiburgUploadsFromFeed(feed([
      entry(release.videoId, 'Freiburg Christmas Market', '2026-11-25'),
      entry('4bQoSIwQHZM', 'Freiburg old members upload'),
      entry('freiburg002', 'Freiburg Old Town'), entry('shorts00001', 'Freiburg sights'),
      entry('future00001', 'Freiburg Christmas', '2099-01-01'),
      entry('other000001', 'Colmar Christmas'), entry('other000002', 'Freiburg Christmas', '2026-12-02', 'other'),
    ].join('')), async id => id === 'shorts00001' ? 180 : 7000, now);
    assert.deepEqual(incoming.map(w => w.youtubeUrl), ['https://www.youtube.com/watch?v=freiburg002']);
    assert.throws(() => validateFreiburgArchive([{...published, youtubeUrl:'https://www.youtube.com/watch?v=4bQoSIwQHZM'}], now));
    assert.equal((await syncFreiburgUploads({archivePath, fetcher, now, dryRun:true})).added, 1);
    assert.equal(fs.readFileSync(archivePath, 'utf8'), '[]\n');
    offlineFeed = true;
    assert.equal((await syncFreiburgUploads({archivePath, fetcher, now})).added, 1, 'Save the publicly verified release even if the feed fails');
    const saved = JSON.parse(fs.readFileSync(archivePath, 'utf8'));
    offlineFeed = false;
    html = '<html>Unavailable</html>';
    assert.equal((await syncFreiburgUploads({archivePath, fetcher, now})).total, 1, 'Later feed disappearance or failed metadata does not erase the archive');
    assert.deepEqual(JSON.parse(fs.readFileSync(archivePath, 'utf8')), saved);

    Date.now = () => now;
    global.fetch = fetcher;
    html = player({}, {}, 'UNPLAYABLE');
    assert.deepEqual(await getGuide(), [], 'Guide stays empty while members-only');
    assert.equal((await getHome()).youtubeUrl, savedColmar.youtubeUrl, 'Members-only release cannot replace Colmar');
    html = player();
    xml = feed(entry(release.videoId, 'Freiburg Christmas Market', '2026-11-25'));
    assert.equal((await getHome()).youtubeUrl, published.youtubeUrl, 'Public release outranks Colmar despite older RSS date');
    assert.equal((await getGuide())[0].youtubeUrl, published.youtubeUrl, 'Same verified release appears on guide');
    offlineFeed = true;
    assert.equal((await getHome()).youtubeUrl, published.youtubeUrl, 'Exact public release works during feed outage');
    assert.equal((await getGuide())[0].youtubeUrl, published.youtubeUrl);
    global.fetch = async () => {throw new Error('Offline');};
    assert.equal((await server.getNewestWalk(undefined, [], saved)).youtubeUrl, published.youtubeUrl, 'Saved Freiburg survives an outage');
    assert.equal((await getGuide(saved))[0].youtubeUrl, published.youtubeUrl, 'Saved guide entry survives an outage too');
  } finally {
    global.fetch = originalFetch; Date.now = originalNow;
    fs.unlinkSync(archivePath); fs.rmdirSync(directory);
  }
  console.log('Freiburg release: public-only verification, members date, homepage/guide agreement, Shorts exclusion and permanent archive passed.');
}
main().catch(error => {console.error(error); process.exitCode = 1;});
