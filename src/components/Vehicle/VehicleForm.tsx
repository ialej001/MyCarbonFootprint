import { Button, Label, Select, Tooltip } from 'flowbite-react';
import React, { useState, useEffect, useMemo } from 'react';
import SelectSearch from 'react-select-search';
import { trpc } from '../../utils/trpc';
import 'react-select-search/style.css';
import {
  UnregisteredVehicleRequest,
  VehicleMake,
  VehicleModel,
} from '../../schema/vehicle.schema';

interface VehicleFormProps {
  handleSubmit: (vehicleData: UnregisteredVehicleRequest) => void;
}

const VehicleForm = ({ handleSubmit }: VehicleFormProps) => {
  const [vehicleMakes, setVehicleMakes] = useState<VehicleMake[]>();
  const [vehicleModels, setVehicleModels] = useState<VehicleModel[]>();
  //   const getVehicleMakes = useMemo(() => mutate(), [vehicleMakes]);

  const { mutate, data, isLoading } = trpc.useMutation([
    'vehicle.request-vehicle-make',
  ]);

  useEffect(() => {
    mutate();
    // setVehicleMakes(data);
  }, []);

  //   console.log(data);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // handleSubmit({ passengers, distance_unit: distanceUnit, legs });
  };

  const vehicleMakeOptions = [
    { name: 'chevy', value: 1 },
    { name: 'Ford', value: 2 },
  ];

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <p>Ever wanted to know how much carbon your road trips emit?</p>

      <div className="flex justify-center items-center">
        <div className="text-center">
          <p className="mb-4">This calculator will do just that!</p>
          <p>
            Simply enter the make and model of the car you used for your trip as
            well as an estimate of the distance you traveled your trip.
          </p>
        </div>
      </div>
      <form
        className="flex flex-col gap-4"
        onSubmit={(e) => handleFormSubmit(e)}
      >
        <p className="mt-4 mb-1">Enter the legs of this trip:</p>
        <div>
          <Label
            htmlFor="vehicleMake"
            value="Please enter your vehicle make"
            id="vehicleMakeLabel"
          />
          <SelectSearch
            options={vehicleMakeOptions}
            search={true}
            emptyMessage={'No Makes found that match'}
            placeholder="Vehicle Make"
          />
        </div>
      </form>
    </div>
  );
};

export default VehicleForm;
