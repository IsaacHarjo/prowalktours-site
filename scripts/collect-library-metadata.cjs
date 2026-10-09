// Read public metadata only. No media, cookies, login, or website configuration changes.
const fs = require('node:fs');
const { execFile } = require('node:child_process');
const { promisify } = require('node:util');
const load = require('./lib/load-typescript.cjs');
const run = promisify(execFile);
const { tours } = load('lib/tours/server.ts');
const existing = new Set(tours.map(t => t.youtubeId));
const pages = require('../docs/launch-audit/squarespace-inventory.json').pages.filter(p => p.url.includes('/v/'));
const ids = [...new Set(pages.flatMap(p => p.youtubeIds))].filter(id => !existing.has(id));
const output = 'docs/map-import/youtube-metadata.json';
const records = fs.existsSync(output) ? JSON.parse(fs.readFileSync(output, 'utf8')) : {};
const pending = ids.filter(id => !records[id]?.id);
let done = 0;
let stopped = false;
const limit = Number(process.argv.find(a => a.startsWith('--limit='))?.split('=')[1] || pending.length);
pending.splice(limit);
async function worker() {
  while (pending.length && !stopped) {
    const id = pending.shift();
    try {
      const { stdout } = await run('C:/Users/Ikejohn/AppData/Local/Microsoft/WinGet/Links/yt-dlp.exe', [
        '--ignore-config', '--skip-download', '--no-playlist', '--no-warnings', '--dump-single-json', `https://www.youtube.com/watch?v=${id}`,
      ], { timeout: 45000, maxBuffer: 20 * 1024 * 1024, windowsHide: true });
      const data = JSON.parse(stdout);
      records[id] = Object.fromEntries(['id', 'title', 'description', 'duration', 'availability', 'channel_id', 'upload_date', 'chapters'].map(k => [k, data[k] ?? null]));
      records[id].checked = new Date().toISOString();
    } catch (error) {
      if (error.code === 'EACCES' || error.code === 'EPERM') throw error;
      const reason = String(error.stderr || error.message).slice(0, 1000);
      records[id] = { error: reason };
      if (/429|confirm.*not a bot|sign in to confirm/i.test(reason)) { stopped = true; console.log('Paused after rate-limit or verification response.'); }
    }
    fs.writeFileSync(output, JSON.stringify(records, null, 2));
    done++;
    if (done % 10 === 0) console.log(`Reviewed ${Object.values(records).filter(r => r.id).length}/${ids.length} missing catalog videos`);
    await new Promise(resolve => setTimeout(resolve, 1200));
  }
}
Promise.all([worker(), worker()]).then(() => console.log(JSON.stringify({ candidates: ids.length, reviewed: Object.values(records).filter(r => r.id).length, errors: Object.entries(records).filter(([,r]) => r.error).map(([id,r]) => ({id,...r})) })))
  .catch(error => { console.error(error.message); process.exitCode = 1; });
