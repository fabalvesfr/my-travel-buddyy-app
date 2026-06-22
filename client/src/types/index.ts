/** Scores for a single day — each value is 1–5 */
export interface DayScore {
  ski: number;
  surf: number;
  outdoor: number;
  indoor: number;
}

/** One hourly data point returned by the forecast endpoint */
export interface ForecastPoint {
  time: string;
  temperature: number;
  precipitation: number;
  wind: number;
  snowfall: number;
}

/** Combined result once both API calls resolve */
export interface TravelData {
  scores: DayScore[];    // 7 items, one per day
  forecast: ForecastPoint[];
}
