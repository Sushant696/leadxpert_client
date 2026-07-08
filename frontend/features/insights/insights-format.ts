// Shared formatting + palette helpers for the super-admin Insights page.
// Currency formatting mirrors the app-wide convention (LeadDetailsModal,
// AtRiskValueCard): Intl "en-US" grouping with NPR as the display currency.

// Aggregated stats can mix currencies in theory; NPR is the platform default
// (see the server Currency enum) and the display currency for summed tiles.
export const DISPLAY_CURRENCY = "NPR";

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: DISPLAY_CURRENCY,
    maximumFractionDigits: 0,
  }).format(Math.round(value ?? 0));
}

// Compact whole-number formatting for counts.
export function formatCount(value: number): string {
  return new Intl.NumberFormat("en-US").format(value ?? 0);
}

// Turns SNAKE_CASE / snake_case source enums into "Title Case".
export function toTitleCase(value: string): string {
  return value
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

// One decimal place at most, no trailing ".0" — the page never shows more
// than a single decimal (per the copy plan).
export function formatRate(value: number): string {
  return `${Number(value.toFixed(1))}%`;
}

// ── Card colour plans (from the colour/copy plan) ──
// Green intensity ramp, light → dark, for the three scoring tiers.
export const GREEN_RAMP = ["#86efac", "#22c55e", "#15803d"] as const;
// Amber, for "money at risk" and "where deals fall apart".
export const AMBER = "#f59e0b";
export const AMBER_RAMP = ["#fcd34d", "#f59e0b", "#d97706", "#b45309"] as const;
// Neutral gray for de-emphasised bars.
export const NEUTRAL = "#cbd5e1";
// Gray → teal ramp for the "what drives a sale" bars.
export const TEAL = "#0d9488";

// Interpolates a gray→teal hex for a 0-1 position (drivers card).
export function grayToTeal(t: number): string {
  const from = [148, 163, 184]; // slate-400
  const to = [13, 148, 136]; // teal-600
  const mix = from.map((c, i) => Math.round(c + (to[i] - c) * t));
  return `rgb(${mix[0]}, ${mix[1]}, ${mix[2]})`;
}
