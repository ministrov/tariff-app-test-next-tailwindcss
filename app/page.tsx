'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Tariff } from '@/interfaces/tariff.interface';
import { fetchTariffs } from '@/utils/api';
import Header from '@/components/header/Header';
import TariffCard from '@/components/tariffCard/TariffCard';

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

      <main className='max-w-[1216px] mx-auto pt-24'>
        <h1 className='text-4xl font-bold text-white mb-[110px] mt-8'>
          Выбери подходящий для себя <span className='text-(--color-orange-200)'>тариф</span>
        </h1>

        <div className='flex gap-[87px] mb-[66px]'>
          <div>
            <Image src={'/tariff-img.png'} width={380} height={767} alt={''} />
          </div>
          <div>
            <div className='flex flex-wrap gap-[14px] mb-[20px]'>
              {fixedData?.map((tariff) => (
                <TariffCard
                  key={tariff.id}
                  tariff={tariff}
                  isSelected={false}
                  // isSelected={selectedTariff === tariff.id}
                  onSelect={() => {
                    // setSelectedTariff(tariff.id);
                    // setCheckboxError(false);
                  }}
                  checkboxError={false}
                  timerExpired={true}
                  discount={1000}
                />
              ))}
            </div>

            <div className='flex gap-4 bg-[#484D4E] rounded-[20px] p-5 mb-[30px] max-w-[499px]'>
              <Image src={'/exclamation-mark.svg'} width={24} height={24} alt={''} />
              <p className='text-white text-[16px] leading-6'>
                Следуя плану на 3 месяца и более, люди получают в 2 раза лучший результат, чем за 1 месяц
              </p>
            </div>

            <div className='mb-4'>
              <label className='flex gap-4 text-[16px] leading-6 text-[#CDCDCD]' htmlFor='copyright'>
                <input type='checkbox' id='copyright' />Я согласен с офертой рекуррентных платежей и Политикой
                конфиденциальности
              </label>
            </div>

            <button
              // onClick={handleBuyClick}
              className='flex justify-center w-[352px] bg-[#FDB056] hover:bg-amber-200 text-black font-bold text-[20px] py-[20px] mb-[14px] rounded-[20px] text-lg animate-pulse-custom transition-all duration-300 transform hover:scale-105'
            >
              Купить
            </button>
            <p className='text-[#9B9B9B] text-[14px] leading-[20px]'>
              Нажимая кнопку «Купить», Пользователь соглашается на разовое списание денежных средств для получения
              пожизненного доступа к приложению. Пользователь соглашается, что данные кредитной/дебетовой карты будут
              сохранены для осуществления покупок дополнительных услуг сервиса в случае желания пользователя.
            </p>
          </div>
        </div>

        <div className='flex flex-col gap-[30px] border-2 border-(--color-stroke) rounded-4xl p-5'>
          <p className='text-2xl text-[#81FE95] border-2 border-[#81FE95] rounded-4xl pl-8 pr-8 pt-4 pb-4 max-w-fit'>
            гарантия возврата 30 дней
          </p>
          <p className='text-2xl text-[#DCDCDC]'>
            Мы уверены, что наш план сработает для тебя и ты увидишь видимые результаты уже через 4 недели! Мы даже
            готовы полностью вернуть твои деньги в течение 30 дней с момента покупки, если ты не получишь видимых
            результатов.
          </p>
        </div>
      </main>
    </div>
  );
}
