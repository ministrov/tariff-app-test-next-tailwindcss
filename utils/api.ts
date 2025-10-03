import { Tariff } from '@/interfaces/tariff.interface';

export const fetchTariffs = async (): Promise<Tariff[] | undefined> => {
  try {
    const response = await fetch('https://t-core.fit-hub.pro/Test/GetTariffs', {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
