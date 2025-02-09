import prisma from '../config/db';



export const createPostService = async (title:string,content:string,image:string, userId: number) => {
  return prisma.blogPost.create({ 
    data: { title,content,image, authorId: userId },
    
  });
};

export const deletePostService = async (postId: string, userId: number) => {
  return prisma.blogPost.delete({ where: { id: Number(postId), authorId: userId } });
};

export const editPostService = async (postId: string, title:string,content:string,image:string,status:number, userId: number) => {
  return prisma.blogPost.update({ where: { id: Number(postId), authorId: userId }, data: { title: title, content: content, image: image, status:status  } });
};

export const getAllPostsService = async () => {
  return prisma.blogPost.findMany(
    {
      include: {
        
        comments: true,
      },
    }
  );
};

export const getDashboardService = async (userId: number) => {
  return prisma.blogPost.findMany({ where: { authorId: userId } });
};