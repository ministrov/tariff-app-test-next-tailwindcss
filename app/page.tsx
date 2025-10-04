'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Tariff } from '@/interfaces/tariff.interface';
import { fetchTariffs } from '@/utils/api';
import Header from '@/components/header/Header';

export default function Home() {
  const [tariffs, setTariffs] = useState<Tariff[] | undefined>([]);
  const [timeLeft] = useState(120);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>();
  const fixedData = tariffs?.map((item, index) => ({
    ...item,
    id: item.id + '_' + index,
  }));

  console.log(fixedData);

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
    <div className='min-h-screen bg-(--foreground)'>
      <Header timeLeft={timeLeft} />

      <main className='container mx-auto px-4 py-8 pt-24'>
        <h1 className='text-4xl font-bold text-white mb-[110px] mt-8'>
          Выбери подходящий для себя <span className='text-(--color-orange-200)'>тариф</span>
        </h1>

        <div className='flex gap-[87px] mb-[66px]'>
          <div>
            <Image src={'/tariff-img.png'} width={380} height={767} alt={''} />
          </div>
          <div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto'>
              {fixedData?.map((tarif) => (
                <li key={tarif.id}>{tarif.text}</li>
              ))}
            </div>

            <button
              // onClick={handleBuyClick}
              className='bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-12 rounded-lg text-lg animate-pulse-custom transition-all duration-300 transform hover:scale-105'
            >
              Купить сейчас
            </button>
          </div>
        </div>

        <div>
          <span>гарантия возврата 30 дней</span>
          <p>
            Мы уверены, что наш план сработает для тебя и ты увидишь видимые результаты уже через 4 недели! Мы даже
            готовы полностью вернуть твои деньги в течение 30 дней с момента покупки, если ты не получишь видимых
            результатов.
          </p>
        </div>
      </main>
    </div>
  );
}
