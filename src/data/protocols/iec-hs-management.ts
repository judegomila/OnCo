import { protocol } from "./helpers";
import { ASTCT_2026, EBMT_2019, SITC_IEC_2020 } from "./cell-therapy-sources";

/*
 * Immune effector cell-associated haemophagocytic lymphohistiocytosis-like syndrome (IEC-HS) after CAR T-cell therapy:
 * recognition, work-up and stepwise treatment.
 *
 * What was read, and how (11 November 2026, fetched raw and read as text):
 * - ASTCT IEC-HS consensus (Hines et al., Transplantation and Cellular Therapy 2023): the NIH author manuscript
 *   (PMC10330221), full text through the NCBI E-utilities efetch service, including Tables 1 to 4 and the Figure 3
 *   legend. Europe PMC's full-text service returned an error for this id. DOI resolved through Europe PMC.
 * - SITC 2020 immune effector cell guideline (HLH/MAS-like toxicity section) and EBMT/JACIE 2019 (delayed MAS
 *   paragraph): full text, see ./cell-therapy-sources.ts.
 * - ASTCT 2026 updated consensus grading: abstract only, see ./cell-therapy-sources.ts.
 * Quotes checked by script against the raw text.
 *
 * Second accuracy pass, 16 November 2026: every source fetched raw again and each claim re-read against the text.
 * - ASTCT 2023 (Hines et al.): PMC10330221 through NCBI efetch again (Europe PMC's full-text service still returned an
 *   error), with the tables and the Figure 3 legend. The publisher's erratum (DOI 10.1016/j.jtct.2025.09.016,
 *   PMC12677140) was read too: it says the anakinra dose in Table 3 is in mg, not mcg, as the manuscript read here
 *   already prints.
 * - SITC 2020 (PMC7745688) and EBMT/JACIE 2019 (PMC7012497): Europe PMC full-text XML.
 * - ASTCT 2026: still abstract only; the DOI leads to a subscription page. The EBMT 2025 recommendations on less
 *   frequent CAR T-cell complications, HLH among them, were found and read as their abstract only.
 * Quotes re-checked by script; three match once the reference-number markers the XML carries inside the sentence are
 * dropped with their tags (two in ASTCT 2023, one in SITC 2020).
 */
