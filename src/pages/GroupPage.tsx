import { useState } from 'react';
import { Handshake, LogIn, PlusCircle, Sparkles, Trophy, Users } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { GroupView } from '../components/GroupView';
import { CreateGroupModal } from '../components/CreateGroupModal';
import { JoinGroupModal } from '../components/JoinGroupModal';

export function GroupPage() {
  const {
    user,
    groups,
    currentGroupId,
    tracking,
    createGroup,
    joinGroup,
    leaveGroup,
    setCurrentGroup,
  } = useApp();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);

  const currentGroup = groups.find((g) => g.id === currentGroupId);

  const handleCreateGroup = (name: string, description?: string) => {
    createGroup(name, description);
  };

  const handleJoinGroup = (inviteCode: string): boolean => {
    return joinGroup(inviteCode);
  };

  const handleLeaveGroup = () => {
    if (currentGroupId) {
      leaveGroup(currentGroupId);
    }
  };

  if (!user) return null;

  if (groups.length === 0) {
    return (
      <div className="space-y-4">
        <div className="bg-surface-card rounded-2xl shadow-sm border border-accent-100 p-4 animate-fade-in-up stagger-1">
          <h1 className="text-xl font-bold text-text-primary mb-1">Groups</h1>
          <p className="text-sm text-text-muted">Connect with family and friends</p>
        </div>

        <div className="bg-surface-card rounded-2xl shadow-sm border border-accent-100 p-8 text-center animate-fade-in-up stagger-2">
          <div className="w-20 h-20 rounded-full bg-accent-100 flex items-center justify-center mx-auto mb-4 animate-float-soft">
            <Users className="w-10 h-10 text-primary-600" />
          </div>
          <h2 className="text-lg font-semibold text-text-primary mb-2">
            Grow Together
          </h2>
          <p className="text-text-secondary mb-6">
            Create a group with family and friends to track your habits together and keep each other motivated.
          </p>

          <div className="space-y-3">
            <button
              onClick={() => setShowCreateModal(true)}
              className="w-full py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-primary-500/30 hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all"
            >
              <PlusCircle className="w-5 h-5" />
              Create a Group
            </button>

            <button
              onClick={() => setShowJoinModal(true)}
              className="w-full py-3 bg-surface-muted text-text-primary font-semibold rounded-xl flex items-center justify-center gap-2 hover:bg-accent-100 transition-colors"
            >
              <LogIn className="w-5 h-5" />
              Join with Code
            </button>
          </div>
        </div>

        <div className="bg-gradient-to-br from-accent-100 to-accent-50 rounded-2xl p-4 border border-accent-200 animate-fade-in-up stagger-3">
          <h3 className="font-semibold text-primary-600 mb-3">Why join a group?</h3>
          <ul className="space-y-2 text-sm text-primary-500">
            <li className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>Stay accountable with loved ones</span>
            </li>
            <li className="flex items-center gap-2">
              <Handshake className="w-4 h-4" />
              <span>Motivate each other daily</span>
            </li>
            <li className="flex items-center gap-2">
              <Trophy className="w-4 h-4" />
              <span>Share achievements together</span>
            </li>
          </ul>
        </div>

        <CreateGroupModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreateGroup}
        />

        <JoinGroupModal
          isOpen={showJoinModal}
          onClose={() => setShowJoinModal(false)}
          onJoin={handleJoinGroup}
        />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-surface-card rounded-2xl shadow-sm border border-accent-100 p-4 animate-fade-in-up stagger-1">
        <h1 className="text-xl font-bold text-text-primary mb-1">Groups</h1>
        <p className="text-sm text-text-muted">Track progress with your community</p>
      </div>

      {groups.length > 1 && (
        <div className="bg-surface-card rounded-2xl shadow-sm border border-accent-100 p-2 animate-fade-in-up stagger-2">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {groups.map((group) => (
              <button
                key={group.id}
                onClick={() => setCurrentGroup(group.id)}
                className={`
                  flex-shrink-0 px-4 py-2 rounded-xl font-medium transition-all hover:-translate-y-0.5
                  ${group.id === currentGroupId
                    ? 'bg-primary-500 text-white shadow-md'
                    : 'bg-surface-muted text-text-secondary hover:bg-accent-100'
                  }
                `}
              >
                {group.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {currentGroup && (
        <div className="animate-fade-in-up stagger-3">
          <GroupView
            group={currentGroup}
            tracking={tracking}
            currentUserId={user.id}
            onLeave={handleLeaveGroup}
          />
        </div>
      )}

      <div className="flex gap-3 animate-fade-in-up stagger-4">
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex-1 py-3 bg-surface-muted text-text-primary font-semibold rounded-xl flex items-center justify-center gap-2 hover:bg-accent-100 transition-colors"
        >
          <PlusCircle className="w-5 h-5" />
          New Group
        </button>

        <button
          onClick={() => setShowJoinModal(true)}
          className="flex-1 py-3 bg-surface-muted text-text-primary font-semibold rounded-xl flex items-center justify-center gap-2 hover:bg-accent-100 transition-colors"
        >
          <LogIn className="w-5 h-5" />
          Join Group
        </button>
      </div>

      <CreateGroupModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreate={handleCreateGroup}
      />

      <JoinGroupModal
        isOpen={showJoinModal}
        onClose={() => setShowJoinModal(false)}
        onJoin={handleJoinGroup}
      />
    </div>
  );
}
