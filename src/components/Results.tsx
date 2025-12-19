import { useState } from 'react';
import { Calendar as CalendarIcon, Scale, Camera, Ruler } from 'lucide-react';
import { WorkoutCalendar } from './results/WorkoutCalendar';
import { WeightTracker } from './results/WeightTracker';
import { PhotoProgress } from './results/PhotoProgress';
import { BodyMeasurements } from './results/BodyMeasurements';

type Tab = 'calendar' | 'weight' | 'photos' | 'measurements';

export function Results() {
  const [activeTab, setActiveTab] = useState<Tab>('calendar');

  const tabs = [
    { id: 'calendar' as const, label: 'Календарь', icon: CalendarIcon },
    { id: 'weight' as const, label: 'Весы', icon: Scale },
    { id: 'photos' as const, label: 'Фото', icon: Camera },
    { id: 'measurements' as const, label: 'Замеры', icon: Ruler },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <h1 className="text-white">Результаты</h1>

      {/* Tab Navigation */}
      <div className="glass rounded-2xl p-2 flex gap-2 overflow-x-auto">
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
              className={`flex-1 min-w-[120px] px-4 py-3 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 min-h-[44px] ${
                isActive
                  ? 'bg-[hsl(var(--primary))] text-white'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon className="w-5 h-5" aria-hidden="true" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      {activeTab === 'calendar' && <WorkoutCalendar />}
      {activeTab === 'weight' && <WeightTracker />}
      {activeTab === 'photos' && <PhotoProgress />}
      {activeTab === 'measurements' && <BodyMeasurements />}
    </div>
  );
}
