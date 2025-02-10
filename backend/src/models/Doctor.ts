import { Role } from "./Role";

export interface Doctor {
    id: number;
    username: string;
    email: string;
    password: string;
    role: Role;
    specialist: string;
    status:boolean;
    createdAt: Date;
    updatedAt: Date;
  }