import type { EntityInput, InstitutionInput } from "@/lib/schema";

/**
 * Chile: the institutions behind /countries/cl/ (wave 5) that the corpus did not hold. Spanish sources were read in
 * Spanish from the raw text of each document: the laws as published by the Biblioteca del Congreso Nacional's LeyChile
 * service in its XML form (Leyes 19.966, 20.850, 21.258 and 21.656; Decretos 3 de 2010 and 54 de 2019), the Ministry of
 * Health's Plan Nacional de Cáncer 2022-2027 and its Segundo Informe del Registro Nacional de Cáncer Infantil
 * (pdftotext), the decree and Norma Técnica N° 242 on population cancer registries (scanned, read by OCR), the
 * Superintendencia de Salud's GES page and its 2025 report on the ISAPRE system, and the Instituto de Salud Pública's
 * own "who we are" page. The Ministry's epidemiology site (epi.minsal.cl) answered every request with a Cloudflare
 * challenge, which OnCo did not try to pass, and the Internet Archive was offline when tried.
 *
 * Inbound links: the five institutions link to each other through `institutions`, and the Ministry's record links the
 * existing Instituto Nacional del Cáncer (`inc-chile`) and Fundación Arturo López Pérez (`falp-chile`), so none
 * depends on the country page for a link. Coordinates are a Santiago city point for all five, stated as such.
 */
const asOf = "2026-11-11";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });

const L21258 = "https://www.bcn.cl/leychile/navegar?idNorma=1149004";
const L19966 = "https://www.bcn.cl/leychile/navegar?idNorma=229834";
const L20850 = "https://www.bcn.cl/leychile/navegar?idNorma=1078148";
const D3 = "https://www.bcn.cl/leychile/navegar?idNorma=1026879";
const D54 = "https://www.bcn.cl/leychile/navegar?idNorma=1148609";
const PLAN = "https://www.minsal.cl/wp-content/uploads/2024/03/Plan-Nacional-de-Cancer-2022-2027.pdf";
const MINSAL_CANCER = "https://www.minsal.cl/informacion-sobre-cancer-y-enfermedades-no-transmisibles/";
const RENCI2 = "https://www.minsal.cl/wp-content/uploads/2022/02/Segundo-Informe-RENCI-2012-2016.pdf";
const NT242 = "https://www.minsal.cl/wp-content/uploads/2024/03/NORMA-TECNICA-N%C2%B0-242-DECRETO-EXENTO-N%C2%B0-28-SSP-2025.pdf";
const GES = "https://www.supersalud.gob.cl/difusion/665/w3-propertyvalue-1962.html";
const SIS_2025 = "https://www.superdesalud.gob.cl/app/uploads/2026/07/4-1-7_analisis-de-isapre-con-perspectiva-de-genero-2025_final-2.pdf";
const LRS = "https://www.fonasa.gob.cl/ley-ricarte-soto/";
const ISP_ABOUT = "https://www.ispch.gob.cl/quienes-somos/";

