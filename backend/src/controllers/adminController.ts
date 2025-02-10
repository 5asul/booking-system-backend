import { Request, Response, NextFunction, RequestHandler } from 'express';
import { AdminService } from '../services/implementation/adminService';

export const AdminController: {
  updateDoctorStatus: RequestHandler;
  addDoctor: RequestHandler;
  deleteDoctor: RequestHandler;
  viewDoctors: RequestHandler;
} = {
  /**
   * Update the status of a doctor.
   */
  updateDoctorStatus: (async (req: Request, res: Response,): Promise<void> => {
    try {
      const doctorId = parseInt(req.params.doctorId);
      const { status } = req.body;
      const adminId = (req as any).user?.userId; // Ensure req.user exists

      if (isNaN(doctorId) || typeof status !== 'boolean' || !adminId) {
        res.status(400).json({ message: 'Invalid input data' });
        return;
      }

      const updatedDoctor = await AdminService.updateDoctorStatus(doctorId, status, adminId);
      res.status(200).json(updatedDoctor);
    } catch (error: any) {
      console.error("Error in updateDoctorStatus:", error);
      res.status(500).json({ message: error.message });
    }
  }) as RequestHandler,

  /**
   * Add a new doctor.
   */
  addDoctor: (async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { username, email, password, specialist } = req.body;
      const adminId = (req as any).user?.userId;

      if (!username || !email || !password || !specialist || !adminId) {
        res.status(400).json({ message: 'Missing required fields' });
        return;
      }

      const doctor = { username, email, password, specialist };
      const createdDoctor = await AdminService.addDoctor(doctor, adminId);
      res.status(201).json(createdDoctor);
    } catch (error: any) {
      console.error("Error in addDoctor:", error);
      res.status(500).json({ message: error.message });
    }
  }) as RequestHandler,

  /**
   * Delete a doctor.
   */
  deleteDoctor: (async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const doctorId = parseInt(req.params.doctorId);
      const adminId = (req as any).user?.userId;

      if (isNaN(doctorId) || !adminId) {
        res.status(400).json({ message: 'Invalid doctorId or missing adminId' });
        return;
      }

      await AdminService.deleteDoctors(doctorId, adminId);
      res.status(200).json({ message: "Doctor deleted successfully" });
    } catch (error: any) {
      console.error("Error in deleteDoctor:", error);
      res.status(500).json({ message: error.message });
    }
  }) as RequestHandler,

  /**
   * View all doctors.
   */
  viewDoctors: (async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const adminId = (req as any).user?.userId;

      if (!adminId) {
        res.status(400).json({ message: 'Invalid adminId' });
        return;
      }

      const doctors = await AdminService.viewDoctors(adminId);
      res.status(200).json(doctors);
    } catch (error: any) {
      console.error("Error in viewDoctors:", error);
      res.status(500).json({ message: error.message });
    }
  }) as RequestHandler,
};
