export type PrayerName = 'fajr' | 'dhuhr' | 'asr' | 'maghrib' | 'isha';

export interface PrayerDetails {
  prayedInMasjid: boolean;
  recitedAdhkar: boolean;
  recitedAyatulKursi: boolean;
}

export interface Habit {
  id: string;
  name: string;
  type: 'prayer' | 'quran' | 'dua';
  completed: boolean;
  prayerName?: PrayerName;
  quranPages?: number;
  duaCount?: number;
  prayerDetails?: PrayerDetails;
}

export interface DailyTracking {
  date: string; // ISO date string
  habits: Habit[];
  score: number;
}

export interface GroupMember {
  id: string;
  name: string;
  avatar?: string;
  joinedAt: string;
}

export interface Group {
  id: string;
  name: string;
  description?: string;
  inviteCode: string;
  members: GroupMember[];
  createdBy: string;
  createdAt: string;
}

export interface UserProfile {
  id: string;
  name: string;
  avatar?: string;
  createdAt: string;
}

export interface WeeklyStats {
  totalPrayers: number;
  completedPrayers: number;
  totalQuranPages: number;
  totalDuas: number;
  streakDays: number;
  completionRate: number;
}

export const PRAYERS: { name: PrayerName; label: string; icon: string }[] = [
  { name: 'fajr', label: 'Fajr', icon: '🌅' },
  { name: 'dhuhr', label: 'Dhuhr', icon: '☀️' },
  { name: 'asr', label: 'Asr', icon: '🌤️' },
  { name: 'maghrib', label: 'Maghrib', icon: '🌅' },
  { name: 'isha', label: 'Isha', icon: '🌙' },
];

export const HABIT_TYPES = {
  prayer: { label: 'Salat', icon: '🕌', color: 'emerald' },
  quran: { label: 'Quran', icon: '📖', color: 'blue' },
  dua: { label: 'Dua', icon: '🤲', color: 'purple' },
};
