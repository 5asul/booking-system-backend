import { User } from "@prisma/client";


// src/services/authInterface.ts

export interface AuthInterface {
    login: (email: string, password: string) => Promise<{ user: User; token: string }>;
    register: (username: string, email: string, password: string) => Promise<void>;
  }
  