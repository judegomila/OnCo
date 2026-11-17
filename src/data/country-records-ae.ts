import type { EntityInput, InstitutionInput } from "@/lib/schema";

/**
 * United Arab Emirates: the bodies behind /countries/ae/ (wave 13) that the corpus did not hold, written from pages
 * read raw on 16 November 2026: the Thiqa programme's own pages (thiqa.ae), Daman's Abu Dhabi Basic plan page, two
 * Abu Dhabi Media Office notices, the Dubai Health Authority's ISAHD insurance pages and its BASMAH guideline, and the
 * UAE National Cancer Registry's annual report for 2019 (Internet Archive copy). The sites of the Department of Health
 * Abu Dhabi and the Dubai Health Authority themselves could not be read, so each summary says only what those other
 * pages state. Coordinates are approximate city points for Abu Dhabi and Dubai.
 */
const asOf = "2026-11-16";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });

const NCR_2019 = "https://web.archive.org/web/20240411162544/https://mohap.gov.ae/assets/download/bc820447/CANCER%20INCIDENCE%20IN%20UNITED%20ARAB%20EMIRATES%20ANNUAL%20REPORT%20OF%20THE%20UAE%20-%202019.pdf.aspx";
const ADMO_PRECISION = "https://www.mediaoffice.abudhabi/en/health/department-of-health-abu-dhabi-personalised-precision-medicine-programme-provides-tailored-care-to-250-cancer-patients/";
const ADMO_IFHAS = "https://www.mediaoffice.abudhabi/en/health/abu-dhabi-public-health-centre-expands-comprehensive-screening-programme-ifhas-to-advance-community-health-and-preventive-care/";
const DAMAN_BASIC = "https://www.damaninsurance.ae/products/abu-dhabi-government-health-plans/";
const THIQA_ABOUT = "https://www.thiqa.ae/about-thiqa-programme/";
const THIQA_ELIGIBILITY = "https://www.thiqa.ae/eligibility/";
const THIQA_IFHAS = "https://www.thiqa.ae/about-ifhas/";
const IFHAS_PACKAGES = "https://www.thiqa.ae/wp-content/uploads/2023/11/IFHAS-packages-Arabic-English.pdf";
const ISAHD_ABOUT = "https://www.isahd.ae/Home/About";
const ISAHD_FAQ = "https://www.isahd.ae/Home/FAQ";
const BASMAH = "https://www.isahd.ae/content/docs/PD%20PSP%20Program_Basmah%20Guidelines_24-11-2020.pdf";

