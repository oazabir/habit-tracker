import {
  BookOpen,
  CloudSun,
  HandHeart,
  Moon,
  MoonStar,
  Sparkles,
  Sunrise,
  Sun,
  Sunset,
  Users,
} from 'lucide-react';

interface IconProps {
  className?: string;
}

interface PrayerIconProps extends IconProps {
  prayerName?: string;
}

export function BrandMark({ className = 'w-12 h-12' }: IconProps) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      fill="none"
      role="img"
      aria-label="Jannah Points logo"
    >
      <defs>
        <linearGradient id="brand-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#6a9f6a" />
          <stop offset="100%" stopColor="#2d4a33" />
        </linearGradient>
        <linearGradient id="brand-arch" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#dcebdc" />
        </linearGradient>
      </defs>
      <circle cx="60" cy="60" r="56" fill="url(#brand-bg)" />
      <circle cx="47" cy="41" r="18" fill="#ffffff" fillOpacity="0.9" />
      <circle cx="53" cy="39" r="16" fill="#3a5a40" />
      <path
        d="M78 24 L81 32 L89 32 L83 37 L85 45 L78 40 L71 45 L73 37 L67 32 L75 32 Z"
        fill="#ffffff"
      />
      <path
        d="M35 84 C35 67 45 56 60 56 C75 56 85 67 85 84"
        stroke="url(#brand-arch)"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <rect x="44" y="82" width="32" height="6" rx="3" fill="#dcebdc" />
      <rect x="58" y="48" width="4" height="20" rx="2" fill="#dcebdc" />
      <circle cx="60" cy="46" r="4" fill="#ffffff" />
    </svg>
  );
}

export function PrayerIcon({ prayerName, className = 'w-5 h-5' }: PrayerIconProps) {
  if (prayerName === 'fajr') return <Sunrise className={className} />;
  if (prayerName === 'dhuhr') return <Sun className={className} />;
  if (prayerName === 'asr') return <CloudSun className={className} />;
  if (prayerName === 'maghrib') return <Sunset className={className} />;
  return <Moon className={className} />;
}

export function QuranIcon({ className = 'w-5 h-5' }: IconProps) {
  return <BookOpen className={className} />;
}

export function DuaIcon({ className = 'w-5 h-5' }: IconProps) {
  return <HandHeart className={className} />;
}

export function GroupIcon({ className = 'w-5 h-5' }: IconProps) {
  return <Users className={className} />;
}

export function SparkIcon({ className = 'w-4 h-4' }: IconProps) {
  return <Sparkles className={className} />;
}

export function GreetingIcon({ className = 'w-5 h-5', hour }: IconProps & { hour: number }) {
  if (hour < 12) return <Sunrise className={className} />;
  if (hour < 17) return <Sun className={className} />;
  if (hour < 21) return <Sunset className={className} />;
  return <MoonStar className={className} />;
}
