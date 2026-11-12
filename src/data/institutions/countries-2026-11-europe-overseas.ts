import type { InstitutionInput } from "@/lib/schema";

/**
 * Institution census, europe-overseas group: Armenia, Albania, North Macedonia, Montenegro, Cyprus, Malta, Luxembourg,
 * Iceland and the French overseas territories La Réunion, Martinique, Guadeloupe, French Guiana, French Polynesia and
 * New Caledonia (country codes RE, MQ, GP, GF, PF, NC). Each record was written from sources read as raw text with curl
 * on 11 November 2026: the institutions' own sites, ministries, regulators and payers, the IAEA DIRAC public country
 * table (GetCountriesAndRegions JSON), the European Network of Cancer Registries member list, the UICC member pages,
 * ClinicalTrials.gov API v2 location lists, ARS and INCa documents (PDFs read with pdftotext), and three papers whose
 * DOIs were resolved through Europe PMC with figures taken from the indexed abstracts.
 *
 * DIRAC denominators: Armenia 3 radiotherapy centres, Albania 2, North Macedonia 2, Cyprus 2, Montenegro 1, Malta 1,
 * Luxembourg 1, Iceland 1, La Réunion 2, Martinique 1, Guadeloupe 1; DIRAC has no row for French Guiana, French
 * Polynesia or New Caledonia, although the Polynesian hospital and the Médipôle in Nouméa describe radiotherapy.
 *
 * Coordinates: Wikidata P625 for the institution's item where one exists, otherwise OpenStreetMap Nominatim for the
 * named building or address; where only a street or a city point was available, the summary says so.
 *
 * Not read:
 * - moh.am (Ministry of Health, Armenia): the page is a JavaScript shell; gov.am answered with a Radware captcha.
 * - hematology.am, erebouni.am, yeolyan.am: host names do not resolve; arka.am and armenpress.am: 403.
 * - immonc.org/about-us: 404; doctors.am institution page for the Hematology Center: 500.
 * - shendetesia.gov.al (Ministry of Health and Social Protection, Albania): Incapsula script challenge.
 * - fzo.org.mk (Health Insurance Fund, North Macedonia): 403. No website found for the Bitola clinical hospital.
 * - health.gov.mt, alliedhealthservices.gov.mt, publicservice.gov.mt (Malta): 403 Cloudflare; maltatoday.com.mt: JavaScript
 *   challenge; medicinesauthority.gov.mt/about-us: error page; iaea.org/node/101311: 403.
 * - ijzcg.me (Institute of Public Health, Montenegro): JavaScript only; fzocg.me/o-fondu: navigation only.
 * - hio.org.cy: timed out; moh.gov.cy Pharmaceutical Services and Health Monitoring Unit pages: 404, so no Cyprus
 *   medicines regulator record.
 * - cancerregistry.is: timed out (krabb.is read instead).
 * - ch-cayenne.fr: expired TLS certificate; www.crnc.nc: TLS name mismatch (crnc.nc read); francim-resau.org: DNS failure.
 * - UICC member page for the Institut du cancer de Polynésie française: 404; icpf.pf/contact: 500; cps.pf subpages:
 *   JavaScript only; INCa PDF on Martinique registry projects: served a landing page, not the PDF.
 * - Not attempted: the Caisses générales de sécurité sociale of the four overseas departments, INCa's national list of
 *   authorised cancer treatment sites.
 */
const asOf = "2026-11-11";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });

const DIRAC_JSON = "https://dirac.iaea.org/api/DataGridWebApi/GetCountriesAndRegions";
const SURVIE_MQ = "https://www.martinique.ars.sante.fr/media/121387/download";
const SURVIE_RE = "https://lareunion.ars.sante.fr/media/120970/download";
const ARS_RE_RT = "https://www.lareunion.ars.sante.fr/system/files/2023-07/Radioth%C3%A9rapie%20externe%2C%20curieth%C3%A9rapie%20.pdf";
const GF_ROADMAP = "https://www.guyane.ars.sante.fr/media/115886/download?inline";
const CHUG_RT = "https://www.chu-guadeloupe.fr/portal/offre-de-soins/u-387-343.html?args=kp4NEF%2Ayxu2Suv1C62M_FU%2Ast71S2HKo9YSNui4Akf3%2ALVWqVVQ47tB58uedpQHtnljW61_KnmGHm864ne03sQ&offre_soin_service_id=22";
const CHUG_REGISTRES = "https://www.chu-guadeloupe.fr/portal/offre-de-soins/fiches-services-387-343.html?args=kp4NEF%2Ayxu2Suv1C62M_FU%2Ast71S2HKo9YSNui4Akf2MwcHp6BeNoKBtwxA2Ws1OXTRSsONsGrb8ez5LGDrsnw&offre_soin_service_id=89";
const INCA_GP_REG = "https://en-www.cancer.fr/content/download/6486/file/Projets%20de%20recherche%20du%20RG%20des%20cancers%20de%20Guadeloupe%20en%202023.pdf?version=4";
const SPF_CARIB_DIGESTIVE = "https://www.santepubliquefrance.fr/index.php/en/node/30409";
const CHU_GUYANE_RESEARCH = "https://www.chu-guyane.fr/articles/recherche-en-cancerologie-le-chu-de-guyane-pret-a-se-lancer";
const ICPF_EVASAN = "https://www.icpf.pf/patient-evasan/";
const ICPF_REG_REPORT = "https://www.icpf.pf/wp-content/uploads/2026/07/Rapport-Registre-2019-2021.pdf";
const CHPF_RT = "https://www.chpf.pf/wp-content/uploads/2019/01/pr%C3%A9sentation-g%C3%A9n%C3%A9rale-du-service-radioth%C3%A9rapie-oncologie.pdf";
const DASS_CANCER = "https://dass.gouv.nc/votre-sante-maladies/le-cancer";
const ONCO_NC_ABOUT = "https://www.onco.nc/312-2/";
const ENCR_LIST = "https://www.encr.eu/encr-members-contact-list";

