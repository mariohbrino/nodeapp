import { homeController } from "@/controller/home.controller";
import { userController } from "@/controller/user.controller";
import { WebApp } from "@/core/server";

export const webApp = new WebApp();
webApp.setTemplateEngine();

webApp.registerRoute("/", "get", async (request, response) => {
  await homeController.index(request, response);
});

webApp.registerRoute("/users", "get", async (request, response) => {
  await userController.index(request, response);
});

webApp.start();
