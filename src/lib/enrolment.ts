/**
 * How to say what a trial's `enrolled` number counts. Registry figures count everyone enrolled; landmark papers often
 * report the randomised or analysed population instead, and `enrolledBasis` records which one a record uses.
 */
type Basis = "registry" | "randomised" | "analysed" | "treated" | "registered";

const WORD: Record<Basis, string> = { registry: "enrolled", randomised: "randomised", analysed: "analysed", treated: "treated", registered: "registered" };

export function enrolmentWord(basis?: string | null): string {
  return WORD[(basis as Basis) ?? "registry"] ?? "enrolled";
}

/** "1,581 randomised" or "2,031 enrolled" (en-GB grouping, stable across server and browser). */
export function enrolmentLabel(enrolled: number, basis?: string | null): string {
  return `${enrolled.toLocaleString("en-GB")} ${enrolmentWord(basis)}`;
}