export const institutionsCountriesEuropeOverseas: InstitutionInput[] = [
  // Armenia
  i({ id: "ministry-of-health-armenia", name: "Ministry of Health of the Republic of Armenia", aka: ["Հայաստանի Հանրապետության առողջապահության նախարարություն", "MoH Armenia", "RA Ministry of Health"],
    city: "Yerevan", country: "AM", lat: 40.178, lng: 44.513, institutionType: "government", website: "https://www.moh.am/",
    tldr: "Armenia's health ministry. The national medicines expert body answers to it, the minister sets the rules for assessing clinical trials, and it runs the haematology centre where children with cancer are treated.",
    summary: "The Ministry of Health of the Republic of Armenia is the government ministry for health. The Scientific Centre of Drug and Medical Technology Expertise, which evaluates medicines for state registration and examines clinical trial protocols, is accountable to it, and the minister's Order N322-N of 4 November 2024 approved the rules for expert assessment and monitoring of clinical trials. The Hematology Center after Prof. R. Yeolyan, where the Pediatric Cancer and Blood Disorders Center of Armenia works, is described by Yerevan's municipality as a Ministry of Health centre; its 2016 modernisation was carried out by the Ministry with government and World Bank funds. Erebouni Medical Center's patient page says a Universal Health Insurance system was introduced from 1 January 2026 and is being implemented in phases, first covering groups that include people under 18 and people aged 65 and over, and that the lists of covered diseases, screenings and medicines are published by the Ministry and the Insurance Fund. The coordinates are an approximate Yerevan city point. The Ministry's own site needs a browser to render and was not read.",
    programs: ["Universal Health Insurance system (introduced from 1 January 2026, in phases)", "Rules for expert assessment and monitoring of clinical trials (Order N322-N, 2024)"],
    // TODO: re-link national-center-of-oncology-armenia (defined in the country deep dive, PR #395) once it merges.
    institutions: ["scdmte-armenia", "hematology-center-yeolyan", "erebouni-medical-center"],
    links: [
      { label: "Scientific Centre of Drug and Medical Technology Expertise: about us", url: "https://www.pharm.am/index.php/en/aboutus" },
      { label: "Scientific Centre of Drug and Medical Technology Expertise: home page, orders of the Minister of Health", url: "https://www.pharm.am/" },
      { label: "Yerevan Municipality: modernised Center of Hematology opened (8 November 2016)", url: "https://www.yerevan.am/en/news/mayrak-aghak-owm-handisavorowt-yamb-bats-vel-en-ardiakanats-vats-aryownabanakan-kentrone-ew-m-saryan" },
      { label: "Erebouni Medical Center: Universal Health Insurance System", url: "https://www.erebunimed.com/eng/medical-insurance" },
    ] }),

  i({ id: "scdmte-armenia", name: "Scientific Centre of Drug and Medical Technology Expertise", aka: ["SCDMTE", "Centre of Drug and Medical Technology Expertise", "pharm.am"],
    city: "Yerevan", country: "AM", lat: 40.208, lng: 44.518, institutionType: "government", website: "https://www.pharm.am/",
    tldr: "Armenia's medicines expert body. It assesses medicines before they can be registered, watches for side effects once they are in use, and reviews the plans for clinical trials run in Armenia.",
    summary: "The Scientific Centre of Drug and Medical Technology Expertise was founded in 1992 as an organisation with managerial, financial and technical independence, accountable to the Ministry of Health. Its listed activities include expert assessment of medicines, herbal medicines and medical devices for state registration, expertise for import and export certification, quality control and detection of counterfeit medicines, quotas for narcotic and psychotropic substances, registration of adverse drug reactions with reporting to the WHO programme for international drug monitoring in Uppsala, review of the National Essential Medicines List, and expertise of clinical trial protocols and monitoring of trials under way. It says it employs more than 80 experts. Its site publishes the Eurasian Economic Union's Decision N78 of 3 November 2016 on rules for medicines registration and assessment, and the minister's 2024 orders on clinical trial assessment. Its contact page gives 49/5 Komitas Avenue, Yerevan; the coordinates are OpenStreetMap's point for that address.",
    programs: ["Expert assessment of medicines for state registration", "Registration under Eurasian Economic Union rules (Decision N78, 2016)", "Expertise of clinical trial protocols and monitoring of trials", "Adverse drug reaction monitoring"],
    institutions: ["ministry-of-health-armenia", "who"],
    links: [
      { label: "SCDMTE: about us", url: "https://www.pharm.am/index.php/en/aboutus" },
      { label: "SCDMTE: contacts", url: "https://www.pharm.am/index.php/en/contacts" },
      { label: "SCDMTE: home page and announcements", url: "https://www.pharm.am/" },
    ] }),

  i({ id: "hematology-center-yeolyan", name: "Hematology Center after Prof. R. Yeolyan", aka: ["Yeolyan Hematology Center", "Yolyan Hematology Center", "Pediatric Cancer and Blood Disorders Center of Armenia", "Center of Pediatric Oncology and Hematology of Armenia"],
    city: "Yerevan", country: "AM", lat: 40.206, lng: 44.532, institutionType: "hospital",
    tldr: "A Ministry of Health centre in Yerevan for blood diseases, with a bone marrow transplant department. The children's cancer and blood disorders centre works inside it, and a palliative care clinic for children opened there in 2021.",
    summary: "Yerevan's municipality described the Center of Hematology after Prof. R. Yeolyan in November 2016 as the Ministry of Health's centre for diagnosis and treatment of blood diseases, reopening after the Ministry renovated its seven-storey building and built a new three-storey one with government and World Bank funds, and adding a bone marrow transplantation department and a stem cell laboratory. The Mirror-Spectator reported in December 2020 that the Center of Pediatric Oncology and Hematology of Armenia is in the Yolyan Hematology Center building, and that from October 2018 it provided free treatment to children and young people up to 25 with cancer or blood disorders. The City of Smile Charitable Foundation says the Pediatric Cancer and Blood Disorders Center of Armenia signed a memorandum with St. Jude Children's Research Hospital on 12 April 2019, joining the St. Jude Global Alliance, and that a paediatric palliative care clinic, which the foundation funded with advice from St. Jude and calls the first in Armenia, opened at the centre on 28 September 2021 with five patient rooms. The coordinates are OpenStreetMap's point for the centre, at 7 Hrachya Nersisyan Street.",
    programs: ["Diagnosis and treatment of blood diseases", "Bone marrow transplantation", "Paediatric oncology and haematology", "Paediatric palliative care clinic (opened 28 September 2021)", "St. Jude Global Alliance member (from 2019)"],
    institutions: ["ministry-of-health-armenia", "city-of-smile-foundation", "immune-oncology-research-institute", "st-jude"],
    cancers: ["childhood-cancers"],
    links: [
      { label: "Yerevan Municipality: modernised Center of Hematology opened (8 November 2016)", url: "https://www.yerevan.am/en/news/mayrak-aghak-owm-handisavorowt-yamb-bats-vel-en-ardiakanats-vats-aryownabanakan-kentrone-ew-m-saryan" },
      { label: "City of Smile Foundation: paediatric palliative care clinic", url: "https://cityofsmile.org/pediatric-palliative-care-clinic/" },
      { label: "City of Smile Foundation: collaboration with St. Jude", url: "https://cityofsmile.org/collaboration/" },
      { label: "Mirror-Spectator: paediatric cancer treatment in Armenia (15 December 2020)", url: "https://mirrorspectator.com/2020/12/15/pediatric-cancer-treatment-in-armenia-continues-to-need-support/" },
      { label: "OpenStreetMap: Nominatim result for 7 Nersisyan Street, Yerevan", url: "https://nominatim.openstreetmap.org/search?format=json&q=7%20Nersisyan%20Street%2C%20Yerevan" },
    ] }),

  i({ id: "erebouni-medical-center", name: "Erebouni Medical Center", aka: ["Erebuni Medical Center", "Էրեբունի բժշկական կենտրոն", "Erebouni MC"],
    city: "Yerevan", country: "AM", lat: 40.131, lng: 44.523, institutionType: "hospital", website: "https://www.erebunimed.com/eng",
    tldr: "A large general hospital in Yerevan with an oncology service, a nuclear medicine centre and a radiotherapy centre. It treats patients under Armenia's new universal health insurance as well as privately.",
    summary: "Erebouni Medical Center was founded in 1991 on the basis of the Erebuni clinical hospital. Its own pages describe about 100 departments, a maternity clinic, a polyclinic and the European Center for Nuclear Medicine, with 480 doctors and 685 nurses. Its oncology section lists an oncology service, the nuclear medicine centre and a Radiation Therapy Center, initiated in 2023 beside the hospital to bring oncology services together; the centre lists Varian Edge, Halcyon and Bravos equipment, a Siemens SOMATOM go.Open Pro CT and a Biograph mCT PET/CT scanner. The hospital's patient page explains how to be treated under the Universal Health Insurance system introduced from 1 January 2026. ClinicalTrials.gov lists \"Erebouni MC\" in Yerevan as a site of the early access study of ivosidenib in cholangiocarcinoma (NCT05876754), alongside the National Center of Oncology. The coordinates are OpenStreetMap's point for the hospital at 14 Titogradyan Street.",
    programs: ["Oncology service", "Radiation Therapy Center (initiated 2023)", "European Center for Nuclear Medicine (PET/CT)", "Care under the Universal Health Insurance system"],
    // TODO: re-link national-center-of-oncology-armenia (defined in the country deep dive, PR #395) once it merges.
    institutions: ["ministry-of-health-armenia"],
    links: [
      { label: "Erebouni Medical Center: about", url: "https://www.erebunimed.com/eng/about-us" },
      { label: "Erebouni Medical Center: oncology", url: "https://www.erebunimed.com/eng/oncology" },
      { label: "Erebouni Medical Center: Radiation Therapy Center", url: "https://www.erebunimed.com/eng/clinic/index/180" },
      { label: "Erebouni Medical Center: Universal Health Insurance System", url: "https://www.erebunimed.com/eng/medical-insurance" },
      { label: "ClinicalTrials.gov: NCT05876754", url: "https://clinicaltrials.gov/study/NCT05876754" },
    ] }),

  i({ id: "immune-oncology-research-institute", name: "Immune Oncology Research Institute", aka: ["IMMONC"],
    city: "Yerevan", country: "AM", lat: 40.206, lng: 44.532, institutionType: "research-institute", website: "https://immonc.org/",
    tldr: "A non-profit cancer research and teaching institute in Yerevan. It runs clinical research, fellowships for cancer and blood specialists, and a paediatric oncology research team.",
    summary: "The Immune Oncology Research Institute is a non-profit research and educational institute in Yerevan and a full member of the Union for International Cancer Control, whose member page describes it as engaged in clinical research regionally and internationally, with programmes for research capacity building including a fellowship programme for oncologists and haematologists. Its own site lists working groups, research projects, fellowship programmes and training events, names Gevorg Tamamyan as chief executive and a paediatric oncology team, and gives its address as 7 Nersisyan Street, the address of the Hematology Center after Prof. R. Yeolyan. The coordinates are OpenStreetMap's point for that address.",
    programs: ["Clinical research", "Fellowship programme for oncologists and haematologists", "Training events"],
    institutions: ["hematology-center-yeolyan", "city-of-smile-foundation", "uicc"],
    links: [
      { label: "Immune Oncology Research Institute", url: "https://immonc.org/" },
      { label: "UICC: Immune Oncology Research Institute (Full Member)", url: "https://www.uicc.org/membership/immune-oncology-research-institute" },
    ] }),

  i({ id: "city-of-smile-foundation", name: "City of Smile Charitable Foundation", aka: ["City of Smile", "Ժպիտների քաղաք"],
    city: "Yerevan", country: "AM", lat: 40.206, lng: 44.532, institutionType: "consortium", website: "https://cityofsmile.org/",
    tldr: "An Armenian charity that pays for medical care for children and young people with cancer and blood diseases, funds training and research, and paid for a palliative care clinic for children in Yerevan.",
    summary: "The City of Smile Charitable Foundation was created to support people with oncological and haematological diseases and to promote the development of oncology and haematology in Armenia. Its pages list medical expenses, capacity building, research programmes, awareness raising, family housing and a paediatric palliative care clinic, which it says it funded and which opened at the Hematology Center after Prof. R. Yeolyan on 28 September 2021 with advisory support from St. Jude Children's Research Hospital. It signed a memorandum with St. Jude and the Pediatric Cancer and Blood Disorders Center of Armenia on 12 April 2019, and one with the Dmitry Rogachev National Research Center in Moscow on 25 February 2020. It is a full member of the Union for International Cancer Control. Its contact address is 7 Nersisyan Street, Yerevan; the coordinates are OpenStreetMap's point for that address.",
    programs: ["Payment of medical expenses", "Paediatric palliative care clinic", "Family housing", "Capacity building and research programmes"],
    institutions: ["hematology-center-yeolyan", "immune-oncology-research-institute", "st-jude", "uicc"],
    cancers: ["childhood-cancers"],
    links: [
      { label: "City of Smile Foundation: about us", url: "https://cityofsmile.org/about/" },
      { label: "City of Smile Foundation: collaboration", url: "https://cityofsmile.org/collaboration/" },
      { label: "City of Smile Foundation: paediatric palliative care clinic", url: "https://cityofsmile.org/pediatric-palliative-care-clinic/" },
      { label: "UICC: City of Smile Charitable Foundation (Full Member)", url: "https://www.uicc.org/membership/city-smile-charitable-foundation" },
    ] }),

  // Albania
  i({ id: "akbpm-albania", name: "Agjencia Kombëtare e Barnave dhe Pajisjeve Mjekësore", aka: ["AKBPM", "National Agency for Medicines and Medical Devices, Albania"],
    city: "Tirana", country: "AL", lat: 41.331, lng: 19.821, institutionType: "government", website: "https://akbpm.gov.al/",
    tldr: "Albania's medicines regulator. It registers, tests and inspects medicines and medical devices and runs the country's system for reporting side effects.",
    summary: "The Agjencia Kombëtare e Barnave dhe Pajisjeve Mjekësore is the state institution responsible for control of medicines in Albania and works under the Ministry of Health. Its history page traces it to the State Laboratory for Drug Control created in 1965; it became the National Centre for Drug Control in 1993, gained inspection and registration sectors after the 1994 law on medicines, and took its present name under Law 105/2014 on medicines and pharmaceutical service. Its mission covers pharmacovigilance, approval of medicines advertising, registration of medical devices and inspection of medicines and devices, and its sectors include marketing authorisation and regulatory affairs, inspection and a control laboratory. It publishes the register of medicines and safety communications to health professionals. The coordinates are OpenStreetMap's point for Rruga e Dibrës in Tirana, the street of its address (359/1), not the building.",
    programs: ["Marketing authorisation of medicines", "Pharmacovigilance", "Medicines control laboratory", "Registration of medical devices"],
    institutions: ["fsdksh-albania", "mother-teresa-hospital-tirana"],
    links: [
      { label: "AKBPM: home page", url: "https://akbpm.gov.al/" },
      { label: "AKBPM: mission (in Albanian)", url: "https://akbpm.gov.al/akbpm-3/misioni/" },
      { label: "AKBPM: history (in Albanian)", url: "https://akbpm.gov.al/akbpm-3/historiku/" },
    ] }),

  i({ id: "fsdksh-albania", name: "Fondi i Sigurimit të Detyrueshëm të Kujdesit Shëndetësor", aka: ["FSDKSH", "Compulsory Health Care Insurance Fund, Albania"],
    city: "Tirana", country: "AL", lat: 41.328, lng: 19.818, institutionType: "government", website: "https://fsdksh.gov.al/",
    tldr: "Albania's public health insurance fund. It runs compulsory health insurance, pays public and private providers, and publishes the lists of medicines it reimburses, including those given in hospital pharmacies.",
    summary: "The Fondi i Sigurimit të Detyrueshëm të Kujdesit Shëndetësor succeeded the Health Care Insurance Institute set up under Law 7870 of 13 October 1994, and works under Law 10 383 of 24 February 2011 on compulsory health care insurance, in force from March 2013. Its history page says it manages the compulsory health insurance scheme and finances health services from public and private providers, is governed by a seven-member Administrative Council and a director general, and has 13 regional directorates, 18 agencies and 4 branches with 592 staff. It publishes the reimbursed medicines lists, in two parts: List I for hospital pharmacies and List II for community pharmacies, updated for 2025, and runs managed entry agreements with pharmaceutical companies under a 2023 government decision. The coordinates are an approximate Tirana city point.",
    programs: ["Compulsory health care insurance scheme (Law 10 383/2011)", "Reimbursed medicines lists (hospital and community pharmacies)", "Managed entry agreements for medicines"],
    institutions: ["akbpm-albania", "ishp-albania", "mother-teresa-hospital-tirana"],
    links: [
      { label: "FSDKSH: home page and reimbursed medicines lists (in Albanian)", url: "https://fsdksh.gov.al/" },
      { label: "FSDKSH: history (in Albanian)", url: "https://fsdksh.gov.al/historiku/" },
    ] }),

  i({ id: "ishp-albania", name: "Instituti i Shëndetit Publik", aka: ["ISHP", "Institute of Public Health, Albania"],
    city: "Tirana", country: "AL", lat: 41.346, lng: 19.852, institutionType: "government", website: "https://www.ishp.gov.al/",
    tldr: "Albania's national public health institute. It reported 7,076 new cancers diagnosed in Albania in 2024.",
    summary: "The Instituti i Shëndetit Publik is Albania's public health institute, with directorates including chronic diseases and radiation protection. Its World Cancer Day statement of February 2026 reports 7,076 new cancer cases diagnosed in Albania in 2024, the commonest being non-melanoma skin cancer (1,216 cases), breast cancer in women (805) and lung cancer (771), together about 40% of the total; it says cancers have made up about 15% of deaths each year over the last ten years and are the second cause of death after heart disease. Its address is Rruga Aleksandër Moisiu 80, Tirana; the coordinates are OpenStreetMap's point for the institute.",
    programs: ["Annual national cancer figures (World Cancer Day statement)", "Chronic disease surveillance", "Radiation protection"],
    institutions: ["fsdksh-albania", "mother-teresa-hospital-tirana"],
    links: [
      { label: "ISHP: World Cancer Day, 4 February 2026 (in Albanian)", url: "https://www.ishp.gov.al/4-shkurt-2026-dita-boterore-e-kancerit/" },
      { label: "ISHP: contact (in Albanian)", url: "https://www.ishp.gov.al/kontakt/" },
    ] }),

  // North Macedonia
  i({ id: "malmed-north-macedonia", name: "Agency for Medicines and Medical Devices (MALMED)", aka: ["MALMED", "Агенција за лекови и медицински средства", "Agency for Medicines and Medical Devices of North Macedonia"],
    city: "Skopje", country: "MK", lat: 41.996, lng: 21.432, institutionType: "government", website: "https://malmed.gov.mk/",
    tldr: "North Macedonia's medicines regulator, set up in 2014. It authorises medicines and medical devices, keeps their registers, controls quality and oversees clinical trials.",
    summary: "The Agency for Medicines and Medical Devices of the Republic of North Macedonia (MALMED) was established on 16 September 2014 under the Law on Medicines and Medical Devices as an independent state administration body founded by the Government. It took over the assets of the Bureau of Medicines, a body within the Ministry of Health, which ceased to exist. Its site covers registers of medicines, placing medicines on the market, quality control, advertising of human medicines, medicines traffic and consumption, clinical trials, parallel imports and the register of medical devices; its mission statement refers to aligning with EU standards. The coordinates are an approximate Skopje city point.",
    programs: ["Marketing authorisation and registers of medicines", "Clinical trial oversight", "Quality control of medicines", "Register of medical devices"],
    institutions: ["university-clinic-radiotherapy-oncology-skopje", "acibadem-sistina-hospital"],
    links: [
      { label: "MALMED: home page (in Macedonian)", url: "https://malmed.gov.mk/" },
      { label: "MALMED: about the Agency (in Macedonian)", url: "https://malmed.gov.mk/%d0%b7%d0%b0-%d0%bd%d0%b0%d1%81/" },
    ] }),

  i({ id: "acibadem-sistina-hospital", name: "Acibadem Sistina Hospital", aka: ["Аџибадем Систина", "Private Health Organization Acibadem Sistina Hospital"],
    city: "Skopje", country: "MK", lat: 42.014, lng: 21.405, institutionType: "hospital", website: "https://acibademsistina.mk/",
    tldr: "A private clinical hospital in Skopje with an oncology department that gives chemotherapy, hormone treatment, immunotherapy, targeted drugs and radiotherapy, and has taken part in international cancer drug trials.",
    summary: "Acibadem Sistina opened as a clinical hospital on 7 April 2010, growing from a gynaecology and obstetrics hospital opened in 2001; it describes itself as accredited by Joint Commission International and gives 1,159 staff including 228 doctors. Its oncology department plans treatment through a multidisciplinary team, uses PET/CT for detection and follow-up, offers chemotherapy, hormone therapy, immunotherapy and targeted therapy, and delivers radiotherapy on Varian TrueBeam and Trilogy linear accelerators. It lists breast, brain, lung, colorectal, stomach, pancreatic, liver, prostate, uterine, ovarian, bladder, testicular, head and neck, bone and soft tissue cancers among those it treats most often. ClinicalTrials.gov lists it as a site of CLEOPATRA (NCT00567190), ALINA (NCT03456076), lidERA (NCT04961996) and a trastuzumab emtansine extension study (NCT00781612). The coordinates are OpenStreetMap's point for the hospital at Skupi 5A.",
    programs: ["Medical oncology", "Radiotherapy (TrueBeam and Trilogy linear accelerators)", "PET/CT"],
    institutions: ["university-clinic-radiotherapy-oncology-skopje", "malmed-north-macedonia"],
    cancers: ["breast-cancer", "lung-cancer", "colorectal", "prostate"],
    links: [
      { label: "Acibadem Sistina: oncology department (in Macedonian)", url: "https://acibademsistina.mk/mk/home/oddel/42" },
      { label: "Acibadem Sistina: general information (in Macedonian)", url: "https://acibademsistina.mk/mk/home/za_nas" },
      { label: "ClinicalTrials.gov: NCT04961996 (lidERA) locations", url: "https://clinicaltrials.gov/study/NCT04961996" },
      { label: "ClinicalTrials.gov: NCT00567190 (CLEOPATRA) locations", url: "https://clinicaltrials.gov/study/NCT00567190" },
    ] }),

  i({ id: "clinical-hospital-bitola", name: "PHI Clinical Hospital Dr Trifun Panovski, Bitola", aka: ["ЈЗУ Клиничка болница д-р Трифун Пановски Битола", "Clinical Hospital Bitola"],
    city: "Bitola", country: "MK", lat: 41.023, lng: 21.319, institutionType: "hospital",
    tldr: "The public clinical hospital in Bitola, in the south of North Macedonia. Its oncology department has been a site for international breast cancer drug trials.",
    summary: "PHI Clinical Hospital Dr Trifun Panovski is the public clinical hospital in Bitola. ClinicalTrials.gov lists its oncology department (\"Clinical Hospital; Oncology Department\", Bitola) as a site of CLEOPATRA (NCT00567190) and IPATunity130 (NCT03337724), and the hospital by its full name as a site of lidERA (NCT04961996), all trials in breast cancer. OnCo found no website for the hospital and has not read a description of its cancer services. The coordinates are OpenStreetMap's point for the hospital.",
    institutions: ["university-clinic-radiotherapy-oncology-skopje", "acibadem-sistina-hospital"],
    cancers: ["breast-cancer"],
    links: [
      { label: "ClinicalTrials.gov: NCT04961996 (lidERA) locations", url: "https://clinicaltrials.gov/study/NCT04961996" },
      { label: "ClinicalTrials.gov: NCT00567190 (CLEOPATRA) locations", url: "https://clinicaltrials.gov/study/NCT00567190" },
      { label: "ClinicalTrials.gov: NCT03337724 (IPATunity130) locations", url: "https://clinicaltrials.gov/study/NCT03337724" },
      { label: "OpenStreetMap: Nominatim result for the hospital", url: "https://nominatim.openstreetmap.org/search?format=json&q=%D0%9A%D0%BB%D0%B8%D0%BD%D0%B8%D1%87%D0%BA%D0%B0%20%D0%B1%D0%BE%D0%BB%D0%BD%D0%B8%D1%86%D0%B0%20%D0%91%D0%B8%D1%82%D0%BE%D0%BB%D0%B0" },
    ] }),

  // ---------- Montenegro (ME) ----------
  i({ id: "clinical-centre-of-montenegro", name: "Klinički centar Crne Gore", aka: ["Clinical Centre of Montenegro", "KCCG", "Institut za onkologiju KCCG", "Institute of Oncology, Clinical Centre of Montenegro"],
    city: "Podgorica", country: "ME", lat: 42.438, lng: 19.246, institutionType: "hospital", website: "https://www.kccg.me",
    tldr: "Montenegro's national referral hospital for specialist care, in Podgorica. Its Institute of Oncology has clinics for cancer medicines and for radiotherapy, a brachytherapy unit, a day hospital that prepares chemotherapy centrally, and a nuclear medicine centre.",
    summary: "The Klinički centar Crne Gore describes itself as the reference institution for tertiary care for the whole of Montenegro and for secondary care for Podgorica, Tuzi, Golubovci, Danilovgrad and Kolašin. Its about page says it treats about 40,000 inpatients a year, carries out more than 1.5 million outpatient services and more than 13,000 operations a year, and employs more than 2,300 people, including 260 specialists and 89 subspecialists.\n\nIts Institute of Oncology (Institut za onkologiju), read in Montenegrin on 11 November 2026, lists a Clinic for Medical Oncology with a medical oncology ward and a day hospital with central preparation of cytotoxic drugs, a Centre for Radiotherapy, a Clinic for Radiation Oncology with a ward that has a semi-intensive unit, a department for external beam (transcutaneous) radiotherapy, a department for brachytherapy, and a Centre for Nuclear Medicine with a gamma camera section. IAEA's DIRAC database lists one radiotherapy centre in Montenegro, with four high-energy external beam machines and brachytherapy (data updated 2026); DIRAC does not name it in its public summary.",
    programs: ["Clinic for Medical Oncology", "Centre for Radiotherapy and Clinic for Radiation Oncology", "Brachytherapy department", "Day hospital with central cytotoxic preparation", "Centre for Nuclear Medicine"],
    institutions: ["health-insurance-fund-montenegro", "institute-of-public-health-montenegro", "cinmed-montenegro"],
    links: [
      { label: "Klinički centar Crne Gore: Institute of Oncology (in Montenegrin)", url: "https://www.kccg.me/klinike-i-centri/institut-za-onkologiju/" },
      { label: "Klinički centar Crne Gore: about (in Montenegrin)", url: "https://www.kccg.me/o-nama/" },
      { label: "IAEA DIRAC: radiotherapy centres by country (data)", url: DIRAC_JSON },
    ] }),

  i({ id: "cinmed-montenegro", name: "Institut za ljekove i medicinska sredstva Crne Gore (CInMED)", aka: ["CInMED", "Institute for Medicines and Medical Devices of Montenegro", "Agencija za ljekove i medicinska sredstva Crne Gore"],
    city: "Podgorica", country: "ME", lat: 42.443, lng: 19.266, institutionType: "government", website: "https://cinmed.me",
    tldr: "Montenegro's medicines regulator. It licenses medicines, authorises clinical trials of medicines and checks how they are run, and monitors the safety of medicines already in use.",
    summary: "The Institut za ljekove i medicinska sredstva Crne Gore (CInMED) was set up by the Law on Medicines as Montenegro's independent regulator for medicines and medical devices and as a scientific research organisation. It is the legal successor of the Agency for Medicines and Medical Devices founded by a Government decision in 2008. Under the Law on Medicines it issues, varies, renews, transfers, suspends and withdraws marketing authorisations; issues clinical trial authorisations and amendments, inspects how trials are run and records non-interventional studies; runs the pharmacovigilance system; licenses manufacture and wholesale; and approves imports of medicines that have no marketing authorisation. Its clinical trials page says trials follow the Law on Medicines, its rulebook on clinical trials, and good clinical practice guidelines aligned with ICH E6(R3) and ICH E11(R1). It is governed by a board of a president and four members appointed by the Government, and a director. Its address is Bulevar Ivana Crnojevića 64a, Podgorica; the coordinates are an OpenStreetMap street point for that boulevard, not the building.",
    programs: ["Marketing authorisation of medicines", "Clinical trial authorisation and inspection", "Pharmacovigilance", "Medical devices register"],
    institutions: ["clinical-centre-of-montenegro"],
    links: [
      { label: "CInMED: competences (in Montenegrin)", url: "https://cinmed.me/o-cinmed-u/nadleznosti/" },
      { label: "CInMED: clinical trials of medicines (in Montenegrin)", url: "https://cinmed.me/humani-lijekovi/klinicka-ispitivanja-2/" },
      { label: "CInMED: organisation (in Montenegrin)", url: "https://cinmed.me/o-cinmed-u/djelatnost-2/" },
      { label: "CInMED: contact (in Montenegrin)", url: "https://cinmed.me/kontakt/" },
    ] }),

  i({ id: "health-insurance-fund-montenegro", name: "Fond za zdravstveno osiguranje Crne Gore", aka: ["FZOCG", "Health Insurance Fund of Montenegro"],
    city: "Podgorica", country: "ME", lat: 42.445, lng: 19.262, institutionType: "government", website: "https://fzocg.me",
    tldr: "Montenegro's public health insurance fund. It contracts hospitals at home and abroad and publishes the list of medicines it pays for, including the part a patient may have to pay.",
    summary: "The Fond za zdravstveno osiguranje Crne Gore is Montenegro's public health insurance fund, at Vaka Đurovića bb in Podgorica. Its site publishes its contracts with health institutions inside and outside the national health network and with institutions outside Montenegro, an application form for treatment abroad, and the decisions setting the basic and supplementary (co-payment) lists of medicines, revised in January, July and October 2026. OnCo has not read the medicines list itself, so it does not say which cancer medicines are covered. The coordinates are an OpenStreetMap street point for Vaka Đurovića, Podgorica.",
    programs: ["Basic and supplementary lists of medicines (osnovna i doplatna lista ljekova)", "Contracts for treatment abroad"],
    institutions: ["clinical-centre-of-montenegro", "cinmed-montenegro"],
    links: [
      { label: "FZOCG: lists of medicines (in Montenegrin)", url: "https://fzocg.me/lista-ljekova/" },
      { label: "FZOCG: home page (in Montenegrin)", url: "https://fzocg.me/" },
      { label: "FZOCG: health services with institutions abroad (in Montenegrin)", url: "https://fzocg.me/zdravstvene-usluge-sa-ustanovama-u-inostranstvu/" },
    ] }),

  i({ id: "institute-of-public-health-montenegro", name: "Institut za javno zdravlje Crne Gore", aka: ["IJZCG", "Institute of Public Health of Montenegro", "Registry of Malignant Neoplasms of Montenegro"],
    city: "Podgorica", country: "ME", lat: 42.442, lng: 19.262, institutionType: "government", website: "https://www.ijzcg.me",
    tldr: "Montenegro's public health institute, which holds the country's cancer registry.",
    summary: "The European Network of Cancer Registries' member list names the Registry of Malignant Neoplasms of Montenegro, an all-ages, all-sites registry, at the Institute of Public Health of Montenegro. The list is undated and gives no population covered. The Institute's own site needs a browser to render, so OnCo did not read its registry reports and states no figures from them. The coordinates are an approximate Podgorica city point.",
    institutions: ["clinical-centre-of-montenegro"],
    related: ["cancer-registries-surveillance"],
    links: [
      { label: "European Network of Cancer Registries: members contact list (Montenegro)", url: ENCR_LIST },
      { label: "Institut za javno zdravlje Crne Gore (needs a browser)", url: "https://www.ijzcg.me/" },
    ] }),

  // ---------- Cyprus (CY) ----------
  i({ id: "cyprus-health-insurance-organisation", name: "Οργανισμός Ασφάλισης Υγείας (Health Insurance Organisation, Cyprus)", aka: ["HIO", "Health Insurance Organisation", "ΟΑΥ", "GHS", "ΓεΣΥ", "General Healthcare System"],
    city: "Nicosia", country: "CY", lat: 35.168, lng: 33.37, institutionType: "government", website: "https://www.gesy.org.cy",
    tldr: "The public body that runs Cyprus's national health system, the General Healthcare System. It was set up by law in 2001.",
    summary: "The Health Insurance Organisation was established by Law 89(I) of 2001 as a public law entity to implement the General Healthcare System (GHS, in Greek ΓεΣΥ) in the Republic of Cyprus. Under the General Healthcare System Laws of 2001 to 2017 it is the executive authority for the GHS, and it is governed by a board on which the government, employers, employees and patients are represented. Its site carries provider enrolment and contracting, reimbursement, activity catalogues and protocols and clinical guidelines. Its address is Klimentos 17-19, 1061 Nicosia; the coordinates are an OpenStreetMap street point for Klimentos, not the building.",
    programs: ["General Healthcare System (GHS)"],
    institutions: ["bank-of-cyprus-oncology-centre", "german-oncology-center-limassol", "cyprus-cancer-registry"],
    links: [
      { label: "Health Insurance Organisation: role and mandate", url: "https://www.gesy.org.cy/en-us/hioroleandresponsibilities" },
      { label: "Health Insurance Organisation: contact", url: "https://www.gesy.org.cy/en-us/contactus" },
    ] }),

  i({ id: "cyprus-cancer-registry", name: "Cyprus Cancer Registry", aka: ["CyCR", "Κυπριακό Αρχείο Καρκίνου", "Health Monitoring Unit, Ministry of Health, Cyprus"],
    city: "Nicosia", country: "CY", lat: 35.16, lng: 33.346, institutionType: "government",
    tldr: "Cyprus's population-based cancer registry, run by the Ministry of Health's Health Monitoring Unit. Its figures show about 4,260 new cancers a year in 2018 to 2022.",
    summary: "The European Network of Cancer Registries' member list names the Cyprus Cancer Registry, an all-ages, all-sites registry at the Ministry of Health's Health Monitoring Unit, 1 Prodromou Street and 17 Chilonos Street, Nicosia. A 2015 analysis in Tumori of the registry's data for 1998 to 2008 found world age-standardised incidence rising from 195.4 to 239.0 per 100,000 in men and from 180.6 to 217.1 per 100,000 in women between 1998-2002 and 2006-2008, with prostate, lung, colorectal and bladder cancers the most frequent in men and breast, colorectal, uterine and thyroid cancers in women.\n\nIn February 2026 the Health Minister presented Health Monitoring Unit figures at the 2nd Pancyprian Oncology Congress: an average of 4,260 new cancers a year in 2018 to 2022 and about 1,600 cancer deaths a year in 2019 to 2023, with cancer causing 23% of deaths in 2023. He said the Ministry runs early detection programmes for breast and colorectal cancer, plans programmes for prostate and cervical cancer, and that a National Cancer Institute is being set up. The coordinates are an approximate OpenStreetMap point for Prodromou Street, Strovolos.",
    institutions: ["cyprus-health-insurance-organisation", "bank-of-cyprus-oncology-centre"],
    related: ["cancer-registries-surveillance"],
    links: [
      { label: "European Network of Cancer Registries: members contact list (Cyprus)", url: ENCR_LIST },
      { label: "Politis: Cyprus records 4,260 new cancer cases annually (7 February 2026)", url: "https://en.politis.com.cy/social-lens/985101/cyprus-records-4260-new-cancer-cases-annually" },
      { label: "Incidence and time trends of cancer in Cyprus over 11 years (1998-2008), Tumori 2015", url: "https://doi.org/10.5301/tj.5000204" },
    ] }),

  // ---------- Malta (MT) ----------
  i({ id: "sir-anthony-mamo-oncology-centre", name: "Sir Anthony Mamo Oncology Centre", aka: ["SAMOC", "Oncology Centre, Mater Dei"],
    city: "Msida", country: "MT", lat: 35.901, lng: 14.475, institutionType: "cancer-center",
    tldr: "Malta's oncology centre, in Msida, where cancer treatment and radiotherapy are given. The European Union has funded a radiotherapy machine guided by magnetic resonance imaging there.",
    summary: "The Sir Anthony Mamo Oncology Centre is named after Sir Anthony Mamo, the first president of Malta. Wikipedia's article on Mater Dei Hospital says it cost 52 million euros, and that beds rose from 78 at Boffa Hospital to 113 and outpatient clinics from two to 12 when services moved to it. The European Commission's Recovery and Resilience Facility page describes an investment of 9.4 million euros (reference C4-I2 in Malta's plan) to acquire a magnetic resonance linear accelerator (MR-Linac) at the centre, which the page said would be fully operational by mid-2024; OnCo has not read a source confirming that it is. IAEA's DIRAC database lists one radiotherapy centre in Malta, with three high-energy external beam machines (data updated 2024); DIRAC does not name it in its public summary. The Ministry of Health's own pages (health.gov.mt) were blocked to scripts. The coordinates are the OpenStreetMap point for the building.",
    programs: ["Radiotherapy", "MR-Linac (Recovery and Resilience Facility investment C4-I2)"],
    institutions: ["malta-national-cancer-registry", "malta-medicines-authority"],
    links: [
      { label: "European Commission: cutting-edge cancer treatment and diagnosis facility at Sir Anthony Mamo Oncology Center", url: "https://reforms-investments.ec.europa.eu/projects/cutting-edge-cancer-treatment-and-diagnosis-facility-sir-anthony-mamo-oncology-center_en" },
      { label: "Wikipedia: Mater Dei Hospital (section on the oncology centre)", url: "https://en.wikipedia.org/wiki/Mater_Dei_Hospital" },
      { label: "IAEA DIRAC: radiotherapy centres by country (data)", url: DIRAC_JSON },
    ] }),

  i({ id: "malta-medicines-authority", name: "Malta Medicines Authority", aka: ["MMA", "Awtorità tal-Mediċini"],
    city: "San Ġwann", country: "MT", lat: 35.903, lng: 14.473, institutionType: "government", website: "https://medicinesauthority.gov.mt",
    tldr: "Malta's medicines regulator. It authorises medicines, monitors their safety and handles clinical trial applications under the European Union's rules.",
    summary: "The Malta Medicines Authority's stated mission is to safeguard public health through the regulation of medical products and pharmaceutical activities for human use. Its site covers registration of medicinal products, pharmacovigilance and adverse reaction reporting, inspections, advertising, and access to medicines without a marketing authorisation. Its clinical trials page explains that the EU Clinical Trials Regulation, in application since 31 January 2022, replaced Directive 2001/20/EC with a single submission through the Clinical Trials Information System. Its address is Sir Temi Zammit Buildings, Malta Life Sciences Park, San Ġwann; the coordinates are the OpenStreetMap point for the Life Sciences Park.",
    programs: ["Marketing authorisation of medicines", "Pharmacovigilance", "Clinical trials under the EU Clinical Trials Regulation"],
    institutions: ["sir-anthony-mamo-oncology-centre", "ema"],
    links: [
      { label: "Malta Medicines Authority: mission and objectives", url: "https://medicinesauthority.gov.mt/missionobjectives?l=1" },
      { label: "Malta Medicines Authority: clinical trials", url: "https://medicinesauthority.gov.mt/clinicaltrialsa?l=1" },
      { label: "Malta Medicines Authority: contact details", url: "https://medicinesauthority.gov.mt/contact-details?l=1" },
    ] }),

  i({ id: "malta-national-cancer-registry", name: "Malta National Cancer Registry", aka: ["Malta National Cancer Register", "Directorate for Health Information and Research, Malta"],
    city: "Pietà", country: "MT", lat: 35.892, lng: 14.493, institutionType: "government",
    tldr: "Malta's national cancer registry, which records cancers in the whole population of all ages. It sits within the health department's information and research directorate.",
    summary: "The European Network of Cancer Registries' member list names the Malta National Cancer Register, an all-ages, all-sites registry run by the Department of Health Information and Research at 95 Guardamangia Hill, covering a population of 400,000 (2013). The Ministry of Health's pages (health.gov.mt) were blocked to scripts, so OnCo did not read the registry's own reports. The coordinates are an approximate point for Pietà, the locality of Guardamangia Hill.",
    institutions: ["sir-anthony-mamo-oncology-centre"],
    related: ["cancer-registries-surveillance"],
    links: [{ label: "European Network of Cancer Registries: members contact list (Malta)", url: ENCR_LIST }] }),

  // ---------- Luxembourg (LU) ----------
  i({ id: "centre-francois-baclesse-luxembourg", name: "Centre François Baclesse (Luxembourg)", aka: ["CFB", "Centre National de Radiothérapie", "National Radiotherapy Centre of Luxembourg"],
    city: "Esch-sur-Alzette", country: "LU", lat: 49.502, lng: 5.982, institutionType: "cancer-center", website: "https://www.baclesse.lu",
    tldr: "Luxembourg's national radiotherapy centre, in Esch-sur-Alzette. It treats people with cancer who need radiotherapy, whether to cure or to relieve symptoms, and works with all the country's hospitals.",
    summary: "The Centre François Baclesse describes itself as the Centre National de Radiothérapie of the Grand Duchy of Luxembourg: a not-for-profit health establishment treating patients with an indication for curative or palliative radiotherapy, working with all public and private hospitals in Luxembourg and the Greater Region, and taking part in cancer research and training. Its services page lists three linear accelerators (two Halcyon and one Ethos) for intensity-modulated and volumetric arc therapy, a CyberKnife robotic linear accelerator for stereotactic radiotherapy and radiosurgery, image-guided radiotherapy on all accelerators, deep inspiration breath hold for left breast treatment, iodine-125 seed brachytherapy for prostate cancer, gynaecological brachytherapy with applicators placed under anaesthesia at the CHEM hospital, and concomitant chemotherapy. IAEA's DIRAC database lists one radiotherapy centre in Luxembourg. It is a different institution from the French cancer centre of the same name in Caen. The coordinates are the OpenStreetMap point for rue Émile Mayrisch, Esch-sur-Alzette (postcode 4240), not the building.",
    programs: ["External beam radiotherapy (IMRT and VMAT)", "Stereotactic radiotherapy (CyberKnife)", "Prostate brachytherapy", "Gynaecological brachytherapy"],
    institutions: ["inc-luxembourg", "registre-national-du-cancer-luxembourg", "centre-hospitalier-de-luxembourg"],
    cancers: ["breast-cancer", "prostate"],
    links: [
      { label: "Centre François Baclesse: home page (in French)", url: "https://www.baclesse.lu/" },
      { label: "Centre François Baclesse: about (in French)", url: "https://www.baclesse.lu/a-propos-de-nous/" },
      { label: "Centre François Baclesse: services and equipment (in French)", url: "https://www.baclesse.lu/offre-de-soins-plateau-technique/" },
      { label: "IAEA DIRAC: radiotherapy centres by country (data)", url: DIRAC_JSON },
    ] }),

  i({ id: "centre-hospitalier-de-luxembourg", name: "Centre Hospitalier de Luxembourg", aka: ["CHL", "CHL Centre", "Hôpital Municipal de Luxembourg"],
    city: "Luxembourg", country: "LU", lat: 49.619, lng: 6.101, institutionType: "hospital", website: "https://www.chl.lu",
    tldr: "A public hospital group in Luxembourg City, created by law in 1975. Its main site hosts national services, among them the service for cancers of the blood and other cancers (onco-haematology), and it runs a children's hospital and a maternity hospital.",
    summary: "The Centre Hospitalier de Luxembourg was created by the law of 10 December 1975 as a public establishment with financial and administrative autonomy, managed under private law methods and overseen in certain areas by the Minister of Health. It opened in 1976, joining the new Hôpital Municipal (now CHL Centre), the Maternité Grande-Duchesse Charlotte and the Clinique Pédiatrique (now CHL KannerKlinik), and was joined in 2004 by the Clinique d'Eich (CHL Eich). It has 589 beds and 2,743 staff, including 447 doctors. CHL Centre hosts several national services, among them onco-haematology and neurosurgery, and CHL Eich has a palliative care service. In 2022 it recorded 28,238 inpatient stays, 11,927 day hospital stays and 609,782 outpatient attendances. Its home page links a breast cancer site (cancerseinchl.lu).",
    programs: ["National onco-haematology service", "Palliative care (CHL Eich)", "Paediatric hospital (CHL KannerKlinik)"],
    institutions: ["inc-luxembourg", "centre-francois-baclesse-luxembourg", "registre-national-du-cancer-luxembourg"],
    links: [
      { label: "CHL: the hospital in brief (in French)", url: "https://www.chl.lu/fr/content/le-chl-en-bref" },
      { label: "CHL: home page (in French)", url: "https://www.chl.lu/" },
    ] }),

  i({ id: "cns-luxembourg", name: "Caisse nationale de santé", aka: ["CNS", "National Health Fund, Luxembourg"],
    city: "Luxembourg", country: "LU", lat: 49.599, lng: 6.131, institutionType: "government", website: "https://cns.public.lu",
    tldr: "Luxembourg's national health insurance fund for people working in the private sector. It reimburses care and medicines and approves some medicines that need its authorisation before they are paid for.",
    summary: "The Caisse nationale de santé is responsible for two branches of Luxembourg's social security: sickness and maternity insurance, and long-term care insurance. It manages benefits for all insured people in the private sector and for state manual workers; three separate funds cover public sector employees. Insured people send it their paid medical bills for reimbursement, and it validates prescriptions and issues prior approvals for some treatments, devices and certain medicines that need authorisation. The Registre National du Cancer lists the CNS among the sources of its data.",
    programs: ["Sickness and maternity insurance", "Long-term care insurance"],
    institutions: ["centre-hospitalier-de-luxembourg", "centre-francois-baclesse-luxembourg", "registre-national-du-cancer-luxembourg"],
    links: [
      { label: "CNS: health insurance in brief (in French)", url: "https://cns.public.lu/fr/assure/droits-demarches/bases-bonnes-pratiques/assurance-maladie-bref.html" },
      { label: "Registre National du Cancer: patient page (in French)", url: "https://www.rnc.lu/fr/a-propos/patients/" },
    ] }),

  i({ id: "registre-national-du-cancer-luxembourg", name: "Registre National du Cancer (Luxembourg)", aka: ["RNC", "National Cancer Registry of Luxembourg", "Cancer Registry of Luxembourg"],
    city: "Strassen", country: "LU", lat: 49.62, lng: 6.096, institutionType: "government", website: "https://www.rnc.lu",
    tldr: "Luxembourg's national cancer registry, part of the Luxembourg Institute of Health. It counted 3,181 new cancers and 1,024 cancer deaths in 2023, not counting common skin cancers.",
    summary: "The Registre National du Cancer collects data on cancers diagnosed or treated in Luxembourg, from hospitals and doctors, laboratories, the radiotherapy centre, screening programmes, causes of death and the CNS, and receives them under a pseudonym rather than names or social security numbers. Its home page reports 3,181 new cancers (excluding non-melanoma skin cancer) and 1,024 cancer deaths in 2023, and says one person in four will develop cancer before age 75; it publishes a national surveillance report, Le Cancer au Luxembourg 2014-2021. The European Network of Cancer Registries' list places it at the Luxembourg Institute of Health, 1A-1B rue Thomas Edison, Strassen. The coordinates are the OpenStreetMap point for that address.",
    programs: ["Population-based cancer registration", "Le Cancer au Luxembourg national surveillance report"],
    institutions: ["inc-luxembourg", "centre-francois-baclesse-luxembourg", "cns-luxembourg"],
    related: ["cancer-registries-surveillance"],
    links: [
      { label: "Registre National du Cancer: home page (in French)", url: "https://www.rnc.lu/" },
      { label: "Registre National du Cancer: patient page (in French)", url: "https://www.rnc.lu/fr/a-propos/patients/" },
      { label: "European Network of Cancer Registries: members contact list (Luxembourg)", url: ENCR_LIST },
    ] }),

  // ---------- Iceland (IS) ----------
  i({ id: "icelandic-cancer-registry", name: "Krabbameinsskrá Íslands", aka: ["Icelandic Cancer Registry", "Rannsóknasetur - Krabbameinsskrá"],
    city: "Reykjavík", country: "IS", lat: 64.134, lng: -21.921, institutionType: "research-institute", website: "https://www.krabb.is/rannsoknasetur/krabbameinsskra/",
    tldr: "Iceland's national cancer registry, which has recorded every cancer diagnosed in Iceland since 1955. It is run by the Icelandic Cancer Society for the Directorate of Health.",
    summary: "The Icelandic Cancer Registry was founded by the Icelandic Cancer Society (Krabbameinsfélag Íslands) with the Directorate of Health (Embætti landlæknis) in 1954 and holds data on all cancers and their precursors in Iceland from 1955. The Society's page says it covers more than 99% of cancers diagnosed in the population. It gained a legal basis in 2007 (Act 41/2007 and Regulation 548/2008) as one of the Directorate of Health's health registers, and is run, hosted and maintained by the Cancer Society under a contract with the Directorate; the Society and the Ministry of Health share its running costs. Reports come from pathology and haematopathology laboratories, hospital wards, primary care and doctors, usually within two months of diagnosis, with cases lacking pathology added from the cause of death register; coding follows ICD and ICD-O and ENCR guidelines. Researchers need the approval of the National Bioethics Committee for access to individual data. The coordinates are the OpenStreetMap point for Skógarhlíð 8, the address the Society's site gives.",
    programs: ["Population-based cancer registration (from 1955)", "Annual cancer statistics"],
    institutions: ["landspitali", "university-of-iceland"],
    related: ["cancer-registries-surveillance"],
    links: [
      { label: "Icelandic Cancer Society: Research Centre and Cancer Registry (in Icelandic)", url: "https://www.krabb.is/rannsoknasetur/krabbameinsskra/" },
      { label: "European Network of Cancer Registries: members contact list (Iceland)", url: ENCR_LIST },
    ] }),

  i({ id: "icelandic-medicines-agency", name: "Lyfjastofnun", aka: ["Icelandic Medicines Agency", "IMA"],
    city: "Reykjavík", country: "IS", lat: 64.13, lng: -21.766, institutionType: "government", website: "https://island.is/en/o/ima",
    tldr: "Iceland's medicines regulator. It authorises medicines and clinical trials, monitors side effects, and decides the maximum prices and public reimbursement of prescription medicines.",
    summary: "Lyfjastofnun is an independent agency under Iceland's Ministry of Health with about 70 staff. It grants marketing authorisations, supervises the manufacture, distribution and sale of medicines, handles adverse reaction reports, authorises clinical trials of medicinal products, supervises advertising and publishes the Register of Medicinal Products; it works within the European Medicines Agency's network of agencies in the European Economic Area. It also sets the maximum prices of prescription-only medicines and decides on their reimbursement under the Medicinal Products Act, publishing the Icelandic Medicine Price Catalogue monthly. Its address is Vínlandsleið 14, Reykjavík; the coordinates are the OpenStreetMap point for the building.",
    programs: ["Marketing authorisation", "Clinical trial authorisation", "Medicine pricing and reimbursement decisions", "Pharmacovigilance"],
    institutions: ["icelandic-health-insurance", "landspitali", "ema"],
    links: [
      { label: "Icelandic Medicines Agency: organisation and role", url: "https://island.is/en/o/ima/organisation-and-role" },
      { label: "Icelandic Medicines Agency: pricing and reimbursement", url: "https://island.is/en/o/ima/pricing-and-reimbursement" },
      { label: "Icelandic Medicines Agency: home page", url: "https://island.is/en/o/ima" },
    ] }),

  i({ id: "icelandic-health-insurance", name: "Sjúkratryggingar Íslands", aka: ["Icelandic Health Insurance", "Sjúkratryggingar", "SÍ"],
    city: "Reykjavík", country: "IS", lat: 64.13, lng: -21.764, institutionType: "government", website: "https://island.is/s/sjukratryggingar",
    tldr: "Iceland's public health insurer. It pays towards doctors' fees, medicines, aids and sickness benefit, and the share a person pays for medicines falls as their spending over 12 months rises.",
    summary: "Sjúkratryggingar Íslands is Iceland's public health insurer, at Vínlandsleið 16, Reykjavík. Its stated role is to ensure access to health care for all regardless of means, to promote cost-effective health services, and to purchase health care in a targeted, professional way with transparency about quality, results and cost. Its pages cover primary care and doctors' costs, aids and hearing aids, nutrition, medicine costs, sickness benefit and cross-border cover; for medicines, the share an individual pays falls as their spending on medicines over each 12-month period rises. The coordinates are the OpenStreetMap point for Vínlandsleið 16.",
    programs: ["Medicine cost sharing over 12-month periods", "Sickness benefit", "Cross-border health insurance"],
    institutions: ["landspitali", "icelandic-medicines-agency"],
    links: [
      { label: "Sjúkratryggingar: role and values (in Icelandic)", url: "https://island.is/s/sjukratryggingar/hlutverk-og-gildi" },
      { label: "Sjúkratryggingar: medicine costs (in Icelandic)", url: "https://island.is/s/sjukratryggingar/lyfjakostnadur" },
    ] }),

  i({ id: "university-of-iceland", name: "Háskóli Íslands", aka: ["University of Iceland", "HÍ"],
    city: "Reykjavík", country: "IS", lat: 64.141, lng: -21.949, institutionType: "university", website: "https://english.hi.is",
    tldr: "Iceland's national university, in Reykjavík. It sponsors the iStopMM screening study for a blood condition that can lead to myeloma, and is building a cancer research centre with Landspítali.",
    summary: "The University of Iceland, at Sæmundargata 2 in Reykjavík, had 13,830 students registered on 20 February 2026, 712 of them doctoral students, according to its facts and figures page. It is the lead sponsor of iStopMM (Iceland Screens, Treats or Prevents Multiple Myeloma, NCT03327597), which invited everyone registered as living in Iceland and born in 1975 or earlier to take part in a study of the benefits and harms of screening for monoclonal gammopathy of undetermined significance, with Landspítali among its collaborators. Landspítali's Cancer Centre, founded in 2025 and working to the Organisation of European Cancer Institutes' standards, says it is building a centre for cancer research in collaboration with the University of Iceland. The coordinates are from Wikidata.",
    programs: ["iStopMM screening study (sponsor)"],
    institutions: ["landspitali", "icelandic-cancer-registry"],
    links: [
      { label: "University of Iceland: facts and figures", url: "https://english.hi.is/about-ui/about-university/media-and-press/facts-and-figures" },
      { label: "Landspítali: about the Landspítali Cancer Centre (in Icelandic)", url: "https://island.is/s/landspitali/krabbameinsmidstod-landspitala" },
      { label: "ClinicalTrials.gov: NCT03327597 (iStopMM)", url: "https://clinicaltrials.gov/study/NCT03327597" },
    ] }),

  // ---------------- La Réunion (RE) ----------------
  i({ id: "chu-la-reunion", name: "Centre Hospitalier Universitaire de La Réunion", aka: ["CHU de La Réunion", "University Hospital of Réunion", "CHU Réunion"],
    city: "Saint-Denis", country: "RE", lat: -20.891, lng: 55.444, institutionType: "hospital", website: "https://www.chu-reunion.fr",
    tldr: "La Réunion's university hospital, formed in 2012 from the public hospitals of Saint-Denis and Saint-Pierre. It treats cancer in adults and children, and its southern site in Saint-Pierre gives radiotherapy and brachytherapy.",
    summary: "The Centre Hospitalier Universitaire de La Réunion has, since February 2012, brought together the former Félix Guyon hospital in Saint-Denis and the Groupe Hospitalier Sud Réunion in Saint-Pierre. Its own presentation lists cancer care, haematology and oncology, and nuclear medicine including PET, radiotherapy and brachytherapy among its services. The radiotherapy and brachytherapy department is at CHU Sud in Saint-Pierre, with a Varian Halcyon, a Varian Edge for stereotactic treatment and a dedicated 4D planning scanner, and also holds consultations at the Centre Hospitalier Ouest Réunion in Saint-Paul. The paediatric oncology and haematology service at the northern site has a protected unit of 7 laminar-flow beds and 7 conventional beds, treats children to the protocols of the French society for childhood cancers (SFCE), and is part of La Réunion's cancer network, Oncorun. A cancer coordination centre (3C Sud Réunion) runs the multidisciplinary meetings in the south.\n\nThe ARS La Réunion's working document of April 2023 for the regional health scheme, using 2021 hospital statistics, recorded 713 adults treated with external radiotherapy at CHU Sud that year and 64 adults treated with brachytherapy, CHU Sud being the island's authorised brachytherapy site. The coordinates are the Wikidata point for the hospital.",
    programs: ["External beam radiotherapy and brachytherapy (CHU Sud, Saint-Pierre)", "Paediatric oncology and haematology", "Cancer coordination centre (3C Sud Réunion)"],
    institutions: ["reunion-cancer-registry", "ars-la-reunion", "clinique-sainte-clotilde-reunion"],
    links: [
      { label: "CHU de La Réunion: presentation", url: "https://www.chu-reunion.fr/le-chu-reunion/" },
      { label: "CHU de La Réunion: radiotherapy and brachytherapy service", url: "https://www.chu-reunion.fr/service/radiotherapie-curietherapie/" },
      { label: "CHU de La Réunion: paediatric oncology and haematology", url: "https://www.chu-reunion.fr/service/oncologie-pediatrique/" },
      { label: "CHU de La Réunion: cancer coordination centre", url: "https://www.chu-reunion.fr/service/centre-de-coordination-en-cancerologie/" },
      { label: "ARS La Réunion: external radiotherapy and brachytherapy, regional health scheme working document (PDF, April 2023)", url: ARS_RE_RT },
    ] }),

  i({ id: "clinique-sainte-clotilde-reunion", name: "Clinique Sainte-Clotilde", aka: ["Clinique Sainte Clotilde, Saint-Denis"],
    city: "Saint-Denis", country: "RE", lat: -20.902, lng: 55.477, institutionType: "hospital",
    tldr: "A private clinic in the Sainte-Clotilde district of Saint-Denis, in the north of La Réunion, authorised to give external radiotherapy for cancer.",
    summary: "The ARS La Réunion's working document of April 2023 for the regional health scheme lists two authorised external radiotherapy sites on the island: Clinique Sainte-Clotilde in the north and CHU Sud in Saint-Pierre in the south. Using 2021 hospital statistics, it records 1,375 adults and 5 patients under 18 treated with external radiotherapy at Clinique Sainte-Clotilde that year, and 3 linear accelerators in the north-east zone against 2 in the south-west. IAEA's DIRAC lists two radiotherapy centres for La Réunion. OnCo did not find the clinic's own website. The coordinates are the OpenStreetMap point for the clinic.",
    programs: ["External beam radiotherapy (authorised)"],
    institutions: ["ars-la-reunion", "chu-la-reunion"],
    links: [
      { label: "ARS La Réunion: external radiotherapy and brachytherapy, regional health scheme working document (PDF, April 2023)", url: ARS_RE_RT },
      { label: "IAEA DIRAC: radiotherapy centres by country (data)", url: DIRAC_JSON },
    ] }),

  i({ id: "reunion-cancer-registry", name: "Registre général des cancers de La Réunion", aka: ["Registre des cancers de La Réunion", "Réunion Cancer Registry"],
    city: "Saint-Denis", country: "RE", lat: -20.891, lng: 55.444, institutionType: "research-institute",
    tldr: "La Réunion's population cancer registry, based at the island's university hospital. It counts new cancers among residents and is part of the French network of cancer registries.",
    summary: "The Registre général des cancers de La Réunion is a general registry in the French network of cancer registries (Francim). With the registries of Guadeloupe and Martinique it collected the data for the registry-based study of cancer survival in these overseas departments, published in February 2024 by Francim, the Hospices Civils de Lyon, Santé publique France and the Institut national du cancer, covering people aged 15 and over diagnosed from 2008 to 2015 and followed to 30 June 2018. A 2022 study of melanoma in La Réunion, written from the registry, gives its affiliation as the CHU de La Réunion in Saint-Denis and reports 103 new cases of cutaneous melanoma recorded in 2015. The coordinates are the point for the CHU de La Réunion, the registry's host, not the registry's own office.",
    programs: ["Population-based cancer registration for La Réunion", "Francim network member registry"],
    institutions: ["chu-la-reunion", "sante-publique-france", "inca"],
    links: [
      { label: "Survie des personnes atteintes de cancer à La Réunion 2008-2018 (PDF, February 2024)", url: SURVIE_RE },
      { label: "Chirpaz E et al, Epidemiology of cutaneous malignant melanoma in Reunion Island, Annales de Dermatologie et de Vénéréologie 2022", url: "https://doi.org/10.1016/j.annder.2021.05.001" },
    ] }),

  i({ id: "ars-la-reunion", name: "Agence Régionale de Santé La Réunion", aka: ["ARS La Réunion", "Regional Health Agency of La Réunion"],
    city: "Saint-Denis", country: "RE", lat: -20.901, lng: 55.48, institutionType: "government", website: "https://www.lareunion.ars.sante.fr",
    tldr: "The French state's regional health agency for La Réunion. It plans hospital services and grants the authorisations that let a hospital or clinic treat cancer, including radiotherapy.",
    summary: "The ARS La Réunion, created on 1 January 2020, is a public body under the health ministries that steers health policy on the island: health surveillance and security, prevention, and the regulation of ambulatory, hospital and medico-social care. Its working document of April 2023 for the third regional health scheme counted 5 radiotherapy accelerators and 4 protected brachytherapy beds on the island from 2021 hospital statistics, and listed Clinique Sainte-Clotilde and CHU Sud in Saint-Pierre as the authorised external radiotherapy sites, with CHU Sud the brachytherapy site. It published the February 2024 study of cancer survival in La Réunion. The coordinates are the OpenStreetMap point for the Avenue Georges Brassens in Sainte-Clotilde, the agency's address, and are approximate.",
    programs: ["Authorisation of cancer treatment sites", "Regional health scheme (SRS)"],
    institutions: ["chu-la-reunion", "clinique-sainte-clotilde-reunion", "reunion-cancer-registry"],
    links: [
      { label: "ARS La Réunion: presentation", url: "https://www.lareunion.ars.sante.fr/presentation-6" },
      { label: "ARS La Réunion: external radiotherapy and brachytherapy, regional health scheme working document (PDF, April 2023)", url: ARS_RE_RT },
      { label: "Survie des personnes atteintes de cancer à La Réunion 2008-2018 (PDF, February 2024)", url: SURVIE_RE },
    ] }),

  // ---------------- Martinique (MQ) ----------------
  i({ id: "chu-martinique", name: "Centre Hospitalier Universitaire de Martinique", aka: ["CHU de Martinique", "University Hospital of Martinique"],
    city: "Fort-de-France", country: "MQ", lat: 14.634, lng: -61.038, institutionType: "hospital", website: "https://www.chu-martinique.fr",
    tldr: "Martinique's university hospital, made up of six hospitals. It gives radiotherapy, chemotherapy, blood cancer care and palliative care, and hosts the island's cancer registry.",
    summary: "The CHU de Martinique has, since a merger made official on 1 January 2013 of the hospitals of Fort-de-France, Le Lamentin and La Trinité, grouped six hospitals, including Pierre Zobda-Quitman, Albert Clarac and Mangot Vulcin, with 1,426 beds and 120 places and 5,200 staff by its own account. Its Pôle Cancérologie-Hématologie-Urologie runs, at the Albert Clarac hospital, a radiotherapy service with radiotherapy and radiophysics units using VMAT, IMRT, IGRT and stereotactic techniques, which says it treats about 800 patients a year, a medical oncology service with weekly and day units, and palliative care; haematology with an intensive care unit is at Pierre Zobda-Quitman, and urology, including robotic surgery, at Mangot Vulcin. IAEA's DIRAC lists one radiotherapy centre in Martinique. The Martinique cancer registry is a unit (UF1441) of this pole. ARS Guyane's cancer roadmap says 13% of French Guiana's radiotherapy is given in Martinique. The coordinates are the Wikidata point for the hospital.",
    programs: ["Radiotherapy (Albert Clarac hospital)", "Medical oncology", "Clinical haematology", "Palliative care"],
    institutions: ["martinique-cancer-registry", "ars-martinique"],
    links: [
      { label: "CHU de Martinique: presentation", url: "https://www.chu-martinique.fr/le-chum/presentation-du-chu-de-martinique-2/" },
      { label: "CHU de Martinique: Pôle Cancérologie-Hématologie-Urologie", url: "https://www.chu-martinique.fr/professionnels/pole-cancerologie-hematologie-urologie-pathologie/" },
      { label: "IAEA DIRAC: radiotherapy centres by country (data)", url: DIRAC_JSON },
      { label: "ARS Guyane: cancer roadmap 2022 to 2025, summary (PDF)", url: GF_ROADMAP },
    ] }),

  i({ id: "martinique-cancer-registry", name: "Registre général des cancers de la Martinique", aka: ["Registre des cancers de la Martinique", "Martinique Cancer Registry"],
    city: "Fort-de-France", country: "MQ", lat: 14.634, lng: -61.038, institutionType: "research-institute",
    tldr: "Martinique's population cancer registry, recording new cancers on the island since 1981. It is run by the university hospital and records more than 1,500 new invasive cancers a year.",
    summary: "The Martinique Cancer Registry is a population-based registry created in 1981, run as unit UF1441 of the Pôle de Cancérologie Hématologie Urologie Pathologie of the CHU de Martinique in Fort-de-France. Its 2019 profile in BMC Cancer reports 22,801 new cancers diagnosed from 2001 to 2015 and 1,631 a year in 2011 to 2015, with world-standardised incidence of 289.8 per 100,000 men and 171.0 per 100,000 women, and higher incidence of prostate and stomach cancer than in mainland France. It is a general registry of the Francim network and, with the Guadeloupe and La Réunion registries, collected the data for the survival study published in February 2024, which says more than 1,500 new invasive cancers are registered each year in Martinique. The coordinates are the point for the CHU de Martinique, the registry's host.",
    programs: ["Population-based cancer registration for Martinique (from 1981)", "Francim network member registry"],
    institutions: ["chu-martinique", "ars-martinique", "sante-publique-france", "inca"],
    cancers: ["prostate"],
    links: [
      { label: "Joachim-Contaret C et al, Cancer burden in the Caribbean: an overview of the Martinique Cancer Registry profile, BMC Cancer 2019", url: "https://doi.org/10.1186/s12885-019-5434-6" },
      { label: "Survie des personnes atteintes de cancer en Martinique 2008-2018 (PDF, February 2024)", url: SURVIE_MQ },
      { label: "Santé publique France: digestive cancers in Martinique, Guadeloupe and French Guiana from registry data (2022)", url: SPF_CARIB_DIGESTIVE },
    ] }),

  i({ id: "ars-martinique", name: "Agence Régionale de Santé de Martinique", aka: ["ARS Martinique", "Regional Health Agency of Martinique"],
    city: "Fort-de-France", country: "MQ", lat: 14.603, lng: -61.068, institutionType: "government", website: "https://www.martinique.ars.sante.fr",
    tldr: "The French state's regional health agency for Martinique. It steers public health and regulates hospital care on the island, and runs cancer awareness campaigns.",
    summary: "The ARS Martinique is a public body under the health ministry that steers health policy and regulates the supply of care in Martinique, with 160 staff by its own account. Its page on the fight against cancer gathers its campaigns (Juin Vert, Mars Bleu, Movember, HPV vaccination against cervical cancer, Septembre en Or for childhood cancers) and the February 2024 study of cancer survival in Martinique, which it published. The coordinates are an approximate city point for Fort-de-France from OpenStreetMap; OnCo did not geocode the agency's office at Pointe des Grives.",
    programs: ["Regulation of hospital care", "Cancer awareness campaigns"],
    institutions: ["chu-martinique", "martinique-cancer-registry"],
    links: [
      { label: "ARS Martinique: an agency committed to health in Martinique", url: "https://www.martinique.ars.sante.fr/lars-martinique-une-agence-engagee-pour-la-sante-des-martiniquais" },
      { label: "ARS Martinique: the fight against cancers", url: "https://www.martinique.ars.sante.fr/lutte-contre-les-cancers" },
      { label: "Survie des personnes atteintes de cancer en Martinique 2008-2018 (PDF, February 2024)", url: SURVIE_MQ },
    ] }),

  // ---------------- Guadeloupe (GP) ----------------
  i({ id: "chu-guadeloupe", name: "Centre Hospitalier Universitaire de la Guadeloupe", aka: ["CHU de la Guadeloupe", "CHUG", "CHU de Pointe-à-Pitre"],
    city: "Les Abymes", country: "GP", lat: 16.237, lng: -61.525, institutionType: "hospital", website: "https://www.chu-guadeloupe.fr",
    tldr: "Guadeloupe's university hospital, the reference hospital for Guadeloupe, Saint-Martin and Saint-Barthélemy. It runs the territory's radiotherapy unit and a cancer and blood disease service, and hosts the cancer registry.",
    summary: "The CHU de la Guadeloupe describes itself as the reference hospital for Guadeloupe, Les Saintes, Marie-Galante, La Désirade, Saint-Martin and Saint-Barthélemy, with 3,736 staff, including 355 medical staff and 360 residents, and 618 beds and places. Its Pôle Chirurgie-Cancer includes a radiotherapy unit, which the hospital describes as the sole radiotherapy centre in Guadeloupe, with two linear accelerators (a Clinac 2100 iX installed in 2011 and a Halcyon installed in 2020) and a planning scanner installed in March 2023, and an oncology and haematology service with 12 inpatient beds and 12 day places for chemotherapy and transfusions. IAEA's DIRAC lists one radiotherapy centre in Guadeloupe. The hospital lists registries in its Pôle Santé Publique, and INCa's 2023 summary of the Guadeloupe cancer registry's research names the CHU as manager of its funds. The coordinates are the Wikidata point for the hospital.",
    programs: ["Radiotherapy unit (two linear accelerators)", "Medical oncology and haematology", "Cancer registry host"],
    institutions: ["guadeloupe-cancer-registry", "ars-guadeloupe"],
    links: [
      { label: "CHU de la Guadeloupe: presentation", url: "https://www.chu-guadeloupe.fr/portal/a-propos-du-chu/presentation-du-chu-de-la-guadeloupe/le-centre-hospitalier-universitaire-de-la-guadeloupe-353-308.html" },
      { label: "CHU de la Guadeloupe: radiotherapy unit", url: CHUG_RT },
      { label: "CHU de la Guadeloupe: registries", url: CHUG_REGISTRES },
      { label: "IAEA DIRAC: radiotherapy centres by country (data)", url: DIRAC_JSON },
    ] }),

  i({ id: "guadeloupe-cancer-registry", name: "Registre général des cancers de la Guadeloupe", aka: ["Registre des cancers de Guadeloupe", "Guadeloupe Cancer Registry"],
    city: "Les Abymes", country: "GP", lat: 16.237, lng: -61.525, institutionType: "research-institute",
    tldr: "Guadeloupe's population cancer registry, based at the university hospital. It counts new cancers on the island and studies their causes, including pesticides and the risk of myeloma.",
    summary: "The Registre général des cancers de la Guadeloupe is a general registry of the French network of cancer registries (Francim). With the Martinique and La Réunion registries it collected the data for the survival study of the overseas departments published in February 2024. INCa's summary of its 2023 research projects lists work on social and geographical inequalities in cancer in the overseas departments (from 2016), the prevalence of Helicobacter pylori in stomach cancers in the French Antilles (from 2019, stopped in Martinique) and MYELODOM, on myeloma and lymphoma and environmental and occupational exposure to pesticides (from 2017), with the CHU de la Guadeloupe as manager of the funds. Its data also underlie the 2022 study of digestive cancers in Guadeloupe, French Guiana and Martinique, which found stomach cancer incidence above that of mainland France. The coordinates are the point for the CHU de la Guadeloupe.",
    programs: ["Population-based cancer registration for Guadeloupe", "Francim network member registry"],
    institutions: ["chu-guadeloupe", "martinique-cancer-registry", "sante-publique-france", "inca"],
    links: [
      { label: "INCa: research projects of the Guadeloupe general cancer registry in 2023 (PDF)", url: INCA_GP_REG },
      { label: "Survie des personnes atteintes de cancer en Martinique 2008-2018, naming the Guadeloupe registry (PDF, February 2024)", url: SURVIE_MQ },
      { label: "Santé publique France: digestive cancers in Martinique, Guadeloupe and French Guiana from registry data (2022)", url: SPF_CARIB_DIGESTIVE },
      { label: "CHU de la Guadeloupe: registries", url: CHUG_REGISTRES },
    ] }),

  i({ id: "ars-guadeloupe", name: "Agence de Santé de Guadeloupe, Saint-Martin et Saint-Barthélemy", aka: ["ARS Guadeloupe", "Regional Health Agency of Guadeloupe"],
    city: "Gourbeyre", country: "GP", lat: 15.986, lng: -61.71, institutionType: "government", website: "https://www.guadeloupe.ars.sante.fr",
    tldr: "The French state's regional health agency for Guadeloupe, Saint-Martin and Saint-Barthélemy. It plans and regulates hospital and community care, prevention and health security.",
    summary: "The Agence de Santé de Guadeloupe, Saint-Martin et Saint-Barthélemy opened in early April 2010. It is an autonomous public body that steers the health system and public health policy for the three territories, covering prevention and health promotion, health surveillance and security, and the organisation of care in community practice, hospitals and medico-social services, with delegations in each territory. The coordinates are the OpenStreetMap point for the agency in Gourbeyre, which matches the address on its site.",
    programs: ["Regulation of hospital and community care", "Prevention and health promotion"],
    institutions: ["chu-guadeloupe", "guadeloupe-cancer-registry"],
    links: [
      { label: "ARS Guadeloupe: presentation of the agency", url: "https://www.guadeloupe.ars.sante.fr/presentation-de-lagence-de-sante-de-guadeloupe-saint-martin-saint-barthelemy" },
    ] }),

  // ---------------- French Guiana (GF) ----------------
  i({ id: "chu-guyane", name: "Centre Hospitalier Universitaire de Guyane", aka: ["CHU de Guyane", "University Hospital of French Guiana", "Centre hospitalier de Cayenne Andrée-Rosemon"],
    city: "Cayenne", country: "GF", lat: 4.925, lng: -52.321, institutionType: "hospital", website: "https://www.chu-guyane.fr",
    tldr: "French Guiana's university hospital, created in June 2025 from the hospitals of Cayenne, Kourou and Saint-Laurent-du-Maroni and the territory's remote health centres. It gives cancer surgery and chemotherapy but has no radiotherapy, so patients travel to mainland France or Martinique for it.",
    summary: "The CHU de Guyane became a university hospital on 16 June 2025. It is a multi-site hospital made up of the hospitals of Cayenne, Kourou and Saint-Laurent-du-Maroni, three local hospitals (Saint-Georges, Maripasoula, Grand-Santi) and 13 remote prevention and care centres (CDPS), with about 5,000 staff. ARS Guyane's cancer roadmap for 2022 to 2025 says the three hospitals hold four authorisations for cancer surgery (digestive, breast, gynaecological and urological) and give chemotherapy through an association with the Centre Léon Bérard in Lyon, that French Guiana has no radiotherapy centre (87% of radiotherapy is given in mainland France and 13% in Martinique), and that over 2011 to 2014, 55.5% of people with cancer in French Guiana were treated outside the territory. In October 2026 the hospital reported preparing to open academic cancer trials, including the Centre Léon Bérard's PROFILER study, and described the territory's cancer registry and a biological resource centre storing tumours. IAEA's DIRAC has no entry for French Guiana. The coordinates are the Wikidata point for the Cayenne site (Andrée-Rosemon hospital).",
    programs: ["Cancer surgery (four authorisations)", "Chemotherapy in association with the Centre Léon Bérard", "Oncology clinical research"],
    institutions: ["french-guiana-cancer-registry", "ars-guyane", "centre-leon-berard"],
    links: [
      { label: "CHU de Guyane: who we are", url: "https://www.chu-guyane.fr/qui-sommes-nous" },
      { label: "CHU de Guyane: cancer research (October 2026)", url: CHU_GUYANE_RESEARCH },
      { label: "ARS Guyane: cancer roadmap 2022 to 2025, summary (PDF)", url: GF_ROADMAP },
    ] }),

  i({ id: "french-guiana-cancer-registry", name: "Registre général des cancers de la Guyane", aka: ["Registre des cancers de Guyane", "French Guiana Cancer Registry"],
    city: "Cayenne", country: "GF", lat: 4.925, lng: -52.321, institutionType: "research-institute",
    tldr: "French Guiana's population cancer registry, linked to the university hospital. Its data show about 456 new cancers a year in the territory and have been used to study bowel, liver and childhood cancers.",
    summary: "ARS Guyane's cancer roadmap for 2022 to 2025 takes its incidence figures from the registry: 456 new cancers a year over 2010 to 2014, 54% in men. The CHU de Guyane's research news of October 2026 describes the Registre des cancers de Guyane, coordinated by Qiannan Wang and with Kinan Drak Alsibai, head of pathology at the CHU, as having published a study of colorectal cancer in French Guiana from 2003 to 2017 (464 cases) in Santé publique France's weekly epidemiological bulletin in March 2026, presented liver cancer survival for 94 patients diagnosed from 2003 to 2018 at the GRELL congress in May 2026, and contributed to the CONCORD-4 study of childhood cancer survival. The registry also contributed to the 2022 study of digestive cancers in the French Caribbean. The coordinates are the point for the CHU de Guyane in Cayenne; the registry's own office was not located.",
    programs: ["Population-based cancer registration for French Guiana"],
    institutions: ["chu-guyane", "ars-guyane", "sante-publique-france"],
    links: [
      { label: "CHU de Guyane: cancer research (October 2026)", url: CHU_GUYANE_RESEARCH },
      { label: "ARS Guyane: cancer roadmap 2022 to 2025, summary (PDF)", url: GF_ROADMAP },
      { label: "Santé publique France: digestive cancers in Martinique, Guadeloupe and French Guiana from registry data (2022)", url: SPF_CARIB_DIGESTIVE },
    ] }),

  i({ id: "ars-guyane", name: "Agence Régionale de Santé de Guyane", aka: ["ARS Guyane", "Regional Health Agency of French Guiana"],
    city: "Cayenne", country: "GF", lat: 4.925, lng: -52.316, institutionType: "government", website: "https://www.guyane.ars.sante.fr",
    tldr: "The French state's regional health agency for French Guiana. It wrote the territory's cancer roadmap, which aims to build up local cancer care and screening because many patients must travel abroad for treatment.",
    summary: "The ARS de Guyane opened in early April 2010 to carry out regional health policy. Its cancer roadmap for 2022 to 2025, built on the national ten-year cancer strategy, sets two goals: a screening strategy adapted to the populations of the coast and the isolated communes, and more local cancer care linked to the creation of a regional university hospital. It records that French Guiana has no radiotherapy centre, that more than half of people with cancer (55.5% over 2011 to 2014) were treated outside the territory, and that cancer is the second cause of death after circulatory disease, with 128 deaths a year over 2007 to 2014. The coordinates are the OpenStreetMap point for the agency on the Avenue Alexis Blaise in Cayenne.",
    programs: ["Cancer roadmap 2022 to 2025", "Organised cancer screening"],
    institutions: ["chu-guyane", "french-guiana-cancer-registry"],
    links: [
      { label: "ARS Guyane: presentation", url: "https://www.guyane.ars.sante.fr/presentation-de-l-agence-regionale-de-sante-de-guyane" },
      { label: "ARS Guyane: cancer roadmap 2022 to 2025", url: "https://www.guyane.ars.sante.fr/feuille-de-route-cancer-2022-2025" },
      { label: "ARS Guyane: cancer roadmap 2022 to 2025, summary (PDF)", url: GF_ROADMAP },
    ] }),

  // ---------------- French Polynesia (PF) ----------------
  i({ id: "chpf-french-polynesia", name: "Centre Hospitalier de la Polynésie française", aka: ["CHPF", "Hôpital du Taaone", "French Polynesia Hospital Centre"],
    city: "Pirae", country: "PF", lat: -17.528, lng: -149.546, institutionType: "hospital", website: "https://www.chpf.pf",
    tldr: "French Polynesia's public hospital centre, at Taaone in Pirae on Tahiti. Its oncology and radiotherapy department treats adults with cancer using chemotherapy, radiotherapy, hormone therapy and targeted drugs.",
    summary: "The Centre Hospitalier de la Polynésie française, at Pirae, has an emergency service, 11 operating theatres, intensive care, CT, MRI and scintigraphy, and gives surgery, medicine, obstetrics and psychiatry. It became a public administrative body with its own legal personality in 1988; its history page dates the new hospital at Taaone, planned to include cancer care with scintigraphy, chemotherapy and radiotherapy, to 2010. Its oncology and radiotherapy department, in a service sheet dated January 2019, cares for adults with cancer from diagnosis through chemotherapy, radiotherapy, hormone therapy, targeted therapy, follow-up and palliative care, with a radiotherapy unit, an oncology day hospital of 11 places and an 8-bed inpatient unit; it lists a haematology service and a PET-CT scanner. IAEA's DIRAC has no entry for French Polynesia. Patients needing care not available in the territory are evacuated to France or New Zealand. The coordinates are the Wikidata point for the hospital.",
    programs: ["Radiotherapy", "Medical oncology day hospital and inpatient unit", "Haematology"],
    institutions: ["icpf-french-polynesia", "cps-french-polynesia"],
    links: [
      { label: "CHPF: history", url: "https://www.chpf.pf/2018/07/10/historique/" },
      { label: "CHPF: oncology and radiotherapy service sheet (PDF, January 2019)", url: CHPF_RT },
      { label: "CHPF: hospital services", url: "https://www.chpf.pf/2018/08/16/services-hospitaliers/" },
      { label: "Institut du cancer de Polynésie française: preparing a medical evacuation", url: ICPF_EVASAN },
    ] }),

  i({ id: "icpf-french-polynesia", name: "Institut du cancer de Polynésie française", aka: ["ICPF", "Tahiarua Onohi Mihinoa a Tati, dit Tiurai", "Cancer Institute of French Polynesia"],
    city: "Pirae", country: "PF", lat: -17.536, lng: -149.547, institutionType: "cancer-center", website: "https://www.icpf.pf",
    tldr: "French Polynesia's public cancer institute, created in 2021. It runs the territory's cancer registry, screening and prevention, coordinates cancer care and research, and helps patients who must travel abroad for treatment.",
    summary: "The Institut du cancer de Polynésie française, Tahiarua Onohi Mihinoa a Tati, dit Tiurai, is a public industrial and commercial body created by order no. 1291 CM of 13 July 2021. Since 1 January 2022 it has run the cancer registry, screening and prevention, regional coordination of care and a research and innovation directorate; its board is chaired by the minister of health. It is a member of the Unicancer network. Its registry, legally founded by deliberation 85-1042 AT of 30 May 1985, recorded an average of 963 cancers a year in 2019 to 2021, a crude incidence of 345.5 per 100,000. Cancer is a notifiable disease in French Polynesia, and the registry draws on the CHPF, private clinics, doctors, laboratories and the CPS long-term illness register. Its CAP EVASAN nursing team accompanies adults with cancer evacuated to France or New Zealand, with costs met by the CPS. The coordinates are the OpenStreetMap point for the Centre de la mère et de l'enfant in Pirae, where the institute's site gives its address.",
    programs: ["Cancer registry of French Polynesia (from 1985)", "Screening and prevention", "Regional coordination of cancer care", "CAP EVASAN support for patients evacuated abroad", "Multidisciplinary meetings (RCP)"],
    institutions: ["chpf-french-polynesia", "cps-french-polynesia"],
    companies: ["unicancer"],
    links: [
      { label: "Institut du cancer de Polynésie française: the institute", url: "https://www.icpf.pf/institut/" },
      { label: "Institut du cancer de Polynésie française: registry", url: "https://www.icpf.pf/registre/" },
      { label: "Institut du cancer de Polynésie française: registry report 2019 to 2021 (PDF)", url: ICPF_REG_REPORT },
      { label: "Institut du cancer de Polynésie française: preparing a medical evacuation", url: ICPF_EVASAN },
    ] }),

  i({ id: "cps-french-polynesia", name: "Caisse de Prévoyance Sociale de la Polynésie française", aka: ["CPS", "Te Fare Turuutaa", "Social Security Fund of French Polynesia"],
    city: "Papeete", country: "PF", lat: -17.535, lng: -149.559, institutionType: "government", website: "https://www.cps.pf",
    tldr: "French Polynesia's social security fund, which pays for health care, including long-term illness cover and the cost of medical evacuations abroad for people with cancer.",
    summary: "The Caisse de Prévoyance Sociale (Te Fare Turuutaa) runs French Polynesia's social security schemes for employees (RGS), the self-employed (RNS) and people without work (RSPF), with cover for long-term illness and medical evacuation (EVASAN). The Institut du cancer de Polynésie française describes the CPS as paying the costs of an international evacuation for cancer care, including flights and local transport, medical costs, lodging, meals and, under conditions, an accompanying person, and providing social support; Europ Assistance organises the logistics. The registry also uses the CPS long-term illness register as a source. Most pages of the CPS site need a browser to render, so OnCo read only its home page. The coordinates are the OpenStreetMap point for the CPS on the Avenue Georges Clemenceau in Papeete.",
    programs: ["Long-term illness cover", "Medical evacuation (EVASAN) cover"],
    institutions: ["icpf-french-polynesia", "chpf-french-polynesia"],
    links: [
      { label: "Caisse de Prévoyance Sociale (home page)", url: "https://www.cps.pf/" },
      { label: "Institut du cancer de Polynésie française: preparing a medical evacuation", url: ICPF_EVASAN },
      { label: "Institut du cancer de Polynésie française: registry report 2019 to 2021 (PDF)", url: ICPF_REG_REPORT },
    ] }),

  // ---------------- New Caledonia (NC) ----------------
  i({ id: "cht-gaston-bourret", name: "Centre Hospitalier Territorial Gaston-Bourret", aka: ["CHT Gaston-Bourret", "Médipôle de Koutio", "CHT de Nouvelle-Calédonie"],
    city: "Dumbéa", country: "NC", lat: -22.21, lng: 166.452, institutionType: "hospital", website: "https://www.cht.nc",
    tldr: "New Caledonia's territorial hospital, based at the Médipôle in Dumbéa near Nouméa. It has an oncology unit with a day hospital, a palliative care service and the territory's cancer network, and the radiotherapy centre is on the same site.",
    summary: "The Centre Hospitalier Territorial Gaston-Bourret is based at the Médipôle de Koutio in Dumbéa, which by the hospital's figures has 528 beds and places, 8 operating theatres, an MRI and 2 CT scanners, and more than 2,000 staff including 250 doctors and surgeons. Its medicine pole includes an oncology unit with consultations, an oncology day hospital and conventional inpatient beds, a palliative care service and internal medicine with haematology. The hospital lists the New Caledonia oncology network (ONCO NC), whose office is at the Médipôle, among its medical networks, and the cancer patient associations it works with. The New Caledonia radiotherapy centre is housed within the Médipôle. The coordinates are the Wikidata point for the Médipôle de Koutio.",
    programs: ["Oncology unit and day hospital", "Palliative care", "Haematology"],
    institutions: ["onco-nc-network", "crnc-new-caledonia", "dass-new-caledonia"],
    links: [
      { label: "CHT Gaston-Bourret: oncology unit", url: "https://www.cht.nc/offre-de-soins-du-cht/le-pole-medecine/unite-oncologie/" },
      { label: "CHT Gaston-Bourret: the Médipôle in figures", url: "https://www.cht.nc/le-cht-gaston-bourret/le-medipole/les-donnees-chiffrees/" },
      { label: "CHT Gaston-Bourret: ONCO NC", url: "https://www.cht.nc/le-cht-gaston-bourret/les-reseaux-medicaux/onco-nc/" },
    ] }),

  i({ id: "crnc-new-caledonia", name: "Centre de radiothérapie de Nouvelle-Calédonie", aka: ["CRNC", "New Caledonia Radiotherapy Centre"],
    city: "Dumbéa", country: "NC", lat: -22.21, lng: 166.453, institutionType: "cancer-center", website: "https://crnc.nc",
    tldr: "New Caledonia's radiotherapy centre, housed in the Médipôle hospital in Dumbéa. It also hosts the territory's cancer network and its multidisciplinary cancer meetings.",
    summary: "The centre's own page describes it as a technical cancer pole within the Médipôle de Koutio that hosts the New Caledonia oncology network (ONCO NC) and the multidisciplinary cancer meetings for gynaecology, urology, head and neck, endocrinology, gastroenterology and pneumology. The page, written as a project description, says the centre would have two linear accelerators, which it describes as new to New Caledonia, a dedicated CT scanner and immobilisation and quality-control equipment, complementing nuclear medicine at the Kuindo-Magnin clinic. ONCO NC says its seat is in the radiotherapy centre at the Médipôle. IAEA's DIRAC has no entry for New Caledonia, and OnCo did not find a source giving the centre's current equipment or caseload. The coordinates are the OpenStreetMap point for the Médipôle.",
    programs: ["External beam radiotherapy", "Multidisciplinary cancer meetings (RCP)"],
    institutions: ["onco-nc-network", "cht-gaston-bourret"],
    links: [
      { label: "Centre de radiothérapie de Nouvelle-Calédonie", url: "https://crnc.nc/" },
      { label: "ONCO NC: who we are", url: ONCO_NC_ABOUT },
      { label: "ONCO NC: useful links, naming the CRNC", url: "https://www.onco.nc/575-2/" },
    ] }),

  i({ id: "onco-nc-network", name: "Réseau d'oncologie de Nouvelle-Calédonie (ONCO NC)", aka: ["ONCO NC", "OncoNC", "New Caledonia Oncology Network"],
    city: "Dumbéa", country: "NC", lat: -22.21, lng: 166.453, institutionType: "consortium", website: "https://www.onco.nc",
    tldr: "New Caledonia's cancer network, an association of doctors from public and private practice that coordinates cancer care, shares treatment guidelines and informs patients and professionals.",
    summary: "ONCO NC is a not-for-profit association under the 1901 law, created on 10 August 2005, with a board of doctors and a full-time coordinator, and its seat in the radiotherapy centre at the Médipôle de Koutio. Any specialist, general practitioner or oncology paramedical professional can join by signing its charter; its site says it has about a hundred practitioners, while the CHT page says about fifty and the radiotherapy centre page about seventy. Its missions, as listed by the CHT, include spreading clinical practice recommendations in oncology, facilitating exchanges between professionals, informing professionals, patients and relatives, continuing education, and collecting data on cancer care and the quality of practice, across gastroenterology, gynaecology, head and neck and endocrinology, pneumology, urology (from 2008), and dermatology, ophthalmology and internal medicine (from 2016). It is listed among the contributors to the DASS's cancer data. The coordinates are the OpenStreetMap point for the Médipôle.",
    programs: ["Oncology care coordination", "Clinical practice guidelines (référentiels)", "Patient and professional information"],
    institutions: ["cht-gaston-bourret", "crnc-new-caledonia", "dass-new-caledonia", "cafat-new-caledonia"],
    links: [
      { label: "ONCO NC: who we are", url: ONCO_NC_ABOUT },
      { label: "CHT Gaston-Bourret: ONCO NC", url: "https://www.cht.nc/le-cht-gaston-bourret/les-reseaux-medicaux/onco-nc/" },
    ] }),

  i({ id: "dass-new-caledonia", name: "Direction des Affaires Sanitaires et Sociales de la Nouvelle-Calédonie", aka: ["DASS-NC", "DASS Nouvelle-Calédonie", "New Caledonia Directorate of Health and Social Affairs"],
    city: "Nouméa", country: "NC", lat: -22.268, lng: 166.44, institutionType: "government", website: "https://dass.gouv.nc",
    tldr: "New Caledonia's government health and social affairs directorate. It keeps the territory's cancer registry, where cancer must by law be reported, and publishes a dashboard of cancer figures.",
    summary: "The Direction des Affaires Sanitaires et Sociales de la Nouvelle-Calédonie manages the New Caledonia cancer registry and publishes a dashboard of cancer figures, last updated in September 2025 with contributions from the Alma and CHT pathology laboratories, ONCO NC, the CAFAT, the CHT, the ASS-NC and specialist doctors. Cancer has been a notifiable disease since 1994. The registry began in 1977 as a bureau of oncology statistics in the health service, passed to the Institut Pasteur de Nouvelle-Calédonie in 1985 and to the DASS in January 2011, and was requalified in January 2013. It registers all invasive primary tumours, all haematological malignancies, all central nervous system tumours, and in situ tumours of the breast, bladder, colon, cervix and melanoma; non-melanoma skin cancers have not been registered since incidence year 2009. The coordinates are the OpenStreetMap point for the Avenue Paul Doumer in Nouméa, the directorate's address.",
    programs: ["New Caledonia cancer registry (at the DASS from 2011)", "Cancer dashboard"],
    institutions: ["cht-gaston-bourret", "onco-nc-network", "cafat-new-caledonia"],
    links: [
      { label: "DASS Nouvelle-Calédonie: cancer and the cancer registry", url: DASS_CANCER },
    ] }),

  i({ id: "cafat-new-caledonia", name: "CAFAT, Nouvelle-Calédonie", aka: ["CAFAT", "New Caledonia social security fund"],
    city: "Nouméa", country: "NC", lat: -22.269, lng: 166.439, institutionType: "government", website: "https://www.cafat.nc",
    tldr: "New Caledonia's social security fund. It runs the unified health insurance scheme, which pays all the cost of treatment for cancer and other long-term illnesses, apart from a small charge on doctor visits.",
    summary: "The CAFAT runs the Régime Unifié d'Assurance Maladie et Maternité (RUAMM), the health insurance of New Caledonia, covering employees, the self-employed, civil servants, students, retired people and their families, with cover for illness and surgery, long-term illness, maternity, invalidity and death, and for care received outside New Caledonia. Its long-term illness insurance covers 32 conditions set by regulation, including cancers, at 100% for related care and treatment, paid directly to the professional, with a 10% patient charge on medical consultations; insured workers on medically justified sick leave receive a monthly allowance for up to 3 years. It is listed among the contributors to the DASS's cancer data. The coordinates are the OpenStreetMap point for a CAFAT office on the Rue du Général Mangin in Nouméa, and are approximate.",
    programs: ["RUAMM health insurance", "Long-term illness insurance (100% cover)", "Care outside New Caledonia"],
    institutions: ["dass-new-caledonia", "onco-nc-network"],
    links: [
      { label: "CAFAT: RUAMM presentation", url: "https://www.cafat.nc/presentation/" },
      { label: "CAFAT: long-term illness insurance", url: "https://www.cafat.nc/assurance-longue-maladie/" },
      { label: "DASS Nouvelle-Calédonie: cancer and the cancer registry", url: DASS_CANCER },
    ] }),
];

