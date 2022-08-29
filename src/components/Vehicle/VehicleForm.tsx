import { Button, Label, Select, TextInput, Tooltip } from 'flowbite-react';
import React, { useState, useEffect, useCallback } from 'react';
import SelectSearch from 'react-select-search';
import { fuzzySearch } from 'react-select-search';
import { trpc } from '../../utils/trpc';
import 'react-select-search/style.css';
import {
  DistanceUnit,
  UnregisteredVehicleRequest,
  VehicleMakeSearch,
  VehicleModel,
  VehicleModelSearch,
} from '../../schema/vehicle.schema';

interface VehicleFormProps {
  handleSubmit: (vehicleData: UnregisteredVehicleRequest) => void;
}

const VehicleForm = ({ handleSubmit }: VehicleFormProps) => {
  const [selectedVehicleMake, setSelectedVehicleMake] = useState('');
  const [selectedVehicleModel, setSelectedVehicleModel] = useState('');
  const [distance, setDistance] = useState(0);
  const [distanceUnit, setDistanceUnit] = useState<DistanceUnit>('mi');
  const [vehicleModels, setVehicleModels] = useState<VehicleModelSearch[]>([]);
  // Memoize API call for vehicle makes
  const getVehicleMakes = useCallback(() => mutate(), []);
  // const getVehicleModels = useCallback(() => {
  //   if (selected) {
  //     vehicleModelMutation.mutate(selected);
  //     console.log(vehicleModelMutation.isLoading);
  //     console.log(vehicleModelMutation.data);
  //   }
  // }, [selected]);
  const { mutate, data } = trpc.useMutation(['vehicle.request-vehicle-make']);
  const vehicleModelMutation = trpc.useMutation([
    'vehicle.request-vehicle-model',
  ]);

  useEffect(() => {
    getVehicleMakes();
    console.log('API called!');
  }, [getVehicleMakes, selectedVehicleMake]);

  let vehicleMakes: VehicleMakeSearch[] = [];
  if (data) {
    vehicleMakes = data;
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add handleSubmit function
  };

  // let vehicleModels: VehicleModelSearch[] = [];
  const handleVehicleMakeChange = (value) => {
    setSelectedVehicleMake(value);
    console.log('selected vehicle make', selectedVehicleMake);
    // if (selectedVehicleMake) {
    //   vehicleModelMutation.mutate(selectedVehicleMake);
    //   console.log('vehicles', vehicleModelMutation?.data);
    //   // if (vehicleModelMutation.data) {
    //   //   setVehicleModels(vehicleModelMutation.data);
    //   //   console.log('vehicleModels', vehicleModels);
    //   // }
    // }
  };


  const resetForm = () => {
    setSelectedVehicleMake('');
    setVehicleModels([]);
  };

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
        <div>
          <Label
            htmlFor="vehicleMake"
            value="Please enter your vehicle make"
            id="vehicleMakeLabel"
          />
          <SelectSearch
            options={vehicleMakes}
            search
            value={selectedVehicleMake}
            onChange={handleVehicleMakeChange}
            filterOptions={fuzzySearch}
            emptyMessage={'No Makes found that match'}
            placeholder="Vehicle Make"
          />
        </div>
        <div>
          <Label
            htmlFor="vehicleModel"
            value="Please enter your vehicle model"
            id="vehicleModelLabel"
          />
          <SelectSearch
            options={vehicleModels}
            search
            value={selectedVehicleModel}
            // onChange={handleChange}
            filterOptions={fuzzySearch}
            emptyMessage={'No Models found that match'}
            placeholder="Vehicle Model"
          />
        </div>
        <div className="grid grid-cols-6 items-end">
          <div className="col-span-4 mr-3">
            <Label
              htmlFor="distance"
              value="What was the average distance traveled for your trip?"
              id="distanceLabel"
            />
            <TextInput
              id="distance"
              type="number"
              value={distance}
              onChange={(e) => setDistance(parseInt(e.target.value))}
              color="gray-600"
            />
          </div>
          <div className="col-span-2 md:col-span-1">
            <Select
              id="distanceUnit"
              onChange={(e) => setDistanceUnit(e.target.value as DistanceUnit)}
              value={distanceUnit}
              color="dark"
            >
              <option value="mi">miles</option>
              <option value="km">kilometers</option>
            </Select>
          </div>
        </div>
        <div className="flex flex-row justify-end gap-3 mt-3">
          <Button onClick={resetForm} size="md" color="info">
            Reset
          </Button>
          <Button type="submit" color="success">
            Go
          </Button>
        </div>
      </form>
    </div>
  );
};

export default VehicleForm;
