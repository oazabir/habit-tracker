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
      bgColor: 'bg-accent-100',
      iconColor: 'text-primary-600',
    },
    {
      icon: BookOpen,
      label: 'Quran',
      value: stats.totalQuranPages,
      subValue: 'pages',
      bgColor: 'bg-accent-100',
      iconColor: 'text-primary-500',
    },
    {
      icon: MessageCircle,
      label: 'Duas',
      value: stats.totalDuas,
      subValue: 'made',
      bgColor: 'bg-accent-100',
      iconColor: 'text-accent-600',
    },
    {
      icon: Flame,
      label: 'Streak',
      value: stats.streakDays,
      subValue: 'days',
      bgColor: 'bg-amber-100',
      iconColor: 'text-amber-600',
    },
  ];

  return (
    <div className="bg-surface-card rounded-2xl shadow-sm border border-accent-100 p-4 mb-4">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-5 h-5 text-primary-600" />
        <h3 className="font-semibold text-text-primary">Weekly Summary</h3>
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
              <span className="text-sm font-medium text-text-secondary">{item.label}</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-text-primary">{item.value}</span>
              <span className="text-xs text-text-muted">{item.subValue}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Progress bar for prayers */}
      <div className="mt-4">
        <div className="flex justify-between text-sm text-text-secondary mb-1">
          <span>Prayer completion</span>
          <span className="font-medium">{stats.completionRate}%</span>
        </div>
        <div className="h-3 bg-surface-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary-400 to-primary-600 rounded-full transition-all duration-500"
            style={{ width: `${stats.completionRate}%` }}
          />
        </div>
      </div>
    </div>
  );
}
