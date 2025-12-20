import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import workoutRoutes from './routes/workouts.js';
import userRoutes from './routes/users.js';
import goalRoutes from './routes/goals.js';
import measurementRoutes from './routes/measurements.js';
import exerciseRoutes from './routes/exercises.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/workouts', workoutRoutes);
app.use('/api/users', userRoutes);
app.use('/api/goals', goalRoutes);
app.use('/api/measurements', measurementRoutes);
app.use('/api/exercises', exerciseRoutes);

// Root route for Railway health check
app.get('/', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Fitness App API is running',
    timestamp: new Date().toISOString()
  });
});

// Health check
app.get('/api/health', (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
  res.json({ 
    status: 'ok', 
    message: 'Fitness App API is running',
    database: dbStatus,
    timestamp: new Date().toISOString()
  });
});

// Start server first
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 MongoDB URI: ${process.env.MONGODB_URI ? 'Set' : 'Not set'}`);
});

// Database connection
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;
    
    if (!mongoURI) {
      console.warn('⚠️  MONGODB_URI not set, using default localhost');
    }
    
    await mongoose.connect(mongoURI || 'mongodb://localhost:27017/fitness_app', {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    console.error('⚠️  Server will continue running but database features may not work');
    // Don't exit - let server run even without DB
  }
};

// Connect to database
connectDB();

// Handle MongoDB connection events
mongoose.connection.on('disconnected', () => {
  console.warn('⚠️  MongoDB disconnected');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB error:', err);
});

export default app;

