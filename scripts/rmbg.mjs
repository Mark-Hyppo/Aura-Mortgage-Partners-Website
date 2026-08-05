import sharp from 'sharp';
import { readdir, mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import { ROOT } from './hyppo.mjs';

// Nova paints a fake transparency checkerboard instead of writing real alpha, so
// the delivered PNGs are fully opaque. The icon artwork is one dark saturated
// color on a light ground, so key on the artwork: keep dark or saturated pixels,
// drop light desaturated ones. The circular ring means trim() lands on the ring's
// bounding box, so every icon comes out a consistent square.

const SRC = join(ROOT, 'scripts', 'icons-raw');
const OUT = join(ROOT, 'public', 'icons');
const SIZE = 384;

const KEEP_LUM = 170;
const DROP_LUM = 205;
const KEEP_CHROMA = 60;
const DROP_CHROMA = 28;

function alphaFor(r, g, b) {
  const lum = 0.299 * r + 0.587 * g + 0.114 * b;
  const chroma = Math.max(r, g, b) - Math.min(r, g, b);

  if (lum <= KEEP_LUM || chroma >= KEEP_CHROMA) return 255;
  if (lum >= DROP_LUM && chroma <= DROP_CHROMA) return 0;

  const byLum = 1 - (lum - KEEP_LUM) / (DROP_LUM - KEEP_LUM);
  const byChroma = (chroma - DROP_CHROMA) / (KEEP_CHROMA - DROP_CHROMA);
  return Math.round(Math.min(1, Math.max(0, Math.max(byLum, byChroma))) * 255);
}

await mkdir(OUT, { recursive: true });
const files = (await readdir(SRC)).filter((f) => f.endsWith('.png'));

for (const file of files) {
  const { data, info } = await sharp(join(SRC, file))
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  const out = Buffer.from(data);

  let opaque = 0;
  for (let i = 0; i < width * height; i++) {
    const o = i * channels;
    const a = alphaFor(data[o], data[o + 1], data[o + 2]);
    out[o + 3] = a;
    if (a > 200) opaque++;
  }

  const dest = join(OUT, file);
  await sharp(out, { raw: { width, height, channels } })
    .trim({ threshold: 1 })
    .resize(SIZE, SIZE, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ compressionLevel: 9 })
    .toFile(dest);

  const pct = ((opaque / (width * height)) * 100).toFixed(1);
  console.log(`${file}  ${pct}% opaque -> public/icons/${file}`);
}

console.log(`\n${files.length} icons written to public/icons/`);
