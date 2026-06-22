import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { ForecastPoint } from "../types";

interface WeatherChartProps {
  forecast: ForecastPoint[];
}

interface SeriesConfig {
  dataKey: keyof Omit<ForecastPoint, "time">;
  name: string;
  color: string;
}

type SeriesKey = SeriesConfig["dataKey"];

const SERIES: SeriesConfig[] = [
  { dataKey: "temperature", name: "Temperature (C)", color: "#EF4444" },
  { dataKey: "precipitation", name: "Precipitation (mm)", color: "#3B82F6" },
  { dataKey: "wind", name: "Wind (km/h)", color: "#10B981" },
  { dataKey: "snowfall", name: "Snowfall (cm)", color: "#8B5CF6" },
];

const INITIAL_HIDDEN_SERIES: Record<SeriesKey, boolean> = {
  temperature: false,
  precipitation: false,
  wind: false,
  snowfall: false,
};

function formatTime(iso: unknown): string {
  if (typeof iso !== "string") return "";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso.slice(5, 13);
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const hh = String(d.getHours()).padStart(2, "0");
  return mm + "/" + dd + " " + hh + "h";
}

export default function WeatherChart({ forecast }: WeatherChartProps) {
  const [hiddenSeries, setHiddenSeries] = useState(INITIAL_HIDDEN_SERIES);

  function handleLegendClick(entry: { dataKey?: unknown }) {
    if (typeof entry.dataKey !== "string") return;
    if (!Object.prototype.hasOwnProperty.call(hiddenSeries, entry.dataKey))
      return;

    const key = entry.dataKey as SeriesKey;
    setHiddenSeries((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  }

  return (
    <div className="mt-4 border border-gray-200 bg-white rounded-md">
      <div className="px-4 py-2 bg-slate-100 mb-4 rounded-md">
        <h3 className="text-sm font-medium text-gray-700 text-center">
          Weather Forecast
        </h3>
      </div>
      <ResponsiveContainer width="100%" height={260}>
        <LineChart
          data={forecast}
          margin={{ top: 4, right: 16, left: -16, bottom: 4 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis
            dataKey="time"
            tick={{ fontSize: 10, fill: "#6B7280" }}
            tickFormatter={formatTime}
            interval="preserveStartEnd"
          />
          <YAxis tick={{ fontSize: 10, fill: "#6B7280" }} />
          <Tooltip
            contentStyle={{ fontSize: "12px", borderRadius: "4px" }}
            labelFormatter={formatTime}
          />
          <Legend
            wrapperStyle={{
              fontSize: "11px",
              paddingTop: "8px",
              cursor: "pointer",
            }}
            onClick={handleLegendClick}
            formatter={(value, entry) => {
              const key = entry.dataKey as SeriesKey;
              return (
                <span style={{ opacity: hiddenSeries[key] ? 0.45 : 1 }}>
                  {value}
                </span>
              );
            }}
          />
          {SERIES.map(({ dataKey, name, color }) => (
            <Line
              key={dataKey}
              type="monotone"
              dataKey={dataKey}
              name={name}
              stroke={color}
              hide={hiddenSeries[dataKey]}
              strokeWidth={1.5}
              dot={false}
              activeDot={{ r: 3 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
