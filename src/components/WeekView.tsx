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

function CircularProgress({ score, size = 40, strokeWidth = 3 }: { score: number; size?: number; strokeWidth?: number }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const getScoreColor = () => {
    if (score >= 90) return { stroke: '#10b981', text: 'text-emerald-600' };
    if (score >= 75) return { stroke: '#22c55e', text: 'text-green-600' };
    if (score >= 50) return { stroke: '#eab308', text: 'text-yellow-600' };
    if (score >= 25) return { stroke: '#fb923c', text: 'text-orange-500' };
    return { stroke: '#d1d5db', text: 'text-gray-400' };
  };

  const colors = getScoreColor();

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e5e7eb"
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
        <span className={`text-xs font-bold ${colors.text}`}>{score}</span>
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
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-4">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => onWeekChange(weekOffset - 1)}
          className="p-2 rounded-full hover:bg-gray-100 active:scale-95 touch-manipulation"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>

        <h3 className="font-semibold text-gray-800">
          {formatWeekRange(weekStart)}
        </h3>

        <button
          onClick={() => onWeekChange(weekOffset + 1)}
          className="p-2 rounded-full hover:bg-gray-100 active:scale-95 touch-manipulation"
        >
          <ChevronRight className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {weekDays.map((day) => {
          const score = getDayScore(day);
          const todayFlag = isToday(day);
          const selectedFlag = isSelected(day);

          return (
            <button
              key={formatDate(day)}
              onClick={() => onSelectDate(formatDate(day))}
              className={`
                flex flex-col items-center p-2 rounded-xl transition-all duration-200
                touch-manipulation active:scale-95
                ${selectedFlag
                  ? 'bg-emerald-500 shadow-md'
                  : todayFlag
                    ? 'bg-emerald-50 ring-2 ring-emerald-200'
                    : 'hover:bg-gray-50'
                }
              `}
            >
              <span className={`text-xs font-medium mb-1 ${selectedFlag ? 'text-emerald-100' : 'text-gray-500'}`}>
                {getDayName(day)}
              </span>
              <span className={`text-sm font-bold mb-1 ${selectedFlag ? 'text-white' : 'text-gray-800'}`}>
                {getDayNumber(day)}
              </span>
              {getDayComplete(day) ? (
                <div className="w-9 h-9 rounded-full bg-emerald-500 flex items-center justify-center">
                  <Check className="w-5 h-5 text-white" strokeWidth={3} />
                </div>
              ) : (
                <CircularProgress
                  score={score}
                  size={36}
                  strokeWidth={3}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
