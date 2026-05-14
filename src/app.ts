import { homeController } from "@/controller/home.controller";
import { userController } from "@/controller/user.controller";
import { WebApp } from "@/core/server";
import { postController } from "./controller/post.controller";

export const webApp = new WebApp();

webApp.registerRoute("/", "get", async (request, response) => {
  await homeController.index(request, response);
});

webApp.registerRoute("/users", "get", async (request, response) => {
  await userController.index(request, response);
});

webApp.registerRoute("/users/:id", "get", async (request, response) => {
  await userController.show(request, response);
});

webApp.registerRoute("/posts/:id", "get", async (request, response) => {
  await postController.show(request, response);
});

webApp.start();
