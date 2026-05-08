import type { CustomRequest } from "@/type/logger.type";
import type { NextFunction, Response } from "express";
import { v4 as uuid4 } from "uuid";

export default function requestIdMiddleware(request: CustomRequest, response: Response, next: NextFunction) {
  request.requestId = uuid4();
  response.setHeader("X-Request-Id", request.requestId);

  next();
}
