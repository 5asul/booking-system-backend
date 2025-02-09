import { Request, Response } from 'express';
import { registerUserService, loginUserService } from '../services/authService';

import { HTTP_STATUS } from '../constants/statusCodes';

// Auth Controllers
export const registerUser = async (req: Request, res: Response) => {
  try {
    const user = await registerUserService(req.body);
    res.status(HTTP_STATUS.CREATED).json({ message: 'User registered', data: user });
  } catch (error: any) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({ error: error.message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const data = await loginUserService(req.body);
    res.status(HTTP_STATUS.OK).json({ message: 'Login successful', data });
  } catch (error: any) {
    res.status(HTTP_STATUS.UNAUTHORIZED).json({ error: error.message });
  }
};