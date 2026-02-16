import { useState } from 'react';
import { X, UserPlus, AlertCircle } from 'lucide-react';

interface JoinGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJoin: (inviteCode: string) => boolean;
}

export function JoinGroupModal({ isOpen, onClose, onJoin }: JoinGroupModalProps) {
  const [inviteCode, setInviteCode] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const code = inviteCode.trim().toUpperCase();
    if (!code) {
      setError('Please enter an invite code');
      return;
    }

    const success = onJoin(code);
    if (success) {
      setInviteCode('');
      onClose();
    } else {
      setError('Invalid invite code. Please try again.');
    }
  };

  const handleInputChange = (value: string) => {
    setInviteCode(value.toUpperCase());
    setError('');
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50">
      <div className="bg-white w-full sm:w-96 sm:rounded-2xl rounded-t-2xl p-6 animate-slide-up">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-purple-600" />
            <h2 className="text-lg font-semibold text-gray-800">Join Group</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Invite Code
            </label>
            <input
              type="text"
              value={inviteCode}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder="ABC123"
              maxLength={6}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-center text-2xl font-mono tracking-widest uppercase"
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-lg">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={!inviteCode.trim()}
            className={`
              w-full py-3 rounded-xl font-semibold transition-all
              ${inviteCode.trim()
                ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg shadow-purple-500/30 hover:shadow-xl'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }
            `}
          >
            Join Group
          </button>
        </form>

        <p className="mt-4 text-xs text-gray-400 text-center">
          Ask the group creator for a 6-character invite code
        </p>
      </div>
    </div>
  );
}
