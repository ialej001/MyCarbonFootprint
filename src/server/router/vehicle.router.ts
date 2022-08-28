import { createRouter } from './context';
import z from 'zod';
import { unregisteredVehicleRequestSchema, VehicleMakeResponse } from '../../schema/vehicle.schema';
import { carbonEstimateRequest, carbonVehicleMakeRequest } from '../../utils/apiHelpers';

interface vehicleMakeOptionsProps {
  name: string,
  value: string
}

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
      let vehicleOptions: vehicleMakeOptionsProps[] = []

      return response.json().then((data) => {
        console.log("router data", data);
        const vehicles = data as VehicleMakeResponse[];
        vehicleOptions = vehicles.map((vehicle: VehicleMakeResponse) => {
          console.log('vehicle', vehicle.data);
          return {name: vehicle.attributes.name, value: vehicle.id}
          // vehicleOptions.push(newVehicle);
        })
      
        return vehicleOptions;
      }
      )
    }
  }
)
