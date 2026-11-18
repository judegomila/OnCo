import { describe, expect, it } from "vitest";
import { forestX } from "./ForestPlot";

/**
 * The forest plot is drawn once on the server and again in the browser, and React compares the two. Its x positions
 * come from `Math.log`, which Node and Chrome do not always round the same way in the last digit, so an unrounded
 * position was reported as a hydration mismatch on /forest/ (55 attributes on 16 November 2026). A position
 * rounded to a hundredth cannot differ by a last digit.
 */
describe("forest plot positions", () => {
  const domain = [0.08, 6] as const, x0 = 260, x1 = 660;
  const values = [0.08, 0.1, 0.25, 0.31, 0.5, 0.62, 0.74, 1, 1.07, 1.5, 2, 4, 6];

  it("are whole hundredths, so server and browser print the same digits", () => {
    for (const v of values) {
      const x = forestX(v, domain, x0, x1);
      expect(String(x)).toMatch(/^\d+(\.\d{1,2})?$/);
    }
  });

  it("do not move when the logarithm is off by its last digit", () => {
    const raw = (v: number, nudge: number) => x0 + ((Math.log(v) * (1 + nudge) - Math.log(domain[0])) / (Math.log(domain[1]) - Math.log(domain[0]))) * (x1 - x0);
    for (const v of values) {
      const x = forestX(v, domain, x0, x1);
      expect(Math.abs(x - raw(v, 0))).toBeLessThanOrEqual(0.005 + 1e-9);
      expect(Math.abs(x - raw(v, Number.EPSILON))).toBeLessThanOrEqual(0.005 + 1e-9);
    }
  });

  it("still span the axis from end to end", () => {
    expect(forestX(domain[0], domain, x0, x1)).toBe(x0);
    expect(forestX(domain[1], domain, x0, x1)).toBe(x1);
    expect(forestX(1, domain, x0, x1)).toBeGreaterThan(forestX(0.5, domain, x0, x1));
  });
});
