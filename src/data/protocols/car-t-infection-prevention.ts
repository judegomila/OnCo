import { protocol } from "./helpers";
import { EBMT_2019, SITC_IEC_2020 } from "./cell-therapy-sources";

/*
 * Infection screening, antimicrobial prophylaxis and immunoglobulin replacement around CAR T-cell therapy.
 *
 * What was read, and how (11 November 2026, fetched raw and read as text):
 * - ASTCT Infectious Diseases Special Interest Group best practice considerations (Transplantation and Cellular
 *   Therapy 2024): the author manuscript in Europe PMC (PMC12826105, full-text XML), read in full including Tables 2
 *   and 3. Table text is flattened in the XML, so doses are given from the prose where possible.
 * - SITC 2020 immune effector cell guideline and EBMT/JACIE 2019 recommendations: full text (see
 *   ./cell-therapy-sources.ts).
 * DOIs resolved through Crossref. Quotes checked by script.
 */
export const carTInfectionPrevention = protocol({
  id: "car-t-infection-prevention",
  name: "Infection screening, prophylaxis and immunoglobulin replacement around CAR T-cell therapy",
  aka: ["CAR-T antimicrobial prophylaxis", "CAR T infection prevention", "IVIG after CAR T", "hypogammaglobulinaemia after CAR T", "PJP prophylaxis CAR T"],
  domain: "cell-therapy-toxicity",
  tldr: "Infections are the commonest serious problem in the months after CAR T-cell therapy. You are first tested for hepatitis B, HIV and other viruses. Afterwards most centres give tablets against shingles, cold sores and a type of pneumonia for at least six months, check antibody levels, and may give antibody infusions if they are low and infections recur. Any fever needs a call to the team at once.",
  simple: "After CAR T-cell therapy your immune system is weak for months. You will take tablets to prevent some infections and have regular blood tests. Ring the team at once if you get a fever.",
  summary: "ASTCT 2024: screen before lymphodepletion with HIV antibody, hepatitis B (HBsAg, anti-HBc, anti-HBs), hepatitis C antibody, CMV IgG and HTLV-1, syphilis by risk, and baseline HBV DNA if HBsAg is positive; delay for symptomatic lower respiratory infection. Prophylaxis: acyclovir or valacyclovir from lymphodepletion until at least 6 months after infusion (shorter in children); trimethoprim-sulfamethoxazole for Pneumocystis from count recovery (by day 30) until at least 6 months, after a study in which 2 of 40 patients developed severe PJP when prophylaxis stopped at 3 months; entecavir for at-risk hepatitis B until at least 12 months; fluconazole through neutropenia where antifungal prophylaxis is universal, and mould-active azoles for higher risk; fluoroquinolone prophylaxis is controversial and may be replaced by monitoring with prompt antibiotics. Any fever after infusion needs an infection work-up and broad-spectrum antibiotics, since CRS treatment can mask infection.\n\nImmunoglobulin: measure IgG before and in the first 3 months; consider IVIG for IgG of 400 mg/dL or less with severe or recurrent bacterial infections, and when IgG is under 200 mg/dL (ASTCT). SITC 2020 measures B cells and immunoglobulins monthly and considers replacement for high-risk adults and for children with IgG under 400 mg/dL; EBMT/JACIE 2019 keeps IgG at 500 mg/dL or more in children with B-cell aplasia and recommends tenofovir, not entecavir, for a history of hepatitis B.",
  asOf: "2026-11-11",
  setting: {
    who: ["doctor", "nurse", "pharmacist", "patient-or-carer"],
    where: ["ward", "outpatient-clinic", "home"],
  },
  population: "Adults, adolescents and children receiving CD19- or BCMA-directed CAR T cells for haematological cancers. Doses and durations differ in children (ASTCT). People receiving bispecific antibodies have separate consensus advice (see the step-up dosing protocol).",
  trigger: "Planning CAR T-cell therapy, and the months after infusion.",
  steps: [
    {
      action: "Before lymphodepletion, screen for HIV, hepatitis B (HBsAg, anti-HBc, anti-HBs), hepatitis C and CMV, with HBV DNA if HBsAg is positive",
      why: "Hidden infections can flare when the immune system is suppressed; knowing about them allows prevention.",
      source: "astct-inf-2024",
      quote: "Laboratory screening should include HIV antibodies (preferably fourth-generation antigen/antibody combination), hepatitis B virus surface antibody (anti-HBs) and antigen (HBsAg), HBV core Ab (anti-HBc), hepatitis C virus antibody (anti-HCV) with reflex nucleic acid testing if positive; Treponema pallidum testing based on risk factors (screening per institutional guidelines with treponemal or nontreponemal testing).",
    },
    {
      action: "Prevent herpes simplex and shingles with acyclovir or valacyclovir from lymphodepletion until at least 6 months after infusion",
      why: "Without prophylaxis, up to half of patients developed herpes virus infections, mostly shingles, in one series.",
      source: "astct-inf-2024",
      quote: "Antiviral HSV and VZV should be prevented with acyclovir or valacyclovir from the start of lymphodepletion therapy until at least 6 mo postinfusion.",
    },
    {
      action: "Give trimethoprim-sulfamethoxazole against Pneumocystis from count recovery until at least 6 months after infusion",
      why: "Pneumocystis pneumonia after CAR T cells can be severe; stopping prophylaxis at 3 months was followed by cases needing ventilation.",
      source: "astct-inf-2024",
      quote: "Prophylaxis against Pneumocystis jirovecii (PJP) with trimethoprim-sulfamethoxazole (TMP/SMX) is recommended to start post-CAR T cell infusion until at least 6 mo.",
    },
    {
      action: "Give antiviral prophylaxis to people with a history of hepatitis B",
      why: "Hepatitis B can reactivate with severe liver damage; ASTCT names entecavir until at least 12 months, EBMT/JACIE tenofovir.",
      source: "ebmt-2019",
      quote: "For patients with a history of hepatitis B infection, prophylaxis with tenofovir is recommended.",
    },
    {
      action: "Where antifungal prophylaxis is used, give fluconazole through neutropenia, and consider a mould-active azole for those at higher risk",
      why: "Fungal infections are uncommon overall but more likely with prolonged neutropenia, severe CRS or high-dose steroids.",
      source: "astct-inf-2024",
      quote: "For centers that practice universal antifungal prophylaxis, fluconazole can begin with lymphodepletion to cover the neutropenic period until neutrophil recovery.",
    },
    {
      action: "Decide locally between fluoroquinolone prophylaxis during neutropenia and close monitoring with prompt intravenous antibiotics",
      why: "Routine antibacterial prophylaxis is controversial, and none of the paediatric studies used it.",
      source: "astct-inf-2024",
      quote: "Routine prophylaxis with fluoroquinolones (alternatively 3rd generation oral cephalosporins) remains controversial",
    },
    {
      action: "Investigate every fever after infusion for infection and start broad-spectrum antibiotics promptly",
      why: "CRS treatment with tocilizumab or steroids can hide the signs of infection.",
      source: "astct-inf-2024",
      quote: "Fevers after CAR T-cell infusion should warrant prompt infectious workup and initiation of broad-spectrum antibiotics.",
    },
    {
      action: "Measure IgG before CAR T cells and during the first 3 months, and keep checking B cells and immunoglobulins afterwards",
      why: "CD19 and BCMA CAR T cells remove antibody-making cells, which can leave people unable to fight bacterial infections for months or years.",
      source: "sitc-iec-2020",
      quote: "Following CAR T cell therapy, B cell counts and serum immunoglobulins should be measured monthly",
      grade: "LE: 4",
    },
    {
      action: "Consider immunoglobulin replacement when IgG is 400 mg/dL or less with severe or recurrent bacterial infections, or below 200 mg/dL",
      why: "Replacement prevents infections in people who cannot make their own antibodies; there are no randomised trials after CAR T cells.",
      source: "astct-inf-2024",
      quote: "IVIG can also be considered when IgG < 200 mg/dL, particularly when associated with extremely low IgA levels, irrespective of the time from CAR T-cell infusion and the incidence and severity of infections",
    },
    {
      action: "In children with B-cell aplasia, give immunoglobulin replacement to keep IgG at or above the institutional threshold",
      why: "Replacement after CAR T cells has been standard in paediatric centres; EBMT notes there is no consensus on routine replacement in adults, who can keep long-lived plasma cells that go on making antibody.",
      source: "ebmt-2019",
      quote: "Children with B-cell aplasia should receive immunoglobulin replacement to maintain IgG levels according to institutional guidelines for IgG substitution (i.e. ≥500mg/dL).",
    },
  ],
  bestInClass: {
    statement: "ASTCT 2024, the most recent and most specific source read, sets antiviral prophylaxis for herpes viruses and Pneumocystis prophylaxis each for at least 6 months, hepatitis B prophylaxis for at least 12 months where needed, risk-adapted antifungal prophylaxis, and leaves routine antibacterial prophylaxis to local choice. On immunoglobulin replacement the sources differ in threshold: ASTCT considers IVIG at IgG of 400 mg/dL or less with severe or recurrent bacterial infection or below 200 mg/dL in anyone, SITC 2020 for high-risk adults and children under 400 mg/dL (LE: 4), and EBMT/JACIE 2019 keeps children at 500 mg/dL or more. On hepatitis B, ASTCT names entecavir and EBMT/JACIE tenofovir. ASTCT says the evidence is mostly retrospective and extrapolated from transplantation.",
    sources: ["astct-inf-2024", "sitc-iec-2020", "ebmt-2019"],
  },
  variants: [
    {
      name: "Tenofovir for hepatitis B (EBMT/JACIE 2019)",
      differs: "Recommends tenofovir prophylaxis for a history of hepatitis B, where ASTCT 2024 names entecavir 0.5 mg daily from lymphodepletion until at least 12 months.",
      evidence: "Expert recommendations in both; no comparison.",
      sources: ["ebmt-2019", "astct-inf-2024"],
    },
    {
      name: "Immunoglobulin for high-risk adults and for children under 400 mg/dL (SITC 2020)",
      differs: "Considers immunoglobulin supplementation for adults judged at high risk or with recurrent infections and for children with IgG under 400 mg/dL; home subcutaneous immunoglobulin for long-term B-cell aplasia.",
      evidence: "LE: 4.",
      sources: ["sitc-iec-2020"],
    },
    {
      name: "Shorter antiviral prophylaxis in children (ASTCT 2024)",
      differs: "Reports that children usually receive shorter antiviral prophylaxis, often 3 months (range 1 to 6 in studies), and that antibacterial prophylaxis is not universally recommended in children, adolescents and young adults.",
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
    { key: "astct-inf-2024", label: "Best Practice Considerations by The American Society of Transplant and Cellular Therapy: Infection Prevention and Management After Chimeric Antigen Receptor T Cell Therapy for Hematological Malignancies", publisher: "ASTCT Infectious Diseases Special Interest Group, Transplantation and Cellular Therapy", year: 2024, url: "https://europepmc.org/article/PMC/PMC12826105", doi: "10.1016/j.jtct.2024.07.018", gradingScheme: "Expert panel best practice considerations synthesising mostly retrospective evidence; not graded.", read: "full-text", accessed: "2026-11-11" },
    SITC_IEC_2020,
    EBMT_2019,
  ],
  upgrades: [],
  gaps: [
    "A 2026 Australian consensus statement on preventing infections after CD19 CAR T cells for lymphoma (Internal Medicine Journal) and the 2021 French (SFGM-TC) recommendations are listed in Europe PMC without open full text and were not read.",
    "Vaccination after CAR T cells is discussed by ASTCT at length but was not set out as steps here; EBMT/JACIE 2019 made no specific recommendation.",
    "There are no randomised trials of immunoglobulin replacement or of any antimicrobial prophylaxis after CAR T cells (ASTCT).",
  ],
  drugs: ["human-normal-immunoglobulin", "axicabtagene-ciloleucel", "tisagenlecleucel", "lisocabtagene-maraleucel", "brexucabtagene-autoleucel", "idecabtagene-vicleucel", "ciltacabtagene-autoleucel", "obecabtagene-autoleucel", "valaciclovir", "tenofovir"],
  technologies: ["car-t"],
  terms: ["lymphoma-tx-immunoglobulin-replacement", "hbv-hcv"],
  related: ["crs-grading-and-management", "icans-grading-and-management", "bispecific-step-up-dosing"],
  tags: ["protocol", "cell-therapy", "car-t", "infection"],
});
