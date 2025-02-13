import {Request,Response, RequestHandler } from "express";
import { HTTP_STATUS } from "../constants/statusCodes";
import { doctorService } from "../services/implementation/doctorService";

export const DoctorController:{
    viewAppointments:RequestHandler;

} = {

    viewAppointments: (async (req: Request, res: Response,): Promise<void> =>{
        try {
            const doctorId = (req as any).user.userId;

            if (!doctorId) {
                res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: 'Invalid patentId' });
                return;
              }
            
            const appointments = await doctorService.viewAppointments(doctorId);
            res.status(HTTP_STATUS.OK).json(appointments);
        
        } catch (error: any) {
          console.error("Error in viewDoctors:", error);
          res.status(HTTP_STATUS.BAD_REQUEST).json({ message: error.message });
        }
    }) as RequestHandler
}