import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { regionalApprovals } from "../../src/data/regional-approvals";
import { REGIONAL_APPROVALS_FILE, appendRow, bodyIsWellFormed, eparSlug, formatKey, hasRow, parseRegionalApprovals, rowBody, rowKeys, serialiseRegionalApprovals, setRegion, sourceExpr, splitEntries, tsString, withRegionEntry } from "./regional-approvals-io";

describe("regional-approvals-io", () => {
  const src = readFileSync(REGIONAL_APPROVALS_FILE, "utf8");
  const parsed = parseRegionalApprovals(src);

  it("parsing and serialising the live file is a no-op", () => {
    expect(serialiseRegionalApprovals(parsed)).toBe(src);
  });

  it("finds exactly the rows the module exports, in order", () => {
    expect(rowKeys(parsed)).toEqual(Object.keys(regionalApprovals));
  });

  it("keeps comments and blank lines inside the object", () => {
    const others = parsed.lines.filter((l) => l.kind === "other").map((l) => l.raw);
    expect(others.some((l) => l.startsWith("  // ================= ADCs"))).toBe(true);
    expect(others).toContain("");
  });

  it("refuses an object it could not write back faithfully", () => {
    const broken = src.replace(/^  pembrolizumab: (.*),$/m, "  pembrolizumab: {\n    US: A(2014) },");
    expect(() => parseRegionalApprovals(broken)).toThrow(/neither a one-line row/);
  });

  it("appends a row under a dated comment once and writes quoted keys only where needed", () => {
    const body = '{ EU: V(A(2025, epar("ezmekly"), "Neurofibromatosis type 1 plexiform neurofibromas", "EMA register: Authorised")) }';
    let next = appendRow(parsed, "mirdametinib-test", body, "Proposals bot: rows read on 2026-09-23");
    next = appendRow(next, "plainkey", "{ EU: W(undefined, epar(\"zumrad\"), \"Application withdrawn\") }", "Proposals bot: rows read on 2026-09-23");
    const out = serialiseRegionalApprovals(next);
    expect(out.split("  // Proposals bot: rows read on 2026-09-23").length).toBe(2);
    expect(out).toContain(`  "mirdametinib-test": ${body},\n`);
    expect(out).toContain("  plainkey: { EU: W(");
    expect(out.endsWith(parsed.tail)).toBe(true);
    const again = parseRegionalApprovals(out);
    expect(hasRow(again, "mirdametinib-test")).toBe(true);
    expect(rowBody(again, "plainkey")).toContain("zumrad");
    expect(rowKeys(again).length).toBe(rowKeys(parsed).length + 2);
    expect(() => appendRow(next, "plainkey", body)).toThrow(/already exists/);
  });

  it("rejects malformed or unknown-helper bodies", () => {
    expect(bodyIsWellFormed('{ EU: A(2020, epar("x")) }')).toBe(true);
    expect(bodyIsWellFormed('{ EU: A(2020, epar("x") }')).toBe(false);
    expect(bodyIsWellFormed('{ EU: eval("x") }')).toBe(false);
    expect(bodyIsWellFormed("{ EU: A(2020) }\n")).toBe(false);
    expect(() => appendRow(parsed, "new-key", "{ EU: fetch(1) }")).toThrow(/malformed/);
  });

  it("adds a region entry to an existing object row in the file's region order, never to a helper-call row", () => {
    // A fixture with the live head and tail, so the test does not depend on which products currently lack an EU entry.
    const fixture = `${parsed.head}  // fixture\n  cnonly: { CN: A(2020, NMPA, "Advanced NETs (Dec 2020); pancreatic NETs (June 2021)") },\n  "two-regions": { US: A(2020, undefined, "a, b (c, d)"), UK: A(2021, mhra("X")) },\n  helper: global("Keytruda", "keytruda", 2014, 2015, 2015, 2016, 2018, 2015),\n${parsed.tail}`;
    const fx = parseRegionalApprovals(fixture);
    expect(serialiseRegionalApprovals(fx)).toBe(fixture);
    const body = rowBody(fx, "cnonly")!;
    expect(splitEntries(body)?.map((e) => e.region)).toEqual(["CN"]);
    expect(withRegionEntry(body, "EU", 'W(undefined, epar("sevsury"), "Application withdrawn")')).toBe('{ EU: W(undefined, epar("sevsury"), "Application withdrawn"), CN: A(2020, NMPA, "Advanced NETs (Dec 2020); pancreatic NETs (June 2021)") }');
    expect(splitEntries(rowBody(fx, "two-regions")!)?.map((e) => e.region)).toEqual(["US", "UK"]);
    expect(withRegionEntry(rowBody(fx, "two-regions")!, "EU", "A(2020)")).toBe('{ US: A(2020, undefined, "a, b (c, d)"), EU: A(2020), UK: A(2021, mhra("X")) }');
    expect(withRegionEntry('{ US: A(2020), EU: A(2021) }', "EU", "A(2020)")).toBeUndefined();
    expect(withRegionEntry(rowBody(fx, "helper")!, "EU", "A(2015)")).toBeUndefined();
    const p2 = setRegion(fx, "cnonly", "EU", 'W(undefined, epar("sevsury"), "note")');
    expect(rowKeys(p2)).toEqual(rowKeys(fx));
    expect(rowBody(p2, "cnonly")).toBe('{ EU: W(undefined, epar("sevsury"), "note"), CN: A(2020, NMPA, "Advanced NETs (Dec 2020); pancreatic NETs (June 2021)") }');
    expect(serialiseRegionalApprovals(p2)).toContain('\n  cnonly: { EU: W(undefined, epar("sevsury"), "note"), CN: A(2020, NMPA, ');
    expect(() => setRegion(fx, "helper", "EU", "A(2015)")).toThrow(/helper call or region present/);
    expect(() => setRegion(fx, "no-such-row", "EU", "A(2015)")).toThrow(/no row/);
  });

  it("formats keys, strings and sources the way the hand-written rows do", () => {
    expect(formatKey("pembrolizumab")).toBe("pembrolizumab");
    expect(formatKey("trastuzumab-deruxtecan")).toBe('"trastuzumab-deruxtecan"');
    expect(tsString('He said "yes"\n twice')).toBe("\"He said 'yes' twice\"");
    expect(eparSlug("https://www.ema.europa.eu/en/medicines/human/EPAR/tookad")).toBe("tookad");
    expect(eparSlug("https://www.ema.europa.eu/en/medicines/human/EPAR/zefylti-0")).toBe("zefylti-0");
    expect(eparSlug("https://www.ema.europa.eu/en/medicines")).toBeUndefined();
    expect(sourceExpr("https://www.ema.europa.eu/en/medicines/human/EPAR/tookad")).toBe('epar("tookad")');
    expect(sourceExpr("https://example.org/x")).toBe('"https://example.org/x"');
  });
});
