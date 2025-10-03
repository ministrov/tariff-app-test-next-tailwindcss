'use client';

import { useState, useEffect } from 'react';
import { TimerProps } from './Timer.interface';

const Timer = ({ timeLeft }: TimerProps) => {
  const [isDanger, setIsDanger] = useState<boolean>(false);

  useEffect(() => {
    setIsDanger(timeLeft <= 30);
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div
      className={`
      flex items-center space-x-2 px-4 py-2 rounded-lg border-2 font-mono font-bold text-lg
      transition-all duration-300
      ${isDanger ? 'bg-red-500 text-white border-red-600 animate-pulse' : 'bg-gray-100 text-gray-900 border-gray-300'}
    `}
    >
      <span>⏰</span>
      <span>
        {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
      </span>
    </div>
  );
};

export default Timer;
