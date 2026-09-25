import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { isGone, isUnreachable, type LinksReport } from "../../scripts/check-links";
import { graph } from "./graph";
import { GENERAL_RED_FLAGS, redFlagSets, redFlagsFor, redFlagsForCancerId, redFlagSources, redFlagSourceUrls } from "@/data/red-flags";

describe("red flags", () => {
  it("every set has a match rule, every flag has a source URL, and copy has no em-dashes", () => {
    for (const s of redFlagSets) {
      expect(!!(s.drugIds?.length || s.modalityRe || s.cancerIds?.length), s.id).toBe(true);
      expect(s.flags.length, s.id).toBeGreaterThan(0);
      if (s.modalityRe) expect(() => new RegExp(s.modalityRe as string, "i")).not.toThrow();
      for (const f of [...s.flags, ...GENERAL_RED_FLAGS.flags]) {
        expect(f.source.url, `${s.id}: ${f.symptom}`).toMatch(/^https:\/\//);
        expect(`${f.symptom} ${f.threshold}`).not.toMatch(/—/);
      }
    }
    expect(GENERAL_RED_FLAGS.flags.length).toBeGreaterThan(3);
  });

  it("every drugId is a product in the corpus", () => {
    const g = graph();
    for (const s of redFlagSets) for (const id of s.drugIds ?? []) {
      const e = g.get(id);
      expect(e?.kind, `${s.id}: ${id}`).toBe("drug");
    }
  });

  it("cancer-scoped sets name real cancers and link to real records", () => {
    const g = graph();
    for (const s of redFlagSets) {
      for (const id of s.cancerIds ?? []) expect(g.get(id)?.kind, `${s.id}: ${id}`).toBe("cancer");
      for (const id of s.concernIds ?? []) expect(g.get(id), `${s.id}: ${id}`).toBeDefined();
    }
    expect(redFlagsForCancerId("gallbladder").map((s) => s.id)).toEqual(["biliary-cholangitis", "biliary-obstruction", "biliary-bleeding", "biliary-pain"]);
    // The family's cards reach the branch pages, as they do for prostate and lung: a triple-negative reader was
    // getting no spinal cord compression card at all. The family sepsis card stops short of this page because
    // this page has its own, naming the drugs it is given; one page, one sepsis card.
    expect(redFlagsForCancerId("tnbc").map((s) => s.id)).toEqual(["tnbc-neutropenic-sepsis", "tnbc-immune-reactions", "tnbc-adc-lung", "breast-cord-compression", "breast-lymphoedema-cellulitis", "breast-recurrence-signs"]);
    expect(redFlagsForCancerId("breast-her2-positive").map((s) => s.id)).toEqual(["breast-infection-sepsis", "breast-cord-compression", "breast-lymphoedema-cellulitis", "breast-recurrence-signs"]);
    expect(redFlagsForCancerId("pancreatic").map((s) => s.id)).toEqual(["pancreatic-cholangitis", "pancreatic-biliary-obstruction", "pancreatic-neutropenic-sepsis", "pancreatic-bleeding", "pancreatic-bowel-obstruction", "pancreatic-blood-clot"]);
    expect(redFlagsForCancerId("colorectal").map((s) => s.id)).toEqual(["colorectal-bowel-obstruction", "colorectal-perforation-peritonitis", "colorectal-neutropenic-sepsis", "colorectal-bleeding", "colorectal-stoma-emergencies", "colorectal-oxaliplatin-egfr"]);
    expect(redFlagsForCancerId("nsclc").map((s) => s.id)).toEqual(["lung-breathlessness", "lung-pneumonitis", "lung-neutropenic-sepsis", "lung-haemoptysis", "lung-svc-obstruction", "lung-spinal-cord-compression"]);
    expect(redFlagsForCancerId("sclc").map((s) => s.id)).toEqual(redFlagsForCancerId("nsclc").map((s) => s.id));
    expect(redFlagsForCancerId("prostate").map((s) => s.id)).toEqual(["prostate-cord-compression", "prostate-urinary-retention", "prostate-bone-pain", "prostate-hormone-therapy", "prostate-sexual-function", "prostate-docetaxel-sepsis"]);
    // Cord compression is the prostate emergency men are least often warned about: it leads on every prostate record that carries it.
    for (const id of ["prostate", "prostate-mhspc", "prostate-mcrpc", "prostate-nmcrpc"]) expect(redFlagsForCancerId(id)[0]?.id, id).toBe("prostate-cord-compression");
    // The breast family page carries what is shared whichever receptor result comes back; the immune-related and
    // deruxtecan lung cards stay on the subtype that prescribes those drugs.
    expect(redFlagsForCancerId("breast-cancer").map((s) => s.id)).toEqual(["breast-infection-sepsis", "breast-cord-compression", "breast-lymphoedema-cellulitis", "breast-recurrence-signs"]);
    expect(redFlagsForCancerId("mesothelioma")).toEqual([]);
  });

  it("matches the main classes by id or modality", () => {
    const g = graph();
    const pick = (id: string) => { const d = g.must(id); return d.kind === "drug" ? redFlagsFor(d.id, d.modality).map((s) => s.id) : []; };
    expect(pick("pembrolizumab")).toContain("checkpoint-inhibitors");
    expect(pick("trastuzumab-deruxtecan")).toContain("deruxtecan-adcs");
    expect(pick("enfortumab-vedotin")).toContain("adcs");
    expect(pick("axicabtagene-ciloleucel")).toContain("car-t");
    expect(pick("teclistamab")).toContain("t-cell-engagers");
    expect(pick("doxorubicin")).toContain("cytotoxic");
    expect(pick("bevacizumab")).toContain("vegf-inhibitors");
    expect(pick("osimertinib")).toContain("kinase-inhibitors");
    expect(pick("ibrutinib")).toContain("btk-inhibitors");
    expect(pick("olaparib")).toContain("parp-inhibitors");
    expect(pick("radium-223")).toContain("radioligands");
    expect(pick("venetoclax")).toContain("venetoclax");
    // A PET tracer is not a therapy and should get no class card.
    expect(pick("ga68-dotatate")).toEqual([]);
  });

  it("covers most products that carry structured toxicity data", () => {
    const g = graph();
    const withTox = g.kind("drug").filter((d) => d.toxicity.length);
    const covered = withTox.filter((d) => redFlagsFor(d.id, d.modality).length > 0);
    expect(covered.length / withTox.length).toBeGreaterThan(0.6);
  });
});

describe("red flag sources", () => {
  /** Every row, with the set it came from, so a failure names the rows a dead constant took down. */
  const rows = [GENERAL_RED_FLAGS, ...redFlagSets].flatMap((s) => s.flags.map((f) => ({ set: s.id, symptom: f.symptom, source: f.source })));

  it("every source URL is https, has a label, and is reachable in principle", () => {
    for (const r of rows) {
      expect(r.source.url, `${r.set}: ${r.symptom}`).toMatch(/^https:\/\//);
      expect(r.source.label.trim().length, `${r.set}: ${r.symptom}`).toBeGreaterThan(3);
      expect(() => new URL(r.source.url), `${r.set}: ${r.symptom}`).not.toThrow();
    }
    expect(redFlagSourceUrls().length).toBeGreaterThan(10);
    expect(redFlagSources().length).toBe(redFlagSourceUrls().length);
  });

  it("one label means one URL, so a fix to a shared constant reaches every row citing it", () => {
    const urlsByLabel = new Map<string, Set<string>>();
    for (const r of rows) urlsByLabel.set(r.source.label, (urlsByLabel.get(r.source.label) ?? new Set()).add(r.source.url));
    for (const [labelText, urls] of urlsByLabel) expect([...urls], labelText).toHaveLength(1);
  });

  it("the dead UKONS path is gone and the replacement is the toolkit PDF", () => {
    // The old URL 404s but the publisher answers with a 200 HTML page for some missing files, so this
    // is pinned by string: see the note at the top of src/data/red-flags.ts on checking content type.
    for (const r of rows) expect(r.source.url, `${r.set}: ${r.symptom}`).not.toContain("ukons.org/site/assets/files/1134/");
    const ukons = rows.filter((r) => /ukons/i.test(r.source.label));
    expect(ukons.length).toBeGreaterThan(0);
    for (const r of ukons) expect(r.source.url).toMatch(/ukons_triage_toolkit_v3_final\.pdf$/);
  });

  it("no two rows share a source URL the weekly link check has recorded as dead", () => {
    const path = join(process.cwd(), "public", "links.json");
    if (!existsSync(path)) return;
    const report = JSON.parse(readFileSync(path, "utf8")) as LinksReport;
    const byUrl = new Map(report.results.map((r) => [r.url, r]));
    const dead: string[] = [];
    for (const url of redFlagSourceUrls()) {
      const result = byUrl.get(url);
      // Not yet probed, or the site blocked our bot (403/429/5xx): neither is evidence of rot.
      if (!result || !(isGone(result) || isUnreachable(result))) continue;
      const citing = rows.filter((r) => r.source.url === url).map((r) => `${r.set}: ${r.symptom}`);
      dead.push(`${url} [${result.status}${result.softPdf404 ? " soft 404, served " + result.contentType : ""}] cited by ${citing.length} row(s): ${citing.join("; ")}`);
    }
    expect(dead, "dead red-flag sources, see public/links.json").toEqual([]);
  });
});
