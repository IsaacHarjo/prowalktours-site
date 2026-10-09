// Small, cached, public reference lookup for user-approved approximate destination pins.
const fs = require('node:fs');
const places = require('../docs/map-import/destination-review.json');
const output = 'docs/map-import/destination-coordinates.json';
const cached = fs.existsSync(output) ? JSON.parse(fs.readFileSync(output, 'utf8')) : {};
async function main() {
  const pending = [...new Set(places.map(p => p.wiki))].filter(title => !cached[title]);
  for (let i = 0; i < pending.length; i += 30) {
    const titles = pending.slice(i, i + 30);
    const url = new URL('https://en.wikipedia.org/w/api.php');
    url.search = new URLSearchParams({action:'query',format:'json',prop:'coordinates',titles:titles.join('|'),redirects:'1',colimit:'max',coprimary:'primary'});
    const response = await fetch(url, {headers:{'User-Agent':'ProwalkToursMapReview/1.0 (https://prowalktours.com)'},signal:AbortSignal.timeout(30000)});
    if (!response.ok) throw Error(`Reference lookup returned ${response.status}; stopped.`);
    const data = await response.json();
    if (data.error) throw Error(data.error.info);
    const resolve = title => [...(data.query.normalized || []), ...(data.query.redirects || [])].reduce((t,r) => r.from === t ? r.to : t, title);
    for (const title of titles) {
      const page = Object.values(data.query.pages).find(p => p.title === resolve(title));
      const coordinates = page?.coordinates?.[0];
      cached[title] = coordinates ? {latitude:coordinates.lat,longitude:coordinates.lon,title:page.title,source:`https://en.wikipedia.org/?curid=${page.pageid}`,checked:new Date().toISOString()} : {error:'No primary coordinate found',title};
    }
    fs.writeFileSync(output, JSON.stringify(cached,null,2));
    await new Promise(resolve => setTimeout(resolve,1200));
  }
  console.log(JSON.stringify({destinations:Object.keys(cached).length,missing:Object.values(cached).filter(r=>r.error)}));
}
main().catch(error=>{console.error(error.message);process.exitCode=1;});
