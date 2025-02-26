import { Appointment } from "@prisma/client";


export type GetAppointments = Omit<Appointment,"password">;