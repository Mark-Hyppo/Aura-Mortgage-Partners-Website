// DRAFT CONTENT NOTICE
// Fields marked `// DRAFT:` below are written by us as stand-ins so the site reads
// as finished. They are plausible, compliance-safe, and deliberately free of any
// claim that needs substantiation, but the client has not confirmed them.
// Full register: PLACEHOLDERS.md.  Find them all with:  grep -rn "DRAFT:" src/
//
// License numbers are NOT drafted. An invented NMLS ID is fabricated regulatory
// data, not placeholder copy, so those fields stay empty and the UI omits them.

const SENTINEL = "__PENDING__";

export const pending = (brief: string) => `${SENTINEL}${brief}`;
export const isPending = (v: unknown): v is string =>
  typeof v === "string" && v.startsWith(SENTINEL);
export const briefOf = (v: string) => v.slice(SENTINEL.length);
export const settled = <T extends string>(v: T) => (isPending(v) ? "" : v);

export const site = {
  name: "Aura Mortgage Partners",
  legalName: "Aura Mortgage Partners LLC",
  shortName: "Aura",
  // DRAFT: hero tagline
  tagline: "The Boca Raton broker other brokers send their hard files to.",
  phoneDisplay: "(561) 755-7478",
  phoneTel: "+15617557478",
  // DRAFT: mailbox must be created, or repoint to a real address, before launch
  email: "info@auramortgagepartners.com",
  url: "https://www.auramortgagepartners.com",
  // The office is in Boca Raton. The street address and ZIP have not been
  // supplied, and a fabricated business location on a mortgage advertisement is
  // the same category of problem as a fabricated NMLS ID, so these stay pending
  // and every surface that renders them omits them. Re-derive geo from the real
  // address when it arrives; do NOT carry the old West Palm Beach coordinates.
  street: pending("Boca Raton street address"),
  city: "Boca Raton",
  region: "FL",
  regionName: "Florida",
  postal: pending("Boca Raton ZIP code"),
  hours: "9:00 AM – 5:00 PM, seven days a week, weekends and holidays included",
  hoursShort: "9–5, seven days a week",
  geo: { lat: pending("latitude of the Boca Raton office"), lng: pending("longitude") },
} as const;

export const compliance = {
  licensedEntity: "Aura Mortgage Partners LLC",
  // NOT DRAFTED. An invented NMLS ID is fabricated regulatory data. Empty until
  // the client supplies it; every surface that renders it omits it while blank.
  companyNmls: "",
  // Only if Aura originates under a sponsoring lender. May be what the
  // unidentified "Arch Mortgage" reference in the brief refers to.
  sponsorNmls: "",
  equalHousing: "Equal Housing Lender",
  verifyUrl: "https://www.nmlsconsumeraccess.org/",
  verifyLabel: "nmlsconsumeraccess.org",
  statesLicensed: "Florida",
  disclaimer:
    "Not a commitment to lend. All loans are subject to credit approval, underwriting, and property appraisal. Rates, terms, and programs are subject to change without notice. Not all applicants qualify.",
  regZDisclosure:
    "Loan terms shown are the repayment periods available and are not an offer of credit. Actual terms, the annual percentage rate (APR), required down payment, and monthly payment depend on loan program, loan amount, occupancy, property type, credit profile, and loan-to-value ratio, and are determined at application. Rates and terms are subject to change without notice.",
} as const;

export const media = {
  logo: "https://www.auramortgagepartners.com/og-image.jpg",
  logoAlt:
    "Aura Mortgage Partners logo: a navy circle closed by a gold arc, enclosing a rooftop letter A above the AURA Mortgage Partners wordmark",
} as const;

// Empty until the HyppoCRM tenant exists. The blog renders a clean "no posts yet"
// state, the contact page falls back to phone and email, and the tracking pixel
// simply is not emitted.
export const hyppo = {
  pixelId: "",
  tenantSlug: "",
  blogSlug: "",
  contactFormSlug: "",
} as const;

// DRAFT: conventional handle URLs. None have been verified to exist, so check each
// before launch or delete the entry; the footer renders only what is listed here.
export const social = [
  { label: "Facebook", icon: "facebook", href: "https://www.facebook.com/auramortgagepartners" },
  { label: "Instagram", icon: "instagram", href: "https://www.instagram.com/auramortgagepartners" },
  { label: "LinkedIn", icon: "linkedin", href: "https://www.linkedin.com/company/aura-mortgage-partners" },
] as const;

export const about = {
  heading: "A brokerage built for the files that get declined",
  // DRAFT: company story, all three paragraphs
  intro:
    "Aura Mortgage Partners was founded on a simple observation: the mortgage business is very good at financing straightforward borrowers, and very bad at everyone else. A W-2 employee buying a suburban house has a dozen lenders competing for the file. A self-employed borrower, a foreign national, or a buyer under contract in a condo building that just failed its reserve study has almost none.",
  body: [
    "We are a broker rather than a bank, and that distinction decides everything about how a file gets worked. A bank has one product sheet and has to fit you to it. We take your scenario to a panel of wholesale lenders and find the one whose guidelines already match it. When a file is unusual, that difference is not a matter of a better rate. It is the difference between closing and being declined.",
    "We are based in Boca Raton and most of what we write is in Palm Beach County, which means we deal constantly with the things that make South Florida financing its own discipline: non-warrantable condos, milestone inspections and the assessments that follow them, foreign national buyers, and appraisals that surprise people who moved here from somewhere else. We answer the phone nine to five, seven days a week, including weekends and holidays, because real estate does not close on a weekday schedule.",
  ],
} as const;

export const trustPoints = [
  {
    icon: "clock",
    title: "Open seven days a week",
    desc: "Nine to five every day, weekends and holidays included. Real estate does not close on Fridays, and neither do we.",
  },
  {
    icon: "compass",
    title: "Wholesale, not retail",
    desc: "As a broker we shop your scenario across a panel of wholesale lenders instead of selling one bank's product sheet.",
  },
  {
    icon: "layers",
    title: "The hard files are the specialty",
    desc: "Self-employed, foreign national, non-warrantable condo, cross-collateralized, land only. Files that get declined elsewhere are the ones we are built for.",
  },
  {
    icon: "phone",
    title: "You talk to the originator",
    desc: "No call center and no handoff. The person who takes your first call is the person who structures your file.",
  },
] as const;

export const seo = {
  keywords: [
    "mortgage broker boca raton",
    "mortgage broker palm beach county",
    "jumbo loan boca raton",
    "non-warrantable condo loan florida",
    "dscr loan florida",
    "bank statement loan boca raton",
    "foreign national mortgage florida",
    "reverse mortgage boca raton",
    "construction loan palm beach county",
    "hometown heroes florida lender",
    "fha loan boca raton",
    "va loan palm beach county",
  ],
} as const;

export interface NavItem {
  label: string;
  /** null when the item exists only to open its header dropdown. */
  href: string | null;
  /** Path prefix that marks the item current. Defaults to href. */
  match?: string;
}

export const nav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Loan Programs", href: "/loan-programs" },
  // No index page of its own. The header dropdown is the only way in. `match`
  // is what keeps the item highlighted while a city page is open.
  { label: "Areas We Serve", href: null, match: "/areas-we-serve" },
  { label: "Calculator", href: "/mortgage-calculator" },
  { label: "Our Team", href: "/team" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export const footerLegal = [
  { label: "Licensing & Disclosures", href: "/licensing" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
] as const;
