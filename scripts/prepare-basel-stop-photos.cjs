// Selected map galleries; preserve original photographs and their full framing.
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const { execFileSync } = require('node:child_process');
const sharp = require('sharp');
const { createHash } = require('node:crypto');
const selection = require('./basel-stop-photo-selection.json');
const root = 'D:/Prowalk Tours Media Library/Christmas Markets/Switzerland/Basel/2026 Guide Photos';
const destination = path.join(__dirname, '../public/basel-christmas-guide/stops');
async function main() {
  fs.mkdirSync(destination, { recursive: true });
  const selectedStop = process.argv[2];
  if (selectedStop && !selection[selectedStop]) throw new Error(`Unknown stop: ${selectedStop}`);
  const photos = selectedStop ? require('../lib/christmas/basel-stop-photos.json') : {};
  for (const [id, entries] of Object.entries(selection)) {
    if (selectedStop && id !== selectedStop) continue;
    photos[id] = [];
    for (const [index, entry] of entries.entries()) {
      let input = path.join(root, entry.source);
      let temporary;
      try {
        if (/\.heic$/i.test(input)) {
          temporary = fs.mkdtempSync(path.join(os.tmpdir(), 'basel-photo-'));
          const decoded = path.join(temporary, 'decoded.png');
          execFileSync('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-i', input, '-frames:v', '1', decoded]);
          input = decoded;
        }
        const version = createHash('sha256').update(fs.readFileSync(input)).digest('hex').slice(0, 10);
        const filename = `${id}-${index + 1}-${version}.webp`;
        const info = await sharp(input).rotate().resize({ width: 1600, height: 1600, fit: 'inside', withoutEnlargement: true }).webp({ quality: 82 }).toFile(path.join(destination, filename));
        photos[id].push({ src: `/basel-christmas-guide/stops/${filename}`, alt: entry.alt, year: entry.year, width: info.width, height: info.height });
      } finally {
        if (temporary) { fs.unlinkSync(path.join(temporary, 'decoded.png')); fs.rmdirSync(temporary); }
      }
    }
  }
  fs.writeFileSync(path.join(__dirname, '../lib/christmas/basel-stop-photos.json'), JSON.stringify(photos, null, 2) + '\n');
  console.log(`Prepared ${Object.values(photos).flat().length} photographs for ${Object.keys(photos).length} stops.`);
}
main().catch(error => { console.error(error); process.exitCode = 1; });
