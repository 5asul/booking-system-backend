// types.ts (or in a suitable file)
import { Appointment,User } from '@prisma/client';



export type GetAppointments = Appointment;

export type GetDoctor = Omit<User,'role'|'password' | 'createdAt' | 'updatedAt'>;

export type CreateAppointmentInput = Omit<Appointment,'id'|'status'|'createdAt'>