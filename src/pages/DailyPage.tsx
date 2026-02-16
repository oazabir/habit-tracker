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
    <div className="space-y-4">
      {/* Week View */}
      <WeekView
        selectedDate={selectedDate}
        tracking={tracking}
        onSelectDate={setSelectedDate}
        weekOffset={weekOffset}
        onWeekChange={() => {}}
      />

      {/* Prayers Section */}
      <div className="space-y-2">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider px-1">
          🕌 Daily Prayers
        </h2>
        {prayers.map(prayer => (
          <PrayerCard
            key={prayer.id}
            habit={prayer}
            onToggle={() => toggleHabit(prayer.id)}
            onUpdateDetails={updatePrayerDetails}
          />
        ))}
      </div>

      {/* Quran Section */}
      <div className="space-y-2">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider px-1">
          📖 Quran Reading
        </h2>
        {quranHabit && (
          <QuranCounter
            habit={quranHabit}
            onUpdate={updateQuranPages}
          />
        )}
      </div>

      {/* Dua Section */}
      <div className="space-y-2">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider px-1">
          🤲 Dua & Remembrance
        </h2>
        {duaHabit && (
          <DuaCounter
            habit={duaHabit}
            onUpdate={updateDuaCount}
          />
        )}
      </div>

      {/* Motivational Footer */}
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-4 text-center border border-emerald-100">
        <p className="text-emerald-800 font-medium">
          "The most beloved deeds to Allah are those done consistently, even if small."
        </p>
        <p className="text-emerald-600 text-sm mt-1">— Sahih Bukhari</p>
      </div>
    </div>
  );
}
