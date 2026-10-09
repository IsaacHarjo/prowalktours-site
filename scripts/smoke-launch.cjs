// Smoke-check a locally running production build without submitting any forms.
const fs=require('fs'), path=require('path');
const base=process.argv[2]||'http://localhost:3001';
if(!['localhost','127.0.0.1'].includes(new URL(base).hostname))throw Error('Use a local preview for this check.');
function routes(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?routes(path.join(dir,e.name)):e.name==='page.tsx'?['/'+path.relative('app',dir).replaceAll('\\','/')]:[]);}
const paths=routes('app').filter(p=>p!=='/home-preview');
async function main(){
  const failures=[], results=[], htmlByPath=new Map();
  for(const p of paths){
    const r=await fetch(base+p); const html=await r.text(); htmlByPath.set(p,html);
    const title=html.match(/<title>(.*?)<\/title>/)?.[1];
    const description=html.match(/<meta name="description" content="([^"]*)"/ )?.[1];
    const canonical=html.match(/<link rel="canonical" href="([^"]*)"/ )?.[1];
    if(r.status!==200||!title||!description)failures.push({path:p,status:r.status,title,description});
    if([...html.matchAll(/<main[\s>]/g)].length!==1)failures.push({path:p,error:'Expected one main content landmark'});
    const isDraft=['/privacy-policy','/terms-of-use'].includes(p);
    if(isDraft&&!html.includes('noindex, follow'))failures.push({path:p,error:'Draft missing noindex'});
    let jsonLd=0;
    for(const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)){try{JSON.parse(m[1]);jsonLd++;}catch{failures.push({path:p,error:'Invalid JSON-LD'});}}
    results.push({path:p,status:r.status,title,canonical,jsonLd,htmlBytes:Buffer.byteLength(html)});
  }
  const known=new Set(paths);
  for(const [p,html] of htmlByPath){
    const hrefs=[...new Set([...html.matchAll(/<a\b[^>]*href="([^"]+)"/g)].map(m=>m[1].replaceAll('&amp;','&')))];
    for(const href of hrefs){
      if(!href.startsWith('/')&&!href.startsWith('#'))continue;
      const u=new URL(href,base+p);
      if(!known.has(u.pathname)){failures.push({path:p,brokenLink:href});continue;}
      if(u.hash){const target=htmlByPath.get(u.pathname);if(target&&!target.includes('id="'+decodeURIComponent(u.hash.slice(1))+'"'))failures.push({path:p,missingAnchor:href});}
    }
  }
  const sitemap=await (await fetch(base+'/sitemap.xml')).text();
  for(const excluded of ['/home-preview','/privacy-policy','/terms-of-use','/videos/freiburg-christmas-market-evening-walk-2025','/videos/rothenburg-christmas-market-morning-walk-2024'])if(sitemap.includes('prowalktours.com'+excluded+'<'))failures.push({error:'Excluded route in sitemap',path:excluded});
  const report={base,checked:'2026-10-09',routes:results,sitemapUrls:[...sitemap.matchAll(/<loc>/g)].length,failures};
  fs.writeFileSync('docs/launch-audit/smoke-results.json',JSON.stringify(report,null,2));
  console.log(JSON.stringify({routes:results.length,sitemapUrls:report.sitemapUrls,failures},null,2));
  if(failures.length)process.exitCode=1;
}
main().catch(e=>{console.error(e.message);process.exitCode=1;});
