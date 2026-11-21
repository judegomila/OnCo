import type { EntityInput, InstitutionInput } from "@/lib/schema";

/**
 * Iceland: the public bodies behind /countries/is/ (wave 13) that the corpus did not hold. Each was written from
 * sources read raw on 16 November 2026: the Icelandic Cancer Society's page on its Research Centre and Cancer Registry;
 * the Directorate of Health's page on the cancer screening register and its quality reports on breast and cervical
 * screening for 2025 (PDF text, in Icelandic); the pages of the Coordination Centre for Cancer Screening on island.is;
 * and the OECD and European Commission Country Cancer Profile for Iceland 2025 (PDF text). Landspítali, the Icelandic
 * Cancer Registry, the Icelandic Medicines Agency, Iceland Health and the University of Iceland already exist and are
 * linked, not duplicated. Coordinates are approximate city points for Reykjavík and Akureyri, not building positions.
 */
const asOf = "2026-11-16";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });

const CCP_2025 = "https://cancer-inequalities.jrc.ec.europa.eu/sites/default/files/docs/ccp2025/ec-oecd-is-2024-1671-en.pdf";
const REGISTRY = "https://www.krabb.is/rannsoknir/rannsokna-og-skraningarsetur";
const SCREEN_REGISTER = "https://island.is/skimun-fyrir-krabbameini-toelur";
const SCREEN_REPORTS = "https://island.is/skimun-krabbamein/arsskyrslur";
const SCREEN_BREAST_2025 = "https://assets.ctfassets.net/8k0h54kbe6bj/4iPWfQLPxwlWkWv9AyzoLa/dbe0885b820ffd11331c127f099492d8/d6af4238-68b0-4b11-90cd-b823e2003411.pdf";
const SCREEN_CERVIX_2025 = "https://assets.ctfassets.net/8k0h54kbe6bj/2t2MxVyUTgMxaWzBiMVasm/930eb91cf6d42168ecd5f35f57698d33/da4eff1e-efbd-404a-a5ce-f30376a2d78e.pdf";
const SKS = "https://island.is/s/hh/samhaefingarstod-krabbameinsskimana";
const SKS_BREAST = "https://island.is/s/hh/samhaefingarstod-krabbameinsskimana/brjostaskimun";
const SKS_BOWEL = "https://island.is/s/hh/samhaefingarstod-krabbameinsskimana/ristilskimun";

