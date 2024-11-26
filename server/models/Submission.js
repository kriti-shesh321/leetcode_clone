import mongoose from 'mongoose';

const submissionSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
    },
    question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
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
    },
}, { timestamps: true });

const Submission = mongoose.model('Submission', submissionSchema);

export default Submission;