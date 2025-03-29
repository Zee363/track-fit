const express = require("express");
const router = express.Router();
const exerciseController = require('../Controllers/exerciseController');

// Routes for GET requests
router.get('/exercises', exerciseController.getAllExercises);
router.get('/new-exercises', exerciseController.getAllNewExercises);
router.get('/category/:category', exerciseController.getExercisesByCategory);

// Routes for POST requests
router.post('/exercises/add-all-exercises', exerciseController.addAllExercises);
router.post('/exercises/add-exercise', exerciseController.addExercise);

// Route for PUT requests
router.put('/exercises/:id', exerciseController.updateExercise);

// Route for DELETE requests
router.delete('/exercises/:id', exerciseController.deleteExerciseById);

module.exports = router;