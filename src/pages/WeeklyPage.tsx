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
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
        <h1 className="text-xl font-bold text-gray-800 mb-1">Weekly Progress</h1>
        <p className="text-sm text-gray-500">Track your spiritual journey over time</p>
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
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
        <h3 className="font-semibold text-gray-800 mb-4">Daily Breakdown</h3>
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
                  isToday ? 'bg-emerald-50 border border-emerald-200' : 'bg-gray-50'
                }`}
              >
                <div className="w-12 text-center">
                  <div className={`text-xs ${isToday ? 'text-emerald-600 font-semibold' : 'text-gray-500'}`}>
                    {dayNames[day.getDay()]}
                  </div>
                  <div className={`text-lg font-bold ${isToday ? 'text-emerald-600' : 'text-gray-800'}`}>
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
                              prayer?.completed ? 'bg-emerald-500' : 'bg-gray-300'
                            }`}
                          />
                        );
                      })}
                    </div>

                    {/* Quran indicator */}
                    <div
                      className={`w-2 h-2 rounded-full ${
                        (dayTracking?.habits.find(h => h.type === 'quran')?.quranPages || 0) > 0
                          ? 'bg-blue-500'
                          : 'bg-gray-300'
                      }`}
                    />

                    {/* Dua indicator */}
                    <div
                      className={`w-2 h-2 rounded-full ${
                        (dayTracking?.habits.find(h => h.type === 'dua')?.duaCount || 0) > 0
                          ? 'bg-purple-500'
                          : 'bg-gray-300'
                      }`}
                    />
                  </div>

                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 transition-all duration-300"
                      style={{ width: `${score}%` }}
                    />
                  </div>
                </div>

                <div className="text-right min-w-[50px]">
                  <span className={`text-lg font-bold ${
                    score >= 50 ? 'text-emerald-600' : 'text-gray-400'
                  }`}>
                    {score}
                  </span>
                  <span className="text-xs text-gray-400 ml-1">pts</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
        <h3 className="font-semibold text-gray-800 mb-3">Legend</h3>
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-emerald-500" />
            <span className="text-gray-600">Prayers</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500" />
            <span className="text-gray-600">Quran</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-purple-500" />
            <span className="text-gray-600">Dua</span>
          </div>
        </div>
      </div>
    </div>
  );
}
