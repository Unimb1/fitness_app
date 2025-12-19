import { useState } from 'react';
import { Ruler, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Measurement {
  id: string;
  date: string;
  neck?: number;
  shoulders?: number;
  forearms?: number;
  biceps?: number;
  chest?: number;
  waist?: number;
  belly?: number;
  hips?: number;
  thigh?: number;
  calves?: number;
  notes?: string;
}

const measurementFields = [
  { key: 'neck', label: 'Шея' },
  { key: 'shoulders', label: 'Плечи' },
  { key: 'forearms', label: 'Предплечья' },
  { key: 'biceps', label: 'Бицепс' },
  { key: 'chest', label: 'Грудь' },
  { key: 'waist', label: 'Талия' },
  { key: 'belly', label: 'Живот' },
  { key: 'hips', label: 'Таз' },
  { key: 'thigh', label: 'Бедро' },
  { key: 'calves', label: 'Икры' },
];

const mockMeasurements: Measurement[] = [
  {
    id: '1',
    date: '2025-12-01',
    neck: 38,
    shoulders: 115,
    chest: 105,
    waist: 82,
    biceps: 38,
    thigh: 58,
    notes: 'Начало программы',
  },
  {
    id: '2',
    date: '2026-01-01',
    neck: 38.5,
    shoulders: 117,
    chest: 107,
    waist: 80,
    biceps: 39,
    thigh: 59,
    notes: 'Прогресс виден!',
  },
];

export function BodyMeasurements() {
  const [measurements, setMeasurements] = useState<Measurement[]>(mockMeasurements);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState<Partial<Measurement>>({
    date: new Date().toISOString().split('T')[0],
  });

  const updateFormField = (key: string, value: string | number) => {
    setFormData({ ...formData, [key]: value });
  };

  const addMeasurement = () => {
    const newMeasurement: Measurement = {
      id: `measurement-${Date.now()}`,
      date: formData.date || new Date().toISOString().split('T')[0],
      ...formData,
    };

    setMeasurements([...measurements, newMeasurement].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    ));

    setFormData({ date: new Date().toISOString().split('T')[0] });
    setShowAddForm(false);
  };

  const getChange = (current?: number, previous?: number) => {
    if (!current || !previous) return null;
    const change = current - previous;
    return {
      value: Math.abs(change),
      isPositive: change > 0,
    };
  };

  return (
    <div className="space-y-6">
      <div className="glass rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-[hsl(var(--primary))]/10">
            <Ruler className="w-6 h-6 text-[hsl(var(--primary))]" />
          </div>
          <h2 className="text-white">Замеры тела</h2>
        </div>

        {/* Add Button */}
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="w-full glass-strong rounded-xl px-6 py-4 flex items-center justify-center gap-2 text-white hover:bg-white/5 transition-all duration-300 mb-6 min-h-[44px]"
        >
          <Plus className="w-5 h-5" />
          <span>Добавить замер</span>
        </button>

        {/* Add Form */}
        <AnimatePresence>
          {showAddForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="glass-strong rounded-xl p-6 mb-6 overflow-hidden"
            >
              <h3 className="text-white mb-4">Новый замер</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-white/60 mb-2">Дата замера</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => updateFormField('date', e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-[hsl(var(--primary))] transition-colors"
                  />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {measurementFields.map((field) => (
                    <div key={field.key}>
                      <label className="block text-sm text-white/60 mb-2">
                        {field.label} (см)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={(formData as any)[field.key] || ''}
                        onChange={(e) => updateFormField(field.key, parseFloat(e.target.value) || 0)}
                        placeholder="0"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 outline-none focus:border-[hsl(var(--primary))] transition-colors"
                      />
                    </div>
                  ))}
                </div>

                <div>
                  <label className="block text-sm text-white/60 mb-2">Заметки</label>
                  <textarea
                    value={formData.notes || ''}
                    onChange={(e) => updateFormField('notes', e.target.value)}
                    placeholder="Дополнительные комментарии..."
                    rows={3}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 outline-none focus:border-[hsl(var(--primary))] transition-colors resize-none"
                  />
                </div>

                <button
                  onClick={addMeasurement}
                  className="w-full px-6 py-3 bg-[hsl(var(--primary))] text-white rounded-xl hover:bg-[hsl(var(--primary))]/90 transition-colors min-h-[44px]"
                >
                  Сохранить
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* History */}
        <div className="space-y-4">
          {measurements.map((measurement, index) => {
            const previous = measurements[index + 1];
            
            return (
              <motion.div
                key={measurement.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-strong rounded-xl p-5"
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-white">
                      {new Date(measurement.date).toLocaleDateString('ru-RU', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </h3>
                    {measurement.notes && (
                      <p className="text-sm text-white/60 mt-1">{measurement.notes}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                  {measurementFields.map((field) => {
                    const value = (measurement as any)[field.key];
                    const prevValue = previous ? (previous as any)[field.key] : undefined;
                    const change = getChange(value, prevValue);

                    if (!value) return null;

                    return (
                      <div key={field.key} className="bg-white/5 rounded-lg p-3">
                        <p className="text-xs text-white/60 mb-1">{field.label}</p>
                        <div className="flex items-baseline gap-2">
                          <p className="text-white">{value} см</p>
                          {change && (
                            <p
                              className={`text-xs ${
                                change.isPositive ? 'text-blue-400' : 'text-green-400'
                              }`}
                            >
                              {change.isPositive ? '+' : '-'}
                              {change.value}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
