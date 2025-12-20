import mongoose from 'mongoose';

const goalSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  targetValue: {
    type: Number,
    required: true
  },
  currentValue: {
    type: Number,
    default: 0
  },
  unit: {
    type: String,
    required: true // 'kg', 'reps', 'days', etc.
  },
  deadline: {
    type: Date
  },
  color: {
    type: String,
    default: '#4ECDC4'
  },
  category: {
    type: String,
    enum: ['weight', 'strength', 'endurance', 'body', 'custom'],
    default: 'custom'
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Date
  }
}, {
  timestamps: true
});

goalSchema.index({ userId: 1, completed: 1 });

export default mongoose.model('Goal', goalSchema);

