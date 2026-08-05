// Bios marked `// DRAFT:` are written by us as stand-ins. They are deliberately
// free of any claim that needs substantiation — no transaction counts, no volume
// figures, no years-in-business — because those become advertising claims the
// moment they are published. See PLACEHOLDERS.md.
//
// NMLS IDs are NOT drafted. Mark Wilkinson's 297944 is confirmed against public
// record. Lorie Lewis's is unresolved and stays empty rather than guessed.

export interface TeamMember {
  slug: string;
  name: string;
  legalName: string;
  title: string;
  /** SAFE Act: renders on the bio card, the detail page, and anywhere else they appear. */
  nmls: string;
  headshot: string;
  headshotAlt: string;
  /** One entry per paragraph. */
  bio: string[];
  specialties: string[];
}

export const team: TeamMember[] = [
  {
    slug: "mark-wilkinson",
    name: "Mark Wilkinson",
    legalName: "Mark Wilkinson",
    title: "Loan Originator",
    nmls: "297944",
    // No headshot supplied. The UI falls back to a monogram, which reads as a
    // deliberate design choice rather than a missing image.
    headshot: "",
    headshotAlt: "",
    // DRAFT: both paragraphs.
    // Public sources (markmymortgage.com, Group One Mortgage) additionally claim
    // 30+ years, a Florida Atlantic BBA, 4,000+ transactions and $1B+ in volume.
    // Those are all substantiation claims, so they are deliberately left out
    // until Mark confirms he wants to advertise them.
    bio: [
      "Mark has spent his career in Palm Beach County real estate and mortgage lending, and the pattern he kept running into is the reason Aura exists: the files that were hardest to place were rarely the ones with weak borrowers. They were strong borrowers whose income, property, or timing did not fit the shape a retail bank underwrites to.",
      "He works the complicated end of the book — jumbo and super jumbo, non-warrantable condos, foreign national purchases, and the bridge and cross-collateral structures that let a client buy before they sell. He takes the first call himself and stays on the file through closing.",
    ],
    specialties: [
      "Jumbo and super jumbo",
      "Non-warrantable condos",
      "Foreign national",
      "Cross-collateral and bridge",
    ],
  },
  {
    slug: "lorie-lewis",
    name: "Lorie Lewis",
    legalName: "Lorie Ann Lewis",
    title: "Loan Originator",
    // NOT DRAFTED — the brief gave both 273007 and 334279 and the AIOS project
    // docs say 273007. Verify on nmlsconsumeraccess.org. LAUNCH BLOCKER.
    nmls: "",
    headshot: "",
    headshotAlt: "",
    // DRAFT: both paragraphs. Very little is known about Lorie's background, so
    // this is deliberately general and makes no verifiable claims.
    bio: [
      "Lorie is a licensed loan originator working primarily with purchase financing across Palm Beach County. She spends most of her time with buyers who are early in the process — the ones who want to understand what they qualify for and what the next ninety days actually look like before they start touring houses.",
      "She handles conventional, FHA, and VA financing, and Florida's Hometown Heroes program for eligible frontline and community workers. Her view is that most of the stress in a purchase comes from not knowing what happens next, so she over-explains on purpose.",
    ],
    specialties: [
      "Purchase financing",
      "FHA and VA",
      "Hometown Heroes",
      "First-time buyers",
    ],
  },
];

export const memberBySlug = (slug: string) => team.find((m) => m.slug === slug);
