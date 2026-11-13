import { protocol } from "./helpers";

/*
 * Hepatitis B: testing before systemic anticancer treatment, and antiviral prophylaxis or monitoring to prevent
 * reactivation.
 *
 * What was read, and how (all on 11 November 2026, fetched raw with curl into a scratch directory and read as text):
 * - ASCO Provisional Clinical Opinion update 2020 (Hwang et al., J Clin Oncol 2020): the author manuscript on PubMed
 *   Central (PMC11828660), HTML, full text including Table 1, the algorithm footnotes and the graded recommendations.
 *   A Europe PMC title search (2021 to 2026) found no later ASCO update.
 * - APASL 2021 clinical practice guideline on hepatitis B reactivation with immunosuppressive therapy (Lau et al.,
 *   Hepatol Int 2021), open access, full text from Europe PMC (PMC8382940, full-text XML).
 * - EASL 2025 Clinical Practice Guidelines on hepatitis B (J Hepatol 2025): abstract only, from Europe PMC. The
 *   publisher's full text returned a bot challenge (HTTP 403) to a script and was not read; no step rests on it.
 * Every DOI was resolved through Europe PMC and its title checked. Quotes are copied from the raw text with line breaks
 * joined and nothing else changed.
 */
export const hepatitisBScreeningAndReactivationProphylaxis = protocol({
  id: "hepatitis-b-screening-and-reactivation-prophylaxis",
  name: "Hepatitis B testing before cancer treatment and prevention of reactivation",
  aka: ["HBV screening before chemotherapy", "hepatitis B reactivation prophylaxis", "HBV reactivation", "anti-HBc positive before rituximab", "entecavir prophylaxis"],
  domain: "infection-prevention",
  tldr: "Hepatitis B can sleep in the liver for years and wake up when cancer treatment weakens the immune system, sometimes damaging the liver badly. A blood test before treatment finds people at risk. Those who have it, or have had it and get high-risk treatment such as rituximab or a stem cell transplant, take an antiviral tablet during and for at least a year after treatment, or are checked closely.",
  simple: "Before cancer treatment, you should have a blood test for hepatitis B. If it shows the virus now or in the past, you may need a daily tablet to keep it asleep. Your treatment does not need to wait for the result.",
  summary: "ASCO's 2020 Provisional Clinical Opinion moved from risk-based to universal testing: everyone anticipating systemic anticancer therapy has HBsAg, anti-HBc (total Ig or IgG) and anti-HBs before or at the start of treatment, without delaying it (strong). Chronic HBV (HBsAg-positive) on any systemic anticancer therapy gets antiviral prophylaxis for the whole of treatment and at least 12 months after, with ALT and HBV DNA at baseline and every 6 months, monthly ALT for 3 months after stopping antivirals, and a clinician experienced in HBV (strong). Past HBV (HBsAg-negative, anti-HBc-positive) with anti-CD20 antibodies or stem cell transplant gets prophylaxis from the start and for at least 12 months after (strong), or, where follow-up can be relied on, HBsAg and HBV DNA every 3 months with antivirals at the first sign of reactivation (HBsAg appears or HBV DNA above 1,000 IU/mL). Past HBV with other regimens is monitored with HBsAg and ALT every 3 months. Hormonal therapy alone follows non-cancer HBV guidance (moderate).\n\nAPASL 2021 stratifies by the risk of the immunosuppressive therapy and by liver fibrosis, prefers entecavir, tenofovir or TAF (evidence I, recommendation 1), and considers stopping nucleos(t)ide analogues 6 months after immunosuppression ends in selected patients, where ASCO says at least 12 months. Anti-HBc can be falsely positive after intravenous immunoglobulin, so testing before IVIG is simpler to read.",
  asOf: "2026-11-11",
  setting: {
    who: ["doctor", "nurse", "pharmacist"],
    where: ["outpatient-clinic", "chemotherapy-day-unit"],
  },
  population: "Adults with cancer about to start systemic anticancer therapy (chemotherapy, targeted therapy, immunotherapy, anti-CD20 antibodies, stem cell transplant), as ASCO scopes it. APASL covers anyone starting immunosuppressive therapy. Children are not addressed by ASCO; APASL's guideline names no paediatric doses.",
  trigger: "Systemic anticancer therapy is being planned.",
  steps: [
    {
      action: "Test everyone due to start systemic anticancer therapy for hepatitis B with HBsAg, anti-HBc (total or IgG) and anti-HBs, before or at the start of treatment",
      why: "Asking about risk factors misses many carriers; testing everyone finds all the people whose virus could reactivate.",
      source: "asco-pco-2020",
      quote: "All patients with cancer anticipating systemic anticancer therapy should be tested for hepatitis B virus (HBV) by three tests--hepatitis B surface antigen (HBsAg), hepatitis B core antibody (anti-HBc) total immunoglobulin (Ig) or IgG, and antibody to hepatitis B surface antigen (anti-HBs) prior to, or at the beginning of, systemic anticancer therapy.",
      grade: "Strength of recommendation: strong",
    },
    {
      action: "Do not hold back cancer treatment while waiting for the results",
      why: "The cancer is the more urgent problem, and prophylaxis can start alongside treatment.",
      source: "asco-pco-2020",
      quote: "Anticancer therapy should not be delayed for the results of these screening tests.",
    },
    {
      action: "Order anti-HBc as total Ig or IgG, not IgM, and read it with caution after intravenous immunoglobulin",
      why: "IgM is a test for a new infection; immunoglobulin infusions can carry anti-HBc and give a false positive.",
      source: "asco-pco-2020",
      quote: "anti-HBc testing after IVIG should be interpreted with caution.",
    },
    {
      action: "For chronic hepatitis B (HBsAg positive), give antiviral prophylaxis throughout any systemic anticancer therapy and for at least 12 months after it ends",
      why: "Without it the virus can flare during or after treatment and damage the liver.",
      source: "asco-pco-2020",
      quote: "Patients with chronic HBV receiving any systemic anticancer therapy should receive antiviral prophylactic therapy for the duration of anticancer therapy, as well as for at least 12 months after receipt of the last anticancer therapy.",
      grade: "Strength of recommendation: strong",
    },
    {
      action: "Choose an antiviral with a high barrier to resistance: entecavir, tenofovir disoproxil or tenofovir alafenamide",
      why: "Older drugs such as lamivudine let resistant virus emerge during long courses.",
      source: "apasl-2021",
      quote: "4.3 Preferred NUCs include entecavir, tenofovir and TAF",
      grade: "evidence I, recommendation 1",
    },
    {
      action: "Check ALT and HBV DNA at baseline and every 6 months on antivirals, then ALT at least monthly for 3 months after the antiviral stops",
      why: "Hepatitis can flare when the antiviral is withdrawn, so the months after stopping need closer checks.",
      source: "asco-pco-2020",
      quote: "As such, ALT levels should be monitored frequently, at least monthly for the first 3 months after the cessation of antiviral therapy and every 3 months thereafter.",
    },
    {
      action: "Share the care of anyone with chronic hepatitis B with a clinician experienced in managing it",
      why: "They decide how long antivirals continue and check for cirrhosis and liver cancer.",
      source: "asco-pco-2020",
      quote: "Coordination of care with a clinician experienced in HBV management is recommended for patients with chronic HBV to determine HBV monitoring and long-term antiviral therapy after completion of anticancer therapy.",
    },
    {
      action: "For past hepatitis B (HBsAg negative, anti-HBc positive) with an anti-CD20 antibody or a stem cell transplant, start prophylaxis with the cancer treatment and continue it for at least 12 months after",
      why: "These treatments carry the highest risk of waking a resolved infection.",
      source: "asco-pco-2020",
      quote: "Patients with past HBV receiving anticancer therapies associated with an established high risk of HBV reactivation, such as anti-CD20 monoclonal antibodies or stem-cell transplantation, should be started on antiviral prophylaxis at the beginning of anticancer therapy and continued on antiviral therapy for at least 12 months after the cessation of anticancer therapy.",
      grade: "Strength of recommendation: strong",
    },
    {
      action: "For past hepatitis B with other regimens, check HBsAg and ALT every 3 months during treatment and start an antiviral only if HBsAg returns or HBV DNA exceeds 1,000 IU/mL with a flare",
      why: "The reactivation risk with most other cancer drugs is unclear and probably low, so watching is enough.",
      source: "asco-pco-2020",
      quote: "Patients with past HBV undergoing anticancer therapies that are not clearly associated with a high risk of HBV reactivation (eg, regimens that do not include anti-CD20 monoclonal antibodies or stem-cell transplantation) should be followed carefully during cancer treatment, with HBsAg and ALT testing every 3 months (with subsequent HBV DNA testing if a hepatitis flare develops), with initiation of antiviral therapy only if HBsAg becomes positive or HBV DNA exceeds 1,000 IU/mL in the setting of a hepatitis flare.",
      grade: "Strength of recommendation: strong",
    },
    {
      action: "For hormonal therapy alone, follow the usual hepatitis B guidance rather than a cancer-specific plan, and reassess if treatment changes",
      why: "Hormone treatment on its own is unlikely to reactivate the virus.",
      source: "asco-pco-2020",
      quote: "Hormonal therapy without systemic anticancer therapy is unlikely to increase the risk of HBV reactivation in patients with chronic or past HBV.",
      grade: "Strength of recommendation: moderate",
    },
  ],
  bestInClass: {
    statement: "Test everyone before systemic anticancer therapy with HBsAg, anti-HBc and anti-HBs, without delaying treatment (ASCO 2020, strong; APASL 2021 also screens all patients planned for immunosuppressive therapy, evidence II-2, recommendation 1). Give a high-barrier antiviral (entecavir, tenofovir or TAF) to everyone with chronic hepatitis B on systemic therapy and to people with past infection on anti-CD20 antibodies or stem cell transplant. Where they differ: ASCO continues prophylaxis for at least 12 months after the last anticancer treatment, while APASL considers stopping 6 months after immunosuppression ends for HBsAg-positive patients without advanced fibrosis or with low HBV DNA, and for those who remain HBsAg negative; APASL also asks for a hepatologist's fibrosis assessment in every positive patient and treats anyone with advanced fibrosis or cirrhosis whatever the drug risk. ASCO allows close monitoring every 3 months in place of prophylaxis for past infection on high-risk therapy where follow-up is reliable.",
    sources: ["asco-pco-2020", "apasl-2021"],
  },
  variants: [
    {
      name: "Risk stratified by drug and liver fibrosis (APASL 2021)",
      differs: "Grades each immunosuppressive therapy as high, moderate or low risk, gives pre-emptive antivirals to all HBsAg-positive or anti-HBc-positive patients in the high-risk group and to those with advanced fibrosis or cirrhosis in the others, monitors liver tests every 12 weeks in the rest, and considers stopping antivirals 6 months after immunosuppression ends.",
      evidence: "Graded on a modified GRADE scale; pre-emptive antivirals in the high-risk group are evidence I, recommendation 1; stopping at 6 months is evidence II-2, recommendation 1.",
      sources: ["apasl-2021"],
    },
    {
      name: "Monitoring instead of prophylaxis for past infection on high-risk therapy (ASCO alternative)",
      differs: "HBsAg and HBV DNA every 3 months during and up to 12 months after treatment, with antivirals started immediately if HBsAg appears or HBV DNA exceeds 1,000 IU/mL.",
      evidence: "Offered by ASCO only where patients and clinicians can keep to frequent, consistent follow-up; part of a strong, informal-consensus recommendation.",
      sources: ["asco-pco-2020"],
    },
    {
      name: "Risk-based testing (earlier ASCO opinions, and some national guidance)",
      differs: "Tests only people with risk factors for hepatitis B or those due to receive anti-CD20 antibodies or a stem cell transplant.",
      evidence: "ASCO replaced this with universal testing in 2020 on the basis of large prospective cohorts in which risk-factor questions missed infected patients; no randomised trial compares the two, and ASCO calls one unethical. Cost-effectiveness of universal testing in solid tumours is inconsistent across six analyses.",
      sources: ["asco-pco-2020"],
    },
  ],
  grades: [
    { claim: "Universal three-test HBV screening before systemic anticancer therapy", grade: "Type: evidence-based; benefits outweigh harms; Strength of recommendation: strong", source: "asco-pco-2020" },
    { claim: "Antiviral prophylaxis for chronic HBV throughout and 12 months after anticancer therapy", grade: "Type of recommendation: informal consensus, benefits outweigh harms; Strength of recommendation: strong", source: "asco-pco-2020" },
    { claim: "Hormonal therapy alone follows non-cancer HBV guidance", grade: "Type: informal consensus; benefits outweigh harms; Strength of recommendation: moderate", source: "asco-pco-2020" },
    { claim: "Screen all patients planned to receive immunosuppressive therapy", grade: "evidence II-2, recommendation 1", source: "apasl-2021", quote: "All patients planned to receive immunosuppressive therapy should be screened." },
    { claim: "Pre-emptive nucleos(t)ide analogues for all HBsAg-positive or anti-HBc-positive patients in the high-risk group", grade: "evidence I, recommendation 1", source: "apasl-2021" },
  ],
  sources: [
    { key: "asco-pco-2020", label: "Hepatitis B Virus Screening and Management for Patients With Cancer Prior to Therapy: ASCO Provisional Clinical Opinion Update", publisher: "ASCO, Journal of Clinical Oncology", year: 2020, url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11828660/", doi: "10.1200/JCO.20.01757", gradingScheme: "ASCO prints the type of recommendation (evidence-based or informal consensus), the balance of benefits and harms, and the strength (strong, moderate, weak) after each recommendation.", read: "full-text", accessed: "2026-11-11" },
    { key: "apasl-2021", label: "APASL clinical practice guideline on hepatitis B reactivation related to the use of immunosuppressive therapy", publisher: "Asian Pacific Association for the Study of the Liver, Hepatology International", year: 2021, url: "https://europepmc.org/article/PMC/PMC8382940", doi: "10.1007/s12072-021-10239-x", gradingScheme: "Evidence I (randomised trials), II-1, II-2, II-3 or III (expert opinion); recommendation 1 (strong) or 2 (weaker), printed as [Grading: evidence, recommendation].", read: "full-text", accessed: "2026-11-11" },
    { key: "easl-2025", label: "EASL Clinical Practice Guidelines on the management of hepatitis B virus infection", publisher: "European Association for the Study of the Liver, Journal of Hepatology", year: 2025, url: "https://doi.org/10.1016/j.jhep.2025.03.018", doi: "10.1016/j.jhep.2025.03.018", read: "abstract", accessed: "2026-11-11" },
  ],
  upgrades: ["idea-upgrade-hepatitis-b-testing-before-systemic-treatment"],
  gaps: [
    "The EASL 2025 guideline, which has a section on reactivation prophylaxis, could not be read in full: the publisher's page returned a bot challenge to a script. Its durations and risk categories are not stated here.",
    "ASCO found no randomised trial of universal against risk-based testing, and the reactivation risk of most anticancer drugs other than anti-CD20 antibodies and stem cell transplant is not known.",
    "ASCO (at least 12 months) and APASL (consider stopping at 6 months in selected patients) disagree on how long prophylaxis continues after treatment.",
    "Neither guideline read here gives paediatric doses; ASCO's table summarises an Indian National Association for Study of the Liver guideline that uses entecavir for children over 2, and entecavir or tenofovir disoproxil over 12.",
    "No current UK national guideline on hepatitis B screening before chemotherapy was found and read for this protocol.",
  ],
  institutions: ["asco"],
  cancers: ["non-hodgkin-lymphoma", "dlbcl", "cll"],
  drugs: ["rituximab", "obinutuzumab", "tenofovir"],
  technologies: ["allogeneic-hsct", "autologous-stem-cell-transplant"],
  terms: ["hbv-hcv", "lymphoma-tx-hepatitis-b-reactivation"],
  related: ["lymphoma-tx-hepatitis-b-reactivation"],
  sections: ["supportive-care"],
  tags: ["protocol", "hepatitis-b", "infection-prevention"],
});
