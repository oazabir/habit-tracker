import { useState } from 'react';
import { X, Check, Info, BookOpen } from 'lucide-react';
import type { Habit, PrayerDetails } from '../types';

interface PrayerDetailSheetProps {
  habit: Habit;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (habitId: string, details: PrayerDetails) => void;
}

const ADHKAR_TEXT = `سُبْحَانَ اللهِ
سُبْحَانَ اللهِ وَبِحَمْدِهِ
سُبْحَانَ اللهِ الْعَظِيمِ
أَسْتَغْفِرُ اللهَ
سُبْحَانَ اللهِ وَبِحَمْدِهِ سُبْحَانَ اللهِ الْعَظِيمِ
لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللهِ
لَا إِلَهَ إِلَّا اللهُ وَحْدَهُ لَا شَرِيكَ لَهُ`;

const ADHKAR_TRANSLATION = `Glory be to Allah
Glory and praise be to Allah
Glory be to Allah, the Almighty
I seek forgiveness from Allah
Glory and praise be to Allah, Glory be to Allah the Almighty
There is no power nor might except by Allah
None has the right to be worshipped but Allah alone`;

const AYATUL_KURSI_ARABIC = `اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَا مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ`;

const AYATUL_KURSI_TRANSLATION = `Allah! There is no god but He, the Living, the Self-Subsisting. No slumber can seize Him nor sleep. His are all things in the heavens and on earth. Who is there can intercede in His presence except as He permits? He knows what appears before them and what is behind them. Nor shall they compass anything of His knowledge except as He wills. His Throne extends over the heavens and the earth, and He feels no fatigue in guarding and preserving them. For He is the Most High, the Supreme.`;

