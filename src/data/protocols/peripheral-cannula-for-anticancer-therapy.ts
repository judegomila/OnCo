import { protocol } from "./helpers";

/*
 * Siting and checking a short peripheral cannula for intravenous anticancer treatment, including vesicants, in adults.
 *
 * First written on 11 November 2026. Second accuracy pass on 17 November 2026: every source was read again as raw
 * text and every quote was checked by script (whitespace and line breaks normalised, nothing else).
 * - JSCN/JSMO/JASPO guideline on extravasation (ESMO Open 2024;9:103932, DOI 10.1016/j.esmoop.2024.103932,
 *   PMC11490930): full text, Europe PMC XML fetched on 17 November, including Table 1 and its footnotes.
 * - CDC/HICPAC Guidelines for the Prevention of Intravascular Catheter-Related Infections, 2011 (last update October
 *   2017): full text, the PDF at cdc.gov read with pdftotext, re-using the copy a sibling checker fetched from cdc.gov
 *   on 17 November.
 * - epic3 (Loveday et al., J Hosp Infect 2014, PMC7114876): full text, Europe PMC XML, re-using a sibling checker's
 *   copy of 17 November.
 * - West Midlands Expert Advisory Group for SACT, Guidelines for the Management of Extravasation of a Systemic
 *   Anti-Cancer Therapy including Cytotoxic Agents (v1, agreed 19 July 2017, review date 19 July 2019): full text, PDF
 *   fetched from england.nhs.uk on 17 November and read with pdftotext. A UK network document past its review date,
 *   used for practice detail that no national guideline read states.
 * - MAGIC-ONC (Ann Intern Med 2025, DOI 10.7326/ANNALS-25-02523) and the GAVeCeLT-IVAS SISPeC bundle (J Vasc Access
 *   2026, DOI 10.1177/11297298261442098): abstracts only, Europe PMC, with titles checked at Crossref.
 * - ESMO-EONS extravasation guideline (2012, DOI 10.1093/annonc/mds294) and the INS Standards 2024: not read; sibling
 *   checkers' requests were refused on 16 and 17 November and were not repeated.
 *
 * What the second pass changed: the reasons given for nine steps said more than the sources and now say what each
 * source says; the steel needle step follows CDC's wording and scope; the replacement question now carries epic3's
 * recommendation to re-site only when clinically indicated (Class B), which the first version left out; JSCN's
 * graded recommendation on checking blood backflow was added; West Midlands hedges ("ideally", "consideration should
 * be given") are kept; the JSCN source title and the description of its certainty scale were corrected.
 */
