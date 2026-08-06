// Turns the client's supplied logo into the two web assets the site uses.
//
// The source is a 1254x1254 export on a flat #FEFEFE ground with no alpha. Two
// things have to happen: the background has to become transparent so the mark
// sits on white AND on halo, and the square lockup has to yield a shape that
// works in a nav bar.
//
// Row analysis of the source finds four content bands:
//   82- 702  circular mark
//  712- 962  AURA wordmark
// 1002-1042  MORTGAGE PARTNERS
// 1087-1135  "Illuminating the Path to Homeownership." tagline
//
// Header uses bands 1-2. At a usable header height the two lower lines render
// a few pixels tall and turn to mush, so they are dropped there and the complete
// lockup — every band — carries the footer, where there is vertical room.
// Nothing is re-typeset; both outputs are straight crops of the client artwork.
//
//   node scripts/gen-logo-assets.mjs

import sharp from "sharp";

const SRC = "Aura Mortgage Partners logo.png";
const BG_MIN = 240; // every channel above this is background

const { data, info } = await sharp(SRC).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width: W, height: H, channels: C } = info;

// Flood fill the background inward from the border. A plain threshold would also
// punch out the light interior of the window panes and the gold arc's highlight;
// only pixels reachable from outside are actually background.
const bg = new Uint8Array(W * H);
const stack = [];
const push = (x, y) => {
  if (x < 0 || y < 0 || x >= W || y >= H) return;
  const p = y * W + x;
  if (bg[p]) return;
  const i = p * C;
  if (data[i] < BG_MIN || data[i + 1] < BG_MIN || data[i + 2] < BG_MIN) return;
  bg[p] = 1;
  stack.push(p);
};

for (let x = 0; x < W; x++) {
  push(x, 0);
  push(x, H - 1);
}
for (let y = 0; y < H; y++) {
  push(0, y);
  push(W - 1, y);
}
while (stack.length) {
  const p = stack.pop();
  const x = p % W;
  const y = (p - x) / W;
  push(x + 1, y);
  push(x - 1, y);
  push(x, y + 1);
  push(x, y - 1);
}

for (let p = 0; p < W * H; p++) {
  if (bg[p]) data[p * C + 3] = 0;
}

const cut = await sharp(data, { raw: { width: W, height: H, channels: C } }).png().toBuffer();

// Horizontal extent of the inked pixels, so both crops share one centre line.
let left = W;
let right = 0;
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    const p = y * W + x;
    if (bg[p]) continue;
    if (x < left) left = x;
    if (x > right) right = x;
  }
}
const padX = 8;
const cropLeft = Math.max(0, left - padX);
const cropWidth = Math.min(W - cropLeft, right - cropLeft + 1 + padX);

const variants = [
  { file: "public/logo.png", top: 74, bottom: 970, height: 520, label: "header  mark + AURA" },
  { file: "public/logo-full.png", top: 74, bottom: 1143, height: 760, label: "footer  full lockup" },
];

for (const v of variants) {
  const out = await sharp(cut)
    .extract({ left: cropLeft, top: v.top, width: cropWidth, height: v.bottom - v.top })
    .resize({ height: v.height, fit: "inside", withoutEnlargement: true })
    .png({ compressionLevel: 9, palette: true, quality: 92 })
    .toBuffer();

  const meta = await sharp(out).metadata();
  await sharp(out).toFile(v.file);
  console.log(
    `${v.label.padEnd(22)} -> ${v.file.padEnd(22)} ${meta.width}x${meta.height}  ` +
      `${(out.length / 1024).toFixed(0)}KB  aspect ${(meta.width / meta.height).toFixed(2)}:1`
  );
}
