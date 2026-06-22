/**
 * Outdoor Sightseeing Score Calculator
 *
 * Strategy (scoring_rationale.ods):
 *   temperature  (a_outdoor = -0.07 per degC of deviation from 19.5°C):
 *                Comfort zone [15°C, 24°C]. Modelled as deviation from the
 *                midpoint (19.5°C) so that BOTH extremes are penalised linearly.
 *   rain         (b_outdoor = -0.18): Heavy penalty — any precipitation above
 *                2 mm/day significantly scales down sightseeing desirability.
 *   wind         (c_outdoor = -0.03): Linear penalty — high winds steadily
 *                degrade walking comfort.
 *   snowfall     (d_outdoor = -0.20): Strong penalty — accumulating snow renders
 *                standard sightseeing difficult.
 *
 * Formula:
 *   outdoor_score = BASE + a*|temp - 19.5| + b*rain + c*wind + d*snow
 *   clamped to [1, 5]
 */

const BASE       = 4.0;
const A_OUTDOOR  = -0.07; // penalty per °C deviation from ideal midpoint
const B_OUTDOOR  = -0.18;
const C_OUTDOOR  = -0.03;
const D_OUTDOOR  = -0.20;
const TEMP_IDEAL = 19.5;  // midpoint of the [15, 24] comfort zone

function clamp(v: number, lo: number, hi: number): number {
  return Math.max(lo, Math.min(hi, v));
}

export function calculateOutdoorScore(
  temperature: number,
  rain: number,
  wind: number,
  snowfall: number,
): number {
  const tempDeviation = Math.abs(temperature - TEMP_IDEAL);

  const score =
    BASE +
    A_OUTDOOR * tempDeviation +
    B_OUTDOOR * rain +
    C_OUTDOOR * wind +
    D_OUTDOOR * snowfall;

  return clamp(Math.round(score), 1, 5);
}
