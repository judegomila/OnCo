import { describe, it, expect } from "vitest";
import { existsSync } from "node:fs";
import { join } from "node:path";
import portraitIndex from "../../public/portraits/index.json";
import { portraitFor, portraitInitial, portraitCoverage, type PortraitIndex } from "./portraits";

const INDEX = portraitIndex as unknown as PortraitIndex;
const LICENSE_OK = /^(CC0(?: 1\.0)?|CC BY(?:-SA)? [1-4](?:\.[05])?(?: [a-z]{2,3}(?:-[a-z]+)?)?|Public domain|PD(?:[- ].*)?|No restrictions)$/i;

describe("portraits index", () => {
  it("only holds files with an allow-listed licence, an author and a Commons source", () => {
    for (const [id, e] of Object.entries(INDEX.portraits)) {
      expect(e.id).toBe(id);
      expect(e.qid).toMatch(/^Q\d+$/);
      expect(e.license).toMatch(LICENSE_OK);
      expect(e.author.length).toBeGreaterThan(0);
      expect(e.attribution).toContain("via Wikimedia Commons");
      expect(e.source.startsWith("https://commons.wikimedia.org/wiki/File:")).toBe(true);
      expect(existsSync(join(process.cwd(), "public", "portraits", e.file))).toBe(true);
    }
  });
  it("resolves known ids and returns undefined for unknown ones", () => {
    const first = Object.keys(INDEX.portraits)[0];
    if (first) {
      const p = portraitFor(first)!;
      expect(p.src).toBe(`/portraits/${INDEX.portraits[first].file}`);
      expect(p.attribution).toMatch(/^Photo: /);
    }
    expect(portraitFor("no-such-person")).toBeUndefined();
    expect(portraitFor(undefined)).toBeUndefined();
    expect(portraitCoverage().total).toBe(Object.keys(INDEX.portraits).length);
  });
});

describe("portraitInitial", () => {
  it("uses the surname and strips honorifics and nicknames", () => {
    expect(portraitInitial("Dame Cally Palmer")).toBe("P");
    expect(portraitInitial("Peter W. T. Pisters")).toBe("P");
    expect(portraitInitial("Myung-Ju Ahn")).toBe("A");
    expect(portraitInitial("Sir Mike Richards")).toBe("R");
    expect(portraitInitial('Terrence "Terry" Fox')).toBe("F");
  });
});
