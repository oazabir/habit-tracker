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
        checked ? 'bg-emerald-50 border-2 border-emerald-200' : 'bg-gray-50 border-2 border-transparent'
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          onClick={onToggle}
          className={`w-6 h-6 rounded-md flex items-center justify-center transition-all cursor-pointer ${
            checked ? 'bg-emerald-500' : 'border-2 border-gray-300'
          }`}
        >
          {checked && <Check className="w-4 h-4 text-white" strokeWidth={3} />}
        </div>
        <span
          onClick={onToggle}
          className={`font-medium cursor-pointer ${checked ? 'text-emerald-700' : 'text-gray-700'}`}
        >
          {label}
        </span>
        {icon}
      </div>
      {hasInfo && (
        <button
          onClick={onInfoClick}
          className="p-2 rounded-full hover:bg-gray-200 transition-colors"
        >
          <Info className="w-5 h-5 text-gray-400" />
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
          className="bg-white w-full sm:w-96 sm:rounded-2xl rounded-t-2xl p-6 animate-slide-up max-h-[80vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{getPrayerIcon()}</span>
              <h2 className="text-lg font-semibold text-gray-800">{habit.name}</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <p className="text-sm text-gray-500 mb-4">
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
              icon={<BookOpen className="w-5 h-5 text-blue-600 ml-2" />}
              hasInfo
              onInfoClick={() => setShowAyatulKursiInfo(true)}
            />
          </div>

          <button
            onClick={onClose}
            className="w-full mt-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/30"
          >
            Done
          </button>
        </div>
      </div>

      {/* Adhkar Info Modal */}
      {showAdhkarInfo && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4"
          onClick={() => setShowAdhkarInfo(false)}
        >
          <div
            className="bg-white w-full max-w-md rounded-2xl p-6 animate-slide-up max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🤲</span>
                <h3 className="text-lg font-semibold text-gray-800">Post-Prayer Adhkar</h3>
              </div>
              <button
                onClick={() => setShowAdhkarInfo(false)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-sm text-gray-500 mb-2">Arabic</p>
                <p className="font-arabic text-xl leading-loose text-right text-gray-800">
                  {ADHKAR_TEXT}
                </p>
              </div>

              <div className="bg-emerald-50 rounded-xl p-4">
                <p className="text-sm text-emerald-600 mb-2">Translation</p>
                <p className="text-gray-700 leading-relaxed">
                  {ADHKAR_TRANSLATION}
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowAdhkarInfo(false)}
              className="w-full mt-6 py-3 bg-emerald-100 text-emerald-700 font-semibold rounded-xl"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Ayatul Kursi Info Modal */}
      {showAyatulKursiInfo && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4"
          onClick={() => setShowAyatulKursiInfo(false)}
        >
          <div
            className="bg-white w-full max-w-md rounded-2xl p-6 animate-slide-up max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-800">Ayatul Kursi</h3>
              </div>
              <button
                onClick={() => setShowAyatulKursiInfo(false)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="bg-blue-50 rounded-xl p-4">
                <p className="text-sm text-blue-600 mb-2">Arabic (Surah Al-Baqarah 2:255)</p>
                <p className="font-arabic text-xl leading-loose text-right text-gray-800">
                  {AYATUL_KURSI_ARABIC}
                </p>
              </div>

              <div className="bg-emerald-50 rounded-xl p-4">
                <p className="text-sm text-emerald-600 mb-2">Translation</p>
                <p className="text-gray-700 leading-relaxed">
                  {AYATUL_KURSI_TRANSLATION}
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowAyatulKursiInfo(false)}
              className="w-full mt-6 py-3 bg-blue-100 text-blue-700 font-semibold rounded-xl"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
