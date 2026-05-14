import { engine } from "express-handlebars";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Creates and configures the Handlebars engine with partials, components, and helpers
 */
export const createHandlebarsEngine = () => {
  const viewsPath = path.join(__dirname, "../view");

  return engine({
    extname: ".hbs",
    layoutsDir: path.join(viewsPath, "layouts"),
    partialsDir: [path.join(viewsPath, "partials"), path.join(viewsPath, "components")],
    defaultLayout: "main",
    // Custom helpers
    helpers: {
      json: (context: unknown) => JSON.stringify(context),
      formatDate: (date: Date) => {
        if (!date) return "";
        return new Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "numeric",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }).format(new Date(date));
      },
    },
  });
};

export const getViewsPath = () => {
  return path.join(__dirname, "../view");
};
