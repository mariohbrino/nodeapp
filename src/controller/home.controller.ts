import { getPosts } from "@/model/post.model";
import { validateBoolean } from "@/validate/boolean.util";
import { type Request, type Response } from "express";

class HomeController {
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
      .render("home", { title: "Home Page", posts: await getPosts(currentPage, pageSize, published) });
  };
}

export const homeController = new HomeController();
