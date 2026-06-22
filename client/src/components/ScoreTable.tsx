import StarRating from "./StarRating";
import type { DayScore } from "../types";

interface ScoreTableProps {
  scores: DayScore;
}

const ACTIVITIES: { key: keyof DayScore; label: string }[] = [
  { key: "ski", label: "Skiing" },
  { key: "surf", label: "Surfing" },
  { key: "outdoor", label: "Outdoor sightseeing" },
  { key: "indoor", label: "Indoor sightseeing" },
];

/** Table mapping each leisure activity to a star-based score for the selected day. */
export default function ScoreTable({ scores }: ScoreTableProps) {
  return (
    <div className="mt-4 border border-gray-200 overflow-hidden rounded-md">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200 bg-slate-100">
            <th className="text-left px-4 py-2 font-medium text-gray-700 w-1/2">
              Activity
            </th>
            <th className="text-left px-4 py-2 font-medium text-gray-700 w-1/2">
              Score
            </th>
          </tr>
        </thead>
        <tbody>
          {ACTIVITIES.map(({ key, label }) => (
            <tr
              key={key}
              className="border-b border-gray-100 bg-white last:border-0"
            >
              <td className="px-4 py-3 text-gray-700">{label}</td>
              <td className="px-4 py-3">
                <StarRating score={scores[key]} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
