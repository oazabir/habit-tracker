import { useState } from 'react';
import { ChevronRight, Hand } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrandMark, GroupIcon, PrayerIcon, QuranIcon } from './SvgIcons';

interface OnboardingProps {
  onComplete: (name: string) => void;
}

type StepItem = {
  title: string;
  description: string;
  Icon: ({ className }: { className?: string }) => JSX.Element;
};

export function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');

  const steps: StepItem[] = [
    {
      title: 'Assalamu Alaikum!',
      description: 'Welcome to Jannah Points, your daily companion for spiritual growth.',
      Icon: BrandMark,
    },
    {
      title: 'Track Your Prayers',
      description: 'Mark your five daily prayers and build a consistent habit of connecting with Allah.',
      Icon: PrayerIcon,
    },
    {
      title: 'Read Quran Daily',
      description: 'Set goals for Quran reading and track your progress day by day.',
      Icon: QuranIcon,
    },
    {
      title: 'Grow Together',
      description: 'Create groups with family and friends to encourage each other on this journey.',
      Icon: GroupIcon,
    },
  ];

  const currentStep = steps[step];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    }
  };

  const handleComplete = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onComplete(name.trim());
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-500 via-primary-600 to-primary-700 animate-gradient-shift flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-sm animate-fade-in-up">
        <div className="flex justify-center gap-2 mb-8">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all duration-500 ${
                index === step ? 'w-8 bg-white shadow-md shadow-white/40' : 'w-2 bg-white/40'
              }`}
            />
          ))}
        </div>

        <div className="bg-surface-card rounded-3xl p-8 shadow-2xl overflow-hidden min-h-[400px] flex flex-col justify-center animate-pop-in">
          <AnimatePresence mode="wait">
            {step < steps.length - 1 ? (
              <motion.div
                key={step}
                initial={{ y: 24, opacity: 0, scale: 0.96 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: -18, opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="flex flex-col items-center"
              >
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-accent-100 to-accent-200 mb-4 animate-float-soft">
                    <currentStep.Icon className="w-11 h-11 text-primary-600" />
                  </div>
                </div>

                <h1 className="text-2xl font-bold text-text-primary text-center mb-3">
                  {currentStep.title}
                </h1>
                <p className="text-text-secondary text-center mb-8">
                  {currentStep.description}
                </p>

                <button
                  onClick={handleNext}
                  className="w-full py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-primary-500/30 hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all"
                >
                  Continue
                  <ChevronRight className="w-5 h-5" />
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="final"
                initial={{ y: 24, opacity: 0, scale: 0.96 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: -18, opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="flex flex-col items-center w-full"
              >
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-accent-100 to-accent-200 mb-4 animate-float-soft">
                    <Hand className="w-10 h-10 text-primary-600" />
                  </div>
                </div>

                <h1 className="text-2xl font-bold text-text-primary text-center mb-3">
                  What&apos;s your name?
                </h1>
                <p className="text-text-secondary text-center mb-6">
                  Let&apos;s personalize your experience
                </p>

                <form onSubmit={handleComplete} className="w-full">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 border border-surface-muted rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all mb-4 bg-surface"
                    required
                  />
                  <button
                    type="submit"
                    disabled={!name.trim()}
                    className={`w-full py-4 rounded-xl font-semibold transition-all ${
                      name.trim()
                        ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/30 hover:scale-[1.01] active:scale-[0.99]'
                        : 'bg-surface-muted text-text-light'
                    }`}
                  >
                    Get Started
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {step < steps.length - 1 && (
          <button
            onClick={() => setStep(steps.length - 1)}
            className="w-full mt-4 py-3 text-white/80 hover:text-white font-medium transition-colors"
          >
            Skip
          </button>
        )}
      </div>
    </div>
  );
}