const institutions: InstitutionInput[] = [
  i({ id: "minsal-chile", name: "Ministerio de Salud (Chile)", aka: ["MINSAL", "Chilean Ministry of Health"],
    city: "Santiago", country: "CL", lat: -33.45, lng: -70.66, institutionType: "government", website: "https://www.minsal.cl",
    tldr: "Chile's health ministry. It writes the national cancer plan, decides with the finance ministry which cancers carry guaranteed care (GES) and which high-cost treatments are fully funded (Ley Ricarte Soto), and runs the population cancer registries and the national childhood cancer registry.",
    summary: "Under Ley 21.258 of 2020, the Ley Nacional del Cáncer, the Ministerio de Salud is responsible for the Plan Nacional del Cáncer, a plan of five years approved by ministerial resolution, evaluated at mid-term with the Comisión Nacional del Cáncer, and reported to Congress twice a year. The first plan covered 2018 to 2028; the Ministry published the Plan Nacional de Cáncer 2022-2027 in March 2022 and, in March 2024, a childhood and adolescent cancer plan for 2023 to 2028 and an updated adult action plan. The same law makes cancer a notifiable disease, gives the Subsecretaría de Redes Asistenciales the task of building a Registro Nacional de Cáncer, creates the Comisión Nacional del Cáncer (eleven members drawn from scientific societies, medical faculties and patient organisations) and a Fondo Nacional del Cáncer for prevention, surveillance and research projects, and sets up a Red Oncológica Nacional of centres graded by complexity across five zones.\n\nThe Ministry and the Ministry of Finance set by decree the health problems covered by the Garantías Explícitas en Salud under Ley 19.966 and the high-cost treatments covered by Ley 20.850 (Ley Ricarte Soto), which the Subsecretaría de Salud Pública assesses. Its epidemiology department publishes the population registry and mortality reports, and its Norma Técnica N° 242 of 2025 sets the rules for the regional population cancer registries, which the regional health authorities (SEREMI) run. Its 2022 plan states that in 2020 it bought four linear accelerators centrally for the public radiotherapy network, installed in Antofagasta, the Instituto Nacional del Cáncer, Valdivia and Concepción, at 37% below the estimated budget. The coordinates are a Santiago city point.",
    programs: ["Plan Nacional de Cáncer 2022-2027", "Plan Nacional de Cáncer Infantoadolescente 2023-2028", "Garantías Explícitas en Salud (with the Ministry of Finance)", "Ley Ricarte Soto high-cost treatment assessment", "Comisión Técnica asesora de Drogas de Alto Costo (2020)", "Population cancer registries (Norma Técnica N° 242)", "Registro Nacional de Cáncer Infantil", "Cervical and breast cancer screening in primary care", "School HPV vaccination"],
    cancers: ["gallbladder", "gastric", "breast-cancer", "cervical", "prostate"],
    institutions: ["fonasa-chile", "superintendencia-de-salud-chile", "isp-chile", "renci-chile", "inc-chile", "falp-chile"],
    links: [
      { label: "Ley 21.258, Ley Nacional del Cáncer (LeyChile, Spanish)", url: L21258 },
      { label: "Ministry of Health: Plan Nacional de Cáncer 2022-2027 (PDF, Spanish)", url: PLAN },
      { label: "Ministry of Health: cancer information and plans (Spanish)", url: MINSAL_CANCER },
      { label: "Ministry of Health: Norma Técnica N° 242 on population cancer registries (scanned PDF, Spanish)", url: NT242 },
    ] }),

  i({ id: "fonasa-chile", name: "Fondo Nacional de Salud (FONASA)", aka: ["FONASA", "Chilean National Health Fund"],
    city: "Santiago", country: "CL", lat: -33.45, lng: -70.66, institutionType: "government", website: "https://www.fonasa.gob.cl",
    tldr: "Chile's public health insurer, covering 17.1 million people, 85.2% of residents, in December 2025. Its members pay nothing for guaranteed (GES) care in the public network, and it pays for the high-cost treatments guaranteed under the Ley Ricarte Soto for every insured person, public or private.",
    summary: "The Fondo Nacional de Salud is the public insurer. The Superintendencia de Salud's 2025 report on the ISAPRE system gives 17,132,611 FONASA beneficiaries in December 2025, 85.2% of the resident population, against 2,517,305 people (12.5%) in the private insurers (ISAPREs); members of the armed forces and others make up the rest. FONASA has a single plan financed by 7% of taxable income, whatever the size of the family.\n\nUnder Ley 19.966 FONASA must guarantee access, quality, financial protection and maximum waiting times for the health problems listed in the GES decree, 90 in all according to the Superintendencia; the Superintendencia states that FONASA members pay nothing (copago cero) for GES care in the public system. Under Ley 20.850, FONASA ensures the financial protection of the Ley Ricarte Soto for all beneficiaries of every health insurance system, covering 100% of the cost of the guaranteed medicines, devices and foods; ISAPRE members first use their insurer's catastrophic illness cover (CAEC) where it applies. FONASA also pays for the high-cost cancer drugs approved by the Ministry's drug committee for public-network patients without GES or Ricarte Soto cover. The Ministry's 2022 cancer plan states that FONASA allocated 298,189 million pesos to financial protection for cancer care in 2021. The coordinates are a Santiago city point.",
    programs: ["Public health insurance (single plan, 7% contribution)", "GES guarantees with zero copayment in the public network", "Ley Ricarte Soto financial protection for all insured people", "Payment of high-cost cancer drugs approved by the Ministry's committee"],
    institutions: ["minsal-chile", "superintendencia-de-salud-chile"],
    links: [
      { label: "Superintendencia de Salud: Análisis del Sistema Isapre con perspectiva de género 2025, section 1.1 (PDF, Spanish)", url: SIS_2025 },
      { label: "Ley 20.850, Ley Ricarte Soto, article 1 (LeyChile, Spanish)", url: L20850 },
      { label: "FONASA: Ley Ricarte Soto (Spanish)", url: LRS },
      { label: "Ministry of Health: Plan Nacional de Cáncer 2022-2027, section 2.2 (PDF, Spanish)", url: PLAN },
    ] }),

  i({ id: "superintendencia-de-salud-chile", name: "Superintendencia de Salud (Chile)", aka: ["Superintendencia de Salud", "Chilean Superintendency of Health"],
    city: "Santiago", country: "CL", lat: -33.45, lng: -70.66, institutionType: "government", website: "https://www.superdesalud.gob.cl",
    tldr: "The body that supervises Chile's public and private health insurers and accredits providers. A patient whose guaranteed (GES) care is late can complain to it, and it designates a further provider when the first two cannot treat in time.",
    summary: "Ley 19.966 makes the GES guarantee of quality depend on providers registered or accredited by the Superintendencia de Salud, and gives it a role in the guarantee of timeliness: when neither the first provider nor a second designated by the insurer gives the care in time, the Superintendencia designates a third. Its GES page tells patients that the second provider must see them within 10 days, that they then have 15 days to complain to the Superintendencia, which designates a third provider within 2 days with a maximum of 5 days to give the care. It lists the 90 GES health problems, among them cervical, breast, gastric, colorectal, prostate, lung, kidney, bladder, thyroid, testicular and epithelial ovarian cancer, lymphomas, leukaemia, myeloma, osteosarcoma, primary brain tumours, cancer in children under 15, pain relief and palliative care for advanced cancer, and preventive cholecystectomy against gallbladder cancer at ages 35 to 49.\n\nIt also supervises the Ley Ricarte Soto, receiving complaints against FONASA and the ISAPREs, and publishes statistics on both insurance systems; its 2025 report counts 17,132,611 FONASA beneficiaries and 2,517,305 ISAPRE beneficiaries in December 2025. The coordinates are a Santiago city point.",
    programs: ["Supervision of FONASA and the ISAPREs", "GES complaints and designation of a third provider", "Accreditation and register of providers", "Ley Ricarte Soto supervision", "Insurance statistics"],
    institutions: ["fonasa-chile", "minsal-chile"],
    links: [
      { label: "Superintendencia de Salud: Garantías Explícitas en Salud (Spanish)", url: GES },
      { label: "Ley 19.966, articles 2 and 4 (LeyChile, Spanish)", url: L19966 },
      { label: "Superintendencia de Salud: Análisis del Sistema Isapre con perspectiva de género 2025 (PDF, Spanish)", url: SIS_2025 },
    ] }),

  i({ id: "isp-chile", name: "Instituto de Salud Pública de Chile (ISP)", aka: ["ISP", "ISPCH", "Chilean Public Health Institute", "Chilean medicines regulator"],
    city: "Santiago", country: "CL", lat: -33.45, lng: -70.66, institutionType: "government", website: "https://www.ispch.gob.cl",
    tldr: "Chile's medicines regulator and national reference laboratory. It registers medicines within six months by the ordinary route, and since 2020 within three months for a medicine already registered for the same use by a stringent regulator; biological medicines are excluded from that fast route unless the Minister exempts them.",
    summary: "The Instituto de Salud Pública states that its origins go back to the Instituto de Higiene of 1892 and the Instituto Bacteriológico de Chile of 1939, which became the ISP in 1979, and that since 2016 the Pan American Health Organization has certified it as a level 4 regional reference regulatory authority for medicines. Under the Código Sanitario no medicine may be distributed in Chile without registration, and the ISP keeps the register.\n\nDecreto 3 de 2010, the regulation of the national system for controlling medicines, sets a total of six months from payment of the fee for the ordinary registration route (article 47), and five months for its simplified route (article 52). Decreto 54 de 2019, published on 21 August 2020, added an accelerated route (articles 54 A to 54 G) for medicines registered for the same indication by a high-surveillance regulator, defined as a WHO-listed stringent regulatory authority, a PAHO level IV authority or a PIC/S member: the applicant files the dossier given to that regulator, the ISP takes its review into account, and the procedure may not exceed three months unless the applicant must correct the file. It is closed to medicines refused by any such agency and, unless the Minister of Health exempts them by resolution, to biological medicines. Article 21 lets the ISP authorise use of an unregistered medicine in urgent shortage, for personal import or for a clinical trial. OnCo did not find published measured approval times for cancer medicines. The coordinates are a Santiago city point.",
    programs: ["Registration of medicines (ordinary, simplified and accelerated routes)", "Authorisation of unregistered medicines for urgent use and clinical trials", "National reference laboratories"],
    institutions: ["minsal-chile"],
    links: [
      { label: "ISP: who we are (Spanish)", url: ISP_ABOUT },
      { label: "Decreto 3 de 2010, articles 21, 47 and 52 (LeyChile, Spanish)", url: D3 },
      { label: "Decreto 54 de 2019, accelerated registration route (LeyChile, Spanish)", url: D54 },
    ] }),

  i({ id: "renci-chile", name: "Registro Nacional de Cáncer Infantil (RENCI, Chile)", aka: ["RENCI", "Chilean National Childhood Cancer Registry"],
    city: "Santiago", country: "CL", lat: -33.45, lng: -70.66, institutionType: "government",
    tldr: "Chile's national registry of cancer in children under 15, run by the Ministry of Health's epidemiology department since 2006. Its second report counted 2,584 new childhood cancers in 2012 to 2016 and five-year survival of 73.5%.",
    summary: "The Registro Nacional de Cáncer Infantil was started in 2006 by the Ministry of Health's Departamento de Epidemiología and collects every new cancer in children under 15 diagnosed or treated in public or private centres. Its second report, dated November 2021, describes it as the only cancer registry of national scope that Chile has. For 2012 to 2016 it counted 2,584 cases, a mean of 516.8 a year, against 480.8 a year in 2007 to 2011, and an incidence of 139.4 per million children under 15, up from 128.2. Leukaemias were 42.2% of cases (58.8 per million), central nervous system tumours 17.0% and lymphomas 8.8%.\n\nOf 2,578 children analysed for survival, 73.5% were alive five years after diagnosis, against 71.4% in the previous period; five-year survival was 85.8% for lymphomas, 74.4% for leukaemias, 59.7% for central nervous system tumours and 58.5% for liver tumours. The report states that about 80% of children with cancer in Chile receive free care in state-supported institutions. The epidemiology department's site, which hosts the first report, could not be read from OnCo's network. The coordinates are a Santiago city point for the Ministry.",
    programs: ["National registration of cancer in children under 15 (since 2006)", "Five-year survival analysis", "Quinquennial surveillance reports (2007-2011, 2012-2016)"],
    institutions: ["minsal-chile"],
    links: [
      { label: "Ministry of Health: Segundo Informe RENCI, quinquenio 2012-2016 (PDF, Spanish)", url: RENCI2 },
      { label: "Ministry of Health: cancer information and plans (Spanish)", url: MINSAL_CANCER },
    ] }),
];

/** Records behind /countries/cl/ (wave 5). */
export const recordsCL: EntityInput[] = [...institutions];
