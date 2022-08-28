import z from 'zod';

const distanceUnitSchema = z.enum(['mi', 'km']);

export const unregisteredVehicleRequestSchema = z.object({
  distance_unit: distanceUnitSchema,
  distance_value: z.number(),
  vehicle_model_id: z.string(),
});

const vehicleMakeSchema = z.object({
  name: z.string(),
  number_of_models: z.number()
})


const vehicleModelSchema = z.object({
  name: z.string(),
  year: z.number(),
  vehicle_make: z.string()
})

export type DistanceUnit = z.TypeOf<typeof distanceUnitSchema>;
export type VehicleModel = z.TypeOf<typeof vehicleModelSchema>;
export type VehicleMake = z.TypeOf<typeof vehicleMakeSchema>;

export type UnregisteredVehicleRequest = z.TypeOf<
typeof unregisteredVehicleRequestSchema
>;

const vehicleResponseUnique = z.object({
  vehicle_make: z.string(),
  vehicle_model: z.string(),
  vehicle_year: z.number(),
  carbon_g: z.number(),
  carbon_kg: z.number(),
  carbon_lb: z.number(),
  carbon_mt: z.number(),
  estimated_at: z.string(),
});

const vehicleResponseSchema = unregisteredVehicleRequestSchema.merge(
  vehicleResponseUnique
  );
  
const vehicleMakeResponseSchema = z.object({
    id: z.string(),
    type: z.string(),
    attributes: vehicleMakeSchema
  })
  
const vehicleModelResponseSchema = z.object({
    id: z.string(),
    type: z.string(),
    attributes: vehicleModelSchema
  })

export type VehicleResponse = z.TypeOf<typeof vehicleResponseSchema>;
export type VehicleMakeResponse = z.TypeOf<typeof vehicleMakeResponseSchema>;
export type VehicleModelResponse = z.TypeOf<typeof vehicleModelResponseSchema>;
