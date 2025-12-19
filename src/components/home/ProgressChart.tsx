import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp } from 'lucide-react';

const mockData = [
  { date: '1 Дек', weight: 60, reps: 8 },
  { date: '8 Дек', weight: 65, reps: 8 },
  { date: '15 Дек', weight: 67.5, reps: 10 },
  { date: '22 Дек', weight: 70, reps: 10 },
  { date: '29 Дек', weight: 72.5, reps: 12 },
  { date: '5 Янв', weight: 75, reps: 12 },
];

const emptyData: any[] = [];

export function ProgressChart() {
  const [period, setPeriod] = useState('month');
  const [exercise, setExercise] = useState('bench');
  const [metric, setMetric] = useState('weight');
  const [hasData, setHasData] = useState(true);

  const data = hasData ? mockData : emptyData;

  return (
    <div className="glass rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-xl bg-[hsl(var(--primary))]/10">
          <TrendingUp className="w-6 h-6 text-[hsl(var(--primary))]" />
        </div>
        <h2 className="text-white">График прогресса</h2>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-[hsl(var(--primary))] transition-colors"
        >
          <option value="week">Неделя</option>
          <option value="month">Месяц</option>
          <option value="quarter">3 месяца</option>
          <option value="year">Год</option>
        </select>

        <select
          value={exercise}
          onChange={(e) => setExercise(e.target.value)}
          className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-[hsl(var(--primary))] transition-colors"
        >
          <option value="bench">Жим лежа</option>
          <option value="squat">Приседания</option>
          <option value="deadlift">Становая тяга</option>
          <option value="pullup">Подтягивания</option>
        </select>

        <select
          value={metric}
          onChange={(e) => setMetric(e.target.value)}
          className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-[hsl(var(--primary))] transition-colors"
        >
          <option value="weight">Вес (кг)</option>
          <option value="reps">Повторения</option>
          <option value="volume">Объем</option>
        </select>
      </div>

      {/* Chart */}
      {hasData ? (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis 
              dataKey="date" 
              stroke="rgba(255,255,255,0.4)" 
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              stroke="rgba(255,255,255,0.4)" 
              style={{ fontSize: '12px' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(20, 20, 30, 0.95)', 
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
                padding: '12px'
              }}
              labelStyle={{ color: 'rgba(255,255,255,0.6)' }}
              itemStyle={{ color: '#fff' }}
            />
            <Line 
              type="monotone" 
              dataKey={metric} 
              stroke="hsl(142, 76%, 36%)" 
              strokeWidth={3}
              dot={{ fill: 'hsl(142, 76%, 36%)', r: 6 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <div className="h-[300px] flex items-center justify-center">
          <div className="text-center text-white/40">
            <TrendingUp className="w-12 h-12 mx-auto mb-4 opacity-20" />
            <p>Нет данных для отображения</p>
            <p className="text-sm mt-2">Добавьте тренировки, чтобы увидеть прогресс</p>
          </div>
        </div>
      )}

      {/* Toggle for demo */}
      <button
        onClick={() => setHasData(!hasData)}
        className="mt-4 text-xs text-white/40 hover:text-white/60 transition-colors"
      >
        {hasData ? 'Скрыть данные' : 'Показать данные'}
      </button>
    </div>
  );
}
