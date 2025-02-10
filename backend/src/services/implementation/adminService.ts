
import { User } from '@prisma/client';
import {userTable,prisma} from '../../config/db';
import { AdminInterface } from '../interfaces/adminInterface';
import { Role } from '../../models/Role';
import { CreateDoctorInput } from '../../types/admin';


export const AdminService:AdminInterface ={

  updateDoctorStatus: async function (doctorId :number,status: boolean, adminId: number): Promise<User> {
    try {

      const checkAdminId = await userTable.findFirst(
        {where:{
          id:adminId,
          role:Role.ADMIN
        }}
      )

      if (!checkAdminId) {
        throw new Error("You are not Authorized");
      }

      return await userTable.update({
        where:{
          id:doctorId,
        },
        data:{
         status
        }
      })
      
    } catch (error) {
      console.error("Error fetching doctors:", error);
      throw error;
    }
  },
  addDoctor:async function (doctor: CreateDoctorInput, adminId: number): Promise<User> {
    
    try {

      const checkAdminId = await userTable.findFirst(
        {where:{
          id:adminId,
          role:Role.ADMIN
        }}
      )
  
      if (!checkAdminId) {
        throw new Error("You are not Authorized");
      }
      
      return await userTable.create({
        data:{
          username: doctor.username,
          email: doctor.email,
          password: doctor.password,
          specialist:doctor.specialist,
          role: Role.DOCTOR
        }
      }) 
      
    } catch (error) {
      console.error("Error adding doctors:", error);
      throw error;
    }
    
  },
  deleteDoctors: async function (doctorId: number, adminId: number): Promise<void> {
    try {

      const checkAdminId = await userTable.findFirst(
        {where:{
          id:adminId,
          role:Role.ADMIN
        }}
      )

      if (!checkAdminId) {
        throw new Error("You are not Authorized");
      }

      // Delete the doctor from the user table
      await userTable.delete({
        where: { id: doctorId },
      });

    } catch (error) {
      console.error("Error fetching doctors:", error);
      throw error;
    }
  },
  viewDoctors:async function (adminId: number): Promise<User[]> {
    try {
      const checkAdminId = await userTable.findFirst(
        {where:{
          id:adminId,
          role:Role.ADMIN
        }}
      )

      if (!checkAdminId) {
        throw new Error("You are not Authorized");
      }
      // Fetch doctors from the user table
      const doctors = await userTable.findMany({
        where: {
          role: Role.DOCTOR,
        },
      });

      // Check if there are any doctors
      if (doctors.length === 0) {
        throw new Error("No doctors found");
      }
      
      return doctors;


    } catch (error) {
      console.error("Error fetching doctors:", error);
      throw error;
    } 
  }
}
