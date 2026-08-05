# Plan — "Areas We Serve" pages

**Status: proposal, not committed.** Mark asked for a plan without deciding whether it ships.
Nothing here is built. No routes, data, or copy exist yet.

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

**Tier the cities. Do not do all 39.**

### Tier 1 — build these (12)

Real mortgage volume, genuine local financing angles, and a footprint that spans the county's
economic range rather than only its coastline.

| City | The actual local financing hook |
| --- | --- |
| West Palm Beach | Home market; broadest program mix |
| Boca Raton | Jumbo and super jumbo; large condo inventory |
| Boynton Beach | Condo warrantability; 55+ community financing |
| Delray Beach | Condo and townhouse; second homes |
| Jupiter | Jumbo; waterfront and flood-zone considerations |
| Palm Beach Gardens | Jumbo; PUD and golf-community HOA structures |
| Wellington | Equestrian property; acreage and non-conforming parcels |
| Royal Palm Beach | Conforming and FHA; first-time buyers |
| Lake Worth Beach | FHA, VA, Hometown Heroes; older housing stock |
| Riviera Beach | FHA and VA; Hometown Heroes eligibility |
| Palm Beach | Super jumbo; portfolio and asset-based lending |
| Belle Glade | FHA, VA, USDA-adjacent rural; agricultural-area lending |

Belle Glade is on the list deliberately. Dropping it because search volume is low is exactly the
decision that creates the footprint problem described above.

### Tier 2 — later, only if Tier 1 earns it (optional)

Greenacres, Palm Springs, North Palm Beach, Tequesta, Juno Beach, Lantana, Atlantis, Loxahatchee
Groves, Westlake, Pahokee, South Bay, Lake Park.

### Tier 3 — do not build

Villages under ~1,500 people (Cloud Lake, Glen Ridge, Golf, Briny Breezes, Jupiter Inlet Colony,
Manalapan). No search demand, and a page each is pure thin content.

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

Twelve pages, +1 index = **13 routes, taking the site from 31 to 44 pages.**

---

## Build steps

1. Add the fair-lending language rule to `COMPLIANCE.md` — no community characterisation, financing
   conditions only.
2. Write `src/data/areas.ts` with the 12 Tier 1 cities. This is the whole job; the templates are
   trivial by comparison.
3. Build `[slug].astro` and `index.astro` from the loan-programs templates.
4. Add to nav, extend `areaServed` schema, wire the program ↔ area interlinks.
5. Run the existing gates: the title/description length assertion catches long city names
   automatically, then the Reg Z and MAP Rule greps.
6. Have Mark Wilkinson read all 12 financing paragraphs. He is the one who knows whether the local
   claims are true.

**Effort:** roughly a day, almost entirely on the 12 paragraphs and 30-ish FAQs. Templates are an
hour.

---

## Open questions

1. **Is Aura licensed anywhere beyond Florida?** If so, the geography could extend past Palm Beach
   County and the tiering changes.
2. **Does Mark want the Glades communities included?** My recommendation is yes, and the reasoning
   above is why — but it is his call and he should make it knowingly.
3. **Do the 12 financing hooks hold up?** I drafted them from general South Florida lending
   knowledge. Each needs his confirmation before it goes near a page.
4. **Should this wait?** The site still has unresolved NMLS blockers. Adding 13 pages multiplies the
   surface carrying an absent company NMLS ID. I would resolve [[aura-nmls-blockers]] first.
