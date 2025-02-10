import { CreateAppointmentInput, GetAppointments,GetDoctor } from "../../types/patent";

export interface patentInterface{
    bookAppointment:(appointment:CreateAppointmentInput)=>Promise<GetAppointments>;
    viewDoctors:(patentId:number)=>Promise<GetDoctor[]>;
    viewAppointments:(patentId:number)=>Promise<GetAppointments[]>
}