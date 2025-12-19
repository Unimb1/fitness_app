import { Target } from 'lucide-react';
import { motion } from 'motion/react';

interface Goal {
  id: string;
  exercise: string;
  targetWeight: number;
  targetReps: number;
  targetSets: number;
  currentWeight: number;
  currentReps: number;
  deadline: string;
  color: string;
}

const mockGoals: Goal[] = [
  {
    id: '1',
    exercise: 'Жим лежа',
    targetWeight: 100,
    targetReps: 8,
    targetSets: 3,
    currentWeight: 85,
    currentReps: 8,
    deadline: '15 Фев 2026',
    color: '#34D399',
  },
  {
    id: '2',
    exercise: 'Приседания',
    targetWeight: 120,
    targetReps: 10,
    targetSets: 4,
    currentWeight: 100,
    currentReps: 10,
    deadline: '1 Мар 2026',
    color: '#60A5FA',
  },
  {
    id: '3',
    exercise: 'Становая тяга',
    targetWeight: 140,
    targetReps: 6,
    targetSets: 3,
    currentWeight: 110,
    currentReps: 6,
    deadline: '20 Мар 2026',
    color: '#F59E0B',
  },
];

export function MyGoals() {
  return (
    <div className="glass rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-xl bg-[hsl(var(--primary))]/10">
          <Target className="w-6 h-6 text-[hsl(var(--primary))]" />
        </div>
        <h2 className="text-white">Мои цели</h2>
      </div>

      <div className="space-y-4">
        {mockGoals.map((goal, index) => {
          const progress = (goal.currentWeight / goal.targetWeight) * 100;
          
          return (
            <motion.div
              key={goal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-strong rounded-xl p-5 hover:bg-white/5 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-white mb-1">{goal.exercise}</h3>
                  <p className="text-sm text-white/60">
                    Цель: {goal.targetWeight} кг × {goal.targetReps} повт × {goal.targetSets} подх
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-white/60">До</p>
                  <p className="text-sm text-white">{goal.deadline}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/60">Прогресс</span>
                  <span className="text-white">{Math.round(progress)}%</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 1, delay: index * 0.1 + 0.2 }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: goal.color }}
                  />
                </div>
                <p className="text-xs text-white/60">
                  Текущий результат: {goal.currentWeight} кг × {goal.currentReps} повт
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
