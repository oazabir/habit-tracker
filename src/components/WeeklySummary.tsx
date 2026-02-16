import { TrendingUp, BookOpen, MessageCircle, Target, Flame } from 'lucide-react';
import type { WeeklyStats } from '../types';
import { getStreakEmoji } from '../utils/stats';

interface WeeklySummaryProps {
  stats: WeeklyStats;
}

export function WeeklySummary({ stats }: WeeklySummaryProps) {
  const statItems = [
    {
      icon: Target,
      label: 'Prayers',
      value: `${stats.completedPrayers}/${stats.totalPrayers}`,
      subValue: `${stats.completionRate}%`,
      bgColor: 'bg-emerald-100',
      iconColor: 'text-emerald-600',
    },
    {
      icon: BookOpen,
      label: 'Quran',
      value: stats.totalQuranPages,
      subValue: 'pages',
      bgColor: 'bg-blue-100',
      iconColor: 'text-blue-600',
    },
    {
      icon: MessageCircle,
      label: 'Duas',
      value: stats.totalDuas,
      subValue: 'made',
      bgColor: 'bg-purple-100',
      iconColor: 'text-purple-600',
    },
    {
      icon: Flame,
      label: 'Streak',
      value: stats.streakDays,
      subValue: 'days',
      bgColor: 'bg-orange-100',
      iconColor: 'text-orange-600',
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-4">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-5 h-5 text-emerald-600" />
        <h3 className="font-semibold text-gray-800">Weekly Summary</h3>
      </div>

      {stats.streakDays >= 3 && (
        <div className="mb-4 p-3 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200">
          <div className="flex items-center justify-center gap-2">
            <span className="text-2xl">{getStreakEmoji(stats.streakDays)}</span>
            <span className="font-semibold text-amber-800">
              {stats.streakDays} day streak! Keep it up!
            </span>
            <span className="text-2xl">{getStreakEmoji(stats.streakDays)}</span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        {statItems.map((item) => (
          <div
            key={item.label}
            className={`${item.bgColor} rounded-xl p-3`}
          >
            <div className="flex items-center gap-2 mb-2">
              <item.icon className={`w-4 h-4 ${item.iconColor}`} />
              <span className="text-sm font-medium text-gray-700">{item.label}</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-gray-800">{item.value}</span>
              <span className="text-xs text-gray-500">{item.subValue}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Progress bar for prayers */}
      <div className="mt-4">
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>Prayer completion</span>
          <span className="font-medium">{stats.completionRate}%</span>
        </div>
        <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full transition-all duration-500"
            style={{ width: `${stats.completionRate}%` }}
          />
        </div>
      </div>
    </div>
  );
}
