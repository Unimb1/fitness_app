import { useState } from 'react';
import { Target, Plus } from 'lucide-react';
import { motion } from 'motion/react';

interface Goal {
  id: string;
  exercise: string;
  targetWeight: number;
  targetReps: number;
  targetSets: number;
  deadline: string;
  color: string;
}

const COLORS = [
  { name: 'Зеленый', value: '#34D399' },
  { name: 'Синий', value: '#60A5FA' },
  { name: 'Оранжевый', value: '#F59E0B' },
  { name: 'Фиолетовый', value: '#A78BFA' },
  { name: 'Розовый', value: '#F472B6' },
  { name: 'Красный', value: '#EF4444' },
];

export function Goals() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [exercise, setExercise] = useState('');
  const [targetWeight, setTargetWeight] = useState('');
  const [targetReps, setTargetReps] = useState('');
  const [targetSets, setTargetSets] = useState('');
  const [deadline, setDeadline] = useState('');
  const [selectedColor, setSelectedColor] = useState(COLORS[0].value);

  const addGoal = () => {
    if (!exercise || !targetWeight || !targetReps || !targetSets || !deadline) {
      alert('Пожалуйста, заполните все поля');
      return;
    }

    const newGoal: Goal = {
      id: `goal-${Date.now()}`,
      exercise,
      targetWeight: parseFloat(targetWeight),
      targetReps: parseInt(targetReps),
      targetSets: parseInt(targetSets),
      deadline,
      color: selectedColor,
    };

    setGoals([...goals, newGoal]);

    // Reset form
    setExercise('');
    setTargetWeight('');
    setTargetReps('');
    setTargetSets('');
    setDeadline('');
    setSelectedColor(COLORS[0].value);
  };

  const removeGoal = (id: string) => {
    setGoals(goals.filter((g) => g.id !== id));
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <h1 className="text-white">Цели</h1>

      {/* Add Goal Form */}
      <div className="glass rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-[hsl(var(--primary))]/10">
            <Target className="w-6 h-6 text-[hsl(var(--primary))]" />
          </div>
          <h2 className="text-white">Добавить цель</h2>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="exercise-select" className="block text-sm text-white/60 mb-2">Упражнение</label>
            <select
              id="exercise-select"
              value={exercise}
              onChange={(e) => setExercise(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-[hsl(var(--primary))] transition-colors"
            >
              <option value="">Выберите упражнение</option>
              <optgroup label="Грудь">
                <option>Жим лежа</option>
                <option>Жим гантелей</option>
                <option>Разводка гантелей</option>
              </optgroup>
              <optgroup label="Спина">
                <option>Подтягивания</option>
                <option>Тяга штанги</option>
                <option>Тяга гантели</option>
              </optgroup>
              <optgroup label="Ноги">
                <option>Приседания</option>
                <option>Жим ногами</option>
                <option>Выпады</option>
              </optgroup>
              <optgroup label="Плечи">
                <option>Жим стоя</option>
                <option>Разводка гантелей</option>
                <option>Махи в стороны</option>
              </optgroup>
              <optgroup label="Руки">
                <option>Подъем на бицепс</option>
                <option>Французский жим</option>
                <option>Молотки</option>
              </optgroup>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label htmlFor="target-weight" className="block text-sm text-white/60 mb-2">Целевой вес (кг)</label>
              <input
                id="target-weight"
                type="number"
                value={targetWeight}
                onChange={(e) => setTargetWeight(e.target.value)}
                placeholder="100"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 outline-none focus:border-[hsl(var(--primary))] transition-colors"
              />
            </div>

            <div>
              <label htmlFor="target-reps" className="block text-sm text-white/60 mb-2">Повторения</label>
              <input
                id="target-reps"
                type="number"
                value={targetReps}
                onChange={(e) => setTargetReps(e.target.value)}
                placeholder="8"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 outline-none focus:border-[hsl(var(--primary))] transition-colors"
              />
            </div>

            <div>
              <label htmlFor="target-sets" className="block text-sm text-white/60 mb-2">Подходы</label>
              <input
                id="target-sets"
                type="number"
                value={targetSets}
                onChange={(e) => setTargetSets(e.target.value)}
                placeholder="3"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 outline-none focus:border-[hsl(var(--primary))] transition-colors"
              />
            </div>
          </div>

          <div>
            <label htmlFor="goal-deadline" className="block text-sm text-white/60 mb-2">Дата достижения</label>
            <input
              id="goal-deadline"
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-[hsl(var(--primary))] transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm text-white/60 mb-2">Цвет цели</label>
            <div className="flex gap-3">
              {COLORS.map((color) => (
                <button
                  key={color.value}
                  type="button"
                  onClick={() => setSelectedColor(color.value)}
                  aria-label={`Выбрать цвет ${color.name.toLowerCase()}`}
                  aria-pressed={selectedColor === color.value}
                  className={`w-12 h-12 rounded-xl transition-all duration-300 ${
                    selectedColor === color.value
                      ? 'ring-2 ring-white ring-offset-2 ring-offset-[hsl(var(--background))] scale-110'
                      : 'hover:scale-105'
                  }`}
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={addGoal}
            aria-label="Сохранить новую цель"
            className="w-full px-6 py-4 bg-[hsl(var(--primary))] text-white rounded-xl hover:bg-[hsl(var(--primary))]/90 transition-colors flex items-center justify-center gap-2 min-h-[44px]"
          >
            <Plus className="w-5 h-5" aria-hidden="true" />
            <span>Сохранить цель</span>
          </button>
        </div>
      </div>

      {/* Goals List */}
      {goals.length > 0 && (
        <div className="glass rounded-2xl p-6">
          <h2 className="text-white mb-6">Активные цели ({goals.length})</h2>
          <div className="space-y-4">
            {goals.map((goal, index) => (
              <motion.div
                key={goal.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-strong rounded-xl p-5 hover:bg-white/5 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: goal.color }}
                    />
                    <div>
                      <h3 className="text-white">{goal.exercise}</h3>
                      <p className="text-sm text-white/60 mt-1">
                        {goal.targetWeight} кг × {goal.targetReps} повт × {goal.targetSets} подх
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeGoal(goal.id)}
                    aria-label={`Удалить цель: ${goal.exercise}`}
                    className="text-white/60 hover:text-red-400 transition-colors text-sm"
                  >
                    Удалить
                  </button>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-white/10">
                  <span className="text-sm text-white/60">Дедлайн:</span>
                  <span className="text-sm text-white">
                    {new Date(goal.deadline).toLocaleDateString('ru-RU', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
