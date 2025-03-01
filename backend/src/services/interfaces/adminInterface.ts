import { User } from "@prisma/client"
import { CreateDoctorInput } from "../../types/admin";


export interface AdminInterface {
    updateDoctorStatus(doctorId:number, status: boolean,adminId:number): Promise<User>
    addDoctor:(doctor:CreateDoctorInput,adminId:number) => Promise<User>;
    deleteDoctors:(doctorId:number,adminId:number) => Promise<void>;
    viewUsers:(adminId:number)=>Promise<User[]>;
    
}