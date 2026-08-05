import sharp from 'sharp';
import opentype from 'opentype.js';
import { join } from 'node:path';
import { readFileSync } from 'node:fs';
import { ROOT } from './hyppo.mjs';

// Renders wordmark options onto the Nova ribbons for side-by-side comparison.
// Text is converted to SVG paths with opentype.js so Google fonts render without
// installing anything system-wide. Throwaway tooling — not part of the build.

const SRC = join(ROOT, 'scripts', 'logo-candidates', 'ribbons.png');
const FONTS = join(ROOT, 'scripts', 'fonts');
const TW = 900;
const TH = 502;

const load = (f) => opentype.parse(readFileSync(join(FONTS, f)).buffer);
const regular = load('Manrope-Reg.ttf');
const bold = load('Manrope-Bold.ttf');

/**
 * Summed glyph by glyph rather than via font.getAdvanceWidth() — that path runs
 * a ccmp feature query opentype.js cannot handle on some families.
 */
function measure(font, text, size, tracking) {
  const scale = size / font.unitsPerEm;
  let w = 0;
  for (const ch of text) w += font.charToGlyph(ch).advanceWidth * scale + tracking;
  return w - tracking;
}

/** Font size that makes `text` occupy exactly `targetW` at the given tracking. */
function fitToWidth(font, text, targetW, tracking) {
  const unit = measure(font, text, 100, 0) / 100;
  return (targetW - tracking * (text.length - 1)) / unit;
}

function pathFor(font, text, size, tracking, cx, baseline) {
  const total = measure(font, text, size, tracking);
  let x = cx - total / 2;
  const combined = new opentype.Path();
  for (const ch of text) {
    const g = font.charToGlyph(ch);
    combined.extend(g.getPath(x, baseline, size));
    x += g.advanceWidth * (size / font.unitsPerEm) + tracking;
  }
  return combined.toPathData(2);
}

// All Manrope. The only variable is how wide the subtitle runs relative to AURA.
// Type is locked: Manrope, AURA at 38% width, MORTGAGE PARTNERS at 74%.
// Only the fill colour varies here.
const VARIANTS = [
  { id: '1  warm cream',        fill: '#F6F1E6' },
  { id: '2  champagne gold',    fill: '#EBD3A0' },
  { id: '3  pale teal',         fill: '#CDF2E9' },
  { id: '4  pale violet',       fill: '#DFD8FB' },
  { id: '5  ice blue',          fill: '#DCEAF7' },
  { id: '6  soft mint',         fill: '#B7EFD8' },
];

const base = await sharp(SRC).resize(TW, TH, { fit: 'cover' }).png().toBuffer();

async function tile(v) {
  const cx = TW / 2;
  const auraSize = fitToWidth(regular, 'AURA', TW * 0.38, 14);
  const subSize = fitToWidth(bold, 'MORTGAGE PARTNERS', TW * 0.74, 8);

  const top = pathFor(regular, 'AURA', auraSize, 14, cx, TH * 0.5);
  const sub = pathFor(bold, 'MORTGAGE PARTNERS', subSize, 8, cx, TH * 0.5 + subSize * 1.5);

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${TW}" height="${TH}">
    <path d="${top}" fill="${v.fill}"/>
    <path d="${sub}" fill="${v.fill}" fill-opacity="0.94"/>
    <text x="18" y="${TH - 16}" font-family="Segoe UI" font-size="17"
          fill="#ffffff" fill-opacity="0.6">${v.id}   ${v.fill}</text>
  </svg>`;

  const overlay = await sharp(Buffer.from(svg), { density: 72 })
    .resize(TW, TH, { fit: 'fill' })
    .png()
    .toBuffer();

  return sharp(base).composite([{ input: overlay, top: 0, left: 0 }]).png().toBuffer();
}

const tiles = [];
for (const v of VARIANTS) tiles.push(await tile(v));

await sharp({ create: { width: TW * 2, height: TH * 3, channels: 4, background: '#000000' } })
  .composite(tiles.map((input, i) => ({ input, left: (i % 2) * TW, top: Math.floor(i / 2) * TH })))
  .png()
  .toFile(join(ROOT, 'scripts', 'logo-candidates', 'variants.png'));

console.log('variants.png written');
