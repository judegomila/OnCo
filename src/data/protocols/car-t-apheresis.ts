import { protocol } from "./helpers";
import { EBMT_2019, EBMT_2022, SITC_IEC_2020 } from "./cell-therapy-sources";

/*
 * Leukapheresis to collect the T cells from which an autologous CAR T-cell product is made: scheduling, timing
 * against other treatment, the collection itself and handling of the product.
 *
 * First written 11 November 2026. Second accuracy pass, 17 November 2026: every claim re-read against raw source text.
 * - EBMT/JACIE 2019 best practice recommendations: the open Haematologica PDF (pdftotext; copy saved today by the
 *   car-t-lymphodepletion checker and re-used), in which the checklist before apheresis (Table 3) and the washout
 *   table (Table 4) read as text, so their figures are now given; the first pass could not read them. Columns were
 *   checked in the layout-preserved text. The online supplement on apheresis technique was fetched from
 *   haematologica.org as a PDF and read in full for the first time (venous access, collection target, anticoagulant,
 *   labelling and chain of identity). The PMC full-text XML (PMC7012497, copy saved 16 November by a sibling checker)
 *   was used for the quote check.
 * - SITC 2020: full-text XML from Europe PMC (sibling copy re-used), the recommendation on prior therapies.
 * - KYMRIAH US prescribing information with medication guide, revised 6/2025: the fda.gov PDF (pdftotext; sibling copy
 *   saved today re-used), for how long collection takes.
 * - Cytotherapy 2022 and the SFGM-TC consensus (Bulletin du Cancer 2021): abstracts re-read from Europe PMC; both are
 *   subscription only and no open copy was found. EBMT/JACIE/EHA 2022: abstract only (publisher returned 403 to
 *   sibling checkers on 16 November; not retried).
 * DOIs resolved through Europe PMC and Crossref. Quotes checked by script against the raw text; no quote is taken
 * from a sentence with a superscript, because those mangle (the first pass printed "0.1×109/L" inside a quote).
 *
 * Independent dose re-read, 17 November 2026: the washout periods (EBMT Table 4), the blood counts (Table 3), the
 * anticoagulant ratio and cell target (supplement) and the 3 to 6 hours of the tisagenlecleucel guide were read again
 * in the saved PDF texts, columns checked in the layout-preserved text; none needed changing. The link to
 * obecabtagene autoleucel had no read source, so its US prescribing information (DailyMed SPL XML, version 6, fetched
 * 17 November 2026) was read and added. Its quote was checked by script.
 */
