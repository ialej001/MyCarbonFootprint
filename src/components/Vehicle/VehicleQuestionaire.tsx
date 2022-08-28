import React from 'react';
import VehicleForm from './VehicleForm';
import { UnregisteredVehicleRequest } from '../../schema/vehicle.schema';
import { trpc } from '../../utils/trpc';
import { Spinner } from 'flowbite-react';

const VehicleQuestionaire = () => {
  const { mutate, data, isLoading } = trpc.useMutation([
    'vehicle.unregistered-request-vehicle',
  ]);

  const handleSubmit = (vehicleData: UnregisteredVehicleRequest) => {
    mutate({ ...vehicleData });
  };

  if (isLoading) return <Spinner aria-label="Flight response loading" />;

  return (
    <div className="w-[600px] mx-[5px]">
      {!data && !isLoading && <VehicleForm handleSubmit={handleSubmit} />}

      {/* {data && !isLoading && <FlightResponse data={data} />} */}
    </div>
  );
};

export default VehicleQuestionaire;