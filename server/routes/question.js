import express from 'express';
import authenticate from '../middleware/authMiddleware.js';
import { getAllQuestions, getQuestionById, addQuestion} from '../controllers/questionController.js';

const router = express.Router();

router.get('/', getAllQuestions);
router.get('/:id', authenticate, getQuestionById);
router.post('/', authenticate, addQuestion);

export default router;
