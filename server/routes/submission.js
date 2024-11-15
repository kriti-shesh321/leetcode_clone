import express from 'express';
import { getCurrentUserSubmissions, getSubmissionsByQuestion, getSubmissionById, addSubmission } from '../controllers/submissionController.js';

const router = express.Router();

router.get('/question/:id', getSubmissionsByQuestion);
router.get('/:id', getSubmissionById);
router.get('/', getCurrentUserSubmissions);
router.post('/', addSubmission);

export default router;