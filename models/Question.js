const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,  
    },
    description: {
        type: String,
        required: true,
    },
    testcases: {
        type: Array,
        required: true,
    },
    added_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

const Question = mongoose.model('Question', questionSchema);
module.exports = Question;
