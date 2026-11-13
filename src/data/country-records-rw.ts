import type { EntityInput, InstitutionInput } from "@/lib/schema";

/**
 * Rwanda: the public bodies behind /countries/rw/ (wave 12) that the corpus did not hold. Each was written from its own
 * primary source, read raw on 11 November 2026: the National Cancer Control Plan 2025 to 2029 published by the Rwanda
 * Biomedical Centre (PDF text), the Ministry of Health's page on the inauguration of the Rwanda Cancer Centre, the Rwanda
 * Social Security Board's page on community-based health insurance and WHO's 5 December 2024 news item on maturity level
 * 3. Butaro Cancer Center of Excellence already exists (institutions/world.ts) and is reused, not duplicated.
 * Coordinates are approximate city or district points, not building positions.
 */
const asOf = "2026-11-11";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });

const NCCP_2025 = "https://www.rbc.gov.rw/fileadmin/user_upload/strategy/National_Cancer_Control_Plan__NCCP__2025-2029__3_-Signed.pdf";
const MOH_RCC = "https://www.moh.gov.rw/news-detail/president-kagame-inaugurates-rwanda-cancer-centre";
const RSSB_CBHI = "https://rssb.rw/schemes/cbhi-scheme";
const WHO_ML3 = "https://www.who.int/news/item/05-12-2024-senegal-and-rwanda-achieve-who-maturity-level-3-in-medicines-regulation";

