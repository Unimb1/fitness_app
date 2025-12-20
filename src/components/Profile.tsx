import { useState } from 'react';
import { 
  Settings, 
  Bell, 
  Shield, 
  Palette, 
  User as UserIcon, 
  Award, 
  TrendingUp, 
  Calendar, 
  MessageSquare, 
  Plus, 
  Book, 
  Calculator,
  Camera,
  Users,
  Trophy,
  ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CustomExercises } from './profile/CustomExercises';
import { Glossary } from './Glossary';
import { Calculator as CalculatorComponent } from './Calculator';

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  date?: string;
}

const mockAchievements: Achievement[] = [
  { 
    id: '1', 
    name: 'Первая тренировка', 
    description: 'Завершите первую тренировку',
    icon: '🎯', 
    unlocked: true,
    date: '2025-11-15'
  },
  { 
    id: '2', 
    name: '7 дней подряд', 
    description: 'Тренируйтесь 7 дней подряд',
    icon: '🔥', 
    unlocked: true,
    date: '2025-12-01'
  },
  { 
    id: '3', 
    name: '100 кг на жиме', 
    description: 'Пожмите 100 кг на жиме лежа',
    icon: '💪', 
    unlocked: false 
  },
  { 
    id: '4', 
    name: '30 дней подряд', 
    description: 'Тренируйтесь 30 дней подряд',
    icon: '⭐', 
    unlocked: false 
  },
  { 
    id: '5', 
    name: 'Первая цель', 
    description: 'Достигните первой цели',
    icon: '🎖️', 
    unlocked: true,
    date: '2025-11-20'
  },
  { 
    id: '6', 
    name: '1000 подходов', 
    description: 'Выполните 1000 подходов',
    icon: '🏆', 
    unlocked: false 
  },
  { 
    id: '7', 
    name: 'Марафонец', 
    description: 'Тренируйтесь 90 дней подряд',
    icon: '👑', 
    unlocked: false 
  },
  { 
    id: '8', 
    name: 'Силач', 
    description: 'Суммарно поднимите 10 тонн',
    icon: '🦾', 
    unlocked: false 
  },
];

