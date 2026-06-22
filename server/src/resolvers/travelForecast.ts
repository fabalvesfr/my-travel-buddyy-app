import { geocodeCity } from '../services/geocoding.js';
import { getDailyWeather } from '../services/weatherDaily.js';
import { getHourlyWeather } from '../services/weatherHourly.js';
import {
  calculateSkiScore,
  calculateSurfScore,
  calculateOutdoorScore,
  calculateIndoorScore,
} from '../scorers/index.js';
import type { TravelForecast } from '../types/index.js';

/**
 * Resolver for `Query.travelForecast`.
 *
 * Orchestration steps:
 *  1. Geocode city → lat/lon (Open-Meteo Geocoding API)
 *  2. In parallel:
 *     a. Fetch 7-day daily aggregates → compute activity scores
 *     b. Fetch 7-day hourly data      → shape for Recharts chart
 */
export async function resolveTravelForecast(
  _parent: unknown,
  { city }: { city: string },
): Promise<TravelForecast> {
  const { latitude, longitude } = await geocodeCity(city);

  const [dailyWeather, forecast] = await Promise.all([
    getDailyWeather(latitude, longitude),
    getHourlyWeather(latitude, longitude),
  ]);

  const scores = dailyWeather.map(({ temperatureMean, rain, snowfall, windSpeed }) => ({
    ski:     calculateSkiScore(temperatureMean, rain, windSpeed, snowfall),
    surf:    calculateSurfScore(temperatureMean, rain, windSpeed, snowfall),
    outdoor: calculateOutdoorScore(temperatureMean, rain, windSpeed, snowfall),
    indoor:  calculateIndoorScore(temperatureMean, rain, windSpeed, snowfall),
  }));

  return { scores, forecast };
}
