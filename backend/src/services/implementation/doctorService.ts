import {userTable,appointmentTable} from '../../config/db';
import { doctorInterface } from '../interfaces/doctorInterface';


export const doctorService:doctorInterface ={
  viewAppointments: function (adminId: number): Promise<void> {
    throw new Error('Function not implemented.');
  }
} 