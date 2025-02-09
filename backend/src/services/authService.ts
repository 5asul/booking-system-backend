import prisma from '../config/db';
import jwt from 'jsonwebtoken';



export const registerUserService = async (data: any) => {
  return prisma.user.create({ data });
};

export const loginUserService = async (data: any) => {
  const user = await prisma.user.findUnique({ where: { email: data.email } });
  if (!user || user.password !== data.password) {
    throw new Error('Invalid credentials');
  }
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string,{expiresIn: '1h'}); 
  return {user,token};
};