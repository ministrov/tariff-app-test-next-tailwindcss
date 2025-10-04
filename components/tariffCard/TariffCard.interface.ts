import { Tariff } from '@/interfaces/tariff.interface';

export interface TariffCardProps {
  tariff: Tariff;
  isSelected: boolean;
  onSelect: () => void;
  checkboxError: boolean;
  timerExpired: boolean;
  discount: number;
}
