import type { EntityInput, InstitutionInput } from "@/lib/schema";

/**
 * North Macedonia: the public bodies behind /countries/mk/ (wave 13) that the corpus did not hold. Each was written from
 * primary sources read raw, in Macedonian, on 16 November 2026: the Institute of Public Health's site, its cancer report
 * for 2014 to 2023 and its report on the 2025 immunisation programme (PDF text); the Ministry of Health's programme list,
 * the published texts of its 2024 screening programme, 2025 immunisation programme and 2024 co-payment programme, and
 * its medicines site; and Internet Archive copies from 2024 of Health Insurance Fund pages, because the Fund's live site
 * answered with a browser check. One statement about the Fund in 2026 comes from a report by the state news agency MIA
 * and is attributed to it.
 *
 * Inbound links: the three records link one another and the existing records for MALMED and the University Clinic for
 * Radiotherapy and Oncology. Coordinates are an approximate Skopje city point, not building positions.
 */
const asOf = "2026-11-16";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });

const IPH = "https://www.iph.mk/";
const IPH_REPORTS = "https://www.iph.mk/mk/home/izvestai";
const IPH_RAK_2023 = "https://www.iph.mk/Upload/Documents/%D0%98%D0%97%D0%92%D0%95%D0%A8%D0%A2%D0%90%D0%88%20%D0%97%D0%90%20%D0%A0%D0%90%D0%9A%202023.pdf";
const IPH_IMM_2025 = "https://www.iph.mk/Upload/Documents/%D0%93%D0%BE%D0%B4%D0%B8%D1%88%D0%B5%D0%BD%20%D0%BD%D0%B0%D1%80%D0%B0%D1%82%D0%B8%D0%B2%D0%B5%D0%BD%20%D0%B8%D0%BC%D1%83%D0%BD%D0%B8%D0%B7%D0%B0%D1%86%D0%B8%D1%98%D0%B0%202025.pdf";
const MOH = "https://zdravstvo.gov.mk/";
const MOH_PROGRAMMES = "https://zdravstvo.gov.mk/mk-MK/dokumenti/programi";
const MOH_SCREENING_2024 = "https://portal.mdt.gov.mk/post-body-files/programi-file-avWx.pdf";
const MOH_IMM_2025 = "https://portal.mdt.gov.mk/post-body-files/programi-file-8akK.pdf";
const MOH_COPAY_2024 = "https://portal.mdt.gov.mk/post-body-files/programi-file-ry7A.pdf";
const MOH_MEDICINES = "https://lekovi.zdravstvo.gov.mk/";
const FZO = "https://fzo.org.mk/";
const FZO_LIST_2024 = "https://web.archive.org/web/20241009135307/https://fzo.org.mk/240815-pozitivnata-lista-dopolneta-so-devet-generiki-prvpat-po-2014ta-godina";
const FZO_DIALOGUE_2024 = "https://web.archive.org/web/20241009122019/https://fzo.org.mk/240911-politichki-dijalog-za-pozitivnata-lista-na-lekovi-mozhnosti-i-predizvici";
const FZO_RIGHTS = "https://web.archive.org/web/20240519235406/https://fzo.org.mk/prava-od-zadolzhitelnoto-zdravstveno-osiguruvane";
const MIA_CLINIC = "https://new.mia.mk/index.php/en/story/oncology-clinic-better-treatment-increases-life-span-for-breast-lung-skin-cancer-patients";

