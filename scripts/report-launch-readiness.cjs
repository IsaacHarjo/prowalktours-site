// Local source audit and review-only redirect candidates. No configuration writes.
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const cache = new Map();
function load(relativePath) {
  let file = path.resolve(relativePath);
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.ts');
  else if (!file.endsWith('.ts')) file += '.ts';
  if (cache.has(file)) return cache.get(file);
  const output = {}; cache.set(file, output);
  const js = ts.transpileModule(fs.readFileSync(file, 'utf8'), {compilerOptions: {module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true}}).outputText;
  new Function('exports', 'require', js)(output, name => name === 'server-only' ? {} : name.startsWith('.') ? load(path.resolve(path.dirname(file), name)) : require(name));
  return output;
}
function files(dir) { return fs.readdirSync(dir, {withFileTypes:true}).flatMap(e => e.isDirectory() ? files(path.join(dir,e.name)) : [path.join(dir,e.name)]); }
const {tours, publicTours} = load('lib/tours/server.ts');
const missing = new Map();
const withoutMetadata = [];
for (const file of [...files('app'), ...files('components'), ...files('data/video-details')].filter(f => /\.tsx?$/.test(f))) {
  const content = fs.readFileSync(file,'utf8');
  if (file.endsWith('page.tsx') && !/export (?:const metadata|(?:async )?function generateMetadata)/.test(content)) withoutMetadata.push(file.replaceAll('\\','/'));
  const refs = [...content.matchAll(/["'`](\/[^"'`\n]*?\.(?:jpg|jpeg|png|webp|svg))["'`]/gi)].map(m=>m[1]).filter(s=>!s.includes('${') && !['/maxresdefault.jpg','/hqdefault.jpg'].includes(s));
  const imgRoot = content.match(/const img\s*=\s*\([^)]*\)\s*=>\s*`([^`]*?)\$\{/s)?.[1];
  if (imgRoot) refs.push(...[...content.matchAll(/img\("([^"]+)"\)/g)].map(m=>imgRoot+m[1]));
  if (file.startsWith('data') && file.endsWith('.ts')) {
    const detail = Object.values(load(file))[0];
    for (const highlight of detail?.highlights || []) refs.push(...[highlight.imageSrc, ...(highlight.images || [])].filter(s=>s?.startsWith('/')));
  }
  for (const ref of refs) if (!fs.existsSync(path.join('public',ref))) {
    if (!missing.has(ref)) missing.set(ref,[]);
    missing.get(ref).push(file.replaceAll('\\','/'));
  }
}
const report = {
  reviewed: '2026-10-09', totalCatalog: tours.length, publicTours: publicTours.length,
  publicInternalTours: publicTours.filter(t=>t.watchDestinationType === 'internal-page').length,
  youtubeOnlyTours: publicTours.filter(t=>t.watchDestinationType === 'youtube').map(t=>({tourId:t.tourId,slug:t.slug,country:t.country})),
  publicToursWithoutShortDescription: publicTours.filter(t=>!t.shortDescription.trim()).map(t=>({tourId:t.tourId,slug:t.slug})),
  missingLocalImages: [...missing].map(([image,files])=>({image,files})),
  pagesWithoutMetadata: withoutMetadata,
};
fs.mkdirSync('docs/launch-audit',{recursive:true});
fs.writeFileSync('docs/launch-audit/local-readiness.json',JSON.stringify(report,null,2));
const inventoryFile = 'docs/launch-audit/squarespace-inventory.json';
if (fs.existsSync(inventoryFile)) {
  const pages = JSON.parse(fs.readFileSync(inventoryFile)).pages;
  const proposed = {'/home':'/', '/videos':'/search', '/find-a-walk':'/#world-map', '/join':'/join-us', '/cameras':'/filming-gear#cameras', '/sony-a7siii':'/filming-gear#cameras', '/gopro':'/filming-gear#cameras', '/insta360':'/filming-gear#cameras', '/osmo-pocket':'/filming-gear#cameras', '/phone':'/filming-gear#cameras', '/microphones':'/filming-gear#audio', '/travel-accessories':'/filming-gear#travel', '/drone':'/search?type=drone-tour'};
  const routes = new Set(files('app').filter(f=>f.endsWith('page.tsx')).map(f=>'/'+f.replaceAll('\\','/').replace(/^app\//,'').replace(/\/?page.tsx$/,'')));
  const xml = fs.readFileSync('docs/launch-audit/squarespace-sitemap.xml','utf8');
  const oldUrls = [...new Set(['https://prowalktours.com/',...[...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>m[1])])];
  const candidates = oldUrls.map(url=>{
    const p = pages.find(p=>p.url===url); const source = new URL(url).pathname;
    let destination = null, status = 'Review: no equivalent page identified';
    let matchingTours = [];
    if (routes.has(source)) {destination=source;status='Keep path; no path redirect needed';}
    else if (proposed[source]) {destination=proposed[source];status=source.includes('camera')||['/sony-a7siii','/gopro','/insta360','/phone','/osmo-pocket','/microphones','/travel-accessories'].includes(source)?'Proposed consolidation; migrate useful gear links before approval':'Proposed redirect; verify intent before enabling';}
    else if (/\/v\//.test(source) && p && !p.error) {
      matchingTours=publicTours.filter(t=>p.youtubeIds.includes(t.youtubeId));
      if (p.youtubeIds.length === 1 && matchingTours.length === 1) {
        const t=matchingTours[0];
        if(t.watchDestinationType==='internal-page'){destination=t.watchHref;status='Exact video ID match; candidate permanent redirect';}
        else {status='Exact video ID match; destination currently YouTube only; build/preserve an internal landing page before redirecting';}
      } else if (p.youtubeIds.length > 1) status='Review: multiple embedded videos; do not infer a single destination';
    }
    if (p?.error || !p) status='Not verified: ' + (p?.error || 'page not fetched');
    return {source,destination,status,title:p?.title||'',description:p?.description||'',youtubeIds:p?.youtubeIds||[],matchingTourIds:matchingTours.map(t=>t.tourId)};
  });
  fs.writeFileSync('docs/launch-audit/redirect-candidates.json',JSON.stringify({enabled:false,reviewed:'2026-10-09',candidates},null,2));
  console.log('Redirect inventory:',candidates.length, 'URLs;', candidates.filter(c=>c.status.startsWith('Exact video ID match; candidate')).length,'exact internal matches;',candidates.filter(c=>c.status.startsWith('Not verified')).length,'unverified');
}
console.log(JSON.stringify({publicTours:report.publicTours,internalPages:report.publicInternalTours,youtubeOnly:report.youtubeOnlyTours.length,missingImages:report.missingLocalImages.length,missingDescriptions:report.publicToursWithoutShortDescription.length,pagesWithoutMetadata:withoutMetadata.length},null,2));
