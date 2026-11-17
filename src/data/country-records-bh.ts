import type { EntityInput, InstitutionInput } from "@/lib/schema";

/**
 * Bahrain: the bodies behind /countries/bh/ (wave 13) that the corpus did not hold. Written from sources read raw on
 * 16 November 2026: the Ministry of Health's report "Cancer Incidence & Mortality in the Kingdom of Bahrain, 2014"
 * (PDF text, copy on a WHO server), WHO's Cancer Country Profile 2020 for Bahrain (PDF text, copy on the ICCP portal),
 * and the Supreme Council of Health's own pages on the health insurance programme, the Shifa fund, treatment abroad and
 * unified procurement, with the National Health Regulatory Authority's overview page. Coordinates are an approximate
 * city point for Manama; the Council's street address was not read, so its point is the capital, not its office.
 */
const asOf = "2026-11-16";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });

const MOH_2014 = "https://extranet.who.int/fctcapps/sites/default/files/2024-02/318_CANCER%20-%20incidence%20and%20mortality.pdf";
const WHO_PROFILE = "https://www.iccp-portal.org/sites/default/files/plans/BHR_2020.pdf";
const SCH_SEHATI = "https://www.sch.org.bh/en/projects/the-national-health-insurance-program-sahti.html";
const SCH_SHIFA = "https://www.sch.org.bh/en/projects/health-insurance-fund-shifa.html";
const SCH_ABROAD = "https://www.sch.org.bh/en/committees/overseas-treatment.html";
const SCH_PROCUREMENT = "https://www.sch.org.bh/en/committees/the-national-committee-for-unified-procurement-of-medicines-and-medical-supplies.html";
const NHRA_OVERVIEW = "https://www.nhra.bh/About/Overview/";

const institutions: InstitutionInput[] = [
  i({ id: "bahrain-cancer-registry", name: "Bahrain Cancer Registry", aka: ["National Cancer Registry, Bahrain"],
    city: "Manama", country: "BH", lat: 26.22, lng: 50.58, institutionType: "government",
    tldr: "Bahrain's national cancer registry, kept by the Ministry of Health. Doctors have been obliged to report every cancer to it since 1994, and the Ministry says its data meet international standards from 1998.",
    summary: "The Ministry of Health's 2014 report says Ministerial Decree 5/1994 made cancer notification mandatory, with all physicians obliged to report cases to the Bahrain Cancer Registry at the Ministry's Medical Review Office, and that comprehensive and reliable data complying with international standards became available in 1998. The report describes it as a national population-based registry covering all residents; its published tables are for Bahraini nationals. As the report describes it, registrars visit Salmaniya Medical Complex four times a week and other tertiary hospitals monthly, hospitals, clinics and laboratories notify cases, and an annual list of cancer deaths is matched against registered cases; data are coded with ICD-O-3 in CanReg4. It registered 8,013 cancers among Bahrainis from 1998 to 2014, and 746 in 2014. WHO's 2020 profile rated it a high quality population-based cancer registry for 2019. The 2014 report is the latest full report OnCo could read; where the registry sits within the Ministry today was not confirmed.",
    programs: ["Mandatory cancer notification (Ministerial Decree 5/1994)", "Cancer incidence and mortality report (latest read: 2014)", "Data to the Gulf Center for Cancer Registration"],
    institutions: ["bahrain-ministry-of-health", "salmaniya-medical-complex", "iarc"], related: ["cancer-registries-surveillance"],
    links: [{ label: "Ministry of Health: Cancer Incidence & Mortality in the Kingdom of Bahrain, 2014 (PDF, copy on a WHO server)", url: MOH_2014 }, { label: "WHO: Cancer Country Profile 2020, Bahrain (PDF, copy on the ICCP portal)", url: WHO_PROFILE }] }),

  i({ id: "supreme-council-of-health-bahrain", name: "Supreme Council of Health, Bahrain", aka: ["SCH", "المجلس الأعلى للصحة"],
    city: "Manama", country: "BH", lat: 26.22, lng: 50.58, institutionType: "government", website: "https://www.sch.org.bh/en/",
    tldr: "The government council whose pages set out Bahrain's national health insurance programme, Sehati, and which the health regulator names as its supreme authority. Its committees handle referrals of citizens for treatment abroad and joint purchasing of medicines for government health bodies.",
    summary: "The Supreme Council of Health's pages describe the national health insurance programme created by Law No. 23 of 2018: a Health Insurance Fund (Shifa) that registers participants, collects subscriptions and pays providers, a mandatory package for citizens funded by the state at government facilities, cover for foreign residents through a mandatory package, and an optional package that its own answers say is not yet available. Its Supreme Committee for Treatment Abroad, which its page says implements the procedures for sending citizens abroad, studies cases referred for care outside Bahrain and runs a visiting specialist programme, and its National Committee for Unified Procurement of Medicines and Medical Supplies approves purchases for government health bodies, keeps a list of essential national medicines and takes part in the Gulf unified procurement programme. The National Health Regulatory Authority names the Council as its supreme authority. The Council's pages describe much of the insurance programme in the future tense; OnCo could not confirm how much is in force.",
    programs: ["National Health Insurance Program (Sehati)", "Health Insurance Fund (Shifa)", "Treatment abroad committee", "National Committee for Unified Procurement of Medicines and Medical Supplies"],
    institutions: ["bahrain-ministry-of-health", "nhra-bahrain"],
    links: [{ label: "Supreme Council of Health: the National Health Insurance Program (Sehati)", url: SCH_SEHATI }, { label: "Supreme Council of Health: Health Insurance Fund (Shifa)", url: SCH_SHIFA }, { label: "Supreme Council of Health: treatment abroad committee", url: SCH_ABROAD }, { label: "Supreme Council of Health: unified procurement committee", url: SCH_PROCUREMENT }, { label: "NHRA: overview", url: NHRA_OVERVIEW }] }),
];

/** Records behind /countries/bh/ (wave 13). */
export const recordsBH: EntityInput[] = [...institutions];