const institutions: InstitutionInput[] = [
  i({ id: "department-of-health-abu-dhabi", name: "Department of Health Abu Dhabi (DoH)", aka: ["DoH Abu Dhabi", "DOH", "Department of Health - Abu Dhabi"],
    city: "Abu Dhabi", country: "AE", lat: 24.454, lng: 54.377, institutionType: "government", website: "https://www.doh.gov.ae/en",
    tldr: "The health department of the Emirate of Abu Dhabi. It issues the regulations that the emirate's Basic health insurance plan follows, keeps Abu Dhabi's cancer registry and runs a precision medicine programme for cancer patients.",
    summary: "The UAE National Cancer Registry's 2019 report names the Department of Health's central cancer registry as the registry covering all cancer data in Abu Dhabi and as a source of the national registry, and says Abu Dhabi's mortality data came from the department. Daman describes its Abu Dhabi Basic health plan as compliant with Department of Health regulations, updated from 1 July 2024. The Abu Dhabi Media Office reported on 11 December 2024 that the department's Personalised Precision Medicine Programme for Oncology, launched in October 2022 with Cleveland Clinic Abu Dhabi and G42 Healthcare, had given tailored treatment plans to 256 Emirati cancer patients, screened eligible patients for 47 genes and written prevention plans for 207 family members. OnCo could not read the department's own site on 16 November 2026.",
    programs: ["Central cancer registry for Abu Dhabi", "Personalised Precision Medicine Programme for Oncology (since October 2022)", "Health insurance regulation in the Emirate of Abu Dhabi"],
    institutions: ["cleveland-clinic-abu-dhabi", "abu-dhabi-public-health-centre", "thiqa-programme-abu-dhabi"],
    links: [
      { label: "Abu Dhabi Media Office: Personalised Precision Medicine Programme (11 December 2024)", url: ADMO_PRECISION },
      { label: "UAE National Cancer Registry: annual report 2019 (PDF, Internet Archive copy of 11 April 2024)", url: NCR_2019 },
      { label: "Daman: Abu Dhabi Basic health insurance plan", url: DAMAN_BASIC },
    ], related: ["dubai-health-authority"] }),

  i({ id: "abu-dhabi-public-health-centre", name: "Abu Dhabi Public Health Centre (ADPHC)", aka: ["ADPHC", "IFHAS screening programme"],
    city: "Abu Dhabi", country: "AE", lat: 24.454, lng: 54.377, institutionType: "government",
    tldr: "A public health centre of the Emirate of Abu Dhabi. It runs IFHAS, a periodic health check for holders of the Thiqa card aged 18 and over that includes screening for breast, cervical, bowel and lung cancer.",
    summary: "The Abu Dhabi Media Office reported on 1 August 2025 that the centre had expanded its comprehensive screening programme, IFHAS, adding clinical breast examinations for women aged 20 to 39, non-invasive colorectal cancer tests, memory testing from age 50 and reproductive health screening, and that eligible Thiqa cardholders aged 18 and above can book through the Sahatna app or approved providers. Thiqa's site describes IFHAS as an integrated screening programme for Thiqa card holders aged 18 and above in the Emirate of Abu Dhabi, and its package sheet lists a cervical Pap smear every 3 to 5 years, mammography for women aged 40 and over, colonoscopy every 10 years, a yearly FIT, and low-dose CT for heavy smokers aged 55 to 75. No uptake figures were found.",
    programs: ["IFHAS comprehensive periodic screening programme"],
    institutions: ["department-of-health-abu-dhabi", "thiqa-programme-abu-dhabi"],
    links: [
      { label: "Abu Dhabi Media Office: IFHAS screening programme expanded (1 August 2025)", url: ADMO_IFHAS },
      { label: "Thiqa: about the IFHAS programme", url: THIQA_IFHAS },
      { label: "Thiqa: IFHAS screening packages by age group (PDF, Arabic and English)", url: IFHAS_PACKAGES },
    ] }),

  i({ id: "thiqa-programme-abu-dhabi", name: "Thiqa programme (Abu Dhabi)", aka: ["Thiqa", "ثقة", "Thiqa health programme"],
    city: "Abu Dhabi", country: "AE", lat: 24.454, lng: 54.377, institutionType: "government", website: "https://www.thiqa.ae/",
    tldr: "The Government of Abu Dhabi's health programme for UAE nationals in the emirate, managed by the insurer Daman since 2008. A national from Abu Dhabi is covered in public and private hospitals with no annual limit.",
    summary: "Thiqa's site describes a comprehensive healthcare programme offered by the Government of Abu Dhabi to UAE nationals and those of similar status in the emirate, managed by Daman since 2008, with more than one million members. Its eligibility page gives a UAE national or person of similar status from Abu Dhabi full medical cover in the public and private Thiqa network, emergency treatment in the UAE and worldwide, and no annual benefit limit per member; nationals from other emirates who do not live in Abu Dhabi are covered in the public Thiqa network; non-nationals sponsored by a UAE national family member are covered in the public network. Listed benefits include inpatient care, pharmaceuticals, and MRI, CT and PET scans when prescribed by a specialist. Thiqa card holders aged 18 and above are the group the IFHAS screening programme serves. The pages do not list cancer medicines or say how a new medicine comes to be covered.",
    programs: ["Health cover for UAE nationals in the Emirate of Abu Dhabi", "IFHAS screening for Thiqa card holders"],
    institutions: ["department-of-health-abu-dhabi", "abu-dhabi-public-health-centre"],
    links: [
      { label: "Thiqa: about the programme", url: THIQA_ABOUT },
      { label: "Thiqa: eligibility", url: THIQA_ELIGIBILITY },
      { label: "Thiqa: about the IFHAS programme", url: THIQA_IFHAS },
    ] }),

  i({ id: "dubai-health-authority", name: "Dubai Health Authority (DHA)", aka: ["DHA", "Dubai Health Insurance Corporation", "DHIC", "ISAHD"],
    city: "Dubai", country: "AE", lat: 25.2, lng: 55.27, institutionType: "government", website: "https://www.dha.gov.ae/en",
    tldr: "The health authority of the Emirate of Dubai. It runs Dubai's compulsory health insurance system and BASMAH, a programme for screening and treatment of breast, bowel and cervical cancer whose mandatory cover, in its 2020 guideline, is for one group of insured residents.",
    summary: "The authority's ISAHD site describes the Insurance System for Advancing Healthcare in Dubai as its initiative to provide insurance cover for everyone in Dubai. Its questions page says cover is mandatory under Dubai Health Insurance Law No. 11 of 2013, that employers must bear the full cost of premiums, and that the Essential Benefits Plan is the minimum level of cover. The Dubai Health Insurance Corporation, under the authority, issued the Cancer Patient Support Program (BASMAH) guideline on 24 November 2020: it covers screening and treatment of cervical, breast and colorectal cancer for insured members holding a Dubai residence visa, and says the mandate to cover cancer applies only to the members it calls LSB, which it does not spell out: for them there is no sublimit or copayment up to the policy's annual limit and treatment beyond that limit is paid from a fund, while other members can use the designated centres of excellence at subsidised rates. The UAE National Cancer Registry's 2019 report names the authority's central cancer registry as one of its sources. The authority's main site needs JavaScript and was not read.",
    programs: ["ISAHD compulsory health insurance system", "Cancer Patient Support Program (BASMAH)", "Central cancer registry for Dubai"],
    links: [
      { label: "Dubai Health Authority (ISAHD): about", url: ISAHD_ABOUT },
      { label: "Dubai Health Authority (ISAHD): frequently asked questions on health insurance", url: ISAHD_FAQ },
      { label: "Dubai Health Insurance Corporation: BASMAH guideline, 24 November 2020 (PDF)", url: BASMAH },
    ] }),
];

/** Records behind /countries/ae/ (wave 13). */
export const recordsAE: EntityInput[] = [...institutions];
