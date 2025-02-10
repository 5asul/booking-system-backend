import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();
export const userTable= prisma.user
export const appointmentTable= prisma.appointment
