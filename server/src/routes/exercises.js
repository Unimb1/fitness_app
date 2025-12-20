import express from 'express';
import Exercise from '../models/Exercise.js';
import { authenticate, optionalAuth } from '../middleware/auth.js';

const router = express.Router();

// Get all exercises (user's custom + default)
router.get('/', optionalAuth, async (req, res) => {
  try {
    const customExercises = req.user 
      ? await Exercise.find({ userId: req.user._id })
      : [];

    // Default exercises (can be extended)
    const defaultExercises = [
      { name: 'Жим лежа', muscleGroup: 'chest', metValue: 6.0, isCustom: false },
      { name: 'Жим гантелей', muscleGroup: 'chest', metValue: 6.0, isCustom: false },
      { name: 'Разводка гантелей', muscleGroup: 'chest', metValue: 5.0, isCustom: false },
      { name: 'Отжимания на брусьях', muscleGroup: 'chest', metValue: 8.0, isCustom: false },
      { name: 'Подтягивания', muscleGroup: 'back', metValue: 8.0, isCustom: false },
      { name: 'Тяга штанги', muscleGroup: 'back', metValue: 6.0, isCustom: false },
      { name: 'Тяга гантели', muscleGroup: 'back', metValue: 5.5, isCustom: false },
      { name: 'Тяга верхнего блока', muscleGroup: 'back', metValue: 5.0, isCustom: false },
      { name: 'Приседания', muscleGroup: 'legs', metValue: 8.0, isCustom: false },
      { name: 'Жим ногами', muscleGroup: 'legs', metValue: 7.0, isCustom: false },
      { name: 'Выпады', muscleGroup: 'legs', metValue: 6.5, isCustom: false },
      { name: 'Разгибания ног', muscleGroup: 'legs', metValue: 5.0, isCustom: false },
      { name: 'Жим стоя', muscleGroup: 'shoulders', metValue: 6.0, isCustom: false },
      { name: 'Махи в стороны', muscleGroup: 'shoulders', metValue: 4.5, isCustom: false },
      { name: 'Тяга к подбородку', muscleGroup: 'shoulders', metValue: 5.5, isCustom: false },
      { name: 'Подъем на бицепс', muscleGroup: 'arms', metValue: 5.0, isCustom: false },
      { name: 'Французский жим', muscleGroup: 'arms', metValue: 5.0, isCustom: false },
      { name: 'Молотки', muscleGroup: 'arms', metValue: 5.0, isCustom: false },
      { name: 'Разгибания на трицепс', muscleGroup: 'arms', metValue: 4.5, isCustom: false },
    ];

    res.json([...defaultExercises, ...customExercises]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user's custom exercises
router.get('/custom', authenticate, async (req, res) => {
  try {
    const exercises = await Exercise.find({ userId: req.user._id });
    res.json(exercises);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create custom exercise
router.post('/', authenticate, async (req, res) => {
  try {
    const exercise = new Exercise({
      ...req.body,
      userId: req.user._id,
      isCustom: true
    });
    await exercise.save();
    res.status(201).json(exercise);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update custom exercise
router.put('/:id', authenticate, async (req, res) => {
  try {
    const exercise = await Exercise.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!exercise) {
      return res.status(404).json({ error: 'Exercise not found' });
    }

    res.json(exercise);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete custom exercise
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const exercise = await Exercise.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!exercise) {
      return res.status(404).json({ error: 'Exercise not found' });
    }

    res.json({ message: 'Exercise deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

