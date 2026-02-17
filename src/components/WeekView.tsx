import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import type { DailyTracking } from '../types';
import { getWeekDays, getDayName, getDayNumber, formatDate, formatWeekRange } from '../utils/date';
import { isDayComplete } from '../utils/stats';

interface WeekViewProps {
  selectedDate: string;
  tracking: DailyTracking[];
  onSelectDate: (date: string) => void;
  weekOffset: number;
  onWeekChange: (offset: number) => void;
}

function CircularProgress({ score, size = 28, strokeWidth = 2 }: { score: number; size?: number; strokeWidth?: number }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const getScoreColor = () => {
    if (score >= 90) return { stroke: '#3a5a40', text: 'text-primary-500' };
    if (score >= 75) return { stroke: '#5a9a5a', text: 'text-primary-400' };
    if (score >= 50) return { stroke: '#eab308', text: 'text-amber-500' };
    if (score >= 25) return { stroke: '#fb923c', text: 'text-orange-500' };
    return { stroke: '#d1d5db', text: 'text-text-light' };
  };

  const colors = getScoreColor();

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#E8E4DE"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={colors.stroke}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          style={{
            strokeDasharray: circumference,
            strokeDashoffset,
            transition: 'stroke-dashoffset 0.3s ease-in-out',
          }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className={`text-[10px] font-bold ${colors.text}`}>{score}</span>
      </div>
    </div>
  );
}

export function WeekView({
  selectedDate,
  tracking,
  onSelectDate,
  weekOffset,
  onWeekChange,
}: WeekViewProps) {
  const today = new Date();
  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() + (weekOffset * 7));

  const weekDays = getWeekDays(weekStart);

  const getDayScore = (date: Date): number => {
    const dateString = formatDate(date);
    const dayTracking = tracking.find(t => t.date === dateString);
    return dayTracking?.score || 0;
  };

  const getDayComplete = (date: Date): boolean => {
    const dateString = formatDate(date);
    const dayTracking = tracking.find(t => t.date === dateString);
    return dayTracking ? isDayComplete(dayTracking.habits) : false;
  };

  const isToday = (date: Date): boolean => {
    return formatDate(date) === formatDate(new Date());
  };

  const isSelected = (date: Date): boolean => {
    return formatDate(date) === selectedDate;
  };

  return (
    <div className="bg-surface-card rounded-xl shadow-sm border border-accent-100 p-2 mb-3">
      <div className="flex items-center justify-between mb-2">
        <button
          onClick={() => onWeekChange(weekOffset - 1)}
          className="p-1 rounded-full hover:bg-surface-muted active:scale-95 touch-manipulation"
        >
          <ChevronLeft className="w-4 h-4 text-text-secondary" />
        </button>

        <h3 className="text-sm font-semibold text-text-primary">
          {formatWeekRange(weekStart)}
        </h3>

        <button
          onClick={() => onWeekChange(weekOffset + 1)}
          className="p-1 rounded-full hover:bg-surface-muted active:scale-95 touch-manipulation"
        >
          <ChevronRight className="w-4 h-4 text-text-secondary" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {weekDays.map((day) => {
          const score = getDayScore(day);
          const todayFlag = isToday(day);
          const selectedFlag = isSelected(day);

          return (
            <button
              key={formatDate(day)}
              onClick={() => onSelectDate(formatDate(day))}
              className={`
                flex flex-col items-center p-1 rounded-lg transition-all duration-200
                touch-manipulation active:scale-95
                ${selectedFlag
                  ? 'bg-primary-500 shadow-md'
                  : todayFlag
                    ? 'bg-accent-100 ring-2 ring-primary-300'
                    : 'hover:bg-surface-muted'
                }
              `}
            >
              <span className={`text-[10px] font-medium ${selectedFlag ? 'text-primary-100' : 'text-text-muted'}`}>
                {getDayName(day)}
              </span>
              <span className={`text-xs font-bold ${selectedFlag ? 'text-white' : 'text-text-primary'}`}>
                {getDayNumber(day)}
              </span>
              {getDayComplete(day) ? (
                <div className="w-6 h-6 rounded-full bg-primary-500 flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" strokeWidth={3} />
                </div>
              ) : (
                <CircularProgress
                  score={score}
                  size={24}
                  strokeWidth={2}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
