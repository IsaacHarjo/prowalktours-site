// Build lib/christmas/nuremberg-route.json from the four filmed-route KML
// exports in docs/christmas-markets/routes/ (Ike's public My Maps for the
// 2022 and 2024 Nuremberg walks).
//
// Each map has the filmed route line and one pin per highlight, named with
// its timestamp. Stops are merged across the four walks by place, keeping
// every walk's timestamp. Coordinates come from the first walk (in the order
// below) that has the place. Run: node scripts/prepare-nuremberg-route.cjs
const fs = require('node:fs');
const path = require('node:path');

const walks = [
  { key: 'day2024', file: 'nuremberg-day-2024.kml', slug: 'nuremberg-christmas-market-day-walk-2024', mid: '1_Fvtk_Zt_Tbh-gSxuoRYGJjV4Oxaj3Y' },
  { key: 'evening2024', file: 'nuremberg-evening-2024.kml', slug: 'nuremberg-christmas-market-evening-walk-2024', mid: '1gAU6eK4G8ct89y55Om7ewbxkxlC-jaI' },
  { key: 'day2022', file: 'nuremberg-day-2022.kml', slug: 'nuremberg-christmas-market-day-walk-2022', mid: '1asgVdmmzmOlQ4apfHZFRlWnd6Hyc1No' },
  { key: 'evening2022', file: 'nuremberg-evening-2022.kml', slug: 'nuremberg-christmas-market-evening-walk-2022', mid: '1wGteToXpuWR_ZptphCdFiWDidioKtB0' },
];

// Stop order follows the 2024 daytime walk; extra places from the other walks
// sit where they fall along the route. Patterns match the pin names.
const places = [
  { id: 'fleischbrucke', match: /fleischbr/i },
  { id: 'hauptmarkt', match: /^(hauptmarkt|christkindlesmarkt)/i },
  { id: 'schoner-brunnen', match: /sch.ner brunnen/i },
  { id: 'original-regional', match: /original regional/i },
  { id: 'st-sebaldus', match: /sebaldus/i },
  { id: 'sister-cities', match: /sister cities/i },
  { id: 'childrens-market', match: /children/i },
  { id: 'heubrucke', match: /heubr/i },
  { id: 'museum-bridge', match: /museum bridge/i },
  { id: 'pegnitz-riverside', match: /pegnitz/i },
  { id: 'konigstrasse', match: /k.nigstra|king street/i },
  { id: 'st-lorenz', match: /lorenz/i },
  { id: 'handwerkerhof', match: /handwerkerhof|craft(s)?men|craftsmen/i },
  { id: 'central-station', match: /central station/i },
  { id: 'karolinenstrasse', match: /karolinen|caroline/i },
  { id: 'hefnersplatz', match: /hefnersplatz/i },
  { id: 'ludwigsplatz', match: /ludwigsplatz/i },
  { id: 'ehekarussell', match: /ehekarussell|merry-go-round/i },
  // The 2024 evening "Winter Village" pin is 10 m from the Jakobsplatz market pin: one place.
  { id: 'jakobsplatz', match: /jakobsplatz|winter village/i },
  { id: 'karlsbrucke', match: /karlsb/i },
  { id: 'trodelmarkt', match: /tr.delmarkt/i },
  { id: 'hangmans-bridge', match: /hangman/i },
  { id: 'maxbrucke', match: /maxbr/i },
  { id: 'feuerzangenbowle', match: /feuerzangenbowle|punch bowl/i },
];

const secondsFrom = label => label.split(':').map(Number).reduce((total, part) => total * 60 + part, 0);
const coordinatesFrom = text => text.trim().split(/\s+/).map(point => point.split(',').slice(0, 2).map(Number));

const routes = {};
const pins = {};
for (const walk of walks) {
  const xml = fs.readFileSync(path.join('docs/christmas-markets/routes', walk.file), 'utf8');
  const placemarks = [...xml.matchAll(/<Placemark>([\s\S]*?)<\/Placemark>/g)].map(match => match[1]);
  // A walk can have more than one line segment; keep them in map order.
  routes[walk.key] = placemarks.filter(item => item.includes('<LineString>'))
    .map(item => coordinatesFrom(item.match(/<coordinates>([\s\S]*?)<\/coordinates>/)[1]));
  pins[walk.key] = placemarks.filter(item => item.includes('<Point>')).map(item => {
    const name = item.match(/<name>([\s\S]*?)<\/name>/)[1].replace(/<!\[CDATA\[|\]\]>/g, '').trim();
    const time = name.match(/\(?(\d{1,2}:\d{2}(?::\d{2})?)\)?/);
    return { name, seconds: time ? secondsFrom(time[1]) : null, coordinates: coordinatesFrom(item.match(/<coordinates>([\s\S]*?)<\/coordinates>/)[1])[0] };
  }).filter(pin => pin.seconds !== null);
}

const stops = places.map(place => {
  const watch = [];
  let coordinates;
  for (const walk of walks) {
    // First occurrence only: later returns to the same place are skipped.
    const pin = pins[walk.key].find(item => place.match.test(item.name.replace(/^\d+\.\s*|^\d{1,2}:\d{2}(:\d{2})?\s*/, '')));
    if (!pin) continue;
    coordinates ??= pin.coordinates;
    watch.push({ walk: walk.key, seconds: pin.seconds });
  }
  if (!coordinates) throw new Error(`No pin found for ${place.id}`);
  return { id: place.id, coordinates, watch };
});

for (const walk of walks) {
  const used = pins[walk.key].filter(pin => places.some(place => place.match.test(pin.name.replace(/^\d+\.\s*|^\d{1,2}:\d{2}(:\d{2})?\s*/, ''))));
  const unused = pins[walk.key].filter(pin => !used.includes(pin));
  if (unused.length) console.log(`${walk.key}: pins not used as stops:`, unused.map(pin => pin.name).join(' | '));
}

const output = {
  importedOn: new Date().toISOString().slice(0, 10),
  walks: walks.map(({ key, slug, mid }) => ({ key, slug, sourceUrl: `https://www.google.com/maps/d/viewer?mid=${mid}` })),
  routes,
  stops,
};
fs.writeFileSync('lib/christmas/nuremberg-route.json', JSON.stringify(output) + '\n');
console.log(`Wrote ${stops.length} stops; route segments:`, Object.fromEntries(Object.entries(routes).map(([key, value]) => [key, value.map(segment => segment.length)])));
