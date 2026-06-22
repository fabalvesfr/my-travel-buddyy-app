import { resolveTravelForecast } from './travelForecast.js';

export const resolvers = {
  Query: {
    travelForecast: resolveTravelForecast,
  },
};
