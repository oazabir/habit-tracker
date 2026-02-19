import React from 'react';
import type { UserProfile } from '../types';

interface SettingsProps {
  user: UserProfile;
  onClearData: () => void;
}

export function Settings({ user, onClearData }: SettingsProps) {
  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Profile</h2>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center text-2xl font-bold text-primary-600">
            {user.avatar || user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">{user.name}</h3>
            <p className="text-gray-500 text-sm">Member since {new Date(user.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold text-red-600 mb-4">Danger Zone</h2>
        <p className="text-gray-600 mb-4 text-sm">
          Clearing your data will remove all your progress, habits, and group memberships. This action cannot be undone.
        </p>
        <button
          onClick={onClearData}
          className="w-full py-3 px-4 bg-red-50 text-red-600 rounded-xl font-medium hover:bg-red-100 transition-colors active:scale-95"
        >
          Clear All Data
        </button>
      </div>

      <div className="text-center text-gray-400 text-xs py-4">
        <p>Jannah Points v1.0.0</p>
        <p className="mt-1">Made with ❤️ for the Ummah</p>
      </div>
    </div>
  );
}
