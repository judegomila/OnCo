import { protocol } from "./helpers";

/*
 * Dental assessment before head and neck radiotherapy, and preventing and managing osteoradionecrosis of the jaw.
 *
 * First written 11 November 2026. Second accuracy pass on 17 November 2026: every source was fetched again as raw
 * text (curl, pdftotext for PDFs, tags stripped by script for HTML and XML) and each claim was re-read against it.
 * - ISOO-MASCC-ASCO guideline, Prevention and management of osteoradionecrosis in patients with head and neck cancer
 *   treated with radiation therapy (Peterson et al., J Clin Oncol 2024): abstract only, from Europe PMC. The full text
 *   at ascopubs.org and the ASCO guideline page again returned 403 to a script and Europe PMC lists no open copy. Its
 *   individual recommendations and grades could not be read: that is still the main gap here.
 * - Royal College of Surgeons of England, Faculty of Dental Surgery, The Oral & Dental Management of Patients Before,
 *   During and After Cancer Therapy (dated February 2026, version 10/02/26): full text, PDF from rcseng.ac.uk, with its
 *   GRADE supplement (October 2025). This is the update of the 2018 Royal College of Surgeons / British Society for
 *   Disability and Oral Health guideline that the first pass could not find; the 2018 PDF was also read and is
 *   superseded. Added as a source on 17 November 2026.
 * - NCI PDQ, Oral Complications, health professional version (updated 16 February 2024): full text, cancer.gov HTML.
 *   Only its Table 1 addresses head and neck radiation; the sentence on scheduling a dental evaluation "as early as
 *   possible" that the first pass quoted is in its transplant section and is no longer used here.
 * - MASCC/ISOO mucositis guideline (Elad et al., Cancer 2020): full text, Europe PMC (PMC7540329), a copy fetched in
 *   this pass for a sibling protocol was re-used.
 * - NICE NG36, Cancer of the upper aerodigestive tract (published 10 February 2016, last updated 6 June 2018, last
 *   reviewed 23 June 2026), section 1.10: full text, nice.org.uk recommendations page.
 * - Liu et al. 2026 and Balermpas et al. 2022: both now read in full from Europe PMC (PMC13399180, PMC8863691).
 * - Cancer Research UK, Side effects of radiotherapy for mouth and oropharyngeal cancer (last reviewed 4 September
 *   2024): public page, for the patient-facing wording.
 *
 * Every DOI was resolved through Europe PMC and Crossref and its title checked. Quotes were checked verbatim by script.
 */
