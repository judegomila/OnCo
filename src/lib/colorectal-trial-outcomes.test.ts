import { expect, it } from "vitest";
import { graph } from "./graph";
import { explainTrial } from "./trial-explain";

it("renders distinct, denominator-specific AZUR-1 interim results in primary-first order", () => {
  const trial = graph().get("azur-1");
  if (trial?.kind !== "trial") throw new Error("Missing AZUR-1");
  expect(trial.enrolled).toBe(154);
  const outcomes = explainTrial(trial);
  expect(outcomes).toHaveLength(2);
  const [primary, investigator] = outcomes.map((row) => row.outcome);
  expect(primary.primary).toBe(true);
  expect(primary.endpoint).toContain("independent central review");
  expect(primary.arms[0]).toMatchObject({ n: 116, value: 47 });
  expect(primary.arms[0].note).toContain("54 of 116");
  expect(primary.arms[0].note).toContain("95% CI 37% to 56%");
  expect(primary.arms[0].note).toContain("38 additional patients");
  expect(primary.source).toContain("761174s015lbl.pdf");
  expect(investigator.primary).not.toBe(true);
  expect(investigator.arms[0]).toMatchObject({ n: 144, value: 68 });
  expect(investigator.arms[0].note).toContain("98 of 144");
  expect(investigator.arms[0].note).toContain("95% CI 60% to 76%");
});

it("keeps the two ATOMIC treatment phases distinct in the trial and its explanation", () => {
  const trial = graph().get("atomic");
  if (trial?.kind !== "trial") throw new Error("Missing ATOMIC");
  const sequence = "mFOLFOX6 + atezolizumab for 6 months, then atezolizumab alone for 6 months";
  expect(trial.setting).toContain(sequence);
  expect(trial.tldr).toContain("recurrence or death");
  const [{ outcome, explanation }] = explainTrial(trial);
  expect(explanation.caveats.join(" ")).toContain(sequence);
  expect(outcome.hr).toBe(0.5);
  expect(outcome.arms.map(({ n, value }) => [n, value])).toEqual([[355, 86.3], [357, 76.2]]);
});
