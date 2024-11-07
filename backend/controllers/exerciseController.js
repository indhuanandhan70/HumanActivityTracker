// backend/controllers/exerciseController.js
const Exercise = require('../models/Exercise');

// Get all exercises
const getExercises = async (req, res) => {
  try {
    const exercises = await Exercise.find();
    res.json(exercises);
  } catch (error) {
    console.error('Error fetching exercises:', error);
    res.status(500).json({ message: 'Failed to fetch exercises' });
  }
};

module.exports = {
  getExercises,
};
