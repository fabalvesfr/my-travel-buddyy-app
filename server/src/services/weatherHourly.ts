import axios from 'axios';
import type { ForecastPoint } from '../types/index.js';

const FORECAST_URL = 'https://api.open-meteo.com/v1/forecast';

interface HourlyForecastResponse {
  hourly: {
    time: string[];
    temperature_2m: number[];
    rain: number[];
    snowfall: number[];
    wind_speed_10m: number[];
  };
}

/**
 * Fetches 7 days of hourly weather data for the given coordinates.
 *
 * The response is shaped to match the ForecastPoint type, which is the
 * format expected by the Recharts LineChart on the frontend.
 *
 * Variables: temperature_2m, rain, snowfall, wind_speed_10m
 */
export async function getHourlyWeather(
  latitude: number,
  longitude: number,
): Promise<ForecastPoint[]> {
  const { data } = await axios.get<HourlyForecastResponse>(FORECAST_URL, {
    params: {
      latitude,
      longitude,
      hourly: [
        'temperature_2m',
        'rain',
        'snowfall',
        'wind_speed_10m',
      ].join(','),
      forecast_days: 7,
      timezone: 'auto',
    },
  });

  return data.hourly.time.map((time, i) => ({
    time,
    temperature:   data.hourly.temperature_2m[i]  ?? 0,
    precipitation: data.hourly.rain[i]             ?? 0,
    wind:          data.hourly.wind_speed_10m[i]   ?? 0,
    snowfall:      data.hourly.snowfall[i]          ?? 0,
  }));
}
