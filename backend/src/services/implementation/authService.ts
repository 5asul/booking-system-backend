import{userTable,appointmentTable} from '../../config/db';
import jwt from 'jsonwebtoken';
import { AuthInterface, } from '../interfaces/authInterface';
import { Role } from '../../models/Role';




export const AuthService: AuthInterface = {

  login:async function (email: string, password: string): Promise<{ user: any; token: string; }> {

    try {

    const user = await userTable.findUnique({ where: { email } });
    if (!user || user.password !== password) {
      throw new Error('Invalid credentials');
    }
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET as string,
      { expiresIn: '2h' }
    );
    return { user, token };

    } catch (error) {
      throw error;
    }
  },
  register: async function (username: string, email: string, password: string,): Promise<void> {

    try {
      await userTable.create({
        data: { username, email, password,role:Role.PATIENT },
      });

    } catch (error) {

      throw error;
    }
  }
};