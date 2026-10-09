// Default: write a review CSV. --write installs the same validated rows locally.
// Never edits existing country exports, permanent IDs, rich highlights, or Google Sheets.
const fs=require('node:fs');
const load=require('./lib/load-typescript.cjs');
const {tours}=load('lib/tours/server.ts');
const primary=tours.filter(t=>t.sourceFile!=='library-additions.csv');
const {parseTourCsv,buildTours}=load('lib/tours/core.ts');
const metadata=require('../docs/map-import/youtube-metadata.json');
const places=require('../docs/map-import/destination-review.json');
const coordinates=require('../docs/map-import/destination-coordinates.json');
const originalPoints=require('../docs/map-import/source-points.json');
const routes=require('../docs/map-import/route-points.json');
const pages=require('../docs/launch-audit/squarespace-inventory.json').pages.filter(p=>p.url.includes('/v/'));
const target='data/maps/library-additions.csv';
const oldRows=fs.existsSync(target)?parseTourCsv(fs.readFileSync(target,'utf8'),target):[];
const prefixes={Italy:'it',France:'fr',USA:'us',Egypt:'eg',Greece:'gr',Malta:'mt',Croatia:'hr',Hungary:'hu',Portugal:'pt',Jordan:'jo',Czechia:'cz',Switzerland:'ch',Austria:'at',Australia:'au',Brazil:'br',Turkey:'tr',Japan:'jp',Netherlands:'nl',Spain:'es',Norway:'no',Slovenia:'si',Denmark:'dk'};
const maxIds={};
for(const t of [...primary,...oldRows.map(r=>({tourId:r.tour_id}))]){const m=/^([a-z]+)-(\d+)$/.exec(t.tourId);if(m)maxIds[m[1]]=Math.max(maxIds[m[1]]||0,Number(m[2]));}
const idsFromText=s=>[...new Set([...s.matchAll(/(?:youtube.com\/(?:embed\/|watch\?v=)|youtu.be\/)([\w-]{11})/g)].map(m=>m[1]))];
const clean=s=>s.replace(/&mdash;/g,'—').replace(/&amp;/g,'&').replace(/&#39;/g,"'").replace(/<[^>]*>/g,'').trim();
const slug=s=>s.normalize('NFD').replace(/\p{Diacritic}/gu,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
function filmedDate(description){
  const month='January|February|March|April|May|June|July|August|September|October|November|December';
  // Only explicit filming language; never substitute a publication/upload date.
  const match=new RegExp('filmed[^\\n.]{0,180}?((?:'+month+') \\d{1,2}(?:st|nd|rd|th)?,? \\d{4})','i').exec(description);
  if(!match)return '';
  const value=Date.parse(match[1].replace(/(\d)(st|nd|rd|th)/g,'$1')+' 12:00:00 UTC');
  return Number.isFinite(value)?new Date(value).toISOString().slice(0,10):'';
}
const rows=[],review=[];
for(const [id,video] of Object.entries(metadata).sort(([a],[b])=>a.localeCompare(b))){
  if(primary.some(t=>t.youtubeId===id))continue;
  if(video.availability!=='public'||video.channel_id!=='UCNzul4dnciIlDg8BAcn5-cQ'){review.push({id,status:'Excluded: not verified public on Prowalk Tours',reason:video.error||video.availability});continue;}
  const location=places.find(p=>p.ids.includes(id));
  if(!location)throw Error(`Location review missing for ${id}`);
  const old=originalPoints.filter(p=>idsFromText(p.description||'').includes(id));
  if(old.length>1)throw Error(`Ambiguous original map points for ${id}`);
  const route=routes.find(r=>r.id===id);
  const routeUrls=[...video.description.matchAll(/https?:\/\/www\.google\.com\/maps\/d\/[^\s<>]+/g)].map(m=>m[0]);
  const routeUrl=routeUrls.find(url=>{try{return new URL(url).searchParams.has('mid')}catch{return false}})||'';
  let point=old[0],accuracy='original-map-pin',locationSource='https://www.google.com/maps/d/viewer?mid=1q_qcme_873jVYqFuv5qCbBsW4cteWWpa';
  const starts=(route?.points||[]).filter(p=>/^(?:\d{1,2}:[\d:]+\s+)?start(?:\/end)?(?:\s+\d{1,2}:[\d:]+)?$/i.test(p.name.trim()));
  if(starts.length===1){point=starts[0];accuracy='tour-start';locationSource=routeUrl;}
  // A point on the creator's route is useful, but does not establish the exact start.
  if(!point&&route?.points.length){point=route.points[0];accuracy='approximate-destination';locationSource=routeUrl;}
  if(!point&&coordinates[location.wiki]?.latitude!==undefined){point=coordinates[location.wiki];accuracy='approximate-destination';locationSource=point.source;}
  if(!point){const existing=primary.find(t=>t.city===location.city&&t.country===location.country&&t.latitude!==null);if(existing){point=existing;accuracy='approximate-destination';locationSource=`master-catalog:${existing.tourId}`;}}
  if(!point)throw Error(`No verified destination coordinate for ${id} (${location.city})`);
  if(!Number.isFinite(point.latitude)||!Number.isFinite(point.longitude))throw Error(`Invalid coordinates for ${id}`);
  const previous=oldRows.find(r=>r.youtube_url.endsWith(id));
  const prefix=prefixes[location.country];
  if(!prefix)throw Error(`Missing prefix for ${location.country}`);
  const tourId=previous?.tour_id||`${prefix}-${String(maxIds[prefix]=(maxIds[prefix]||0)+1).padStart(4,'0')}`;
  const type=/bike|biking|cycling/i.test(video.title)?'bike-tour':/hike|hiking/i.test(video.title)?'hike':/evening|night|sunset/i.test(video.title)?'evening-walk':'day-walk';
  const date=filmedDate(video.description);
  const long=clean(video.description.split('\n\n')[0]);
  const description=long.split(/(?<=[.!?])\s/)[0].slice(0,350);
  const duration=video.duration;
  if(!Number.isFinite(duration)||duration<=0)throw Error(`Missing duration ${id}`);
  const durationLabel=[Math.floor(duration/3600),Math.floor(duration%3600/60),Math.floor(duration%60)].map((v,i)=>i?String(v).padStart(2,'0'):String(v)).join(':');
  const sourcePages=pages.filter(p=>p.youtubeIds.includes(id));
  const row={tour_id:tourId,country:location.country,region:location.region,city:location.city,location:location.city,title:video.title,slug:previous?.slug||`${slug(video.title).slice(0,95).replace(/-$/,'')}-${slug(id)}`,slug_override:'',video_type:type,themes:/christmas|christkindl/i.test(video.title)?'christmas-market':'',filmed_date_iso:date,filmed_year:date.slice(0,4),weather_summary:'',temp_f:'',temp_c:'',youtube_url:`https://www.youtube.com/watch?v=${id}`,map_url:routeUrl,latitude:String(point.latitude),longitude:String(point.longitude),distance_label:'',distance_miles:'',distance_km:'',duration_label:durationLabel,duration_seconds:String(duration),description_short:description,description_long:long,landmarks:'',keywords:[location.city,location.region,location.country].join(', '),status:'published',thumbnail_path:`https://i.ytimg.com/vi/${id}/hqdefault.jpg`,youtube_availability:'public',location_accuracy:accuracy,location_source:locationSource,source_page:sourcePages[0].url,availability_checked:video.checked};
  rows.push(row);
  review.push({id,tourId,title:video.title,country:location.country,city:location.city,status:'Ready',locationAccuracy:accuracy,locationSource,coordinateLabel:point.name||point.title||point.city,latitude:point.latitude,longitude:point.longitude,sourcePages:sourcePages.map(p=>p.url),filmedDate:date||'Not established; left blank',availabilityChecked:video.checked});
}
const headers=Object.keys(rows[0]);
const quote=value=>'"'+String(value??'').replace(/"/g,'""')+'"';
const csv=[headers,...rows.map(row=>headers.map(h=>row[h]))].map(row=>row.map(quote).join(',')).join('\r\n')+'\r\n';
const parsed=parseTourCsv(csv,'proposed-library-import');
buildTours([{source:'proposed-library-import',rows:parsed}],[],new Set());
fs.writeFileSync('docs/map-import/proposed-library-additions.csv',csv);
fs.writeFileSync('docs/map-import/import-review.json',JSON.stringify(review,null,2));
if(process.argv.includes('--write'))fs.writeFileSync(target,csv);
console.log(JSON.stringify({ready:rows.length,excluded:review.filter(r=>r.status!=='Ready'),countries:[...new Set(rows.map(r=>r.country))],verifiedStarts:rows.filter(r=>r.location_accuracy==='tour-start').length,originalMapPins:rows.filter(r=>r.location_accuracy==='original-map-pin').length,approximatePins:rows.filter(r=>r.location_accuracy==='approximate-destination').length,undated:rows.filter(r=>!r.filmed_date_iso).length,installed:process.argv.includes('--write')},null,2));

