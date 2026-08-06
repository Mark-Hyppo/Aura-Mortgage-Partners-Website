# Plan — "Areas We Serve" pages

**Status: proposal, not committed.** Nothing here is built — no routes, data, or copy exist yet.
Revised 2026-08-05 after the office was confirmed as **Boca Raton**, which moved the home market
from West Palm Beach and changed the selection rule.

---

## What the reference site actually does

Fetched `spacecoastcamera.com/areas/cape-canaveral`, `/cocoa-beach`, and `/titusville`
(2026-08-05) and diffed the rendered text. The three pages are **~16.9 KB each and differ by six
lines.** Everything else is byte-identical.

| # | Differs | Pattern |
| --- | --- | --- |
| 1 | `<title>` | `Camera & Lens Rentals in {City}, FL \| Space Coast Camera` |
| 2 | `<meta description>` | `Space Coast Camera provides camera and lens rentals in {City}, FL. Serving Brevard County…` |
| 3 | H1 | `Space Coast Camera is {City}'s #1 Stop!` |
| 4 | Portrait `alt` | `…serving photographers in {City}, FL` |
| 5 | H2 | `Why Space Coast Camera for {City}?` |
| 6 | **One paragraph** | The only genuinely bespoke content on the page |

Five of the six are token substitution. The entire individualized surface is **one paragraph of
roughly 45 words**:

> *Titusville is the gateway to Kennedy Space Center and a world-class destination for rocket
> launch photography… capturing launches, wildlife at Merritt Island National Wildlife Refuge, and
> the wide-open Florida sky.*

Everything else — location and hours, "Why us", the form, testimonials, contact block, collections
— is shared. There is also **no JSON-LD on any of those pages**, which is a gap we should not copy.

So the reference ratio is roughly **97% boilerplate, 3% local.** That works at 16 pages for a
camera shop. It is the wrong ratio for us, for two reasons.

---

## Why copying that ratio is risky here

### 1. Doorway pages

Google's guidance names "multiple pages… generated for the purpose of funnelling visitors, with
content substantially similar to each other" as a spam pattern. A camera shop with 16 pages sits at
the edge of it. Palm Beach County has **39 incorporated municipalities**; 39 pages differing by one
paragraph is squarely inside it. The downside is not just that the pages fail to rank — thin
doorway clusters can drag on sitewide quality signals.

**Mitigation:** fewer pages, more real content each. See the tiering below.

### 2. Fair lending — the one that actually matters

This is a mortgage broker, so geo-targeted marketing carries exposure a camera shop does not have.

- **Selection is a signal.** Palm Beach County contains both affluent coastal towns and the Glades
  communities — Belle Glade, Pahokee, South Bay — which differ sharply in median income and racial
  composition. Publishing pages for Jupiter, Palm Beach, and Boca Raton while omitting the Glades
  produces a marketing footprint a regulator or fair-lending auditor can read as redlining, whatever
  the intent was. **The city list is a compliance artefact, not just an SEO decision.**
- **Description is a signal.** Copy that characterises neighbourhoods — "family-friendly",
  "up-and-coming", "desirable schools", "safe" — is steering language under the Fair Housing Act.
  The reference site's paragraphs describe *photographic subjects*, which is harmless. Ours would
  describe *places people live*, which is not.

**Mitigation:** the local paragraph talks about **financing conditions**, never about the community.
Condo warrantability, HOA reserve requirements post-milestone-inspection, jumbo thresholds, flood
zones, seasonal and second-home occupancy, new-construction activity. Those are factual lending
considerations. "Great place to raise a family" is a violation waiting to happen.

I would put this rule in `COMPLIANCE.md` before writing the first page.

---

## Recommended approach

**The office is in Boca Raton**, at the southern edge of the county against the Broward line. That
placement is what makes the selection rule matter: a Boca-centred footprint drawn by instinct skews
affluent and coastal, and cherry-picking inside it is exactly the exposure described above.

**So do not pick cities. Write a rule, then build whatever it returns.**

> Palm Beach County municipalities within roughly 25 driving miles of the Boca Raton office,
> with a population of about 10,000 or more.

Both criteria are neutral on their face and neither correlates with income or racial composition.
The rule is defensible precisely because of what it *excludes*: affluent Jupiter, Palm Beach
Gardens and the town of Palm Beach fall outside it on distance, exactly as the Glades communities
do. It cuts wealthy and low-income areas by the same measure — which is the thing a marketing
footprint has to be able to demonstrate if anyone asks.

Write the rule into `COMPLIANCE.md` alongside the language rule, so the next person to add a city
has to satisfy it rather than re-litigate it.

### Tier 1 — what the rule returns (~10)

| City | Approx. miles | The local financing hook |
| --- | --- | --- |
| Boca Raton | 0 | Home market; jumbo, super jumbo, large condo inventory |
| Delray Beach | 7 | Condo and townhouse warrantability; second homes |
| Boynton Beach | 12 | Condo warrantability; 55+ community financing |
| Lantana | 16 | Older housing stock; FHA and renovation |
| Lake Worth Beach | 18 | FHA, VA, Hometown Heroes; older housing stock |
| Greenacres | 19 | Conforming and FHA; first-time buyers |
| Palm Springs | 20 | FHA and VA; entry-price purchase |
| Wellington | 21 | Equestrian property; acreage and non-conforming parcels |
| West Palm Beach | 25 | County seat; broadest program mix |
| Royal Palm Beach | 25 | Conforming and FHA; first-time buyers |

