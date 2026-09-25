import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { KIND_COLOR, kindTone, refChipClass } from "./text";
import { KINDS } from "./kinds";

/**
 * The reference pills a record page renders carry the kind's colours as one short class (`.k-<kind>`) rather than
 * KIND_COLOR's eight Tailwind utilities, because a page carries one pill per link the record has and the markup has
 * a budget (src/app/heavy-pages.test.ts). The two must say the same thing, so this compares them: a colour changed
 * in KIND_COLOR alone, or a kind added without its class, fails here rather than showing an unstyled pill.
 */
const css = readFileSync(new URL("../app/globals.css", import.meta.url), "utf8");
const rule = (cls: string): string | undefined => css.match(new RegExp(`\\.${cls} \\{ @apply ([^;]+);`))?.[1];

describe("kind tone classes", () => {
  it("names one class per kind, in step with KIND_COLOR", () => {
    for (const [kind, utilities] of Object.entries(KIND_COLOR)) {
      expect(rule(kindTone(kind)), `.${kindTone(kind)} in globals.css`).toBe(utilities);
    }
  });

  it("covers every kind a record page can link to", () => {
    for (const k of KINDS) expect(KIND_COLOR[k], k).toBeTruthy();
  });

  it("builds a pill's whole class from the pill, the hairline and the tone", () => {
    expect(refChipClass("paper")).toBe("chip chip-ref k-paper");
    expect(rule("chip-ref")).toBe("border transition-[filter] hover:brightness-95 dark:hover:brightness-125");
  });
});
