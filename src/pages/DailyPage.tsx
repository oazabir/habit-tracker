import { useMemo } from 'react';
import { Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PrayerCard } from '../components/PrayerCard';
import { QuranCounter } from '../components/QuranCounter';
import { DuaCounter } from '../components/DuaCounter';
import { WeekView } from '../components/WeekView';
import { PrayerIcon } from '../components/SvgIcons';
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

  const prayers = dayTracking.habits.filter((h) => h.type === 'prayer');
  const quranHabit = dayTracking.habits.find((h) => h.type === 'quran');
  const duaHabit = dayTracking.habits.find((h) => h.type === 'dua');

  const weekOffset = useMemo(() => {
    const today = new Date();
    const todayStart = startOfWeek(today, { weekStartsOn: 0 });
    const selected = parseISO(selectedDate);
    const selectedStart = startOfWeek(selected, { weekStartsOn: 0 });
    return Math.round(differenceInDays(selectedStart, todayStart) / 7);
  }, [selectedDate]);

  return (
    <div className="space-y-3">
      <div className="animate-fade-in-up stagger-1">
        <WeekView
          selectedDate={selectedDate}
          tracking={tracking}
          onSelectDate={setSelectedDate}
          weekOffset={weekOffset}
          onWeekChange={() => {}}
        />
      </div>

      <div className="space-y-2 animate-fade-in-up stagger-2">
        <h2 className="text-xs font-semibold text-text-muted uppercase tracking-wider px-1 flex items-center gap-2">
          <PrayerIcon prayerName="dhuhr" className="w-4 h-4 text-primary-600" />
          <span>Daily Prayers</span>
        </h2>
        <div className="grid grid-cols-2 gap-2">
          {prayers.map((prayer) => (
            <PrayerCard
              key={prayer.id}
              habit={prayer}
              onToggle={() => toggleHabit(prayer.id)}
              onUpdateDetails={updatePrayerDetails}
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 animate-fade-in-up stagger-3">
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

      <div className="bg-gradient-to-r from-accent-100 to-accent-50 rounded-xl p-3 text-center border border-accent-200 animate-fade-in-up stagger-4">
        <p className="text-primary-600 text-sm font-medium flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4" />
          <span>The most beloved deeds are those done consistently, even if small.</span>
        </p>
        <p className="text-primary-500 text-xs mt-1">Sahih Bukhari</p>
      </div>
    </div>
  );
}
