import { writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT, runBatch } from './hyppo.mjs';

const OUT = join(ROOT, 'scripts', 'icons-raw');
mkdirSync(OUT, { recursive: true });

// One shared style string with only the subject swapped — twenty separately
// prompted icons will not read as a set. The circle is required here, so the
// AIOS "no border, no frame" clause is inverted. The ring is a stroke and the
// glyph is a fill; Nova drifts toward making both strokes, hence the shouting.
const style = (color) =>
  `Minimal flat vector icon containing EXACTLY TWO ELEMENTS AND NOTHING ELSE: ` +
  `(1) ONE single thin circular outline ring, and (2) ONE solid filled glyph inside it. ` +
  'CRITICAL: draw ONE circle only. NOT two circles. NOT concentric circles. ' +
  'NO ring inside a ring, NO double ring, NO double border, NO outer circle plus inner circle. ' +
  'If you are about to draw a second circle, do not. Exactly one circle total. ' +
  'The glyph sits fully inside that one circle with a generous even margin on all sides ' +
  'and never touches, crosses, or overlaps the ring. ' +
  `One single solid color ${color} and nothing else, on a pure white background, ` +
  'perfectly centered. ' +
  'The glyph is a SOLID FILLED SILHOUETTE, completely filled in with solid color, ' +
  'like a filled pictogram, chunky and bold and heavy, ' +
  'NOT a thin line drawing, NOT an outline, NOT hollow, no stroke-only shapes, ' +
  'small cutout details knocked out of the solid shape where needed. ' +
  'Professional mortgage and real estate iconography. ' +
  'No gradient, no shadow, no 3D, no text, no letters, no numbers, no watermark, ' +
  'no square frame, no background shape behind the ring. Subject: ';

const MIDNIGHT = 'very dark navy black #0B1220';
const TEAL = 'deep teal #12786E';

// Color encodes the taxonomy and is baked into the raster — it cannot be
// changed later. Inside the Box = midnight, Outside the Box = teal.
const ICONS = {
  conforming: [MIDNIGHT, 'a simple single-family house with a pitched roof'],
  // Deliberately residential, NOT classical. The first pass used "classical portico
  // and columns" and came back looking like a federal treasury building — a MAP Rule
  // problem, not a taste one. See COMPLIANCE.md section 1.
  fha: [MIDNIGHT, 'an ordinary suburban family house with a pitched roof and a small covered front porch with two slim posts, no columns, not a government building, not a bank'],
  va: [MIDNIGHT, 'a shield with a single five-pointed star in the center'],
  jumbo: [MIDNIGHT, 'a large wide house with two side wings, wider than it is tall'],
  'hometown-heroes': [MIDNIGHT, 'a house with a star badge above the roofline'],
  refinance: [MIDNIGHT, 'a house with two curved arrows forming a cycle around it'],

  'super-jumbo': [TEAL, 'a grand estate with a tall central block and two flanking wings'],
  reverse: [TEAL, 'a house with a single circular arrow curving counterclockwise around it'],
  heloc: [TEAL, 'a house beside an open padlock'],
  'non-prime': [TEAL, 'a house with an upward trending arrow rising beside it'],
  dscr: [TEAL, 'a small apartment building with a rectangular rent sign in front'],
  construction: [TEAL, 'a solid filled house silhouette with a tall construction crane standing beside it'],
  bridge: [TEAL, 'a suspension bridge span with two tall towers and cables'],
  'cross-collateral': [TEAL, 'two houses side by side joined by a single chain link between them'],
  'hard-money': [TEAL, 'a house beside a stack of round coins'],
  'foreign-nationals': [TEAL, 'a globe with meridian lines and a small house on its face'],
  'lot-loans': [TEAL, 'an empty building plot with a boundary stake and a survey marker'],
  'co-op': [TEAL, 'a multi-unit residential building with one shared central entry door'],
  'non-warrantable-condo': [TEAL, 'a wide solid filled condominium tower building with many square windows knocked out of it, and one window near the center left empty as a large highlighted square'],
  commercial: [TEAL, 'a storefront building with a striped awning and a display window'],
};

// Pass slugs to regenerate only those: node scripts/gen-icons.mjs fha va
const only = process.argv.slice(2);
const targets = only.length
  ? Object.entries(ICONS).filter(([s]) => only.includes(s))
  : Object.entries(ICONS);

if (!targets.length) {
  console.error(`no matching icons. known: ${Object.keys(ICONS).join(', ')}`);
  process.exit(1);
}

await runBatch(
  targets.map(([slug, [color, subject]]) => ({
    slug,
    payload: {
      prompt: style(color) + subject,
      type: 'image',
      // gemini-pro-image is the default and produced 19 of 20 cleanly. It kept
      // drawing a second concentric ring on fha across three attempts, so that
      // one is regenerated on the story-image model instead:
      //   NOVA_MODEL=gpt-image-2 node scripts/gen-icons.mjs fha
      model: process.env.NOVA_MODEL ?? 'gemini-pro-image',
      aspect_ratio: '1:1',
      skip_enhance: true,
    },
  })),
  (slug, buf) => {
    writeFileSync(join(OUT, `${slug}.png`), buf);
    console.log(`downloaded ${slug}.png  ${(buf.length / 1024).toFixed(0)} KB`);
  }
);

console.log('\nNext: npm run rmbg   (Nova ships a fake transparency checkerboard, not real alpha)');
