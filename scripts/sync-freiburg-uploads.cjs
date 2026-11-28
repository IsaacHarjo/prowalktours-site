// Archive verified public Freiburg uploads before they leave YouTube's recent feed.
// Does not edit the master tour exports or create internal video pages.
const fs = require('node:fs');
const path = require('node:path');
const load = require('./lib/load-typescript.cjs');
const { durationFromWatchPage } = load('lib/youtube/latestWalk.ts');
const { fetchPublicFeed } = load('lib/youtube/publicFeed.ts');
const { freiburgUploadsFromFeed, mergeFreiburgUploads, validateFreiburgArchive, discoverFreiburgRelease } = load('lib/youtube/freiburgWalks.ts');

async function syncFreiburgUploads({ archivePath = path.resolve('data/youtube/freiburg-uploads.json'), fetcher = fetch, dryRun = false, now = Date.now() } = {}) {
  const original = fs.readFileSync(archivePath, 'utf8');
  const saved = validateFreiburgArchive(JSON.parse(original), now);
  // Verify the known members-first release independently of the rolling feed.
  const releaseResult = await Promise.allSettled([discoverFreiburgRelease(fetcher, now), fetchPublicFeed(fetcher)]);
  const [release, feed] = releaseResult;
  if (release.status === 'rejected') throw release.reason;
  if (feed.status === 'rejected' && release.value.length === 0) throw feed.reason;
  const incoming = await freiburgUploadsFromFeed(feed.status === 'fulfilled' ? feed.value : '', async id => {
    const existing = saved.find(walk => walk.youtubeUrl.endsWith(`v=${id}`));
    if (existing) return existing.durationSeconds;
    const page = await fetcher(`https://www.youtube.com/watch?v=${id}`, { signal: AbortSignal.timeout(15000) });
    if (!page.ok) throw new Error(`Cannot verify duration for ${id}: HTTP ${page.status}`);
    const duration = durationFromWatchPage(await page.text(), id);
    if (duration === null) throw new Error(`Cannot verify duration for ${id}; retaining the existing archive`);
    return duration;
  }, now);
  const merged = validateFreiburgArchive(mergeFreiburgUploads(saved, [...incoming, ...release.value]), now);
  const output = `${JSON.stringify(merged, null, 2)}\n`;
  const changed = original.replace(/\r\n/g, '\n') !== output;
  if (changed && !dryRun) fs.writeFileSync(archivePath, output);
  return { changed, added: merged.length - saved.length, total: merged.length, dryRun };
}

module.exports = { syncFreiburgUploads };
if (require.main === module) syncFreiburgUploads({ dryRun: process.argv.includes('--dry-run') })
  .then(result => console.log(JSON.stringify(result)))
  .catch(error => { console.error(error.message); process.exitCode = 1; });

