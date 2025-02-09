import { Request, Response } from 'express';
import { createPostService, deletePostService, editPostService, getAllPostsService, getDashboardService } from '../services/postService';
import { HTTP_STATUS } from '../constants/statusCodes';


// Post Controllers
export const createPost = async (req: Request, res: Response) => {
  const userId = (req as any).user.userId;
  const {title,content,image} = req.body
  try {
    const post = await createPostService(title,content,image, userId);
    res.status(HTTP_STATUS.CREATED).json({ message: 'Post created', data: post });
  } catch (error: any) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({ error: error.message });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  const userId = (req as any).user.userId;
  try {
    await deletePostService(req.params.id, userId);
    res.status(HTTP_STATUS.NO_CONTENT).json({ message: 'Post deleted' });
  } catch (error: any) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({ error: error.message });
  }
};

export const editPost = async (req: Request, res: Response) => {
  const userId = (req as any).user.userId;
  const {title,content,image,status} = req.body; // remove this line if you don't want to update image field.  If you want to update it, replace it with req.body.image.  If you want to remove it, just remove the line.  It's up to you.  The line below is just a placeholder for demonstration purposes.  You should replace it with the actual field(s) you want to update.  For example, if
  const{id}=req.params
  try {
    const post = await editPostService(id, title,content,image,status, userId);
    res.status(HTTP_STATUS.OK).json({ message: 'Post updated', data: post });
  } catch (error: any) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({ error: error.message });
  }
};

export const getAllPosts = async (_req: Request, res: Response) => {

  try {
    const posts = await getAllPostsService();
    res.status(HTTP_STATUS.OK).json({ data: posts });
  } catch (error: any) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({ error: error.message });
  }
};

export const getDashboard = async (req: Request, res: Response) => {
  const userId = (req as any).user.userId;
  try {
    const dashboard = await getDashboardService(userId);
    res.status(HTTP_STATUS.OK).json({ data: dashboard });
  } catch (error: any) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({ error: error.message });
  }
};