import { describe, expect, it } from "vitest";
import { enrolmentLabel, enrolmentWord } from "./enrolment";

describe("enrolment wording", () => {
  it("names the population the number counts", () => {
    expect(enrolmentLabel(1581, "randomised")).toBe("1,581 randomised");
    expect(enrolmentLabel(2031)).toBe("2,031 enrolled");
    expect(enrolmentWord("analysed")).toBe("analysed");
    expect(enrolmentWord("nonsense")).toBe("enrolled");
  });
});
