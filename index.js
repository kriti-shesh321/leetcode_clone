const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { authToken, isAdmin } = require('./middleware/adminAuth');
const User = require('./models/User');
const Question = require('./models/Question');
const Submission = require('./models/Submission');

const JWT_SECRET = 'your_jwt_secret_key';

const app = express();
const port = 3000;

app.use(express.json());

// connect to database

mongoose.connect('mongodb://localhost:27017/auth_system').then(() => console.log('MongoDB Connected')).catch(err => console.log(err));


// set up the signup route
app.post('/signup', async (req, res) => {
    const { username, email, password, is_admin } = req.body;

    try {
        // Check if the email already exists

        const existingUser = await User.findOne({ email: email });

        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        // hash the password

        const hashedPassword = await bcrypt.hash(password, 10);

        // If email doesn't exist, create a new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            is_admin,
        });

        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Server error' });
    }
})

// setup login route

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check the email and password

        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(404).json({ error: 'User not found!' });
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(400).json({ error: 'Incorrect password!' });
        }

        const token = jwt.sign({ email: user.email, is_admin: user.is_admin }, JWT_SECRET, { expiresIn: '2h' });
        

        res.status(200).json({
            message: "Login successful",
            token: token,
            user: {
                email: user.email,
                is_admin: user.is_admin
            }
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Server error' });
    }
})


//setup route to add a new question

app.post('/add-question', authToken, isAdmin, async (req, res) => {

    const { title, description, testcases } = req.body;

    try {
        // Check if the user is admin

        const existingQuestion = await User.findOne({ title: title });

        if (existingQuestion) {
            return res.status(400).json({ error: 'This question title already exists!' });
        }

        // get the current user

        const user = await User.findOne({ email: req.user.email });

        // add the new question

        const newQuestion = new Question({
            title,
            description,
            testcases,
            added_by: user,
        });

        await newQuestion.save();

        res.status(201).json({ message: 'Question added successfully' });




    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Server error' });
    }
})

// submissions by a user

app.post('/submission', authToken, async (req, res) => {

    const { questionTitle, code } = req.body;

    try {
        // Get the question object

        const question = await Question.findOne({ title: questionTitle });

        // get the current user

        const user = await User.findOne({ email: req.user.email });

        // add the new submission

        const newSubmission = new Submission({
            question: question,
            code,
            user: user,
            status: "accepted",
        });

        await newSubmission.save();

        res.status(201).json({ message: 'Submission successful!' });


    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Server error' });
    }
})


// route to get all the questions

app.get('/questions', async (req, res) => {

    try {
        const questions = await Question.find().select('title description added_by').populate('added_by', 'username');
        res.status(200).json(questions);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch questions' });
    }
})


// route to get all the user submissions

app.get('/submissions', async (req, res) => {

    try {
        const submissions = await Submission.find().populate('question', 'title').populate('user', 'username');
        res.status(200).json(submissions);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch questions' });
    }
})




app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})