export function PrayerDetailSheet({ habit, isOpen, onClose, onUpdate }: PrayerDetailSheetProps) {
  const [details, setDetails] = useState<PrayerDetails>(
    habit.prayerDetails || {
      prayedInMasjid: false,
      recitedAdhkar: false,
      recitedAyatulKursi: false,
    }
  );
  const [showAdhkarInfo, setShowAdhkarInfo] = useState(false);
  const [showAyatulKursiInfo, setShowAyatulKursiInfo] = useState(false);

  if (!isOpen) return null;

  const toggleDetail = (key: keyof PrayerDetails) => {
    const newDetails = { ...details, [key]: !details[key] };
    setDetails(newDetails);
    onUpdate(habit.id, newDetails);
  };

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

  const OptionRow = ({
    checked,
    onToggle,
    label,
    icon,
    hasInfo,
    onInfoClick,
  }: {
    checked: boolean;
    onToggle: () => void;
    label: string;
    icon: React.ReactNode;
    hasInfo?: boolean;
    onInfoClick?: () => void;
  }) => (
    <div
      className={`flex items-center justify-between p-4 rounded-xl transition-all ${
        checked ? 'bg-accent-100 border-2 border-primary-300' : 'bg-surface-muted border-2 border-transparent'
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          onClick={onToggle}
          className={`w-6 h-6 rounded-md flex items-center justify-center transition-all cursor-pointer ${
            checked ? 'bg-primary-500' : 'border-2 border-text-light'
          }`}
        >
          {checked && <Check className="w-4 h-4 text-white" strokeWidth={3} />}
        </div>
        <span
          onClick={onToggle}
          className={`font-medium cursor-pointer ${checked ? 'text-primary-600' : 'text-text-secondary'}`}
        >
          {label}
        </span>
        {icon}
      </div>
      {hasInfo && (
        <button
          onClick={onInfoClick}
          className="relative p-2 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 text-white animate-glow touch-manipulation"
        >
          <Info className="w-5 h-5" />
        </button>
      )}
    </div>
  );

  return (
    <>
      {/* Main bottom sheet */}
      <div
        className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50"
        onClick={onClose}
      >
        <div
          className="bg-surface-card w-full sm:w-96 sm:rounded-2xl rounded-t-2xl p-6 animate-slide-up max-h-[80vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{getPrayerIcon()}</span>
              <h2 className="text-lg font-semibold text-text-primary">{habit.name}</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-surface-muted transition-colors"
            >
              <X className="w-5 h-5 text-text-muted" />
            </button>
          </div>

          <p className="text-sm text-text-muted mb-4">
            Add details about your prayer
          </p>

          <div className="space-y-3">
            <OptionRow
              checked={details.prayedInMasjid}
              onToggle={() => toggleDetail('prayedInMasjid')}
              label="Prayed in the Masjid"
              icon={<span className="text-lg ml-2">🕌</span>}
            />

            <OptionRow
              checked={details.recitedAdhkar}
              onToggle={() => toggleDetail('recitedAdhkar')}
              label="Prayed Adhkar"
              icon={<span className="text-lg ml-2">🤲</span>}
              hasInfo
              onInfoClick={() => setShowAdhkarInfo(true)}
            />

            <OptionRow
              checked={details.recitedAyatulKursi}
              onToggle={() => toggleDetail('recitedAyatulKursi')}
              label="Recited Ayatul Kursi"
              icon={<BookOpen className="w-5 h-5 text-primary-600 ml-2" />}
              hasInfo
              onInfoClick={() => setShowAyatulKursiInfo(true)}
            />
          </div>

          <button
            onClick={onClose}
            className="w-full mt-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-xl shadow-lg shadow-primary-500/30"
          >
            Done
          </button>
        </div>
      </div>

      {/* Adhkar Info Bottom Sheet */}
      {showAdhkarInfo && (
        <div
          className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-[60]"
          onClick={() => setShowAdhkarInfo(false)}
        >
          <div
            className="bg-surface-card w-full sm:w-96 sm:rounded-2xl rounded-t-2xl p-6 animate-slide-up max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🤲</span>
                <h3 className="text-lg font-semibold text-text-primary">Post-Prayer Adhkar</h3>
              </div>
              <button
                onClick={() => setShowAdhkarInfo(false)}
                className="p-2 rounded-full hover:bg-surface-muted transition-colors"
              >
                <X className="w-5 h-5 text-text-muted" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="bg-surface-muted rounded-xl p-4">
                <p className="text-sm text-text-muted mb-2">Arabic</p>
                <p className="font-arabic text-xl leading-loose text-right text-text-primary">
                  {ADHKAR_TEXT}
                </p>
              </div>

              <div className="bg-accent-100 rounded-xl p-4">
                <p className="text-sm text-primary-600 mb-2">Translation</p>
                <p className="text-text-secondary leading-relaxed">
                  {ADHKAR_TRANSLATION}
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowAdhkarInfo(false)}
              className="w-full mt-6 py-3 bg-accent-100 text-primary-600 font-semibold rounded-xl"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Ayatul Kursi Info Bottom Sheet */}
      {showAyatulKursiInfo && (
        <div
          className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-[60]"
          onClick={() => setShowAyatulKursiInfo(false)}
        >
          <div
            className="bg-surface-card w-full sm:w-96 sm:rounded-2xl rounded-t-2xl p-6 animate-slide-up max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-primary-600" />
                <h3 className="text-lg font-semibold text-text-primary">Ayatul Kursi</h3>
              </div>
              <button
                onClick={() => setShowAyatulKursiInfo(false)}
                className="p-2 rounded-full hover:bg-surface-muted transition-colors"
              >
                <X className="w-5 h-5 text-text-muted" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="bg-accent-100 rounded-xl p-4">
                <p className="text-sm text-primary-600 mb-2">Arabic (Surah Al-Baqarah 2:255)</p>
                <p className="font-arabic text-xl leading-loose text-right text-text-primary">
                  {AYATUL_KURSI_ARABIC}
                </p>
              </div>

              <div className="bg-accent-50 rounded-xl p-4">
                <p className="text-sm text-primary-500 mb-2">Translation</p>
                <p className="text-text-secondary leading-relaxed">
                  {AYATUL_KURSI_TRANSLATION}
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowAyatulKursiInfo(false)}
              className="w-full mt-6 py-3 bg-accent-100 text-primary-600 font-semibold rounded-xl"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
