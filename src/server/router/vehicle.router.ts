import { createRouter } from './context';
import z from 'zod';
import { unregisteredVehicleRequestSchema, VehicleMakeDataResponse, VehicleMakeSearch, VehicleModelDataResponse, VehicleModelSearch } from '../../schema/vehicle.schema';
import { carbonEstimateRequest, carbonVehicleMakeRequest, carbonVehicleModelsRequest } from '../../utils/apiHelpers';


export const vehicleRouter = createRouter().mutation(
  'unregistered-request-vehicle',
  {
    input: unregisteredVehicleRequestSchema,
    async resolve({ input }) {
      const response = await fetch(
        carbonEstimateRequest(JSON.stringify({ type: 'vehicle', ...input }))
      );

      return response.json().then((data) => {
        return data.data.attributes;
      });
    },
  }
)
.mutation(
  'request-vehicle-make',
  {
    async resolve() {
      const response = await fetch(
        carbonVehicleMakeRequest()
      );
      let vehicleOptions: VehicleMakeSearch[] = []

      return response.json().then((data) => {
        const vehicles = data as VehicleMakeDataResponse[];
        vehicleOptions = vehicles.map((vehicle: VehicleMakeDataResponse) => {
          return {name: vehicle.data.attributes.name, value: vehicle.data.id}
        })
        return vehicleOptions;
      }
      )
    }
  }
)
.mutation(
  'request-vehicle-model',
  {
    input: z.string(),
    async resolve({input}) {
      const response = await fetch(
        carbonVehicleModelsRequest(input)
      );
      let vehicleOptions: VehicleModelSearch[] = []

      return response.json().then((data) => {
        const vehicles = data as VehicleModelDataResponse[];
        vehicleOptions = vehicles.map((vehicle: VehicleModelDataResponse) => {
          return {name: vehicle.data.attributes.name, value: vehicle.data.id}
        })
        return vehicleOptions;
      }
      )
    }
  }
)
