import Timer from '../timer/Timer';
import { TimerProps } from '../timer/Timer.interface';

const Header = ({ timeLeft }: TimerProps) => {
  return (
    <header className='fixed top-0 left-0 right-0 bg-(--color-midnight) shadow-lg z-50'>
      <div className='container mx-auto px-4 py-4'>
        <div className='flex justify-between items-center'>
          <div className='text-xl font-bold text-white'>Успейте открыть пробную неделю</div>
          <Timer timeLeft={timeLeft} />
        </div>
      </div>
    </header>
  );
};

export default Header;
