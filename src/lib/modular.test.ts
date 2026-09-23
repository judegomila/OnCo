import { describe, expect, it } from "vitest";
import { engine, evidenceRecordExists, formatFile, type FormatIndex } from "./modular";
import { CELL_STATES, COMPONENT_LABEL, FORMATS, NOT_RECORDED, type FormatId } from "./modular-formats";
import { graph } from "./graph";
import { engineRows, engineColumns } from "./tables/engine";
import { combinationIdeas } from "@/data/combination-ideas";

/**
 * The open drug engine (src/lib/modular.ts): every medicine taken apart into parts read from records, and a grid whose
 * every cell names the records its state comes from. The coverage figures are printed so a run shows how much of each
 * format the decomposer places; the floors below are the brief's 80 percent for the four formats it names. The medicines
 * left unresolved are registry-ingested records whose own summary says the target is not stated anywhere OnCo reads;
 * they are listed, never guessed, and join the grid when a target is added to the record.
 */
const e = engine();
const by = (id: FormatId): FormatIndex => e.formats.find((f) => f.format.id === id)!;
const g = graph();

describe("format taxonomy", () => {
  it("has one definition per format, each with two grid axes among its components, a glyph and no em-dashes", () => {
    expect(new Set(FORMATS.map((f) => f.id)).size).toBe(FORMATS.length);
    for (const f of FORMATS) {
      expect(f.components.slice(0, 2)).toEqual(f.axes);
      expect(f.glyph).toMatch(/^M/);
      expect(`${f.name} ${f.blurb}`).not.toMatch(/—/);
      for (const k of f.components) expect(COMPONENT_LABEL[k]).toBeTruthy();
    }
    expect(e.formats.map((f) => f.format.id)).toEqual(FORMATS.map((f) => f.id));
  });

  it("files every drug once: in a format, unresolved within a format, or outside with a reason", () => {
    const seen = new Map<string, string>();
    const put = (id: string, where: string) => { expect(seen.has(id), `${id} filed twice: ${seen.get(id)} and ${where}`).toBe(false); seen.set(id, where); };
    for (const f of e.formats) { for (const d of f.drugs) put(d.id, f.format.id); for (const u of f.unresolved) put(u.id, `${f.format.id} (unresolved)`); }
    for (const o of e.outside) put(o.id, `outside: ${o.reason}`);
    expect(seen.size).toBe(g.kind("drug").length);
    expect(e.outsideByReason.reduce((n, r) => n + r.count, 0)).toBe(e.outside.length);
  });
});

