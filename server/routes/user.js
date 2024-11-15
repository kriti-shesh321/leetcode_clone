import express from 'express';
import authenticate from '../middleware/authMiddleware.js';
import { signup, login, getUserDetail, updateUser, deleteUser } from "../controllers/userController.js";

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

// protected routes
router.get('/user-details', authenticate, getUserDetail);
router.put('/user-details', authenticate, updateUser);
router.delete('/user-details', authenticate, deleteUser);

export default router;