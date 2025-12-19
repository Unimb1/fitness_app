import { useState } from 'react';
import { Home } from './components/Home';
import { Workout } from './components/Workout';
import { Goals } from './components/Goals';
import { Results } from './components/Results';
import { Profile } from './components/Profile';
import { Home as HomeIcon, Dumbbell, Target, BarChart3, User } from 'lucide-react';

type Tab = 'home' | 'workout' | 'goals' | 'results' | 'profile';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('home');

  const tabs = [
    { id: 'home' as const, label: 'Главная', icon: HomeIcon },
    { id: 'workout' as const, label: 'Тренировка', icon: Dumbbell },
    { id: 'goals' as const, label: 'Цели', icon: Target },
    { id: 'results' as const, label: 'Результаты', icon: BarChart3 },
    { id: 'profile' as const, label: 'Профиль', icon: User },
  ];

  return (
    <div className="min-h-screen pb-24">
      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 py-6 pb-8">
        {activeTab === 'home' && <Home />}
        {activeTab === 'workout' && <Workout />}
        {activeTab === 'goals' && <Goals />}
        {activeTab === 'results' && <Results />}
        {activeTab === 'profile' && <Profile />}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 glass-strong border-t border-white/10 z-50">
        <div className="flex justify-around items-center h-20 px-4">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                aria-label={tab.label}
                aria-current={isActive ? 'page' : undefined}
                className={`flex flex-col items-center justify-center gap-1 min-w-[60px] min-h-[56px] px-3 py-2 rounded-xl transition-all duration-300 ${
                  isActive ? 'text-[hsl(var(--primary))] bg-white/5' : 'text-white/60'
                }`}
              >
                <Icon className={`w-6 h-6 transition-transform duration-300 ${isActive ? 'scale-110' : ''}`} aria-hidden="true" />
                <span className="text-[10px]">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}