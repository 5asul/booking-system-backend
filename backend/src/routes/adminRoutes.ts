import  express  from 'express';
import { AdminController } from '../controllers/adminController';
import { authenticate } from '../middlewares/authMiddleware';
import { validateDoctor } from '../middlewares/validatorMiddleware';

const router = express.Router();

router.put('/update-doctor/:doctorId',validateDoctor,authenticate, AdminController.updateDoctorStatus);
router.post('/add-doctor',authenticate, AdminController.addDoctor);
router.delete('/delete-doctor/:doctorId',authenticate, AdminController.deleteDoctor);
router.get('/view-users',authenticate, AdminController.viewUsers);

export default router;
