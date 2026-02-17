import { User, Moon, Bell, HelpCircle, Info, Trash2 } from 'lucide-react';
import type { UserProfile } from '../types';

interface SettingsProps {
  user: UserProfile;
  onClearData: () => void;
}

interface SettingItem {
  icon: typeof User;
  label: string;
  description?: string;
  onClick: () => void;
  danger?: boolean;
}

interface SettingGroup {
  title: string;
  items: SettingItem[];
}

export function Settings({ user, onClearData }: SettingsProps) {
  const settingGroups: SettingGroup[] = [
    {
      title: 'Account',
      items: [
        {
          icon: User,
          label: 'Profile',
          description: user.name,
          onClick: () => {},
        },
      ],
    },
    {
      title: 'Preferences',
      items: [
        {
          icon: Moon,
          label: 'Appearance',
          description: 'Light mode',
          onClick: () => {},
        },
        {
          icon: Bell,
          label: 'Notifications',
          description: 'Prayer reminders',
          onClick: () => {},
        },
      ],
    },
    {
      title: 'Support',
      items: [
        {
          icon: HelpCircle,
          label: 'Help & FAQ',
          onClick: () => {},
        },
        {
          icon: Info,
          label: 'About Jannah Points',
          description: 'Version 1.0.0',
          onClick: () => {},
        },
      ],
    },
    {
      title: 'Data',
      items: [
        {
          icon: Trash2,
          label: 'Clear All Data',
          description: 'This cannot be undone',
          onClick: onClearData,
          danger: true,
        },
      ],
    },
  ];

  return (
    <div className="space-y-4">
      {/* Profile Card */}
      <div className="bg-surface-card rounded-2xl shadow-sm border border-accent-100 p-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-xl font-bold">
            {user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
          </div>
          <div>
            <h2 className="text-lg font-semibold text-text-primary">{user.name}</h2>
            <p className="text-sm text-text-muted">
              Member since {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      {/* Settings Groups */}
      {settingGroups.map((group) => (
        <div key={group.title} className="bg-surface-card rounded-2xl shadow-sm border border-accent-100 overflow-hidden">
          <h3 className="px-4 pt-4 pb-2 text-xs font-semibold text-text-light uppercase tracking-wider">
            {group.title}
          </h3>
          <div className="divide-y divide-accent-100">
            {group.items.map((item, index) => (
              <button
                key={index}
                onClick={item.onClick}
                className={`
                  w-full px-4 py-3 flex items-center gap-3 text-left
                  transition-colors hover:bg-surface-muted active:bg-accent-100
                  ${item.danger ? 'hover:bg-red-50 active:bg-red-100' : ''}
                `}
              >
                <div
                  className={`
                    w-8 h-8 rounded-lg flex items-center justify-center
                    ${item.danger ? 'bg-red-100' : 'bg-accent-100'}
                  `}
                >
                  <item.icon className={`w-4 h-4 ${item.danger ? 'text-red-500' : 'text-text-secondary'}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`font-medium ${item.danger ? 'text-red-600' : 'text-text-primary'}`}>
                    {item.label}
                  </p>
                  {item.description && (
                    <p className="text-sm text-text-muted">{item.description}</p>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      ))}

      {/* Footer */}
      <div className="text-center py-4">
        <p className="text-xs text-text-muted">
          Made with 💚 for the Ummah
        </p>
        <p className="text-xs text-text-light mt-1">
          بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
        </p>
      </div>
    </div>
  );
}
