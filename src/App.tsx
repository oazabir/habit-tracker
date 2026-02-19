import { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Onboarding } from './components/Onboarding';
import { Navigation } from './components/Navigation';
import { DailyPage } from './pages/DailyPage';
import { WeeklyPage } from './pages/WeeklyPage';
import { GroupPage } from './pages/GroupPage';
import { Settings } from './components/Settings';
import { BrandMark, GreetingIcon, SparkIcon } from './components/SvgIcons';
import { storage } from './utils/storage';

type Tab = 'daily' | 'weekly' | 'group' | 'settings';

function AppContent() {
  const { user, isLoading, initializeUser, currentGroupId } = useApp();
  const [activeTab, setActiveTab] = useState<Tab>('daily');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 animate-fade-in-up">
          <BrandMark className="w-16 h-16 animate-float-soft" />
          <div className="text-primary-600 font-semibold animate-shimmer">Loading...</div>
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

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return { text: 'Good Morning', hour };
    if (hour < 17) return { text: 'Good Afternoon', hour };
    if (hour < 21) return { text: 'Good Evening', hour };
    return { text: 'Good Night', hour };
  };

  const greeting = getGreeting();

  return (
    <div className="min-h-screen bg-surface pb-20">
      <header className="relative overflow-hidden bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 text-white pt-safe animate-gradient-shift">
        <div className="absolute inset-0 opacity-15">
          <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-white rotate-45 -translate-x-8 -translate-y-8 animate-spin-very-slow" />
          <div className="absolute top-4 right-0 w-24 h-24 border-r-2 border-t-2 border-white rotate-12 translate-x-6 animate-float-soft" />
          <div className="absolute bottom-0 left-1/4 w-20 h-20 border-2 border-white rounded-full -translate-y-4 animate-pulse-soft" />
          <div className="absolute top-1/2 right-1/4 w-16 h-16 border-2 border-white rotate-45 -translate-y-1/2 animate-spin-very-slow" />
          <div className="absolute bottom-0 right-0 w-40 h-40 border-r-2 border-b-2 border-white -rotate-12 translate-x-12 translate-y-12 animate-float-soft" />
        </div>

        <div className="absolute top-8 right-8 opacity-40 animate-float-soft">
          <SparkIcon className="w-6 h-6 text-white" />
        </div>
        <div className="absolute top-16 right-16 opacity-30 animate-float-soft stagger-2">
          <SparkIcon className="w-4 h-4 text-white" />
        </div>
        <div className="absolute top-12 right-24 opacity-35 animate-float-soft stagger-4">
          <SparkIcon className="w-5 h-5 text-white" />
        </div>

        <div className="relative max-w-lg mx-auto px-4 py-6 animate-fade-in-down">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-primary-200 text-sm font-medium flex items-center gap-2">
                <GreetingIcon hour={greeting.hour} className="w-4 h-4" />
                <span>{greeting.text}</span>
              </p>
              <h1 className="text-2xl font-bold tracking-tight">Jannah Points</h1>
              <p className="text-primary-100 text-sm">Your daily spiritual companion</p>
            </div>
            <div className="relative">
              <div className="w-14 h-14 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/20 animate-float-soft">
                <BrandMark className="w-10 h-10" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-accent-400 rounded-full flex items-center justify-center animate-pulse-soft">
                <SparkIcon className="w-3 h-3 text-white" />
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-center animate-fade-in-up stagger-3">
            <div className="flex items-center gap-3 px-4 py-2 bg-white/10 rounded-full backdrop-blur-sm border border-white/10">
              <BrandMark className="w-6 h-6" />
              <span className="text-xs text-primary-100">In the name of Allah</span>
            </div>
          </div>
        </div>

        <div
          className="absolute bottom-0 left-0 right-0 h-4 bg-surface"
          style={{
            borderTopLeftRadius: '50% 100%',
            borderTopRightRadius: '50% 100%',
          }}
        />
      </header>

      <main className="max-w-lg mx-auto px-4 py-4">
        <div key={activeTab} className="animate-page-in">
          {activeTab === 'daily' && <DailyPage />}
          {activeTab === 'weekly' && <WeeklyPage />}
          {activeTab === 'group' && <GroupPage />}
          {activeTab === 'settings' && (
            <Settings user={user} onClearData={handleClearData} />
          )}
        </div>
      </main>

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
