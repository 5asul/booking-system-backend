import {userTable,appointmentTable} from '../../config/db';
import { GetAppointments } from '../../types/doctor';
import { doctorInterface } from '../interfaces/doctorInterface';


export const doctorService:doctorInterface ={

  viewAppointments:async function (doctorId: number): Promise<GetAppointments[]> {
    try {
      const checkPatentId = await userTable.findFirst(
        {where:{
          id:doctorId,
          
        }}
      )
  
      if (!checkPatentId) {
        throw new Error("You are not Authorized");
      }
  
      const appointments = await appointmentTable.findMany({where:{doctorId}});
      return appointments;

    } catch (error) {

      
      throw error;
    }
  }
} 