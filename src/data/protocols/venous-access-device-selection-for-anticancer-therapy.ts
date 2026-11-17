import { protocol } from "./helpers";

/*
 * Choosing the venous access device for anticancer treatment: an implanted port, a PICC, a tunnelled central line or a
 * peripheral cannula.
 *
 * First written on 11 November 2026. Second accuracy pass on 17 November 2026: every claim re-read against raw text.
 * - CAVA randomised trial (Moss et al., Lancet 2021): published abstract from the Europe PMC REST record, and the
 *   authors' accepted manuscript as an open PDF from the University of Glasgow repository (pdftotext). The accepted
 *   manuscript's summary prints OR 0.55 (0.38 to 0.79) for ports against Hickman lines where its own results section
 *   and the published abstract print 0.54 (0.37 to 0.77); every primary figure here is the published abstract's.
 * - MAGIC-ONC (Major et al., Ann Intern Med 2025): abstract only (Europe PMC record saved by another checker today);
 *   the publisher answers a script with a bot check and the appropriateness tables were not read.
 * - ITAC 2022 (Farge et al., Lancet Oncol 2022, PMC9236567): full text, Europe PMC XML saved by another checker today.
 * - CDC/HICPAC 2011 intravascular catheter guideline (last update October 2017): full text of the CDC PDF saved by
 *   another checker today; added for the femoral vein recommendation.
 * - ESMO Clinical Practice Guidelines, central venous access in oncology (Sousa et al., Ann Oncol 2015): read in full
 *   on 11 November 2026 from an Internet Archive capture. NOT re-read on 17 November 2026: the publisher's page did
 *   not serve the text, the Internet Archive was refusing automated requests and no open copy was found. No step
 *   rests on it now.
 *
 * Every DOI was resolved through Europe PMC or Crossref and its title checked. Quotes are copied from the raw text with
 * line breaks joined and were re-checked by script; where a sentence carries an inline reference, the quote stops
 * before it.
 */
