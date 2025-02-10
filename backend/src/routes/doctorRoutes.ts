import express from 'express';
import { authenticate } from '../middlewares/authMiddleware';
import { DoctorController } from '../controllers/doctorController';

const router = express.Router();

router.get('/get-appointments',authenticate,DoctorController.viewAppointments);

export default router;