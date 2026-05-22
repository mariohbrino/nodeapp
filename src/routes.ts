import { homeController } from "@/controller/home.controller";
import { userController } from "@/controller/user.controller";
import { WebApp } from "@/core/server";
import type { Request, Response } from "express";
import { postController } from "./controller/post.controller";

const routes = (webApp: WebApp) => {
  webApp.get("/", (request: Request, response: Response): void => {
    homeController.index(request, response);
  });

  webApp.get("/users", (request: Request, response: Response): void => {
    userController.index(request, response);
  });

  webApp.get("/users/:id", (request: Request, response: Response): void => {
    userController.show(request, response);
  });

  webApp.get("/posts", (request: Request, response: Response): void => {
    postController.index(request, response);
  });

  webApp.post("/posts", (request: Request, response: Response): void => {
    postController.store(request, response);
  });

  webApp.get("/posts/create", (request: Request, response: Response): void => {
    postController.create(request, response);
  });

  webApp.get("/posts/:id/edit", (request: Request, response: Response): void => {
    postController.edit(request, response);
  });

  webApp.get("/posts/:id", (request: Request, response: Response): void => {
    postController.show(request, response);
  });

  webApp.post("/posts/:id/update", (request: Request, response: Response): void => {
    postController.update(request, response);
  });

  webApp.post("/posts/:id/delete", (request: Request, response: Response): void => {
    postController.delete(request, response);
  });
};

export { routes };