export const iecHsManagement = protocol({
  id: "iec-hs-management",
  name: "IEC-HS after CAR T-cell therapy: recognition and stepwise treatment",
  aka: ["IEC-HS", "immune effector cell-associated HLH-like syndrome", "carHLH", "HLH/MAS after CAR T", "macrophage activation syndrome after CAR T", "MAS-L"],
  domain: "cell-therapy-toxicity",
  tldr: "Sometimes after CAR T-cell therapy the immune system stays switched on after cytokine release syndrome has settled, and starts damaging the blood, liver and clotting (IEC-HS). It shows as very high ferritin, falling blood counts, low clotting proteins and liver test changes. It is treated with anakinra, steroids or both, adding other drugs if it worsens, while infection and relapse are ruled out.",
  simple: "After CAR T-cell therapy a serious inflammation can follow the early fever. It is found on blood tests and treated in hospital with medicines that calm the immune system.",
  summary: "ASTCT 2023 named and defined IEC-HS: a hyperinflammatory syndrome with features of macrophage activation or HLH, attributable to immune effector cell therapy, with new or worsening cytopenias, hyperferritinaemia, coagulopathy with hypofibrinogenaemia and/or transaminitis. It is often delayed and appears as CRS is resolving or has resolved; it is a diagnosis of exclusion, and a substantially raised (more than twice the upper limit or baseline) or rapidly rising ferritin is a prerequisite. Fever is deliberately not a criterion, to keep it distinct from CRS. Grading (Table 2) is based largely on the CTCAE category 'immune system disorder, other', grade 1 to 5.\n\nTreatment (expert opinion, Figure 3 and Table 3): start before life-threatening complications with anakinra (adults 100 to 200 mg subcutaneous or intravenous every 6 to 12 hours), corticosteroids (adults dexamethasone 10 to 40 mg daily) or both, allowing where possible about 48 hours to judge effect before adding agents; ruxolitinib second line (adults 10 mg twice daily), dose-reduced with azoles or renal impairment; for refractory life-threatening disease the panel reached no consensus, and discussed etoposide 50 to 100 mg/m2 once, with re-dosing weekly considered (not HLH-94 induction doses), or emapalumab where IFN-gamma is high. Tocilizumab is discouraged for IEC-HS without CRS. Supportive: daily blood count, PT/PTT and fibrinogen, frequent (for example daily) renal and liver tests, fibrinogen replacement, transfusion, cautious G-CSF, infectious disease input and prophylaxis matched to the immunosuppression. SITC 2020 (LE: 4): cryoprecipitate for delayed hypofibrinogenaemia; anakinra and steroids may be considered for late HLH/MAS-like toxicity, which may be tocilizumab-refractory; etoposide only as a last resort.",
  asOf: "2026-11-16",
  setting: {
    who: ["doctor", "nurse", "pharmacist", "multidisciplinary-team"],
    where: ["ward", "intensive-care"],
  },
  population: "Adults and children after CAR T-cell therapy (CD19, CD22 or BCMA directed), often as cytokine release syndrome is resolving. The ASTCT framework was built on CAR T-cell experience; the panel lists bispecific T-cell engagers among the treatments that can trigger secondary HLH, and names how the syndrome differs after them as future research. Paediatric starting doses differ (ASTCT Table 3).",
  trigger: "Rising ferritin with new or worsening cytopenias, falling fibrinogen or rising liver enzymes after CAR T-cell infusion, typically as CRS settles.",
  steps: [
    {
      action: "Suspect IEC-HS when, after CAR T-cell therapy, ferritin rises with new or worsening cytopenias, low fibrinogen or raised liver enzymes",
      why: "This is a different illness from the early fever and needs different treatment.",
      source: "astct-iechs-2023",
      quote: "We ultimately define IEC-HS as the development of a pathological and biochemical hyperinflammatory syndrome that 1) manifests with features of macrophage activation/HLH, 2) is attributable to IEC therapy, and 3) is associated with progression or new onset of cytopenias, hyperferritinemia, coagulopathy with hypofibrinogenemia and/or transaminitis.",
    },
    {
      action: "Distinguish it from severe or returning CRS, which is managed differently",
      why: "IEC-HS usually starts as the first inflammation is settling; calling severe CRS by this name would change treatment wrongly.",
      source: "astct-iechs-2023",
      quote: "Hence, it is imperative to distinguish suspected IEC-HS from CRS recurrence or a prolonged severe CRS, to pursue treatment options and monitoring accordingly.",
    },
    {
      action: "Require a substantially raised or rapidly rising ferritin; with a normal ferritin, look for another cause",
      why: "A normal ferritin makes this syndrome very unlikely.",
      source: "astct-iechs-2023",
      quote: "Nonetheless, given the high negative predictive value of a normal ferritin, substantial elevations in ferritin are a prerequisite to a diagnosis of IEC-HS and normal ferritin values with ongoing inflammation should prompt considerations of alternative etiologies.",
    },
    {
      action: "Rule out infection and progressing cancer quickly: blood, urine and sputum cultures, viral and fungal testing, and marrow or PET-CT as needed",
      why: "Infection and relapse can look the same and need quite different treatment.",
      source: "astct-iechs-2023",
      quote: "Expediency should be given to excluding the most common and dangerous concurrent diagnoses, including infection and/or progressive malignancy.",
    },
    {
      action: "Check the full blood count, clotting times and fibrinogen every day, and kidney and liver function often",
      why: "Patients can deteriorate quickly, and bleeding risk rises as fibrinogen falls.",
      source: "astct-iechs-2023",
      quote: "Daily monitoring of complete blood cell count with differential, coagulation parameters (PT/PTT) and fibrinogen are recommended for patients with IEC-HS.",
    },
    {
      action: "Replace fibrinogen (cryoprecipitate) when it falls",
      why: "Fibrinogen falling out of proportion to the other clotting tests may be a hallmark of the late form, and needs close follow-up.",
      source: "sitc-iec-2020",
      quote: "Delayed coagulopathy may possibly be one hallmark of delayed onset HLH/MAS-like toxicity, typically hypofibrinogenemia disproportionately worse than changes in PT/PTT, which requires close follow-up and replacement with cryoprecipitate",
      grade: "LE: 4",
    },
    {
      action: "Start anakinra, corticosteroids or both before life-threatening complications, and where possible allow about 48 hours to judge the effect before adding another drug",
      why: "Early treatment may stop it progressing; piling on drugs too fast adds infection risk.",
      source: "astct-iechs-2023",
      quote: "Therapy should generally be initiated with corticosteroids +/− anakinra prior to development of life-threatening complications and, if possible, a time interval to evaluate for efficacy (e.g., 48 hours) should elapse before additional agents are added to avoid cumulative toxicity of multiple immunosuppressive agents.",
    },
    {
      action: "Avoid tocilizumab for IEC-HS without CRS features",
      why: "There is no evidence it works in HLH-like illness, and most patients have already had it for CRS.",
      source: "astct-iechs-2023",
      quote: "Additionally, despite established efficacy in CRS, use of tocilizumab or other IL-6 blocking agents (e.g., siltuximab) for IEC-HS, without CRS manifestations, was specifically discouraged due to lack of evidence for efficacy in any HLH-related context, and since most patients will have already received tocilizumab prior to the onset of IEC-HS.",
    },
    {
      action: "If it worsens despite anakinra and steroids, add ruxolitinib, reducing the dose with kidney impairment or azole antifungals",
      why: "Ruxolitinib blocks several inflammatory signals at once; its levels rise with poor kidney function and some antifungals.",
      source: "astct-iechs-2023",
      quote: "As ruxolitinib levels increase with renal dysfunction and with concurrent CYP3A4 inhibitors, including antifungal agents (i.e., azoles), appropriate dose reductions must be made.",
    },
    {
      action: "Keep etoposide as a last resort for late, tocilizumab-refractory disease",
      why: "Etoposide kills activated T cells, including the CAR T cells, so it is kept for when the patient's life takes priority.",
      source: "sitc-iec-2020",
      quote: "Etoposide should only be administered to patients experiencing late-onset, tocilizumab-refractory HLH/MAS-like symptoms after CAR T cell therapy as a last resort",
      grade: "LE: 4",
    },
    {
      action: "Involve infectious disease specialists and match antimicrobial prophylaxis to the immunosuppression given",
      why: "Each added immunosuppressant raises the risk of fungal, viral and Pneumocystis infection.",
      source: "astct-iechs-2023",
      quote: "As the risk of infection in patients with IEC-HS incrementally increases with additive use of immunosuppression, infectious disease consultation is strongly encouraged—particularly with clinical deterioration.",
    },
    {
      action: "Once the clinical picture and blood tests have stabilised, taper treatment gradually while watching for a flare",
      why: "Long immunosuppression causes infections, but stopping too fast can let the syndrome return.",
      source: "astct-iechs-2023",
      quote: "Nonetheless, given the deleterious impact of immunosuppression, including risk of infection—when clinical and laboratory parameters have stabilized, gradually tapering therapy is encouraged while monitoring for recrudescence of symptoms.",
    },
  ],
  bestInClass: {
    statement: "The ASTCT 2023 consensus is the document that named IEC-HS, and of the sources read in full here it is the only one that defines it, grades it and sets out its treatment; its treatment advice is expert opinion, stated by the panel as not evidence-based. SITC 2020, written before the term existed, agrees on the shape: cryoprecipitate for disproportionate hypofibrinogenaemia, anakinra and steroids as agents that may be considered for late HLH/MAS-like toxicity, and etoposide only as a last resort (all LE: 4). The two differ in emphasis on etoposide: SITC limits it to a last resort; ASTCT also places it after first- and second-line therapy, reached no clear consensus on how best to use it, suggests a moderate single dose (50 to 100 mg/m2, with weekly re-dosing considered) and advises against HLH-94 induction dosing. EBMT/JACIE 2019 says only that delayed macrophage activation syndrome is managed with standard approaches. The ASTCT 2026 update to the consensus grading, which includes IEC-HS, and the EBMT 2025 best practice recommendations on less frequent CAR T-cell complications, which cover HLH, were read only as their abstracts.",
    sources: ["astct-iechs-2023", "sitc-iec-2020", "ebmt-2019", "astct-2026", "ebmt-less-frequent-2025"],
  },
  variants: [
    {
      name: "Emapalumab where interferon-gamma is high (ASTCT 2023)",
      differs: "Considers the anti-interferon-gamma antibody emapalumab for life-threatening IEC-HS, especially with documented IFN-gamma elevation, at the package-insert dose.",
      evidence: "Evidence is from a small paediatric primary HLH cohort; the panel calls adult use extrapolative and notes cost and urgent procurement may be prohibitive. No consensus was reached.",
      sources: ["astct-iechs-2023"],
    },
    {
      name: "Switching off the CAR T cells with a safety switch (ASTCT 2023)",
      differs: "For constructs carrying a targetable safety switch (for example truncated EGFR, targeted by cetuximab), turning the CAR T cells off is considered before etoposide in rapidly progressive disease.",
      evidence: "Expert opinion; applies only to constructs that carry such a switch.",
      sources: ["astct-iechs-2023"],
    },
    {
      name: "Anakinra and steroids as third-line CRS agents (SITC 2020)",
      differs: "Frames late HLH/MAS-like toxicity within the CRS algorithm, considering third-line CRS agents such as anakinra and steroids, rather than as a separate syndrome with its own grading.",
      evidence: "LE: 4.",
      sources: ["sitc-iec-2020"],
    },
    {
      name: "Standard approaches for delayed macrophage activation syndrome (EBMT/JACIE 2019)",
      differs: "States that delayed macrophage activation syndrome and CRS are managed with standard approaches, without a specific algorithm.",
      evidence: "Ungraded best practice recommendation.",
      sources: ["ebmt-2019"],
    },
  ],
  grades: [
    { claim: "Treatment recommendations for IEC-HS", grade: "expert opinion, not evidence-based", source: "astct-iechs-2023", quote: "Due to lack of prospective clinical trials for IEC-HS and limited literature on treatment approaches for HLH-like manifestations following CAR T cells—the following treatment recommendations are derived from expert opinion, rely on available evidence from CRS/IEC-HS cohorts and previous evidence with treatment of pHLH and sHLH, and warrant prospective studies." },
    { claim: "Cryoprecipitate for delayed hypofibrinogenaemia", grade: "LE: 4", source: "sitc-iec-2020" },
    { claim: "Anakinra and steroids for late, tocilizumab-refractory HLH/MAS-like pathology", grade: "LE: 4", source: "sitc-iec-2020", quote: "For treatment of late-onset, HLH/MAS-like pathology, which may be tocilzumab-refractory, third-line CRS agents such as anakinra and steroids may be considered (LE: 4)." },
    { claim: "Etoposide only as a last resort", grade: "LE: 4", source: "sitc-iec-2020" },
  ],
  sources: [
    {
      key: "astct-iechs-2023",
      label: "Immune Effector Cell-Associated Hemophagocytic Lymphohistiocytosis-Like Syndrome (ASTCT consensus, Hines et al.)",
      publisher: "American Society for Transplantation and Cellular Therapy, Transplantation and Cellular Therapy",
      year: 2023,
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10330221/",
      doi: "10.1016/j.jtct.2023.03.006",
      gradingScheme: "Expert consensus of a 30-member ASTCT panel; treatment recommendations are stated to be derived from expert opinion and not evidence-based. Grading of IEC-HS severity follows CTCAE 'immune system disorder, other' (grades 1 to 5).",
      read: "full-text",
      accessed: "2026-11-16",
    },
    { ...SITC_IEC_2020, accessed: "2026-11-16" },
    { ...EBMT_2019, accessed: "2026-11-16" },
    { ...ASTCT_2026, accessed: "2026-11-16" },
    {
      key: "ebmt-less-frequent-2025",
      label: "Less frequent complications following CAR T-cell therapies: hemophagocytic lymphohistiocytosis, graft-versus-host disease, thrombotic microangiopathy, coagulation disorders and secondary malignancies: best practice recommendations from the EBMT Practice Harmonization and Guidelines Committee",
      publisher: "EBMT Practice Harmonization and Guidelines Committee, Bone Marrow Transplantation",
      year: 2025,
      url: "https://europepmc.org/abstract/MED/40205032",
      doi: "10.1038/s41409-025-02567-5",
      gradingScheme: "Best practice recommendations; the abstract gives no grades.",
      read: "abstract",
      accessed: "2026-11-16",
    },
  ],
  upgrades: [],
  gaps: [
    "The ASTCT 2026 updated consensus grading, which reconsidered the IEC-HS criteria, was read only as its abstract; whether the definition or grade boundaries above changed is not known here. On 16 November 2026 its full text was still behind a subscription and no open copy was found.",
    "Newer European guidance exists and could not be read in full. On 16 November 2026 the EBMT 2025 best practice recommendations on less frequent CAR T-cell complications, which cover HLH, and the EBMT/JACIE/EHA 2022 recommendations that replace the 2019 edition cited here, were available only as abstracts; what they advise for IEC-HS is not reflected above.",
    "The publisher issued an erratum to the ASTCT 2023 paper (DOI 10.1016/j.jtct.2025.09.016): the anakinra dose in Table 3 is in mg, not mcg, as printed in the manuscript read here and in the summary above.",
    "No prospective trial of any IEC-HS treatment exists in the sources read; every treatment step is expert opinion or LE: 4.",
    "The ASTCT panel reached no consensus on etoposide, emapalumab or other salvage agents; it calls the best approach to tapering unclear and the role of pre-emptive treatment unknown.",
    "The ASTCT diagnostic table (Table 1) and Figure 3 drawing were read as text and legend only; the figure image itself was not read.",
    "Whether the same framework applies after bispecific T-cell engagers is named as future research by the ASTCT panel.",
  ],
  drugs: ["dexamethasone", "methylprednisolone", "ruxolitinib", "etoposide", "emapalumab", "anakinra"],
  technologies: ["car-t"],
  institutions: ["sitc"],
  terms: ["crs", "cytopenias"],
  related: ["crs-grading-and-management", "icans-grading-and-management", "car-t-infection-prevention"],
  tags: ["protocol", "cell-therapy", "car-t", "acute-oncology"],
});