const institutions: InstitutionInput[] = [
  i({ id: "institute-of-public-health-north-macedonia", name: "Institute of Public Health of the Republic of North Macedonia", aka: ["Институт за јавно здравје на Република Северна Македонија", "ИЈЗ", "IPH", "National Cancer Registry of North Macedonia"],
    city: "Skopje", country: "MK", lat: 42.0, lng: 21.43, institutionType: "government", website: IPH,
    tldr: "North Macedonia's national public health institute, in Skopje. It runs the National Cancer Registry, which has been electronic since 1995 and counted 8,371 new cancers in 2023, and reports each year on vaccination coverage, including the HPV vaccine.",
    summary: "The Institute of Public Health of the Republic of North Macedonia, at 50 Divizija 6 in Skopje, works with 10 regional centres of public health. It runs the National Cancer Registry, kept in electronic form since 1995, and its Department of Health Data and Publication prepares the registry's reports. The Institute's report on cancer for 2014 to 2023, published in 2025, counts 74,208 new cases over the ten years, a mean of 7,421 a year, with 8,371 new cases and 3,726 cancer deaths in 2023, and says 182,659 individual people had been registered by 31 December 2023. Bronchus and lung (12.07%), breast (11.77%), other skin cancers (10.46%) and colon (6.26%) were the four commonest sites; the report's summary table and its yearly rows disagree on whether stomach or prostate cancer comes fifth. The coordinates are an approximate Skopje city point.\n\nThe same report says alignment with the standards of IARC and the European Network of Cancer Registries began in 2019, and lists the registry's weaknesses: under-registration in rural and peripheral regions, too little data from private health facilities, no link to electronic health records or death certificates, a shortage of specialised registrars, and data quality indicators that are not followed systematically. IARC's GLOBOCAN 2024 fact sheet lists no country-specific source for cancer incidence in North Macedonia. The Institute's report on the 2025 immunisation programme gives two-dose HPV vaccine coverage of 51.5% in 2025, against 50.2% in 2024. Its reports index lists cervical and breast screening reports up to 2019.",
    programs: ["National Cancer Registry (electronic since 1995)", "Ten-year cancer reports", "Yearly report on the compulsory immunisation programme", "Cervical and breast screening reports (to 2019)"],
    institutions: ["ministry-of-health-north-macedonia", "university-clinic-radiotherapy-oncology-skopje", "iarc"],
    cancers: ["lung-cancer", "breast-cancer", "colorectal", "cervical"],
    links: [
      { label: "Institute of Public Health (in Macedonian)", url: IPH },
      { label: "Institute of Public Health: cancer report 2014 to 2023 (PDF, in Macedonian)", url: IPH_RAK_2023 },
      { label: "Institute of Public Health: report on the 2025 immunisation programme (PDF, in Macedonian)", url: IPH_IMM_2025 },
      { label: "Institute of Public Health: reports index (in Macedonian)", url: IPH_REPORTS },
    ] }),

  i({ id: "ministry-of-health-north-macedonia", name: "Ministry of Health of the Republic of North Macedonia", aka: ["Министерство за здравство на Република Северна Македонија", "Министерство за здравство", "North Macedonia Ministry of Health"],
    city: "Skopje", country: "MK", lat: 42.0, lng: 21.43, institutionType: "government", website: MOH,
    tldr: "North Macedonia's health ministry. It publishes the yearly government programmes for cancer screening, immunisation and patients' co-payments, sets the maximum wholesale prices of medicines, and publishes the rules for the list of medicines the Health Insurance Fund pays for.",
    summary: "The Ministry of Health, at 50 Divizija 14 in Skopje, publishes the programmes the Government adopts each year under the Law on Health Protection. Its programme for early detection and screening of malignant diseases for 2024 covers a Pap test for women aged 21 to 59 who have not had one in three years, a free mammogram every two years for women aged 40 to 69, and screening colonoscopy for people aged 50 to 75 at average risk, with a total of 23,000,000 denars; it also funds mobile gynaecology clinics run with the Macedonian Medical Association and the Red Cross. The Ministry's programme list shows this programme for 2020, 2022, 2023 and 2024 and not under 2025 or 2026. Its 2025 immunisation programme gives the HPV vaccine to all children aged 12, with boys included under a Ministry decision of 16 May 2024. Its 2024 programme on co-payments for particular diseases sets aside 27,960,000 denars for the co-payments of insured people with malignant diseases. The coordinates are an approximate Skopje city point.\n\nOn medicines, the Ministry sets maximum wholesale prices under article 108 of the Law on Medicines and Medical Devices; its medicines site carries such decisions for 2023 to 2026, and its notice for 2026 says new prices apply from 1 May 2026. Its medicines site carries the rulebook on how the list of medicines paid for by the Health Insurance Fund is drawn up, published on 13 February 2023 and amended in June 2023, February 2024 and September 2025, and guidance on special agreements for medicines.",
    programs: ["Programme for early detection and screening of malignant diseases (2024)", "Compulsory immunisation programme, including HPV vaccination", "Programme on co-payments for particular diseases, including malignant diseases (2024)", "Maximum wholesale prices of medicines", "Rules for the list of medicines paid for by the Health Insurance Fund"],
    institutions: ["institute-of-public-health-north-macedonia", "health-insurance-fund-north-macedonia", "malmed-north-macedonia", "university-clinic-radiotherapy-oncology-skopje"],
    cancers: ["cervical", "breast-cancer", "colorectal"],
    links: [
      { label: "Ministry of Health: programmes by year (in Macedonian)", url: MOH_PROGRAMMES },
      { label: "Programme for early detection and screening of malignant diseases, 2024 (PDF, in Macedonian)", url: MOH_SCREENING_2024 },
      { label: "Compulsory immunisation programme, 2025 (PDF, in Macedonian)", url: MOH_IMM_2025 },
      { label: "Co-payment programme for particular diseases, 2024 (PDF, in Macedonian)", url: MOH_COPAY_2024 },
      { label: "Ministry of Health: medicines site (in Macedonian)", url: MOH_MEDICINES },
    ] }),

  i({ id: "health-insurance-fund-north-macedonia", name: "Health Insurance Fund of the Republic of North Macedonia", aka: ["Фонд за здравствено осигурување на Република Северна Македонија", "ФЗО", "ФЗОРСМ", "FZO", "FZOM", "Health Insurance Fund of North Macedonia"],
    city: "Skopje", country: "MK", lat: 42.0, lng: 21.43, institutionType: "government", website: FZO,
    tldr: "North Macedonia's compulsory health insurer. It pays for care and for the medicines on its list, which it extended in August 2024 for what it called the first time since 2014.",
    summary: "The Health Insurance Fund of the Republic of North Macedonia, at Makedonija 5 in Skopje, runs compulsory health insurance. Its page on rights says the rights of compulsory insurance can be used only by a person whose status as an insured person has been established, on an application to one of the Fund's regional offices, on the grounds in article 5 of the Law on Health Insurance. The Fund keeps the list of medicines it pays for, drawn up under a rulebook that the Ministry of Health publishes on its medicines site. The coordinates are an approximate Skopje city point.\n\nOn 15 August 2024 the Fund's Management Board added nine medicines by generic name, 20 by form and strength, for blood clotting, heart and blood vessel disease and the nervous system, at an estimated cost of about one million euros a year; the Fund called it the first addition to the list since 2014. On 11 September 2024 the Government, the Ministry of Health, the Fund and representatives of WHO held a policy dialogue on revising the list. The state news agency MIA reported on 4 April 2026 that the Fund's director said six prescription medicines had been added since the previous year, with two new medicines for breast cancer and new options for prostate cancer among the 2026 updates. The Fund's live site answered OnCo's reader with a browser check on 16 November 2026, so these statements rest on Internet Archive copies of its pages from 2024.",
    programs: ["Compulsory health insurance", "List of medicines paid for by the Fund (the positive list)"],
    institutions: ["ministry-of-health-north-macedonia", "university-clinic-radiotherapy-oncology-skopje", "malmed-north-macedonia"],
    links: [
      { label: "Health Insurance Fund: positive list extended for the first time since 2014 (15 August 2024, Internet Archive copy, in Macedonian)", url: FZO_LIST_2024 },
      { label: "Health Insurance Fund: policy dialogue on the positive list (11 September 2024, Internet Archive copy, in Macedonian)", url: FZO_DIALOGUE_2024 },
      { label: "Health Insurance Fund: rights under compulsory insurance (Internet Archive copy, May 2024, in Macedonian)", url: FZO_RIGHTS },
      { label: "MIA: oncology clinic and Health Insurance Fund press conference (4 April 2026)", url: MIA_CLINIC },
    ] }),
];

/** Records behind /countries/mk/ (wave 13). */
export const recordsMK: EntityInput[] = [...institutions];
