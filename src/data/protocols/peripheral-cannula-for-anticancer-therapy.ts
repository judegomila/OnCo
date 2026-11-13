import { protocol } from "./helpers";

/*
 * Siting and checking a short peripheral cannula for intravenous anticancer treatment, including vesicants, in adults.
 *
 * What was read, and how (all on 11 November 2026, fetched raw into a scratch directory and read as text):
 * - JSCN/JSMO/JASPO multidisciplinary guideline on extravasation (ESMO Open 2024;9:103932, DOI
 *   10.1016/j.esmoop.2024.103932, PMC11490930): full text, Europe PMC XML (copy fetched by the extravasation exemplar
 *   agent, in a scratch directory), including Table 1 with each recommendation's strength and certainty.
 * - CDC/HICPAC Guidelines for the Prevention of Intravascular Catheter-Related Infections, 2011 (last update October
 *   2017): full text, PDF from the Internet Archive's capture of cdc.gov (copy fetched by the port exemplar agent).
 * - epic3 (Loveday et al., J Hosp Infect 2014, PMC7114876): full text, Europe PMC XML (port exemplar agent's copy).
 * - West Midlands Expert Advisory Group for SACT, Guidelines for the Management of Extravasation of a Systemic
 *   Anti-Cancer Therapy including Cytotoxic Agents (v1, agreed July 2017, review date July 2019): full text, PDF from
 *   england.nhs.uk (extravasation exemplar agent's copy). A UK network document past its review date, used as a variant
 *   and for practice detail that no national guideline read states.
 * - MAGIC-ONC (Michigan Appropriateness Guide for Intravenous Catheters in Adult Patients With Cancer, Ann Intern Med
 *   2025, DOI 10.7326/ANNALS-25-02523): abstract only.
 * - GAVeCeLT-IVAS SISPeC bundle for short peripheral catheters (J Vasc Access 2026, DOI 10.1177/11297298261442098):
 *   abstract only, Europe PMC.
 * - ESMO-EONS extravasation guideline (2012, DOI 10.1093/annonc/mds294): not reachable (publisher bot check; the
 *   Internet Archive refused repeated requests with HTTP 429). INS Standards 2024: not reachable.
 *
 * Every DOI was resolved through Europe PMC or Crossref and its title checked. Quotes are copied with line breaks
 * joined only.
 */