/** Existing record id to the new institution ids it should list (applied in src/data/index.ts). */
export const countriesEuropeOverseasBacklinks: Record<string, string[]> = {
  // TODO: national-center-of-oncology-armenia is defined in the country deep dive (PR #395, src/data/country-records-*.ts). Once it merges, restore: "national-center-of-oncology-armenia": ["ministry-of-health-armenia", "erebouni-medical-center"],
  "st-jude": ["hematology-center-yeolyan"],
  "nct05876754": ["erebouni-medical-center"],
  "mother-teresa-hospital-tirana": ["akbpm-albania", "fsdksh-albania", "ishp-albania"],
  "university-clinic-radiotherapy-oncology-skopje": ["malmed-north-macedonia", "acibadem-sistina-hospital", "clinical-hospital-bitola"],
  "alina": ["acibadem-sistina-hospital"],
  "cleopatra": ["acibadem-sistina-hospital", "clinical-hospital-bitola"],
  "lidera": ["acibadem-sistina-hospital", "clinical-hospital-bitola"],
  "nct00781612": ["acibadem-sistina-hospital"],
  "ipatunity130": ["clinical-hospital-bitola"],
  "landspitali": ["icelandic-cancer-registry", "university-of-iceland", "icelandic-medicines-agency", "icelandic-health-insurance"],
  "istopmm": ["university-of-iceland"],
  "inc-luxembourg": ["registre-national-du-cancer-luxembourg", "centre-francois-baclesse-luxembourg", "centre-hospitalier-de-luxembourg", "cns-luxembourg"],
  "eortc-22033": ["centre-francois-baclesse-luxembourg"],
  "alta-1l": ["centre-hospitalier-de-luxembourg"],
  "profile-1014": ["centre-hospitalier-de-luxembourg"],
  "bank-of-cyprus-oncology-centre": ["cyprus-cancer-registry", "cyprus-health-insurance-organisation"],
  "german-oncology-center-limassol": ["cyprus-health-insurance-organisation"],
  "centre-leon-berard": ["chu-guyane"],
  "sante-publique-france": ["reunion-cancer-registry", "martinique-cancer-registry", "guadeloupe-cancer-registry", "french-guiana-cancer-registry"],
};
