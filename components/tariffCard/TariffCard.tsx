'use client';

import { useEffect, useState } from 'react';
import { TariffCardProps } from './TariffCard.interface';

export default function TariffCard({
  tariff,
  isSelected,
  onSelect,
  checkboxError,
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
      relative bg-white rounded-xl shadow-lg border-2 p-6 transition-all duration-300 h-full flex flex-col
      ${isSelected ? 'border-blue-500 transform scale-105 shadow-xl' : 'border-gray-200 hover:shadow-xl'}
      ${tariff.is_best ? 'lg:scale-110 lg:-translate-y-2 ring-2 ring-yellow-400' : ''}
    `}
    >
      {/* Best badge */}
      {tariff.is_best && (
        <div className='absolute -top-3 left-1/2 transform -translate-x-1/2 z-10'>
          <span className='bg-yellow-400 text-yellow-900 px-4 py-1 rounded-full text-sm font-bold whitespace-nowrap'>
            Самый популярный
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
        <h3 className='text-2xl font-bold text-gray-900 mb-2'>{tariff.period}</h3>
        <p className='text-gray-600 text-sm min-h-[40px]'>{tariff.text}</p>
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
              <div className='text-4xl font-bold text-gray-900'>{tariff.price} ₽</div>
              <div className='text-lg text-gray-500 line-through'>{tariff.full_price} ₽</div>
            </div>
          ) : (
            <div className='text-4xl font-bold text-gray-900 animate-fade-in'>{tariff.full_price} ₽</div>
          )}
        </div>
      </div>

      {/* Checkbox */}
      <div className='mb-4 flex-grow-0'>
        <label className='flex items-center justify-center cursor-pointer'>
          <input type='checkbox' checked={isSelected} onChange={onSelect} className='hidden' />
          <div
            className={`
            w-6 h-6 border-2 rounded flex items-center justify-center mr-3 transition-all
            ${
              isSelected
                ? 'bg-blue-500 border-blue-500'
                : checkboxError
                ? 'bg-red-100 border-red-500 animate-shake'
                : 'bg-white border-gray-300'
            }
          `}
          >
            {isSelected && (
              <svg className='w-4 h-4 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='3' d='M5 13l4 4L19 7' />
              </svg>
            )}
          </div>
          <span
            className={`
            font-medium
            ${checkboxError && !isSelected ? 'text-red-500' : 'text-gray-700'}
          `}
          >
            Выбрать тариф
          </span>
        </label>
        {checkboxError && !isSelected && (
          <div className='text-red-500 text-sm text-center mt-2 animate-shake'>Пожалуйста, выберите тариф</div>
        )}
      </div>
    </div>
  );
}
