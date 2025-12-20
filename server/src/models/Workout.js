import mongoose from 'mongoose';

const workoutSetSchema = new mongoose.Schema({
  weight: {
    type: Number,
    required: true,
    default: 0
  },
  reps: {
    type: Number,
    required: true,
    default: 0
  },
  drops: [{
    weight: Number,
    reps: Number
  }]
}, { _id: false });

const exerciseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['normal', 'dropset'],
    default: 'normal'
  },
  sets: [workoutSetSchema]
}, { _id: false });

const workoutSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  duration: {
    type: Number, // in seconds
    default: 0
  },
  restTime: {
    type: Number, // in seconds
    default: 90
  },
  exercises: [exerciseSchema],
  caloriesBurned: {
    type: Number,
    default: 0
  },
  isDraft: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Index for faster queries
workoutSchema.index({ userId: 1, date: -1 });

export default mongoose.model('Workout', workoutSchema);

