# Aura Mortgage Partners

Multi-page marketing site for **Aura Mortgage Partners LLC**, a Florida mortgage brokerage in Boca
Raton. Originators: **Mark Wilkinson, NMLS ID# 297944** and **Lorie Lewis, NMLS ID# 273007**.
Astro 5 with Tailwind CSS v4, static output, deployed to Vercel. Domain:
`auramortgagepartners.com`.

**This is a regulated financial advertiser.** SAFE Act, TILA/Reg Z, the CFPB MAP Rule, and
ECOA/Fair Housing bind every word on the site. Read [`COMPLIANCE.md`](COMPLIANCE.md) before touching
any copy.

```bash
npm install
npm run dev       # localhost:4321
npm run build
npm run preview
```

**Astro 6 does not work here.** It ships Rolldown-Vite, which fails against `@tailwindcss/vite` with
`Missing field 'tsconfigPaths' on BindingViteResolvePluginConfig.resolveOptions`. Stay on the
Astro 5 line until that is fixed upstream.

## Status: not launch-ready

Structure, programs, compliance scaffolding, and imagery are done.

**The site reads as finished, but most of its prose is our draft.** Placeholders are deliberately
not visually flagged so the build can be demoed, which means nothing on the page distinguishes
draft copy from confirmed copy. [`PLACEHOLDERS.md`](PLACEHOLDERS.md) is the only register — do not
launch without walking it.

**Preview deploys only. Do not point `auramortgagepartners.com` at this build until the checklist
below is clear.**

## Editing content

Single source of truth is [`src/data/`](src/data/) — `site.ts`, `programs.ts`, `team.ts`. Nothing
else needs editing to fill the site in.

Placeholders use a sentinel string. `pending("brief")` marks a field as outstanding, and the brief
text is what renders on the page, so each placeholder doubles as the writing prompt for that field.
To fill one in, replace the whole `pending(...)` call with the real string:

Two conventions are in play:

- **`// DRAFT:` comments** mark our stand-in copy. `grep -rn "DRAFT:" src/` lists every one.
- **Empty strings** mark facts we refused to guess — chiefly license numbers. Every component
  omits an empty value cleanly rather than rendering a gap, so the page still looks finished.

The `pending()` sentinel and `Copy.astro` remain in place for any field that should render a loud
amber prompt instead, but nothing currently uses them.

## Confirmed by client

Legal name **Aura Mortgage Partners LLC**, phone **(561) 755-7478**, city **Boca Raton, FL**
(street address and ZIP still outstanding), hours **9–5 seven days a week including weekends and
holidays**, domain **auramortgagepartners.com**. Mark Wilkinson's NMLS **297944** is confirmed against public
record.

The loan program taxonomy — "Inside the Box" and "Outside the Box" — is Mark Wilkinson's own
framing, taken from his existing site `markmymortgage.com`, whose phone number matches the brief.

## Launch blockers

- [ ] **Company NMLS ID for Aura Mortgage Partners LLC** (`compliance.companyNmls`). Required on
      every page by the SAFE Act. No public record found; must come from the client.
- [ ] **Boca Raton street address and ZIP** (`site.street`, `site.postal`, `site.geo`). Currently
      `pending()`, so address blocks show the city line only and the `/contact` map is omitted.
      Re-derive the coordinates from the real address — do not reuse the old ZIP centroid.
      **This also gates Areas We Serve**: the 10 cities were selected by a ~25-mile radius that
      has not been computed from a real address, so the city list is provisional.
- [ ] **Mark Wilkinson to confirm the 10 Areas We Serve financing paragraphs and ~21 FAQs**
      (`src/data/areas.ts`). Drafted from general South Florida lending knowledge.
- [ ] **Lorie Lewis's headshot** (`team.ts`). The current image is an AI-generated portrait of
      someone who does not exist, standing above her real name and NMLS ID. Replace before launch.
