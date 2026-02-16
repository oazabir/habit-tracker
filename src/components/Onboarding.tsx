import { useState } from 'react';
import { ChevronRight } from 'lucide-react';

interface OnboardingProps {
  onComplete: (name: string) => void;
}

export function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');

  const steps = [
    {
      title: 'Assalamu Alaikum!',
      description: 'Welcome to Jannah Points, your daily companion for spiritual growth.',
      emoji: '🌙',
    },
    {
      title: 'Track Your Prayers',
      description: 'Mark your five daily prayers and build a consistent habit of connecting with Allah.',
      emoji: '🕌',
    },
    {
      title: 'Read Quran Daily',
      description: 'Set goals for Quran reading and track your progress day by day.',
      emoji: '📖',
    },
    {
      title: 'Grow Together',
      description: 'Create groups with family and friends to encourage each other on this journey.',
      emoji: '👨‍👩‍👧‍👦',
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
    <div className="min-h-screen bg-gradient-to-b from-emerald-500 to-emerald-700 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-sm">
        {/* Progress dots */}
        <div className="flex justify-center gap-2 mb-8">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === step ? 'w-8 bg-white' : 'bg-white/40'
              }`}
            />
          ))}
        </div>

        {/* Content card */}
        <div className="bg-white rounded-3xl p-8 shadow-2xl">
          {step < steps.length - 1 ? (
            <>
              {/* Icon and emoji */}
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-emerald-100 to-emerald-200 mb-4">
                  <span className="text-4xl">{currentStep.emoji}</span>
                </div>
              </div>

              {/* Title and description */}
              <h1 className="text-2xl font-bold text-gray-800 text-center mb-3">
                {currentStep.title}
              </h1>
              <p className="text-gray-600 text-center mb-8">
                {currentStep.description}
              </p>

              {/* Next button */}
              <button
                onClick={handleNext}
                className="w-full py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/30"
              >
                Continue
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          ) : (
            <>
              {/* Final step - name input */}
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-purple-100 to-purple-200 mb-4">
                  <span className="text-4xl">👋</span>
                </div>
              </div>

              <h1 className="text-2xl font-bold text-gray-800 text-center mb-3">
                What's your name?
              </h1>
              <p className="text-gray-600 text-center mb-6">
                Let's personalize your experience
              </p>

              <form onSubmit={handleComplete}>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all mb-4"
                  required
                />
                <button
                  type="submit"
                  disabled={!name.trim()}
                  className={`w-full py-4 rounded-xl font-semibold transition-all ${
                    name.trim()
                      ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg shadow-purple-500/30'
                      : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  Get Started
                </button>
              </form>
            </>
          )}
        </div>

        {/* Skip button for early steps */}
        {step < steps.length - 1 && (
          <button
            onClick={() => setStep(steps.length - 1)}
            className="w-full mt-4 py-3 text-white/80 hover:text-white font-medium"
          >
            Skip
          </button>
        )}
      </div>
    </div>
  );
}
