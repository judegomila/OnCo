import type { EntityInput, InstitutionInput } from "@/lib/schema";

/**
 * Turkmenistan: the two public bodies behind /countries/tm/ (wave 15) that the corpus did not hold. Both were written
 * from the Ministry of Health and Medical Industry's own site (saglykhm.gov.tm, English pages), read raw on
 * 16 November 2026, and from the ministry's 2016 to 2018 cancer strategy (Russian, PDF text on the ICCP portal).
 * The five oncology centres already in the corpus (src/data/institutions/countries-2026-11-asia-pacific.ts) are
 * linked, not duplicated.
 *
 * Inbound links: the two records link each other. Coordinates are an approximate Ashgabat city point for both, not
 * building positions.
 */
const asOf = "2026-11-16";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });

const MOH = "https://www.saglykhm.gov.tm/en";
const MOH_TASKS = "https://www.saglykhm.gov.tm/en/tasks-and-functions-of-the-ministry";
const MOH_CENTRAL = "https://www.saglykhm.gov.tm/en/merkezi-bejeris-onuni-alys-edaralary";
const MOH_PROGRAMMES = "https://www.saglykhm.gov.tm/en/dowlet-maksatnamalary-we-strategiyalary";
const MOH_PHARMA = "https://www.saglykhm.gov.tm/en/derman-senagaty-we-derman-upjunciligi-edaralary";
const MOH_REG_CENTRE = "https://www.saglykhm.gov.tm/en/derman-senagaty-we-derman-upjunciligi-edaralary/derman-serisdelerini-hasaba-alys-we-olaryn-hiline-dowlet-gozegciligi-merkezi";
const STRATEGY_2016 = "https://www.iccp-portal.org/sites/default/files/plans/TKM_B5_Onkologi%C3%BDa2.pdf";

const institutions: InstitutionInput[] = [
  i({ id: "tm-ministry-of-health-and-medical-industry", name: "Ministry of Health and Medical Industry of Turkmenistan",
    aka: ["Türkmenistanyň Saglygy goraýyş we derman senagaty ministrligi", "Министерство здравоохранения и медицинской промышленности Туркменистана"],
    city: "Ashgabat", country: "TM", lat: 37.95, lng: 58.38, institutionType: "government", website: MOH,
    tldr: "Turkmenistan's health ministry, which is responsible for public health services and lists the national oncology centre in Ashgabat among its institutions. It is also the medicines regulator: its regulations say it registers medicines and medical devices and authorises clinical trials.",
    summary: "The ministry's regulations, as posted on its own site and read on 16 November 2026, describe it as the central executive authority for public health protection and drug provision. Among its listed functions are the state registration of medicines and medical devices, authorising clinical trials of medicines, control over the supply of safe, high-quality and effective medicines, centralised purchasing of medicines for the population and for health institutions, licensing, and the development of the system of state voluntary medical insurance. Its list of central institutions includes the Scientific-Clinical Center of Oncology at 22 Archabil avenue, Ashgabat. The coordinates on this record are an approximate Ashgabat city point.\n\nIts strategy for the prevention, early detection and treatment of malignant neoplasms for 2016 to 2018, a Russian-language document posted on the ICCP portal, set out screening for breast and cervical cancer in primary care, referral to regional oncology hospitals and the national centre, palliative care and the creation of a cancer registry, and named the ministry and donors as its sources of funding. The ministry's list of state programmes read on 16 November 2026 names a non-communicable disease strategy for 2021 to 2025 and no later cancer strategy; OnCo found no report on what the 2016 strategy achieved.",
    programs: ["State registration of medicines and medical devices", "Authorisation of clinical trials of medicines", "Strategy for prevention, early detection and treatment of malignant neoplasms 2016 to 2018", "State voluntary medical insurance"],
    institutions: ["tm-centre-registration-medicines-quality-control", "tm-oncology-centre-ashgabat", "tm-dashoguz-regional-oncology-centre", "who", "iaea"],
    links: [
      { label: "Ministry of Health and Medical Industry: tasks and functions of the ministry", url: MOH_TASKS },
      { label: "Ministry of Health and Medical Industry: central treatment and prophylactic institutions", url: MOH_CENTRAL },
      { label: "Ministry of Health and Medical Industry: state programmes and strategies", url: MOH_PROGRAMMES },
      { label: "Strategy for prevention, early detection and treatment of malignant neoplasms 2016 to 2018 (Russian, PDF, ICCP portal)", url: STRATEGY_2016 },
    ] }),

  i({ id: "tm-centre-registration-medicines-quality-control", name: "Center for Registration of Medical Products and State Quality Control (Turkmenistan)",
    aka: ["Derman serişdelerini hasaba alyş we olaryň hiline döwlet gözegçiligi merkezi", "Center for registration of medical products and state quality control"],
    city: "Ashgabat", country: "TM", lat: 37.95, lng: 58.38, institutionType: "government", website: "https://centreg.gov.tm",
    tldr: "The centre under Turkmenistan's health ministry whose name gives its work: registering medicines and the state control of their quality. OnCo could read its address, its contact details and its application forms, and nothing on fees, timelines or which medicines are registered.",
    summary: "The Ministry of Health and Medical Industry lists the centre among its medical industry and pharmaceutical supply institutions and gives its address as 40/1 Hoja Ahmet Yasavy street, Ashgabat, with its site at centreg.gov.tm; the page was read on 16 November 2026. The centre's own site, in the one-line page description it returns, names it in Turkmen as the centre attached to the ministry (\"ministrliginiň ýanyndaky\"), and loads the rest of its content by script from its own data feed. That feed, read on 17 November 2026, carries application forms addressed to the centre for the state registration or re-registration of medicines and of products for medical purposes; OnCo read nothing on fees, on how long registration takes, or on which cancer medicines are registered. The ministry's regulations assign the state registration of medicines and medical devices to the ministry itself. WHO's August 2026 list of regulators operating at maturity level 3 or 4 does not include Turkmenistan. The coordinates on this record are an approximate Ashgabat city point.",
    programs: ["Registration of medicines", "State quality control of medicines"],
    institutions: ["tm-ministry-of-health-and-medical-industry"],
    links: [
      { label: "Ministry of Health and Medical Industry: Center for registration of medical products and state quality control", url: MOH_REG_CENTRE },
      { label: "Ministry of Health and Medical Industry: medical industry and pharmaceutical supply institutions", url: MOH_PHARMA },
      { label: "WHO: list of regulatory authorities operating at maturity level 3 and 4 (PDF, August 2026)", url: "https://cdn.who.int/media/docs/default-source/medicines/regulatory-systems/wla/list-of-nras-operating-at-ml3-and-ml4.pdf" },
    ] }),
];

/** Records behind /countries/tm/ (wave 15). */
export const recordsTM: EntityInput[] = [...institutions];
