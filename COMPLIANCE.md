# Compliance rules — Aura Mortgage Partners LLC

Aura Mortgage Partners LLC is a Florida mortgage brokerage. Its originators are **Mark Wilkinson,
NMLS ID# 297944** and **Lorie Lewis, NMLS ID# 273007**. Every word on this site, in the blog, and
in any advertising is governed by the rules below.

Read this before editing any copy in `src/data/`. Paste this document into the Aura brand voice
system prompt in HyppoCRM so the ASP-Rank blogging agent is bound by it too — the website build
cannot enforce these rules on generated posts.

This site advertises **lending only**. Insurance belongs on the separate All Out Insurance Services
site (`aois.us`); do not cross-post content between the two.

---

## 1. Absolute "Do NOT Say" — compliance red lines

### Never trigger triggering terms without full disclosures (TILA / Reg Z)

If you state specific loan terms in regular prose, federal law forces you to disclose the entire
financial picture.

- ❌ **Do not say:** "Get a 30-year fixed loan at 5.5%!" or "Low monthly payments of only
  $1,800/mo!" or "0% down financing available!"
- ⚠️ **Why:** Under **Reg Z §1026.24(d)(1)**, stating a rate, payment amount, down payment
  percentage, or **number of payments / period of repayment** triggers TILA requirements. If you
  list one, you must disclose the APR, repayment terms, down payment amount, and state that rates
  are subject to change.
- ✅ **Safe rephrasing:** "Competitive 30-year fixed rates are available," or "Explore
  low-down-payment options like FHA and VA loans."

**The one deliberate exception on this site** is the term-options block on `/loan-programs`, which
names 10 / 15 / 20 / 30 / 40-year terms. Period of repayment *is* a triggering term, so that block
carries the full Reg Z disclosure set immediately adjacent to it. Terms must never appear in a page
headline, `<title>`, or meta description, and the disclosure must never be separated from the terms
it discloses. **This block is pending sign-off from the client or their compliance counsel.**

### Never use misleading "government-backed" claims (MAP Rule / Reg N)

The CFPB heavily penalizes brokers who sound like a government agency, or who imply a government
program guarantees approval.

- ❌ **Do not say:** "Official Government Refinance Program" or "State-Approved Debt Relief."
- ❌ **Do not use:** logos, seals, or icons that imitate the FHA, VA, HUD, or Federal Reserve. This
  binds the generated program icons too — the FHA icon is a generic classical portico and the VA
  icon is a generic shield with a star precisely so neither reads as an agency seal. Review both
  against this section before shipping.
- ✅ **Safe rephrasing:** "FHA-insured loans offer flexible credit guidelines for qualified home
  buyers."

### Avoid guaranteeing approval or rates

- ❌ **Do not say:** "Guaranteed approval," "Pre-approved in 5 minutes," "Instant closing," or
  "Lowest rates in South Florida guaranteed."
- ✅ **Safe rephrasing:** "Fast pre-qualification available," or "We work to secure competitive
  wholesale market pricing for your scenario."

### Don't label refinancing or equity removal as "free money"

- ❌ **Do not say:** "Wipe out your credit card debt for free with a cash-out refi."
- ⚠️ **Why:** You cannot imply that refinancing reduces debt without explicitly clarifying that
  total finance charges over the life of the new loan may increase, and that the debt is being
  secured against the home as collateral.

### Fair lending (ECOA / Fair Housing Act)

- No copy that targets, excludes, or discourages any protected class.
- "Hometown Heroes" describes a Florida Housing program with published eligibility criteria — state
  the criteria, never imply preference for or against any group beyond them.
- The **Equal Housing Lender** mark and statement appear on every page.

#### Geographic marketing — both rules bind before any city page ships

These govern the proposed "Areas We Serve" pages (`docs/areas-we-serve-plan.md`) and any other
place-targeted copy, including blog posts generated in HyppoCRM.

1. **Selection rule.** *Which* places get a page is itself a fair-lending signal. A footprint that
   covers affluent areas and omits lower-income ones is readable as redlining regardless of intent.
   Cities are chosen by a **neutral, written rule applied evenly** — currently: Palm Beach County
   municipalities within ~25 miles of the Boca Raton office, population ~10,000 or more. Never
   hand-add a city for its volume, and never hand-drop one for lack of it. If the geography
   changes, it changes for everyone at that distance.
