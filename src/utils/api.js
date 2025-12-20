const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Helper function to get auth token
const getToken = () => {
  return localStorage.getItem('authToken');
};

// Helper function to set auth token
const setToken = (token) => {
  if (token) {
    localStorage.setItem('authToken', token);
  } else {
    localStorage.removeItem('authToken');
  }
};

// Base fetch wrapper
const apiRequest = async (endpoint, options = {}) => {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Request failed');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Auth API
export const authAPI = {
  register: async (email, password, name) => {
    const data = await apiRequest('/users/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    });
    if (data.token) {
      setToken(data.token);
    }
    return data;
  },

  login: async (email, password) => {
    const data = await apiRequest('/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    if (data.token) {
      setToken(data.token);
    }
    return data;
  },

  logout: () => {
    setToken(null);
  },

  getCurrentUser: async () => {
    return apiRequest('/users/me');
  },

  updateProfile: async (profileData) => {
    return apiRequest('/users/me', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  },
};

// Workouts API
export const workoutsAPI = {
  getAll: async () => {
    return apiRequest('/workouts');
  },

  getRecent: async (limit = 5) => {
    return apiRequest(`/workouts/recent?limit=${limit}`);
  },

  getById: async (id) => {
    return apiRequest(`/workouts/${id}`);
  },

  create: async (workoutData) => {
    return apiRequest('/workouts', {
      method: 'POST',
      body: JSON.stringify(workoutData),
    });
  },

  update: async (id, workoutData) => {
    return apiRequest(`/workouts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(workoutData),
    });
  },

  delete: async (id) => {
    return apiRequest(`/workouts/${id}`, {
      method: 'DELETE',
    });
  },

  getStats: async () => {
    return apiRequest('/workouts/stats/summary');
  },
};

// Goals API
export const goalsAPI = {
  getAll: async () => {
    return apiRequest('/goals');
  },

  getById: async (id) => {
    return apiRequest(`/goals/${id}`);
  },

  create: async (goalData) => {
    return apiRequest('/goals', {
      method: 'POST',
      body: JSON.stringify(goalData),
    });
  },

  update: async (id, goalData) => {
    return apiRequest(`/goals/${id}`, {
      method: 'PUT',
      body: JSON.stringify(goalData),
    });
  },

  delete: async (id) => {
    return apiRequest(`/goals/${id}`, {
      method: 'DELETE',
    });
  },
};

// Measurements API
export const measurementsAPI = {
  // Weight entries
  getWeightEntries: async () => {
    return apiRequest('/measurements/weight');
  },

  createWeightEntry: async (entryData) => {
    return apiRequest('/measurements/weight', {
      method: 'POST',
      body: JSON.stringify(entryData),
    });
  },

  updateWeightEntry: async (id, entryData) => {
    return apiRequest(`/measurements/weight/${id}`, {
      method: 'PUT',
      body: JSON.stringify(entryData),
    });
  },

  deleteWeightEntry: async (id) => {
    return apiRequest(`/measurements/weight/${id}`, {
      method: 'DELETE',
    });
  },

  // Body measurements
  getBodyMeasurements: async () => {
    return apiRequest('/measurements/body');
  },

  createBodyMeasurement: async (measurementData) => {
    return apiRequest('/measurements/body', {
      method: 'POST',
      body: JSON.stringify(measurementData),
    });
  },

  updateBodyMeasurement: async (id, measurementData) => {
    return apiRequest(`/measurements/body/${id}`, {
      method: 'PUT',
      body: JSON.stringify(measurementData),
    });
  },

  deleteBodyMeasurement: async (id) => {
    return apiRequest(`/measurements/body/${id}`, {
      method: 'DELETE',
    });
  },

  // Photo progress
  getPhotos: async () => {
    return apiRequest('/measurements/photos');
  },

  createPhoto: async (photoData) => {
    return apiRequest('/measurements/photos', {
      method: 'POST',
      body: JSON.stringify(photoData),
    });
  },

  deletePhoto: async (id) => {
    return apiRequest(`/measurements/photos/${id}`, {
      method: 'DELETE',
    });
  },
};

// Exercises API
export const exercisesAPI = {
  getAll: async () => {
    return apiRequest('/exercises');
  },

  getCustom: async () => {
    return apiRequest('/exercises/custom');
  },

  create: async (exerciseData) => {
    return apiRequest('/exercises', {
      method: 'POST',
      body: JSON.stringify(exerciseData),
    });
  },

  update: async (id, exerciseData) => {
    return apiRequest(`/exercises/${id}`, {
      method: 'PUT',
      body: JSON.stringify(exerciseData),
    });
  },

  delete: async (id) => {
    return apiRequest(`/exercises/${id}`, {
      method: 'DELETE',
    });
  },
};

export default {
  auth: authAPI,
  workouts: workoutsAPI,
  goals: goalsAPI,
  measurements: measurementsAPI,
  exercises: exercisesAPI,
};

