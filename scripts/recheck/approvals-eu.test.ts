import { describe, expect, it } from "vitest";
import type { regionalApprovals } from "../../src/data/regional-approvals";
import type { EmaRow } from "../fetch-ema";
import { type EuDrug, euDrift, readEmaTable } from "./approvals-eu";
import { fakeNet, workbook } from "./test-helpers";

const med = (over: Partial<EmaRow> & { name: string; inn: string }): EmaRow => ({ status: "Authorised", generic: false, biosimilar: false, conditional: false, atc: "L01XX00", authorised: "2021-03-26", url: `https://www.ema.europa.eu/en/medicines/human/EPAR/${over.name.toLowerCase()}`, ...over });
const drug = (id: string, asOf = "2026-09-10"): EuDrug => ({ id, kind: "drug", name: id[0].toUpperCase() + id.slice(1), aka: [], asOf });
const regional = (rows: Record<string, { status: string; year?: number }>) => Object.fromEntries(Object.entries(rows).map(([id, EU]) => [id, { EU }])) as unknown as typeof regionalApprovals;
const drift = (register: EmaRow[], drugs: EuDrug[], rows: Record<string, { status: string; year?: number }>) => euDrift(register, drugs, regional(rows), "2026-11-18").findings;

describe("euDrift", () => {
  it("says nothing when the row and the register agree", () => {
    expect(drift([med({ name: "Exampla", inn: "examplinib" })], [drug("examplinib")], { examplinib: { status: "approved", year: 2021 } })).toEqual([]);
  });
  it("reports a row that says approved where the register says withdrawn", () => {
    const [f] = drift([med({ name: "Exampla", inn: "examplinib", status: "Withdrawn", withdrawn: "2026-10-01" })], [drug("examplinib")], { examplinib: { status: "approved", year: 2021 } });
    expect(f).toMatchObject({ kind: "eu-approvals", type: "status-mismatch", severity: "high", recordId: "examplinib", onco: "EU approved", url: "https://www.ema.europa.eu/en/medicines/human/EPAR/exampla" });
    expect(f.source).toContain("Withdrawn");
  });
  it("reports conditional against full approval, either way round", () => {
    expect(drift([med({ name: "Exampla", inn: "examplinib" })], [drug("examplinib")], { examplinib: { status: "conditional", year: 2021 } })).toMatchObject([{ type: "conditional-mismatch", severity: "medium", onco: "EU conditional 2021", source: "Exampla: Authorised" }]);
    expect(drift([med({ name: "Exampla", inn: "examplinib", conditional: true })], [drug("examplinib")], { examplinib: { status: "approved", year: 2021 } })).toMatchObject([{ type: "conditional-mismatch", source: "Exampla: Authorised (conditional)" }]);
  });
  it("reports a refusal recorded as a withdrawal", () => {
    expect(drift([med({ name: "Exampla", inn: "examplinib", status: "Refused", authorised: undefined, refused: "2020-10-28" })], [drug("examplinib")], { examplinib: { status: "withdrawn", year: 2020 } })).toMatchObject([{ type: "status-class-mismatch", date: "2020-10-28" }]);
  });
  it("reports a medicine the register lists that has no EU row here", () => {
    expect(drift([med({ name: "Exampla", inn: "examplinib" })], [drug("examplinib")], {})).toMatchObject([{ type: "missing-row", severity: "medium" }]);
  });
  it("reports a CHMP opinion awaiting the Commission, once, and most seriously where the row says otherwise", () => {
    const opinion = med({ name: "Exampla", inn: "examplinib", status: "Opinion", opinionStatus: "Positive", opinionDate: "2026-11-12", authorised: undefined });
    const out = drift([opinion], [drug("examplinib")], { examplinib: { status: "not-filed" } });
    expect(out).toMatchObject([{ type: "chmp-opinion-awaiting-decision", severity: "high", date: "2026-11-12", onco: "EU not-filed; last checked 2026-09-10" }]);
    expect(out[0].source).toBe("Exampla: CHMP opinion positive adopted 2026-11-12; medicine status Opinion");
    expect(drift([opinion], [drug("examplinib")], { examplinib: { status: "under-review" } })).toMatchObject([{ type: "chmp-opinion-awaiting-decision", severity: "medium" }]);
  });
  it("keeps a generic's opinion out of the way of the originator's", () => {
    const out = drift([med({ name: "Exampla", inn: "examplinib" }), med({ name: "Examplinib Krka", inn: "examplinib", generic: true, status: "Opinion", opinionStatus: "Positive", opinionDate: "2026-11-12", authorised: undefined })], [drug("examplinib")], { examplinib: { status: "approved", year: 2021 } });
    expect(out).toMatchObject([{ type: "chmp-opinion-awaiting-decision", severity: "low" }]);
    expect(out[0].note).toContain("generic or biosimilar");
  });
  it("lists an opinion adopted after the record was last checked", () => {
    const out = drift([med({ name: "Exampla", inn: "examplinib", opinionStatus: "Positive", opinionDate: "2026-10-15", authorised: "2026-11-10" })], [drug("examplinib", "2026-09-10")], { examplinib: { status: "approved", year: 2026 } });
    expect(out).toMatchObject([{ type: "chmp-opinion-since-check", date: "2026-10-15" }]);
    expect(drift([med({ name: "Exampla", inn: "examplinib", opinionStatus: "Positive", opinionDate: "2026-10-15", authorised: "2026-11-10" })], [drug("examplinib", "2026-11-11")], { examplinib: { status: "approved", year: 2026 } })).toEqual([]);
  });
  it("leaves a medicine outside oncology, and one that matches no record, out of the rows", () => {
    const r = euDrift([med({ name: "Cardia", inn: "cardiolol", atc: "C07AB00" }), med({ name: "Unknowna", inn: "unknownib" })], [drug("examplinib")], regional({}), "2026-11-18");
    expect(r.findings).toEqual([]);
    expect(r.notInCorpus).toBe(1);
  });
});

describe("readEmaTable", () => {
  const head = ["Category", "Name of medicine", "Medicine status", "Opinion status", "International non-proprietary name (INN)", "ATC code (human)", "Generic", "Biosimilar", "Conditional approval", "Opinion adopted date", "Marketing authorisation date", "Last updated date", "Medicine URL"];
  it("reads the spreadsheet with the register's own reader, opinion date included", async () => {
    const { net, calls } = fakeNet(() => new Response(new Uint8Array(workbook([head, ["Human", "Exampla", "Opinion", "Positive", "examplinib", "L01XX00", "No", "No", "No", "12/11/2026", "", "13/11/2026", "https://www.ema.europa.eu/en/medicines/human/EPAR/exampla"], ["Veterinary", "Petmed", "Authorised", "", "petmab", "", "No", "No", "No", "", "01/01/2020", "", ""]]))));
    const r = await readEmaTable(net);
    expect(calls).toHaveLength(1);
    expect(r.register).toMatchObject([{ name: "Exampla", status: "Opinion", opinionStatus: "Positive", inn: "examplinib", opinionDate: "2026-11-12", lastUpdated: "2026-11-13" }]);
  });
  it("says what went wrong instead of returning a table it could not read", async () => {
    expect((await readEmaTable(fakeNet(() => new Response("no", { status: 403 })).net)).error).toBe("blocked: refused (403)");
    expect((await readEmaTable(fakeNet(() => new Response(new Uint8Array(workbook([["Something", "else"]])))).net)).error).toContain("header row not found");
  });
});
