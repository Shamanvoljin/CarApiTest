"use client";

import { useEffect, useState } from "react";
import { fetchVehicleMakes } from "@/lib/api/vehicle";
import type { VehicleMake } from "@/lib/types";

interface MakeSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export function MakeSelect({ value, onChange }: MakeSelectProps) {
  const [makes, setMakes] = useState<VehicleMake[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMakes = async () => {
      try {
        const data = await fetchVehicleMakes();
        setMakes(data);
      } catch (error) {
        console.error("Error loading makes:", error);
      } finally {
        setLoading(false);
      }
    };

    loadMakes();
  }, []);

  return (
    <div className="space-y-2">
      <label htmlFor="make-select" className="block text-lg font-medium">
        Select Vehicle Make
      </label>
      <select
        id="make-select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={loading}
        className="w-full p-2 border rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Choose a make</option>
        {makes.map((make) => (
          <option key={make.MakeId} value={make.MakeId.toString()}>
            {make.MakeName}
          </option>
        ))}
      </select>
    </div>
  );
}