export const peripheralCannulaForAnticancerTherapy = protocol({
  id: "peripheral-cannula-for-anticancer-therapy",
  name: "Peripheral cannula for anticancer treatment: vein choice, siting and checks, including vesicants",
  aka: ["peripheral IV for chemotherapy", "cannulation for chemotherapy", "peripheral venous catheter for chemotherapy", "PIVC for vesicants", "short peripheral catheter chemotherapy", "venflon for chemo"],
  domain: "vascular-access",
  tldr: "If your chemotherapy goes in through a small tube (cannula) in a vein in your arm, the nurse should choose a good vein in the forearm, avoid joints and the back of the hand, put in a fresh cannula, check it works before and during the drip, and ask you to say at once if it stings, burns or swells.",
  simple: "A thin tube is put into a vein in your arm for the treatment. Tell the nurse straight away if it hurts, stings, burns or swells, during the drip or after.",
  summary: "Most guidance on peripheral cannulas comes from infection prevention, and much of the chemotherapy-specific detail from extravasation guidelines. The most recent graded guideline on the subject, the Japanese JSCN/JSMO/JASPO extravasation guideline (2024, GRADE), weakly recommends a central venous device rather than peripheral veins for people starting anticancer drugs (certainty B), recommends siting a peripheral cannula upstream (closer to the heart) of any previous puncture (weak, C), recommends against routine timed replacement of a peripheral cannula during anticancer treatment (weak, C), and, unless strict rate control is needed, weakly recommends against an infusion pump for peripheral anticancer infusions (C).\n\nCDC/HICPAC (2011, updated 2017) asks for an upper-limb site in adults (Category II), never a steel needle for anything that can cause necrosis if it leaks (IA), and a midline or PICC rather than a short cannula when therapy will likely exceed six days (II); it finds no need to replace peripheral catheters more often than every 72 to 96 hours (IB) and makes no recommendation on replacing only when clinically indicated. epic3 asks for 2% chlorhexidine in 70% alcohol, allowed to dry, before insertion (Class D/GPP). Practice detail comes from UK network guidance (West Midlands, 2017): avoid joints, the antecubital fossa and the back of the hand; prefer large forearm veins; use a new cannula, the smallest gauge in the largest vein; repeat attempts above the previous site; check for blood return before and throughout; give vesicants first; consider central access for long vesicant infusions or after a previous extravasation.",
  asOf: "2026-11-11",
  setting: {
    who: ["nurse", "patient-or-carer"],
    where: ["chemotherapy-day-unit", "ward", "outpatient-clinic"],
  },
  population: "Adults receiving intravenous anticancer drugs through a short peripheral cannula. Children have their own site rules (CDC allows lower limb and scalp in infants). People who will need treatment for more than about six days, a continuous vesicant infusion, or who have had a previous extravasation are usually better served by a central device (see the device-selection protocol).",
  trigger: "Intravenous anticancer treatment is to be given through a peripheral vein.",
  steps: [
    {
      action: "Check whether a central venous device would be better before using a peripheral vein, especially for vesicants, long infusions or a course of many cycles",
      why: "Central devices avoid repeated needle sticks and make it less likely a drug leaks into the arm.",
      source: "jscn-2024",
      quote: "It is weakly recommended to place a CV device in patients planning to receive anticancer drugs.",
      grade: "Recommend (weak), certainty B",
    },
    {
      action: "Use a vein in the arm; in adults do not use the legs",
      why: "Arm veins carry less risk of infection and clots than leg veins.",
      source: "cdc-hicpac-2011",
      quote: "In adults, use an upper-extremity site for catheter insertion.",
      grade: "Category II",
    },
    {
      action: "Choose a large, straight forearm vein, and avoid joints, the inner elbow and the back of the hand, and any arm with lymphoedema",
      why: "If a drug leaks where there is little soft tissue, tendons and nerves can be damaged; a big vein dilutes the drug quickly.",
      source: "west-midlands-2017",
      quote: "Cannulating over joints, the anticubital fossa or dorsum of the hand should be avoided as tissue damage due to extravasation may have serious consequences as there is little soft tissue for the protection of underlying nerves and tissues.",
    },
    {
      action: "Clean the skin with 2% chlorhexidine in 70% alcohol and let it dry before inserting the cannula",
      why: "It kills skin bacteria that could otherwise enter the vein with the cannula.",
      source: "epic3",
      quote: "Decontaminate the skin at the insertion site with a single-use application of 2% chlorhexidine gluconate in 70% isopropyl alcohol (or povidone iodine in alcohol for patients with sensitivity to chlorhexidine) and allow to dry before inserting a peripheral vascular access device.",
      grade: "Class D/GPP",
    },
    {
      action: "Never give anticancer drugs through a steel (butterfly) needle; use a plastic cannula",
      why: "Steel needles slip out of the vein more easily, and a drug that leaks can destroy tissue.",
      source: "cdc-hicpac-2011",
      quote: "Avoid the use of steel needles for the administration of fluids and medication that might cause tissue necrosis if extravasation occurs [33, 34]. Category IA",
      grade: "Category IA",
    },
    {
      action: "If an attempt fails, site the next cannula upstream (closer to the heart) of the earlier puncture",
      why: "A drug given below a fresh puncture can leak out through the hole higher up the vein.",
      source: "jscn-2024",
      quote: "It is weakly recommended to place a peripheral venous catheter centrally (upstream) from the site of preceding puncture for patients receiving anticancer drug therapy from the peripheral veins.",
      grade: "Recommend (weak), certainty C",
    },
    {
      action: "Check the cannula works before and throughout the treatment: blood comes back, it flushes without resistance and a compatible fluid runs freely",
      why: "A cannula that has slipped out of the vein lets the drug leak into the tissue.",
      source: "west-midlands-2017",
      quote: "Venous access should be assessed and tested immediately prior to and frequently throughout administration of any cytotoxic drugs, checking for backflow, no resistance on syringe plunger on administration and acceptance of free flowing compatible infusion fluid",
    },
    {
      action: "Do not replace the cannula on a fixed timetable during treatment; replace it when there is a reason",
      why: "Routine re-siting causes pain and uses up veins without reducing leaks.",
      source: "jscn-2024",
      quote: "It is weakly recommended not to replace peripheral venous catheters with specific time interval in patients receiving anticancer drugs.",
      grade: "Not recommend (weak), certainty C",
    },
    {
      action: "Unless the drug needs strict rate control, consider running peripheral anticancer infusions by gravity rather than a pump",
      why: "A pump keeps pushing fluid even if the cannula has slipped, so a leak can grow before anyone notices.",
      source: "jscn-2024",
      quote: "Unless strict dose rate control is required, avoidance of infusion pump is weakly recommended when administering anticancer drugs via the peripheral vein.",
      grade: "Recommend or not recommend (weak), certainty C",
    },
    {
      action: "Ask the person to report at once any stinging, burning, pain or change in feeling at the cannula during treatment",
      why: "The person often feels a leak before anyone can see it.",
      source: "west-midlands-2017",
      quote: "Patients should be informed of the importance of reporting immediately any change in sensation, stinging or burning during the administration of chemotherapy",
    },
  ],
  bestInClass: {
    statement: "Consider a central device first (JSCN 2024, weak, B; MAGIC-ONC 2025 for device choice). If a peripheral vein is used: an upper-limb site (CDC II), chlorhexidine-alcohol skin preparation allowed to dry (epic3 D/GPP), never a steel needle (CDC IA), repeat attempts upstream of earlier punctures (JSCN weak, C), no routine timed replacement (JSCN weak, C), gravity rather than a pump unless strict rate control is needed (JSCN weak, C), and patency checks before and throughout. Guidelines differ on replacement: CDC sees no need to replace more often than every 72 to 96 hours and makes no recommendation on replacing only when clinically indicated, while JSCN recommends against timed replacement during anticancer treatment. Vein choice within the arm (forearm, avoiding joints, the antecubital fossa and the back of the hand) rests on UK network guidance and expert sources, not trials.",
    sources: ["jscn-2024", "cdc-hicpac-2011", "epic3", "west-midlands-2017", "magic-onc-2025"],
  },
  variants: [
    {
      name: "UK network practice for vesicants (West Midlands, 2017)",
      differs: "Adds a new cannula sited immediately before treatment, the smallest gauge in the largest vein, no more than two attempts by one practitioner, vesicants given first while the vein is at its best, a clear dressing with the site always visible, and central access for vesicant infusions of 12 to 24 hours or after a previous extravasation.",
      evidence: "Network guidance citing nursing texts and expert sources, not trials; past its own review date (July 2019).",
      sources: ["west-midlands-2017"],
    },
    {
      name: "Insertion bundle for short peripheral catheters (GAVeCeLT-IVAS SISPeC, 2026)",
      differs: "Six steps for every short cannula: examine both arms with and without a tourniquet, avoid areas of flexion and prefer forearm veins or the upper-arm cephalic vein, hand hygiene and skin antisepsis, cannula-over-needle insertion with a tourniquet, connection, and securement with protection of the exit site.",
      evidence: "An Italian society consensus bundle described as evidence-based, not specific to anticancer drugs; read as an abstract.",
      sources: ["sispec-2026"],
    },
    {
      name: "Timed replacement every 72 to 96 hours",
      differs: "Re-sites peripheral cannulas at a fixed interval to reduce infection and phlebitis.",
      evidence: "CDC (IB) says there is no need to replace more often than every 72 to 96 hours in adults, and leaves replacement only when clinically indicated as an unresolved issue. JSCN 2024 found routine replacement reduced infiltration but not extravasation and judged that its harms outweigh its benefit during anticancer treatment.",
      sources: ["cdc-hicpac-2011", "jscn-2024"],
    },
  ],
  grades: [
    { claim: "Use a midline or PICC instead of a short peripheral cannula when IV therapy will likely exceed six days", grade: "Category II", source: "cdc-hicpac-2011", quote: "Use a midline catheter or peripherally inserted central catheter (PICC), instead of a short peripheral catheter, when the duration of IV therapy will likely exceed six days." },
    { claim: "No need to replace peripheral catheters more often than every 72 to 96 hours in adults", grade: "Category IB", source: "cdc-hicpac-2011", quote: "There is no need to replace peripheral catheters more frequently than every 72-96 hours to reduce risk of infection and phlebitis in adults [36, 140, 141]." },
    { claim: "Replacing peripheral catheters in adults only when clinically indicated", grade: "Unresolved issue", source: "cdc-hicpac-2011", quote: "No recommendation is made regarding replacement of peripheral catheters in adults only when clinically indicated [142–144]." },
  ],
  sources: [
    {
      key: "jscn-2024",
      label: "Multidisciplinary clinical practice guidelines for the management of extravasation of anticancer drugs (JSCN, JSMO, JASPO)",
      publisher: "ESMO Open (Japanese Society of Cancer Nursing, Japanese Society of Medical Oncology, Japanese Society of Pharmaceutical Oncology)",
      year: 2024,
      url: "https://doi.org/10.1016/j.esmoop.2024.103932",
      doi: "10.1016/j.esmoop.2024.103932",
      gradingScheme: "GRADE and Minds 2020: recommend or not recommend, strong or weak; certainty of evidence A (strong) to D (very weak).",
      read: "full-text",
      accessed: "2026-11-11",
    },
    {
      key: "cdc-hicpac-2011",
      label: "Guidelines for the Prevention of Intravascular Catheter-Related Infections, 2011 (last update October 2017)",
      publisher: "CDC/HICPAC",
      year: 2011,
      url: "https://www.cdc.gov/infection-control/media/pdfs/Guideline-BSI-H.pdf",
      gradingScheme: "Category IA (strongly recommended, strongly supported by well-designed studies), IB (strongly recommended, some studies and strong rationale, or accepted practice), IC (required by regulation), II (suggested), Unresolved issue.",
      read: "full-text",
      accessed: "2026-11-11",
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
      accessed: "2026-11-11",
    },
    {
      key: "west-midlands-2017",
      label: "Guidelines for the Management of Extravasation of a Systemic Anti-Cancer Therapy including Cytotoxic Agents (v1)",
      publisher: "West Midlands Expert Advisory Group for SACT (NHS England)",
      year: 2017,
      url: "https://www.england.nhs.uk/midlands/wp-content/uploads/sites/46/2019/05/management-extravasation-of-a-systemic-anti-cancer-therapy-including-cytotoxic-agents.pdf",
      read: "full-text",
      accessed: "2026-11-11",
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
      accessed: "2026-11-11",
    },
    {
      key: "sispec-2026",
      label: "A GAVeCeLT-IVAS bundle for safe insertion of short peripheral catheters: The SISPeC protocol",
      publisher: "Journal of Vascular Access (GAVeCeLT and IVAS)",
      year: 2026,
      url: "https://doi.org/10.1177/11297298261442098",
      doi: "10.1177/11297298261442098",
      read: "abstract",
      accessed: "2026-11-11",
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
    "The ESMO-EONS extravasation guideline (2012) and the INS Infusion Therapy Standards (2024), which both address peripheral cannulation for vesicants, could not be read.",
    "Vein choice within the arm (forearm rather than hand or antecubital fossa), cannula gauge, the limit on attempts and giving vesicants first rest on expert and network guidance, not trials.",
    "Whether a cannula should be sited on the side of a previous mastectomy without lymphoedema is unsettled; the West Midlands guidance calls it 'still a matter of discussion'.",
    "MAGIC-ONC and the SISPeC bundle were read as abstracts only.",
  ],
});
