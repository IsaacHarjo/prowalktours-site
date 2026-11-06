// Optimise supplied photographs for the guide. Originals are never modified.
const fs = require('node:fs');
const path = require('node:path');
const sharp = require('sharp');
const root = 'D:/Prowalk Tours Media Library/Christmas Markets/Switzerland/Basel';
const out = path.join(__dirname, '../public/basel-christmas-guide');
const photos = {
  'hero': 'NEWSparkling Christmas Tree by Gothic Cathedral.jpeg',
  'cathedral': 'NEWFestive Gothic Cathedral Square at Night.jpeg',
  'munsterplatz': 'NEWFestive Christmas Market Square.jpeg',
  'fireside': 'NEWWinter Market by the Fire.jpeg',
  'rathaus-courtyard': 'NEWFestive Courtyard Christmas Tree.jpeg',
  'rathaus': 'NEWFestive Night at the Historic Rathaus.jpeg',
  'feuerstube': 'NEWFestive Christmas Market at Feuerstube.jpeg',
  'gluhwein': 'NEWFestive Glühwein Market Stall at Night.jpeg',
};
async function main() {
  fs.mkdirSync(out, { recursive: true });
  for (const [name, file] of Object.entries(photos)) {
    await sharp(path.join(root, 'Best Images', file)).rotate().resize({ width: 1920, withoutEnlargement: true }).webp({ quality: 84 }).toFile(path.join(out, name + '.webp'));
  }
  for (const [name, file] of Object.entries({ 'cathedral-square-360-1': 'Basel MunsterPlatz 360 1.jpg', 'cathedral-square-360-2': 'Basel Munsterplatz 2.jpg', 'market-360': 'Basel Munsterplatz Christmas Market.jpg' })) {
    await sharp(path.join(root, '360 Pictures', file)).resize({ width: 6000, withoutEnlargement: true }).jpeg({ quality: 85 }).toFile(path.join(out, name + '.jpg'));
  }
  console.log('Prepared 8 photographs and 3 panoramas.');
}
main().catch(error => { console.error(error); process.exitCode = 1; });
