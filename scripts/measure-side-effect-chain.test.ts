import { describe, expect, it } from "vitest";
import { measureSideEffectChain, normaliseEvent } from "./measure-side-effect-chain";

/**
 * A ratchet on the side effect -> care protocol -> warning card chain (docs/proposals/cross-links-census-2026-11.md,
 * section 3). The floors are what was measured on 16 November 2026, after the reach rules in src/lib/side-effects.ts
 * and the line-level links in src/data/red-flags.ts; the census of 11 November had 667 rows, 136 side effects and 68
 * with the chain complete. Raised on 18 November 2026, when the fourteen targeted-drug protocols of 17 November met
 * the reach rules: 684 rows became 764, 139 side effects 167, 39 groups 47, and 33, 101 and 79 became 40, 122 and 97.
 *
 * Raise a floor when a round lifts the figure. Do not lower one to make this pass: a fall means a protocol stopped
 * reaching rows it reached, or a warning line lost its protocol. The one honest reason for a fall is that a mapping
 * was wrong (on 16 November six ivermectin side effects stopped reaching immune-related protocols they should never
 * have reached) or that two event strings were merged into one; then say which, here, beside the new number.
 */
describe("side effect -> protocol -> warning card", () => {
  const m = measureSideEffectChain();

  it("normalises an event the way the census did", () => {
    expect(normaliseEvent("Rash  (with nivolumab)")).toBe("rash");
    expect(normaliseEvent("QTc >500 ms")).toBe("qtc >500 ms");
  });

  it("does not let fewer side effects reach a protocol", () => {
    expect(m.rowsWithProtocol).toBeGreaterThanOrEqual(764);
    expect(m.eventsWithProtocol).toBeGreaterThanOrEqual(167);
    expect(m.groupsWithEntry).toBeGreaterThanOrEqual(47);
  });

  it("does not let fewer side effects complete the chain to a warning card", () => {
    expect(m.protocolsLinked).toBeGreaterThanOrEqual(40);
    expect(m.eventsChainLinked).toBeGreaterThanOrEqual(122);
    expect(m.eventsChainOnOwnCard).toBeGreaterThanOrEqual(97);
  });

  it("names every side effect that reaches no protocol, with its group and how many products carry it", () => {
    expect(m.gaps.length).toBe(m.events - m.eventsWithProtocol);
    for (const gap of m.gaps) {
      expect(gap.event && gap.group, JSON.stringify(gap)).toBeTruthy();
      expect(gap.products, gap.event).toBeGreaterThan(0);
    }
    // High blood pressure was the largest gap until its protocol was written on 17 November 2026; it must not come back.
    expect(m.gaps.some((x) => x.event === "hypertension")).toBe(false);
    // The largest gap now is known and stays named until a protocol for it is written: no record covers it yet.
    expect(m.gaps[0]).toMatchObject({ event: "headache", group: "Headache" });
  });
});
