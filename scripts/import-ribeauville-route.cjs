const fs = require('node:fs');
const xml = fs.readFileSync(process.argv[2] || 'lib/christmas/ribeauville-source.kml', 'utf8');
const points = [], lines = [];
for (const match of xml.matchAll(/<Placemark>([\s\S]*?)<\/Placemark>/g)) {
  const body = match[1];
  const name = body.match(/<name>([\s\S]*?)<\/name>/)[1].replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1').replace(/&amp;/g, '&');
  const coordinates = body.match(/<coordinates>([\s\S]*?)<\/coordinates>/)[1].trim().split(/\s+/).map(value => value.split(',').slice(0, 2).map(Number));
  if (coordinates.some(point => point.some(value => !Number.isFinite(value)))) throw new Error('Invalid coordinates');
  if (body.includes('<Point>')) points.push({ name, coordinates: coordinates[0] });
  else lines.push({ name, coordinates });
}
fs.writeFileSync('lib/christmas/ribeauville-visitor-route.json', JSON.stringify({ sourceUrl: 'https://www.google.com/maps/d/viewer?mid=1u1X42Hi_GzoGUKqhrYVz-psUVNupvHE', importedOn: '2026-10-27', points, lines }, null, 2) + '\n');
console.log(`Imported ${points.length} points and ${lines.length} routes`);
