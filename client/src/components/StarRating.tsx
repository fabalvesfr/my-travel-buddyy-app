interface StarRatingProps {
  /** Score value, expected 1–5 */
  score: number;
  max?: number;
}

/** Renders filled (gold) and empty (light grey) star glyphs. */
export default function StarRating({ score, max = 5 }: StarRatingProps) {
  return (
    <div
      className="flex gap-0.5"
      role="img"
      aria-label={`${score} out of ${max} stars`}
    >
      {Array.from({ length: max }, (_, i) => (
        <span
          key={i}
          className={`text-xl leading-none ${i < score ? "text-amber-400" : "text-gray-200"}`}
        >
          ★
        </span>
      ))}
    </div>
  );
}
