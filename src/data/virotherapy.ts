/**
 * Oncolytic virotherapy: the registry behind /virotherapy/.
 *
 * A standalone typed registry, not graph entities. `refs` hold entity ids in the corpus, rendered
 * as links; everything else is text written from the primary literature. Every number here was read
 * from the paper named in `source`, checked against Europe PMC on 2026-09-25. Where a product is
 * often counted in this class but does not replicate, `replicates` is false and the row says so:
 * that distinction is the one most coverage of the field drops.
 */

export type OvSource = { label: string; url: string };

/** An approved or registered virus-based product, and what its evidence actually shows. */
export type OvProduct = {
  id: string;
  name: string;
  code?: string;
  brand?: string;
  virus: string;
  /** True oncolytic: replicates in the tumour. False: a replication-defective vector delivering a gene. */
  replicates: boolean;
  engineering: string;
  route: string;
  approval: string;
  evidence: string;
  /** What the trial showed: a local response, a response rate, or a survival benefit. */
  achieves: string;
  /** "local" where the demonstrated effect is confined to treated lesions or the treated organ. */
  reach: "local" | "systemic signal" | "survival benefit" | "not shown";
  refs: string[];
  sources: OvSource[];
};

/** A milestone in the field's history. */
export type OvMilestone = { year: string; what: string; detail: string; refs: string[]; sources: OvSource[] };

/** An engineering move: what is deleted, inserted, retargeted, or done about delivery. */
export type OvMove = {
  id: string;
  move: string;
  kind: "deletion" | "insertion" | "targeting" | "delivery";
  what: string;
  why: string;
  examples: string;
  refs: string[];
};

/** A programme that was tested properly and did not work, with the reason. */
export type OvFailure = {
  id: string;
  programme: string;
  virus: string;
  setting: string;
  design: string;
  outcome: string;
  lesson: string;
  refs: string[];
  sources: OvSource[];
};

/** One step of the 2024 self-experimentation protocol. */
export type OvCaseStep = { when: string; what: string; detail: string };

