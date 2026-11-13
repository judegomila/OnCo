import { protocol } from "./helpers";
import { EBMT_2019, EBMT_2022, SITC_IEC_2020 } from "./cell-therapy-sources";

/*
 * Leukapheresis to collect the T cells from which an autologous CAR T-cell product is made: scheduling, timing
 * against other treatment, the collection itself and handling of the product.
 *
 * What was read, and how (11 November 2026, fetched raw and read as text):
 * - EBMT/JACIE 2019 best practice recommendations: full text (PMC7012497), the sections on work-up before apheresis
 *   and how to perform leukapheresis. Its checklist (Table 3), washout table (Table 4) and online supplement on
 *   apheresis technique were not read (tables are images; the supplement was not fetched).
 * - Leukapheresis guidance from tisagenlecleucel experience (Cytotherapy 2022) and the SFGM-TC French expert consensus
 *   (Bulletin du Cancer 2021): abstracts only, from Europe PMC.
 * - SITC 2020 (prior therapies) full text; EBMT/JACIE/EHA 2022 abstract only (./cell-therapy-sources.ts).
 * DOIs resolved through Europe PMC. Quotes checked by script against the raw text.
 */
export const carTApheresis = protocol({
  id: "car-t-apheresis",
  name: "Leukapheresis to collect T cells for CAR T-cell manufacture",
  aka: ["leukapheresis for CAR T", "T-cell collection", "apheresis for CAR-T", "starting material collection", "unmobilised leukapheresis"],
  domain: "cell-therapy-toxicity",
  tldr: "Every CAR T-cell treatment made from your own cells starts with leukapheresis: over a few hours, blood is taken from a vein, a machine keeps the white cells it needs, and the rest is returned. The date is booked with the manufacturer. Where possible it is done before more chemotherapy, which can weaken the T cells, and some recent treatments need a gap before collection.",
  simple: "To make CAR T cells, a machine collects some of your white blood cells over a few hours. The date is planned with the company that makes the cells.",
  summary: "EBMT/JACIE 2019: book leukapheresis only once the manufacturer has confirmed a manufacturing slot. Any approved leukapheresis device may be used; the procedure resembles unmobilised collection for donor lymphocytes or photopheresis, and no device-specific protocol has been issued by device or CAR T-cell manufacturers. Sites must be qualified by the manufacturer; FACT-JACIE accreditation confirms a quality system. Collection is possible with absolute lymphocyte counts as low as 0.1 x 10^9/L, but manufacturing success is likelier above 0.5 x 10^9/L. Where disease allows, collect before salvage chemotherapy, because cumulative chemotherapy harms T-cell quality, and respect washout periods after recent treatments (EBMT Table 4, not read). Prior blinatumomab does not rule out anti-CD19 CAR T. Infectious disease markers are tested on the day of collection; sterility and cell counts (white cells, haematocrit, CD3+, viable CD45+) are reasonable quality control. Fresh products are kept at 2 to 8 degrees until shipped; one manufacturer (Novartis) requires on-site cryopreservation and accepts cells collected within the preceding 18 months.\n\nSITC 2020 (LE: 4): prior allogeneic transplant, bispecific T-cell engagers or anti-CD19 or other antibodies do not exclude CAR T-cell therapy if the target antigen is still expressed. Bridging therapy starts only after collection (see the bridging protocol).",
  asOf: "2026-11-11",
  setting: {
    who: ["nurse", "doctor", "multidisciplinary-team"],
    where: ["outpatient-clinic"],
  },
  population: "Adults and children referred for a commercial autologous CAR T-cell product. Children may need different vascular access (Cytotherapy 2022 abstract names this as a challenge). Allogeneic and investigational products follow their own protocols.",
  trigger: "A treating centre has accepted the patient for CAR T-cell therapy and the manufacturer has offered a slot.",
  steps: [
    {
      action: "Book leukapheresis only after the manufacturer has confirmed a manufacturing slot",
      why: "Manufacturing capacity is limited, and collected cells must go straight into a booked production run.",
      source: "ebmt-2019",
      quote: "Confirmation of an agreed manufacturing slot is therefore mandatory prior to deciding on a date for apheresis.",
    },
    {
      action: "Collect before starting salvage chemotherapy where the disease allows",
      why: "The more chemotherapy a person has had, the poorer the T cells tend to be.",
      source: "ebmt-2019",
      quote: "Depending on the disease burden, it may be possible to arrange for leukapheresis before starting salvage chemotherapy to treat disease relapse.",
    },
    {
      action: "Check the lymphocyte count; aim to collect when it is above 0.5 x 10^9/L where possible",
      why: "Collection works at lower counts, but making the product is more likely to succeed with more lymphocytes.",
      source: "ebmt-2019",
      quote: "Although apheresis can be performed in patients with absolute lymphocyte counts as low as 0.1×109/L, the likelihood of reaching the target number of autologous lymphocytes and successfully manufacturing the drug product is higher in individuals with absolute lymphocyte counts exceeding 0.5×109/L.",
    },
    {
      action: "Allow washout periods after recent chemotherapy, antibodies or radiotherapy before collecting",
      why: "Recent treatment can reduce the number and fitness of the T cells collected.",
      source: "ebmt-2019",
      quote: "In addition, the choice of salvage therapy (chemotherapy, serotherapy and radiotherapy) may adversely affect subsequent attempts at leukapheresis and washout periods need to be considered.",
    },
    {
      action: "Do not exclude a patient because of earlier transplant, blinatumomab or anti-CD19 antibodies, provided the cancer still carries the target",
      why: "These treatments do not stop CAR T cells working if the target is still there.",
      source: "sitc-iec-2020",
      quote: "Patients who have previously undergone allo-HSCT, bispecific T cell engager (BiTE) therapy, anti-CD19 monoclonal antibody (mAb) therapy, and mAbs against other targets (eg, rituximab) may be treated with CAR T cells, provided the patient’s disease still expresses the target antigen",
      grade: "LE: 4",
    },
    {
      action: "Test infectious disease markers on the day of collection and run sterility and cell-count quality control on the product",
      why: "Regulations require the markers, and a contaminated or poor product cannot be manufactured.",
      source: "ebmt-2019",
      quote: "In addition to testing for infectious disease markers in peripheral blood samples on the day of collection, reasonable quality control should include sterility testing as well as some hemocytometric parameters (white blood cell count, hematocrit, CD3+, and viable CD45+ counts).",
    },
    {
      action: "Store a fresh product refrigerated at 2 to 8 degrees until shipping, or cryopreserve it on site where the manufacturer requires",
      why: "Each manufacturer sets how the cells must travel; one requires freezing at the collection centre.",
      source: "ebmt-2019",
      quote: "The other commercial manufacturers will collect fresh apheresis product packed in their own specified shipping containers. Until shipping, these apheresis products are stored refrigerated (2-8°C).",
    },
  ],
  bestInClass: {
    statement: "EBMT/JACIE 2019 is the only guideline on collection read in full and is the basis here; it is ungraded and says no apheresis-specific protocol has been proposed by device or CAR T-cell manufacturers. Its points are practical and uncontested in the sources read: confirm the manufacturing slot, collect before further chemotherapy where possible, aim for a lymphocyte count above 0.5 x 10^9/L, observe washout periods, and follow each manufacturer's handling requirements. The European 2022 update, a 2022 guidance drawn from tisagenlecleucel manufacturing and a French SFGM-TC consensus could be read only as abstracts. Accreditation (FACT-JACIE) and manufacturer site qualification govern the detail.",
    sources: ["ebmt-2019", "ebmt-eha-2022", "cytotherapy-2022", "sfgm-tc-2021"],
  },
  variants: [
    {
      name: "Leukapheresis guidance from tisagenlecleucel manufacturing (Cytotherapy 2022)",
      differs: "Recommendations on timing, location, vascular access in small patients, T-cell yield, contaminating cells, washout periods and adverse events at collection, based on tisagenlecleucel trial and real-world manufacturing.",
      evidence: "Experience-based review; only the abstract was read, so its specific recommendations are not given here.",
      sources: ["cytotherapy-2022"],
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
  ],
  sources: [
    EBMT_2019,
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
      accessed: "2026-11-11",
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
      accessed: "2026-11-11",
    },
    SITC_IEC_2020,
  ],
  upgrades: [],
  gaps: [
    "The EBMT 2019 washout table (Table 4, adapted from Kansagra et al.) is an image and was not read, so no washout interval for any drug is stated here.",
    "The EBMT 2019 online supplement on apheresis technique, the Cytotherapy 2022 guidance and the SFGM-TC consensus were not read beyond their abstracts.",
    "FACT-JACIE standards and individual manufacturers' collection manuals were not read.",
    "Several manufacturers have changed their requirements since 2019; which still require on-site cryopreservation was not checked.",
  ],
  drugs: ["axicabtagene-ciloleucel", "tisagenlecleucel", "lisocabtagene-maraleucel", "brexucabtagene-autoleucel", "idecabtagene-vicleucel", "ciltacabtagene-autoleucel", "obecabtagene-autoleucel"],
  technologies: ["car-t", "apheresis-starting-material", "car-t-manufacturing-process"],
  terms: ["apheresis", "lymphoma-tx-car-t-pathway"],
  related: ["car-t-bridging", "car-t-lymphodepletion"],
  tags: ["protocol", "cell-therapy", "car-t"],
});
