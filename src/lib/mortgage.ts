// Payment math for the mortgage calculator. Pure and side-effect free so the
// same code runs in the browser bundle and under `node scripts/verify-calculator.mjs`.
//
// Nothing here states a rate. Every figure is supplied by the borrower — see the
// disclosure on the calculator page and the Reg Z section of COMPLIANCE.md.

export interface CalculatorInput {
  /** Purchase price, dollars. */
  price: number;
  /** Down payment, dollars. */
  downPayment: number;
  /** Annual interest rate as a percentage, e.g. 6.5 for 6.5%. */
  ratePct: number;
  /** Repayment period in years. */
  termYears: number;
  /** Annual property tax as a percentage of purchase price. */
  taxPct: number;
  /** Annual homeowners insurance premium, dollars. */
  annualInsurance: number;
  /** HOA dues, dollars per month. */
  monthlyHoa: number;
}

export interface CalculatorResult {
  /** Amount financed: price less down payment, floored at zero. */
  principal: number;
  principalAndInterest: number;
  monthlyTaxes: number;
  monthlyInsurance: number;
  monthlyHoa: number;
  /** The four components above. */
  total: number;
}

const clean = (n: unknown) => {
  const v = typeof n === "number" ? n : Number(n);
  return Number.isFinite(v) && v > 0 ? v : 0;
};

/**
 * Standard fixed-rate amortization: M = P·r(1+r)ⁿ / ((1+r)ⁿ − 1).
 *
 * At 0% that formula divides by zero, which is the classic way these calculators
 * blow up, so interest-free falls back to straight-line principal.
 */
export function principalAndInterest(principal: number, ratePct: number, termYears: number) {
  const p = clean(principal);
  const n = clean(termYears) * 12;
  const r = clean(ratePct) / 100 / 12;

  if (p === 0 || n === 0) return 0;
  if (r === 0) return p / n;

  const growth = Math.pow(1 + r, n);
  return (p * (r * growth)) / (growth - 1);
}

export function calculate(input: Partial<CalculatorInput>): CalculatorResult {
  const price = clean(input.price);
  const principal = Math.max(0, price - clean(input.downPayment));

  const pi = principalAndInterest(principal, clean(input.ratePct), clean(input.termYears));
  const monthlyTaxes = (price * clean(input.taxPct)) / 100 / 12;
  const monthlyInsurance = clean(input.annualInsurance) / 12;
  const monthlyHoa = clean(input.monthlyHoa);

  return {
    principal,
    principalAndInterest: pi,
    monthlyTaxes,
    monthlyInsurance,
    monthlyHoa,
    total: pi + monthlyTaxes + monthlyInsurance + monthlyHoa,
  };
}

export const TERM_OPTIONS = [5, 10, 15, 20, 25, 30] as const;

export const formatUsd = (n: number) =>
  n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
