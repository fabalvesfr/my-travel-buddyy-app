/** A single pulsing skeleton block. */
function SkeletonBlock({ className = '' }: { className?: string }) {
  return (
    <div
      className={`w-full rounded bg-gray-200 animate-pulse ${className}`}
      aria-hidden="true"
    />
  );
}

/**
 * Three skeleton blocks that mirror the final layout:
 * calendar strip → score table → weather chart.
 */
export default function SkeletonLoader() {
  return (
    <div className="mt-8 flex flex-col gap-4" role="status" aria-label="Loading travel data…">
      <SkeletonBlock className="h-12" />    {/* calendar header */}
      <SkeletonBlock className="h-44" />   {/* score table     */}
      <SkeletonBlock className="h-72" />   {/* weather chart   */}
    </div>
  );
}
