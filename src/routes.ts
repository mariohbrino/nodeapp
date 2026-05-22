import { homeController } from "@/controller/home.controller";
import { userController } from "@/controller/user.controller";
import { WebApp } from "@/core/server";
import type { Request, Response } from "express";
import { postController } from "./controller/post.controller";

const routes = (webApp: WebApp) => {
  webApp.registerRoute("/", "get", (request: Request, response: Response): void => {
    homeController.index(request, response);
  });

  webApp.registerRoute("/users", "get", (request: Request, response: Response): void => {
    userController.index(request, response);
  });

  webApp.registerRoute("/users/:id", "get", (request: Request, response: Response): void => {
    userController.show(request, response);
  });

  webApp.registerRoute("/posts", "get", (request: Request, response: Response): void => {
    postController.index(request, response);
  });

  webApp.registerRoute("/posts", "post", (request: Request, response: Response): void => {
    postController.store(request, response);
  });

  webApp.registerRoute("/posts/create", "get", (request: Request, response: Response): void => {
    postController.create(request, response);
  });

  webApp.registerRoute("/posts/:id/edit", "get", (request: Request, response: Response): void => {
    postController.edit(request, response);
  });

  webApp.registerRoute("/posts/:id/update", "post", (request: Request, response: Response): void => {
    postController.update(request, response);
  });

  webApp.registerRoute("/posts/:id", "get", (request: Request, response: Response): void => {
    postController.show(request, response);
  });

  webApp.registerRoute("/posts/:id/delete", "post", (request: Request, response: Response): void => {
    postController.delete(request, response);
  });
};

export { routes };
