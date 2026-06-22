/**
 * GraphQL schema definition.
 *
 * A single root query `travelForecast(city)` returns both the activity
 * scores array and the hourly weather data, letting the client resolve
 * both datasets in one round-trip.
 */
export const typeDefs = `#graphql
  "Per-day activity desirability scores, each on a 1–5 star scale."
  type DayScore {
    ski:     Int!
    surf:    Int!
    outdoor: Int!
    indoor:  Int!
  }

  "One hourly data point, shaped for the Recharts LineChart on the frontend."
  type ForecastPoint {
    time:          String!
    temperature:   Float!
    precipitation: Float!
    wind:          Float!
    snowfall:      Float!
  }

  "Root payload returned for a given city query."
  type TravelForecast {
    "7-day array of activity scores (index 0 = today)."
    scores:   [DayScore!]!
    "168-hour (7 days × 24 h) weather time-series for the forecast chart."
    forecast: [ForecastPoint!]!
  }

  type Query {
    "Fetch 7-day activity scores and hourly weather forecast for the given city."
    travelForecast(city: String!): TravelForecast!
  }
`;
