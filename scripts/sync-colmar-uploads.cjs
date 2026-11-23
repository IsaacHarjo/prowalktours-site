// Archive verified public Colmar uploads before they leave YouTube's recent feed.
// Does not edit the master tour exports or create internal video pages.
const fs = require('node:fs');
const path = require('node:path');
const load = require('./lib/load-typescript.cjs');
const { PROWALK_CHANNEL_ID, durationFromWatchPage } = load('lib/youtube/latestWalk.ts');
const { colmarUploadsFromFeed, mergeColmarUploads, validateColmarArchive } = load('lib/youtube/colmarWalks.ts');

async function syncColmarUploads({ archivePath = path.resolve('data/youtube/colmar-uploads.json'), fetcher = fetch, dryRun = false, now = Date.now() } = {}) {
  const original = fs.readFileSync(archivePath, 'utf8');
  const saved = validateColmarArchive(JSON.parse(original), now);
  const response = await fetcher(`https://www.youtube.com/feeds/videos.xml?channel_id=${PROWALK_CHANNEL_ID}`, { signal: AbortSignal.timeout(15000) });
  if (!response.ok) throw new Error(`Public channel feed returned HTTP ${response.status}`);
  const xml = await response.text();
  if (!/<feed[\s>]/.test(xml) || !xml.includes(`<yt:channelId>${PROWALK_CHANNEL_ID}</yt:channelId>`)) throw new Error('Unexpected public channel feed');
  const incoming = await colmarUploadsFromFeed(xml, async id => {
    const existing = saved.find(walk => walk.youtubeUrl.endsWith(`v=${id}`));
    if (existing) return existing.durationSeconds;
    const page = await fetcher(`https://www.youtube.com/watch?v=${id}`, { signal: AbortSignal.timeout(15000) });
    if (!page.ok) throw new Error(`Cannot verify duration for ${id}: HTTP ${page.status}`);
    const duration = durationFromWatchPage(await page.text(), id);
    if (duration === null) throw new Error(`Cannot verify duration for ${id}; retaining the existing archive`);
    return duration;
  }, now);
  const merged = validateColmarArchive(mergeColmarUploads(saved, incoming), now);
  const output = `${JSON.stringify(merged, null, 2)}\n`;
  const changed = original.replace(/\r\n/g, '\n') !== output;
  if (changed && !dryRun) fs.writeFileSync(archivePath, output);
  return { changed, added: merged.length - saved.length, total: merged.length, dryRun };
}

module.exports = { syncColmarUploads };
if (require.main === module) syncColmarUploads({ dryRun: process.argv.includes('--dry-run') })
  .then(result => console.log(JSON.stringify(result)))
  .catch(error => { console.error(error.message); process.exitCode = 1; });
