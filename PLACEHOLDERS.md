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
| `programs[*].lede` / `whoItFits` / `whatToBring` / `faq` | `src/data/programs.ts` | All 20 program pages. Program **names** come from `markmymortgage.com`; the surrounding copy is ours |
| `groups.*.desc` | `src/data/programs.ts` | The Inside/Outside the Box descriptions |

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
| `site.geo` | `26.8034, -80.1928` | Centroid of ZIP 33412, not a surveyed pin for 12668 83rd Ln N. Feeds geo meta and `GeoCoordinates` schema |

---

## NOT drafted — deliberately left empty

**We did not invent license numbers.** A fabricated NMLS ID is not placeholder copy; it is false
regulatory data on a mortgage advertisement. These fields are empty strings, and every surface that
renders them omits them cleanly rather than showing a guess.

| Field | Status |
| --- | --- |
| `compliance.companyNmls` | Empty. **SAFE Act requires the company NMLS ID on every page** — this is the hardest launch blocker on the project. No public NMLS record was found for Aura Mortgage Partners LLC |
| `team[1].nmls` (Lorie Lewis) | Empty. The brief gave **both** `273007` and `334279`; the AIOS project docs say `273007`. Unverifiable from public search. Confirm at nmlsconsumeraccess.org |
| `compliance.sponsorNmls` | Empty. Only applies if Aura originates under a sponsoring lender — possibly what the unidentified "Arch Mortgage" reference means |

`team[0].nmls` = **297944** is *not* a placeholder. Mark Wilkinson's NMLS ID is confirmed against
public record and against his existing site.

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
grep -rn "DRAFT:" src/          # every drafted field
npm run build
grep -rl 'Company NMLS' dist --include=*.html | wc -l    # must equal 31, currently 0
```

The full launch-blocker checklist is in [`README.md`](README.md).
