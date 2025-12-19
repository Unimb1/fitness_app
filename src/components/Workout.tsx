import { useState, useEffect } from 'react';
import { Plus, CheckCircle, Pause, Play, RotateCcw, Zap, Sparkles, Trophy, Clock, Dumbbell } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ExerciseBlock } from './workout/ExerciseBlock';

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

// MET values for common exercises
const exerciseMET: Record<string, number> = {
  'Жим лежа': 6.0,
  'Жим гантелей': 6.0,
  'Разводка гантелей': 5.0,
  'Отжимания на брусьях': 8.0,
  'Подтягивания': 8.0,
  'Тяга штанги': 6.0,
  'Тяга гантели': 5.5,
  'Тяга верхнего блока': 5.0,
  'Приседания': 8.0,
  'Жим ногами': 7.0,
  'Выпады': 6.5,
  'Разгибания ног': 5.0,
  'Жим стоя': 6.0,
  'Разводка гантелей': 5.0,
  'Махи в стороны': 4.5,
  'Тяга к подбородку': 5.5,
  'Подъем на бицепс': 5.0,
  'Французский жим': 5.0,
  'Молотки': 5.0,
  'Разгибания на трицепс': 4.5,
};

export function Workout() {
  const [workoutName, setWorkoutName] = useState('');
  const [workoutDate, setWorkoutDate] = useState(new Date().toISOString().split('T')[0]);
  const [duration, setDuration] = useState(45);
  const [restTime, setRestTime] = useState(90);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [userWeight, setUserWeight] = useState(75); // User weight in kg for MET calculation
  
  // Timer state
  const [workoutStarted, setWorkoutStarted] = useState(false);
  const [workoutPaused, setWorkoutPaused] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Timer effect
  useEffect(() => {
    if (!workoutStarted || workoutPaused) return;

    const interval = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [workoutStarted, workoutPaused]);

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes
        .toString()
        .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const addExercise = () => {
    const newExercise: Exercise = {
      id: `exercise-${Date.now()}`,
      name: '',
      type: 'normal',
      sets: [{ id: `set-${Date.now()}`, weight: 0, reps: 0 }],
    };
    setExercises([...exercises, newExercise]);
  };

  const updateExercise = (id: string, name: string) => {
    setExercises(exercises.map(ex => ex.id === id ? { ...ex, name } : ex));
  };

  const updateExerciseType = (id: string, type: ExerciseType) => {
    setExercises(exercises.map(ex => ex.id === id ? { ...ex, type } : ex));
  };

  const removeExercise = (id: string) => {
    setExercises(exercises.filter(ex => ex.id !== id));
  };

  const addSet = (exerciseId: string) => {
    setExercises(exercises.map(ex => {
      if (ex.id === exerciseId) {
        return {
          ...ex,
          sets: [...ex.sets, { id: `set-${Date.now()}`, weight: 0, reps: 0 }],
        };
      }
      return ex;
    }));
  };

  const updateSet = (exerciseId: string, setId: string, field: 'weight' | 'reps', value: number) => {
    setExercises(exercises.map(ex => {
      if (ex.id === exerciseId) {
        return {
          ...ex,
          sets: ex.sets.map(set => set.id === setId ? { ...set, [field]: value } : set),
        };
      }
      return ex;
    }));
  };

  const removeSet = (exerciseId: string, setId: string) => {
    setExercises(exercises.map(ex => {
      if (ex.id === exerciseId && ex.sets.length > 1) {
        return {
          ...ex,
          sets: ex.sets.filter(set => set.id !== setId),
        };
      }
      return ex;
    }));
  };

  const addDrop = (exerciseId: string, setId: string) => {
    setExercises(exercises.map(ex => {
      if (ex.id === exerciseId) {
        return {
          ...ex,
          sets: ex.sets.map(set => {
            if (set.id === setId) {
              return {
                ...set,
                drops: [...(set.drops || []), { weight: 0, reps: 0 }],
              };
            }
            return set;
          }),
        };
      }
      return ex;
    }));
  };

  const updateDrop = (exerciseId: string, setId: string, dropIndex: number, field: 'weight' | 'reps', value: number) => {
    setExercises(exercises.map(ex => {
      if (ex.id === exerciseId) {
        return {
          ...ex,
          sets: ex.sets.map(set => {
            if (set.id === setId && set.drops) {
              const newDrops = [...set.drops];
              newDrops[dropIndex] = { ...newDrops[dropIndex], [field]: value };
              return { ...set, drops: newDrops };
            }
            return set;
          }),
        };
      }
      return ex;
    }));
  };

  const removeDrop = (exerciseId: string, setId: string, dropIndex: number) => {
    setExercises(exercises.map(ex => {
      if (ex.id === exerciseId) {
        return {
          ...ex,
          sets: ex.sets.map(set => {
            if (set.id === setId && set.drops) {
              return { ...set, drops: set.drops.filter((_, i) => i !== dropIndex) };
            }
            return set;
          }),
        };
      }
      return ex;
    }));
  };

  const startWorkout = () => {
    setWorkoutStarted(true);
    setWorkoutPaused(false);
  };

  const togglePause = () => {
    setWorkoutPaused(!workoutPaused);
  };

  const resetTimer = () => {
    setElapsedSeconds(0);
  };

  const saveWorkout = async () => {
    try {
      const workoutData = {
        name: workoutName || 'Тренировка',
        date: workoutDate,
        duration: elapsedSeconds,
        restTime,
        exercises: exercises.map(ex => ({
          name: ex.name,
          type: ex.type,
          sets: ex.sets.map(set => ({
            weight: set.weight,
            reps: set.reps,
            drops: set.drops || []
          }))
        })),
        caloriesBurned: calculateCaloriesBurned(),
        isDraft: true
      };

      // Import API dynamically to avoid circular dependencies
      const { workoutsAPI } = await import('../utils/api');
      await workoutsAPI.create(workoutData);
      
      alert('Тренировка сохранена!');
      // Reset
      setWorkoutStarted(false);
      setElapsedSeconds(0);
      setExercises([]);
      setWorkoutName('');
    } catch (error) {
      console.error('Error saving workout:', error);
      alert('Ошибка при сохранении тренировки');
    }
  };

  const calculateCaloriesBurned = () => {
    // Calculate calories burned using MET formula
    // Calories = MET × weight(kg) × time(hours)
    const totalMinutes = elapsedSeconds / 60;
    const hours = totalMinutes / 60;
    
    // Average MET for weight training is around 6.0
    let totalMET = 0;
    exercises.forEach(ex => {
      const metValue = exerciseMET[ex.name] || 6.0; // Default to 6.0 if not found
      totalMET += metValue * ex.sets.length;
    });
    
    const avgMET = exercises.length > 0 ? totalMET / exercises.length : 6.0;
    const caloriesBurned = avgMET * userWeight * hours;
    return Math.round(caloriesBurned);
  };

  const finishWorkout = async () => {
    setShowConfirmation(false);
    setShowSuccessModal(true);
    
    try {
      const workoutData = {
        name: workoutName || 'Тренировка',
        date: workoutDate,
        duration: elapsedSeconds,
        restTime,
        exercises: exercises.map(ex => ({
          name: ex.name,
          type: ex.type,
          sets: ex.sets.map(set => ({
            weight: set.weight,
            reps: set.reps,
            drops: set.drops || []
          }))
        })),
        caloriesBurned: calculateCaloriesBurned(),
        isDraft: false
      };

      const { workoutsAPI } = await import('../utils/api');
      await workoutsAPI.create(workoutData);
    } catch (error) {
      console.error('Error finishing workout:', error);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-6">
      <div className="flex items-center justify-between">
        <h1 className="text-white">Тренировка</h1>
        
        {/* Live Timer Display */}
        {workoutStarted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-strong rounded-xl px-4 py-2 flex items-center gap-3"
          >
            <div className={`w-2 h-2 rounded-full ${workoutPaused ? 'bg-orange-400' : 'bg-green-400'} animate-pulse`} />
            <span className="text-white font-mono text-lg">{formatTime(elapsedSeconds)}</span>
            <div className="flex gap-1">
              <button
                onClick={togglePause}
                className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                aria-label={workoutPaused ? 'Продолжить тренировку' : 'Поставить на паузу'}
                title={workoutPaused ? 'Продолжить' : 'Пауза'}
              >
                {workoutPaused ? <Play className="w-4 h-4 text-green-400" aria-hidden="true" /> : <Pause className="w-4 h-4 text-orange-400" aria-hidden="true" />}
              </button>
              <button
                onClick={resetTimer}
                className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                aria-label="Сбросить таймер"
                title="Сброс"
              >
                <RotateCcw className="w-4 h-4 text-white/60" aria-hidden="true" />
              </button>
            </div>
          </motion.div>
        )}
      </div>

      {/* Main Parameters */}
      <div className="glass rounded-2xl p-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="workout-date" className="block text-sm text-white/60 mb-2">Дата тренировки</label>
            <input
              id="workout-date"
              type="date"
              value={workoutDate}
              onChange={(e) => setWorkoutDate(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-[hsl(var(--primary))] transition-colors"
            />
          </div>

          <div>
            <label htmlFor="workout-name" className="block text-sm text-white/60 mb-2">Название тренировки</label>
            <input
              id="workout-name"
              type="text"
              value={workoutName}
              onChange={(e) => setWorkoutName(e.target.value)}
              placeholder="Например: Грудь и трицепс"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 outline-none focus:border-[hsl(var(--primary))] transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="rest-time" className="block text-sm text-white/60 mb-2">Время отдыха (сек)</label>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setRestTime(Math.max(0, restTime - 15))}
                aria-label="Уменьшить время отдыха на 15 секунд"
                className="px-3 py-3 bg-white/5 border border-white/10 rounded-xl text-white hover:bg-white/10 transition-colors min-w-[44px]"
              >
                <span aria-hidden="true">-</span>
              </button>
              <input
                id="rest-time"
                type="number"
                value={restTime}
                onChange={(e) => setRestTime(parseInt(e.target.value) || 0)}
                aria-label="Время отдыха в секундах"
                className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-center outline-none focus:border-[hsl(var(--primary))] transition-colors"
              />
              <button
                onClick={() => setRestTime(restTime + 15)}
                aria-label="Увеличить время отдыха на 15 секунд"
                className="px-3 py-3 bg-white/5 border border-white/10 rounded-xl text-white hover:bg-white/10 transition-colors min-w-[44px]"
              >
                <span aria-hidden="true">+</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Exercises */}
      <AnimatePresence mode="popLayout">
        {exercises.map((exercise, index) => (
          <ExerciseBlock
            key={exercise.id}
            exercise={exercise}
            index={index}
            onUpdate={(name) => updateExercise(exercise.id, name)}
            onUpdateType={(type) => updateExerciseType(exercise.id, type)}
            onRemove={() => removeExercise(exercise.id)}
            onAddSet={() => addSet(exercise.id)}
            onUpdateSet={(setId, field, value) => updateSet(exercise.id, setId, field, value)}
            onRemoveSet={(setId) => removeSet(exercise.id, setId)}
            onAddDrop={(setId) => addDrop(exercise.id, setId)}
            onUpdateDrop={(setId, dropIndex, field, value) => updateDrop(exercise.id, setId, dropIndex, field, value)}
            onRemoveDrop={(setId, dropIndex) => removeDrop(exercise.id, setId, dropIndex)}
            restTime={restTime}
          />
        ))}
      </AnimatePresence>

      {/* Add Exercise Button */}
      <button
        type="button"
        onClick={addExercise}
        aria-label="Добавить новое упражнение"
        className="w-full glass rounded-xl px-6 py-4 flex items-center justify-center gap-2 text-white hover:bg-white/5 transition-all duration-300 min-h-[44px]"
      >
        <Plus className="w-5 h-5" aria-hidden="true" />
        <span>Добавить упражнение</span>
      </button>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {!workoutStarted ? (
          <button
            type="button"
            onClick={startWorkout}
            disabled={exercises.length === 0}
            aria-label="Начать тренировку"
            className="px-6 py-4 bg-[hsl(var(--primary))] text-white rounded-xl hover:bg-[hsl(var(--primary))]/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-h-[44px]"
          >
            <Play className="w-5 h-5" aria-hidden="true" />
            <span>Начать тренировку</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setShowConfirmation(true)}
            aria-label="Завершить тренировку"
            className="px-6 py-4 bg-[hsl(var(--primary))] text-white rounded-xl hover:bg-[hsl(var(--primary))]/90 transition-colors flex items-center justify-center gap-2 min-h-[44px]"
          >
            <CheckCircle className="w-5 h-5" aria-hidden="true" />
            <span>Завершить тренировку</span>
          </button>
        )}

        <button
          type="button"
          onClick={saveWorkout}
          disabled={exercises.length === 0 && !workoutStarted}
          aria-label="Сохранить черновик тренировки"
          className="px-6 py-4 glass rounded-xl text-white hover:bg-white/5 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-h-[44px]"
        >
          <CheckCircle className="w-5 h-5" aria-hidden="true" />
          <span>Сохранить черновик</span>
        </button>
      </div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showConfirmation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowConfirmation(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-strong rounded-2xl p-6 max-w-md w-full"
            >
              <h3 className="text-white mb-4">Завершить тренировку?</h3>
              <p className="text-white/60 mb-2">
                Длительность: {formatTime(elapsedSeconds)}
              </p>
              <p className="text-white/60 mb-6">
                Вы уверены, что хотите завершить тренировку? Все данные будут сохранены.
              </p>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={finishWorkout}
                  aria-label="Подтвердить завершение тренировки"
                  className="flex-1 px-4 py-3 bg-[hsl(var(--primary))] text-white rounded-xl hover:bg-[hsl(var(--primary))]/90 transition-colors min-h-[44px]"
                >
                  Завершить
                </button>
                <button
                  type="button"
                  onClick={() => setShowConfirmation(false)}
                  aria-label="Продолжить тренировку"
                  className="flex-1 px-4 py-3 glass rounded-xl text-white hover:bg-white/5 transition-colors min-h-[44px]"
                >
                  Продолжить
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowSuccessModal(false)}
          >
            {/* Confetti Animation */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {[...Array(30)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ 
                    y: -100, 
                    x: Math.random() * window.innerWidth,
                    rotate: 0,
                    opacity: 1
                  }}
                  animate={{ 
                    y: window.innerHeight + 100,
                    rotate: Math.random() * 720 - 360,
                    opacity: 0
                  }}
                  transition={{ 
                    duration: Math.random() * 2 + 2,
                    delay: Math.random() * 0.5,
                    ease: 'easeOut'
                  }}
                  className={`absolute w-3 h-3 rounded-full`}
                  style={{
                    background: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F'][Math.floor(Math.random() * 6)]
                  }}
                />
              ))}
            </div>

            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-strong rounded-3xl p-8 max-w-md w-full relative overflow-hidden"
            >
              {/* Success Icon with Animation */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  type: 'spring',
                  stiffness: 200,
                  damping: 15,
                  delay: 0.2
                }}
                className="flex justify-center mb-6"
              >
                <div className="relative">
                  <motion.div
                    animate={{ 
                      scale: [1, 1.2, 1],
                      rotate: [0, 10, -10, 0]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      repeatType: 'reverse'
                    }}
                    className="w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center"
                  >
                    <Trophy className="w-12 h-12 text-white" />
                  </motion.div>
                  <motion.div
                    animate={{ 
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 0, 0.5]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity
                    }}
                    className="absolute inset-0 rounded-full bg-green-400/30 blur-xl"
                  />
                </div>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-white text-center mb-6"
              >
                🎉 Отличная работа!
              </motion.h2>

              {/* Stats Cards */}
              <div className="space-y-3 mb-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="glass rounded-xl p-4 flex items-center gap-4"
                >
                  <div className="p-3 rounded-xl bg-blue-500/20">
                    <Clock className="w-6 h-6 text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white/60 text-sm">Длительность</p>
                    <p className="text-white text-xl">{formatTime(elapsedSeconds)}</p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="glass rounded-xl p-4 flex items-center gap-4"
                >
                  <div className="p-3 rounded-xl bg-orange-500/20">
                    <Sparkles className="w-6 h-6 text-orange-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white/60 text-sm">Калории сожжено</p>
                    <p className="text-white text-xl">{calculateCaloriesBurned()} ккал</p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="glass rounded-xl p-4 flex items-center gap-4"
                >
                  <div className="p-3 rounded-xl bg-purple-500/20">
                    <Dumbbell className="w-6 h-6 text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white/60 text-sm">Упражнений выполнено</p>
                    <p className="text-white text-xl">{exercises.length}</p>
                  </div>
                </motion.div>
              </div>

              <motion.button
                type="button"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                onClick={() => setShowSuccessModal(false)}
                aria-label="Закрыть модальное окно успеха"
                className="w-full px-6 py-4 bg-gradient-to-r from-[hsl(var(--primary))] to-blue-500 text-white rounded-xl hover:opacity-90 transition-all duration-300 min-h-[44px]"
              >
                Отлично!
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}