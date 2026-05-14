import { validateBoolean } from "@/validate/boolean.util";
import { describe, expect, it } from "vitest";

describe("validate boolean", () => {
  it(`should return a boolean true`, () => {
    expect(validateBoolean("true")).toBe(true);
    expect(validateBoolean("1")).toBe(true);
    expect(validateBoolean("yes")).toBe(true);
  });

  it(`should return a boolean false`, () => {
    expect(validateBoolean("false")).toBe(false);
    expect(validateBoolean("0")).toBe(false);
    expect(validateBoolean("no")).toBe(false);
  });

  it(`should return the default value if the input is undefined`, () => {
    expect(validateBoolean(undefined)).toBe(true); // Default is true
    expect(validateBoolean(undefined, false)).toBe(false); // Custom default value
  });

  it(`should throw an error for invalid boolean values`, () => {
    expect(() => validateBoolean("True")).toThrow(`Invalid boolean value: True`);
    expect(() => validateBoolean("False")).toThrow(`Invalid boolean value: False`);
    expect(() => validateBoolean("random")).toThrow(`Invalid boolean value: random`);
  });
});
