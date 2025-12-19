import { useState } from 'react';
import { Calculator as CalcIcon, Dumbbell, Flame, Scale, TrendingUp, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type CalculatorType = 'oneRM' | 'calories' | 'barbell' | 'idealWeight';

interface CalculatorProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Calculator({ isOpen, onClose }: CalculatorProps) {
  const [activeCalc, setActiveCalc] = useState<CalculatorType>('oneRM');

  const calculators = [
    { id: 'oneRM' as const, label: '1RM', icon: Dumbbell, color: 'bg-blue-500/10 text-blue-400' },
    { id: 'calories' as const, label: 'Калории', icon: Flame, color: 'bg-orange-500/10 text-orange-400' },
    { id: 'barbell' as const, label: 'Штанга', icon: TrendingUp, color: 'bg-purple-500/10 text-purple-400' },
    { id: 'idealWeight' as const, label: 'Идеальный вес', icon: Scale, color: 'bg-green-500/10 text-green-400' },
  ];

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
          className="glass-strong rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-white">Калькуляторы</h1>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
            >
              <X className="w-5 h-5 text-white/60" />
            </button>
          </div>

          {/* Calculator Type Selector */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
            {calculators.map((calc) => {
              const Icon = calc.icon;
              const isActive = activeCalc === calc.id;
              return (
                <motion.button
                  key={calc.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveCalc(calc.id)}
                  className={`glass rounded-xl p-4 flex flex-col items-center gap-3 transition-all duration-300 min-h-[100px] ${
                    isActive ? 'ring-2 ring-[hsl(var(--primary))] bg-white/5' : 'hover:bg-white/5'
                  }`}
                >
                  <div className={`p-3 rounded-xl ${calc.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-sm text-white text-center">{calc.label}</span>
                </motion.button>
              );
            })}
          </div>

          {/* Calculator Content */}
          <motion.div
            key={activeCalc}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {activeCalc === 'oneRM' && <OneRMCalculator />}
            {activeCalc === 'calories' && <CaloriesCalculator />}
            {activeCalc === 'barbell' && <BarbellCalculator />}
            {activeCalc === 'idealWeight' && <IdealWeightCalculator />}
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function OneRMCalculator() {
  const [weight, setWeight] = useState('100');
  const [reps, setReps] = useState('5');
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const w = parseFloat(weight);
    const r = parseInt(reps);
    if (w && r) {
      // Brzycki formula: 1RM = weight × (36 / (37 - reps))
      const oneRM = w * (36 / (37 - r));
      setResult(Math.round(oneRM * 10) / 10);
    }
  };

  const getPercentages = () => {
    if (!result) return [];
    return [
      { percent: 95, label: '95%', value: Math.round(result * 0.95 * 10) / 10 },
      { percent: 90, label: '90%', value: Math.round(result * 0.90 * 10) / 10 },
      { percent: 85, label: '85%', value: Math.round(result * 0.85 * 10) / 10 },
      { percent: 80, label: '80%', value: Math.round(result * 0.80 * 10) / 10 },
      { percent: 75, label: '75%', value: Math.round(result * 0.75 * 10) / 10 },
      { percent: 70, label: '70%', value: Math.round(result * 0.70 * 10) / 10 },
    ];
  };

  return (
    <div className="glass rounded-2xl p-6 space-y-6">
      <div>
        <h2 className="text-white mb-2">Калькулятор 1RM</h2>
        <p className="text-white/60 text-sm">
          Рассчитайте свой одноповторный максимум (1RM) на основе веса и количества повторений
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-white/60 mb-2">Вес (кг)</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-[hsl(var(--primary))] transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm text-white/60 mb-2">Повторения</label>
          <input
            type="number"
            value={reps}
            onChange={(e) => setReps(e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-[hsl(var(--primary))] transition-colors"
          />
        </div>
      </div>

      <button
        onClick={calculate}
        className="w-full px-6 py-4 bg-[hsl(var(--primary))] text-white rounded-xl hover:bg-[hsl(var(--primary))]/90 transition-all duration-300 min-h-[44px]"
      >
        Рассчитать
      </button>

      {result && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-strong rounded-xl p-6 text-center"
        >
          <p className="text-white/60 text-sm mb-2">Ваш 1RM</p>
          <p className="text-4xl text-[hsl(var(--primary))]">{result} кг</p>

          <div className="mt-6 space-y-3">
            <p className="text-white/60 text-sm mb-3">Рекомендуемые веса</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {getPercentages().map((item) => (
                <div key={item.percent} className="bg-white/5 rounded-lg p-3">
                  <p className="text-white/60 text-xs mb-1">{item.label}</p>
                  <p className="text-white">{item.value} кг</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

function CaloriesCalculator() {
  const [weight, setWeight] = useState('75');
  const [height, setHeight] = useState('180');
  const [age, setAge] = useState('25');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [activity, setActivity] = useState('1.55');
  const [result, setResult] = useState<{ bmr: number; tdee: number } | null>(null);

  const calculate = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const a = parseInt(age);
    const act = parseFloat(activity);

    if (w && h && a) {
      // Mifflin-St Jeor formula
      let bmr: number;
      if (gender === 'male') {
        bmr = 10 * w + 6.25 * h - 5 * a + 5;
      } else {
        bmr = 10 * w + 6.25 * h - 5 * a - 161;
      }
      const tdee = bmr * act;
      setResult({ bmr: Math.round(bmr), tdee: Math.round(tdee) });
    }
  };

  return (
    <div className="glass rounded-2xl p-6 space-y-6">
      <div>
        <h2 className="text-white mb-2">Калькулятор калорий</h2>
        <p className="text-white/60 text-sm">
          Рассчитайте базовый обмен веществ (BMR) и дневную норму калорий (TDEE)
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-white/60 mb-2">Вес (кг)</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-[hsl(var(--primary))] transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm text-white/60 mb-2">Рост (см)</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-[hsl(var(--primary))] transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm text-white/60 mb-2">Возраст</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-[hsl(var(--primary))] transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm text-white/60 mb-2">Пол</label>
          <div className="flex gap-2">
            <button
              onClick={() => setGender('male')}
              className={`flex-1 px-4 py-3 rounded-xl transition-colors min-h-[44px] ${
                gender === 'male'
                  ? 'bg-[hsl(var(--primary))] text-white'
                  : 'bg-white/5 text-white/60 hover:bg-white/10'
              }`}
            >
              Мужской
            </button>
            <button
              onClick={() => setGender('female')}
              className={`flex-1 px-4 py-3 rounded-xl transition-colors min-h-[44px] ${
                gender === 'female'
                  ? 'bg-[hsl(var(--primary))] text-white'
                  : 'bg-white/5 text-white/60 hover:bg-white/10'
              }`}
            >
              Женский
            </button>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm text-white/60 mb-2">Уровень активности</label>
        <select
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-[hsl(var(--primary))] transition-colors"
        >
          <option value="1.2">Минимальная (сидячий образ жизни)</option>
          <option value="1.375">Легкая (1-3 тренировки в неделю)</option>
          <option value="1.55">Средняя (3-5 тренировок в неделю)</option>
          <option value="1.725">Высокая (6-7 тренировок в неделю)</option>
          <option value="1.9">Очень высокая (спортсмены)</option>
        </select>
      </div>

      <button
        onClick={calculate}
        className="w-full px-6 py-4 bg-[hsl(var(--primary))] text-white rounded-xl hover:bg-[hsl(var(--primary))]/90 transition-all duration-300 min-h-[44px]"
      >
        Рассчитать
      </button>

      {result && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          <div className="glass-strong rounded-xl p-6 text-center">
            <p className="text-white/60 text-sm mb-2">BMR (базовый обмен)</p>
            <p className="text-3xl text-[hsl(var(--primary))]">{result.bmr}</p>
            <p className="text-white/60 text-sm mt-1">ккал/день</p>
          </div>
          <div className="glass-strong rounded-xl p-6 text-center">
            <p className="text-white/60 text-sm mb-2">TDEE (дневная норма)</p>
            <p className="text-3xl text-[hsl(var(--primary))]">{result.tdee}</p>
            <p className="text-white/60 text-sm mt-1">ккал/день</p>
          </div>
        </motion.div>
      )}
    </div>
  );
}

function BarbellCalculator() {
  const [targetWeight, setTargetWeight] = useState('100');
  const [barWeight, setBarWeight] = useState('20');

  const availablePlates = [25, 20, 15, 10, 5, 2.5, 1.25];

  const calculatePlates = () => {
    const target = parseFloat(targetWeight);
    const bar = parseFloat(barWeight);
    
    if (!target || !bar || target < bar) return null;

    const weightPerSide = (target - bar) / 2;
    const plates: { weight: number; count: number }[] = [];
    let remaining = weightPerSide;

    for (const plate of availablePlates) {
      const count = Math.floor(remaining / plate);
      if (count > 0) {
        plates.push({ weight: plate, count });
        remaining -= plate * count;
      }
    }

    return plates;
  };

  const plates = calculatePlates();

  return (
    <div className="glass rounded-2xl p-6 space-y-6">
      <div>
        <h2 className="text-white mb-2">Калькулятор веса штанги</h2>
        <p className="text-white/60 text-sm">
          Узнайте, какие диски нужно повесить на штангу для достижения нужного веса
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-white/60 mb-2">Целевой вес (кг)</label>
          <input
            type="number"
            value={targetWeight}
            onChange={(e) => setTargetWeight(e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-[hsl(var(--primary))] transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm text-white/60 mb-2">Вес грифа (кг)</label>
          <input
            type="number"
            value={barWeight}
            onChange={(e) => setBarWeight(e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-[hsl(var(--primary))] transition-colors"
          />
        </div>
      </div>

      {plates && plates.length > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-strong rounded-xl p-6"
        >
          <p className="text-white mb-4">Диски на каждую сторону:</p>
          <div className="space-y-3">
            {plates.map((plate, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-white/5 rounded-lg p-4"
              >
                <span className="text-white">{plate.weight} кг</span>
                <span className="text-[hsl(var(--primary))]">× {plate.count}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-white/10">
            <p className="text-white/60 text-sm">
              Общий вес: {parseFloat(targetWeight)} кг
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}

function IdealWeightCalculator() {
  const [height, setHeight] = useState('180');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [result, setResult] = useState<{ devine: number; robinson: number; miller: number } | null>(null);

  const calculate = () => {
    const h = parseFloat(height);
    if (!h) return;

    const heightInInches = h / 2.54;
    let devine: number, robinson: number, miller: number;

    if (gender === 'male') {
      devine = 50 + 2.3 * (heightInInches - 60);
      robinson = 52 + 1.9 * (heightInInches - 60);
      miller = 56.2 + 1.41 * (heightInInches - 60);
    } else {
      devine = 45.5 + 2.3 * (heightInInches - 60);
      robinson = 49 + 1.7 * (heightInInches - 60);
      miller = 53.1 + 1.36 * (heightInInches - 60);
    }

    setResult({
      devine: Math.round(devine * 10) / 10,
      robinson: Math.round(robinson * 10) / 10,
      miller: Math.round(miller * 10) / 10,
    });
  };

  return (
    <div className="glass rounded-2xl p-6 space-y-6">
      <div>
        <h2 className="text-white mb-2">Калькулятор идеального веса</h2>
        <p className="text-white/60 text-sm">
          Рассчитайте идеальный вес по различным формулам
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm text-white/60 mb-2">Рост (см)</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-[hsl(var(--primary))] transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm text-white/60 mb-2">Пол</label>
          <div className="flex gap-2">
            <button
              onClick={() => setGender('male')}
              className={`flex-1 px-4 py-3 rounded-xl transition-colors min-h-[44px] ${
                gender === 'male'
                  ? 'bg-[hsl(var(--primary))] text-white'
                  : 'bg-white/5 text-white/60 hover:bg-white/10'
              }`}
            >
              Мужской
            </button>
            <button
              onClick={() => setGender('female')}
              className={`flex-1 px-4 py-3 rounded-xl transition-colors min-h-[44px] ${
                gender === 'female'
                  ? 'bg-[hsl(var(--primary))] text-white'
                  : 'bg-white/5 text-white/60 hover:bg-white/10'
              }`}
            >
              Женский
            </button>
          </div>
        </div>
      </div>

      <button
        onClick={calculate}
        className="w-full px-6 py-4 bg-[hsl(var(--primary))] text-white rounded-xl hover:bg-[hsl(var(--primary))]/90 transition-all duration-300 min-h-[44px]"
      >
        Рассчитать
      </button>

      {result && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-3"
        >
          <div className="glass-strong rounded-xl p-4">
            <p className="text-white/60 text-sm mb-1">Формула Devine</p>
            <p className="text-2xl text-[hsl(var(--primary))]">{result.devine} кг</p>
          </div>
          <div className="glass-strong rounded-xl p-4">
            <p className="text-white/60 text-sm mb-1">Формула Robinson</p>
            <p className="text-2xl text-[hsl(var(--primary))]">{result.robinson} кг</p>
          </div>
          <div className="glass-strong rounded-xl p-4">
            <p className="text-white/60 text-sm mb-1">Формула Miller</p>
            <p className="text-2xl text-[hsl(var(--primary))]">{result.miller} кг</p>
          </div>
          <div className="glass-strong rounded-xl p-4 text-center">
            <p className="text-white/60 text-sm mb-1">Средний идеальный вес</p>
            <p className="text-3xl text-[hsl(var(--primary))]">
              {Math.round(((result.devine + result.robinson + result.miller) / 3) * 10) / 10} кг
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}