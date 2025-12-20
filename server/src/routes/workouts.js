import express from 'express';
import Workout from '../models/Workout.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Get all workouts for user
router.get('/', authenticate, async (req, res) => {
  try {
    const workouts = await Workout.find({ userId: req.user._id })
      .sort({ date: -1 })
      .limit(50);
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get recent workouts
router.get('/recent', authenticate, async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 5;
    const workouts = await Workout.find({ userId: req.user._id, isDraft: false })
      .sort({ date: -1 })
      .limit(limit)
      .select('name date duration exercises.length');
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single workout
router.get('/:id', authenticate, async (req, res) => {
  try {
    const workout = await Workout.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!workout) {
      return res.status(404).json({ error: 'Workout not found' });
    }

    res.json(workout);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create workout
router.post('/', authenticate, async (req, res) => {
  try {
    const workoutData = {
      ...req.body,
      userId: req.user._id
    };

    const workout = new Workout(workoutData);
    await workout.save();
    res.status(201).json(workout);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update workout
router.put('/:id', authenticate, async (req, res) => {
  try {
    const workout = await Workout.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!workout) {
      return res.status(404).json({ error: 'Workout not found' });
    }

    res.json(workout);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete workout
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const workout = await Workout.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!workout) {
      return res.status(404).json({ error: 'Workout not found' });
    }

    res.json({ message: 'Workout deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get workout statistics
router.get('/stats/summary', authenticate, async (req, res) => {
  try {
    const totalWorkouts = await Workout.countDocuments({
      userId: req.user._id,
      isDraft: false
    });

    const totalExercises = await Workout.aggregate([
      { $match: { userId: req.user._id, isDraft: false } },
      { $unwind: '$exercises' },
      { $count: 'total' }
    ]);

    const totalDuration = await Workout.aggregate([
      { $match: { userId: req.user._id, isDraft: false } },
      { $group: { _id: null, total: { $sum: '$duration' } } }
    ]);

    res.json({
      totalWorkouts,
      totalExercises: totalExercises[0]?.total || 0,
      totalDuration: totalDuration[0]?.total || 0
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

