import {Request, Response, RequestHandler } from "express"
import { patentService } from "../services/implementation/patentService";
import { HTTP_STATUS } from "../constants/statusCodes";


export const PatentController :{

    bookAppointment:RequestHandler,
    viewDoctors:RequestHandler,
    viewAppointments:RequestHandler
}= {

    bookAppointment: (async (req: Request, res: Response, ): Promise<void> => {
        try {
          const { appointment_date , doctorId } = req.body;
          const patentId = (req as any).user.userId;
    
          if (!doctorId || !appointment_date || !patentId ) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({ message: 'Missing required fields' });
            return;
          }
    
          const appointment = {appointment_date, doctorId, patentId};
          const book = await patentService.bookAppointment(appointment);
          res.status(HTTP_STATUS.CREATED).json(book);
        } catch (error: any) {
          console.error("Error in Booking Appointment:", error);
          res.status(500).json({ message: error.message });
        }
      }) as RequestHandler,

   viewDoctors: (async (req: Request, res: Response,): Promise<void> => {
       try {
         const patentId = (req as any).user.userId;
   
         if (!patentId) {
           res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: 'Invalid patentId' });
           return;
         }
   
         const doctors = await patentService.viewDoctors(patentId);
         res.status(HTTP_STATUS.OK).json(doctors);
       } catch (error: any) {
         console.error("Error in viewDoctors:", error);
         res.status(HTTP_STATUS.BAD_REQUEST).json({ message: error.message });
       }
     }) as RequestHandler,

     viewAppointments: (async (req: Request, res: Response, ): Promise<void> => {
        try {
          const patentId = (req as any).user.userId;
    
          if (!patentId) {
            res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: 'Invalid patentId' });
            return;
          }
    
          const appointments = await patentService.viewAppointments(patentId);
          res.status(HTTP_STATUS.OK).json(appointments);
        } catch (error: any) {
          console.error("Error in viewDoctors:", error);
          res.status(HTTP_STATUS.BAD_REQUEST).json({ message: error.message });
        }
      }) as RequestHandler,
}