'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { TimerProps } from './Timer.interface';

const Timer = ({ timeLeft }: TimerProps) => {
  const [isDanger, setIsDanger] = useState<boolean>(false);

  useEffect(() => {
    setIsDanger(timeLeft <= 30);
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className='flex items-center gap-2'>
      <span>
        <Image src={'/star.svg'} width={14} height={14} alt={''} />
      </span>
      <span
        className={`font-(family-name:--font-raleway) text-3xl text-(--color-orange) ${
          isDanger ? 'bg-red-500 text-white border-red-600 animate-pulse' : ''
        }`}
      >
        {minutes.toString().padStart(2, '0')} : {seconds.toString().padStart(2, '0')}
      </span>
      <span>
        <Image src={'/star.svg'} width={14} height={14} alt={''} />
      </span>
    </div>
  );
};

export default Timer;
