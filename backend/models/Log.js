const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({
    exercise: { 
      type: String, 
      required: true 
    },
    sets: { 
      type: Number, 
      required: true 
    },
    reps: { 
      type: Number, 
      required: true 
    },
});

const Log = mongoose.model('Log', logSchema);

module.exports = Log;