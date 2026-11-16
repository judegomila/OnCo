import { protocol } from "./helpers";

/*
 * Hepatic veno-occlusive disease, also called sinusoidal obstruction syndrome (VOD or SOS), after a haematopoietic
 * cell transplant: risk assessment, prevention, daily monitoring, diagnosis, severity grading, defibrotide and
 * supportive care, in adults and children.
 *
 * What was read, and how (all on 16 November 2026, fetched raw and read as text):
 * - BCSH/BSBMT guideline (Dignan et al., Br J Haematol 2013): abstract only, from the Europe PMC REST API. The
 *   abstract prints every recommendation with its grade, which is what is quoted; the full text (not in PubMed
 *   Central) was not read, so the reasoning behind each grade was not seen. No later BSH edition was found.
 * - EBMT position statement on prophylactic, preemptive and curative treatment in adults (Mohty et al., Bone Marrow
 *   Transplant 2020): full text, Europe PMC (PMC7051913). Supported by an unrestricted educational grant from Jazz
 *   Pharmaceuticals, the maker of defibrotide, and all authors declared honoraria or research support from Jazz.
 * - EBMT revised adult criteria (Mohty et al. 2016): full text, Europe PMC (PMC4935979); Jazz educational grant.
 * - EBMT refined adult criteria (Mohty et al. 2023), the current adult edition: abstract only (not in PubMed
 *   Central). The refined criteria themselves were read in full in the EBMT Handbook chapter below, which
 *   reproduces them (Tables 49.2 and 49.3) and is written by the same group.
 * - EBMT paediatric criteria (Corbacioglu et al. 2018): full text, Europe PMC (PMC5803572); medical writing
 *   assistance and author support declared from Jazz.
 * - EBMT consensus guidelines on defibrotide prophylaxis in high-risk children (Corbacioglu et al., Bone Marrow
 *   Transplant 2026): full text, Europe PMC (PMC13056525); the scoring table and recommendation sections were read.
 * - The EBMT Handbook, 8th edition (2024), chapter 49 (Hepatic complications) and chapter 42: full text, from NCBI's
 *   open-access literature archive package (the publisher site and Bookshelf web pages refused a script). A handbook
 *   of expert chapters, not a graded guideline.
 * - Defitelio (defibrotide sodium) US prescribing information (Jazz Pharmaceuticals, industry; DailyMed set id
 *   2c3db989-d7ad-41ed-9ebf-698dcf6c24ec, label dated July 2025): full text of the label XML.
 * - HARMONY trial (Grupp et al., Lancet Haematol 2023): abstract only. Funded by Jazz Pharmaceuticals.
 * - Cairo et al., Br J Haematol 2020, a third set of diagnostic criteria: abstract only; Europe PMC returned an error
 *   for the full text. The criteria themselves were not read and are not described.
 * - UK Delphi consensus on risk assessment and monitoring (Clark et al., EJHaem 2025): full text, Europe PMC
 *   (PMC12482513). Initiated and funded by Jazz Pharmaceuticals; used as a variant only.
 * - Not reachable: the EMA product information for Defitelio and the EMA direct healthcare professional communication
 *   on prophylaxis. ema.europa.eu answered a script with HTTP 429 three times and was not pressed further. What the
 *   EMA said is given only as the 2026 EBMT paper reports it, and labelled so.
 *
 * Every DOI was resolved through Crossref or Europe PMC and its title checked. Quotes are checked by script against
 * the saved text.
 */
