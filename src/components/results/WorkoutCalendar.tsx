import { useState } from 'react';
import { ChevronLeft, ChevronRight, Dumbbell, Clock, Flame } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface WorkoutDay {
  date: number;
  name: string;
  duration: number;
  calories: number;
  exercises: number;
}

const mockWorkouts: WorkoutDay[] = [
  { date: 5, name: 'Грудь и трицепс', duration: 52, calories: 420, exercises: 6 },
  { date: 3, name: 'Спина и бицепс', duration: 48, calories: 390, exercises: 5 },
  { date: 1, name: 'Ноги', duration: 65, calories: 580, exercises: 7 },
];

export function WorkoutCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<WorkoutDay | null>(null);

  const monthNames = [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    return firstDay === 0 ? 6 : firstDay - 1; // Convert Sunday (0) to 6
  };

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
    setSelectedDay(null);
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
    setSelectedDay(null);
  };

  const daysInMonth = getDaysInMonth(currentMonth);
  const firstDay = getFirstDayOfMonth(currentMonth);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDay }, (_, i) => i);

  const getWorkoutForDay = (day: number) => {
    return mockWorkouts.find((w) => w.date === day);
  };

  return (
    <div className="glass rounded-2xl p-6">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-white">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={previousMonth}
            className="p-2 glass-strong rounded-lg hover:bg-white/5 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
          >
            <ChevronLeft className="w-5 h-5 text-white/60" />
          </button>
          <button
            onClick={nextMonth}
            className="p-2 glass-strong rounded-lg hover:bg-white/5 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
          >
            <ChevronRight className="w-5 h-5 text-white/60" />
          </button>
        </div>
      </div>

      {/* Weekday Headers */}
      <div className="grid grid-cols-7 gap-2 mb-2">
        {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((day) => (
          <div key={day} className="text-center text-sm text-white/60 py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2 mb-6">
        {emptyDays.map((i) => (
          <div key={`empty-${i}`} className="aspect-square" />
        ))}
        {days.map((day) => {
          const workout = getWorkoutForDay(day);
          const isToday =
            day === new Date().getDate() &&
            currentMonth.getMonth() === new Date().getMonth() &&
            currentMonth.getFullYear() === new Date().getFullYear();
          const isSelected = selectedDay?.date === day;

          return (
            <motion.button
              key={day}
              onClick={() => setSelectedDay(workout || null)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`aspect-square rounded-xl flex items-center justify-center text-sm transition-all duration-300 relative ${
                workout
                  ? 'bg-[hsl(var(--primary))]/20 border-2 border-[hsl(var(--primary))]/40 text-white'
                  : isToday
                  ? 'bg-white/10 text-white border-2 border-white/20'
                  : 'bg-white/5 text-white/60 hover:bg-white/10'
              } ${isSelected ? 'ring-2 ring-white' : ''}`}
            >
              {day}
              {workout && (
                <div className="absolute bottom-1 left-1/2 -translate-x-1/2">
                  <div className="w-1 h-1 rounded-full bg-[hsl(var(--primary))]" />
                </div>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Selected Day Details */}
      <AnimatePresence mode="wait">
        {selectedDay && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="glass-strong rounded-xl p-5"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-white mb-1">{selectedDay.name}</h3>
                <p className="text-sm text-white/60">
                  {selectedDay.date} {monthNames[currentMonth.getMonth()]}
                </p>
              </div>
              <div className="p-2 rounded-lg bg-[hsl(var(--primary))]/10">
                <Dumbbell className="w-5 h-5 text-[hsl(var(--primary))]" />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-white/5">
                  <Clock className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <p className="text-xs text-white/60">Время</p>
                  <p className="text-sm text-white">{selectedDay.duration} мин</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-white/5">
                  <Flame className="w-4 h-4 text-orange-400" />
                </div>
                <div>
                  <p className="text-xs text-white/60">Калории</p>
                  <p className="text-sm text-white">{selectedDay.calories} ккал</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-white/5">
                  <Dumbbell className="w-4 h-4 text-[hsl(var(--primary))]" />
                </div>
                <div>
                  <p className="text-xs text-white/60">Упражнений</p>
                  <p className="text-sm text-white">{selectedDay.exercises}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
