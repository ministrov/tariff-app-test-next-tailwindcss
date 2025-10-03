'use client';

import { useState, useEffect } from 'react';
import { Tariff } from '@/interfaces/tariff.interface';
import { fetchTariffs } from '@/utils/api';
import Header from '@/components/header/Header';

export default function Home() {
  const [tariffs, setTariffs] = useState<Tariff[] | undefined>([]);
  const [timeLeft] = useState(120);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>();
  const mappedTarrifs = tariffs?.map((item) => item.id.includes('2'));

  console.log(mappedTarrifs);

  useEffect(() => {
    const loadTariffs = async () => {
      try {
        setIsLoading(true);
        const data = await fetchTariffs();

        setTariffs(data);
      } catch (err) {
        setError('Не удалось загрузить тарифы. Пожалуйста, попробуйте позже.');
        console.error('Error loading tariffs:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadTariffs();
  }, []);

  if (error) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='text-center'>
          <div className='text-red-500 text-xl mb-4'>{error}</div>
          <button
            onClick={() => window.location.reload()}
            className='bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg'
          >
            Попробовать снова
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='text-xl text-gray-600'>Загрузка тарифов...</div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      <Header timeLeft={timeLeft} />

      <main className='container mx-auto px-4 py-8 pt-20'>
        <div className='text-center mb-12'>
          <h1 className='text-4xl font-bold text-gray-900 mb-4'>Выберите подходящий тариф</h1>
          <p className='text-xl text-gray-600'>Специальное предложение действует ограниченное время</p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto'>
          {tariffs?.map((tarif) => (
            <li key={tarif.id}>{tarif.text}</li>
          ))}
        </div>

        <div className='text-center mt-12'>
          <button
            // onClick={handleBuyClick}
            className='bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-12 rounded-lg text-lg animate-pulse-custom transition-all duration-300 transform hover:scale-105'
          >
            Купить сейчас
          </button>
        </div>
      </main>
    </div>
  );
}
