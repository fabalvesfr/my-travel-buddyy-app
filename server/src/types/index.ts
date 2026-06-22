/** Result from the Open-Meteo Geocoding API */
export interface GeoResult {
  name: string;
  latitude: number;
  longitude: number;
  country: string;
}

/** Processed daily weather snapshot used as input to the scorer functions */
export interface DailyWeather {
  date: string;
  temperatureMean: number; // °C (average of daily max + min)
  rain: number;            // mm
  snowfall: number;        // cm
  windSpeed: number;       // km/h (daily max)
}

/** Single hourly data point returned to the frontend for the Recharts chart */
export interface ForecastPoint {
  time: string;
  temperature: number;  // °C
  precipitation: number; // mm
  wind: number;          // km/h
  snowfall: number;      // cm
}

/** Per-day activity desirability scores (1–5) */
export interface DayScore {
  ski: number;
  surf: number;
  outdoor: number;
  indoor: number;
}

/** Root GraphQL response type */
export interface TravelForecast {
  scores: DayScore[];
  forecast: ForecastPoint[];
}
