import { webApp } from "@/app";
import logger from "@/logger/base.logger";
import morganMiddleware from "@/middleware/morgan.middleware";
import express from "express";
import request from "supertest";
import { describe, expect, it, vi } from "vitest";

describe("Request ID Middleware", () => {
  it("should include a request id in the response headers", async () => {
    const app = webApp.getApp();
    const response = await request(app).get("/");

    expect(response.statusCode).toBe(200);
    expect(response.headers).toHaveProperty("x-request-id");
  });

  it("should include a request id in the console logs", async () => {
    const app = webApp.getApp();
    const loggerSpy = vi.spyOn(logger, "info");

    await request(app).get("/");

    const logCalls = loggerSpy.mock.calls;
    const requestIdLog = logCalls.find((call) => call[0] && call[0].includes("x-request-id:"));

    expect(requestIdLog).toBeDefined();
    loggerSpy.mockRestore();
  });

  it("should log 'unknown' when request id is not set", async () => {
    const app = express();
    app.use(morganMiddleware);
    app.get("/test", (_req, res) => res.send("ok"));

    const loggerSpy = vi.spyOn(logger, "info");

    await request(app).get("/test");

    const logCalls = loggerSpy.mock.calls;
    const unknownLog = logCalls.find((call) => call[0] && call[0].includes("x-request-id: unknown"));

    expect(unknownLog).toBeDefined();
    loggerSpy.mockRestore();
  });
});
