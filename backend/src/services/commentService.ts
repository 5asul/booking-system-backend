import prisma from '../config/db';

export const addCommentService = async (postId:number,content:string, userId: number) => {
  return prisma.comment.create({ data: { postId:postId,content:content, authorId: userId } });
};