2. **Language rule.** Local copy describes **financing conditions only** — condo warrantability,
   HOA reserves after milestone inspections, jumbo thresholds, flood zones, occupancy,
   new-construction activity. **Never characterise a community.** "Family-friendly",
   "up-and-coming", "desirable schools", "safe", "good area" are steering language under the FHA.
   The distinction: describe what underwriting does there, never who lives there.

---

## 2. Summary checklist

| Feature | ❌ Compliance risk | ✅ Safe & high-converting |
| --- | --- | --- |
| **Rates** | "Lock in 5.75% today!" | "Contact us for real-time wholesale pricing for your scenario." |
| **Approval** | "Instant approval for self-employed borrowers." | "Flexible bank-statement guidelines available for self-employed buyers." |
| **Government** | "Official FHA Relief Program." | "FHA-insured mortgage options." |
| **Terms** | "40-year loans available!" standalone | Term list with the full Reg Z disclosure block adjacent. |
| **Tone** | Sales pitch promising exact numbers. | Expert breakdown explaining mortgage concepts and strategy. |

---

## 3. What you CAN and should say

Build authority and rank in local SEO with educational, strategy-driven content rather than
specific rate figures. This is also the safe topic pool for the ASP-Rank blogging agent.

**Local market and property nuances** — HOA reserve requirements, non-warrantable condo guidelines,
flood insurance considerations, South Florida appraisal factors.

**Program overviews** — how DSCR loans work for real estate investors, bank-statement programs for
self-employed borrowers, jumbo vs. conforming limit breakdowns, what makes a condo non-warrantable,
how bridge and cross-collateral loans sequence a move.

**Process walkthroughs** — "What happens between underwriting and clear-to-close," "5 documents you
need before applying for a mortgage."

**Market education** — the difference between mortgage rates and the Federal Funds Rate, how
wholesale broker pricing differs from big-box retail bank pricing.

---

## 4. What must appear on every page

Rendered sitewide by `src/components/Footer.astro`, which lives inside `src/layouts/Layout.astro`
so no page can ship without it:

- **Company NMLS ID#** for Aura Mortgage Partners LLC, displayed prominently. Required on every
  page by the SAFE Act. *Currently pending from the client — launch blocker.*
- **Each loan originator's NMLS ID**: Mark Wilkinson NMLS ID# 297944, Lorie Lewis NMLS ID# 273007.
  Each officer's ID must also appear on their bio and on any page where they appear.
- A link to **nmlsconsumeraccess.org** for license verification.
- **Equal Housing Lender** statement and mark. The mark is drawn in-house as inline SVG in
  `Footer.astro`; do not swap in a copied federal seal.
- **States licensed in**, with license numbers, on `/licensing` and summarized in the footer.
  Currently FL only — confirm before launch.
- Underwriting disclaimer: "Not a commitment to lend. All loans subject to credit approval,
  underwriting, and property appraisal. Rates, terms, and programs subject to change without
  notice. Not all applicants qualify."

**Open question:** if Aura originates under a sponsoring lender or wholesale relationship rather
than independently, that company's NMLS ID generally has to appear alongside Aura's. The
unidentified "Arch Mortgage" reference in the original brief may be exactly this. Tracked as
`compliance.sponsorNmls` in `src/data/site.ts`.

---

## 5. Rates

No rate or APR appears anywhere on this site. If one is ever added, it must carry — in the same
visual block — the APR, the effective date, the assumptions it is based on (loan amount, term,
credit score, LTV, occupancy), and a "subject to change without notice" disclaimer.

---

## 6. Regression check

After any copy change, run a build and grep the output.

```bash
npm run build
grep -rn "__PENDING__" dist/                                            # must be empty
grep -rniE '[0-9](\.[0-9]+)?%|guarantee|approved|government|official|instant|lowest' dist/
```

The second grep hits legitimately on phrases like "FHA-insured", "credit approval", and
"government-sponsored". Every hit needs a human read against section 1 before it ships.
