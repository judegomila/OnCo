import { protocol } from "./helpers";

/*
 * Diarrhoea caused by chemotherapy, targeted therapy and radiotherapy: grading, first steps at home, loperamide,
 * escalation, octreotide, and when to admit. Two drug-specific protocols sit beside it and are linked in `related`:
 * irinotecan (early cholinergic syndrome and late diarrhoea) and neratinib (prophylaxis or dose escalation). Diarrhoea
 * from checkpoint inhibitors is a different illness (immune colitis) and is excluded, as eviQ excludes it.
 *
 * First written 11 November 2026. Second accuracy pass, 17 November 2026: every source was fetched again as raw text
 * (curl, pdftotext, the Europe PMC REST API) and every claim re-read against it; every quote was checked by script.
 * - eviQ (Cancer Institute NSW) "Treatment induced diarrhoea", ID 779 version 5: full public page, fetched 17 November.
 *   Its history shows an update on 16 November 2026 (patient education dietary measures); last reviewed 27 November
 *   2020, review due 31 December 2022.
 * - eviQ "Algorithm: treatment induced diarrhoea management", ID 3237 version 4 (20 May 2026): the PDF, read with
 *   pdftotext. New in this pass; it carries the admission, stool test, blood test and octreotide increment wording.
 * - eviQ patient information sheet "Diarrhoea during cancer treatment", ID 3097 version 4 (March 2024): the PDF, read
 *   with pdftotext. New in this pass; it is the source for the warning signs a patient is told to report.
 * - NCI PDQ "Gastrointestinal Complications (PDQ), Health Professional Version", diarrhoea section (updated 3 April
 *   2025): the copy another checker fetched from cancer.gov on 17 November was re-used.
 * - MASCC/ISOO mucositis guidelines 2014 (Lalla et al., PMC4164022) and the 2020 update (Elad et al., PMC7540329):
 *   full text from Europe PMC. A 2021 erratum to the 2020 update exists; its PubMed Central record has no body text.
 * - Benson et al. 2004 (J Clin Oncol) and Kornblau et al. 2000 (J Pain Symptom Manage): abstracts only, from Europe
 *   PMC. PDQ cites the high-dose loperamide then octreotide sequence to Kornblau 2000, not to Benson 2004; the first
 *   version of this file had that the wrong way round.
 * - ESMO Clinical Practice Guideline on diarrhoea in adult cancer patients (Bossi et al., Ann Oncol 2018): two other
 *   checkers were refused by the publisher on 17 November (403, bot check) and Europe PMC holds no abstract. Not read.
 * - CTCAE version 5.0 and version 6.0: the NCI spreadsheets another checker saved on 17 November were re-used.
 * Every DOI was resolved through Europe PMC or Crossref and its title checked.
 */
