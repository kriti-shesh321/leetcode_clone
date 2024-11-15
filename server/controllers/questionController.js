import Question from '../models/Question.js';

// @desc get all the questions
// @route GET api/v1/questions
export const getAllQuestions = async (req, res, next) => {
    try {
        const questions = await Question.find().select('title acceptance difficulty');
        res.status(200).json(questions);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Server Error.' });
    }
};

// @desc get question by id
// @route GET api/v1/questions/:id
export const getQuestionById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const question = await Question
            .findOne({ _id: id })
            .select('title description sampleInput sampleOutput addedBy')
            .populate('addedBy', 'username');

        if (!question) return res.status(404).json({ message: "Question Not Found!" });

        res.status(200).json(question);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Server Error.' });
    }
};

//@desc add a new question
//@route POST api/v1/questions
export const addQuestion = async (req, res, next) => {
    const { title, description, difficulty, acceptance, sampleInput, sampleOutput } = req.body;
    try {
        const isAdmin = req.user.isAdmin;
        const currentUser = req.user.id;

        if (!isAdmin) return res.status(403).json({ error: 'Only admins can add questions.' });

        const existingQuestion = await Question.findOne({ title: title });
        if (existingQuestion) return res.status(400).json({ error: 'A question with this title already exists!' });

        // add the new question
        const newQuestion = new Question({
            title,
            description,
            difficulty,
            acceptance,
            sampleInput,
            sampleOutput,
            addedBy: currentUser,
        });
        await newQuestion.save();
        res.status(201).json({ message: 'Question added successfully' });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Server error' });
    }
};

