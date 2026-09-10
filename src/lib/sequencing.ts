import { graph } from "./graph";
import { routeFor, type Cancer, type Entity, type Pairing } from "./schema";
import { evidenceFor } from "./evidence";

/**
 * Line-of-therapy sequencing tables built from each cancer's standard-of-care rows plus the sequence and caution
 * pairings that touch it. Pure functions over the graph; the setting parser mirrors the stage matcher used by
 * the Navigator (`settingMatches` in Navigator.tsx) but classifies into treatment lines rather than stages and
 * extracts the biomarker subgroup from the setting text.
 */
export type Line = "screening" | "early" | "locally-advanced" | "line-1" | "line-2" | "line-3-plus" | "maintenance" | "special" | "other";
export const LINE_ORDER: Line[] = ["screening", "early", "locally-advanced", "line-1", "maintenance", "line-2", "line-3-plus", "special", "other"];
export const LINE_LABEL: Record<Line, string> = {
  screening: "Screening, prevention and diagnosis", early: "Early / localised", "locally-advanced": "Locally advanced", "line-1": "Advanced, first line", maintenance: "Maintenance", "line-2": "Second line", "line-3-plus": "Third line and beyond", special: "Special situations", other: "Other settings",
};

/** Biomarker subgroups recognised in setting text, longest pattern first so "HER2-low" wins over "HER2". */
const SUBGROUPS: Array<[RegExp, string]> = [
  [/her2[- ]low|her2[- ]ultralow/i, "HER2-low"], [/her2[- ]?(positive|\+|amplified|mutant)|her2\b/i, "HER2"], [/hr[- ]?(positive|\+)|er[- ]?(positive|\+)|hormone[- ]receptor|endocrine/i, "HR-positive"], [/triple[- ]negative|tnbc/i, "Triple-negative"],
  [/egfr exon 20|exon 20/i, "EGFR exon 20"], [/egfr/i, "EGFR"], [/\balk\b/i, "ALK"], [/ros1/i, "ROS1"], [/kras ?g12c/i, "KRAS G12C"], [/kras|\bras\b/i, "RAS"], [/braf/i, "BRAF"], [/\bret\b/i, "RET"], [/\bmet\b/i, "MET"], [/ntrk/i, "NTRK"], [/nrg1/i, "NRG1"],
  [/msi|dmmr|mismatch|microsatellite/i, "MSI-H / dMMR"], [/pmmr|microsatellite[- ]stable|\bmss\b/i, "pMMR / MSS"], [/pd-?l1|cps|tps/i, "PD-L1"], [/tmb/i, "TMB-high"],
  [/brca|hrd|homologous/i, "BRCA / HRD"], [/pik3ca|akt|pten/i, "PIK3CA / AKT / PTEN"], [/esr1/i, "ESR1"], [/fgfr/i, "FGFR"], [/idh/i, "IDH"], [/flt3/i, "FLT3"], [/npm1/i, "NPM1"], [/kmt2a|menin/i, "KMT2A"], [/ph[- ]?positive|bcr::abl|bcr-abl/i, "Ph-positive"], [/del\(17p\)|tp53/i, "TP53 / del(17p)"], [/ighv/i, "IGHV"],
  [/cldn18|claudin/i, "Claudin 18.2"], [/fr[αa]|folate receptor/i, "FRα"], [/psma/i, "PSMA"], [/dll3/i, "DLL3"], [/mgmt/i, "MGMT"], [/hpv|p16/i, "HPV"], [/castration[- ]resistant|crpc|mcrpc/i, "Castration-resistant"], [/hormone[- ]sensitive|castration[- ]sensitive|mhspc|mcspc/i, "Hormone-sensitive"],
  [/germline/i, "Germline"], [/imdc|favourable risk|intermediate.*poor|poor risk/i, "IMDC risk"], [/children|paediatric|pediatric|infant|adolescent/i, "Age group"], [/unfit|frail|elderly|older|over 7\d/i, "Unfit / older"], [/high[- ]risk|standard[- ]risk|low[- ]risk|intermediate[- ]risk|very[- ]low/i, "Risk group"], [/\bfit\b/i, "Fit"],
];

export function subgroupOf(setting: string, approach = ""): string {
  for (const [re, label] of SUBGROUPS) if (re.test(setting)) return label;
  // Fall back to the approach text only for the strongest markers, so a generic row is not mis-labelled.
  for (const [re, label] of SUBGROUPS.slice(0, 6)) if (re.test(approach.slice(0, 80))) return label;
  return "All comers";
}

