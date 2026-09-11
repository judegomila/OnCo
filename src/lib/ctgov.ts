/**
 * Helpers for building ClinicalTrials.gov API v2 queries from OnCo entity names.
 * API docs: https://clinicaltrials.gov/data-api/api  (CORS is open; no key needed.)
 */

/** Turn a cancer entity name into a condition query CT.gov understands. */
export function conditionQuery(cancerName: string): string {
  const overrides: Record<string, string> = {
    "triple-negative breast cancer (tnbc)": "triple negative breast cancer",
    "hr-positive / her2-negative breast cancer": "hormone receptor positive HER2 negative breast cancer",
    "her2-positive breast cancer": "HER2 positive breast cancer",
    "non-small-cell lung cancer": "non-small cell lung cancer",
    "small-cell lung cancer": "small cell lung cancer",
    "pancreatic ductal adenocarcinoma": "pancreatic cancer",
    "gastric & gastro-oesophageal junction cancer": "gastric cancer",
    "oesophageal cancer": "esophageal cancer",
    "hepatocellular carcinoma": "hepatocellular carcinoma",
    "biliary tract cancer (cholangiocarcinoma)": "cholangiocarcinoma",
    "bladder & urothelial cancer": "urothelial carcinoma",
    "renal cell carcinoma": "renal cell carcinoma",
    "glioma & glioblastoma": "glioblastoma",
    "head and neck squamous cell carcinoma": "head and neck squamous cell carcinoma",
    "sarcomas (soft tissue, bone, gist)": "sarcoma",
    "neuroendocrine tumours": "neuroendocrine tumor",
    "neuroblastoma (paediatric)": "neuroblastoma",
    "acute myeloid leukaemia": "acute myeloid leukemia",
    "acute lymphoblastic leukaemia": "acute lymphoblastic leukemia",
    "chronic lymphocytic leukaemia": "chronic lymphocytic leukemia",
    "diffuse large b-cell lymphoma": "diffuse large B-cell lymphoma",
    "hodgkin lymphoma": "Hodgkin lymphoma",
    "multiple myeloma": "multiple myeloma",
  };
  const key = cancerName.trim().toLowerCase();
  if (overrides[key]) return overrides[key];
  return cancerName
    .replace(/\s*\(.*?\)\s*/g, " ")
    .replace(/&/g, " ")
    .replace(/\btumours?\b/gi, "tumor")
    .replace(/\boesophag/gi, "esophag")
    .replace(/\bleukaemia\b/gi, "leukemia")
    .replace(/\bhaematolog/gi, "hematolog")
    .replace(/\s+/g, " ")
    .trim();
}

/** Turn a product name into an intervention query: strip brand/code decorations. */
export function interventionQuery(drugName: string): string {
  return drugName
    .replace(/\s*\/.*$/, "")            // "Piflufolastat F-18 / Pylarify TruVu" -> "Piflufolastat F-18"
    .replace(/\s*\(.*?\)\s*/g, " ")     // drop parentheticals
    .replace(/\s+\+\s+.*$/, "")          // "Relatlimab + nivolumab" -> "Relatlimab"
    .replace(/\s+/g, " ")
    .trim();
}

export type CtgovStudy = {
  nctId: string;
  title: string;
  phase: string;
  status: string;
  sponsor: string;
  start?: string;
};

export function buildApiUrl(opts: { condition?: string; intervention?: string; pageSize?: number }): string {
  const p = new URLSearchParams();
  p.set("format", "json");
  p.set("pageSize", String(opts.pageSize ?? 10));
  p.set("filter.overallStatus", "RECRUITING");
  if (opts.condition) p.set("query.cond", opts.condition);
  if (opts.intervention) p.set("query.intr", opts.intervention);
  p.set("fields", "NCTId,BriefTitle,Phase,OverallStatus,LeadSponsorName,StartDate");
  p.set("sort", "LastUpdatePostDate:desc");
  return `https://clinicaltrials.gov/api/v2/studies?${p.toString()}`;
}

