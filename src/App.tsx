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

  return (
    <div className="min-h-screen bg-surface pb-20">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-4 py-6 pt-safe">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Jannah Points</h1>
            <p className="text-primary-100 text-sm">Your daily spiritual companion</p>
          </div>
          <div className="text-3xl">🌙</div>
        </div>
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
