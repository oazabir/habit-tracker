import { useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { PrayerCard } from '../components/PrayerCard';
import { QuranCounter } from '../components/QuranCounter';
import { DuaCounter } from '../components/DuaCounter';
import { WeekView } from '../components/WeekView';
import { parseISO, differenceInDays, startOfWeek } from 'date-fns';

export function DailyPage() {
  const {
    selectedDate,
    tracking,
    getTodayTracking,
    toggleHabit,
    updateQuranPages,
    updateDuaCount,
    updatePrayerDetails,
    setSelectedDate,
  } = useApp();

  const dayTracking = getTodayTracking();

  const prayers = dayTracking.habits.filter(h => h.type === 'prayer');
  const quranHabit = dayTracking.habits.find(h => h.type === 'quran');
  const duaHabit = dayTracking.habits.find(h => h.type === 'dua');

  // Calculate week offset from today
  const weekOffset = useMemo(() => {
    const today = new Date();
    const todayStart = startOfWeek(today, { weekStartsOn: 0 });
    const selected = parseISO(selectedDate);
    const selectedStart = startOfWeek(selected, { weekStartsOn: 0 });
    return Math.round(differenceInDays(selectedStart, todayStart) / 7);
  }, [selectedDate]);

  return (
    <div className="space-y-3">
      {/* Week View */}
      <WeekView
        selectedDate={selectedDate}
        tracking={tracking}
        onSelectDate={setSelectedDate}
        weekOffset={weekOffset}
        onWeekChange={() => {}}
      />

      {/* Prayers Section - 2 Column Grid */}
      <div className="space-y-2">
        <h2 className="text-xs font-semibold text-text-muted uppercase tracking-wider px-1">
          🕌 Daily Prayers
        </h2>
        <div className="grid grid-cols-2 gap-2">
          {prayers.map(prayer => (
            <PrayerCard
              key={prayer.id}
              habit={prayer}
              onToggle={() => toggleHabit(prayer.id)}
              onUpdateDetails={updatePrayerDetails}
            />
          ))}
        </div>
      </div>

      {/* Quran & Dua Section - Side by Side */}
      <div className="grid grid-cols-2 gap-2">
        {quranHabit && (
          <QuranCounter
            habit={quranHabit}
            onUpdate={updateQuranPages}
          />
        )}
        {duaHabit && (
          <DuaCounter
            habit={duaHabit}
            onUpdate={updateDuaCount}
          />
        )}
      </div>

      {/* Motivational Footer */}
      <div className="bg-gradient-to-r from-accent-100 to-accent-50 rounded-xl p-3 text-center border border-accent-200">
        <p className="text-primary-600 text-sm font-medium">
          "The most beloved deeds to Allah are those done consistently, even if small."
        </p>
        <p className="text-primary-500 text-xs mt-1">— Sahih Bukhari</p>
      </div>
    </div>
  );
}
