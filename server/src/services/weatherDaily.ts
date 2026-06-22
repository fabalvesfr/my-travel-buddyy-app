import axios from 'axios';
import type { DailyWeather } from '../types/index.js';

const FORECAST_URL = 'https://api.open-meteo.com/v1/forecast';

interface DailyForecastResponse {
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    rain_sum: number[];
    snowfall_sum: number[];
    wind_speed_10m_max: number[];
  };
}

/**
 * Fetches 7-day daily weather aggregates for the given coordinates.
 *
 * Variables requested:
 *   temperature_2m_max / min → averaged to a daily mean
 *   rain_sum                 → total daily rainfall (mm)
 *   snowfall_sum             → total daily snowfall (cm)
 *   wind_speed_10m_max       → peak daily wind speed (km/h)
 *
 * These four variables feed the activity scorer functions.
 */
export async function getDailyWeather(
  latitude: number,
  longitude: number,
): Promise<DailyWeather[]> {
  const { data } = await axios.get<DailyForecastResponse>(FORECAST_URL, {
    params: {
      latitude,
      longitude,
      daily: [
        'temperature_2m_max',
        'temperature_2m_min',
        'rain_sum',
        'snowfall_sum',
        'wind_speed_10m_max',
      ].join(','),
      forecast_days: 7,
      timezone: 'auto',
    },
  });

  return data.daily.time.map((date, i) => ({
    date,
    temperatureMean:
      (data.daily.temperature_2m_max[i] + data.daily.temperature_2m_min[i]) / 2,
    rain: data.daily.rain_sum[i] ?? 0,
    snowfall: data.daily.snowfall_sum[i] ?? 0,
    windSpeed: data.daily.wind_speed_10m_max[i] ?? 0,
  }));
}
