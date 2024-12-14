import { Suspense } from "react";
import Link from "next/link";
import { YEAR_RANGE, STATIC_PARAMS_CONFIG } from "@/lib/constants";
import { generateYearRange } from "@/lib/utils/date";
import { fetchVehicleMakes } from "@/lib/api/vehicle";
import VehicleResults from "./vehicle-results";

interface Props {
  params: {
    makeId: string;
    year: string;
  };
}

export default function ResultPage({ params }: Props) {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              Back to Search
            </Link>
          </div>

          <Suspense
            fallback={
              <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-pulse space-y-4">
                  <div className="h-4 bg-gray-200 rounded w-48"></div>
                  <div className="h-10 bg-gray-200 rounded w-96"></div>
                </div>
              </div>
            }
          >
            <VehicleResults makeId={params.makeId} year={params.year} />
          </Suspense>
        </div>
      </div>
    </main>
  );
}

export async function generateStaticParams() {
  const years = generateYearRange(YEAR_RANGE.START, YEAR_RANGE.END);
  const makes = await fetchVehicleMakes();

  const params = [];
  if (makes) {
    for (const make of makes.slice(0, STATIC_PARAMS_CONFIG.MAX_MAKES)) {
      for (const year of years.slice(0, STATIC_PARAMS_CONFIG.MAX_YEARS)) {
        params.push({
          makeId: make.MakeId.toString(),
          year: year.toString(),
        });
      }
    }
  }

  return params;
}
