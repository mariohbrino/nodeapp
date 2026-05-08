import type { Request } from "express";

export type LogLevel = "error" | "warn" | "info" | "debug";

declare global {
  interface Express {
    Request: {
      requestId?: string;
    };
  }
}

export interface ContextLog {
  requestId?: string;
  userId?: string;
  route?: string;
  method?: string;
  ip?: string;
}

export interface AppLog {
  level: LogLevel;
  message: string;
  context?: ContextLog;
  error?: unknown;
  data?: unknown;
}

export interface CustomRequest extends Request {
  requestId?: string;
}
