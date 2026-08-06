// Proves the calculator math. Node 24 (see .nvmrc) strips TypeScript natively,
// so this imports the same module the browser bundle uses — no loader, no deps.
//
//   node scripts/verify-calculator.mjs

import { calculate, principalAndInterest } from "../src/lib/mortgage.ts";

let failures = 0;

const money = (n) => "$" + n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

/** Payments are compared to the cent; floating point noise below that is fine. */
function check(label, actual, expected, tolerance = 0.005) {
  const ok = Number.isFinite(actual) && Math.abs(actual - expected) <= tolerance;
  if (!ok) failures++;
  const status = ok ? "PASS" : "FAIL";
  const detail = ok ? money(actual) : `got ${actual}, expected ${money(expected)}`;
  console.log(`  ${status}  ${label.padEnd(52)} ${detail}`);
}

console.log("\nPrincipal & interest — standard amortization");
check("$300k price, $60k down, 6%, 30yr", principalAndInterest(240000, 6, 30), 1438.9179);
check("$500k price, $100k down, 7%, 30yr", principalAndInterest(400000, 7, 30), 2661.2149);
check("$250k price, $12.5k down, 6.5%, 15yr", principalAndInterest(237500, 6.5, 15), 2068.8788);

console.log("\nEdge cases — where these calculators actually break");
check("0% rate falls back to P/n, not NaN", principalAndInterest(320000, 0, 30), 888.8889);
check("down payment equals price -> 0", calculate({ price: 100000, downPayment: 100000, ratePct: 6, termYears: 30 }).principalAndInterest, 0);
check("down payment exceeds price -> 0, not negative", calculate({ price: 100000, downPayment: 150000, ratePct: 6, termYears: 30 }).principal, 0);
check("zero term -> 0, not Infinity", principalAndInterest(240000, 6, 0), 0);
check("empty inputs -> 0", calculate({}).total, 0);
check("non-numeric input -> 0", calculate({ price: "abc", ratePct: "x", termYears: 30 }).total, 0);
check("negative price -> 0", calculate({ price: -5000, ratePct: 6, termYears: 30 }).total, 0);

console.log("\nFull PITI — $300k price, $60k down, 6%, 30yr, tax 1.2%, ins $2,400/yr, HOA $150/mo");
const r = calculate({
  price: 300000,
  downPayment: 60000,
  ratePct: 6,
  termYears: 30,
  taxPct: 1.2,
  annualInsurance: 2400,
  monthlyHoa: 150,
});
check("amount financed", r.principal, 240000);
check("principal & interest", r.principalAndInterest, 1438.9179);
check("monthly taxes", r.monthlyTaxes, 300);
check("monthly insurance", r.monthlyInsurance, 200);
check("monthly HOA", r.monthlyHoa, 150);
check("total monthly payment", r.total, 2088.9179);

console.log("\nInternal consistency");
check("components sum to total", r.principalAndInterest + r.monthlyTaxes + r.monthlyInsurance + r.monthlyHoa, r.total);
// A longer term must lower the payment; a higher rate must raise it.
const short = principalAndInterest(240000, 6, 15);
const long = principalAndInterest(240000, 6, 30);
check("15yr payment exceeds 30yr", short > long ? 1 : 0, 1);
check("7% payment exceeds 6%", principalAndInterest(240000, 7, 30) > long ? 1 : 0, 1);

console.log(failures === 0 ? "\nAll checks passed.\n" : `\n${failures} check(s) FAILED.\n`);
process.exit(failures === 0 ? 0 : 1);
