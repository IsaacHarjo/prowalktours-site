const assert = require('node:assert/strict');
const load = require('./lib/load-typescript.cjs');
const { walkCandidatesFromFeed, durationFromWatchPage, isFullLengthWalk, PROWALK_CHANNEL_ID } = load('lib/youtube/latestWalk.ts');
const latestWalkFromFeed = (xml, now) => walkCandidatesFromFeed(xml, now)[0] ?? null;
// Exercise selection and network failures outside Next's request/cache runtime.
const nextCache = require('next/cache');
const originalCache = nextCache.unstable_cache;
let getNewestWalk;
try {
  nextCache.unstable_cache = (fn, keys, options) => {
    assert.equal(options.revalidate, 900);
    return fn;
  };
  ({ getNewestWalk } = load('lib/youtube/server.ts'));
} finally { nextCache.unstable_cache = originalCache; }
const entry = (id, title, date, channel = PROWALK_CHANNEL_ID) => `<entry><yt:videoId>${id}</yt:videoId><yt:channelId>${channel}</yt:channelId><title>${title}</title><published>${date}</published><media:description>A walk &amp; a view.\n\nOther information</media:description></entry>`;
const old = entry('oldwalk0001', 'Old walking tour', '2025-01-01');
const newest = entry('newwalk0001', 'New walk &amp; sights', '2025-02-01');
const feed = `<feed>${newest}${old}${entry('shorts00001', 'Walking #shorts', '2025-03-01')}${entry('future00001', 'Future walk', '2099-01-01')}${entry('other000001', 'Other channel walk', '2025-03-01', 'other')}</feed>`;
assert.equal(latestWalkFromFeed(feed).youtubeUrl, 'https://www.youtube.com/watch?v=newwalk0001');
assert.equal(latestWalkFromFeed(feed).siteTitle, 'New walk & sights');
assert.equal(latestWalkFromFeed(feed).shortDescription, 'A walk & a view.');
assert.equal(latestWalkFromFeed(`<feed>${old}${newest}</feed>`).siteTitle, 'New walk & sights', 'Use publication dates, not XML order');
assert.equal(latestWalkFromFeed('<feed></feed>'), null);
assert.equal(latestWalkFromFeed(entry('bad', 'Walking tour', '2025-01-01')), null);
const riquewihr = entry('yWwK6emeRqY', 'Riquewihr, France Christmas Market | Inside the Shops, Cellars &amp; Courtyards | 4K 🎄', '2026-11-14T14:00:03Z');
const afterPublication = Date.parse('2026-11-14T15:00:00Z');
assert.equal(latestWalkFromFeed(`<feed>${newest}${riquewihr}</feed>`, afterPublication).youtubeUrl, 'https://www.youtube.com/watch?v=yWwK6emeRqY', 'Newest public video does not need walk in its title');
assert.equal(latestWalkFromFeed(entry('valid000001', 'Channel announcement', '2025-01-01')).siteTitle, 'Channel announcement');
for (const title of ['', '   ', 'Riquewihr #shorts', 'Riquewihr trailer', 'Riquewihr teaser']) {
  assert.equal(latestWalkFromFeed(entry('valid000001', title, '2025-01-01')), null);
}
assert.equal(latestWalkFromFeed(entry('valid000001', 'Walking tour', 'invalid')), null);
const playerPage = (id, duration, details = {}, status = 'OK') => `<script>var ytInitialPlayerResponse = ${JSON.stringify({
  playabilityStatus: { status },
  videoDetails: { videoId: id, channelId: PROWALK_CHANNEL_ID, lengthSeconds: String(duration), title: 'A "quoted" title with } and \\ escapes', ...details },
})};</script>`;
assert.equal(durationFromWatchPage(playerPage('newwalk0001', 6420), 'newwalk0001'), 6420);
for (const page of [
  '<html>Consent required</html>', 'var ytInitialPlayerResponse = {broken}',
  'var ytInitialPlayerResponse = {', playerPage('other000001', 6420),
  playerPage('newwalk0001', 6420, { channelId: 'other' }),
  playerPage('newwalk0001', 6420, {}, 'LOGIN_REQUIRED'),
  playerPage('newwalk0001', 6420, { isLive: true }),
  playerPage('newwalk0001', 6420, { isUpcoming: true }),
  playerPage('newwalk0001', 'unknown'),
]) assert.equal(durationFromWatchPage(page, 'newwalk0001'), null);
for (const duration of [0, 59, 60, 179, 180, NaN, Infinity]) assert.equal(isFullLengthWalk(duration), false);
assert.equal(isFullLengthWalk(181), true);

