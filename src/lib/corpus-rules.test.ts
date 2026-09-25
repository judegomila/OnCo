/**
 * Corpus rules: the editorial invariants that used to live only in prose (CONTRIBUTING.md, the schema
 * comments, REVIEWERS.md), written as tests so a pull request that breaks one fails CI.
 *
 * Each rule lists its known exceptions by id. An exception is a record that predates the rule or has a
 * documented reason (an academic trial with no registry entry, say). New records get no exception:
 * either fix the record or add it here with a reason.
 */
import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { graph, outgoing } from "./graph";
import { KIND_META } from "./kinds";
import { MERGED_RECORDS } from "@/data/merged-records";
import { companies } from "@/data/companies";
import { companiesWave1 } from "@/data/companies-wave1";
import { companiesYc } from "@/data/companies-yc";
import { companiesStartups } from "@/data/companies-startups";
import { journals } from "@/data/journals";
import { journalsWave2 } from "@/data/journals-wave2";
import { people } from "@/data/people";
import { sources } from "@/data/sources";
import { terms } from "@/data/terms";
import { termsBasics } from "@/data/terms-basics";
import { termsJargon } from "@/data/terms-jargon";

const g = graph();
const vercel = JSON.parse(readFileSync(join(__dirname, "../../vercel.json"), "utf8")) as { redirects: Array<{ source: string; destination: string }> };

/**
 * House style for rendered copy: no em-dash or en-dash (write "to" for ranges, a comma, full stop or colon
 * otherwise), no "as of <date>" stamps (dates belong in `asOf`, `checked` or `year`), and never the word
 * "spike" (say "deep dive"). The internal `tags: ["spike"]` value is not rendered and is not checked.
 */
const HOUSE_STYLE_FIELDS = new Set(["tldr", "summary", "notes", "result", "setting", "indication", "note", "label"]);
const HOUSE_STYLE_RULES: [string, RegExp][] = [["em-dash or en-dash", /[—–]/], ['"as of" date stamp', /\bas of\b/i], ['the word "spike"', /\bspikes?\b/i]];
/**
 * Entities from files being edited by other passes when the rule landed (companies, journals, people, terms,
 * sources). Exempt so the rule can ship now; remove a module from this list once its copy is clean.
 */
const HOUSE_STYLE_EXEMPT_IDS = new Set(
  [...companies, ...companiesWave1, ...companiesYc, ...companiesStartups, ...journals, ...journalsWave2, ...people, ...sources, ...terms, ...termsBasics, ...termsJargon].map((e) => e.id),
);

/** Walks a record and reports every string under a rendered field name that breaks a house-style rule. */
function houseStyleViolations(value: unknown, key: string, path: string, out: string[]): void {
  if (typeof value === "string") {
    if (!HOUSE_STYLE_FIELDS.has(key)) return;
    for (const [rule, re] of HOUSE_STYLE_RULES) {
      const m = re.exec(value);
      if (m) out.push(`${path}: ${rule} at "${value.slice(Math.max(0, m.index - 30), m.index + 30)}"`);
    }
  } else if (Array.isArray(value)) {
    value.forEach((v, i) => houseStyleViolations(v, key, `${path}[${i}]`, out));
  } else if (value && typeof value === "object") {
    for (const [k, v] of Object.entries(value)) houseStyleViolations(v, k, `${path}.${k}`, out);
  }
}
const TODAY = new Date().toISOString().slice(0, 10);

/** Cytotoxic regimens are combinations of individually approved generics; they have no approval of their own. */
const isRegimen = (modality: string) => /regimen/i.test(modality);

/** Phase 3 trials with no ClinicalTrials.gov id: pre-registration era, non-US academic groups, or pooled analyses. */
const PHASE3_WITHOUT_NCT = new Set(["abc-02", "bilcap", "cadance-304", "circulate-japan", "crystal-fire3", "first-308", "olanzapine-appetite-tmh", "nlst-nelson", "prehab-trial",
  // Chinese phase 3 registered domestically only; NCT04829604, once recorded here, is the separate US study ACE-Breast-03.
  "ace-breast-02",
  // Japanese JCOG phase 3 registered with UMIN only (UMIN000011688).
  "ascot-jcog1202",
  // Japan Breast Cancer Research Group phase 3 registered with UMIN only (UMIN000000843).
  "create-x",
  // Pancreatic phase 3 trials with no ClinicalTrials.gov record: JASPAC 01 (UMIN000000655), PREOPANC-2 (EudraCT 2017-002036-17), CONKO-005 (German registry only), ESPAC-1 (predates the registries).
  "jaspac-01", "preopanc-2", "conko-005", "espac-1",
  // UK MRC trial run before ClinicalTrials.gov registration was required; registered as ISRCTN72251782.
  "pt-1",
  // Two UK lung cancer phase 3 trials that predate trial registration entirely: CHART recruited 1990 to 1995 and the
  // Big Lung Trial reported in 2004 from four separately randomised settings, neither with a registry record.
  "chart-lung", "big-lung-trial",
  // Radiotherapy trials from the pre-registration era: CALGB 9343 (opened 1994), DAHANCA 5 (1986 to 1994), START-B, CHHiP, HYPO-RT-PC, PRIME II, IMPORT LOW and QUARTZ (UK and Nordic trials registered with ISRCTN only).
  "calgb-9343", "dahanca-5", "start-b", "chhip", "hypo-rt-pc", "prime-ii", "import-low", "quartz", "fast-forward",
  // Prostate cancer trials that pre-date registration entirely: SPCG-4 randomised 1989 to 1999, RTOG 92-02 opened in 1992,
  // SWOG 8794 opened in 1988 and TAX 327 recruited March 2000 to June 2002, before the 2005 ICMJE registration requirement.
  // SPCG-7 and RADICALS-HD do have primary registry ids and carry them: ISRCTN01534787 and ISRCTN40814031.
  "spcg-4", "rtog-9202", "swog-8794", "tax-327",
  // Skin cancer trials that pre-date registration: the Institut Gustave Roussy surgery against radiotherapy trial
  // opened in 1982, and the two multicentre photodynamic therapy trials reported in 2007 and 2008 from recruitment
  // in the early 2000s. The three randomised skin trials that do carry primary registry ids carry them: the Dutch
  // Mohs trial is ISRCTN65009900, SINS is ISRCTN48755084 and the Dutch superficial trial is ISRCTN79701845.
  "avril-surgery-versus-radiotherapy-bcc", "mal-pdt-versus-surgery-nodular-bcc", "mal-pdt-versus-cryotherapy-superficial-bcc",
  // Lung cancer trials that pre-date ClinicalTrials.gov or are registered only where this field cannot hold the id:
  // IALT (randomised 1995 to 2000), JBR.10 (NCIC CTG, 1994 to 2001), Intergroup 0096 (Turrisi, opened 1989) and the
  // Dutch Bone Metastasis Study (1996) all pre-date registration; JCOG0802/WJOG4607L is UMIN000002317 and JROSG 99-1
  // is UMIN C000000412, and UMIN ids do not match the pattern below; AMPLE is on ANZCTR under a number this field's
  // ACTRN pattern does not cover; STARS and ROSEL is a pooled analysis of two trials (NCT00840749, NCT00687986), so
  // no single registry id belongs on the record.
  "ialt", "jbr-10", "turrisi-intergroup-0096", "dutch-bone-metastasis-study", "jcog0802", "jrosg-99-1", "ample", "stars-rosel",
  // J-ALEX is registered with the Japan Pharmaceutical Information Center as JapicCTI-132316 only.
  "j-alex",
  // Pre-registration chemoradiation and nodal trials (INT-0116, German rectal, ACT II, RTOG 91-11, DBCG 82, EORTC 26951, Slotman and Takahashi PCI).
  "int-0116", "cao-aro-aio-94", "act-ii", "rtog-91-11", "dbcg-82bc", "eortc-26951", "slotman-pci-es-sclc", "takahashi-pci",
  // Indian academic trials registered with the Clinical Trials Registry - India (CTRI) or run before registration was required.
  "low-dose-nivolumab-tmh", "metronomic-vs-cisplatin-tmh", "metro-plus-varanasi", "gefitinib-chemo-tmh", "progesterone-preop-tmh", "lidocaine-peritumoral-tmh", "osmanabad-hpv-screening", "kerala-oral-screening", "mumbai-via-screening",
  // EU industry pivotal registered with EudraCT only (2009-015999-10); the nct field does not accept EudraCT numbers (issue 83).
  "xm22-03",
  // Colorectal trials that predate registration or have none: AVF2107g (bevacizumab pivotal, accrued 2000 to 2002), the Dutch TME trial (1996 to 1999)
  // and the IDEA collaboration, which is a prospective pooled analysis of six separately registered trials rather than a trial with its own record.
  "avf2107g", "dutch-tme-trial", "idea-collaboration",
  // Colorectal screening, rectal radiotherapy and peritoneal trials that ran before registration: the Swedish Rectal Cancer
  // Trial (1987 to 1990), the Minnesota and Funen faecal occult blood trials, and the Netherlands Cancer Institute HIPEC trial.
  "swedish-rectal-cancer-trial", "minnesota-fob", "funen-fob", "netherlands-hipec",
  // Breast conservation and axillary trials that predate the registries entirely: NSABP B-04 opened in 1971,
  // NSABP B-06 in 1976, Milan I randomised 1973 to 1980, EORTC 10801 accrued 1980 to 1986 and ALMANAC 1999 to 2003.
  "nsabp-b04", "nsabp-b06", "milan-i", "eortc-10801", "almanac",
  // START-A shares ISRCTN59368779 with START-B, which already holds it; FAST is registered only under the Cancer
  // Research UK reference CRUKE/04/015.
  "start-a", "fast-trial"]);

