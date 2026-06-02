import { createPost, deletePost, getPostById, getPosts, updatePost } from "@/model/post.model";
import { getFirstUser, getRandomUser } from "@/model/user.model";
import { validateBoolean } from "@/validate/boolean.util";
import { type Request, type Response } from "express";

class PostController {
  index = async (request: Request, response: Response) => {
    const allowedPageSizes = [3, 5, 10, 15];
    const currentPage = request.query["currentPage"] ? parseInt(request.query["currentPage"] as string, 10) : 1;
    const pageSize = request.query["pageSize"] ? parseInt(request.query["pageSize"] as string, 10) : 10;
    let published: boolean;

    try {
      published = validateBoolean(request.query["published"] as string | undefined);
    } catch (error) {
      console.error(error);
      return response.status(400).json({
        error: `Invalid published value. Allowed values are: (true, false), (1, 0), and (yes, no)`,
        details: (error as Error).message,
      });
    }

    if (!allowedPageSizes.includes(pageSize)) {
      return response.status(400).json({
        error: `Invalid pageSize. Allowed values are: ${allowedPageSizes.join(", ")}`,
      });
    }

    return response
      .status(200)
      .render("posts", { title: "Posts Page", posts: await getPosts(currentPage, pageSize, published) });
  };

  show = async (request: Request, response: Response): Promise<void> => {
    const postId = request.params["id"] as string;
    return response.status(200).render("post", { title: "Post Details", post: await getPostById(postId) });
  };

  create = async (_request: Request, response: Response): Promise<void> => {
    return response.status(200).render("create-post", { title: "Create Post" });
  };

  store = async (request: Request, response: Response): Promise<void> => {
    const title: string = request.body["title"] as string;
    const content: string = request.body["content"] as string;
    const published: boolean = validateBoolean(request.body["published"] as string | undefined);

    if (!title || !content) {
      response.status(400).json({ error: "Title and content are required." });
      return;
    }

    const randomUser = await getRandomUser();

    if (!randomUser) {
      response.status(400).json({ error: "No users found to assign as author." });
      return;
    }

    await createPost({ title, content, published, authorId: randomUser.id });

    response.redirect(302, "/posts");
  };

  edit = async (request: Request, response: Response): Promise<void> => {
    const postId = request.params["id"] as string;
    return response.status(200).render("edit-post", { title: "Edit Post", post: await getPostById(postId) });
  };

  update = async (request: Request, response: Response): Promise<void> => {
    const postId = request.params["id"] as string;
    const title: string = request.body["title"] as string;
    const content: string = request.body["content"] as string;
    const published: boolean = validateBoolean(request.body["published"] as string | undefined);

    if (!title || !content) {
      response.status(400).json({ error: "Title and content are required." });
      return;
    }

    const firstUser = await getFirstUser();

    if (!firstUser) {
      response.status(400).json({ error: "No users found to assign as modifier." });
      return;
    }

    await updatePost({ id: postId, title, content, published, modifierId: firstUser.id });

    response.redirect(302, `/posts/${postId}`);
  };

  delete = async (request: Request, response: Response): Promise<void> => {
    const postId = request.params["id"] as string;

    await deletePost({ id: postId });

    response.redirect(302, "/posts");
  };
}

export const postController = new PostController();
