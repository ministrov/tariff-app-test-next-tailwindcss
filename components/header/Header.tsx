import Timer from '../timer/Timer';
import { TimerProps } from '../timer/Timer.interface';

const Header = ({ timeLeft }: TimerProps) => {
  return (
    <header className='fixed top-0 left-0 right-0 bg-(--color-midnight) shadow-lg z-50'>
      <div className='container mx-auto px-4 py-4'>
        <div className='flex flex-col items-center'>
          <div className='text-[24px] max-[375px]:text-[18px] max-[320px]:text-[14px] font-semibold text-white'>
            Успейте открыть пробную неделю
          </div>
          <Timer timeLeft={timeLeft} />
        </div>
      </div>
    </header>
  );
};

export default Header;
