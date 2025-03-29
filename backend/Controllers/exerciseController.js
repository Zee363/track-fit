const Exercise = require('../models/Exercise');
const Workout = require('../models/Workout');
const mongoose = require("mongoose");


// Controller for inserting the initial ata into the database
exports.addAllExercises = async (req, res) => {
    const exercises = [
        { "name": "Burpees", "sets": 3, "reps": 10, "duration": "1 minute" },
        { "name": "Mountain Climbers", "sets": 3, "reps": 20, "duration": "1 minute" },
        { "name": "Squats", "sets": 4, "reps": 10, "rest": "60 seconds" },
        { "name": "Push-Ups", "sets": 3, "reps": 15, "rest": "60 seconds" }
    ];

    try {
        // Insert all exercises at once using insertMany
        const result = await Exercise.insertMany(exercises);

        res.status(201).json({ message: "Exercises added successfully", exercises: result });
    } catch (error) {
        console.error("Error adding exercises", error);
        res.status(500).json({ message: "Error adding exercises", error: error.message });
    }
};



// Controllers for fetching the data
exports.getAllExercises = async (req, res) => {
    try {
        const exercises = await Exercise.find(); 

       if(!exercises || exercises.length === 0) {
        return res.status(404).json({ message: "No exercises found." });
       }

        const groupedExercises = exercises.reduce((acc, exercise) => {
            if(!acc[exercise.category]) {
            acc[exercise.category] = [];
            }

            acc[exercise.category].push(exercise);
            return acc;
        }, {});

        return res.json(groupedExercises);
    }  catch (error) {
        res.status(500).json({ message: error.message });
    }
};
   
exports.getExercisesByCategory = async (req, res) => {
try {
    const { category } = req.params;

    const exercises = await Workout.find({ category });

    if (!exercises || exercises.length === 0) {
        return res.status(404).json({ message: `No exercises found for category: ${category}.` });
    }

    return res.json(exercises);
} catch (error) {
    // Handle any errors during the process
    return res.status(500).json({ message: error.message });
  }
};


// Controllers for adding data
exports.addExercise = async (req, res) => {
        try {
            console.log(req.body);
            const { name, sets, reps, duration, rest } = req.body;
    
            // Checking for required fields
            if (!name || !sets ) {
                return res.status(400).json({ message: "Required fields are missing or invalid" });
            }
    
    
            // Creating the new exercise
            const newExercise = new Workout({ 
                name,
                sets,
                reps,
                duration,
                rest,  
            });
    
            // Saving the exercise to the database
            const savedExercise = await newExercise.save();
    
            // Return success response
            res.status(201).json({ message: "Exercise added successfully", exercise: savedExercise });
        } catch (error) {
            console.error("Error adding exercise", error);
            res.status(500).json({ message: "Error adding exercise", error: error.message });
        }
    };    
 

// Controller for updating data  using IDs
exports.updateExercise = async (req, res) => {
        const { id } = req.params;
        const { name, sets, reps, duration, rest } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid Exercise ID" });
        }
        
        try {
        // Find exercise by ID and update it with the provided data
        const updatedExercise = await Workout.findByIdAndUpdate(id, { name, sets, reps, duration, rest }, req.body, {
            new: true,
        });

        
        if (!updatedExercise) {
            return res.status(404).json({ message: `Exercise with ID: ${id} not found.` });
        }

        return res.json(updatedExercise);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


// Controller for deleting an exercise using ID
exports.deleteExerciseById = async (req, res) => {
    try {
        const { id } = req.params;

        // Find and delete the exercise by ID
        const deletedExercise = await Workout.findByIdAndDelete(id);

        if (!deletedExercise) {
            return res.status(404).json({ message: `Exercise with ID ${id} not found.` });
        }

        res.json({ message: `Exercise with ID ${id} has been deleted successfully.` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller to fetch all exercises
exports.getAllNewExercises = async (req, res) => {
  try {
    // Fetch all exercises from the database
    const exercises = await Workout.find(); 

    // If no exercises found
    if (exercises.length === 0) {
      return res.status(404).json({ message: 'No exercises found' });
    }

    // Return the list of exercises
    res.status(200).json(exercises);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};


