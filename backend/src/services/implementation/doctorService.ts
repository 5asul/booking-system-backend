import {userTable,appointmentTable} from '../../config/db';
import { Role } from '../../models/Role';
import { GetAppointments } from '../../types/doctor';
import { doctorInterface } from '../interfaces/doctorInterface';


export const doctorService:doctorInterface ={

  viewAppointments:async function (doctorId: number): Promise<GetAppointments[]> {
    try {
      const checkDoctorId = await userTable.findFirst(
        {where:{
          id:doctorId,
          role: Role.DOCTOR,
          
        }
      }
      )
  
      if (!checkDoctorId) {
        throw new Error("You are not Authorized");
      }
  
      const appointments = await appointmentTable.findMany({
        where:{doctorId},
        include:{
          patent:{
              select:{
                  password:false
              }
          }
          
      },
      });
      return appointments;

    } catch (error) {

      
      throw error;
    }
  }
} 