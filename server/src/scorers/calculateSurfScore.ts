/**
 * Surf Score Calculator
 *
 * Strategy (scoring_rationale.ods):
 *   temperature  (a_surf = +0.07): Warm preference — higher temps gradually scale
 *                                  score up (comfortable water and air).
 *   rain         (b_surf = -0.06): Mild penalty — affects visibility and comfort
 *                                  but does not ruin wave quality.
 *   wind         (c_surf = +0.05): Positive scaling — wind generates swells,
 *                                  the core driver of surf desirability.
 *   snowfall     (d_surf =   n/a): Absolute disqualifier — any snowfall forces
 *                                  score to 1 (freezing conditions).
 *
 * Formula (linear with one hard guard):
 *   surf_score = BASE + a*temp + b*rain + c*wind
 *   clamped to [1, 5]; returns 1 immediately if snowfall > 0
 */

const BASE   = 1.5;
const A_SURF =  0.07;
const B_SURF = -0.06;
const C_SURF =  0.05;

export function calculateSurfScore(
  temperature: number,
  rain: number,
  wind: number,
  snowfall: number,
): number {
  // Hard disqualifier: freezing conditions make surfing impossible
  if (snowfall > 0) return 1;

  const score =
    BASE +
    A_SURF * temperature +
    B_SURF * rain +
    C_SURF * wind;

  return Math.max(1, Math.min(5, Math.round(score)));
}