const institutions: InstitutionInput[] = [
  i({ id: "krabbameinsfelag-islands", name: "Krabbameinsfélag Íslands", aka: ["Icelandic Cancer Society", "Krabbameinsfélagið", "Iceland Cancer Society"],
    city: "Reykjavík", country: "IS", lat: 64.14, lng: -21.9, institutionType: "consortium", website: "https://www.krabb.is",
    tldr: "Iceland's cancer charity. It founded the national Cancer Registry in 1954 and still runs it for the Directorate of Health, and it gives free advice and support to people with cancer and their families.",
    summary: "The Icelandic Cancer Society (Krabbameinsfélag Íslands), at Skógarhlíð 8 in Reykjavík, founded the Icelandic Cancer Registry with the Directorate of Health in 1954. Since the registry gained a legal basis in 2007 the Society has run, hosted and maintained it under a contract with the Directorate, sharing the running costs with the Ministry of Health. The Society's screening clinic (Leitarstöð) ran Iceland's cancer screening from the start of organised cervical screening in 1964 until it closed at the end of 2020, when screening and the screening register passed to the public sector. The OECD and European Commission's Country Cancer Profile 2025 describes the Society as a nationwide non-profit umbrella organisation, says it employs nurses, psychologists and social workers who give advice and support free of charge in Icelandic, English and Polish, and says it started the first palliative home care team in Reykjavík in 1987.",
    programs: ["Icelandic Cancer Registry (operator)", "Free counselling and support", "Cancer statistics and forecasts"],
    institutions: ["icelandic-cancer-registry", "embaetti-landlaeknis", "landspitali"],
    links: [
      { label: "Icelandic Cancer Society: Research Centre and Cancer Registry (in Icelandic)", url: REGISTRY },
      { label: "Directorate of Health: the cancer screening register (in Icelandic)", url: SCREEN_REGISTER },
      { label: "Country Cancer Profile Iceland 2025, sections 2 and 5.4 (PDF)", url: CCP_2025 },
    ] }),

  i({ id: "embaetti-landlaeknis", name: "Embætti landlæknis", aka: ["Directorate of Health (Iceland)", "Directorate of Health", "Landlæknir"],
    city: "Reykjavík", country: "IS", lat: 64.14, lng: -21.9, institutionType: "government", website: "https://island.is/s/landlaeknir",
    tldr: "Iceland's Directorate of Health. It sets the guidelines for cancer screening, keeps the screening register, publishes a quality report on screening each year, and is the legal keeper of the Cancer Registry.",
    summary: "The Directorate of Health (Embætti landlæknis), at Katrínartún 2 in Reykjavík, is responsible for Iceland's cancer screening register, which it took over when the Icelandic Cancer Society's screening clinic closed at the end of 2020. The register holds data on cervical and breast screening from 1985 and is used to follow attendance, compare countries and audit quality. The Directorate issues the screening guidelines, defines quality indicators and publishes yearly quality reports; its reports for 2025, published in June 2026, give participation of about 65% in breast screening and about 70% in cervical screening. The Icelandic Cancer Registry is by law one of the Directorate's health registers and is run for it by the Icelandic Cancer Society. The Country Cancer Profile 2025 says the Directorate also monitors waiting times by hospital and publishes them.",
    programs: ["Cancer screening register", "Screening guidelines and yearly quality reports", "Health registers, including the Cancer Registry"],
    institutions: ["icelandic-cancer-registry", "krabbameinsfelag-islands", "samhaefingarstod-krabbameinsskimana"],
    links: [
      { label: "Directorate of Health: the cancer screening register (in Icelandic)", url: SCREEN_REGISTER },
      { label: "Directorate of Health: annual quality reports on cancer screening (in Icelandic)", url: SCREEN_REPORTS },
      { label: "Directorate of Health: cervical screening quality report 2025 (PDF, in Icelandic)", url: SCREEN_CERVIX_2025 },
      { label: "Country Cancer Profile Iceland 2025, section 5.1 (PDF)", url: CCP_2025 },
    ] }),

  i({ id: "samhaefingarstod-krabbameinsskimana", name: "Samhæfingarstöð krabbameinsskimana", aka: ["Coordination Centre for Cancer Screening (Iceland)", "Coordination Centre for Cancer Screening", "SKS"],
    city: "Reykjavík", country: "IS", lat: 64.14, lng: -21.9, institutionType: "government", website: SKS,
    tldr: "The centre that organises cancer screening in Iceland. It sends the invitations and results for breast, cervical and bowel screening and answers questions about them.",
    summary: "The Coordination Centre for Cancer Screening (Samhæfingarstöð krabbameinsskimana, SKS) is part of Heilsugæsla höfuðborgarsvæðisins, the capital area's primary care service. Its page says it plans and coordinates cancer screening nationally in line with the Directorate of Health's guidelines, sends invitation and result letters, and advises professionals and the public. Cervical screening is done at health centres, breast screening at Landspítali's Breast Centre, at Akureyri Hospital and by a mobile unit, and the centre is introducing bowel screening with a home stool test, starting with people aged 60 to 69 and reaching everyone aged 50 to 74 before 2031. People can decline invitations by contacting the centre. It takes part in the European Union's EUCanScreen project.",
    programs: ["Breast screening invitations (ages 40 to 74)", "Cervical screening (ages 23 to 64)", "Bowel screening by home test (being introduced)"],
    institutions: ["embaetti-landlaeknis", "landspitali", "sjukrahusid-a-akureyri"],
    cancers: ["breast-cancer", "cervical"],
    links: [
      { label: "Coordination Centre for Cancer Screening (in Icelandic)", url: SKS },
      { label: "Coordination Centre for Cancer Screening: bowel screening (in Icelandic)", url: SKS_BOWEL },
      { label: "Directorate of Health: cervical screening quality report 2025 (PDF, in Icelandic)", url: SCREEN_CERVIX_2025 },
    ] }),

  i({ id: "sjukrahusid-a-akureyri", name: "Sjúkrahúsið á Akureyri", aka: ["Akureyri Hospital", "SAk"],
    city: "Akureyri", country: "IS", lat: 65.68, lng: -18.1, institutionType: "hospital",
    tldr: "The hospital in Akureyri, in the north of Iceland. It does breast screening for the north, gives chemotherapy and palliative care, and takes part in the national quality register for cancer.",
    summary: "Akureyri Hospital (Sjúkrahúsið á Akureyri) does breast screening for the north of Iceland; the other places where screening mammograms are taken are Landspítali's Breast Centre in Reykjavík and a mobile unit that tours the regions. The Coordination Centre for Cancer Screening gives the hospital's address as Eyrarlandsvegur. The OECD and European Commission's Country Cancer Profile 2025 lists it among the regional hospitals that provide outpatient and inpatient chemotherapy and minor procedures while radiotherapy and most specialised surgery are at Landspítali, and among the places where palliative care is available. The Icelandic Cancer Society says the Cancer Registry's quality registration is done with Landspítali and Akureyri Hospital. OnCo has not read the hospital's own pages.",
    programs: ["Breast screening for the north of Iceland", "Chemotherapy", "Palliative care"],
    institutions: ["landspitali", "samhaefingarstod-krabbameinsskimana", "icelandic-cancer-registry"],
    links: [
      { label: "Coordination Centre for Cancer Screening: breast screening (in Icelandic)", url: SKS_BREAST },
      { label: "Directorate of Health: breast screening quality report 2025 (PDF, in Icelandic)", url: SCREEN_BREAST_2025 },
      { label: "Country Cancer Profile Iceland 2025, sections 5.1 and 5.4 (PDF)", url: CCP_2025 },
      { label: "Icelandic Cancer Society: Research Centre and Cancer Registry (in Icelandic)", url: REGISTRY },
    ] }),
];

/** Records behind /countries/is/ (wave 13). */
export const recordsIS: EntityInput[] = [...institutions];
