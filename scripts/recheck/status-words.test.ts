import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { SIMPLE_END, TLDR_END, ZH_END, agrees, contradictions, said } from "./status-words";

describe("status words", () => {
  it("uses the very patterns src/data/trial-status-text.test.ts polices", () => {
    const gate = readFileSync(join(process.cwd(), "src", "data", "trial-status-text.test.ts"), "utf8");
    for (const [re, lifecycle] of [...TLDR_END, ...SIMPLE_END, ...ZH_END]) expect(gate, `${re.source} -> ${lifecycle}`).toContain(`[/${re.source}/, "${lifecycle}"]`);
    expect(gate.match(/^ {2}\[\/.*\/, "\w+"\],$/gm)).toHaveLength(TLDR_END.length + SIMPLE_END.length + ZH_END.length);
  });

  it("finds a sentence that would contradict the new status, in each of the three places", () => {
    const words = { tldr: "A phase 2 trial of X, run by Y, now completed.", simple: "Y runs this phase 2 trial of X, and it is now recruiting.", zh: "一项X的2期试验，正在招募。" };
    expect(contradictions("completed", words)).toEqual([
      { where: "plain-language sentence", says: "recruiting", ending: "Y runs this phase 2 trial of X, and it is now recruiting." },
      { where: "Chinese TL;DR", says: "recruiting", ending: "一项X的2期试验，正在招募。" },
    ]);
    expect(contradictions("recruiting", words).map((c) => c.where)).toEqual(["TL;DR"]);
  });

  it("is satisfied by words that agree, by words that make no claim, and by a finished trial with a result", () => {
    expect(contradictions("active", { tldr: "A trial of X, active and no longer recruiting.", simple: "A hand-written sentence about the design.", zh: undefined })).toEqual([]);
    expect(agrees("completed", "positive")).toBe(true);
    expect(agrees("recruiting", "positive")).toBe(false);
    expect(said("Sponsor reports that it is not yet recruiting.", TLDR_END)).toBe("planned");
  });
});
