import Submission from '../models/Submission.js';
import Question from '../models/Question.js';

// @desc get all submissions for current user
// @route GET api/v1/submissions
export const getCurrentUserSubmissions = async (req, res, next) => {
    try {
        const submissions = await Submission.find({ user: req.user.id }).populate('question', 'title').populate('user', 'username');
        if (submissions.length === 0) return res.status(404).json({ message: "Submissions Not Found!" });
        res.status(200).json(submissions);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Server Error.' });
    }
};

// @desc get all submissions by questionId
// @route GET api/v1/submissions/:questionId
export const getSubmissionsByQuestion = async (req, res, next) => {
    try {
        const questionId = req.params.id;
        const submissions = await Submission.find({ question: questionId }).populate('question', 'title').populate('user', 'username');
        if (submissions.length === 0) return res.status(404).json({ message: "Submissions Not Found!" });
        res.status(200).json(submissions);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Server Error.' });
    }
};

// @desc get full submission by id
// @route GET api/v1/submissions/:id
export const getSubmissionById = async (req, res, next) => {
    try {
        console.log(req.params)
        const id = req.params.id;

        const submission = await Submission.findOne({ _id: id });
        if (!submission) return res.status(404).json({ message: "Submission Not Found!" });
        res.status(200).json(submission);
    } catch (error) {
        console.log(err);
        res.status(500).json({ message: "Error fetching the task..", error });
    }
};

// @desc add a new submission
// @route POST api/v1/submissions/
export const addSubmission = async (req, res, next) => {
    const { questionId, code } = req.body;
    try {
        // Get the question object
        const question = await Question.findOne({ _id: questionId });

        //setting status randomly
        const statusArr = ['accepted', 'rejected'];
        const status = statusArr[Math.floor(Math.random() * 2)];

        // add the new submission
        const newSubmission = new Submission({
            question: question,
            code,
            user: req.user.id,
            status: status,
        });

        await newSubmission.save();
        res.status(201).json({ message: 'Submission successful!' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Server error' });
    }
};