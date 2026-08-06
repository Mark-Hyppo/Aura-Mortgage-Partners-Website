// Builds public/og-image.jpg from the client's real lockup.
//
// The previous file was the generated placeholder logo on midnight. The real mark
// is navy, so the card is light — same decision as the header and footer, and for
// the same measured reason: navy on navy is 1.18:1.
//
//   node scripts/gen-og-image.mjs

import sharp from "sharp";

const W = 1200;
const H = 630;
const NAVY = "#002050";
const GOLD = "#D0A030";

const logo = await sharp("public/logo-full.png")
  .resize({ height: 380, fit: "inside" })
  .toBuffer();
const { width: lw, height: lh } = await sharp(logo).metadata();

const backdrop = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
     <rect width="${W}" height="${H}" fill="#ffffff"/>
     <rect x="0" y="0" width="${W}" height="10" fill="${NAVY}"/>
     <rect x="0" y="${H - 10}" width="${W}" height="10" fill="${GOLD}"/>
     <text x="${W / 2}" y="${H - 62}" text-anchor="middle"
           font-family="Manrope, Segoe UI, sans-serif" font-size="27" font-weight="600"
           fill="${NAVY}" letter-spacing="0.5">Boca Raton, Florida &#183; (561) 755-7478</text>
   </svg>`
);

await sharp(backdrop)
  .composite([{ input: logo, left: Math.round((W - lw) / 2), top: Math.round((H - lh) / 2) - 44 }])
  .jpeg({ quality: 90, chromaSubsampling: "4:4:4" })
  .toFile("public/og-image.jpg");

const meta = await sharp("public/og-image.jpg").metadata();
console.log(`og-image.jpg  ${meta.width}x${meta.height}  ${(meta.size / 1024).toFixed(0)}KB`);
