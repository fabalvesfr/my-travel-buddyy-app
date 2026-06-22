import { useState } from "react";
import SearchBar from "./components/SearchBar";
import CalendarHeader from "./components/CalendarHeader";
import ScoreTable from "./components/ScoreTable";
import WeatherChart from "./components/WeatherChart";
import SkeletonLoader from "./components/SkeletonLoader";
import { gql } from "@apollo/client";
import type { TypedDocumentNode } from "@apollo/client";
import { useLazyQuery } from "@apollo/client/react";
import { ImMobile } from "react-icons/im";
import { FiAlertCircle } from "react-icons/fi";
import { IoMdGlobe } from "react-icons/io";

type DayScore = {
  ski: number;
  surf: number;
  outdoor: number;
  indoor: number;
};

type ForecastPoint = {
  time: string;
  temperature: number;
  precipitation: number;
  wind: number;
  snowfall: number;
};

type TravelForecastQueryData = {
  travelForecast: {
    scores: DayScore[];
    forecast: ForecastPoint[];
  };
};

type TravelForecastQueryVariables = {
  city: string;
};

/** GraphQL query — fetches both scores and forecast in a single round-trip. */
const TRAVEL_FORECAST_QUERY: TypedDocumentNode<
  TravelForecastQueryData,
  TravelForecastQueryVariables
> = gql`
  query TravelForecast($city: String!) {
    travelForecast(city: $city) {
      scores {
        ski
        surf
        outdoor
        indoor
      }
      forecast {
        time
        temperature
        precipitation
        wind
        snowfall
      }
    }
  }
`;

const HOURS_PER_DAY = 24;
const FORECAST_DAYS = 7;

export default function App() {
  const [city, setCity] = useState("");
  const [selectedDay, setSelectedDay] = useState(0);

  const [runTravelForecastQuery, { data, loading, error }] = useLazyQuery(
    TRAVEL_FORECAST_QUERY,
  );

  const handleSearch = () => {
    const trimmedCity = city.trim();
    if (!trimmedCity) return;

    setSelectedDay(0); // reset to first day on each new search
    void runTravelForecastQuery({ variables: { city: trimmedCity } });
  };

  const safeSelectedDay = Math.min(Math.max(selectedDay, 0), FORECAST_DAYS - 1); // Avoids out-of-bounds array access
  const forecastStartIndex = safeSelectedDay * HOURS_PER_DAY;
  const forecastEndIndex = forecastStartIndex + HOURS_PER_DAY;

  return (
    <div className="min-h-screen bg-linear-to-b from-[color-mix(in_srgb,var(--color-brand)_38%,white)] to-[color-mix(in_srgb,var(--color-brand-light)_38%,white)] font-sans">
      <div className="max-w-2xl mx-auto px-6 py-10">
        {/* Page title */}
        <h1 className="text-2xl font-normal tracking-wide text-center text-gray-800 mb-10">
          <ImMobile className="inline-block mr-2" />
          My Travel Buddy
          <IoMdGlobe className="inline-block ml-2" />
        </h1>

        {/* Search */}
        <SearchBar city={city} onCityChange={setCity} onSearch={handleSearch} />

        {/* Loading state */}
        {loading && <SkeletonLoader />}

        {/* Error state */}
        {error && !loading && (
          <div
            className="mt-12 mx-auto rounded-md border border-red-200 bg-red-100 px-3 py-2 text-red-800 w-fit"
            role="alert"
            aria-live="assertive"
          >
            <div className="flex justify-start items-center gap-3">
              <FiAlertCircle className="mt-0.5 shrink-0 text-xl text-red-600" />
              <div>
                <p className="text-xs text-red-500">
                  {error.message ||
                    "Your form has some errors. Please fix them and try again."}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Loaded state */}
        {data && !loading && !error && (
          <section
            aria-label="Travel forecast"
            className="flex flex-col gap-6 mt-4"
          >
            <CalendarHeader
              selectedDay={selectedDay}
              onSelectDay={setSelectedDay}
            />
            <ScoreTable scores={data.travelForecast.scores[safeSelectedDay]} />
            <WeatherChart
              forecast={
                data?.travelForecast.forecast.slice(
                  forecastStartIndex,
                  forecastEndIndex,
                ) ?? []
              }
            />
          </section>
        )}
      </div>
    </div>
  );
}
