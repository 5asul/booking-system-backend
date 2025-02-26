import { userTable,appointmentTable } from "../../config/db";
import { Role } from "../../models/Role";
import { CreateAppointmentInput, GetAppointments, GetDoctor } from "../../types/patent";
import { patentInterface } from "../interfaces/patentInterface";

export const patentService:patentInterface={
    
    bookAppointment:async function (appointment:CreateAppointmentInput): Promise<GetAppointments> {

        try {
            const checkPatentId = await userTable.findFirst(
                {where:{
                  id:appointment.patentId,
                  role:Role.PATIENT
                  
                }}
              )
        
              if (!checkPatentId) {
                throw new Error("You are not Authorized");
              }

            const checkDoctorId = await userTable.findFirst(
                {
                    where:{
                        id:appointment.doctorId,
                        role:Role.DOCTOR
                    }
                }
            )

            if (!checkDoctorId) {
                throw new Error("No such a Doctor");
              }
    
            const newAppointment = await appointmentTable.create({
                data:{
                    doctorId:appointment.doctorId,
                    appointment_date: appointment.appointment_date,
                    patentId: appointment.patentId
                }
            });
    
            return newAppointment;

        } catch (error) {
            
            throw error;
        }

        
    },

    viewDoctors:async function (patentId: number): Promise<GetDoctor[]> {
        try {
            const checkPatentId = await userTable.findFirst(
                {where:{
                  id:patentId,
                  role:Role.PATIENT
                  
                }}
              )
        
              if (!checkPatentId) {
                throw new Error("You are not Authorized");
              }
    
            const doctors = await userTable.findMany({
                where: {
                    role: Role.DOCTOR,
                }
                });
    
            return doctors;

        } catch (error) {
            
            throw error;
        }
    },

    viewAppointments:async function (patentId: number): Promise<GetAppointments[]> {
        
        try {

            const checkPatentId = await userTable.findFirst(
                {where:{
                  id:patentId,
                  role:Role.PATIENT
                  
                },
                
            }
              )
        
              if (!checkPatentId) {
                throw new Error("You are not Authorized");
              }

        const appointments = await appointmentTable.findMany({
            where: {
                patentId: patentId,
                doctor:{
                    role:Role.DOCTOR
                }
            },
            
            include:{
                doctor:{
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