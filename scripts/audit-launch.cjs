// Read-only public-site inventory. Never submits forms or changes hosting.
const fs = require('node:fs');
const path = require('node:path');
const out = path.join(process.cwd(), 'docs', 'launch-audit');
fs.mkdirSync(out, { recursive: true });
const decode = s => s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;|&#x27;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');
const attrs = tag => Object.fromEntries([...tag.matchAll(/([\w:-]+)\s*=\s*["']([^"']*)["']/g)].map(m => [m[1], decode(m[2])]));
const text = s => decode(s.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim());
const videoMarkup = s => decode(s).replace(/\\\//g, '/').replace(/(?:%[0-9a-f]{2})+/gi, token => { try { return decodeURIComponent(token); } catch { return token; } });
async function get(url) {
  const r = await fetch(url, { signal: AbortSignal.timeout(30000) });
  if (!r.ok) throw new Error(`${r.status} ${url}`);
  return { html: await r.text(), status: r.status, finalUrl: r.url };
}
async function main() {
  if (process.argv[2] === '--inspect') {
    const html = (await get(process.argv[3])).html;
    console.log([...html.matchAll(/.{0,100}(?:youtube|embedly|videoUrl).{0,240}/gi)].slice(0,12).map(m=>m[0]).join('\n'));
    return;
  }
  const oldXml = (await get('https://prowalktours.com/sitemap.xml')).html;
  const newXml = (await get('https://prowalktours-site.vercel.app/sitemap.xml')).html;
  fs.writeFileSync(path.join(out, 'squarespace-sitemap.xml'), oldXml);
  fs.writeFileSync(path.join(out, 'vercel-sitemap-before.xml'), newXml);
  const urls = [...new Set(['https://prowalktours.com/', ...[...oldXml.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => decode(m[1]))])];
  const file = path.join(out, 'squarespace-inventory.json');
  const prior = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8')).pages : [];
  const pages = prior.filter(p => !p.error && urls.includes(p.url) && !(process.argv.includes('--enrich-video-ids') && /\/v\//.test(p.url) && !p.youtubeIds.length));
  const pending = urls.filter(u => !pages.some(p => p.url === u));
  let done = 0;
  let rateLimited = false;
  async function worker() {
    while (pending.length && !rateLimited) {
      const url = pending.shift();
      try {
        const { html, status, finalUrl } = await get(url);
        const meta = [...html.matchAll(/<meta\b[^>]*>/gi)].map(m => attrs(m[0]));
        const images = [...html.matchAll(/<img\b[^>]*>/gi)].map(m => attrs(m[0])).map(a => ({ src: a['data-src'] || a.src, alt: a.alt || '' }));
        const links = [...html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)].map(m => ({ href: attrs(m[1]).href, text: text(m[2]) })).filter(a => a.href);
        const frames = [...html.matchAll(/<iframe\b[^>]*>/gi)].map(m => attrs(m[0]).src).filter(Boolean);
        const scripts = [...html.matchAll(/<script\b[^>]*>/gi)].map(m => attrs(m[0]).src).filter(Boolean);
        const youtubeIds = [...new Set([...videoMarkup(html).matchAll(/(?:youtube(?:-nocookie)?\.com\/(?:embed\/|watch\?v=)|youtu\.be\/)([\w-]{11})/g)].map(m => m[1]))];
        const headings = [...html.matchAll(/<h([1-3])\b[^>]*>([\s\S]*?)<\/h\1>/gi)].map(m => text(m[2]));
        const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1] || '';
        pages.push({ url, status, finalUrl, title: text(html.match(/<title>([\s\S]*?)<\/title>/i)?.[1] || ''), description: meta.find(m => m.name === 'description')?.content || '', canonical: [...html.matchAll(/<link\b[^>]*>/gi)].map(m => attrs(m[0])).find(a => a.rel === 'canonical')?.href || '', headings, youtubeIds, images, links, frames, scripts, text: text(main.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '').replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '')).slice(0, 18000) });
      } catch (e) {
        pages.push({ url, error: e.message });
        if (e.message.startsWith('429')) rateLimited = true;
      }
      done++;
      if (done % 25 === 0) {
        console.log(`Reviewed ${pages.length}/${urls.length} public URLs`);
      }
      await new Promise(resolve => setTimeout(resolve, 1200));
    }
  }
  await worker();
  for (const url of pending) pages.push({ url, error: 'Not reviewed: crawl paused after a rate limit; retry later or use a Squarespace export.' });
  fs.writeFileSync(file, JSON.stringify({ captured: '2026-10-09', pages: pages.sort((a,b) => a.url.localeCompare(b.url)) }, null, 2));
  console.log(JSON.stringify({ total: urls.length, errors: pages.filter(p => p.error), videoPages: pages.filter(p => /\/v\//.test(p.url)).length, newRoutes: [...newXml.matchAll(/<loc>/g)].length }));
}
main().catch(e => { console.error(e.message); process.exitCode = 1; });
