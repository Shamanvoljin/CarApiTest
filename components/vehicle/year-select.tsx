"use client";

import { YEAR_RANGE } from "@/lib/constants";
import { generateYearRange } from "@/lib/utils/date";

interface YearSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export function YearSelect({ value, onChange }: YearSelectProps) {
  const years = generateYearRange(YEAR_RANGE.START, YEAR_RANGE.END);

  return (
    <div className="space-y-2">
      <label htmlFor="year-select" className="block text-lg font-medium">
        Select Model Year
      </label>
      <select
        id="year-select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2 border rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Choose a year</option>
        {years.map((year) => (
          <option key={year} value={year.toString()}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
}