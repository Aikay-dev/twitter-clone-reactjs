import randColor from "../randomColorgen";
import { describe, expect, test } from "vitest";


describe("randColor", () => {
  test("should return as random RGB color", () => {
    const color = randColor();
    const rgbRegex = /^rgb\(\d{1,3}, \d{1,3}, \d{1,3}\)$/;

    expect(color).toMatch(rgbRegex);
  });
});