import randColor from "../randomColorgen";
import { describe, expect, it } from "vitest";
import { test } from "vitest";

describe("randColor", () => {
  test("should return as random RGB color", () => {
    const color = randColor();
    const rgbRegex = /^rgb\(\d{1,3}, \d{1,3}, \d{1,3}\)$/;

    expect(color).toMatch(rgbRegex);
  });
});