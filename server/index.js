import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import user from './routes/user.js';
import question from './routes/question.js';
import submission from './routes/submission.js';
import authenticate from './middleware/authMiddleware.js';

const PORT = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;

const app = express();

const allowedOrigins = [
  'http://localhost:3000',
  'https://lets-code-now.netlify.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
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