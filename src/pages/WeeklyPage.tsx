import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { WeeklySummary } from '../components/WeeklySummary';
import { WeekView } from '../components/WeekView';
import { calculateWeeklyStats } from '../utils/stats';
import { formatDate } from '../utils/date';

export function WeeklyPage() {
  const { selectedDate, tracking, setSelectedDate } = useApp();
  const [weekOffset, setWeekOffset] = useState(0);

  // Get the current week's date based on offset
  const today = new Date();
  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() + (weekOffset * 7) - today.getDay());

  const stats = calculateWeeklyStats(tracking, weekStart);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-surface-card rounded-2xl shadow-sm border border-accent-100 p-4">
        <h1 className="text-xl font-bold text-text-primary mb-1">Weekly Progress</h1>
        <p className="text-sm text-text-muted">Track your spiritual journey over time</p>
      </div>

      {/* Week Navigation */}
      <WeekView
        selectedDate={selectedDate}
        tracking={tracking}
        onSelectDate={setSelectedDate}
        weekOffset={weekOffset}
        onWeekChange={setWeekOffset}
      />

      {/* Weekly Summary */}
      <WeeklySummary stats={stats} />

      {/* Daily Breakdown */}
      <div className="bg-surface-card rounded-2xl shadow-sm border border-accent-100 p-4">
        <h3 className="font-semibold text-text-primary mb-4">Daily Breakdown</h3>
        <div className="space-y-3">
          {[0, 1, 2, 3, 4, 5, 6].map((dayOffset) => {
            const day = new Date(weekStart);
            day.setDate(weekStart.getDate() + dayOffset);
            const dateString = formatDate(day);
            const dayTracking = tracking.find(t => t.date === dateString);
            const score = dayTracking?.score || 0;

            const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            const isToday = dateString === formatDate(new Date());

            return (
              <div
                key={dateString}
                className={`flex items-center gap-3 p-3 rounded-xl ${
                  isToday ? 'bg-accent-100 border border-primary-300' : 'bg-surface-muted'
                }`}
              >
                <div className="w-12 text-center">
                  <div className={`text-xs ${isToday ? 'text-primary-600 font-semibold' : 'text-text-muted'}`}>
                    {dayNames[day.getDay()]}
                  </div>
                  <div className={`text-lg font-bold ${isToday ? 'text-primary-600' : 'text-text-primary'}`}>
                    {day.getDate()}
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    {/* Prayers completed */}
                    <div className="flex gap-0.5">
                      {[0, 1, 2, 3, 4].map((i) => {
                        const prayer = dayTracking?.habits.filter(h => h.type === 'prayer')[i];
                        return (
                          <div
                            key={i}
                            className={`w-2 h-2 rounded-full ${
                              prayer?.completed ? 'bg-primary-500' : 'bg-text-light'
                            }`}
                          />
                        );
                      })}
                    </div>

                    {/* Quran indicator */}
                    <div
                      className={`w-2 h-2 rounded-full ${
                        (dayTracking?.habits.find(h => h.type === 'quran')?.quranPages || 0) > 0
                          ? 'bg-primary-400'
                          : 'bg-text-light'
                      }`}
                    />

                    {/* Dua indicator */}
                    <div
                      className={`w-2 h-2 rounded-full ${
                        (dayTracking?.habits.find(h => h.type === 'dua')?.duaCount || 0) > 0
                          ? 'bg-accent-500'
                          : 'bg-text-light'
                      }`}
                    />
                  </div>

                  <div className="h-2 bg-surface-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary-400 to-primary-600 transition-all duration-300"
                      style={{ width: `${score}%` }}
                    />
                  </div>
                </div>

                <div className="text-right min-w-[50px]">
                  <span className={`text-lg font-bold ${
                    score >= 50 ? 'text-primary-600' : 'text-text-light'
                  }`}>
                    {score}
                  </span>
                  <span className="text-xs text-text-light ml-1">pts</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="bg-surface-card rounded-2xl shadow-sm border border-accent-100 p-4">
        <h3 className="font-semibold text-text-primary mb-3">Legend</h3>
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary-500" />
            <span className="text-text-secondary">Prayers</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary-400" />
            <span className="text-text-secondary">Quran</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-accent-500" />
            <span className="text-text-secondary">Dua</span>
          </div>
        </div>
      </div>
    </div>
  );
}
