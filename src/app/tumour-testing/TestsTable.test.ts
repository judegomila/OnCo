import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { TUMOUR_TESTS, regulatoryStatuses } from "@/data/tumour-tests";
import { TestsTable } from "./TestsTable";
import { filterHref, filterQuery, matches, parseFilter, type TestRow } from "./filter";

/**
 * The filterable tumour tests table. The server renders every row (crawlers see the whole table); the client
 * only hides rows, drives the filter from the URL query, and puts a filter button with aria-expanded in the
 * column headers.
 */
const rows: TestRow[] = TUMOUR_TESTS.map((t) => ({
  id: t.id, name: t.name, url: t.url, companyId: t.companyId, companyName: t.companyId, companyRoute: `/companies/${t.companyId}/`,
  companyLogo: `/logos/${t.companyId}.png`, sample: t.sample, scope: t.scope, returns: t.returns, us: t.regulatory.us ?? "", eu: t.regulatory.eu ?? "",
  statuses: regulatoryStatuses(t.regulatory), technologies: t.technologies.map((id) => ({ id, name: id, route: `/technologies/${id}/`, kind: "technology" })), note: t.note,
}));
const render = (initialFilter = {}) => renderToStaticMarkup(createElement(TestsTable, { rows, initialFilter }));
const trs = (html: string) => [...html.matchAll(/<tr id="([a-z0-9-]+)"([^>]*)>/g)].map((m) => ({ id: m[1], hidden: /\bhidden\b/.test(m[2]) }));

describe("tumour tests table", () => {
  it("renders every row on the server, none hidden, with the count line", () => {
    const html = render();
    const all = trs(html);
    expect(all).toHaveLength(TUMOUR_TESTS.length);
    expect(all.filter((r) => r.hidden)).toHaveLength(0);
    expect(html).toContain(`${TUMOUR_TESTS.length} of ${TUMOUR_TESTS.length} tests`);
    // Company cells carry a logo tile beside the name.
    expect((html.match(/src="\/logos\//g) ?? []).length).toBeGreaterThanOrEqual(TUMOUR_TESTS.length);
  });

  it("column headers are buttons with aria-expanded that open the filter", () => {
    const html = render();
    const thead = html.slice(html.indexOf("<thead"), html.indexOf("</thead>"));
    const buttons = [...thead.matchAll(/<button[^>]*>/g)].map((m) => m[0]);
    expect(buttons).toHaveLength(4);
    for (const b of buttons) {
      expect(b).toContain('aria-expanded="false"');
      expect(b).toContain('aria-haspopup="dialog"');
      expect(b).toMatch(/aria-controls="filter-(company|sample|scope|status)"/);
    }
    expect(thead).toContain("Company");
    expect(thead).toContain("Sample");
    expect(thead).toContain("Scope");
    expect(thead).toContain("US status");
  });

  it("a filter hides the rows it excludes and keeps the rest, and the count says so", () => {
    const html = render(parseFilter("?sample=blood"));
    const all = trs(html);
    const blood = new Set(TUMOUR_TESTS.filter((t) => t.sample === "blood").map((t) => t.id));
    expect(blood.size).toBeGreaterThan(0);
    expect(all.filter((r) => !r.hidden).map((r) => r.id).sort()).toEqual([...blood].sort());
    expect(all.filter((r) => r.hidden)).toHaveLength(TUMOUR_TESTS.length - blood.size);
    expect(html).toContain(`${blood.size} of ${TUMOUR_TESTS.length} tests`);
    expect(html).toContain(">Clear<");
    // The active pill and header are marked.
    expect(html).toMatch(/aria-pressed="true"[^>]*title="Remove the Blood filter"/);
  });

  it("two filters combine, and the query round-trips", () => {
    const f = parseFilter("?sample=blood&scope=targeted-panel&nonsense=1");
    expect(f).toEqual({ sample: "blood", scope: "targeted-panel" });
    expect(filterQuery(f)).toBe("sample=blood&scope=targeted-panel");
    expect(filterHref({ company: "tempus" })).toBe("/tumour-testing/?company=tempus#tests");
    expect(filterHref({})).toBe("/tumour-testing/#tests");
    const shown = rows.filter((r) => matches(r, f));
    expect(shown.every((r) => r.sample === "blood" && r.scope === "targeted-panel")).toBe(true);
    const html = render(f);
    expect(trs(html).filter((r) => !r.hidden)).toHaveLength(shown.length);
  });

  it("reads regulatory statuses only from the test's own stated status", () => {
    expect(regulatoryStatuses({ us: "FDA approved (PMA P170019, 2017)", eu: "CE marked" })).toEqual(["fda", "ce"]);
    expect(regulatoryStatuses({ us: "Laboratory-developed test (CLIA laboratory); the FDA-approved version is MI Cancer Seek" })).toEqual(["ldt"]);
    expect(regulatoryStatuses({ us: "Laboratory-developed test (CLIA laboratory) with FDA Breakthrough Device designations" })).toEqual(["ldt"]);
    expect(regulatoryStatuses({ us: "xT CDx FDA approved (2023); the laboratory xT assay is a laboratory-developed test" })).toEqual(["fda", "ldt"]);
    expect(regulatoryStatuses({ us: "Research use only kit; the in vitro diagnostic version is TruSight Oncology Comprehensive" })).toEqual(["ruo"]);
    expect(regulatoryStatuses({})).toEqual([]);
  });
});
