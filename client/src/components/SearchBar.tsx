import type { KeyboardEvent } from "react";
import { FaPaperPlane } from "react-icons/fa6";

interface SearchBarProps {
  city: string;
  onCityChange: (value: string) => void;
  onSearch: () => void;
}

export default function SearchBar({
  city,
  onCityChange,
  onSearch,
}: SearchBarProps) {
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") onSearch();
  };

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Logo + label + input row */}
      <div className="flex items-center gap-4 w-full">
        <img
          src="/app-logo.png"
          alt="My Travel Buddy"
          className="w-22 h-22 rounded-full object-cover flex-shrink-0"
          onError={(e) => {
            // Fallback: show brand-coloured initials circle
            const t = e.currentTarget;
            t.style.display = "none";
            const next = t.nextElementSibling as HTMLElement | null;
            if (next) next.style.display = "flex";
          }}
        />
        {/* Fallback avatar shown only when image fails */}
        <div
          style={{ display: "none" }}
          className="w-22 h-22 rounded-full bg-brand flex items-center justify-center flex-shrink-0"
          aria-hidden="true"
        >
          <span className="text-white text-lg font-semibold">MTB</span>
        </div>

        <div className="flex items-baseline gap-2 flex-1 border-b border-gray-200 pb-1">
          <label
            htmlFor="city-input"
            className="text-gray-500 whitespace-nowrap text-sm"
          >
            Where are you heading to?
          </label>
          <input
            id="city-input"
            type="text"
            value={city}
            onChange={(e) => onCityChange(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 outline-none text-gray-800 font-normal bg-inherit"
            aria-label="City name"
          />
        </div>
      </div>

      {/* CTA button */}
      <button
        onClick={onSearch}
        disabled={!city.trim()}
        className="hover:bg-brand-accent bg-brand disabled:opacity-40 text-white px-6 py-2 text-sm font-medium transition-colors cursor-pointer rounded-full shadow-sm hover:shadow-md disabled:cursor-not-allowed"
      >
        Let's travel <FaPaperPlane className="inline-block ml-2" />
      </button>
    </div>
  );
}
