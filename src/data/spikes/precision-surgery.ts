import type { EntityInput, TechnologyInput } from "@/lib/schema";

/**
 * Precision and protocol-upgrades run (20 October 2026), surgery, imaging and pathology facet.
 *
 * The matrix rows for this domain live in src/data/precision-matrix/surgery.ts and point at records the corpus
 * already held: margins (`breast-margins-and-re-excision`, `resection-margins`, `r0-r1-margin-pancreatic`),
 * fluorescence-guided surgery (`pegulicianine`, `aminolevulinic-acid-gleolan`, `fluorescence-guided-surgery`),
 * sentinel node biopsy and targeted axillary dissection, robotic surgery, PSMA PET, low-dose CT screening and
 * Lung-RADS, PD-L1 and HER2-low scoring, and AI pathology. Those records gain the `precision` tag in their own files
 * rather than being rewritten here.
 *
 * The one gap was the ordinary toolkit for checking a breast margin while the operation is still going on: frozen
 * section, imprint cytology, specimen radiography, intraoperative ultrasound, radiofrequency spectroscopy probes and
 * routine cavity shaving. The corpus had the newest of these tools (the pegulicianine dye) and nothing on the ones
 * it has to be compared with, so this file adds one record for them.
 *
 * Every figure was read from the Europe PMC abstract of the paper cited beside it, after resolving the DOI, on
 * 20 October 2026. The grade is a tag `evidence:<grade>` on the src/data/complementary.ts model: moderate means
 * randomised trials exist but measured second operations rather than recurrence or survival. The new technology borrows the fluorescence-guided surgery drawing through one SCHEMATIC_ALIAS line in
 * src/data/schematics.ts. UK spelling.
 */

const asOf = "2026-10-20";
const doi = (label: string, d: string) => ({ label, url: `https://doi.org/${d}` });

const tech = (x: Omit<TechnologyInput, "kind" | "asOf">): TechnologyInput => ({ kind: "technology", asOf, ...x });

const intraoperativeMargins = tech({
  id: "intraoperative-margin-assessment-breast",
  name: "Intraoperative margin assessment in breast-conserving surgery",
  aka: ["intraoperative margin assessment", "frozen section of lumpectomy margins", "specimen radiography", "MarginProbe", "radiofrequency spectroscopy margin probe", "cavity shave margins"],
  sections: ["surgery", "imaging", "diagnostics"],
  status: "established",
  tags: ["precision", "evidence:moderate"],
  tldr: "Ways of checking, before the operation ends, whether cancer reaches the edge of the breast tissue removed, so the surgeon can take more there and then instead of operating again days later. In randomised trials a radiofrequency probe cut second operations from 25.8 to 19.8 per cent, and routinely shaving an extra layer from the cavity cut them from 21 to 10 per cent.",
  simple: "Tests the surgeon can use during a lumpectomy to see whether any cancer was left at the edge, so it can be removed straight away rather than in a second operation.",
  summary: "After breast-conserving surgery the margin is normally read by the pathologist days later, and one woman in five in England had a second operation within three months (55,297 women, 2005 to 2008). Intraoperative methods try to give that answer while the cavity is still open.\n\nA 2017 meta-analysis of 35 studies pooled their accuracy against final histology. Frozen section had sensitivity 86 per cent and specificity 96 per cent, imprint cytology 91 and 95, intraoperative ultrasound 59 and 81, specimen radiography 53 and 84, and optical spectroscopy 85 and 87. The authors concluded that frozen section and cytology are the most accurate, and that they are resource intensive and slow to report, which is why they have not spread. A 2021 meta-analysis of 19 frozen-section studies and 6,769 cases reported an average reoperation rate of 5.9 per cent where frozen section was used.\n\nTwo randomised trials measured what checking more changes. In 596 patients with non-palpable cancers, adding the MarginProbe radiofrequency spectroscopy device to standard imaging, with no intraoperative pathology, lowered re-excision from 25.8 to 19.8 per cent; its false-positive rate was 53.6 per cent, so extra tissue was often taken from clear margins, although the total volume removed did not differ significantly. In 235 women, shaving a further layer of tissue from every cavity wall after the lumpectomy halved positive margins (19 against 34 per cent) and second operations (10 against 21 per cent), with no difference in complications. Neither trial measured local recurrence or survival.\n\nThe fluorescent dye pegulicianine has its own record. What these methods buy is fewer second operations, which is a real gain for the patient; a margin wider than clear does not lower recurrence, so more precision beyond a clear edge has not been shown to buy local control.",
  principle: "Each method answers the pathologist's question earlier with a different signal. Frozen section freezes and cuts a thin slice of the margin for a microscope in about the time of the operation; imprint cytology touches the specimen surface to a slide and looks for cancer cells; specimen radiography X-rays the removed tissue to see whether the mass or its calcifications reach the edge; intraoperative ultrasound images the lesion and specimen; radiofrequency spectroscopy reads the electrical properties of the specimen surface, which differ between cancer and normal breast; and cavity shaving needs no signal at all, taking an extra rim from every wall.",
  strengths: [
    "Randomised trials show fewer second operations with a spectroscopy probe and with routine cavity shaving",
    "Frozen section and cytology reach pooled sensitivity of 86 to 91 per cent and specificity of 95 to 96 per cent against final histology",
    "Cavity shaving needs no equipment and did not increase complications in its trial",
  ],
  limitations: [
    "The most accurate methods need a pathologist and time during the operation, and the meta-analysis names that as the reason they are not widely used",
    "Specimen radiography, the most widely available, found about half of positive margins in pooled studies",
    "No trial here measured local recurrence or survival; the outcome shown is the second operation",
  ],
  cancers: ["breast-cancer", "breast-hr-positive", "breast-her2-positive", "tnbc", "ductal-carcinoma-in-situ"],
  technologies: ["fluorescence-guided-surgery", "intraoperative-fluorescence-imaging-systems", "mammography", "ultrasound"],
  drugs: ["pegulicianine"],
  terms: ["breast-margins-and-re-excision", "lumpectomy", "resection-margins", "wide-local-excision", "dcis"],
  trials: ["insite"],
  related: ["idea-fund-intraoperative-imaging-trials", "idea-moon-image-guided-surgery-everywhere", "breast-conserving-surgery-versus-mastectomy"],
  links: [
    doi("Diagnostic Accuracy of Intraoperative Techniques for Margin Assessment in Breast Cancer Surgery: A Meta-analysis (Ann Surg 2017)", "10.1097/sla.0000000000001897"),
    doi("Accuracy of frozen section in intraoperative margin assessment for breast-conserving surgery: A systematic review and meta-analysis (PLoS One 2021)", "10.1371/journal.pone.0248768"),
    doi("A randomized prospective study of lumpectomy margin assessment with use of MarginProbe in patients with nonpalpable breast malignancies (Ann Surg Oncol 2014)", "10.1245/s10434-014-3602-0"),
    doi("A Randomized, Controlled Trial of Cavity Shave Margins in Breast Cancer (NEJM 2015)", "10.1056/NEJMoa1504473"),
    doi("Reoperation rates after breast conserving surgery for breast cancer among women in England (BMJ 2012)", "10.1136/bmj.e4505"),
    doi("The association of surgical margins and local recurrence in women with early-stage invasive breast cancer treated with breast-conserving therapy: a meta-analysis (Ann Surg Oncol 2014)", "10.1245/s10434-014-3480-5"),
  ],
});

export const precisionSurgery: EntityInput[] = [intraoperativeMargins];
