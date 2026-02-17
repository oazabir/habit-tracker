import { Minus, Plus } from 'lucide-react';
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
        p-3 rounded-xl border-2 transition-all duration-300
        ${pages > 0
          ? 'bg-gradient-to-r from-primary-500 to-primary-600 border-primary-500 shadow-lg shadow-primary-500/30'
          : 'bg-surface-card border-accent-200'
        }
      `}
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xl">📖</span>
        <h3 className={`font-semibold text-sm ${pages > 0 ? 'text-white' : 'text-text-primary'}`}>
          Quran
        </h3>
      </div>

      <div className="flex items-center justify-center gap-2">
        <button
          onClick={decrement}
          className={`
            w-8 h-8 rounded-full flex items-center justify-center
            transition-all duration-200 active:scale-90 touch-manipulation
            ${pages > 0
              ? 'bg-white/20 text-white hover:bg-white/30'
              : 'bg-accent-100 text-text-light'
            }
          `}
        >
          <Minus className="w-4 h-4" />
        </button>

        <div className="text-center min-w-[50px]">
          <div className={`text-2xl font-bold ${pages > 0 ? 'text-white' : 'text-text-primary'}`}>
            {pages}
          </div>
          <div className={`text-[10px] ${pages > 0 ? 'text-primary-100' : 'text-text-muted'}`}>
            {pages === 1 ? 'page' : 'pages'}
          </div>
        </div>

        <button
          onClick={increment}
          className={`
            w-8 h-8 rounded-full flex items-center justify-center
            transition-all duration-200 active:scale-90 touch-manipulation
            ${pages > 0
              ? 'bg-white/20 text-white hover:bg-white/30'
              : 'bg-primary-100 text-primary-600 hover:bg-primary-200'
            }
          `}
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
