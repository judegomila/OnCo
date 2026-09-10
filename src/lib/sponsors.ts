import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { graph } from "./graph";
import { routeFor } from "./schema";
import { resolveSponsor, type SponsorKind } from "@/data/sponsor-aliases";

/**
 * Trial sponsor leaderboard: who runs the trials, aggregated from two sources.
 *
 *  - Corpus trials (401 curated landmark and current trials) via their `sponsor` field. A sponsor string
 *    like "AstraZeneca / Daiichi Sankyo" credits each party.
 *  - Registry studies: the phase 2 and 3 studies ClinicalTrials.gov returns for each product in the corpus
 *    (public/trials/<drugId>.json, refreshed weekly), via `sponsor` (the lead sponsor), de-duplicated by
 *    NCT id across products.
 *
 * Sponsor names are normalised to company, institution or cooperative-group ids through
 * src/data/sponsor-aliases.ts; unmatched names are kept as written. Registry conditions are matched to
 * corpus cancers by name and alias, so a study counts under a cancer only when the condition text names it.
 * Build-time only (reads the file system).
 */
export type SponsorRow = {
  key: string;
  label: string;
  id?: string;
  route?: string;
  kind: SponsorKind;
  matched: boolean;
  corpusTrials: Array<{ id: string; name: string; route: string; phase: string; status?: string }>;
  registryTotal: number;
  registryPhase3: number;
  registryPhase2: number;
  registryRecruiting: number;
  /** Study counts by corpus cancer id (registry plus corpus). */
  cancers: Record<string, number>;
  /** Product ids the registry studies were found under. */
  drugs: string[];
};

type Study = { nct: string; title: string; status: string; phases: string[]; conditions: string[]; sponsor?: string };
type DrugTrials = { drugId: string; fetched: string; studies: Study[] };

const TRIALS_DIR = join(process.cwd(), "public", "trials");

function readRegistry(): DrugTrials[] {
  if (!existsSync(TRIALS_DIR)) return [];
  return readdirSync(TRIALS_DIR).filter((f) => f.endsWith(".json") && f !== "index.json").map((f) => JSON.parse(readFileSync(join(TRIALS_DIR, f), "utf8")) as DrugTrials);
}

/** Keyword index from cancer names and aliases, longest first so "small-cell lung" beats "lung". */
function cancerMatcher(): (text: string) => string[] {
  const g = graph();
  const STOP = new Set(["cancer", "tumour", "tumor", "carcinoma", "neoplasm", "leukaemia", "leukemia", "lymphoma", "sarcoma", "all", "cll", "aml", "mds"]);
  const entries: Array<[string, string]> = [];
  for (const c of g.kind("cancer")) {
    const names = [c.name, ...c.aka].flatMap((n) => [n, n.replace(/\s*\(.*?\)\s*/g, " ").trim()]);
    for (const n of names) { const k = n.toLowerCase().replace(/[^a-z0-9 +-]/g, " ").replace(/\s+/g, " ").trim(); if (k.length >= 4 && !STOP.has(k)) entries.push([k, c.id]); }
    const abbr = c.name.match(/\(([A-Za-z0-9-]{3,10})\)/)?.[1];
    if (abbr && !STOP.has(abbr.toLowerCase())) entries.push([abbr.toLowerCase(), c.id]);
  }
  // Registry vocabulary that does not appear in corpus names.
  const extra: Array<[string, string]> = [
    ["non-small cell lung", "nsclc"], ["non small cell lung", "nsclc"], ["nsclc", "nsclc"], ["small cell lung", "sclc"], ["sclc", "sclc"],
    ["triple negative breast", "tnbc"], ["triple-negative breast", "tnbc"], ["tnbc", "tnbc"],
    ["her2-positive breast", "breast-her2-positive"], ["her2 positive breast", "breast-her2-positive"], ["her2+ breast", "breast-her2-positive"],
    ["hormone receptor positive", "breast-hr-positive"], ["hr-positive", "breast-hr-positive"], ["hr+", "breast-hr-positive"], ["estrogen receptor positive", "breast-hr-positive"],
    ["colorectal", "colorectal"], ["colon cancer", "colorectal"], ["rectal cancer", "colorectal"], ["pancreatic", "pancreatic"], ["gastric", "gastric"], ["stomach", "gastric"], ["gastroesophageal", "gastric"],
    ["esophageal", "esophageal"], ["oesophageal", "esophageal"], ["hepatocellular", "hcc"], ["cholangiocarcinoma", "cholangiocarcinoma"], ["biliary", "cholangiocarcinoma"],
    ["prostate", "prostate"], ["urothelial", "urothelial"], ["bladder", "urothelial"], ["renal cell", "rcc"], ["kidney cancer", "rcc"], ["ovarian", "ovarian"], ["endometrial", "endometrial"], ["uterine", "endometrial"], ["cervical", "cervical"],
    ["melanoma", "melanoma"], ["glioblastoma", "glioblastoma"], ["glioma", "glioblastoma"], ["head and neck", "head-and-neck"], ["thyroid", "thyroid"], ["mesothelioma", "mesothelioma"], ["neuroendocrine", "neuroendocrine"],
    ["acute myeloid", "aml"], ["acute lymphoblastic", "all-leukemia"], ["chronic lymphocytic", "cll"], ["chronic myeloid", "cml"], ["diffuse large b", "dlbcl"], ["hodgkin", "hodgkin-lymphoma"], ["multiple myeloma", "multiple-myeloma"], ["myeloma", "multiple-myeloma"],
    ["mantle cell", "mantle-cell-lymphoma"], ["follicular lymphoma", "follicular-lymphoma"], ["myelodysplastic", "mds"], ["myelofibrosis", "myeloproliferative-neoplasms"], ["neuroblastoma", "neuroblastoma"], ["osteosarcoma", "osteosarcoma"], ["ewing", "ewing-sarcoma"],
    ["gastrointestinal stromal", "gist"], ["merkel", "merkel-cell-carcinoma"], ["cutaneous squamous", "cutaneous-scc"], ["basal cell", "basal-cell-carcinoma"], ["nasopharyngeal", "nasopharyngeal"], ["uveal", "uveal-melanoma"],
  ];
  entries.push(...extra.filter(([, id]) => g.get(id)));
  entries.sort((a, b) => b[0].length - a[0].length);
  const generic: Array<[string, string]> = [["breast", "breast-hr-positive"], ["lung", "nsclc"]];
  return (text: string) => {
    const t = text.toLowerCase();
    const hits = new Set<string>();
    for (const [k, id] of entries) if (t.includes(k)) hits.add(id);
    if (!hits.size) for (const [k, id] of generic) if (t.includes(k)) hits.add(id);
    return [...hits];
  };
}