export function Profile() {
  const [userName, setUserName] = useState('Иван Петров');
  const [weight, setWeight] = useState('76');
  const [height, setHeight] = useState('180');
  const [about, setAbout] = useState('Занимаюсь в зале 3 раза в неделю.');
  const [isEditing, setIsEditing] = useState(false);
  const [hoveredAchievement, setHoveredAchievement] = useState<string | null>(null);
  const [showAllAchievements, setShowAllAchievements] = useState(false);
  const [showCustomExercises, setShowCustomExercises] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);

  const quickActions = [
    { id: 'calc', label: 'Калькулятор', icon: Calculator, color: 'bg-blue-500/10 text-blue-400', onClick: () => setShowCalculator(true) },
    { id: 'ai', label: 'ИИ Помощник', icon: MessageSquare, color: 'bg-purple-500/10 text-purple-400' },
    { id: 'glossary', label: 'Глоссарий', icon: Book, color: 'bg-green-500/10 text-green-400' },
    { id: 'add', label: 'Упражнения', icon: Plus, color: 'bg-orange-500/10 text-orange-400', onClick: () => setShowCustomExercises(true) },
  ];

  const displayedAchievements = showAllAchievements ? mockAchievements : mockAchievements.slice(0, 6);

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-6">
      <h1 className="text-white">Профиль</h1>

      {/* User Card */}
      <div className="glass rounded-2xl p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 mb-4 sm:mb-6">
          {/* Avatar */}
          <div className="relative flex-shrink-0">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-[hsl(var(--primary))] to-blue-500 flex items-center justify-center">
              <UserIcon className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
            </div>
            <button 
              className="absolute -bottom-2 -right-2 p-2 glass-strong rounded-lg hover:bg-white/10 transition-colors min-w-[36px] min-h-[36px] flex items-center justify-center"
              aria-label="Изменить фото профиля"
            >
              <Camera className="w-4 h-4 text-white" aria-hidden="true" />
            </button>
          </div>

          {/* User Info */}
          <div className="flex-1 w-full min-w-0">
            {isEditing ? (
              <input
                id="user-name"
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                aria-label="Имя пользователя"
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-[hsl(var(--primary))] transition-colors mb-3"
              />
            ) : (
              <h2 className="text-white mb-1 truncate">{userName}</h2>
            )}
            
            <div className="flex flex-wrap gap-3 sm:gap-6 text-sm">
              <div className="flex items-center gap-2">
                <label htmlFor="user-weight" className="text-white/60">Вес:</label>
                {isEditing ? (
                  <input
                    id="user-weight"
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    aria-label="Вес в килограммах"
                    className="w-16 px-2 py-1 bg-white/5 border border-white/10 rounded-lg text-white outline-none focus:border-[hsl(var(--primary))] transition-colors"
                  />
                ) : (
                  <span className="text-white">{weight} кг</span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <label htmlFor="user-height" className="text-white/60">Рост:</label>
                {isEditing ? (
                  <input
                    id="user-height"
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    aria-label="Рост в сантиметрах"
                    className="w-16 px-2 py-1 bg-white/5 border border-white/10 rounded-lg text-white outline-none focus:border-[hsl(var(--primary))] transition-colors"
                  />
                ) : (
                  <span className="text-white">{height} см</span>
                )}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsEditing(!isEditing)}
            aria-label={isEditing ? 'Сохранить изменения профиля' : 'Редактировать профиль'}
            className="px-4 py-2 glass-strong rounded-xl text-white hover:bg-white/5 transition-colors min-h-[44px] whitespace-nowrap"
          >
            {isEditing ? 'Сохранить' : 'Редактировать'}
          </button>
        </div>

        {/* About */}
        <div>
          <label htmlFor="user-about" className="block text-sm text-white/60 mb-2">О себе</label>
          {isEditing ? (
            <textarea
              id="user-about"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              rows={3}
              aria-label="О себе"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-[hsl(var(--primary))] transition-colors resize-none"
            />
          ) : (
            <p className="text-white/80 break-words">{about}</p>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="glass rounded-2xl p-4 sm:p-6">
        <h2 className="text-white mb-4">Быстрый доступ</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <motion.button
                key={action.id}
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={action.onClick}
                aria-label={action.label}
                className="glass-strong rounded-xl p-4 sm:p-6 flex flex-col items-center gap-2 sm:gap-3 hover:bg-white/5 transition-all duration-300 min-h-[100px] sm:min-h-[120px]"
              >
                <div className={`p-3 sm:p-4 rounded-xl ${action.color}`}>
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
                </div>
                <span className="text-xs sm:text-sm text-white text-center">{action.label}</span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Social */}
      <div className="glass rounded-2xl p-4 sm:p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-xl bg-[hsl(var(--primary))]/10">
            <Users className="w-6 h-6 text-[hsl(var(--primary))]" />
          </div>
          <h2 className="text-white">Друзья</h2>
        </div>
        
        <button 
          type="button"
          aria-label="Добавить друга"
          className="w-full glass-strong rounded-xl px-6 py-4 flex items-center justify-center gap-2 text-white hover:bg-white/5 transition-all duration-300 min-h-[44px]"
        >
          <Plus className="w-5 h-5" aria-hidden="true" />
          <span>Добавить друга</span>
        </button>

        <div className="mt-4 text-center text-white/60 text-sm">
          У вас пока нет друзей
        </div>
      </div>

      {/* Achievements */}
      <div className="glass rounded-2xl p-4 sm:p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-[hsl(var(--primary))]/10">
              <Trophy className="w-6 h-6 text-[hsl(var(--primary))]" />
            </div>
            <h2 className="text-white">Достижения</h2>
          </div>
          <button
            type="button"
            onClick={() => setShowAllAchievements(!showAllAchievements)}
            aria-expanded={showAllAchievements}
            aria-label={showAllAchievements ? 'Скрыть все достижения' : 'Показать все достижения'}
            className="flex items-center gap-2 px-3 py-2 glass-strong rounded-xl text-white/60 hover:text-white hover:bg-white/5 transition-all duration-300 min-h-[44px]"
          >
            <span className="text-sm">{showAllAchievements ? 'Скрыть' : 'Все'}</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${showAllAchievements ? 'rotate-180' : ''}`} aria-hidden="true" />
          </button>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {displayedAchievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="relative"
              onMouseEnter={() => setHoveredAchievement(achievement.id)}
              onMouseLeave={() => setHoveredAchievement(null)}
            >
              <div
                className={`aspect-square rounded-xl flex flex-col items-center justify-center gap-2 transition-all duration-300 ${
                  achievement.unlocked
                    ? 'glass-strong hover:bg-white/5 cursor-pointer'
                    : 'bg-white/5 opacity-40'
                }`}
              >
                <span className="text-2xl sm:text-3xl">{achievement.icon}</span>
                <p className="text-[10px] sm:text-xs text-white/80 text-center px-2 leading-tight">{achievement.name}</p>
              </div>

              {/* Tooltip */}
              <AnimatePresence>
                {hoveredAchievement === achievement.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.9 }}
                    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-10 w-48"
                  >
                    <div className="glass-strong rounded-xl p-3 shadow-xl border border-white/20">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xl">{achievement.icon}</span>
                        <p className="text-sm text-white">{achievement.name}</p>
                      </div>
                      <p className="text-xs text-white/60 mb-2">{achievement.description}</p>
                      {achievement.unlocked && achievement.date && (
                        <p className="text-xs text-[hsl(var(--primary))]">
                          Получено: {new Date(achievement.date).toLocaleDateString('ru-RU')}
                        </p>
                      )}
                      {!achievement.unlocked && (
                        <p className="text-xs text-white/40">🔒 Заблокировано</p>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <p className="text-white/60 text-sm">
            Разблокировано {mockAchievements.filter(a => a.unlocked).length} из {mockAchievements.length}
          </p>
        </div>
      </div>

      {/* Custom Exercises Modal */}
      <CustomExercises 
        isOpen={showCustomExercises} 
        onClose={() => setShowCustomExercises(false)} 
      />

      {/* Calculator Modal */}
      <CalculatorComponent 
        isOpen={showCalculator} 
        onClose={() => setShowCalculator(false)} 
      />
    </div>
  );
}