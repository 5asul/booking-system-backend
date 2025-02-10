import { patentInterface } from "../interfaces/patentInterface";

export const patentService:patentInterface={
    
    bookAppointment: function (patentId: number, doctorId: number, appointmentDate: string): Promise<void> {
        throw new Error("Function not implemented.");
    },
    viewDoctors: function (patentId: number): Promise<void> {
        throw new Error("Function not implemented.");
    },
    viewAppointments: function (patentId: number): Promise<void> {
        throw new Error("Function not implemented.");
    }
}