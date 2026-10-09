const fs = require('node:fs');
const metadata = require('../docs/map-import/youtube-metadata.json');
const directory = 'docs/map-import/routes';
fs.mkdirSync(directory,{recursive:true});
async function main() {
  let checked=0;
  const failures=[];
  for (const video of Object.values(metadata).filter(v=>v.availability==='public')) {
    const urls=[...video.description.matchAll(/https?:\/\/www\.google\.com\/maps\/d\/[^\s<>]+/g)].map(m=>m[0]);
    const mids=[...new Set(urls.map(url=>{try{return new URL(url).searchParams.get('mid')}catch{return null}}).filter(Boolean))];
    if(mids.length!==1)continue;
    const file=`${directory}/${video.id}.kml`;
    if(fs.existsSync(file))continue;
    const url=`https://www.google.com/maps/d/kml?mid=${encodeURIComponent(mids[0])}&forcekml=1`;
    const response=await fetch(url,{signal:AbortSignal.timeout(30000)});
    if([403,429].includes(response.status)){console.log('Stopped at response '+response.status);break;}
    if(!response.ok){failures.push({id:video.id,status:response.status});continue;}
    const kml=await response.text();
    if(!kml.includes('<kml')){failures.push({id:video.id,error:'Not a KML map'});continue;}
    fs.writeFileSync(file,kml);
    checked++;
    if(checked%15===0)console.log(`Retrieved ${checked} public route maps`);
    await new Promise(resolve=>setTimeout(resolve,1200));
  }
  console.log(JSON.stringify({downloaded:checked,cached:fs.readdirSync(directory).length,failures}));
}
main().catch(e=>{console.error(e.message);process.exitCode=1;});
