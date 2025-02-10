import{userTable,appointmentTable} from '../../config/db';
import jwt from 'jsonwebtoken';
import { AuthInterface, } from '../interfaces/authInterface';
import { Role } from '../../models/Role';




export const AuthService: AuthInterface = {
  login:async function (email: string, password: string): Promise<{ user: any; token: string; }> {
    const user = await userTable.findUnique({ where: { email } });
    if (!user || user.password !== password) {
      throw new Error('Invalid credentials');
    }
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' }
    );
    return { user, token };
  },
  register: async function (username: string, email: string, password: string, role: Role): Promise<void> {
    await userTable.create({
      data: { username, email, password,role },
    });
  }
};