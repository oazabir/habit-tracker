import {
  format,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isToday,
  isYesterday,
  isSameDay,
  parseISO,
  addDays,
  subDays,
} from 'date-fns';

export const formatDate = (date: Date): string => {
  return format(date, 'yyyy-MM-dd');
};

export const formatDisplayDate = (date: Date | string): string => {
  const d = typeof date === 'string' ? parseISO(date) : date;
  return format(d, 'EEEE, MMMM d, yyyy');
};

export const formatShortDate = (date: Date | string): string => {
  const d = typeof date === 'string' ? parseISO(date) : date;
  if (isToday(d)) return 'Today';
  if (isYesterday(d)) return 'Yesterday';
  const tomorrow = addDays(new Date(), 1);
  if (isSameDay(d, tomorrow)) return 'Tomorrow';
  const currentYear = new Date().getFullYear();
  const dateYear = d.getFullYear();
  if (dateYear === currentYear) {
    return format(d, 'MMM d');
  }
  return format(d, 'MMM d, yyyy');
};

export const getWeekDays = (date: Date = new Date()): Date[] => {
  const start = startOfWeek(date, { weekStartsOn: 0 });
  const end = endOfWeek(date, { weekStartsOn: 0 });
  return eachDayOfInterval({ start, end });
};

export const getWeekRange = (date: Date = new Date()): { start: Date; end: Date } => {
  return {
    start: startOfWeek(date, { weekStartsOn: 0 }),
    end: endOfWeek(date, { weekStartsOn: 0 }),
  };
};

export const formatWeekRange = (date: Date = new Date()): string => {
  const { start, end } = getWeekRange(date);
  return `${format(start, 'MMM d')} - ${format(end, 'MMM d, yyyy')}`;
};

export const isSameDate = (date1: Date | string, date2: Date | string): boolean => {
  const d1 = typeof date1 === 'string' ? parseISO(date1) : date1;
  const d2 = typeof date2 === 'string' ? parseISO(date2) : date2;
  return isSameDay(d1, d2);
};

export const getNextDay = (date: Date): Date => addDays(date, 1);
export const getPrevDay = (date: Date): Date => subDays(date, 1);

export const getDayName = (date: Date | string): string => {
  const d = typeof date === 'string' ? parseISO(date) : date;
  return format(d, 'EEE');
};

export const getDayNumber = (date: Date | string): string => {
  const d = typeof date === 'string' ? parseISO(date) : date;
  return format(d, 'd');
};