export const carTApheresis = protocol({
  id: "car-t-apheresis",
  name: "Leukapheresis to collect T cells for CAR T-cell manufacture",
  aka: ["leukapheresis for CAR T", "T-cell collection", "apheresis for CAR-T", "starting material collection", "unmobilised leukapheresis"],
  domain: "cell-therapy-toxicity",
  tldr: "CAR T-cell treatment made from your own cells starts with leukapheresis: a tube is placed in a vein and a machine collects some of your white blood cells. One product's patient guide says it takes 3 to 6 hours and may need repeating. The date is agreed with the manufacturer. Where possible it is done before more chemotherapy, and some recent treatments, steroids among them, need a gap first.",
  simple: "To make CAR T cells, a machine collects some of your white blood cells over a few hours. The date is planned with the company that makes the cells.",
  summary: "EBMT/JACIE 2019 (ungraded consensus): agree the leukapheresis date only once the manufacturer has confirmed a manufacturing slot. Any commercially available leukapheresis device is suitable in principle; the procedure resembles unmobilised collection for donor lymphocyte infusions or photopheresis, and in 2019 neither device makers nor CAR T-cell manufacturers had proposed a specific apheresis protocol. Manufacturers qualify collection sites; FACT-JACIE accreditation confirms a quality system.\n\nBefore collection (EBMT Table 3): ECOG performance status 2 or less; haemoglobin above 80 g/L and haematocrit above 0.24; neutrophils above 1.0 x 10^9/L; platelets above 30 x 10^9/L, transfusing as required; absolute lymphocyte count above 0.2 x 10^9/L, a threshold EBMT applies to recovery after corticosteroids, with a higher count needed in small children. The text adds that collection can be done at lymphocyte counts as low as 0.1 x 10^9/L but manufacture is likelier to succeed above 0.5 x 10^9/L. C-reactive protein is recommended; electrolytes and renal function are required. Hepatitis B, hepatitis C, HIV, syphilis and HTLV serology is done within 30 days of leukapheresis, with results available at collection and shipment.\n\nWashout before collection (EBMT Table 4): after allogeneic transplant, off immunosuppression and free of graft-versus-host disease, with a minimum of 1 month recommended; donor lymphocyte infusion 4 weeks (6 to 8 weeks may be safer); high-dose chemotherapy 3 to 4 weeks depending on intensity; CNS-directed therapy 1 week; short-acting cytotoxic or anti-proliferative drugs 3 days; systemic corticosteroids ideally 7 days, with as few as 3 days considered acceptable by Kansagra et al. Where disease burden allows, it may be possible to collect before salvage chemotherapy. Prior blinatumomab is not a contraindication to anti-CD19 CAR T.\n\nCollection (EBMT online supplement): two large-bore venous lines, usually peripheral in patients over 15 kg; ACD-A anticoagulant at 1:10 to 1:12; one to two billion T cells is usually enough to start manufacture; unique patient identifiers and bag labelling keep the chain of identity. Infectious disease markers are also tested on the day of collection, and sterility and cell counts (white cells, haematocrit, CD3+, viable CD45+) are reasonable quality control. Fresh products are kept at 2 to 8 degrees C until shipped; in 2019 one manufacturer (Novartis) required on-site cryopreservation and accepted cells collected within the preceding 18 months. Bridging therapy is given only after collection (see the bridging protocol).\n\nSITC 2020 (LE: 4): prior allogeneic transplant, bispecific T-cell engagers, anti-CD19 antibodies or other antibodies do not rule out CAR T-cell therapy if the disease still expresses the target antigen.",
  asOf: "2026-11-17",
  setting: {
    who: ["nurse", "doctor", "multidisciplinary-team"],
    where: ["outpatient-clinic"],
  },
  population: "Adults and children having a commercially available autologous CAR T-cell product, which is the scope EBMT/JACIE 2019 sets; for a patient in a clinical trial it says the trial protocol is followed. Small children need a higher lymphocyte count and, at low body weight, may need a central line (EBMT Table 3 and online supplement).",
  trigger: "A CAR T-cell centre's multidisciplinary team has decided to treat the patient and the manufacturer has confirmed a manufacturing slot.",
  steps: [
    {
      action: "Agree the leukapheresis date only after the manufacturer has confirmed a manufacturing slot",
      why: "Manufacturing capacity is limited, so the collection has to be timed with the company that makes the cells.",
      source: "ebmt-2019",
      quote: "Confirmation of an agreed manufacturing slot is therefore mandatory prior to deciding on a date for apheresis.",
    },
    {
      action: "Do not rule a patient out because of an earlier donor transplant, a bispecific T-cell engager such as blinatumomab, or antibody treatment, provided the disease still carries the target",
      why: "SITC says people who have had these treatments may still be treated with CAR T cells if the target is still there.",
      source: "sitc-iec-2020",
      quote: "Patients who have previously undergone allo-HSCT, bispecific T cell engager (BiTE) therapy, anti-CD19 monoclonal antibody (mAb) therapy, and mAbs against other targets (eg, rituximab) may be treated with CAR T cells, provided the patient’s disease still expresses the target antigen",
      grade: "LE: 4",
    },
    {
      action: "Consider arranging collection before salvage chemotherapy starts, where the disease burden allows",
      why: "EBMT says there is evidence that the more chemotherapy a person has had, the poorer the quality of their circulating T cells.",
      source: "ebmt-2019",
      quote: "Depending on the disease burden, it may be possible to arrange for leukapheresis before starting salvage chemotherapy to treat disease relapse.",
    },
    {
      action: "Consider a washout period after recent chemotherapy, antibody treatment or radiotherapy before collecting",
      why: "The treatment chosen for a relapse can make a later collection less successful.",
      source: "ebmt-2019",
      quote: "In addition, the choice of salvage therapy (chemotherapy, serotherapy and radiotherapy) may adversely affect subsequent attempts at leukapheresis and washout periods need to be considered.",
    },
    {
      action: "Leave the gaps EBMT recommends: 4 weeks after a donor lymphocyte infusion, 3 to 4 weeks after high-dose chemotherapy depending on its intensity, 1 week after CNS-directed therapy, and 3 days after short-acting cytotoxic or anti-proliferative drugs; after a donor transplant the patient should be off immunosuppression and free of graft-versus-host disease",
      why: "These are the washout periods in EBMT's Table 4. Its comments add that a minimum of 1 month is recommended after a donor transplant, that 6 to 8 weeks after a donor lymphocyte infusion may be safer to rule out graft-versus-host disease, and that blood counts must have recovered after chemotherapy. The table records that the product information gave no guidance on any of these.",
      source: "ebmt-2019",
    },
    {
      action: "Stop systemic corticosteroids ideally 7 days before collection; replacement doses of hydrocortisone may continue",
      why: "EBMT recommends 7 days to limit the effect on the lymphocytes collected, and notes that as few as 3 days was considered acceptable by the authors it adapted the table from. Whatever the timing, it prefers a lymphocyte count above 0.2 x 10^9/L because recent steroids are likely to affect lymphocyte quality.",
      source: "ebmt-2019",
    },
    {
      action: "Check the blood count before collection: haemoglobin above 80 g/L, haematocrit above 0.24, neutrophils above 1.0 x 10^9/L, platelets above 30 x 10^9/L (transfuse as required) and absolute lymphocytes above 0.2 x 10^9/L; repeat the full blood count at the end of the procedure",
      why: "EBMT's checklist gives these as the values for the machine to collect well. The lymphocyte figure applies to recovery after corticosteroids, and small children need a higher count. Collection can be done at lymphocyte counts as low as 0.1 x 10^9/L, but making the product is more likely to succeed above 0.5 x 10^9/L. The procedure can remove more than 30% of circulating platelets.",
      source: "ebmt-2019",
    },
    {
      action: "Check C-reactive protein, electrolytes and kidney function before collection; decide case by case whether a patient with an active infection can be collected",
      why: "C-reactive protein is recommended to look for an ongoing infection. Electrolytes and kidney function are required because apheresis may upset electrolytes and the patient may tolerate only limited fluid.",
      source: "ebmt-2019",
    },
    {
      action: "Test for hepatitis B, hepatitis C, HIV, syphilis and HTLV within 30 days before leukapheresis, and have the results available at collection and shipment",
      why: "EBMT notes this is mandatory in some countries, and that permission to export a patient's cells depends on knowing their viral serology. Only serological testing is required; nucleic acid testing is not necessary if all serology is negative.",
      source: "ebmt-2019",
    },
    {
      action: "Use two large-bore venous access lines; plan any central line ahead of the collection time",
      why: "Peripheral veins usually suffice for adults, adolescents and children over 15 kg; low-weight children, and very occasionally adults, may need a central line. Fresh lines are preferred to long-standing catheters because of the risk of bacterial contamination. Placing a central line late can delay the courier where fresh cells are shipped.",
      source: "ebmt-2019",
      quote: "Two large-bore venous access lines supporting adequate blood flow are required for leukapheresis.",
    },
    {
      action: "Tell the patient how long collection takes",
      why: "The patient guide for tisagenlecleucel (Kymriah) gives 3 to 6 hours and says the collection may need to be repeated. The other sources read give no duration.",
      source: "kymriah-label-2025",
      quote: "It takes 3 to 6 hours and may need to be repeated.",
    },
    {
      action: "Confirm the patient's identity and label the bag with the unique patient identifiers before starting",
      why: "No further identity check is made during manufacture or before the cells are given back, so the chain of identity has to hold from the collection bag to the infusion.",
      source: "ebmt-2019",
      quote: "Prior to apheresis, patient identity is confirmed using standard local procedures and the apheresis bag is labelled in accordance with local and MAH requirements.",
    },
    {
      action: "Anticoagulate with ACD-A, starting at a ratio of 1:10 to 1:12, avoid adding heparin, and monitor electrolytes during the procedure",
      why: "Heparin may interfere with later processing. Faster ACD-A infusion can shift electrolytes, mostly calcium and potassium, which are corrected by mouth or into a vein if necessary.",
      source: "ebmt-2019",
      quote: "Most manufacturers discourage additional use of heparin as it may interfere with down-stream processing.",
    },
    {
      action: "Work out the blood volume to process from the manufacturer's target and the centre's own collection efficiency",
      why: "EBMT says one to two billion T cells is usually enough to start manufacture, and that some manufacturers ask for a set blood volume instead of a cell target. With a very low lymphocyte count more than one collection may be needed, which it expects to be infrequent in adults.",
      source: "ebmt-2019",
      quote: "For normal-sized adults, a peripheral blood CD3+ cell count of 200/µL will usually suffice to achieve reasonable cell doses in the apheresis product.",
    },
    {
      action: "Finish labelling the bag before it is separated from the set with a sterile tube welder, and record at least the start and end times and the product volume",
      why: "Clamps are no longer acceptable for sealing. Some manufacturers specify how much tubing is left on the bag and ask that it is not stripped.",
      source: "ebmt-2019",
      quote: "Apheresis data should be recorded according to local practice, including, as a minimum, apheresis start and end times as well as product volume.",
    },
    {
      action: "Test infectious disease markers on a blood sample on the day of collection, and run sterility testing and cell counts on the product",
      why: "EBMT calls this reasonable quality control. Sampling the product has to follow the manufacturer's requirements so that later processing is not compromised.",
      source: "ebmt-2019",
      quote: "In addition to testing for infectious disease markers in peripheral blood samples on the day of collection, reasonable quality control should include sterility testing as well as some hemocytometric parameters (white blood cell count, hematocrit, CD3+, and viable CD45+ counts).",
    },
    {
      action: "Keep a fresh product refrigerated at 2 to 8 degrees C until it is shipped in the manufacturer's container, or cryopreserve it on site where the manufacturer requires; meet the national rules of both countries for a cross-border shipment",
      why: "Each manufacturer sets how the cells travel. In 2019 one (Novartis) required freezing at the collection centre.",
      source: "ebmt-2019",
      quote: "The other commercial manufacturers will collect fresh apheresis product packed in their own specified shipping containers. Until shipping, these apheresis products are stored refrigerated (2-8°C).",
    },
    {
      action: "Start bridging therapy only after the cells have been collected",
      why: "Treatment given before collection could affect the quality of the CAR T-cell product.",
      source: "ebmt-2019",
      quote: "Whatever treatment is chosen, bridging therapy should only be given after leukapheresis so that the quality of the CAR T-cell product is not affected.",
    },
  ],
  bestInClass: {
    statement: "EBMT/JACIE 2019, with its online supplement, is the only guideline on collection read in full and is the basis here. It is ungraded consensus and said in 2019 that no specific apheresis protocol had been proposed by device or CAR T-cell manufacturers. Its points are practical and uncontested in the sources read: confirm the manufacturing slot, consider collecting before salvage chemotherapy, observe its washout periods (Table 4), meet its blood count checklist (Table 3, with an absolute lymphocyte count above 0.2 x 10^9/L), keep the chain of identity, and follow each manufacturer's handling requirements. It is not the latest European edition: the EBMT/JACIE/EHA 2022 update could be read only as an abstract, as could a 2022 guidance drawn from tisagenlecleucel manufacturing and a French SFGM-TC consensus, so a figure here may have been revised. Accreditation (FACT-JACIE) and manufacturer site qualification govern the detail.",
    sources: ["ebmt-2019", "ebmt-eha-2022", "cytotherapy-2022", "sfgm-tc-2021"],
  },
  variants: [
    {
      name: "Leukapheresis guidance from tisagenlecleucel manufacturing (Cytotherapy 2022)",
      differs: "A review giving recommendations based on experience and data from tisagenlecleucel manufacturing in trials and routine practice. Its abstract names the challenges it covers: vascular access for smaller patients, sufficient T-cell yield, contaminating cell types, washout periods for medication and adverse events at collection.",
      evidence: "Experience-based review; only the abstract was read, so its specific recommendations are not given here.",
      sources: ["cytotherapy-2022"],
    },
    {
      name: "Corticosteroid gap in product information against EBMT's 7 days (EBMT/JACIE 2019, Table 3)",
      differs: "EBMT's checklist records the trial and product information position as three (Kymriah) to 7 (Yescarta) days off corticosteroids, or on no more than the equivalent of prednisolone 5 mg; EBMT itself recommends ideally 7 days.",
      evidence: "Ungraded. EBMT's own Table 4 prints \"No guidance\" in its product information column for systemic corticosteroids, so the two tables do not agree; the product information itself was not checked on this point.",
      sources: ["ebmt-2019"],
    },
    {
      name: "Prospective collection and storage of cells in high-risk patients (EBMT/JACIE 2019, under debate)",
      differs: "Collecting and cryopreserving mononuclear cells in advance from selected patients at high risk of relapse, before CAR T-cell therapy is needed.",
      evidence: "Named by EBMT as under debate; no evidence cited.",
      sources: ["ebmt-2019"],
    },
  ],
  grades: [
    { claim: "EBMT/JACIE 2019 recommendations", grade: "not graded (consensus)", source: "ebmt-2019" },
    { claim: "Prior allogeneic transplant, BiTE or antibody therapy is not a bar if the target is expressed", grade: "LE: 4", source: "sitc-iec-2020" },
    { claim: "Obecabtagene autoleucel label: screen for hepatitis B, hepatitis C and HIV before the cells are collected", grade: "product label (regulatory instruction)", source: "aucatzyl-label-us", quote: "Perform screening for HBV, HCV and HIV in accordance with clinical guidelines before collection of cells for manufacturing." },
  ],
  sources: [
    { ...EBMT_2019, accessed: "2026-11-17" },
    EBMT_2022,
    {
      key: "cytotherapy-2022",
      label: "Leukapheresis guidance and best practices for optimal chimeric antigen receptor T-cell manufacturing",
      publisher: "Cytotherapy (International Society for Cell and Gene Therapy journal)",
      year: 2022,
      url: "https://europepmc.org/abstract/MED/35718701",
      doi: "10.1016/j.jcyt.2022.05.003",
      gradingScheme: "Experience-based recommendations; not graded.",
      read: "abstract",
      accessed: "2026-11-17",
    },
    {
      key: "sfgm-tc-2021",
      label: "How to perform leukapheresis for procurement of the starting material used for commercial CAR T-cell manufacturing: a consensus from experts convened by the SFGM-TC",
      publisher: "Société francophone de greffe de moelle et de thérapie cellulaire, Bulletin du Cancer",
      year: 2021,
      url: "https://europepmc.org/abstract/MED/33610284",
      doi: "10.1016/j.bulcan.2020.11.014",
      gradingScheme: "Expert consensus; not graded.",
      read: "abstract",
      accessed: "2026-11-17",
    },
    { ...SITC_IEC_2020, accessed: "2026-11-17" },
    {
      key: "kymriah-label-2025",
      label: "KYMRIAH (tisagenlecleucel) US prescribing information and medication guide, revised 6/2025",
      publisher: "Novartis; US Food and Drug Administration",
      year: 2025,
      url: "https://www.fda.gov/media/107296/download",
      gradingScheme: "Regulatory prescribing information; not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "aucatzyl-label-us",
      label: "AUCATZYL (obecabtagene autoleucel) US prescribing information, DailyMed version 6, published 6 July 2026",
      publisher: "Autolus; US National Library of Medicine, DailyMed",
      year: 2026,
      url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=4fef6986-b988-45e4-8c20-b14f0ef1f538",
      gradingScheme: "Regulatory prescribing information; not graded.",
      read: "full-text" as const,
      accessed: "2026-11-17",
    },
  ],
  upgrades: [],
  gaps: [
    "EBMT/JACIE 2019 is not the latest European edition. The EBMT/JACIE/EHA 2022 update could be read only as its abstract (the publisher refused a script on 16 November 2026 and Europe PMC holds no full text), so whether it changed any washout period or blood count given here could not be checked. Check the 2022 text before relying on a figure.",
    "The washout periods and blood counts come from EBMT 2019 Tables 3 and 4, read on 17 November 2026 from the open Haematologica PDF. Table 4 is adapted from Kansagra et al., which was not read. The two tables disagree on one point: Table 3 gives product information figures for days off corticosteroids (three for Kymriah, 7 for Yescarta) and Table 4 prints \"No guidance\" for the same column.",
    "EBMT 2019 gives two timings for infectious disease markers, and both are stated here: serology within 30 days before leukapheresis (Tables 2 and 3) and testing on a blood sample on the day of collection (text). Which applies is set by national rules and the manufacturer.",
    "The only duration for the procedure in the sources read is the tisagenlecleucel patient guide's 3 to 6 hours; no source read gives one for other products.",
    "The Cytotherapy 2022 guidance and the SFGM-TC consensus are subscription only and were not read beyond their abstracts on 17 November 2026.",
    "FACT-JACIE standards and individual manufacturers' collection manuals were not read.",
    "The manufacturer requirements EBMT describes (on-site cryopreservation for Novartis, fresh shipment for the others, the 18-month limit) date from 2019 and were not checked against current manufacturer requirements. EBMT 2019 names only tisagenlecleucel and axicabtagene ciloleucel. The US label for obecabtagene autoleucel was read on 17 November 2026: it says the product is made from cells collected by a standard leukapheresis procedure, asks for hepatitis B, hepatitis C and HIV screening before collection, reports manufacturing failure in 5 of 112 patients and says a second manufacture may be attempted after a second collection; it gives no washout periods or blood count thresholds. The product information for lisocabtagene maraleucel, brexucabtagene autoleucel, idecabtagene vicleucel and ciltacabtagene autoleucel was not read for this protocol.",
  ],
  drugs: ["axicabtagene-ciloleucel", "tisagenlecleucel", "lisocabtagene-maraleucel", "brexucabtagene-autoleucel", "idecabtagene-vicleucel", "ciltacabtagene-autoleucel", "obecabtagene-autoleucel"],
  technologies: ["car-t", "apheresis-starting-material", "car-t-manufacturing-process"],
  terms: ["apheresis", "lymphoma-tx-car-t-pathway"],
  related: ["car-t-bridging", "car-t-lymphodepletion"],
  tags: ["protocol", "cell-therapy", "car-t"],
});
