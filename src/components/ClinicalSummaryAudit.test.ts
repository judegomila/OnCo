import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { graph } from "@/lib/graph";
import { trialEvidence } from "@/lib/evidence";
import { TrialExplainer } from "./TrialExplainer";
import { ReadoutsForDrug } from "./BiomarkerDetail";

function trial(id: string) {
  const t = graph().must(id);
  if (t.kind !== "trial") throw new Error(`Expected a trial: ${id}`);
  return t;
}
const render = (id: string) => renderToStaticMarkup(createElement(TrialExplainer, { trial: trial(id) }));

describe("public trial explanations and drug biomarker requirements", () => {
  it.each(["checkmate-9la", "keynote-024-189"])("does not infer biomarker eligibility on %s", (id) => {
    const html = render(id);
    expect(html).toContain("In plain words");
    expect(html).not.toContain("trial selected people by a biomarker");
  });

  it("keeps the KEYNOTE-522 pCR result and its interim cohort together", () => {
    const html = render("keynote-522");
    expect(html).toContain("Interim analysis of the first randomised participants (n = 602)");
    expect(html).toContain("64.8 vs 51.2");
    expect(html).toContain("no invasive cancer");
    expect(html).toContain("permits residual in situ disease");
    expect(html).not.toContain("1,174 enrolled");
    expect(html).not.toContain("no cancer left at surgery");
  });

  it("uses the 172 people randomised to calculate PADA-1 evidence size points", () => {
    const t = trial("pada-1");
    expect(t.enrolled).toBe(1017);
    expect(trialEvidence(t).parts).toContainEqual({ label: "172 in the scored endpoint analysis", points: 11 });
    const html = render("pada-1");
    expect(html).toContain("n = 172");
    expect(html).toContain("the group medians differed by 6.2 months");
    expect(html).not.toContain("longer for half the group");
  });

  it("distinguishes the lidERA invasive disease-free result from overall survival", () => {
    const html = render("lidera");
    expect(html).toContain("event counted by invasive disease-free survival at 36 months");
    expect(html).not.toContain("one extra person helped");
  });

  it("scopes the Trodelvy PD-L1 requirement to the combination and keeps TROP2 separate", () => {
    const html = renderToStaticMarkup(createElement(ReadoutsForDrug, { drugId: "sacituzumab-govitecan" }));
    const [required, related] = html.split("Related biomarker readouts");
    expect(required).toContain("First-line use with pembrolizumab");
    expect(required).toContain("not a requirement for sacituzumab govitecan alone");
    expect(required).not.toContain("TROP2 expression");
    expect(related).toContain("TROP2 expression");
  });
});
