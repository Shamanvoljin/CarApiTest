export interface VehicleMake {
  MakeId: number;
  MakeName: string;
}

export interface VehicleModel {
  Model_ID: number;
  Model_Name: string;
}

export interface ApiResponse<T> {
  Count: number;
  Message: string;
  Results: T[];
}