import axios from 'axios';
import type { GeoResult } from '../types/index.js';

const GEOCODING_URL = 'https://geocoding-api.open-meteo.com/v1/search';

interface GeocodingResponse {
  results?: Array<{
    name: string;
    latitude: number;
    longitude: number;
    country: string;
  }>;
}

/**
 * Resolves a free-text city name to geographic coordinates via the
 * Open-Meteo Geocoding API.
 *
 * Throws a descriptive error if the city cannot be found.
 */
export async function geocodeCity(city: string): Promise<GeoResult> {
  const { data } = await axios.get<GeocodingResponse>(GEOCODING_URL, {
    params: { name: city, count: 1, language: 'en', format: 'json' },
  });

  if (!data.results?.length) {
    throw new Error(`City not found: "${city}". Please try a different spelling.`);
  }

  const { name, latitude, longitude, country } = data.results[0];
  return { name, latitude, longitude, country };
}
