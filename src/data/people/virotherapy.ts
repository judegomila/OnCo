import type { PersonInput } from "@/lib/schema";

/**
 * The people behind oncolytic virotherapy: the scientists who built the first engineered
 * cancer-killing viruses, the laboratories that explained why a virus can prefer a tumour cell,
 * and the Croatian virologists who published the 2024 self-experimentation case report.
 *
 * Public professional information only: roles and affiliations as they appear in the published
 * papers this corpus cites, selected publications, and bibliographic profiles. Nothing here
 * describes anyone's health; where a record concerns a published case report, that is a statement
 * about a publication and not about a person's medical history. Roles change; each record carries
 * the date it was last checked. Corrections via /suggest/.
 */
const asOf = "2026-09-25";
type P = Omit<PersonInput, "kind" | "asOf">;
const p = (x: P): PersonInput => ({ kind: "person", asOf, links: x.profiles, ...x });
const pubmed = (q: string) => ({ label: "PubMed", url: `https://pubmed.ncbi.nlm.nih.gov/?term=${encodeURIComponent(q)}` });
const orcidLink = (o: string) => ({ label: "ORCID", url: `https://orcid.org/${o}` });
const site = (label: string, url: string) => ({ label, url });

export const peopleVirotherapy: PersonInput[] = [
  // ======================= University of Zagreb =======================
  p({
    id: "beata-halassy", name: "Beata Halassy", orcid: "0000-0001-7370-0997",
    role: "Virologist, Centre for Research and Knowledge Transfer in Biotechnology, University of Zagreb; Centre of Excellence for Virus Immunology and Vaccines, Zagreb",
    specialisms: ["Virology", "Vaccine and antivenom production", "Oncolytic virotherapy", "Bioprocess development"],
    tldr: "Beata Halassy is a Croatian virologist who grows and characterises viruses, and is the senior author of a 2024 case report of self-experimental oncolytic virotherapy.",
    summary: "Beata Halassy works at the Centre for Research and Knowledge Transfer in Biotechnology at the University of Zagreb and at the Centre of Excellence for Virus Immunology and Vaccines. Her published work spans virus production and purification, vaccine and antivenom manufacturing and quality, and immunology, with more than seventy works listed on her ORCID record, including studies of snake antivenom pharmacokinetics, virus-like particle vaccine candidates, and the purification of vesicular stomatitis virus.\n\nIn 2024 she was the senior and corresponding author of a case report in Vaccines describing self-experimental neoadjuvant oncolytic virotherapy in recurrent breast cancer, using an Edmonston-Zagreb measles vaccine strain and a vesicular stomatitis virus Indiana strain prepared in her own laboratory. The report is the patient's own published account: she is both an author and the subject, and the paper's ethics statement explains how the case was handled. It became the starting point for a wider argument about whether journals should publish self-experimentation, taken up by bioethicists in the Journal of Medical Ethics in 2026. The case report's own conclusion states that self-medicating with oncolytic viruses should not be a first approach to a diagnosed cancer. She disclosed becoming a consultant to Vyriad in 2021 and a European patent application covering the subject matter.",
    profiles: [orcidLink("0000-0001-7370-0997"), pubmed("Halassy B[Author]"), site("University of Zagreb", "https://www.unizg.hr/")],
    technologies: ["oncolytic-virus"], cancers: ["tnbc"], people: ["dubravko-forcic"],
    keyPapers: ["paper-halassy-self-experiment-ovt-vaccines-2024", "paper-pugh-self-experimentation-publication-jme-2026"],
    tags: ["virology", "oncolytic-virus", "croatia"],
    papers: [
      { title: "An unconventional case study of neoadjuvant oncolytic virotherapy for recurrent breast cancer", journal: "Vaccines", year: 2024, doi: "10.3390/vaccines12090958" },
      { title: "Native elution immunoaffinity chromatography for the efficient purification of vesicular stomatitis virus", journal: "Journal of Chromatography A", year: 2026, doi: "10.1016/j.chroma.2026.467294" },
      { title: "Production- and purification-relevant properties of human and murine cytomegalovirus", journal: "Viruses", year: 2021, doi: "10.3390/v13122481" },
    ],
  }),
  p({
    id: "dubravko-forcic", name: "Dubravko Forcic",
    role: "Virologist, Centre for Research and Knowledge Transfer in Biotechnology, University of Zagreb; Centre of Excellence for Virus Immunology and Vaccines, Zagreb",
    specialisms: ["Virology", "Measles and mumps vaccine strains", "Virus genome sequencing", "Oncolytic virotherapy"],
    tldr: "Dubravko Forcic is a Croatian virologist who works on vaccine virus strains and was joint first author of the 2024 self-experimental oncolytic virotherapy case report.",
    summary: "Dubravko Forcic works at the Centre for Research and Knowledge Transfer in Biotechnology at the University of Zagreb and at the Centre of Excellence for Virus Immunology and Vaccines. His published work concerns the vaccine virus strains made in Croatia, including the determination of the coding and non-coding nucleotide sequences of the Edmonston-Zagreb measles master seed and working seed lot, the strain used in paediatric vaccines for decades and the strain used in the 2024 case report.\n\nHe was joint first author, with the radiologist Karmen Mrsic, of the Vaccines case report describing self-experimental neoadjuvant oncolytic virotherapy in recurrent breast cancer, and shares its conceptualisation with Beata Halassy. Neither virus used in that protocol had been engineered for tumour selectivity; both were grown as clarified cell-culture supernatants in MRC-5 and Vero cells.",
    profiles: [pubmed("Forcic D[Author]"), site("University of Zagreb", "https://www.unizg.hr/")],
    technologies: ["oncolytic-virus"], people: ["beata-halassy"],
    keyPapers: ["paper-halassy-self-experiment-ovt-vaccines-2024"],
    tags: ["virology", "oncolytic-virus", "croatia"],
    papers: [
      { title: "An unconventional case study of neoadjuvant oncolytic virotherapy for recurrent breast cancer", journal: "Vaccines", year: 2024, doi: "10.3390/vaccines12090958" },
      { title: "Determination of the coding and non-coding nucleotide sequences of genuine Edmonston-Zagreb master seed and current working seed lot", journal: "Vaccine", year: 2005, doi: "10.1016/j.vaccine.2004.08.021" },
    ],
  }),

  // ======================= Mayo Clinic =======================
  p({
    id: "stephen-russell", name: "Stephen J. Russell", orcid: "0000-0002-0799-6432",
    role: "Molecular medicine researcher, Mayo Clinic, Rochester; also affiliated with Vyriad, Rochester",
    institutionId: "mayo-clinic", institutions: ["mayo-clinic"],
    specialisms: ["Oncolytic virotherapy", "Engineered measles virus", "Myeloma", "Gene and virus manufacturing"],
    tldr: "Stephen Russell built the engineered measles viruses used against cancer and reported the case in which one intravenous dose put a patient's myeloma into complete remission.",
    summary: "Stephen Russell works in the Department of Molecular Medicine at Mayo Clinic in Rochester, and his recent papers also carry an affiliation to Vyriad, the Rochester company developing oncolytic viruses. His programme built MV-NIS, a measles virus engineered to kill myeloma plasma cells and to carry the sodium iodide symporter gene so that virus replication can be imaged non-invasively with radioiodine.\n\nIn 2014 he reported two measles-seronegative patients with drug-refractory myeloma given a single intravenous infusion of 10^11 infectious units of MV-NIS. Both responded and one had a durable complete remission at all disease sites, with imaging confirming virus replication inside the tumours. It remains the most cited demonstration that intravenous oncolytic virotherapy can work, and the clearest illustration of why it usually cannot: the patients were selected for having no pre-existing measles antibodies, which excludes nearly everyone.\n\nWith Kah-Whye Peng and John Bell he wrote the 2012 Nature Biotechnology review that set the field's agenda, and with Eleanor Kelly the 2007 history of oncolytic viruses from the first case reports to genetic engineering. He read and commented on the 2024 Croatian self-experimentation case report before publication, which the authors acknowledge.",
    profiles: [orcidLink("0000-0002-0799-6432"), pubmed("Russell SJ[Author] oncolytic OR measles"), site("Mayo Clinic research faculty", "https://www.mayo.edu/research/faculty")],
    technologies: ["oncolytic-virus"], cancers: ["multiple-myeloma"], people: ["evanthia-galanis", "john-bell"],
    keyPapers: ["paper-russell-mv-nis-myeloma-mayo-2014", "paper-russell-peng-bell-oncolytic-virotherapy-natbiotech-2012", "paper-kelly-russell-oncolytic-history-moltherapy-2007"],
    tags: ["oncolytic-virus", "immunotherapy", "myeloma"],
    papers: [
      { title: "Remission of disseminated cancer after systemic oncolytic virotherapy", journal: "Mayo Clinic Proceedings", year: 2014, doi: "10.1016/j.mayocp.2014.04.003" },
      { title: "Oncolytic virotherapy", journal: "Nature Biotechnology", year: 2012, doi: "10.1038/nbt.2287" },
      { title: "History of oncolytic viruses: genesis to genetic engineering", journal: "Molecular Therapy", year: 2007, doi: "10.1038/sj.mt.6300108" },
    ],
  }),

  // ======================= Ottawa Hospital Research Institute =======================
  p({
    id: "john-bell", name: "John C. Bell",
    role: "Senior Scientist, Cancer Research Program, Ottawa Hospital Research Institute; University of Ottawa",
    institutionId: "ottawa-hospital", institutions: ["ottawa-hospital"],
    specialisms: ["Oncolytic virotherapy", "Vesicular stomatitis virus", "Vaccinia virus", "Tumour immunology"],
    tldr: "John Bell's laboratory showed that cancer cells which have broken their interferon alarm cannot defend themselves against a virus, the mechanism the whole field is built on.",
    summary: "John Bell leads a laboratory in the Cancer Research Program of the Ottawa Hospital Research Institute, where he is listed as a senior scientist, and publishes with a University of Ottawa affiliation. In 2000 his laboratory published the experiment that explains oncolytic selectivity in one sentence: vesicular stomatitis virus, a virus exquisitely sensitive to interferon, replicated in and killed human tumour cell lines at interferon doses that completely protected normal human primary cultures, because those tumour cells had already lost the interferon response as part of becoming cancers.\n\nThe work led to the vesicular stomatitis virus and vaccinia platforms that dominate the field's pipeline, to attenuated derivatives designed to remove neurotoxicity, and to the strategy of using two different viruses in sequence so that antibodies raised against the first do not neutralise the second. He co-wrote the 2012 Nature Biotechnology review with Stephen Russell and Kah-Whye Peng that named the field's four unsolved problems: platform proliferation, the conflicting need to suppress and then unleash the immune system, poor preclinical models, and manufacturing yield.",
    profiles: [pubmed("Bell JC[Author] oncolytic"), site("Ottawa Hospital Research Institute", "https://www.ohri.ca/profile/jbell")],
    technologies: ["oncolytic-virus"], people: ["stephen-russell"],
    keyPapers: ["paper-stojdl-vsv-interferon-defect-natmed-2000", "paper-russell-peng-bell-oncolytic-virotherapy-natbiotech-2012"],
    tags: ["oncolytic-virus", "immunotherapy", "canada"],
    papers: [
      { title: "Exploiting tumor-specific defects in the interferon pathway with a previously unknown oncolytic virus", journal: "Nature Medicine", year: 2000, doi: "10.1038/77558" },
      { title: "Oncolytic virotherapy", journal: "Nature Biotechnology", year: 2012, doi: "10.1038/nbt.2287" },
      { title: "Advances in oncolytic virotherapy", journal: "Communications Medicine", year: 2022, doi: "10.1038/s43856-022-00098-4" },
    ],
  }),

  // ======================= Massachusetts General Hospital =======================
  p({
    id: "robert-martuza", name: "Robert L. Martuza",
    role: "Neurosurgeon and researcher, Department of Neurosurgery, Massachusetts General Hospital and Harvard Medical School; Molecular Neurosurgery Laboratory and Brain Tumor Research Center",
    institutionId: "mgh", institutions: ["mgh"],
    specialisms: ["Neurosurgery", "Oncolytic herpes simplex virus", "Glioma", "Brain tumour biology"],
    tldr: "Robert Martuza built the first genetically engineered virus designed to treat a cancer, a herpes virus crippled so that it could only replicate in dividing tumour cells.",
    summary: "Robert Martuza is a neurosurgeon at Massachusetts General Hospital and Harvard Medical School, where he runs the Molecular Neurosurgery Laboratory and works in the Brain Tumor Research Center. In 1991 he and colleagues reported dlsptk, a thymidine-kinase-negative mutant of herpes simplex virus type 1 attenuated for neurovirulence, which killed human glioma cells in culture, inhibited the growth of human gliomas implanted in nude mice, and prolonged survival when injected into intracranial gliomas.\n\nDeleting the viral thymidine kinase makes the virus depend on the host cell's own nucleotide pool, which dividing tumour cells supply and resting brain cells do not. This is the first worked example of the move that defines the modern field: remove a viral gene whose job a cancer cell will do anyway. Every approved herpes-based product, including talimogene laherparepvec and the triple-mutated G47 delta approved in Japan, descends from this line of work, and his laboratory continues to build oncolytic herpes viruses carrying immune payloads.",
    profiles: [pubmed("Martuza RL[Author]"), site("Massachusetts General Hospital", "https://www.massgeneral.org/neurosurgery")],
    technologies: ["oncolytic-virus"], cancers: ["glioblastoma"],
    keyPapers: ["paper-martuza-engineered-hsv-glioma-science-1991"],
    tags: ["oncolytic-virus", "neuro-oncology"],
    papers: [
      { title: "Experimental therapy of human glioma by means of a genetically engineered virus mutant", journal: "Science", year: 1991, doi: "10.1126/science.1851332" },
      { title: "Oncolytic herpes simplex virus expressing IL-2 controls glioblastoma growth and improves survival", journal: "Journal for ImmunoTherapy of Cancer", year: 2024, doi: "10.1136/jitc-2024-008880" },
    ],
  }),

  // ======================= The University of Tokyo =======================
  p({
    id: "tomoki-todo", name: "Tomoki Todo", orcid: "0000-0003-0523-8010",
    role: "Professor, Division of Innovative Cancer Therapy, Advanced Clinical Research Center, and Department of Surgical Neuro-Oncology, Institute of Medical Science, The University of Tokyo",
    specialisms: ["Oncolytic herpes simplex virus", "Neuro-oncology", "Glioblastoma", "Investigator-initiated trials"],
    tldr: "Tomoki Todo built the triple-mutated herpes virus that became the first oncolytic virus approved in Japan, and ran the trial in recurrent glioblastoma behind that approval.",
    summary: "Tomoki Todo is a professor at the Institute of Medical Science of The University of Tokyo, in the Division of Innovative Cancer Therapy and the Department of Surgical Neuro-Oncology. He developed G47 delta, a triple-mutated third-generation oncolytic herpes simplex virus type 1.\n\nHis investigator-initiated single-arm phase 2 trial gave G47 delta repeatedly into the tumour in 19 adults with residual or recurrent supratentorial glioblastoma after radiotherapy and temozolomide. One-year survival after starting treatment was 84.2 per cent, the prespecified endpoint was met and the trial stopped early. Imaging showed a characteristic pattern of the lesion enlarging while contrast enhancement cleared after each dose, so conventional response criteria recorded almost every patient as stable disease, and biopsies showed rising CD4-positive and CD8-positive lymphocyte infiltration with persistently low regulatory T cells. The result led to the approval of G47 delta in Japan, the first oncolytic virus product approved there.",
    profiles: [orcidLink("0000-0003-0523-8010"), pubmed("Todo T[Author] oncolytic"), site("Institute of Medical Science, The University of Tokyo", "https://www.ims.u-tokyo.ac.jp/imsut/en/")],
    technologies: ["oncolytic-virus"], cancers: ["glioblastoma"],
    keyPapers: ["paper-todo-g47delta-glioblastoma-natmed-2022"],
    tags: ["oncolytic-virus", "neuro-oncology", "japan"],
    papers: [
      { title: "Intratumoral oncolytic herpes virus G47 delta for residual or recurrent glioblastoma: a phase 2 trial", journal: "Nature Medicine", year: 2022, doi: "10.1038/s41591-022-01897-x" },
    ],
  }),
];
