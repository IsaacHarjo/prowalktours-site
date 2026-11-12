// Export the Nuremberg guide photos from Ike's media library (read-only) to
// compressed WebP in public/nuremberg-christmas-guide/. The originals are
// graded Rec.709 SDR; no tone mapping. Run: node scripts/prepare-nuremberg-guide-photos.cjs
const sharp = require('sharp');
const path = require('node:path');
const library = 'D:/Prowalk Tours Media Library/Christmas Markets/Germany/Nuremberg/Originals';
const out = 'public/nuremberg-christmas-guide';
// left: horizontal centre of a portrait crop, as a fraction of the width.
const photos = [
  { source: '2022/DSC02836.JPG', name: 'hero', width: 1920, height: 1080 },
  { source: '2022/DSC02836.JPG', name: 'hero-mobile', width: 900, height: 1200, left: 0.36 },
  { source: '2022/N10.jpg', name: 'card', width: 1280, height: 800 },
  { source: '2022/N11.jpg', name: 'hauptmarkt-snow', width: 1600, height: 900 },
  { source: '2022/DSC02719.JPG', name: 'schoner-brunnen', width: 1600, height: 900 },
  { source: '2022/DSC02783.JPG', name: 'henkersteg-snow', width: 1600, height: 900 },
  { source: '2024/DSC01471.JPG', name: 'handwerkerhof-gate', width: 1600, height: 900 },
  { source: '2024/DSC01523.JPG', name: 'christkindlesmarkt-sign', width: 1600, height: 900 },
  { source: '2024/DSC01502.JPG', name: 'painted-bauble', width: 1600, height: 900 },
];
(async () => {
  for (const photo of photos) {
    let image = sharp(path.join(library, photo.source)).rotate();
    if (photo.left !== undefined) {
      const { width, height } = await sharp(path.join(library, photo.source)).rotate().toBuffer({ resolveWithObject: true }).then(r => r.info);
      const cropWidth = Math.round(height * photo.width / photo.height);
      const left = Math.max(0, Math.min(width - cropWidth, Math.round(width * photo.left - cropWidth / 2)));
      image = sharp(await image.toBuffer()).extract({ left, top: 0, width: cropWidth, height });
    }
    const file = path.join(out, `${photo.name}.webp`);
    const info = await image.resize(photo.width, photo.height, { fit: 'cover' }).webp({ quality: 74 }).toFile(file);
    console.log(file, info.width + 'x' + info.height, Math.round(info.size / 1024) + ' KB');
  }
})();
