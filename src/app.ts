import morganMiddleware from "@/middleware/morgan.middleware";
import requestIdMiddleware from "@/middleware/request-id.middleware";
import { getPosts } from "@/model/post.model";
import { getUsers } from "@/model/user.model";
import { validateBoolean } from "@/validate/boolean.util";
import express, { type Request, type Response } from "express";

type RouteMethod = "get" | "post" | "put" | "delete";

export class WebApp {
  app = express();
  port = 3000;

  constructor() {
    this.app.use(requestIdMiddleware);
    this.app.use(morganMiddleware);
  }

  registerRoute(path: string, method: RouteMethod, handler: (request: Request, response: Response) => void) {
    this.app[method](path, handler);
  }

  getApp() {
    return this.app;
  }

  start() {
    this.app.listen(this.port, () => {
      console.log(`Server is running at http://localhost:${this.port}`);
      console.log("Press Ctrl+C to stop the server.\n");
    });
  }
}

export const webApp = new WebApp();

webApp.registerRoute("/", "get", (_request: Request, response: Response) => {
  response.status(200).send("Hello, World!");
});

webApp.registerRoute("/users", "get", async (request: Request, response: Response) => {
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
  return response.status(200).json(await getUsers(currentPage, pageSize, published));
});

webApp.registerRoute("/posts", "get", async (request: Request, response: Response) => {
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
  return response.status(200).json(await getPosts(currentPage, pageSize, published));
});

webApp.start();
