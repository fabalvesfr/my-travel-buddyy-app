import { useMemo } from 'react';

interface CalendarHeaderProps {
  selectedDay: number;   // 0–6
  onSelectDay: (day: number) => void;
}

const DAY_LETTERS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'] as const;
const FULL_DAYS = [
  'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday',
] as const;
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
] as const;

interface CalDay {
  letter: string;
  date: number;
  fullDate: Date;
}

function buildWeek(start: Date): CalDay[] {
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start);
    d.setDate(d.getDate() + i);
    return { letter: DAY_LETTERS[d.getDay()], date: d.getDate(), fullDate: d };
  });
}

/** Horizontal 7-day strip with the selected day highlighted and full date label below. */
export default function CalendarHeader({ selectedDay, onSelectDay }: CalendarHeaderProps) {
  const days = useMemo(() => buildWeek(new Date()), []);
  const selected = days[selectedDay];

  const fullDateLabel = `${FULL_DAYS[selected.fullDate.getDay()]}, ${
    MONTHS[selected.fullDate.getMonth()]
  } ${selected.date}, ${selected.fullDate.getFullYear()}`;

  return (
    <div className="mt-8 flex flex-col items-center gap-3">
      {/* Day columns */}
      <div className="flex gap-4">
        {days.map((day, i) => {
          const isSelected = selectedDay === i;
          const isToday = i === 0;

          return (
            <button
              key={i}
              onClick={() => onSelectDay(i)}
              className="flex flex-col items-center gap-1 group cursor-pointer"
              aria-label={`${day.fullDate.toDateString()}${isToday ? ' (today)' : ''}`}
              aria-pressed={isSelected}
            >
              <span className="text-xs font-medium text-gray-400 uppercase">
                {day.letter}
              </span>
              <span
                className={[
                  'w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium transition-colors',
                  isSelected
                    ? 'bg-brand-accent text-white'
                    : isToday
                    ? 'border border-brand-dark text-brand-dark'
                    : 'text-gray-600 group-hover:bg-gray-100',
                ].join(' ')}
              >
                {day.date}
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected date label */}
      <p className="text-sm text-gray-500">{fullDateLabel}</p>
    </div>
  );
}
