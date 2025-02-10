export interface patentInterface{
    bookAppointment:(patentId:number,doctorId:number,appointmentDate:string)=>Promise<void>;
    viewDoctors:(patentId:number)=>Promise<void>;
    viewAppointments:(patentId:number)=>Promise<void>
}