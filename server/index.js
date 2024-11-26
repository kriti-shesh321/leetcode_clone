import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import user from './routes/user.js';
import question from './routes/question.js';
import submission from './routes/submission.js';
import authenticate from './middleware/authMiddleware.js';

dotenv.config({ path: '.env.dev' });

const PORT = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use('/api/v1/user', user);
app.use('/api/v1/questions', question);
app.use('/api/v1/submissions', authenticate, submission);

const start = async () => {
    try {
        //connect to DB
        await mongoose.connect(DATABASE_URL);
        //listen to the server
        app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
    } catch (error) {
        console.log(error);
    }
};

start();