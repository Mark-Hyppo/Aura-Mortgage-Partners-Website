import { writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT, runBatch } from './hyppo.mjs';

// Hero background. It sits BEHIND centred white text with a midnight scrim over
// it, so it has to be dark, low-contrast through the middle, and free of any
// busy detail that would fight the headline. House-framing line art is drawn on
// a canvas on top of this, so the image itself stays quiet.

const OUT = join(ROOT, 'scripts', 'hero-candidates');
mkdirSync(OUT, { recursive: true });

const base =
  'deep midnight navy #0B1220 and teal colour grade, cinematic, moody, ' +
  'low contrast through the centre of the frame, generous dark negative space, ' +
  'soft atmospheric haze, subtle aurora-like teal and violet light in the sky, ' +
  'no text, no letters, no logos, no watermark, no people, no faces, no cars in focus. Subject: ';

const VARIANTS = {
  'aerial-dusk':
    base +
    'high aerial view of a South Florida residential neighbourhood at dusk, ' +
    'rooftops and palm trees, a few warm lights in windows, waterway threading through',
  'frames-dusk':
    base +
    'a row of new houses under construction at dusk, exposed timber roof trusses ' +
    'and wall framing silhouetted against the sky, quiet job site, no machinery in focus',
  'street-night':
    base +
    'a quiet residential street of Florida homes at night seen from a low angle, ' +
    'palm trees along the kerb, warm porch lights, wet asphalt reflections',
};

const only = process.argv.slice(2);
const targets = only.length
  ? Object.entries(VARIANTS).filter(([k]) => only.includes(k))
  : Object.entries(VARIANTS);

await runBatch(
  targets.map(([slug, prompt]) => ({
    slug,
    payload: { prompt, type: 'image', model: 'gemini-pro-image', aspect_ratio: '16:9' },
  })),
  (slug, buf) => {
    writeFileSync(join(OUT, `${slug}.png`), buf);
    console.log(`downloaded ${slug}.png  ${(buf.length / 1024).toFixed(0)} KB`);
  }
);

console.log('\nCandidates in scripts/hero-candidates/.');
