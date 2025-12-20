import mongoose from 'mongoose';

const weightEntrySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  weight: {
    type: Number,
    required: true
  },
  bodyFat: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

const bodyMeasurementSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  chest: Number,
  waist: Number,
  hips: Number,
  biceps: Number,
  thighs: Number,
  neck: Number,
  shoulders: Number,
  notes: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

const photoProgressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  photoUrl: {
    type: String,
    required: true
  },
  notes: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

export const WeightEntry = mongoose.model('WeightEntry', weightEntrySchema);
export const BodyMeasurement = mongoose.model('BodyMeasurement', bodyMeasurementSchema);
export const PhotoProgress = mongoose.model('PhotoProgress', photoProgressSchema);

