import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { graph } from "@/lib/graph";
import { BiomarkerDetail } from "./BiomarkerDetail";

/**
 * The companion diagnostic table links a device to its own record when `deviceId` names one (gap audit class 1),
 * unless the "Tests that measure it" box on the same page already links that record: one link per product a page.
 */
describe("companion diagnostic devices link to their records", () => {
  const bm = (id: string) => { const b = graph().get(id); if (!b || b.kind !== "biomarker") throw new Error(id); return b; };
  const table = (id: string) => {
    const html = renderToStaticMarkup(createElement(BiomarkerDetail, { bm: bm(id) }));
    const at = html.indexOf('id="companion-diagnostics"');
    return html.slice(at, html.indexOf("</table>", at));
  };

  // Until 17 November 2026 the example here was ONCO/Reveal Dx on the EGFR exon 19 deletion page. The gap fill of that
  // day put ONCO/Reveal Dx in that page's Tests box, so the table rightly stopped linking it; the rule is unchanged and
  // both halves are now checked, with a device the Tests box still leaves out as the linked example.
  it("links Oncomine Dx Express Test on the HER2 mutation page, where the Tests box does not", () => {
    expect(table("her2-mutation")).toMatch(/<a class="underline" href="\/drugs\/oncomine-dx-express\/?">Oncomine Dx Express Test/);
  });

  it("does not link ONCO/Reveal Dx twice on the EGFR exon 19 deletion page, where the Tests box links it", () => {
    expect(table("egfr-exon-19-deletion")).toContain('<td class="font-medium">ONCO/Reveal Dx Lung &amp; Colon Cancer Assay (O/RDx-LCCA)</td>');
    const html = renderToStaticMarkup(createElement(BiomarkerDetail, { bm: bm("egfr-exon-19-deletion") }));
    const tests = html.slice(html.indexOf('id="tests"'));
    expect(tests).toMatch(/href="\/drugs\/onco-reveal-dx-lung-colon\/?"/);
  });

  it("does not link PD-L1 IHC 22C3 pharmDx twice on the PD-L1 CPS page", () => {
    expect(table("pd-l1-cps")).toContain('<td class="font-medium">PD-L1 IHC 22C3 pharmDx</td>');
  });

  it("leaves a device with no record as plain text", () => {
    expect(table("her2-ish-amplified")).toContain('<td class="font-medium">SPOT-LIGHT HER2 CISH Kit</td>');
  });
});
