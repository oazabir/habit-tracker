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
          ? 'bg-gradient-to-r from-primary-500 to-primary-600 border-primary-500 shadow-lg shadow-primary-500/30'
          : 'bg-surface-card border-accent-200'
        }
      `}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className="text-2xl">📖</span>
          <div>
            <h3 className={`font-semibold ${pages > 0 ? 'text-white' : 'text-text-primary'}`}>
              Quran Reading
            </h3>
            <p className={`text-sm ${pages > 0 ? 'text-primary-100' : 'text-text-muted'}`}>
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
              : 'bg-accent-100 text-text-light'
            }
          `}
        >
          <Minus className="w-6 h-6" />
        </button>

        <div className="text-center min-w-[80px]">
          <div className={`text-4xl font-bold ${pages > 0 ? 'text-white' : 'text-text-primary'}`}>
            {pages}
          </div>
          <div className={`text-sm ${pages > 0 ? 'text-primary-100' : 'text-text-muted'}`}>
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
              : 'bg-primary-100 text-primary-600 hover:bg-primary-200'
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
