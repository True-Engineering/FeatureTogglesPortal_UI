import { ru, enGB } from 'date-fns/locale';
import { ILocale } from '../types';

export const getDateFnsLocale = (lang: ILocale): Locale =>
  lang === 'ru' ? ru : enGB;

export const getDatePickerMonths = (dateFnsLocale: Locale): string[] =>
  Array.from({ length: 12 }, (_, i) => dateFnsLocale.localize?.month(i));
