import  express  from 'express';
import { AdminController } from '../controllers/adminController';
import { authenticate } from '../middlewares/authMiddleware';

const router = express.Router();

router.put('/update-doctor/:doctorId',authenticate, AdminController.updateDoctorStatus);
router.post('/add-doctor',authenticate, AdminController.addDoctor);
router.delete('/delete-doctor/:doctorId',authenticate, AdminController.deleteDoctor);
router.get('/view-doctors',authenticate, AdminController.viewDoctors);

export default router;
