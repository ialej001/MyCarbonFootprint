import Link from 'next/link';
import Head from 'next/head';
import { trpc } from '../utils/trpc';
import ElectricityForm from '../components/Electricity/ElectricityForm';
import { UnregisteredElectricityRequest } from '../schema/electricity.schema';
import ElectricityResponse from '../components/Electricity/ElectricityResponse';
import { Spinner } from 'flowbite-react';

export default function ElectricityConsumption() {
  const { mutate, data, isLoading } = trpc.useMutation([
    'electricity.unregistered-request-electricity',
  ]);
  const handleSubmit = (electricityData: UnregisteredElectricityRequest) => {
    mutate({ ...electricityData });
  };

  if (isLoading) {
    return (
      <div className="mx-auto">
        <Spinner aria-label="Electricity response loading" />
      </div>
    );
  }

  return (
    <div>
      <Head>
        <title>Electricity Consumption</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <nav className="flex justify-center gap-4">
        <Link href="/">Home</Link>
      </nav>

      {!data && !isLoading && <ElectricityForm handleSubmit={handleSubmit} />}
      {data && !isLoading && <ElectricityResponse data={data} />}
    </div>
  );
}
