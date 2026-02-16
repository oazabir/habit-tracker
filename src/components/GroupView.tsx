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
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-purple-600" />
          <h3 className="font-semibold text-gray-800">{group.name}</h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowInvite(!showInvite)}
            className="flex items-center gap-1 px-3 py-1.5 text-sm bg-purple-100 text-purple-700 rounded-full hover:bg-purple-200 transition-colors"
          >
            <UserPlus className="w-4 h-4" />
            Invite
          </button>
          <button
            onClick={onLeave}
            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {showInvite && (
        <div className="mb-4 p-3 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl border border-purple-100">
          <p className="text-sm text-purple-800 mb-2">Share this code to invite members:</p>
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-white rounded-lg px-3 py-2 font-mono text-lg tracking-widest text-center text-purple-700 border border-purple-200">
              {group.inviteCode}
            </div>
            <button
              onClick={copyInviteCode}
              className={`
                p-2 rounded-lg transition-colors
                ${copied
                  ? 'bg-green-500 text-white'
                  : 'bg-white border border-purple-200 text-purple-600 hover:bg-purple-50'
                }
              `}
            >
              {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
            </button>
            <button
              onClick={shareInvite}
              className="p-2 rounded-lg bg-white border border-purple-200 text-purple-600 hover:bg-purple-50"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {group.description && (
        <p className="text-sm text-gray-500 mb-4">{group.description}</p>
      )}

      <div className="space-y-2">
        {sortedMembers.map((member) => (
          <GroupMemberCard
            key={member.id}
            member={member}
            isCreator={group.createdBy === member.id}
            tracking={member.id === currentUserId ? tracking : undefined}
            isCurrentUser={member.id === currentUserId}
          />
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100">
        <p className="text-xs text-gray-400 text-center">
          {group.members.length} {group.members.length === 1 ? 'member' : 'members'} •
          Created {new Date(group.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
