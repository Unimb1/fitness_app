import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useDrag, useDrop } from 'react-dnd';
import { Flame, Calendar, Dumbbell, Clock, Target, TrendingUp, Plus, GripVertical, X } from 'lucide-react';

interface Widget {
  id: string;
  type: string;
  title: string;
  value: string | number;
  icon: any;
  muscleGroup?: string;
}

const WIDGET_TYPES = {
  streak: { id: 'streak', title: 'Цепочка тренировок', value: '12 дней', icon: Flame },
  weekWorkouts: { id: 'weekWorkouts', title: 'Тренировок за неделю', value: '5', icon: Calendar },
  setsPerGroup: { id: 'setsPerGroup', title: 'Подходы на группу', value: '24', icon: Dumbbell },
  avgTime: { id: 'avgTime', title: 'Среднее время', value: '48 мин', icon: Clock },
  calories: { id: 'calories', title: 'Калории за неделю', value: '3240 ккал', icon: TrendingUp },
  activeGoals: { id: 'activeGoals', title: 'Активных целей', value: '3', icon: Target },
};

interface WidgetCardProps {
  widget: Widget;
  index: number;
  moveWidget: (dragIndex: number, hoverIndex: number) => void;
  removeWidget: (id: string) => void;
}

function WidgetCard({ widget, index, moveWidget, removeWidget }: WidgetCardProps) {
  const [{ isDragging }, drag, preview] = useDrag({
    type: 'widget',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'widget',
    hover: (item: { index: number }) => {
      if (item.index !== index) {
        moveWidget(item.index, index);
        item.index = index;
      }
    },
  });

  const Icon = widget.icon;

  return (
    <motion.div
      ref={preview}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: isDragging ? 0.5 : 1, scale: 1 }}
      className={`glass rounded-xl p-4 relative group ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
    >
      {/* Drag Handle */}
      <div
        ref={(node) => {
          drag(node);
          drop(node);
        }}
        className="absolute top-2 left-2 p-1.5 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing"
      >
        <GripVertical className="w-4 h-4 text-white/40" />
      </div>

      {/* Remove Button */}
      <button
        onClick={() => removeWidget(widget.id)}
        aria-label={`Удалить виджет ${widget.title}`}
        className="absolute top-2 right-2 p-1.5 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/10 rounded-lg"
      >
        <X className="w-4 h-4 text-white/40" aria-hidden="true" />
      </button>

      <div className="flex items-center gap-3 mb-2 mt-2">
        <div className="p-2 bg-[hsl(var(--primary))]/10 rounded-lg">
          <Icon className="w-5 h-5 text-[hsl(var(--primary))]" />
        </div>
      </div>
      <p className="text-white/60 text-xs mb-1">{widget.title}</p>
      <p className="text-white text-xl">{widget.value}</p>
    </motion.div>
  );
}

export function WidgetGrid() {
  const [widgets, setWidgets] = useState<Widget[]>([
    { ...WIDGET_TYPES.streak, id: 'streak' },
    { ...WIDGET_TYPES.weekWorkouts, id: 'weekWorkouts' },
    { ...WIDGET_TYPES.setsPerGroup, id: 'setsPerGroup' },
    { ...WIDGET_TYPES.avgTime, id: 'avgTime' },
  ]);

  const [showAddMenu, setShowAddMenu] = useState(false);

  const moveWidget = useCallback((dragIndex: number, hoverIndex: number) => {
    setWidgets((prevWidgets) => {
      const newWidgets = [...prevWidgets];
      const [removed] = newWidgets.splice(dragIndex, 1);
      newWidgets.splice(hoverIndex, 0, removed);
      return newWidgets;
    });
  }, []);

  const removeWidget = useCallback((id: string) => {
    setWidgets((prev) => prev.filter((w) => w.id !== id));
  }, []);

  const addWidget = (type: keyof typeof WIDGET_TYPES) => {
    const newWidget = { ...WIDGET_TYPES[type], id: `${type}-${Date.now()}` };
    setWidgets((prev) => [...prev, newWidget]);
    setShowAddMenu(false);
  };

  const availableWidgets = Object.keys(WIDGET_TYPES).filter(
    (type) => !widgets.some((w) => w.type === type)
  );

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <AnimatePresence mode="popLayout">
          {widgets.map((widget, index) => (
            <WidgetCard
              key={widget.id}
              widget={widget}
              index={index}
              moveWidget={moveWidget}
              removeWidget={removeWidget}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Add Widget Button */}
      <div className="relative">
        <button
          onClick={() => setShowAddMenu(!showAddMenu)}
          aria-label="Добавить виджет"
          aria-expanded={showAddMenu}
          className="glass rounded-xl px-4 py-3 flex items-center gap-2 text-white/60 hover:text-white hover:bg-white/5 transition-all duration-300"
        >
          <Plus className="w-5 h-5" aria-hidden="true" />
          <span>Добавить виджет</span>
        </button>

        {showAddMenu && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-full left-0 mt-2 glass-strong rounded-xl p-2 min-w-[250px] z-10"
          >
            {Object.entries(WIDGET_TYPES).map(([key, widget]) => {
              const Icon = widget.icon;
              const isAdded = widgets.some((w) => w.id === key);
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => !isAdded && addWidget(key as keyof typeof WIDGET_TYPES)}
                  disabled={isAdded}
                  aria-label={isAdded ? `${widget.title} уже добавлен` : `Добавить виджет ${widget.title}`}
                  aria-disabled={isAdded}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isAdded
                      ? 'opacity-40 cursor-not-allowed'
                      : 'hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-5 h-5 text-[hsl(var(--primary))]" aria-hidden="true" />
                  <span className="text-sm">{widget.title}</span>
                </button>
              );
            })}
          </motion.div>
        )}
      </div>
    </div>
  );
}