/**
 * The only place money is formatted. Input is always an integer in paise.
 * PRD §6.3 — no float touches a price anywhere else.
 */

const inr = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

const inrWithPaise = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  minimumFractionDigits: 2,
});

/** 45000 → "₹450". Whole rupees drop the decimals; the catalog is priced in whole rupees. */
export function formatPrice(paise: number): string {
  return paise % 100 === 0 ? inr.format(paise / 100) : inrWithPaise.format(paise / 100);
}

/** Decimal string for schema.org Offer and payment SDKs. Not for display. */
export function toDecimalString(paise: number): string {
  return (paise / 100).toFixed(2);
}

export function formatVolume(ml: number): string {
  return ml >= 1000 ? `${ml / 1000}L` : `${ml}ml`;
}

export function formatEnergy(kj: number, kcal: number): string {
  return `${kj} kJ / ${kcal} kcal`;
}
