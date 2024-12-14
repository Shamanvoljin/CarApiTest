"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MakeSelect } from "@/components/vehicle/make-select";
import { YearSelect } from "@/components/vehicle/year-select";

export default function Home() {
  const router = useRouter();
  const [selectedMake, setSelectedMake] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("");

  const handleNext = () => {
    if (selectedMake && selectedYear) {
      router.push(`/result/${selectedMake}/${selectedYear}`);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
          <div className="flex items-center gap-3 mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Vehicle </h1>
          </div>

          <div className="space-y-8">
            <MakeSelect value={selectedMake} onChange={setSelectedMake} />
            <YearSelect value={selectedYear} onChange={setSelectedYear} />

            <button
              onClick={handleNext}
              disabled={!selectedMake || !selectedYear}
              className="w-full mt-8 px-4 py-3 bg-blue-600 text-white rounded-md font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
