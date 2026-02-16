import { Crown, Check, Clock } from 'lucide-react';
import type { GroupMember, DailyTracking } from '../types';
import { calculateDayScore } from '../utils/stats';
import { formatDate } from '../utils/date';

interface GroupMemberCardProps {
  member: GroupMember;
  isCreator: boolean;
  tracking?: DailyTracking[];
  isCurrentUser?: boolean;
}

export function GroupMemberCard({
  member,
  isCreator,
  tracking,
  isCurrentUser,
}: GroupMemberCardProps) {
  const today = formatDate(new Date());
  const todayScore = tracking
    ? calculateDayScore(
        tracking.find((t) => t.date === today)?.habits || []
      )
    : 0;

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'from-emerald-400 to-emerald-600';
    if (score >= 75) return 'from-green-400 to-green-600';
    if (score >= 50) return 'from-yellow-400 to-yellow-600';
    if (score >= 25) return 'from-orange-400 to-orange-600';
    return 'from-gray-300 to-gray-400';
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-3 flex items-center gap-3">
      {/* Avatar */}
      <div className="relative">
        <div
          className={`
            w-12 h-12 rounded-full flex items-center justify-center
            bg-gradient-to-br ${isCurrentUser ? 'from-emerald-400 to-emerald-600' : 'from-blue-400 to-blue-600'}
            text-white font-semibold text-sm
          `}
        >
          {member.avatar ? (
            <img
              src={member.avatar}
              alt={member.name}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            getInitials(member.name)
          )}
        </div>
        {isCreator && (
          <div className="absolute -bottom-1 -right-1 bg-amber-400 rounded-full p-1">
            <Crown className="w-3 h-3 text-white" />
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h4 className="font-semibold text-gray-800 truncate">{member.name}</h4>
          {isCurrentUser && (
            <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">
              You
            </span>
          )}
        </div>
        <p className="text-xs text-gray-500 flex items-center gap-1">
          <Clock className="w-3 h-3" />
          Joined {new Date(member.joinedAt).toLocaleDateString()}
        </p>
      </div>

      {/* Score */}
      <div className="text-right">
        <div
          className={`
            inline-flex items-center gap-1 px-3 py-1 rounded-full
            bg-gradient-to-r ${getScoreColor(todayScore)}
            text-white text-sm font-semibold
          `}
        >
          {todayScore}
          {todayScore >= 50 && <Check className="w-3 h-3" />}
        </div>
        <p className="text-xs text-gray-400 mt-1">today</p>
      </div>
    </div>
  );
}
