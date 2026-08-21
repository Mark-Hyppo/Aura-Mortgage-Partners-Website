// "Areas We Serve": place pages for Florida. Two kinds, and the difference
// matters legally, not just visually. CITY pages cover a single municipality.
// REGION pages cover a whole region and never name a subset of its towns.
//
// TWO FAIR-LENDING RULES BIND THIS FILE. Both are in COMPLIANCE.md. Read them
// before adding, removing, or rewriting a place.
//
// 1. SELECTION. Which places get a page is itself a fair-lending signal. Aura is
//    licensed across Florida and takes files statewide, so the page set is not
//    the footprint; it marks where underwriting differs. Two neutral written
//    rules, each applied evenly:
//      (a) CITY pages: Palm Beach County municipalities within ~25 miles of the
//          Boca Raton office, population ~10,000+.
//      (b) REGION pages: Florida regions whose financing conditions differ
//          materially from Palm Beach County. A region page covers the entire
//          region. Naming a subset of its towns would reintroduce exactly the
//          selection signal a region page exists to avoid.
//    Never hand-add a place because it has volume, and never hand-drop one
//    because it does not. A footprint covering affluent areas while omitting
//    lower-income ones is readable as redlining regardless of intent.
//
// 2. LANGUAGE. `conditions` describes FINANCING CONDITIONS ONLY: condo
//    warrantability, HOA reserves and milestone inspections, flood zones,
//    occupancy, acreage, age of housing stock, new construction. It must NEVER
//    characterise a community. "Family-friendly", "desirable", "up-and-coming",
//    "safe", "good schools" are steering language under the Fair Housing Act.
//    Describe what underwriting does there, never who lives there.
//
// Also inherited from the rest of the site: no rate, APR, payment, down payment
// amount, or percentage appears in any of this copy (Reg Z 1026.24(d)(1)).
//
// DRAFT: every `conditions` paragraph and every FAQ answer below is our draft,
// written from general Florida lending knowledge. Mark Wilkinson has to confirm
// each one. He is the one who knows whether the local claims hold. The mileages
// are unverified and were not computed from the real office address, which is
// still outstanding. See PLACEHOLDERS.md.

import { programs } from "./programs";

export type AreaKind = "city" | "region";

export interface Area {
  slug: string;
  /** A region page covers its whole region. See rule 1(b) in the header. */
  kind: AreaKind;
  /** Display name. Used adjectivally too, as in "a {city} file". */
  city: string;
  /** Approximate miles from the Boca Raton office. Cities only, UNVERIFIED. */
  miles?: number;
  /** One line for the index grid. */
  blurb: string;
  /** 80–120 words. Financing conditions only. */
  conditions: string;
  /** Program slugs from programs.ts, ordered by local relevance. */
  programs: string[];
  faq: { q: string; a: string }[];
}

