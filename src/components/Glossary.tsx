import { useState } from 'react';
import { Search, ChevronRight, Dumbbell, Heart, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Exercise {
  id: string;
  name: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  muscles: string[];
  description: string;
  steps: string[];
  tips: string[];
  videoUrl?: string;
}

const EXERCISES: Exercise[] = [
  {
    id: 'bench-press',
    name: 'Жим штанги лежа',
    category: 'Грудь',
    difficulty: 'intermediate',
    muscles: ['Грудные', 'Трицепс', 'Передние дельты'],
    description: 'Базовое упражнение для развития грудных мышц. Одно из трех основных упражнений в пауэрлифтинге.',
    steps: [
      'Лягте на скамью, стопы плотно прижаты к полу',
      'Возьмите штангу хватом чуть шире плеч',
      'Снимите штангу со стоек и зафиксируйте над грудью',
      'Медленно опустите штангу к середине груди',
      'Мощным движением выжмите штангу вверх',
      'Повторите нужное количество раз',
    ],
    tips: [
      'Держите лопатки сведенными на протяжении всего упражнения',
      'Не отрывайте ягодицы от скамьи',
      'Локти должны двигаться под углом 45° к корпусу',
      'Дышите: вдох при опускании, выдох при подъеме',
    ],
  },
  {
    id: 'squat',
    name: 'Приседания со штангой',
    category: 'Ноги',
    difficulty: 'intermediate',
    muscles: ['Квадрицепсы', 'Ягодичные', 'Бицепс бедра', 'Кор'],
    description: 'Главное упражнение для развития мышц нижней части тела. Король всех упражнений.',
    steps: [
      'Установите штангу на верх трапеций',
      'Снимите штангу, отойдите на шаг назад',
      'Стопы на ширине плеч, носки слегка развернуты',
      'Начните приседать, отводя таз назад',
      'Опуститесь до параллели бедер с полом',
      'Мощно поднимитесь в исходное положение',
    ],
    tips: [
      'Колени должны двигаться в направлении носков',
      'Держите спину прямой, взгляд направлен вперед',
      'Не отрывайте пятки от пола',
      'Не сводите колени внутрь при подъеме',
    ],
  },
  {
    id: 'deadlift',
    name: 'Становая тяга',
    category: 'Спина',
    difficulty: 'advanced',
    muscles: ['Спина', 'Ягодичные', 'Бицепс бедра', 'Трапеции'],
    description: 'Одно из самых эффективных базовых упражнений для всего тела.',
    steps: [
      'Встаньте перед штангой, стопы под грифом',
      'Наклонитесь и возьмите штангу на ширине плеч',
      'Выпрямите спину, грудь вперед',
      'Оттолкнитесь ногами от пола',
      'Выпрямитесь полностью, сводя лопатки',
      'Контролируемо опустите штангу вниз',
    ],
    tips: [
      'Держите штангу максимально близко к телу',
      'Никогда не округляйте поясницу',
      'Не тяните руками, работайте ногами и спиной',
      'Используйте пояс при работе с большими весами',
    ],
  },
  {
    id: 'pull-up',
    name: 'Подтягивания',
    category: 'Спина',
    difficulty: 'intermediate',
    muscles: ['Широчайшие', 'Бицепс', 'Задние дельты'],
    description: 'Классическое упражнение с собственным весом для развития спины.',
    steps: [
      'Повисните на перекладине хватом чуть шире плеч',
      'Сведите лопатки и напрягите кор',
      'Подтянитесь, сгибая руки в локтях',
      'Поднимитесь до уровня подбородка над перекладиной',
      'Контролируемо опуститесь вниз',
      'Повторите движение',
    ],
    tips: [
      'Не раскачивайтесь - работайте чисто',
      'Тяните локти вниз и назад',
      'Не подтягивайтесь рывком',
      'Полностью выпрямляйте руки внизу',
    ],
  },
  {
    id: 'overhead-press',
    name: 'Жим штанги стоя',
    category: 'Плечи',
    difficulty: 'intermediate',
    muscles: ['Передние дельты', 'Средние дельты', 'Трицепс'],
    description: 'Базовое упражнение для развития плеч и силы верха тела.',
    steps: [
      'Встаньте со штангой на уровне плеч',
      'Хват на ширине плеч, локти чуть впереди',
      'Напрягите пресс и ягодицы',
      'Выжмите штангу строго вверх',
      'Зафиксируйте штангу над головой',
      'Контролируемо опустите на плечи',
    ],
    tips: [
      'Не прогибайте поясницу',
      'Штанга движется строго по вертикали',
      'Локти под запястьями',
      'Голову отводите назад при прохождении штанги',
    ],
  },
  {
    id: 'dumbbell-curl',
    name: 'Подъем гантелей на бицепс',
    category: 'Руки',
    difficulty: 'beginner',
    muscles: ['Бицепс', 'Предплечья'],
    description: 'Изолирующее упражнение для развития бицепса.',
    steps: [
      'Встаньте прямо, гантели в опущенных руках',
      'Локти прижаты к корпусу',
      'Согните руки, поднимая гантели к плечам',
      'Супинируйте кисти в верхней точке',
      'Медленно опустите гантели вниз',
      'Не разгибайте руки полностью',
    ],
    tips: [
      'Не раскачивайтесь корпусом',
      'Работайте только бицепсом',
      'Негативная фаза в 2 раза медленнее позитивной',
      'Локти всегда на одном месте',
    ],
  },
  {
    id: 'leg-press',
    name: 'Жим ногами',
    category: 'Ноги',
    difficulty: 'beginner',
    muscles: ['Квадрицепсы', 'Ягодичные', 'Бицепс бедра'],
    description: 'Безопасная альтернатива приседаниям для развития ног.',
    steps: [
      'Сядьте в тренажер, спина плотно прижата',
      'Стопы на платформе на ширине плеч',
      'Снимите платформу с упоров',
      'Согните ноги, опуская п��атформу',
      'Опустите до угла 90° в коленях',
      'Мощно выжмите платформу вверх',
    ],
    tips: [
      'Не отрывайте поясницу от спинки',
      'Не выпрямляйте ноги полностью',
      'Колени направлены по линии носков',
      'Постановка стоп выше нагружает ягодицы',
    ],
  },
  {
    id: 'dips',
    name: 'Отжимания на брусьях',
    category: 'Грудь',
    difficulty: 'intermediate',
    muscles: ['Грудные', 'Трицепс', 'Передние дельты'],
    description: 'Отличное базовое упражнение для верха тела с собственным весом.',
    steps: [
      'Запрыгните на брусья на прямых руках',
      'Наклоните корпус вперед для акцента на грудь',
      'Согните руки, опускаясь вниз',
      'Опуститесь до угла 90° в локтях',
      'Мощно выжмите себя вверх',
      'Зафиксируйтесь в верхней точке',
    ],
    tips: [
      'Вертикальный корпус больше нагружает трицепс',
      'Наклон вперед переносит нагрузку на грудь',
      'Не опускайтесь слишком низко',
      'Держите плечи опущенными',
    ],
  },
];

const CATEGORIES = ['Все', 'Грудь', 'Спина', 'Ноги', 'Плечи', 'Руки'];

const DIFFICULTY_COLORS = {
  beginner: 'bg-green-500/10 text-green-400 border-green-500/30',
  intermediate: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
  advanced: 'bg-red-500/10 text-red-400 border-red-500/30',
};

const DIFFICULTY_LABELS = {
  beginner: 'Начальный',
  intermediate: 'Средний',
  advanced: 'Продвинутый',
};

export function Glossary() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);

  const filteredExercises = EXERCISES.filter((exercise) => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exercise.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Все' || exercise.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-6">
      <div className="flex items-center justify-between">
        <h1 className="text-white">Глоссарий упражнений</h1>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Поиск упражнений..."
          className="w-full pl-12 pr-4 py-3 glass rounded-xl text-white placeholder:text-white/30 outline-none focus:ring-2 focus:ring-[hsl(var(--primary))]/50 transition-all"
        />
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {CATEGORIES.map((category) => (
          <motion.button
            key={category}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-xl whitespace-nowrap transition-all duration-300 ${
              selectedCategory === category
                ? 'bg-[hsl(var(--primary))] text-white'
                : 'glass text-white/60 hover:bg-white/5'
            }`}
          >
            {category}
          </motion.button>
        ))}
      </div>

      {/* Exercise List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AnimatePresence mode="popLayout">
          {filteredExercises.map((exercise) => (
            <motion.button
              key={exercise.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={() => setSelectedExercise(exercise)}
              className="glass rounded-xl p-4 text-left hover:bg-white/5 transition-all duration-300 group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-white mb-1">{exercise.name}</h3>
                  <p className="text-white/60 text-sm">{exercise.category}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-white/40 group-hover:text-[hsl(var(--primary))] transition-colors" />
              </div>

              <div className="flex items-center gap-2 mb-3">
                <span
                  className={`px-2 py-1 rounded-lg text-xs border ${
                    DIFFICULTY_COLORS[exercise.difficulty]
                  }`}
                >
                  {DIFFICULTY_LABELS[exercise.difficulty]}
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {exercise.muscles.slice(0, 3).map((muscle) => (
                  <span
                    key={muscle}
                    className="px-2 py-1 bg-white/5 rounded-lg text-xs text-white/60"
                  >
                    {muscle}
                  </span>
                ))}
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      {filteredExercises.length === 0 && (
        <div className="glass rounded-xl p-12 text-center">
          <Dumbbell className="w-12 h-12 text-white/20 mx-auto mb-4" />
          <p className="text-white/60">Упражнения не найдены</p>
        </div>
      )}

      {/* Exercise Detail Modal */}
      <AnimatePresence>
        {selectedExercise && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedExercise(null)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-strong rounded-2xl p-6 max-w-2xl w-full my-8 max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-white mb-2">{selectedExercise.name}</h2>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-3 py-1 bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] rounded-lg text-sm">
                      {selectedExercise.category}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-lg text-sm border ${
                        DIFFICULTY_COLORS[selectedExercise.difficulty]
                      }`}
                    >
                      {DIFFICULTY_LABELS[selectedExercise.difficulty]}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedExercise(null)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <ChevronRight className="w-6 h-6 text-white/60 rotate-90" />
                </button>
              </div>

              {/* Description */}
              <div className="mb-6">
                <p className="text-white/80">{selectedExercise.description}</p>
              </div>

              {/* Video Placeholder */}
              <div className="mb-6 aspect-video glass rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <Play className="w-16 h-16 text-white/20 mx-auto mb-2" />
                  <p className="text-white/40 text-sm">Видео демонстрация</p>
                </div>
              </div>

              {/* Muscles */}
              <div className="mb-6">
                <h3 className="text-white mb-3 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-[hsl(var(--primary))]" />
                  Работающие мышцы
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedExercise.muscles.map((muscle) => (
                    <span
                      key={muscle}
                      className="px-3 py-2 glass rounded-lg text-sm text-white"
                    >
                      {muscle}
                    </span>
                  ))}
                </div>
              </div>

              {/* Steps */}
              <div className="mb-6">
                <h3 className="text-white mb-3">Техника выполнения</h3>
                <div className="space-y-3">
                  {selectedExercise.steps.map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex gap-3"
                    >
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[hsl(var(--primary))]/20 text-[hsl(var(--primary))] flex items-center justify-center text-sm">
                        {index + 1}
                      </div>
                      <p className="text-white/80 text-sm">{step}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Tips */}
              <div>
                <h3 className="text-white mb-3">Советы и рекомендации</h3>
                <div className="space-y-2">
                  {selectedExercise.tips.map((tip, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex gap-3 glass rounded-lg p-3"
                    >
                      <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[hsl(var(--primary))] mt-2" />
                      <p className="text-white/80 text-sm">{tip}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}