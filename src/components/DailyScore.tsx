import { getEncouragingMessage } from '../utils/stats';

interface DailyScoreProps {
  score: number;
}

export function DailyScore({ score }: DailyScoreProps) {
  const getMessage = () => getEncouragingMessage(score);

  const getScoreColor = () => {
    if (score >= 90) return 'from-emerald-400 to-emerald-600';
    if (score >= 75) return 'from-green-400 to-green-600';
    if (score >= 50) return 'from-yellow-400 to-yellow-600';
    if (score >= 25) return 'from-orange-400 to-orange-600';
    return 'from-gray-400 to-gray-600';
  };

  const getRingColor = () => {
    if (score >= 90) return 'text-emerald-500';
    if (score >= 75) return 'text-green-500';
    if (score >= 50) return 'text-yellow-500';
    if (score >= 25) return 'text-orange-500';
    return 'text-gray-400';
  };

  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center py-6">
      <div className="relative">
        <svg className="w-32 h-32 transform -rotate-90">
          {/* Background circle */}
          <circle
            cx="64"
            cy="64"
            r="45"
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            className="text-gray-200"
          />
          {/* Progress circle */}
          <circle
            cx="64"
            cy="64"
            r="45"
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            className={getRingColor()}
            style={{
              strokeDasharray: circumference,
              strokeDashoffset,
              transition: 'stroke-dashoffset 0.5s ease-in-out',
            }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-3xl font-bold bg-gradient-to-r ${getScoreColor()} bg-clip-text text-transparent`}>
            {score}
          </span>
          <span className="text-xs text-gray-500 font-medium">points</span>
        </div>
      </div>

      <p className="mt-3 text-center font-medium text-gray-700">
        {getMessage()}
      </p>

      {score >= 100 && (
        <div className="mt-2 flex items-center gap-1">
          <span className="text-2xl animate-bounce">🎉</span>
          <span className="text-sm font-semibold text-emerald-600">
            Perfect Day!
          </span>
          <span className="text-2xl animate-bounce">🎉</span>
        </div>
      )}
    </div>
  );
}
