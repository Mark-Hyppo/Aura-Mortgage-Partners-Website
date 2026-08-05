import { writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT, runBatch } from './hyppo.mjs';

// The shipping logo is inline SVG in src/components/Logo.astro — the mark is pure
// geometry, so vector is scalable, weightless, and recolorable per background.
// This script generates the Nova raster alternative for comparison, per the brief:
// "northern lights swirling around the name Aura Mortgage Partners."
//
// Note on the wordmark: AIOS needed three attempts to render four legible letters.
// "Aura Mortgage Partners" is 22 characters. The `lockup` variant below asks for
// the text anyway so it can be compared, but expect malformed letterforms — the
// `ribbons` variant is the one meant to pair with typeset Fraunces.

const OUT = join(ROOT, 'scripts', 'logo-candidates');
mkdirSync(OUT, { recursive: true });

const RIBBONS =
  'Abstract aurora borealis ribbons, flowing luminous bands of light curving and ' +
  'swirling, teal #2FB6A8 blending into violet #7C6CF0, soft glow, dark midnight ' +
  '#0B1220 background, asymmetric organic flowing curves, wide horizontal ' +
  'composition with generous open space in the center, no frame, no badge, ' +
  'no closed shape, no text, no letters, no stars, no landscape, no mountains, ' +
  'no trees, no horizon line, no people.';

const LOCKUP =
  'Premium brand logo on a dark midnight #0B1220 background. Flowing aurora ' +
  'borealis ribbons of teal #2FB6A8 blending into violet #7C6CF0 swirl around and ' +
  'behind the text. The text reads exactly "AURA MORTGAGE PARTNERS", spelled ' +
  'A-U-R-A M-O-R-T-G-A-G-E P-A-R-T-N-E-R-S, in clean white geometric sans-serif, ' +
  'perfectly legible, correctly formed letters, horizontally centered on one ' +
  'baseline. No extra words, no misspellings, no frame, no badge.';

const VARIANTS = {
  ribbons: { prompt: RIBBONS, aspect_ratio: '16:9' },
  'ribbons-square': { prompt: RIBBONS, aspect_ratio: '1:1' },
  lockup: { prompt: LOCKUP, aspect_ratio: '16:9' },
};

const only = process.argv.slice(2);
const targets = only.length
  ? Object.entries(VARIANTS).filter(([k]) => only.includes(k))
  : Object.entries(VARIANTS);

await runBatch(
  targets.map(([slug, { prompt, aspect_ratio }]) => ({
    slug,
    // Unlike the flat icons, this benefits from prompt enhancement — no skip_enhance.
    payload: { prompt, type: 'image', model: 'gemini-pro-image', aspect_ratio },
  })),
  (slug, buf) => {
    writeFileSync(join(OUT, `${slug}.png`), buf);
    console.log(`downloaded ${slug}.png  ${(buf.length / 1024).toFixed(0)} KB`);
  }
);

console.log('\nCandidates in scripts/logo-candidates/. Compare against src/components/Logo.astro.');
console.log('Note: rmbg.mjs keys on dark artwork over a light ground. These ribbons are');
console.log('light over dark, so its thresholds need inverting before use on this art.');
