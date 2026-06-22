/**
 * Ski Score Calculator
 *
 * Strategy (scoring_rationale.ods):
 *   temperature  (a_ski = -0.20): Colder is better within the valid window.
 *                                 Above 5°C the snow melts — hard disqualifier.
 *   rain         (b_ski = -0.15): Wet snow instantly degrades ski conditions.
 *   wind         (c_ski = -0.04): Penalty kicks in above 30 km/h (lift closures,
 *                                 wind-chill); irrelevant below that threshold.
 *   snowfall     (d_ski = +0.18): Fresh powder is the primary desirability driver.
 *
 * Formula (piecewise linear):
 *   ski_score = BASE + a*temp + b*rain + c*(wind - 30)[wind>30] + d*snow
 *   clamped to [1, 5]
 */

const BASE = 3.5;
const A_SKI = -0.20;
const B_SKI = -0.15;
const C_SKI = -0.04;
const D_SKI =  0.18;
const WIND_THRESHOLD = 30; // km/h

function clamp(v: number, lo: number, hi: number): number {
  return Math.max(lo, Math.min(hi, v));
}

export function calculateSkiScore(
  temperature: number, // daily mean °C
  rain: number,        // mm
  wind: number,        // km/h (daily max)
  snowfall: number,    // cm
): number {
  // Hard disqualifier: above-freezing temperatures melt snow and make slopes dangerous
  if (temperature > 5) return 1;

  const score =
    BASE +
    A_SKI * temperature +
    B_SKI * rain +
    (wind > WIND_THRESHOLD ? C_SKI * (wind - WIND_THRESHOLD) : 0) +
    D_SKI * snowfall;

  return clamp(Math.round(score), 1, 5);
}
