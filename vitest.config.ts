/// <reference types="vitest" />
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    silent: true,
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
        resolve: {
          tsconfigPaths: true,
        },
        test: {
          name: "unit-tests",
          include: ["tests/units/**/*.test.js", "tests/units/**/*.test.ts"],
          environment: "node",
          pool: "forks",
        },
      },
      {
        resolve: {
          tsconfigPaths: true,
        },
        test: {
          name: "feature-tests",
          include: ["tests/features/**/*.test.js", "tests/features/**/*.test.ts"],
          environment: "node",
          pool: "forks",
        },
      },
      {
        resolve: {
          tsconfigPaths: true,
        },
        test: {
          name: "integration-tests",
          include: ["tests/integrations/**/*.test.js", "tests/integrations/**/*.test.ts"],
          environment: "node",
          pool: "forks",
        },
      },
    ],
  },
});
