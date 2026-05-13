import { webApp } from "@/app";
import request from "supertest";
import { describe, expect, it } from "vitest";

describe("Test home page", () => {
  it("it should display the home page correctly", async () => {
    const app = webApp.getApp();
    const response = await request(app).get("/");

    expect(response.statusCode).toBe(200);
    expect(response.text).toContain("Home Page");
    expect(response.text).toContain("Posts");
  });
});
