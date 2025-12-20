import { useState } from 'react';
import { Plus, X, TrendingUp, Timer, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type ExerciseType = 'normal' | 'dropset';

interface WorkoutSet {
  id: string;
  weight: number;
  reps: number;
  drops?: { weight: number; reps: number }[];
}

interface Exercise {
  id: string;
  name: string;
  type: ExerciseType;
  sets: WorkoutSet[];
}

interface ExerciseBlockProps {
  exercise: Exercise;
  index: number;
  onUpdate: (name: string) => void;
  onUpdateType: (type: ExerciseType) => void;
  onRemove: () => void;
  onAddSet: () => void;
  onUpdateSet: (setId: string, field: 'weight' | 'reps', value: number) => void;
  onRemoveSet: (setId: string) => void;
  onAddDrop: (setId: string) => void;
  onUpdateDrop: (setId: string, dropIndex: number, field: 'weight' | 'reps', value: number) => void;
  onRemoveDrop: (setId: string, dropIndex: number) => void;
  restTime: number;
}

const muscleGroups = {
  'Грудь': ['Жим лежа', 'Жим гантелей', 'Разводка гантелей', 'Отжимания на брусьях'],
  'Спина': ['Подтягивания', 'Тяга штанги', 'Тяга гантели', 'Тяга верхнего блока'],
  'Ноги': ['Приседания', 'Жим ногами', 'Выпады', 'Разгибания ног'],
  'Плечи': ['Жим стоя', 'Разводка гантелей', 'Махи в стороны', 'Тяга к подбородку'],
  'Руки': ['Подъем на бицепс', 'Французский жим', 'Молотки', 'Разгибания на трицепс'],
};

export function ExerciseBlock({
  exercise,
  index,
  onUpdate,
  onUpdateType,
  onRemove,
  onAddSet,
  onUpdateSet,
  onRemoveSet,
  onAddDrop,
  onUpdateDrop,
  onRemoveDrop,
  restTime,
}: ExerciseBlockProps) {
  const [showPrediction, setShowPrediction] = useState(false);
  const [activeRestTimer, setActiveRestTimer] = useState<string | null>(null);
  const [restCountdown, setRestCountdown] = useState(restTime);

  const startRestTimer = (setId: string) => {
    setActiveRestTimer(setId);
    setRestCountdown(restTime);

    const interval = setInterval(() => {
      setRestCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setActiveRestTimer(null);
          return restTime;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`glass rounded-2xl p-6 relative ${
        exercise.type === 'dropset' ? 'ring-2 ring-orange-500/30' : ''
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <h3 className="text-white">Упражнение {index + 1}</h3>
          {exercise.type === 'dropset' && (
            <span className="px-2 py-1 bg-orange-500/20 text-orange-400 rounded-lg text-xs flex items-center gap-1">
              <Zap className="w-3 h-3" />
              Дропсет
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={onRemove}
          aria-label={`Удалить упражнение ${index + 1}`}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
        >
          <X className="w-5 h-5 text-white/60" aria-hidden="true" />
        </button>
      </div>

      {/* Exercise Type Toggle */}
      <div className="mb-4">
        <label className="block text-sm text-white/60 mb-2">Тип упражнения</label>
        <div className="flex gap-2" role="radiogroup" aria-label="Тип упражнения">
          <motion.button
            type="button"
            whileTap={{ scale: 0.95 }}
            onClick={() => onUpdateType('normal')}
            aria-pressed={exercise.type === 'normal'}
            className={`flex-1 px-4 py-2.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 min-h-[44px] ${
              exercise.type === 'normal'
                ? 'bg-[hsl(var(--primary))] text-white'
                : 'glass text-white/60 hover:bg-white/5'
            }`}
          >
            <span className="text-sm">Обычное</span>
          </motion.button>
          <motion.button
            type="button"
            whileTap={{ scale: 0.95 }}
            onClick={() => onUpdateType('dropset')}
            aria-pressed={exercise.type === 'dropset'}
            className={`flex-1 px-4 py-2.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 min-h-[44px] ${
              exercise.type === 'dropset'
                ? 'bg-orange-500 text-white'
                : 'glass text-white/60 hover:bg-white/5'
            }`}
          >
            <Zap className="w-4 h-4" aria-hidden="true" />
            <span className="text-sm">Дропсет</span>
          </motion.button>
        </div>
      </div>

      {/* Weight Prediction Button */}
      <div className="relative mb-4">
        <button
          type="button"
          onClick={() => setShowPrediction(!showPrediction)}
          aria-expanded={showPrediction}
          aria-label="Показать предсказание веса"
          className="glass-strong rounded-xl px-4 py-3 flex items-center gap-2 text-white/80 hover:text-white hover:bg-white/5 transition-all duration-300 min-h-[44px]"
        >
          <TrendingUp className="w-5 h-5 text-[hsl(var(--primary))]" aria-hidden="true" />
          <span>Предсказание веса</span>
        </button>

        <AnimatePresence>
          {showPrediction && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-0 mt-2 glass-strong rounded-xl p-4 z-10 min-w-[280px]"
            >
              <p className="text-sm text-white/60 mb-2">На основе истории тренировок:</p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-white/80">Рекомендуемый вес:</span>
                  <span className="text-[hsl(var(--primary))]">82.5 кг</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/80">Повторения:</span>
                  <span className="text-white">8-10</span>
                </div>
                <div className="text-xs text-white/40 mt-3">
                  Прогресс +2.5 кг от последней тренировки
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Exercise Selection */}
      <div className="mb-4">
        <label htmlFor={`exercise-select-${exercise.id}`} className="block text-sm text-white/60 mb-2">Выбор упражнения</label>
        <select
          id={`exercise-select-${exercise.id}`}
          value={exercise.name}
          onChange={(e) => onUpdate(e.target.value)}
          aria-label="Выберите упражнение"
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-[hsl(var(--primary))] transition-colors"
        >
          <option value="">Выберите упражнение</option>
          {Object.entries(muscleGroups).map(([group, exercises]) => (
            <optgroup key={group} label={group}>
              {exercises.map((ex) => (
                <option key={ex} value={ex}>
                  {ex}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </div>

      {/* Sets */}
      <div className="space-y-3 mb-3">
        {exercise.sets.map((set, setIndex) => (
          <motion.div
            key={set.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="glass-strong rounded-xl p-4"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-white/60 text-sm min-w-[80px]">Подход {setIndex + 1}</span>
              {exercise.sets.length > 1 && (
                <button
                  type="button"
                  onClick={() => onRemoveSet(set.id)}
                  aria-label={`Удалить подход ${setIndex + 1}`}
                  className="ml-auto p-1 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4 text-white/40" aria-hidden="true" />
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <label htmlFor={`weight-${set.id}`} className="block text-xs text-white/60 mb-2">Вес (кг)</label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onUpdateSet(set.id, 'weight', Math.max(0, set.weight - 2.5))}
                    aria-label={`Уменьшить вес на 2.5 кг для подхода ${setIndex + 1}`}
                    className="px-2 py-2 bg-white/5 border border-white/10 rounded-lg text-white hover:bg-white/10 transition-colors min-w-[36px]"
                  >
                    <span aria-hidden="true">-</span>
                  </button>
                  <input
                    id={`weight-${set.id}`}
                    type="number"
                    value={set.weight || ''}
                    onChange={(e) => onUpdateSet(set.id, 'weight', parseFloat(e.target.value) || 0)}
                    aria-label={`Вес в килограммах для подхода ${setIndex + 1}`}
                    className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-center outline-none focus:border-[hsl(var(--primary))] transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => onUpdateSet(set.id, 'weight', set.weight + 2.5)}
                    aria-label={`Увеличить вес на 2.5 кг для подхода ${setIndex + 1}`}
                    className="px-2 py-2 bg-white/5 border border-white/10 rounded-lg text-white hover:bg-white/10 transition-colors min-w-[36px]"
                  >
                    <span aria-hidden="true">+</span>
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor={`reps-${set.id}`} className="block text-xs text-white/60 mb-2">Повторения</label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onUpdateSet(set.id, 'reps', Math.max(0, set.reps - 1))}
                    aria-label={`Уменьшить количество повторений для подхода ${setIndex + 1}`}
                    className="px-2 py-2 bg-white/5 border border-white/10 rounded-lg text-white hover:bg-white/10 transition-colors min-w-[36px]"
                  >
                    <span aria-hidden="true">-</span>
                  </button>
                  <input
                    id={`reps-${set.id}`}
                    type="number"
                    value={set.reps || ''}
                    onChange={(e) => onUpdateSet(set.id, 'reps', parseInt(e.target.value) || 0)}
                    aria-label={`Количество повторений для подхода ${setIndex + 1}`}
                    className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-center outline-none focus:border-[hsl(var(--primary))] transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => onUpdateSet(set.id, 'reps', set.reps + 1)}
                    aria-label={`Увеличить количество повторений для подхода ${setIndex + 1}`}
                    className="px-2 py-2 bg-white/5 border border-white/10 rounded-lg text-white hover:bg-white/10 transition-colors min-w-[36px]"
                  >
                    <span aria-hidden="true">+</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Dropset Drops */}
            {exercise.type === 'dropset' && (
              <div className="space-y-2 mb-3 pl-4 border-l-2 border-orange-500/30">
                {set.drops?.map((drop, dropIndex) => (
                  <motion.div
                    key={dropIndex}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-orange-500/5 rounded-lg p-3"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-orange-400">Дроп {dropIndex + 1}</span>
                      <button
                        type="button"
                        onClick={() => onRemoveDrop(set.id, dropIndex)}
                        aria-label={`Удалить дроп ${dropIndex + 1}`}
                        className="p-1 hover:bg-white/10 rounded transition-colors"
                      >
                        <X className="w-3 h-3 text-white/40" aria-hidden="true" />
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="number"
                        value={drop.weight || ''}
                        onChange={(e) => onUpdateDrop(set.id, dropIndex, 'weight', parseFloat(e.target.value) || 0)}
                        placeholder="Вес"
                        className="px-2 py-1.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm text-center outline-none focus:border-orange-500 transition-colors"
                      />
                      <input
                        type="number"
                        value={drop.reps || ''}
                        onChange={(e) => onUpdateDrop(set.id, dropIndex, 'reps', parseInt(e.target.value) || 0)}
                        placeholder="Повт."
                        className="px-2 py-1.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm text-center outline-none focus:border-orange-500 transition-colors"
                      />
                    </div>
                  </motion.div>
                ))}
                <button
                  type="button"
                  onClick={() => onAddDrop(set.id)}
                  aria-label={`Добавить дроп к подходу ${setIndex + 1}`}
                  className="w-full px-3 py-2 bg-orange-500/10 border border-dashed border-orange-500/30 rounded-lg text-orange-400 hover:bg-orange-500/20 transition-colors flex items-center justify-center gap-1 text-xs"
                >
                  <Plus className="w-3 h-3" aria-hidden="true" />
                  <span>Добавить дроп</span>
                </button>
              </div>
            )}

            {/* Rest Timer */}
            <button
              type="button"
              onClick={() => startRestTimer(set.id)}
              disabled={activeRestTimer === set.id}
              aria-label={activeRestTimer === set.id ? `Отдых: ${restCountdown} секунд` : `Запустить таймер отдыха для подхода ${setIndex + 1}`}
              className="w-full px-4 py-2 bg-[hsl(var(--primary))]/10 border border-[hsl(var(--primary))]/20 rounded-lg text-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))]/20 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 min-h-[44px]"
            >
              <Timer className="w-4 h-4" aria-hidden="true" />
              <span>
                {activeRestTimer === set.id
                  ? `Отдых: ${restCountdown} сек`
                  : 'Перерыв'}
              </span>
            </button>
          </motion.div>
        ))}
      </div>

      {/* Add Set Button - More Prominent */}
      <button
        type="button"
        onClick={onAddSet}
        aria-label="Добавить новый подход"
        className="w-full px-4 py-3 bg-[hsl(var(--primary))]/10 border-2 border-dashed border-[hsl(var(--primary))]/30 rounded-xl flex items-center justify-center gap-2 text-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))]/20 hover:border-[hsl(var(--primary))]/50 transition-all duration-300 min-h-[44px]"
      >
        <Plus className="w-5 h-5" aria-hidden="true" />
        <span>Добавить подход</span>
      </button>
    </motion.div>
  );
}