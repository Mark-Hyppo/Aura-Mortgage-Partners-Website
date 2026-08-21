# Placeholder register

The site reads as finished. It is not. Everything below is **our draft copy standing in for content
the client has not supplied** — plausible, compliance-safe, and deliberately unremarkable, but not
confirmed by Aura Mortgage Partners.

Nothing here is visually flagged on the page. That is deliberate, so the build can be shown and
demoed. It also means **this file is the only record of what is real and what is not.** Do not
launch against it without walking the list.

Find every marker in source:

```bash
grep -rn "DRAFT:" src/
```

---

## Drafted copy — replace before launch

| Field | File | What we wrote |
| --- | --- | --- |
| `site.tagline` | `src/data/site.ts` | "The broker other brokers send their hard files to." |
| `about.intro` + `about.body` | `src/data/site.ts` | Three-paragraph company story — founding rationale, broker-vs-bank, South Florida focus |
| `team[0].bio` | `src/data/team.ts` | Mark Wilkinson, two paragraphs |
| `team[1].bio` | `src/data/team.ts` | Lorie Lewis, two paragraphs |
| `trustPoints` | `src/data/site.ts` | Four "why us" cards |
| `programs[*].lede` / `whoItFits` / `faq` | `src/data/programs.ts` | All 20 program pages. Program **names** come from `markmymortgage.com`; the surrounding copy is ours |
| `programs[*].whatToBring` | `src/data/programs.ts` | Only the 9 Outside the Box programs from Construction onward. The client asked for the checklist to be dropped from the other 11, so the field is now optional and absent on those |
| `groups.*.desc` | `src/data/programs.ts` | The Inside/Outside the Box descriptions |
| `areas[*].conditions` / `blurb` / `faq` | `src/data/areas.ts` | All 10 Areas We Serve city pages. Financing-conditions paragraphs and ~21 FAQs, written from general South Florida lending knowledge. **Mark Wilkinson has to confirm every local claim** |
| `areas[*].miles` | `src/data/areas.ts` | Approximate distances from the office. **Not computed from a real address** — the Boca Raton street address is still outstanding, so the city list itself is provisional |

### Copy written to be safe, and why it matters

The bios deliberately **omit** the claims on Mark's existing site — 30+ years, a Florida Atlantic
BBA, 4,000+ transactions, $1B+ in volume. Every one of those is an advertising claim that has to be
substantiable the moment it is published. They are his to reinstate, not ours to assume.

No program page states a rate, an APR, a payment, a down payment amount, or a percentage. That is
not stylistic — under Reg Z §1026.24(d)(1) any of those triggers a full disclosure obligation. See
[`COMPLIANCE.md`](COMPLIANCE.md).

---

## Fabricated identifiers — verify or remove

These will resolve to something wrong or dead if shipped as-is.

| Field | Value we invented | Risk |
| --- | --- | --- |
| `site.email` | `info@auramortgagepartners.com` | **The mailbox may not exist.** Every legal page, the footer, and the contact page link to it |
| `social[*].href` | `facebook.com/auramortgagepartners`, `instagram.com/auramortgagepartners`, `linkedin.com/company/aura-mortgage-partners` | **Unverified — all three may 404.** Delete the entry rather than ship a dead link |
| `team[1].headshot` | `/team/lorie-lewis.webp` | **This is not Lorie Lewis.** An AI-generated portrait carried over from the AIOS project, standing in until a real headshot is taken. It renders above her real name and real NMLS ID on a mortgage advertisement. Must not reach production |

---

## NOT drafted — deliberately left empty

**We did not invent license numbers.** A fabricated NMLS ID is not placeholder copy; it is false
regulatory data on a mortgage advertisement. These fields are empty strings, and every surface that
renders them omits them cleanly rather than showing a guess.

| Field | Status |
| --- | --- |
| `compliance.companyNmls` | Empty. **SAFE Act requires the company NMLS ID on every page** — this is the hardest launch blocker on the project. No public NMLS record was found for Aura Mortgage Partners LLC |
| `compliance.sponsorNmls` | Empty. Only applies if Aura originates under a sponsoring lender — possibly what the unidentified "Arch Mortgage" reference means |

`team[0].headshot` is the client's real photograph and is *not* a placeholder.

`team[0].nmls` = **297944** is *not* a placeholder. Mark Wilkinson's NMLS ID is confirmed against
public record and against his existing site.

`team[1].nmls` = **273007** is no longer empty. Of the two numbers the brief gave, `273007` is
corroborated by Group One Mortgage's published originator roster and by a ZoomInfo MLO profile,
and the AIOS project docs agree; **`334279` returns no originator anywhere** and appears to be a
transcription error. Neither source page could be read directly — grouponemortgage.us refused the
connection and nmlsconsumeraccess.org 403s automated requests — so this is **corroborated, not
registry-verified**. Look up `273007` under Individuals at nmlsconsumeraccess.org to close it.

---

## Pending — rendered as nothing until supplied

The Boca Raton office address was never supplied. A fabricated business location on a mortgage
advertisement is the same category of problem as a fabricated NMLS ID, so these use the
`pending()` sentinel and every surface omits them cleanly.

| Field | Effect while pending |
| --- | --- |
| `site.street` | Address blocks in the footer, `/contact`, `/licensing`, `/privacy` and `/terms` render the city line only. `streetAddress` is omitted from `PostalAddress` schema |
| `site.postal` | Same; `postalCode` omitted from schema |
| `site.geo.lat` / `.lng` | The `/contact` map embed is omitted entirely rather than resolving to a city-wide search, and `GeoCoordinates` drops out of the business schema |

The old West Palm Beach values were deliberately **not** carried over — `12668 83rd Ln N, 33412`
and the ZIP-centroid coordinates belonged to the previous address and would have been wrong.

---

## Hidden until real

Not placeholders — these render nothing at all until the HyppoCRM tenant exists, so no empty frame
or "coming soon" box appears.

| Field | Effect while empty |
| --- | --- |
| `hyppo.tenantSlug` + `hyppo.blogSlug` | `/blog` renders its header and call-to-action only; the embed section is omitted entirely |
| `hyppo.contactFormSlug` | The "Send a message" column is omitted; `/contact` shows the map and originator card |
| `hyppo.pixelId` | No tracking script is emitted, and `call_click` events no-op |

---

## Pre-launch check

```bash
grep -rn "DRAFT:" src/          # every drafted field, incl. Lorie's placeholder portrait
npm run build
grep -rl 'Company NMLS' dist --include=*.html | wc -l    # must equal 42, currently 0
```

The full launch-blocker checklist is in [`README.md`](README.md).