(async () => {
  const originalFetch = global.fetch;
  const fallback = { siteTitle: 'Curated walk', youtubeUrl: 'https://youtu.be/vZZaZuAQZtg', durationSeconds: 6420 };
  try {
    global.fetch = async (url, options) => {
      const id = new URL(url).searchParams.get('v');
      if (id) assert.equal(options.cache, 'no-store');
      else assert.equal(options.next.revalidate, 900);
      return { ok: true, text: async () => id ? playerPage(id, 6420) : feed };
    };
    assert.equal((await getNewestWalk(fallback)).siteTitle, 'New walk & sights');

    const strasbourg = entry('vZZaZuAQZtg', 'Strasbourg Christmas Market at Night', '2026-11-21');
    const recentFeed = `<feed>${entry('HkTYQYNNIpQ', 'France’s Best Christmas Market? 🎄 Strasbourg', '2026-11-23')}${entry('6yxdIuR4g9w', 'When you see a familiar face', '2026-11-22')}${strasbourg}${old}</feed>`;
    let mode = 'normal';
    let feedXml = recentFeed;
    const requests = [];
    global.fetch = async url => {
      requests.push(url);
      const id = new URL(url).searchParams.get('v');
      if (!id) return { ok: true, text: async () => feedXml };
      if (id === 'HkTYQYNNIpQ' && mode === 'offline') throw new Error('timeout');
      if (id === 'HkTYQYNNIpQ' && mode === 'http-error') return { ok: false };
      return { ok: true, text: async () => id === 'HkTYQYNNIpQ' && mode === 'unknown'
        ? '<html>Consent required</html>'
        : playerPage(id, ['HkTYQYNNIpQ', '6yxdIuR4g9w'].includes(id) ? 180 : 6420) };
    };
    for (mode of ['normal', 'offline', 'http-error', 'unknown']) {
      assert.equal((await getNewestWalk(fallback, [fallback])).youtubeUrl, 'https://www.youtube.com/watch?v=vZZaZuAQZtg', 'Skip unlabeled Shorts and unknown durations');
    }
    assert(!requests.some(url => url.includes('watch?v=vZZaZuAQZtg')), 'Reuse verified catalog duration');
    assert(!requests.some(url => url.includes('watch?v=oldwalk0001')), 'Do not fetch metadata for older walks once a catalog walk qualifies');
    feedXml = `<feed>${entry('colmar00001', 'Colmar Christmas Market', '2026-11-23')}${strasbourg}</feed>`;
    assert.equal((await getNewestWalk(fallback, [fallback])).youtubeUrl, 'https://www.youtube.com/watch?v=colmar00001', 'New full-length uploads work before catalog import');
    feedXml = `<feed>${entry('colmar00001', 'Colmar Christmas Market', '2099-11-28')}${strasbourg}</feed>`;
    assert.equal((await getNewestWalk(fallback, [fallback])).youtubeUrl, 'https://www.youtube.com/watch?v=vZZaZuAQZtg', 'Future releases remain excluded');
    feedXml = `<feed>${entry('HkTYQYNNIpQ', 'Unlabeled Short', '2026-11-23')}</feed>`;
    assert.equal(await getNewestWalk(fallback), fallback, 'Only Shorts uses the curated full-length fallback');
    global.fetch = async () => ({ ok: false });
    assert.equal(await getNewestWalk(fallback), fallback);
    global.fetch = async () => { throw new Error('offline'); };
    assert.equal(await getNewestWalk(fallback), fallback);
    global.fetch = async () => ({ ok: true, text: async () => '<feed></feed>' });
    assert.equal(await getNewestWalk(fallback), fallback);
    assert.equal(await getNewestWalk({ ...fallback, durationSeconds: 180 }), undefined, 'Never use a Short as fallback');
  } finally { global.fetch = originalFetch; }
  console.log('Newest-walk selection, public-channel scope, refresh and fallback checks passed.');
})().catch(error => { console.error(error); process.exitCode = 1; });
