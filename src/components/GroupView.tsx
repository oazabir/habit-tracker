import { useState } from 'react';
import { Users, Copy, UserPlus, LogOut, Share2, Check } from 'lucide-react';
import type { Group, DailyTracking } from '../types';
import { GroupMemberCard } from './GroupMemberCard';

interface GroupViewProps {
  group: Group;
  tracking: DailyTracking[];
  currentUserId: string;
  onLeave: () => void;
}

export function GroupView({ group, tracking, currentUserId, onLeave }: GroupViewProps) {
  const [copied, setCopied] = useState(false);
  const [showInvite, setShowInvite] = useState(false);

  const copyInviteCode = async () => {
    try {
      await navigator.clipboard.writeText(group.inviteCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const shareInvite = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Join ${group.name}`,
          text: `Join my habit tracking group "${group.name}" on Jannah Points!`,
          url: `${window.location.origin}?invite=${group.inviteCode}`,
        });
      } catch (err) {
        console.error('Failed to share:', err);
      }
    } else {
      copyInviteCode();
    }
  };

  const sortedMembers = [...group.members].sort((a, b) => {
    // Put current user first
    if (a.id === currentUserId) return -1;
    if (b.id === currentUserId) return 1;
    return 0;
  });

  return (
    <div className="bg-surface-card rounded-2xl shadow-sm border border-accent-100 p-4 mb-4 animate-fade-in-up">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-primary-600" />
          <h3 className="font-semibold text-text-primary">{group.name}</h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowInvite(!showInvite)}
            className="flex items-center gap-1 px-3 py-1.5 text-sm bg-accent-100 text-primary-600 rounded-full hover:bg-accent-200 transition-all hover:-translate-y-0.5"
          >
            <UserPlus className="w-4 h-4" />
            Invite
          </button>
          <button
            onClick={onLeave}
            className="p-2 text-text-light hover:text-red-500 transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {showInvite && (
        <div className="mb-4 p-3 bg-gradient-to-r from-accent-100 to-accent-50 rounded-xl border border-accent-200 animate-pop-in">
          <p className="text-sm text-primary-600 mb-2">Share this code to invite members:</p>
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-surface-card rounded-lg px-3 py-2 font-mono text-lg tracking-widest text-center text-primary-500 border border-accent-200">
              {group.inviteCode}
            </div>
            <button
              onClick={copyInviteCode}
              className={`
                p-2 rounded-lg transition-colors
                ${copied
                  ? 'bg-primary-500 text-white'
                  : 'bg-surface-card border border-accent-200 text-primary-500 hover:bg-accent-100'
                }
              `}
            >
              {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
            </button>
            <button
              onClick={shareInvite}
              className="p-2 rounded-lg bg-surface-card border border-accent-200 text-primary-500 hover:bg-accent-100"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {group.description && (
        <p className="text-sm text-text-muted mb-4">{group.description}</p>
      )}

      <div className="space-y-2">
        {sortedMembers.map((member, index) => (
          <GroupMemberCard
            key={member.id}
            member={member}
            isCreator={group.createdBy === member.id}
            tracking={member.id === currentUserId ? tracking : undefined}
            isCurrentUser={member.id === currentUserId}
            animationDelay={`${0.08 * (index + 1)}s`}
          />
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-accent-100">
        <p className="text-xs text-text-light text-center">
          {group.members.length} {group.members.length === 1 ? 'member' : 'members'} •
          Created {new Date(group.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
