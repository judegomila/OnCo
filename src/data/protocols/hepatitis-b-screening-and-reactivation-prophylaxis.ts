import { protocol } from "./helpers";

/*
 * Hepatitis B: testing before systemic anticancer treatment, and antiviral prophylaxis or monitoring to prevent
 * reactivation.
 *
 * First written on 11 November 2026. Second accuracy pass on 17 November 2026: every source was fetched again as raw
 * text with curl and every claim re-read against it; the quotes were checked verbatim by script.
 * - ASCO Provisional Clinical Opinion update 2020 (Hwang et al., J Clin Oncol 2020): the author manuscript on PubMed
 *   Central (PMC11828660), full-text XML from NCBI's E-utilities API (the Europe PMC endpoint answered HTTP 500),
 *   including Table 1, the algorithm footnotes and the graded recommendations. Europe PMC title searches (2020 to
 *   2026) found no later ASCO update.
 * - APASL 2021 guideline on hepatitis B reactivation with immunosuppressive therapy (Lau et al., Hepatol Int 2021),
 *   open access, full-text XML from Europe PMC (PMC8382940). Its 2022 correction (PMC9119228) was read: it changes
 *   one author's name only.
 * - AASLD 2018 hepatitis B guidance (Terrault et al., Hepatology 2018): author manuscript on PubMed Central
 *   (PMC5975958), full-text XML from E-utilities. Added in the second pass.
 * - AASLD and IDSA practice guideline on chronic hepatitis B (Hepatology, online November 2025): full text from the
 *   publisher's page (journals.lww.com), read to see whether it replaces the 2018 reactivation guidance. It does not.
 * - NICE CG165 (published June 2013, last updated 20 October 2017): the recommendations page on nice.org.uk. Added in
 *   the second pass.
 * - AGA 2025 guideline on hepatitis B reactivation (Gastroenterology 2025): abstract only, from Europe PMC; the
 *   publisher's page returned HTTP 403.
 * - EASL 2025 Clinical Practice Guidelines on hepatitis B (J Hepatol 2025): abstract only, from Europe PMC. The
 *   publisher's full text returned HTTP 403 again on 17 November 2026; no step rests on it.
 * - APASL's 2026 update of its general chronic hepatitis B guideline (Hepatol Int 2026) exists; the publisher's page
 *   returned a browser challenge and only the abstract was read. It is named in gaps and nothing rests on it.
 * Every DOI was resolved through Crossref and Europe PMC and its title checked. Quotes are copied from the raw text
 * with line breaks joined and nothing else changed.
 */