/** Standard-of-care rows whose approach is surgery or observation, with no product to reference. */
const SOC_ROWS_WITHOUT_REFS = new Set(["cholangiocarcinoma: Resectable", "dlbcl: Frontline", "endometrial: Early", "neuroendocrine: Localised", "ovarian: Platinum-sensitive relapse"]);

/** Hosts that publish guidelines, or the primary publication a guideline row cites. */
const GUIDELINE_HOSTS = ["nccn.org", "jnccn.org", "esmo.org", "esgo.org", "uroweb.org", "who.int", "cancer.gov", "nice.org.uk", "asco.org", "ascopubs.org", "annalsofoncology.org", "doi.org", "pmc.ncbi.nlm.nih.gov", "pubmed.ncbi.nlm.nih.gov", "nature.com", "nejm.org", "thelancet.com"];
/** Rows that cite secondary coverage of a guideline update; replace with the guideline URL when it is public. */
const GUIDELINE_URL_EXCEPTIONS = new Set(["tnbc: Metastatic, first line, PD-L1 CPS ≥10", "tnbc: Metastatic, first line, PD-L1 negative or PD-1 ineligible"]);

/**
 * Acronyms that should not appear in a TL;DR (written for a reader with no background) unless the
 * glossary defines them, in which case the hover explains them. Endpoint and trial-design shorthand
 * is the usual leak.
 */
const TLDR_ACRONYM_DENYLIST = ["PFS", "OS", "ORR", "DFS", "EFS", "iDFS", "DOR", "pCR", "CR", "PR", "CI", "ITT", "TEAE", "DLT", "MTD", "RP2D", "SoC", "SOC", "QoL", "RWE", "AE", "AEs", "TKI", "IHC", "NGS", "TMB", "MSI", "dMMR", "MRD", "HR", "RECIST", "ECOG", "IO", "mAb", "RCT", "SAE", "TRAE", "irAE", "BICR", "NNT"];
/** TL;DRs that predate the rule. The glossary defines "MSI-H" and "Real-world evidence" but not the bare acronyms; reword or add the aka. */
const TLDR_ACRONYM_EXCEPTIONS = new Set(["owkin: MSI", "cota-healthcare: RWE", "paper-lynch-frameshift-vaccine-ccr-2020: MSI"]);

