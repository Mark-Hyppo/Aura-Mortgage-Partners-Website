export type ProgramGroup = "inside" | "outside";

export interface Program {
  slug: string;
  /** Full display name, used as the page H1 and card title. */
  name: string;
  /** Short name used in <title>. Must be <= 26 chars so the built title stays under 70. */
  titleName: string;
  /** Fills "Aura Mortgage Partners provides {service} in {site.city}, FL." */
  service: string;
  group: ProgramGroup;
  icon: string;
  blurb: string;
  lede: string;
  whoItFits: string[];
  whatToBring: string[];
  faq: { q: string; a: string }[];
}

export const groups = {
  inside: {
    key: "inside" as const,
    heading: "Inside the Box",
    desc: "Agency and government financing. Well-defined guidelines, competitive wholesale pricing, and a process that runs on rails when the file fits.",
  },
  outside: {
    key: "outside" as const,
    heading: "Outside the Box",
    desc: "The files that get declined elsewhere. Non-agency programs underwritten on the strength of the asset, the rents, or the deposits rather than a tax return.",
  },
};

export const programs: Program[] = [
  // ── Inside the Box ────────────────────────────────────────────────────────
  {
    slug: "conforming",
    name: "Conforming Loans",
    titleName: "Conforming Loans",
    service: "conforming and conventional mortgages",
    group: "inside",
    icon: "conforming",
    blurb:
      "Conventional financing within the loan limits Fannie Mae and Freddie Mac set each year. The default path when the file fits.",
    lede:
      "A conforming loan is conventional financing that falls within the annual loan limits set by the Federal Housing Finance Agency and meets Fannie Mae or Freddie Mac guidelines. For a borrower with documented income and a straightforward property, it is usually the least expensive way to finance a home.",
    whoItFits: [
      "Buyers and homeowners whose income is documented on W-2s or tax returns",
      "Primary residences, second homes, and investment properties within conforming limits",
      "Borrowers with an established credit history",
      "Anyone who wants the widest choice of terms and the most competitive wholesale pricing",
    ],
    whatToBring: [
      "Two most recent pay stubs",
      "W-2s for the past two years",
      "Two months of bank statements for all accounts",
      "Photo ID and, if applicable, the purchase contract",
    ],
    faq: [
      {
        q: "What makes a loan conforming?",
        a: "It falls at or below the conforming loan limit for the county the property is in, and it meets Fannie Mae or Freddie Mac underwriting guidelines. Limits are published annually by the FHFA and vary by county and by the number of units.",
      },
      {
        q: "What happens if my loan is above the limit?",
        a: "It becomes a jumbo loan, underwritten to the lender's own guidelines rather than agency guidelines. We originate both, so a loan amount near the limit does not need to be decided before you call.",
      },
      {
        q: "Can I use a conforming loan for a rental property?",
        a: "Yes. Guidelines differ from a primary residence, and reserve requirements are generally higher, but investment properties are eligible.",
      },
    ],
  },
  {
    slug: "fha",
    name: "FHA Loans",
    titleName: "FHA Loans",
    service: "FHA-insured mortgages",
    group: "inside",
    icon: "fha",
    blurb:
      "Insured by the Federal Housing Administration. More flexible credit guidelines and lower down payment requirements than conventional financing.",
    lede:
      "An FHA loan is a mortgage insured by the Federal Housing Administration. Because the insurance reduces the lender's risk, guidelines around credit history and down payment are more flexible than conventional financing — which makes it a common path for first-time buyers and for borrowers rebuilding credit.",
    whoItFits: [
      "First-time buyers, though the program is not limited to them",
      "Borrowers whose credit profile does not yet meet conventional guidelines",
      "Buyers who want to keep more cash on hand at closing",
      "Owner-occupants — FHA financing requires the property be your primary residence",
    ],
    whatToBring: [
      "Two most recent pay stubs and two years of W-2s",
      "Two months of bank statements",
      "Photo ID and Social Security number for the FHA case number",
      "Explanation letters for any recent credit events",
    ],
    faq: [
      {
        q: "Is FHA only for first-time buyers?",
        a: "No. There is no first-time buyer requirement. The property does have to be your primary residence, so FHA financing is not available for second homes or investment properties.",
      },
      {
        q: "What is mortgage insurance on an FHA loan?",
        a: "FHA loans carry both an upfront and an annual mortgage insurance premium, which is what allows the flexible guidelines. The annual premium is collected monthly with your payment. How long it stays on the loan depends on the term and the loan-to-value ratio at origination.",
      },
      {
        q: "Can I use FHA on a condo?",
        a: "Only if the project is on the FHA-approved condominium list, or qualifies under single-unit approval. We check project eligibility before you write an offer, because it is a common reason FHA contracts fall apart.",
      },
    ],
  },
  {
    slug: "va",
    name: "VA Loans",
    titleName: "VA Loans",
    service: "VA-guaranteed mortgages",
    group: "inside",
    icon: "va",
    blurb:
      "Guaranteed by the Department of Veterans Affairs for eligible service members, veterans, and surviving spouses.",
    lede:
      "A VA loan is a mortgage guaranteed by the U.S. Department of Veterans Affairs, available to eligible active-duty service members, veterans, National Guard and Reserve members, and certain surviving spouses. The guarantee lets lenders offer terms that are not available on conventional financing.",
    whoItFits: [
      "Active-duty service members and veterans who meet VA service requirements",
      "National Guard and Reserve members who meet the service threshold",
      "Surviving spouses who hold a valid Certificate of Eligibility",
      "Owner-occupants — the VA program requires the property be your primary residence",
    ],
    whatToBring: [
      "Certificate of Eligibility, or DD-214 so we can request one",
      "Two most recent pay stubs, or a Leave and Earnings Statement if active duty",
      "Two months of bank statements",
      "Photo ID",
    ],
    faq: [
      {
        q: "How do I get my Certificate of Eligibility?",
        a: "We can request it electronically in most cases. If the automated system cannot return it, we submit VA Form 26-1880 with your DD-214.",
      },
      {
        q: "Can I use a VA loan more than once?",
        a: "Yes. VA entitlement can be restored after a prior VA loan is paid off, and in some situations a second VA loan is possible while the first is still open, depending on remaining entitlement.",
      },
      {
        q: "Is there mortgage insurance on a VA loan?",
        a: "No monthly mortgage insurance. Most borrowers pay a one-time VA funding fee instead, which can usually be financed. Veterans receiving VA disability compensation are generally exempt from the funding fee.",
      },
    ],
  },
  {
    slug: "jumbo",
    name: "Jumbo Loans",
    titleName: "Jumbo Loans",
    service: "jumbo mortgages",
    group: "inside",
    icon: "jumbo",
    blurb:
      "Financing above the conforming loan limit, underwritten to lender guidelines rather than agency guidelines.",
    lede:
      "A jumbo loan exceeds the conforming loan limit for the county, which means it cannot be sold to Fannie Mae or Freddie Mac. Each lender writes its own guidelines instead — so jumbo pricing and qualifying criteria vary far more between lenders than conforming does. That variation is exactly where a broker earns their keep.",
    whoItFits: [
      "Buyers in Palm Beach County price points above the conforming limit",
      "Borrowers with strong reserves and documented income",
      "Homeowners refinancing a high-balance mortgage",
      "Purchasers of second homes and investment properties at higher loan amounts",
    ],
    whatToBring: [
      "Two years of complete personal tax returns with all schedules",
      "Two months of statements for every asset account, including retirement",
      "Two most recent pay stubs",
      "A schedule of any other real estate owned",
    ],
    faq: [
      {
        q: "How much do jumbo guidelines vary between lenders?",
        a: "Substantially. Reserve requirements, allowable loan-to-value, condo eligibility, and how self-employment income is treated all differ by lender. A file declined at one jumbo investor is routinely approvable at another.",
      },
      {
        q: "Are reserves required?",
        a: "Almost always, and they are typically higher than conforming. The amount depends on the loan size, occupancy, and how many financed properties you hold.",
      },
      {
        q: "What if my loan is far above the standard jumbo range?",
        a: "That moves into super jumbo territory, which is a different investor set again. See our super jumbo page.",
      },
    ],
  },
  {
    slug: "hometown-heroes",
    name: "Hometown Heroes",
    titleName: "Hometown Heroes",
    service: "Florida Hometown Heroes program financing",
    group: "inside",
    icon: "hometown-heroes",
    blurb:
      "The Florida Housing program offering down payment and closing cost assistance to eligible frontline and community workers.",
    lede:
      "Florida Hometown Heroes is a program administered by the Florida Housing Finance Corporation that provides down payment and closing cost assistance to eligible Florida workers buying a primary residence. Eligibility, income limits, and assistance amounts are set by Florida Housing and change from time to time.",
    whoItFits: [
      "Full-time Florida workers in an eligible occupation, as defined by Florida Housing",
      "First-time buyers, and certain veterans who are exempt from the first-time requirement",
      "Households within the county income limits published by Florida Housing",
      "Buyers purchasing a primary residence within program purchase price limits",
    ],
    whatToBring: [
      "Proof of full-time employment in an eligible occupation",
      "Two most recent pay stubs and two years of W-2s",
      "Homebuyer education certificate, which the program requires",
      "Photo ID and proof of Florida residency",
    ],
    faq: [
      {
        q: "Which occupations qualify?",
        a: "Florida Housing publishes the eligible occupation list, which has been expanded over time. Rather than guess from an outdated list, call and we will check your specific role against the current program rules.",
      },
      {
        q: "Do I have to be a first-time buyer?",
        a: "Generally yes, defined as not having owned a primary residence in the past three years. Veterans are typically exempt from that requirement.",
      },
      {
        q: "Is the assistance forgiven?",
        a: "The assistance is structured as a second mortgage with its own repayment terms set by Florida Housing. Terms have changed between program versions, so we review the current structure with you before you commit.",
      },
    ],
  },
  {
    slug: "refinance",
    name: "Refinancing",
    titleName: "Refinancing",
    service: "mortgage refinancing",
    group: "inside",
    icon: "refinance",
    blurb:
      "Replace an existing mortgage — to change the term, remove mortgage insurance, consolidate a second lien, or access equity.",
    lede:
      "Refinancing replaces your existing mortgage with a new one. People refinance to change the repayment period, to remove mortgage insurance once equity allows, to consolidate a second lien, or to take cash out against accumulated equity. Whether it makes sense depends entirely on your existing loan and how long you plan to keep the property.",
    whoItFits: [
      "Homeowners whose equity position has changed since they bought",
      "Borrowers carrying mortgage insurance that may no longer be required",
      "Owners consolidating a first and second mortgage into one loan",
      "Homeowners who need to access equity for a defined purpose",
    ],
    whatToBring: [
      "Your current mortgage statement, and the statement for any second lien",
      "Most recent homeowners insurance declaration page",
      "Two most recent pay stubs and two years of W-2s",
      "Two months of bank statements",
    ],
    faq: [
      {
        q: "Should I refinance?",
        a: "Only if the math works for how long you will actually keep the loan. A refinance has closing costs, and extending your repayment period can increase the total finance charges you pay over the life of the debt even when the monthly payment goes down. We will show you the break-even before you apply.",
      },
      {
        q: "What is a cash-out refinance?",
        a: "You borrow more than you currently owe and take the difference in cash, secured against your home. It is important to understand that this converts unsecured debt into debt collateralized by your property, and may increase total finance charges over the life of the loan.",
      },
      {
        q: "Can I remove mortgage insurance by refinancing?",
        a: "Sometimes. On a conventional loan, mortgage insurance can often be removed without refinancing once the loan-to-value threshold is met. On most FHA loans it cannot, which is a common reason FHA borrowers refinance to conventional.",
      },
    ],
  },

  // ── Outside the Box ───────────────────────────────────────────────────────
  {
    slug: "super-jumbo",
    name: "Super Jumbo Loans",
    titleName: "Super Jumbo Loans",
    service: "super jumbo mortgages",
    group: "outside",
    icon: "super-jumbo",
    blurb:
      "High-balance financing beyond standard jumbo tiers, placed with portfolio lenders and private banks.",
    lede:
      "Super jumbo financing sits above the loan amounts most jumbo investors will write. At this level the loan is typically held in a lender's portfolio rather than securitized, which means underwriting is relationship-driven and structure matters more than a rate sheet. Placement is the whole job.",
    whoItFits: [
      "Buyers at Palm Beach, Jupiter Island, and coastal Palm Beach County price points",
      "Borrowers with significant assets whose income is complex or largely unearned",
      "Buyers who need cross-collateralization or asset-based qualifying",
      "Purchasers on a compressed timeline where a portfolio lender can move faster",
    ],
    whatToBring: [
      "Two years of complete tax returns, personal and business",
      "Statements for all liquid and retirement accounts",
      "A schedule of real estate owned with current values and liens",
      "Entity documents if the property will be held in a trust or LLC",
    ],
    faq: [
      {
        q: "Where does jumbo end and super jumbo begin?",
        a: "There is no single definition. It is the point at which the standard jumbo investor set stops and portfolio lenders take over, and that threshold moves with the market. We identify which set your loan amount lands in before we place it.",
      },
      {
        q: "Can I qualify on assets instead of income?",
        a: "Often, yes. Asset depletion and asset-based qualifying are common at this level, where a borrower's balance sheet tells the story better than a tax return does.",
      },
      {
        q: "Can the property be held in a trust or LLC?",
        a: "Frequently yes at this level, where agency restrictions do not apply. The entity structure needs to be reviewed up front because it affects which lenders can take the file.",
      },
    ],
  },
  {
    slug: "reverse",
    name: "Reverse Mortgages",
    titleName: "Reverse Mortgages",
    service: "reverse mortgages and HECM loans",
    group: "outside",
    icon: "reverse",
    blurb:
      "For homeowners 62 and older — convert home equity into funds without a required monthly mortgage payment.",
    lede:
      "A reverse mortgage lets homeowners aged 62 and older convert part of their home equity into loan proceeds without a required monthly mortgage payment. The loan balance grows over time rather than shrinking, and becomes due when the last borrower permanently leaves the home. It is a significant decision that deserves a real conversation, not a sales pitch.",
    whoItFits: [
      "Homeowners 62 or older, in a primary residence",
      "Owners with substantial equity who want to stay in the home",
      "Households restructuring retirement cash flow",
      "Borrowers who have completed the required HUD-approved counseling",
    ],
    whatToBring: [
      "Photo ID and proof of age for all borrowers",
      "Current mortgage statement, if any balance remains",
      "Homeowners insurance declaration page and most recent property tax bill",
      "Certificate from HUD-approved reverse mortgage counseling",
    ],
    faq: [
      {
        q: "Do I still own my home?",
        a: "Yes. Title stays in your name. The lender holds a lien, exactly as with any other mortgage.",
      },
      {
        q: "What obligations do I still have?",
        a: "You must keep the property as your primary residence, keep property taxes and homeowners insurance current, and maintain the home. Failing to do so can cause the loan to become due, which is the single most important thing to understand before proceeding.",
      },
      {
        q: "What happens to my heirs?",
        a: "When the last borrower permanently leaves the home, the loan becomes due. Heirs can repay the balance and keep the property, or sell it. HECM loans are non-recourse, so if the balance exceeds the home's value at that point, the difference is not owed by the estate.",
      },
    ],
  },
  {
    slug: "heloc",
    name: "HELOCs & Home Equity",
    titleName: "HELOCs",
    service: "home equity lines of credit",
    group: "outside",
    icon: "heloc",
    blurb:
      "A revolving line secured by your home — draw what you need, when you need it, without disturbing your first mortgage.",
    lede:
      "A home equity line of credit is a revolving line secured against your home. You draw against it as needed during a draw period, then repay over a repayment period. Its main advantage over a cash-out refinance is that it leaves your existing first mortgage untouched, which matters a great deal if that first mortgage is on terms you would not want to replace.",
    whoItFits: [
      "Homeowners with equity who want access without refinancing a first mortgage",
      "Owners funding renovations in stages rather than all at once",
      "Borrowers who want a standby facility rather than a lump sum",
      "Investors accessing equity in a held property",
    ],
    whatToBring: [
      "Current first mortgage statement",
      "Two most recent pay stubs and two years of W-2s",
      "Homeowners insurance declaration page",
      "Most recent property tax bill",
    ],
    faq: [
      {
        q: "HELOC or cash-out refinance?",
        a: "If your first mortgage is on terms you want to keep, a HELOC leaves it alone. If you want a single loan and a fixed repayment structure, a cash-out refinance may fit better. Either way, both secure the debt against your home and can increase total finance charges over time.",
      },
      {
        q: "Is a HELOC rate fixed?",
        a: "Most HELOCs carry a variable rate tied to an index, which means the payment can change. Some programs allow you to fix a portion of the balance. We will walk through how the specific product behaves before you sign.",
      },
      {
        q: "Can I get a HELOC on an investment property?",
        a: "Yes, though fewer lenders offer it and guidelines are tighter than on a primary residence.",
      },
    ],
  },
  {
    slug: "non-prime",
    name: "Non-Prime Loans",
    titleName: "Non-Prime Loans",
    service: "non-prime and bank statement mortgages",
    group: "outside",
    icon: "non-prime",
    blurb:
      "Bank statement, asset depletion, and alternative documentation for borrowers whose tax returns do not tell the whole story.",
    lede:
      "Non-prime — sometimes called non-QM — covers programs that qualify a borrower on something other than agency-standard documentation. Bank statement programs use deposits instead of tax returns. Asset depletion converts a balance sheet into qualifying income. These exist because a self-employed borrower who writes off aggressively can look far weaker on a 1040 than they actually are.",
    whoItFits: [
      "Self-employed borrowers whose tax returns understate their actual cash flow",
      "Business owners with significant depreciation or write-offs",
      "Borrowers with a recent credit event who are otherwise strong",
      "Retirees and others qualifying on assets rather than earned income",
    ],
    whatToBring: [
      "Twelve to twenty-four months of business or personal bank statements",
      "A CPA letter confirming business ownership and expense ratio, if available",
      "Business license or entity documents",
      "Statements for any accounts being used for asset depletion",
    ],
    faq: [
      {
        q: "How does a bank statement loan work?",
        a: "Instead of tax returns, the lender averages deposits over a twelve or twenty-four month period and applies an expense factor to arrive at qualifying income. The expense factor varies by lender and by industry, which is why placement matters.",
      },
      {
        q: "Do I need perfect credit?",
        a: "No. Guidelines are more flexible than agency, including on seasoning after a credit event. Pricing reflects the added risk, so these are structured as a path forward rather than a permanent home for the debt.",
      },
      {
        q: "Is non-prime the same as subprime?",
        a: "No. These are fully documented, ability-to-repay compliant loans that simply document income differently. The pre-2008 stated-income products they get confused with no longer exist.",
      },
    ],
  },
  {
    slug: "dscr",
    name: "DSCR Investor Loans",
    titleName: "DSCR Loans",
    service: "DSCR investment property loans",
    group: "outside",
    icon: "dscr",
    blurb:
      "Qualify on the property's rental income rather than your personal income. No tax returns, no employment verification.",
    lede:
      "A DSCR loan — debt service coverage ratio — qualifies an investment property on the rent it generates rather than on the borrower's personal income. The lender compares the property's income against the proposed payment. If the ratio works, the file works. Personal tax returns and employment verification typically are not part of the equation.",
    whoItFits: [
      "Real estate investors scaling a portfolio beyond agency financed-property limits",
      "Self-employed investors who would rather not document personal income",
      "Buyers of long-term and, with some lenders, short-term rentals",
      "Investors purchasing in an LLC",
    ],
    whatToBring: [
      "The lease, or a market rent appraisal for a vacant property",
      "Two months of bank statements showing down payment and reserves",
      "Entity documents if closing in an LLC",
      "A schedule of real estate owned",
    ],
    faq: [
      {
        q: "What DSCR do I need?",
        a: "Most lenders look for the property's income to at least cover the payment, and some will go below that with compensating factors. Thresholds vary by lender, which is where having a panel helps.",
      },
      {
        q: "Can I close in an LLC?",
        a: "Yes, and most DSCR investors prefer it. This is one of the main practical advantages over agency financing.",
      },
      {
        q: "Do short-term rentals count?",
        a: "With some lenders, yes — using a market rent projection or documented platform history. Not every DSCR investor allows it, so the property's intended use needs to be established up front.",
      },
    ],
  },
  {
    slug: "construction",
    name: "Construction Loans",
    titleName: "Construction Loans",
    service: "construction and renovation financing",
    group: "outside",
    icon: "construction",
    blurb:
      "Financing that funds in draws as the build progresses, then converts to permanent financing at completion.",
    lede:
      "A construction loan funds in stages as work is completed rather than in a single disbursement at closing. An inspector verifies each phase before the next draw releases. At completion the loan either converts to permanent financing or is replaced by it — the single-close and two-close structures behave very differently, and choosing wrong is expensive.",
    whoItFits: [
      "Owners building a custom home on a lot they own or are purchasing",
      "Buyers undertaking a substantial renovation or teardown",
      "Borrowers working with a licensed general contractor",
      "Investors building spec inventory",
    ],
    whatToBring: [
      "Complete plans, specifications, and a line-item construction budget",
      "The signed contract with your general contractor, plus their license and insurance",
      "The lot deed, or the purchase contract if buying the land",
      "Two years of tax returns and current asset statements",
    ],
    faq: [
      {
        q: "Single-close or two-close?",
        a: "A single-close funds construction and permanent financing under one closing, so you pay closing costs once and the permanent terms are locked at the start. Two-close means qualifying twice but keeps the permanent financing decision open until completion. Which is better depends on your build timeline.",
      },
      {
        q: "How do draws work?",
        a: "Funds release in scheduled increments as phases complete, verified by inspection. During construction you typically pay interest only on the amount actually drawn, not the full commitment.",
      },
      {
        q: "Can I act as my own contractor?",
        a: "Very few lenders permit owner-builder arrangements, and those that do have tight requirements. It is possible but it narrows the lender set considerably.",
      },
    ],
  },
  {
    slug: "bridge",
    name: "Bridge Loans",
    titleName: "Bridge Loans",
    service: "bridge loans",
    group: "outside",
    icon: "bridge",
    blurb:
      "Short-term financing that lets you buy the next home before the current one sells.",
    lede:
      "A bridge loan is short-term financing secured against your current home, your new one, or both, that funds a purchase before an existing property sells. It exists to solve a sequencing problem: the house you want is available now, and your equity is still tied up in the house you are leaving.",
    whoItFits: [
      "Move-up buyers who need to close before their current home sells",
      "Buyers who want to make a non-contingent offer in a competitive market",
      "Owners who need to complete repairs before listing",
      "Investors sequencing between an acquisition and a disposition",
    ],
    whatToBring: [
      "Current mortgage statement on the departing property",
      "The purchase contract on the new property",
      "The listing agreement on the departing property, if listed",
      "Recent asset statements",
    ],
    faq: [
      {
        q: "How long is the term?",
        a: "Bridge financing is short-term by design and intended to be retired when the departing property sells. Terms vary by lender, and the exit is underwritten as carefully as the loan itself.",
      },
      {
        q: "What if my house does not sell in time?",
        a: "That is the central risk, and it should be planned for before you close. Some lenders allow extensions; others do not. We build the exit plan into the file rather than treating it as an afterthought.",
      },
      {
        q: "Is a bridge loan the only option?",
        a: "No. Cross-collateralization or a HELOC on the departing property can achieve a similar result at lower cost in some situations. We compare all three rather than defaulting to one.",
      },
    ],
  },
  {
    slug: "cross-collateral",
    name: "Cross-Collateral Loans",
    titleName: "Cross-Collateral Loans",
    service: "cross-collateralized mortgage financing",
    group: "outside",
    icon: "cross-collateral",
    blurb:
      "Use equity in a property you already own as additional security on a new purchase.",
    lede:
      "Cross-collateralization pledges more than one property as security for a single loan. For a borrower who is equity-rich but wants to keep cash invested, it can fund a purchase using the equity already sitting in another property, without having to liquidate anything or sell first.",
    whoItFits: [
      "Owners with substantial equity in an existing property",
      "Buyers who would rather not liquidate investments to raise cash",
      "Investors expanding a portfolio using existing holdings",
      "Move-up buyers as an alternative to a conventional bridge loan",
    ],
    whatToBring: [
      "Statements and deeds for every property to be pledged",
      "Current lien information on each property",
      "The purchase contract on the new property",
      "Two years of tax returns and current asset statements",
    ],
    faq: [
      {
        q: "What is the risk?",
        a: "Both properties secure the debt, so a default puts both at risk rather than one. That is the trade for not having to sell or liquidate, and it should be a deliberate decision.",
      },
      {
        q: "Can the pledged property be released later?",
        a: "Many structures allow a release once the new loan reaches a specified loan-to-value ratio. The release terms need to be negotiated at origination, not after.",
      },
      {
        q: "Which lenders do this?",
        a: "Portfolio lenders and private banks, not agency investors. It is a small set, which is why it is worth having the relationships.",
      },
    ],
  },
  {
    slug: "hard-money",
    name: "Hard Money Loans",
    titleName: "Hard Money Loans",
    service: "hard money and private lending",
    group: "outside",
    icon: "hard-money",
    blurb:
      "Asset-based private financing that funds on the strength of the property and closes on a short timeline.",
    lede:
      "Hard money is private, asset-based financing underwritten primarily on the property rather than the borrower. It is more expensive than conventional financing, and it is not meant to be held long — it exists to solve for speed and for situations conventional underwriting cannot accommodate.",
    whoItFits: [
      "Investors acquiring at auction or on a compressed closing timeline",
      "Fix-and-flip projects where the property will not pass conventional appraisal",
      "Borrowers who need to close before conventional underwriting could finish",
      "Situations where the asset is strong but the borrower profile is complicated",
    ],
    whatToBring: [
      "The purchase contract and a scope of work with budget, if renovating",
      "Proof of funds for the required equity contribution",
      "Entity documents",
      "An exit plan — sale, or a refinance target with timing",
    ],
    faq: [
      {
        q: "How fast can it close?",
        a: "Much faster than conventional financing, because the underwriting focus is the asset. Actual timing depends on title, insurance, and how quickly a valuation can be completed.",
      },
      {
        q: "Why is it more expensive?",
        a: "Speed, flexibility, and risk are priced in. Hard money is a tool for a specific job, not a long-term home for the debt, and it should be entered with a defined exit.",
      },
      {
        q: "What is the exit?",
        a: "Either the property sells, or it refinances into conventional or DSCR financing once it is stabilized. We prefer to underwrite the exit at the same time as the loan.",
      },
    ],
  },
  {
    slug: "foreign-nationals",
    name: "Foreign National Loans",
    titleName: "Foreign National Loans",
    service: "foreign national mortgages",
    group: "outside",
    icon: "foreign-nationals",
    blurb:
      "Financing for non-U.S. citizens without a Social Security number or U.S. credit history.",
    lede:
      "Foreign national programs finance non-U.S. citizens purchasing property in the United States — buyers who typically have no Social Security number, no U.S. credit file, and income documented in another country and another currency. South Florida sees more of these files than almost anywhere else, and standard agency underwriting has no path for them.",
    whoItFits: [
      "Non-resident buyers purchasing a second home or investment property in Florida",
      "Buyers with no U.S. credit history",
      "Purchasers whose income and assets are held abroad",
      "Buyers closing in a U.S. entity",
    ],
    whatToBring: [
      "Valid passport and visa, if applicable",
      "A reference letter from your home-country financial institution",
      "Twelve months of bank statements from your home country",
      "Proof of income from your home country, translated to English",
    ],
    faq: [
      {
        q: "Do I need a Social Security number?",
        a: "No. Foreign national programs are built for borrowers without one, and without a U.S. credit file.",
      },
      {
        q: "Can I buy through a company?",
        a: "Yes. Many foreign national buyers close in a U.S. LLC for liability and estate planning reasons. Entity structure should be settled before we submit.",
      },
      {
        q: "What if my documents are not in English?",
        a: "They need to be translated, and lenders generally require a certified translation. We will tell you exactly what needs translating before you pay for any of it.",
      },
    ],
  },
  {
    slug: "non-warrantable-condo",
    name: "Non-Warrantable Condos",
    titleName: "Non-Warrantable Condo",
    service: "non-warrantable condominium financing",
    group: "outside",
    icon: "non-warrantable-condo",
    blurb:
      "Financing for condo projects that fail Fannie Mae warrantability — litigation, low reserves, high investor concentration.",
    lede:
      "A condominium is non-warrantable when the project itself fails agency guidelines, regardless of how strong the buyer is. Pending litigation, insufficient reserves, high investor concentration, a single owner holding too many units, or significant commercial space will all do it. In post-Surfside Florida, reserve and structural-study requirements have pushed a great many projects into this category.",
    whoItFits: [
      "Buyers under contract in a project that failed a condo questionnaire",
      "Purchasers in buildings with pending litigation or special assessments",
      "Buyers in projects with high investor concentration or significant commercial space",
      "Anyone whose agency condo approval fell through late in the process",
    ],
    whatToBring: [
      "The condo questionnaire, if one has already been completed",
      "HOA budget, reserve study, and current financial statements",
      "The master insurance certificate",
      "Any litigation disclosure and the milestone or structural integrity study",
    ],
    faq: [
      {
        q: "What makes a project non-warrantable?",
        a: "Common triggers are pending litigation, reserves below the required threshold, investor concentration above the limit, a single entity owning too many units, and excess commercial square footage. It takes only one.",
      },
      {
        q: "How has Florida's reserve law affected this?",
        a: "Milestone inspection and structural integrity reserve study requirements have moved many older coastal buildings out of warrantability, either through the findings themselves or through the assessments that follow. It is now a routine issue here, not an exotic one.",
      },
      {
        q: "Can this be checked before I write an offer?",
        a: "Yes, and it should be. We can review the project early rather than discovering the problem two weeks before a scheduled closing.",
      },
    ],
  },
  {
    slug: "co-op",
    name: "Co-op Loans",
    titleName: "Co-op Loans",
    service: "cooperative share loans",
    group: "outside",
    icon: "co-op",
    blurb:
      "Share loans for cooperative apartments, where you are financing stock and a proprietary lease rather than real property.",
    lede:
      "In a cooperative you do not own real estate — you own shares in a corporation that owns the building, together with a proprietary lease for your unit. That makes the financing a share loan rather than a mortgage, and most lenders simply do not do them. Florida has a meaningful co-op inventory, particularly in older coastal communities.",
    whoItFits: [
      "Buyers purchasing in a cooperative rather than a condominium",
      "Owners refinancing an existing co-op share loan",
      "Buyers in older Palm Beach County coastal co-op communities",
      "Anyone whose lender declined the file after learning it was a co-op",
    ],
    whatToBring: [
      "The stock certificate and proprietary lease, if refinancing",
      "The co-op corporation's financial statements and budget",
      "Board approval package requirements",
      "Standard income and asset documentation",
    ],
    faq: [
      {
        q: "How is this different from a condo loan?",
        a: "You are financing shares of stock and a lease, not real property. The lien attaches to the shares, and the co-op board has to consent. It is a different closing process entirely.",
      },
      {
        q: "Does the board have to approve me?",
        a: "Yes. Co-op boards approve purchasers, and they can decline. Board approval runs parallel to loan approval and is often the longer pole.",
      },
      {
        q: "Why do so few lenders offer these?",
        a: "The collateral is personal property rather than real property, the underlying corporation has to be underwritten too, and volume is low. Most lenders decide it is not worth building the capability.",
      },
    ],
  },
  {
    slug: "lot-loans",
    name: "Lot & Land Loans",
    titleName: "Lot & Land Loans",
    service: "lot and land loans",
    group: "outside",
    icon: "lot-loans",
    blurb:
      "Financing to acquire and hold a building lot before construction begins.",
    lede:
      "A lot loan finances the purchase of land — either to hold while you plan a build, or to sequence into construction financing later. Because vacant land produces no income and is harder to sell in a downturn, lenders treat it as higher risk than an improved property, and the guidelines reflect that.",
    whoItFits: [
      "Buyers who found the right lot before they are ready to build",
      "Owners assembling adjacent parcels",
      "Buyers of improved lots in an established subdivision",
      "Investors holding land for future development",
    ],
    whatToBring: [
      "The purchase contract and legal description",
      "Survey and any available plat",
      "Zoning and utility availability confirmation",
      "Two years of tax returns and current asset statements",
    ],
    faq: [
      {
        q: "Is an improved lot easier to finance than raw land?",
        a: "Considerably. A platted lot in an established subdivision with utilities at the street is a much simpler file than acreage with no infrastructure.",
      },
      {
        q: "Can the lot loan roll into construction financing?",
        a: "Yes, and if you intend to build, that path should be designed at the outset. A single-close construction loan can sometimes finance the land purchase and the build together.",
      },
      {
        q: "Are the guidelines tighter than a home loan?",
        a: "Yes. Expect higher equity requirements and shorter terms than financing on an improved property, because the collateral is harder to value and to liquidate.",
      },
    ],
  },
  {
    slug: "commercial",
    name: "Commercial Loans",
    titleName: "Commercial Loans",
    service: "commercial real estate financing",
    group: "outside",
    icon: "commercial",
    blurb:
      "Financing for retail, office, industrial, multifamily, and mixed-use property.",
    lede:
      "Commercial financing is underwritten on the property's performance — net operating income, debt service coverage, lease structure, and tenant quality — rather than on a personal debt-to-income ratio. Terms, amortization, and prepayment structures vary far more than they do in residential lending.",
    whoItFits: [
      "Owner-occupants buying a building for their own business",
      "Investors acquiring retail, office, industrial, or mixed-use property",
      "Multifamily buyers above the four-unit residential threshold",
      "Owners refinancing a maturing commercial loan or a balloon",
    ],
    whatToBring: [
      "Rent roll and current leases",
      "Two to three years of property operating statements",
      "Entity documents and a personal financial statement for each guarantor",
      "Two years of business and personal tax returns",
    ],
    faq: [
      {
        q: "How is this underwritten differently?",
        a: "The property's net operating income and debt service coverage drive the decision. Personal income supports the file but is not the primary test the way it is in residential lending.",
      },
      {
        q: "Is a personal guarantee required?",
        a: "Usually, at least in part. Non-recourse is available on some asset types and at some loan sizes, generally with tighter leverage.",
      },
      {
        q: "What about SBA financing?",
        a: "For owner-occupied commercial property, SBA 504 and 7(a) programs are often the better structure. If your business will occupy the majority of the building, that is worth exploring first.",
      },
    ],
  },
];

/** Loan terms shown on the index. Reg Z triggering terms — must render with the disclosure. */
export const termOptions = ["10-year", "15-year", "20-year", "30-year", "40-year"];

export const programsByGroup = (g: ProgramGroup) => programs.filter((p) => p.group === g);
export const programBySlug = (slug: string) => programs.find((p) => p.slug === slug);
