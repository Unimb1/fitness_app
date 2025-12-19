import { useState } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CustomExercise {
  id: string;
  name: string;
  muscleGroup: string;
  equipment: string;
  description: string;
  met: number; // Metabolic Equivalent of Task
}

interface CustomExercisesProps {
  isOpen: boolean;
  onClose: () => void;
}

const muscleGroups = ['Грудь', 'Спина', 'Ноги', 'Плечи', 'Руки', 'Пресс', 'Кардио'];
const equipmentTypes = ['Штанга', 'Гантели', 'Тренажер', 'Свой вес', 'Канаты', 'Гири', 'Другое'];

export function CustomExercises({ isOpen, onClose }: CustomExercisesProps) {
  const [exercises, setExercises] = useState<CustomExercise[]>([
    {
      id: '1',
      name: 'Жим на наклонной скамье',
      muscleGroup: 'Грудь',
      equipment: 'Штанга',
      description: 'Жим штанги на наклонной скамье 30°',
      met: 6.0,
    },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    muscleGroup: 'Грудь',
    equipment: 'Штанга',
    description: '',
    met: '5.0',
  });

  const addExercise = () => {
    if (!formData.name) {
      alert('Введите название упражнения');
      return;
    }
    if (!formData.met || parseFloat(formData.met) <= 0) {
      alert('Введите корректное значение MET');
      return;
    }

    const newExercise: CustomExercise = {
      id: `exercise-${Date.now()}`,
      name: formData.name,
      muscleGroup: formData.muscleGroup,
      equipment: formData.equipment,
      description: formData.description,
      met: parseFloat(formData.met),
    };

    setExercises([...exercises, newExercise]);
    setFormData({
      name: '',
      muscleGroup: 'Грудь',
      equipment: 'Штанга',
      description: '',
      met: '5.0',
    });
    setShowAddForm(false);
  };

  const removeExercise = (id: string) => {
    setExercises(exercises.filter(ex => ex.id !== id));
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="glass-strong rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-white">Мои упражнения</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
            >
              <X className="w-5 h-5 text-white/60" />
            </button>
          </div>

          {/* Add Button */}
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="w-full glass rounded-xl px-6 py-4 flex items-center justify-center gap-2 text-white hover:bg-white/5 transition-all duration-300 mb-6 min-h-[44px]"
          >
            <Plus className="w-5 h-5" />
            <span>Добавить упражнение</span>
          </button>

          {/* Add Form */}
          <AnimatePresence>
            {showAddForm && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="glass rounded-xl p-6 mb-6 overflow-hidden"
              >
                <h3 className="text-white mb-4">Новое упражнение</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-white/60 mb-2">Название упражнения</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Например: Жим на наклонной скамье"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 outline-none focus:border-[hsl(var(--primary))] transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-white/60 mb-2">Группа мышц</label>
                      <select
                        value={formData.muscleGroup}
                        onChange={(e) => setFormData({ ...formData, muscleGroup: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-[hsl(var(--primary))] transition-colors"
                      >
                        {muscleGroups.map((group) => (
                          <option key={group} value={group}>
                            {group}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm text-white/60 mb-2">Оборудование</label>
                      <select
                        value={formData.equipment}
                        onChange={(e) => setFormData({ ...formData, equipment: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-[hsl(var(--primary))] transition-colors"
                      >
                        {equipmentTypes.map((eq) => (
                          <option key={eq} value={eq}>
                            {eq}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-white/60 mb-2">Описание (опционально)</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Техника выполнения, особенности..."
                      rows={3}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 outline-none focus:border-[hsl(var(--primary))] transition-colors resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-white/60 mb-2">MET (Metabolic Equivalent)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={formData.met}
                      onChange={(e) => setFormData({ ...formData, met: e.target.value })}
                      placeholder="Например: 5.0"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 outline-none focus:border-[hsl(var(--primary))] transition-colors"
                    />
                    <p className="text-xs text-white/40 mt-1">
                      Коэффициент интенсивности (3-12): легкие упражнения ~3-5, средние ~5-8, тяжелые ~8-12
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={addExercise}
                      className="flex-1 px-6 py-3 bg-[hsl(var(--primary))] text-white rounded-xl hover:bg-[hsl(var(--primary))]/90 transition-colors min-h-[44px]"
                    >
                      Добавить
                    </button>
                    <button
                      onClick={() => setShowAddForm(false)}
                      className="px-6 py-3 glass rounded-xl text-white hover:bg-white/5 transition-colors min-h-[44px]"
                    >
                      Отмена
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Exercises List */}
          <div className="space-y-3">
            {exercises.length === 0 ? (
              <div className="text-center text-white/60 py-8">
                <p>У вас пока нет своих упражнений</p>
                <p className="text-sm mt-2">Добавьте первое упражнение</p>
              </div>
            ) : (
              exercises.map((exercise, index) => (
                <motion.div
                  key={exercise.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="glass rounded-xl p-4 hover:bg-white/5 transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white mb-1">{exercise.name}</h3>
                      <div className="flex flex-wrap gap-2 text-sm">
                        <span className="px-2 py-1 bg-[hsl(var(--primary))]/20 text-[hsl(var(--primary))] rounded-lg text-xs">
                          {exercise.muscleGroup}
                        </span>
                        <span className="px-2 py-1 bg-white/10 text-white/80 rounded-lg text-xs">
                          {exercise.equipment}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => removeExercise(exercise.id)}
                      className="p-2 hover:bg-red-500/20 rounded-lg transition-colors ml-2 flex-shrink-0"
                    >
                      <Trash2 className="w-4 h-4 text-red-400" />
                    </button>
                  </div>
                  {exercise.description && (
                    <p className="text-sm text-white/60 mt-2">{exercise.description}</p>
                  )}
                </motion.div>
              ))
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}