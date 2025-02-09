import express from 'express';
import { getAllPosts } from '../controllers/postController';
import { registerUser, loginUser } from '../controllers/authController';
const router = express.Router();

router.get('/get-posts', getAllPosts);


export default router;