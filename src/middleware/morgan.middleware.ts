import logger from "@/logger/base.logger";
import type { CustomRequest } from "@/type/logger.type";
import morgan from "morgan";

// Define custom token for request ID
morgan.token("request-id", (request: CustomRequest) => {
  return request.requestId || "unknown";
});

// Stream used by morgan
const stream = {
  write: (message: string) => {
    logger.info(message.trim());
  },
};

// Custom morgan format with request ID
const morganMiddleware = morgan(":request-id :method :url :status :response-time ms", {
  stream,
});

export default morganMiddleware;
