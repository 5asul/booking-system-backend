// types.ts (or in a suitable file)
import { User } from '@prisma/client';

export type CreateDoctorInput = Omit<User,'role'|'id' | 'status' | 'createdAt' | 'updatedAt'>;
