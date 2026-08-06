// Recolours the 20 program icons to the real brand palette and emits WebP.
//
// The icons were generated with the invented palette baked into the raster —
// midnight #0B1220 for Inside the Box, teal #12786E for Outside the Box. Nothing
// about the artwork needs to change, only the ink, so they are recoloured here
// rather than regenerated through the image API: deterministic, instant, and it
// cannot come back with a second concentric ring.
//
// The taxonomy still travels in the colour, but now in the brand's actual two
// colours: navy for agency-shaped files, gold for the specialty book.
// Anti-aliasing lives in the alpha channel, so a flat RGB fill preserves the edges.
//
//   node scripts/recolor-icons.mjs

import sharp from "sharp";
import { readdirSync, statSync } from "node:fs";

const NAVY = [0x00, 0x20, 0x50]; // Inside the Box  — 15.88:1 on white
const GOLD = [0x8a, 0x6a, 0x24]; // Outside the Box —  5.04:1 on white

const INSIDE = new Set(["conforming", "fha", "va", "jumbo", "hometown-heroes", "refinance"]);

const dir = "public/icons";
const files = readdirSync(dir).filter((f) => f.endsWith(".png"));

let before = 0;
let after = 0;

for (const file of files) {
  const slug = file.replace(/\.png$/, "");
  const target = INSIDE.has(slug) ? NAVY : GOLD;
  const src = `${dir}/${file}`;
  before += statSync(src).size;

  const { data, info } = await sharp(src)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  for (let i = 0; i < data.length; i += info.channels) {
    if (data[i + 3] === 0) continue;
    data[i] = target[0];
    data[i + 1] = target[1];
    data[i + 2] = target[2];
  }

  const out = await sharp(data, {
    raw: { width: info.width, height: info.height, channels: info.channels },
  })
    .webp({ quality: 88, alphaQuality: 100 })
    .toBuffer();

  await sharp(out).toFile(`${dir}/${slug}.webp`);
  after += out.length;
  console.log(
    `${slug.padEnd(24)} ${INSIDE.has(slug) ? "navy" : "gold"}  ` +
      `${(statSync(src).size / 1024).toFixed(0)}KB -> ${(out.length / 1024).toFixed(0)}KB`
  );
}

console.log(
  `\n${files.length} icons: ${(before / 1024).toFixed(0)}KB -> ${(after / 1024).toFixed(0)}KB ` +
    `(${(100 - (after / before) * 100).toFixed(0)}% smaller)`
);
console.log("The .png originals are kept as the recolour source. Delete them once happy.");
