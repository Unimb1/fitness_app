import { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { WidgetGrid } from './home/WidgetGrid';
import { ProgressChart } from './home/ProgressChart';
import { MyGoals } from './home/MyGoals';
import { RecentWorkouts } from './home/RecentWorkouts';

export function Home() {
  return (
    <div className="space-y-6">
      <h1 className="text-white">Главная</h1>
      
      <DndProvider backend={HTML5Backend}>
        <WidgetGrid />
      </DndProvider>

      <ProgressChart />
      
      <MyGoals />
      
      <RecentWorkouts />
    </div>
  );
}