const doiSrc = (label: string, d: string): OvSource => ({ label, url: `https://doi.org/${d}` });
const pmidSrc = (label: string, pmid: string): OvSource => ({ label, url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` });

// ---------------------------------------------------------------- Why a virus kills a cancer cell and not its neighbour

export const whySelective = {
  plain: [
    "A healthy cell that finds a virus inside it has a set of things it can do. It makes interferon, a chemical alarm that warns itself and its neighbours. It slows its own protein factory so the virus has nothing to build with. It calls the immune system. If none of that is enough, it kills itself before the virus can finish copying.",
    "Becoming a cancer means switching off brakes, and the interferon response is a brake. It stops cells dividing and it tells them to die. A cell that has broken it can grow more freely, and many cancers have broken some part of it on the way to becoming cancers.",
    "That leaves them with a hole where the alarm used to be. A virus that a healthy cell would shut down in hours can get in, take over and keep copying until the cell bursts. The virus is not clever and it is not seeking out cancer. It is simply the one kind of cell in the body that cannot stop it.",
    "When the infected cancer cells burst they spill two things at once: pieces of the tumour, and the unmistakable molecular signature of a virus. The immune system arrives for the virus and finds the tumour. That second effect, not the bursting, is what the field is actually trying to produce.",
  ],
  mechanism: [
    "Type I interferon signalling is the axis. Viral nucleic acid is sensed by RIG-I, MDA5 and cGAS-STING, which drive interferon regulatory factor 3 and 7 and the production of interferon alfa and beta. Interferon binds IFNAR and induces hundreds of interferon-stimulated genes, among them protein kinase R, which shuts down translation, and the oligoadenylate synthetase and RNase L system, which degrades viral RNA. Loss of any of several nodes leaves the cell able to divide and unable to defend.",
    "Stojdl and colleagues tested that argument directly. Vesicular stomatitis virus, which is exquisitely sensitive to interferon, replicated in and killed a range of human tumour cell lines at interferon doses that completely protected normal human primary cultures, and a single intratumoural injection reduced tumour burden in mice carrying human melanoma xenografts.",
    "A second, separate route to selectivity is a growth pathway the cancer has switched on. Reovirus requires an activated Ras pathway to replicate; Coffey and colleagues showed a single intratumoural injection regressed 65 to 80 per cent of tumours in immunodeficient mice, and that immunocompetent mice needed a series of injections, the first sign that the host immune response both helps and hinders.",
    "The third route is engineered rather than natural: delete a viral gene whose function a dividing tumour cell already supplies. That is the move Martuza and colleagues made in 1991 with a thymidine-kinase-negative herpes simplex virus, and it is the design principle behind every approved product.",
    "The consequence for the clinic is that selectivity is a matter of degree, not a switch, and no routine test measures it. Interferon-pathway status, Ras pathway activation and receptor density vary enormously between tumours and are not assayed before treatment. There is no companion diagnostic for any oncolytic virus.",
  ],
  sources: [
    doiSrc("Stojdl 2000, the interferon argument (Nature Medicine)", "10.1038/77558"),
    doiSrc("Coffey 1998, reovirus and Ras (Science)", "10.1126/science.282.5392.1332"),
    doiSrc("Martuza 1991, the first engineered oncolytic virus (Science)", "10.1126/science.1851332"),
    doiSrc("Shalhout 2023, the field reviewed (Nature Reviews Clinical Oncology)", "10.1038/s41571-022-00719-w"),
  ],
};

// ---------------------------------------------------------------- History

export const milestones: OvMilestone[] = [
  {
    year: "From 1900",
    what: "Tumours seen to shrink during natural virus infections",
    detail: "From the turn of the nineteenth century, when viruses were first recognised, case reports described cancers regressing while a patient had an ordinary virus infection. These were observations, not experiments, and they were the whole evidence base for decades.",
    refs: ["oncolytic-virus"],
    sources: [doiSrc("Kelly and Russell 2007, the history (Molecular Therapy)", "10.1038/sj.mt.6300108")],
  },
  {
    year: "1950s",
    what: "Deliberate attempts to transmit viruses to patients, and why they stopped",
    detail: "Clinicians used body fluids containing human or animal viruses to infect patients with cancer. Most often the immune system arrested the virus and the tumour was unaffected. In immunosuppressed patients the infection persisted and tumours did regress, but the damage to normal tissues was unacceptable. Southam and Moore's 1952 report of Egypt 101 virus is one of the documented series.",
    refs: ["oncolytic-virus"],
    sources: [doiSrc("Kelly and Russell 2007 (Molecular Therapy)", "10.1038/sj.mt.6300108"), pmidSrc("Southam and Moore 1952 (Cancer)", "12988191")],
  },
  {
    year: "1950s to 1960s",
    what: "Serial passage fails and the field is largely abandoned",
    detail: "With rodent models available, researchers tried to force the evolution of tumour-specific viruses by repeated passage. Success was limited, tumour specificity could not be made reliable, and most researchers left the field.",
    refs: ["oncolytic-virus"],
    sources: [doiSrc("Kelly and Russell 2007 (Molecular Therapy)", "10.1038/sj.mt.6300108")],
  },
  {
    year: "1991",
    what: "The first genetically engineered oncolytic virus",
    detail: "Martuza and colleagues deleted thymidine kinase from herpes simplex virus type 1, making it dependent on the host cell's nucleotide pool. It killed human glioma cells in culture, inhibited implanted human gliomas in mice, and prolonged survival when injected into intracranial tumours. Reverse genetics turned the field from selection into design.",
    refs: ["oncolytic-virus", "glioblastoma"],
    sources: [doiSrc("Martuza 1991 (Science)", "10.1126/science.1851332")],
  },
  {
    year: "1996 to 2000",
    what: "ONYX-015, the first big clinical programme, and the mechanism that turned out to be wrong",
    detail: "An adenovirus lacking the E1B 55-kilodalton protein appeared to replicate only in p53-deficient tumour cells. It went into large trials, including a randomised study with cisplatin and fluorouracil in recurrent head and neck cancer. In 2004 O'Shea and colleagues showed the selectivity tracks late viral RNA export, not p53, which is why clinical response never sorted by p53 status.",
    refs: ["oncolytic-virus", "tp53"],
    sources: [doiSrc("Bischoff 1996 (Science)", "10.1126/science.274.5286.373"), doiSrc("Khuri 2000 (Nature Medicine)", "10.1038/78638"), doiSrc("O'Shea 2004, the correction (Cancer Cell)", "10.1016/j.ccr.2004.11.012")],
  },
  {
    year: "1998 to 2000",
    what: "The two selectivity mechanisms are published",
    detail: "Coffey and colleagues showed reovirus needs an activated Ras pathway. Stojdl and colleagues showed vesicular stomatitis virus exploits the broken interferon response. Together these gave the field a mechanistic argument that did not depend on any single gene.",
    refs: ["oncolytic-virus"],
    sources: [doiSrc("Coffey 1998 (Science)", "10.1126/science.282.5392.1332"), doiSrc("Stojdl 2000 (Nature Medicine)", "10.1038/77558")],
  },
  {
    year: "2004 to 2005",
    what: "The first approval anywhere, in China",
    detail: "A 160-patient randomised trial added intratumoural H101, an E1B-55 kilodalton-deleted adenovirus of essentially the ONYX-015 design, to cisplatin-based chemotherapy in squamous cell cancer of the head and neck or oesophagus. Response rate was 78.8 per cent against 39.6 per cent with chemotherapy alone. No survival result was reported. H101 was approved in China in November 2005 and marketed as Oncorine.",
    refs: ["oncolytic-virus", "h101-oncolytic-adenovirus"],
    sources: [pmidSrc("Xia 2004 (Ai Zheng)", "15601557")],
  },
  {
    year: "2014",
    what: "A single intravenous dose puts one patient's myeloma into complete remission",
    detail: "Two measles-seronegative patients with drug-refractory myeloma received one intravenous infusion of 10^11 infectious units of an engineered measles virus carrying the sodium iodide symporter gene. Both responded; one had a durable complete remission at all sites, with radioiodine imaging showing the virus replicating inside the tumours. Both patients were chosen for having no pre-existing measles antibodies, which excludes almost everyone.",
    refs: ["oncolytic-virus", "multiple-myeloma"],
    sources: [doiSrc("Russell 2014 (Mayo Clinic Proceedings)", "10.1016/j.mayocp.2014.04.003")],
  },
  {
    year: "2015",
    what: "Talimogene laherparepvec approved for melanoma",
    detail: "The first approval outside China, on a phase 3 trial in which the durable response rate was 16.3 per cent against 2.1 per cent for granulocyte-macrophage colony-stimulating factor. Median overall survival was 23.3 against 18.9 months, which did not reach statistical significance.",
    refs: ["oncolytic-virus", "talimogene-laherparepvec", "melanoma"],
    sources: [doiSrc("OPTiM, Andtbacka 2015 (Journal of Clinical Oncology)", "10.1200/JCO.2014.58.3377")],
  },
  {
    year: "2020",
    what: "Toca 5: the approach tested properly in glioma, and it failed",
    detail: "403 patients having resection for recurrent high-grade glioma were randomised to a replicating retroviral vector injected into the resection cavity plus a prodrug, or to standard care. Median overall survival was 11.10 against 12.22 months, hazard ratio 1.06.",
    refs: ["oncolytic-virus", "glioblastoma"],
    sources: [doiSrc("Cloughesy 2020 (JAMA Oncology)", "10.1001/jamaoncol.2020.3161")],
  },
  {
    year: "2021",
    what: "Japan approves teserpaturev for malignant glioma",
    detail: "In June 2021 Japan's Ministry of Health, Labour and Welfare approved Delytact Injection as a regenerative medical product, on a single-arm investigator-initiated trial of 19 patients in which one-year survival after starting treatment was 84.2 per cent. The approval is conditional and time-limited, with a use-results comparison survey and resubmission required within seven years.",
    refs: ["oncolytic-virus", "glioblastoma", "japan-conditional-early-approval"],
    sources: [doiSrc("Todo 2022, the phase 2 trial (Nature Medicine)", "10.1038/s41591-022-01897-x"), doiSrc("Maruyama 2023, the PMDA review (The Oncologist)", "10.1093/oncolo/oyad041")],
  },
  {
    year: "2022",
    what: "Nadofaragene firadenovec approved in the United States, and it is not an oncolytic virus",
    detail: "A replication-deficient adenovirus that delivers the interferon alfa-2b gene to the bladder lining. 53.4 per cent of patients with carcinoma in situ had a complete response within three months and 45.5 per cent of those responders still had it at twelve. It is gene delivery, and it is regularly counted as a win for oncolytic virotherapy.",
    refs: ["oncolytic-virus", "nadofaragene-firadenovec", "urothelial"],
    sources: [doiSrc("Boorjian 2021 (The Lancet Oncology)", "10.1016/S1470-2045(20)30540-4")],
  },
  {
    year: "2023",
    what: "The combination question is answered, and the answer is no",
    detail: "692 patients with advanced melanoma were randomised to talimogene laherparepvec plus pembrolizumab or placebo plus pembrolizumab. Neither progression-free survival nor overall survival improved.",
    refs: ["oncolytic-virus", "talimogene-laherparepvec", "advanced-melanoma"],
    sources: [doiSrc("MASTERKEY-265, Chesney 2023 (Journal of Clinical Oncology)", "10.1200/JCO.22.00343")],
  },
  {
    year: "2024",
    what: "A virologist publishes the case of treating her own recurrent breast cancer",
    detail: "A 50-year-old virologist with locally recurrent, muscle-invasive breast cancer injected her own tumour with an Edmonston-Zagreb measles vaccine strain and then a vesicular stomatitis virus, both grown in her own laboratory, before any other treatment for the recurrence. The tumour shrank enough for simple excision. The report drew a bioethics literature about whether journals should publish self-experimentation.",
    refs: ["oncolytic-virus", "beata-halassy", "tnbc"],
    sources: [doiSrc("Forcic 2024 (Vaccines)", "10.3390/vaccines12090958"), doiSrc("Pugh 2026 (Journal of Medical Ethics)", "10.1136/jme-2025-110730")],
  },
  {
    year: "2026",
    what: "Vusolimogene oderparepvec given accelerated approval, with responses in uninjected lesions",
    detail: "In 140 patients with melanoma that had progressed on anti-PD-1 therapy, an engineered herpes virus with nivolumab produced a 32.9 per cent confirmed response rate, and responses in uninjected lesions, including visceral ones, matched injected lesions in frequency, depth and duration. That is the strongest clinical evidence to date that the mechanism is systemic immunity rather than local lysis. A randomised confirmatory trial is required.",
    refs: ["oncolytic-virus", "vusolimogene-oderparepvec", "advanced-melanoma"],
    sources: [doiSrc("IGNYTE, Wong 2025 (Journal of Clinical Oncology)", "10.1200/JCO-25-01346")],
  },
];

// ---------------------------------------------------------------- Products

export const products: OvProduct[] = [
  {
    id: "h101-oncolytic-adenovirus", name: "H101", code: "H101", brand: "Oncorine",
    virus: "Adenovirus type 5", replicates: true,
    engineering: "E1B 55-kilodalton gene deleted, essentially the ONYX-015 design; also a partial E3 deletion.",
    route: "Injected into the tumour, 5.0 x 10^11 to 1.5 x 10^12 viral particles daily for five days every three weeks.",
    approval: "China, November 2005. Never approved outside China.",
    evidence: "One randomised phase 3 trial, 160 patients recruited and 123 analysed, adding H101 to cisplatin-based chemotherapy in squamous cell cancer of the head and neck or oesophagus.",
    achieves: "Response rate 78.8 per cent (41 of 52) versus 39.6 per cent (21 of 53) with cisplatin and fluorouracil alone. No overall or progression-free survival result was reported.",
    reach: "local",
    refs: ["h101-oncolytic-adenovirus", "oncolytic-virus"],
    sources: [pmidSrc("Xia 2004 (Ai Zheng)", "15601557")],
  },
  {
    id: "talimogene-laherparepvec", name: "Talimogene laherparepvec", code: "T-VEC", brand: "Imlygic",
    virus: "Herpes simplex virus type 1", replicates: true,
    engineering: "ICP34.5 deleted so the virus cannot block the host shutdown of protein synthesis in a normal cell; ICP47 deleted, which also moves US11 to an immediate-early position and restores replication; human granulocyte-macrophage colony-stimulating factor inserted.",
    route: "Injected into lesions, 10^6 plaque-forming units per mL first, then 10^8 per mL three weeks later and every two weeks.",
    approval: "United States 2015, European Union 2015, for unresectable melanoma with injectable lesions.",
    evidence: "OPTiM, an open-label phase 3 trial randomising 436 patients 2:1 against subcutaneous granulocyte-macrophage colony-stimulating factor.",
    achieves: "Durable response rate 16.3 per cent versus 2.1 per cent, odds ratio 8.9. Median overall survival 23.3 versus 18.9 months, hazard ratio 0.79, p = 0.051, not significant. The comparator was not a modern melanoma treatment.",
    reach: "local",
    refs: ["talimogene-laherparepvec", "melanoma", "oncolytic-virus"],
    sources: [doiSrc("OPTiM, Andtbacka 2015 (Journal of Clinical Oncology)", "10.1200/JCO.2014.58.3377"), doiSrc("Liu 2003, the construct (Gene Therapy)", "10.1038/sj.gt.3301885")],
  },
  {
    id: "teserpaturev", name: "Teserpaturev", code: "G47 delta", brand: "Delytact",
    virus: "Herpes simplex virus type 1", replicates: true,
    engineering: "Triple-mutated third generation: the two mutations of the second-generation backbone plus a further deletion, engineered both for tumour selectivity and for better antigen presentation.",
    route: "Injected into the tumour, repeatedly, for up to six doses.",
    approval: "Japan, June 2021, as a regenerative medical product for malignant glioma. Conditional and time-limited: a use-results comparison survey and resubmission are required within seven years.",
    evidence: "A single-arm, investigator-initiated phase 2 trial in 19 adults with residual or recurrent glioblastoma after radiotherapy and temozolomide, stopped early when its endpoint was met.",
    achieves: "One-year survival after starting treatment 84.2 per cent (16 of 19); median overall survival 20.2 months from starting treatment. Best response over two years was one partial response and 18 stable disease, because the lesion characteristically enlarges while contrast enhancement clears.",
    reach: "not shown",
    refs: ["glioblastoma", "oncolytic-virus", "japan-conditional-early-approval"],
    sources: [doiSrc("Todo 2022 (Nature Medicine)", "10.1038/s41591-022-01897-x"), doiSrc("Maruyama 2023, the PMDA review (The Oncologist)", "10.1093/oncolo/oyad041")],
  },
  {
    id: "vusolimogene-oderparepvec", name: "Vusolimogene oderparepvec", code: "RP1", brand: "Tudriqev",
    virus: "Herpes simplex virus type 1", replicates: true,
    engineering: "Granulocyte-macrophage colony-stimulating factor plus a fusogenic glycoprotein, so infected cells fuse with their neighbours and die in a way that presents antigen well.",
    route: "Injected into lesions, up to eight doses of up to 10 mL, with nivolumab.",
    approval: "United States, accelerated approval on 6 August 2026, with nivolumab, for melanoma that has progressed on anti-PD-1 therapy. A randomised confirmatory trial is required.",
    evidence: "IGNYTE, a single-arm registrational cohort of 140 patients with confirmed progression on anti-PD-1 therapy, assessed by independent central review.",
    achieves: "Confirmed response rate 32.9 per cent with 15.0 per cent complete responses; median duration of response 33.7 months. Uninjected lesions, including visceral ones, responded with the same frequency, depth, duration and timing as injected ones.",
    reach: "systemic signal",
    refs: ["vusolimogene-oderparepvec", "advanced-melanoma", "replimune", "oncolytic-virus"],
    sources: [doiSrc("IGNYTE, Wong 2025 (Journal of Clinical Oncology)", "10.1200/JCO-25-01346")],
  },
  {
    id: "cretostimogene", name: "Cretostimogene grenadenorepvec", code: "CG0070",
    virus: "Adenovirus type 5", replicates: true,
    engineering: "E1A driven by the E2F-1 promoter, so replication depends on a defective retinoblastoma-E2F pathway; granulocyte-macrophage colony-stimulating factor inserted.",
    route: "Into the bladder, 1 x 10^12 viral particles per 0.8 mL weekly for six weeks, then maintenance.",
    approval: "Not approved. Under rolling review in the United States.",
    evidence: "BOND-003 Cohort C, a single-arm international phase 3 trial in 112 treated patients with BCG-unresponsive non-muscle-invasive bladder cancer with carcinoma in situ.",
    achieves: "Complete response at any time in 83 of 110 patients, 75 per cent (95% CI 66.3 to 83.2), at a median follow-up of 25.8 months. No grade 3 or 4 treatment-related adverse events. Single-arm, so no comparison with an alternative.",
    reach: "local",
    refs: ["cretostimogene", "urothelial", "bond-003", "oncolytic-virus"],
    sources: [doiSrc("BOND-003, Tyson 2026 (The Lancet Oncology)", "10.1016/S1470-2045(26)00194-4")],
  },
  {
    id: "nadofaragene-firadenovec", name: "Nadofaragene firadenovec", brand: "Adstiladrin",
    virus: "Adenovirus, replication-deficient", replicates: false,
    engineering: "Not an oncolytic virus. A replication-deficient recombinant adenovirus carrying human interferon alfa-2b complementary DNA, delivered with an excipient that lets the bladder lining take it up. It transduces the urothelium, which then makes interferon; the virus does not replicate or lyse.",
    route: "Into the bladder, a single 75 mL dose of 3 x 10^11 viral particles per mL, repeated at months 3, 6 and 9.",
    approval: "United States, December 2022, for BCG-unresponsive non-muscle-invasive bladder cancer with carcinoma in situ. European Union conditional authorisation 28 May 2026.",
    evidence: "A single-arm, open-label, repeat-dose phase 3 trial, 157 treated and 151 analysed.",
    achieves: "Complete response within three months in 55 of 103 patients with carcinoma in situ, 53.4 per cent; maintained at twelve months in 25 of those 55, 45.5 per cent, which is about a quarter of the cohort. Single-arm.",
    reach: "local",
    refs: ["nadofaragene-firadenovec", "urothelial", "oncolytic-virus"],
    sources: [doiSrc("Boorjian 2021 (The Lancet Oncology)", "10.1016/S1470-2045(20)30540-4")],
  },
  {
    id: "aglatimagene-besadenovec", name: "Aglatimagene besadenovec", code: "CAN-2409",
    virus: "Adenovirus, replication-defective", replicates: false,
    engineering: "Not an oncolytic virus. A replication-defective adenovirus delivering the herpes simplex virus thymidine kinase gene into the prostate, followed by oral valaciclovir, which the enzyme converts into a cytotoxic nucleotide inside the transduced cells.",
    route: "Three courses injected into the prostate, 5 x 10^11 viral particles, with valaciclovir, alongside external beam radiotherapy.",
    approval: "Not approved. Phase 3 reported in 2026.",
    evidence: "A randomised, double-blind, placebo-controlled phase 3 trial in 745 men with intermediate or high-risk localised prostate cancer, randomised 2:1.",
    achieves: "Median disease-free survival not reached versus 86.1 months with placebo, hazard ratio 0.70 (95% CI 0.52 to 0.94), p = 0.016, at a median follow-up of 50.3 months. Grade 3 or worse treatment-emergent adverse events in 8 per cent versus 7 per cent.",
    reach: "survival benefit",
    refs: ["aglatimagene-besadenovec", "prostate", "candel-therapeutics"],
    sources: [doiSrc("DeWeese 2026 (The Lancet Oncology)", "10.1016/S1470-2045(26)00071-9")],
  },
];

// ---------------------------------------------------------------- Engineering

export const moves: OvMove[] = [
  {
    id: "delete-tk", move: "Delete thymidine kinase", kind: "deletion",
    what: "Remove the viral thymidine kinase gene, so the virus cannot make its own nucleotide precursors.",
    why: "A dividing tumour cell has a large nucleotide pool and supplies the missing function; a resting neurone does not. This was the first selectivity deletion ever made, and it also removes the virus's sensitivity to aciclovir and ganciclovir, which is the safety net if infection runs away, so later designs moved to other genes.",
    examples: "dlsptk (Martuza 1991), the ancestor of the herpes lineage.",
    refs: ["oncolytic-virus"],
  },
  {
    id: "delete-icp345", move: "Delete ICP34.5", kind: "deletion",
    what: "Remove the herpes neurovirulence gene whose product reverses the host shutdown of protein synthesis.",
    why: "In a normal cell, protein kinase R shuts translation down when it senses viral RNA and the virus cannot proceed. In a tumour cell with a defective protein kinase R or Ras response, translation continues and the virus replicates. This is the deletion that carries selectivity in every approved herpes product.",
    examples: "Talimogene laherparepvec; teserpaturev; vusolimogene oderparepvec.",
    refs: ["talimogene-laherparepvec", "vusolimogene-oderparepvec"],
  },
  {
    id: "delete-icp47", move: "Delete ICP47", kind: "deletion",
    what: "Remove the herpes gene that blocks the transporter associated with antigen processing, which loads peptides onto class I molecules.",
    why: "An infected cell that cannot present antigen is invisible. Deleting ICP47 restores presentation, so the infected tumour cell displays both viral and tumour peptides. In herpes simplex virus type 1 the deletion also moves US11 into an immediate-early position, which partly restores the replication lost by deleting ICP34.5.",
    examples: "Talimogene laherparepvec; teserpaturev.",
    refs: ["talimogene-laherparepvec"],
  },
  {
    id: "delete-e1b55k", move: "Delete adenovirus E1B 55K", kind: "deletion",
    what: "Remove the adenoviral protein that inactivates p53.",
    why: "The original claim was that the virus then needs the cell's p53 to be already lost, making it selective for p53-mutant tumours. That explanation did not survive: selectivity tracks late viral RNA export instead, and clinical response never sorted by p53 status. The deletion still produces some selectivity, for a reason other than the one it was designed on.",
    examples: "ONYX-015; H101 (Oncorine).",
    refs: ["h101-oncolytic-adenovirus", "tp53"],
  },
  {
    id: "promoter-swap", move: "Put replication under a tumour-active promoter", kind: "targeting",
    what: "Drive the essential early gene from a promoter that only fires in the tumour.",
    why: "Instead of removing a viral function, this removes the virus's permission to start. Replication depends on a transcription factor the tumour has in excess, so a normal cell never licenses the first step.",
    examples: "Cretostimogene grenadenorepvec, whose E1A is driven by the E2F-1 promoter and so depends on a defective retinoblastoma-E2F pathway.",
    refs: ["cretostimogene"],
  },
  {
    id: "insert-gmcsf", move: "Insert granulocyte-macrophage colony-stimulating factor", kind: "insertion",
    what: "Arm the virus with a cytokine that recruits and matures antigen-presenting cells.",
    why: "Lysis alone releases antigen into a tumour that is bad at presenting it. Producing the cytokine inside the tumour turns lysis into an immunisation and concentrates a drug that is toxic when given systemically.",
    examples: "Talimogene laherparepvec; vusolimogene oderparepvec; cretostimogene grenadenorepvec.",
    refs: ["talimogene-laherparepvec", "vusolimogene-oderparepvec", "cretostimogene"],
  },
  {
    id: "insert-fusogen", move: "Insert a fusogenic glycoprotein", kind: "insertion",
    what: "Make infected cells fuse with their neighbours into a dying multinucleated mass.",
    why: "Fusion spreads the effect beyond the cells the virus can reach and produces a highly immunogenic form of cell death, which is the mechanism behind the uninjected-lesion responses seen with vusolimogene oderparepvec.",
    examples: "Vusolimogene oderparepvec.",
    refs: ["vusolimogene-oderparepvec"],
  },
  {
    id: "insert-reporter", move: "Insert a reporter gene you can image", kind: "insertion",
    what: "Add the sodium iodide symporter, so infected cells take up radioiodine and can be imaged.",
    why: "Without it, nobody knows whether an intravenous dose reached the tumour at all, which is the question that decides whether a negative trial means the virus does not work or never arrived. It also allows the same gene to be used therapeutically with a beta-emitting isotope.",
    examples: "MV-NIS, the engineered measles virus used in the 2014 myeloma report.",
    refs: ["oncolytic-virus", "multiple-myeloma"],
  },
  {
    id: "delivery-intratumoural", move: "Give up on systemic delivery and inject the tumour", kind: "delivery",
    what: "Deliver the virus directly into the lesion, or into a body cavity that contains it.",
    why: "It works, and it is the reason every approval is in a disease with an accessible target: skin and nodal melanoma, the bladder lining, the prostate, a glioma resection cavity. It also caps the addressable population at patients whose disease can be reached with a needle.",
    examples: "All seven products in the table above.",
    refs: ["oncolytic-virus"],
  },
  {
    id: "delivery-antibody", move: "Work around pre-existing and rising antibody", kind: "delivery",
    what: "Select seronegative patients, use a virus most people have not met, switch viruses part-way, or hide the virus inside carrier cells.",
    why: "This is the hardest problem in the field. Most adults have neutralising antibody to measles and to common adenovirus serotypes, and titres rise a hundredfold within weeks of the first dose, so the second and third doses face an immune system that has already learned the virus. The 2014 myeloma remission required patients selected for being measles-seronegative and a dose of 10^11 infectious units. The 2024 self-experiment switched from measles virus to vesicular stomatitis virus after three weeks for exactly this reason.",
    examples: "MV-NIS in seronegative patients; sequential measles then vesicular stomatitis virus in the 2024 case report.",
    refs: ["oncolytic-virus"],
  },
];

// ---------------------------------------------------------------- Failures

export const failures: OvFailure[] = [
  {
    id: "masterkey-265", programme: "MASTERKEY-265", virus: "Talimogene laherparepvec, herpes simplex virus type 1",
    setting: "Advanced melanoma, not previously treated with anti-PD-1 therapy",
    design: "Randomised, double-blind, placebo-controlled phase 3, 692 patients, virus or placebo added to pembrolizumab",
    outcome: "No improvement in progression-free survival (hazard ratio 0.86, 95% CI 0.71 to 1.04, p = 0.13) or overall survival (hazard ratio 0.96, 95% CI 0.76 to 1.22, p = 0.74). Response rate was higher, 48.6 against 41.3 per cent, and did not translate.",
    lesson: "The phase 1b combination had produced an encouraging complete response rate, and the mechanistic story, a cold tumour turned hot, was compelling. A properly blinded randomised trial in nearly 700 patients found nothing. This is the single most important negative result in the field and it is routinely omitted from summaries of it.",
    refs: ["talimogene-laherparepvec", "advanced-melanoma"],
    sources: [doiSrc("Chesney 2023 (Journal of Clinical Oncology)", "10.1200/JCO.22.00343")],
  },
  {
    id: "toca-5", programme: "Toca 5", virus: "Vocimagene amiretrorepvec, a replicating retroviral vector, with flucytosine",
    setting: "First or second recurrence of glioblastoma or anaplastic astrocytoma, at resection",
    design: "Randomised, open-label phase 2/3, 403 patients, 58 centres in four countries",
    outcome: "Median overall survival 11.10 months versus 12.22 months for standard care, hazard ratio 1.06 (95% CI 0.83 to 1.35), p = 0.62. No secondary endpoint differed.",
    lesson: "The best case the approach could be given. The virus was injected under direct vision into the cavity where the tumour had been, so delivery was not the problem; the killing agent was a well-understood chemotherapy released only where the vector had spread. It still did nothing. Encouraging phase 1 data in a selected population did not survive randomisation.",
    refs: ["glioblastoma"],
    sources: [doiSrc("Cloughesy 2020 (JAMA Oncology)", "10.1001/jamaoncol.2020.3161")],
  },
  {
    id: "phocus", programme: "PHOCUS", virus: "Pexastimogene devacirepvec, an oncolytic vaccinia virus",
    setting: "Advanced hepatocellular carcinoma, no prior systemic treatment",
    design: "Randomised, open-label phase 3, 459 patients, 142 sites in 16 countries, virus then sorafenib versus sorafenib",
    outcome: "Median overall survival 12.7 versus 14.0 months, worse than the control; median time to progression 2.0 versus 4.2 months; serious adverse events 53.7 versus 35.5 per cent. Terminated early at interim analysis.",
    lesson: "A dose-related survival signal in an earlier trial turned out to be nothing, and delaying effective systemic therapy in order to give the virus first made outcomes worse. The authors' own conclusion is that the arrival of checkpoint inhibitors should redirect any further development of this strategy.",
    refs: ["hcc"],
    sources: [doiSrc("Abou-Alfa 2024 (Liver Cancer)", "10.1159/000533650")],
  },
  {
    id: "onyx-015", programme: "ONYX-015", virus: "Adenovirus with E1B 55-kilodalton deleted",
    setting: "Recurrent head and neck cancer, and many other tumours",
    design: "A large clinical programme through the late 1990s, including a controlled trial of injection with cisplatin and fluorouracil",
    outcome: "The programme was not carried through to approval in the United States or Europe. The mechanism it was built on, selective replication in p53-deficient cells, was shown in 2004 to be wrong: selectivity tracks late viral RNA export, and clinical response did not sort by p53 status.",
    lesson: "The most expensive lesson in the field. A clean mechanistic story and a ready-made biomarker took a virus into large trials on a premise that did not hold. The same construct, as H101, went on to be approved in China on a response-rate trial with no survival endpoint.",
    refs: ["tp53", "h101-oncolytic-adenovirus"],
    sources: [doiSrc("Khuri 2000 (Nature Medicine)", "10.1038/78638"), doiSrc("O'Shea 2004 (Cancer Cell)", "10.1016/j.ccr.2004.11.012")],
  },
  {
    id: "rigvir", programme: "Rigvir", virus: "An echovirus 7 isolate, not engineered",
    setting: "Melanoma and other cancers, marketed to patients internationally",
    design: "Registered in Latvia and sold for years. No randomised trial",
    outcome: "Sequencing and infectivity work published in 2022 found no discernible difference in oncolytic effect between Rigvir and the Wallace prototype or four other echovirus 7 isolates across eight cell lines, and found Rigvir infecting non-cancer cell lines as well, contradicting the claim that it is oncotropic. The authors concluded the claim of effectiveness against multiple cancers is not warranted.",
    lesson: "A field that produces striking individual cases attracts products sold far ahead of their evidence. A national registration is not evidence, and a patient reading about oncolytic virotherapy deserves to be told that.",
    refs: ["melanoma"],
    sources: [doiSrc("Hietanen 2022 (Viruses)", "10.3390/v14030525")],
  },
];

// ---------------------------------------------------------------- Combination with checkpoint blockade

export const combination = {
  rationale: "The argument is clean. Checkpoint inhibitors work best where a T-cell response already exists; most tumours have none; an oncolytic virus kills tumour cells in a way that is loud to the innate immune system and releases tumour antigen alongside a viral danger signal. In principle it makes a cold tumour hot and a checkpoint inhibitor effective. The biology supporting it is real: in the 2024 self-experiment the excised tumour showed lymphocyte infiltration rising from 10 to 45 per cent and PD-L1 appearing in a tumour that had been PD-L1 negative, and in IGNYTE response was associated with increased CD8-positive T-cell infiltration and PD-L1 expression.",
  evidence: [
    {
      label: "Phase 1b, talimogene laherparepvec plus pembrolizumab",
      finding: "Encouraging complete response rate, with evidence of increased T-cell infiltration in treated lesions. Uncontrolled, and the trigger for the phase 3.",
      source: doiSrc("Ribas 2017 (Cell)", "10.1016/j.cell.2017.08.027"),
    },
    {
      label: "Phase 3, talimogene laherparepvec plus pembrolizumab (MASTERKEY-265)",
      finding: "Randomised, double-blind, placebo-controlled, 692 patients. No improvement in progression-free survival (hazard ratio 0.86) or overall survival (hazard ratio 0.96). Response rate rose from 41.3 to 48.6 per cent and did not translate into either endpoint.",
      source: doiSrc("Chesney 2023 (Journal of Clinical Oncology)", "10.1200/JCO.22.00343"),
    },
    {
      label: "Single-arm, vusolimogene oderparepvec plus nivolumab after anti-PD-1 failure (IGNYTE)",
      finding: "32.9 per cent confirmed response rate in 140 patients whose melanoma had progressed on anti-PD-1 therapy, with uninjected lesions responding as often and as deeply as injected ones. Single-arm, so the contribution of nivolumab alone cannot be separated; the randomised confirmatory trial has not reported.",
      source: doiSrc("Wong 2025 (Journal of Clinical Oncology)", "10.1200/JCO-25-01346"),
    },
    {
      label: "Preclinical, neoadjuvant virus before surgery in triple-negative breast cancer",
      finding: "In mice, giving the virus early and then resecting sensitised otherwise refractory tumours to checkpoint blockade and prevented relapse in most animals. The authors proposed testing this in the window between diagnosis and surgery rather than in late metastatic disease.",
      source: doiSrc("Bourgeois-Daigneault 2018 (Science Translational Medicine)", "10.1126/scitranslmed.aao1641"),
    },
  ],
  verdict: "The only randomised test of the combination hypothesis in a treatment-naive population was negative. What survives is a narrower claim, supported by a single-arm cohort: after anti-PD-1 therapy has already failed, adding an engineered virus produces responses in lesions that were never injected. That is worth confirming and has not been confirmed. Anyone citing synergy between oncolytic viruses and checkpoint blockade as established is citing the phase 1b and skipping the phase 3.",
};

// ---------------------------------------------------------------- The 2024 self-experiment

export const caseProtocol: OvCaseStep[] = [
  { when: "Before", what: "Baseline assessment", detail: "Magnetic resonance imaging, positron emission tomography with computed tomography and two independent ultrasound estimates all gave a tumour volume of 2.47 plus or minus 0.06 cm3, with invasion into the pectoral muscle and infiltration of the skin, and no metastatic or nodal disease. A core needle biopsy showed the tumour had changed from triple-negative at first diagnosis to HER2 3+." },
  { when: "Weeks 1 to 3", what: "Seven doses of measles virus", detail: "An Edmonston-Zagreb measles vaccine strain, given into the tumour at three to four day intervals, seven times, totalling 7.89 log CCID50. Grown in MRC-5 and then Vero cells as clarified culture supernatant, not purified from host-cell nucleic acid and protein." },
  { when: "Day 8", what: "Transient swelling", detail: "The tumour reached its largest volume, 4.28 cm3, the worst clinical and ultrasound picture of the course. A similar transient increase has been described in trials of oncolytic virotherapy in liver cancer." },
  { when: "Weeks 4 to 7", what: "Three doses of vesicular stomatitis virus", detail: "A vesicular stomatitis virus Indiana strain, given into the tumour three times, separated by two weeks and then one week, totalling 9.07 log CCID50. The switch of virus was deliberate: antibody raised against the first virus would neutralise it, so a virus the immune system had not yet learned was used instead." },
  { when: "Day 41", what: "Second transient increase", detail: "Two weeks after the first vesicular stomatitis virus dose the tumour measured 2.17 cm3 and lymph nodes enlarged in both axillae, which the authors attribute to infiltration by virus-specific lymphocytes." },
  { when: "Two months in", what: "Surgery", detail: "The tumour was excised. Pathological volume was 0.91 cm3, and it was confined to the subcutis with no infiltration of skin or pectoral muscle, in contrast to the baseline imaging. The resection was simple and non-invasive, which it would not have been at baseline." },
  { when: "After surgery", what: "One further dose, then standard treatment", detail: "Two months after excision, one subcutaneous dose of measles virus around the surgical suture. Because the excised tumour was HER2 3+, one year of adjuvant trastuzumab followed, in line with guidelines." },
];

export const caseFindings = [
  "Tumour volume fell from 2.47 plus or minus 0.06 cm3 at baseline to 0.91 cm3 measured pathologically in the excised specimen.",
  "Lymphocyte infiltration rose from 10 per cent of the tumour mass to 45 per cent, with areas of fibrosis and lymphocytes and no discernible tumour cells, a picture the pathologists note resembles a complete response to neoadjuvant chemotherapy.",
  "CD20-positive B cells rose from 10 to 70 per cent and CD8-positive T cells from 30 to 60 per cent; macrophage infiltration also increased.",
  "PD-L1 became detectable in a tumour that had been PD-L1 negative before treatment.",
  "Neutralising antibody titres to both viruses were low but measurable at baseline and rose a hundredfold during the course.",
  "The only systemic adverse event was fever and rigors twelve hours after the first vesicular stomatitis virus dose, resolving over three days. Injections were painful at first and became easier as the tumour softened.",
  "The patient was recurrence-free 45 months after surgery, against previous recurrence intervals of 22 and 21 months.",
];

export const caseLimits = [
  "One person, one tumour, one report. It establishes nothing about how often this works or in whom.",
  "The tumour was surgically removed and a year of trastuzumab followed, so the 45-month recurrence-free interval cannot be attributed to the viruses.",
  "The tumour had converted from triple-negative to HER2 3+, which by itself changes both the prognosis and the treatments available, and is a plausible reason the disease behaved differently this time.",
  "The preparations were research grade: unpurified clarified cell-culture supernatants containing host-cell nucleic acid and protein, so the agent administered was not the virus alone, and the authors say those impurities could have affected the outcome.",
  "Neither virus was engineered for tumour selectivity. Wild-type vesicular stomatitis virus is considered potentially neurotoxic in humans, and the authors call for neurotoxicity studies before any development.",
  "The patient was a professional virologist with a laboratory, the ability to grow and titre her own viruses, and oncologists willing to monitor her weekly and intervene. Almost nobody has any of that.",
];

export const caseEthics = {
  authors: [
    "The paper states that as a case of self-experimentation it did not require ethics committee review, that the patient was fully informed of her illness and of the available therapies, and that informed consent was obtained.",
    "Her oncologists agreed to monitor the treatment, with the stated aim of stopping the injections and intervening with conventional therapy if there were adverse effects or if the tumour progressed. Neither happened.",
    "The authors' conclusion is explicit: self-medicating with oncolytic viruses should not be the first approach to dealing with a diagnosed cancer. What they ask for instead is formal clinical trials of oncolytic virotherapy as a neoadjuvant treatment in early cancer.",
    "Declared interests: the senior author became a consultant to Vyriad in 2021, and the work is the subject of a European patent application filed in November 2021.",
  ],
  journal: [
    "The journal carried its publisher's standard disclaimer that the statements, opinions and data are the authors' and not the publisher's, and that the publisher disclaims responsibility for injury resulting from ideas, methods, instructions or products referred to in the content.",
    "The authors reported difficulty publishing, with concerns raised about the ethics of self-experimentation, which is itself recorded in the bioethics literature that followed.",
  ],
  ethicists: [
    "Pugh, Wilkinson and Savulescu took the case as their worked example in the Journal of Medical Ethics and separated two questions that are usually run together: whether it is ethical to experiment on oneself, and whether it is ethical to publish the result as research.",
    "They argue that self-experimentation is neither inherently unethical nor in principle exempt from ethical evaluation, and that the publication of this report can be morally justified: the self-experimenter understood the choice, the viruses had a good safety profile, and the authors stated the limits of what the case shows.",
    "They name two real harms to others. Live viruses shed and can be transmitted to people nearby, which is manageable with storage, handling and administration protocols. And publication can tempt other patients towards unconventional therapy ahead of standard treatment, which is why the authors' own statement of limits matters.",
    "Their recommendation is case-by-case assessment by ethics committees and journal editors rather than a blanket rule, and that a self-experimenter who expects to publish should seek review beforehand. They set the case in a history that includes Werner Forssmann and Barry Marshall, who both later received Nobel prizes, and scientists who died of their own experiments.",
  ],
  sources: [
    doiSrc("Forcic 2024, the case report (Vaccines, open access)", "10.3390/vaccines12090958"),
    doiSrc("Pugh 2026, the ethics analysis (Journal of Medical Ethics, open access)", "10.1136/jme-2025-110730"),
  ],
};

export const openProblems = [
  { id: "delivery", title: "Getting the virus to a tumour you cannot reach with a needle", body: "Every approval is in a disease with an accessible target. Intravenous delivery has to survive complement, antibody and sequestration in the liver, and then exceed a threshold concentration in the blood before any virus reaches the tumour at all. The 2014 myeloma report is the proof it can work and the demonstration of what it costs: two patients selected for having no measles antibodies, and a dose of 10^11 infectious units." },
  { id: "antibody", title: "Pre-existing and rising neutralising antibody", body: "Most adults have antibody to measles and to the common adenovirus serotypes before the first dose. Titres rise a hundredfold within weeks of starting, so the doses that matter face an immune system that has already learned the virus. Selecting seronegative patients, switching viruses part-way and hiding virus inside carrier cells are all attempts to work around a problem nobody has solved." },
  { id: "immune-timing", title: "The immune system has to be suppressed and then unleashed", body: "The virus needs to spread, which means the antiviral response must be held off. The therapeutic effect needs an immune response, which means it must then be provoked. These requirements conflict and the field has no principled way to sequence them. It was named as an unsolved problem in 2012 and it is still unsolved." },
  { id: "endpoints", title: "Response rate is not survival, and the approvals rest on response rate", body: "H101, talimogene laherparepvec, teserpaturev, cretostimogene and vusolimogene oderparepvec were all supported by response or complete response rates. Not one of them has a randomised overall survival benefit. In a field where the treatment is injected into the tumour being measured, that endpoint is the easiest to obtain and the least informative." },
  { id: "manufacturing", title: "Manufacturing yield", body: "Intravenous dosing needs orders of magnitude more virus per patient than intratumoural injection. Yields have to rise by a similar factor for systemic delivery to be practical, and this constraint sits upstream of every clinical question about the route." },
  { id: "no-biomarker", title: "No test says whose tumour is susceptible", body: "The selectivity argument rests on interferon-pathway defects, Ras pathway activation and receptor density, none of which is measured before treatment. There is no companion diagnostic for any oncolytic virus, so trials enrol patients who cannot be expected to respond alongside those who can." },
];
