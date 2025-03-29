const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema({
name: {
    type: String,
    required: true,
},
sets: {
    type: Number,
    required: true,
},
reps: {
    type: Number,
    required: false,
},
duration: {
    type: String,
    required: false,
},
rest: {
    type: String,
    required: false,
},
});

const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout;