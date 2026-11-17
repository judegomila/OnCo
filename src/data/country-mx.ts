import type { CountryDive } from "@/data/country-dive";

/**
 * Mexico deep dive: the hand-written cards for /countries/mx/. Mexican sources were read in Spanish, from the raw
 * text of each PDF or page (pdftotext or the HTML itself), on 4 November 2026: INEGI's World Cancer Day release of
 * 30 January 2026 (deaths registered in 2024), the Ley General de Salud consolidated by the Cámara de Diputados
 * (reform of 15 January 2026), the Ley General para la Detección Oportuna del Cáncer en la Infancia y la
 * Adolescencia, the Diario Oficial texts of COFEPRIS's abbreviated route (18 July 2025), the Compendio commission's
 * rules (10 April 2024), NOM-041-SSA2-2011 and the 2007 modification of NOM-014-SSA2-1994, the decree creating
 * IMSS-Bienestar, the Fondo de Salud para el Bienestar's rules (Internet Archive copy), the Auditoría Superior de la
 * Federación's 2022 performance audit of women's cancer prevention, COFEPRIS's and IMSS's own press releases, and
 * the Salud Pública de México paper on the registry network. Where a figure could not be read it is under `gaps`.
 */
const INEGI_2026 = "https://www.inegi.org.mx/contenidos/saladeprensa/aproposito/2026/EAP_Cancer_26.pdf";
const LGS = "https://www.diputados.gob.mx/LeyesBiblio/pdf/LGS.pdf";
const LGDOCIA = "https://www.diputados.gob.mx/LeyesBiblio/pdf/LGDOCIA_070121.pdf";
const MOHAR = "https://doi.org/10.21149/15258";
const EXPANSION_RNC = "https://politica.expansion.mx/mexico/2025/09/24/salud-retoma-el-registro-de-cancer-empezara-con-datos-infantiles";
const DOF_RELIANCE = "https://dof.gob.mx/nota_detalle.php?codigo=5763319&fecha=18/07/2025";
const COFEPRIS_2025 = "https://www.gob.mx/cofepris/articulos/cofepris-consolida-en-2025-un-sistema-regulatorio-mas-agil-seguro-y-con-reconocimiento-internacional";
const NORMAS_CNIS = "https://dof.gob.mx/nota_detalle.php?codigo=5722808&fecha=10/04/2024";
const DECRETO_IMSSB = "https://imssbienestar.gob.mx/assets/doc/juridico/01_normatividad/01_marcojuridico/03_decretos/Decreto%20de%20Creaci%C3%B3n%20IMSS-BIENESTAR%20Integrado%20DOF%2015-08-2025.pdf";
const FONSABI_RULES = "https://web.archive.org/web/20260113114526/https://imssbienestar.gob.mx/assets/docs/finanzas/REGLAS_OPERACION_FONSABI.pdf";
const NOM_041 = "https://dof.gob.mx/nota_detalle.php?codigo=5194157&fecha=09/06/2011";
const NOM_014 = "https://dof.gob.mx/nota_detalle.php?codigo=4989200&fecha=31/05/2007";
const ASF_2022 = "https://www.asf.gob.mx/Trans/Informes/IR2022b/Documentos/Auditorias/2022_0035_a.pdf";
const IMSS_VPH = "https://www.imss.gob.mx/sites/all/statics/i2f_news/IMSS%20Bolet%C3%ADn%20474..pdf";

export const MX_DIVE: CountryDive = {
  iso2: "MX",
  iso3: "MEX",
  name: "Mexico",
  flag: "🇲🇽",
  asOf: "2026-11-04",
  title: "Cancer in Mexico",
  description:
    "Cancer in Mexico from Mexican sources: INEGI's 95,108 deaths from malignant tumours in 2024, a national cancer registry created in law in 2017 that has not yet published a national count, free care for people without social security through IMSS-Bienestar and a fund for high-cost treatment, the national formulary and its economic evaluation, COFEPRIS's 2025 reliance route with a 45-working-day limit, breast and cervical screening and what share of women they reach, and the cancer trials with sites in Mexico.",
  lede:
    "Mexico counts its registered cancer deaths, 95,108 from malignant tumours in 2024, but OnCo found no national count of new cancers: the registry the law created in 2017 has published no national figure that OnCo could find. The incidence figure on this page is IARC's estimate. Care is split between social security institutes for people in formal work and free public care for everyone else, and since 2025 the medicines regulator can approve a medicine by relying on a full approval by a reference regulator abroad.",
  globocanNote:
    "IARC's GLOBOCAN 2024 estimate for Mexico is 201,137 new cancers and 96,264 deaths in 2024, including 6,476 non-melanoma skin cancers (194,661 without them). IARC's fact sheet gives \"No data\" as its country-specific source for incidence in Mexico and its method as \"National mortality estimates applied to model-based M:I ratios (neighbouring country registry data)\"; for deaths its source is WHO national data, with trends in national rates projected to 2024. The authors of the Mexican registry network describe IARC's incidence estimate in the same terms. The deaths figure is close to Mexico's own count: INEGI registered 95,108 deaths from malignant tumours in 2024 (codes 08 to 15 of the Mexican list of diseases), 11.6% of all 819,672 deaths registered that year. Apart from a report from the Mérida registry, which was not read for this page, the population-based counts of new cancers that OnCo found for Mexico come from a network of nine local registries (eight cities and the state of Baja California Sur) that ran from 2017 to 2020 and covered about 11% of the population; its 13,517 cases are not a national incidence and cannot be compared with GLOBOCAN's total, though breast cancer was the commonest in both.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Mexico",
      aside: { label: "INEGI: Estadísticas a propósito del Día Mundial contra el Cáncer, 30 January 2026 (PDF)", url: INEGI_2026 },
      cards: [
        {
          id: "deaths-2024",
          title: "95,108 deaths from cancer in 2024, and a death rate that rose over a decade",
          plain:
            "Mexico's statistics office counted 95,108 deaths from malignant tumours in 2024, about one death in nine, slightly more of them women than men. The death rate rose from 65.0 to 73.1 per 100,000 people between 2015 and 2024. From age 30 breast cancer causes the most cancer deaths in women; in men aged 60 and over it is prostate cancer.",
          detail:
            "INEGI's release of 30 January 2026, drawing on its Estadísticas de Defunciones Registradas for 2024, counts 819,672 registered deaths, of which 95,108 (11.6%) were due to malignant tumours: 52.5% women and 47.5% men. The rate was 73.1 per 100,000 people (74.9 in women and 71.2 in men), up from 65.0 in 2015, and INEGI notes that a gap between women's and men's rates has held since 2021. By state, the age-standardised rate ran from 90.1 in Chihuahua, 88.8 in Baja California Sur and 86.9 in Baja California to 50.7 in Guerrero, 63.6 in Durango and 63.9 in Tlaxcala. Leukaemia had the highest cancer death rate under 20 (1.9 per 100,000 girls, 2.4 per 100,000 boys); at 20 to 29 it was leukaemia in women (2.1) and testicular cancer in men (3.4). From 30, breast cancer had the highest rate in women (15.3 at 30 to 59, 51.9 at 60 and over, with cervical cancer second at 30 to 59 at 9.9); in men it was colon cancer at 30 to 59 (4.8) and prostate cancer from 60 (97.9). The same release counts 57,019 discharges for malignant tumours from private hospitals in 2024, 18.9% of them in Mexico City.",
          links: [{ label: "INEGI: Estadísticas a propósito del Día Mundial contra el Cáncer (comunicado 7/26, PDF)", url: INEGI_2026 }],
        },
        {
          id: "no-national-count",
          title: "A national cancer registry in law since 2017, without a national count yet",
          plain:
            "Mexico's health law has required a population-based national cancer registry since 2017. The national cancer institute ran a network of nine local registries from 2017 until it was suspended for lack of money in 2020. In September 2025 the health minister presented a module for children's cancers, and the press reported that the ministry was taking the registry up again, beginning with children. OnCo found no national figure for new cancers published from it.",
          detail:
            "Article 161 Bis of the Ley General de Salud, added by a reform published on 22 June 2017, says the Registro Nacional de Cáncer will be population-based, fed by the national basic health information system, and hold patient, tumour, treatment, follow-up and survival data, organised by northern, central and southern regions; the reform's transitional articles gave the ministry sixty days after it took effect to issue the registry's regulation. A 2021 amendment added a section for children under the childhood cancer law. The Instituto Nacional de Cancerología coordinated the network: registries in Acapulco, Baja California Sur, Campeche, Guadalajara, Hermosillo, León, Monterrey, Tijuana and Toluca recorded 13,517 new cancers from 2017 to 2020, from 481 public and private sources but without IMSS institutions, which cover around 55% of the population, before budget restrictions suspended it in 2020; its authors call the results partial. A registry in Mérida, run at an IMSS institution since 2016, covers 908,536 people. On 22 September 2025 the Secretario de Salud presented the registry's paediatric module; the estimate of new children's cancers quoted in the press report was 3,000 to 5,000 a year.",
          links: [
            { label: "Ley General de Salud, article 161 Bis and the 2017 decree (PDF)", url: LGS },
            { label: "Mohar et al., population-based cancer registry network in Mexico 2017 to 2020 (Salud Publica Mex 2024)", url: MOHAR },
            { label: "Expansión: Salud retoma el registro de cáncer (24 September 2025)", url: EXPANSION_RNC },
          ],
        },
      ],
      tables: [
        {
          id: "redmex-sites",
          title: "New cancers recorded by Mexico's registry network, 2017 to 2020, by site",
          caption: "Counts of new cancers, both sexes, from nine population-based registries (eight cities and the state of Baja California Sur) covering 14.4 million people (2020 census), coordinated by the Instituto Nacional de Cancerología.",
          columns: [
            { key: "site", label: "Cancer site (ICD-10)" },
            { key: "n", label: "Cases, 2017 to 2020", numeric: true },
            { key: "pct", label: "Share (%)", numeric: true },
            { key: "y2019", label: "Cases, 2019", numeric: true },
          ],
          rows: [
            { site: "All cancers", n: 13517, pct: 100, y2019: 3669 },
            { site: "Breast (C50)", n: 3154, pct: 23.3, y2019: 877 },
            { site: "Digestive organs (C15 to C26)", n: 2492, pct: 18.4, y2019: 688 },
            { site: "Female genital organs (C51 to C58)", n: 1828, pct: 13.5, y2019: 495 },
            { site: "Male genital organs (C60 to C63)", n: 1519, pct: 11.2, y2019: 425 },
            { site: "Bone, cartilage and melanoma (C40 to C43)", n: 827, pct: 6.1, y2019: 190 },
            { site: "Respiratory organs (C30 to C39)", n: 648, pct: 4.8, y2019: 148 },
            { site: "Urinary organs (C64 to C68)", n: 596, pct: 4.4, y2019: 160 },
            { site: "Haematopoietic (C81 to C96)", n: 419, pct: 3.1, y2019: 134 },
            { site: "Eye, brain, thyroid and other (C69 to C75)", n: 350, pct: 2.6, y2019: 89 },
            { site: "Lip, oral cavity and pharynx (C00 to C14)", n: 262, pct: 1.9, y2019: 82 },
            { site: "Other and unspecified", n: 1422, pct: 10.5, y2019: 381 },
          ],
          note: "These are case counts, not rates, and not national incidence: the registries were established in 2018 and 2019 and began collecting data to the network's standards between 2018 and 2020, IMSS hospitals were not included, and 2020 was cut short by the pandemic and the network's suspension (1,390 cases that year). Within sexes, cervical cancer was 13.2% of cases in women and prostate cancer 21.7% in men.",
          sources: [{ label: "Mohar et al., Salud Publica Mex 2024;66:104-112, Tables I and II", url: MOHAR }],
        },
        {
          id: "redmex-registries",
          title: "The nine registries in the network",
          caption: "Population covered (2020 census), year each registry was established, information sources and new cases recorded to 2020.",
          columns: [
            { key: "registry", label: "Registry" },
            { key: "pop", label: "Population, 2020", numeric: true },
            { key: "est", label: "Established", numeric: true },
            { key: "src", label: "Information sources", numeric: true },
            { key: "cases", label: "New cases", numeric: true },
          ],
          rows: [
            { registry: "Guadalajara (10 municipalities)", pop: 5268642, est: 2018, src: 69, cases: 6196 },
            { registry: "Tijuana", pop: 1922523, est: 2018, src: 24, cases: 1550 },
            { registry: "León", pop: 1721215, est: 2019, src: 14, cases: 1334 },
            { registry: "Hermosillo", pop: 936263, est: 2019, src: 111, cases: 1239 },
            { registry: "Toluca", pop: 910608, est: 2018, src: 101, cases: 922 },
            { registry: "Campeche", pop: 928363, est: 2018, src: 24, cases: 829 },
            { registry: "Acapulco", pop: 779566, est: 2018, src: 105, cases: 621 },
            { registry: "Monterrey", pop: 1142994, est: 2019, src: 27, cases: 416 },
            { registry: "Baja California Sur", pop: 798447, est: 2019, src: 6, cases: 410 },
          ],
          note: "Together 14,408,621 people. The Mérida registry trained the network's registrars but did not contribute data to it. The number of cases depends on how long each registry ran and how many sources it reached, not only on how common cancer is there.",
          sources: [{ label: "Mohar et al., Salud Publica Mex 2024, Table I", url: MOHAR }],
        },
      ],
    },
    {
      id: "paying",
      nav: "Who pays",
      title: "Who pays: social security for workers, free public care for everyone else",
      aside: { label: "Ley General de Salud, article 77 bis 1 (PDF)", url: LGS },
      cards: [
        {
          id: "three-systems",
          title: "Where a patient is treated depends on their job",
          plain:
            "People in formal employment and their families are treated by the social security institutes, IMSS for people in salaried jobs and ISSSTE for federal government workers. Everyone else has a legal right to free public care, medicines included, at the point of use, delivered by IMSS-Bienestar, a federal body created in 2022, in the states that have transferred their health services to it.",
          detail:
            "Article 77 bis 1 of the Ley General de Salud, in the text reformed in 2019 and 2023, says that everyone in the country without social security has the right to receive public health services, medicines and associated supplies free of charge at the moment they need them, without discrimination, guaranteed by the states and concurrently by the federation through the Sistema de Salud para el Bienestar, including outpatient and hospital care and the medicines of the Compendio Nacional de Insumos para la Salud. The decree of 31 August 2022, amended on 15 August 2025, created IMSS-Bienestar to give people without social security comprehensive free medical and hospital care with medicines, in the states that sign agreements transferring their services to it. The social security institutes are separate systems: article 12 of the Ley del Seguro Social makes anyone in paid, subordinate work subject to IMSS's compulsory scheme, and the ISSSTE law applies to workers of the federal government's departments and agencies. Which states have transferred their services, and what share of cancer patients each system treats, are not stated here.",
          links: [
            { label: "Ley General de Salud, articles 77 bis 1 and 77 bis 2 (PDF)", url: LGS },
            { label: "Decreto de creación de IMSS-Bienestar, text to 15 August 2025 (PDF)", url: DECRETO_IMSSB },
            { label: "Ley del Seguro Social, article 12 (Cámara de Diputados, PDF)", url: "https://www.diputados.gob.mx/LeyesBiblio/pdf/LSS.pdf" },
            { label: "Ley del ISSSTE, article 1 (Cámara de Diputados, PDF)", url: "https://www.diputados.gob.mx/LeyesBiblio/pdf/LISSSTE.pdf" },
          ],
        },
        {
          id: "high-cost-fund",
          title: "A national fund pays for high-cost treatment for people without social security",
          plain:
            "Expensive treatments for people without social security are paid from the Fondo de Salud para el Bienestar, a public trust of which IMSS-Bienestar is the settlor. The first of the three purposes the law gives it is the care of diseases whose treatments and medicines are high-cost, as defined by the General Health Council, and the fund's committee decides which treatments are covered.",
          detail:
            "Article 77 bis 29 of the Ley General de Salud makes the Fondo de Salud para el Bienestar a public trust in a development bank, with IMSS-Bienestar as settlor, whose resources go to three purposes: the care of diseases that involve high-cost treatments and associated medicines; infrastructure and equipment, preferably in the most marginalised states; and complementing the supply of medicines and access to clinical tests for people without social security. High cost means treatments and medicines defined by the Consejo de Salubridad General with explicit clinical and epidemiological criteria, selected for safety, efficacy, payment, effectiveness, professional ethics and social acceptability, because of their complexity or specialisation and how often they occur. The law's chapter on the fund was renamed by the reform of 29 November 2019, and the rules still refer to commitments made before 18 July 2023 under the subaccount for diseases causing catastrophic expenditure. The operating rules approved on 11 August 2023 leave new interventions, or wider criteria for existing ones, to the fund's technical committee, which must review the financial data at least every two years. The list of cancers and treatments the fund currently pays for could not be found in a primary source and is named under gaps.",
          links: [
            { label: "Ley General de Salud, article 77 bis 29 (PDF)", url: LGS },
            { label: "Reglas de Operación del Fondo de Salud para el Bienestar (Internet Archive copy of 13 January 2026, PDF)", url: FONSABI_RULES },
          ],
        },
        {
          id: "children-law",
          title: "A law of its own for children with cancer",
          plain:
            "Since January 2021 a federal law gives every child and adolescent under 18 with suspected or confirmed cancer the right to diagnosis and treatment, with all procedures authorised from the moment cancer is suspected. A health provider who presumes cancer must refer the child to an accredited unit within seven working days, and cover continues past 18 until treatment ends.",
          detail:
            "The Ley General para la Detección Oportuna del Cáncer en la Infancia y la Adolescencia, published in the Diario Oficial on 7 January 2021, covers people under 18 with a suspicion of cancer while it has not been ruled out, those with a confirmed diagnosis, and people over 18 still in treatment that began before they turned 18. Article 7 lists their rights, including integrated care from prevention to palliative care, health service benefits from confirmation of diagnosis to discharge even if the patient passes 18 during treatment, psychosocial support, special academic support so that school absences do not significantly affect their studies, and authorisation of all procedures, comprehensively and promptly, from presumption of cancer until the diagnosis is ruled out. Article 21 requires a provider at any level of care to refer the patient to the nearest accredited medical unit within no more than seven working days of presuming cancer. Article 28 provides for mobile units able to give outpatient cancer treatment in regions without an accredited unit close enough, and article 29 creates the children's section of the national cancer registry.",
          links: [{ label: "Ley General para la Detección Oportuna del Cáncer en la Infancia y la Adolescencia (Cámara de Diputados, PDF)", url: LGDOCIA }],
        },
      ],
    },
    {
      id: "assessment",
      nav: "Assessment",
      title: "How Mexico decides what the public system buys",
      aside: { label: "Normas de la Comisión del Compendio Nacional de Insumos para la Salud (DOF, 10 April 2024)", url: NORMAS_CNIS },
      cards: [
        {
          id: "compendio",
          title: "The national formulary: an economic evaluation is required, with exceptions written into the rules",
          plain:
            "Public institutions must keep to the national formulary, the Compendio Nacional de Insumos para la Salud, which the General Health Council keeps. A company asking to add a medicine must submit an economic evaluation and a budget-impact analysis, and the council's commission has sixty working days to decide. A medicine that fails the cost test can still be listed for one of six stated reasons.",
          detail:
            "Article 28 of the Ley General de Salud says the Consejo de Salubridad General draws up the Compendio, to which the public institutions of the national health system must keep, and article 29 that each institution draws its own list of essential medicines from it. The commission's rules, published in the Diario Oficial on 10 April 2024, require a request for inclusion to carry an economic evaluation prepared under the council's guide: a systematic review of the evidence against medicines already in the Compendio for the same indication, or against the standard of care in national or international clinical guidelines; a cost-minimisation, cost-effectiveness, cost-utility or cost-benefit analysis; a budget-impact analysis; and the model files so it can be reproduced. The technical secretariat has fifteen working days to check the file, and the commission sixty working days from acceptance to decide, extendable while extra information is awaited. Article 35 forbids a favourable decision for a medicine that does not meet the guide's criteria on costs and health effects, but allows one, with reasons, for an unmet need, institutional health programmes, the effect on how services are organised, a potential long-term benefit, a health emergency at the request of the council, or a request from a public institution or purchaser; in the first five cases the commission asks the applicant to gather more data first. No cost per quality-adjusted life year threshold is stated in the rules.",
          links: [
            { label: "Normas de Organización y Funcionamiento de la Comisión del Compendio (DOF, 10 April 2024)", url: NORMAS_CNIS },
            { label: "Ley General de Salud, articles 28 and 29 (PDF)", url: LGS },
            { label: "Consejo de Salubridad General: ¿Qué hacemos?", url: "https://www.gob.mx/csg/que-hacemos" },
          ],
        },
      ],
    },
    {
      id: "regulator",
      nav: "Regulator",
      title: "The regulator: COFEPRIS and its reliance route",
      aside: { label: "Acuerdo de la vía regulatoria abreviada (DOF, 18 July 2025)", url: DOF_RELIANCE },
      cards: [
        {
          id: "reliance-route",
          title: "Since August 2025, a 45-working-day limit for medicines already approved by a reference regulator",
          plain:
            "COFEPRIS, Mexico's medicines regulator, can register a medicine by relying on an approval already given by a reference regulator abroad: the founding and standing regulatory members of the International Council for Harmonisation (ICH), and the regulators on the World Health Organization's list. The rules give it 45 working days to decide. Fast-track approvals abroad do not qualify.",
          detail:
            "The Acuerdo published in the Diario Oficial on 18 July 2025 issued general guidelines for an abbreviated regulatory route, in force 30 working days after publication, that recognise as equivalent the requirements, tests and evaluation procedures of reference regulatory authorities and the WHO prequalification programme, and adopt the WHO's good reliance practices. Article 23 names the reference authorities for medicines: founding or standing regulatory members of the ICH, and WHO-Listed Authorities with the marketing authorisation function; for generics, WHO prequalification also counts. The route covers new molecules, generics, innovator biotechnology products, biosimilars, biologicals and vaccines. The product must be identical to the one the reference authority approved, the foreign approval must be no more than 5 years old, and article 20 excludes approvals other than an ordinary one: approvals that themselves relied on another regulator, recognition, accelerated approval, conditional approval, emergency authorisation and court-ordered approval. For innovator biologicals and vaccines the new-molecules committee gives its opinion within fifteen working days. COFEPRIS checks only that the file is complete, and article 37 gives it a maximum of 45 working days to resolve a medicine application. The guidelines replaced the separate equivalence agreements published from 5 October 2012 to 11 June 2025.",
          links: [
            { label: "Acuerdo por el que se emiten los Lineamientos generales para la aplicación de la vía regulatoria abreviada (DOF, 18 July 2025)", url: DOF_RELIANCE },
            { label: "Garrigues: nuevos criterios para el reconocimiento de equivalencia (13 August 2025)", url: "https://www.garrigues.com/es_ES/noticia/mexico-nuevos-criterios-reconocimiento-equivalencia-registros-sanitarios-medicamentos" },
          ],
        },
        {
          id: "cofepris-2025",
          title: "What COFEPRIS reported for 2025",
          plain:
            "In its end-of-year report COFEPRIS said it authorised 183 clinical trials and granted 312 marketing registrations for medicines in 2025, cut its procedures from 287 to 106, and was preparing to apply to be recognised as a WHO-Listed Authority. It did not publish how long approvals took.",
          detail:
            "COFEPRIS's release of 31 December 2025 reports that during 2025 COFEPRIS authorised 183 clinical trials and granted 312 registrations to allopathic, homeopathic, herbal, biotechnology, vitamin, enteral nutrition and vaccine products, with 127,018,047 vaccine doses authorised, and 2,450 registrations for medical devices; that eleven agreements in the Diario Oficial reduced its procedures from 287 to 106; and that reforms to the Ley General de Salud extended the term for renewing registrations from five to ten years and simplified ethics, research and biosafety committees to make research protocols easier to run. The then commissioner, Armida Zúñiga Estrada, said implementation of international standards had gone from 10% to 90% in a single semester, which would let COFEPRIS submit its letter of intent to be recognised as a WHO-Listed Authority. The release does not separate cancer medicines from the 312 registrations or the trials from other areas, and gives no median time to approval. The press reported in January 2026 that Víctor Hugo Borja Aburto took over as commissioner.",
          links: [
            { label: "COFEPRIS: end-of-year release (31 December 2025)", url: COFEPRIS_2025 },
            { label: "Expansión: Víctor Hugo Borja será el nuevo titular de Cofepris (2 January 2026)", url: "https://politica.expansion.mx/mexico/2026/01/02/victor-hugo-borja-sera-el-nuevo-titular-de-cofepris-tras-salida-de-armida-zuniga" },
          ],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening: breast and cervical programmes, and how many women they reach",
      aside: { label: "Auditoría Superior de la Federación: Prevención y Control del Cáncer de la Mujer, audit 35, Cuenta Pública 2022 (PDF)", url: ASF_2022 },
      cards: [
        {
          id: "breast-cervical-rules",
          title: "Mammography every two years from 40 to 69, and cervical screening from 25 to 64",
          plain:
            "Mexico's official standards recommend a screening mammogram every two years for women aged 40 to 69 and a yearly clinical breast examination from 25. The cervical standard tells health staff to offer screening to women aged 25 to 64. The federal audit office describes the practice in the health sector as a smear test every three years from 25 to 34 and an HPV test every five years from 35 to 64.",
          detail:
            "NOM-041-SSA2-2011, published in the Diario Oficial on 9 June 2011, recommends screening mammography for apparently healthy women aged 40 to 69 every two years, does not recommend it under 40, and from 70 limits it to follow-up of women with a previous breast cancer and medical indication; it recommends self-examination from 20 and a clinical breast examination by health staff every year from 25, and requires the staff who read mammograms to read at least 2,000 a year. The 2007 modification of NOM-014-SSA2-1994 tells first-contact health staff to offer cervical screening to every woman aged 25 to 64, with cytology as the method, visual inspection with acetic acid only where cytology is not available, molecular HPV tests as a complement, and a three-yearly interval after two consecutive negative yearly smears. The Auditoría Superior de la Federación's audit of the 2022 accounts describes the practice in the sector's institutions: cytology every three years for women aged 25 to 34, and a high-risk HPV test every five years for women aged 35 to 64.",
          links: [
            { label: "NOM-041-SSA2-2011, cáncer de mama (DOF, 9 June 2011)", url: NOM_041 },
            { label: "Modificación a la NOM-014-SSA2-1994, cáncer cérvico uterino (DOF, 31 May 2007)", url: NOM_014 },
            { label: "Auditoría Superior de la Federación, audit 35, Cuenta Pública 2022 (PDF)", url: ASF_2022 },
          ],
        },
        {
          id: "screening-coverage",
          title: "Coverage: one in ten eligible women screened by mammogram in two years in the health ministry's services",
          plain:
            "Among women aged 40 to 69 who rely on the health ministry's state services, 10.0% had a screening mammogram in 2021 and 2022 combined, against a target of 12.4%. Among women aged 35 to 64, 20.2% had an HPV test in the five years to 2022, against a target of 29.0%. The programme reports national mammography coverage of 24.4% in 2018.",
          detail:
            "The Auditoría Superior de la Federación's performance audit of the Centro Nacional de Equidad de Género y Salud Reproductiva for 2022 found that state health services performed 936,510 screening mammograms in 2021 and 2022 on women aged 40 to 69 who are the ministry's responsibility (431,028 in 2021, 505,482 in 2022), 10.0% of the 9,389,131 such women and 80.7% of the mammograms programmed; by state, coverage ranged from 24.2% in Quintana Roo to 1.1% in Puebla, and the centre attributed the shortfall to rescheduling and delays in maintaining or repairing mammography machines. Of the 2022 mammograms, 0.8% (4,180) were positive. From 2018 to 2022 the services performed 2,232,049 HPV tests on women aged 35 to 64, 20.2% of the eligible women, down from 59.5% in 2018, and no state met its target; the centre cited insufficient supplies, a change of test supplier, late hiring of laboratory staff and unsuitable sampling spaces. The audit also quotes the 2021 to 2024 cancer action programme: in 2018 mammography coverage in Mexico was 24.4%, clinical breast examination 26.7% and cervical screening by cytology and HPV test 46.4%, against the 70% coverage the programme says the WHO recommends for mammography screening to reduce mortality by 20% to 30% in women aged 50 and over, and the 70% the WHO proposes for cervical screening.",
          links: [{ label: "Auditoría Superior de la Federación: Prevención y Control del Cáncer de la Mujer, audit 35, Cuenta Pública 2022 (PDF)", url: ASF_2022 }],
        },
      ],
    },
    {
      id: "doing",
      nav: "What Mexico does",
      title: "What Mexico does that others do not",
      cards: [
        {
          id: "reliance-not-fast-track",
          title: "Relying on foreign approvals, but only on full ones",
          plain:
            "Many regulators now borrow other regulators' decisions. Mexico's 2025 rules do so with a stated limit: a medicine qualifies only if the foreign regulator gave it an ordinary approval. A cancer medicine approved abroad under an accelerated or conditional route cannot use the reliance route on the strength of that approval.",
          detail:
            "Article 20 of the guidelines published on 18 July 2025 says approvals by a reference authority that differ from an ordinary approval cannot support an application, and lists approvals obtained through reliance, recognition, accelerated approval, conditional approval, emergency authorisation, court order and any other scheme different from the ordinary route. Accelerated approval in the United States and conditional marketing authorisation in the European Union are routes of this kind, and some cancer medicines are first approved through them; that general point is OnCo's reading and is not taken from the guidelines. Under article 20 such an approval cannot support an application on the 45-working-day route. The guidelines do not say how a medicine approved that way abroad is then handled. Article 29 adds that the foreign approval must have been granted within the last five years, and article 30 requires the applicant to declare that the medicine carries no special warnings from other regulators and has not been withdrawn anywhere for safety or efficacy reasons.",
          links: [{ label: "Lineamientos de la vía regulatoria abreviada, articles 20, 29 and 30 (DOF, 18 July 2025)", url: DOF_RELIANCE }],
        },
        {
          id: "hpv-boys",
          title: "HPV vaccination extended to boys in 2025",
          plain:
            "In September 2025 Mexico's national HPV vaccination campaign included boys, which IMSS described as not done in the country before, alongside girls, in the fifth year of primary school, and children under 11 who are not in school. The health sector aimed to give 2.5 million doses, with IMSS alone aiming for 875,000.",
          detail:
            "IMSS press release 474/2025, issued in Tlaxcala on 18 September 2025, reports the national launch of the health sector's HPV vaccination campaign, led by the Secretario de Salud, David Kershenobich, with an IMSS target of 875,000 doses mainly for girls and boys in the fifth year of primary school and children under 11 who are not in school, and a sector target of 2.5 million doses. IMSS's director of medical benefits, Alva Alejandra Santos Carrillo, said in the release that including boys was something that had not been done in the country before. The release does not give a dosing schedule, and OnCo did not find a federal source for one.",
          links: [{ label: "IMSS: boletín de prensa 474/2025 (18 September 2025, PDF)", url: IMSS_VPH }],
        },
        {
          id: "children-first-registry",
          title: "Counting children's cancers first",
          plain:
            "In September 2025 the health minister presented a module of Mexico's cancer registry for children and adolescents, a section the 2021 childhood cancer law already required, and the press reported that the ministry was taking the registry up again with children's cancers first. Doctors who diagnose cancer in a child are legally obliged to enter the case.",
          detail:
            "Article 25 of the Ley General para la Detección Oportuna del Cáncer en la Infancia y la Adolescencia requires the doctor who diagnoses cancer in a minor to include the case in the database of the Registro Nacional de Cáncer en la Infancia y Adolescencia, and articles 29 and 30 make that registry a section of the national cancer registry, meant to follow diagnosis, treatment and outcome in real time. When the paediatric module was presented on 22 September 2025, the Secretario de Salud said it would give clear statistics on how cancer behaves in Mexico, and IMSS-Bienestar's director said that all health institutions would take part and that it would make it possible, for the first time, to know precisely how many children's cancers are diagnosed, how they are treated and what their outcomes are. The press report put the estimate of new childhood cancers at 3,000 to 5,000 a year. No data from the module had been published when this page was written.",
          links: [
            { label: "Ley General para la Detección Oportuna del Cáncer en la Infancia y la Adolescencia, articles 25 and 29 (PDF)", url: LGDOCIA },
            { label: "Expansión: Salud retoma el registro de cáncer; empezará con datos infantiles (24 September 2025)", url: EXPANSION_RNC },
          ],
        },
      ],
    },
    {
      id: "research",
      nav: "Research",
      title: "Research and trials",
      cards: [
        {
          id: "trials-in-mexico",
          title: "368 cancer trials in OnCo have a site in Mexico, most of them phase 3",
          plain:
            "Of the cancer trials OnCo holds, 368 list at least one site in Mexico on ClinicalTrials.gov, and 89 of those were recruiting when last read. Most of them (308) are phase 3 trials; three are led by Mexico's national cancer institute.",
          detail:
            "OnCo's trial records carry what ClinicalTrials.gov lists for each study. 368 of about 6,500 trial records name Mexico among their site countries: 308 phase 3, 18 phase 2/3, 28 phase 2, 13 phase 1/2 and 1 phase 1. By status at the last reading, 89 were recruiting, 179 active but not recruiting, 87 completed and 11 terminated. Non-small-cell lung cancer is the commonest cancer among them (84 trials), then prostate (36) and hormone receptor-positive breast cancer (27). Trials with Mexican sites include KEYNOTE-826 and CALLA in cervical cancer, ToGA and CheckMate 649 in stomach cancer, and the academic INTERLACE and LACC cervical cancer trials. Three are led by the Instituto Nacional de Cancerología, all in lung cancer: metformin with EGFR tablets, nabilone for appetite loss, and glutamine with a probiotic to prevent diarrhoea from EGFR tablets. Across all conditions, ClinicalTrials.gov lists 5,863 studies with Mexico in their site-country field (query of 4 November 2026), and COFEPRIS authorised 183 clinical trials of all kinds in 2025. OnCo's OpenAlex extract of 8 September 2026 (works whose primary topic is in the Oncology subfield, with at least one author in Mexico) counts 2,451 oncology papers from 2021 to 2025, 527 of them in 2025; OpenAlex reclassifies works over time, so its live count differs.",
          links: [
            { label: "ClinicalTrials.gov: cancer studies with a site in Mexico", url: "https://clinicaltrials.gov/search?cond=Cancer&locStr=Mexico&country=Mexico" },
            { label: "ClinicalTrials.gov API: studies with a site in Mexico", url: "https://clinicaltrials.gov/api/v2/studies?query.term=AREA%5BLocationCountry%5DMexico&countTotal=true&pageSize=1&fields=NCTId" },
            { label: "OpenAlex: oncology works with an author in Mexico", url: "https://openalex.org/works?filter=primary_topic.subfield.id:2730,authorships.countries:MX" },
            { label: "COFEPRIS: end-of-year release (31 December 2025)", url: COFEPRIS_2025 },
          ],
        },
        {
          id: "incan-research",
          title: "The Instituto Nacional de Cancerología: the registry network and its own trials",
          plain:
            "Mexico's national cancer institute in Mexico City coordinated the registry network and sponsors its own trials; the three it leads in OnCo's records are all in lung cancer.",
          detail:
            "The Instituto Nacional de Cancerología was designated to coordinate the national cancer registry network after the 2017 reform; its coordination centre had nine staff, three of them epidemiologists, and hired the network's 34 registrars, and its authors, including Óscar Arrieta, listed under the institute's Dirección General, published the network's results in Salud Pública de México in 2024. The three investigator-led trials OnCo holds from the institute test metformin added to EGFR tyrosine kinase inhibitors in EGFR-mutant lung cancer, nabilone for anorexia and quality of life in lung cancer, and glutamine plus Lactobacillus reuteri to prevent diarrhoea from EGFR inhibitors. OnCo also holds a 2015 study of BRCA1 and BRCA2 mutations in young Mexican women with triple-negative breast cancer.",
          links: [
            { label: "Mohar et al., Salud Publica Mex 2024 (registry network)", url: MOHAR },
            { label: "ClinicalTrials.gov: studies sponsored by the Instituto Nacional de Cancerología", url: "https://clinicaltrials.gov/search?spons=Instituto%20Nacional%20de%20Cancerologia" },
          ],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "no-incidence",
      title: "No national count of new cancers or of survival",
      plain:
        "OnCo found no national count of new cancers and no national survival figures published by Mexico. This page gives IARC's modelled estimate and the registry network's partial counts, and leaves survival out rather than borrow a figure from another country.",
      detail:
        "The Registro Nacional de Cáncer required by article 161 Bis of the Ley General de Salud since 2017 has published no national incidence figure that OnCo could find, and the registry network's report gives counts and proportions but no rates and no survival. Whether the registry's regulation, due within sixty days of the 2017 reform taking effect, was issued was not checked for this page. The Mérida registry's own published incidence was not read. INEGI publishes deaths by cause, but the per-site death counts for 2024 were not extracted for this page; only the rates by age group in INEGI's release are quoted.",
      links: [
        { label: "Mohar et al., Salud Publica Mex 2024", url: MOHAR },
        { label: "INEGI: Estadísticas de Defunciones Registradas", url: "https://www.inegi.org.mx/programas/edr/" },
      ],
    },
    {
      id: "fund-list",
      title: "Which cancers the high-cost fund pays for is not stated here",
      plain:
        "The Fondo de Salud para el Bienestar pays for high-cost treatment for people without social security, but OnCo could not find the current list of covered cancers and treatments in a primary source, so this page does not say which cancers are covered or what a patient might still pay.",
      detail:
        "The fund's operating rules leave the list of covered interventions to its technical committee, and the committee's decisions were not found published. The rules were first read from the Internet Archive's copy of 13 January 2026; on 4 November 2026 IMSS-Bienestar's own copy downloaded and was byte-identical to it. The normas were read from the Diario Oficial. Out-of-pocket spending on cancer care, the share of patients in each system, and which states have transferred their health services to IMSS-Bienestar were not researched for this page. The list of cancers covered under the former Seguro Popular catastrophic fund is not repeated here because it may no longer apply.",
      links: [{ label: "Reglas de Operación del Fondo de Salud para el Bienestar (Internet Archive copy)", url: FONSABI_RULES }],
    },
    {
      id: "approval-times",
      title: "No published approval times, and no oncology breakdown",
      plain:
        "COFEPRIS publishes legal deadlines, 45 working days for the reliance route, but OnCo found no published figure for how long cancer medicine approvals actually take, nor for how long the national formulary takes to list a medicine after registration.",
      detail:
        "COFEPRIS's 2025 report gives totals (312 medicine registrations, 183 trials) without a split by therapeutic area or a median time. The Compendio commission's sixty-working-day limit runs from acceptance of a request, and no published series of actual times from registration to listing, or from listing to purchase by IMSS, ISSSTE or IMSS-Bienestar, was found. The national cancer action programme 2021 to 2024 was read only as quoted in the Auditoría Superior de la Federación's audit, not from the programme itself, and the CSG's guide for economic evaluation was not read.",
      links: [{ label: "COFEPRIS: end-of-year release (31 December 2025)", url: COFEPRIS_2025 }, { label: "Normas de la Comisión del Compendio (DOF)", url: NORMAS_CNIS }],
    },
  ],
  institutions: ["incan-mexico", "imss-oncologia-siglo-xxi", "cofepris", "registro-nacional-cancer-mexico", "consejo-salubridad-general-mexico", "imss-bienestar", "iarc"],
  companies: ["delee"],
  drugs: [],
  trials: [
    "nct05445791", "nct02802540", "nct05852990", "keynote-826", "calla", "interlace", "lacc", "innovatv-301", "patricia", "toga", "checkmate-649", "keynote-859",
    "nct07216703", "nct06901531", "nct06790693", "nct05646862", "nct06841354", "nct06136650", "nct05939414", "nct06767514", "nct06750094", "nct05020236",
    "nct06717347", "nct06824467", "nct06989437",
  ],
  papers: ["paper-mohar-mexico-cancer-registry-network-spm-2024", "paper-villarreal-garza-mexican-tnbc-brca-bcrt-2015"],
  people: ["oscar-arrieta-rodriguez", "zoe-robledo", "victor-hugo-borja-aburto"],
  how:
    "Every card was written from Mexican sources read in Spanish, from the raw text of each PDF or page: INEGI's World Cancer Day release of January 2026, the Ley General de Salud and the childhood cancer law as consolidated by the Cámara de Diputados, the Diario Oficial texts of COFEPRIS's reliance guidelines, the Compendio commission's rules and the breast and cervical cancer standards, the decree creating IMSS-Bienestar, the Fondo de Salud para el Bienestar's rules (from an Internet Archive copy), the Auditoría Superior de la Federación's 2022 audit, COFEPRIS's and IMSS's press releases, and the Salud Pública de México paper on the registry network. The trial counts are from OnCo's own ClinicalTrials.gov records and OpenAlex's counts. New records for this page are the national cancer registry, the Consejo de Salubridad General, IMSS-Bienestar and the registry network paper.",
  verify:
    "Death figures are INEGI's registered deaths for 2024; incidence is IARC's model, not a Mexican count. Screening coverage figures are for women served by the health ministry's state services, not for IMSS or ISSSTE members. The reliance route's 45 working days is a legal maximum, not a measured time. Before relying on whether a medicine is covered, ask the treating institution: under the health law each public institution draws its own list of medicines from the Compendio.",
  verifyLinks: [
    { label: "INEGI: Estadísticas a propósito del Día Mundial contra el Cáncer 2026 (PDF)", url: INEGI_2026 },
    { label: "Ley General de Salud (Cámara de Diputados, PDF)", url: LGS },
    { label: "COFEPRIS", url: "https://www.gob.mx/cofepris" },
    { label: "Consejo de Salubridad General", url: "https://www.gob.mx/csg" },
  ],
};
