import type { EntityInput, InstitutionInput } from "@/lib/schema";

/**
 * Luxembourg: the public bodies behind /countries/lu/ (wave 13) that the corpus did not hold. Each was written from
 * primary sources read raw on 16 November 2026: the health ministry's portal pages on the Division de la pharmacie et
 * des médicaments and on marketing authorisation, the Chamber of Deputies' file on bill 8491, the Direction de la
 * santé's page for its screening coordination centre, the portal's pages for the two screening programmes and the
 * government's notice of 1 July 2024. The Registre National du Cancer, the Institut National du Cancer, the Centre
 * François Baclesse, the Centre Hospitalier de Luxembourg and the Caisse nationale de santé already exist and are
 * reused. Coordinates are approximate points for Strassen and Luxembourg City, not the buildings.
 */
const asOf = "2026-11-16";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });

const DPM = "https://santesecu.public.lu/fr/espace-professionnel/departement-sante/pharmacies-et-medicaments.html";
const AMM = "https://santesecu.public.lu/fr/espace-professionnel/departement-sante/pharmacies-et-medicaments/medicaments-humains/autorisation-mise-sur-le-marche.html";
const BILL_8491 = "https://www.chd.lu/fr/dossier/8491";
const SCREENING_CENTRE = "https://dirsante.gouvernement.lu/fr/la-direction/structure/centre-de-coordination-programmes-depistages-cancers.html";

const institutions: InstitutionInput[] = [
  i({ id: "dpm-luxembourg", name: "Division de la pharmacie et des médicaments (Luxembourg)", aka: ["DPM", "Division of Pharmacy and Medicines, Luxembourg", "Direction de la santé: Division de la pharmacie et des médicaments"],
    city: "Strassen", country: "LU", lat: 49.62, lng: 6.07, institutionType: "government", website: DPM,
    tldr: "Luxembourg's medicines regulator, a division of the Direction de la santé. It handles the files for national marketing authorisations, which the health minister grants on the advice of a committee of experts, and keeps the national medicines database.",
    summary: "The Division de la pharmacie et des médicaments is competent for the practice of pharmacy and for medicines in general: their manufacture, control, marketing, advertising, distribution, import and export, and also for medical devices, cosmetics and drug precursors. The health portal says that in Luxembourg the health minister grants marketing authorisations on the opinion of a national committee of experts, and that the division is responsible for the regulatory validation of the files and for registration in the national medicines database; the legally valid list of authorised medicines is published monthly in the Mémorial. The same page says the centralised European procedure, through the European Medicines Agency, is obligatory for innovative products such as anticancer medicines. Bill 8491, which creates a public body called the Agence luxembourgeoise des médicaments et produits de santé (ALMPS), was adopted by the Chamber of Deputies by 60 votes to 0 on 29 October 2026; OnCo has not read the published law or a date on which the agency takes over.",
    programs: ["National marketing authorisations (file validation)", "National medicines database", "Pharmacovigilance", "Medical devices and cosmetics oversight"],
    institutions: ["ema", "cns-luxembourg"],
    links: [
      { label: "Health portal: Division de la pharmacie et des médicaments (in French)", url: DPM },
      { label: "Health portal: marketing authorisation of medicines (in French)", url: AMM },
      { label: "Chamber of Deputies: bill 8491 creating the Agence luxembourgeoise des médicaments et produits de santé (in French)", url: BILL_8491 },
    ] }),

  i({ id: "centre-coordination-depistages-cancers-luxembourg", name: "Centre de coordination des programmes de dépistages organisés des cancers (Luxembourg)", aka: ["Coordination centre for organised cancer screening programmes, Luxembourg", "Programme Mammographie", "PDOCCR"],
    city: "Luxembourg", country: "LU", lat: 49.61, lng: 6.13, institutionType: "government", website: SCREENING_CENTRE,
    tldr: "The unit of Luxembourg's Direction de la santé that runs the country's two organised cancer screening programmes, for breast and bowel cancer. It manages the programmes day to day, answers the public and does the second reading of the programme's mammograms.",
    summary: "The centre's page says its missions are to set up, structure, manage and evaluate organised cancer screening in Luxembourg, and that two organised programmes exist: the Programme Mammographie for breast cancer and the Programme de Dépistage Organisé du Cancer ColoRectal (PDOCCR). Its listed tasks include the daily management of the programmes, answering the public by call centre and e-mail, the second readings of the mammograms of the Programme Mammographie, managing the approvals of the professionals and centres involved, and producing statistics on the programmes' activity and effectiveness. The health portal describes the programmes: a free mammogram every two years for women aged 45 to 74, and a home faecal immunochemical test for everyone aged 45 to 74, for people insured with the Caisse nationale de santé. The government's notice of 1 July 2024 extended both to those ages, from 50 to 70 for breast screening and 55 to 74 for colorectal screening. The Registre National du Cancer notes that screening data, such as invitations and participation, are held by the Direction de la santé.",
    programs: ["Programme Mammographie (breast screening, ages 45 to 74)", "Programme de Dépistage Organisé du Cancer ColoRectal (ages 45 to 74)", "Second reading of screening mammograms", "Approval of screening centres and professionals"],
    institutions: ["cns-luxembourg", "registre-national-du-cancer-luxembourg"],
    cancers: ["breast-cancer", "colorectal"],
    links: [
      { label: "Direction de la santé: coordination centre for organised cancer screening (in French)", url: SCREENING_CENTRE },
      { label: "Health portal: Programme Mammographie (in French)", url: "https://santesecu.public.lu/fr/espace-citoyen/departement-sante/maladies/cancer-sein-depistage.html" },
      { label: "Health portal: colorectal cancer screening programme (in French)", url: "https://santesecu.public.lu/fr/espace-citoyen/departement-sante/maladies/cancer-colon-depistage.html" },
      { label: "Government notice of 1 July 2024: screening extended to ages 45 to 74 (in French)", url: "https://gouvernement.lu/fr/actualites/toutes_actualites/communiques/2024/07-juillet/01-deprez-depistage-cancer.html" },
    ] }),
];

/** Records behind /countries/lu/ (wave 13). */
export const recordsLU: EntityInput[] = [...institutions];
