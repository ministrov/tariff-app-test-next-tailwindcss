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
      onClick={onSelect}
      className={`
      relative bg-[#313637] border-2 border-[#484D4E] rounded-4xl p-5 transition-all duration-300 w-[240px] max-[768px]:w-full flex flex-col max-[768px]:flex-row max-[768px]:justify-center max-[768px]:gap-[40px] items-center
      ${isSelected ? 'border-blue-500 transform scale-105 shadow-xl' : ''}
      ${checkboxError && !isSelected ? 'border-red-500 animate-shake' : ''}
      ${tariff.is_best ? 'flex-row justify-center gap-[40px] w-full ring-2 ring-[#FDB056] p-6' : ''}
    `}
    >
      {/* Best badge */}
      {tariff.is_best && (
        <div className='absolute -top-[0px] right-0 transform -translate-x-1/2 z-10 flex items-center'>
          <span className=' text-[#FDB056] text-[22px] font-medium whitespace-nowrap'>хит!</span>
        </div>
      )}

      {/* Discount badge */}
      {!timerExpired && discount > 0 && (
        <div className='absolute -top-[1px] -left-[-30px] max-[375px]:-right-[30px] w-[66px] h-[39px] max-[375px]:w-[48px] max-[375px]:h-[27px] max-[320px]:w-[42px] max-[320px]:h-[23px] bg-[#FD5656] text-[22px] font-medium leading-[28px] max-[375px]:text-[16px] max-[375px]:leading-[22px] text-white px-2 py-1 rounded text-sm z-10'>
          -{discount}%
        </div>
      )}

      {/* Price section with animation */}
      <div className={`text-center ${tariff.is_best ? 'mb-[0px]' : 'mb-6 max-[375px]:mb-[0px]'}`}>
        <div
          className={`
          transition-all duration-500
          ${priceAnimation ? 'animate-price-change' : ''}
        `}
        >
          {!timerExpired ? (
            <div className={`${tariff.is_best ? 'p-0' : 'p-[18px] max-[375px]:p-[0px]'} max-[375px]:min-w-[121px]`}>
              <div className={`text-center mt-4 mb-6 ${tariff.is_best ? 'mt-[0px] mb-[0px]' : ''}`}>
                <h3
                  className={`text-[26px] leading-[32px] font-medium max-[375px]:text-[16px] max-[375px]:leading-[22px] text-white ${
                    tariff.is_best ? 'mb-[16px]' : 'mb-2'
                  }`}
                >
                  {tariff.period}
                </h3>
              </div>
              <div
                className={`text-[50px] font-semibold max-[375px]:text-[34px] max-[320px]:text-[30px] ${
                  tariff.is_best
                    ? 'text-[#FDB056] leading-[48px] max-[375px]:leading-[38px] max-[320px]:leading-[28px]'
                    : 'text-white'
                }`}
              >
                {tariff.price} ₽
              </div>
              <div className='text-[24px] max-[375px]:text-[16px] max-[320px]:text-[14px] text-gray-500 text-end line-through'>
                {tariff.full_price} ₽
              </div>
            </div>
          ) : (
            <div className='text-[50px] font-semibold text-white animate-fade-in'>{tariff.full_price} ₽</div>
          )}
        </div>
      </div>

      <p className={`text-white text-[16px] max-[375px]:text-[12px] ${tariff.is_best ? 'max-w-[328px]' : ''}`}>
        {tariff.text}
      </p>
    </div>
  );
}
