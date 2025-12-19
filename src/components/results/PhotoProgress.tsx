import { useState } from 'react';
import { Upload, Calendar } from 'lucide-react';
import { motion } from 'motion/react';

interface PhotoEntry {
  id: string;
  date: string;
  week: number;
  front?: string;
  side?: string;
  back?: string;
}

export function PhotoProgress() {
  const [entries, setEntries] = useState<PhotoEntry[]>([
    { id: '1', date: '2025-11-01', week: 1 },
    { id: '2', date: '2025-11-08', week: 2 },
    { id: '3', date: '2025-11-15', week: 3 },
    { id: '4', date: '2025-11-22', week: 4 },
  ]);

  const [showUploadForm, setShowUploadForm] = useState(false);

  return (
    <div className="space-y-6">
      <div className="glass rounded-2xl p-6">
        <h2 className="text-white mb-6">Понедельный прогресс</h2>

        {/* Upload Button */}
        <button
          onClick={() => setShowUploadForm(!showUploadForm)}
          className="w-full glass-strong rounded-xl px-6 py-4 flex items-center justify-center gap-2 text-white hover:bg-white/5 transition-all duration-300 mb-6 min-h-[44px]"
        >
          <Upload className="w-5 h-5" />
          <span>Загрузить фото</span>
        </button>

        {showUploadForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="glass-strong rounded-xl p-6 mb-6"
          >
            <h3 className="text-white mb-4">Добавить фотографии</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-white/60 mb-2">Дата съемки</label>
                <input
                  type="date"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-[hsl(var(--primary))] transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm text-white/60 mb-2">Спереди</label>
                  <div className="aspect-[3/4] bg-white/5 border-2 border-dashed border-white/10 rounded-xl flex items-center justify-center hover:border-[hsl(var(--primary))]/40 transition-colors cursor-pointer">
                    <Upload className="w-8 h-8 text-white/40" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-white/60 mb-2">Сбоку</label>
                  <div className="aspect-[3/4] bg-white/5 border-2 border-dashed border-white/10 rounded-xl flex items-center justify-center hover:border-[hsl(var(--primary))]/40 transition-colors cursor-pointer">
                    <Upload className="w-8 h-8 text-white/40" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-white/60 mb-2">Сзади</label>
                  <div className="aspect-[3/4] bg-white/5 border-2 border-dashed border-white/10 rounded-xl flex items-center justify-center hover:border-[hsl(var(--primary))]/40 transition-colors cursor-pointer">
                    <Upload className="w-8 h-8 text-white/40" />
                  </div>
                </div>
              </div>

              <button className="w-full px-6 py-3 bg-[hsl(var(--primary))] text-white rounded-xl hover:bg-[hsl(var(--primary))]/90 transition-colors min-h-[44px]">
                Сохранить
              </button>
            </div>
          </motion.div>
        )}

        {/* Timeline */}
        <div className="space-y-6">
          {entries.map((entry, index) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-strong rounded-xl p-5"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-[hsl(var(--primary))]/10">
                  <Calendar className="w-5 h-5 text-[hsl(var(--primary))]" />
                </div>
                <div>
                  <h3 className="text-white">Неделя {entry.week}</h3>
                  <p className="text-sm text-white/60">
                    {new Date(entry.date).toLocaleDateString('ru-RU', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="aspect-[3/4] bg-white/5 border border-white/10 rounded-xl flex items-center justify-center">
                  <div className="text-center text-white/40">
                    <Upload className="w-6 h-6 mx-auto mb-2" />
                    <p className="text-xs">Фото спереди</p>
                  </div>
                </div>

                <div className="aspect-[3/4] bg-white/5 border border-white/10 rounded-xl flex items-center justify-center">
                  <div className="text-center text-white/40">
                    <Upload className="w-6 h-6 mx-auto mb-2" />
                    <p className="text-xs">Фото сбоку</p>
                  </div>
                </div>

                <div className="aspect-[3/4] bg-white/5 border border-white/10 rounded-xl flex items-center justify-center">
                  <div className="text-center text-white/40">
                    <Upload className="w-6 h-6 mx-auto mb-2" />
                    <p className="text-xs">Фото сзади</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
