import { Home, Calendar, Users, Settings } from 'lucide-react';

type Tab = 'daily' | 'weekly' | 'group' | 'settings';

interface NavigationProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
  hasGroup: boolean;
}

export function Navigation({ activeTab, onTabChange, hasGroup }: NavigationProps) {
  const tabs = [
    { id: 'daily' as Tab, icon: Home, label: 'Today' },
    { id: 'weekly' as Tab, icon: Calendar, label: 'Weekly' },
    { id: 'group' as Tab, icon: Users, label: 'Group' },
    { id: 'settings' as Tab, icon: Settings, label: 'Settings' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-surface-card/95 backdrop-blur-sm border-t border-accent-100 safe-area-bottom animate-fade-in-up">
      <div className="max-w-lg mx-auto">
        <div className="flex justify-around py-2">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`
                  flex flex-col items-center py-2 px-4 rounded-xl transition-all duration-300
                  touch-manipulation
                  ${isActive ? 'text-primary-500 -translate-y-0.5' : 'text-text-light'}
                `}
              >
                <div className="relative">
                  <tab.icon className={`w-6 h-6 transition-transform duration-300 ${isActive ? 'stroke-2 scale-110' : ''}`} />
                  {tab.id === 'group' && hasGroup && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary-500 rounded-full animate-pulse-soft" />
                  )}
                </div>
                <span className={`text-xs mt-1 transition-all ${isActive ? 'font-semibold' : ''}`}>
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
