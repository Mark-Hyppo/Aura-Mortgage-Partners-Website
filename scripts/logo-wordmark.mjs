import sharp from 'sharp';
import opentype from 'opentype.js';
import { join } from 'node:path';
import { readFileSync } from 'node:fs';
import { ROOT } from './hyppo.mjs';

// Builds the final Aura lockup: Nova's aurora ribbons with the wordmark typeset
// into the negative space at the center. Text is converted to SVG paths with
// opentype.js so Manrope renders without installing it system-wide.
//
// Approved: Manrope, champagne gold, AURA filling 38% of the width and
// MORTGAGE PARTNERS filling 74% — the subtitle deliberately runs wider than
// the name. Gold is the warm counterpoint to the teal/violet ribbons; it
// separates from them where a cool tint would blend in.

const SRC = join(ROOT, 'scripts', 'logo-candidates', 'ribbons.png');
const FONTS = join(ROOT, 'scripts', 'fonts');

const FILL = '#EBD3A0';
const AURA_W = 0.38;
const SUB_W = 0.74;
const AURA_TRACK = 14;
const SUB_TRACK = 8;

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

const { width: W, height: H } = await sharp(SRC).metadata();
const cx = W / 2;

const auraSize = fitToWidth(regular, 'AURA', W * AURA_W, AURA_TRACK);
const subSize = fitToWidth(bold, 'MORTGAGE PARTNERS', W * SUB_W, SUB_TRACK);

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <path d="${pathFor(regular, 'AURA', auraSize, AURA_TRACK, cx, H * 0.5)}" fill="${FILL}"/>
  <path d="${pathFor(bold, 'MORTGAGE PARTNERS', subSize, SUB_TRACK, cx, H * 0.5 + subSize * 1.5)}"
        fill="${FILL}" fill-opacity="0.94"/>
</svg>`;

const overlay = await sharp(Buffer.from(svg), { density: 72 })
  .resize(W, H, { fit: 'fill' })
  .png()
  .toBuffer();

// Composite to a buffer FIRST, then resize that. sharp applies resize before
// composite within a single pipeline, so cropping in the same chain would shrink
// the base below the overlay and throw "must have same dimensions or smaller".
const composed = await sharp(SRC)
  .composite([{ input: overlay, top: 0, left: 0 }])
  .png()
  .toBuffer();

await sharp(composed).toFile(join(ROOT, 'scripts', 'logo-candidates', 'lockup-final.png'));

// og:image / twitter:image. 1200x630 is the platform standard.
const info = await sharp(composed)
  .resize(1200, 630, { fit: 'cover', position: 'center' })
  .jpeg({ quality: 86 })
  .toFile(join(ROOT, 'public', 'og-image.jpg'));

console.log(`lockup-final.png       ${W}x${H}`);
console.log(`public/og-image.jpg    1200x630  ${(info.size / 1024).toFixed(0)} KB`);