export const venousAccessDeviceSelectionForAnticancerTherapy = protocol({
  id: "venous-access-device-selection-for-anticancer-therapy",
  name: "Choosing a venous access device for anticancer treatment: port, PICC, tunnelled line or cannula",
  aka: ["port or PICC", "PICC versus port", "Hickman versus port", "choice of central line for chemotherapy", "vascular access device selection", "CAVA trial", "MAGIC-ONC"],
  domain: "vascular-access",
  tldr: "A central line is used when treatment into a vein will last months or arm veins are hard to use. In a UK trial of people having 12 weeks or more of treatment, mostly for solid tumours, an implanted port under the skin had fewer problems than a PICC in the arm or a tunnelled line in the chest. For urgent treatment of acute blood cancers, a PICC or tunnelled line with two channels may suit.",
  simple: "For long treatment, a port under the skin usually causes fewer problems than a PICC or a line in the chest. Ask which device you will have and why.",
  summary: "The CAVA trial (18 UK oncology units, 1061 adults, 2021) compared Hickman-type tunnelled catheters, PICCs and implanted ports for at least 12 weeks of anticancer therapy. The primary outcome was any complication (a composite of infection, venous thrombosis, pulmonary embolus, inability to aspirate blood, mechanical failure and other). Ports had fewer than Hickman lines (29% against 43%, OR 0.54, 95% CI 0.37 to 0.77) and fewer than PICCs (32% against 47%, OR 0.52, 95% CI 0.33 to 0.83). PICCs and Hickman lines had similar rates (52% and 49%, OR 1.15, 95% CI 0.78 to 1.71), and non-inferiority of PICCs was not confirmed, potentially because of inadequate power. The authors concluded that most patients receiving anticancer therapy for solid tumours should receive a port in the NHS. Their accepted manuscript adds that only 89 participants (8%) had haematological cancers, so they make no suggestion for that group, and that ports offer a distinct advantage over PICCs for people with metastatic solid cancers whose treatment is expected to last more than 3 months or to run to several lines.\n\nMAGIC-ONC (2025, RAND/UCLA appropriateness method, 9-member panel, 1422 scenarios) rated a single-lumen tunnelled CVC or a port appropriate for chemotherapy for solid tumours regardless of intensity, urgency or duration, and a double-lumen PICC or tunnelled CVC appropriate for urgent chemotherapy in acute haematological cancers; in advanced chronic kidney disease it recommends coordinating with a nephrologist to preserve veins. ITAC (2022), a thrombosis guideline, suggests ports over PICCs where a central line is needed (guidance) and says catheters should be inserted on the right, in the jugular vein, with the tip at the junction of the superior vena cava and right atrium (1B). CDC (2011) says to avoid the femoral vein in adults (Category IA) and makes no recommendation on the site of a tunnelled line (unresolved issue). ESMO (2015) could not be re-read for this pass.",
  asOf: "2026-11-17",
  setting: {
    who: ["doctor", "nurse", "multidisciplinary-team"],
    where: ["outpatient-clinic", "chemotherapy-day-unit"],
  },
  population: "Adults starting intravenous anticancer treatment. CAVA enrolled adults receiving at least 12 weeks of treatment for solid or haematological cancers in 18 UK oncology units; most had metastatic solid tumours. MAGIC-ONC is about adults with cancer. ITAC makes the same suggestion of ports over PICCs for children, but no paediatric source was read for this page, and lines for apheresis or transplant are not covered.",
  trigger: "A course of intravenous anticancer treatment is planned, or peripheral veins are becoming hard to use.",
  steps: [
    {
      action: "Choose the device according to the cancer type, the reason for treatment and how urgent it is, the person's other conditions and how long the device is expected to stay in",
      why: "An expert panel rated more than a thousand scenarios on these points and found that the appropriate device changed with the type of cancer, the urgency and the planned time in place.",
      source: "magic-onc-2025",
      quote: "Appropriateness of VAD selection varied by type of cancer, treatment urgency, and planned dwell time.",
    },
    {
      action: "For most people with a solid tumour who need a central line for 12 weeks or more of anticancer treatment, consider an implanted port first",
      why: "In the UK CAVA trial 29% of people with a port had a complication against 43% with a Hickman line, and 32% against 47% with a PICC. This is the trial authors' conclusion for the NHS, not a guideline grade.",
      source: "cava-2021",
      quote: "For most patients receiving SACT, PORTs are more effective and safer than both Hickman and PICCs.",
    },
    {
      action: "For urgent chemotherapy in acute haematological cancers, consider a double-lumen PICC or a tunnelled central line",
      why: "The panel rated these appropriate whatever the treatment intensity or the kind of infusion. The abstract does not give the panel's reasons.",
      source: "magic-onc-2025",
      quote: "For patients with acute hematologic cancers requiring urgent chemotherapy, placement of a double-lumen peripherally inserted central catheter (PICC) or a tunneled central venous catheter (CVC) was rated as appropriate, regardless of treatment intensity or infusate characteristics.",
    },
    {
      action: "Where a central line is needed, consider a port rather than a PICC to lower the risk of a clot",
      why: "ITAC suggests this as expert consensus under preventing catheter-related clots. It cites one randomised trial of 399 patients in which PICCs carried a higher risk of clots and adverse events than ports, and one of 93 patients with acute myeloid leukaemia in which PICCs had fewer catheter-related clots than centrally inserted lines.",
      source: "itac-2022",
      quote: "In patients requiring central venous catheters, we suggest the use of implanted ports over peripherally inserted central catheter lines (guidance).",
      grade: "guidance",
    },
    {
      action: "Insert central catheters on the right side, in the jugular vein, with the tip at the junction of the superior vena cava and right atrium",
      why: "ITAC gives this as a way to prevent clots forming around the line. ITAC is a guideline on thrombosis.",
      source: "itac-2022",
      quote: "Catheters should be inserted on the right side, in the jugular vein, and the distal extremity of the central catheter should be located at the junction of the superior vena cava and the right atrium (grade 1B).",
      grade: "1B",
    },
    {
      action: "Avoid the femoral vein for central venous access in adults",
      why: "CDC says lines in the groin are colonised by bacteria more often and are associated with a higher risk of deep vein thrombosis than lines in the neck or under the collarbone.",
      source: "cdc-2011",
      quote: "Avoid using the femoral vein for central venous access in adult patients",
      grade: "Category IA",
    },
    {
      action: "In advanced chronic kidney disease, coordinate care with a kidney specialist so that veins are preserved, taking the cancer prognosis into account",
      why: "The MAGIC-ONC panel recommended this. The abstract does not say more about how.",
      source: "magic-onc-2025",
      quote: "In patients with advanced chronic kidney disease, coordination of care with a nephrologist to ensure vein preservation in the context of cancer prognosis was recommended.",
    },
  ],
  bestInClass: {
    statement: "For solid tumours needing a central line for 12 weeks or more, an implanted port: the CAVA randomised trial found fewer complications than with PICCs or Hickman lines, ITAC (2022) suggests ports over PICCs (guidance), and MAGIC-ONC (2025) rates a port or single-lumen tunnelled line appropriate. For urgent treatment of acute haematological cancers, a double-lumen PICC or tunnelled line (MAGIC-ONC); CAVA had too few such patients to say. ITAC says right-sided jugular insertion with the tip at the cavoatrial junction (1B), to prevent clots; CDC says avoid the femoral vein in adults (Category IA) and leaves the site of a tunnelled line unresolved for infection. The sources agree in direction; MAGIC-ONC rates the tunnelled line alongside the port for solid tumours, while CAVA found ports superior to Hickman lines.",
    sources: ["cava-2021", "cava-2021-aam", "magic-onc-2025", "itac-2022", "cdc-2011"],
  },
  variants: [
    {
      name: "PICC as the default device",
      differs: "Places a PICC for most courses. The CAVA authors describe a large expansion of nurse-led PICC services in UK oncology units during the trial, and call PICCs the easiest of the three devices to place and remove and ports the most complex.",
      evidence: "CAVA: PICCs had more complications than ports (47% against 32%, OR 0.52 for ports) and similar rates to Hickman lines. The accepted manuscript reports venous thrombosis in 11% with PICCs against 2% with ports (p=0.002) and mechanical failure in 11% against 3%, but infection of any type in 8% with PICCs against 12% with ports; ports cost more in total (a difference of £1665), but not per week in place, because they stayed in longer. On a device-specific questionnaire, quality of life favoured ports on 8 of 16 questions. ITAC suggests ports over PICCs (guidance).",
      sources: ["cava-2021", "cava-2021-aam", "itac-2022"],
    },
  ],
  grades: [
    { claim: "Ports superior to Hickman lines for complications", grade: "Randomised trial result (OR 0.54, 95% CI 0.37 to 0.77)", source: "cava-2021", quote: "PORTs were superior to Hickman with a complication rate of 29% (73 of 253) versus 43% (131 of 303; OR 0·54 [95% CI 0·37-0·77])." },
    { claim: "Ports superior to PICCs for complications", grade: "Randomised trial result (OR 0.52, 95% CI 0.33 to 0.83)", source: "cava-2021", quote: "PORTs were superior to PICCs with a complication rate of 32% (47 of 147) versus 47% (93 of 199; OR 0·52 [0·33-0·83])." },
    { claim: "PICCs not shown to be non-inferior to Hickman lines", grade: "Randomised trial result (OR 1.15, 95% CI 0.78 to 1.71)", source: "cava-2021", quote: "Although the observed difference was less than 10%, non-inferiority of PICCs was not confirmed (odds ratio [OR] 1·15 [95% CI 0·78-1·71]) potentially due to inadequate power." },
    { claim: "Ports suggested over PICCs where a central line is needed", grade: "guidance", source: "itac-2022", quote: "In patients requiring central venous catheters, we suggest the use of implanted ports over peripherally inserted central catheter lines (guidance)." },
    { claim: "Right-sided jugular insertion with the tip at the cavoatrial junction", grade: "1B", source: "itac-2022", quote: "Catheters should be inserted on the right side, in the jugular vein, and the distal extremity of the central catheter should be located at the junction of the superior vena cava and the right atrium (grade 1B)." },
    { claim: "Avoid the femoral vein in adults", grade: "Category IA", source: "cdc-2011", quote: "Avoid using the femoral vein for central venous access in adult patients" },
    { claim: "Solid tumours: single-lumen tunnelled CVC or port appropriate for chemotherapy", grade: "Rated appropriate (RAND/UCLA)", source: "magic-onc-2025", quote: "For patients with malignant solid tumors, a single-lumen tunneled CVC or implanted port was rated as appropriate for delivering chemotherapy, regardless of treatment intensity, urgency, or duration." },
  ],
  sources: [
    {
      key: "cava-2021",
      label: "Central venous access devices for the delivery of systemic anticancer therapy (CAVA): a randomised controlled trial",
      publisher: "The Lancet (Moss et al.)",
      year: 2021,
      url: "https://doi.org/10.1016/S0140-6736(21)00766-2",
      doi: "10.1016/S0140-6736(21)00766-2",
      read: "abstract",
      accessed: "2026-11-17",
    },
    {
      key: "cava-2021-aam",
      label: "Cancer and Venous Access (CAVA): a randomised controlled trial of central venous access devices for the delivery of systemic anti-cancer therapy (author accepted manuscript of the Lancet paper)",
      publisher: "University of Glasgow, Enlighten repository (Moss et al.)",
      year: 2021,
      url: "https://eprints.gla.ac.uk/237537/",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "magic-onc-2025",
      label: "The Michigan Appropriateness Guide for Intravenous Catheters in Adult Patients With Cancer (MAGIC-ONC): Results From a Multispecialty Panel Using the RAND/UCLA Appropriateness Method",
      publisher: "Annals of Internal Medicine (Major et al.)",
      year: 2025,
      url: "https://doi.org/10.7326/ANNALS-25-02523",
      doi: "10.7326/ANNALS-25-02523",
      gradingScheme: "RAND/UCLA appropriateness method: each scenario rated appropriate, neutral or uncertain, or inappropriate by a 9-member panel.",
      read: "abstract",
      accessed: "2026-11-17",
    },
    {
      key: "itac-2022",
      label: "2022 international clinical practice guidelines for the treatment and prophylaxis of venous thromboembolism in patients with cancer, including patients with COVID-19",
      publisher: "International Initiative on Thrombosis and Cancer (ITAC), endorsed by the ISTH (Lancet Oncology, Farge et al.)",
      year: 2022,
      url: "https://doi.org/10.1016/S1470-2045(22)00160-7",
      doi: "10.1016/S1470-2045(22)00160-7",
      gradingScheme: "GRADE: evidence A (high) to D (very low); recommendation grade 1 (strong) or 2 (weak); 'guidance' (best clinical practice) where there is no clear evidence, based on expert consensus.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "cdc-2011",
      label: "Guidelines for the Prevention of Intravascular Catheter-Related Infections, 2011 (last update October 2017)",
      publisher: "CDC/HICPAC",
      year: 2011,
      url: "https://www.cdc.gov/infection-control/media/pdfs/Guideline-BSI-H.pdf",
      doi: "10.1093/cid/cir257",
      gradingScheme: "Category IA (strongly recommended, strongly supported by well-designed studies), IB (strongly recommended, some studies and strong rationale, or accepted practice), IC (required by regulation), II (suggested), Unresolved issue.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "esmo-2015",
      label: "Central venous access in oncology: ESMO Clinical Practice Guidelines",
      publisher: "ESMO (Annals of Oncology, Sousa et al.)",
      year: 2015,
      url: "https://doi.org/10.1093/annonc/mdv296",
      doi: "10.1093/annonc/mdv296",
      read: "not-reachable",
      accessed: "2026-11-17",
    },
  ],
  technologies: ["implanted-ports", "picc-lines", "infusion-devices-vascular-access"],
  terms: ["central-venous-access"],
  related: ["implanted-port-access-and-care", "picc-and-tunnelled-line-care", "catheter-related-thrombosis-in-cancer"],
  upgrades: [],
  gaps: [
    "On 17 November 2026 the ESMO guideline on central venous access (2015) could not be re-read: the publisher's page did not serve the text to a script, the Internet Archive was refusing automated requests and no open copy was found. When it was read on 11 November 2026 this page took from it that the femoral vein should be avoided unless the other sites cannot be used [I, A] and that the main limitation of PICCs is shorter longevity from a higher risk of thrombosis. Neither could be re-verified, so the femoral step now rests on CDC and the second statement has been taken off the page. No newer ESMO edition was found.",
    "MAGIC-ONC was read as an abstract only. Its full appropriateness tables, including when a peripheral cannula or midline is appropriate and the panel's reasons, were not read.",
    "The published CAVA paper was read as an abstract; the other CAVA figures come from the authors' accepted manuscript, which may differ from the published version. The fuller NIHR report of the trial (Health Technology Assessment 2021, DOI 10.3310/hta25470) was not read.",
    "CAVA cannot say which device is best in haematological cancers: 89 participants (8%) had one, and the authors make no suggestion for that group. No source read gives a threshold in weeks below which a peripheral cannula is enough; CAVA studied treatment of 12 weeks or more.",
    "The guidelines differ on the insertion site because they answer different questions. ITAC, for clot prevention, says the right jugular vein (1B). CDC, for infection, prefers the subclavian site for non-tunnelled lines in adults (Category IB) and makes no recommendation for tunnelled lines.",
    "When a peripheral cannula is enough, and whether midlines have any role for anticancer drugs, are not settled by the sources read here.",
    "The INS Infusion Therapy Standards of Practice (2024), which address device selection, refuse a script and could not be read.",
    "On 17 November 2026 no newer edition of ITAC 2022, MAGIC-ONC 2025 or the CDC 2011 guideline (last update October 2017) was found. The CDC guideline and the ESMO guideline are more than ten years old.",
  ],
});