export const headAndNeckRadiotherapyDentalAssessmentOsteoradionecrosis = protocol({
  id: "head-and-neck-radiotherapy-dental-assessment-osteoradionecrosis",
  name: "Dental assessment before head and neck radiotherapy and osteoradionecrosis prevention",
  aka: ["dental check before radiotherapy", "pre-radiotherapy dental assessment", "osteoradionecrosis prevention", "ORN of the jaw", "jaw bone damage after radiotherapy", "tooth extraction before radiotherapy", "dental extraction and radiotherapy"],
  domain: "radiotherapy",
  tldr: "Radiotherapy to the mouth and jaw can reduce the blood supply to the jawbone, and bone damage called osteoradionecrosis can sometimes follow months or years later. A dentist should check your teeth before treatment and take out any that are unlikely to last, leaving time to heal. Afterwards, lifelong dental care matters, and extractions are avoided where possible.",
  simple: "See a dentist before mouth or throat radiotherapy. Teeth that are unlikely to last may need to come out first. After treatment, keep your teeth very clean and see your dentist regularly for life. Before any tooth is taken out after radiotherapy, your dentist should talk to your cancer team.",
  summary: "The current international guideline is ISOO-MASCC-ASCO 2024 (Peterson et al.), which could be read only as an abstract: it rated the prevention best practices and surgical management as evidence-based with strong evidence, relied on informal consensus for some recommendations, made no recommendation on leukocyte- and platelet-rich fibrin or photobiomodulation for prevention, and judged hyperbaric oxygen for prevention or management largely unjustified. The fullest guidance read is from the UK: the Royal College of Surgeons of England Faculty of Dental Surgery (February 2026) says the dental assessment should be scheduled as early as possible after diagnosis, teeth of dubious prognosis removed a minimum of 10 days before cancer therapy and ideally 14 to 21 days before radiotherapy, balanced against delay; lifelong follow-up; and extraction from irradiated sites avoided where possible, with particular risk above 50 Gy and notably higher risk at 60 Gy and above. NCI PDQ (2024) lists the findings that make extraction medically necessary before high-dose head and neck radiation (advanced caries with potential pulpal involvement, moderate or severe periodontal disease, periapical lesions symptomatic within 90 days, traumatising appliances), jaw exercises against trismus and monitoring for osteoradionecrosis. MASCC/ISOO 2020 gives expert opinion that dental evaluation and treatment before cancer therapy are desirable. On timing, a 2026 meta-analysis of eight retrospective cohorts found no overall link between the extraction-to-radiotherapy interval and osteoradionecrosis but higher risk in Western populations starting within 7 or 14 days; a 2022 meta-analysis in IMRT found extraction before radiotherapy not proven to reduce osteoradionecrosis compared with after. For established osteoradionecrosis NICE NG36 (2016) says consider surgery to remove necrotic bone with soft tissue cover, and hyperbaric oxygen or medical management only within a trial; the 2026 UK dental guidance makes no recommendation on hyperbaric oxygen and describes pentoxifylline with tocopherol (suggested 800 mg and 1000 IU a day) as an option without randomised trials behind it.",
  asOf: "2026-11-17",
  setting: {
    who: ["doctor", "multidisciplinary-team", "patient-or-carer"],
    where: ["outpatient-clinic", "radiotherapy-department", "community"],
  },
  population: "Adults due to have, or who have had, radiotherapy that includes the jaws for head and neck cancer. The NICE guideline applies from age 16. Children's dental care (developing teeth) and medication-related osteonecrosis from bone-modifying drugs are separate and not covered. The Royal College of Surgeons guidance and NICE NG36 are UK documents; the PDQ summary is from the United States.",
  trigger: "Head and neck cancer has been diagnosed and radiotherapy is planned; the UK dental guidance asks for the dental assessment as early as possible after diagnosis, and recommends lifelong dental follow-up afterwards.",
  steps: [
    {
      action: "Schedule a dental assessment as early as possible after diagnosis, before radiotherapy starts",
      why: "An early assessment leaves time for any dental treatment to be finished before cancer treatment begins.",
      source: "rcs-fds-2026",
      quote: "The dental assessment should be scheduled as early as possible after cancer diagnosis to allow time for any necessary dental treatment to be completed before cancer therapy commences.",
      grade: "Not graded per recommendation (UK guidance; 'should')",
    },
    {
      action: "Decide which teeth need extracting before high-dose radiotherapy: advanced decay that may reach the pulp, moderate or severe gum disease, root-tip lesions symptomatic in the past 90 days, and appliances that may injure the lining of the mouth",
      why: "The summary lists these findings as the basis for deciding on medically necessary extractions before high-dose head and neck radiation.",
      source: "nci-pdq-oral-2024",
      quote: "Determine need for medically necessary dental extractions and potential change in occlusal vertical dimension, based on the following:",
      grade: "Not graded (PDQ summary table)",
    },
    {
      action: "Remove teeth of dubious prognosis at least 10 days before cancer treatment starts, and ideally 14 to 21 days before radiotherapy",
      why: "The guidance says this takes advantage of normal bone healing and reduces the risk of delayed healing, infected sockets and osteoradionecrosis; the longer gap is to allow maximal healing.",
      source: "rcs-fds-2026",
      quote: "Hence teeth of dubious prognosis should be removed a minimum of 10 days prior to start of cancer therapy",
      grade: "Not graded per recommendation (UK guidance; 'should')",
    },
    {
      action: "Agree the timing of extractions with the oncology team so that healing time is balanced against delay to treatment",
      why: "Healing needs time, but the start of radiotherapy should not be held up more than necessary.",
      source: "rcs-fds-2026",
      quote: "Close liaison with the oncology teams is recommended to ensure that dental extractions are undertaken at an appropriate time to allow for sufficient healing, and that this is balanced with the need to avoid delays in commencing radiotherapy, chemotherapy and/or intravenous bisphosphonates",
      grade: "Not graded per recommendation (UK guidance; 'is recommended')",
    },
    {
      action: "Treat a gap of less than 7 or less than 14 days between extraction and the start of radiotherapy as a possible added risk when planning",
      why: "In Western cohorts, starting radiotherapy less than 7 or less than 14 days after an extraction went with more osteoradionecrosis; no link was seen overall, and the authors note that too long a delay may compromise cancer control.",
      source: "liu-timing-2026",
      quote: "In Western populations, patients initiating RT within < 7 days or < 14 days after dental extraction demonstrated significantly elevated ORN risk (OR = 3.07, 95%CI: 1.52-6.21 and OR = 2.01, 95%CI:1.10-3.68, respectively).",
      grade: "Not graded; meta-analysis of eight retrospective cohorts (Newcastle-Ottawa quality assessed)",
    },
    {
      action: "Carry out dental evaluation and treatment as indicated before cancer therapy",
      why: "The panel's aim is to reduce the risk of infection from the teeth, both locally and through the body.",
      source: "mascc-isoo-2020",
      quote: "An expert opinion complements this guideline: Although there was insufficient evidence to support the use of professional oral care for OM prevention, the panel is of the opinion that dental evaluation and treatment as indicated before cancer therapy are desirable to reduce risk for local and systemic infections from odontogenic sources.",
      grade: "III (no guideline possible; expert opinion)",
    },
    {
      action: "Prescribe jaw opening and closing exercises, and maintain oral hygiene during treatment",
      why: "The exercises are to reduce the risk of the jaw becoming stiff (trismus).",
      source: "nci-pdq-oral-2024",
      quote: "Prescribe jaw opening and closing exercises to reduce risk of trismus",
      grade: "Not graded (PDQ summary table)",
    },
    {
      action: "Apply fluoride varnish and advise fluoride toothpaste, with a higher-strength toothpaste considered for people at high risk of radiation caries",
      why: "The guidance notes that the risk of tooth decay is likely to be high where radiotherapy is involved. It advises toothpaste with at least 1,350 ppm fluoride, says 2,800 or 5,000 ppm may be considered for high risk of radiation caries, and says an alcohol-free 0.05% fluoride mouthwash can be considered.",
      source: "rcs-fds-2026",
      quote: "Professional application of fluoride varnish 2.26% should be undertaken",
      grade: "Not graded per recommendation (UK guidance; 'should')",
    },
    {
      action: "After treatment, monitor for osteoradionecrosis and for new or recurrent cancer in the mouth",
      why: "The summary lists this monitoring among the medically necessary oral care after high-dose head and neck radiation.",
      source: "nci-pdq-oral-2024",
      quote: "Monitor for risk of osteoradionecrosis, recurrent or new oral mucosal malignancy",
      grade: "Not graded (PDQ summary table)",
    },
    {
      action: "Arrange lifelong dental follow-up, with recall intervals set by the person's risk",
      why: "The guidance says more frequent follow-up is generally recommended because dental disease is more likely after cancer treatment, that recall should be risk-based rather than at set intervals, and that people should be seen as soon as feasibly possible after treatment ends.",
      source: "rcs-fds-2026",
      quote: "Life-long follow up by the General Dental Practitioner, in close liaison with secondary/tertiary specialist dental services is recommended",
      grade: "Not graded per recommendation (UK guidance; 'is recommended')",
    },
    {
      action: "Avoid extracting teeth from irradiated bone where possible, and discuss any planned extraction with the oncology team first",
      why: "Extraction from irradiated bone carries a risk of osteoradionecrosis. The guidance lists a radiation dose above 50 Gy as a particular risk, notably higher at 60 Gy and above, and says the type, duration, dose and site of treatment must be confirmed to assess the risk.",
      source: "rcs-fds-2026",
      quote: "Where possible, extraction of teeth from irradiated sites should be avoided due to the risk of ORN",
      grade: "Not graded per recommendation (UK guidance; 'should')",
    },
    {
      action: "Before diagnosing osteoradionecrosis, make sure the bone changes are not caused by cancer",
      why: "The guidance says the diagnosis and staging of osteoradionecrosis can be established once cancer has been ruled out as the cause of the bone changes.",
      source: "rcs-fds-2026",
      quote: "It is critical to ensure that the bony changes are not due to malignancy",
      grade: "Not graded per recommendation (UK guidance)",
    },
    {
      action: "For established osteoradionecrosis, consider surgery to remove dead bone and cover the area with soft tissue",
      why: "This is the one treatment for osteoradionecrosis that NICE says to consider outside a clinical trial.",
      source: "nice-ng36",
      quote: "Consider surgery to remove necrotic bone and to establish soft tissue coverage in people with osteoradionecrosis.",
      grade: "[2016]",
    },
    {
      action: "Consider hyperbaric oxygen or medical management for osteoradionecrosis only within a clinical trial (NICE, for the UK)",
      why: "NICE restricts both to clinical trials rather than routine care.",
      source: "nice-ng36",
      quote: "Only consider hyperbaric oxygen therapy or medical management for treating osteoradionecrosis as part of a clinical trial.",
      grade: "[2016]",
    },
    {
      action: "Regard hyperbaric oxygen for preventing or managing osteoradionecrosis as largely unjustified",
      why: "The guideline's abstract says there is limited evidence to support its practice.",
      source: "isoo-mascc-asco-2024",
      quote: "The use of hyperbaric oxygen in prevention and management of ORN remains largely unjustified, with limited evidence to support its practice.",
      grade: "As stated in the abstract (individual grades not read)",
    },
  ],
  bestInClass: {
    statement: "ISOO-MASCC-ASCO 2024 is the current international guideline; its abstract says the prevention best practices and surgical management are evidence-based with strong evidence, hyperbaric oxygen is largely unjustified, and no recommendation was possible for leukocyte- and platelet-rich fibrin or photobiomodulation. Its individual recommendations could not be read. From the sources that could be read: a dental assessment as early as possible after diagnosis, removal of teeth of dubious prognosis at least 10 days before treatment and ideally 14 to 21 days before radiotherapy, balanced against delay, fluoride, lifelong follow-up and avoiding extraction from irradiated sites (Royal College of Surgeons of England 2026, UK, recommendations not individually graded); the extraction criteria, jaw exercises and monitoring in NCI PDQ 2024 (ungraded table); and MASCC/ISOO 2020 expert opinion that dental evaluation and treatment before cancer therapy are desirable. For established osteoradionecrosis the sources differ. NICE NG36 (2016) says consider surgery (1.10.1) and keeps hyperbaric oxygen and medical management to trials (1.10.2). The 2026 UK dental guidance suggests early pharmacological treatment with conservative surgery, says definitive recommendations on pentoxifylline, tocopherol and clodronate cannot be made for lack of randomised trials, and makes no recommendation on hyperbaric oxygen. How long to wait between extraction and radiotherapy is not settled by trials: a 2026 meta-analysis found no overall effect but higher risk with under 7 or 14 days in Western cohorts, and a 2022 meta-analysis in IMRT found extraction before radiotherapy not proven better than after.",
    sources: ["isoo-mascc-asco-2024", "rcs-fds-2026", "nci-pdq-oral-2024", "mascc-isoo-2020", "nice-ng36", "liu-timing-2026", "balermpas-imrt-2022"],
  },
  variants: [
    {
      name: "Fewer extractions before IMRT",
      differs: "Questions routine extraction before modern intensity-modulated radiotherapy, since extraction before has not been proven better than extraction after.",
      evidence: "Balermpas 2022 (seven studies, 875 patients, full text read): \"Tooth extraction before IMRT is more common than after IMRT, but dental extractions before compared to extractions after IMRT have not been proven to reduce the incidence of ORN. Extractions of teeth before IMRT have to be balanced with any potential delay in initiating cancer therapy.\" The pooled risk favoured extraction before IMRT (risk ratio 0.18, 95% CI 0.04 to 0.74), but the prediction interval included 1. The 2026 UK dental guidance, citing this review, says pre-radiotherapy extractions \"remain the standard procedure\".",
      sources: ["balermpas-imrt-2022", "rcs-fds-2026"],
    },
    {
      name: "Hyperbaric oxygen around extraction in irradiated bone",
      differs: "Gives hyperbaric oxygen around a tooth extraction in a previously irradiated jaw, to try to prevent osteoradionecrosis.",
      evidence: "ISOO-MASCC-ASCO 2024 (abstract) calls hyperbaric oxygen for prevention and management largely unjustified on limited evidence. The 2026 UK dental guidance says: \"The benefits of hyperbaric oxygen, pentoxifylline-tocopherol or antibiotics, in reducing the incidence of ORN, compared with no adjunct, remain unclear\". NICE NG36 limits hyperbaric oxygen to trials for treating osteoradionecrosis and makes no recommendation on prevention.",
      sources: ["isoo-mascc-asco-2024", "rcs-fds-2026", "nice-ng36"],
    },
    {
      name: "Antibiotic cover for extractions in an irradiated jaw",
      differs: "Gives antibiotics before an unavoidable extraction from irradiated bone and continues them until the socket has healed.",
      evidence: "The 2026 UK dental guidance says the benefit of antibiotics in reducing osteoradionecrosis remains unclear, but: \"However, the general consensus recommends antibiotic prophylaxis and continued antibiotics until completion of healing.\" It reports variability in drug, route and duration and does not set a single regimen. The ISOO-MASCC-ASCO 2024 position could not be read.",
      sources: ["rcs-fds-2026"],
    },
    {
      name: "Pentoxifylline and tocopherol, with or without clodronate, for established osteoradionecrosis",
      differs: "Treats osteoradionecrosis with tablets (pentoxifylline and vitamin E, sometimes with clodronate) rather than, or before, surgery.",
      evidence: "The 2026 UK dental guidance describes this as a viable option and prints a suggested daily dosage of pentoxifylline 800 mg and vitamin E 1000 IU, but says: \"The evidence base for using these drugs is developing but at present there is a lack of randomised controlled clinical trials supporting their use of these drugs.\" It asks units using them to audit their outcomes regularly. NICE NG36 (2016) says medical management should only be considered within a clinical trial. The ISOO-MASCC-ASCO 2024 recommendation could not be read.",
      sources: ["rcs-fds-2026", "nice-ng36"],
    },
  ],
  grades: [
    { claim: "Prevention best practices and surgical management of osteoradionecrosis are evidence-based with strong evidence", grade: "Evidence-based, strong evidence (as summarised in the abstract)", source: "isoo-mascc-asco-2024", quote: "Recommendations that were deemed evidence-based with strong evidence by the Expert Panel were those pertaining to best practices in prevention of ORN and surgical management." },
    { claim: "No recommendation on leukocyte- and platelet-rich fibrin or photobiomodulation to prevent osteoradionecrosis", grade: "No recommendation possible", source: "isoo-mascc-asco-2024", quote: "No recommendation was possible for the utilization of leukocyte- and platelet-rich fibrin or photobiomodulation for prevention of ORN." },
    { claim: "Hyperbaric oxygen or medical management for osteoradionecrosis only within a clinical trial", grade: "[2016]", source: "nice-ng36", quote: "Only consider hyperbaric oxygen therapy or medical management for treating osteoradionecrosis as part of a clinical trial." },
    { claim: "No recommendation on hyperbaric oxygen for managing osteoradionecrosis (UK dental guidance)", grade: "No recommendation possible", source: "rcs-fds-2026", quote: "Hence it is not possible to make a recommendation regarding its use" },
    { claim: "Ideally 14 to 21 days between extraction and the start of radiotherapy (UK dental guidance)", grade: "Not graded per recommendation", source: "rcs-fds-2026", quote: "Ideally allow 14 to 21 days between dental extraction and commencement of radiotherapy to allow for maximal healing time" },
    { claim: "Dental evaluation and treatment before cancer therapy are desirable", grade: "III (no guideline possible; expert opinion)", source: "mascc-isoo-2020" },
    { claim: "No overall association between extraction-to-radiotherapy interval and osteoradionecrosis", grade: "Not graded; meta-analysis of eight retrospective cohorts", source: "liu-timing-2026", quote: "No significant association was observed between the timing of pre-RT dental extraction and ORN risk in the overall population (OR = 0.99, 95%CI: 0.67-1.47)" },
  ],
  sources: [
    {
      key: "isoo-mascc-asco-2024",
      label: "Prevention and Management of Osteoradionecrosis in Patients With Head and Neck Cancer Treated With Radiation Therapy: ISOO-MASCC-ASCO Guideline",
      publisher: "ISOO, MASCC and ASCO (Journal of Clinical Oncology; Peterson et al.)",
      year: 2024,
      url: "https://doi.org/10.1200/JCO.23.02750",
      doi: "10.1200/JCO.23.02750",
      gradingScheme: "Not read in full. The abstract says some recommendations rest on informal consensus and others were deemed evidence-based with strong evidence; the grade of each recommendation was not read.",
      read: "abstract",
      accessed: "2026-11-17",
    },
    {
      key: "rcs-fds-2026",
      label: "The Oral & Dental Management of Patients Before, During and After Cancer Therapy (February 2026 update of the 2018 guideline)",
      publisher: "Faculty of Dental Surgery, Royal College of Surgeons of England",
      year: 2026,
      url: "https://www.rcseng.ac.uk/-/media/Files/RCS/FDS/Publications/The-oral-and-dental-management-of-patients-before-during-and-after-cancer-therapy.pdf",
      gradingScheme: "Recommendations are not individually graded: the guidance says 'should' or 'consider' typically indicate strength, and a separate supplement gives GRADE certainty study by study.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "nci-pdq-oral-2024",
      label: "Oral Complications (PDQ), Health Professional Version",
      publisher: "US National Cancer Institute",
      year: 2024,
      url: "https://www.cancer.gov/about-cancer/treatment/side-effects/mouth-throat/oral-complications-hp-pdq",
      gradingScheme: "PDQ summaries cite levels of evidence for individual studies in places; the table entries quoted here are ungraded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "mascc-isoo-2020",
      label: "MASCC/ISOO clinical practice guidelines for the management of mucositis secondary to cancer therapy",
      publisher: "MASCC and ISOO (Cancer; Elad et al.)",
      year: 2020,
      url: "https://doi.org/10.1002/cncr.33100",
      doi: "10.1002/cncr.33100",
      gradingScheme: "Level of evidence I to V; each statement is a recommendation, a suggestion or no guideline possible, and expert opinion is marked as such.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "nice-ng36",
      label: "Cancer of the upper aerodigestive tract: assessment and management in people aged 16 and over (NG36), recommendations 1.10",
      publisher: "NICE",
      year: 2016,
      url: "https://www.nice.org.uk/guidance/ng36/chapter/Recommendations",
      gradingScheme: "NICE does not grade recommendations; each is tagged with the year it was written, and the wording ('consider') shows the strength.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "liu-timing-2026",
      label: "Timing for Radiotherapy Initiation After Dental Extraction and Risk of Osteoradionecrosis in Head and Neck Cancer Patients: A Systematic Review and Meta-Analysis",
      publisher: "World Journal of Otorhinolaryngology - Head and Neck Surgery (Liu et al.)",
      year: 2026,
      url: "https://doi.org/10.1002/wjo2.70097",
      doi: "10.1002/wjo2.70097",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "balermpas-imrt-2022",
      label: "Dental extraction, intensity-modulated radiotherapy of head and neck cancer, and osteoradionecrosis: a systematic review and meta-analysis",
      publisher: "Strahlentherapie und Onkologie (Balermpas et al.)",
      year: 2022,
      url: "https://doi.org/10.1007/s00066-021-01896-w",
      doi: "10.1007/s00066-021-01896-w",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "cruk-mouth-radiotherapy-2024",
      label: "Side effects of radiotherapy for mouth and oropharyngeal cancer (last reviewed 4 September 2024)",
      publisher: "Cancer Research UK",
      year: 2024,
      url: "https://www.cancerresearchuk.org/about-cancer/mouth-cancer/treatment/radiotherapy/side-effects",
      read: "public-summary",
      accessed: "2026-11-17",
    },
  ],
  cancers: ["head-and-neck", "oral-cavity-cancer", "oropharyngeal-cancer"],
  technologies: ["hyperbaric-oxygen-radiation-injury", "dry-mouth-teeth-after-head-neck-radiotherapy"],
  related: ["head-and-neck-radiotherapy-oral-mucositis"],
  upgrades: ["idea-pu-dental-extraction-healing-interval"],
  gaps: [
    "The ISOO-MASCC-ASCO 2024 guideline, the current international standard, could be read only as an abstract: on 17 November 2026 the publisher and ASCO pages again refused a script and no open copy was found. Its individual recommendations, including any on fluoride, the healing interval before radiotherapy, antibiotics around extraction, pentoxifylline and tocopherol, and dental implants in irradiated bone, are not reported here.",
    "The intervals, fluoride strengths, radiation dose thresholds and the pentoxifylline and vitamin E dosage on this page come from the Royal College of Surgeons of England guidance (February 2026), which is UK guidance and does not grade its recommendations individually. Its 10-day minimum and 14 to 21 day ideal rest on the references it cites, not on trials.",
    "The interval between extraction and the start of radiotherapy is not settled: the two meta-analyses read are of retrospective cohorts and differ by population.",
    "The sources disagree on medicines for established osteoradionecrosis: NICE NG36 (2016, last updated 2018, reviewed June 2026 without change to this section) keeps medical management to trials, while the 2026 UK dental guidance describes pentoxifylline and tocopherol as an option in use without making a definitive recommendation.",
    "The NCI PDQ summary has no section on dental care around head and neck radiation beyond its Table 1; its advice to schedule a dental evaluation as early as possible is written for transplant patients.",
    "No source read here tells patients in so many words to tell every dentist about past radiotherapy, or gives a time limit for reporting symptoms. Cancer Research UK describes the symptoms of osteoradionecrosis as pain and swelling in the gums, months or years after treatment.",
  ],
});
