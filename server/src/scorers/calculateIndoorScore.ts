/**
 * Indoor Sightseeing Score Calculator
 *
 * Strategy (scoring_rationale.ods):
 *   temperature  (a_indoor = +0.03 per °C of extremity):
 *                Broadly indifferent, but favoured when exterior conditions are
 *                extreme (< 10°C or > 28°C) — the colder/hotter it is outside,
 *                the more tourists seek shelter in museums/galleries.
 *   rain         (b_indoor = +0.12): Positive modifier — rainfall is a direct
 *                shelter incentive driving visitors indoors.
 *   wind         (c_indoor =    0):  Neutral — heavy winds have no bearing on
 *                an indoor experience.
 *   snowfall     (d_indoor = +0.15): Positive modifier — severe winter conditions
 *                push tourists towards indoor cultural venues.
 *
 * Formula:
 *   indoor_score = BASE + a*tempExtremity + b*rain + d*snow
 *   tempExtremity = max(0, 10 - temp, temp - 28)   (distance from comfort band)
 *   clamped to [1, 5]
 */

const BASE           = 2.5;
const A_INDOOR       = 0.03;
const B_INDOOR       = 0.12;
const C_INDOOR       = 0;    // kept for formula symmetry; wind-agnostic indoors
const D_INDOOR       = 0.15;
const TEMP_LOWER_OK  = 10;   // below this, interior shelter becomes appealing
const TEMP_UPPER_OK  = 28;   // above this, air-conditioned venues attract visitors

function clamp(v: number, lo: number, hi: number): number {
  return Math.max(lo, Math.min(hi, v));
}

export function calculateIndoorScore(
  temperature: number,
  rain: number,
  wind: number,
  snowfall: number,
): number {
  // How far outside the comfortable outdoor temperature band is today?
  const tempExtremity = Math.max(0, TEMP_LOWER_OK - temperature, temperature - TEMP_UPPER_OK);

  const score =
    BASE +
    A_INDOOR * tempExtremity +
    B_INDOOR * rain +
    C_INDOOR * wind +   // always 0 — explicit for documentation purposes
    D_INDOOR * snowfall;

  return clamp(Math.round(score), 1, 5);
}
