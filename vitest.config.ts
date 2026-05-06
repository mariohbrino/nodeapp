/// <reference types="vitest" />
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["tests/**/*.test.js", "tests/**/*.test.ts"],
    reporters: ["default", ["junit", { suiteName: "UI tests" }]],
    coverage: {
      provider: "v8",
      include: ["src/**/*.{ts,js}"],
      exclude: ["node_modules", "tests"],
      reporter: ["text", "html", "json"],
    },
    projects: [
      {
        test: {
          name: "unit-tests",
          include: ["tests/units/**/*.test.js", "tests/units/**/*.test.ts"],
          environment: "node",
          pool: "forks",
        },
      },
      {
        test: {
          name: "feature-tests",
          include: ["tests/features/**/*.test.js", "tests/features/**/*.test.ts"],
          environment: "node",
          pool: "forks",
        },
      },
    ],
  },
});
