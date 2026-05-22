import morganMiddleware from "@/middleware/morgan.middleware";
import requestIdMiddleware from "@/middleware/request-id.middleware";
import { createHandlebarsEngine, getViewsPath } from "@/utils/hbs-register";
import express, { type Request, type Response } from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class WebApp {
  app = express();
  port = process.env["PORT"] ? parseInt(process.env["PORT"], 10) : 3000;

  /**
   * The constructor initializes the Express app and sets up middlewares and static file serving
   */
  constructor() {
    this.app.use(requestIdMiddleware);
    this.app.use(morganMiddleware);

    // Parse URL-encoded bodies (from HTML forms)
    this.app.use(express.urlencoded({ extended: true }));

    // Parse JSON bodies (for API requests)
    this.app.use(express.json());

    // Serve static files (CSS, JS, images)
    this.app.use("/public", express.static(path.join(__dirname, "../../public")));

    // Configure Handlebars as the template engine
    this.setTemplateEngine();
  }

  /**
   * Register a GET route with the Express app
   * @param path string the route path
   * @param handlerCallback function to handle the request and response
   */
  get(path: string, handlerCallback: (request: Request, response: Response) => void) {
    this.app.get(path, handlerCallback);
  }

  /**
   * Register a POST route with the Express app
   * @param path string the route path
   * @param handlerCallback function to handle the request and response
   */
  post(path: string, handlerCallback: (request: Request, response: Response) => void) {
    this.app.post(path, handlerCallback);
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
