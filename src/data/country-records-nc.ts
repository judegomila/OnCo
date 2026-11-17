import type { EntityInput, InstitutionInput, PaperInput } from "@/lib/schema";

/**
 * New Caledonia: the public body and papers behind /countries/nc/ (wave 16) that the corpus did not hold. Written from
 * sources read raw, in French, on 16 November 2026: the Agence sanitaire et sociale de la Nouvelle-Calédonie's site
 * (santepourtous.nc) and its pages on cervical and breast cancer screening, and two government press notes on HPV
 * vaccination (21 July 2022 and 30 August 2023, PDF text). DOIs were resolved through Europe PMC and the figures in
 * `findings` are taken from the indexed abstracts.
 *
 * The existing records for the DASS, the CAFAT, the territorial hospital, the radiotherapy centre and ONCO NC
 * (institutions/countries-2026-11-europe-overseas.ts) are reused on the page, not duplicated. The agency's coordinates
 * are an approximate city point for Nouméa, not its address, which OnCo did not read.
 */
const asOf = "2026-11-16";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });
type P = Omit<PaperInput, "kind" | "asOf">;
const p = (x: P): PaperInput => ({ kind: "paper", asOf, ...x });
const doi = (id: string, label: string) => ({ label, url: `https://doi.org/${id}` });
const pubmed = (pmid: string) => ({ label: "PubMed", url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` });

const ASS = "https://www.santepourtous.nc/";
const ASS_CERVIX = "https://www.santepourtous.nc/les-thematiques/cancer-du-col-de-l-uterus/presentation";
const ASS_CERVIX_WHO = "https://www.santepourtous.nc/les-thematiques/cancer-du-col-de-l-uterus/depistage-organise-part/les-personnes-concernees";
const ASS_BREAST = "https://www.santepourtous.nc/les-thematiques/cancer-du-sein/depistage-du-cancer-du-sein";
const GOUV_HPV_2023 = "https://gouv.nc/sites/default/files/atoms/files/2023.08.30_cp_vaccination_hpv.pdf";

const institutions: InstitutionInput[] = [
  i({ id: "ass-new-caledonia", name: "Agence sanitaire et sociale de la Nouvelle-Calédonie", aka: ["ASS-NC", "ASSNC", "Health and Social Agency of New Caledonia"],
    city: "Nouméa", country: "NC", lat: -22.27, lng: 166.45, institutionType: "government", website: ASS,
    tldr: "New Caledonia's public health agency. It runs the organised screening programmes for breast and cervical cancer, sends the invitations, and carries out the HPV vaccination campaign in secondary schools.",
    summary: "The Agence sanitaire et sociale de la Nouvelle-Calédonie describes itself as a public establishment with a public service mission for the health of all Caledonians. It invites women aged 50 to 74 to a free mammogram every two years, and women aged 25 to 65 to free cervical screening, a smear every three years from 25 to 30 and an HPV test every five years from 30 to 65; the invitation serves as the prescription, and organised cervical screening is financed by the Fonds Autonome de Compensation en Santé Publique whatever the woman's social cover. Its site says cervical cancer is the fifth most frequent cancer in women in New Caledonia, with a standardised incidence 1.9 times that of mainland France.\n\nThe government's press note of 30 August 2023 says it has offered free HPV vaccination to girls in schools since 2015 in partnership with the agency, the education authority and private schools, and opened it to boys that year; the agency's site announces the 2026 campaign as the tenth. The agency is listed among the contributors to the cancer registry kept by the DASS. OnCo found no participation or coverage rates on its pages.",
    programs: ["Organised breast cancer screening (women 50 to 74)", "Organised cervical cancer screening (women 25 to 65)", "School HPV vaccination campaign"],
    institutions: ["dass-new-caledonia", "cafat-new-caledonia"],
    cancers: ["breast-cancer", "cervical"],
    links: [
      { label: "Agence sanitaire et sociale de la Nouvelle-Calédonie (in French)", url: ASS },
      { label: "ASS-NC: cervical cancer in New Caledonia (in French)", url: ASS_CERVIX },
      { label: "ASS-NC: who organised cervical screening is for (in French)", url: ASS_CERVIX_WHO },
      { label: "ASS-NC: breast cancer screening (in French)", url: ASS_BREAST },
      { label: "Gouvernement de la Nouvelle-Calédonie: HPV vaccination open to boys in secondary schools (30 August 2023, PDF, in French)", url: GOUV_HPV_2023 },
    ] }),
];

const papers: PaperInput[] = [
  p({ id: "paper-truong-thyroid-cancer-new-caledonia-eur-j-cancer-prev-2007", name: "Thyroid cancer in New Caledonia, 1985 to 1999: time trends and geographic variation",
    journal: "European Journal of Cancer Prevention", year: 2007, doi: "10.1097/01.cej.0000236244.32995.e1", pmid: "17220706", authors: "Truong T, Rougier Y, Dubourdieu D, Guihenneuc-Jouyaux C, Orsi L, Hémon D, Guénel P.", paperType: "observational",
    tldr: "Reviewing all 498 thyroid cancers diagnosed in New Caledonia in 1985 to 1999, the authors found an incidence about ten times that of most developed countries, with the sharp rise over the period partly explained by better detection of small tumours.",
    summary: "Published as \"Time trends and geographic variations for thyroid cancer in New Caledonia, a very high incidence area (1985-1999)\". Pathology reports for all 498 cases were reviewed to determine the histological type and the size of the cancerous nodules, and incidence was described by histology and by sociodemographic group.",
    findings: [
      "The authors describe thyroid cancer incidence in New Caledonia as the highest reported in the world and about 10-fold higher than in most developed countries.",
      "Among Melanesian women, incidence in 1995 to 1999 was twice as high in the Loyalty Islands as in the rest of the country.",
      "The sharp increase in 1985 to 1999 was partly related to enhanced detection of small carcinomas.",
    ],
    whatItMeans: "Part of the very high thyroid cancer rate reflected finding more small tumours, but the authors conclude that the high incidence and its ethnic and geographic differences point to environmental or lifestyle factors still to be identified.",
    caveats: ["Diagnoses from 1985 to 1999; the abstract gives rates only for Melanesian women (71.4 per 100,000) and men (10.4 per 100,000).", "The comparison with other countries dates from the time of the study."],
    institutions: [], cancers: ["thyroid"],
    links: [doi("10.1097/01.cej.0000236244.32995.e1", "Eur J Cancer Prev 2007"), pubmed("17220706")] }),

  p({ id: "paper-baumann-mesothelioma-new-caledonia-ehp-2011", name: "Pleural mesothelioma in New Caledonia and serpentinite on roads",
    journal: "Environmental Health Perspectives", year: 2011, doi: "10.1289/ehp.1002862", pmid: "21193386", authors: "Baumann F, Maurizot P, Mangeas M, Ambrosi JP, Douwes J, Robineau B.", paperType: "observational",
    tldr: "Analysing the 109 mesotheliomas recorded by New Caledonia's cancer registry from 1984 to 2008, the authors found that serpentinite, a natural rock, used on roads was the strongest environmental risk factor.",
    summary: "Published as \"Pleural mesothelioma in New Caledonia: associations with environmental risk factors\". The authors studied the 109 malignant mesothelioma cases recorded in the Cancer Registry of New Caledonia between 1984 and 2008 with spatial, temporal and space-time cluster analyses, and an ecological analysis of 100 tribes.",
    findings: [
      "The highest incidence was in the Houaïlou area, with a world age-standardised rate of 128.7 per 100,000 person-years.",
      "A significant spatial cluster grouped 18 tribes (31 observed cases against 8 expected); no significant temporal cluster was found.",
      "Serpentinite on roads was the greatest environmental risk factor (multivariate incidence rate ratio 13.0, 95% CI 10.2 to 16.6).",
      "The use of whitewash, previously suggested as a risk factor, was not associated with incidence.",
    ],
    whatItMeans: "In New Caledonia mesothelioma is linked to a rock found naturally in the environment, and the authors identify serpentinite on roads as the main risk factor.",
    caveats: ["An ecological study: it compares areas, not individuals.", "Cases from 1984 to 2008."],
    institutions: ["dass-new-caledonia"], cancers: ["mesothelioma"],
    links: [doi("10.1289/ehp.1002862", "Environ Health Perspect 2011"), pubmed("21193386")] }),

  p({ id: "paper-hartmann-childhood-cancer-new-caledonia-jpho-2018", name: "Cancer incidence among children in New Caledonia, 1994 to 2012",
    journal: "Journal of Pediatric Hematology/Oncology", year: 2018, doi: "10.1097/mph.0000000000001255", pmid: "30044351", authors: "Hartmann E, Missotte I, Dalla-Pozza L.", paperType: "observational",
    tldr: "Over 1994 to 2012, 162 cancers were registered in children under 15 in New Caledonia, an incidence of 142.2 per million children a year, not different from the estimate for France.",
    summary: "Published as \"Cancer Incidence Among Children in New Caledonia, 1994 to 2012\". All incident cancers diagnosed between 1994 and 2012 in children aged 0 to 14 resident in New Caledonia for more than six months were included, and incidence was compared with France and by district and ethnicity.",
    findings: [
      "162 registered cases; age-standardised incidence for all cancers 142.2 per million children a year (range 104.9 to 193.3), against 156.6 estimated for France.",
      "Incidence was higher in the Loyalty Islands district for several types of tumour, but did not differ by ethnicity.",
    ],
    whatItMeans: "Childhood cancer is about as frequent in New Caledonia as in France; the authors say the numbers are too small to draw a conclusion from the difference between districts.",
    caveats: ["Small numbers: 162 cases over 19 years."],
    institutions: [], cancers: [],
    links: [doi("10.1097/mph.0000000000001255", "J Pediatr Hematol Oncol 2018"), pubmed("30044351")] }),
];

export const recordsNC: EntityInput[] = [...institutions, ...papers];
