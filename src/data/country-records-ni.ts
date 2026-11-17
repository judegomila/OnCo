import type { EntityInput, InstitutionInput, PaperInput } from "@/lib/schema";

/**
 * Nicaragua: the hospital and papers behind /countries/ni/ (wave 15) that the corpus did not hold. Each was written
 * from its own source, read raw on 16 November 2026: the Ministry of Health's list of hospitals (minsa.gob.ni,
 * Spanish), the ClinicalTrials.gov record NCT04031586, and Europe PMC's indexed abstracts for the papers. Every DOI was
 * resolved through Europe PMC and the figures in `findings` are taken from the indexed abstracts; the year of the
 * HPV screening data (2017) and the basis of its 27.8% figure were read in that paper's open full text.
 *
 * The Ministry of Health, the Nora Astorga radiotherapy centre and the Hospital Escuela Dávila Bolaños are already in
 * the corpus (src/data/institutions/countries-2026-11-americas.ts) and are linked, not duplicated.
 *
 * Inbound links: the children's hospital lists the two childhood cancer papers in keyPapers and each paper links its
 * institutions; the two adult papers link the Ministry of Health and are listed on the country page. Coordinates are
 * an approximate Managua city point, not a building position.
 */
const asOf = "2026-11-16";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });
type P = Omit<PaperInput, "kind" | "asOf">;
const p = (x: P): PaperInput => ({ kind: "paper", asOf, ...x });
const doi = (id: string, label: string) => ({ label, url: `https://doi.org/${id}` });
const pubmed = (pmid: string) => ({ label: "PubMed", url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` });

const MINSA_HOSPITALS = "https://www.minsa.gob.ni/index.php/red-de-salud/hospitales?field_silais_target_id=All&title=&field_departamento_target_id=All&field_municipio_target_id=All&items_per_page=300";

const institutions: InstitutionInput[] = [
  i({ id: "hospital-infantil-manuel-de-jesus-rivera-la-mascota", name: "Hospital Infantil Manuel de Jesús Rivera \"La Mascota\"",
    aka: ["La Mascota", "Hospital Infantil Manuel de Jesús Rivera", "Children's Hospital Manuel de Jesus Rivera", "La Mascota paediatric hospital"],
    city: "Managua", country: "NI", lat: 12.13, lng: -86.25, institutionType: "hospital",
    tldr: "The public children's hospital in Managua, which the Ministry of Health lists as a hospital with national referral services. A twinning programme for childhood leukaemia between it and hospitals in Italy and Switzerland was described in The Lancet in 1998.",
    summary: "The Ministry of Health's list of hospitals, read on 16 November 2026, names the Hospital Infantil Manuel de Jesús Rivera \"La Mascota\" in Managua as a hospital with national referral services. A 1998 paper in The Lancet described the La Mascota twinning programme between the hospital and hospitals in Monza and Milan, Italy, and Bellinzona, Switzerland, built around acute lymphoblastic leukaemia and covering the supply of drugs, the training and supervision of staff and the care of children and their parents. A 2014 paper reported the results for 540 children treated for that leukaemia in Nicaragua from 1995 to 2005, and a 2017 paper reviewed 282 children with five cancers treated at the hospital from 2004 to 2007. The coordinates on this record are an approximate Managua city point.\n\nClinicalTrials.gov lists the hospital as the site of NCT04031586, a completed observational study sponsored by Columbia University of a nutritional programme for children with cancer treated in institutions of the Asociación de Hemato-Oncología Pediátrica de Centro América, the Central American paediatric haematology and oncology association. OnCo read no page of the hospital's own and has no current figures for its cancer unit: beds, staff, the cancers treated today and present survival are not stated here.",
    programs: ["Paediatric haematology and oncology (national referral hospital)", "La Mascota twinning programme with Monza, Milan and Bellinzona", "Site of NCT04031586 (nutritional programme for children with cancer, completed)"],
    institutions: ["minsa-nicaragua", "nora-astorga-radiotherapy-nicaragua"],
    cancers: ["all-leukemia", "childhood-cancers"],
    keyPapers: ["paper-pacheco-childhood-all-nicaragua-pbc-2014", "paper-pribnow-malnutrition-childhood-cancer-nicaragua-pbc-2017"],
    links: [
      { label: "MINSA Nicaragua: hospitals (full list, Spanish)", url: MINSA_HOSPITALS },
      doi("10.1016/s0140-6736(98)07077-9", "Masera G et al., North-South twinning in paediatric haemato-oncology: the La Mascota programme, Nicaragua. Lancet 1998"),
      { label: "ClinicalTrials.gov: NCT04031586", url: "https://clinicaltrials.gov/study/NCT04031586" },
    ] }),
];

const papers: PaperInput[] = [
  p({ id: "paper-pacheco-childhood-all-nicaragua-pbc-2014", name: "Childhood acute lymphoblastic leukaemia in Nicaragua, 1995 to 2005: long-term results",
    journal: "Pediatric Blood & Cancer", year: 2014, doi: "10.1002/pbc.24871", pmid: "24376241", authors: "Pacheco C, Lucchini G, Valsecchi MG, et al.", paperType: "observational", participants: 540,
    tldr: "Of 540 children treated for acute lymphoblastic leukaemia in Nicaragua from 1995 to 2005 within an international cooperation programme, 48.0% were alive at five years and 39.6% at ten, counting children who left treatment as events.",
    summary: "Published as \"Childhood acute lymphoblastic leukemia in Nicaragua: long-term results in the context of an international cooperative program\". The paper describes the results of treating acute lymphoblastic leukaemia, the commonest childhood leukaemia, in Nicaragua from 1995 to 2005 in the setting of an international cooperation programme. Patients under 18 were treated with two consecutive protocols, of 1995 and 2000, with a total duration of therapy of 24 months.",
    findings: [
      "540 patients were treated; 7% died during induction and 9% abandoned treatment.",
      "Event-free survival was 38.1% at 5 years and 36.6% at 10 years, and overall survival 48.0% and 39.6%, with abandonment counted as an event.",
      "The authors name treatment abandonment and a high relapse rate as the factors limiting a higher success rate.",
    ],
    whatItMeans: "It is the one national series of childhood leukaemia outcomes from Nicaragua that OnCo read, and it covers children diagnosed between 1995 and 2005; it does not describe results today.",
    caveats: ["Children diagnosed 1995 to 2005; no later national series was found.", "The abstract says the children were treated in Nicaragua and does not name a hospital. OnCo links the paper to La Mascota because the first author's affiliation in the Europe PMC record is the Department of Pediatric Oncology, Manuel de Jesus Rivera Hospital, Managua, and the 1998 Lancet paper on that hospital's leukaemia cooperation programme shares authors with this one; the abstract does not say whether every child was treated there."],
    institutions: ["hospital-infantil-manuel-de-jesus-rivera-la-mascota", "minsa-nicaragua"], cancers: ["all-leukemia", "childhood-cancers"],
    links: [doi("10.1002/pbc.24871", "Pediatr Blood Cancer 2014"), pubmed("24376241")] }),

  p({ id: "paper-pribnow-malnutrition-childhood-cancer-nicaragua-pbc-2017", name: "Malnutrition and outcomes of children with cancer at La Mascota hospital, Managua, 2004 to 2007",
    journal: "Pediatric Blood & Cancer", year: 2017, doi: "10.1002/pbc.26590", pmid: "28449403", authors: "Pribnow AK, Ortiz R, Báez LF, Mendieta L, Luna-Fineman S.", paperType: "observational", participants: 282,
    tldr: "Two thirds of 282 children newly diagnosed with one of five cancers at Managua's children's hospital from 2004 to 2007 were malnourished at diagnosis, and malnourished children had more severe complications, left treatment more often and had shorter event-free survival.",
    summary: "Published as \"Effects of malnutrition on treatment-related morbidity and survival of children with cancer in Nicaragua\". A retrospective review of patients aged 6 months to 18 years with newly diagnosed acute lymphoblastic leukaemia, acute myeloid leukaemia, Wilms tumour, Hodgkin lymphoma or Burkitt lymphoma treated between 1 January 2004 and 31 December 2007 at Children's Hospital Manuel de Jesus Rivera in Managua.",
    findings: [
      "67% of patients (189 of 282) were malnourished at diagnosis; the share was highest in Wilms tumour (85.7%), Burkitt lymphoma (75%) and acute myeloid leukaemia (74.3%).",
      "92.2% of patients (225 of 244) had treatment-related morbidity in the first 90 days, and malnutrition was associated with severe infection (P = 0.033).",
      "Malnourished patients had a median event-free survival of 2.25 years against 5.58 years (P = 0.049) and abandoned therapy more often (P = 0.015).",
    ],
    whatItMeans: "The authors conclude that a standard nutritional assessment at diagnosis and targeted nutritional support are needed to reduce complications and improve outcomes; a later study at the same hospital (NCT04031586) examined a nutritional programme.",
    caveats: ["Retrospective review at one hospital.", "Children treated 2004 to 2007."],
    institutions: ["hospital-infantil-manuel-de-jesus-rivera-la-mascota"], cancers: ["childhood-cancers", "all-leukemia"],
    links: [doi("10.1002/pbc.26590", "Pediatr Blood Cancer 2017"), pubmed("28449403")] }),

  p({ id: "paper-holme-hpv-screening-nicaragua-bmcph-2020", name: "HPV-based cervical cancer screening in three Nicaraguan provinces: from testing to treatment",
    journal: "BMC Public Health", year: 2020, doi: "10.1186/s12889-020-08601-z", pmid: "32295562", authors: "Holme F, Maldonado F, Martinez-Granera OB, et al.", paperType: "observational", participants: 44635,
    tldr: "HPV testing, mostly on samples women collected themselves, was introduced in three Nicaraguan provinces between 2014 and 2018; in 2017, 44,635 women were screened and 15.2% tested positive, and the authors estimated an overall treatment percentage of 27.8% against WHO's goal of 90%.",
    summary: "Published as \"HPV-based cervical cancer screening in Nicaragua: from testing to treatment\". The authors analysed individual-level data from routinely collected forms for women attending HPV-based screening, which was introduced between 2014 and 2018 in three provinces (Carazo, Chinandega and Chontales); the open full text says the analysis covers screening in 2017. Women who tested positive were triaged with a Pap test or visual inspection with acetic acid before treatment.",
    findings: [
      "44,635 women were screened with HPV testing in 2017, 96.6% of them by self-sampling; 6,776 (15.2%) were HPV positive.",
      "54.0% of screen-positive women received triage and 53.1% of triage-positive women were treated, primarily with cryotherapy; applying the same triage-positive rate to the women lost at triage, the authors put the overall treatment percentage at 27.8%, an estimate that assumes those women were not treated elsewhere.",
      "The odds of receiving treatment after Pap triage were far lower than after visual inspection (adjusted odds ratio 0.05, 95% CI 0.04 to 0.08).",
    ],
    whatItMeans: "Reaching women with an HPV test worked and self-sampling was widely accepted; the step that lost most women was the follow-up of a positive result, particularly where the follow-up test was a Pap smear.",
    caveats: ["Three provinces, not the whole country, and one year of screening (2017).", "Programme data from routine forms.", "The 27.8% is the authors' estimate, not a count of women treated."],
    institutions: ["minsa-nicaragua"], cancers: ["cervical"],
    links: [doi("10.1186/s12889-020-08601-z", "BMC Public Health 2020"), pubmed("32295562")] }),

  p({ id: "paper-pena-galo-gastric-cancer-mortality-nicaragua-cebp-2024", name: "Gastric cancer mortality and years of life lost in Nicaragua, 1997 to 2012",
    journal: "Cancer Epidemiology, Biomarkers & Prevention", year: 2024, doi: "10.1158/1055-9965.epi-23-1392", pmid: "38884563", authors: "Peña-Galo EM, Palacios-Navarro G, Pastora-Membreño J, et al.", paperType: "observational",
    tldr: "The Ministry of Health's death registry recorded 3,886 stomach cancer deaths in Nicaragua between 1997 and 2012, an age-standardised mortality of 13.1 per 100,000 in men and 8.7 in women, with no significant change over the period.",
    summary: "Published as \"High Gastric Cancer Mortality and Years of Life Lost in Nicaragua: A Population-Based Study 1997 to 2012\". The authors note that reliable cancer data and population-based cancer registries are lacking in Nicaragua, El Salvador, Honduras and Guatemala, and used mortality data from the Ministry of Health death registry, which they describe as highly rated, analysed by sex, age, municipality, urban or rural residence, altitude and year.",
    findings: [
      "3,886 stomach cancer deaths were reported between 1997 and 2012, 2,214 (56.9%) of them in men.",
      "Age-standardised mortality was 13.1 per 100,000 in men and 8.7 in women, without significant change over the period (annual percentage change -0.7, P = 0.2).",
      "An average of 17.9 years of life were lost per death, 67,964 years in all.",
    ],
    whatItMeans: "It is a count from Nicaragua's own death registry, and it shows the stomach cancer death rate without significant change through 2012. IARC's mortality estimates for Nicaragua also start from national death data.",
    caveats: ["Deaths to 2012; no later analysis was found.", "Deaths, not new cases: the authors note that population-based registries of new cases are lacking."],
    institutions: ["minsa-nicaragua"], cancers: ["gastric"],
    links: [doi("10.1158/1055-9965.epi-23-1392", "Cancer Epidemiol Biomarkers Prev 2024"), pubmed("38884563")] }),
];

/** Records behind /countries/ni/ (wave 15). */
export const recordsNI: EntityInput[] = [...institutions, ...papers];