- [ ] **Confirm Lorie Lewis's NMLS ID on the registry** (`team.ts`). Now set to `273007`. Group One
      Mortgage's originator roster lists her at it and a ZoomInfo MLO profile matches; `334279` from
      the brief returns no originator anywhere and looks like a transcription error. The AIOS docs
      were right. Neither source page could be read directly — grouponemortgage.us refused the
      connection and nmlsconsumeraccess.org 403s automated requests — so a human still needs to look
      up `273007` under Individuals to close this out.
- [ ] **The "Arch Mortgage" reference.** Copied from an email; nobody knows what it is. Nothing is
      built for it. **If Arch is the sponsoring entity, its NMLS ID likely has to appear alongside
      Aura's** — this is the one open item with compliance consequences. Tracked as
      `compliance.sponsorNmls`; delete that field if Aura originates independently.
- [ ] **Reg Z sign-off on the term-options block** on `/loan-programs`. Period of repayment is a
      triggering term under §1026.24(d)(1). The block ships with the full disclosure adjacent, but
      it deliberately walks up to a bright line and needs the client or their counsel to approve it.
- [ ] Public email address (`site.email`) — `mark@markmymortgage.com` is his personal one
- [ ] Both bios (`team.ts`). Mark Wilkinson's headshot is supplied; Lorie's is a placeholder — see above
- [ ] Company story, three paragraphs (`about.intro`, `about.body`)
- [ ] Confirm FL is the only licensed state (`compliance.statesLicensed` and `/licensing`)
- [ ] Clarify what **"AI HELOC"** in the brief means — the `heloc` page ships as a standard HELOC
- [ ] Social profile URLs (`social`) — the footer column renders a placeholder, not dead links
- [ ] Hyppo tenant slug, blog slug, pixel ID, contact form slug (`hyppo`)
- [ ] HyppoCRM contact form created **and published** — API-created forms arrive unpublished and
      reject every submission with `"Form not found or not published"`. Flip Published in the UI
      and submit a live test.
- [ ] Privacy and Terms reviewed by counsel. The text is the house boilerplate supplied by Mark,
      filled in for Aura. It is written for a service business, so some clauses (deposits,
      materials, restocking fees) read oddly for a brokerage, and it is **missing a GLBA safeguards
      section and a TCPA / Do Not Call section**, both of which a mortgage brokerage normally
      carries. No legal text was invented to fill those gaps.

Before any production deploy:

```bash
npm run build

# 1. Draft copy still in place. Every hit needs client confirmation.
grep -rn "DRAFT:" src/

# 2. Sitewide compliance coverage. All four must equal the page count (43).
grep -rl nmlsconsumeraccess dist --include=*.html | wc -l
grep -rl 'Equal Housing Lender' dist --include=*.html | wc -l
grep -rl '297944' dist --include=*.html | wc -l
grep -ril 'not a commitment to lend' dist --include=*.html | wc -l

# 3. The company NMLS ID. Currently 0 — must equal 43 before launch.
grep -rl 'Company NMLS' dist --include=*.html | wc -l

# 4. Reg Z / MAP Rule content scan. Every hit needs a human read.
grep -rhoiE '[0-9]+(\.[0-9]+)?%|guarantee[a-z]*|lowest rate[s]?|instant [a-z]+' dist --include=*.html | sort | uniq -c
```

As of the current build, checks 1–2 pass at 43/43 and scan 4 returns only SVG gradient stops, a
URL-encoded map query, and the factual VA phrases "VA-guaranteed" and "guaranteed by the Department
of Veterans Affairs", plus "personal guarantee" in the commercial FAQ. **No rate, payment, or
down-payment figure appears anywhere on the site.** Check 3 returns **0** — that is the blocker.

## Structure

`Header` and `Footer` live inside [`src/layouts/Layout.astro`](src/layouts/Layout.astro), not in the
pages. The footer carries the company NMLS ID, both originators' NMLS IDs, the Equal Housing Lender
mark, the nmlsconsumeraccess.org link, and the underwriting disclaimer — putting it in the layout
makes it structurally impossible to ship a page without compliance text.

43 pages from 14 route files:

```
/                        /about              /contact         /licensing
/loan-programs           /team               /privacy         /terms
/loan-programs/[slug]    /team/[slug]        /blog
```