/** Corpus sponsor strings list co-sponsors with " / " or "; ". Parenthetical notes ("(now Servier)") are dropped. */
function splitSponsors(s: string): string[] {
  return s.split(/\s*[/;]\s*/).map((x) => x.replace(/\(.*?\)/g, "").trim()).filter((x) => x.length > 2);
}

export function sponsorLeaderboard(): { rows: SponsorRow[]; registryStudies: number; registryFetched?: string; unmatchedShare: number } {
  const g = graph();
  const matchCancer = cancerMatcher();
  const rows = new Map<string, SponsorRow>();
  const rowFor = (name: string): SponsorRow => {
    const t = resolveSponsor(name);
    const key = t.id ?? `name:${t.label.toLowerCase()}`;
    let r = rows.get(key);
    if (!r) {
      const e = t.id ? g.get(t.id) : undefined;
      r = { key, label: e?.name ?? t.label, id: t.id, route: e ? routeFor(e) : undefined, kind: t.kind, matched: t.matched, corpusTrials: [], registryTotal: 0, registryPhase3: 0, registryPhase2: 0, registryRecruiting: 0, cancers: {}, drugs: [] };
      rows.set(key, r);
    }
    return r;
  };
  const bump = (r: SponsorRow, cancers: string[]) => { for (const c of cancers) r.cancers[c] = (r.cancers[c] ?? 0) + 1; };

  for (const t of g.kind("trial")) {
    if (!t.sponsor) continue;
    for (const name of splitSponsors(t.sponsor)) {
      // "SWOG / NCI (with COG)" credits SWOG and the NCI; the unmatched remainder of a compound name is skipped.
      const r = rowFor(name);
      if (r.corpusTrials.some((x) => x.id === t.id)) continue;
      r.corpusTrials.push({ id: t.id, name: t.name, route: routeFor(t), phase: t.phase, status: t.status });
      bump(r, t.cancers);
    }
  }

  const files = readRegistry();
  const seen = new Set<string>();
  let registryStudies = 0;
  for (const f of files) {
    for (const s of f.studies) {
      if (!s.sponsor || seen.has(s.nct)) continue;
      seen.add(s.nct);
      registryStudies++;
      const r = rowFor(s.sponsor);
      r.registryTotal++;
      if (s.phases.includes("PHASE3")) r.registryPhase3++;
      if (s.phases.includes("PHASE2")) r.registryPhase2++;
      if (s.status === "RECRUITING") r.registryRecruiting++;
      if (!r.drugs.includes(f.drugId)) r.drugs.push(f.drugId);
      bump(r, matchCancer(`${s.conditions.join(" | ")} | ${s.title}`));
    }
  }

  const list = [...rows.values()].sort((a, b) => (b.registryTotal + 3 * b.corpusTrials.length) - (a.registryTotal + 3 * a.corpusTrials.length) || a.label.localeCompare(b.label));
  const unmatched = list.filter((r) => !r.matched).reduce((n, r) => n + r.registryTotal + r.corpusTrials.length, 0);
  const all = list.reduce((n, r) => n + r.registryTotal + r.corpusTrials.length, 0);
  return { rows: list, registryStudies, registryFetched: files[0]?.fetched, unmatchedShare: all ? unmatched / all : 0 };
}
