import { fetchVehicleModels, fetchMakeName } from "@/lib/api/vehicle";
import { ModelCard } from "@/components/vehicle/model-card";

export default async function VehicleResults({
  makeId,
  year,
}: {
  makeId: string;
  year: string;
}) {
  try {
    const [models, makeName] = await Promise.all([
      fetchVehicleModels(makeId, year),
      fetchMakeName(makeId),
    ]);

    if (!models?.length) {
      return (
        <div className="text-center py-16">
          <h2 className="text-2xl font-semibold mb-4">No Models Found</h2>
          <p className="text-muted-foreground">
            No vehicle models were found for {makeName} in {year}
          </p>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">
            {makeName} Models ({year})
          </h1>
          <p className="text-muted-foreground mt-2">
            Found {models?.length} models for your selection
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {models?.map((model) => (
            <ModelCard key={model.Model_ID} model={model} />
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error", error);
  }
}
