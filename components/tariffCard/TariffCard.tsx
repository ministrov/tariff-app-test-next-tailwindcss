'use client';

import { useEffect, useState } from 'react';
import { TariffCardProps } from './TariffCard.interface';

export default function TariffCard({
  tariff,
  isSelected,
  // onSelect,
  // checkboxError,
  timerExpired,
  discount,
}: TariffCardProps) {
  const [priceAnimation, setPriceAnimation] = useState(false);

  useEffect(() => {
    if (timerExpired) {
      setPriceAnimation(true);
      const timer = setTimeout(() => setPriceAnimation(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [timerExpired]);

  return (
    <div
      className={`
      relative bg-[#313637] border-2 border-[#484D4E] rounded-4xl p-5 transition-all duration-300 w-[240px] h-[335px] flex flex-col
      ${isSelected ? 'border-blue-500 transform scale-105 shadow-xl' : ''}
      ${tariff.is_best ? 'w-full h-[190px] g:scale-110 lg:-translate-y-2 ring-2 ring-yellow-400' : ''}
    `}
    >
      {/* Best badge */}
      {tariff.is_best && (
        <div className='absolute -top-3 left-1/2 transform -translate-x-1/2 z-10'>
          <span className='bg-yellow-400 text-yellow-900 px-4 py-1 rounded-full text-sm font-bold whitespace-nowrap'>
            хит!
          </span>
        </div>
      )}

      {/* Discount badge */}
      {!timerExpired && discount > 0 && (
        <div className='absolute -top-2 -right-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold z-10'>
          -{discount}%
        </div>
      )}

      <div className='text-center mb-6 flex-grow-0'>
        <h3 className='text-[26px] leading-[32px] font-medium text-white mb-2'>{tariff.period}</h3>
      </div>

      {/* Price section with animation */}
      <div className='text-center mb-6 flex-grow-0'>
        <div
          className={`
          transition-all duration-500
          ${priceAnimation ? 'animate-price-change' : ''}
        `}
        >
          {!timerExpired ? (
            <div className='space-y-1'>
              <div className='text-[50px] font-semibold text-white'>{tariff.price} ₽</div>
              <div className='text-lg text-gray-500 line-through'>{tariff.full_price} ₽</div>
            </div>
          ) : (
            <div className='text-[50px] font-semibold text-white animate-fade-in'>{tariff.full_price} ₽</div>
          )}
        </div>
      </div>

      <p className='text-white text-[16px] min-h-[40px]'>{tariff.text}</p>
    </div>
  );
}
