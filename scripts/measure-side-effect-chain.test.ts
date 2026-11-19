import { describe, expect, it } from "vitest";
import { measureSideEffectChain, normaliseEvent } from "./measure-side-effect-chain";

/**
 * A ratchet on the side effect -> care protocol -> warning card chain (docs/proposals/cross-links-census-2026-11.md,
 * section 3). The floors are what was measured on 16 November 2026, after the reach rules in src/lib/side-effects.ts
 * and the line-level links in src/data/red-flags.ts; the census of 11 November had 667 rows, 136 side effects and 68
 * with the chain complete. Raised on 18 November 2026, when the fourteen targeted-drug protocols of 17 November met
 * the reach rules: 684 rows became 764, 139 side effects 167, 39 groups 47, and 33, 101 and 79 became 40, 122 and 97.
 * Raised again on 18 November 2026 for the second round of sixteen protocols, two extended protocols and their warning
 * cards: 764 rows became 844, 167 side effects 223, 47 groups 56, and 40, 122 and 97 became 61, 183 and 151.
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
    expect(m.rowsWithProtocol).toBeGreaterThanOrEqual(844);
    expect(m.eventsWithProtocol).toBeGreaterThanOrEqual(223);
    expect(m.groupsWithEntry).toBeGreaterThanOrEqual(56);
  });

  it("does not let fewer side effects complete the chain to a warning card", () => {
    expect(m.protocolsLinked).toBeGreaterThanOrEqual(61);
    expect(m.eventsChainLinked).toBeGreaterThanOrEqual(183);
    expect(m.eventsChainOnOwnCard).toBeGreaterThanOrEqual(151);
  });

  it("names every side effect that reaches no protocol, with its group and how many products carry it", () => {
    expect(m.gaps.length).toBe(m.events - m.eventsWithProtocol);
    for (const gap of m.gaps) {
      expect(gap.event && gap.group, JSON.stringify(gap)).toBeTruthy();
      expect(gap.products, gap.event).toBeGreaterThan(0);
    }
    // High blood pressure was the largest gap until its protocol was written on 17 November 2026; it must not come back.
    expect(m.gaps.some((x) => x.event === "hypertension")).toBe(false);
    // Headache was the largest gap until its protocol was written on 18 November 2026; it must not come back either.
    expect(m.gaps.some((x) => x.event === "headache")).toBe(false);
    // What is left is small: no side effect without a protocol is carried by more than three products.
    expect(m.gaps[0].products).toBeLessThanOrEqual(3);
  });
});
