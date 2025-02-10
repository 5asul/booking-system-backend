import { GetAppointments } from "../../types/doctor";

export interface doctorInterface{
    
    viewAppointments:(adminId:number)=>Promise<GetAppointments[]>;
}