import { Minus, Plus } from 'lucide-react';
import type { Habit } from '../types';

interface DuaCounterProps {
  habit: Habit;
  onUpdate: (count: number) => void;
}

export function DuaCounter({ habit, onUpdate }: DuaCounterProps) {
  const count = habit.duaCount || 0;

  const increment = () => {
    onUpdate(Math.min(count + 1, 50));
  };

  const decrement = () => {
    onUpdate(Math.max(count - 1, 0));
  };

  return (
    <div
      className={`
        p-3 rounded-xl border-2 transition-all duration-300
        ${count > 0
          ? 'bg-gradient-to-r from-primary-500 to-primary-600 border-primary-500 shadow-lg shadow-primary-500/30'
          : 'bg-surface-card border-accent-200'
        }
      `}
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xl">🤲</span>
        <h3 className={`font-semibold text-sm ${count > 0 ? 'text-white' : 'text-text-primary'}`}>
          Dua
        </h3>
      </div>

      <div className="flex items-center justify-center gap-2">
        <button
          onClick={decrement}
          className={`
            w-8 h-8 rounded-full flex items-center justify-center
            transition-all duration-200 active:scale-90 touch-manipulation
            ${count > 0
              ? 'bg-white/20 text-white hover:bg-white/30'
              : 'bg-accent-100 text-text-light'
            }
          `}
        >
          <Minus className="w-4 h-4" />
        </button>

        <div className="text-center min-w-[50px]">
          <div className={`text-2xl font-bold ${count > 0 ? 'text-white' : 'text-text-primary'}`}>
            {count}
          </div>
          <div className={`text-[10px] ${count > 0 ? 'text-primary-100' : 'text-text-muted'}`}>
            {count === 1 ? 'dua' : 'duas'}
          </div>
        </div>

        <button
          onClick={increment}
          className={`
            w-8 h-8 rounded-full flex items-center justify-center
            transition-all duration-200 active:scale-90 touch-manipulation
            ${count > 0
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
