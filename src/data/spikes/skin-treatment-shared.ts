import type { TermInput, TrialInput } from "@/lib/schema";

/**
 * Constants shared by the skin treatment files (./skin-treatment.ts and ./skin-treatment-trials-*.ts).
 * Not a spike: registered in NON_SPIKE_FILES in scripts/spike-sources.ts.
 *
 * Scope. These files carry the treatment of the keratinocyte cancers, basal cell carcinoma and cutaneous squamous
 * cell carcinoma, together with Merkel cell carcinoma, which is rare but shares the immunotherapy story. Melanoma is
 * not here: it has its own depth in src/data/spikes/melanoma.ts and src/data/skin-subtypes.ts, and where a row would
 * need melanoma drugs it says so and points at the melanoma page.
 *
 * Every publication below was read through Europe PMC on 25 September 2026 and every figure is quoted from that
 * paper's own results text. The long-term report was read in preference to the first one wherever one exists,
 * because in basal cell carcinoma it changes the answer: the Dutch trial of Mohs surgery against ordinary excision
 * was not significant for primary tumours at five years and 56 per cent of the primary-tumour recurrences had not
 * yet happened, and topical treatment looks far better at one year than it does at five.
 *
 * Every NICE reference below was read from the guidance page itself on 25 September 2026. Three readings are worth
 * stating here because they are not what a reader expects:
 *
 *   - NICE TA489 recommendation 1.1 does NOT recommend vismodegib for metastatic basal cell carcinoma or for
 *     locally advanced disease unsuitable for surgery or radiotherapy. The first drug ever approved for the
 *     commonest cancer in human beings is not funded for it in England.
 *   - NICE TA802 recommendation 1.1 recommends cemiplimab for metastatic or locally advanced cutaneous squamous
 *     cell carcinoma only if it is stopped at 24 months.
 *   - There is no NICE technology appraisal of sonidegib, of cemiplimab in basal cell carcinoma, of pembrolizumab
 *     in cutaneous squamous cell carcinoma, of cosibelimab or of retifanlimab. The whole NICE appraisal programme
 *     for the keratinocyte cancers is TA489 and TA802, against 24 appraisals under the skin cancer topic overall,
 *     most of them melanoma.
 */
export const asOf = "2026-09-25";

export const SKIN = "skin-cancer";
export const BCC = "basal-cell-carcinoma";
export const CSCC = "cutaneous-scc";
export const MCC = "merkel-cell-carcinoma";
/** The advanced-disease subtype pages written in src/data/skin-subtypes.ts that these trials also belong to. */
export const LA_BCC = "locally-advanced-bcc";
export const ADV_CSCC = "advanced-cutaneous-scc";

/** The keratinocyte cancers: what "non-melanoma skin cancer" means when someone uses the phrase. */
export const KERATINOCYTE = [SKIN, BCC, CSCC];

export const ct = (nct: string) => ({ label: `ClinicalTrials.gov ${nct}`, url: `https://clinicaltrials.gov/study/${nct}` });
export const isrctn = (n: string) => ({ label: `ISRCTN${n}`, url: `https://www.isrctn.com/ISRCTN${n}` });
export const doi = (label: string, id: string) => ({ label, url: `https://doi.org/${id}` });
export const pubmed = (label: string, pmid: string) => ({ label, url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` });
export const nice = (ref: string, label: string) => ({ label, url: `https://www.nice.org.uk/guidance/${ref}` });
const D = (id: string) => `https://doi.org/${id}`;

export const t = (x: Omit<TrialInput, "kind" | "asOf">): TrialInput => ({ kind: "trial", asOf, ...x });
export const term = (x: Omit<TermInput, "kind" | "asOf">): TermInput => ({ kind: "term", asOf, ...x });

/** Papers quoted more than once, as DOIs read through Europe PMC on 25 September 2026, with their PubMed ids. */
export const SRC = {
  // The margin, measured rather than agreed
  zitelliBcc: D("10.1001/archderm.1987.01660270078019"), // PubMed 3813602
  zitelliScc: D("10.1016/0190-9622(92)70178-i"), // PubMed 1430364
  // Mohs against ordinary excision: the Dutch trial at 5 and 10 years
  mohsFiveYear: D("10.1016/s1470-2045(08)70260-2"), // PubMed 19010733
  mohsTenYear: D("10.1016/j.ejca.2014.08.018"), // PubMed 25262378
  // Topical and destructive treatment
  sinsThreeYear: D("10.1016/s1470-2045(13)70530-8"), // PubMed 24332516
  sinsFiveYear: D("10.1016/j.jid.2016.10.019"), // PubMed 27932240
  aritsOneYear: D("10.1016/s1470-2045(13)70143-8"), // PubMed 23683751
  jansenFiveYear: D("10.1016/j.jid.2017.09.033"), // PubMed 29045820
  scinFiveYear: D("10.1001/jamadermatol.2024.5572"), // PubMed 39878970
  pdtNodularOneYear: D("10.1001/archderm.140.1.17"), // PubMed 14732655
  pdtNodularFiveYear: D("10.1001/archderm.143.9.1131"), // PubMed 17875873
  pdtCryoFiveYear: D("10.1684/ejd.2008.0472"), // PubMed 18693158
  curettageDenmark: D("10.2340/actadv.v106.adv-2025-0079"), // PubMed 42231632
  curettageAggressive: D("10.1111/dsu.12122"), // PubMed 23379543
  // Radiotherapy
  avrilBcc: D("10.1038/bjc.1997.343"), // PubMed 9218740
  avrilCosmesis: D("10.1097/00006534-200006000-00039"), // PubMed 10845311
  trog0501: D("10.1200/jco.2017.77.0941"), // PubMed 29537906
  // Advanced disease
  stevie: D("10.1016/j.ejca.2017.08.022"), // PubMed 29073584
  vismoneo: D("10.1016/j.eclinm.2021.100844"), // PubMed 33997740
  cemiplimabBcc: D("10.1016/s1470-2045(21)00126-1"), // PubMed 34000246
  cpost: D("10.1056/nejmoa2502449"), // PubMed 40454639
  neoadjuvantCscc: D("10.1056/nejmoa2209813"), // PubMed 36094839
  admecO: D("10.1016/s0140-6736(23)00769-9"), // PubMed 37451295
  pod1um201: D("10.1136/jitc-2025-012478"), // PubMed 40796223
  // The immunosuppressed patient
  tumorapa: D("10.1056/nejmoa1204166"), // PubMed 22830463
  cemiplimabKtr: D("10.1200/jco.23.01498"), // PubMed 38252908
  // Abandoned and stalled
  patidegibGel: D("10.1093/bjd/ljae444"), // PubMed 39545486
  itraconazole: D("10.1111/exd.70264"), // PubMed 42101092
  // Guidance (reference number and recommendation read on nice.org.uk, 25 September 2026)
  ta489: "https://www.nice.org.uk/guidance/ta489",
  ta802: "https://www.nice.org.uk/guidance/ta802",
  ta517: "https://www.nice.org.uk/guidance/ta517",
  ta691: "https://www.nice.org.uk/guidance/ta691",
  nccnBcc: "https://www.nccn.org/guidelines/guidelines-detail?category=1&id=1416",
  nccnScc: "https://www.nccn.org/guidelines/guidelines-detail?category=1&id=1465",
  nccnMcc: "https://www.nccn.org/guidelines/guidelines-detail?category=1&id=1444",
};
