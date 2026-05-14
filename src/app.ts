import { homeController } from "@/controller/home.controller";
import { userController } from "@/controller/user.controller";
import { WebApp } from "@/core/server";
import { postController } from "./controller/post.controller";

// Instanciate the web application
const webApp = new WebApp();

// Register routes with their corresponding controller methods and actions
webApp.registerRoute("/", "get", async (request, response): Promise<void> => {
  await homeController.index(request, response);
});

webApp.registerRoute("/users", "get", async (request, response): Promise<void> => {
  await userController.index(request, response);
});

webApp.registerRoute("/users/:id", "get", async (request, response): Promise<void> => {
  await userController.show(request, response);
});

webApp.registerRoute("/posts/:id", "get", async (request, response): Promise<void> => {
  await postController.show(request, response);
});

// Start the web application
webApp.start();

// Export the web application instance for testing or further configuration
export { webApp };
