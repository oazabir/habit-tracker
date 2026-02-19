import { useEffect, useRef, useState } from 'react';
import { Check } from 'lucide-react';
import type { Habit, PrayerDetails } from '../types';
import { PrayerDetailSheet } from './PrayerDetailSheet';
import { DuaIcon, PrayerIcon, QuranIcon } from './SvgIcons';

interface PrayerCardProps {
  habit: Habit;
  onToggle: () => void;
  onUpdateDetails: (habitId: string, details: PrayerDetails) => void;
}

export function PrayerCard({ habit, onToggle, onUpdateDetails }: PrayerCardProps) {
  const [showDetailSheet, setShowDetailSheet] = useState(false);
  const wasCompleted = useRef(habit.completed);

  useEffect(() => {
    if (!wasCompleted.current && habit.completed) {
      const timer = setTimeout(() => {
        setShowDetailSheet(true);
      }, 500);

      return () => clearTimeout(timer);
    }
    wasCompleted.current = habit.completed;
  }, [habit.completed]);

  const handleCardClick = () => {
    if (!habit.completed) {
      onToggle();
    } else {
      setShowDetailSheet(true);
    }
  };

  const handleTickClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggle();
  };

  const hasDetails = habit.prayerDetails && (
    habit.prayerDetails.prayedInMasjid ||
    habit.prayerDetails.recitedAdhkar ||
    habit.prayerDetails.recitedAyatulKursi
  );

  const details = habit.prayerDetails;

  return (
    <>
      <button
        onClick={handleCardClick}
        className={`
          w-full p-3 rounded-xl border-2 transition-all duration-300 animate-fade-in-up
          flex flex-col items-center gap-1
          active:scale-95 touch-manipulation hover:-translate-y-0.5
          ${habit.completed
            ? 'bg-gradient-to-r from-primary-500 to-primary-600 border-primary-500 shadow-lg shadow-primary-500/30'
            : 'bg-surface-card border-accent-200 hover:border-primary-400 hover:shadow-md'
          }
        `}
      >
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <div className={`${habit.completed ? 'text-white' : 'text-primary-600'} transition-colors`}>
              <PrayerIcon prayerName={habit.prayerName} className="w-5 h-5" />
            </div>
            <h3 className={`font-semibold text-sm ${habit.completed ? 'text-white' : 'text-text-primary'}`}>
              {habit.name}
            </h3>
          </div>
          <div
            onClick={handleTickClick}
            className={`
              w-6 h-6 rounded-full flex items-center justify-center
              transition-all duration-300 cursor-pointer
              ${habit.completed
                ? 'bg-white/20 hover:bg-white/30 active:scale-90'
                : 'bg-accent-100'
              }
            `}
          >
            {habit.completed && (
              <Check className="w-4 h-4 text-white" strokeWidth={3} />
            )}
          </div>
        </div>

        {habit.completed && hasDetails && (
          <div className="flex flex-wrap gap-1 mt-1">
            {details?.prayedInMasjid && (
              <PrayerIcon prayerName={habit.prayerName} className="w-3 h-3 text-white" />
            )}
            {details?.recitedAdhkar && (
              <DuaIcon className="w-3 h-3 text-white" />
            )}
            {details?.recitedAyatulKursi && (
              <QuranIcon className="w-3 h-3 text-white" />
            )}
          </div>
        )}
      </button>

      <PrayerDetailSheet
        habit={habit}
        isOpen={showDetailSheet}
        onClose={() => setShowDetailSheet(false)}
        onUpdate={onUpdateDetails}
      />
    </>
  );
}
