import type { AppLog, ContextLog } from "@/type/logger.type";
import winston from "winston";

const baseLogger = winston.createLogger({
  level: "info",

  format: winston.format.combine(winston.format.timestamp(), winston.format.errors({ stack: true })),

  transports: [
    new winston.transports.Console({
      level: "debug",
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.printf(({ level, message, timestamp, context, data, stack }) => {
          let log = `${timestamp} [${level}]: ${message}`;

          if (context) {
            const contextStr = Object.entries(context)
              .filter(([, v]) => v !== undefined)
              .map(([k, v]) => `${k}=${v}`)
              .join(" ");
            if (contextStr) log += ` | ${contextStr}`;
          }

          if (data) log += `\n  Data: ${JSON.stringify(data, null, 2)}`;
          if (stack) log += `\n  ${stack}`;

          return log;
        }),
      ),
    }),

    new winston.transports.File({
      filename: "logs/app.log",
      format: winston.format.json(),
    }),

    new winston.transports.File({
      filename: "logs/error.log",
      level: "error",
      format: winston.format.json(),
    }),
  ],
});

class Logger {
  private log(entry: AppLog) {
    baseLogger.log(entry);
  }

  info(message: string, context?: ContextLog, data?: unknown) {
    this.log({
      level: "info",
      message,
      context,
      data,
    });
  }

  warn(message: string, context?: ContextLog, data?: unknown) {
    this.log({
      level: "warn",
      message,
      context,
      data,
    });
  }

  error(message: string, error?: unknown, context?: ContextLog) {
    this.log({
      level: "error",
      message,
      error,
      context,
    });
  }

  debug(message: string, data?: unknown) {
    this.log({
      level: "debug",
      message,
      data,
    });
  }
}

const logger = new Logger();

export default logger;
