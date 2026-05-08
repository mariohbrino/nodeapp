import morganMiddleware from "@/middleware/morgan.middleware";
import requestIdMiddleware from "@/middleware/request-id.middleware";
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
  response.send("Hello, World!");
});

webApp.start();
