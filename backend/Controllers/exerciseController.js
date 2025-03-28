const Exercise = require('../models/Exercise');
const Log = require('../models/Log');
const mongoose = require("mongoose");


// Controller for inserting the initial ata into the database
exports.addAllExercises = async (req, res) => {
    const exercises = {
        "fullBody": [
            { "name": "Burpees", "sets": 3, "reps": 10, "duration": "1 minute" },
            { "name": "Mountain Climbers", "sets": 3, "reps": 20, "duration": "1 minute" },
            { "name": "Squats", "sets": 4, "reps": 10, "rest": "60 seconds" },
            { "name": "Push-Ups", "sets": 3, "reps": 15, "rest": "60 seconds" }
        ],
        "upperBody": [
            { "name": "Push-Ups", "sets": 3, "reps": 15, "rest": "60 seconds" },
            { "name": "Bench Press", "sets": 4, "reps": 10, "rest": "90 seconds" },
            { "name": "Chest Fly", "sets": 3, "reps": 12, "rest": "60 seconds" },
            { "name": "Overhead Shoulder Press", "sets": 3, "reps": 10, "rest": "60 seconds" },
            { "name": "Lateral Raise", "sets": 3, "reps": 12, "rest": "60 seconds" },
            { "name": "Bicep Curls", "sets": 3, "reps": 12, "rest": "60 seconds" },
            { "name": "Tricep Dips", "sets": 3, "reps": 12, "rest": "60 seconds" }
        ],
        "lowerBody": [
            { "name": "Squats", "sets": 4, "reps": 10, "rest": "60 seconds" },
            { "name": "Lunges", "sets": 3, "reps": 12, "rest": "60 seconds" },
            { "name": "Leg Press", "sets": 3, "reps": 10, "rest": "60 seconds" },
            { "name": "Deadlifts", "sets": 3, "reps": 8, "rest": "90 seconds" },
            { "name": "Bent-Over Row", "sets": 3, "reps": 12, "rest": "60 seconds" }
        ],
        "back": [
            { "name": "Deadlifts", "sets": 3, "reps": 8, "rest": "90 seconds" },
            { "name": "Bent-Over Rows", "sets": 3, "reps": 12, "rest": "60 seconds" },
            { "name": "Lat Pulldown", "sets": 3, "reps": 10, "rest": "60 seconds" }
        ],
        
        "cardio": [
            { "name": "Burpees", "sets": 3, "reps": 10, "duration": "1 minute" },
            { "name": "Jump Rope", "sets": 3, "reps": 60, "duration": "1 minute" },
            { "name": "Mountain Climbers", "sets": 3, "reps": 20, "duration": "1 minute" }
        ],
        "core": [
            { "name": "Planks", "sets": 3, "duration": "30-60 seconds", "rest": "30 seconds" },
            { "name": "Russian Twists", "sets": 3, "reps": 20, "rest": "30 seconds" },
            { "name": "Leg Raises", "sets": 3, "reps": 12, "rest": "30 seconds" }
        ]
    };

    try {
        // Array of all exercises with their category
        const allExercises = [];
        for (const category in exercises) {
            exercises[category].forEach(exercise => {
                allExercises.push({
                    ...exercise,
                    category // Add the category to the exercise object
                });
            });
        }

        // Insert all exercises at once using insertMany
        const result = await Exercise.insertMany(allExercises);

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

    const exercises = await Exercise.find({ category });

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
            const { category, name, sets, reps, duration, rest } = req.body;
    
            // Checking for required fields
            if (!name || !sets || !category) {
                return res.status(400).json({ message: "Required fields are missing or invalid" });
            }
    
    
            // Creating the new exercise
            const newExercise = new Exercise({
                category, 
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

    
    exports.addLog = async (req, res) => {
        try {
            console.log(req.body);
            const { exercise, sets, reps } = req.body;
    
            // Checking for required fields
            if ( !exercise || !sets || !reps) {
                return res.status(400).json({ message: "Required fields are missing or invalid" });
            }
    
    
            // Creating the new exercise
            const logExercise = new Log({
                exercise,
                sets, 
                reps
            });
    
            // Saving the exercise to the database
            const savedLog = await logExercise.save();
    
            // Return success response
            res.status(201).json({ message: "Exercise loged successfully", logExercise: savedLog});
        } catch (error) {
            console.error("Error logging exercise", error);
            res.status(500).json({ message: "Error logging exercise", error: error.message });
        }
    }; 

// Controller for updating data  using IDs
exports.updateExercise = async (req, res) => {
        const { id } = req.params;
        const { category, name, sets, reps, duration, rest } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid Exercise ID" });
        }
        
        try {
        // Find exercise by ID and update it with the provided data
        const updatedExercise = await Exercise.findByIdAndUpdate(id, { category, name, sets, reps, duration, rest }, req.body, {
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
        const deletedExercise = await Exercise.findByIdAndDelete(id);

        if (!deletedExercise) {
            return res.status(404).json({ message: `Exercise with ID ${id} not found.` });
        }

        res.json({ message: `Exercise with ID ${id} has been deleted successfully.` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


