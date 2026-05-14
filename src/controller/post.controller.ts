import { getPostById } from "@/model/post.model";
import { type Request, type Response } from "express";

class PostController {
  show = async (request: Request, response: Response) => {
    const postId = request.params["id"] as string;
    return response.status(200).render("post", { post: await getPostById(postId) });
  };
}

export const postController = new PostController();
