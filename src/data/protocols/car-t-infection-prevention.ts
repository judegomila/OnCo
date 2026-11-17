import { protocol } from "./helpers";
import { EBMT_2019, SITC_IEC_2020 } from "./cell-therapy-sources";

/*
 * Infection screening, antimicrobial prophylaxis and immunoglobulin replacement around CAR T-cell therapy.
 *
 * What was read, and how (first written 11 November 2026; every claim re-read against the raw text on
 * 17 November 2026 in a second accuracy pass):
 * - ASTCT Infectious Diseases Special Interest Group best practice considerations (Transplantation and Cellular
 *   Therapy 2024;30(10):955-969): the author manuscript in Europe PMC (PMC12826105, full-text XML through the Europe
 *   PMC REST service), fetched again on 17 November 2026 and read in full, with Tables 2, 3 and 4 and their
 *   footnotes. Figure 2 (the fever flow diagram) is an image and was not read. No newer edition is listed in Europe
 *   PMC or Crossref.
 * - SITC 2020 immune effector cell guideline: the Europe PMC full-text XML (PMC7745688) saved by a sibling checker
 *   on 16 November 2026, re-used and re-read for the infection and B-cell aplasia sections.
 * - EBMT/JACIE 2019 recommendations: the Europe PMC full-text XML (PMC7012497) and the open Haematologica PDF, both
 *   saved by sibling checkers on 16 and 17 November 2026 and re-used. Table 10 (anti-infective prophylaxis) is an
 *   image in the XML and was read from the PDF with pdftotext; nothing is quoted from the table.
 * - YESCARTA US prescribing information and Medication Guide (label revised 07/2026, Medication Guide revised
 *   February 2026): the FDA PDF and the DailyMed SPL saved by a sibling checker on 17 November 2026, re-used for the
 *   patient advice on fever and for the label's wording on infection and live vaccines.
 * DOIs resolved through Crossref and Europe PMC. Every quote checked by script against the saved text (whitespace
 * and XML tags only).
 *
 * What the second pass changed: hepatitis B prophylaxis was written as one rule for anyone with a history of
 * hepatitis B, where ASTCT gives entecavir to people who are HBsAg positive and offers prophylaxis or monthly
 * monitoring to people who are HBsAg negative and anti-HBc positive; EBMT/JACIE 2019's longer prophylaxis (to one
 * year or a CD4 count) and its position against routine antibacterial prophylaxis had been left out; several "why"
 * lines said more than the sources; a section heading had been joined to a quote; vaccination timing is now a step.
 */
