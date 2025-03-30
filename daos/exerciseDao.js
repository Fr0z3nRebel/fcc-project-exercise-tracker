const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    date: {
        type: String,
    },
});

const ExerciseModel = mongoose.model('Exercise', exerciseSchema);

exports.ExerciseModel = ExerciseModel;
