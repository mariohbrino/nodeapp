import { createComment } from "@/model/comment.model";
import { type Request, type Response } from "express";

class CommentController {
  store = async (request: Request, response: Response): Promise<void> => {
    const postId = request.params["id"] as string;
    const { content } = request.body;

    await createComment({ content, postId });
    response.redirect(302, `/posts/${postId}`);
  };
}

export const commentController = new CommentController();
