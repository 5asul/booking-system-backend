import e, { Request, Response } from 'express';

import { HTTP_STATUS } from '../constants/statusCodes';
import { AuthService } from '../services/implementation/authService';


export const AuthController= {
 

  // Auth Controllers
registerUser: async (req: Request, res: Response) => {
  try {
    const {username,email,password,role} = req.body
    const user = await AuthService.register(username, email, password,role);
    res.status(HTTP_STATUS.CREATED).json({ message: 'User registered', data: user });
  } catch (error: any) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({ error: error.message });
  }
},

loginUser: async (req: Request, res: Response) => {
  try {
    const {email, password} = req.body
    const data = await AuthService.login(email, password);
    res.status(HTTP_STATUS.OK).json({ message: 'Login successful', data });
  } catch (error: any) {
    res.status(HTTP_STATUS.UNAUTHORIZED).json({ error: error.message });
  }
},

};

