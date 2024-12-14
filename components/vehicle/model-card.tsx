import type { VehicleModel } from "@/lib/types";

interface ModelCardProps {
  model: VehicleModel;
}

export function ModelCard({ model }: ModelCardProps) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-semibold mb-2 text-gray-900">
        {model.Model_Name}
      </h3>
      <p className="text-gray-500 text-sm">Model ID: {model.Model_ID}</p>
    </div>
  );
}