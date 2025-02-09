import express from 'express';
import { createPost, deletePost, editPost, getDashboard } from '../controllers/postController';
import { addComment } from '../controllers/commentController';
import { authenticate } from '../middlewares/authMiddleware';
import { loginUser, registerUser } from '../controllers/authController';

const router = express.Router();
// Auth endpoints
router.post('/register', registerUser);
router.post('/login', loginUser);
// Authenticated Author Endpoints
router.get('/dashboard', authenticate, getDashboard);
router.post('/create-posts', authenticate, createPost);
router.put('/edit-post/:id', authenticate, editPost);
router.delete('/delete-post/:id', authenticate, deletePost);
router.post('/send-comments', authenticate, addComment);


export default router;