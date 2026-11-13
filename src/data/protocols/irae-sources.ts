import type { ProtocolInput } from "@/lib/schema";

type Source = ProtocolInput["sources"][number];

/*
 * Guidelines shared by the checkpoint-inhibitor toxicity protocols (immune-related adverse events, irAEs). Each was
 * fetched raw on 11 November 2026 into a scratch directory and read as text:
 * - SITC 2021: open access, full text from Europe PMC (PMC8237720, full-text XML).
 * - ASCO 2021 update: abstract only, from the Europe PMC REST API. The full text at ascopubs.org returned 403 to a script.
 * - ESMO 2022: Europe PMC holds no abstract and the publisher page (annalsofoncology.org) returned 403. Not read.
 * - ESE 2022 and Society for Endocrinology 2018: open access, full text from Europe PMC (PMC9641795, PMC6013692).
 * Every DOI was resolved through Crossref and its title checked against the source.
 */
export const SITC_ICI_2021: Source = {
  key: "sitc-2021",
  label: "Society for Immunotherapy of Cancer (SITC) clinical practice guideline on immune checkpoint inhibitor-related adverse events",
  publisher: "SITC, Journal for ImmunoTherapy of Cancer",
  year: 2021,
  url: "https://europepmc.org/article/PMC/PMC8237720",
  doi: "10.1136/jitc-2021-002435",
  gradingScheme: "Oxford Centre for Evidence-Based Medicine Levels of Evidence 2 (2016), printed after a recommendation as LE: 1 (systematic review) to LE: 5 (mechanism-based reasoning); a recommendation without an LE is expert consensus, approved by at least 75% of the voting panel.",
  read: "full-text",
  accessed: "2026-11-11",
};

export const ASCO_ICI_2021: Source = {
  key: "asco-2021",
  label: "Management of Immune-Related Adverse Events in Patients Treated With Immune Checkpoint Inhibitor Therapy: ASCO Guideline Update",
  publisher: "ASCO, Journal of Clinical Oncology",
  year: 2021,
  url: "https://europepmc.org/abstract/MED/34724392",
  doi: "10.1200/JCO.21.01440",
  gradingScheme: "The abstract states that, because high-quality evidence is scarce, the recommendations are based on expert consensus (informal consensus process).",
  read: "abstract",
  accessed: "2026-11-11",
};

export const ESMO_ICI_2022: Source = {
  key: "esmo-2022",
  label: "Management of toxicities from immunotherapy: ESMO Clinical Practice Guideline for diagnosis, treatment and follow-up",
  publisher: "ESMO, Annals of Oncology",
  year: 2022,
  url: "https://doi.org/10.1016/j.annonc.2022.10.001",
  doi: "10.1016/j.annonc.2022.10.001",
  read: "not-reachable",
  accessed: "2026-11-11",
};

export const ESE_2022: Source = {
  key: "ese-2022",
  label: "Endocrine-related adverse conditions in patients receiving immune checkpoint inhibition: an ESE clinical practice guideline",
  publisher: "European Society of Endocrinology, European Journal of Endocrinology",
  year: 2022,
  url: "https://europepmc.org/article/PMC/PMC9641795",
  doi: "10.1530/EJE-22-0689",
  gradingScheme: "GRADE: quality of evidence printed as +000 (very low), ++00 (low), +++0 (moderate) or ++++ (strong); 'recommend' is a strong and 'suggest' a weak recommendation; recommendations not formally graded are marked good clinical practice.",
  read: "full-text",
  accessed: "2026-11-11",
};

export const SFE_2018: Source = {
  key: "sfe-2018",
  label: "Society for Endocrinology Endocrine Emergency Guidance: acute management of the endocrine complications of checkpoint inhibitor therapy",
  publisher: "Society for Endocrinology, Endocrine Connections",
  year: 2018,
  url: "https://europepmc.org/article/PMC/PMC6013692",
  doi: "10.1530/EC-18-0068",
  gradingScheme: "Expert consensus of endocrinologists, oncologists and an acute physician, endorsed by the Society for Endocrinology Clinical Committee; recommendations are not graded.",
  read: "full-text",
  accessed: "2026-11-11",
};

/** The ESMO gap sentence every irAE protocol carries, so the pages say the same thing. */
export const ESMO_GAP = "The ESMO 2022 guideline on toxicities from immunotherapy could not be read: Europe PMC holds no abstract and the publisher's page refused a script. Its grade-by-grade advice is not stated here and no step rests on it.";
export const ASCO_GAP = "The ASCO 2021 guideline update was read only as its abstract, which gives the general rules (continue for grade 1, hold for most grade 2, high-dose steroids for grade 3, taper over at least 4 to 6 weeks, stop for grade 4) but not its organ-by-organ tables.";