`/loan-programs/[slug]` generates 20 pages from `programs.ts` via `getStaticPaths()`. One array
drives the nav, both index grids, the detail pages, the sitemap, and the `hasOfferCatalog` JSON-LD.

**The header scrolls with the page** — not sticky — and carries no CTA. It is midnight rather than
white so it can hold the champagne logo, which fails contrast on a light background.

There is **no sticky mobile call bar**. It existed as the compensating control for a non-sticky
header, but `SectionCta.astro` now closes every section with a centred Call button, so the bar was
covering content without adding reach. The home page carries six call links.

## SEO

`Layout.astro` emits title, description, keywords, author, language, canonical, the full Open Graph
and Twitter Card sets, geo meta, and JSON-LD for `MortgageBroker`, `WebSite`, and `BreadcrumbList`
on nested routes. Program pages add `FAQPage`; team pages add `Person` with the NMLS ID as
`identifier`.

**Title and description lengths are enforced at build time.** `Layout.astro` throws if any title
reaches 70 characters or any description reaches 155. With 31 pages this cannot be eyeballed, and
the program pages are where it breaks first — that is why `programs.ts` carries a short `titleName`
alongside the full display `name`.

Every tag that depends on a pending value is omitted rather than filled with placeholder text, so a
preview never publishes a `__PENDING__` string into metadata or structured data.

Canonical host is `https://www.auramortgagepartners.com`; apex should redirect to www.

## Design tokens

Defined in [`src/styles/global.css`](src/styles/global.css) under `@theme` (Tailwind v4 syntax).

| Token | Value | Use |
| --- | --- | --- |
| `--color-midnight` | `#0B1220` | Base, hero, footer |
| `--color-slate-deep` | `#131C30` | Footer base bar |
| `--color-aurora` | `#2FB6A8` | CTA fill — the action colour |
| `--color-aurora-deep` | `#12786E` | Teal **text** on light backgrounds |
| `--color-aurora-lo` | `#7C6CF0` | Gradient partner, decorative |
| `--color-champagne` | `#EBD3A0` | Brand highlight — **dark surfaces only** |
| `--color-champagne-deep` | `#8A6A24` | Gold text on light backgrounds |
| `--color-halo` | `#F4F7FB` | Page background |

Contrast rules, verified:

| Pair | Ratio | Verdict |
| --- | --- | --- |
| `aurora` fill + `midnight` text (the CTA) | 7.45:1 | AAA |
| `aurora` fill + **white** text | 2.51:1 | **Fails. Never do this.** |
| `champagne` on `midnight` | 12.80:1 | AAA |
| `champagne` on **white** | 1.46:1 | **Fails. Dark surfaces only.** |
| `aurora-deep` on `halo` | 5.03:1 | AA |
| `champagne-deep` on `halo` | 4.69:1 | AA |
| `aurora-lo` on `midnight` | 4.68:1 | AA, decorative only |

Two accent colours with distinct jobs: **teal is the action colour** (buttons, links on light) and
**champagne gold is the brand highlight** (the logo wordmark on dark, icon accents and link hovers
in the footer and hero). Gold never appears as text on a light background — use `champagne-deep`
there if gold is ever needed on white.

**Manrope** for everything, headings and body, differentiated by weight. One Google Fonts request.
UI icons are inline SVG in `Icon.astro` — no icon package.

**No eyebrows.** Section headings go straight into the H2 with a supporting paragraph beneath.

## Imagery

House policy: Nova-generated, never stock. Requires `HYPPO_NOVA_KEY` in `.env` (see
`.env.example`); `.env` is gitignored and no key belongs in a tracked file.

```bash
node scripts/gen-icons.mjs            # all 20 program icons
node scripts/gen-icons.mjs fha va     # regenerate a subset only
node scripts/rmbg.mjs                 # required after every batch
node scripts/gen-logo.mjs             # Nova logo candidates
```

**`rmbg.mjs` is mandatory, not optional.** Nova paints a fake transparency checkerboard instead of
writing real alpha, so delivered PNGs are fully opaque. `rmbg.mjs` keys on the artwork (keep dark or
saturated pixels, drop light desaturated ones), trims to the ring's bounding box, and resizes to
128px. Skipping it ships white boxes.

