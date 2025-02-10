import express from 'express';
import {AuthController} from '../controllers/authController';

const router = express.Router();
// Auth endpoints
router.post('/register', AuthController.registerUser);
router.post('/login', AuthController.loginUser);

export default router;
