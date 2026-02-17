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
        p-4 rounded-2xl border-2 transition-all duration-300
        ${count > 0
          ? 'bg-gradient-to-r from-primary-500 to-primary-600 border-primary-500 shadow-lg shadow-primary-500/30'
          : 'bg-surface-card border-accent-200'
        }
      `}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🤲</span>
          <div>
            <h3 className={`font-semibold ${count > 0 ? 'text-white' : 'text-text-primary'}`}>
              Dua
            </h3>
            <p className={`text-sm ${count > 0 ? 'text-primary-100' : 'text-text-muted'}`}>
              Remember Allah throughout the day
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-4">
        <button
          onClick={decrement}
          className={`
            w-12 h-12 rounded-full flex items-center justify-center
            transition-all duration-200 active:scale-90 touch-manipulation
            ${count > 0
              ? 'bg-white/20 text-white hover:bg-white/30'
              : 'bg-accent-100 text-text-light'
            }
          `}
        >
          <Minus className="w-6 h-6" />
        </button>

        <div className="text-center min-w-[80px]">
          <div className={`text-4xl font-bold ${count > 0 ? 'text-white' : 'text-text-primary'}`}>
            {count}
          </div>
          <div className={`text-sm ${count > 0 ? 'text-primary-100' : 'text-text-muted'}`}>
            {count === 1 ? 'dua' : 'duas'}
          </div>
        </div>

        <button
          onClick={increment}
          className={`
            w-12 h-12 rounded-full flex items-center justify-center
            transition-all duration-200 active:scale-90 touch-manipulation
            ${count > 0
              ? 'bg-white/20 text-white hover:bg-white/30'
              : 'bg-primary-100 text-primary-600 hover:bg-primary-200'
            }
          `}
        >
          <Plus className="w-6 h-6" />
        </button>
      </div>

      {count > 0 && (
        <div className="mt-3 text-center">
          <span className="text-white/80 text-sm">
            {count >= 10 ? "Alhamdulillah! Beautiful devotion! ✨" : "Keep connecting with Allah! 💚"}
          </span>
        </div>
      )}
    </div>
  );
}
