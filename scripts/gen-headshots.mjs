// Crops the supplied portraits to square WebP for the team cards.
//
// Mark Wilkinson's file arrives with someone else's framing baked in: a green
// accent bar across the bottom (rows 583-605) and white margins. Both are cropped
// off before the square crop, or the green survives into the circular avatar and
// clashes with the navy palette.
//
// The square crop is biased upward rather than centred — a centred square on a
// head-and-shoulders portrait cuts the forehead and leaves too much jacket.
//
//   node scripts/gen-headshots.mjs

import sharp from "sharp";

const OUT_SIZE = 512; // 160px display at 2x, with room to spare

const sources = [
  {
    label: "Mark Wilkinson",
    src: "Mark Wilkinson.jpg",
    out: "public/team/mark-wilkinson.webp",
    // Drop the green bar and the white margin around it.
    preCrop: { top: 0, bottomTrim: 26 },
    faceBias: 0.06,
  },
  {
    label: "Lorie Lewis (placeholder)",
    src: "C:/Users/Mark/Desktop/AIOS Insurance and Loans Website/src/assets/portrait/portrait-studio.png",
    out: "public/team/lorie-lewis.webp",
    preCrop: { top: 0, bottomTrim: 0 },
    faceBias: 0.02,
  },
];

for (const s of sources) {
  const img = sharp(s.src);
  const { width, height } = await img.metadata();

  // Strip any baked-on framing first.
  const usableTop = s.preCrop.top;
  const usableHeight = height - s.preCrop.top - s.preCrop.bottomTrim;

  // Largest square that fits the usable area, biased toward the face.
  const side = Math.min(width, usableHeight);
  const left = Math.round((width - side) / 2);
  const top = Math.max(
    usableTop,
    Math.min(usableTop + usableHeight - side, Math.round(usableTop + usableHeight * s.faceBias))
  );

  const buf = await img
    .extract({ left, top, width: side, height: side })
    .resize(OUT_SIZE, OUT_SIZE, { fit: "cover" })
    .webp({ quality: 82 })
    .toBuffer();

  await sharp(buf).toFile(s.out);
  console.log(
    `${s.label.padEnd(26)} ${width}x${height} -> ${OUT_SIZE}x${OUT_SIZE}  ` +
      `${(buf.length / 1024).toFixed(0)}KB  ${s.out}`
  );
}
