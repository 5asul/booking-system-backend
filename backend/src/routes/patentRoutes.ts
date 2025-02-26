import express from 'express'
import { authenticate } from '../middlewares/authMiddleware';
import { PatentController } from '../controllers/patentController';
import { validateBooking } from '../middlewares/validatorMiddleware';

const router = express.Router();

router.post('/book-appointment',validateBooking,authenticate,PatentController.bookAppointment);
router.get('/get-appointments',authenticate,PatentController.viewAppointments);
router.get('/get-doctors',authenticate,PatentController.viewDoctors);

export default router;