export const areas: Area[] = [
  {
    slug: "boca-raton",
    kind: "city",
    city: "Boca Raton",
    miles: 0,
    blurb: "Our home market. Jumbo, super jumbo, and a very large condominium inventory.",
    conditions:
      "Boca Raton files skew toward two things: loan amounts above the conforming limit, and condominium projects. Both change how a file is underwritten. Above the limit the loan leaves agency guidelines entirely and moves to jumbo or portfolio underwriting, where reserves and documentation requirements are set by the individual lender rather than by Fannie Mae. On the condo side, Florida's milestone inspection and structural integrity reserve study requirements have moved a number of older buildings out of warrantable status, which rules out conventional financing until the association's reserves and any pending assessments are resolved. Buildings east of the Intracoastal also carry flood zone considerations that affect required coverage.",
    programs: ["jumbo", "super-jumbo", "non-warrantable-condo", "foreign-nationals", "conforming"],
    faq: [
      {
        q: "Why did my Boca Raton condo purchase get declined by a bank?",
        a: "Most often the borrower was fine and the building was not. A conventional loan requires the project to be warrantable, which turns on the association's reserve funding, the share of units owned by investors, any active litigation, and whether required milestone inspections and reserve studies are complete. If the project fails any of those, agency financing is unavailable regardless of credit or income. Non-warrantable condo lenders underwrite the same purchase against different project standards.",
      },
      {
        q: "What makes a Boca Raton loan a jumbo loan?",
        a: "A loan is jumbo when the amount exceeds the conforming loan limit set annually by the Federal Housing Finance Agency for the county. Above that threshold the loan cannot be delivered to Fannie Mae or Freddie Mac, so guidelines are set by the individual lender. In practice that means reserve requirements, documentation, and property standards vary meaningfully between lenders, which is where shopping the scenario matters.",
      },
      {
        q: "Can a buyer who is not a US citizen finance a Boca Raton property?",
        a: "Yes. Foreign national programs underwrite without a US credit score or a US tax return, using passport identification, verification of foreign income or assets, and typically a larger reserve requirement. Terms and required documentation differ substantially between lenders, and the property type, particularly whether it is a warrantable condominium, affects which lenders will consider the file.",
      },
    ],
  },
  {
    slug: "delray-beach",
    kind: "city",
    city: "Delray Beach",
    miles: 7,
    blurb: "Condominium and townhouse warrantability, and second-home occupancy.",
    conditions:
      "Delray Beach purchases run heavily to attached housing, condominiums and townhouses, which puts project review at the centre of the file. Townhouses in a planned unit development are usually underwritten as single-family, while a condominium requires full project approval, so two similar-looking properties can follow very different paths. A meaningful share of purchases here are second homes rather than primary residences, and occupancy changes reserve requirements and pricing on nearly every program. Older coastal buildings are also the ones most affected by Florida's milestone inspection and reserve study requirements, which can suspend warrantable status until the association completes them.",
    programs: ["non-warrantable-condo", "conforming", "jumbo", "refinance", "heloc"],
    faq: [
      {
        q: "Is a Delray Beach townhouse financed the same way as a condo?",
        a: "Not necessarily. It depends on the legal form of ownership rather than the shape of the building. A townhouse held in fee simple within a planned unit development is generally underwritten as a single-family property, which avoids condominium project review entirely. A townhouse-style unit that is legally a condominium requires the same project approval as a mid-rise. The recorded documents settle it, not the appearance.",
      },
      {
        q: "How does buying a second home in Delray Beach change the loan?",
        a: "Occupancy is a rating factor on almost every program. A second home generally carries higher reserve requirements than a primary residence and is priced differently, and some programs are unavailable for non-primary occupancy altogether. The property also has to genuinely function as a second home. A property that is rented out is underwritten as an investment property, which is a different set of guidelines again.",
      },
    ],
  },
  {
    slug: "boynton-beach",
    kind: "city",
    city: "Boynton Beach",
    miles: 12,
    blurb: "Condominium warrantability and age-restricted community financing.",
    conditions:
      "Boynton Beach has a large stock of condominium and age-restricted communities, and both raise project-level questions before the borrower is ever assessed. Age-restricted associations are financeable on conventional terms provided the project itself is warrantable, but many of these communities are older and are now working through Florida's milestone inspection and structural integrity reserve study requirements. Where a study identifies underfunded reserves, associations often levy special assessments, and a pending or recently levied assessment affects both project approval and the debt calculation on the file. Reverse mortgage financing also appears more often here than in most of the county.",
    programs: ["conforming", "non-warrantable-condo", "reverse", "fha", "refinance"],
    faq: [
      {
        q: "Can I finance a home in a 55+ community in Boynton Beach?",
        a: "Yes. Age restriction alone does not prevent conventional financing. What matters is whether the project meets warrantability standards: reserve funding, investor concentration, litigation, and completion of any required inspections and reserve studies. Age-restricted projects are reviewed against those same criteria. Where a project falls outside them, non-warrantable programs underwrite the purchase against different standards.",
      },
      {
        q: "How does a special assessment affect my loan?",
        a: "In two ways. The assessment is a monthly or lump-sum obligation, so it enters the debt calculation on the file. Separately, a large pending assessment can signal underfunded reserves, which is one of the criteria project review examines. Both are worth identifying early, because they are easier to plan around before an offer than after an appraisal.",
      },
    ],
  },
  {
    slug: "lantana",
    kind: "city",
    city: "Lantana",
    miles: 16,
    blurb: "Older housing stock, renovation financing, and coastal flood zones.",
    conditions:
      "Lantana's housing stock is largely older and smaller than the county average, which brings property condition into the file more often than borrower profile does. Appraisers flag deferred maintenance, roof age, and older electrical and plumbing systems, and several programs have minimum property standards that a home has to meet before closing. Where a property will not pass as-is, renovation financing folds the repair cost into the loan rather than requiring the seller to complete work first. Proximity to the coast also means a share of properties sit in FEMA flood zones, where flood insurance is required and the premium enters the qualifying calculation.",
    programs: ["fha", "conforming", "construction", "va", "refinance"],
    faq: [
      {
        q: "The house I want in Lantana needs work. Can I still finance it?",
        a: "Often yes, through a renovation loan that finances the purchase and the repair budget together, based on the property's value after the work is complete. The alternative is a conventional loan on an as-is property, which requires the home to already meet the program's minimum property standards. Which route fits depends on the scope of the work and the appraiser's findings.",
      },
      {
        q: "Does a flood zone stop me from getting a mortgage in Lantana?",
        a: "No, but it adds a requirement. If the property sits in a FEMA special flood hazard area, flood insurance is mandatory for a federally backed loan and the premium is included in the monthly obligation used to qualify. An elevation certificate can materially change that premium, so it is worth obtaining early on properties near the coast or the Intracoastal.",
      },
    ],
  },
  {
    slug: "lake-worth-beach",
    kind: "city",
    city: "Lake Worth Beach",
    miles: 18,
    blurb: "FHA, VA, and Hometown Heroes, against an older housing stock.",
    conditions:
      "Lake Worth Beach sees a high share of first-time purchases and government-backed financing, and much of the housing stock predates current building code. That combination puts property condition at the centre of most files: FHA and VA both apply minimum property requirements, and older roofs, electrical panels, and plumbing are the items that most often need attention before an appraiser will sign off. Homes in the historic districts carry additional review on exterior alterations, which affects renovation scope. Florida's Hometown Heroes program is used here more than in most of the county, and it has published eligibility criteria tied to occupation and income limits.",
    programs: ["fha", "hometown-heroes", "va", "conforming", "construction"],
    faq: [
      {
        q: "Do I qualify for Hometown Heroes in Lake Worth Beach?",
        a: "Hometown Heroes is a Florida Housing programme with published eligibility criteria: it is limited to eligible full-time employment in qualifying occupations, has county income limits, and requires the home to be a primary residence. Eligibility is determined against those published criteria, not at a lender's discretion. We can walk you through whether your occupation and income fall inside them before you start looking.",
      },
      {
        q: "What tends to hold up an FHA appraisal on an older Lake Worth Beach home?",
        a: "Most commonly roof condition and remaining life, exposed or deteriorated wiring, plumbing leaks, peeling paint on pre-1978 homes, and missing handrails or broken windows. FHA applies minimum property requirements aimed at safety and soundness. Items flagged generally have to be corrected before closing, either by the seller or through a renovation loan that finances the repairs.",
      },
    ],
  },
  {
    slug: "greenacres",
    kind: "city",
    city: "Greenacres",
    miles: 19,
    blurb: "Conforming and FHA purchases in HOA-governed communities.",
    conditions:
      "Greenacres purchases are predominantly single-family and attached homes inside homeowner associations, which keeps most files on conventional or FHA guidelines. The association matters less here than in a condominium, since a homeowners association governing fee-simple homes does not trigger condominium project review, but the dues still enter the monthly obligation used to qualify, and some communities carry a mandatory capital contribution at closing. Attached villa-style units are the exception worth checking early, because some are legally condominiums and are reviewed as such. Property condition is a routine consideration given the age of several of the larger communities.",
    programs: ["conforming", "fha", "hometown-heroes", "va", "refinance"],
    faq: [
      {
        q: "Do HOA dues affect what I can qualify for in Greenacres?",
        a: "Yes. Association dues are treated as part of the recurring monthly housing obligation, the same way property taxes and insurance are, so they reduce the loan amount a given income supports. It is worth confirming the current dues and any scheduled increase before making an offer, since a community with high dues can change the affordability picture materially.",
      },
      {
        q: "Is a villa in Greenacres a condo for financing purposes?",
        a: "Sometimes. The recorded documents decide it rather than the construction. An attached villa held in fee simple within a homeowners association is underwritten as single-family. One that is legally a condominium requires full project review, including reserves, investor concentration, and any required inspections. Checking the form of ownership early avoids a surprise well into the file.",
      },
    ],
  },
  {
    slug: "palm-springs",
    kind: "city",
    city: "Palm Springs",
    miles: 20,
    blurb: "Entry-price purchase financing, FHA and VA.",
    conditions:
      "Palm Springs files run to entry-price purchase financing, where FHA and VA are used heavily alongside conventional loans. Much of the housing stock is modest and older, so minimum property requirements and appraiser-flagged repairs come up regularly, particularly roof age and electrical systems. A share of the inventory is attached or condominium housing, which brings project review into those files. VA financing appears often enough to be worth noting that it carries no requirement for a down payment and no monthly mortgage insurance, though it does require the property to meet its own minimum property requirements and to be the borrower's primary residence.",
    programs: ["fha", "va", "conforming", "hometown-heroes", "refinance"],
    faq: [
      {
        q: "What does VA financing require on a Palm Springs property?",
        a: "The borrower needs a valid Certificate of Eligibility, and the property has to be the primary residence and satisfy VA minimum property requirements, which are assessed by a VA-assigned appraiser. Common items are roof condition, working mechanical systems, and no active wood-destroying organism damage. Condominium purchases additionally require the project to appear on the VA-approved list.",
      },
      {
        q: "Can I use FHA financing on a condo in Palm Springs?",
        a: "Only if the project holds FHA approval, which is a separate list from conventional warrantability. A project can be conventionally warrantable and still not FHA-approved. Single-unit approval is available in some cases for an individual unit in an otherwise unapproved project. Checking the project's status before an offer is the practical step, because approval is not something a borrower can resolve quickly.",
      },
    ],
  },
  {
    slug: "wellington",
    kind: "city",
    city: "Wellington",
    miles: 21,
    blurb: "Equestrian property, acreage, and non-conforming parcels.",
    conditions:
      "Wellington contains a concentration of equestrian and acreage property, and both sit awkwardly inside standard guidelines. Appraisers need comparable sales with similar acreage and outbuildings, which are thinner on the ground than suburban comparables and can extend timelines. Barns, arenas, and paddocks often contribute little or no appraised value under agency rules even where they carry real market value, so the appraised figure can land below expectations. Parcels above certain acreage, or with any income-producing agricultural use, can fall outside conventional guidelines entirely and move to portfolio or non-agency underwriting. Larger loan amounts here also frequently exceed the conforming limit.",
    programs: ["jumbo", "lot-loans", "non-prime", "super-jumbo", "conforming"],
    faq: [
      {
        q: "How is an equestrian property in Wellington appraised?",
        a: "On the residence and the land, with limited credit for agricultural improvements. Agency guidelines generally give little or no value to barns, arenas, and paddocks, and require comparable sales of properties with similar acreage. Because those comparables are scarcer, appraisals take longer and can come in below a buyer's expectation. Portfolio lenders sometimes take a broader view of the improvements.",
      },
      {
        q: "Does acreage limit my financing options in Wellington?",
        a: "It can. Conventional guidelines accommodate acreage where the property remains residential in character and the appraiser can support the value with comparables. Larger parcels, or any parcel with genuine income-producing agricultural use, may fall outside those guidelines and move to portfolio or non-agency programs. The zoning and the actual use of the land drive which route applies.",
      },
    ],
  },
  {
    slug: "west-palm-beach",
    kind: "city",
    city: "West Palm Beach",
    miles: 25,
    blurb: "The county seat, and the broadest mix of property types and programs.",
    conditions:
      "West Palm Beach carries the widest spread of property types in the county, and the financing considerations vary accordingly. Downtown and waterfront condominium buildings bring project review, warrantability, and, in older towers, Florida's milestone inspection and reserve study requirements. Neighbourhoods west of the city are largely single-family and run on conventional and government guidelines, with property condition the usual variable given the age of the housing. Investment purchases appear more often here than elsewhere in the county, and those are underwritten on the property's rental income rather than the borrower's personal income under debt-service coverage programs.",
    programs: ["conforming", "dscr", "non-warrantable-condo", "fha", "jumbo"],
    faq: [
      {
        q: "Can I finance a West Palm Beach rental property without using my tax returns?",
        a: "Often yes, through a debt-service coverage ratio loan. These are underwritten on whether the property's rental income covers its own mortgage payment, taxes, insurance, and any association dues, rather than on the borrower's personal income documentation. They are used for investment property only, not for a primary residence, and generally require a larger equity position than an owner-occupied loan.",
      },
      {
        q: "What slows down a downtown condo purchase in West Palm Beach?",
        a: "Project review, more often than the borrower's file. The lender examines the association's budget and reserve funding, the proportion of units held by investors, any litigation involving the association, and whether required milestone inspections and structural integrity reserve studies are complete. Older high-rise buildings are the ones most likely to have an item outstanding, and it is worth asking the association for that documentation early.",
      },
    ],
  },
  {
    slug: "royal-palm-beach",
    kind: "city",
    city: "Royal Palm Beach",
    miles: 25,
    blurb: "Newer planned communities, conforming and FHA financing.",
    conditions:
      "Royal Palm Beach is largely made up of planned developments of newer construction than much of the county, which tends to keep files on conventional and FHA guidelines and keeps property-condition findings to a minimum. The considerations that do come up are association-related: homeowner association dues enter the qualifying calculation, several communities levy a capital contribution at closing, and community development district assessments appear on the tax bill in some developments and are treated as part of the monthly obligation. Where a purchase is new construction from a builder, the timeline and the appraisal are handled differently from a resale, and financing has to be structured around the completion date.",
    programs: ["conforming", "fha", "construction", "va", "hometown-heroes"],
    faq: [
      {
        q: "What is a CDD assessment and does it affect my mortgage?",
        a: "A community development district assessment funds infrastructure in certain developments and is billed on the annual property tax bill. For qualifying purposes it is treated as part of the recurring housing obligation, alongside taxes, insurance, and association dues. It is worth identifying before an offer, because two otherwise comparable homes can carry noticeably different monthly obligations if only one sits inside a district.",
      },
      {
        q: "How does financing new construction in Royal Palm Beach differ?",
        a: "Mainly on timing and appraisal. A builder contract can run months ahead of completion, and most loan approvals and rate locks have finite terms, so the financing has to be structured around the delivery date. The appraisal is completed against plans and specifications rather than a finished home, and a final inspection is required before closing once the certificate of occupancy issues.",
      },
    ],
  },
  // Region pages. Each covers its whole region. Do not add a page for a town
  // inside one, and do not name a subset of towns in the copy. See rule 1(b).
  {
    slug: "florida-keys",
    kind: "region",
    city: "Florida Keys",
    blurb:
      "Monroe County financing, where insurance, elevation, and project approval decide more files than the borrower profile does.",
    conditions:
      "Keys files turn on insurance and elevation more often than on borrower profile. Almost every property sits in a FEMA flood zone, so flood coverage is required and its premium enters the qualifying calculation alongside windstorm coverage, which is written separately in Monroe County. Elevation certificates and ground-level enclosures affect both insurability and how an appraiser treats the square footage. Condominium and townhouse projects carry warrantability review, and Florida's milestone inspection and structural integrity reserve study requirements reach the older buildings among them. Monroe County also carries a high-cost conforming loan limit above the statewide figure, so the threshold at which a file becomes jumbo is not the mainland threshold. Short-term rental use puts occupancy and income documentation in play.",
    programs: ["non-warrantable-condo", "jumbo", "dscr", "conforming", "super-jumbo"],
    faq: [
      {
        q: "Why does insurance matter so much on a Florida Keys mortgage?",
        a: "Because it is part of what you are qualified on. Flood and windstorm premiums are counted in the recurring housing obligation alongside taxes and association dues, and in the Keys they are large enough to change how much financing a given income supports. They also vary with elevation, construction type, and deductible, so two similar properties can qualify differently. It is worth getting quotes before an offer rather than after inspection.",
      },
      {
        q: "Is the conforming loan limit different in the Keys?",
        a: "Yes. The Federal Housing Finance Agency designates Monroe County a high-cost area, so its conforming limit sits above the standard Florida figure. A loan amount that would be jumbo elsewhere in the state can still be conforming there. Limits are published annually and vary by the number of units, so the current year's figure is what governs your file.",
      },
      {
        q: "Can I finance a property I plan to rent out short term?",
        a: "Yes, though the occupancy classification changes the underwriting. A property held for rental income is underwritten as an investment property, and debt-service coverage programs qualify it on the rent the property produces rather than on your personal income. Local rental licensing and any association restriction on rental terms both affect which lenders will consider the file.",
      },
    ],
  },
  {
    slug: "florida-panhandle",
    kind: "region",
    city: "Florida Panhandle",
    blurb:
      "Two underwriting pictures in one region: coastal insurance and project review along the Gulf, rural program eligibility inland.",
    conditions:
      "The Panhandle splits into two underwriting pictures. Along the Gulf, windstorm and flood coverage drive the qualifying calculation, second homes and rental condominiums make up a large share of files, and project warrantability, reserve funding, and investor concentration decide whether agency financing is available at all. Inland, much of the region falls inside USDA Rural Development eligibility, where the geographic boundaries and household income limits are published and set by county. Housing stock inland runs older, so minimum property standards and appraiser-flagged repairs enter files more often, particularly roof age and electrical systems. Areas rebuilt after recent hurricanes bring construction and renovation financing, which is appraised against plans and specifications and requires a final inspection before closing.",
    programs: ["conforming", "va", "construction", "dscr", "non-warrantable-condo"],
    faq: [
      {
        q: "How does USDA eligibility work in the Panhandle?",
        a: "USDA Rural Development sets eligibility by the property's location against published maps, and by household income against limits set per county. The property has to be your primary residence. Because the boundaries follow published maps rather than a general sense of what is rural, eligibility is checked by address before an offer, and two adjacent properties can fall on opposite sides of a line.",
      },
      {
        q: "What makes coastal condominium financing here different?",
        a: "Project review rather than borrower review. A conventional loan requires the project to be warrantable, which turns on reserve funding, the share of units held by investors, pending litigation, and commercial space. Florida's milestone inspection and structural integrity reserve study requirements apply to the older buildings. Projects operating substantial short-term rental programs can also fall outside agency guidelines, which moves the file to a non-warrantable lender.",
      },
      {
        q: "Can I finance a rebuild or a home that needs repairs?",
        a: "Yes. Construction and renovation programs fold the cost of the work into the financing rather than requiring it to be completed first. The appraisal is made against plans and specifications rather than the current condition, funds are released against inspections as the work progresses, and a final inspection is required before closing. Where a property will not meet a program's minimum property standards as-is, this is usually the path.",
      },
    ],
  },
];

export const areaBySlug = (slug: string) => areas.find((a) => a.slug === slug);

/** "in Boca Raton" vs "in the Florida Keys". Regions take a definite article. */
export const inArea = (a: Area) => (a.kind === "region" ? `the ${a.city}` : a.city);

export const cities = areas.filter((a) => a.kind === "city");
export const regions = areas.filter((a) => a.kind === "region");

/** Programs named by an area, in the order that area lists them. */
export const programsForArea = (area: Area) =>
  area.programs
    .map((slug) => programs.find((p) => p.slug === slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

/** Areas that name a given program. Powers the program -> area interlink. */
export const areasForProgram = (programSlug: string) =>
  areas.filter((a) => a.programs.includes(programSlug));
