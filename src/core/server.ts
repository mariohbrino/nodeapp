import morganMiddleware from "@/middleware/morgan.middleware";
import requestIdMiddleware from "@/middleware/request-id.middleware";
import { createHandlebarsEngine, getViewsPath } from "@/utils/hbs-register";
import express, { type Request, type Response } from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

type RouteMethod = "get" | "post" | "put" | "delete";

export class WebApp {
  app = express();
  port = process.env["PORT"] ? parseInt(process.env["PORT"], 10) : 3000;

  /**
   * The constructor initializes the Express app and sets up middlewares and static file serving
   */
  constructor() {
    this.app.use(requestIdMiddleware);
    this.app.use(morganMiddleware);

    // Serve static files (CSS, JS, images)
    this.app.use("/public", express.static(path.join(__dirname, "../../public")));

    // Configure Handlebars as the template engine
    this.setTemplateEngine();
  }

  /**
   * Register a route with the specified HTTP method and handler
   * @param path string the route path (e.g., "/users")
   * @param method RouteMethod the HTTP method (get, post, put, delete)
   * @param handlerCallback function the route handler function
   */
  registerRoute(path: string, method: RouteMethod, handlerCallback: (request: Request, response: Response) => void) {
    this.app[method](path, handlerCallback);
  }

  /**
   * This method returns the Express app instance
   * @returns express app
   */
  getApp() {
    return this.app;
  }

  /**
   * Configure Handlebars with partials, components, and helpers
   * @param engineName string the name of the template engine (default: "hbs")
   */
  setTemplateEngine() {
    this.app.engine("hbs", createHandlebarsEngine());
    this.app.set("view engine", "hbs");
    this.app.set("views", getViewsPath());

    // Disable view caching in development for hot reload
    if (process.env["NODE_ENV"] !== "production") {
      this.app.set("view cache", false);
    }
  }

  /**
   * Start the Express server on the specified port
   */
  start() {
    this.app.listen(this.port, () => {
      if (process.env["NODE_ENV"] === "production") {
        console.log(`Server is running at http://localhost:${this.port}`);
      }
      console.log("Press Ctrl+C to stop the server.\n");
    });
  }
}
