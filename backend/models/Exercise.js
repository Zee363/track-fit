const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema({
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
    category:
    {
        type: String,
        required: true
    }
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;