export const peripheralCannulaForAnticancerTherapy = protocol({
  id: "peripheral-cannula-for-anticancer-therapy",
  name: "Peripheral cannula for anticancer treatment: vein choice, siting and checks, including vesicants",
  aka: ["peripheral IV for chemotherapy", "cannulation for chemotherapy", "peripheral venous catheter for chemotherapy", "PIVC for vesicants", "short peripheral catheter chemotherapy", "venflon for chemo"],
  domain: "vascular-access",
  tldr: "If your chemotherapy goes in through a small tube (cannula) in a vein in your arm, UK nursing guidance says to choose a large vein in the forearm, avoid joints and the back of the hand, ideally put in a fresh cannula, check it works before and during the drip, and ask you to say at once if it stings, burns, hurts or swells.",
  simple: "A thin tube is put into a vein in your arm for the treatment. Tell the nurse straight away if it hurts, stings, burns or swells, during the drip or after.",
  summary: "Guidance on peripheral cannulas comes mostly from infection prevention, and the chemotherapy-specific detail from extravasation guidelines. The Japanese JSCN/JSMO/JASPO extravasation guideline (2024, GRADE) weakly recommends placing a central venous device in people planning to receive anticancer drugs (certainty B), weakly recommends siting a peripheral cannula upstream (closer to the heart) of a preceding puncture (C), weakly recommends against replacing a peripheral cannula at set intervals during anticancer treatment (C), weakly recommends avoiding an infusion pump for peripheral anticancer infusions unless strict rate control is needed (C), and weakly recommends checking blood backflow to detect a leak early (D).\n\nCDC/HICPAC (2011, updated 2017) asks for an upper-limb site in adults (Category II), avoiding steel needles for anything that might cause tissue necrosis if it leaks (IA), and a midline or PICC rather than a short cannula when therapy will likely exceed six days (II); it finds no need to replace peripheral catheters more often than every 72 to 96 hours (IB) and makes no recommendation on replacing only when clinically indicated. epic3 (England, 2014) says peripheral cannulas should be re-sited when clinically indicated and not routinely (Class B), inspected at least every shift (Class D/GPP), and inserted after 2% chlorhexidine in 70% isopropyl alcohol has been allowed to dry (Class D/GPP). Practice detail comes from UK network guidance for patients over 16 (West Midlands, 2017): avoid joints, the antecubital fossa and the back of the hand; large forearm veins are recommended; ideally a new cannula, the smallest gauge in the biggest vein possible; further attempts above the previous site; ideally no more than two attempts by one practitioner; check backflow, resistance and free flow immediately before and frequently throughout; ideally give vesicants first; consider central access for prolonged vesicant infusions or after a previous extravasation.",
  asOf: "2026-11-17",
  setting: {
    who: ["nurse", "patient-or-carer"],
    where: ["chemotherapy-day-unit", "ward", "outpatient-clinic"],
  },
  population: "Adults receiving intravenous anticancer drugs through a short peripheral cannula. Children have their own site rules (CDC allows lower limb and scalp in infants). The West Midlands guidance is written for patients over 16 in adult services. CDC suggests a midline or PICC rather than a short cannula when intravenous therapy will likely exceed six days, and the West Midlands guidance asks for a central device to be considered for prolonged vesicant infusions or after a previous extravasation (see the device-selection protocol).",
  trigger: "Intravenous anticancer treatment is to be given through a peripheral vein.",
  steps: [
    {
      action: "Consider whether a central venous device would be better before using a peripheral vein",
      why: "JSCN lists the benefits as completing the planned treatment and less pain and anxiety from cannulation, against device complications (8%). The West Midlands guidance asks for a central device to be considered for prolonged vesicant infusions, after a previous extravasation, or where the drug's product information recommends one.",
      source: "jscn-2024",
      quote: "It is weakly recommended to place a CV device in patients planning to receive anticancer drugs.",
      grade: "Recommend (weak), certainty B",
    },
    {
      action: "In adults, use a vein in the arm; move a cannula placed in a leg to an arm as soon as possible",
      why: "CDC says the site of a catheter influences the later risk of catheter-related infection and phlebitis (inflammation of the vein). The West Midlands guidance also says not to use the legs.",
      source: "cdc-hicpac-2011",
      quote: "In adults, use an upper-extremity site for catheter insertion.",
      grade: "Category II",
    },
    {
      action: "Choose a large, straight, firm forearm vein; avoid joints, the inner elbow, the back of the hand and anywhere lymphoedema is present",
      why: "The guidance says these places have little soft tissue to protect the nerves and tissues underneath, so a leak there may have serious consequences. It cites nursing texts for this, not trials.",
      source: "west-midlands-2017",
      quote: "Cannulating over joints, the anticubital fossa or dorsum of the hand should be avoided as tissue damage due to extravasation may have serious consequences as there is little soft tissue for the protection of underlying nerves and tissues.",
    },
    {
      action: "Clean the skin with 2% chlorhexidine in 70% alcohol and let it dry before inserting the cannula",
      why: "epic3 reports a review concluding that chlorhexidine is more efficient than povidone iodine and that alcohol adds benefit. For peripheral cannulas it grades this as a good practice point, because the trials comparing antiseptics were of very low quality.",
      source: "epic3",
      quote: "Decontaminate the skin at the insertion site with a single-use application of 2% chlorhexidine gluconate in 70% isopropyl alcohol (or povidone iodine in alcohol for patients with sensitivity to chlorhexidine) and allow to dry before inserting a peripheral vascular access device.",
      grade: "Class D/GPP",
    },
    {
      action: "Avoid a steel needle for any drug that might cause tissue necrosis if it leaks",
      why: "CDC says the use of steel needles is frequently complicated by fluid leaking into the tissue under the skin, which is potentially serious if the fluid is a vesicant. The West Midlands guidance goes further: in no circumstances a metal butterfly needle for chemotherapy.",
      source: "cdc-hicpac-2011",
      quote: "Avoid the use of steel needles for the administration of fluids and medication that might cause tissue necrosis if extravasation occurs [33, 34]. Category IA",
      grade: "Category IA",
    },
    {
      action: "Site the cannula upstream (closer to the heart) of any preceding puncture",
      why: "JSCN found one cohort study reporting fewer leaks this way and rated the certainty low. The West Midlands guidance says further attempts after a failed one must be above the previous site, to prevent a vesicant seeping at the recent puncture.",
      source: "jscn-2024",
      quote: "It is weakly recommended to place a peripheral venous catheter centrally (upstream) from the site of preceding puncture for patients receiving anticancer drug therapy from the peripheral veins.",
      grade: "Recommend (weak), certainty C",
    },
    {
      action: "Check the cannula immediately before and frequently throughout the treatment: blood comes back, there is no resistance on the syringe and a compatible fluid runs freely",
      why: "JSCN weakly recommends checking blood backflow to detect a leak early (certainty D): it confirms the cannula is in the vein and not blocked, though the timing and method of the check are not clear from the evidence. The West Midlands guidance lists lost blood return, resistance and a slowed infusion among the signs of a leak.",
      source: "west-midlands-2017",
      quote: "Venous access should be assessed and tested immediately prior to and frequently throughout administration of any cytotoxic drugs, checking for backflow, no resistance on syringe plunger on administration and acceptance of free flowing compatible infusion fluid",
    },
    {
      action: "Do not replace the cannula at set intervals during anticancer treatment",
      why: "JSCN found that replacement every 72 to 96 hours lowered infiltration but not extravasation, and judged that the pain for the patient and the burden on staff outweigh the benefit. epic3 says to re-site when clinically indicated and not routinely (Class B); CDC makes no recommendation on that (see the grades).",
      source: "jscn-2024",
      quote: "It is weakly recommended not to replace peripheral venous catheters with specific time interval in patients receiving anticancer drugs.",
      grade: "Not recommend (weak), certainty C",
    },
    {
      action: "Unless strict control of the dose rate is needed, avoid an infusion pump for anticancer drugs given through a peripheral vein",
      why: "JSCN says the link between pumps and leaks is unclear: it rests on case reports and one cohort study in children that did not involve anticancer drugs. Pumps control the rate better, so the balance depends on the drug. The West Midlands guidance allows pumps designed for the purpose for vesicants, with a compatible fluid running alongside and continual observation.",
      source: "jscn-2024",
      quote: "Unless strict dose rate control is required, avoidance of infusion pump is weakly recommended when administering anticancer drugs via the peripheral vein.",
      grade: "Recommend or not recommend (weak), certainty C",
    },
    {
      action: "Ask the person to report at once any stinging, burning or change in feeling during treatment, and any pain, swelling, inflammation or blistering around the site once at home",
      why: "The guidance says communication with the patient plays a vital role in recognising a leak, and that some signs do not appear until some time after the infusion. JSCN makes no recommendation on patient education, because the evidence was very low in certainty.",
      source: "west-midlands-2017",
      quote: "Patients should be informed of the importance of reporting immediately any change in sensation, stinging or burning during the administration of chemotherapy",
    },
  ],
  bestInClass: {
    statement: "Consider a central device first (JSCN 2024, weak, B; MAGIC-ONC 2025 rates device choice by scenario). If a peripheral vein is used: an upper-limb site in adults (CDC II), 2% chlorhexidine in 70% isopropyl alcohol allowed to dry (epic3 D/GPP), no steel needle for a drug that might cause necrosis (CDC IA), the cannula upstream of any preceding puncture (JSCN weak, C), blood backflow checked (JSCN weak, D), no replacement at set intervals (JSCN weak, C; epic3 Class B), and no pump unless strict rate control is needed (JSCN weak, C). Guidelines differ on replacement: CDC sees no need to replace more often than every 72 to 96 hours (IB) and makes no recommendation on replacing only when clinically indicated, while epic3 says to re-site when clinically indicated and not routinely, and JSCN weakly recommends against replacement at set intervals during anticancer treatment. They also differ on pumps: JSCN weakly recommends avoiding them, and the West Midlands guidance allows purpose-designed pumps for vesicants. Vein choice within the arm (forearm, avoiding joints, the antecubital fossa and the back of the hand), cannula gauge, the number of attempts and when to check rest on UK network guidance and the texts it cites, not trials.",
    sources: ["jscn-2024", "cdc-hicpac-2011", "epic3", "west-midlands-2017", "magic-onc-2025"],
  },
  variants: [
    {
      name: "UK network practice for vesicants (West Midlands, 2017)",
      differs: "Adds: ideally a new cannula sited immediately before treatment, because a previously placed one carries more risk of a leak; the smallest gauge cannula in the biggest vein possible; ideally no more than two attempts before handing over to another practitioner; ideally vesicants first, while the vein is at its best, unless the regimen says otherwise; bolus vesicants through the side arm of a fast-flowing drip; a clear dressing, with the insertion point visible at all times; people having a peripheral vesicant infusion observed at all times; central access highly recommended for longer vesicant infusions (it gives 12 to 24 hours as an example) and considered after a previous extravasation.",
      evidence: "Network guidance for patients over 16, citing nursing texts and expert sources, not trials; past its own review date (July 2019).",
      sources: ["west-midlands-2017"],
    },
    {
      name: "Insertion bundle for short peripheral catheters (GAVeCeLT-IVAS SISPeC, 2026)",
      differs: "Six steps for every short cannula: examine both arms with and without a tourniquet; preferably avoid areas of flexion (wrist, antecubital fossa) and choose, when feasible, forearm veins or the upper-arm cephalic vein; hand hygiene and skin antisepsis; cannula-over-needle insertion, preferably with a tourniquet; connection to the administration set; and securement with protection of the exit site.",
      evidence: "A bundle from two Italian societies, described by its authors as evidence-based, for adults and children; not specific to anticancer drugs; read as an abstract.",
      sources: ["sispec-2026"],
    },
    {
      name: "Timed replacement every 72 to 96 hours",
      differs: "Re-sites peripheral cannulas at a fixed interval to reduce infection and phlebitis.",
      evidence: "CDC (IB) says there is no need to replace more often than every 72 to 96 hours in adults, and leaves replacement only when clinically indicated as an unresolved issue. epic3 says to re-site when clinically indicated and not routinely, unless the manufacturer's device-specific recommendations say otherwise (Class B). JSCN 2024 found routine replacement reduced infiltration but not extravasation and judged that its harms outweigh its benefit during anticancer treatment.",
      sources: ["cdc-hicpac-2011", "epic3", "jscn-2024"],
    },
  ],
  grades: [
    { claim: "Use a midline or PICC instead of a short peripheral cannula when IV therapy will likely exceed six days", grade: "Category II", source: "cdc-hicpac-2011", quote: "Use a midline catheter or peripherally inserted central catheter (PICC), instead of a short peripheral catheter, when the duration of IV therapy will likely exceed six days." },
    { claim: "No need to replace peripheral catheters more often than every 72 to 96 hours in adults", grade: "Category IB", source: "cdc-hicpac-2011", quote: "There is no need to replace peripheral catheters more frequently than every 72-96 hours to reduce risk of infection and phlebitis in adults [36, 140, 141]." },
    { claim: "Replacing peripheral catheters in adults only when clinically indicated", grade: "Unresolved issue", source: "cdc-hicpac-2011", quote: "No recommendation is made regarding replacement of peripheral catheters in adults only when clinically indicated [142–144]." },
    { claim: "Re-site peripheral cannulas when clinically indicated and not routinely", grade: "Class B", source: "epic3", quote: "Peripheral vascular catheters should be re-sited when clinically indicated and not routinely, unless device-specific recommendations from the manufacturer indicate otherwise." },
    { claim: "Inspect the peripheral cannula site at least every shift and remove the cannula when complications occur or it is no longer required", grade: "Class D/GPP", source: "epic3", quote: "Peripheral vascular catheter insertion sites should be inspected at a minimum during each shift, and a Visual Infusion Phlebitis score should be recorded. The catheter should be removed when complications occur or as soon as it is no longer required." },
    { claim: "Check blood backflow for early detection of extravasation", grade: "Recommend (weak), certainty D", source: "jscn-2024", quote: "Assessing blood backflow for early detection of EV is weakly recommended." },
  ],
  sources: [
    {
      key: "jscn-2024",
      label: "Extravasation associated with cancer drug therapy: multidisciplinary guideline of the Japanese Society of Cancer Nursing, Japanese Society of Medical Oncology, and Japanese Society of Pharmaceutical Oncology",
      publisher: "ESMO Open (Japanese Society of Cancer Nursing, Japanese Society of Medical Oncology, Japanese Society of Pharmaceutical Oncology)",
      year: 2024,
      url: "https://doi.org/10.1016/j.esmoop.2024.103932",
      doi: "10.1016/j.esmoop.2024.103932",
      gradingScheme: "GRADE and Minds 2020: recommend or not recommend, strong or weak; certainty of evidence A (high), B (moderate), C (low), D (very low).",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "cdc-hicpac-2011",
      label: "Guidelines for the Prevention of Intravascular Catheter-Related Infections, 2011 (last update October 2017)",
      publisher: "CDC/HICPAC",
      year: 2011,
      url: "https://www.cdc.gov/infection-control/media/pdfs/Guideline-BSI-H.pdf",
      gradingScheme: "Category IA (strongly recommended, strongly supported by well-designed studies), IB (strongly recommended, some studies and strong rationale, or accepted practice), IC (required by regulation), II (suggested), Unresolved issue.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "epic3",
      label: "epic3: National Evidence-Based Guidelines for Preventing Healthcare-Associated Infections in NHS Hospitals in England",
      publisher: "Journal of Hospital Infection (Loveday et al., commissioned by the Department of Health)",
      year: 2014,
      url: "https://doi.org/10.1016/S0195-6701(13)60012-2",
      doi: "10.1016/S0195-6701(13)60012-2",
      gradingScheme: "SIGN-style classes A to D, GPP (good practice point), H&S (health and safety legislation).",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "west-midlands-2017",
      label: "Guidelines for the Management of Extravasation of a Systemic Anti-Cancer Therapy including Cytotoxic Agents (v1)",
      publisher: "West Midlands Expert Advisory Group for SACT (NHS England)",
      year: 2017,
      url: "https://www.england.nhs.uk/midlands/wp-content/uploads/sites/46/2019/05/management-extravasation-of-a-systemic-anti-cancer-therapy-including-cytotoxic-agents.pdf",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "magic-onc-2025",
      label: "The Michigan Appropriateness Guide for Intravenous Catheters in Adult Patients With Cancer (MAGIC-ONC)",
      publisher: "Annals of Internal Medicine",
      year: 2025,
      url: "https://doi.org/10.7326/ANNALS-25-02523",
      doi: "10.7326/ANNALS-25-02523",
      gradingScheme: "RAND/UCLA Appropriateness Method: scenarios rated appropriate, neutral/uncertain or inappropriate by a 9-member panel.",
      read: "abstract",
      accessed: "2026-11-17",
    },
    {
      key: "sispec-2026",
      label: "A GAVeCeLT-IVAS bundle for safe insertion of short peripheral catheters: The SISPeC protocol",
      publisher: "Journal of Vascular Access (GAVeCeLT and IVAS)",
      year: 2026,
      url: "https://doi.org/10.1177/11297298261442098",
      doi: "10.1177/11297298261442098",
      read: "abstract",
      accessed: "2026-11-17",
    },
    {
      key: "esmo-eons-2012",
      label: "Management of chemotherapy extravasation: ESMO-EONS Clinical Practice Guidelines",
      publisher: "ESMO and EONS (Annals of Oncology)",
      year: 2012,
      url: "https://doi.org/10.1093/annonc/mds294",
      doi: "10.1093/annonc/mds294",
      read: "not-reachable",
      accessed: "2026-11-11",
    },
  ],
  technologies: ["infusion-devices-vascular-access", "smart-infusion-pumps"],
  terms: ["extravasation-infusion-reaction"],
  related: ["chemotherapy-extravasation-management", "venous-access-device-selection-for-anticancer-therapy", "sact-administration-checks-at-the-chair"],
  upgrades: [],
  gaps: [
    "The ESMO-EONS extravasation guideline (2012) and the INS Infusion Therapy Standards (2024), which both address peripheral cannulation for vesicants, could not be read. On 17 November 2026 they were not requested again, because other checkers' requests for both had been refused on 16 and 17 November. No step rests on either.",
    "No source read gives a cannula size by gauge number, a maximum age in hours for a cannula used for a vesicant, or a fixed limit on attempts. The West Midlands guidance says only the smallest gauge in the biggest vein possible, ideally a new cannula sited immediately before treatment, and ideally two attempts before handing over.",
    "Vein choice within the arm, cannula gauge, the number of attempts and giving vesicants first rest on one English network document for patients over 16, which cites nursing texts and expert sources, not trials, and passed its review date in July 2019. Other countries and hospitals may do this differently.",
    "JSCN prints certainty D in its table for checking blood backflow and calls the certainty low in its text; it says the timing and method of the check were not clear from the evidence. It makes no recommendation on patient education.",
    "Whether a cannula should be sited on the side of a previous mastectomy without lymphoedema is unsettled; the West Midlands guidance calls it 'still a matter of discussion'.",
    "MAGIC-ONC and the SISPeC bundle were read as abstracts only, again on 17 November 2026; their full texts need a subscription.",
    "Newer editions: on 17 November 2026 the CDC page still listed the 2011 guideline (last update October 2017), and a Europe PMC search found no successor to epic3 or to the JSCN guideline. The 2025 ONS/ASCO extravasation guideline covers managing a leak, not siting a cannula.",
  ],
});
