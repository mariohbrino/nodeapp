import { WebApp } from "@/core/server";
import { routes } from "@/routes";

// Instanciate the web application
const webApp = new WebApp();

// Register routes with the web application
routes(webApp);

// Start the web application
webApp.start();

// Export the web application instance for testing or further configuration
export { webApp };
