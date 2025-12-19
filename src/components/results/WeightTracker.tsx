import { useState } from 'react';
import { Plus } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion, AnimatePresence } from 'motion/react';

interface WeightEntry {
  id: string;
  date: string;
  weight: number;
  bodyFat: number;
}

const mockData: WeightEntry[] = [
  { id: '1', date: '2025-11-01', weight: 78, bodyFat: 18 },
  { id: '2', date: '2025-11-15', weight: 77.5, bodyFat: 17.5 },
  { id: '3', date: '2025-12-01', weight: 77, bodyFat: 17 },
  { id: '4', date: '2025-12-15', weight: 76.5, bodyFat: 16.5 },
  { id: '5', date: '2026-01-01', weight: 76, bodyFat: 16 },
];

export function WeightTracker() {
  const [entries, setEntries] = useState<WeightEntry[]>(mockData);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newDate, setNewDate] = useState(new Date().toISOString().split('T')[0]);
  const [newWeight, setNewWeight] = useState('');
  const [newBodyFat, setNewBodyFat] = useState('');
  const [chartMetric, setChartMetric] = useState<'weight' | 'bodyFat'>('weight');

  const addEntry = () => {
    if (!newWeight || !newBodyFat) {
      alert('Пожалуйста, заполните все поля');
      return;
    }

    const entry: WeightEntry = {
      id: `entry-${Date.now()}`,
      date: newDate,
      weight: parseFloat(newWeight),
      bodyFat: parseFloat(newBodyFat),
    };

    setEntries([...entries, entry].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()));
    setNewWeight('');
    setNewBodyFat('');
    setShowAddForm(false);
  };

  const chartData = entries.map((entry) => ({
    date: new Date(entry.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' }),
    weight: entry.weight,
    bodyFat: entry.bodyFat,
  }));

  return (
    <div className="space-y-6">
      {/* Chart */}
      <div className="glass rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white">График прогресса</h2>
          <div className="flex gap-2">
            <button
              onClick={() => setChartMetric('weight')}
              className={`px-4 py-2 rounded-xl transition-colors min-h-[44px] ${
                chartMetric === 'weight'
                  ? 'bg-[hsl(var(--primary))] text-white'
                  : 'glass-strong text-white/60 hover:text-white'
              }`}
            >
              Вес
            </button>
            <button
              onClick={() => setChartMetric('bodyFat')}
              className={`px-4 py-2 rounded-xl transition-colors min-h-[44px] ${
                chartMetric === 'bodyFat'
                  ? 'bg-[hsl(var(--primary))] text-white'
                  : 'glass-strong text-white/60 hover:text-white'
              }`}
            >
              % Жира
            </button>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis stroke="rgba(255,255,255,0.4)" dataKey="date" style={{ fontSize: '12px' }} />
            <YAxis stroke="rgba(255,255,255,0.4)" style={{ fontSize: '12px' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(20, 20, 30, 0.95)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
                padding: '12px',
              }}
              labelStyle={{ color: 'rgba(255,255,255,0.6)' }}
              itemStyle={{ color: '#fff' }}
            />
            <Line
              type="monotone"
              dataKey={chartMetric}
              stroke="hsl(142, 76%, 36%)"
              strokeWidth={3}
              dot={{ fill: 'hsl(142, 76%, 36%)', r: 6 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Add Entry Button */}
      <button
        onClick={() => setShowAddForm(!showAddForm)}
        className="w-full glass rounded-xl px-6 py-4 flex items-center justify-center gap-2 text-white hover:bg-white/5 transition-all duration-300 min-h-[44px]"
      >
        <Plus className="w-5 h-5" />
        <span>Записать измерение</span>
      </button>

      {/* Add Form */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="glass rounded-2xl p-6 overflow-hidden"
          >
            <h3 className="text-white mb-4">Новое измерение</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-white/60 mb-2">Дата</label>
                <input
                  type="date"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-[hsl(var(--primary))] transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-white/60 mb-2">Вес (кг)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={newWeight}
                    onChange={(e) => setNewWeight(e.target.value)}
                    placeholder="75.5"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 outline-none focus:border-[hsl(var(--primary))] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm text-white/60 mb-2">Процент жира (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={newBodyFat}
                    onChange={(e) => setNewBodyFat(e.target.value)}
                    placeholder="16.5"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 outline-none focus:border-[hsl(var(--primary))] transition-colors"
                  />
                </div>
              </div>

              <button
                onClick={addEntry}
                className="w-full px-6 py-3 bg-[hsl(var(--primary))] text-white rounded-xl hover:bg-[hsl(var(--primary))]/90 transition-colors min-h-[44px]"
              >
                Сохранить
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* History */}
      <div className="glass rounded-2xl p-6">
        <h3 className="text-white mb-4">История измерений</h3>
        <div className="space-y-3">
          {entries
            .slice()
            .reverse()
            .map((entry, index) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="glass-strong rounded-xl p-4 flex items-center justify-between"
              >
                <div>
                  <p className="text-white">
                    {new Date(entry.date).toLocaleDateString('ru-RU', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </p>
                </div>
                <div className="flex gap-6">
                  <div className="text-right">
                    <p className="text-xs text-white/60">Вес</p>
                    <p className="text-white">{entry.weight} кг</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-white/60">% Жира</p>
                    <p className="text-white">{entry.bodyFat}%</p>
                  </div>
                </div>
              </motion.div>
            ))}
        </div>
      </div>
    </div>
  );
}
