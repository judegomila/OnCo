import type { EntityInput, InstitutionInput } from "@/lib/schema";

/**
 * Greece: the public bodies behind /countries/gr/ that the corpus did not hold. Every record was written from the
 * body's own pages or from the Greek legal text that governs it, read raw in Greek on 11 November 2026: the National
 * Organisation for Medicines' own profile (old.eof.gr), the National Organisation for the Provision of Health
 * Services' pages on high-cost medicines and its negotiation committee, Law 4931/2022 (Government Gazette A 94,
 * 13 May 2022) as published by that organisation, the e-government company's own profile (idika.gr), and reports of
 * the ministerial decision founding the national registry of patients with neoplastic diseases (News4Health,
 * 9 February 2024 and 25 February 2025). The OECD and European Commission's Country Cancer Profile Greece 2025 was
 * read raw in English. The Ministry of Health's site (moh.gov.gr) did not answer scripts, so no record of the ministry
 * is written here. Coordinates are city points for Athens, stated as such, except where a street address is given.
 *
 * Inbound links: the payer links the regulator, the assessment committee, the registry and the e-government company;
 * the registry links the e-government company and the payer; the committee links the payer and the regulator; so none
 * is reachable only from the page.
 */
const asOf = "2026-11-11";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });

const CCP = "https://cancer-inequalities.jrc.ec.europa.eu/sites/default/files/docs/ccp2025/ec-oecd-el-2024-1669-en.pdf";
const LAW_4931 = "https://www.eopyy.gov.gr/media/ysyftfes/systasi-ed_ar5-n4931_2022.pdf";
const EOF_PROFILE = "http://old.eof.gr/assets/EOF_Profile.pdf";
const EOPYY_FYK = "https://www.eopyy.gov.gr/el/simeia-apostolis-farmakon-ypsilou-kostous/";
const IDIKA_PROFILE = "https://www.idika.gr/etaireia/profil/";
const REG_2024 = "https://www.news4health.gr/politiki-ygeias/to-ethniko-mitro-o-neoplasion-epitelous-thesmothetithike";
const REG_2025 = "https://www.news4health.gr/politiki-ygeias/se-leitourgia-to-ethniko-mitroo-neoplasmatikon-astheneion-se-poious-apefthynetai";
const REG_LAUNCH = "https://www.news4health.gr/politiki-ygeias/enarksi-tou-mitroou-neoplasion-ti-allazei-sti-diaxeirisi-tou-karkinou";

