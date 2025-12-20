import mongoose from 'mongoose';

const exerciseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  muscleGroup: {
    type: String,
    enum: ['chest', 'back', 'shoulders', 'arms', 'legs', 'core', 'cardio', 'other'],
    default: 'other'
  },
  description: {
    type: String,
    default: ''
  },
  videoUrl: {
    type: String,
    default: ''
  },
  isCustom: {
    type: Boolean,
    default: true
  },
  metValue: {
    type: Number,
    default: 6.0
  }
}, {
  timestamps: true
});

exerciseSchema.index({ userId: 1, name: 1 });

export default mongoose.model('Exercise', exerciseSchema);