That set spans the county's economic range — Boca and Wellington at one end, Lake Worth Beach,
Greenacres and Palm Springs at the other — because the rule, not taste, selected it.

> **The mileages and populations above are from general knowledge and are NOT verified.** Recompute
> them from the real Boca Raton street address once it is supplied, then confirm the list before a
> single page is written. If the recomputed radius changes the membership, the list changes with it —
> that is the rule working, not a problem with the rule.

### Tier 2 — only if Tier 1 earns it

Municipalities that clear the distance test but fall under the population floor, or sit just beyond
25 miles: Highland Beach, Ocean Ridge, Hypoluxo, Manalapan, Atlantis, Lake Clarke Shores,
Loxahatchee Groves, North Palm Beach, Riviera Beach, Palm Beach, Westlake.

### Tier 3 — do not build

Villages under ~1,500 people (Cloud Lake, Glen Ridge, Golf, Briny Breezes, Jupiter Inlet Colony).
No search demand, and a page each is pure thin content.

**On the Glades** — Belle Glade, Pahokee and South Bay sit 45–55 miles from Boca and fall outside
the rule on distance, along with Jupiter and Palm Beach Gardens. That is a defensible outcome
*because the rule is neutral and applied evenly*. It would stop being defensible the moment
someone hand-adds Jupiter back for its jumbo volume while leaving Belle Glade out. If the
geography is ever extended north, it extends for everyone at that distance.

---

## Boilerplate vs individualized

Target roughly **60/40**, not 97/3.

**Boilerplate (shared component or template)**
- Hero with city name, phone CTA
- The Inside/Outside the Box program grid, already built
- "How we work" trust points
- Officer cards with NMLS IDs
- Sitewide compliance footer (automatic — it lives in `Layout.astro`)
- Closing `SectionCta`

**Individualized per city — the part that has to be written**
1. **Financing conditions paragraph**, 80–120 words. Factual lending considerations only.
2. **Three to five programs most relevant here**, chosen from `programs.ts` and ordered per city —
   Boca leads with jumbo, Riviera Beach leads with FHA/VA/Hometown Heroes. This is real
   differentiation that costs nothing to produce and genuinely helps the reader.
3. **Two or three city-specific FAQs**, feeding `FAQPage` schema. Different questions per city, not
   the same three reworded.
4. **Title, meta description, H1** on the established templates.

That yields pages that differ by several hundred words with distinct schema, which is defensible.

---

## Architecture

Mirrors the loan-programs pattern already in the repo, so there is little new machinery.

```
src/data/areas.ts              one array, same shape as programs.ts
src/pages/areas-we-serve/index.astro    grid of served cities
src/pages/areas-we-serve/[slug].astro   getStaticPaths() off the array
```

```ts
interface Area {
  slug: string;
  city: string;
  titleName: string;        // keeps <title> under 70 chars — see Layout.astro assertion
  conditions: string;       // the 80–120 word financing paragraph
  programs: string[];       // slugs from programs.ts, ordered by local relevance
  faq: { q: string; a: string }[];
}
```

- Add `/areas-we-serve` to `nav` in `site.ts`.
- `BreadcrumbList` + `FAQPage` schema per page; the reference site has none.
- Extend the `MortgageBroker` schema's `areaServed` from the current `State` to an array of
  `City` nodes.
- Interlink: each area page links its named programs, each program page links back to relevant
  areas. That internal linking is most of the SEO value and is what a doorway cluster lacks.

Ten pages, +1 index = **11 routes, taking the site from 32 to 43 pages.**

---

## Build steps

1. Add BOTH fair-lending rules to `COMPLIANCE.md` — the neutral city-selection rule, and the
   language rule (no community characterisation, financing conditions only).
2. Write `src/data/areas.ts` with the Tier 1 cities the rule returns. This is the whole job; the
   templates are trivial by comparison.
3. Build `[slug].astro` and `index.astro` from the loan-programs templates.
4. Add to nav, extend `areaServed` schema, wire the program ↔ area interlinks.
5. Run the existing gates: the title/description length assertion catches long city names
   automatically, then the Reg Z and MAP Rule greps.
6. Have Mark Wilkinson read every financing paragraph. He is the one who knows whether the local
   claims are true.

**Effort:** roughly a day, almost entirely on the paragraphs and ~25 FAQs. Templates are an hour.

---

## Open questions

1. **The Boca Raton street address.** The radius cannot be computed without it, so the city list
   above is provisional. This is the same blocker as the site's `site.street` / `site.postal`.
2. **Is Aura licensed anywhere beyond Florida?** If so the geography could extend past Palm Beach
   County and the rule needs a second criterion.
3. **Do the financing hooks hold up?** Drafted from general South Florida lending knowledge. Each
   needs Mark Wilkinson's confirmation before it goes near a page.
4. **Should this wait?** The company NMLS ID is still empty and required on every page. Adding 11
   routes multiplies the surface carrying that gap. Resolve it first.
