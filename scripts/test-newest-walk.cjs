const assert = require('node:assert/strict');
const load = require('./lib/load-typescript.cjs');
const { latestWalkFromFeed, PROWALK_CHANNEL_ID } = load('lib/youtube/latestWalk.ts');
const { getNewestWalk } = load('lib/youtube/server.ts');
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
assert.equal(latestWalkFromFeed(entry('valid000001', 'Channel announcement', '2025-01-01')), null);
assert.equal(latestWalkFromFeed(entry('valid000001', 'Walking tour', 'invalid')), null);
(async () => {
  const originalFetch = global.fetch;
  const fallback = { siteTitle: 'Curated walk' };
  try {
    global.fetch = async (url, options) => {
      assert(url.includes(PROWALK_CHANNEL_ID));
      assert.equal(options.next.revalidate, 900);
      return { ok: true, text: async () => feed };
    };
    assert.equal((await getNewestWalk(fallback)).siteTitle, 'New walk & sights');
    global.fetch = async () => ({ ok: false });
    assert.equal(await getNewestWalk(fallback), fallback);
    global.fetch = async () => { throw new Error('offline'); };
    assert.equal(await getNewestWalk(fallback), fallback);
    global.fetch = async () => ({ ok: true, text: async () => '<feed></feed>' });
    assert.equal(await getNewestWalk(fallback), fallback);
  } finally { global.fetch = originalFetch; }
  console.log('Newest-walk selection, public-channel scope, refresh and fallback checks passed.');
})().catch(error => { console.error(error); process.exitCode = 1; });
