import express from 'express';
import { WeightEntry, BodyMeasurement, PhotoProgress } from '../models/Measurement.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Weight entries
router.get('/weight', authenticate, async (req, res) => {
  try {
    const entries = await WeightEntry.find({ userId: req.user._id })
      .sort({ date: -1 });
    res.json(entries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/weight', authenticate, async (req, res) => {
  try {
    const entry = new WeightEntry({
      ...req.body,
      userId: req.user._id
    });
    await entry.save();
    res.status(201).json(entry);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/weight/:id', authenticate, async (req, res) => {
  try {
    const entry = await WeightEntry.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true }
    );
    if (!entry) {
      return res.status(404).json({ error: 'Entry not found' });
    }
    res.json(entry);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/weight/:id', authenticate, async (req, res) => {
  try {
    const entry = await WeightEntry.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id
    });
    if (!entry) {
      return res.status(404).json({ error: 'Entry not found' });
    }
    res.json({ message: 'Entry deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Body measurements
router.get('/body', authenticate, async (req, res) => {
  try {
    const measurements = await BodyMeasurement.find({ userId: req.user._id })
      .sort({ date: -1 });
    res.json(measurements);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/body', authenticate, async (req, res) => {
  try {
    const measurement = new BodyMeasurement({
      ...req.body,
      userId: req.user._id
    });
    await measurement.save();
    res.status(201).json(measurement);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/body/:id', authenticate, async (req, res) => {
  try {
    const measurement = await BodyMeasurement.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true }
    );
    if (!measurement) {
      return res.status(404).json({ error: 'Measurement not found' });
    }
    res.json(measurement);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/body/:id', authenticate, async (req, res) => {
  try {
    const measurement = await BodyMeasurement.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id
    });
    if (!measurement) {
      return res.status(404).json({ error: 'Measurement not found' });
    }
    res.json({ message: 'Measurement deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Photo progress
router.get('/photos', authenticate, async (req, res) => {
  try {
    const photos = await PhotoProgress.find({ userId: req.user._id })
      .sort({ date: -1 });
    res.json(photos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/photos', authenticate, async (req, res) => {
  try {
    const photo = new PhotoProgress({
      ...req.body,
      userId: req.user._id
    });
    await photo.save();
    res.status(201).json(photo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/photos/:id', authenticate, async (req, res) => {
  try {
    const photo = await PhotoProgress.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id
    });
    if (!photo) {
      return res.status(404).json({ error: 'Photo not found' });
    }
    res.json({ message: 'Photo deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

