import { Request, Response } from 'express';
import { addCommentService } from '../services/commentService';
import { HTTP_STATUS } from '../constants/statusCodes';

export const addComment = async (req: Request, res: Response) => {
    const userId = (req as any).user.userId;
    const {postId,content} = req.body;
    try {
      const comment = await addCommentService(postId,content, userId);
      res.status(HTTP_STATUS.CREATED).json({ message: 'Comment added', data: comment });
    } catch (error: any) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({ error: error.message });
    }
  };
  