/** Classify a standard-of-care setting into a treatment line. */
export function lineOf(setting: string): Line {
  const s = setting.toLowerCase();
  if (/screening|prevention|diagnosis|staging|surveillance|risk assessment|work-?up/.test(s)) return "screening";
  if (/survivorship|supportive|brain metast|oligometast|pregnan|fertility|elderly|older|unfit|frail/.test(s)) return "special";
  if (/maintenance|consolidation after|post-induction|after platinum response/.test(s)) return "maintenance";
  if (/third|3rd|later line|beyond|refractory|heavily|triple-class|\b3\+|≥ ?3|three or more|after (two|2)/.test(s)) return "line-3-plus";
  // "Recurrent/metastatic" names the first palliative line rather than a second line.
  if (/recurrent ?\/ ?metastatic|recurrent or metastatic|persistent, recurrent/.test(s)) return "line-1";
  if (/second|2nd|after (progression|first|one|1|tki|platinum|chemotherapy|endocrine|cdk|immunotherapy)|relapsed|relapse|recurren|progress|salvage|resistant/.test(s)) return "line-2";
  const metastatic = /metastatic|stage iv|stage 4|extensive|castration|disseminated/.test(s);
  if (/stage iii|locally advanced|inoperable|limited stage|bulky|borderline/.test(s) && !metastatic) return "locally-advanced";
  if (metastatic || /advanced|unresectable/.test(s)) return "line-1";
  if (/stage i\b|stage i-|stage ii|early|localised|localized|resectable|neoadjuvant|adjuvant|operable|perioperative|low[- ]risk|very low|standard risk|intermediate risk|high[- ]risk|nmibc|non-muscle|small renal|low grade|smouldering|smoldering|chronic phase|watch|active surveillance|indolent/.test(s)) return "early";
  if (/first|1st|frontline|front-line|newly diagnosed|untreated|initial|induction|de novo|\bfit\b/.test(s)) return "line-1";
  return "other";
}

export type SeqRef = { id: string; name: string; route: string; status?: string; kind: Entity["kind"]; tldr: string; evidence: number | null };
export type SeqRow = { line: Line; subgroup: string; setting: string; approach: string; refs: SeqRef[]; guideline?: Cancer["standardOfCare"][number]["guideline"]; /** Best evidence score among the linked products and trials. */ evidence: number | null };
export type SeqPairing = { id: string; name: string; route: string; tldr: string; caution: boolean; a: SeqRef | null; b: SeqRef | null };
export type SequencingTable = { cancer: { id: string; name: string; route: string; group: string }; rows: SeqRow[]; lines: Array<{ line: Line; label: string; rows: SeqRow[] }>; subgroups: string[]; pairings: SeqPairing[] };

function ref(e: Entity): SeqRef {
  return { id: e.id, name: e.name, route: routeFor(e), status: e.status, kind: e.kind, tldr: e.tldr, evidence: evidenceFor(e)?.score ?? null };
}

export function sequencingFor(cancerId: string): SequencingTable | null {
  const g = graph();
  const c = g.get(cancerId);
  if (!c || c.kind !== "cancer") return null;
  const rows: SeqRow[] = c.standardOfCare.map((s) => {
    const refs = s.refs.map((id) => g.get(id)).filter((e): e is Entity => !!e).map(ref);
    const scores = refs.map((r) => r.evidence).filter((x): x is number => x !== null);
    return { line: lineOf(s.setting), subgroup: subgroupOf(s.setting, s.approach), setting: s.setting, approach: s.approach, refs, guideline: s.guideline, evidence: scores.length ? Math.max(...scores) : null };
  });
  const lines = LINE_ORDER.map((line) => ({ line, label: LINE_LABEL[line], rows: rows.filter((r) => r.line === line) })).filter((l) => l.rows.length);
  const subgroups = [...new Set(rows.map((r) => r.subgroup))].sort((a, b) => (a === "All comers" ? -1 : b === "All comers" ? 1 : a.localeCompare(b)));
  // Sequence and caution pairings that name this cancer, or whose sides are among the cancer's linked products.
  const linked = new Set<string>();
  for (const list of g.forCancer(cancerId).values()) for (const e of list) linked.add(e.id);
  const pairings: SeqPairing[] = g.kind("pairing")
    .filter((p): p is Pairing => (p.pairingType === "sequence" || p.pairingType === "caution") && (p.cancers.includes(cancerId) || linked.has(p.id) || (p.cancers.length === 0 && (linked.has(p.a) || linked.has(p.b)))))
    .map((p) => ({ id: p.id, name: p.name, route: routeFor(p), tldr: p.tldr, caution: p.pairingType === "caution", a: g.get(p.a) ? ref(g.must(p.a)) : null, b: g.get(p.b) ? ref(g.must(p.b)) : null }))
    .sort((x, y) => Number(x.caution) - Number(y.caution) || x.name.localeCompare(y.name));
  return { cancer: { id: c.id, name: c.name, route: routeFor(c), group: c.group }, rows, lines, subgroups, pairings };
}

/** Every cancer with at least one standard-of-care row, with counts for the index page. */
export function sequencingIndex(): Array<{ id: string; name: string; group: string; route: string; rows: number; lines: number; subgroups: number; pairings: number }> {
  const g = graph();
  return g.kind("cancer").filter((c) => c.standardOfCare.length).map((c) => {
    const t = sequencingFor(c.id)!;
    return { id: c.id, name: c.name, group: c.group, route: routeFor(c), rows: t.rows.length, lines: t.lines.length, subgroups: t.subgroups.length, pairings: t.pairings.length };
  });
}