export const hepatitisBScreeningAndReactivationProphylaxis = protocol({
  id: "hepatitis-b-screening-and-reactivation-prophylaxis",
  name: "Hepatitis B testing before cancer treatment and prevention of reactivation",
  aka: ["HBV screening before chemotherapy", "hepatitis B reactivation prophylaxis", "HBV reactivation", "anti-HBc positive before rituximab", "entecavir prophylaxis"],
  domain: "infection-prevention",
  tldr: "Hepatitis B can sleep in the liver for years and wake up when cancer treatment weakens the immune system, sometimes damaging the liver badly. A blood test before treatment finds people at risk. Those who have it, or have had it and get high-risk treatment such as rituximab or a stem cell transplant, take an antiviral tablet during and for at least a year after treatment, or are checked closely.",
  simple: "Before cancer treatment, you should have a blood test for hepatitis B. If it shows the virus now or in the past, you may need an antiviral tablet to keep it asleep, or regular blood tests to watch for it. Your treatment does not need to wait for the result.",
  summary: "ASCO's 2020 Provisional Clinical Opinion moved from risk-based to universal testing: everyone anticipating systemic anticancer therapy has HBsAg, anti-HBc (total Ig or IgG) and anti-HBs before or at the start of treatment, without delaying it (strong). Chronic HBV (HBsAg-positive) on any systemic anticancer therapy gets antiviral prophylaxis for the whole of treatment and at least 12 months after, with ALT and HBV DNA at baseline and every 6 months during antiviral therapy, ALT at least monthly for 3 months after antivirals stop and every 3 months after that, and a clinician experienced in HBV (strong). Past HBV (HBsAg-negative, anti-HBc-positive) with anti-CD20 antibodies or stem cell transplant gets prophylaxis from the start and for at least 12 months after (strong), or, where follow-up can be relied on, HBsAg and HBV DNA every 3 months with antivirals at the first sign of reactivation (HBsAg appears or HBV DNA above 1,000 IU/mL). Past HBV with other regimens is monitored with HBsAg and ALT every 3 months. Hormonal therapy alone follows national HBV guidance independent of cancer therapy (moderate). ASCO prefers entecavir, tenofovir disoproxil or tenofovir alafenamide and asks for an HIV test before any of them is started, because they also act against HIV.\n\nThe liver societies differ on duration and on who is treated. AASLD 2018 continues prophylaxis for at least 6 months after treatment, or at least 12 months after anti-CD20 therapy, and checks HBV DNA every 1 to 3 months in people monitored without prophylaxis. APASL 2021 stratifies by the risk of the immunosuppressive therapy and by liver fibrosis, prefers entecavir, tenofovir or TAF (evidence I, recommendation 1), and considers stopping nucleos(t)ide analogues 6 months after immunosuppression ends in selected patients. NICE CG165 (2013, last updated 2017) sets a minimum of 6 months after immunosuppression stops for most groups and still offers lamivudine to HBsAg-negative, anti-HBc-positive people starting rituximab. This page gives no doses. Anti-HBc can be falsely positive after intravenous immunoglobulin, so testing before IVIG is simpler to read.",
  asOf: "2026-11-17",
  setting: {
    who: ["doctor", "nurse", "pharmacist"],
    where: ["outpatient-clinic", "chemotherapy-day-unit"],
  },
  population: "People with cancer about to start systemic anticancer therapy, as ASCO scopes it; ASCO names its target population as newly diagnosed patients receiving anticancer therapy. APASL and AASLD cover anyone starting immunosuppressive therapy, and NICE covers people already known to be HBsAg or anti-HBc positive. ASCO does not say adults only, but its evidence search excluded studies of children, and it makes no recommendation for children; APASL's guideline does not mention them.",
  trigger: "Systemic anticancer therapy is being planned.",
  steps: [
    {
      action: "Test everyone due to start systemic anticancer therapy for hepatitis B with HBsAg, anti-HBc (total or IgG) and anti-HBs, before or at the start of treatment",
      why: "Asking about risk factors misses people: in one study ASCO cites, about a fifth of those with chronic hepatitis B had no known risk factor. Testing everyone could find all the people whose virus could reactivate.",
      source: "asco-pco-2020",
      quote: "All patients with cancer anticipating systemic anticancer therapy should be tested for hepatitis B virus (HBV) by three tests--hepatitis B surface antigen (HBsAg), hepatitis B core antibody (anti-HBc) total immunoglobulin (Ig) or IgG, and antibody to hepatitis B surface antigen (anti-HBs) prior to, or at the beginning of, systemic anticancer therapy.",
      grade: "Strength of recommendation: strong",
    },
    {
      action: "Do not hold back cancer treatment while waiting for the results",
      why: "ASCO does not want the test to hold up cancer treatment; the antiviral can be given alongside the cancer drugs.",
      source: "asco-pco-2020",
      quote: "Anticancer therapy should not be delayed for the results of these screening tests.",
      grade: "Strength of recommendation: strong",
    },
    {
      action: "Order anti-HBc as total Ig or IgG, not IgM, and read it with caution after intravenous immunoglobulin",
      why: "IgM is a test for a new (acute) infection; immunoglobulin infusions can carry anti-HBc and give a false positive.",
      source: "asco-pco-2020",
      quote: "anti-HBc testing after IVIG should be interpreted with caution.",
    },
    {
      action: "For chronic hepatitis B (HBsAg positive), give antiviral prophylaxis throughout any systemic anticancer therapy and for at least 12 months after it ends",
      why: "Without it the virus can reactivate and damage the liver; ASCO puts the risk at about half of people with chronic hepatitis B and a blood cancer.",
      source: "asco-pco-2020",
      quote: "Patients with chronic HBV receiving any systemic anticancer therapy should receive antiviral prophylactic therapy for the duration of anticancer therapy, as well as for at least 12 months after receipt of the last anticancer therapy.",
      grade: "Strength of recommendation: strong",
    },
    {
      action: "Choose an antiviral with a high barrier to resistance: entecavir, tenofovir disoproxil or tenofovir alafenamide",
      why: "Lamivudine has a low barrier to resistance, so in some people the virus becomes resistant and prophylaxis stops working. ASCO and AASLD prefer the same three drugs; NICE's older guidance still uses lamivudine in some groups.",
      source: "apasl-2021",
      quote: "4.3 Preferred NUCs include entecavir, tenofovir and TAF",
      grade: "evidence I, recommendation 1",
    },
    {
      action: "Check ALT and HBV DNA at baseline and every 6 months on antivirals, then ALT at least monthly for 3 months after the antiviral stops and every 3 months after that",
      why: "Hepatitis can flare when the antiviral is withdrawn, so the months after stopping need closer checks.",
      source: "asco-pco-2020",
      quote: "As such, ALT levels should be monitored frequently, at least monthly for the first 3 months after the cessation of antiviral therapy and every 3 months thereafter.",
    },
    {
      action: "Share the care of anyone with chronic hepatitis B with a clinician experienced in managing it",
      why: "They watch for flares when the antiviral stops, decide how long antivirals continue and check for cirrhosis and liver cancer.",
      source: "asco-pco-2020",
      quote: "Coordination of care with a clinician experienced in HBV management is recommended for patients with chronic HBV to determine HBV monitoring and long-term antiviral therapy after completion of anticancer therapy.",
    },
    {
      action: "For past hepatitis B (HBsAg negative, anti-HBc positive) with an anti-CD20 antibody or a stem cell transplant, start prophylaxis with the cancer treatment and continue it for at least 12 months after",
      why: "These are the treatments with an established high risk of waking a past infection.",
      source: "asco-pco-2020",
      quote: "Patients with past HBV receiving anticancer therapies associated with an established high risk of HBV reactivation, such as anti-CD20 monoclonal antibodies or stem-cell transplantation, should be started on antiviral prophylaxis at the beginning of anticancer therapy and continued on antiviral therapy for at least 12 months after the cessation of anticancer therapy.",
      grade: "Strength of recommendation: strong",
    },
    {
      action: "For past hepatitis B with other regimens, check HBsAg and ALT every 3 months during treatment and start an antiviral only if HBsAg returns or HBV DNA exceeds 1,000 IU/mL with a flare",
      why: "ASCO says the reactivation risk with other cancer drugs is unclear and may be low, so it asks for watching, not tablets.",
      source: "asco-pco-2020",
      quote: "Patients with past HBV undergoing anticancer therapies that are not clearly associated with a high risk of HBV reactivation (eg, regimens that do not include anti-CD20 monoclonal antibodies or stem-cell transplantation) should be followed carefully during cancer treatment, with HBsAg and ALT testing every 3 months (with subsequent HBV DNA testing if a hepatitis flare develops), with initiation of antiviral therapy only if HBsAg becomes positive or HBV DNA exceeds 1,000 IU/mL in the setting of a hepatitis flare.",
      grade: "Strength of recommendation: strong",
    },
    {
      action: "For hormonal therapy alone, follow national hepatitis B guidance, independent of the cancer treatment, and reassess if treatment changes",
      why: "Hormone treatment on its own is unlikely to raise the risk of reactivation. ASCO notes that hormone treatment given with steroids, such as abiraterone with prednisone, could carry more risk.",
      source: "asco-pco-2020",
      quote: "Hormonal therapy without systemic anticancer therapy is unlikely to increase the risk of HBV reactivation in patients with chronic or past HBV.",
      grade: "Strength of recommendation: moderate",
    },
  ],
  bestInClass: {
    statement: "Test everyone before systemic anticancer therapy with HBsAg, anti-HBc and anti-HBs, without delaying treatment (ASCO 2020, strong; APASL 2021 also screens all patients planned for immunosuppressive therapy with the same three tests, evidence II-2, recommendation 1; AASLD 2018 tests everyone with HBsAg and anti-HBc and says the role of anti-HBs is not yet established). Give a high-barrier antiviral (entecavir, tenofovir disoproxil or TAF), which ASCO, AASLD and APASL all prefer. On ASCO's rule, everyone with chronic hepatitis B on systemic therapy is treated, and so are people with past infection on anti-CD20 antibodies or stem cell transplant. Where they differ: ASCO continues prophylaxis for at least 12 months after the last anticancer treatment; AASLD says at least 6 months, or at least 12 months after anti-CD20 therapy; NICE says a minimum of 6 months for most groups; APASL considers stopping 6 months after immunosuppression ends for HBsAg-positive patients without advanced fibrosis or cirrhosis, for those with HBV DNA below 2,000 IU/ml before the antiviral was started, and for those who remain HBsAg negative. APASL also asks for a hepatologist's fibrosis assessment in every positive patient, treats anyone with advanced fibrosis or cirrhosis whatever the drug risk, and monitors, without prophylaxis, HBsAg-positive patients on low-risk therapy who have no advanced fibrosis, where ASCO treats every HBsAg-positive patient. For HBsAg-negative, anti-HBc-positive patients APASL's high-risk group is anti-CD20 antibodies and allogeneic transplant; it places autologous transplant in the moderate group, where ASCO and AASLD do not separate the two. ASCO allows close monitoring every 3 months in place of prophylaxis for past infection on high-risk therapy where follow-up is reliable.",
    sources: ["asco-pco-2020", "apasl-2021", "aasld-2018", "nice-cg165"],
  },
  variants: [
    {
      name: "Risk stratified by drug and liver fibrosis (APASL 2021)",
      differs: "Sorts each immunosuppressive therapy into high (above 10%), moderate (1 to 10%) or low (below 1%) risk of reactivation. Gives pre-emptive antivirals to all HBsAg-positive or anti-HBc-positive patients in the high-risk group, to all HBsAg-positive patients and to anti-HBc-positive patients with advanced fibrosis or cirrhosis in the moderate group, and only to those with advanced fibrosis or cirrhosis in the low group. Monitors liver tests every 12 weeks in the rest, testing HBsAg and HBV DNA if ALT rises above twice baseline, and considers stopping antivirals 6 months after immunosuppression ends.",
      evidence: "APASL says it graded by the GRADE system; pre-emptive antivirals in the high-risk group are evidence I, recommendation 1; stopping at 6 months is evidence II-2, recommendation 1; monitoring in the low-risk group is evidence II-2, recommendation 2.",
      sources: ["apasl-2021"],
    },
    {
      name: "Six months after treatment, twelve after anti-CD20 antibodies (AASLD 2018)",
      differs: "Tests HBsAg and anti-HBc (total or IgG) in everyone before any immunosuppressive, cytotoxic or immunomodulatory therapy. HBsAg-positive patients start prophylaxis before treatment. HBsAg-negative, anti-HBc-positive patients could be monitored with ALT, HBV DNA and HBsAg and treated on demand, except with anti-CD20 antibodies or stem cell transplant, where prophylaxis is recommended. Prophylaxis continues for at least 6 months after treatment ends, or at least 12 months after anti-CD20 therapy. People monitored without prophylaxis have HBV DNA every 1 to 3 months.",
      evidence: "Consensus guidance statements with no grades: AASLD says the 2018 guidance was developed without formal systematic review or GRADE. The AASLD and IDSA guideline published in November 2025 answers six other questions and says the 2018 recommendations on other topics continue to apply.",
      sources: ["aasld-2018", "aasld-idsa-2025"],
    },
    {
      name: "UK guidance for people already known to be positive (NICE CG165)",
      differs: "Does not say who to test. In people who are HBsAg or anti-HBc positive, tests anti-HBs, HBV DNA and ALT before immunosuppressive therapy or chemotherapy. HBsAg positive with HBV DNA above 2,000 IU/ml: offer entecavir or tenofovir disoproxil. HBsAg positive with HBV DNA below 2,000 IU/ml: offer prophylaxis, considering lamivudine if immunosuppression is expected to last less than 6 months and entecavir or tenofovir disoproxil if longer. HBsAg negative, anti-HBc positive and starting rituximab or another B cell-depleting therapy: offer lamivudine. HBsAg negative, anti-HBc positive, anti-HBs negative and not on B cell-depleting therapy: monitor HBV DNA monthly and offer prophylaxis if it becomes detectable. Prophylaxis runs for a minimum of 6 months after immunosuppression stops; for HBsAg-positive people with HBV DNA above 2,000 IU/ml it runs for a minimum of 6 months after HBeAg seroconversion and HBV DNA is undetectable. People who are anti-HBc and anti-HBs positive and not on B cell-depleting therapy are not offered prophylaxis.",
      evidence: "NICE prints no grades. The guideline was published in June 2013 and last updated on 20 October 2017, before the AASLD 2018, ASCO 2020 and APASL 2021 documents read here, all of which prefer high-barrier antivirals; NICE marks this use of entecavir, lamivudine and tenofovir disoproxil off-label in June 2013.",
      sources: ["nice-cg165"],
    },
    {
      name: "Monitoring instead of prophylaxis for past infection on high-risk therapy (ASCO alternative)",
      differs: "HBsAg and HBV DNA every 3 months during and up to 12 months after treatment, with antivirals started immediately if HBsAg appears or HBV DNA exceeds 1,000 IU/mL. If HBV DNA is quantifiable but below 1,000 IU/mL, ASCO says repeat testing at monthly intervals may be indicated.",
      evidence: "Offered by ASCO only where patients and clinicians can keep to frequent, consistent follow-up; part of a strong, informal-consensus recommendation.",
      sources: ["asco-pco-2020"],
    },
    {
      name: "Three risk tiers with graded strength (AGA 2025, abstract only)",
      differs: "Recommends antiviral prophylaxis for people at high risk of reactivation and, conditionally, for those at moderate risk; for those at low risk it conditionally recommends monitoring alone, at 1 to 3 month intervals, with hepatitis B viral load as well as ALT.",
      evidence: "GRADE: strong for prophylaxis at high risk, conditional for the other two. Only the abstract could be read, so which drugs fall in each tier and how long prophylaxis lasts are not stated here.",
      sources: ["aga-2025"],
    },
    {
      name: "Risk-based testing (earlier ASCO opinions, and AGA in 2015)",
      differs: "Tests only people with risk factors for hepatitis B or those due to receive anti-CD20 antibodies or a stem cell transplant (ASCO 2015). ASCO's table records that AGA's 2015 guideline screened patients at high risk of infection or at moderate or high risk of reactivation.",
      evidence: "ASCO replaced this with universal testing in 2020 on the basis of prospective cohorts in which risk-factor questions missed infected patients or flagged nearly everyone; no randomised trial compares the two, and ASCO says such a trial is considered unethical. AGA's 2025 abstract says stratifying screening by reactivation risk is no longer needed. Of the six cost-effectiveness analyses ASCO found, those in solid tumours were less consistent: two found universal testing cost-effective and two did not.",
      sources: ["asco-pco-2020", "aga-2025"],
    },
  ],
  grades: [
    { claim: "Universal three-test HBV screening before systemic anticancer therapy", grade: "Type: evidence-based; benefits outweigh harms; Strength of recommendation: strong", source: "asco-pco-2020" },
    { claim: "Antiviral prophylaxis for chronic HBV throughout and for at least 12 months after anticancer therapy", grade: "Type of recommendation: informal consensus, benefits outweigh harms; Strength of recommendation: strong", source: "asco-pco-2020" },
    { claim: "Hormonal therapy alone follows non-cancer HBV guidance", grade: "Type: informal consensus; benefits outweigh harms; Strength of recommendation: moderate", source: "asco-pco-2020" },
    { claim: "Screen all patients planned to receive immunosuppressive therapy", grade: "evidence II-2, recommendation 1", source: "apasl-2021", quote: "All patients planned to receive immunosuppressive therapy should be screened." },
    { claim: "Pre-emptive nucleos(t)ide analogues for all HBsAg-positive or anti-HBc-positive patients in the high-risk group", grade: "evidence I, recommendation 1", source: "apasl-2021" },
    { claim: "Prophylaxis for at least 6 months after immunosuppressive therapy, or at least 12 months after anti-CD20 therapy", grade: "Not graded (consensus guidance statement)", source: "aasld-2018", quote: "Once started, anti-HBV prophylaxis should continue during immunosuppressive therapy and for at least 6 months (or for at least 12 months for patients receiving anti-CD20 therapies) after completion of immunosuppressive therapy." },
  ],
  sources: [
    { key: "asco-pco-2020", label: "Hepatitis B Virus Screening and Management for Patients With Cancer Prior to Therapy: ASCO Provisional Clinical Opinion Update", publisher: "ASCO, Journal of Clinical Oncology", year: 2020, url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11828660/", doi: "10.1200/JCO.20.01757", gradingScheme: "ASCO prints the type of recommendation (evidence-based or informal consensus), the balance of benefits and harms, and the strength (strong or moderate in this document) after each recommendation.", read: "full-text", accessed: "2026-11-17" },
    { key: "apasl-2021", label: "APASL clinical practice guideline on hepatitis B reactivation related to the use of immunosuppressive therapy", publisher: "Asian Pacific Association for the Study of the Liver, Hepatology International", year: 2021, url: "https://europepmc.org/article/PMC/PMC8382940", doi: "10.1007/s12072-021-10239-x", gradingScheme: "APASL says its recommendations were graded by the GRADE system and prints each as [Grading: evidence, recommendation], with evidence I, II-2 or III and recommendation 1 or 2. The paper does not define the levels.", read: "full-text", accessed: "2026-11-17" },
    { key: "aasld-2018", label: "Update on prevention, diagnosis, and treatment of chronic hepatitis B: AASLD 2018 hepatitis B guidance", publisher: "American Association for the Study of Liver Diseases, Hepatology", year: 2018, url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5975958/", doi: "10.1002/hep.29800", gradingScheme: "None: a consensus guidance document, developed without formal systematic review or GRADE; its guidance statements carry no grades.", read: "full-text", accessed: "2026-11-17" },
    { key: "aasld-idsa-2025", label: "AASLD IDSA Practice Guideline on treatment of chronic hepatitis B", publisher: "American Association for the Study of Liver Diseases and Infectious Diseases Society of America, Hepatology", year: 2025, url: "https://doi.org/10.1097/HEP.0000000000001549", doi: "10.1097/HEP.0000000000001549", read: "full-text", accessed: "2026-11-17" },
    { key: "nice-cg165", label: "Hepatitis B (chronic): diagnosis and management. NICE clinical guideline CG165 (published June 2013, last updated October 2017)", publisher: "National Institute for Health and Care Excellence", year: 2017, url: "https://www.nice.org.uk/guidance/cg165/chapter/Recommendations", gradingScheme: "NICE does not grade its recommendations.", read: "full-text", accessed: "2026-11-17" },
    { key: "aga-2025", label: "AGA Clinical Practice Guideline on the Prevention and Treatment of Hepatitis B Virus Reactivation in At-Risk Individuals", publisher: "American Gastroenterological Association, Gastroenterology", year: 2025, url: "https://doi.org/10.1053/j.gastro.2024.11.008", doi: "10.1053/j.gastro.2024.11.008", gradingScheme: "GRADE: strong or conditional recommendations.", read: "abstract", accessed: "2026-11-17" },
    { key: "easl-2025", label: "EASL Clinical Practice Guidelines on the management of hepatitis B virus infection", publisher: "European Association for the Study of the Liver, Journal of Hepatology", year: 2025, url: "https://doi.org/10.1016/j.jhep.2025.03.018", doi: "10.1016/j.jhep.2025.03.018", read: "abstract", accessed: "2026-11-17" },
  ],
  upgrades: ["idea-upgrade-hepatitis-b-testing-before-systemic-treatment"],
  gaps: [
    "The EASL 2025 guideline, whose abstract lists a section on reactivation prophylaxis, could not be read in full: on 17 November 2026 the publisher's page again returned HTTP 403 to a script. Its durations and risk categories are not stated here.",
    "The AGA 2025 guideline, which updates AGA's first guideline on this, could be read only as an abstract on 17 November 2026 (the publisher's page returned HTTP 403). Its list of which drugs are high, moderate or low risk and its duration of prophylaxis are not stated here.",
    "APASL published a 2026 update of its general chronic hepatitis B guideline (Hepatology International, 2026). On 17 November 2026 the publisher's page returned a browser challenge and only the abstract was read, so whether it changes the 2021 reactivation recommendations is not known here.",
    "ASCO found no randomised trial of universal against risk-based testing, and says the reactivation risk of anticancer drugs other than anti-CD20 antibodies and stem cell transplant cannot yet be stated accurately.",
    "The sources disagree on how long prophylaxis continues after treatment: ASCO at least 12 months; AASLD at least 6 months, or at least 12 after anti-CD20 therapy; NICE a minimum of 6 months in most groups; APASL considers stopping at 6 months in selected patients. ASCO's table records that the Indian National Association for Study of the Liver continues for at least 12 months, and 18 months after rituximab-based regimens and stem cell transplant; that guideline was not read here. ASCO adds that after anti-CD20 therapy or transplant the risk goes on rising until nearly two years after treatment.",
    "APASL's recommendation lists the conditions for stopping at 6 months in HBsAg-positive patients as separate bullets (no advanced fibrosis or cirrhosis; HBV DNA below 2,000 IU/ml before the antiviral was started), while its text joins them with 'and'. The guideline does not settle which is meant.",
    "This page gives no doses. ASCO, APASL and NICE CG165 print none for prophylaxis, and the product label is the source for them. ASCO and APASL give no paediatric doses; ASCO's table summarises an Indian National Association for Study of the Liver guideline that uses entecavir for children over 2, and entecavir or tenofovir disoproxil over 12.",
    "NICE CG165 is the UK guideline read here. It was last updated in October 2017, covers prophylaxis in people already known to be positive, and does not say who should be tested before chemotherapy; no UK national guideline on that question was found and read for this protocol.",
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