const institutions: InstitutionInput[] = [
  i({ id: "rwanda-biomedical-centre", name: "Rwanda Biomedical Centre (RBC)", aka: ["RBC", "Rwanda Biomedical Center"],
    city: "Kigali", country: "RW", lat: -1.95, lng: 30.06, institutionType: "government", website: "https://www.rbc.gov.rw",
    tldr: "The Ministry of Health's implementing agency in Rwanda. It developed the National Cancer Control Plan 2025 to 2029 with the Ministry of Health and publishes it, and the national cancer registry's figures appear in that plan.",
    summary: "The Rwanda Biomedical Centre carries out Rwanda's public health programmes for the Ministry of Health. Its Non-Communicable Diseases Division published the country's first National Cancer Control Plan, for 2020 to 2024, in February 2020; the plan for 2025 to 2029, developed by the Ministry of Health with RBC, was published in March 2025. The second plan reports the Rwanda National Cancer Registry's counts (25,754 cancers from 2019 to 2024, about 5,000 a year), cervical screening of 464,690 women from 2020 to 2024, HPV vaccination since 2011, a workforce of 17 oncologists, and one radiotherapy centre with two machines, and is costed at RWF 396 billion (USD 283 million) over five years, 47% of it for cancer medicines.",
    programs: ["National Cancer Control Plan 2025 to 2029", "National Cancer Control Plan 2020 to 2024", "Rwanda National Cancer Registry (as reported in the national plan)", "Cervical cancer screen-and-treat with HPV testing", "HPV vaccination (since 2011)"],
    institutions: ["rwanda-cancer-centre", "butaro-cancer-center", "rwanda-fda", "rssb-rwanda", "who", "iarc"],
    cancers: ["cervical", "breast-cancer", "prostate"],
    links: [
      { label: "National Cancer Control Plan 2025 to 2029 (RBC, PDF)", url: NCCP_2025 },
      { label: "National Cancer Control Plan 2020 to 2024 (ICCP portal, PDF)", url: "https://www.iccp-portal.org/system/files/plans/Rwanda%20NCCP%20Final_Signed.pdf" },
    ] }),

  i({ id: "rwanda-fda", name: "Rwanda Food and Drugs Authority (Rwanda FDA)", aka: ["Rwanda FDA", "RFDA"],
    city: "Kigali", country: "RW", lat: -1.95, lng: 30.06, institutionType: "government", website: "https://rwandafda.gov.rw",
    tldr: "Rwanda's medicines regulator. WHO announced in December 2024 that it had reached maturity level 3, a stable and well-functioning regulatory system.",
    summary: "The Rwanda Food and Drugs Authority regulates medicines and other health products in Rwanda. WHO announced on 5 December 2024 that it and Senegal's regulator had become the seventh and eighth in Africa to reach maturity level 3 in WHO's global benchmarking of national regulatory authorities, after an assessment finalised in October 2024; WHO quoted its Assistant Director-General for Access to Medicines saying Rwanda was the second country in the East African region to reach the level, after Tanzania in 2018. The National Cancer Control Plan 2025 to 2029 plans a streamlined regulatory framework for approving and conducting cancer clinical trials.",
    programs: ["Marketing authorisation of medicines", "Clinical trial authorisation"],
    institutions: ["rwanda-biomedical-centre", "who"],
    links: [
      { label: "WHO: Senegal and Rwanda achieve WHO maturity level 3 in medicines regulation (5 December 2024)", url: WHO_ML3 },
      { label: "Rwanda FDA", url: "https://rwandafda.gov.rw/" },
    ] }),

  i({ id: "rssb-rwanda", name: "Rwanda Social Security Board (RSSB)", aka: ["RSSB", "Mutuelle de Santé", "Community-Based Health Insurance Rwanda", "CBHI Rwanda"],
    city: "Kigali", country: "RW", lat: -1.95, lng: 30.06, institutionType: "government", website: "https://rssb.rw",
    tldr: "Rwanda's social security body. It runs community-based health insurance, Mutuelle de Santé, which it says covers 89.06% of Rwandans, with premiums set by household income and paid in full by the government for those with no income.",
    summary: "The Rwanda Social Security Board runs community-based health insurance (Mutuelle de Santé) as well as pensions, occupational hazard and maternity schemes. Its scheme page sets annual premiums by income category, from 4,000 Rwandan francs a person, paid in full by the government for people with no income, to 20,000 francs for incomes above 120,000 francs a month, and reports 11 million beneficiaries and 89.06% population coverage. The National Cancer Control Plan 2025 to 2029 says the scheme covered 90% of diagnostics and surgery but previously excluded cancer drugs, and that it would cover systemic cancer drugs from July 2025.",
    programs: ["Community-based health insurance (Mutuelle de Santé)", "Medical insurance for formal-sector employees", "Pensions"],
    institutions: ["rwanda-biomedical-centre"],
    links: [
      { label: "RSSB: CBHI scheme (Mutuelle de Santé)", url: RSSB_CBHI },
      { label: "National Cancer Control Plan 2025 to 2029, section 2.2.2.4 (PDF)", url: NCCP_2025 },
    ] }),

  i({ id: "rwanda-cancer-centre", name: "Rwanda Cancer Centre, Rwanda Military Hospital", aka: ["Rwanda Cancer Centre", "Rwanda Cancer Center", "RCC", "Rwanda Military Referral and Teaching Hospital", "RMRTH", "Rwanda Military Hospital Kanombe"],
    city: "Kigali", country: "RW", lat: -1.97, lng: 30.17, institutionType: "cancer-center",
    tldr: "Rwanda's radiotherapy centre, at Rwanda Military Hospital in Kanombe, Kigali. It began treating patients in March 2019 with two linear accelerators, and the national cancer plan of 2025 calls it the country's sole radiotherapy provider.",
    summary: "The Ministry of Health's page on its inauguration says the idea for a radiotherapy centre called the Rwanda Cancer Centre was established in 2016 at Rwanda Military Hospital in Kanombe, which already had cancer services; that it was built by the French company UNTEC with funding from the Government of Rwanda, the Global Fund and the CDC; that it became operational in March 2019 and was officially launched on 4 February 2020; and that its radiotherapy unit has two linear accelerators using volumetric modulated arc therapy. Before it, the Ministry says, patients were sent abroad for radiotherapy at a cost of about USD 1 million in transfers. The National Cancer Control Plan 2025 to 2029 names it as one of Rwanda's three main cancer treatment facilities and the sole radiotherapy provider, says brachytherapy was expected by June 2025, and records the country's oncology workforce as concentrated at the hospital.",
    programs: ["Radiotherapy (two linear accelerators)", "Chemotherapy", "Cancer pathology"],
    institutions: ["rwanda-biomedical-centre", "butaro-cancer-center"],
    cancers: ["cervical", "breast-cancer", "prostate"],
    links: [
      { label: "Ministry of Health: President Kagame inaugurates Rwanda Cancer Centre", url: MOH_RCC },
      { label: "National Cancer Control Plan 2025 to 2029, sections 2.2.1 and 2.2.2.4 (PDF)", url: NCCP_2025 },
    ] }),
];

/** Records behind /countries/rw/ (wave 12). */
export const recordsRW: EntityInput[] = [...institutions];
