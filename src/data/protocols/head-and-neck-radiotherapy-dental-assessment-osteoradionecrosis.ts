import { protocol } from "./helpers";

/*
 * Dental assessment before head and neck radiotherapy, and preventing and managing osteoradionecrosis of the jaw.
 *
 * What was read, and how (11 November 2026, fetched raw into a scratch directory and read as text):
 * - ISOO-MASCC-ASCO guideline, Prevention and management of osteoradionecrosis in patients with head and neck cancer
 *   treated with radiation therapy (Peterson et al., J Clin Oncol 2024): abstract only, from Europe PMC. The full text
 *   at ascopubs.org and the ASCO guideline page returned 403 to a script; an archived copy was not used. This is the
 *   current guideline and its individual recommendations and grades could not be read: that is the main gap here.
 * - NCI PDQ, Oral Complications, health professional version (updated
 *   16 February 2024): full text, cancer.gov HTML.
 * - MASCC/ISOO mucositis guideline (Elad et al., Cancer 2020): full text, Europe PMC (PMC7540329), for its expert
 *   opinion on dental evaluation before cancer therapy.
 * - NICE NG36, Cancer of the upper aerodigestive tract (published February 2016, last updated June 2018), section
 *   1.10: full text, nice.org.uk recommendations page.
 * - Two systematic reviews, abstracts only, from Europe PMC: Liu et al. 2026 (timing of extraction before
 *   radiotherapy) and Balermpas et al. 2022 (extraction before or after IMRT).
 * - The UK Royal College of Surgeons / British Society for Disability and Oral Health guideline on the oral management
 *   of oncology patients: the PDF at its last known address returned 404; not read, not cited.
 *
 * Every DOI was resolved through Europe PMC or Crossref and its title checked. Quotes are copied from the raw text.
 */
