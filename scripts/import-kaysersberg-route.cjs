const fs = require('node:fs');
const { execFileSync } = require('node:child_process');
const input = process.argv[2] || 'lib/christmas/kaysersberg-source.kml';
const xml = input.endsWith('.kmz') ? execFileSync('tar', ['-xOf', input, 'doc.kml'], { encoding: 'utf8' }) : fs.readFileSync(input, 'utf8');
const points = [], lines = [];
for (const match of xml.matchAll(/<Placemark>([\s\S]*?)<\/Placemark>/g)) {
  const body = match[1];
  const name = body.match(/<name>([\s\S]*?)<\/name>/)[1].replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1').replace(/&amp;/g, '&').replace(/&apos;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
  const coordinates = body.match(/<coordinates>([\s\S]*?)<\/coordinates>/)[1].trim().split(/\s+/).map(value => value.split(',').slice(0, 2).map(Number));
  if (coordinates.some(point => point.some(value => !Number.isFinite(value)))) throw new Error('Invalid coordinates');
  if (body.includes('<Point>')) points.push({name, coordinates: coordinates[0]});
  else lines.push({name, coordinates});
}
fs.writeFileSync('lib/christmas/kaysersberg-visitor-route.json', JSON.stringify({sourceUrl:'https://www.google.com/maps/d/viewer?mid=1NSQtPv-zNBzwhQBkd1Mw7llpJ8OonY0', importedOn:'2026-10-26', points, lines}, null, 2) + '\n');
console.log(`Imported ${points.length} stops and ${lines.length} lines`);