export const hepaticVenoOcclusiveDiseaseAfterTransplant = protocol({
  id: "hepatic-veno-occlusive-disease-after-transplant",
  name: "Veno-occlusive disease of the liver (sinusoidal obstruction syndrome) after stem cell transplant: prevention, monitoring, diagnosis and defibrotide",
  aka: ["VOD", "SOS", "SOS/VOD", "hepatic veno-occlusive disease", "sinusoidal obstruction syndrome", "veno-occlusive disease after transplant", "defibrotide treatment", "Baltimore criteria", "modified Seattle criteria", "EBMT VOD criteria", "liver complications after bone marrow transplant"],
  domain: "cell-therapy-toxicity",
  tldr: "Veno-occlusive disease is a liver complication of stem cell transplant in which the smallest blood vessels of the liver become blocked, usually in the first three weeks. Teams look for it every day by weighing the patient, examining the abdomen and checking blood tests, because early treatment with a medicine called defibrotide and careful fluid management give the best chance of recovery.",
  simple: "After a transplant the tiny blood vessels in the liver can get blocked. The signs are putting on weight from fluid, a swollen or sore tummy and yellow skin or eyes. Nurses weigh you every day to catch it early. There is a medicine for it, given through a drip.",
  summary: "The reader's own unit's policy comes first. Before transplant, assess risk factors and address those that can be changed (BCSH/BSBMT 2013, 1A); ursodeoxycholic acid from conditioning to day +90 is recommended by EBMT (2020) and suggested by BCSH/BSBMT (2C). Heparin, prostaglandin E1, pentoxifylline and antithrombin are not advised for prevention. Monitor weight, abdominal girth, liver size, bilirubin, creatinine and platelet transfusion need daily through the risk period, with baseline imaging in children. Diagnosis: BCSH/BSBMT 2013 uses the modified Seattle or Baltimore criteria (1A); EBMT adult criteria (2016, refined 2023) require bilirubin of 2 mg/dL or more with two of painful hepatomegaly, weight gain over 5% and ascites for clinical disease in the first 21 days, add late-onset disease and a 'probable' category (any two of five signs including imaging); EBMT paediatric criteria (2018) set no time limit and no mandatory bilirubin and count transfusion-refractory thrombocytopenia. Grade severity (EBMT: mild, moderate, severe, very severe). Defibrotide 6.25 mg/kg every 6 hours for at least 21 days is the only licensed treatment: the US label covers disease with renal or pulmonary dysfunction; EBMT advises starting promptly in severe and very severe disease and early in moderate disease; BCSH/BSBMT recommends it for treatment (1B). No systemic anticoagulants or fibrinolytics with it; stop the infusion at least 2 hours before an invasive procedure. Supportive care: cautious fluid and sodium balance, daily creatinine, intake and output, twice-daily weights, enteral rather than parenteral nutrition, and EBMT advises a platelet transfusion threshold of 30 thousand million per litre during defibrotide. Involve critical care and hepatology early (1C). On defibrotide for prevention the sources disagree, and all positions are shown under variants.",
  asOf: "2026-11-16",
  setting: {
    who: ["doctor", "nurse", "pharmacist", "multidisciplinary-team"],
    where: ["ward", "intensive-care"],
  },
  population: "Adults and children having a haematopoietic cell transplant, allogeneic or autologous. The handbook puts the incidence in adults at around 5% to 15% and in children at about 15%, higher with some conditioning regimens. The adult and paediatric diagnostic criteria differ and are given separately. The same syndrome after gemtuzumab ozogamicin, inotuzumab ozogamicin or other chemotherapy without a transplant is not covered. This page explains care that a transplant team delivers in hospital; the reader's own team's protocol comes first.",
  trigger: "A transplant is planned (risk assessment and prevention), and from the start of conditioning any unexplained weight gain, enlarging or painful liver, ascites, rising bilirubin or platelet transfusions that stop working.",
  steps: [
    {
      action: "Before the transplant, list the person's risk factors for veno-occlusive disease and deal with those that can be changed",
      why: "Earlier liver disease, a second transplant, some antibody drugs, iron overload and the strongest conditioning regimens all raise the risk, and some can be treated, avoided or planned around.",
      source: "bsh-bsbmt-2013",
      quote: "It is recommended that patients are assessed for risk factors for VOD (SOS) and that these risk factors are addressed prior to haematopoietic stem cell transplantation (1A).",
      grade: "1A",
    },
    {
      action: "Stop medicines that can harm the liver wherever possible",
      why: "The liver's small vessels are about to be stressed by conditioning, so anything else that strains the liver is removed if it safely can be.",
      source: "ebmt-position-2020",
      quote: "Furthermore, hepatotoxic drugs should be discontinued whenever possible",
    },
    {
      action: "In children, image the abdomen (ultrasound, CT or MRI) just before the transplant to record the baseline liver size and any fluid",
      why: "Many children already have a large liver or some fluid before transplant, so later changes can only be judged against their own starting point.",
      source: "ebmt-paediatric-criteria-2018",
      quote: "Suggested: imaging (US, CT or MRI) immediately before HCT to determine baseline value for both hepatomegaly and ascites.",
    },
    {
      action: "Give ursodeoxycholic acid from the start of conditioning until day 90 after the transplant",
      why: "In three pooled trials it reduced the proportion of people who developed the liver complication.",
      source: "ebmt-position-2020",
      quote: "Therefore, the use of ursodeoxycholic acid is recommended from the beginning of the conditioning until day 90 after transplantation.",
    },
    {
      action: "Do not use heparin, prostaglandin E1, pentoxifylline or antithrombin to prevent veno-occlusive disease",
      why: "None has been shown to prevent it, and heparin and prostaglandin E1 caused harm in studies.",
      source: "ebmt-position-2020",
      quote: "Therefore, given the absence of conclusive results on its effectiveness and its potential side effects, heparin should be abandoned as SOS prophylaxis.",
    },
    {
      action: "From the start of conditioning, weigh the patient every day at the same time, examine the abdomen for a large or tender liver and for fluid, and check bilirubin, creatinine and how often platelets are needed",
      why: "Every set of diagnostic criteria rests on a change from baseline in weight, liver size, fluid and bilirubin, so the change can only be seen if these are measured daily.",
      practice: "The adult guidelines read define the disease by weight gain above baseline, hepatomegaly, ascites and bilirubin but none states a monitoring schedule before diagnosis in a sentence that could be quoted; daily weights are universal on transplant units. The paediatric criteria speak of daily measurements (next step), and a company-funded UK Delphi consensus sets out monitoring practice (see variants).",
    },
    {
      action: "In children, measure weight and abdominal girth every day and treat a need for daily platelet transfusions with no other cause as an early warning sign",
      why: "Children often have the disease without jaundice, and platelets being used up is frequently the first sign.",
      source: "ebmt-paediatric-criteria-2018",
      quote: "In children, daily measurements of weight and abdominal circumference may suggest the need for further investigations to assess hepatomegaly and ascites.",
    },
    {
      action: "In adults, diagnose with established clinical criteria, and consider probable disease when any two of raised bilirubin, painful liver enlargement, weight gain above 5%, ascites, or suggestive ultrasound or elastography are present with no other explanation",
      why: "Waiting for every classic sign can delay treatment, so the current European criteria add a 'probable' category that lets treatment start earlier.",
      source: "ebmt-handbook-2024",
      quote: "Probable SOS/VOD would be defined by two or more of the following five criteria: hyperbilirubinemia, painful hepatomegaly, weight gain >5%, ascites, and/or ultrasound and/or elastography suggestive of SOS/VOD (Table 49.2).",
    },
    {
      action: "In children, diagnose with the paediatric EBMT criteria: two or more of unexplained transfusion-refractory thrombocytopenia, weight gain on three consecutive days or above 5%, liver enlargement or ascites above baseline, and bilirubin rising on three consecutive days or reaching 2 mg/dL within 72 hours, at any time after transplant",
      why: "About three in ten children with the disease never become jaundiced, so criteria that insist on a raised bilirubin miss them or find them late.",
      source: "ebmt-handbook-2024",
      quote: "The pEBMT criteria introduced in 2018 (Table 49.5) intend to cover the pediatric particularities and trigger early therapeutic intervention.",
    },
    {
      action: "Use ultrasound to help exclude other causes, and keep liver biopsy, by the transjugular route, for cases where the diagnosis is unclear",
      why: "Infection, graft-versus-host disease and drug injury can look similar; a biopsy through the neck vein is safer than through the skin when platelets are low.",
      source: "bsh-bsbmt-2013",
      quote: "It is recommended that liver biopsy be reserved for patients in whom the diagnosis of VOD (SOS) is unclear and there is a need to exclude other diagnoses (1C).",
      grade: "1C",
    },
    {
      action: "Grade the severity at diagnosis as mild, moderate, severe or very severe, and regrade if it worsens",
      why: "Severity decides how urgently treatment starts, and failure of two or more organs places the person in the highest grade.",
      source: "ebmt-handbook-2024",
      quote: "According to the EBMT, SOS/VOD is graded in four stages of severity: mild, moderate, severe, and very severe, based on the following parameters: time since the first clinical manifestation of SOS/VOD, bilirubin level and kinetics, transaminase level, weight gain, and renal function (Table 49.3).",
    },
    {
      action: "Start defibrotide as soon as severe or very severe disease is diagnosed",
      why: "Defibrotide is the only licensed medicine for this condition, and in treatment programmes people who started it sooner after diagnosis were more likely to be alive at day 100.",
      source: "ebmt-position-2020",
      quote: "Given the mortality associated with severe and very severe SOS/VOD, it is mandatory to treat these patients promptly, and DF should be initiated as soon as possible.",
    },
    {
      action: "Give defibrotide 6.25 mg/kg every 6 hours as a 2-hour infusion, dosed on the weight before conditioning, for at least 21 days and until the signs have resolved",
      why: "This is the dose and length of treatment the medicine was approved with; EBMT notes that higher doses seem to add side effects without added benefit.",
      source: "defitelio-label",
      quote: "Administer DEFITELIO for a minimum of 21 days. If after 21 days signs and symptoms of hepatic VOD have not resolved, continue DEFITELIO until resolution of VOD or up to a maximum of 60 days.",
      grade: "Prescribing information, section 2.1",
    },
    {
      action: "Do not give systemic anticoagulants or clot-dissolving drugs with defibrotide, and stop the infusion at least 2 hours before any invasive procedure",
      why: "Defibrotide makes bleeding more likely and has no antidote, so other blood thinners are stopped and procedures are timed around it.",
      source: "defitelio-label",
      quote: "There is no known reversal agent for the profibrinolytic effects of DEFITELIO. Discontinue DEFITELIO infusion at least 2 hours prior to an invasive procedure.",
      grade: "Prescribing information, section 5.1",
    },
    {
      action: "Manage fluid and salt carefully: check creatinine daily, chart everything in and out, and weigh twice a day",
      why: "The body holds on to fluid and the kidneys are under strain, so too much fluid worsens swelling and breathing while too little harms the kidneys.",
      source: "ebmt-position-2020",
      quote: "Importantly, renal function must be closely monitored with daily creatinine assessment, monitoring of ingesta-excreta, and twice daily weight measurement.",
    },
    {
      action: "Feed by mouth or tube rather than by vein where possible",
      why: "Nutrition through a vein adds fluid, infection risk and further strain on the liver.",
      source: "ebmt-position-2020",
      quote: "Parenteral nutrition is associated with fluid overload, infectious complications, and hepatotoxicity, and should be avoided.",
    },
    {
      action: "Discuss the patient early with critical care and with a specialist liver unit",
      why: "If the kidneys or lungs begin to fail the person may need intensive care, and a liver unit can advise on rescue options such as a shunt.",
      source: "bsh-bsbmt-2013",
      quote: "Early discussion with critical care specialists and a specialist hepatology unit is recommended in the management of VOD (SOS) and other treatment options including transjugular intrahepatic portosystemic shunt or hepatic transplantation may be considered (1C).",
      grade: "1C",
    },
  ],
  bestInClass: {
    statement: "Two bodies have written guidance and they differ in places; both are shown. The British guideline (BCSH/BSBMT 2013) is the only one read that grades its recommendations, and it is the older: it bases diagnosis on the modified Seattle or Baltimore criteria (1A), recommends defibrotide for treatment (1B) and judicious fluid management (1C). EBMT has since issued adult criteria (2016, refined in 2023 with probable, clinical and proven categories and a severity grade), paediatric criteria (2018) and a treatment position statement (2020); these are expert consensus without grades, written with educational grants from the maker of defibrotide, and they were written to allow earlier diagnosis. On treatment all agree that defibrotide at 25 mg/kg a day is the only specific medicine; they differ on whom to treat (the US label names disease with renal or pulmonary dysfunction, EBMT adds moderate disease) and on defibrotide for prevention, where the British 2013 recommendation predates a 2023 randomised trial that found no benefit. Ursodeoxycholic acid for prevention is recommended by EBMT and suggested by BCSH/BSBMT (2C).",
    sources: ["bsh-bsbmt-2013", "ebmt-position-2020", "ebmt-adult-criteria-2023", "ebmt-paediatric-criteria-2018", "ebmt-handbook-2024", "defitelio-label", "harmony-2023"],
  },
  variants: [
    {
      name: "Which diagnostic criteria: modified Seattle or Baltimore, EBMT adult, EBMT paediatric",
      differs: "BCSH/BSBMT 2013: \"It is recommended that the diagnosis of veno-occlusive disease (sinusoidal obstruction syndrome) [VOD (SOS)] be based primarily on established clinical criteria (modified Seattle or Baltimore criteria) (1A).\" The EBMT adult criteria keep the Baltimore requirement of bilirubin of 2 mg/dL or more for classical disease in the first 21 days, add late-onset disease after day 21, and since 2023 a probable category. The EBMT paediatric criteria drop both the time limit and the mandatory bilirubin and add transfusion-refractory thrombocytopenia.",
      evidence: "The EBMT Handbook says of the older definitions that \"they were not suitable criteria for early diagnosis, and they missed late-onset SOS/VOD\". For children it reports a single-centre comparison in which the modified Seattle criteria delayed diagnosis by a median of 3 days against the paediatric EBMT criteria. The EBMT severity grades were validated in 203 patients (Yoon 2019, as the Handbook reports). A third proposal (Cairo 2020) was read as an abstract only, which calls its criteria panel opinion; its content is not described here.",
      sources: ["bsh-bsbmt-2013", "ebmt-handbook-2024", "ebmt-adult-criteria-2016", "ebmt-adult-criteria-2023", "ebmt-paediatric-criteria-2018", "cairo-criteria-2020"],
    },
    {
      name: "Defibrotide to prevent veno-occlusive disease",
      differs: "Gives defibrotide at the treatment dose from the start of conditioning to about day 21 in people at high risk, rather than only once the disease appears. BCSH/BSBMT 2013 recommends it in children having an allogeneic transplant with listed risk factors (1A) and suggests it in adults with the same risk factors (2B). EBMT 2020: \"DF prophylaxis can be considered in adult patients at very high risk of SOS/VOD.\" EBMT's 2026 paediatric consensus uses a weighted risk score: prophylaxis not recommended below 3, advisable at 3, recommended at 4 or more.",
      evidence: "A paediatric randomised trial (2012, as EBMT 2020 reports it) cut incidence from 20% to 12% without a significant fall in deaths from the disease by day 100. The HARMONY trial (372 children and adults at high or very high risk, stopped early for futility) found disease-free survival by day 30 of 67% with defibrotide and 73% with best supportive care alone, and concluded: \"Defibrotide did not show a benefit in the prophylaxis of sinusoidal obstruction syndrome.\" The 2026 EBMT paediatric paper reports that the European Medicines Agency then advised against prophylactic use, and argues that the trial enrolled mainly lower-risk patients; the Agency's own text could not be read. Both trials and the EBMT papers had support from the manufacturer. The US label does not include prevention.",
      sources: ["bsh-bsbmt-2013", "ebmt-position-2020", "ebmt-paediatric-defibrotide-2026", "harmony-2023", "defitelio-label"],
    },
    {
      name: "Who is treated with defibrotide, and for how long",
      differs: "The US label's indication is disease \"with renal or pulmonary dysfunction following hematopoietic stem-cell transplantation (HSCT)\", for a minimum of 21 days and up to 60. EBMT treats severe and very severe disease at once, advises early treatment of moderate disease, and watches mild disease closely; its 2020 statement allows stopping before 21 days if all signs have resolved, and the 2024 Handbook gives the duration as at least 14 to 21 days and until resolution.",
      evidence: "EBMT 2020 says the case for treating mild or moderate disease is less certain but cites expanded-access programmes in which earlier treatment after diagnosis went with higher survival at day 100. The Handbook: \"we also recommend early initiation of defibrotide in patients with moderate SOS/VOD\". BCSH/BSBMT 2013 recommends defibrotide for treatment in adults and children without a severity threshold (1B).",
      sources: ["defitelio-label", "ebmt-position-2020", "ebmt-handbook-2024", "bsh-bsbmt-2013"],
    },
    {
      name: "Methylprednisolone",
      differs: "Some units add high-dose methylprednisolone, particularly in children.",
      evidence: "BCSH/BSBMT 2013: \"Methylprednisolone may be considered for use in the treatment of veno-occlusive disease with the appropriate caveats of caution regarding infection (2C).\" EBMT 2020: \"We therefore recommend against the use of methylprednisolone alone as a prolonged primary treatment of SOS/VOD\", citing scarce, mainly retrospective data and infection risk.",
      sources: ["bsh-bsbmt-2013", "ebmt-position-2020"],
    },
    {
      name: "UK Delphi consensus on risk assessment and monitoring (company funded)",
      differs: "A 2025 UK consensus of 44 statements, agreed by 70 nurses, pharmacists and consultants, sets out how units should assess risk and monitor, for example: \"VOD risk assessment should include the use of the online Center for International Blood and Marrow Transplant Research (CIBMTR) Risk Calculator\".",
      evidence: "A modified Delphi survey, not a guideline. The paper states: \"The study was initiated and funded by Jazz Pharmaceuticals.\" EBMT 2020 also mentions the CIBMTR score as an alternative way to identify high-risk patients.",
      sources: ["uk-delphi-2025", "ebmt-position-2020"],
    },
  ],
  grades: [
    { claim: "Diagnosis based primarily on modified Seattle or Baltimore criteria", grade: "1A", source: "bsh-bsbmt-2013" },
    { claim: "Ultrasound may help exclude other disorders", grade: "1C", source: "bsh-bsbmt-2013", quote: "Ultrasound imaging may be helpful in the exclusion of other disorders in patients with suspected VOD (SOS) (1C)." },
    { claim: "Liver biopsy by the transjugular approach", grade: "1C", source: "bsh-bsbmt-2013", quote: "It is recommended that liver biopsies are undertaken using the transjugular approach in order to reduce the risks associated with the procedure (1C)." },
    { claim: "Ursodeoxycholic acid suggested for prophylaxis", grade: "2C", source: "bsh-bsbmt-2013", quote: "Ursodeoxycholic acid is suggested for use in the prophylaxis of VOD (SOS) (2C)." },
    { claim: "Heparin not suggested for prophylaxis", grade: "2B", source: "bsh-bsbmt-2013", quote: "Heparin (unfractionated and low molecular weight) is not suggested for use in the prophylaxis of VOD (SOS) due to the risk of increased toxicity (2B)." },
    { claim: "Pentoxifylline not recommended for prophylaxis", grade: "1A", source: "bsh-bsbmt-2013", quote: "Pentoxifylline is not recommended in the prophylaxis of VOD (SOS) due to lack of efficacy (1A)." },
    { claim: "Prostaglandin E1 not recommended for prophylaxis", grade: "1B", source: "bsh-bsbmt-2013", quote: "Prostaglandin E1 is not recommended in the prophylaxis of VOD (SOS) due to lack of efficacy and toxicity (1B)." },
    { claim: "Defibrotide recommended for treatment in adults and children", grade: "1B", source: "bsh-bsbmt-2013", quote: "Defibrotide is recommended in the treatment of VOD (SOS) in adults and children (1B)." },
    { claim: "Tissue plasminogen activator not recommended for treatment", grade: "1B", source: "bsh-bsbmt-2013", quote: "Tissue plasminogen activator is not recommended for use in the treatment of VOD (SOS) due to the associated risk of haemorrhage (1B)." },
    { claim: "Judicious fluid balance management", grade: "1C", source: "bsh-bsbmt-2013", quote: "Judicious clinical care, particularly in the management of fluid balance, is recommended in the management of VOD (SOS) (1C)." },
    { claim: "Defibrotide dose of 25 mg/kg a day recommended by EBMT", grade: "Expert position (ungraded)", source: "ebmt-position-2020", quote: "Therefore, the dose approved by the FDA and the EMA, and which we recommend, is 25 mg/kg/day." },
    { claim: "Defibrotide prophylaxis did not improve disease-free survival by day 30 in HARMONY", grade: "Randomised phase 3 trial, stopped for futility", source: "harmony-2023", quote: "Defibrotide did not show a benefit in the prophylaxis of sinusoidal obstruction syndrome." },
  ],
  sources: [
    {
      key: "bsh-bsbmt-2013",
      label: "BCSH/BSBMT guideline: diagnosis and management of veno-occlusive disease (sinusoidal obstruction syndrome) following haematopoietic stem cell transplantation",
      publisher: "British Committee for Standards in Haematology and British Society for Blood and Marrow Transplantation (British Journal of Haematology, Dignan et al.)",
      year: 2013,
      url: "https://doi.org/10.1111/bjh.12558",
      doi: "10.1111/bjh.12558",
      gradingScheme: "Each recommendation is printed with a strength number (1 where the wording is 'recommended', 2 where it is 'suggested') and an evidence letter (A to C). The abstract read does not define them further.",
      read: "abstract",
      accessed: "2026-11-16",
    },
    {
      key: "ebmt-position-2020",
      label: "Prophylactic, preemptive, and curative treatment for sinusoidal obstruction syndrome/veno-occlusive disease in adult patients: a position statement from an international expert group",
      publisher: "EBMT task force (Bone Marrow Transplantation, Mohty et al.). Supported by an unrestricted educational grant from Jazz Pharmaceuticals (industry)",
      year: 2020,
      url: "https://doi.org/10.1038/s41409-019-0705-z",
      doi: "10.1038/s41409-019-0705-z",
      gradingScheme: "Expert position statement; recommendations are not graded.",
      read: "full-text",
      accessed: "2026-11-16",
    },
    {
      key: "ebmt-adult-criteria-2023",
      label: "Diagnosis and severity criteria for sinusoidal obstruction syndrome/veno-occlusive disease in adult patients: a refined classification from the European society for blood and marrow transplantation (EBMT)",
      publisher: "EBMT (Bone Marrow Transplantation, Mohty et al.)",
      year: 2023,
      url: "https://doi.org/10.1038/s41409-023-01992-8",
      doi: "10.1038/s41409-023-01992-8",
      gradingScheme: "Expert classification; not graded.",
      read: "abstract",
      accessed: "2026-11-16",
    },
    {
      key: "ebmt-adult-criteria-2016",
      label: "Revised diagnosis and severity criteria for sinusoidal obstruction syndrome/veno-occlusive disease in adult patients: a new classification from the European Society for Blood and Marrow Transplantation",
      publisher: "EBMT (Bone Marrow Transplantation, Mohty et al.). Supported by an unrestricted educational grant from Jazz Pharmaceuticals (industry)",
      year: 2016,
      url: "https://doi.org/10.1038/bmt.2016.130",
      doi: "10.1038/bmt.2016.130",
      gradingScheme: "Expert classification; not graded.",
      read: "full-text",
      accessed: "2026-11-16",
    },
    {
      key: "ebmt-paediatric-criteria-2018",
      label: "Diagnosis and severity criteria for sinusoidal obstruction syndrome/veno-occlusive disease in pediatric patients: a new classification from the European society for blood and marrow transplantation",
      publisher: "EBMT (Bone Marrow Transplantation, Corbacioglu et al.). Authors declared honoraria or research support from Jazz Pharmaceuticals (industry)",
      year: 2018,
      url: "https://doi.org/10.1038/bmt.2017.161",
      doi: "10.1038/bmt.2017.161",
      gradingScheme: "Expert classification; not graded.",
      read: "full-text",
      accessed: "2026-11-16",
    },
    {
      key: "ebmt-paediatric-defibrotide-2026",
      label: "Defibrotide for prophylaxis of sinusoidal obstruction syndrome/veno-occlusive disease (SOS/VOD) in pediatric high-risk patients: consensus guidelines from the European Society for Blood and Marrow Transplantation (EBMT)",
      publisher: "EBMT (Bone Marrow Transplantation, Corbacioglu et al.)",
      year: 2026,
      url: "https://doi.org/10.1038/s41409-025-02793-x",
      doi: "10.1038/s41409-025-02793-x",
      gradingScheme: "Expert consensus with a weighted risk score: cumulative score below 3, prophylaxis not recommended; 3, advisable; 4 or more, recommended.",
      read: "full-text",
      accessed: "2026-11-16",
    },
    {
      key: "ebmt-handbook-2024",
      label: "The EBMT Handbook: Hematopoietic Cell Transplantation and Cellular Therapies, 8th edition, chapter 49 (Hepatic Complications) and chapter 42",
      publisher: "EBMT (Springer; Sureda, Corbacioglu, Greco, Kröger and Carreras, editors). A handbook of expert chapters, not a graded guideline",
      year: 2024,
      url: "https://www.ncbi.nlm.nih.gov/books/NBK608328/",
      doi: "10.1007/978-3-031-44080-9_49",
      gradingScheme: "None: the chapters give their authors' advice and cite the studies behind it.",
      read: "full-text",
      accessed: "2026-11-16",
    },
    {
      key: "defitelio-label",
      label: "DEFITELIO (defibrotide sodium) injection: US prescribing information (manufacturer's label)",
      publisher: "Jazz Pharmaceuticals (industry), on DailyMed, US National Library of Medicine",
      year: 2025,
      url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=2c3db989-d7ad-41ed-9ebf-698dcf6c24ec",
      gradingScheme: "A regulator-approved label; not graded.",
      read: "full-text",
      accessed: "2026-11-16",
    },
    {
      key: "harmony-2023",
      label: "Defibrotide plus best standard of care compared with best standard of care alone for the prevention of sinusoidal obstruction syndrome (HARMONY): a randomised, multicentre, phase 3 trial",
      publisher: "The Lancet Haematology (Grupp et al.). Funded by Jazz Pharmaceuticals (industry)",
      year: 2023,
      url: "https://doi.org/10.1016/S2352-3026(23)00011-X",
      doi: "10.1016/S2352-3026(23)00011-X",
      read: "abstract",
      accessed: "2026-11-16",
    },
    {
      key: "cairo-criteria-2020",
      label: "Modified diagnostic criteria, grading classification and newly elucidated pathophysiology of hepatic SOS/VOD after haematopoietic cell transplantation",
      publisher: "British Journal of Haematology (Cairo, Cooke, Lazarus and Chao)",
      year: 2020,
      url: "https://doi.org/10.1111/bjh.16557",
      doi: "10.1111/bjh.16557",
      read: "abstract",
      accessed: "2026-11-16",
    },
    {
      key: "uk-delphi-2025",
      label: "Results From a UK Consensus via Delphi on Practical Considerations Surrounding Risk Assessment and Patient Monitoring for a Prompt Diagnosis of Severe Veno-Occlusive Disease (VOD) in Adults Post-HSCT",
      publisher: "EJHaem (Clark et al.). Initiated and funded by Jazz Pharmaceuticals (industry)",
      year: 2025,
      url: "https://doi.org/10.1002/jha2.70143",
      doi: "10.1002/jha2.70143",
      gradingScheme: "Modified Delphi: consensus threshold 75% agreement.",
      read: "full-text",
      accessed: "2026-11-16",
    },
    {
      key: "ema-defitelio",
      label: "Defitelio (defibrotide): European product information, and the direct healthcare professional communication on use for prophylaxis (web pages as they stood when access was tried; the editions could not be read)",
      publisher: "European Medicines Agency",
      year: 2026,
      url: "https://www.ema.europa.eu/en/medicines/human/EPAR/defitelio",
      read: "not-reachable",
      accessed: "2026-11-16",
    },
  ],
  drugs: ["defibrotide"],
  technologies: ["allogeneic-hsct"],
  terms: ["conditioning-regimen"],
  related: [
    "hct-conditioning-and-engraftment-care",
    "allo-hct-gvhd-prophylaxis",
    "red-cell-and-platelet-transfusion-thresholds",
    "autologous-stem-cell-transplant",
    "inotuzumab-then-transplant-caution",
    "inotuzumab-ozogamicin",
    "gemtuzumab-ozogamicin",
    "busulfan",
    "paper-defibrotide-2005-01-blood-2016",
  ],
  upgrades: [],
  gaps: [
    "The British guideline (BCSH/BSBMT 2013) was read as an abstract only. The abstract prints each recommendation and grade, but the evidence review behind them was not read, and the guideline predates the EBMT criteria, the HARMONY trial and the current label. No update was found.",
    "The EBMT 2023 refined adult criteria were read as an abstract; the criteria tables were read in the EBMT Handbook (2024), which reproduces them.",
    "The European product information for defibrotide and the European Medicines Agency's communication advising against prophylactic use could not be read: the Agency's site answered a script with HTTP 429. The European licensed indication is therefore not stated here, and the communication is described only as the 2026 EBMT paper reports it.",
    "Defibrotide for prevention is unsettled: one paediatric trial was positive on incidence, one larger mixed trial found no benefit, and British (2013) and EBMT (2020, 2026) guidance point different ways. Most of the EBMT documents, both prevention trials and the UK consensus had funding or grants from the manufacturer.",
    "No guideline read states, in a sentence that could be quoted, how often adults should be weighed and examined before a diagnosis is made; daily monitoring is given here as practice.",
    "A third set of diagnostic and grading criteria (Cairo and colleagues, 2020) was read as an abstract only and is not described.",
    "EBMT 2020 advises a platelet transfusion threshold of 30 thousand million per litre during defibrotide and acknowledges it may not be achievable; no trial supports the figure.",
    "Liver stiffness measurement by elastography is in the 2023 EBMT criteria as supportive imaging; the Handbook describes it as sensitive and specific on two recent studies, and it is not available everywhere.",
  ],
});
