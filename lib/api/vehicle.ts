import { NHTSA_API_BASE_URL } from "../constants";
import type { ApiResponse, VehicleMake, VehicleModel } from "../types";

export async function fetchVehicleMakes() {
  const response = await fetch(
    `${NHTSA_API_BASE_URL}/vehicles/GetMakesForVehicleType/car?format=json`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch vehicle makes");
  }

  const data: ApiResponse<VehicleMake> = await response.json();
  return data.Results;
}

export async function fetchVehicleModels(makeId: string, year: string) {
  try {
    const response = await fetch(
      `${NHTSA_API_BASE_URL}/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch vehicle models");
    }

    const data: ApiResponse<VehicleModel> = await response.json();
    return data.Results;
  } catch (error) {
    console.error("Error", error);
  }
}

export async function fetchMakeName(makeId: string) {
  try {
    const makes = await fetchVehicleMakes();
    const make = makes?.find((m) => m.MakeId.toString() === makeId);
    return make?.MakeName || "Unknown Make";
  } catch (error) {
    console.error("Error", error);
  }
}
