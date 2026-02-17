import { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Onboarding } from './components/Onboarding';
import { Navigation } from './components/Navigation';
import { DailyPage } from './pages/DailyPage';
import { WeeklyPage } from './pages/WeeklyPage';
import { GroupPage } from './pages/GroupPage';
import { Settings } from './components/Settings';
import { storage } from './utils/storage';

type Tab = 'daily' | 'weekly' | 'group' | 'settings';

function AppContent() {
  const { user, isLoading, initializeUser, currentGroupId } = useApp();
  const [activeTab, setActiveTab] = useState<Tab>('daily');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-primary-500" />
          <div className="text-primary-600 font-semibold">Loading...</div>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Onboarding onComplete={initializeUser} />;
  }

  const handleClearData = () => {
    if (window.confirm('Are you sure you want to clear all data? This cannot be undone.')) {
      storage.clearAll();
      window.location.reload();
    }
  };

  // Get greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return { text: 'Good Morning', emoji: '☀️' };
    if (hour < 17) return { text: 'Good Afternoon', emoji: '🌤️' };
    if (hour < 21) return { text: 'Good Evening', emoji: '🌅' };
    return { text: 'Good Night', emoji: '🌙' };
  };

  const greeting = getGreeting();

  return (
    <div className="min-h-screen bg-surface pb-20">
      {/* Header */}
      <header className="relative overflow-hidden bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 text-white pt-safe">
        {/* Decorative Islamic geometric pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-white rotate-45 -translate-x-8 -translate-y-8" />
          <div className="absolute top-4 right-0 w-24 h-24 border-r-2 border-t-2 border-white rotate-12 translate-x-6" />
          <div className="absolute bottom-0 left-1/4 w-20 h-20 border-2 border-white rounded-full -translate-y-4" />
          <div className="absolute top-1/2 right-1/4 w-16 h-16 border-2 border-white rotate-45 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-40 h-40 border-r-2 border-b-2 border-white -rotate-12 translate-x-12 translate-y-12" />
        </div>

        {/* Stars decoration */}
        <div className="absolute top-8 right-8 text-2xl opacity-40 animate-pulse-soft">✦</div>
        <div className="absolute top-16 right-16 text-sm opacity-30 animate-pulse-soft" style={{ animationDelay: '0.5s' }}>✧</div>
        <div className="absolute top-12 right-24 text-lg opacity-35 animate-pulse-soft" style={{ animationDelay: '1s' }}>✦</div>
        <div className="absolute top-6 right-32 text-xs opacity-25">✦</div>

        <div className="relative max-w-lg mx-auto px-4 py-6 animate-fade-in-down">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-primary-200 text-sm font-medium flex items-center gap-2">
                <span>{greeting.emoji}</span>
                <span>{greeting.text}</span>
              </p>
              <h1 className="text-2xl font-bold tracking-tight">Jannah Points</h1>
              <p className="text-primary-100 text-sm">Your daily spiritual companion</p>
            </div>
            <div className="relative">
              <div className="w-14 h-14 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/20">
                <span className="text-3xl">🕌</span>
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-accent-400 rounded-full flex items-center justify-center">
                <span className="text-xs">⭐</span>
              </div>
            </div>
          </div>

          {/* Bismillah decoration */}
          <div className="mt-4 flex items-center justify-center">
            <div className="flex items-center gap-3 px-4 py-2 bg-white/10 rounded-full backdrop-blur-sm border border-white/10">
              <span className="text-lg">﷽</span>
              <span className="text-xs text-primary-100 font-arabic">In the name of Allah</span>
            </div>
          </div>
        </div>

        {/* Bottom curved edge */}
        <div className="absolute bottom-0 left-0 right-0 h-4 bg-surface" style={{
          borderTopLeftRadius: '50% 100%',
          borderTopRightRadius: '50% 100%',
        }} />
      </header>

      {/* Main Content */}
      <main className="max-w-lg mx-auto px-4 py-4">
        {activeTab === 'daily' && <DailyPage />}
        {activeTab === 'weekly' && <WeeklyPage />}
        {activeTab === 'group' && <GroupPage />}
        {activeTab === 'settings' && (
          <Settings user={user} onClearData={handleClearData} />
        )}
      </main>

      {/* Bottom Navigation */}
      <Navigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
        hasGroup={!!currentGroupId}
      />
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