describe("decomposer coverage", () => {
  const floors: Record<string, number> = { adc: 80, radioligand: 80, "car-t": 80, bispecific: 80 };
  const lines = e.formats.map((f) => `${f.format.id.padEnd(15)} ${String(f.coverage.pct).padStart(3)}%  placed ${f.drugs.length}/${f.coverage.total} (both axes ${f.coverage.full}, ${COMPONENT_LABEL[f.format.axes[1]].toLowerCase()} not recorded ${f.coverage.partial}), unresolved ${f.coverage.unresolved}${f.unresolved.length ? `: ${f.unresolved.map((u) => u.id).join(", ")}` : ""}`);
  console.log(`decomposer coverage\n${lines.join("\n")}`);

  for (const [id, floor] of Object.entries(floors)) {
    it(`places at least ${floor}% of ${id} medicines on the grid`, () => {
      const f = by(id as FormatId);
      expect(f.coverage.total).toBeGreaterThan(10);
      expect(f.coverage.pct, `${id}: ${f.unresolved.map((u) => u.id).join(", ")}`).toBeGreaterThanOrEqual(floor);
    });
  }

  it("resolves every part from named fields with a confidence, and never places a drug without its row axis", () => {
    for (const f of e.formats) {
      const [ka] = f.format.axes;
      for (const d of f.drugs) {
        expect(d.components[ka], `${d.id} in ${f.format.id}`).toBeDefined();
        expect(d.fields.length).toBeGreaterThan(0);
        for (const r of Object.values(d.components)) {
          expect(r!.from.length, `${d.id} ${r!.key}`).toBeGreaterThan(0);
          expect(["high", "medium", "low"]).toContain(r!.confidence);
          expect(r!.id).toMatch(/^[a-z0-9]+([-+.][a-z0-9]+)*$/);
        }
      }
      for (const u of f.unresolved) { expect(u.missing).toContain(ka); expect(u.why).toMatch(/No .* on the record/); }
    }
  });

  it("reads the known anatomy of the approved ADCs and radioligands", () => {
    const adc = by("adc");
    const find = (id: string) => adc.drugs.find((d) => d.id === id)!;
    expect(find("trastuzumab-deruxtecan").components.target?.id).toBe("her2");
    expect(find("trastuzumab-deruxtecan").components.payload?.id).toBe("dxd");
    expect(find("trastuzumab-deruxtecan").components.payloadClass?.id).toBe("topoisomerase-i-payloads");
    expect(find("trastuzumab-deruxtecan").components.dar?.id).toBe("8");
    expect(find("trastuzumab-emtansine").components.linker?.id).toBe("non-cleavable");
    expect(find("enfortumab-vedotin").components.payload?.id).toBe("mmae");
    expect(find("zynlonta").components.payloadClass?.id).toBe("pbd-dimer-payloads");
    // INN stem alone: no payload registry entry, no payload field.
    expect(find("patritumab-deruxtecan").components.payload?.id).toBe("dxd");
    const rl = by("radioligand");
    const pl = rl.drugs.find((d) => d.id === "pluvicto")!;
    expect(pl.components.target?.id).toBe("psma");
    expect(pl.components.isotope?.id).toBe("lu-177");
    expect(pl.components.emission?.id).toBe("beta");
    expect(rl.drugs.find((d) => d.id === "ryz101")!.components.isotope?.id).toBe("ac-225");
    const car = by("car-t");
    expect(car.drugs.find((d) => d.id === "tisagenlecleucel")!.components.costim?.id).toBe("4-1bb");
    expect(car.drugs.find((d) => d.id === "axicabtagene-ciloleucel")!.components.costim?.id).toBe("cd28");
    const bi = by("bispecific");
    const bl = bi.drugs.find((d) => d.id === "blinatumomab")!;
    expect([bl.components.target?.id, bl.components.targetB?.id]).toEqual(["cd19", "cd3"]);
    const am = bi.drugs.find((d) => d.id === "amivantamab")!;
    expect(new Set([am.components.target?.id, am.components.targetB?.id])).toEqual(new Set(["egfr", "met"]));
    const deg = by("degrader");
    expect(deg.drugs.find((d) => d.id === "lenalidomide")!.components.ligase?.id).toBe("cereblon");
  });
});