export const treatmentInducedDiarrhoeaGradingAndManagement = protocol({
  id: "treatment-induced-diarrhoea-grading-and-management",
  name: "Diarrhoea from chemotherapy, targeted therapy and radiotherapy: grading, loperamide, octreotide and when to admit",
  aka: ["chemotherapy-induced diarrhoea", "CID", "cancer treatment-induced diarrhea", "loperamide for chemotherapy diarrhoea", "octreotide for chemotherapy diarrhoea", "complicated diarrhoea"],
  domain: "symptom-management",
  tldr: "Diarrhoea from cancer treatment can become serious, especially with a low blood count. Drink plenty and take loperamide as your team advised. Contact them immediately if it is not controlled, or with blood in the stool, severe tummy pain and bloating, new vomiting, signs of dehydration or a temperature of 38°C or more. If cancer tablets are the cause and loperamide fails, stop them and call.",
  simple: "Cancer treatment can cause runny poo. Drink lots and take the medicine your team gave you. Call them fast if it does not stop or you feel ill or hot.",
  summary: "eviQ (Cancer Institute NSW) and NCI PDQ describe the same approach, which PDQ attributes to the 2004 expert panel (Benson et al.): grade the diarrhoea with CTCAE, look for complicating features, and split uncomplicated from complicated diarrhoea. In CTCAE version 5.0, as eviQ prints it, grade 1 is an increase of fewer than 4 stools a day over baseline, grade 2 an increase of 4 to 6, grade 3 an increase of 7 or more or a need for hospital care, and grade 4 is life-threatening. Uncomplicated grade 1 or 2 diarrhoea is managed at home with clear fluids, dietary changes and loperamide (4 mg, then 2 mg every 4 hours or after each unformed stool until 12 hours free of diarrhoea), increased to 2 mg every 2 hours if it persists beyond 24 hours. eviQ gives a maximum of 16 mg a day and says higher doses may be used for a short period in chemotherapy diarrhoea; PDQ describes common doses with a maximum of about 12 mg a day. Grade 3 or 4 diarrhoea, or grade 1 or 2 with cramping, fever, sepsis, neutropenia, frank bleeding, nausea or vomiting, dehydration or falling performance status (PDQ specifies moderate to severe cramping and grade 2 or higher nausea or vomiting), or diarrhoea lasting beyond 48 hours on loperamide, is complicated. eviQ says these people will often need admission, and that treatment may include intravenous fluids, antibiotics, stool culture, close electrolyte monitoring and, for chemotherapy or targeted therapy diarrhoea that does not respond to high-dose loperamide, octreotide (100 to 150 micrograms subcutaneously three times daily, escalated to 500 micrograms three times daily). MASCC/ISOO recommend octreotide of at least 100 micrograms subcutaneously twice daily when loperamide is ineffective for diarrhoea from standard-dose or high-dose chemotherapy associated with stem cell transplant (level II), and suggest Lactobacillus probiotics may help prevent diarrhoea from pelvic radiotherapy or chemoradiotherapy (level III). Anticancer treatment may need to be interrupted and the dose modified by the regimen's own rules. Irinotecan, sacituzumab govitecan and neratinib have their own protocols; checkpoint inhibitor diarrhoea is immune colitis and is excluded. The 2018 ESMO guideline could not be read.",
  asOf: "2026-11-17",
  setting: {
    who: ["nurse", "doctor", "pharmacist", "patient-or-carer"],
    where: ["home", "telephone-triage", "chemotherapy-day-unit", "acute-oncology-service", "ward"],
  },
  population: "People with diarrhoea caused by chemotherapy, targeted therapy or radiotherapy. Excludes diarrhoea from PD-1, PD-L1 or CTLA-4 checkpoint inhibitors, which is managed as immune-related colitis, and gastrointestinal graft-versus-host disease. Irinotecan and sacituzumab govitecan (early cholinergic and late diarrhoea) and neratinib (prophylaxis) have their own protocols. The sources read give no separate advice or doses for children.",
  trigger: "A person on cancer treatment reports more stools than usual, looser stools or a rise in stoma output.",
  steps: [
    {
      action: "Before treatment starts, tell the person how likely diarrhoea is, when to start antidiarrhoeal medicine and how to take it, why fluids matter, and which symptoms to report",
      why: "eviQ's aim is prompt recognition and an early start to treatment. It says severe diarrhoea left untreated can be life threatening, especially in someone who is also neutropenic.",
      source: "eviq-779",
      quote: "Educate patient about: the likelihood of experiencing diarrhoea prior to commencement of treatment",
    },
    {
      action: "Tell the person to contact the team immediately for diarrhoea not controlled by antidiarrhoeal medicine, blood in the stool, severe stomach pain and bloating, sudden or new vomiting, signs of dehydration or a temperature of 38°C or higher, and to go to an emergency department if they cannot get through",
      why: "These are the warning signs on eviQ's patient sheet. Its page for professionals adds that people should report at once more frequent or watery stools, or blood or mucus, and should go to the nearest emergency department if they become febrile.",
      source: "eviq-3097",
      quote: "If you can’t contact your doctor or nurse go to your nearest hospital emergency department for help.",
    },
    {
      action: "Grade the diarrhoea with CTCAE (increase in stools per day over baseline, stoma output, effect on daily activities) and ask about cramping, nausea, fever, blood or mucus, dizziness and signs of dehydration",
      why: "In CTCAE version 5.0, as eviQ prints it, grade 1 is fewer than 4 extra stools a day over baseline, grade 2 is 4 to 6, grade 3 is 7 or more or needing hospital care, and grade 4 is life-threatening. eviQ notes that the grade alone is not a complete assessment, so the other signs are asked about as well.",
      source: "eviq-779",
      quote: "The severity of treatment induced diarrhoea should be evaluated as per the CTCAE grading table below.",
    },
    {
      action: "Ask whether the person is on a checkpoint inhibitor; if so, manage as immune-related colitis instead and do not start antidiarrhoeals by this protocol",
      why: "eviQ says diarrhoea from these drugs needs distinctly different management, and that antidiarrhoeal medicines are contraindicated when immune colitis is suspected.",
      source: "eviq-779",
      quote: "If immune colitis is suspected antidiarrhoeal agents are contraindicated and management of this and any diarrhoea as a result of these agents should be according to the Management of immune related adverse events (irAEs) document.",
    },
    {
      action: "Manage uncomplicated grade 1 or 2 diarrhoea at home; plan for hospital admission for grade 3 or 4, or for grade 1 or 2 with cramping, fever, sepsis, neutropenia, frank bleeding, nausea or vomiting, dehydration or declining performance status",
      why: "eviQ's text says these people will often require admission, and its algorithm says to admit. PDQ uses the same list to define complicated diarrhoea, specifying moderate to severe cramping and grade 2 or higher nausea or vomiting. eviQ lists electrolyte imbalance and kidney dysfunction among the harms of treatment diarrhoea.",
      source: "eviq-779",
      quote: "Uncomplicated patients presenting with grade 1-2 diarrhoea may be managed conservatively in the outpatient setting. However, patients with grade 3-4 diarrhoea or grade 1-2 diarrhoea plus one or more additional symptoms of cramping, fever, sepsis, neutropenia, frank bleeding, nausea or vomiting, dehydration or declining performance status, will often require hospital admission.",
    },
    {
      action: "Advise about 8 to 10 large glasses of clear fluid a day, small frequent bland meals, and a record of the number and consistency of stools",
      why: "Fluid intake maintains hydration, and the record lets the team follow the diarrhoea. The figure is eviQ's; PDQ says at least 3 litres of clear liquids a day.",
      source: "eviq-779",
      quote: "oral rehydration, approximately 8 to 10 large glasses of clear liquids per day (e.g. water, sports drinks, clear juices or broth)",
    },
    {
      action: "Start loperamide 4 mg at the first onset of diarrhoea, then 2 mg every 4 hours or after each unformed stool, until 12 hours free of diarrhoea",
      why: "eviQ says this regimen controls treatment-related diarrhoea in the majority of patients, and that 4 mg every 4 hours may be substituted overnight. It gives a maximum daily dose of 16 mg, with higher doses for a short period in chemotherapy diarrhoea. PDQ describes common doses with a maximum of about 12 mg a day.",
      source: "eviq-779",
      quote: "4 mg at the first onset of diarrhoea followed by 2 mg every 4 hours or after every unformed stool and continued until diarrhoea free for 12 hrs.",
    },
    {
      action: "If diarrhoea lasts beyond 24 hours, increase loperamide to 2 mg every 2 hours; if it lasts beyond 48 hours, treat it as complicated",
      why: "eviQ treats diarrhoea that persists on loperamide as complicated and manages it as grade 3 or 4. Its algorithm reassesses after 12 to 24 hours at each stage and, when diarrhoea is unresolved, says codeine may be added at the specialist's discretion and oral antibiotics considered (not generally for radiotherapy diarrhoea).",
      source: "eviq-779",
      quote: "If diarrhoea persists beyond 24 hours, the dose of loperamide should be increased to 2 mg every 2 hours. If diarrhoea persists beyond 48 hours, the patient’s symptoms should be considered complicated and managed as grade 3-4 diarrhoea.",
    },
    {
      action: "For complicated diarrhoea, send stool for culture, monitor electrolytes closely, and give intravenous fluids, antidiarrhoeal medicines and antibiotics as the assessment requires",
      why: "eviQ lists these as what treatment may include. It does not name the antibiotics or say exactly when to give them.",
      source: "eviq-779",
      quote: "Treatment may include aggressive intravenous rehydration, antidiarrhoeal medications, antibiotics, octreotide (for chemotherapy and targeted therapy induced diarrhoea, unresponsive to high dose loperamide) and a diagnostic work up. Stool should be sent for culture in these patients and electrolytes closely monitored.",
    },
    {
      action: "On admission, have a doctor examine the person, send a stool specimen for blood, infection and C. difficile toxins, and take bloods (full blood count and electrolytes)",
      why: "This is the admission list in eviQ's algorithm for grade 3 or 4 diarrhoea or grade 1 or 2 with a complicating feature. PDQ lists the same tests for people on chemotherapy with complicated diarrhoea.",
      source: "eviq-3237",
      quote: "Stool specimen for blood/infection profile/C.Diff toxins.",
    },
    {
      action: "When chemotherapy or targeted therapy diarrhoea does not respond to high-dose loperamide, consider octreotide 100 to 150 micrograms subcutaneously three times daily, escalating rapidly to 500 micrograms three times daily",
      why: "eviQ says octreotide may be considered and is generally kept as second-line treatment, and that the best dose has not been determined; 25 to 50 micrograms an hour by intravenous infusion is its alternative. Its algorithm escalates in 50 microgram increments if dehydration is severe. PDQ gives the same doses and continues until 24 hours free of diarrhoea.",
      source: "eviq-779",
      quote: "The recommended starting dose is 100 to 150 micrograms three times daily given subcutaneously (alternatively can give 25-50 micrograms/hour via intravenous infusion), with the dose rapidly escalated to 500 micrograms three times a day subcutaneously/intravenously.",
    },
    {
      action: "Consider interrupting the anticancer treatment until symptoms have resolved, and follow the regimen's protocol for dose changes",
      why: "eviQ's text says treatment may need to be interrupted and the dose modified. For grade 3 or 4 or complicated diarrhoea its algorithm is firmer: discontinue chemotherapy or radiotherapy until all symptoms resolve, then restart at a reduced dose.",
      source: "eviq-779",
      quote: "Treatment with anti-cancer agents may need to be interrupted until symptoms have resolved and dose modification may be considered.",
    },
    {
      action: "Tell anyone taking cancer tablets to stop them and call the team if diarrhoea does not settle with loperamide",
      why: "Tablets are taken at home, so the person taking them is the one who has to stop. eviQ words this as a must.",
      source: "eviq-779",
      quote: "Patients taking oral anti-cancer therapy must be informed that if they develop diarrhoea which does not settle with loperamide, then they must STOP taking oral anti-cancer therapy and contact their treating team.",
    },
    {
      action: "For loose stools that persist through treatment, consider bile acid malabsorption and a gastroenterology referral",
      why: "eviQ says bile acid malabsorption has been seen with lenalidomide, pelvic radiotherapy and chemoradiotherapy, right hemicolectomy and pancreatoduodenectomy, and that a trial of cholestyramine is reasonable.",
      source: "eviq-779",
      quote: "For patients who have chronic loose stools that persist throughout treatment, bile acid malabsorption may be the cause",
    },
  ],
  bestInClass: {
    statement: "No guideline newer than the 2004 expert panel could be read in full: the 2018 ESMO guideline refused a script. The best-supported practice in the sources read is the eviQ version of the panel's approach (its algorithm was last revised in May 2026; NCI PDQ, 2025, describes the same approach): CTCAE grading with a check for complicating features, home management of uncomplicated grade 1 or 2 diarrhoea with fluids and standard-dose loperamide, escalation to 2 mg every 2 hours at 24 hours, and admission with stool tests, intravenous fluids, antibiotics as appropriate and octreotide for complicated diarrhoea that does not resolve. MASCC/ISOO give the only graded recommendation read, for octreotide after loperamide is ineffective in chemotherapy associated with stem cell transplant (level II, 2014, unchanged in 2020). The sources differ on three points. eviQ reserves octreotide for failure of high-dose loperamide, and PDQ reports the 2004 panel as recommending intravenous fluids, subcutaneous octreotide and antibiotics for complicated diarrhoea; PDQ also reports an earlier panel (Kornblau et al., 2000) that moved to octreotide after one day of high-dose loperamide and allowed high-dose octreotide first for grade 3 or 4 diarrhoea. eviQ gives a loperamide maximum of 16 mg a day, PDQ about 12 mg. And for checkpoint inhibitor diarrhoea, which this protocol excludes, eviQ calls antidiarrhoeals contraindicated when immune colitis is suspected, while PDQ says mild cases may be managed symptomatically with fluids and antidiarrhoeals.",
    sources: ["eviq-779", "eviq-3237", "pdq-gi-2025", "mascc-isoo-2014", "mascc-isoo-2020", "benson-2004", "kornblau-2000", "esmo-2018"],
  },
  variants: [
    {
      name: "High-dose loperamide from the first day, then octreotide (expert panel of 2000, Kornblau et al., as reported by NCI PDQ)",
      differs: "Uses loperamide 2 mg every 2 hours for the first day of low-grade (grade 1 or 2) chemotherapy diarrhoea, followed by octreotide 100 to 150 micrograms every 8 hours. PDQ adds that for severe (grade 3 or 4) diarrhoea octreotide 500 to 1,500 micrograms subcutaneously or intravenously every 8 hours may be given as first-line therapy.",
      evidence: "Expert panel consensus, read here only as PDQ reports it and as an abstract. PDQ notes that the optimal octreotide dose has not been determined and that, in a prospective trial of 32 people with chemotherapy diarrhoea refractory to loperamide, octreotide 100 micrograms three times a day resolved it completely in 30.",
      sources: ["pdq-gi-2025", "kornblau-2000"],
    },
    {
      name: "Severe radiotherapy diarrhoea managed outside hospital (2004 expert panel, as reported by NCI PDQ)",
      differs: "The panel suggested that severe diarrhoea from radiotherapy may not require admission: an outpatient unit or intensive home nursing may be able to give the same level of care and monitoring.",
      evidence: "Expert panel consensus. The panel's abstract says management of radiation-induced diarrhoea is similar but may not require hospitalisation. eviQ's algorithm makes no such exception.",
      sources: ["pdq-gi-2025", "benson-2004", "eviq-3237"],
    },
    {
      name: "Lactobacillus probiotics to prevent diarrhoea during pelvic radiotherapy (MASCC/ISOO)",
      differs: "Adds a probiotic containing Lactobacillus during pelvic radiotherapy or chemoradiotherapy to prevent diarrhoea.",
      evidence: "MASCC/ISOO suggestion at level III (2020, maintained from 2014). eviQ says the evidence is only in pelvic malignancy, that use outside that setting is controversial, and that probiotics are best avoided in people who are neutropenic or at significant risk of neutropenia, because of the risk of infection.",
      sources: ["mascc-isoo-2020", "eviq-779"],
    },
    {
      name: "Diphenoxylate with atropine as an alternative to loperamide",
      differs: "Two tablets three or four times a day until 12 hours free of diarrhoea, instead of loperamide.",
      evidence: "eviQ lists it as an alternative but says loperamide appears to be more effective and has been recommended in treatment guidelines.",
      sources: ["eviq-779"],
    },
  ],
  grades: [
    { claim: "Octreotide of at least 100 micrograms subcutaneously twice daily for diarrhoea from standard-dose or high-dose chemotherapy associated with stem cell transplant, when loperamide is ineffective", grade: "Recommendation, level of evidence II", source: "mascc-isoo-2014", quote: "The panel recommends that octreotide, at a dose of ≥100 μg subcutaneously twice daily, be used to treat diarrhea induced by standard‐ or high‐dose chemotherapy associated with HSCT, if loperamide is ineffective (II)." },
    { claim: "Lactobacillus probiotics may help prevent diarrhoea from pelvic radiotherapy or chemoradiotherapy", grade: "Suggestion, level of evidence III", source: "mascc-isoo-2020", quote: "The panel suggests that probiotics containing Lactobacillus spp. may be beneficial for the prevention of RT‐induced or RT‐CT–induced diarrhea in patients with pelvic malignancy." },
    { claim: "Loperamide may be less effective in grade 3 or 4 diarrhoea", grade: "PDQ level of evidence I", source: "pdq-gi-2025", quote: "Regardless of the dose, however, loperamide may be less effective in patients with grade 3 or 4 diarrhea." },
  ],
  sources: [
    { key: "eviq-779", label: "Treatment induced diarrhoea (ID 779, version 5)", publisher: "eviQ, Cancer Institute NSW", year: 2022, url: "https://www.eviq.org.au/p/779", gradingScheme: "Evidence-based summary endorsed by eviQ reference committees; recommendations are not graded. Version 5 dates from May 2022, with a patient education update on 16 November 2026; last reviewed November 2020, review due December 2022 and not yet repeated.", read: "full-text", accessed: "2026-11-17" },
    { key: "eviq-3237", label: "Algorithm: treatment induced diarrhoea management (ID 3237, version 4)", publisher: "eviQ, Cancer Institute NSW", year: 2026, url: "https://www.eviq.org.au/p/3237", gradingScheme: "A one-page algorithm; not graded. Version 4 dates from 20 May 2026 (arrows restored); the content was last reviewed in December 2023 and review is due in December 2027.", read: "full-text", accessed: "2026-11-17" },
    { key: "eviq-3097", label: "Diarrhoea during cancer treatment: patient information (ID 3097, version 4)", publisher: "eviQ, Cancer Institute NSW", year: 2024, url: "https://www.eviq.org.au/p/3097", gradingScheme: "Patient information sheet; not graded. Last reviewed March 2024.", read: "full-text", accessed: "2026-11-17" },
    { key: "pdq-gi-2025", label: "Gastrointestinal Complications (PDQ), Health Professional Version: Diarrhea", publisher: "National Cancer Institute", year: 2025, url: "https://www.cancer.gov/about-cancer/treatment/side-effects/constipation/gi-complications-hp-pdq", gradingScheme: "PDQ prints a level of evidence (I to III in this section) after some statements about studies; it does not grade recommendations, and the scheme is defined on a separate PDQ page that was not read.", read: "full-text", accessed: "2026-11-17" },
    { key: "mascc-isoo-2014", label: "MASCC/ISOO clinical practice guidelines for the management of mucositis secondary to cancer therapy", publisher: "MASCC/ISOO, Cancer", year: 2014, url: "https://europepmc.org/articles/PMC4164022", doi: "10.1002/cncr.28592", gradingScheme: "MASCC/ISOO: a recommendation rests on level I or II evidence and a suggestion on level III, IV or V; the level of evidence (I to V) is printed in brackets after each statement.", read: "full-text", accessed: "2026-11-17" },
    { key: "mascc-isoo-2020", label: "MASCC/ISOO clinical practice guidelines for the management of mucositis secondary to cancer therapy (2020 update)", publisher: "MASCC/ISOO, Cancer", year: 2020, url: "https://doi.org/10.1002/cncr.33100", doi: "10.1002/cncr.33100", gradingScheme: "MASCC/ISOO: recommendation, suggestion or no guideline possible, with a level of evidence printed beside each statement.", read: "full-text", accessed: "2026-11-17" },
    { key: "benson-2004", label: "Recommended guidelines for the treatment of cancer treatment-induced diarrhea", publisher: "Journal of Clinical Oncology", year: 2004, url: "https://europepmc.org/abstract/MED/15254061", doi: "10.1200/JCO.2004.04.132", gradingScheme: "Expert panel consensus; not graded.", read: "abstract", accessed: "2026-11-17" },
    { key: "kornblau-2000", label: "Management of cancer treatment-related diarrhea: issues and therapeutic strategies", publisher: "Journal of Pain and Symptom Management", year: 2000, url: "https://europepmc.org/abstract/MED/10699539", doi: "10.1016/s0885-3924(99)00149-9", gradingScheme: "Closed roundtable of clinicians; not graded.", read: "abstract", accessed: "2026-11-17" },
    { key: "ctcae-v6", label: "Common Terminology Criteria for Adverse Events (CTCAE) version 6.0", publisher: "US National Cancer Institute, Cancer Therapy Evaluation Program", year: 2025, url: "https://dctd.cancer.gov/research/ctep-trials/trial-development", gradingScheme: "Not an evidence grade: a severity scale for each adverse event term, from grade 1 to grade 5 (death).", read: "full-text", accessed: "2026-11-17" },
    { key: "esmo-2018", label: "Diarrhoea in adult cancer patients: ESMO Clinical Practice Guidelines", publisher: "ESMO, Annals of Oncology", year: 2018, url: "https://doi.org/10.1093/annonc/mdy145", doi: "10.1093/annonc/mdy145", read: "not-reachable", accessed: "2026-11-17" },
  ],
  gaps: [
    "The 2018 ESMO guideline on diarrhoea could not be read: on 17 November 2026 the publisher again refused a script and Europe PMC holds no abstract or open copy. Its grades and any differences from eviQ are not shown here. A search of Europe PMC on the same day found no newer ESMO, ASCO or MASCC guideline on treatment diarrhoea.",
    "The grades here are CTCAE version 5.0, which eviQ and PDQ print. CTCAE version 6.0 (2025) changes the diarrhoea term: grade 1 becomes a change in consistency or frequency, grade 2 and grade 3 add wording for children, and grade 3 adds a need for intravenous treatment. None of the management sources read has moved to it.",
    "The 2004 expert panel (Benson et al.) and the 2000 panel (Kornblau et al.) were read only as abstracts; their algorithms are reported here through NCI PDQ.",
    "A 2021 erratum to the MASCC/ISOO 2020 update exists (doi 10.1002/cncr.33549). On 17 November 2026 its PubMed Central record carried no body text, so what it corrects was not read.",
    "NCCN guidance on treatment-induced diarrhoea was not read.",
    "The eviQ page on treatment diarrhoea is past its own review date (due December 2022); eviQ says it is reviewing only high-priority documents in 2026. Its algorithm was reviewed in December 2023.",
    "The eviQ sources do not agree exactly with each other: the page escalates loperamide at 24 hours and calls diarrhoea complicated at 48 hours, while the algorithm reassesses after 12 to 24 hours at each stage; the page advises 8 to 10 large glasses of clear fluid a day and the patient sheet about 6 to 8 glasses of water.",
    "The optimal octreotide dose is not established: eviQ and PDQ start at 100 to 150 micrograms three times daily, MASCC/ISOO recommend at least 100 micrograms twice daily, and PDQ reports up to 1,500 micrograms every 8 hours for severe diarrhoea.",
    "Which antibiotics to give for complicated diarrhoea, and when, is not specified in the sources read; local febrile neutropenia and antimicrobial policies apply.",
    "No source read sets a number of hours or a stool count at which a patient at home should ring; the warning signs given here are those on eviQ's patient sheet.",
    "Dose modification rules for each anticancer drug come from each regimen's protocol and product information, not from these sources.",
    "The sources read give no separate advice for children.",
  ],
  institutions: ["nci", "mascc", "esmo"],
  technologies: ["probiotics-treatment-diarrhoea", "bowel-after-pelvic-radiotherapy"],
  drugs: ["fluorouracil", "capecitabine", "irinotecan", "sacituzumab-govitecan", "idelalisib", "pertuzumab", "panitumumab", "cetuximab", "sorafenib", "loperamide"],
  terms: ["ctcae-grading", "immune-colitis", "febrile-neutropenia"],
  related: ["irinotecan-early-cholinergic-syndrome-and-late-diarrhoea", "neratinib-diarrhoea-prophylaxis-and-dose-escalation", "octreotide-lanreotide", "febrile-neutropenia-first-hour"],
  sections: ["supportive-care"],
  tags: ["protocol", "diarrhoea", "supportive-care"],
});
