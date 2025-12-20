import { useState } from 'react';
import { Dumbbell, Calendar, Clock, Flame } from 'lucide-react';
import { motion } from 'motion/react';

interface Workout {
  id: string;
  name: string;
  date: string;
  duration: number;
  calories: number;
  exercises: number;
}

const mockWorkouts: Workout[] = [
  { id: '1', name: 'Грудь и трицепс', date: '5 Янв 2026', duration: 52, calories: 420, exercises: 6 },
  { id: '2', name: 'Спина и бицепс', date: '3 Янв 2026', duration: 48, calories: 390, exercises: 5 },
  { id: '3', name: 'Ноги', date: '1 Янв 2026', duration: 65, calories: 580, exercises: 7 },
  { id: '4', name: 'Плечи', date: '30 Дек 2025', duration: 45, calories: 350, exercises: 5 },
  { id: '5', name: 'Руки', date: '28 Дек 2025', duration: 40, calories: 310, exercises: 6 },
];

export function RecentWorkouts() {
  const [limit, setLimit] = useState('5');
  const [sortBy, setSortBy] = useState('date');

  const displayedWorkouts = mockWorkouts.slice(0, limit === 'all' ? undefined : parseInt(limit));

  const sortedWorkouts = [...displayedWorkouts].sort((a, b) => {
    if (sortBy === 'calories') return b.calories - a.calories;
    if (sortBy === 'duration') return b.duration - a.duration;
    return 0; // date is default order
  });

  return (
    <div className="glass rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-xl bg-[hsl(var(--primary))]/10">
          <Dumbbell className="w-6 h-6 text-[hsl(var(--primary))]" />
        </div>
        <h2 className="text-white">Последние тренировки</h2>
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-6 flex-wrap">
        <select
          value={limit}
          onChange={(e) => setLimit(e.target.value)}
          className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-[hsl(var(--primary))] transition-colors"
        >
          <option value="5">Последние 5</option>
          <option value="10">Последние 10</option>
          <option value="20">Последние 20</option>
          <option value="all">Все</option>
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-[hsl(var(--primary))] transition-colors"
        >
          <option value="date">По дате</option>
          <option value="calories">По калориям</option>
          <option value="duration">По времени</option>
        </select>
      </div>

      {/* Workouts List */}
      <div className="space-y-3">
        {sortedWorkouts.map((workout, index) => (
          <motion.div
            key={workout.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="glass-strong rounded-xl p-4 hover:bg-white/5 transition-all duration-300 cursor-pointer"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-white mb-1">{workout.name}</h3>
                <div className="flex items-center gap-2 text-sm text-white/60">
                  <Calendar className="w-4 h-4" />
                  <span>{workout.date}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-white/60">Упражнений</p>
                <p className="text-white">{workout.exercises}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-white/5">
                  <Clock className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <p className="text-xs text-white/60">Время</p>
                  <p className="text-sm text-white">{workout.duration} мин</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-white/5">
                  <Flame className="w-4 h-4 text-orange-400" />
                </div>
                <div>
                  <p className="text-xs text-white/60">Калории</p>
                  <p className="text-sm text-white">{workout.calories} ккал</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
