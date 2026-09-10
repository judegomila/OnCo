import { describe, expect, it } from "vitest";
import { csvEscape, exportFilename, flattenForCsv, toCsv, toNdjson, toJsonExport, EXPORT_LICENCE } from "./csv";

describe("csv", () => {
  it("escapes commas, quotes, newlines and edge spaces", () => {
    expect(csvEscape("plain")).toBe("plain");
    expect(csvEscape("a,b")).toBe('"a,b"');
    expect(csvEscape('say "hi"')).toBe('"say ""hi"""');
    expect(csvEscape("line\nbreak")).toBe('"line\nbreak"');
    expect(csvEscape(" padded")).toBe('" padded"');
    expect(csvEscape(12)).toBe("12");
    expect(csvEscape(null)).toBe("");
    expect(csvEscape(undefined)).toBe("");
  });

  it("writes a licence comment, a header from the union of keys, and CRLF line ends", () => {
    const out = toCsv([{ id: "a", n: 1 }, { id: "b", extra: "x, y" }]);
    const lines = out.split("\r\n");
    expect(lines[0]).toBe(`# ${EXPORT_LICENCE}`);
    expect(lines[1]).toBe("id,n,extra");
    expect(lines[2]).toBe("a,1,");
    expect(lines[3]).toBe('b,,"x, y"');
    expect(lines[4]).toBe("");
  });

  it("can omit the comment and fix the column order", () => {
    expect(toCsv([{ b: 2, a: 1 }], ["a", "b"], null)).toBe("a,b\r\n1,2\r\n");
  });

  it("flattens arrays of scalars with semicolons and nests the rest as JSON", () => {
    const row = flattenForCsv({ id: "x", tags: ["a", "b"], links: [{ url: "u" }], n: 3, missing: undefined, flag: true });
    expect(row).toEqual({ id: "x", tags: "a; b", links: '[{"url":"u"}]', n: 3, missing: "", flag: true });
  });

  it("ndjson is one object per line with a trailing newline", () => {
    expect(toNdjson([{ a: 1 }, { b: 2 }])).toBe('{"a":1}\n{"b":2}\n');
    expect(toNdjson([])).toBe("");
  });

  it("filenames are slugged and dated", () => {
    expect(exportFilename("Treatments & tests", "csv", new Date("2026-09-09T10:00:00Z"))).toBe("onco-treatments-tests-2026-09-09.csv");
    expect(exportFilename("***", "json", new Date("2026-01-02T00:00:00Z"))).toBe("onco-table-2026-01-02.json");
  });

  it("json export carries the attribution", () => {
    const j = JSON.parse(toJsonExport([{ a: 1 }], { name: "t", date: new Date("2026-09-09T00:00:00Z") }));
    expect(j.count).toBe(1);
    expect(j.licence).toBe("CC BY-NC 4.0");
    expect(j.attribution).toBe(EXPORT_LICENCE);
    expect(j.rows[0].a).toBe(1);
  });
});