describe("permutation grid", () => {
  it("classifies every cell from records it names, with one drug per cell state count", () => {
    for (const f of e.formats) {
      for (const c of f.cells) {
        expect(["approved", "development", "stopped", "unclear"]).toContain(c.state);
        expect(c.drugs.length).toBeGreaterThan(0);
        const total = c.counts.approved + c.counts.development + c.counts.stopped + c.counts.unclear;
        expect(total).toBe(c.drugs.length);
        // The cell's state is its strongest drug's state.
        const expected = c.counts.approved ? "approved" : c.counts.development ? "development" : c.counts.stopped ? "stopped" : "unclear";
        expect(c.state).toBe(expected);
        // A claimed state (anything but unclear) is backed by at least one record of that state, and every record exists.
        if (c.state !== "unclear") expect(c.evidence.some((ev) => ev.state === c.state), `${f.format.id} ${c.a.id} x ${c.b.id}`).toBe(true);
        for (const ev of c.evidence) {
          expect(evidenceRecordExists(ev.record, g), `${f.format.id}: ${ev.record}`).toBe(true);
          expect(ev.href).toMatch(/^(\/|https?:)/);
          expect(ev.label).not.toMatch(/—/);
        }
        // Stopped cells carry a quoted reason with the record it came from.
        if (c.state === "stopped") {
          expect(c.reasons.length, `${f.format.id} ${c.a.id} x ${c.b.id} has no recorded reason`).toBeGreaterThan(0);
          for (const r of c.reasons) { expect(r.quote.length).toBeGreaterThan(0); expect(evidenceRecordExists(r.record, g)).toBe(true); }
        }
      }
    }
  });

  it("counts untried cells as the real grid minus the tried cells, never counting the not-recorded column", () => {
    for (const f of e.formats) {
      const real = f.cols.filter((c) => c.id !== NOT_RECORDED).length;
      const tried = f.cells.filter((c) => c.b.id !== NOT_RECORDED).length;
      expect(f.counts.untried).toBe(Math.max(0, f.rows.length * real - tried));
      expect(f.counts.approved + f.counts.development + f.counts.stopped + f.counts.unclear).toBe(f.cells.length);
      for (const s of CELL_STATES) expect(f.counts[s]).toBeGreaterThanOrEqual(0);
      // Every row and column is a part some placed drug has; the not-recorded column, when present, is last.
      const rowIds = new Set(f.drugs.map((d) => d.components[f.format.axes[0]]!.id));
      expect(new Set(f.rows.map((r) => r.id))).toEqual(rowIds);
      const nr = f.cols.findIndex((c) => c.id === NOT_RECORDED);
      if (nr >= 0) expect(nr).toBe(f.cols.length - 1);
    }
  });

  it("has approved combinations where the corpus has approved medicines, and stopped ones with reasons", () => {
    const adc = by("adc");
    const her2top1 = adc.cells.find((c) => c.a.id === "her2" && c.b.id === "topoisomerase-i-payloads")!;
    expect(her2top1.state).toBe("approved");
    expect(her2top1.drugs.map((d) => d.id)).toContain("trastuzumab-deruxtecan");
    const her2alk = adc.cells.find((c) => c.a.id === "her2" && c.b.id === "dna-alkylator-payloads")!;
    expect(her2alk.state).toBe("stopped");
    expect(her2alk.reasons.some((r) => /withdrawn|response letter/i.test(r.quote))).toBe(true);
    const dll3pbd = adc.cells.find((c) => c.a.id === "dll3" && c.b.id === "pbd-dimer-payloads")!;
    expect(dll3pbd.state).toBe("stopped");
    expect(by("radioligand").cells.find((c) => c.a.id === "psma" && c.b.id === "lu-177")?.state).toBe("approved");
    expect(by("bispecific").cells.find((c) => c.a.id === "cd20" && c.b.id === "cd3")?.state).toBe("approved");
    // Stopped studies of medicines still in development are listed with the medicine's own state, so the reader sees both.
    const aca = by("bispecific").stopped.find((r) => r.drugId === "acasunlimab");
    expect(aca?.quote).toMatch(/discontinue/);
    expect(aca?.drugState).toBe("development");
  });

  it("lists every component value with its count and the drugs behind it", () => {
    for (const f of e.formats) for (const [k, list] of Object.entries(f.components)) {
      for (const c of list!) {
        expect(c.count).toBe(c.drugIds.length);
        expect(c.states.approved + c.states.development + c.states.stopped + c.states.unclear).toBe(c.count);
        for (const id of c.drugIds) expect(f.drugs.find((d) => d.id === id)?.components[k as keyof typeof COMPONENT_LABEL]?.id).toBe(c.id);
      }
    }
  });
});

describe("table, JSON and the proposals slot", () => {
  it("builds one plain row per cell with the axis columns keyed by component, deep-linkable by id", () => {
    for (const f of e.formats) {
      const rows = engineRows(f);
      const cols = engineColumns(f);
      expect(rows.length).toBe(f.cells.length);
      expect(new Set(rows.map((r) => r.id)).size).toBe(rows.length);
      expect(cols.slice(0, 2).map((c) => c.key)).toEqual(f.format.axes);
      for (const k of f.format.components) expect(cols.some((c) => c.key === k), `${f.format.id} ${k}`).toBe(true);
      const first = rows[0];
      const a = first[f.format.axes[0]] as { v?: string; text: string };
      expect(a.v).toBe(f.cells[0].a.id);
      // Plain data only: no functions or React nodes cross to the client table.
      expect(JSON.parse(JSON.stringify(rows))).toEqual(rows);
    }
  });

  it("serialises each format to JSON without loss and with the counts first", () => {
    for (const f of e.formats) {
      const file = formatFile(f) as Record<string, unknown>;
      expect(Object.keys(file).slice(0, 3)).toEqual(["format", "counts", "coverage"]);
      const text = JSON.stringify(file);
      expect(text).not.toMatch(/—/);
      const back = JSON.parse(text) as { cells: unknown[]; drugs: unknown[] };
      expect(back.cells.length).toBe(f.cells.length);
      expect(back.drugs.length).toBe(f.drugs.length);
    }
  });

  it("keeps the combination-ideas slot typed against the engine's format and component ids", () => {
    expect(Array.isArray(combinationIdeas)).toBe(true);
    for (const i of combinationIdeas) {
      const f = by(i.format);
      expect(f, i.format).toBeDefined();
      expect(i.evidence.length, `${i.id} needs a source`).toBeGreaterThan(0);
      expect(i.rationale).not.toMatch(/—/);
    }
  });
});