describe("corpus rules", () => {
  it("approved products carry at least one approval with a region and a year", () => {
    const failures: string[] = [];
    for (const d of g.kind("drug")) {
      if (d.status !== "approved" && d.status !== "standard-of-care") continue;
      if (isRegimen(d.modality)) continue;
      if (!d.approvals.length) failures.push(`${d.id}: no approvals`);
      for (const a of d.approvals) if (!a.region.trim() || !Number.isInteger(a.year)) failures.push(`${d.id}: approval without region or year`);
    }
    expect(failures).toEqual([]);
  });

  it("phase 3 trials have a ClinicalTrials.gov id", () => {
    const failures = g.kind("trial").filter((t) => t.phase === "3" && !t.nct && !PHASE3_WITHOUT_NCT.has(t.id)).map((t) => t.id);
    expect(failures).toEqual([]);
    // `nct` also carries other primary registry ids: ISRCTN (UK), ACTRN/ANZCTR (Australia and New Zealand), NTR (Netherlands).
    for (const t of g.kind("trial")) if (t.nct) expect(t.nct, t.id).toMatch(/^(NCT\d{8}|ISRCTN\d{8}|ACTRN\d{14}|ANZCTR\d{14}|NTR\d+)$/);
  });

  /**
   * Two trial records may share a registry id only for a stated reason: a basket cohort or a protocol version that
   * runs under one registration. The two pairs that were a hand-written record and a registry ingest of one study
   * (KEYNOTE-158 with nct02628067, IMpactMF with nct04576156) were merged on 25 September 2026; see
   * src/data/merged-records.ts and docs/DUPLICATE-RECORDS.md. Nothing new belongs here: a new pair means a curated
   * record and an ingest record were written for one study, and the answer is to merge them, not to list them.
   */
  it("no two trial records share a registry id except the two recorded pairs", () => {
    const ALLOWED = new Map<string, string>([
      ["roar|roar-atc", "two cohorts of the ROAR basket trial, biliary tract and anaplastic thyroid"],
      ["i-spy-2|i-spy-2-2", "I-SPY 2.2 runs under the I-SPY 2 registration"],
    ]);
    const byNct = new Map<string, string[]>();
    for (const t of g.kind("trial")) {
      if (!t.nct) continue;
      const list = byNct.get(t.nct) ?? [];
      list.push(t.id);
      byNct.set(t.nct, list);
    }
    const pairs = [...byNct.values()].filter((ids) => ids.length > 1).map((ids) => [...ids].sort().join("|"));
    expect(pairs.filter((p) => !ALLOWED.has(p))).toEqual([]);
  });

  /**
   * The paper half of the same rule. A DOI and a PubMed id each name one publication, so two paper records carrying
   * one of them are one paper written twice: once by an editor, once by a fetcher (scripts/fetch-cited-papers.ts,
   * fetch-trial-papers.ts, fetch-people-papers.ts, fetch-idea-evidence.ts), or twice by two deep dives. The TNBC,
   * colorectal and lung reviews each found a batch and each recorded it; 80 pairs were merged on 25 September 2026
   * (src/data/merged-records.ts), which is why this list is empty.
   *
   * Nothing new belongs here. A new pair means a second record was written for a paper the corpus already holds:
   * merge it with `npx tsx scripts/merge-records.ts <survivor> <retired> "<reason>"` (docs/DUPLICATE-RECORDS.md). An
   * entry is only right where two records genuinely share an identifier, which happens for an article and its own
   * correction notice when a publisher gives them one DOI; it needs its reason here.
   */
  it("no two paper records share a DOI or a PubMed id", () => {
    const ALLOWED = new Map<string, string>([]);
    const failures: string[] = [];
    for (const [label, key] of [["DOI", (p: { doi?: string }) => p.doi?.trim().toLowerCase().replace(/^https?:\/\/(dx\.)?doi\.org\//, "")], ["PubMed id", (p: { pmid?: string }) => p.pmid?.trim()]] as const) {
      const byKey = new Map<string, string[]>();
      for (const p of g.kind("paper")) {
        const k = key(p);
        if (!k) continue;
        byKey.set(k, [...(byKey.get(k) ?? []), p.id]);
      }
      for (const [k, ids] of byKey) {
        if (ids.length < 2) continue;
        const pair = [...ids].sort().join("|");
        if (!ALLOWED.has(pair)) failures.push(`${label} ${k}: ${pair}`);
      }
    }
    expect(failures).toEqual([]);
  });

  /**
   * A merge retires an id, and a retired id has three obligations: its page must redirect (the URL is published and
   * indexed), its record must be gone (two records for one thing is what the merge fixed), and its survivor must
   * exist (otherwise the relations the merge moved point nowhere). See src/data/merged-records.ts.
   */
  it("every retired id redirects to a survivor that exists and has no record of its own", () => {
    const redirects = new Set(vercel.redirects.map((r) => r.source));
    const failures: string[] = [];
    for (const m of MERGED_RECORDS) {
      const route = KIND_META[m.kind].route;
      if (!redirects.has(`/${route}/${m.retired}/:path*`)) failures.push(`${m.retired}: no redirect in vercel.json`);
      if (g.get(m.retired)) failures.push(`${m.retired}: retired but still a record`);
      if (!g.get(m.survivor)) failures.push(`${m.retired}: survivor ${m.survivor} does not exist`);
      if (!m.reason.trim()) failures.push(`${m.retired}: no reason recorded`);
    }
    expect(failures).toEqual([]);
  });

  /**
   * A record that names itself renders a card linking to the page the reader is on, and gives the graph a self-edge.
   * It is the shape a careless merge leaves behind: a cross-link written between two records for one thing becomes a
   * link to self once they are one record.
   */
  it("no record references itself", () => {
    const failures = g.entities.filter((e) => outgoing(e).some(([to]) => to === e.id)).map((e) => e.id);
    expect(failures).toEqual([]);
  });

  it("a trial whose enrolment counts a paper population says so and states the registry figure", () => {
    // `enrolledBasis` other than "registry" tells scripts/roadmap-watch.ts the gap is expected; the note is what a reader sees.
    const failures: string[] = [];
    for (const t of g.kind("trial")) {
      if (t.enrolledBasis === "registry") { if (t.enrolledNote) failures.push(`${t.id}: enrolledNote without a non-registry enrolledBasis`); continue; }
      if (!t.enrolled) failures.push(`${t.id}: enrolledBasis ${t.enrolledBasis} without an enrolled figure`);
      if (!t.enrolledNote?.trim()) failures.push(`${t.id}: enrolledBasis ${t.enrolledBasis} without an enrolledNote`);
      else if (!/\d/.test(t.enrolledNote)) failures.push(`${t.id}: enrolledNote does not quote the registry figure`);
    }
    expect(failures).toEqual([]);
  });

  it("standard-of-care rows reference the products or technologies they describe", () => {
    const failures: string[] = [];
    for (const c of g.kind("cancer")) for (const row of c.standardOfCare) {
      const key = `${c.id}: ${row.setting}`;
      if (!row.refs.length && !SOC_ROWS_WITHOUT_REFS.has(key)) failures.push(key);
    }
    expect(failures).toEqual([]);
  });

  it("no record is dated in the future", () => {
    const failures = g.entities.filter((e) => e.asOf > TODAY).map((e) => `${e.id} ${e.asOf}`);
    expect(failures).toEqual([]);
    for (const e of g.entities) if (e.provenance) expect(e.provenance.editedOn <= TODAY, e.id).toBe(true);
  });

  it("guideline URLs point at guideline bodies or the primary publication", () => {
    const failures: string[] = [];
    for (const c of g.kind("cancer")) for (const row of c.standardOfCare) {
      const url = row.guideline?.url;
      if (!url) continue;
      const host = new URL(url).hostname.replace(/^www\./, "");
      const ok = GUIDELINE_HOSTS.some((h) => host === h || host.endsWith(`.${h}`));
      if (!ok && !GUIDELINE_URL_EXCEPTIONS.has(`${c.id}: ${row.setting}`)) failures.push(`${c.id}: ${row.setting} -> ${host}`);
    }
    expect(failures).toEqual([]);
  });

  it("TL;DRs avoid trial and endpoint acronyms unless the glossary defines them", () => {
    // A glossary term defines an acronym through its name ("Progression-free survival (PFS)"), a parenthetical, or an aka.
    const defined = new Set<string>();
    for (const t of g.kind("term")) {
      for (const s of [t.name, ...t.aka]) defined.add(s.trim().toUpperCase());
      for (const m of t.name.matchAll(/\(([^)]+)\)/g)) for (const part of m[1].split(/[\s/,]+/)) defined.add(part.toUpperCase());
    }
    const failures: string[] = [];
    for (const e of g.entities) {
      for (const acr of TLDR_ACRONYM_DENYLIST) {
        if (defined.has(acr.toUpperCase())) continue;
        const re = new RegExp(`(^|[^A-Za-z0-9-])${acr}(?![A-Za-z0-9-])`);
        if (re.test(e.tldr) && !TLDR_ACRONYM_EXCEPTIONS.has(`${e.id}: ${acr}`)) failures.push(`${e.id}: "${acr}"`);
      }
    }
    expect(failures).toEqual([]);
  });

  it("every TL;DR is a full sentence, not a fragment", () => {
    for (const e of g.entities) {
      expect(/[.!?)"”]$/.test(e.tldr.trim()), `${e.id}: "${e.tldr.slice(0, 60)}"`).toBe(true);
    }
  });

  it("rendered text follows house style: no em or en dashes, no 'as of' stamps, no 'spike'", () => {
    const failures: string[] = [];
    for (const e of g.entities) {
      if (HOUSE_STYLE_EXEMPT_IDS.has(e.id)) continue;
      houseStyleViolations(e, "", e.id, failures);
    }
    expect(failures).toEqual([]);
  });
});