Program icons are one solid color inside a single circular ring, on transparent backgrounds. Color
encodes the taxonomy and is baked into the raster: **Inside the Box is midnight, Outside the Box is
teal.**

> The `fha` icon was regenerated because the first prompt — "classical portico and columns" —
> produced something that read as a federal treasury building. That is a **MAP Rule problem, not a
> taste one.** The prompt now says "ordinary suburban family house… not a government building, not a
> bank." Review `fha` and `va` against COMPLIANCE.md §1 if either is ever regenerated.

> `gemini-pro-image` drew a second concentric ring on `fha` across three attempts despite explicit
> instructions. `gpt-image-2` got it right first try. If an icon keeps ignoring the single-ring
> rule, switch models rather than rewording: `NOVA_MODEL=gpt-image-2 node scripts/gen-icons.mjs fha`.

**Logo.** Two artefacts, built differently on purpose.

The header/footer mark is inline SVG in [`src/components/Logo.astro`](src/components/Logo.astro) —
aurora ribbons plus a typeset Manrope wordmark. Pure geometry, so it is scalable, weightless, and
recolours per background (`tone="light"` gives the champagne wordmark for the midnight footer).

The full lockup is `scripts/logo-wordmark.mjs`: it takes Nova's `ribbons.png`, which leaves a clean
void in the centre, and typesets the wordmark into that negative space with opentype.js — text
converted to paths so Manrope renders without installing it system-wide. Champagne gold, AURA
filling 38% of the width and MORTGAGE PARTNERS filling 74%, so the subtitle deliberately runs wider
than the name. Output is `scripts/logo-candidates/lockup-final.png` and, cropped to 1200×630,
`public/og-image.jpg`.

```bash
node scripts/logo-wordmark.mjs    # rebuild the lockup and og:image
node scripts/logo-variants.mjs    # render comparison options
```

> `scripts/fonts/` holds TTFs pulled from Google Fonts for the path conversion. They are fetched by
> requesting the `css2` endpoint with an old user-agent string, which makes Google serve TTF instead
> of woff2 — opentype.js cannot read woff2.

> Two sharp gotchas worth keeping: sharp applies `resize` **before** `composite` within one
> pipeline, so cropping and compositing in the same chain throws "Image to composite must have same
> dimensions or smaller" — composite to a buffer first. And `font.getAdvanceWidth()` runs a ccmp
> feature query opentype.js cannot handle on some families, so widths are summed glyph by glyph.

> The supplied Hyppo API key lacks the `media:create` scope, so the logo could not be uploaded to
> subaccount media storage as originally specified. It ships from `public/` instead. Re-point
> `media.logo` in `site.ts` if the key is later scoped and the asset is moved.

## Blog

`/blog` is a HyppoCRM iframe embed with postMessage auto-resize, same as every other Hyppo client
site. Listing, pagination, search, post detail pages, JSON-LD, and the blog sitemap all live in
HyppoCRM. **Do not add post routes or local post data here.**

Until `hyppo.tenantSlug` and `hyppo.blogSlug` are set, the page renders its shell with a placeholder
instead of the iframe. ASP-Rank configuration is CRM-side work and is not part of this repo — but
when the tenant's brand voice is set up, paste [`COMPLIANCE.md`](COMPLIANCE.md) into the system
prompt. The website build cannot constrain generated posts.

## Analytics

The Hyppo tracking pixel, emitted from `Layout.astro` only when `hyppo.pixelId` is set.

`Footer.astro` also fires a **`call_click`** event to `https://hyppohq.io/api/v1/analytics/track` on
every `[data-call-cta]` click. No other Hyppo site tracks `tel:` clicks; since phone is the primary
CTA here, it needs to be measurable. The handler no-ops when no pixel is configured.

## Deploy

Vercel, static. `vercel.json` sets `cleanUrls`, `trailingSlash: false`, and three security headers.
Repo lives under the **Mark-Hyppo** work account at
`github.com/Mark-Hyppo/Aura-Mortgage-Partners-Website`.