export function buildSearchUrl(opts: { condition?: string; intervention?: string }): string {
  const p = new URLSearchParams();
  if (opts.condition) p.set("cond", opts.condition);
  if (opts.intervention) p.set("intr", opts.intervention);
  p.set("aggFilters", "status:rec");
  return `https://clinicaltrials.gov/search?${p.toString()}`;
}

/** Shape of the v2 response (only the parts we read). */
export type RawStudy = {
  protocolSection?: {
    identificationModule?: { nctId?: string; briefTitle?: string };
    statusModule?: { overallStatus?: string; startDateStruct?: { date?: string } };
    sponsorCollaboratorsModule?: { leadSponsor?: { name?: string } };
    designModule?: { phases?: string[] };
    eligibilityModule?: { eligibilityCriteria?: string; minimumAge?: string; maximumAge?: string; sex?: string; healthyVolunteers?: boolean };
    armsInterventionsModule?: { interventions?: Array<{ name?: string; type?: string }> };
  };
};

/**
 * Extra `fields` that return the eligibility and interventions modules, verified against the live
 * API (2026-09-09): `eligibilityModule.eligibilityCriteria` is the free-text inclusion/exclusion block.
 */
export const ELIGIBILITY_FIELDS = "EligibilityCriteria,MinimumAge,MaximumAge,Sex,HealthyVolunteers,InterventionName,InterventionType";

/** Append field names to the `fields` parameter of a studies URL built elsewhere (or add one if missing). */
export function withExtraFields(url: string, extra: string): string {
  const u = new URL(url);
  const cur = u.searchParams.get("fields");
  const have = new Set((cur ?? "").split(",").filter(Boolean));
  for (const f of extra.split(",")) if (f && !have.has(f)) have.add(f);
  u.searchParams.set("fields", [...have].join(","));
  return u.toString();
}

export type Eligibility = {
  nctId: string;
  /** Free-text inclusion/exclusion block as posted on the registry. */
  criteria?: string;
  minimumAge?: string;
  maximumAge?: string;
  sex?: string;
  healthyVolunteers?: boolean;
  interventions: Array<{ name: string; type?: string }>;
};

/** Read the eligibility and interventions modules from one raw study. */
export function parseEligibility(s: RawStudy): Eligibility {
  const ps = s.protocolSection ?? {};
  const e = ps.eligibilityModule ?? {};
  return {
    nctId: ps.identificationModule?.nctId ?? "",
    criteria: e.eligibilityCriteria,
    minimumAge: e.minimumAge,
    maximumAge: e.maximumAge,
    sex: e.sex,
    healthyVolunteers: e.healthyVolunteers,
    interventions: (ps.armsInterventionsModule?.interventions ?? []).filter((i) => i.name).map((i) => ({ name: i.name as string, type: i.type })),
  };
}

/** Eligibility keyed by NCT id for every study in a response; studies without the module still get an entry. */
export function parseEligibilities(json: { studies?: RawStudy[] }): Record<string, Eligibility> {
  const out: Record<string, Eligibility> = {};
  for (const s of json.studies ?? []) { const e = parseEligibility(s); if (e.nctId) out[e.nctId] = e; }
  return out;
}

export function parseStudies(json: { studies?: RawStudy[] }): CtgovStudy[] {
  return (json.studies ?? []).map((s) => {
    const ps = s.protocolSection ?? {};
    const phases = ps.designModule?.phases ?? [];
    return {
      nctId: ps.identificationModule?.nctId ?? "",
      title: ps.identificationModule?.briefTitle ?? "",
      phase: phases.length ? phases.map(prettyPhase).join("/") : "-",
      status: ps.statusModule?.overallStatus ?? "",
      sponsor: ps.sponsorCollaboratorsModule?.leadSponsor?.name ?? "",
      start: ps.statusModule?.startDateStruct?.date,
    };
  }).filter((s) => s.nctId);
}

function prettyPhase(p: string): string {
  return p.replace("EARLY_PHASE1", "Early 1").replace("PHASE", "").replace("NA", "N/A");
}
