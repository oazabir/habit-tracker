import { useState } from 'react';
import { Check, BookOpen } from 'lucide-react';
import type { Habit, PrayerDetails } from '../types';
import { PrayerDetailSheet } from './PrayerDetailSheet';

interface PrayerCardProps {
  habit: Habit;
  onToggle: () => void;
  onUpdateDetails: (habitId: string, details: PrayerDetails) => void;
}

export function PrayerCard({ habit, onToggle, onUpdateDetails }: PrayerCardProps) {
  const [showDetailSheet, setShowDetailSheet] = useState(false);

  const prayerIcons: Record<string, string> = {
    fajr: '🌅',
    dhuhr: '☀️',
    asr: '🌤️',
    maghrib: '🌇',
    isha: '🌙',
  };

  const getPrayerIcon = () => {
    return prayerIcons[habit.prayerName || ''] || '🕌';
  };

  const handleClick = () => {
    if (habit.completed) {
      setShowDetailSheet(true);
    } else {
      onToggle();
    }
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
        onClick={handleClick}
        className={`
          w-full p-4 rounded-2xl border-2 transition-all duration-300
          flex flex-col items-start gap-2
          active:scale-95 touch-manipulation
          ${habit.completed
            ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 border-emerald-500 shadow-lg shadow-emerald-500/30'
            : 'bg-white border-gray-200 hover:border-emerald-300 hover:shadow-md'
          }
        `}
      >
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{getPrayerIcon()}</span>
            <div className="text-left">
              <h3 className={`font-semibold ${habit.completed ? 'text-white' : 'text-gray-800'}`}>
                {habit.name}
              </h3>
              <p className={`text-sm ${habit.completed ? 'text-emerald-100' : 'text-gray-500'}`}>
                {habit.completed ? 'Tap to add details' : 'Tap to mark'}
              </p>
            </div>
          </div>
          <div
            className={`
              w-8 h-8 rounded-full flex items-center justify-center
              transition-all duration-300
              ${habit.completed
                ? 'bg-white/20'
                : 'bg-gray-100'
              }
            `}
          >
            {habit.completed && (
              <Check className="w-5 h-5 text-white" strokeWidth={3} />
            )}
          </div>
        </div>

        {/* Sub-items for prayer details */}
        {habit.completed && hasDetails && (
          <div className="flex flex-wrap gap-2 mt-1 ml-11">
            {details?.prayedInMasjid && (
              <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full bg-white/20 text-white">
                <span>🕌</span>
                Masjid
              </span>
            )}
            {details?.recitedAdhkar && (
              <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full bg-white/20 text-white">
                <span>🤲</span>
                Adhkar
              </span>
            )}
            {details?.recitedAyatulKursi && (
              <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full bg-white/20 text-white">
                <BookOpen className="w-3 h-3" />
                Ayatul Kursi
              </span>
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