export const carTInfectionPrevention = protocol({
  id: "car-t-infection-prevention",
  name: "Infection screening, prophylaxis and immunoglobulin replacement around CAR T-cell therapy",
  aka: ["CAR-T antimicrobial prophylaxis", "CAR T infection prevention", "IVIG after CAR T", "hypogammaglobulinaemia after CAR T", "PJP prophylaxis CAR T"],
  domain: "cell-therapy-toxicity",
  tldr: "Infections are common in the first months after CAR T-cell therapy. Before treatment you are tested for hepatitis B and C, HIV and other infections. Afterwards, US guidance recommends medicines against shingles, cold sores and a type of pneumonia for at least six months, and antibody infusions for some people with low antibody levels. Call your team straight away for a fever of 38°C or higher.",
  simple: "After CAR T-cell therapy your body can be slow to fight infections for months. You will take medicines to prevent some infections and have blood tests. Call your team straight away if your temperature is 38°C or higher.",
  summary: "ASTCT 2024: screen before lymphodepletion with HIV antibody, hepatitis B (HBsAg, anti-HBc, anti-HBs), hepatitis C antibody, CMV IgG and HTLV-1 IgG, syphilis testing by risk, and baseline HBV DNA if HBsAg is positive; delay for severe symptomatic lower respiratory infection until clinically improved. Prophylaxis: aciclovir 400 mg or valaciclovir 500 mg twice daily from lymphodepletion until at least 6 months after infusion (usually shorter in children); trimethoprim-sulfamethoxazole for Pneumocystis from neutrophil recovery (by day 30) until at least 6 months, after a study in which 2 of 40 patients developed Pneumocystis pneumonia needing ventilation when prophylaxis stopped at 3 months; entecavir 0.5 mg daily for HBsAg-positive people from lymphodepletion until at least 12 months, and either prophylaxis or monthly HBV DNA and liver enzymes for people who are HBsAg negative and anti-HBc positive; fluconazole through neutropenia where antifungal prophylaxis is universal, and mould-active prophylaxis for selected higher-risk patients; routine fluoroquinolone prophylaxis is called controversial, with careful monitoring and intravenous antibiotics at fever as the alternative. Fever after infusion should prompt an infection work-up and broad-spectrum antibiotics, since CRS treatment can mask infection. EBMT/JACIE 2019 differs: antiviral and Pneumocystis prophylaxis until 1 year and/or a CD4 count above 0.2 x 10^9/L, no routine antibacterial or antifungal prophylaxis, and tenofovir for a history of hepatitis B.\n\nImmunoglobulin: for B-cell cancers ASTCT measures IgG before and in the first 3 months, and considers IVIG for IgG of 400 mg/dL or less with severe or recurrent bacterial infections, and for IgG under 200 mg/dL whatever the infection history. SITC 2020 measures B cells and immunoglobulins monthly and considers replacement for high-risk adults and for children with IgG under 400 mg/dL (LE: 4). EBMT/JACIE 2019 gives replacement to children with B-cell aplasia (for example to keep IgG at 500 mg/dL or more) and recommends it for people with low immunoglobulins and recurrent infections with encapsulated bacteria, while noting no consensus on systematic replacement in adults. Vaccination (ASTCT, adults): influenza and SARS-CoV-2 vaccines from around 3 months, other inactivated vaccines considered from 6 months.",
  asOf: "2026-11-17",
  setting: {
    who: ["doctor", "nurse", "pharmacist", "patient-or-carer"],
    where: ["ward", "outpatient-clinic", "home"],
  },
  population: "Children, adolescents and adults receiving CD19- or BCMA-directed CAR T cells for haematological cancers (the scope of ASTCT 2024). Doses and durations differ in children, and the ASTCT vaccination schedule is for adults only. EBMT/JACIE 2019 and SITC 2020 were written when the approved products all targeted CD19.",
  trigger: "Planning CAR T-cell therapy, and the months after infusion.",
  steps: [
    {
      action: "Before lymphodepletion, screen for HIV, hepatitis B (HBsAg, anti-HBc, anti-HBs) and hepatitis C, test for syphilis by risk, and measure HBV DNA if HBsAg is positive",
      why: "The results decide who needs hepatitis B treatment or monitoring afterwards. The ASTCT screening table also lists CMV and HTLV-1 antibody tests as routine, and tests for tuberculosis, Strongyloides and Toxoplasma by risk.",
      source: "astct-inf-2024",
      quote: "Laboratory screening should include HIV antibodies (preferably fourth-generation antigen/antibody combination), hepatitis B virus surface antibody (anti-HBs) and antigen (HBsAg), HBV core Ab (anti-HBc), hepatitis C virus antibody (anti-HCV) with reflex nucleic acid testing if positive; Treponema pallidum testing based on risk factors (screening per institutional guidelines with treponemal or nontreponemal testing).",
    },
    {
      action: "Prevent herpes simplex and varicella zoster (shingles) with aciclovir or valaciclovir from lymphodepletion until at least 6 months after infusion",
      why: "ASTCT cites a report in which as many as 50% of patients had herpes virus infections, particularly varicella zoster, when no antiviral prophylaxis was given. Its table gives aciclovir 400 mg or valaciclovir 500 mg by mouth twice daily. Children are usually given a shorter course.",
      source: "astct-inf-2024",
      quote: "HSV and VZV should be prevented with acyclovir or valacyclovir from the start of lymphodepletion therapy until at least 6 mo postinfusion.",
    },
    {
      action: "Give trimethoprim-sulfamethoxazole (co-trimoxazole) against Pneumocystis after infusion, starting at neutrophil recovery and by day 30 at the latest, until at least 6 months",
      why: "In the study ASTCT cites, 2 of 40 patients developed Pneumocystis pneumonia within 6 months when prophylaxis was routinely stopped at 3 months, and all needed mechanical ventilation. ASTCT says it is not known whether the CD4 count should guide stopping, and that some centres use a threshold of 200 cells per cubic millimetre. Its table lists dapsone, atovaquone and pentamidine as alternatives, considered when blood counts stay low.",
      source: "astct-inf-2024",
      quote: "Prophylaxis against Pneumocystis jirovecii (PJP) with trimethoprim-sulfamethoxazole (TMP/SMX) is recommended to start post-CAR T cell infusion until at least 6 mo.",
    },
    {
      action: "Give entecavir 0.5 mg once daily to people who are HBsAg positive, from lymphodepletion until at least 12 months after infusion",
      why: "ASTCT warns that stopping early can lead to fatal reactivation of hepatitis B. EBMT/JACIE 2019 names a different medicine, tenofovir, for anyone with a history of hepatitis B.",
      source: "astct-inf-2024",
      quote: "Patients who test positive for hepatitis B surface antigen (HBsAg) should receive entecavir 0.5 mg once daily beginning at lymphodepletion chemotherapy until at least ≥12 mo post-CAR T; early discontinuation can lead to fatal reactivation",
    },
    {
      action: "For people who are HBsAg negative and anti-HBc positive, either give hepatitis B prophylaxis or check HBV DNA and liver enzymes monthly and treat if the virus reactivates",
      why: "ASTCT reasons by extrapolation from stem cell transplantation, where this group had a 40.8% risk of reactivation over 2 years, and offers the two approaches without choosing between them.",
      source: "astct-inf-2024",
      quote: "be monitored with monthly HBV DNA and liver enzymes to detect early reactivation and, if so, initiate treatment",
    },
    {
      action: "Where the centre gives antifungal prophylaxis to everyone, give fluconazole from lymphodepletion until neutrophils recover, and consider mould-active prophylaxis for selected patients at higher risk",
      why: "ASTCT reports invasive fungal infection rates from 0% to 15% across studies, and names persistent neutropenia, severe CRS and high-dose corticosteroids among the risk factors. EBMT/JACIE 2019 does not recommend antifungal prophylaxis routinely.",
      source: "astct-inf-2024",
      quote: "For centers that practice universal antifungal prophylaxis, fluconazole can begin with lymphodepletion to cover the neutropenic period until neutrophil recovery.",
    },
    {
      action: "Follow local policy on antibacterial prophylaxis: either a fluoroquinolone during neutropenia, or careful monitoring with intravenous antibiotics at the first fever",
      why: "ASTCT calls routine prophylaxis controversial. It says a fluoroquinolone can be considered for outpatients until neutrophils recover (above 0.5 x 10^9/L on 2 consecutive days), that inpatient centres might instead monitor carefully, and that none of the paediatric studies used prophylaxis. EBMT/JACIE 2019 does not recommend it routinely; SITC 2020 says all patients with persistent neutropenia should have it.",
      source: "astct-inf-2024",
      quote: "Routine prophylaxis with fluoroquinolones (alternatively 3rd generation oral cephalosporins) remains controversial",
    },
    {
      action: "Investigate fever after infusion for infection promptly and start broad-spectrum antibiotics",
      why: "ASTCT says treatment for CRS may alter or mask the signs of infection, especially while neutrophils are low, and that bacterial infections predominate early. Its text applies this to fever in the first 30 days, whatever the neutrophil count.",
      source: "astct-inf-2024",
      quote: "Fevers after CAR T-cell infusion should warrant prompt infectious workup and initiation of broad-spectrum antibiotics.",
    },
    {
      action: "Tell the patient and carer to call the team or get emergency help straight away for a temperature of 38°C or higher",
      why: "The medication guide for one CAR T-cell product lists fever first among the symptoms that need urgent contact. Its label tells clinicians to advise patients to seek immediate attention for signs of CRS, which include fever, and for signs of infection.",
      source: "yescarta-label-2026",
      quote: "Call or see your healthcare provider or get emergency help right away if you get any of the following:",
    },
    {
      action: "For B-cell cancers, measure serum IgG before CAR T cells and during the first 3 months afterwards",
      why: "ASTCT reports low antibody levels in 23% to 81% of patients after CD19 CAR T cells, lasting 18 months or more in up to 44%, and says this may raise the risk of infection, especially with encapsulated bacteria.",
      source: "astct-inf-2024",
      quote: "For B cell malignancies, we recommend measuring serum immunoglobulin G (IgG) before and in the first 3 mo after CAR T-cell therapy.",
    },
    {
      action: "Measure B-cell counts and serum immunoglobulins monthly after CAR T cells (SITC)",
      why: "SITC notes that almost all patients who respond to CD19 CAR T cells lose their normal B cells, and that B-cell aplasia and low immunoglobulins can persist for several years.",
      source: "sitc-iec-2020",
      quote: "Following CAR T cell therapy, B cell counts and serum immunoglobulins should be measured monthly",
      grade: "LE: 4",
    },
    {
      action: "Consider immunoglobulin replacement when IgG is 400 mg/dL or less with severe or recurrent bacterial infections, or when IgG is below 200 mg/dL",
      why: "ASTCT says randomised trial evidence for immunoglobulin after CAR T cells is lacking and aligns its advice with guidance written for stem cell transplantation. The adult dose it gives is 400 to 500 mg/kg every 3 to 4 weeks, aiming for a trough IgG above 600 mg/dL. Beyond 3 months, people at 400 mg/dL or less who have no infections may be tried off it with close monitoring.",
      source: "astct-inf-2024",
      quote: "IVIG can also be considered when IgG < 200 mg/dL, particularly when associated with extremely low IgA levels, irrespective of the time from CAR T-cell infusion and the incidence and severity of infections",
    },
    {
      action: "In children with B-cell aplasia, give immunoglobulin replacement to keep IgG at or above the institutional threshold",
      why: "EBMT says replacement after CAR T cells has been standard practice in paediatric centres, and that there is no consensus on systematic replacement in adults, who have long-lived plasma cells that go on making antibody. ASTCT says there is no evidence that stopping immunoglobulin in children is safe.",
      source: "ebmt-2019",
      quote: "Children with B-cell aplasia should receive immunoglobulin replacement to maintain IgG levels according to institutional guidelines for IgG substitution (i.e. ≥500mg/dL).",
    },
    {
      action: "Plan vaccination: start influenza and SARS-CoV-2 vaccines around 3 months after infusion, and consider other inactivated vaccines from 6 months in adults in remission",
      why: "ASTCT says vaccine responses may be weaker after CAR T cells but can still be raised. Its schedule is for adults only and is largely extrapolated from transplantation; it holds the recombinant shingles vaccine until at least 1 year. The Yescarta label says live virus vaccines are not recommended until immune recovery. EBMT/JACIE 2019 made no specific recommendation.",
      source: "astct-inf-2024",
      quote: "For endemic or seasonal infections (e.g., influenza and SARS-CoV-2), vaccinations should be started around 3 mo after CAR T-cell therapy.",
    },
  ],
  bestInClass: {
    statement: "ASTCT 2024, the most recent and most specific source read, sets antiviral prophylaxis for herpes viruses and Pneumocystis prophylaxis each for at least 6 months, entecavir for at least 12 months for HBsAg-positive people, prophylaxis or monthly monitoring for people who are HBsAg negative and anti-HBc positive, risk-adapted antifungal prophylaxis, and calls routine antibacterial prophylaxis controversial. The sources differ on four points. Duration: EBMT/JACIE 2019 continues antiviral and Pneumocystis prophylaxis until 1 year and/or a CD4 count above 0.2 x 10^9/L. Antibacterial prophylaxis: EBMT/JACIE 2019 does not recommend it routinely, while SITC 2020 says all patients with persistent neutropenia should have antibacterial and antifungal prophylaxis. Hepatitis B: ASTCT names entecavir and EBMT/JACIE tenofovir. Immunoglobulin: ASTCT considers IVIG at IgG of 400 mg/dL or less with severe or recurrent bacterial infection, or below 200 mg/dL whatever the infection history; SITC 2020 considers it for high-risk adults and for children under 400 mg/dL (LE: 4); EBMT/JACIE 2019 gives it to children with B-cell aplasia and recommends it for people with low immunoglobulins and recurrent infections with encapsulated bacteria. ASTCT says its evidence is largely retrospective and that most centres extrapolate from stem cell transplantation.",
    sources: ["astct-inf-2024", "sitc-iec-2020", "ebmt-2019"],
  },
  variants: [
    {
      name: "Prophylaxis to one year or a CD4 count (EBMT/JACIE 2019)",
      differs: "Valaciclovir 500 mg twice daily or aciclovir 800 mg twice daily, and co-trimoxazole 480 mg once daily or 960 mg three times a week, from lymphodepletion until 1 year after infusion and/or until the CD4 count is above 0.2 x 10^9/L; co-trimoxazole can be started later by centre guidelines. Antibacterial prophylaxis is not recommended, though it can be considered in prolonged neutropenia; antifungal prophylaxis is not recommended routinely.",
      evidence: "Expert best practice recommendations (Table 10); not graded.",
      sources: ["ebmt-2019"],
    },
    {
      name: "Tenofovir for hepatitis B (EBMT/JACIE 2019)",
      differs: "Recommends tenofovir prophylaxis for a history of hepatitis B, where ASTCT 2024 names entecavir 0.5 mg daily from lymphodepletion until at least 12 months for HBsAg-positive people.",
      evidence: "Expert recommendations in both; no comparison. EBMT notes that little is known about reactivation because people with hepatitis B were excluded from the trials.",
      sources: ["ebmt-2019", "astct-inf-2024"],
    },
    {
      name: "Immunoglobulin for high-risk adults and for children under 400 mg/dL (SITC 2020)",
      differs: "Considers immunoglobulin supplementation for adults judged at high risk or with recurrent infections and for children with IgG under 400 mg/dL; home subcutaneous immunoglobulin may be considered for B-cell aplasia lasting more than 6 months in people already on replacement.",
      evidence: "LE: 4.",
      sources: ["sitc-iec-2020"],
    },
    {
      name: "Pneumocystis prophylaxis for all, risk-adjusted for the rest (SITC 2020)",
      differs: "Says all patients should have Pneumocystis prophylaxis, that herpes virus prophylaxis can be considered, and that antibacterial and antifungal prophylaxis should be strongly considered with high-risk features and given to all patients with persistent neutropenia. It gives no durations.",
      evidence: "Panel recommendations adapted from transplantation guidelines; printed without a level of evidence.",
      sources: ["sitc-iec-2020"],
    },
    {
      name: "Shorter antiviral prophylaxis in children (ASTCT 2024)",
      differs: "Reports that children are usually given shorter antiviral prophylaxis, often 3 months (range 1 to 6 in clinical studies), and that antibacterial prophylaxis is not universally recommended in children, adolescents and young adults.",
      evidence: "Expert panel best practice considerations.",
      sources: ["astct-inf-2024"],
    },
  ],
  grades: [
    { claim: "B-cell counts and immunoglobulins measured monthly after CAR T cells", grade: "LE: 4", source: "sitc-iec-2020" },
    { claim: "Immunoglobulin for high-risk adults and children with IgG under 400 mg/dL", grade: "LE: 4", source: "sitc-iec-2020", quote: "For adult patients deemed to be at high risk of infections or with recurrent infections and for children with serum IgG levels less than 400 mg/dL, immunoglobulin supplementation should be considered" },
    { claim: "Antiviral and Pneumocystis prophylaxis for at least 6 months", grade: "best practice consideration (expert panel; not graded)", source: "astct-inf-2024" },
  ],
  sources: [
    { key: "astct-inf-2024", label: "Best Practice Considerations by The American Society of Transplant and Cellular Therapy: Infection Prevention and Management After Chimeric Antigen Receptor T Cell Therapy for Hematological Malignancies", publisher: "ASTCT Infectious Diseases Special Interest Group, Transplantation and Cellular Therapy", year: 2024, url: "https://europepmc.org/article/PMC/PMC12826105", doi: "10.1016/j.jtct.2024.07.018", gradingScheme: "Expert panel best practice considerations synthesising mostly retrospective evidence; not graded.", read: "full-text", accessed: "2026-11-17" },
    { ...SITC_IEC_2020, accessed: "2026-11-17" },
    { ...EBMT_2019, accessed: "2026-11-17" },
    { key: "yescarta-label-2026", label: "YESCARTA (axicabtagene ciloleucel) US prescribing information, revised 07/2026, with its Medication Guide", publisher: "Kite Pharma; US Food and Drug Administration", year: 2026, url: "https://www.fda.gov/media/108377/download", gradingScheme: "Regulatory prescribing information; not graded.", read: "full-text", accessed: "2026-11-17" },
  ],
  upgrades: [],
  gaps: [
    "EBMT/JACIE 2019 is not the current European edition. The EBMT/JACIE/EHA 2022 recommendations (Annals of Oncology, doi 10.1016/j.annonc.2021.12.003) replace it, and on 16 and 17 November 2026 their full text was not open to a script (Europe PMC lists it as subscription only), so the European positions given here on prophylaxis duration, antibacterial prophylaxis, tenofovir and immunoglobulin are those of the 2019 edition and may have changed.",
    "A 2026 Australian consensus statement on preventing infections after CD19 CAR T cells for lymphoma (Internal Medicine Journal, doi 10.1111/imj.70644) and the 2021 French (SFGM-TC) recommendations (Bulletin du Cancer) were tried again on 17 November 2026: Europe PMC lists both as subscription only and the Australian publisher page refused a script, so neither was read.",
    "The urgent advice on fever for patients comes from the US medication guide of one product (axicabtagene ciloleucel); the guidelines read here are written for clinicians and give no patient symptom list or time limit. The ASTCT fever flow diagram (Figure 2) is an image and was not read.",
    "The ASTCT vaccination schedule (Table 4) is for adults; ASTCT gives no paediatric schedule for lack of data. The sentence in the author manuscript on when live vaccines may be considered is garbled, so only its 1 year minimum for the recombinant shingles vaccine is repeated here. EBMT/JACIE 2019 made no specific recommendation on vaccination.",
    "ASTCT says there is insufficient data to recommend CMV prophylaxis and does not recommend routine monitoring for CMV, EBV or HHV-6; weekly CMV testing in the first 2 to 6 weeks can be considered for people at high risk. This is not set out as a step.",
    "There are no randomised trials of immunoglobulin replacement after CAR T cells, and no clinical trials of antimicrobial prophylaxis (ASTCT).",
  ],
  drugs: ["human-normal-immunoglobulin", "axicabtagene-ciloleucel", "tisagenlecleucel", "lisocabtagene-maraleucel", "brexucabtagene-autoleucel", "idecabtagene-vicleucel", "ciltacabtagene-autoleucel", "obecabtagene-autoleucel", "valaciclovir", "tenofovir"],
  technologies: ["car-t"],
  terms: ["lymphoma-tx-immunoglobulin-replacement", "hbv-hcv"],
  related: ["crs-grading-and-management", "icans-grading-and-management", "bispecific-step-up-dosing"],
  tags: ["protocol", "cell-therapy", "car-t", "infection"],
});
