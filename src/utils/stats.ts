import type { DailyTracking, WeeklyStats, Habit } from '../types';
import { PRAYERS } from '../types';
import { getWeekDays, formatDate, isSameDate } from './date';
import { parseISO, subDays } from 'date-fns';

export const calculateDayScore = (habits: Habit[]): number => {
  const prayerHabits = habits.filter(h => h.type === 'prayer');
  const completedPrayers = prayerHabits.filter(h => h.completed).length;
  const prayerScore = (completedPrayers / PRAYERS.length) * 50; // 50% weight

  const quranHabit = habits.find(h => h.type === 'quran');
  const quranScore = quranHabit?.quranPages ? Math.min(quranHabit.quranPages * 5, 25) : 0; // 25% weight, max 5 pages = 25 points

  const duaHabit = habits.find(h => h.type === 'dua');
  const duaScore = duaHabit?.duaCount ? Math.min(duaHabit.duaCount * 5, 25) : 0; // 25% weight, max 5 duas = 25 points

  return Math.round(prayerScore + quranScore + duaScore);
};

export const isDayComplete = (habits: Habit[]): boolean => {
  // All 5 prayers must be completed
  const prayerHabits = habits.filter(h => h.type === 'prayer');
  const allPrayersCompleted = prayerHabits.length === PRAYERS.length &&
    prayerHabits.every(h => h.completed);

  // At least 1 quran page
  const quranHabit = habits.find(h => h.type === 'quran');
  const hasQuran = (quranHabit?.quranPages || 0) >= 1;

  // At least 1 dua
  const duaHabit = habits.find(h => h.type === 'dua');
  const hasDua = (duaHabit?.duaCount || 0) >= 1;

  return allPrayersCompleted && hasQuran && hasDua;
};

export const calculateWeeklyStats = (tracking: DailyTracking[], weekDate: Date = new Date()): WeeklyStats => {
  const weekDays = getWeekDays(weekDate);
  const today = formatDate(new Date());

  let totalPrayers = 0;
  let completedPrayers = 0;
  let totalQuranPages = 0;
  let totalDuas = 0;
  let streakDays = 0;

  // Calculate streak
  const sortedTracking = [...tracking]
    .filter(t => t.date <= today)
    .sort((a, b) => b.date.localeCompare(a.date));

  let currentStreak = 0;
  let checkDate = new Date();

  for (const day of sortedTracking) {
    const dayDate = parseISO(day.date);
    if (isSameDate(dayDate, checkDate) && day.score >= 50) {
      currentStreak++;
      checkDate = subDays(checkDate, 1);
    } else if (isSameDate(dayDate, checkDate)) {
      break;
    }
  }
  streakDays = currentStreak;

  // Calculate weekly stats
  weekDays.forEach(day => {
    const dayString = formatDate(day);
    const dayTracking = tracking.find(t => t.date === dayString);

    if (dayTracking) {
      dayTracking.habits.forEach(habit => {
        if (habit.type === 'prayer') {
          totalPrayers++;
          if (habit.completed) completedPrayers++;
        } else if (habit.type === 'quran') {
          totalQuranPages += habit.quranPages || 0;
        } else if (habit.type === 'dua') {
          totalDuas += habit.duaCount || 0;
        }
      });
    } else {
      // Day without tracking
      totalPrayers += PRAYERS.length;
    }
  });

  const completionRate = totalPrayers > 0 ? Math.round((completedPrayers / totalPrayers) * 100) : 0;

  return {
    totalPrayers,
    completedPrayers,
    totalQuranPages,
    totalDuas,
    streakDays,
    completionRate,
  };
};

export const getEncouragingMessage = (score: number): string => {
  if (score >= 90) return "MashaAllah! Perfect day! 🌟";
  if (score >= 75) return "Excellent! Keep it up! 💪";
  if (score >= 50) return "Good progress! You're doing well! 👍";
  if (score >= 25) return "Keep going! Every step counts! 🌱";
  return "Start small, aim high! You've got this! 💚";
};

export const getStreakEmoji = (streak: number): string => {
  if (streak >= 30) return "🏆";
  if (streak >= 14) return "🌟";
  if (streak >= 7) return "🔥";
  if (streak >= 3) return "✨";
  return "🌱";
};
