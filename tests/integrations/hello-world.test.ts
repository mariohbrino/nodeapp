import { webApp } from "@/app";
import request from "supertest";
import { describe, expect, it } from "vitest";

describe("Hello World API", () => {
  it("should return 'Hello, World!' when accessing the root endpoint", async () => {
    const app = webApp.getApp();
    const response = await request(app).get("/");

    expect(response.statusCode).toBe(200);
    expect(response.text).toBe("Hello, World!");
  });
});
