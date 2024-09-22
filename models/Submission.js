const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
    question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
        required: true, 
    },
    code: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    status: {
        type: String,
        enum: ['accepted', 'rejected'],
        required: true,
    },
});

const Submission = mongoose.model('Submission', submissionSchema);
module.exports = Submission;