const institutions: InstitutionInput[] = [
  i({ id: "greece-neoplastic-diseases-registry", name: "National Registry of Patients with Neoplastic Diseases (Greece)", aka: ["Εθνικό Μητρώο Ασθενών με Νεοπλασματικές Ασθένειες", "Εθνικό Μητρώο Νεοπλασιών", "Greek National Cancer Registry", "cancer-registry.gov.gr"],
    city: "Athens", country: "GR", lat: 37.984, lng: 23.728, institutionType: "government", website: "https://cancer-registry.gov.gr",
    tldr: "Greece's national registry of people with cancer, founded by a ministerial decision published on 9 February 2024 and run on the e-prescription system by the state e-government company. It went into production in February 2025; no figures from it had been published that could be found.",
    summary: "A ministerial decision signed by the Minister of Health and the Deputy Minister, published in the Government Gazette on Friday 9 February 2024 as reported by News4Health that day, founds the Εθνικό Μητρώο Ασθενών με Νεοπλασματικές Ασθένειες. Inclusion is compulsory for every patient aged over 18 at diagnosis (and for younger patients treated in adult units) diagnosed with a neoplastic disease, blood cancers included, after the registry starts, and for patients diagnosed earlier who use health services for treatment, follow-up or relapse checks once it is running. Laboratory doctors (pathology, cytology, haematology, biopathology, radiology and nuclear medicine) in public and private units must enter the laboratory data needed to include and follow a patient, and treating doctors in a long list of specialties enter the clinical data. The decision gives the technical design and running of the registry to the state e-government company, which draws patients' diagnoses, prescriptions, tests and treatment protocols from the e-prescription system and links the registry to the national childhood cancer registry, the social security number register and the electronic health record; the national insurer may link to it for reimbursement but may not draw patients' medical histories. Management sits with the Ministry of Health's unit for therapeutic protocols and patient registries until a National Neoplasm Institute is staffed. The decision's own justification quotes estimates of 64,530 new cancers and 33,166 cancer deaths in Greece in 2020.\n\nThe Minister announced the official start of the electronic platform at the Hellenic Cancer Federation's ninth congress on 4 February 2025, and News4Health reported on 25 February 2025 that the registry was going into production that day, with contributions from the Hellenic Society of Medical Oncology, the Haematology Society and the Hellenic Cancer Federation, and that it is meant to be interoperable with the European Cancer Information System. The OECD and European Commission's 2025 profile, with information to July 2024, says Greece is among the few EU countries without a working national cancer registry. The registry's own site did not answer scripts on 11 November 2026, and no incidence figures from it were found.",
    programs: ["Compulsory registration of every adult patient with a neoplastic disease, including blood cancers", "Data drawn from the e-prescription system", "Link to the national childhood cancer registry and the electronic health record"],
    institutions: ["idika-greece", "eopyy-greece", "hellenic-cancer-federation"],
    links: [
      { label: "News4Health: the National Registry of Neoplasms is finally established, 9 February 2024 (in Greek)", url: REG_2024 },
      { label: "News4Health: the National Registry of Neoplastic Diseases goes into operation, 25 February 2025 (in Greek)", url: REG_2025 },
      { label: "News4Health: start of the Registry of Neoplasms, 4 February 2025 (in Greek)", url: REG_LAUNCH },
      { label: "OECD/EC, Country Cancer Profile Greece 2025, sections 2 and 5.2 (PDF)", url: CCP },
    ] }),

  i({ id: "idika-greece", name: "IDIKA, e-Government Center for Health and Social Security (Greece)", aka: ["Ηλεκτρονική Διακυβέρνηση Υγείας και Κοινωνικής Ασφάλισης", "ΗΔΥΚΑ", "ΗΔΙΚΑ", "IDIKA", "I.DI.K.A. Single Member S.A."],
    city: "Athens", country: "GR", lat: 37.984, lng: 23.728, institutionType: "government", website: "https://www.idika.gr",
    tldr: "The Greek state's e-government company for health and social security, which runs electronic prescribing, the technical side of the national registry of patients with neoplastic diseases, and a payment clearing system for providers of preventive medicine.",
    summary: "The company's own profile says it was set up by Law 3607/2007 by converting the Social Services Computer Centre (ΚΗΥΚΥ) into a non-profit company, and renamed by Law 5263/2025 as Ηλεκτρονική Διακυβέρνηση Υγείας και Κοινωνικής Ασφάλισης Μονοπρόσωπη Ανώνυμη Εταιρεία (ΗΔΥΚΑ ΜΑΕ). All its shares belong to the Greek state, and it is supervised jointly by the Ministers of Digital Governance and of Health. Its seat is at Lykourgou 10 in Athens; the coordinates are a city point for central Athens.\n\nThe ministerial decision of February 2024 founding the national registry of patients with neoplastic diseases gives the company the technical design and running of the registry, which draws its data from the e-prescription system the company runs. Its home page also lists a payment clearing system for providers of preventive medicine among its projects.",
    programs: ["Electronic prescribing and referrals", "National registry of patients with neoplastic diseases (technical operator)", "Payment clearing for providers of preventive medicine"],
    institutions: ["greece-neoplastic-diseases-registry", "eopyy-greece"],
    links: [
      { label: "IDIKA: company profile (in Greek)", url: IDIKA_PROFILE },
      { label: "News4Health: the National Registry of Neoplasms is finally established, 9 February 2024 (in Greek)", url: REG_2024 },
    ] }),

  i({ id: "eopyy-greece", name: "National Organisation for the Provision of Health Services (EOPYY, Greece)", aka: ["Εθνικός Οργανισμός Παροχής Υπηρεσιών Υγείας", "ΕΟΠΥΥ", "EOPYY"],
    city: "Athens", country: "GR", lat: 37.984, lng: 23.728, institutionType: "government", website: "https://www.eopyy.gov.gr",
    tldr: "Greece's single public health insurer. It pays for medicines, tests and care for the insured, dispenses high-cost medicines such as many cancer drugs through its own pharmacies, and runs the electronic pre-approval system through which medicines can be paid for case by case.",
    summary: "The Εθνικός Οργανισμός Παροχής Υπηρεσιών Υγείας is the single insurer that the OECD and European Commission's 2025 profile describes as reimbursing laboratories, diagnostic centres and private hospitals without strict preconditions or links to quality. Law 4931/2022 (Government Gazette A 94, 13 May 2022), as published by the organisation, sets up in it a committee to negotiate the prices it pays for health services, devices and materials, introduces horizon scanning of medicines in its Pharmaceutical Directorate, and lets its board, after the opinion of the national committee for the evaluation and reimbursement of medicines, approve in exceptional cases a medicine that is not on the reimbursed list for one patient's course of treatment. The same law opens the electronic pre-approval system, in which reviewing doctors decide whether a medicine needs to be reimbursed, to private doctors, with at least five reviewers in each specialty including medical oncology and radiotherapy.\n\nHigh-cost medicines are collected from the organisation's own pharmacies; where none works locally, its page says they can be ordered through dispatch points, with a maximum estimated wait of 10 to 15 days from handing in the prescription. The OECD profile records that Greece's main tools to control spending on cancer medicines are price negotiations, rebates and clawbacks, and that public hospitals are paid through a hybrid of diagnosis-related groups and retrospective budget payments.",
    programs: ["Single public health insurance fund", "High-cost medicines dispensed through its own pharmacies", "Electronic pre-approval system for medicines", "Negotiation committee for service and device prices", "Horizon scanning of medicines"],
    institutions: ["eof-greece", "greece-medicines-assessment-committee", "greece-neoplastic-diseases-registry", "idika-greece"],
    links: [
      { label: "EOPYY: dispatch points for high-cost medicines (in Greek)", url: EOPYY_FYK },
      { label: "Law 4931/2022, articles 5 and 10 to 13, Government Gazette A 94 (PDF, in Greek)", url: LAW_4931 },
      { label: "OECD/EC, Country Cancer Profile Greece 2025, section 5.3 (PDF)", url: CCP },
    ] }),

  i({ id: "eof-greece", name: "National Organisation for Medicines (EOF, Greece)", aka: ["Εθνικός Οργανισμός Φαρμάκων", "ΕΟΦ", "EOF", "National Organization for Medicines"],
    city: "Athens", country: "GR", lat: 37.984, lng: 23.728, institutionType: "government", website: "https://www.eof.gr",
    tldr: "Greece's medicines regulator, founded in 1983 under Law 1316. New cancer medicines are authorised for the whole EU through the European Medicines Agency; EOF supervises them on the Greek market, authorises clinical trials and runs pharmacovigilance.",
    summary: "The organisation's own profile says the Εθνικός Οργανισμός Φαρμάκων was founded in 1983 by Law 1316 as a public-law body of the Ministry of Health, with the mission of protecting public health by ensuring the safety, quality and efficacy of medicines for human and veterinary use, biological products, medical devices, food supplements, biocides and cosmetics on the Greek market. Working with the European Union, it evaluates and authorises products, monitors their quality, safety and efficacy after they are marketed, inspects manufacturing, clinical studies and distribution against good practice rules, promotes medical and pharmaceutical research, and informs health professionals and the public. Its site has pages on clinical trials, including trials of medical devices under the EU device regulation, and on the national ethics committee.\n\nNew active substances for cancer go through the EU centralised procedure, so a medicine authorised by the European Commission is legally available in Greece at the same time as elsewhere in the EU; reimbursement is decided separately, through the national committee for the evaluation and reimbursement of medicines and the insurer. The coordinates are a city point for Athens.",
    programs: ["Marketing authorisation and market supervision", "Clinical trial authorisation", "Pharmacovigilance (yellow card reporting)", "Medical devices"],
    institutions: ["ema", "eopyy-greece"],
    links: [
      { label: "EOF: organisation profile (PDF, in Greek and English)", url: EOF_PROFILE },
      { label: "EOF: home page", url: "https://www.eof.gr/" },
    ] }),

  i({ id: "greece-medicines-assessment-committee", name: "Committee for the Evaluation and Reimbursement of Medicines for Human Use (Greece)", aka: ["Επιτροπή Αξιολόγησης και Αποζημίωσης Φαρμάκων Ανθρώπινης Χρήσης", "Greek HTA Committee"],
    city: "Athens", country: "GR", lat: 37.984, lng: 23.728, institutionType: "government",
    tldr: "Greece's health technology assessment committee for medicines, set up in 2018 under article 247 of Law 4512/2018. It advises on which medicines enter the reimbursed list and gives its opinion when the insurer is asked to pay for an unlisted medicine in an exceptional case.",
    summary: "The OECD and European Commission's 2025 profile records that health technology assessment was established in Greece in 2018 and is carried out for medicines but not for other health technologies; it concentrates mainly on clinical aspects and less on economic evaluation and the wider value of cancer medicines, partly because of understaffing and administrative barriers, and an initiative to restructure the process around value-based approaches had recently been announced. Law 4931/2022 (Government Gazette A 94, 13 May 2022) names the committee as the Επιτροπή Αξιολόγησης και Αποζημίωσης Φαρμάκων Ανθρώπινης Χρήσης of article 247 of Law 4512/2018 and adds to that article a route by which the insurer's board, after the committee's opinion, may approve in exceptional cases a medicine that is not on the reimbursed list for one patient's course of treatment; the same law applies the committee members' conflict-of-interest rules to the reviewing doctors of the insurer's electronic pre-approval system.\n\nThe profile also records that the share of a sample of high-benefit breast and lung cancer indications publicly reimbursed in Greece on 1 April 2023 was 54%, against an EU average of 59%, and that the time from EU authorisation to a reimbursement decision was more than 550 days. The committee's own decisions and membership were not read, because the Ministry of Health's site did not answer scripts.",
    programs: ["Health technology assessment of medicines", "Opinions on the reimbursed medicines list", "Opinions on exceptional reimbursement of unlisted medicines"],
    institutions: ["eopyy-greece", "eof-greece"],
    links: [
      { label: "Law 4931/2022, articles 12 and 13, Government Gazette A 94 (PDF, in Greek)", url: LAW_4931 },
      { label: "OECD/EC, Country Cancer Profile Greece 2025, sections 5.1 and 5.3 (PDF)", url: CCP },
    ] }),
];

export const recordsGR: EntityInput[] = [...institutions];
