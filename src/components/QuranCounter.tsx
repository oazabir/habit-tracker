import { Minus, Plus, BookOpen } from 'lucide-react';
import type { Habit } from '../types';

interface QuranCounterProps {
  habit: Habit;
  onUpdate: (pages: number) => void;
}

export function QuranCounter({ habit, onUpdate }: QuranCounterProps) {
  const pages = habit.quranPages || 0;

  const increment = () => {
    onUpdate(Math.min(pages + 1, 20));
  };

  const decrement = () => {
    onUpdate(Math.max(pages - 1, 0));
  };

  return (
    <div
      className={`
        p-4 rounded-2xl border-2 transition-all duration-300
        ${pages > 0
          ? 'bg-gradient-to-r from-blue-500 to-blue-600 border-blue-500 shadow-lg shadow-blue-500/30'
          : 'bg-white border-gray-200'
        }
      `}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className="text-2xl">📖</span>
          <div>
            <h3 className={`font-semibold ${pages > 0 ? 'text-white' : 'text-gray-800'}`}>
              Quran Reading
            </h3>
            <p className={`text-sm ${pages > 0 ? 'text-blue-100' : 'text-gray-500'}`}>
              Track your daily pages
            </p>
          </div>
        </div>
        {pages > 0 && (
          <div className="bg-white/20 px-3 py-1 rounded-full">
            <BookOpen className="w-4 h-4 text-white" />
          </div>
        )}
      </div>

      <div className="flex items-center justify-center gap-4">
        <button
          onClick={decrement}
          className={`
            w-12 h-12 rounded-full flex items-center justify-center
            transition-all duration-200 active:scale-90 touch-manipulation
            ${pages > 0
              ? 'bg-white/20 text-white hover:bg-white/30'
              : 'bg-gray-100 text-gray-400'
            }
          `}
        >
          <Minus className="w-6 h-6" />
        </button>

        <div className="text-center min-w-[80px]">
          <div className={`text-4xl font-bold ${pages > 0 ? 'text-white' : 'text-gray-800'}`}>
            {pages}
          </div>
          <div className={`text-sm ${pages > 0 ? 'text-blue-100' : 'text-gray-500'}`}>
            {pages === 1 ? 'page' : 'pages'}
          </div>
        </div>

        <button
          onClick={increment}
          className={`
            w-12 h-12 rounded-full flex items-center justify-center
            transition-all duration-200 active:scale-90 touch-manipulation
            ${pages > 0
              ? 'bg-white/20 text-white hover:bg-white/30'
              : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
            }
          `}
        >
          <Plus className="w-6 h-6" />
        </button>
      </div>

      {pages > 0 && (
        <div className="mt-3 text-center">
          <span className="text-white/80 text-sm">
            {pages >= 5 ? "MashaAllah! Amazing effort! 🌟" : "Great start! Keep going! 💪"}
          </span>
        </div>
      )}
    </div>
  );
}