export const headAndNeckRadiotherapyDentalAssessmentOsteoradionecrosis = protocol({
  id: "head-and-neck-radiotherapy-dental-assessment-osteoradionecrosis",
  name: "Dental assessment before head and neck radiotherapy and osteoradionecrosis prevention",
  aka: ["dental check before radiotherapy", "pre-radiotherapy dental assessment", "osteoradionecrosis prevention", "ORN of the jaw", "jaw bone damage after radiotherapy", "tooth extraction before radiotherapy", "dental extraction and radiotherapy"],
  domain: "radiotherapy",
  tldr: "Radiotherapy to the mouth and jaw lowers the jawbone's ability to heal for the rest of your life, so a dentist should check your teeth before treatment starts and take out any that are unlikely to last, giving the gums time to heal. Afterwards, careful dental care for life and telling your dentist about the radiotherapy before any extraction help prevent bone damage called osteoradionecrosis.",
  simple: "See a dentist before mouth or throat radiotherapy. Bad teeth may need to come out first. After treatment, keep your teeth very clean, see your dentist regularly, and always tell any dentist you had radiotherapy.",
  summary: "The current guideline is ISOO-MASCC-ASCO 2024 (Peterson et al.), which could be read only as an abstract: it rated the prevention best practices and surgical management as evidence-based with strong evidence, relied on informal consensus elsewhere, made no recommendation on leukocyte- and platelet-rich fibrin or photobiomodulation for prevention, and judged hyperbaric oxygen for prevention or management largely unjustified. NCI PDQ (2024) sets out the pre-treatment dental work for high-dose head and neck radiotherapy: decide which teeth need extracting (advanced caries near the pulp, moderate or severe periodontal disease, periapical lesions symptomatic within 90 days, traumatising appliances), evaluate as early as possible so extraction sites can heal, maintain hygiene, prescribe jaw exercises against trismus and monitor for osteoradionecrosis. MASCC/ISOO 2020 gives expert opinion that dental evaluation and treatment before cancer therapy are desirable. On timing, a 2026 meta-analysis of eight retrospective cohorts found no overall link between the extraction-to-radiotherapy interval and osteoradionecrosis but higher risk in Western populations starting within 7 or 14 days; a 2022 meta-analysis in IMRT found extraction before radiotherapy has not been proven to reduce osteoradionecrosis compared with after, to be weighed against delay. For established osteoradionecrosis NICE NG36 says consider surgery to remove necrotic bone with soft tissue cover, and hyperbaric oxygen or medical management only within a trial.",
  asOf: "2026-11-11",
  setting: {
    who: ["doctor", "multidisciplinary-team", "patient-or-carer"],
    where: ["outpatient-clinic", "radiotherapy-department", "community"],
  },
  population: "Adults due to have, or who have had, radiotherapy that includes the jaws for head and neck cancer. The NICE guideline applies from age 16. Children's dental care (developing teeth) and medication-related osteonecrosis from bone-modifying drugs are separate and not covered.",
  trigger: "Radiotherapy to the head and neck has been decided on; the dental assessment should happen as soon as possible after that decision, and the protocol continues for life.",
  steps: [
    {
      action: "Book a dental assessment as early as possible after radiotherapy is decided on",
      why: "Any extractions need time to heal before radiotherapy starts, and treatment should not be delayed waiting for dental work.",
      source: "nci-pdq-oral-2024",
      quote: "A dental evaluation is scheduled as early as possible to allow sufficient time to complete any necessary treatment and for tissues to heal after dental extractions and professional periodontal care.",
      grade: "Not graded (PDQ summary)",
    },
    {
      action: "Decide which teeth to extract before treatment: advanced decay near the nerve, moderate or severe gum disease, root-tip infection symptomatic in the past 90 days, and appliances that rub the mouth",
      why: "Teeth like these are likely to need extraction later, and extraction from irradiated bone is the main trigger for osteoradionecrosis.",
      source: "nci-pdq-oral-2024",
      quote: "Determine need for medically necessary dental extractions and potential change in occlusal vertical dimension, based on the following:",
      grade: "Not graded (PDQ summary)",
    },
    {
      action: "Treat dental disease before cancer therapy where the dentist judges it necessary",
      why: "Infection from teeth can spread locally and into the blood during treatment.",
      source: "mascc-isoo-2020",
      quote: "An expert opinion complements this guideline: Although there was insufficient evidence to support the use of professional oral care for OM prevention, the panel is of the opinion that dental evaluation and treatment as indicated before cancer therapy are desirable to reduce risk for local and systemic infections from odontogenic sources.",
      grade: "III (expert opinion)",
    },
    {
      action: "Leave time for extraction sites to heal before the first fraction where the cancer allows, weighing the gain against any delay to treatment",
      why: "In Western cohorts, starting within one or two weeks of an extraction went with more osteoradionecrosis; overall the evidence is mixed and delay to cancer treatment carries its own risk.",
      source: "liu-timing-2026",
      quote: "In Western populations, patients initiating RT within < 7 days or < 14 days after dental extraction demonstrated significantly elevated ORN risk (OR = 3.07, 95%CI: 1.52-6.21 and OR = 2.01, 95%CI:1.10-3.68, respectively).",
      grade: "Meta-analysis of eight retrospective cohorts (Newcastle-Ottawa quality assessed)",
    },
    {
      action: "Prescribe jaw opening and closing exercises, and keep up oral hygiene through and after treatment",
      why: "Exercises reduce jaw stiffness (trismus); a clean mouth lowers the risk of infection and decay in teeth left dry by radiotherapy.",
      source: "nci-pdq-oral-2024",
      quote: "Prescribe jaw opening and closing exercises to reduce risk of trismus",
      grade: "Not graded (PDQ summary)",
    },
    {
      action: "Monitor for life for osteoradionecrosis and for new or recurrent cancer in the mouth, with regular dental review",
      why: "Bone damage can appear years after radiotherapy, often after an extraction or an injury, and early signs (exposed bone, pain, swelling) are easier to treat.",
      source: "nci-pdq-oral-2024",
      quote: "Monitor for risk of osteoradionecrosis, recurrent or new oral mucosal malignancy",
      grade: "Not graded (PDQ summary)",
    },
    {
      action: "For established osteoradionecrosis, refer to a specialist team and consider surgery to remove dead bone with healthy tissue cover",
      why: "Dead bone does not heal on its own; removing it and covering the area with tissue that has a good blood supply is the treatment with the most support.",
      source: "nice-ng36",
      quote: "Consider surgery to remove necrotic bone and to establish soft tissue coverage in people with osteoradionecrosis.",
      grade: "[2016]",
    },
    {
      action: "Do not use hyperbaric oxygen routinely to prevent or treat osteoradionecrosis; NICE limits it, and medical treatment, to clinical trials",
      why: "Trials have not shown a clear benefit, and it is time-consuming and expensive.",
      source: "isoo-mascc-asco-2024",
      quote: "The use of hyperbaric oxygen in prevention and management of ORN remains largely unjustified, with limited evidence to support its practice.",
      grade: "As stated in the abstract (individual grades not read)",
    },
  ],
  bestInClass: {
    statement: "ISOO-MASCC-ASCO 2024 is the current international guideline; its abstract says the prevention best practices and surgical management are evidence-based with strong evidence, hyperbaric oxygen is largely unjustified, and no recommendation was possible for platelet-rich fibrin or photobiomodulation. Its individual recommendations could not be read. From the sources that could be read: an early dental assessment, extraction of teeth with a poor outlook before treatment with time to heal (NCI PDQ 2024; MASCC/ISOO 2020 expert opinion), jaw exercises and lifelong monitoring, and surgery for established osteoradionecrosis (NICE NG36 1.10.1), with hyperbaric oxygen or medical management only in trials (NICE NG36 1.10.2). How long to wait between extraction and radiotherapy is not settled: a 2026 meta-analysis found no overall effect but higher risk with under 7 or 14 days in Western cohorts, and a 2022 meta-analysis in IMRT found extraction before radiotherapy not proven better than after.",
    sources: ["isoo-mascc-asco-2024", "nci-pdq-oral-2024", "mascc-isoo-2020", "nice-ng36", "liu-timing-2026", "balermpas-imrt-2022"],
  },
  variants: [
    {
      name: "Fewer extractions before IMRT",
      differs: "Extracts only teeth that are clearly unsalvageable before modern intensity-modulated radiotherapy, accepting later extraction if needed, to avoid delaying treatment.",
      evidence: "Balermpas 2022 (seven studies, 875 patients, abstract read): \"Tooth extraction before IMRT is more common than after IMRT, but dental extractions before compared to extractions after IMRT have not been proven to reduce the incidence of ORN. Extractions of teeth before IMRT have to be balanced with any potential delay in initiating cancer therapy.\"",
      sources: ["balermpas-imrt-2022"],
    },
    {
      name: "Hyperbaric oxygen before extraction in irradiated bone",
      differs: "Gives a course of hyperbaric oxygen before and after a tooth extraction in a previously irradiated jaw.",
      evidence: "ISOO-MASCC-ASCO 2024 calls hyperbaric oxygen for prevention and management largely unjustified on limited evidence; NICE NG36 limits it to trials for treatment.",
      sources: ["isoo-mascc-asco-2024", "nice-ng36"],
    },
  ],
  grades: [
    { claim: "Prevention best practices and surgical management of osteoradionecrosis are evidence-based with strong evidence", grade: "Evidence-based, strong evidence (as summarised in the abstract)", source: "isoo-mascc-asco-2024", quote: "Recommendations that were deemed evidence-based with strong evidence by the Expert Panel were those pertaining to best practices in prevention of ORN and surgical management." },
    { claim: "No recommendation on leukocyte- and platelet-rich fibrin or photobiomodulation to prevent osteoradionecrosis", grade: "No recommendation possible", source: "isoo-mascc-asco-2024", quote: "No recommendation was possible for the utilization of leukocyte- and platelet-rich fibrin or photobiomodulation for prevention of ORN." },
    { claim: "Hyperbaric oxygen or medical management for osteoradionecrosis only within a clinical trial", grade: "[2016]", source: "nice-ng36", quote: "Only consider hyperbaric oxygen therapy or medical management for treating osteoradionecrosis as part of a clinical trial." },
    { claim: "Dental evaluation and treatment before cancer therapy are desirable", grade: "III (expert opinion)", source: "mascc-isoo-2020" },
    { claim: "No overall association between extraction-to-radiotherapy interval and osteoradionecrosis", grade: "Meta-analysis of eight retrospective cohorts", source: "liu-timing-2026", quote: "No significant association was observed between the timing of pre-RT dental extraction and ORN risk in the overall population (OR = 0.99, 95%CI: 0.67-1.47)" },
  ],
  sources: [
    {
      key: "isoo-mascc-asco-2024",
      label: "Prevention and Management of Osteoradionecrosis in Patients With Head and Neck Cancer Treated With Radiation Therapy: ISOO-MASCC-ASCO Guideline",
      publisher: "ISOO, MASCC and ASCO (Journal of Clinical Oncology; Peterson et al.)",
      year: 2024,
      url: "https://doi.org/10.1200/JCO.23.02750",
      doi: "10.1200/JCO.23.02750",
      gradingScheme: "ASCO guideline methodology: evidence quality and recommendation strength per recommendation, with informal consensus where evidence is limited (individual grades not read).",
      read: "abstract",
      accessed: "2026-11-11",
    },
    {
      key: "nci-pdq-oral-2024",
      label: "Oral Complications (PDQ), Health Professional Version",
      publisher: "US National Cancer Institute",
      year: 2024,
      url: "https://www.cancer.gov/about-cancer/treatment/side-effects/mouth-throat/oral-complications-hp-pdq",
      gradingScheme: "PDQ summaries cite levels of evidence for individual studies in places; the table entries quoted here are ungraded.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "mascc-isoo-2020",
      label: "MASCC/ISOO clinical practice guidelines for the management of mucositis secondary to cancer therapy",
      publisher: "MASCC and ISOO (Cancer; Elad et al.)",
      year: 2020,
      url: "https://doi.org/10.1002/cncr.33100",
      doi: "10.1002/cncr.33100",
      gradingScheme: "Level of evidence I to V; recommendation, suggestion, no guideline possible, or expert opinion.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "nice-ng36",
      label: "Cancer of the upper aerodigestive tract: assessment and management in people aged 16 and over (NG36), recommendations 1.10",
      publisher: "NICE",
      year: 2016,
      url: "https://www.nice.org.uk/guidance/ng36/chapter/Recommendations",
      gradingScheme: "NICE does not grade recommendations; each is tagged with the year it was written. 'Consider' marks a weaker recommendation than 'offer'.",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "liu-timing-2026",
      label: "Timing for Radiotherapy Initiation After Dental Extraction and Risk of Osteoradionecrosis in Head and Neck Cancer Patients: A Systematic Review and Meta-Analysis",
      publisher: "World Journal of Otorhinolaryngology - Head and Neck Surgery (Liu et al.)",
      year: 2026,
      url: "https://doi.org/10.1002/wjo2.70097",
      doi: "10.1002/wjo2.70097",
      read: "abstract",
      accessed: "2026-11-11",
    },
    {
      key: "balermpas-imrt-2022",
      label: "Dental extraction, intensity-modulated radiotherapy of head and neck cancer, and osteoradionecrosis: a systematic review and meta-analysis",
      publisher: "Strahlentherapie und Onkologie (Balermpas et al.)",
      year: 2022,
      url: "https://doi.org/10.1007/s00066-021-01896-w",
      doi: "10.1007/s00066-021-01896-w",
      read: "abstract",
      accessed: "2026-11-11",
    },
  ],
  cancers: ["head-and-neck", "oral-cavity-cancer", "oropharyngeal-cancer"],
  technologies: ["hyperbaric-oxygen-radiation-injury", "dry-mouth-teeth-after-head-neck-radiotherapy"],
  related: ["head-and-neck-radiotherapy-oral-mucositis"],
  upgrades: ["idea-pu-dental-extraction-healing-interval"],
  gaps: [
    "The ISOO-MASCC-ASCO 2024 guideline, the current international standard, could be read only as an abstract (the publisher and ASCO pages refused a script). Its individual recommendations, including any on fluoride trays, the healing interval before radiotherapy, antibiotics around extraction, pentoxifylline and tocopherol, and dental implants in irradiated bone, are not reported here.",
    "Fluoride trays or high-fluoride toothpaste after radiotherapy are common practice; no source read here states a graded recommendation for them.",
    "The interval between extraction and the start of radiotherapy is not settled: the meta-analyses read (abstracts only) are of retrospective cohorts and disagree by population.",
    "The UK guideline on the oral management of oncology patients (Royal College of Surgeons) could not be found at a readable address.",
    "NICE NG36 dates from 2016 (last updated 2018).",
  ],
});
