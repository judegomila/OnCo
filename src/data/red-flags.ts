/**
 * Red-flag "when to call" cards, keyed by drug id and/or by a regular expression over `drug.modality`.
 *
 * Each flag names the symptom, the threshold as the source phrases it, the action tier and the source.
 * Sources are boxed warnings and Warnings and Precautions in the US prescribing information (DailyMed
 * or accessdata.fda.gov), the ASCO immune-related adverse events guideline, the ASTCT consensus grading
 * for CRS and ICANS, and NICE CG151 for the fever rule. Nothing here is a number without a source.
 *
 * `general` applies to everyone on systemic anticancer treatment and is always shown first.
 *
 * Verifying a source URL before you cite it. A status code is not proof either way. A CMS that has
 * lost a file answers a `.pdf` request with an HTML "page not found" page, sometimes with a 200 and
 * sometimes with a 404 (the retired UKONS triage URL, `ukons.org/site/assets/files/1134/...`, serves
 * a 43 KB HTML page with a 404). So check the content type and the size, not the status:
 *     curl -sL -o /dev/null -w '%{http_code} %{content_type} %{size_download}\n' <url>
 * A PDF citation must report `application/pdf` and a plausible size; anything answering `text/html`
 * is a soft 404 however healthy the status looks. `scripts/check-links.ts` applies the same rule to
 * every URL here (exported as `redFlagSourceUrls`): a `.pdf` URL that answers with HTML is recorded
 * as broken, so the weekly link check catches the next move on its own.
 */
export type RedFlagAction = "call-today" | "call-now" | "emergency";

export type RedFlag = {
  symptom: string;
  threshold: string;
  action: RedFlagAction;
  source: { label: string; url: string };
  /**
   * Care protocols (records of kind `protocol`) that manage what this line warns of, so the protocol's page can show
   * the line and a red card reaches the protocol. Only where the protocol's own population covers this treatment:
   * a blistering rash is not linked to the skin-care protocol, which puts severe reactions outside its scope.
   */
  protocols?: string[];
};

export type RedFlagSet = {
  id: string;
  /** Class name shown on the card, e.g. "Immune checkpoint inhibitors". */
  label: string;
  /** Exact product ids this set applies to. */
  drugIds?: string[];
  /** Regular expression source tested (case-insensitive) against `drug.modality`. */
  modalityRe?: string;
  /** Cancer ids this set applies to whatever the treatment: emergencies of the disease itself (a blocked bile duct, a stent). */
  cancerIds?: string[];
  /** Entity ids the cards of a cancer-scoped set link to (a technology such as biliary stenting, or the care protocol that manages the emergency); the cancer itself when empty. */
  concernIds?: string[];
  /** When the risk is highest, if the label states a window. */
  window?: string;
  flags: RedFlag[];
};

export const ACTION_LABEL: Record<RedFlagAction, string> = {
  "call-today": "Call the team today",
  "call-now": "Call the 24-hour line now",
  emergency: "Emergency services now",
};

const label = (query: string) => ({ label: `US prescribing information (DailyMed: ${query})`, url: `https://dailymed.nlm.nih.gov/dailymed/search.cfm?labeltype=all&query=${encodeURIComponent(query)}` });
const NICE_CG151 = { label: "NICE CG151: neutropenic sepsis", url: "https://www.nice.org.uk/guidance/cg151" };
// Verified 25 September 2026: application/pdf, 652,152 bytes. Linked from
// https://ukons.org/resources/publicly-available-resources; the old /site/assets/files/1134/ path 404s.
const UKONS = { label: "UKONS Oncology/Haemato-oncology 24-hour triage toolkit (version 3)", url: "https://tempus-fujit.files.svdcdn.com/production/images/ukons_triage_toolkit_v3_final.pdf" };
const ASCO_IRAE = { label: "ASCO guideline on immune-related adverse events (2021)", url: "https://ascopubs.org/doi/10.1200/JCO.21.01440" };
const ASTCT = { label: "ASTCT consensus grading for CRS and ICANS (2019)", url: "https://doi.org/10.1016/j.bbmt.2018.12.758" };
const AVASTIN = { label: "Avastin (bevacizumab) US prescribing information", url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2022/125085s340lbl.pdf" };
const NHS_SEPSIS = { label: "NHS: sepsis", url: "https://www.nhs.uk/conditions/sepsis/" };
const NHS_VOMITING_BLOOD = { label: "NHS: vomiting blood", url: "https://www.nhs.uk/symptoms/vomiting-blood/" };
const NHS_JAUNDICE = { label: "NHS: jaundice", url: "https://www.nhs.uk/conditions/jaundice/" };
const NHS_GB_SYMPTOMS = { label: "NHS: gallbladder cancer, symptoms", url: "https://www.nhs.uk/conditions/gallbladder-cancer/symptoms/" };
const CRUK_STENTS = { label: "Cancer Research UK: biliary stents", url: "https://www.cancerresearchuk.org/about-cancer/bile-duct-cancer/treatment/stents" };
const MAC_PAIN = { label: "Macmillan: pain", url: "https://www.macmillan.org.uk/cancer-information-and-support/impacts-of-cancer/pain" };
const MAC_SEPSIS = { label: "Macmillan: sepsis", url: "https://www.macmillan.org.uk/cancer-information-and-support/impacts-of-cancer/sepsis" };
const MAC_PEMBRO = { label: "Macmillan: pembrolizumab", url: "https://www.macmillan.org.uk/cancer-information-and-support/treatments-and-drugs/pembrolizumab" };
const BCN_PEMBRO = { label: "Breast Cancer Now: pembrolizumab (Keytruda)", url: "https://breastcancernow.org/about-breast-cancer/treatment/targeted-therapy/pembrolizumab-keytruda" };
const POWELL_ILD = { label: "Powell et al., pooled analysis of interstitial lung disease in nine trastuzumab deruxtecan studies (ESMO Open 2022)", url: "https://doi.org/10.1016/j.esmoop.2022.100554" };
const NHS_PC_SYMPTOMS = { label: "NHS: pancreatic cancer, symptoms", url: "https://www.nhs.uk/conditions/pancreatic-cancer/symptoms/" };
const NHS_DV = { label: "NHS: diarrhoea and vomiting", url: "https://www.nhs.uk/symptoms/diarrhoea-and-vomiting/" };
const NHS_DVT = { label: "NHS: DVT (deep vein thrombosis)", url: "https://www.nhs.uk/conditions/deep-vein-thrombosis-dvt/" };
const MAC_FOLFIRINOX = { label: "Macmillan: FOLFIRINOX", url: "https://www.macmillan.org.uk/cancer-information-and-support/treatments-and-drugs/folfirinox" };
const PCUK_STENT_BILE = { label: "Pancreatic Cancer UK: stent for a blocked bile duct", url: "https://www.pancreaticcancer.org.uk/information-and-support/treatments-for-pancreatic-cancer/stent-for-a-blocked-bile-duct/" };
const PCUK_STENT_DUODENUM = { label: "Pancreatic Cancer UK: stents for a blocked duodenum", url: "https://www.pancreaticcancer.org.uk/information-and-support/treatments-for-pancreatic-cancer/stents-for-a-blocked-duodenum/" };
const PCUK_CLOTS = { label: "Pancreatic Cancer UK: blood clots in a vein and pancreatic cancer", url: "https://www.pancreaticcancer.org.uk/information-and-support/managing-symptoms-and-side-effects/blood-clots-in-a-vein-dvt-and-pancreatic-cancer/" };

const NHS_BOWEL_SYMPTOMS = { label: "NHS: bowel cancer, symptoms", url: "https://www.nhs.uk/conditions/bowel-cancer/symptoms/" };
const NHS_COLOSTOMY_COMPLICATIONS = { label: "NHS: complications of a colostomy", url: "https://www.nhs.uk/tests-and-treatments/colostomy/complications-of-a-colostomy/" };
const NG151 = { label: "NICE NG151: colorectal cancer, recommendations", url: "https://www.nice.org.uk/guidance/ng151/chapter/Recommendations" };
const MAC_IRINOTECAN = { label: "Macmillan: irinotecan", url: "https://www.macmillan.org.uk/cancer-information-and-support/treatments-and-drugs/irinotecan" };
const MAC_OXALIPLATIN = { label: "Macmillan: oxaliplatin", url: "https://www.macmillan.org.uk/cancer-information-and-support/treatments-and-drugs/oxaliplatin" };
const MAC_CETUXIMAB = { label: "Macmillan: cetuximab (Erbitux)", url: "https://www.macmillan.org.uk/cancer-information-and-support/treatments-and-drugs/cetuximab" };
const MAC_FOLFOX = { label: "Macmillan: FOLFOX", url: "https://www.macmillan.org.uk/cancer-information-and-support/treatments-and-drugs/folfox" };
const BCUK_STOMA = { label: "Bowel Cancer UK: stomas", url: "https://www.bowelcanceruk.org.uk/about-bowel-cancer/treatment/surgery/stomas/" };

const NHS_LUNG_SYMPTOMS = { label: "NHS: symptoms of lung cancer", url: "https://www.nhs.uk/conditions/lung-cancer/symptoms/" };
const NHS_COUGHING_BLOOD = { label: "NHS: coughing up blood (blood in phlegm)", url: "https://www.nhs.uk/symptoms/coughing-up-blood/" };
const NG122_PALLIATIVE = { label: "NICE NG122: lung cancer, palliative interventions and supportive and palliative care", url: "https://www.nice.org.uk/guidance/ng122/chapter/Palliative-interventions-and-supportive-and-palliative-care" };
const NG234_MSCC = { label: "NICE NG234: spinal metastases and metastatic spinal cord compression, recommendations", url: "https://www.nice.org.uk/guidance/ng234/chapter/Recommendations" };
const NHS_CELLULITIS = { label: "NHS: cellulitis", url: "https://www.nhs.uk/conditions/cellulitis/" };
const NG101_BREAST = { label: "NICE NG101: early and locally advanced breast cancer, recommendations (updated 2025)", url: "https://www.nice.org.uk/guidance/ng101/chapter/Recommendations" };
const BCN_SECONDARY = { label: "Breast Cancer Now: secondary breast cancer symptoms", url: "https://breastcancernow.org/about-breast-cancer/secondary-breast-cancer/secondary-breast-cancer-symptoms" };
const CRUK_BREAST_PROBLEMS = { label: "Cancer Research UK: possible problems after mastectomy", url: "https://www.cancerresearchuk.org/about-cancer/breast-cancer/treatment/surgery/after-surgery/problems-after-mastectomy" };
// ---- Keratinocyte skin cancer (basal cell and cutaneous squamous cell carcinoma), added 25 September 2026.
const NHS_SCARS_RF = { label: "NHS: scars", url: "https://www.nhs.uk/conditions/scars/" };
const BAD_BCC_RF = { label: "British Association of Dermatologists: basal cell carcinoma, patient information leaflet (updated July 2025)", url: "https://www.skinhealthinfo.org.uk/condition/basal-cell-carcinoma/" };
const BAD_SCC_RF = { label: "British Association of Dermatologists: squamous cell carcinomas, patient information leaflet (updated April 2022; its own next review date was April 2025 and no newer version has been published)", url: "https://www.skinhealthinfo.org.uk/condition/squamous-cell-carcinomas/" };
const BAD_OTR_RF = { label: "British Association of Dermatologists and BSSCII: skin cancer advice for organ transplant recipients, patient information leaflet (June 2024)", url: "https://www.skinhealthinfo.org.uk/condition/skin-cancer-in-organ-transplant-recipients/" };
const BAD_MOHS_RF = { label: "British Association of Dermatologists and British Society for Dermatological Surgery: Mohs micrographic surgery, patient information leaflet (updated June 2025)", url: "https://www.skinhealthinfo.org.uk/condition/mohs-micrographic-surgery/" };
const CRUK_SKIN_PROBLEMS = { label: "Cancer Research UK: problems after surgery for non-melanoma skin cancer", url: "https://www.cancerresearchuk.org/about-cancer/skin-cancer/treatment/surgery/problems-after-surgery" };
const CRUK_SKIN_SURGERY = { label: "Cancer Research UK: types of surgery for non-melanoma skin cancer", url: "https://www.cancerresearchuk.org/about-cancer/skin-cancer/treatment/surgery/treatment-surgery-types" };
const CRUK_SKIN_FOLLOWUP = { label: "Cancer Research UK: follow-up after non-melanoma skin cancer treatment", url: "https://www.cancerresearchuk.org/about-cancer/skin-cancer/treatment/follow-up-appointments" };
const PNI_CSCC = { label: "Ibrahim et al., immunotherapy and radiation for clinical perineural invasion in cutaneous squamous cell carcinoma (Cancers 2025)", url: "https://doi.org/10.3390/cancers17243921" };

const MAC_SVCO = { label: "Macmillan: superior vena cava obstruction (SVCO)", url: "https://www.macmillan.org.uk/cancer-information-and-support/impacts-of-cancer/superior-vena-cava-obstruction" };
const MAC_BREATHLESSNESS = { label: "Macmillan: breathlessness", url: "https://www.macmillan.org.uk/cancer-information-and-support/impacts-of-cancer/breathlessness" };
const MAC_DURVALUMAB = { label: "Macmillan: durvalumab (Imfinzi)", url: "https://www.macmillan.org.uk/cancer-information-and-support/treatments-and-drugs/durvalumab" };
const MAC_OSIMERTINIB = { label: "Macmillan: osimertinib (Tagrisso)", url: "https://www.macmillan.org.uk/cancer-information-and-support/treatments-and-drugs/osimertinib" };
const CRUK_LUNG_BREATHLESSNESS = { label: "Cancer Research UK: coping with breathlessness when you have lung cancer", url: "https://www.cancerresearchuk.org/about-cancer/lung-cancer/living-with/coping-with-breathlessness" };
const CRUK_PLEURAL_EFFUSION = { label: "Cancer Research UK: fluid on the lungs (pleural effusion)", url: "https://www.cancerresearchuk.org/about-cancer/coping/physically/breathing-problems/fluid-on-lungs-pleural-effusion" };

// Prostate cancer
const NG131_PROSTATE = { label: "NICE NG131: prostate cancer, diagnosis and management", url: "https://www.nice.org.uk/guidance/ng131/chapter/Recommendations" };
const PCUK_MSCC = { label: "Prostate Cancer UK: metastatic spinal cord compression (MSCC)", url: "https://prostatecanceruk.org/prostate-information-and-support/advanced-prostate-cancer/metastatic-spinal-cord-compression-mscc" };
const PCUK_URINARY = { label: "Prostate Cancer UK: urinary problems after prostate cancer treatment", url: "https://prostatecanceruk.org/prostate-information-and-support/living-with-prostate-cancer/urinary-problems" };
const PCUK_ED_TREATMENTS = { label: "Prostate Cancer UK: treatments for erection problems", url: "https://prostatecanceruk.org/prostate-information-and-support/living-with-prostate-cancer/sex-and-relationships/treatments-for-erection-problems" };
const PCUK_HORMONE = { label: "Prostate Cancer UK: how hormone therapy affects you", url: "https://prostatecanceruk.org/prostate-information-and-support/living-with-prostate-cancer/how-hormone-therapy-affects-you" };
const NHS_PROSTATE_SYMPTOMS = { label: "NHS: symptoms of prostate cancer", url: "https://www.nhs.uk/conditions/prostate-cancer/symptoms/" };
const MAC_DOCETAXEL = { label: "Macmillan: docetaxel", url: "https://www.macmillan.org.uk/cancer-information-and-support/treatments-and-drugs/docetaxel" };

// Lymphoma, added 1 October 2026. The six emergencies of this disease: neutropenic sepsis (including the
// no-fever presentation steroids make likely), tumour lysis in the first days of treating bulky or fast-growing
// disease, cytokine release syndrome and neurotoxicity after engineered T cells or a bispecific antibody,
// spinal cord compression, superior vena cava obstruction in mediastinal disease, and hepatitis B reactivation.
// All six are scoped by cancer rather than by product, so they reach the disease page whatever is prescribed.
const LA_NEUTROPENIA_RF = { label: "Lymphoma Action: neutropenia (low neutrophils)", url: "https://lymphoma-action.org.uk/information-and-support/side-effects-lymphoma-and-treatment/neutropenia-low-neutrophils" };
const LA_INFECTIONS_RF = { label: "Lymphoma Action: infections, risk and prevention", url: "https://lymphoma-action.org.uk/information-and-support/side-effects-lymphoma-and-treatment/infections-risk-and-prevention" };
const LA_CAR_T_RF = { label: "Lymphoma Action: CAR-T cell therapy", url: "https://lymphoma-action.org.uk/information-and-support/lymphoma-treatment/car-t-cell-therapy" };
const LA_DLBCL_RF = { label: "Lymphoma Action: diffuse large B-cell lymphoma", url: "https://lymphoma-action.org.uk/information-and-support/types-lymphoma/non-hodgkin-lymphoma/diffuse-large-b-cell-lymphoma" };
const MAC_MSCC_RF = { label: "Macmillan: metastatic spinal cord compression", url: "https://www.macmillan.org.uk/cancer-information-and-support/impacts-of-cancer/metastatic-spinal-cord-compression" };
const BSH_TLS_RF = { label: "British Committee for Standards in Haematology: guidelines for the management of tumour lysis syndrome in adults and children with haematological malignancies (British Journal of Haematology 2015)", url: "https://doi.org/10.1111/bjh.13403" };
const HBV_ENTECAVIR_RF = { label: "Huang et al., entecavir versus lamivudine for prevention of hepatitis B reactivation in diffuse large B-cell lymphoma receiving R-CHOP (JAMA 2014)", url: "https://doi.org/10.1001/jama.2014.15704" };
const NHS_NHL_SYMPTOMS_RF = { label: "NHS: non-Hodgkin lymphoma, symptoms", url: "https://www.nhs.uk/conditions/non-hodgkin-lymphoma/symptoms/" };

// ---- Patient leaflets behind the drug-scoped side-effect lines, added 18 November 2026. Each was fetched raw on
// that day and the quoted words checked against the text: the EMA files answered application/pdf (211 KB to 1.6 MB),
// the DailyMed and Cancer Research UK pages text/html. An EMA file holds the summary of product characteristics
// first and the package leaflet, the part written for patients, at the end; the quotations are from the leaflet.
const emaLeaflet = (brand: string, drug: string) => ({ label: `${brand} (${drug}): EU package leaflet, in the EMA product information`, url: `https://www.ema.europa.eu/en/documents/product-information/${brand.toLowerCase()}-epar-product-information_en.pdf` });
const dailymedLeaflet = (brand: string, drug: string, part: string, setId: string) => ({ label: `${brand} (${drug}): US ${part} (DailyMed)`, url: `https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=${setId}` });
const EMA_ELZONRIS_RF = emaLeaflet("Elzonris", "tagraxofusp");
const EMA_QARZIBA_RF = emaLeaflet("Qarziba", "dinutuximab beta");
const DM_PROLEUKIN_RF = dailymedLeaflet("Proleukin", "aldesleukin", "prescribing information, section 17, patient counselling", "f3c516ad-d405-4fbe-af6a-962080dbfa7d");
const EMA_GLIVEC_RF = emaLeaflet("Glivec", "imatinib");
const DM_SPRYCEL_RF = dailymedLeaflet("Sprycel", "dasatinib", "patient information", "4764f37b-c9e6-4ede-bcc2-8a03b7c521df");
const EMA_AYVAKYT_RF = emaLeaflet("Ayvakyt", "avapritinib");
const DM_BALVERSA_RF = dailymedLeaflet("Balversa", "erdafitinib", "patient information", "2a8aa5c0-6c92-4566-8c45-e8f4d1fc20ee");
const DM_PEMAZYRE_RF = dailymedLeaflet("Pemazyre", "pemigatinib", "patient information", "9e1f2222-1d89-4e63-989c-ccebe2ab1eb4");
const DM_LYTGOBI_RF = dailymedLeaflet("Lytgobi", "futibatinib", "patient information", "0b1332a1-0581-4707-9bf6-1eccfa39bef4");
const CRUK_PANITUMUMAB_RF = { label: "Cancer Research UK: panitumumab (Vectibix)", url: "https://www.cancerresearchuk.org/about-cancer/treatment/drugs/panitumumab" };
const EMA_SUTENT_RF = emaLeaflet("Sutent", "sunitinib");
const EMA_INLYTA_RF = emaLeaflet("Inlyta", "axitinib");
const EMA_CABOMETYX_RF = emaLeaflet("Cabometyx", "cabozantinib");
const EMA_VOTRIENT_RF = emaLeaflet("Votrient", "pazopanib");
const EMA_COLUMVI_RF = emaLeaflet("Columvi", "glofitamab");
const EMA_LUNSUMIO_RF = emaLeaflet("Lunsumio", "mosunetuzumab");
const EMA_TEPKINLY_RF = emaLeaflet("Tepkinly", "epcoritamab");
const DM_REVLIMID_RF = dailymedLeaflet("Revlimid", "lenalidomide", "Medication Guide", "5fa97bf5-28a2-48f1-8955-f56012d296be");

// ---- Second round of drug-scoped lines, added 18 November 2026, for fourteen care protocols written that day.
// Each quotation was checked by script against text saved from the URL cited (whitespace joined, nothing else
// changed). "Medication Guide" or "patient information" is whichever the US label itself calls its patient part.
const CRUK_BCG_RF = { label: "Cancer Research UK: BCG into the bladder", url: "https://www.cancerresearchuk.org/about-cancer/bladder-cancer/treatment/early/bcg" };
const MAC_BCG_RF = { label: "Macmillan: BCG treatment for bladder cancer (reviewed 1 November 2022; the page is marked as being reviewed)", url: "https://www.macmillan.org.uk/cancer-information-and-support/treatments-and-drugs/bcg-treatment-for-bladder-cancer" };
const EMA_ANKTIVA_RF = emaLeaflet("Anktiva", "nogapendekin alfa inbakicept");
const EMA_ADSTILADRIN_RF = emaLeaflet("Adstiladrin", "nadofaragene firadenovec");
const EMA_LUTATHERA_RF = emaLeaflet("Lutathera", "lutetium-177 dotatate");
const EMA_PLUVICTO_RF = emaLeaflet("Pluvicto", "lutetium-177 vipivotide tetraxetan");
const DM_WELIREG_RF = dailymedLeaflet("Welireg", "belzutifan", "Medication Guide", "13e15ee0-d679-4fa9-9430-e2e2170474da");
const DM_LUMAKRAS_RF = dailymedLeaflet("Lumakras", "sotorasib", "patient information", "c80a362c-7ac3-4894-a076-0691e68ef8c1");
const DM_KRAZATI_RF = dailymedLeaflet("Krazati", "adagrasib", "patient information", "0b8bf078-34c2-4f45-9012-38a8ac082b01");
const DM_BIZENGRI_RF = dailymedLeaflet("Bizengri", "zenocutuzumab", "patient information", "203daea4-fc87-40a4-a92f-ba2351b16de1");
const DM_VOTRIENT_RF = dailymedLeaflet("Votrient", "pazopanib", "Medication Guide", "eeaaaf38-fb86-4d9f-a19d-0f61daac2fd7");
const DM_TECENTRIQ_RF = dailymedLeaflet("Tecentriq", "atezolizumab", "Medication Guide", "6fa682c9-a312-4932-9831-f286908660ee");
const EMA_IMFINZI_RF = emaLeaflet("Imfinzi", "durvalumab");
const EMA_KYPROLIS_RF = emaLeaflet("Kyprolis", "carfilzomib");
const EMA_LORVIQUA_RF = emaLeaflet("Lorviqua", "lorlatinib");
const DM_AYVAKIT_RF = dailymedLeaflet("Ayvakit", "avapritinib", "patient information", "645c887c-8cd4-4623-8da9-ac223d71a8b9");
const DM_CALQUENCE_RF = dailymedLeaflet("Calquence", "acalabrutinib", "patient information", "b1409184-3267-4d8c-8f17-4e01f69828b1");
const MAC_ACALABRUTINIB_RF = { label: "Macmillan: acalabrutinib", url: "https://www.macmillan.org.uk/cancer-information-and-support/treatments-and-drugs/acalabrutinib" };
const DM_BLINCYTO_RF = dailymedLeaflet("Blincyto", "blinatumomab", "Medication Guide", "38b482a8-960b-4591-9857-5031ecb830aa");
const MAC_IFOSFAMIDE_RF = { label: "Macmillan: ifosfamide", url: "https://www.macmillan.org.uk/cancer-information-and-support/treatments-and-drugs/ifosfamide" };
const EMA_MEKTOVI_RF = emaLeaflet("Mektovi", "binimetinib");
const DM_MEKTOVI_RF = dailymedLeaflet("Mektovi", "binimetinib", "Medication Guide", "6c3408ac-d401-4925-8a03-26591afbc240");
const DM_COTELLIC_RF = dailymedLeaflet("Cotellic", "cobimetinib", "patient information", "c387579e-cee0-4334-bd1e-73f93ac1bde6");
const DM_AVMAPKI_RF = dailymedLeaflet("Avmapki Fakzynja Co-Pack", "avutometinib and defactinib", "patient information", "65889527-1406-45df-8a85-e2690dcf427d");
const NHS_LETROZOLE_RF = { label: "NHS: side effects of letrozole", url: "https://www.nhs.uk/medicines/letrozole/side-effects-of-letrozole/" };
const NHS_ANASTROZOLE_RF = { label: "NHS: side effects of anastrozole", url: "https://www.nhs.uk/medicines/anastrozole/side-effects-of-anastrozole/" };
const DM_OGSIVEO_RF = dailymedLeaflet("Ogsiveo", "nirogacestat", "patient information", "f172e6ff-3190-41b0-b95a-58a7ef9e9e1e");
const EMA_ZYTIGA_RF = emaLeaflet("Zytiga", "abiraterone acetate");
const DM_VANFLYTA_RF = dailymedLeaflet("Vanflyta", "quizartinib", "Medication Guide", "29cdbcfe-497d-4e78-bb7b-2d4acafe8e86");
const DM_TARGRETIN_RF = dailymedLeaflet("Targretin", "bexarotene", "patient information", "1d056725-0576-4338-8089-6336e768ccdc");
const DM_MEKINIST_RF = dailymedLeaflet("Mekinist", "trametinib", "patient information", "0002ad27-779d-42ab-83b5-bc65453412a1");
const DM_KOSELUGO_RF = dailymedLeaflet("Koselugo", "selumetinib", "patient information", "7d042c61-f28f-4ab5-ab10-d7558c0d49ff");
const DM_XALKORI_RF = dailymedLeaflet("Xalkori", "crizotinib", "Medication Guide", "2a51b0de-47d6-455e-a94c-d2c737b04ff7");
const DM_ALUNBRIG_RF = dailymedLeaflet("Alunbrig", "brigatinib", "patient information", "0fe9ff20-d402-41f3-bc1e-7002ea7007db");
const DM_DATROWAY_RF = dailymedLeaflet("Datroway", "datopotamab deruxtecan", "Medication Guide", "2950227c-6230-4ca4-a135-46e44d9424a0");
const DM_ETCAMAH_RF = dailymedLeaflet("Etcamah", "camizestrant", "patient information", "c54223d3-f3c7-4186-afa0-429d84805826");
const DM_ZELBORAF_RF = dailymedLeaflet("Zelboraf", "vemurafenib", "Medication Guide", "38eea320-7e0c-485a-bc30-98c3c45e2763");
const DM_BRAFTOVI_RF = dailymedLeaflet("Braftovi", "encorafenib", "Medication Guide", "235dfc38-0f0b-4037-b501-7a9f4294740c");
const DM_QINLOCK_RF = dailymedLeaflet("Qinlock", "ripretinib", "patient information", "9f18e462-03dd-4296-a02a-a0577e3ee78d");
const DM_TAFINLAR_RF = dailymedLeaflet("Tafinlar", "dabrafenib", "Medication Guide", "fee1e6b1-e1a5-4254-9f2e-a70e0f8dbdea");
const EMC_TAMOXIFEN_RF = { label: "Tamoxifen 20 mg film-coated tablets (Wockhardt): UK patient information leaflet, electronic medicines compendium", url: "https://www.medicines.org.uk/emc/product/2248/pil" };
const EMA_ZEJULA_RF = emaLeaflet("Zejula", "niraparib");
const EMA_CARVYKTI_RF = emaLeaflet("Carvykti", "ciltacabtagene autoleucel");
const DM_TALVEY_RF = dailymedLeaflet("Talvey", "talquetamab", "Medication Guide", "9001355e-003d-4d4e-b4ce-337e0fd14952");
const DM_IMDELLTRA_RF = dailymedLeaflet("Imdelltra", "tarlatamab", "Medication Guide", "1e7b6163-5d83-42ea-82c9-cf7620cdc782");
const EMA_BESPONSA_RF = emaLeaflet("Besponsa", "inotuzumab ozogamicin");
const EMA_MYLOTARG_RF = emaLeaflet("Mylotarg", "gemtuzumab ozogamicin");

export const GENERAL_RED_FLAGS: RedFlagSet = {
  id: "general",
  label: "Anyone on cancer treatment",
  flags: [
    { symptom: "Fever or feeling unwell", threshold: "Temperature of 38 C or higher, or shivering, or feeling unwell with signs of infection, at any time during treatment that can lower white cells.", action: "call-now", source: NICE_CG151, protocols: ["febrile-neutropenia-first-hour", "acute-oncology-telephone-triage"] },
    { symptom: "Signs of sepsis", threshold: "Breathing very fast, confusion or slurred speech, blue, pale or blotchy skin, a very high or very low temperature or shivering, or a rash that does not fade when you press it.", action: "emergency", source: NHS_SEPSIS },
    { symptom: "Breathlessness", threshold: "Shortness of breath at rest, or any chest pain or tightness: the triage tool sends both straight to 999.", action: "emergency", source: UKONS, protocols: ["acute-oncology-telephone-triage", "breathlessness-and-cough-during-anticancer-treatment"] },
    { symptom: "Uncontrolled vomiting or diarrhoea", threshold: "Six or more episodes of vomiting in 24 hours, or an increase of seven or more bowel movements a day over your pre-treatment normal.", action: "call-now", source: UKONS, protocols: ["treatment-induced-diarrhoea-grading-and-management"] },
    { symptom: "Bleeding", threshold: "Bleeding that does not stop by itself, heavy or continuous bleeding, or bruising in several places or one large area.", action: "emergency", source: UKONS, protocols: ["bleeding-precautions-when-platelets-are-low"] },
    { symptom: "Confusion or drowsiness", threshold: "Severe confusion, an altered level of consciousness, or being difficult to rouse.", action: "emergency", source: UKONS },
    { symptom: "Rash that blisters", threshold: "A rash over more than 30 percent of the body, or blistering, ulceration, weeping skin, spontaneous bleeding or severe pain in the skin.", action: "emergency", source: UKONS },
  ],
};

export const redFlagSets: RedFlagSet[] = [
  {
    id: "checkpoint-inhibitors",
    label: "Immune checkpoint inhibitors",
    modalityRe: "anti-pd-1|anti-pd-l1|anti-ctla-4|anti-lag-3|pd-1×|pd-1 antibody",
    drugIds: ["pembrolizumab", "nivolumab", "ipilimumab", "atezolizumab", "durvalumab", "cemiplimab", "dostarlimab", "tremelimumab", "relatlimab-nivolumab", "tislelizumab", "toripalimab", "avelumab", "retifanlimab"],
    window: "Immune-related reactions can start at any time during treatment and for months after the last dose; carry the alert card.",
    flags: [
      { symptom: "Diarrhoea or colitis", threshold: "Four or more stools a day above your usual, or abdominal pain, or mucus or blood in the stool (grade 2). Seven or more stools a day or severe abdominal pain is grade 3.", action: "call-now", source: ASCO_IRAE, protocols: ["irae-colitis"] },
      { symptom: "Pneumonitis", threshold: "Any new or worsening cough, breathlessness or chest pain. Breathless at rest or needing oxygen is grade 3 to 4.", action: "call-now", source: ASCO_IRAE, protocols: ["irae-pneumonitis"] },
      { symptom: "Hepatitis", threshold: "Yellow skin or eyes, dark urine, pain under the right ribs, or nausea with tiredness; blood tests showing ALT or AST above 3 times normal.", action: "call-today", source: ASCO_IRAE, protocols: ["irae-hepatitis"] },
      { symptom: "Hypophysitis or adrenal crisis", threshold: "Persistent headache with extreme tiredness, nausea, dizziness on standing or low blood pressure. Vomiting, severe weakness or collapse is adrenal crisis.", action: "emergency", source: ASCO_IRAE, protocols: ["irae-hypophysitis-adrenal"] },
      { symptom: "Myocarditis", threshold: "Chest pain, palpitations, breathlessness or leg swelling, especially in the first weeks; ASCO treats any suspected myocarditis as an emergency and holds treatment permanently after a confirmed case of grade 2 or higher.", action: "emergency", source: ASCO_IRAE, protocols: ["irae-myocarditis"] },
      { symptom: "New diabetes", threshold: "Excessive thirst, passing lots of urine, or blurred vision; vomiting, abdominal pain or fast deep breathing suggests ketoacidosis.", action: "emergency", source: ASCO_IRAE, protocols: ["irae-diabetes"] },
      { symptom: "Neurological symptoms", threshold: "Weakness, numbness, drooping eyelids, double vision, difficulty swallowing or severe headache (possible myasthenia, Guillain-Barre or encephalitis).", action: "emergency", source: ASCO_IRAE, protocols: ["irae-neurological"] },
      { symptom: "Skin reaction", threshold: "Rash covering more than 30 percent of the body, blisters, or sores in the mouth or eyes.", action: "call-now", source: ASCO_IRAE, protocols: ["irae-skin"] },
    ],
  },
  {
    id: "deruxtecan-adcs",
    label: "Deruxtecan (DXd) antibody-drug conjugates",
    drugIds: ["trastuzumab-deruxtecan", "datopotamab-deruxtecan", "patritumab-deruxtecan", "ifinatamab-deruxtecan", "raludotatug-deruxtecan"],
    window: "Interstitial lung disease can occur at any time; the Enhertu label carries a boxed warning and says to advise patients to report symptoms immediately.",
    flags: [
      { symptom: "Interstitial lung disease or pneumonitis", threshold: "Any new or worsening cough, breathlessness or fever. The label says to interrupt treatment for any suspected ILD and to permanently discontinue for grade 2 or higher.", action: "call-now", source: label("Enhertu"), protocols: ["interstitial-lung-disease-on-antibody-drug-conjugates-and-targeted-drugs"] },
      { symptom: "Neutropenic fever", threshold: "Temperature of 38 C or higher (the label: severe neutropenia including febrile neutropenia can occur; monitor counts).", action: "call-now", source: label("Enhertu"), protocols: ["febrile-neutropenia-first-hour"] },
      { symptom: "Heart failure", threshold: "New breathlessness on exertion, swollen ankles, or waking breathless (left ventricular dysfunction is a labelled warning).", action: "call-today", source: label("Enhertu") },
      { symptom: "Eye symptoms (datopotamab)", threshold: "Dry eye, blurred vision, eye pain or light sensitivity; the Datroway label lists ocular adverse reactions including keratitis and requires eye examinations.", action: "call-today", source: label("Datroway") },
    ],
  },
  {
    id: "adcs",
    label: "Other antibody-drug conjugates",
    modalityRe: "^adc|bispecific adc",
    flags: [
      { symptom: "Neutropenic fever", threshold: "Temperature of 38 C or higher, or feeling shivery and unwell even without a fever. Antibody-drug conjugates suppress the bone marrow, and several carry a boxed warning for severe neutropenia.", action: "call-now", source: NICE_CG151, protocols: ["febrile-neutropenia-first-hour"] },
    ],
  },
  // Split out of the class set on 29 September 2026. The class card named enfortumab's and sacituzumab's boxed
  // warnings on the page of every ADC, so a reader on brentuximab vedotin was told to watch for a Stevens-Johnson
  // reaction sourced to a drug they are not taking, and so was a reader on an investigational ADC with no such
  // warning. A card that names a drug the reader is not on is worse than no card: it is the same failure as the
  // `imid` fragment. Each of these now attaches by product id to the products whose label carries the warning.
  {
    id: "adc-sacituzumab",
    label: "Sacituzumab govitecan",
    drugIds: ["sacituzumab-govitecan"],
    flags: [
      { symptom: "Neutropenic fever", threshold: "Temperature of 38 C or higher. Sacituzumab govitecan carries a boxed warning for severe or life-threatening neutropenia.", action: "call-now", source: label("Trodelvy"), protocols: ["febrile-neutropenia-first-hour"] },
      { symptom: "Severe diarrhoea", threshold: "Diarrhoea not controlled by loperamide, or with fever or dehydration. Sacituzumab govitecan carries a boxed warning for severe diarrhoea.", action: "call-now", source: label("Trodelvy"), protocols: ["irinotecan-early-cholinergic-syndrome-and-late-diarrhoea"] },
    ],
  },
  {
    id: "adc-enfortumab",
    label: "Enfortumab vedotin",
    drugIds: ["enfortumab-vedotin"],
    flags: [
      { symptom: "Skin reaction", threshold: "Blisters, peeling, or sores in the mouth or eyes with a rash. Enfortumab vedotin carries a boxed warning for Stevens-Johnson syndrome and toxic epidermal necrolysis, mostly in the first cycle.", action: "emergency", source: label("Padcev") },
      { symptom: "High blood sugar", threshold: "Excessive thirst, frequent urination, or home readings above the level the team set; ketoacidosis has occurred in patients with and without diabetes.", action: "call-today", source: label("Padcev") },
      { symptom: "Lung symptoms", threshold: "New cough or breathlessness; pneumonitis and interstitial lung disease are labelled warnings.", action: "call-now", source: label("Padcev") },
    ],
  },
  {
    id: "adc-brentuximab",
    label: "Brentuximab vedotin",
    drugIds: ["brentuximab-vedotin"],
    flags: [
      { symptom: "Confusion, weakness on one side, or loss of speech or vision", threshold: "Any new neurological symptom that is not explained. Brentuximab vedotin carries a boxed warning for progressive multifocal leukoencephalopathy, a brain infection; the label says to hold the drug and investigate at the first suspicion.", action: "emergency", source: label("Adcetris") },
    ],
  },
  {
    id: "adc-ocular",
    label: "Antibody-drug conjugates that injure the eye",
    drugIds: ["belantamab-mafodotin", "tisotumab-vedotin", "mirvetuximab-soravtansine"],
    flags: [
      { symptom: "Eye symptoms", threshold: "Blurred vision, dry or gritty eyes, eye pain or light sensitivity; these products carry boxed warnings or requirements for eye examinations before each dose.", action: "call-today", source: label("Tivdak"), protocols: ["eye-care-with-ocular-toxic-antibody-drug-conjugates"] },
    ],
  },
  {
    id: "adc-tubulin-payload",
    label: "Antibody-drug conjugates with a tubulin payload",
    drugIds: ["brentuximab-vedotin", "enfortumab-vedotin", "polatuzumab-vedotin", "tisotumab-vedotin", "disitamab-vedotin"],
    flags: [
      { symptom: "Numbness or weakness", threshold: "Tingling, numbness or weakness that affects walking or using the hands; peripheral neuropathy is common with the vedotin (MMAE) payload and doses are reduced or stopped at grade 2 to 3.", action: "call-today", source: label("Adcetris") },
    ],
  },
  {
    id: "car-t",
    label: "CAR-T cell therapy",
    modalityRe: "car-t",
    window: "The labels require patients to remain within proximity of the treating centre for at least four weeks after infusion and not to drive or operate heavy machinery for at least eight weeks. Most CRS and neurotoxicity starts in the first two weeks.",
    flags: [
      { symptom: "Cytokine release syndrome", threshold: "Fever of 38 C or higher is grade 1 CRS; fever with low blood pressure, fast heartbeat, breathlessness or low oxygen is grade 2 or higher. The labels carry a boxed warning and say to report fever immediately.", action: "emergency", source: ASTCT, protocols: ["crs-grading-and-management"] },
      { symptom: "Neurotoxicity (ICANS)", threshold: "Difficulty finding words, confusion, drowsiness, change in handwriting, tremor or a seizure. The labels carry a boxed warning for neurologic toxicities.", action: "emergency", source: label("Yescarta"), protocols: ["icans-grading-and-management"] },
      { symptom: "Infection", threshold: "Fever, cough, burning on passing urine, or any infection sign, for months after infusion while blood counts and antibodies stay low.", action: "call-now", source: label("Yescarta"), protocols: ["car-t-infection-prevention"] },
      { symptom: "Prolonged low blood counts", threshold: "Bleeding, bruising, breathlessness or recurrent infections; cytopenias can persist for weeks after infusion.", action: "call-today", source: label("Yescarta"), protocols: ["icaht-prolonged-cytopenia"] },
      { symptom: "Movement or personality changes (BCMA CAR-T)", threshold: "Slowness, stiffness, tremor, or changes in personality or handwriting weeks to months after infusion; the Carvykti label warns of parkinsonism and Guillain-Barre syndrome.", action: "call-now", source: label("Carvykti") },
      { symptom: "Haemophagocytic lymphohistiocytosis", threshold: "Persistent fever with enlarged liver or spleen, very low counts and bleeding after CRS; a labelled warning for BCMA CAR-T products.", action: "emergency", source: label("Carvykti"), protocols: ["iec-hs-management"] },
    ],
  },
  {
    id: "t-cell-engagers",
    label: "Bispecific T-cell engagers",
    modalityRe: "t-cell engager|immtac|bispecific t-cell",
    window: "The step-up doses are given in hospital because CRS and neurotoxicity are most likely in the first cycle; several labels require 48 hours of monitoring after each step-up dose.",
    flags: [
      { symptom: "Cytokine release syndrome", threshold: "Fever of 38 C or higher, chills, low blood pressure, fast heartbeat or breathlessness, especially after a step-up dose. Boxed warning on teclistamab, epcoritamab, glofitamab, tarlatamab and blinatumomab.", action: "emergency", source: label("Tecvayli"), protocols: ["bispecific-step-up-dosing"] },
      { symptom: "Neurotoxicity (ICANS)", threshold: "Confusion, word-finding difficulty, drowsiness, tremor, seizures or weakness. Boxed warning on teclistamab, talquetamab, elranatamab, tarlatamab and blinatumomab.", action: "emergency", source: label("Tecvayli"), protocols: ["bispecific-step-up-dosing"] },
      { symptom: "Infection", threshold: "Fever or any infection sign; serious and fatal infections including opportunistic infections are labelled warnings because antibody levels fall.", action: "call-now", source: label("Tecvayli"), protocols: ["bispecific-step-up-dosing"] },
      { symptom: "Low blood counts", threshold: "Bleeding, bruising or breathlessness; neutropenia and thrombocytopenia are labelled warnings.", action: "call-today", source: label("Tecvayli") },
      { symptom: "Weight loss, taste or skin changes (talquetamab)", threshold: "Marked weight loss, inability to eat because of taste changes or mouth soreness, or severe skin peeling and nail loss; the Talvey label lists oral, skin and nail toxicity and weight loss.", action: "call-today", source: label("Talvey") },
    ],
  },
  {
    id: "cytotoxic",
    label: "Cytotoxic chemotherapy",
    modalityRe: "cytotoxic|alkylating|platinum|taxane|anthracycline|antifolate|nucleoside|topoisomerase|vinca|fluoropyrimidine|hypomethylating|nitrosourea|glycopeptide antibiotic|actinomycin|halichondrin|purine nucleoside|liposomal|antibiotic \\(bioreductive\\)",
    window: "White cells are usually lowest 7 to 14 days after each dose.",
    flags: [
      { symptom: "Neutropenic fever", threshold: "Temperature of 38 C or higher, or other signs consistent with sepsis, while on chemotherapy: NICE says to refer immediately for assessment as suspected neutropenic sepsis.", action: "call-now", source: NICE_CG151, protocols: ["febrile-neutropenia-first-hour"] },
      { symptom: "Uncontrolled vomiting", threshold: "Six or more episodes of vomiting in 24 hours, or no significant food or fluid intake, despite taking your anti-sickness medicines as prescribed.", action: "call-now", source: UKONS },
      { symptom: "Severe diarrhoea", threshold: "Seven or more stools a day above your usual, or diarrhoea with fever or dizziness. With fluorouracil or capecitabine, severe early diarrhoea and mouth ulcers in the first cycle can indicate DPD deficiency.", action: "call-now", source: label("fluorouracil injection"), protocols: ["treatment-induced-diarrhoea-grading-and-management", "dpyd-testing-before-fluoropyrimidines"] },
      { symptom: "Mouth ulcers", threshold: "Painful ulcers or redness that make eating and drinking difficult.", action: "call-today", source: UKONS, protocols: ["oral-mucositis-prevention-and-oral-care"] },
      { symptom: "Bleeding or bruising", threshold: "Bleeding that does not stop by itself, bleeding from more than one site, or new bruising in several places or one large area.", action: "emergency", source: UKONS, protocols: ["bleeding-precautions-when-platelets-are-low"] },
      { symptom: "Chest pain (fluoropyrimidines)", threshold: "Chest pain or tightness during or after fluorouracil or capecitabine; the label warns of cardiotoxicity including angina and myocardial infarction.", action: "emergency", source: label("fluorouracil injection"), protocols: ["acute-oncology-telephone-triage"] },
      { symptom: "Heart failure (anthracyclines)", threshold: "New breathlessness, swollen ankles or a racing heart during or years after doxorubicin; the boxed warning covers cardiomyopathy, including late onset.", action: "call-today", source: label("doxorubicin"), protocols: ["cardio-oncology-risk-assessment-and-cardiac-surveillance"] },
      { symptom: "Blood in urine (cyclophosphamide, ifosfamide)", threshold: "Visible blood in the urine or pain on passing urine; haemorrhagic cystitis is a labelled warning and mesna and hydration are used to prevent it.", action: "call-now", source: label("cyclophosphamide") },
      { symptom: "Hearing or kidney changes (cisplatin)", threshold: "New ringing in the ears or hearing loss, or passing much less urine; boxed warnings cover nephrotoxicity and ototoxicity.", action: "call-today", source: label("cisplatin") },
      { symptom: "Breathlessness (bleomycin)", threshold: "New cough or breathlessness at any time during or after bleomycin; pulmonary fibrosis is a boxed warning.", action: "call-now", source: label("bleomycin") },
      { symptom: "Constipation or abdominal swelling (vincristine)", threshold: "No bowel movement for three days, or abdominal swelling with vomiting (possible ileus).", action: "call-today", source: label("vincristine"), protocols: ["constipation-in-adults-with-cancer"] },
      { symptom: "Throat tightness in the cold (oxaliplatin)", threshold: "A feeling of difficulty breathing or swallowing on exposure to cold in the days after a dose; the label describes laryngopharyngeal dysaesthesia and advises avoiding cold.", action: "call-today", source: label("oxaliplatin") },
    ],
  },
  {
    id: "vegf-inhibitors",
    label: "VEGF-pathway inhibitors",
    modalityRe: "anti-vegf|vegfr|vegf",
    drugIds: ["bevacizumab", "ramucirumab", "lenvatinib", "cabozantinib", "sunitinib", "regorafenib", "sorafenib", "axitinib", "pazopanib", "tivozanib"],
    flags: [
      { symptom: "Bowel perforation", threshold: "Sudden severe abdominal pain, a hard or very tender abdomen, or abdominal pain with vomiting and fever. Boxed warning for gastrointestinal perforation on bevacizumab.", action: "emergency", source: AVASTIN },
      { symptom: "Serious bleeding", threshold: "Coughing blood (more than a teaspoon), vomiting blood, black stools, or a nosebleed that will not stop. Boxed warning for haemorrhage on bevacizumab.", action: "emergency", source: AVASTIN },
      { symptom: "Hypertensive crisis or brain swelling", threshold: "Severe headache, confusion, visual disturbance, seizure, or a blood pressure reading of 160 or more over 100 or more; the labels warn of hypertensive crisis and posterior reversible encephalopathy syndrome.", action: "emergency", source: AVASTIN, protocols: ["hypertension-and-proteinuria-on-vegf-pathway-inhibitors"] },
      { symptom: "Wound that will not heal", threshold: "A surgical wound that opens, leaks or is not healing; the label says to withhold treatment for at least 28 days around surgery. Boxed warning for wound healing complications on bevacizumab.", action: "call-today", source: AVASTIN, protocols: ["anti-vegf-drugs-around-surgery"] },
      { symptom: "Stroke or heart attack signs", threshold: "Sudden weakness on one side, slurred speech, facial droop, or chest pain; arterial thromboembolic events are a labelled warning.", action: "emergency", source: AVASTIN },
      { symptom: "Protein in urine or swelling", threshold: "Foamy urine, swollen ankles or rapid weight gain; nephrotic syndrome is a labelled warning and urine protein is monitored.", action: "call-today", source: AVASTIN, protocols: ["hypertension-and-proteinuria-on-vegf-pathway-inhibitors"] },
    ],
  },
  {
    id: "kinase-inhibitors",
    label: "Kinase inhibitors (oral targeted drugs)",
    modalityRe: "kinase inhibitor|\\btki\\b|pan-erbb|pan-her|raf/mek|mek1/2|abl1|inhibitor \\(kras|ras\\(on\\)",
    flags: [
      { symptom: "Fainting or palpitations", threshold: "Fainting, near-fainting, or an irregular or racing heartbeat; several kinase inhibitors prolong the QT interval and the labels require ECG and electrolyte monitoring.", action: "emergency", source: label("ribociclib"), protocols: ["qt-prolongation-monitoring-on-anticancer-drugs"] },
      { symptom: "Liver injury", threshold: "Yellow skin or eyes, dark urine, pain under the right ribs, or unusual tiredness with nausea; hepatotoxicity is a labelled warning for many kinase inhibitors and blood tests are checked before each cycle.", action: "call-today", source: label("lapatinib"), protocols: ["raised-liver-enzymes-on-targeted-anticancer-drugs"] },
      { symptom: "Lung inflammation (EGFR inhibitors)", threshold: "New or worsening cough, breathlessness or fever; the osimertinib label says to withhold for suspected ILD and permanently discontinue if confirmed.", action: "call-now", source: label("osimertinib"), protocols: ["interstitial-lung-disease-on-antibody-drug-conjugates-and-targeted-drugs"] },
      { symptom: "Severe diarrhoea", threshold: "Diarrhoea not controlled by loperamide within 24 hours, or with dehydration; a labelled warning for HER2 and pan-HER inhibitors such as neratinib and afatinib.", action: "call-now", source: label("neratinib"), protocols: ["treatment-induced-diarrhoea-grading-and-management", "neratinib-diarrhoea-prophylaxis-and-dose-escalation"] },
      { symptom: "Rash that blisters or infects", threshold: "Blistering or peeling skin, or an acne-like rash with pus and fever.", action: "call-now", source: label("osimertinib"), protocols: ["egfr-inhibitor-rash-prophylaxis"] },
      { symptom: "Vision changes (MEK and FGFR inhibitors)", threshold: "Blurred vision, floaters, or a dark area in vision; serous retinopathy and retinal vein occlusion are labelled warnings.", action: "call-today", source: label("trametinib") },
    ],
  },
  {
    id: "btk-inhibitors",
    label: "BTK inhibitors",
    modalityRe: "btk",
    flags: [
      { symptom: "Major bleeding", threshold: "Blood in stool or urine, vomiting blood, a bleed that will not stop, or a severe headache; fatal bleeding events have occurred and the labels advise considering the risk around surgery and with blood thinners.", action: "emergency", source: label("Imbruvica"), protocols: ["atrial-fibrillation-and-bleeding-on-btk-inhibitors"] },
      { symptom: "Atrial fibrillation or ventricular arrhythmia", threshold: "Palpitations, an irregular heartbeat, dizziness, breathlessness or fainting; the ibrutinib label warns of atrial fibrillation, ventricular arrhythmias and sudden death.", action: "call-now", source: label("Imbruvica"), protocols: ["atrial-fibrillation-and-bleeding-on-btk-inhibitors"] },
      { symptom: "Infection", threshold: "Fever or any infection sign; serious infections including opportunistic fungal infections are labelled warnings.", action: "call-now", source: label("Imbruvica") },
      { symptom: "High blood pressure", threshold: "Readings of 160 or more over 100 or more, or severe headache; hypertension is a labelled warning and may need new or adjusted treatment.", action: "call-today", source: label("Imbruvica"), protocols: ["atrial-fibrillation-and-bleeding-on-btk-inhibitors"] },
      { symptom: "Unusual bruising with tiredness", threshold: "Persistent bruising, tiredness and infections between visits; second primary malignancies and cytopenias are labelled warnings.", action: "call-today", source: label("Imbruvica") },
    ],
  },
  {
    id: "parp-inhibitors",
    label: "PARP inhibitors",
    modalityRe: "\\bparp",
    flags: [
      { symptom: "Signs of MDS or AML", threshold: "Unusual tiredness, breathlessness, easy bruising or bleeding, or frequent infections, especially if blood counts have not recovered within four weeks of stopping; the labels warn of myelodysplastic syndrome and acute myeloid leukaemia.", action: "call-today", source: label("Lynparza") },
      { symptom: "Pneumonitis", threshold: "New or worsening cough, breathlessness or fever; the label says to interrupt treatment and investigate.", action: "call-now", source: label("Lynparza"), protocols: ["interstitial-lung-disease-on-antibody-drug-conjugates-and-targeted-drugs"] },
      { symptom: "Severe anaemia", threshold: "Breathlessness on mild exertion, dizziness or palpitations; anaemia is common and transfusion is sometimes needed.", action: "call-today", source: label("Lynparza"), protocols: ["red-cell-and-platelet-transfusion-thresholds"] },
      { symptom: "Blood clot", threshold: "A swollen painful calf, or sudden breathlessness with chest pain; venous thromboembolism including pulmonary embolism is a labelled warning.", action: "emergency", source: label("Lynparza"), protocols: ["cancer-associated-vte-treatment"] },
      { symptom: "High blood pressure or palpitations (niraparib)", threshold: "Severe headache, or a racing or irregular heartbeat; hypertension and hypertensive crisis are labelled warnings for niraparib.", action: "call-today", source: label("Zejula") },
    ],
  },
  {
    id: "radioligands",
    label: "Radioligand and radiopharmaceutical therapy",
    modalityRe: "radioligand|alpha therapy|radiopharmaceutical|theranostic|radioactive",
    window: "Blood counts fall over the weeks after each dose and are checked before the next one.",
    flags: [
      { symptom: "Neutropenic fever", threshold: "Temperature of 38 C or higher; myelosuppression is a labelled warning for lutetium-177 PSMA and lutetium-177 dotatate.", action: "call-now", source: label("Pluvicto"), protocols: ["febrile-neutropenia-first-hour"] },
      { symptom: "Bleeding or bruising", threshold: "Unexplained bruising, tiny red spots, or bleeding that will not stop; thrombocytopenia can be severe.", action: "call-now", source: label("Pluvicto"), protocols: ["bleeding-precautions-when-platelets-are-low"] },
      { symptom: "Kidney problems", threshold: "Passing much less urine, swollen ankles, or dehydration from vomiting; renal toxicity is a labelled warning and the label advises hydration and frequent urination after treatment.", action: "call-today", source: label("Pluvicto") },
      { symptom: "Severe dry mouth", threshold: "Dryness that stops you eating, or a painful swollen gland; dry mouth and salivary gland toxicity are labelled for PSMA-targeted therapy.", action: "call-today", source: label("Pluvicto") },
      { symptom: "Bone pain flare or fracture (radium-223)", threshold: "Sudden severe bone pain, or back pain with weakness or numbness in the legs (possible spinal cord compression).", action: "emergency", source: label("Xofigo"), protocols: ["metastatic-spinal-cord-compression-emergency"] },
      { symptom: "Hormonal crisis (lutetium dotatate)", threshold: "Flushing, diarrhoea, wheezing or low blood pressure soon after a dose in people with functioning neuroendocrine tumours; neuroendocrine hormonal crisis is a labelled warning.", action: "emergency", source: label("Lutathera") },
    ],
  },
  {
    id: "cdk46-inhibitors",
    label: "CDK4/6 inhibitors",
    modalityRe: "cdk4",
    flags: [
      { symptom: "Neutropenic fever", threshold: "Temperature of 38 C or higher; neutropenia is the most common serious adverse reaction and febrile neutropenia has been fatal.", action: "call-now", source: label("Ibrance"), protocols: ["febrile-neutropenia-first-hour"] },
      { symptom: "Lung inflammation", threshold: "New or worsening cough or breathlessness; severe and fatal interstitial lung disease and pneumonitis are labelled warnings for all three drugs.", action: "call-now", source: label("Ibrance"), protocols: ["interstitial-lung-disease-on-antibody-drug-conjugates-and-targeted-drugs"] },
      { symptom: "Severe diarrhoea (abemaciclib)", threshold: "Diarrhoea not controlled by loperamide, or with dehydration; the label says to start loperamide at the first loose stool and to call if it does not settle within 24 hours.", action: "call-today", source: label("Verzenio"), protocols: ["treatment-induced-diarrhoea-grading-and-management"] },
      { symptom: "Fainting or palpitations (ribociclib)", threshold: "Fainting, dizziness or an irregular heartbeat; QT prolongation is a labelled warning and ECGs are checked in the first cycles.", action: "emergency", source: label("Kisqali"), protocols: ["qt-prolongation-monitoring-on-anticancer-drugs"] },
      { symptom: "Blood clot (abemaciclib)", threshold: "A swollen painful calf or sudden breathlessness with chest pain; venous thromboembolism is a labelled warning.", action: "emergency", source: label("Verzenio"), protocols: ["cancer-associated-vte-treatment"] },
      { symptom: "Liver injury", threshold: "Yellow skin or eyes, dark urine or pain under the right ribs; hepatobiliary toxicity is a labelled warning and liver tests are checked before each cycle.", action: "call-today", source: label("Verzenio"), protocols: ["raised-liver-enzymes-on-targeted-anticancer-drugs"] },
    ],
  },
  {
    id: "endocrine",
    label: "Hormone therapies",
    modalityRe: "serd|serm|aromatase|gnrh|antiandrogen|ar antagonist|cyp17a1|progestin|hormonal therapy|ar n-terminal",
    flags: [
      { symptom: "Blood clot (tamoxifen and others)", threshold: "A swollen painful calf, or sudden breathlessness with chest pain; the tamoxifen boxed warning covers pulmonary embolism and stroke.", action: "emergency", source: label("tamoxifen"), protocols: ["cancer-associated-vte-treatment"] },
      { symptom: "Vaginal bleeding (tamoxifen)", threshold: "Any unexpected vaginal bleeding, spotting or discharge after the menopause; uterine cancers are a boxed warning.", action: "call-today", source: label("tamoxifen") },
      { symptom: "Seizure or severe headache (enzalutamide, apalutamide, darolutamide)", threshold: "A seizure, sudden severe headache, confusion or visual loss; seizure and posterior reversible encephalopathy syndrome are labelled warnings.", action: "emergency", source: label("Xtandi") },
      { symptom: "Swelling, weakness or palpitations (abiraterone)", threshold: "Swollen ankles, muscle weakness or an irregular heartbeat; low potassium, fluid retention and hypertension from mineralocorticoid excess are labelled warnings, as is adrenal insufficiency during illness or if prednisone is interrupted.", action: "call-today", source: label("Zytiga") },
      { symptom: "Fall or fracture (androgen deprivation, aromatase inhibitors)", threshold: "A fall with new persistent bone pain, or sudden back pain with numbness or weakness in the legs.", action: "call-today", source: label("Xtandi"), protocols: ["bone-health-on-hormone-therapy", "metastatic-spinal-cord-compression-emergency"] },
    ],
  },
  {
    id: "differentiation-agents",
    label: "IDH, menin and differentiation agents",
    modalityRe: "idh1|idh2|idh1/2|menin|differentiation agent|differentiating agent",
    window: "Differentiation syndrome usually starts within the first weeks to months of treatment and carries a boxed warning.",
    flags: [
      { symptom: "Differentiation syndrome", threshold: "Fever, cough or breathlessness, rapid weight gain or swelling, bone pain, low blood pressure or reduced urine; the labels say to start steroids and monitor at the first suspicion, and the syndrome has been fatal.", action: "emergency", source: label("Idhifa"), protocols: ["differentiation-syndrome-recognition-and-treatment"] },
      { symptom: "Fainting or palpitations (ivosidenib, menin inhibitors)", threshold: "Fainting, dizziness or an irregular heartbeat; QT prolongation is a labelled warning.", action: "emergency", source: label("Tibsovo"), protocols: ["qt-prolongation-monitoring-on-anticancer-drugs"] },
      { symptom: "Neurological symptoms (ivosidenib)", threshold: "Weakness, numbness or difficulty walking; Guillain-Barre syndrome is a labelled warning.", action: "call-now", source: label("Tibsovo") },
    ],
  },
  {
    id: "venetoclax",
    label: "Venetoclax (BCL-2 inhibitor)",
    drugIds: ["venetoclax"],
    modalityRe: "bcl-2 inhibitor",
    window: "Tumour lysis syndrome risk is highest during the five-week dose ramp-up in CLL and at the start of treatment in AML.",
    flags: [
      { symptom: "Tumour lysis syndrome", threshold: "Nausea, vomiting, muscle cramps, palpitations, seizures, confusion or passing much less urine in the first days of a new dose; the label requires hydration, anti-hyperuricaemic drugs and blood tests around each ramp-up step.", action: "emergency", source: label("Venclexta"), protocols: ["tumour-lysis-syndrome-prevention-and-treatment"] },
      { symptom: "Neutropenic fever", threshold: "Temperature of 38 C or higher; grade 3 to 4 neutropenia is common.", action: "call-now", source: label("Venclexta"), protocols: ["febrile-neutropenia-first-hour"] },
    ],
  },
  {
    id: "immunomodulators",
    label: "Immunomodulatory drugs and proteasome inhibitors",
    // "imid" must be a word: unanchored it matches pyrimidine, imidazole and benzimidazole, which put the
    // lenalidomide boxed warning and the bortezomib and carfilzomib cards on eleven drugs including every
    // fluoropyrimidine. The skin round surfaced it, because topical fluorouracil is a mainstream skin cancer
    // treatment and those pages have few enough drugs for the cards to reach the top six.
    modalityRe: "cereblon|\\bimids?\\b|immunomodulatory|proteasome",
    flags: [
      { symptom: "Blood clot (lenalidomide, pomalidomide, thalidomide)", threshold: "A swollen painful calf, or sudden breathlessness with chest pain; venous and arterial thromboembolism is a boxed warning and blood-thinning prophylaxis is recommended.", action: "emergency", source: label("Revlimid"), protocols: ["vte-risk-assessment-and-thromboprophylaxis-ambulatory", "cancer-associated-vte-treatment"] },
      { symptom: "Neutropenic fever", threshold: "Temperature of 38 C or higher; haematologic toxicity is a boxed warning for lenalidomide.", action: "call-now", source: label("Revlimid"), protocols: ["febrile-neutropenia-first-hour"] },
      { symptom: "Numbness or pain in hands and feet (bortezomib)", threshold: "Tingling, burning or numbness that affects walking or using the hands; peripheral neuropathy is a labelled warning and doses are adjusted at grade 2.", action: "call-today", source: label("Velcade"), protocols: ["chemotherapy-induced-peripheral-neuropathy-assessment-and-prevention"] },
      { symptom: "Breathlessness or swelling (carfilzomib)", threshold: "New breathlessness, swollen ankles, chest pain or palpitations; cardiac toxicities including heart failure are labelled warnings.", action: "call-now", source: label("Kyprolis"), protocols: ["cardio-oncology-risk-assessment-and-cardiac-surveillance"] },
      { symptom: "Rash that blisters", threshold: "Blistering or peeling skin; severe cutaneous reactions including Stevens-Johnson syndrome are labelled warnings for lenalidomide and pomalidomide.", action: "emergency", source: label("Revlimid") },
    ],
  },
  // ---- Drug-scoped side-effect lines, added 18 November 2026. Six care protocols had no "when to call" line. The
  // class cards could not carry them: the kinase inhibitor card reaches every kinase inhibitor, and a line about
  // dasatinib's fluid retention there would be read by people on drugs that do not cause it. So each line sits in a
  // set of its own, scoped by `drugIds` to the one product whose leaflet is quoted, and names that product in its
  // `symptom` (outside brackets, so that the protocol's page, which keeps one line per symptom read without its
  // bracket, shows each product's line). The threshold quotes the leaflet in quotation marks, word for word, and the
  // action is no more urgent than the leaflet's own time word: "immediately", "straight away" or "right away" is
  // call-now; "tell your doctor" with no time word is call-today. Products of these protocols whose leaflets give no
  // such instruction have no line: capmatinib, tepotinib and amivantamab (swelling is listed as a side effect only),
  // cetuximab (low magnesium is listed only), lenvatinib, tivozanib, vandetanib, sorafenib and fruquintinib (thyroid
  // tests are described, with nothing for the reader to report).
  {
    id: "tagraxofusp-capillary-leak",
    label: "Tagraxofusp",
    drugIds: ["tagraxofusp"],
    flags: [
      { symptom: "Weight gain, swelling or breathlessness on tagraxofusp", threshold: "Weight gain, swelling or puffiness, passing water less often, difficulty breathing, a swollen abdomen or general tiredness, usually coming on quickly: possible capillary leak syndrome. The package leaflet lists these under \"Tell your doctor immediately if you experience the following side effects, as you may need urgent medical attention\".", action: "call-now", source: EMA_ELZONRIS_RF, protocols: ["capillary-leak-syndrome-on-anticancer-drugs"] },
    ],
  },
  {
    id: "dinutuximab-capillary-leak",
    label: "Dinutuximab and dinutuximab beta",
    drugIds: ["dinutuximab"],
    flags: [
      { symptom: "Rapid swelling, a drop in blood pressure or breathing difficulty on dinutuximab beta", threshold: "The package leaflet for dinutuximab beta says \"Tell your doctor or nurse immediately if you have any of the following\" and lists \"rapid swelling of arms, legs and other body parts, rapid drop in blood pressure, light-headedness and breathing difficulties (capillary leak syndrome)\".", action: "call-now", source: EMA_QARZIBA_RF, protocols: ["capillary-leak-syndrome-on-anticancer-drugs"] },
    ],
  },
  {
    id: "aldesleukin-capillary-leak",
    label: "Aldesleukin (interleukin-2)",
    drugIds: ["aldesleukin"],
    flags: [
      { symptom: "Low blood pressure, breathlessness or swelling on aldesleukin", threshold: "New or worsening symptoms of low blood pressure, breathlessness or swelling. There is no patient leaflet in the US label; its advice to the treating team reads \"Advise patients about the risk of capillary leak syndrome and to inform their healthcare provider immediately if they develop new or worsening symptoms of hypotension, dyspnea, or edema\".", action: "call-now", source: DM_PROLEUKIN_RF, protocols: ["capillary-leak-syndrome-on-anticancer-drugs"] },
    ],
  },
  {
    id: "imatinib-fluid-retention",
    label: "Imatinib",
    drugIds: ["imatinib"],
    flags: [
      { symptom: "Rapid weight gain on imatinib", threshold: "Putting on weight very quickly. The package leaflet says \"During treatment with Glivec, tell your doctor straight away if you put on weight very quickly. Glivec may cause your body to retain water (severe fluid retention).\"", action: "call-now", source: EMA_GLIVEC_RF, protocols: ["fluid-retention-and-effusions-on-kinase-inhibitors"] },
    ],
  },
  {
    id: "dasatinib-fluid-retention",
    label: "Dasatinib",
    drugIds: ["dasatinib"],
    flags: [
      { symptom: "Swelling, weight gain, breathlessness or a dry cough on dasatinib", threshold: "Swelling all over the body, weight gain, shortness of breath (especially with little activity or at rest), a dry cough, or chest pain on taking a deep breath. The US patient information says \"Call your healthcare provider right away if you get any of these symptoms during treatment with SPRYCEL\".", action: "call-now", source: DM_SPRYCEL_RF, protocols: ["fluid-retention-and-effusions-on-kinase-inhibitors", "breathlessness-and-cough-during-anticancer-treatment"] },
    ],
  },
  {
    id: "avapritinib-fluid-retention",
    label: "Avapritinib",
    drugIds: ["avapritinib"],
    flags: [
      { symptom: "Rapid weight gain, swelling or shortness of breath on avapritinib", threshold: "The package leaflet says \"During treatment with this medicine, tell your doctor straight away if you put on weight very quickly, develop swelling of your face or limbs, have difficulty breathing or become short of breath. This medicine may cause your body to retain water (severe fluid retention can occur in patients with AdvSM).\" AdvSM is advanced systemic mastocytosis.", action: "call-now", source: EMA_AYVAKYT_RF, protocols: ["fluid-retention-and-effusions-on-kinase-inhibitors"] },
      { symptom: "New forgetfulness, confusion, drowsiness or a change in mood or behaviour on avapritinib", threshold: "Forgetfulness, confusion, getting lost, trouble thinking, drowsiness or trouble staying awake, difficulty finding words, seeing or hearing things that are not there, or a change in mood or behaviour. The US patient information says \"Cognitive side effects can happen during treatment with AYVAKIT and can be severe. Tell your healthcare provider if you develop any new or worsening cognitive symptoms\".", action: "call-today", source: DM_AYVAKIT_RF, protocols: ["cognitive-and-mood-effects-on-lorlatinib-and-avapritinib"] },
    ],
  },
  {
    id: "erdafitinib-high-phosphate",
    label: "Erdafitinib",
    drugIds: ["erdafitinib"],
    flags: [
      { symptom: "Painful skin lesions, muscle cramps or tingling around the mouth on erdafitinib", threshold: "Under high phosphate levels in the blood, the US patient information says \"Tell your healthcare provider right away if you develop painful skin lesions, any muscle cramps, or numbness or tingling around your mouth.\"", action: "call-now", source: DM_BALVERSA_RF, protocols: ["hyperphosphataemia-on-fgfr-inhibitors"] },
      { symptom: "Blurred vision, loss of vision or other changes in sight on erdafitinib", threshold: "The US patient information says \"Tell your healthcare provider right away if you develop blurred vision, loss of vision or other visual changes.\"", action: "call-now", source: DM_BALVERSA_RF, protocols: ["retinal-and-eye-effects-on-fgfr-mek-and-alk-inhibitors"] },
    ],
  },
  {
    id: "pemigatinib-high-phosphate",
    label: "Pemigatinib",
    drugIds: ["pemigatinib"],
    flags: [
      { symptom: "Muscle cramps, numbness or tingling around the mouth on pemigatinib", threshold: "Under high phosphate levels in the blood, the US patient information says \"Tell your healthcare provider right away if you develop any muscle cramps, or numbness or tingling around your mouth.\"", action: "call-now", source: DM_PEMAZYRE_RF, protocols: ["hyperphosphataemia-on-fgfr-inhibitors"] },
      { symptom: "Blurred vision, flashes of light or black spots on pemigatinib", threshold: "The US patient information says \"Tell your healthcare provider right away if you develop any changes in your vision during treatment with PEMAZYRE, including: blurred vision, flashes of light, or see black spots. You may need to see an eye specialist right away.\"", action: "call-now", source: DM_PEMAZYRE_RF, protocols: ["retinal-and-eye-effects-on-fgfr-mek-and-alk-inhibitors"] },
    ],
  },
  {
    id: "futibatinib-high-phosphate",
    label: "Futibatinib",
    drugIds: ["futibatinib"],
    flags: [
      { symptom: "Muscle cramps, numbness or tingling around the mouth on futibatinib", threshold: "Under high phosphate levels in the blood, the US patient information says \"Tell your healthcare provider right away if you develop any muscle cramps, or numbness or tingling around your mouth.\"", action: "call-now", source: DM_LYTGOBI_RF, protocols: ["hyperphosphataemia-on-fgfr-inhibitors"] },
      { symptom: "Blurred vision, flashes of light or black spots on futibatinib", threshold: "The US patient information says \"Tell your healthcare provider right away if you develop any changes in your vision during treatment with LYTGOBI, including blurred vision, flashes of light, or seeing black spots. You may need to see an eye specialist right away.\"", action: "call-now", source: DM_LYTGOBI_RF, protocols: ["retinal-and-eye-effects-on-fgfr-mek-and-alk-inhibitors"] },
    ],
  },
  {
    id: "panitumumab-low-magnesium",
    label: "Panitumumab",
    drugIds: ["panitumumab"],
    flags: [
      { symptom: "Muscle cramps, tingling, palpitations or feeling faint on panitumumab", threshold: "Panitumumab can lower magnesium and potassium in the blood. Cancer Research UK says \"Let your doctor or nurse know if you have cramping in your arm or leg muscles, tingling or numbness, palpitations (feeling your heart beat irregularly), or if you feel faint.\"", action: "call-today", source: CRUK_PANITUMUMAB_RF, protocols: ["hypomagnesaemia-on-egfr-antibodies"] },
    ],
  },
  {
    id: "sunitinib-underactive-thyroid",
    label: "Sunitinib",
    drugIds: ["sunitinib"],
    flags: [
      { symptom: "Tiredness, feeling cold or a deeper voice on sunitinib", threshold: "Possible signs of an underactive thyroid. The package leaflet says \"Sutent can cause thyroid gland problems. Tell your doctor if you get tired more easily, generally feel colder than other people, or your voice deepens whilst taking Sutent.\"", action: "call-today", source: EMA_SUTENT_RF, protocols: ["hypothyroidism-on-tyrosine-kinase-inhibitors"] },
    ],
  },
  {
    id: "axitinib-underactive-thyroid",
    label: "Axitinib",
    drugIds: ["axitinib"],
    flags: [
      { symptom: "Tiredness, feeling cold or a deeper voice on axitinib", threshold: "Possible signs of an underactive thyroid. The package leaflet says \"Inlyta can cause thyroid gland problems. Tell your doctor if you get tired more easily, generally feel colder than other people, or your voice deepens whilst taking this medicine.\"", action: "call-today", source: EMA_INLYTA_RF, protocols: ["hypothyroidism-on-tyrosine-kinase-inhibitors"] },
    ],
  },
  {
    id: "cabozantinib-underactive-thyroid",
    label: "Cabozantinib",
    drugIds: ["cabozantinib"],
    flags: [
      { symptom: "Tiredness, feeling cold or a deeper voice on cabozantinib", threshold: "Possible signs of an underactive thyroid. The package leaflet, in its note on thyroid problems, says \"Tell your doctor if you get tired more easily, generally feel colder than other people, or your voice deepens whilst taking this medicine.\"", action: "call-today", source: EMA_CABOMETYX_RF, protocols: ["hypothyroidism-on-tyrosine-kinase-inhibitors"] },
    ],
  },
  {
    id: "pazopanib-underactive-thyroid",
    label: "Pazopanib",
    drugIds: ["pazopanib"],
    flags: [
      { symptom: "Marked weight gain or tiredness on pazopanib", threshold: "The package leaflet says \"Votrient can lower the amount of thyroid hormone produced in your body. This can result in weight increase and tiredness.\" and \"Tell your doctor if you notice significant weight gain or tiredness.\"", action: "call-today", source: EMA_VOTRIENT_RF, protocols: ["hypothyroidism-on-tyrosine-kinase-inhibitors"] },
      { symptom: "A cough that will not go away, or shortness of breath, on pazopanib", threshold: "The US Medication Guide says \"VOTRIENT may cause lung problems that may lead to death. Tell your healthcare provider right away if you get a cough that will not go away or shortness of breath.\"", action: "call-now", source: DM_VOTRIENT_RF, protocols: ["breathlessness-and-cough-during-anticancer-treatment"] },
    ],
  },
  {
    id: "glofitamab-tumour-flare",
    label: "Glofitamab",
    drugIds: ["glofitamab"],
    flags: [
      { symptom: "Tumour flare on glofitamab", threshold: "Tender swollen lymph nodes, chest pain, difficulty breathing, or pain at the site of the tumour. The package leaflet lists tumour flare under \"Tell your doctor straight away if you get any of the serious side effects listed below – you may need urgent medical treatment.\"", action: "call-now", source: EMA_COLUMVI_RF, protocols: ["tumour-flare-on-bispecific-antibodies-and-immunomodulatory-drugs"] },
    ],
  },
  {
    id: "mosunetuzumab-tumour-flare",
    label: "Mosunetuzumab",
    drugIds: ["mosunetuzumab"],
    flags: [
      { symptom: "Tumour flare on mosunetuzumab", threshold: "Tender swollen lymph nodes, chest pain, cough or difficulty breathing, or pain at the site of the tumour. The package leaflet lists tumour flare under \"Tell your doctor straight away if you notice any of the symptoms of the following serious side effects.\"", action: "call-now", source: EMA_LUNSUMIO_RF, protocols: ["tumour-flare-on-bispecific-antibodies-and-immunomodulatory-drugs"] },
    ],
  },
  {
    id: "epcoritamab-tumour-flare",
    label: "Epcoritamab",
    drugIds: ["epcoritamab"],
    flags: [
      { symptom: "Tumour flare on epcoritamab", threshold: "Tender swollen lymph nodes, chest pain, cough or difficulty breathing, or pain at the site of the tumour. The package leaflet lists tumour flare under \"Tell your doctor straight away if you get symptoms of any of the side effects listed below, during or after treatment with Tepkinly. You may need additional medical treatment.\"", action: "call-now", source: EMA_TEPKINLY_RF, protocols: ["tumour-flare-on-bispecific-antibodies-and-immunomodulatory-drugs"] },
    ],
  },
  {
    id: "lenalidomide-tumour-flare",
    label: "Lenalidomide",
    drugIds: ["lenalidomide"],
    flags: [
      { symptom: "Tumour flare on lenalidomide", threshold: "The label describes tumour flare in people treated for lymphoma or chronic lymphocytic leukaemia. The US Medication Guide says \"Tell your healthcare provider if you get any of these symptoms of tumor flare reaction during treatment with REVLIMID: tender swollen lymph nodes, low grade fever, pain, or rash.\"", action: "call-today", source: DM_REVLIMID_RF, protocols: ["tumour-flare-on-bispecific-antibodies-and-immunomodulatory-drugs"] },
    ],
  },
  // ---- Second round, 18 November 2026: one new card for each product, holding every line that product gained.
  // Where several products' lines would otherwise fill a protocol's four places with one problem, the wording is
  // chosen so the four shown differ: the radioligand titles are worded so the first four in order cover bleeding,
  // infection, anaemia and the kidneys, and the four skin-change lines carry the product in brackets so the
  // second-cancers page shows that warning once (`redFlagsForProtocol` keeps one line per symptom, read without
  // its bracket).
  {
    id: "bcg-intravesical-infection",
    label: "BCG into the bladder",
    drugIds: ["bcg-intravesical"],
    flags: [
      { symptom: "Fever and chills, joint or muscle pain, vomiting, a cough or a rash after BCG into the bladder", threshold: "Fever and chills, joint or muscle pain, feeling sick or vomiting, a cough, a skin rash or feeling extremely tired. These can be signs of a rare infection caused by BCG getting into the rest of the body, during treatment or some months after it. Cancer Research UK says \"Contact your doctor immediately if you have any of these symptoms or have a high temperature for more than 48 hours. Do not wait until your next appointment.\"", action: "call-now", source: CRUK_BCG_RF, protocols: ["bladder-symptoms-and-infection-after-intravesical-therapy"] },
      { symptom: "Bladder or flu-like symptoms that last more than 72 hours after BCG into the bladder", threshold: "Needing to pass urine often, pain on passing urine, blood in the urine, or flu-like symptoms such as tiredness, general aching and a raised temperature. Macmillan says \"These effects should get better in 48 to 72 hours. Tell your doctor straight away if they do not.\"", action: "call-now", source: MAC_BCG_RF, protocols: ["bladder-symptoms-and-infection-after-intravesical-therapy"] },
    ],
  },
  {
    id: "nogapendekin-alfa-bladder-symptoms",
    label: "Nogapendekin alfa inbakicept",
    drugIds: ["nogapendekin-alfa"],
    flags: [
      { symptom: "Severe or lasting bladder irritation or blood in the urine after nogapendekin alfa inbakicept", threshold: "Burning or discomfort in the bladder, or blood in the urine, that is severe or lasts a long time. The package leaflet says \"You may also notice blood in the urine for up to 24 hours after treatment. These symptoms are usually mild and temporary. Tell your doctor or nurse right away if your symptoms are severe or last a long time.\" It does not say how long a long time is.", action: "call-now", source: EMA_ANKTIVA_RF, protocols: ["bladder-symptoms-and-infection-after-intravesical-therapy"] },
    ],
  },
  {
    id: "nadofaragene-firadenovec-urine-infection",
    label: "Nadofaragene firadenovec",
    drugIds: ["nadofaragene-firadenovec"],
    flags: [
      { symptom: "Signs of a urine infection before or during nadofaragene firadenovec", threshold: "Cloudy or bloody urine, pain or burning when passing urine, fever, pressure or cramping in the lower tummy or back, or a strong need to pass urine often. The package leaflet says \"Tell your doctor if you have signs of infection or inflammation of your bladder or kidneys before or during treatment with ADSTILADRIN\".", action: "call-today", source: EMA_ADSTILADRIN_RF, protocols: ["bladder-symptoms-and-infection-after-intravesical-therapy"] },
    ],
  },
  {
    id: "lutathera-blood-counts",
    label: "Lutetium-177 dotatate (Lutathera)",
    drugIds: ["lutathera"],
    flags: [
      { symptom: "Bleeding or bruising more easily on Lutathera", threshold: "Possible signs of a low platelet count. Among its serious side effects the package leaflet lists \"Bleeding or bruising more easily than normal or difficulty to stop bleeding\" and it says \"If you experience any serious side effects, tell your doctor right away.\"", action: "call-now", source: EMA_LUTATHERA_RF, protocols: ["blood-count-and-kidney-monitoring-during-radioligand-therapy"] },
      { symptom: "Sore throat, fever or mouth ulcers on Lutathera", threshold: "Possible signs of a low white blood cell count. Among its serious side effects the package leaflet lists \"Infections with signs such as fever, sore throat or mouth ulcers\" and it says \"If you experience any serious side effects, tell your doctor right away.\"", action: "call-now", source: EMA_LUTATHERA_RF, protocols: ["blood-count-and-kidney-monitoring-during-radioligand-therapy"] },
      { symptom: "Tiredness, weakness, pale skin or shortness of breath on Lutathera", threshold: "Possible signs of a low red blood cell count. Among its serious side effects the package leaflet lists \"Tiredness, weakness, pale skin or shortness of breath\" and it says \"If you experience any serious side effects, tell your doctor right away.\"", action: "call-now", source: EMA_LUTATHERA_RF, protocols: ["blood-count-and-kidney-monitoring-during-radioligand-therapy"] },
      { symptom: "Passing urine less often or in smaller amounts on Lutathera", threshold: "Possible signs of kidney problems. Among its serious side effects the package leaflet lists \"Passing urine less often than usual or passing much smaller amounts of urine than usual\" and it says \"If you experience any serious side effects, tell your doctor right away.\"", action: "call-now", source: EMA_LUTATHERA_RF, protocols: ["blood-count-and-kidney-monitoring-during-radioligand-therapy"] },
    ],
  },
  {
    id: "pluvicto-blood-counts",
    label: "Lutetium-177 vipivotide tetraxetan (Pluvicto)",
    drugIds: ["pluvicto"],
    flags: [
      { symptom: "Frequent infections, with fever, sore throat or mouth ulcers, on Pluvicto", threshold: "Possible signs of a low white blood cell count. The package leaflet lists \"frequent infections with signs such as fever, sore throat or mouth ulcers\" and says \"If you experience any of the following serious side effects, tell your nuclear medicine doctor right away.\"", action: "call-now", source: EMA_PLUVICTO_RF, protocols: ["blood-count-and-kidney-monitoring-during-radioligand-therapy"] },
      { symptom: "Pale skin, tiredness, weakness or shortness of breath on Pluvicto", threshold: "Possible signs of a low red blood cell count. The package leaflet lists \"tiredness, weakness, pale skin or shortness of breath\" and says \"If you experience any of the following serious side effects, tell your nuclear medicine doctor right away.\"", action: "call-now", source: EMA_PLUVICTO_RF, protocols: ["blood-count-and-kidney-monitoring-during-radioligand-therapy"] },
      { symptom: "Taking longer than normal to stop bleeding, or bruising easily, on Pluvicto", threshold: "Possible signs of a low platelet count. The package leaflet lists \"bleeding or bruising more easily than normal or bleeding for longer than normal\" and says \"If you experience any of the following serious side effects, tell your nuclear medicine doctor right away.\"", action: "call-now", source: EMA_PLUVICTO_RF, protocols: ["blood-count-and-kidney-monitoring-during-radioligand-therapy"] },
      { symptom: "Smaller amounts of urine, or passing urine less often, on Pluvicto", threshold: "A possible sign of kidney problems. The package leaflet lists \"passing urine less often or in much smaller amounts than usual\" and says \"If you experience any of the following serious side effects, tell your nuclear medicine doctor right away.\"", action: "call-now", source: EMA_PLUVICTO_RF, protocols: ["blood-count-and-kidney-monitoring-during-radioligand-therapy"] },
    ],
  },
  {
    id: "belzutifan-low-oxygen",
    label: "Belzutifan",
    drugIds: ["belzutifan"],
    flags: [
      { symptom: "Shortness of breath or a fast heartbeat on belzutifan", threshold: "Possible signs of a low oxygen level in the body. The US Medication Guide says \"Tell your healthcare provider or get medical help right away if you get symptoms of low oxygen in your body, including shortness of breath or fast heartbeat.\"", action: "call-now", source: DM_WELIREG_RF, protocols: ["breathlessness-and-cough-during-anticancer-treatment"] },
    ],
  },
  {
    id: "sotorasib-lung-inflammation",
    label: "Sotorasib",
    drugIds: ["sotorasib"],
    flags: [
      { symptom: "New or worsening shortness of breath, cough or fever on sotorasib", threshold: "The US patient information says \"LUMAKRAS may cause inflammation of the lungs that can lead to death. Tell your healthcare provider or get emergency medical help right away if you have new or worsening shortness of breath, cough, or fever.\"", action: "call-now", source: DM_LUMAKRAS_RF, protocols: ["breathlessness-and-cough-during-anticancer-treatment"] },
    ],
  },
  {
    id: "adagrasib-lung-inflammation",
    label: "Adagrasib",
    drugIds: ["adagrasib"],
    flags: [
      { symptom: "New or worsening shortness of breath, cough or fever on adagrasib", threshold: "The US patient information says \"KRAZATI may cause inflammation of the lungs that can lead to death. Tell your healthcare provider or get emergency medical help right away if you have new or worsening shortness of breath, cough, or fever.\"", action: "call-now", source: DM_KRAZATI_RF, protocols: ["breathlessness-and-cough-during-anticancer-treatment"] },
    ],
  },
  {
    id: "zenocutuzumab-lung-problems",
    label: "Zenocutuzumab",
    drugIds: ["zenocutuzumab"],
    flags: [
      { symptom: "New or worsening trouble breathing, cough or fever on zenocutuzumab", threshold: "Trouble breathing, shortness of breath, a cough or a fever. The US patient information says \"BIZENGRI can cause serious lung problems that may be life-threatening.\" and \"Tell your healthcare provider right away if you develop any new or worsening symptoms of lung problems\".", action: "call-now", source: DM_BIZENGRI_RF, protocols: ["breathlessness-and-cough-during-anticancer-treatment"] },
    ],
  },
  {
    id: "atezolizumab-lung-problems",
    label: "Atezolizumab",
    drugIds: ["atezolizumab"],
    flags: [
      { symptom: "New or worsening cough, shortness of breath or chest pain on atezolizumab", threshold: "The US Medication Guide lists cough, shortness of breath and chest pain under lung problems and says \"Call or see your healthcare provider right away if you develop any new or worsening signs or symptoms\".", action: "call-now", source: DM_TECENTRIQ_RF, protocols: ["breathlessness-and-cough-during-anticancer-treatment"] },
    ],
  },
  {
    id: "durvalumab-lung-inflammation",
    label: "Durvalumab",
    drugIds: ["durvalumab"],
    flags: [
      { symptom: "New or worsening cough, shortness of breath or chest pain on durvalumab", threshold: "The package leaflet says \"If you have any of the following, call or see your doctor straight away.\" and lists \"inflammation of the lungs: symptoms may include new or worsening cough, shortness of breath or chest pain\".", action: "call-now", source: EMA_IMFINZI_RF, protocols: ["breathlessness-and-cough-during-anticancer-treatment"] },
    ],
  },
  {
    id: "carfilzomib-breathing",
    label: "Carfilzomib",
    drugIds: ["carfilzomib"],
    flags: [
      { symptom: "Difficulty breathing, wheezing or a cough on carfilzomib", threshold: "Difficulty breathing, shortness of breath at rest or with activity, rapid breathing, wheezing or a cough, \"which can be signs of lung toxicity\"; or chest pains, shortness of breath or swollen feet, \"which may be symptoms of heart problems\". The package leaflet, in its own wording, says \"Tell your doctor straight away if you get notice any of the following symptoms\".", action: "call-now", source: EMA_KYPROLIS_RF, protocols: ["breathlessness-and-cough-during-anticancer-treatment"] },
    ],
  },
  {
    id: "lorlatinib-mood-and-pancreatitis",
    label: "Lorlatinib",
    drugIds: ["lorlatinib"],
    flags: [
      { symptom: "Changes in mood, memory or personality, confusion, or seeing or hearing things that are not real, on lorlatinib", threshold: "A change in mood (including depression, euphoria and mood swings), irritability, aggression, agitation, anxiety, a change in personality, episodes of confusion, or believing, seeing or hearing things that are not real. The package leaflet lists these as \"mental status changes, mood or memory problems\" under \"Tell your doctor immediately if you develop:\".", action: "call-now", source: EMA_LORVIQUA_RF, protocols: ["cognitive-and-mood-effects-on-lorlatinib-and-avapritinib"] },
      { symptom: "Back or tummy pain, yellowing of the skin or eyes, or feeling or being sick on lorlatinib", threshold: "Under \"Tell your doctor immediately if you develop:\" the package leaflet lists \"pain in the back or abdomen (belly), yellowing of the skin and eyes (jaundice), nausea or vomiting. These symptoms could be signs of pancreatitis.\"", action: "call-now", source: EMA_LORVIQUA_RF, protocols: ["raised-lipids-and-weight-gain-on-lorlatinib-bexarotene-and-elacestrant"] },
    ],
  },
  {
    id: "acalabrutinib-headache",
    label: "Acalabrutinib",
    drugIds: ["acalabrutinib"],
    flags: [
      { symptom: "A headache that lasts a long time on acalabrutinib", threshold: "The US patient information lists \"headache that lasts a long time\" among the signs of bleeding, with blood in the stools, pink or brown urine, dizziness, weakness, confusion and changes in speech. It says \"Tell your healthcare provider right away if you have any signs or symptoms of bleeding\".", action: "call-now", source: DM_CALQUENCE_RF, protocols: ["headache-on-anticancer-drugs"] },
      { symptom: "A severe headache or other sudden signs of a stroke on acalabrutinib", threshold: "A severe headache, weakness or numbness down one side of the face or body, difficulty speaking, confusion and memory loss, blurred vision, or feeling dizzy or unsteady. Macmillan says the treatment \"can increase the risk of bleeding on the brain\" and \"If you have any of these symptoms during treatment or after it ends, it is important to either\" \"contact the hospital straight away on the 24-hour number\" or \"go to the hospital straight away or call 999\". It adds \"You should not drive yourself to hospital.\"", action: "call-now", source: MAC_ACALABRUTINIB_RF, protocols: ["headache-on-anticancer-drugs"] },
    ],
  },
  {
    id: "blinatumomab-headache",
    label: "Blinatumomab",
    drugIds: ["blinatumomab"],
    flags: [
      { symptom: "Headache on blinatumomab", threshold: "The US Medication Guide lists headache among the symptoms of cytokine release syndrome and infusion reactions, and again among the symptoms of neurological problems. It says \"Call your healthcare provider or get emergency medical help right away if you get any of the symptoms listed below.\"", action: "call-now", source: DM_BLINCYTO_RF, protocols: ["headache-on-anticancer-drugs"] },
    ],
  },
  {
    id: "ifosfamide-bladder-and-brain",
    label: "Ifosfamide",
    drugIds: ["ifosfamide"],
    flags: [
      { symptom: "Blood in the urine, or stinging or discomfort on passing urine, on ifosfamide", threshold: "Discomfort or stinging when you pass urine, or blood in your urine. Macmillan says \"Contact the hospital straight away on the 24-hour number if you have any of the following when you pee\".", action: "call-now", source: MAC_IFOSFAMIDE_RF, protocols: ["ifosfamide-bladder-protection-and-encephalopathy"] },
      { symptom: "Drowsiness, confusion, blurred vision, problems moving or speaking, or a fit on ifosfamide", threshold: "Feeling drowsy or confused, blurred vision, problems with moving or speaking, or a fit (seizure). Macmillan says \"If you have any of these symptoms during treatment or after it finishes, it is important to either\" \"contact the hospital straight away on the 24-hour number\" or \"go to the hospital straight away\".", action: "call-now", source: MAC_IFOSFAMIDE_RF, protocols: ["ifosfamide-bladder-protection-and-encephalopathy"] },
    ],
  },
  {
    id: "binimetinib-muscle-and-eye",
    label: "Binimetinib",
    drugIds: ["binimetinib"],
    flags: [
      { symptom: "Muscle pain, cramps, stiffness or spasm, or dark urine, on binimetinib", threshold: "The package leaflet says \"Mektovi can cause breakdown of muscle (rhabdomyolysis).\" and \"Talk to your doctor immediately if you get muscle pain, cramps, stiffness, spasm, dark urine.\"", action: "call-now", source: EMA_MEKTOVI_RF, protocols: ["joint-and-muscle-pain-on-anticancer-drugs"] },
      { symptom: "Vision changes, coloured dots or halos, or eye pain, swelling or redness on binimetinib", threshold: "Blurred vision, loss of vision or other vision changes, seeing coloured dots or halos (a blurred outline around objects), or eye pain, swelling or redness. The US Medication Guide says \"Tell your healthcare provider right away if you develop any new or worsening symptoms of eye problems\".", action: "call-now", source: DM_MEKTOVI_RF, protocols: ["retinal-and-eye-effects-on-fgfr-mek-and-alk-inhibitors"] },
    ],
  },
  {
    id: "cobimetinib-muscle-and-eye",
    label: "Cobimetinib",
    drugIds: ["cobimetinib"],
    flags: [
      { symptom: "Muscle aches, spasms or weakness, or dark, reddish urine, on cobimetinib", threshold: "Muscle aches or pain, muscle spasms and weakness, or dark, reddish urine. The US patient information says \"COTELLIC can cause muscle problems that can be severe.\" and, of this list, \"Tell your healthcare provider right away if you get any of these symptoms\".", action: "call-now", source: DM_COTELLIC_RF, protocols: ["joint-and-muscle-pain-on-anticancer-drugs"] },
      { symptom: "Blurred or partly missing vision, loss of vision or halos on cobimetinib", threshold: "Blurred vision, partly missing vision or loss of vision, seeing halos, or any other change in vision. Of this list the US patient information says \"Tell your healthcare provider right away if you get any of these symptoms\" and \"Your healthcare provider should check your eyes if you notice any of the symptoms above.\"", action: "call-now", source: DM_COTELLIC_RF, protocols: ["retinal-and-eye-effects-on-fgfr-mek-and-alk-inhibitors"] },
    ],
  },
  {
    id: "avutometinib-defactinib-muscle",
    label: "Avutometinib with defactinib",
    drugIds: ["avutometinib-defactinib"],
    flags: [
      { symptom: "Weakness, lasting muscle or bone pain, or dark urine on avutometinib with defactinib", threshold: "Weakness or difficulty moving the arms and legs, muscle or bone aches or pain that does not go away, or dark, red urine or passing less urine. These can be signs of a raised level of creatine phosphokinase (CPK), an enzyme in the blood that can be a sign of muscle damage. The US patient information says \"Tell your healthcare provider if you get any signs or symptoms of increased CPK\".", action: "call-today", source: DM_AVMAPKI_RF, protocols: ["joint-and-muscle-pain-on-anticancer-drugs"] },
    ],
  },
  {
    id: "letrozole-joint-pain",
    label: "Letrozole",
    drugIds: ["letrozole"],
    flags: [
      { symptom: "A sudden attack of pain in a joint on letrozole", threshold: "For mild aches in the muscles or bones the NHS suggests asking a pharmacist about a painkiller. It adds \"If you have a sudden attack of pain in a joint ask a doctor for advice urgently.\"", action: "call-today", source: NHS_LETROZOLE_RF, protocols: ["joint-and-muscle-pain-on-anticancer-drugs"] },
    ],
  },
  {
    id: "anastrozole-joint-pain",
    label: "Anastrozole",
    drugIds: ["anastrozole"],
    flags: [
      { symptom: "A sudden attack of pain in a joint on anastrozole", threshold: "For mild aches in the muscles and bones the NHS suggests asking a pharmacist about a painkiller. It adds \"If you have a sudden attack of pain in a joint ask a doctor for advice urgently.\"", action: "call-today", source: NHS_ANASTROZOLE_RF, protocols: ["joint-and-muscle-pain-on-anticancer-drugs"] },
    ],
  },
  {
    id: "nirogacestat-low-phosphate-and-potassium",
    label: "Nirogacestat",
    drugIds: ["nirogacestat"],
    flags: [
      { symptom: "Muscle pain or weakness on nirogacestat", threshold: "The team checks phosphate and potassium with blood tests during treatment and may give medicines if either is low. The US patient information says \"Tell your healthcare provider if you develop any muscle pain or weakness.\"", action: "call-today", source: DM_OGSIVEO_RF, protocols: ["low-potassium-and-low-phosphate-on-anticancer-drugs"] },
    ],
  },
  {
    id: "abiraterone-low-potassium",
    label: "Abiraterone",
    drugIds: ["abiraterone"],
    flags: [
      { symptom: "Muscle weakness, muscle twitches or a pounding heartbeat on abiraterone", threshold: "The EU package leaflet says \"Stop taking ZYTIGA and see a doctor immediately if you notice any of the following:\" and lists \"Muscle weakness, muscle twitches or a pounding heart beat (palpitations). These may be signs that the level of potassium in your blood is low.\"", action: "call-now", source: EMA_ZYTIGA_RF, protocols: ["low-potassium-and-low-phosphate-on-anticancer-drugs"] },
    ],
  },
  {
    id: "quizartinib-heart-rhythm-and-salts",
    label: "Quizartinib",
    drugIds: ["quizartinib"],
    flags: [
      { symptom: "Diarrhoea or vomiting, an irregular heartbeat, dizziness or fainting on quizartinib", threshold: "Quizartinib can change the heart's rhythm, and the team checks the heart tracing and the potassium and magnesium levels before and during treatment. The US Medication Guide says \"Tell your healthcare provider right away if you have an irregular heartbeat or feel dizzy, lightheaded, or faint, or have diarrhea or vomiting.\"", action: "call-now", source: DM_VANFLYTA_RF, protocols: ["low-potassium-and-low-phosphate-on-anticancer-drugs"] },
    ],
  },
  {
    id: "bexarotene-pancreatitis",
    label: "Bexarotene",
    drugIds: ["bexarotene"],
    flags: [
      { symptom: "Nausea that will not go away, vomiting, or tummy or back pain on bexarotene", threshold: "Possible signs of an inflamed pancreas (pancreatitis). The US patient information says \"Tell your healthcare provider right away if you develop signs or symptoms of pancreatitis during treatment with TARGRETIN\".", action: "call-now", source: DM_TARGRETIN_RF, protocols: ["raised-lipids-and-weight-gain-on-lorlatinib-bexarotene-and-elacestrant"] },
    ],
  },
  {
    id: "trametinib-eye-problems",
    label: "Trametinib",
    drugIds: ["trametinib"],
    flags: [
      { symptom: "Vision changes, coloured dots or halos, or eye pain, swelling or redness on trametinib", threshold: "Blurred vision, loss of vision or other vision changes, seeing coloured dots or a halo (a blurred outline around objects), or eye pain, swelling or redness. The US patient information says \"MEKINIST can cause severe eye problems that might lead to blindness. Call your healthcare provider right away if you get these symptoms of eye problems\".", action: "call-now", source: DM_MEKINIST_RF, protocols: ["retinal-and-eye-effects-on-fgfr-mek-and-alk-inhibitors"] },
    ],
  },
  {
    id: "selumetinib-eye-problems",
    label: "Selumetinib",
    drugIds: ["selumetinib"],
    flags: [
      { symptom: "Blurred vision, loss of vision or dark spots in vision on selumetinib", threshold: "Blurred vision, loss of vision, dark spots in your vision (floaters) or other changes to your sight. The US patient information says \"KOSELUGO can cause eye problems that can lead to blindness.\" and \"Tell your healthcare provider right away if you get new or worsening vision changes\".", action: "call-now", source: DM_KOSELUGO_RF, protocols: ["retinal-and-eye-effects-on-fgfr-mek-and-alk-inhibitors"] },
    ],
  },
  {
    id: "crizotinib-vision",
    label: "Crizotinib",
    drugIds: ["crizotinib"],
    flags: [
      { symptom: "Any new vision problem, loss of vision or change in vision on crizotinib", threshold: "Double vision, flashes of light, blurry vision, light hurting the eyes, or new or increased floaters. The US Medication Guide says \"Tell your healthcare provider right away if you have any new vision problems, loss of vision or any change in vision\".", action: "call-now", source: DM_XALKORI_RF, protocols: ["retinal-and-eye-effects-on-fgfr-mek-and-alk-inhibitors"] },
    ],
  },
  {
    id: "brigatinib-vision",
    label: "Brigatinib",
    drugIds: ["brigatinib"],
    flags: [
      { symptom: "Any loss of vision or change in vision on brigatinib", threshold: "Double vision, flashes of light, blurry vision, light hurting the eyes, or new or increased floaters. The US patient information says \"Tell your healthcare provider right away if you have any loss of vision or any change in vision\".", action: "call-now", source: DM_ALUNBRIG_RF, protocols: ["retinal-and-eye-effects-on-fgfr-mek-and-alk-inhibitors"] },
    ],
  },
  {
    id: "datopotamab-deruxtecan-eye-problems",
    label: "Datopotamab deruxtecan",
    drugIds: ["datopotamab-deruxtecan"],
    flags: [
      { symptom: "New or worsening eye problems on datopotamab deruxtecan", threshold: "The US Medication Guide says \"Tell your healthcare provider right away if you develop any new or worsening eye problems during treatment with DATROWAY, including dry eyes, eye pain, eye redness, eye swelling, eye irritation, increased tears, feeling like something is in your eyes, discharge from your eyes, eye crusting, sensitivity to light, blurred vision, or vision changes.\"", action: "call-now", source: DM_DATROWAY_RF, protocols: ["retinal-and-eye-effects-on-fgfr-mek-and-alk-inhibitors"] },
    ],
  },
  {
    id: "camizestrant-vision",
    label: "Camizestrant",
    drugIds: ["camizestrant"],
    flags: [
      { symptom: "Flashes of light, double or blurry vision, or new floaters on camizestrant", threshold: "Flashes of light, double or blurry vision, sensitivity to light, or new or increased floaters. The US patient information says \"Tell your healthcare provider if you have vision problems, you may need to see an eye care specialist\".", action: "call-today", source: DM_ETCAMAH_RF, protocols: ["retinal-and-eye-effects-on-fgfr-mek-and-alk-inhibitors"] },
    ],
  },
  {
    id: "vemurafenib-skin-changes",
    label: "Vemurafenib",
    drugIds: ["vemurafenib"],
    flags: [
      { symptom: "A new wart, a skin sore that does not heal or a changing mole (vemurafenib)", threshold: "A new wart, a skin sore or reddish bump that bleeds or does not heal, or a mole that changes in size or colour. Vemurafenib can cause new skin cancers. The US Medication Guide says \"Check your skin and tell your healthcare provider right away about any skin changes\".", action: "call-now", source: DM_ZELBORAF_RF, protocols: ["second-cancers-after-anticancer-drug-treatment"] },
    ],
  },
  {
    id: "encorafenib-skin-changes",
    label: "Encorafenib",
    drugIds: ["encorafenib"],
    flags: [
      { symptom: "A new wart, a skin sore that does not heal or a changing mole (encorafenib)", threshold: "A new wart, a skin sore or reddish bump that bleeds or does not heal, or a mole that changes in size or colour. Encorafenib can cause new skin cancers. The US Medication Guide says \"Check your skin and tell your healthcare provider right away about any skin changes\".", action: "call-now", source: DM_BRAFTOVI_RF, protocols: ["second-cancers-after-anticancer-drug-treatment"] },
    ],
  },
  {
    id: "ripretinib-skin-changes",
    label: "Ripretinib",
    drugIds: ["ripretinib"],
    flags: [
      { symptom: "A new wart, a skin sore that does not heal or a changing mole (ripretinib)", threshold: "A new wart, a skin sore or reddish bump that bleeds or does not heal, or a mole that changes in size or colour. Ripretinib may cause new skin cancers. The US patient information says \"Check your skin and tell your healthcare provider right away about any skin changes\".", action: "call-now", source: DM_QINLOCK_RF, protocols: ["second-cancers-after-anticancer-drug-treatment"] },
    ],
  },
  {
    id: "dabrafenib-skin-changes",
    label: "Dabrafenib",
    drugIds: ["dabrafenib"],
    flags: [
      { symptom: "A new wart, a skin sore that does not heal or a changing mole (dabrafenib)", threshold: "A new wart, a skin sore or reddish bump that bleeds or does not heal, or a mole that changes in size or colour. Dabrafenib, alone or with trametinib, may cause new skin cancers. The US Medication Guide says \"Check your skin and tell your healthcare provider right away about any skin changes\".", action: "call-now", source: DM_TAFINLAR_RF, protocols: ["second-cancers-after-anticancer-drug-treatment"] },
    ],
  },
  {
    id: "tamoxifen-womb-changes",
    label: "Tamoxifen",
    drugIds: ["tamoxifen"],
    flags: [
      { symptom: "Unusual vaginal bleeding, discharge, or pain or pressure in the lower tummy, during or after tamoxifen", threshold: "Unusual bleeding from the vagina, irregular periods (especially with heavier bleeding), vaginal discharge, or discomfort such as pain or pressure in the lower tummy. A UK package leaflet says \"Tell your doctor straight away if you notice any of the following:\" and of these effects \"Sometimes these effects are serious and could include cancer. They can happen during or after treatment with Tamoxifen Tablets.\"", action: "call-now", source: EMC_TAMOXIFEN_RF, protocols: ["second-cancers-after-anticancer-drug-treatment"] },
    ],
  },
  {
    id: "niraparib-low-blood-counts",
    label: "Niraparib",
    drugIds: ["niraparib"],
    flags: [
      { symptom: "Bruising or bleeding for longer than usual, breathlessness with tiredness and pale skin, or fever or infection on niraparib", threshold: "Signs of low blood counts. The package leaflet says \"Tell your doctor straight away if you notice any of the following SERIOUS side effects - you may need urgent medical treatment:\" and its list includes low counts caused by \"a problem in the bone marrow or blood cancer starting from the bone marrow\".", action: "call-now", source: EMA_ZEJULA_RF, protocols: ["second-cancers-after-anticancer-drug-treatment"] },
    ],
  },
  {
    id: "ciltacabtagene-autoleucel-new-lumps",
    label: "Ciltacabtagene autoleucel",
    drugIds: ["ciltacabtagene-autoleucel"],
    flags: [
      { symptom: "New swollen glands, or new rashes or lumps in the skin, after ciltacabtagene autoleucel", threshold: "The package leaflet says \"Patients treated with CARVYKTI may develop new types of cancers.\" and \"Talk to your doctor if you experience any new swelling of your glands (lymph nodes) or changes in your skin such as new rashes or lumps.\"", action: "call-today", source: EMA_CARVYKTI_RF, protocols: ["second-cancers-after-anticancer-drug-treatment"] },
    ],
  },
  {
    id: "talquetamab-mouth-problems",
    label: "Talquetamab",
    drugIds: ["talquetamab"],
    flags: [
      { symptom: "A change in taste, a dry mouth, trouble swallowing or mouth sores on talquetamab", threshold: "Changes in the sense of taste, a dry mouth, trouble swallowing or mouth sores. The US Medication Guide says \"Tell your healthcare provider or get medical help right away if you develop any of the following symptoms of mouth problems\".", action: "call-now", source: DM_TALVEY_RF, protocols: ["taste-changes-during-cancer-treatment"] },
    ],
  },
  {
    id: "tarlatamab-taste-change",
    label: "Tarlatamab",
    drugIds: ["tarlatamab"],
    flags: [
      { symptom: "A change in taste on tarlatamab", threshold: "The US Medication Guide lists \"changes in taste\" among the signs of neurological problems, with headache, numbness or tingling, dizziness, confusion and others. It says \"Tell your healthcare provider right away if you develop any signs or symptoms of neurologic problems\". This is the US guide's wording.", action: "call-now", source: DM_IMDELLTRA_RF, protocols: ["taste-changes-during-cancer-treatment"] },
    ],
  },
  {
    id: "inotuzumab-ozogamicin-liver",
    label: "Inotuzumab ozogamicin",
    drugIds: ["inotuzumab-ozogamicin"],
    flags: [
      { symptom: "Rapid weight gain, pain under the right ribs, a swollen tummy, or yellowing of the skin or eyes on inotuzumab ozogamicin", threshold: "Possible signs of veno-occlusive liver disease. The package leaflet says \"Tell your doctor immediately if you have signs and symptoms of any of the following serious side effects:\" and of this one \"signs and symptoms include rapid weight gain, pain in the upper right side of your abdomen, increase in the size of the liver, accumulation of fluid causing abdominal swelling\".", action: "call-now", source: EMA_BESPONSA_RF, protocols: ["veno-occlusive-disease-on-inotuzumab-and-gemtuzumab-ozogamicin"] },
    ],
  },
  {
    id: "gemtuzumab-ozogamicin-liver",
    label: "Gemtuzumab ozogamicin",
    drugIds: ["gemtuzumab-ozogamicin"],
    flags: [
      { symptom: "Rapid weight gain, pain under the right ribs or a swollen tummy on gemtuzumab ozogamicin", threshold: "Under liver problems, among the serious side effects, the package leaflet says \"Tell your doctor right away if you have rapid weight gain, feel pain in the upper right side of your abdomen, have accumulation of fluid causing abdominal swelling.\"", action: "call-now", source: EMA_MYLOTARG_RF, protocols: ["veno-occlusive-disease-on-inotuzumab-and-gemtuzumab-ozogamicin"] },
    ],
  },
  // ---- Cancer-scoped sets: the disease's own emergencies, shown whatever the treatment (NHS 111 and 999 wording).
  {
    id: "biliary-cholangitis",
    label: "Gallbladder and bile duct cancer: infection of a blocked duct or stent (cholangitis)",
    cancerIds: ["gallbladder"],
    concernIds: ["biliary-stenting-drainage"],
    window: "Stents can block after a few months (Cancer Research UK); infection behind a blocked duct can become sepsis within hours, and the NHS says people having chemotherapy are at higher risk.",
    flags: [
      { symptom: "Signs of sepsis", threshold: "Breathing very fast; confused, slurred speech or not making sense; blue, pale or blotchy skin; a very high or very low temperature, feeling hot or cold to the touch, or shivery; a rash that does not fade when pressed: the NHS says call 999 or go to A&E.", action: "emergency", source: NHS_SEPSIS },
      { symptom: "High temperature or shivering with a stent or jaundice", threshold: "Cancer Research UK says to contact your doctor straight away if you have signs of infection such as a high temperature or shivering; you may need to go into hospital for antibiotics through a drip.", action: "call-now", source: CRUK_STENTS },
    ],
  },
  {
    id: "biliary-obstruction",
    label: "Gallbladder and bile duct cancer: jaundice from a new or returning blockage",
    cancerIds: ["gallbladder"],
    concernIds: ["biliary-stenting-drainage"],
    flags: [
      { symptom: "Yellow skin or eyes, dark urine, pale stools or itching", threshold: "The NHS says ask for an urgent GP appointment or get help from NHS 111 if your skin or the white part of your eyes look yellow. With a stent in place, returning jaundice usually means the stent has blocked; it can be unblocked or replaced the way it went in.", action: "call-now", source: NHS_JAUNDICE },
      { symptom: "Being sick for more than 2 days", threshold: "The NHS gallbladder cancer page says ask for an urgent GP appointment or get help from NHS 111 if you're being sick for more than 2 days.", action: "call-today", source: NHS_GB_SYMPTOMS },
    ],
  },
  {
    id: "biliary-bleeding",
    label: "Gallbladder and bile duct cancer: bleeding from the gut",
    cancerIds: ["gallbladder"],
    flags: [
      { symptom: "Vomiting blood or black stools", threshold: "Vomiting blood (bright red, brown, black or like coffee granules) together with feeling unwell, confused, faint or dizzy, rapid or shallow breathing, cold clammy pale skin, tummy pain or black poo: the NHS says call 999 or go to A&E. If the vomiting of blood has stopped and there are no other symptoms, ask for an urgent GP appointment or call 111.", action: "emergency", source: NHS_VOMITING_BLOOD },
    ],
  },
  {
    id: "biliary-pain",
    label: "Gallbladder and bile duct cancer: pain that is not controlled",
    cancerIds: ["gallbladder"],
    flags: [
      { symptom: "Pain the painkillers do not control", threshold: "Pain that does not settle with the medicines you have been given, or pain that is new or getting worse: Macmillan says your cancer team may ask you to contact them if you have pain or if it gets worse, and to follow their advice. New severe pain with a temperature or jaundice can mean a blocked or infected bile duct.", action: "call-now", source: MAC_PAIN },
    ],
  },
  // ---- Triple-negative breast cancer: the three emergencies its treatment brings, whatever the drug (NHS 111 and 999 wording).
  {
    id: "tnbc-neutropenic-sepsis",
    label: "Triple-negative breast cancer: infection and sepsis during chemotherapy",
    cancerIds: ["tnbc"],
    concernIds: ["febrile-neutropenia", "carboplatin", "sacituzumab-govitecan", "febrile-neutropenia-first-hour"],
    window: "Carboplatin-paclitaxel, anthracycline chemotherapy and sacituzumab govitecan all lower white cells; Macmillan says a minor infection can become life-threatening within hours when neutrophils are low, and the risk is usually highest 7 to 14 days after each dose.",
    flags: [
      { symptom: "Signs of sepsis", threshold: "Breathing very fast; confused, slurred speech or not making sense; blue, pale or blotchy skin; a very high or very low temperature, feeling hot or cold to the touch, or shivery; a rash that does not fade when pressed: the NHS says call 999 or go to A&E, and do not drive yourself. Macmillan's 999 list adds passing no urine in a day and feeling the worst you ever have.", action: "emergency", source: NHS_SEPSIS },
      { symptom: "Temperature over 37.5 C or below 36 C, or feeling unwell", threshold: "Macmillan says to call the hospital team's 24-hour helpline straight away for a temperature over 37.5 C (99.5 F) or below 36 C (96.8 F), for shivering, or for feeling unwell even with a normal temperature, and to call sooner rather than later; NICE CG151 says suspected neutropenic sepsis is referred immediately for assessment.", action: "call-now", source: MAC_SEPSIS },
    ],
  },
  {
    id: "tnbc-immune-reactions",
    label: "Triple-negative breast cancer: immune-related reactions on pembrolizumab (bowel, lungs, liver, glands)",
    cancerIds: ["tnbc"],
    concernIds: ["pembrolizumab", "irae", "irae-colitis", "irae-pneumonitis", "irae-hepatitis", "irae-thyroid"],
    window: "Pembrolizumab runs for about a year around surgery in early disease; Macmillan says immune-related side effects can start during treatment or after it ends, and Breast Cancer Now says to carry the alert card and use its out-of-hours number.",
    flags: [
      { symptom: "Diarrhoea, stools at night or tummy cramps (colitis)", threshold: "Macmillan says to contact the hospital straight away on the 24-hour number if you pass more stools than is normal for you, pass stools at night, have watery or loose stools, or have uncomfortable tummy cramps or pain, during treatment or after it ends; Breast Cancer Now adds blood or mucus in the stool.", action: "call-now", source: MAC_PEMBRO },
      { symptom: "Breathlessness, a cough that does not go away, wheeze or fever (pneumonitis)", threshold: "Macmillan says to contact the hospital straight away on the 24-hour number for breathlessness, a cough that does not go away, wheezing, or a fever with a temperature over 37.5 C, during treatment or after it ends. Breast Cancer Now says sudden difficulty breathing means the alert card number immediately, or A&E.", action: "call-now", source: BCN_PEMBRO },
      { symptom: "Yellow eyes, unusual tiredness, headaches, thirst or dizziness (liver or glands)", threshold: "Macmillan says to contact the 24-hour number for yellowing skin or eyes and sickness (liver inflammation), and for increased sweating, weight change, dizziness or fainting, feeling more hungry or thirsty, passing urine more often or headaches that do not go away (hormone glands, which can be permanently affected).", action: "call-today", source: MAC_PEMBRO },
    ],
  },
  {
    id: "tnbc-adc-lung",
    label: "Triple-negative breast cancer: lung inflammation on a deruxtecan antibody-drug conjugate",
    cancerIds: ["tnbc"],
    concernIds: ["ild", "trastuzumab-deruxtecan", "datopotamab-deruxtecan"],
    window: "In a pooled analysis of 1,150 people on trastuzumab deruxtecan, 15.4% developed drug-related interstitial lung disease, 87% of them within the first 12 months and 2.2% fatal; the Enhertu label carries a boxed warning and says to report symptoms immediately.",
    flags: [
      { symptom: "New cough, breathlessness or fever on trastuzumab deruxtecan or datopotamab deruxtecan", threshold: "Any new or worsening cough, breathlessness or fever: the label says to interrupt treatment for any suspected interstitial lung disease and to discontinue permanently for grade 2 or higher. Macmillan's wording for the same symptoms on pembrolizumab applies: contact the hospital straight away on the 24-hour number. Breathless at rest or blue lips is 999.", action: "call-now", source: POWELL_ILD, protocols: ["interstitial-lung-disease-on-antibody-drug-conjugates-and-targeted-drugs"] },
    ],
  },
  // ---- Pancreatic cancer: the emergencies of the disease and its treatment, whatever the drug (NHS 111 and 999 wording, Pancreatic Cancer UK thresholds).
  {
    id: "pancreatic-cholangitis",
    label: "Pancreatic cancer: infection of a blocked bile duct or stent (cholangitis)",
    cancerIds: ["pancreatic"],
    concernIds: ["biliary-stenting-drainage", "acute-cholangitis"],
    window: "A tumour in the head of the pancreas blocks the bile duct early, and Pancreatic Cancer UK says stents can block, move or become infected; infection behind a blocked duct can become sepsis within hours, and chemotherapy adds to the risk.",
    flags: [
      { symptom: "Signs of sepsis", threshold: "Breathing very fast; confused, slurred speech or not making sense; blue, pale or blotchy skin, lips or tongue; a very high or very low temperature, feeling hot or cold to the touch, or shivery; a rash that does not fade when pressed: the NHS says call 999 or go to A&E, and do not drive yourself.", action: "emergency", source: NHS_SEPSIS },
      { symptom: "High temperature or shivering with a stent or jaundice", threshold: "Pancreatic Cancer UK says there is a chance of infection after a stent, treated with antibiotics, and that fever or shivering with jaundice can accompany a blocked duct; ring the 24-hour line the same day. After surgery it says sudden worse pain with a high temperature, shivering or feeling generally unwell means going to A&E and telling them about your operation.", action: "call-now", source: PCUK_STENT_BILE },
    ],
  },
  {
    id: "pancreatic-biliary-obstruction",
    label: "Pancreatic cancer: jaundice from a new or returning blockage",
    cancerIds: ["pancreatic"],
    concernIds: ["biliary-stenting-drainage", "obstructive-jaundice"],
    flags: [
      { symptom: "Yellow skin or eyes, dark urine, pale stools or itching", threshold: "The NHS says ask for an urgent GP appointment or get help from NHS 111 if the whites of your eyes or your skin turn yellow. With a stent in place, returning jaundice usually means the stent has blocked; Pancreatic Cancer UK says it can be cleared or replaced the way it went in.", action: "call-now", source: NHS_PC_SYMPTOMS },
      { symptom: "Being sick for more than 2 days, or diarrhoea for more than 7 days", threshold: "The NHS pancreatic cancer page says ask for an urgent GP appointment or get help from NHS 111 if you're being sick for more than 2 days or have diarrhoea for more than 7 days.", action: "call-today", source: NHS_PC_SYMPTOMS },
    ],
  },
  {
    id: "pancreatic-neutropenic-sepsis",
    label: "Pancreatic cancer: infection and sepsis during chemotherapy",
    cancerIds: ["pancreatic"],
    concernIds: ["febrile-neutropenia", "folfirinox", "gemcitabine-nab-paclitaxel", "febrile-neutropenia-first-hour"],
    window: "FOLFIRINOX, NALIRIFOX and gemcitabine with nab-paclitaxel all lower white cells; blood counts are checked before each dose and are usually lowest 7 to 14 days after it. A blocked bile duct is a second route to sepsis in this cancer, so fever counts even when the count is normal.",
    flags: [
      { symptom: "Signs of sepsis", threshold: "Breathing very fast; confused, slurred speech or not making sense; blue, pale or blotchy skin; a very high or very low temperature, feeling hot or cold to the touch, or shivery; a rash that does not fade when pressed: the NHS says call 999 or go to A&E. Macmillan's 999 list adds passing no urine in a day.", action: "emergency", source: NHS_SEPSIS },
      { symptom: "Temperature above 37.5 C or below 36 C, or feeling unwell", threshold: "Macmillan's FOLFIRINOX and nab-paclitaxel pages say to contact the hospital straight away on the 24-hour number for a temperature above 37.5 C or below 36 C, for feeling unwell even with a normal temperature, or for symptoms of infection such as shivering, a sore throat, a cough, breathlessness, diarrhoea or pain passing urine; NICE CG151 says suspected neutropenic sepsis is referred immediately for assessment.", action: "call-now", source: MAC_FOLFIRINOX },
    ],
  },
  {
    id: "pancreatic-bleeding",
    label: "Pancreatic cancer: bleeding from the gut, or on a blood thinner",
    cancerIds: ["pancreatic"],
    concernIds: ["bleeding-precautions-when-platelets-are-low"],
    flags: [
      { symptom: "Vomiting blood or black stools", threshold: "Vomiting blood (bright red, brown, black or like coffee granules) together with feeling unwell, confused, faint or dizzy, rapid or shallow breathing, cold clammy pale skin, tummy pain or black poo: the NHS says call 999 or go to A&E. If the vomiting of blood has stopped and there are no other symptoms, ask for an urgent GP appointment or call 111. The tumour can bleed into the duodenum, and many people with pancreatic cancer take blood-thinning medicine, which makes bleeding last longer.", action: "emergency", source: NHS_VOMITING_BLOOD },
      { symptom: "Unexplained bruising, nosebleeds or bleeding gums on chemotherapy", threshold: "Macmillan says chemotherapy can lower platelets and to contact the hospital straight away on the 24-hour number for any unexplained bruising or bleeding; you may need a platelet transfusion.", action: "call-now", source: MAC_FOLFIRINOX },
    ],
  },
  {
    id: "pancreatic-bowel-obstruction",
    label: "Pancreatic cancer: a blocked duodenum or bowel",
    cancerIds: ["pancreatic"],
    concernIds: ["duodenal-stenting-gastric-outlet"],
    window: "The tumour can press on the duodenum so food cannot leave the stomach (gastric outlet obstruction); a duodenal stent or a bypass operation treats it, and a stent can itself block with food.",
    flags: [
      { symptom: "Vomiting large amounts, especially after food, feeling full, bloating or cramps", threshold: "Pancreatic Cancer UK says if you are being sick a lot and cannot keep down food or fluid for half a day or longer, or have signs of dehydration, contact your GP, NHS 111 or your specialist nurse, and the 24-hour chemotherapy number if you are on treatment; with a duodenal stent, vomiting again can mean it has blocked or moved, so speak to the team or go to A&E if you cannot reach them.", action: "call-now", source: PCUK_STENT_DUODENUM },
      { symptom: "Sudden severe tummy pain, green vomit, or vomit that looks like ground coffee", threshold: "The NHS diarrhoea and vomiting page says call 999 or go to A&E for a sudden, severe tummy ache, green vomit in an adult, or vomiting blood or vomit that looks like ground coffee.", action: "emergency", source: NHS_DV },
    ],
  },
  {
    id: "pancreatic-blood-clot",
    label: "Pancreatic cancer: a blood clot in the leg or lungs",
    cancerIds: ["pancreatic"],
    concernIds: ["vte", "cancer-associated-thrombosis", "cancer-associated-vte-treatment"],
    window: "Pancreatic Cancer UK says people with pancreatic cancer are at higher risk of a clot, more so with metastatic disease, surgery and chemotherapy; blood-thinning injections continue for about four weeks after surgery and the oncologist should consider them during chemotherapy.",
    flags: [
      { symptom: "Swollen or painful leg or arm with breathlessness or chest pain", threshold: "The NHS says call 999 or go to A&E if you have symptoms of DVT, such as pain and swelling, and feel short of breath or have chest pain; a clot that travels to the lungs (pulmonary embolism) is life-threatening. Do not drive yourself.", action: "emergency", source: NHS_DVT },
      { symptom: "Pain, swelling, warmth or colour change in one leg or arm; sudden or gradual breathlessness; coughing up blood", threshold: "Pancreatic Cancer UK says tell your doctor or medical team straight away, or go to A&E or call 999; on chemotherapy call the 24-hour emergency number, and if you cannot get through go to A&E or call 999. Most clots are treated with blood-thinning tablets or injections without stopping cancer treatment.", action: "call-now", source: PCUK_CLOTS },
    ],
  },
  {
    id: "lung-breathlessness",
    label: "Lung cancer: breathlessness that is new, worse, or there at rest",
    cancerIds: ["lung-cancer", "nsclc", "sclc"],
    concernIds: ["pleural-effusion", "anaemia", "cancer-related-fatigue", "indwelling-pleural-catheter-drainage-at-home"],
    window: "Breathlessness in lung cancer has several separately treatable causes (a chest infection, anaemia, fluid around the lung, a partly blocked airway, a clot, inflammation after radiotherapy or immunotherapy), and they cannot be told apart at home.",
    flags: [
      { symptom: "Struggling to breathe, choking or gasping and unable to speak", threshold: "The NHS says to call 999 or go to A&E if you are struggling to breathe, if you are choking, gasping and unable to speak, or if you have pain in your chest or upper back. Do not drive yourself.", action: "emergency", source: NHS_LUNG_SYMPTOMS },
      { symptom: "Breathlessness that is new, or worse quickly, or painful to breathe", threshold: "Macmillan says to contact your doctor straight away if breathlessness is a new symptom, if you have pain when you breathe, or if the breathlessness gets worse quickly, and that if you cannot speak to your doctor and it continues to get worse, go straight to your nearest A&E.", action: "call-now", source: MAC_BREATHLESSNESS },
      { symptom: "Suddenly more breathless when you already have fluid around the lung", threshold: "Cancer Research UK says that if you suddenly become breathless or your breathing gets worse with a pleural effusion, call 999 or go to your local A&E straight away, because you may need urgent treatment.", action: "emergency", source: CRUK_PLEURAL_EFFUSION },
      { symptom: "More breathless than usual with coloured phlegm or a high temperature", threshold: "Cancer Research UK says that if you are more breathless than usual you might have a chest infection, with coughing up coloured phlegm and a high temperature, that people with lung cancer can be more prone to infections, and to contact your GP or specialist nurse because you might need antibiotics.", action: "call-today", source: CRUK_LUNG_BREATHLESSNESS },
    ],
  },
  {
    id: "lung-pneumonitis",
    label: "Lung cancer: pneumonitis from immunotherapy, targeted drugs or radiotherapy",
    cancerIds: ["lung-cancer", "nsclc", "sclc"],
    concernIds: ["radiation-pneumonitis", "irae", "irae-pneumonitis"],
    window: "Immunotherapy pneumonitis can start at any point during treatment and for months after the last dose; radiotherapy pneumonitis usually starts in the weeks after treatment, and a smaller number of people develop a later, longer-lasting form months or years on.",
    flags: [
      { symptom: "Breathlessness, a cough that does not go away, wheezing, or a fever over 37.5 C on immunotherapy", threshold: "Macmillan says this treatment can cause inflammation of the lungs (pneumonitis) and to contact the hospital straight away on the 24-hour number for breathlessness, a cough that does not go away, wheezing, or a fever with a temperature over 37.5 C, during treatment or after it ends.", action: "call-now", source: MAC_PEMBRO },
      { symptom: "The same symptoms after chemoradiotherapy and durvalumab", threshold: "Macmillan gives durvalumab the same warning: contact the hospital straight away on the 24-hour number for breathlessness, a cough that does not go away, wheezing, or a fever with a temperature over 37.5 C. Having had chest radiotherapy as well does not make the symptoms less urgent, it makes them harder to explain, which is the reason to ring.", action: "call-now", source: MAC_DURVALUMAB },
      { symptom: "A dry cough or shortness of breath in the weeks after chest radiotherapy", threshold: "Cancer Research UK says radiotherapy to the chest might inflame the lungs, that soon after treatment you might have a dry cough or shortness of breath (acute radiation pneumonitis), and that in a small number of people cough and breathlessness continue because of chronic radiation pneumonitis starting months or years later.", action: "call-today", source: CRUK_LUNG_BREATHLESSNESS },
      { symptom: "Breathlessness, a cough that does not go away, wheezing, or a fever over 37.5 C on a targeted tablet", threshold: "Macmillan gives osimertinib the same warning as the immunotherapies: this treatment can cause inflammation of the lungs, so contact the hospital straight away on the 24-hour number if you notice breathlessness, a cough that does not go away, wheezing, or a fever with a temperature over 37.5 C, during treatment or after it ends.", action: "call-now", source: MAC_OSIMERTINIB, protocols: ["interstitial-lung-disease-on-antibody-drug-conjugates-and-targeted-drugs"] },
    ],
  },
  {
    id: "lung-neutropenic-sepsis",
    label: "Lung cancer treatment: neutropenic sepsis",
    cancerIds: ["lung-cancer", "nsclc", "sclc"],
    concernIds: ["neutropenia", "febrile-neutropenia", "febrile-neutropenia-first-hour"],
    window: "The risk is highest about 7 to 14 days after each dose of platinum chemotherapy, when the white cell count is at its lowest, but a fever at any point counts, and a chest infection in a lung already affected by cancer gets worse faster.",
    flags: [
      { symptom: "A temperature above 37.5 C, a temperature below 36 C, or feeling unwell with a normal temperature", threshold: "Macmillan says to contact the hospital straight away on the 24-hour number if you have a temperature above 37.5 C, a temperature below 36 C, or you feel unwell even with a normal temperature; NICE CG151 defines neutropenic sepsis as a temperature higher than 38 C or any symptoms and signs of sepsis in a person having anticancer treatment.", action: "call-now", source: MAC_PEMBRO },
      { symptom: "Signs of sepsis", threshold: "The NHS says to call 999 or go to A&E if an adult is breathing very fast, is confused, has slurred speech or is not making sense, has blue, pale or blotchy skin, has a very high or very low temperature or feels hot or cold to the touch or shivery, or has a rash that does not fade when you press it.", action: "emergency", source: NHS_SEPSIS },
      { symptom: "Fever with a cough and coloured phlegm", threshold: "NICE CG151 treats fever during anticancer treatment as neutropenic sepsis until proved otherwise; a chest infection is the commonest source in lung cancer, so ringing the 24-hour line comes before starting antibiotics from a previous course.", action: "call-now", source: NICE_CG151 },
      { symptom: "Unexplained bruising or bleeding", threshold: "Macmillan says that if you have any unexplained bruising or bleeding, contact the hospital straight away on the 24-hour number, because you may need a platelet transfusion.", action: "call-now", source: MAC_OSIMERTINIB },
    ],
  },
  {
    id: "lung-haemoptysis",
    label: "Lung cancer: coughing up blood",
    cancerIds: ["lung-cancer", "nsclc", "sclc"],
    flags: [
      { symptom: "Coughing up more than a few spots or streaks of blood", threshold: "The NHS says to call 999 or go to A&E immediately if you are coughing up more than just a few spots or streaks of blood, or if you are coughing up blood and finding it hard to breathe, have a very fast heartbeat, or have pain in your chest or upper back.", action: "emergency", source: NHS_COUGHING_BLOOD },
      { symptom: "A few spots, flecks or streaks of blood in phlegm", threshold: "The NHS says to ask for an urgent GP appointment or get help from NHS 111 if you have coughed up a few small spots, flecks or streaks of blood, or noticed blood in your phlegm or on a tissue you have coughed into.", action: "call-today", source: NHS_COUGHING_BLOOD },
      { symptom: "Coughing up blood for the first time when you are on treatment", threshold: "Tell the cancer team on the 24-hour number as well as using 111 or 999 as the amount dictates: the treatment may need holding, and a clot in the lung and a bleeding tumour are treated in opposite ways.", action: "call-now", source: NHS_LUNG_SYMPTOMS },
    ],
  },
  {
    id: "lung-svc-obstruction",
    label: "Lung cancer: superior vena cava obstruction (swelling of the face, neck and arms)",
    cancerIds: ["lung-cancer", "nsclc", "sclc"],
    concernIds: ["superior-vena-cava-obstruction", "svc-obstruction"],
    window: "Most cases of superior vena cava obstruction are caused by lung cancer, and Macmillan says the symptoms can develop over a few days or over a few weeks, so a change over a week still counts as new.",
    flags: [
      { symptom: "Swelling of the face, neck, arms or hands, with breathlessness", threshold: "Macmillan says the most common symptoms are breathlessness because of swelling around the windpipe, headaches or a feeling of fullness in the head that gets worse leaning forward or bending over, facial swelling with changes to your complexion, changes in eyesight, a swollen neck, swollen arms and hands, visible swollen veins on the chest and dizziness, and that if you have any of these it is important to contact your cancer doctor or nurse straight away because it needs to be treated quickly.", action: "call-now", source: MAC_SVCO },
      { symptom: "Swelling of the face or neck with stridor, difficulty breathing or confusion", threshold: "Breathlessness that is severe, noisy breathing, or drowsiness and confusion alongside the swelling is an emergency rather than a same-day call: the NHS says to call 999 or go to A&E if you are struggling to breathe, and confusion is one of the sepsis and emergency signs on the same page.", action: "emergency", source: NHS_LUNG_SYMPTOMS },
      { symptom: "Being told you need urgent treatment for a blocked vein in the chest", threshold: "NICE NG122 (1.15.7) says that for people who present with superior vena cava obstruction, offer chemotherapy and radiotherapy based on the stage of disease and performance status, and (1.15.8) consider stent insertion for the immediate relief of severe symptoms or after earlier treatment has failed, so this is treatable and the treatment is planned quickly.", action: "call-now", source: NG122_PALLIATIVE },
    ],
  },
  {
    id: "lung-spinal-cord-compression",
    label: "Lung cancer: spinal cord compression and spinal metastases",
    cancerIds: ["lung-cancer", "nsclc", "sclc"],
    concernIds: ["bone-metastases", "metastatic-spinal-cord-compression-emergency"],
    window: "NICE NG234 treats new cord compression symptoms in anyone with a past or current diagnosis of cancer as an oncological emergency, and asks for advice within 24 hours for the pain pattern that suggests spinal metastases.",
    flags: [
      { symptom: "New weakness, numbness or altered sensation in the legs, difficulty walking, or bladder or bowel problems", threshold: "NICE NG234 says to immediately contact the metastatic spinal cord compression coordinator if a person with a past or current diagnosis of cancer presents with bladder or bowel dysfunction, gait disturbance or difficulty walking, limb weakness, neurological signs of spinal cord or cauda equina compression, numbness, paraesthesia or sensory loss, or radicular pain, and to treat this as an oncological emergency.", action: "emergency", source: NG234_MSCC },
      { symptom: "Severe, unremitting or progressive back pain, worse on coughing, straining or lying down", threshold: "NICE NG234 says to seek advice through the coordinator within 24 hours if a person with a past or current diagnosis of cancer has severe unremitting back pain, progressive back pain, mechanical pain aggravated by standing, sitting or moving, back pain aggravated by straining such as coughing or sneezing, night-time back pain disturbing sleep, localised tenderness, or claudication.", action: "call-now", source: NG234_MSCC },
      { symptom: "Bone pain that ordinary painkillers are not controlling", threshold: "NICE NG122 (1.17.1) says to offer single-fraction radiotherapy to people with bone metastasis who need palliation and for whom standard pain relief is inadequate, so uncontrolled bone pain is a reason to ring the team rather than to take more tablets.", action: "call-today", source: NG122_PALLIATIVE },
    ],
  },
  {
    id: "colorectal-bowel-obstruction",
    label: "Bowel cancer: a blocked bowel or a blocked stoma",
    cancerIds: ["colorectal"],
    concernIds: ["stoma", "colectomy", "malignant-bowel-obstruction"],
    window: "A tumour, scar tissue or food can block the bowel at any point, before or after surgery; NICE NG151 treats acute left-sided large bowel obstruction as an emergency to be relieved by stenting or surgery.",
    flags: [
      { symptom: "Nothing coming out of the stoma, with cramps, sickness or swelling around it", threshold: "The NHS says if less poo is coming out of your stoma than usual, or your stoma stops producing poo, you may have a bowel blockage; a blockage is serious because your bowel could burst, and you may need further surgery, so speak to your stoma nurse urgently if you have cramps, are feeling sick or notice swelling around the stoma.", action: "call-now", source: NHS_COLOSTOMY_COMPLICATIONS },
      { symptom: "Severe tummy pain, being sick, or vomit that may be green, with a stoma", threshold: "The NHS says to ask for an urgent GP appointment or get help from NHS 111 if you have had a colostomy and have severe tummy pain, or are feeling sick or being sick and the vomit may be green, because these could be signs of an infection or a bowel obstruction.", action: "call-now", source: NHS_COLOSTOMY_COMPLICATIONS },
      { symptom: "No bowel movement for days with a swollen, painful tummy and vomiting", threshold: "A bowel that has stopped working is an emergency whether or not you have a stoma; NICE NG151 says to offer either stenting or emergency surgery for people presenting with acute left-sided large bowel obstruction where potentially curative treatment is suitable, and to consider stenting where treatment is with palliative intent.", action: "emergency", source: NG151 },
      { symptom: "Constipation for more than two days on chemotherapy, with sickness", threshold: "Macmillan says that if you have not been able to pass stools for over 2 days and are being sick, contact the 24-hour number straight away.", action: "call-now", source: MAC_IRINOTECAN },
    ],
  },
  {
    id: "colorectal-perforation-peritonitis",
    label: "Bowel cancer: a perforation or a leak at the join",
    cancerIds: ["colorectal"],
    concernIds: ["colectomy", "total-mesorectal-excision"],
    window: "An anastomotic leak usually shows in the first week or two after bowel surgery; a perforation can also happen with an untreated obstruction or during treatment with a VEGF antibody such as bevacizumab.",
    flags: [
      { symptom: "Sudden severe tummy pain with a rigid, tender abdomen after bowel surgery", threshold: "NICE NG151 lists anastomotic leak (leaking of bowel contents into the abdomen) and pelvic abscess among the complications of total mesorectal excision; sudden severe pain with fever or feeling very unwell after bowel surgery is an emergency, so call 999 or go to A&E and say you have had a bowel operation.", action: "emergency", source: NG151 },
      { symptom: "Fever, shivering or feeling very unwell in the days after bowel surgery", threshold: "Macmillan says to contact the hospital straight away on the 24-hour number for a temperature above 37.5 C or below 36 C, for feeling shivery and shaking, or for feeling unwell even with a normal temperature; after an operation these can be the first sign of a leak or an abscess rather than a chest or wound infection.", action: "call-now", source: MAC_FOLFOX },
      { symptom: "Severe tummy pain on bevacizumab", threshold: "Perforation of the bowel is a labelled risk of the VEGF antibodies; any severe new abdominal pain on bevacizumab is an emergency assessment rather than a wait-and-see, so call 999 or go to A&E and take your alert card.", action: "emergency", source: AVASTIN },
    ],
  },
  {
    id: "colorectal-neutropenic-sepsis",
    label: "Bowel cancer chemotherapy: neutropenic sepsis",
    cancerIds: ["colorectal"],
    concernIds: ["neutropenia", "febrile-neutropenia", "febrile-neutropenia-first-hour", "treatment-induced-diarrhoea-grading-and-management"],
    window: "The risk is highest about 7 to 14 days after each dose of FOLFOX, CAPOX, FOLFIRI or irinotecan, when the white cell count is at its lowest, but a fever at any point counts.",
    flags: [
      { symptom: "Fever, shivering, or feeling unwell with a normal temperature", threshold: "Macmillan says to contact the hospital straight away on the 24-hour number for a temperature above 37.5 C or below 36 C, for feeling shivery and shaking, or for feeling unwell even with a normal temperature; NICE CG151 defines neutropenic sepsis as a temperature higher than 38 C or any symptoms and signs of sepsis in a person having anticancer treatment.", action: "call-now", source: NICE_CG151 },
      { symptom: "Signs of sepsis", threshold: "The NHS says to call 999 or go to A&E for breathing very fast, confusion or slurred speech or not making sense, blue, pale or blotchy skin, lips or tongue, a very high or very low temperature, feeling hot or cold to the touch or shivery, or a rash that does not fade when pressed.", action: "emergency", source: NHS_SEPSIS },
      { symptom: "Diarrhoea that the anti-diarrhoea drugs have not settled", threshold: "Macmillan says to contact the hospital straight away on the 24-hour number if diarrhoea starts less than 24 hours after irinotecan, because more atropine may be needed, and if your anti-diarrhoea drugs have not worked within 24 hours; dehydration with a low white cell count is how a manageable side effect becomes sepsis.", action: "call-now", source: MAC_IRINOTECAN },
      { symptom: "Mouth ulcers or a sore mouth that stops you eating or drinking", threshold: "Macmillan says to ring if a sore mouth or throat affects how much you can drink or eat, or if your mouth, tongue, throat or lips have any blisters, ulcers or white patches.", action: "call-today", source: MAC_FOLFOX },
    ],
  },
  {
    id: "colorectal-bleeding",
    label: "Bowel cancer: bleeding from the bowel or the stoma",
    cancerIds: ["colorectal"],
    concernIds: ["colectomy", "stoma"],
    flags: [
      { symptom: "Bleeding that will not stop, or large clots when you poo", threshold: "The NHS says to call 999 or go to A&E if you are bleeding non-stop from your bottom, or there is a lot of blood or you see large blood clots when you poo.", action: "emergency", source: NHS_BOWEL_SYMPTOMS },
      { symptom: "Black or dark red poo, or bloody diarrhoea", threshold: "The NHS says to ask for an urgent GP appointment or get help from NHS 111 if your poo is black or dark red, or you have bloody diarrhoea.", action: "call-now", source: NHS_BOWEL_SYMPTOMS },
      { symptom: "A lot of blood coming from the stoma or into the bag", threshold: "The NHS says to ask for an urgent GP appointment or get help from NHS 111 if you have had a colostomy and there is lots of blood coming from your stoma or in your stoma bag.", action: "call-now", source: NHS_COLOSTOMY_COMPLICATIONS },
      { symptom: "Unexplained bruising or bleeding on chemotherapy", threshold: "Macmillan says that if you have any unexplained bruising or bleeding, contact the hospital straight away on the 24-hour number, because you may need a platelet transfusion.", action: "call-now", source: MAC_IRINOTECAN },
    ],
  },
  {
    id: "colorectal-stoma-emergencies",
    label: "Bowel cancer: stoma emergencies and dehydration",
    cancerIds: ["colorectal"],
    concernIds: ["stoma"],
    window: "The first weeks after a new ileostomy are when output is highest and dehydration is most likely; Bowel Cancer UK says the stoma care specialist nurse supports you through learning to manage it.",
    flags: [
      { symptom: "A very high temperature, or feeling hot, cold or shivery, with a stoma", threshold: "The NHS says to ask for an urgent GP appointment or get help from NHS 111 if you have had a colostomy and your temperature is very high, or you feel hot, cold or shivery, because this could be a sign of an infection.", action: "call-now", source: NHS_COLOSTOMY_COMPLICATIONS },
      { symptom: "Signs of dehydration with a high-output stoma", threshold: "The NHS says having a colostomy makes it harder to stay hydrated and to get advice from your stoma nurse or another healthcare professional for fatigue, a dry mouth or lots of poo coming out of your stoma; Cancer Research UK says you lose more fluid through an ileostomy, so your urine should stay a pale straw colour through the day and you should speak to the team straight away if you think you are dehydrated.", action: "call-now", source: NHS_COLOSTOMY_COMPLICATIONS },
      { symptom: "The stoma changes colour, sinks in, sticks out further or the skin around it breaks down", threshold: "The NHS lists swelling around the stoma (a hernia), the stoma going back into the tummy (retraction), the stoma coming out too far (prolapse) and skin damage around the stoma as problems to contact the stoma nurse or GP about, because different bags, accessories or surgery may be needed.", action: "call-today", source: NHS_COLOSTOMY_COMPLICATIONS },
      { symptom: "Medicines appearing whole in the bag", threshold: "The NHS says many medicines are designed to dissolve slowly and may not work with a colostomy because they can come straight out into the bag, and to speak to your doctor about liquid or powder forms rather than stopping any prescribed medicine.", action: "call-today", source: NHS_COLOSTOMY_COMPLICATIONS },
      { symptom: "Not being able to manage the stoma at home", threshold: "Bowel Cancer UK says the stoma care specialist nurse shows you the equipment before the operation and supports you afterwards while you learn to look after the stoma; ringing them early is what the service is for.", action: "call-today", source: BCUK_STOMA },
    ],
  },
  {
    id: "colorectal-oxaliplatin-egfr",
    label: "Bowel cancer: oxaliplatin and the EGFR antibodies",
    cancerIds: ["colorectal"],
    concernIds: ["peripheral-neuropathy", "rash-skin-toxicity", "chemotherapy-induced-peripheral-neuropathy-assessment-and-prevention", "egfr-inhibitor-rash-prophylaxis"],
    window: "Oxaliplatin's cold sensitivity is worst in the days after each dose; the acne-like rash from cetuximab or panitumumab is most likely in the first 2 or 3 weeks.",
    flags: [
      { symptom: "Difficulty swallowing or breathing in the cold after oxaliplatin", threshold: "Macmillan says that rarely oxaliplatin can cause a spasm in the throat area around the voicebox, causing difficulties with swallowing and breathing, during treatment or in the first few days after it, and that this may be worse in cold temperatures; difficulty breathing is a 999 call, and the team should be told either way because later doses may be given over 4 to 6 hours.", action: "emergency", source: MAC_OXALIPLATIN },
      { symptom: "Numbness or tingling that is getting worse or lasting between cycles", threshold: "NICE NG151 says to emphasise the importance of monitoring and managing side effects during non-surgical treatment to try to prevent permanent damage, giving monitoring of prolonged sensory symptoms after platinum-based chemotherapy as the example, which can be a sign that the dose needs to be reduced to minimise future permanent peripheral neuropathy.", action: "call-today", source: NG151 },
      { symptom: "A rash, or sore and swollen skin around the nails, on cetuximab or panitumumab", threshold: "Macmillan says skin changes are often mild but can be more severe, and that if you notice any skin changes you should contact the hospital as soon as possible on the 24-hour number, because you may need creams, steroids or antibiotics and treatment may be paused; sore, swollen skin around the nails may be a sign of infection.", action: "call-today", source: MAC_CETUXIMAB },
      { symptom: "Blistering skin, or sores in the mouth, eyes or genitals", threshold: "Macmillan says that rarely cetuximab can cause a serious skin reaction that needs to be treated immediately in hospital, and to contact the hospital straight away on the 24-hour number.", action: "emergency", source: MAC_CETUXIMAB },
    ],
  },
  {
    id: "prostate-cord-compression",
    label: "Prostate cancer: spinal cord compression, the emergency men are not warned about",
    cancerIds: ["prostate", "prostate-mhspc", "prostate-mcrpc", "prostate-nmcrpc"],
    concernIds: ["bone-metastases", "metastatic-spinal-cord-compression-emergency"],
    window: "About 4 in 100 people with prostate cancer develop metastatic spinal cord compression, and the risk is highest once the cancer has reached the spine. Treated quickly the damage is usually recoverable; left for days it may not be.",
    flags: [
      { symptom: "New weakness or numbness in the legs, unsteadiness, or loss of control of the bladder or bowel", threshold: "NICE NG234 says to immediately contact the metastatic spinal cord compression coordinator if a person with a past or current diagnosis of cancer presents with bladder or bowel dysfunction, gait disturbance or difficulty walking, limb weakness, neurological signs of spinal cord or cauda equina compression, numbness, paraesthesia or sensory loss, or radicular pain, and to treat this as an oncological emergency.", action: "emergency", source: NG234_MSCC },
      { symptom: "New, severe or worsening back or neck pain, worse lying down, coughing or straining, or waking you at night", threshold: "NICE NG234 says to seek advice through the coordinator within 24 hours for severe unremitting back pain, progressive back pain, mechanical pain aggravated by standing, sitting or moving, back pain aggravated by straining such as coughing or sneezing, night-time back pain disturbing sleep, localised tenderness, or claudication. Prostate Cancer UK says not to wait to see if it gets better and not to worry that it is an inconvenient time such as the evening or the weekend.", action: "call-now", source: PCUK_MSCC },
      { symptom: "A band of pain around the chest or abdomen, or pain running down an arm or leg", threshold: "Prostate Cancer UK lists a narrow band of pain around the chest or abdomen that can move towards the back, buttocks or legs, and pain that moves down the arms or legs, among the symptoms of cord compression to get medical advice about straight away.", action: "call-now", source: PCUK_MSCC },
      { symptom: "You cannot reach anyone from your team", threshold: "Prostate Cancer UK says that if you do not have details of who to contact, or your doctor or nurse is not available, go to your nearest accident and emergency department, and tell the staff or paramedics that you have prostate cancer and symptoms of spinal cord compression, because not everyone will be familiar with it. Ask your team in advance to write down who to contact during the day, at night and at the weekend.", action: "emergency", source: PCUK_MSCC },
    ],
  },
  {
    id: "prostate-urinary-retention",
    label: "Prostate cancer: not being able to pass urine, and other urgent bladder problems",
    cancerIds: ["prostate", "prostate-low-risk", "prostate-intermediate-risk", "prostate-high-risk"],
    concernIds: ["brachytherapy", "robotic-surgery", "prostate-biopsy-route-and-antibiotic-prophylaxis"],
    window: "Acute retention is commonest in the days and weeks after brachytherapy, radiotherapy or a focal treatment, when the prostate swells, and after surgery if the urethra narrows with scarring.",
    flags: [
      { symptom: "Suddenly and painfully unable to pass urine at all", threshold: "Prostate Cancer UK says acute urine retention is when you suddenly and painfully cannot urinate, that it needs treating straight away, and to call your doctor or nurse or go to your nearest accident and emergency department, where they may need to drain the bladder with a catheter. Make sure they know what prostate cancer treatment you have had.", action: "emergency", source: PCUK_URINARY },
      { symptom: "A catheter that stops draining, or leaks around itself, with pain or a swollen tummy", threshold: "A blocked catheter recreates retention with the catheter still in place. Prostate Cancer UK describes catheter drainage as the treatment for retention, so a catheter that has stopped working is the same problem and needs the urology team or A and E rather than the next district nurse round.", action: "call-now", source: PCUK_URINARY },
      { symptom: "Fever, shivering or burning when passing urine after a biopsy or with a catheter", threshold: "NICE NG131 says the most serious complication of transrectal ultrasound-guided biopsy is sepsis, which develops in a bit fewer than 1 out of 100 people, and that other serious complications including acute urinary retention, severe haematuria and severe rectal bleeding may need hospitalisation.", action: "call-now", source: NG131_PROSTATE },
      { symptom: "Blood in the urine with clots, or bleeding heavy enough to stop you passing urine", threshold: "The NHS lists blood in the urine among the symptoms of prostate cancer to see a GP about. Clots that stop the bladder emptying turn bleeding into retention, so heavy bleeding with difficulty passing urine is an A and E problem rather than a wait-and-see.", action: "call-now", source: NHS_PROSTATE_SYMPTOMS },
    ],
  },
  {
    id: "prostate-bone-pain",
    label: "Prostate cancer: bone pain and fractures",
    cancerIds: ["prostate", "prostate-mhspc", "prostate-mcrpc", "prostate-nmcrpc"],
    concernIds: ["bone-metastases", "zoledronic-acid", "denosumab", "metastatic-spinal-cord-compression-emergency"],
    window: "Bone is where prostate cancer goes first and most often. Pain that is new, worsening, or waking you at night is the pattern that matters, not the ache you have had for years.",
    flags: [
      { symptom: "Bone pain that your usual painkillers are not controlling", threshold: "NICE NG131 says to consider oral or intravenous bisphosphonates for pain relief for people with hormone-relapsed metastatic prostate cancer when other treatments, including analgesics and palliative radiotherapy, have not given satisfactory pain relief, so uncontrolled bone pain is a reason to ring the team rather than to take more tablets.", action: "call-today", source: NG131_PROSTATE },
      { symptom: "Sudden severe pain in a hip, thigh, arm or rib, especially after a minor knock", threshold: "Hormone therapy thins bone from the first year of treatment: in a study of 50,613 men, 19.4 percent of those on androgen deprivation who survived at least five years had a fracture, against 12.6 percent of those not on it. A bone weakened by cancer or by treatment can break with very little force, so sudden severe pain with an inability to bear weight is an emergency assessment.", action: "emergency", source: PCUK_HORMONE },
      { symptom: "New back pain anywhere in the spine", threshold: "Prostate Cancer UK says MSCC can be mistaken for general back pain or for bone pain caused by the cancer, so new spinal pain in someone with prostate cancer is assessed for cord compression rather than assumed to be either.", action: "call-now", source: PCUK_MSCC },
    ],
  },
  {
    id: "prostate-hormone-therapy",
    label: "Prostate cancer: hormone therapy effects that need action rather than endurance",
    cancerIds: ["prostate", "prostate-mhspc", "prostate-mcrpc", "prostate-nmcrpc"],
    concernIds: ["cancer-related-fatigue", "bone-metastases", "hot-flushes-on-endocrine-therapy-non-hormonal-options", "cancer-related-fatigue-screening-and-management"],
    window: "Most of these build over months rather than arriving suddenly, which is why they get tolerated. Each of them has something NICE NG131 says to offer for it.",
    flags: [
      { symptom: "Chest pain, breathlessness, or the signs of a stroke while on hormone therapy", threshold: "Prostate Cancer UK says evidence suggests hormone therapy might increase the chance of developing heart disease, stroke and type-2 diabetes; in 73,196 men, GnRH agonist use carried an adjusted hazard ratio of 1.16 for coronary heart disease and 1.16 for sudden cardiac death. Chest pain or stroke symptoms are 999 whatever the cause.", action: "emergency", source: PCUK_HORMONE },
      { symptom: "Hot flushes that are disrupting your sleep or your day", threshold: "NICE NG131 says to offer medroxyprogesterone 20 mg per day, initially for 10 weeks, to manage troublesome hot flushes caused by long-term androgen suppression, and to consider cyproterone acetate 50 mg twice a day for 4 weeks if medroxyprogesterone is not effective or not tolerated. There is a prescription for this, so it is worth ringing rather than enduring.", action: "call-today", source: NG131_PROSTATE },
      { symptom: "Low mood, loss of interest in everything, or thoughts of harming yourself", threshold: "Prostate Cancer UK says hormone therapy itself can cause low moods, anxiety or depression, and a meta-analysis of 18 studies in 168,756 men found androgen deprivation carried a 41 percent higher risk of depression. Thoughts of harming yourself are an emergency: call 999 or go to A and E, or ring 111 and choose the mental health option.", action: "emergency", source: PCUK_HORMONE },
      { symptom: "Fatigue that is stopping you doing ordinary things", threshold: "NICE NG131 says to tell people starting androgen deprivation therapy that fatigue is a recognised side effect of this therapy and might not be because of their prostate cancer, and to offer supervised resistance and aerobic exercise at least twice a week for 12 weeks to reduce fatigue and improve quality of life. That is a referral you can ask for.", action: "call-today", source: NG131_PROSTATE },
    ],
  },
  {
    id: "prostate-sexual-function",
    label: "Prostate cancer: erections, and the one sexual problem that is an emergency",
    cancerIds: ["prostate", "prostate-low-risk", "prostate-intermediate-risk", "prostate-high-risk"],
    concernIds: ["robotic-surgery"],
    window: "Treatments for erection problems are free on the NHS at any age. Most of what follows is a reason to ring the clinic; one item on it is a reason to go to A and E the same hour.",
    flags: [
      { symptom: "An erection that will not go down after four hours", threshold: "Prostate Cancer UK says to go to your nearest accident and emergency department straight away if your erection lasts more than four hours, that this is called priapism and is considered a medical emergency but can be treated, and that it affects fewer than 1 in 100 men using treatments for erection problems and about 1 in 100 using injections. Walking, squatting, passing urine or something cold may help while you get there. The NHS page on priapism sets the line slightly earlier: call 999 or go to accident and emergency if an erection lasts more than 3 to 4 hours, and do not drive yourself there.", action: "emergency", source: PCUK_ED_TREATMENTS },
      { symptom: "Chest pain or faintness after taking a PDE5 inhibitor tablet", threshold: "Prostate Cancer UK says you should not take PDE5 inhibitor tablets if you are taking drugs called nitrates, including the recreational drugs known as poppers, because taking them at the same time can cause your blood pressure to drop dangerously low, which can be fatal, and that alpha blockers may need to be taken at least four hours apart.", action: "emergency", source: PCUK_ED_TREATMENTS },
      { symptom: "Pain, swelling or fever after a penile implant", threshold: "Prostate Cancer UK says about 3 in 100 men who have an implant get an infection, and that if that happens the implant is taken out to treat the infection before a new one is put in; bruising and swelling around the scrotum are expected in the first weeks, but fever is not.", action: "call-now", source: PCUK_ED_TREATMENTS },
      { symptom: "Nothing is working, and nobody has asked you about it", threshold: "NICE NG131 says to offer people who have had radical treatment for prostate cancer access to specialist erectile dysfunction services, to offer PDE5 inhibitors to people who experience loss of erectile function, and to offer vacuum devices, intraurethral inserts or penile injections, or penile prostheses where those do not work or are contraindicated. The NHS pays for this and there is no age limit, so asking for the referral is asking for something already offered.", action: "call-today", source: NG131_PROSTATE },
    ],
  },
  {
    id: "prostate-docetaxel-sepsis",
    label: "Prostate cancer chemotherapy: neutropenic sepsis on docetaxel",
    cancerIds: ["prostate", "prostate-mhspc", "prostate-mcrpc"],
    concernIds: ["neutropenia", "febrile-neutropenia", "febrile-neutropenia-first-hour", "chemotherapy-induced-peripheral-neuropathy-assessment-and-prevention"],
    window: "The risk is highest about 7 to 14 days after each three-weekly dose, when the white cell count is at its lowest, but a fever at any point counts. NICE NG131 reports febrile neutropenia in 15 out of 100 men given docetaxel for high-risk non-metastatic disease.",
    flags: [
      { symptom: "Fever, shivering, or feeling unwell with a normal temperature", threshold: "NICE CG151 defines neutropenic sepsis as a temperature higher than 38 C or any symptoms and signs of sepsis in a person having anticancer treatment; NICE NG131 reports that 15 out of 100 people who took docetaxel developed febrile neutropenia and 1 out of 100 died because of infections that, in the opinion of the investigators, they might not have developed without it.", action: "call-now", source: NICE_CG151 },
      { symptom: "Signs of sepsis", threshold: "The NHS says to call 999 or go to A and E for breathing very fast, confusion or slurred speech or not making sense, blue, pale or blotchy skin, lips or tongue, a very high or very low temperature, feeling hot or cold to the touch or shivery, or a rash that does not fade when pressed.", action: "emergency", source: NHS_SEPSIS },
      { symptom: "Diarrhoea, a sore mouth or vomiting that stops you drinking", threshold: "Macmillan says to contact the hospital straight away on the 24-hour number if you have diarrhoea, a sore mouth or throat that affects how much you can eat or drink, or if you are being sick, because dehydration with a low white cell count is how a manageable side effect becomes sepsis.", action: "call-now", source: MAC_DOCETAXEL },
      { symptom: "Numbness or tingling in the hands or feet that is getting worse", threshold: "Macmillan says docetaxel can cause numbness or tingling in the hands and feet and to tell your doctor or nurse if this affects you, because the dose may need to be changed to stop the damage becoming permanent.", action: "call-today", source: MAC_DOCETAXEL },
    ],
  },
  // ---- Breast cancer, whatever the receptor result: the four emergencies the family page shares with all three subtypes.
  {
    id: "breast-infection-sepsis",
    label: "Breast cancer: infection and sepsis, during chemotherapy and after surgery",
    // Triple-negative has its own sepsis card naming the drugs it is given, so this one stops short of that page:
    // one page, one sepsis card. The other three breast sets have no subtype equivalent and reach every branch.
    cancerIds: ["breast-cancer", "breast-hr-positive", "breast-her2-positive", "invasive-lobular-carcinoma", "inflammatory-breast-cancer", "male-breast-cancer", "ductal-carcinoma-in-situ"],
    concernIds: ["febrile-neutropenia", "neutropenic-sepsis-breast-chemotherapy", "seroma-after-breast-surgery", "febrile-neutropenia-first-hour", "cancer-associated-vte-treatment"],
    window: "Chemotherapy for any type of breast cancer lowers the white cell count, and the count is usually at its lowest 7 to 14 days after each dose. A breast or chest wall wound is the other route in, in the first weeks after an operation.",
    flags: [
      { symptom: "Signs of sepsis", threshold: "Breathing very fast; confused, slurred speech or not making sense; blue, pale or blotchy skin, lips or tongue; a very high or very low temperature, feeling hot or cold to the touch, or shivery; a rash that does not fade when pressed: the NHS says call 999 or go to A and E, and do not drive yourself, ask someone to drive you or call 999.", action: "emergency", source: NHS_SEPSIS },
      { symptom: "Temperature over 37.5 C or below 36 C, or feeling unwell with a normal temperature", threshold: "Macmillan says to call the hospital team's 24-hour helpline straight away for a temperature over 37.5 C (99.5 F) or below 36 C (96.8 F), for shivering, or for feeling unwell even with a normal temperature, and to call sooner rather than later. NICE CG151 says to suspect neutropenic sepsis in anyone having anticancer treatment who becomes unwell and to refer them immediately for assessment.", action: "call-now", source: MAC_SEPSIS },
      { symptom: "A wound that is red, hot, painful, swollen or leaking after breast surgery", threshold: "Cancer Research UK lists the signs of a wound infection after breast surgery as a temperature above 37.5 C or below 36 C, redness or a change in the normal colour of the breast, a breast that feels warm, a painful or swollen breast, fluid seeping from the wound, feeling cold and shivery, or feeling generally unwell, and says to tell the team or ring the 24-hour advice line.", action: "call-now", source: CRUK_BREAST_PROBLEMS },
      { symptom: "A painful, red or swollen leg, breathlessness, chest pain or coughing up blood after an operation", threshold: "Cancer Research UK says to tell your doctor straight away or go to A and E after breast surgery if you have a painful, red or swollen leg which may feel warm to touch, are short of breath, have pain in your chest or upper back, or cough up blood. These are the signs of a clot in the leg or in the lung.", action: "emergency", source: CRUK_BREAST_PROBLEMS },
    ],
  },
  {
    id: "breast-cord-compression",
    label: "Breast cancer: spinal cord compression, the emergency nobody mentions at diagnosis",
    cancerIds: ["breast-cancer", "breast-hr-positive", "breast-her2-positive", "tnbc", "invasive-lobular-carcinoma", "inflammatory-breast-cancer", "male-breast-cancer", "ductal-carcinoma-in-situ"],
    concernIds: ["metastatic-spinal-cord-compression", "bone-metastases", "metastatic-spinal-cord-compression-emergency"],
    window: "Bone is where breast cancer goes first and most often, and a deposit in the spine can press on the cord. Treated within hours the damage is usually recoverable; left for days it may not be. This applies at any time after a diagnosis, including years later.",
    flags: [
      { symptom: "New weakness or numbness in the legs, unsteadiness, or loss of control of the bladder or bowel", threshold: "NICE NG234 says to immediately contact the metastatic spinal cord compression coordinator if a person with a past or current diagnosis of cancer presents with bladder or bowel dysfunction, gait disturbance or difficulty walking, limb weakness, neurological signs of spinal cord or cauda equina compression, numbness, paraesthesia or sensory loss, or radicular pain, and to treat this as an oncological emergency. If you cannot reach anyone, go to A and E and say you have breast cancer and symptoms of spinal cord compression.", action: "emergency", source: NG234_MSCC },
      { symptom: "New, severe or worsening back or neck pain, worse lying down or at night, or on coughing or straining", threshold: "NICE NG234 says to seek advice through the coordinator within 24 hours for severe unremitting back pain, progressive back pain, mechanical pain aggravated by standing, sitting or moving, back pain aggravated by straining such as coughing or sneezing, night-time back pain disturbing sleep, localised tenderness, or claudication. Breast Cancer Now lists unexplained back pain with difficulty walking, numbness and loss of bladder or bowel control among the signs that breast cancer may have spread to the bones.", action: "call-now", source: NG234_MSCC },
      { symptom: "Bone pain that painkillers are not controlling, or a bone that breaks with very little force", threshold: "Breast Cancer Now says the main symptoms of secondary breast cancer in the bone are pain that does not get better with pain relief and may be worse when lying down or at night, and bone fractures. It also lists sickness, fatigue, passing large amounts of urine, confusion and thirst as possible signs of a high calcium level, which needs treating the same day.", action: "call-now", source: BCN_SECONDARY },
    ],
  },
  {
    id: "breast-lymphoedema-cellulitis",
    label: "Breast cancer: a hot, red or suddenly swollen arm after lymph node surgery or radiotherapy",
    cancerIds: ["breast-cancer", "breast-hr-positive", "breast-her2-positive", "tnbc", "invasive-lobular-carcinoma", "inflammatory-breast-cancer", "male-breast-cancer", "ductal-carcinoma-in-situ"],
    concernIds: ["lymphoedema-after-breast-cancer", "lymphoedema-decongestive-therapy", "lymphadenectomy", "lymphoedema-risk-reduction-surveillance-and-treatment"],
    window: "An arm whose lymph nodes have been removed or irradiated drains badly and fights infection badly, so cellulitis in it can move fast. The risk is lifelong, and how long ago the surgery was does not make it less urgent.",
    flags: [
      { symptom: "Cellulitis with a very high temperature, fast heartbeat, confusion, dizziness or purple patches on the skin", threshold: "The NHS says to call 999 or go to A and E if you have cellulitis with a very high temperature or you feel hot, cold or shivery, a fast heartbeat or fast breathing, purple patches on the skin which may be less obvious on brown or black skin, feeling dizzy or faint, confusion or disorientation, cold, clammy or pale skin, or unresponsiveness. These are symptoms of serious complications, which can be life threatening.", action: "emergency", source: NHS_CELLULITIS },
      { symptom: "Skin on the arm, hand, breast or chest wall that is painful, hot and swollen", threshold: "The NHS says to ask for an urgent GP appointment or get help from NHS 111 if your skin is painful, hot and swollen, because early treatment with antibiotics can stop cellulitis becoming more serious, and that the area usually looks red but this may be less obvious on brown or black skin. It says to contact the GP if you do not start to feel better 2 to 3 days after starting antibiotics.", action: "call-today", source: NHS_CELLULITIS },
      { symptom: "New or suddenly worse swelling of the arm, hand, breast or chest wall", threshold: "NICE NG101 (1.14.6) says to ensure people with breast cancer who develop lymphoedema are referred to a specialist lymphoedema service as soon as possible. Breast Cancer Now says to get advice from the breast care nurse, treatment team or GP as soon as you notice swelling, tightness, a dull ache, heaviness, tingling, numbness or dry skin on the treated side. Macmillan adds that swelling, aching and redness in an arm or leg can also be a blood clot.", action: "call-today", source: NG101_BREAST },
      { symptom: "Lymph fluid leaking through the skin, or skin that has broken down", threshold: "NICE NG101 (1.14.7) says people with lymphoedema should be told how to recognise the serious complications that need urgent medical attention, for example cellulitis or deep vein thrombosis. Broken skin on a swollen limb is an open door for infection, so it is treated as urgent rather than watched.", action: "call-now", source: NG101_BREAST },
    ],
  },
  {
    id: "breast-recurrence-signs",
    label: "Breast cancer: the symptoms that are worth a phone call rather than a wait",
    cancerIds: ["breast-cancer", "breast-hr-positive", "breast-her2-positive", "tnbc", "invasive-lobular-carcinoma", "inflammatory-breast-cancer", "male-breast-cancer", "ductal-carcinoma-in-situ"],
    concernIds: ["brain-metastases", "bone-metastases", "survivorship-care-plan", "breast-cancer-follow-up-after-treatment"],
    window: "Breast Cancer Now's rule is easier to hold than a list: talk to your GP or breast care nurse about any symptom that is new, does not have an obvious cause, and does not go away. Most turn out to be something else. Waiting months in order not to make a fuss is the thing to avoid.",
    flags: [
      { symptom: "A seizure, sudden severe headache, new weakness or numbness down one side, or new confusion", threshold: "Breast Cancer Now lists headache, sickness and vomiting especially on waking, weakness or numbness down one side of the body, unsteadiness or loss of balance, seizures, difficulty with speech, vision problems, and changes in behaviour, mood or memory among the signs that breast cancer may have spread to the brain. A seizure, a sudden severe headache or new one-sided weakness is 999 whatever the cause.", action: "emergency", source: BCN_SECONDARY },
      { symptom: "A new lump or skin change in the treated breast, the chest wall scar, or under the arm or collarbone", threshold: "Breast Cancer Now lists a firm painless lump or multiple lumps, a persistent rash, a change in skin colour, bleeding or an unpleasant smell as signs in the skin, and a lump or swelling under the arm, breastbone or collarbone as a sign in the lymph nodes. Its rule for reporting is that the symptom is new, has no obvious cause, and does not go away.", action: "call-today", source: BCN_SECONDARY },
      { symptom: "Breathlessness at rest or on activity, a cough that does not go away, or chest pain or tightness that persists", threshold: "Breast Cancer Now lists feeling out of breath on activity or at rest, a cough that does not go away, and pain or tightness in the chest that does not go away as the symptoms of secondary breast cancer in the lungs. Sudden severe breathlessness or chest pain is 999 rather than a call.", action: "call-today", source: BCN_SECONDARY },
      { symptom: "Pain under the right ribs or in the right shoulder, yellow skin or eyes, a swollen abdomen, or losing weight without trying", threshold: "Breast Cancer Now lists pain in the abdomen that may also be felt in the right shoulder, discomfort under the right ribs, sickness, loss of appetite and weight loss, hiccups, a build-up of fluid causing swelling, itching and yellowing of the skin among the signs of secondary breast cancer in the liver, and constant tiredness, constant nausea and unexplained weight loss among the general ones.", action: "call-today", source: BCN_SECONDARY },
    ],
  },
  // ---- Keratinocyte skin cancer: four sets scoped to the disease rather than to any drug.
  {
    id: "skin-surgery-wound",
    label: "Skin cancer: the wound, the graft and the flap in the first fortnight",
    cancerIds: ["skin-cancer", "basal-cell-carcinoma", "cutaneous-scc", "bowens-disease"],
    concernIds: ["skin-graft-and-flap-reconstruction", "mohs-surgery", "wide-local-excision", "facial-scar-after-skin-cancer", "curettage-and-cautery", "surgical-site-infection-prevention"],
    window: "The first two weeks after the operation, while the wound is closing and a graft or flap is taking its blood supply. Bleeding for a few days after Mohs surgery is normal and usually minimal; what follows is what is not.",
    flags: [
      { symptom: "Signs of sepsis", threshold: "Breathing very fast; confused, slurred speech or not making sense; blue, pale or blotchy skin, lips or tongue; a very high or very low temperature, feeling hot or cold to the touch, or shivery; a rash that does not fade when pressed: the NHS says call 999 or go to A and E, and do not drive yourself.", action: "emergency", source: NHS_SEPSIS },
      { symptom: "Bleeding from the wound that does not stop with firm pressure, or that soaks through the dressing", threshold: "The British Association of Dermatologists says it is normal for a Mohs site to bleed during and for a few days after surgery and that this is usually minimal, and that it is more likely if you take blood-thinning tablets or bruise easily. Cancer Research UK says that if the wound continues to bleed or gets worse you should contact the department where you had surgery, or go to A and E.", action: "call-now", source: BAD_MOHS_RF },
      { symptom: "A wound that is red, hot, swollen or oozing, with a high temperature, shivering or feeling generally unwell", threshold: "Cancer Research UK lists the signs of infection after skin cancer surgery as a high temperature, shivering, feeling hot and cold, feeling generally unwell, swelling or redness around the wound, the wound feeling hot, a strong smell or liquid oozing from it, and loss of appetite, and says to tell the doctor or nurse, who will give antibiotics.", action: "call-today", source: CRUK_SKIN_PROBLEMS },
      { symptom: "A graft or a flap that changes colour, or a dressing you are worried about", threshold: "Cancer Research UK says that after a skin graft or a skin flap the nurses and doctors keep a close eye on the wound site to make sure it is getting a good supply of blood, which brings oxygen and nutrients to the healing tissues. That is what they are watching for, so a change in the colour of the graft or flap is worth reporting on the number you were given rather than waiting for the dressing clinic.", action: "call-today", source: CRUK_SKIN_SURGERY },
      { symptom: "A healed scar that becomes swollen or painful, feels warm to the touch, or starts leaking pus", threshold: "The NHS says to ask for an urgent GP appointment or get help from NHS 111 if a scar is swollen or painful, feels warm to the touch, or has pus coming out of it.", action: "call-today", source: NHS_SCARS_RF },
      { symptom: "A painful, red or swollen leg, breathlessness, chest pain or coughing up blood after an operation under general anaesthetic", threshold: "Cancer Research UK says to let the doctor or nurse know about a leg that is swollen, hot, red or sore after surgery, and that the symptoms of a clot moving to the lung are shortness of breath, chest pain, coughing up blood and feeling dizzy or lightheaded, and that if you have any symptoms of a blood clot at home you should contact a doctor immediately, call 999 or go to A and E.", action: "emergency", source: CRUK_SKIN_PROBLEMS },
    ],
  },
  {
    id: "skin-lesion-changing",
    label: "Skin cancer: the mark that is growing, bleeding, ulcerating or not healing",
    cancerIds: ["skin-cancer", "basal-cell-carcinoma", "cutaneous-scc", "bowens-disease"],
    concernIds: ["second-primary-skin-cancer", "sun-protection-after-skin-cancer", "field-cancerisation"],
    window: "For life, and sooner than most people expect: in a meta-analysis of 17 studies the three-year cumulative risk of a further basal cell carcinoma after a first one was 44 percent and of a further squamous cell carcinoma after a first one 18 percent, both at least ten times the rate of first tumours in a comparable general population. Most people who have had one of these cancers are asked to check their own skin monthly rather than to wait for an appointment.",
    flags: [
      { symptom: "A mole, mark or scab anywhere that is growing, changing, bleeding or not healing", threshold: "The British Association of Dermatologists says to see your GP if you notice any moles, marks or scabs that are growing, changing, bleeding or not healing, and that if your GP is concerned you should be referred to a dermatologist through the NHS.", action: "call-today", source: BAD_BCC_RF },
      { symptom: "A change where a skin cancer was treated before, in or beside the scar", threshold: "The British Association of Dermatologists says to see your GP if you are concerned about changes where a basal cell carcinoma was previously treated. In the ten-year randomised trial of facial basal cell carcinoma, 56 percent of the recurrences of primary tumours appeared more than five years after treatment, so a change at an old site matters however long ago it was.", action: "call-today", source: BAD_BCC_RF },
      { symptom: "A scaly, crusted or raised patch that is new, getting bigger, changing, forming a recurrent scab or not healing as expected", threshold: "The British Association of Dermatologists says examining your skin from time to time is strongly advised and to look out in particular for scaly, red and raised areas that are new, increasing in size, changing in appearance, that do not heal as expected or that form a recurrent scab.", action: "call-today", source: BAD_SCC_RF },
      { symptom: "A lump that bleeds easily, has broken down into an ulcer, or is growing over weeks rather than months", threshold: "The British Association of Dermatologists says a squamous cell carcinoma usually looks scaly or crusty, raised and rough, that underneath the scale there may be an ulcer that bleeds easily, and that where there has been a chronic skin ulcer it may stop it healing. Its transplant leaflet describes a squamous cell carcinoma as a rapidly growing scaly or crusted lump, often painful or tender when touched.", action: "call-today", source: BAD_SCC_RF },
    ],
  },
  {
    id: "cscc-nodes-and-nerves",
    label: "Squamous cell carcinoma: the lymph nodes, and the nerve symptoms that mean perineural spread",
    cancerIds: ["cutaneous-scc", "skin-cancer"],
    concernIds: ["perineural-invasion", "second-primary-skin-cancer", "sentinel-node"],
    window: "Most cutaneous squamous cell carcinomas never do either of these. In a ten-year cohort of 985 patients with 1,832 tumours, nodal metastasis occurred in 3.7 percent and 2.1 percent died of the cancer; in a prospective study of 615 patients no tumour 2.0 mm thick or less metastasised, against 4 percent of those 2.1 to 6.0 mm thick and 16 percent of those thicker than 6.0 mm. These cards are for that minority, and the reason to know them is that both are treatable when they are found early.",
    flags: [
      { symptom: "A new lump or swelling in the neck, in front of or behind the ear, in the armpit or in the groin, on the same side as a squamous cell carcinoma you have had", threshold: "The British Association of Dermatologists says a small number of squamous cell carcinomas can recur locally or spread to the lymph nodes or to other parts of the body. Cancer Research UK says surgery to remove nearby lymph nodes is uncommon for these cancers but is done if a squamous cell carcinoma has spread to them, and that for a scalp or face cancer this means the nodes on the same side of the neck.", action: "call-today", source: BAD_SCC_RF },
      { symptom: "New numbness, pins and needles, burning pain or weakness of the face near where a squamous cell carcinoma was treated", threshold: "Perineural invasion in cutaneous squamous cell carcinoma comes in two forms. Clinical perineural invasion is evident from symptoms such as pain, paraesthesia or motor deficits, or from imaging; incidental perineural invasion is identified only histologically, with no symptoms and nothing on a scan. The clinically evident form has the worse prognosis, and symptoms remain key to detecting recurrence.", action: "call-today", source: PNI_CSCC },
      { symptom: "Pain in a skin lump that is growing, if you take medicines that suppress your immune system", threshold: "The British Association of Dermatologists and BSSCII say that in organ transplant recipients one sign which is particularly suspicious for a squamous cell carcinoma is pain in a growing skin lump, and that any skin lump which becomes tender or painful should alert you to seek the opinion of a skin specialist.", action: "call-today", source: BAD_OTR_RF },
      { symptom: "Any new symptom at all between follow-up appointments after a squamous cell carcinoma", threshold: "Cancer Research UK says a squamous cell carcinoma has a higher risk of spreading than a basal cell carcinoma but that this is still unusual, and says to contact the doctor or specialist nurse if you have any concerns between appointments, and to do so if you notice any new symptoms rather than waiting until the next visit.", action: "call-today", source: CRUK_SKIN_FOLLOWUP },
    ],
  },
  {
    id: "skin-cancer-immunosuppressed",
    label: "Skin cancer on immunosuppressants, including after a transplant: what not to wait on",
    cancerIds: ["skin-cancer", "basal-cell-carcinoma", "cutaneous-scc", "bowens-disease"],
    concernIds: ["skin-cancer-after-organ-transplant", "second-primary-skin-cancer", "sun-protection-after-skin-cancer"],
    window: "Squamous cell carcinoma is 150 times more common in transplant recipients than in the general population and basal cell carcinoma up to ten times more common; in a UK study one in three people transplanted for more than ten years had developed a skin cancer, and two in three of those who have had one go on to have several. The threshold for going back is correspondingly lower, and these cards apply whatever the medicine is, not only after a transplant.",
    flags: [
      { symptom: "Any mark on the skin that is new or growing, painful or tingling, bleeding or scabbing, changing in appearance in any way, or not healing completely", threshold: "The British Association of Dermatologists and BSSCII say that if you have had a transplant you should see your doctor about any marks on your skin which are new or growing, painful or tingling, bleeding or scabbing, changing in appearance in any way, or not healing completely, and that most skin cancers, if detected and treated early, can be cured.", action: "call-today", source: BAD_OTR_RF },
      { symptom: "A slow-healing spot, new bleeding from a mole or lesion, or an unusual growing lump", threshold: "The British Association of Dermatologists and BSSCII say that if you see any changes in your skin, such as a slow healing spot, new bleeding from a mole or lesion, or an unusual growing lump, you must tell your GP, nurse, dermatologist or transplant doctor.", action: "call-today", source: BAD_OTR_RF },
      { symptom: "You do not know when your skin is next being checked", threshold: "The British Association of Dermatologists and BSSCII say to check with your doctor or nurse the frequency and setting of your in-clinic skin checks, because this varies depending on your individual risk factors and according to your hospital protocol. There is no single national interval, so not knowing yours is itself worth a phone call.", action: "call-today", source: BAD_OTR_RF },
      { symptom: "Signs of sepsis at any time while taking immunosuppressants", threshold: "Breathing very fast; confused, slurred speech or not making sense; blue, pale or blotchy skin, lips or tongue; a very high or very low temperature, feeling hot or cold to the touch, or shivery; a rash that does not fade when pressed: the NHS says call 999 or go to A and E, and do not drive yourself. Immunosuppression is one of the things that makes an infection harder to fight and easier to miss.", action: "emergency", source: NHS_SEPSIS },
    ],
  },
  {
    id: "lymphoma-neutropenic-sepsis",
    label: "Lymphoma: infection and neutropenic sepsis, including the kind that comes without a fever",
    cancerIds: ["non-hodgkin-lymphoma", "dlbcl", "primary-mediastinal-b-cell-lymphoma", "burkitt-lymphoma", "primary-cns-lymphoma", "follicular-lymphoma", "marginal-zone-lymphoma", "malt-lymphoma", "splenic-marginal-zone-lymphoma", "nodal-marginal-zone-lymphoma", "mantle-cell-lymphoma", "waldenstrom", "peripheral-t-cell-lymphoma", "angioimmunoblastic-t-cell-lymphoma", "cutaneous-t-cell-lymphoma", "sezary-syndrome", "hodgkin-lymphoma", "early-stage-classical-hodgkin-lymphoma", "advanced-stage-classical-hodgkin-lymphoma", "relapsed-refractory-hodgkin-lymphoma", "nodular-lymphocyte-predominant-hodgkin-lymphoma"],
    concernIds: ["febrile-neutropenia", "neutropenia", "central-venous-access", "hypogammaglobulinaemia", "febrile-neutropenia-first-hour"],
    window: "Highest about 7 to 14 days after each dose of chemotherapy, when the white cell count is at its lowest, but a fever at any point counts. Steroids are part of almost every lymphoma regimen and can mask a fever, so the presentation without one is not rare here. After treatment that removes B cells the risk continues for months or years.",
    flags: [
      { symptom: "Temperature of 38 C or higher", threshold: "Lymphoma Action says a common sign of neutropenic sepsis is a body temperature higher than 38 C, that this is known as febrile neutropenia, and to seek medical attention straight away. NICE CG151 asks for antibiotics within an hour of arrival, and treated that fast most people recover: that is why the rule is to ring rather than wait and see.", action: "call-now", source: NICE_CG151 },
      { symptom: "Feeling unwell with a normal temperature, or a temperature below 35 C", threshold: "Lymphoma Action says it is possible to have neutropenic sepsis without a fever, sometimes called cold sepsis, and that treatment with steroids makes this more likely because steroids can mask a fever; for that reason teams also use heart rate, blood pressure, breathing rate and kidney and liver function to check. Its list of infection signs includes a temperature below 35 C, shivering even without a fever, and simply feeling generally unwell, confused or disoriented.", action: "call-now", source: LA_NEUTROPENIA_RF },
      { symptom: "Redness, pain, swelling, heat or discharge around a line", threshold: "Lymphoma Action lists pain, redness, discharge, swelling or heat at the site of a wound or an intravenous line, such as a central line or a PICC line, among the signs of infection to report immediately, even if they seem minor, and says not to wait to see whether they worsen.", action: "call-now", source: LA_INFECTIONS_RF },
      { symptom: "Signs of sepsis", threshold: "Breathing very fast, confusion or slurred speech, blue, pale or blotchy skin, a very high or very low temperature, shivering, or a rash that does not fade when pressed: the NHS says call 999 or go to A and E, and do not drive yourself.", action: "emergency", source: NHS_SEPSIS },
      { symptom: "Any infection at all, months or years after treatment finished", threshold: "Lymphoma Action says that after treatment that removes B cells, including engineered T-cell therapy, antibody levels can stay low for a long time, sometimes several years, and that a low antibody level raises the risk of infection. Contact the team straight away for any sign of infection rather than at the threshold a well person would use, and carry the medical card the team gave you.", action: "call-now", source: LA_INFECTIONS_RF },
    ],
  },
  {
    id: "lymphoma-tumour-lysis",
    label: "Lymphoma: tumour lysis syndrome in the first days of treating bulky or fast-growing disease",
    cancerIds: ["non-hodgkin-lymphoma", "dlbcl", "primary-mediastinal-b-cell-lymphoma", "burkitt-lymphoma", "mantle-cell-lymphoma", "peripheral-t-cell-lymphoma", "angioimmunoblastic-t-cell-lymphoma", "primary-cns-lymphoma"],
    concernIds: ["tumor-lysis-syndrome", "lymphoma-tx-tumour-lysis", "tumour-lysis-syndrome-prevention-and-treatment"],
    window: "The first 12 to 72 hours after treatment starts, and occasionally before it, when a large or fast-growing lymphoma breaks down faster than the kidneys can clear what comes out of it. The risk is concentrated in Burkitt lymphoma, the high-grade B-cell lymphomas and large or rapidly growing diffuse large B-cell lymphoma, which is why a pre-phase of steroid or low-dose chemotherapy, fluids into a vein, frequent blood tests and a drug to lower uric acid come first.",
    flags: [
      { symptom: "Passing much less urine than usual, or none", threshold: "The British Committee for Standards in Haematology guideline on tumour lysis syndrome is built around protecting the kidneys with fluids and monitoring in the first days of treatment. A sharp fall in how much urine you pass is the sign that this is going wrong, and it is a reason to ring the 24-hour number in the night rather than wait for the morning.", action: "call-now", source: BSH_TLS_RF },
      { symptom: "Muscle cramps, twitching, or tingling around the mouth or in the fingers", threshold: "These are the symptoms of the salt disturbances the guideline monitors for in the first days of treatment. On their own they are a reason to ring the 24-hour number now; with a seizure, a collapse or a loss of consciousness, call 999.", action: "call-now", source: BSH_TLS_RF },
      { symptom: "A racing, thumping or irregular heartbeat, or chest pain, in the first days of treatment", threshold: "A rising potassium level can disturb the heart rhythm, which is the reason blood is checked frequently during the first cycle. The triage standard sends chest pain or tightness straight to 999 whatever the cause.", action: "emergency", source: UKONS },
      { symptom: "Being sick repeatedly, unable to keep fluids down, or becoming confused or very drowsy", threshold: "The guideline's whole approach rests on keeping the person well hydrated and the blood chemistry monitored while the lymphoma breaks down. Someone who cannot drink needs fluids into a vein, and that means being seen rather than advised over the telephone.", action: "call-now", source: BSH_TLS_RF },
    ],
  },
  {
    id: "lymphoma-crs-icans",
    label: "After engineered T cells or a bispecific antibody: cytokine release syndrome and neurotoxicity, and what a relative should watch for",
    cancerIds: ["non-hodgkin-lymphoma", "dlbcl", "primary-mediastinal-b-cell-lymphoma", "follicular-lymphoma", "mantle-cell-lymphoma", "marginal-zone-lymphoma"],
    concernIds: ["crs", "icans", "lymphoma-tx-crs-icans", "lymphoma-tx-car-t-pathway", "lymphoma-tx-bispecific-step-up", "crs-grading-and-management", "icans-grading-and-management", "bispecific-step-up-dosing"],
    window: "Cytokine release syndrome most commonly develops within 10 days of an engineered T-cell infusion; neurotoxicity generally within 28 days and often within a few days. The step-up doses of a bispecific antibody are given in hospital for the same reason. This is why Lymphoma Action says to stay within about an hour or two of the centre for four weeks and to have someone with you at all times.",
    flags: [
      { symptom: "Fever, chills, a racing heart, feeling faint or short of breath", threshold: "Lymphoma Action says almost everyone treated with engineered T cells has some level of cytokine release syndrome, most commonly within 10 days of the infusion, and lists fever and chills, a rapid heart rate, low blood pressure, low oxygen, headache, and feeling or being sick. Most cases are mild and easily treated, and they are treated faster the earlier the team hears.", action: "call-now", source: LA_CAR_T_RF },
      { symptom: "Confusion, difficulty finding words, difficulty writing, tremor or trouble moving", threshold: "Lymphoma Action says around 1 in 4 people treated with engineered T cells develop neurotoxicity, generally within 28 days of the infusion and often within a few days, and lists confusion, speech problems, difficulty writing, headache and dizziness, shaking or tremor, and movement difficulty. Symptoms are usually mild and settle in a week or two, and the team needs to know at the first sign.", action: "call-now", source: LA_CAR_T_RF },
      { symptom: "For the person staying with them: they are not themselves", threshold: "Lymphoma Action says someone must be with you at all times for four weeks after the infusion because of the possibility of delayed side effects. Ask them to write one short sentence by hand each day, and ring if the handwriting changes, if they lose the thread of a sentence, if they are unusually sleepy, or if they simply seem not themselves. That is a call to make, not a judgement to second-guess.", action: "call-now", source: LA_CAR_T_RF },
      { symptom: "A seizure, a collapse, or being difficult to rouse", threshold: "Lymphoma Action says a small number of people have more serious problems such as seizures or swelling of the brain, treated with steroids and intensive care, and that most improve within a few days of treatment starting. This is 999.", action: "emergency", source: LA_CAR_T_RF },
      { symptom: "Driving again after any episode of confusion", threshold: "Lymphoma Action says that if you develop neurotoxicity you will be advised not to drive for 8 weeks following the onset of symptoms. Ask the team to confirm the date in writing before you drive again.", action: "call-today", source: LA_CAR_T_RF },
    ],
  },
  {
    id: "lymphoma-cord-compression",
    label: "Lymphoma pressing on the spinal cord: the hours matter",
    cancerIds: ["non-hodgkin-lymphoma", "dlbcl", "primary-mediastinal-b-cell-lymphoma", "burkitt-lymphoma", "primary-cns-lymphoma", "follicular-lymphoma", "marginal-zone-lymphoma", "malt-lymphoma", "splenic-marginal-zone-lymphoma", "nodal-marginal-zone-lymphoma", "mantle-cell-lymphoma", "waldenstrom", "peripheral-t-cell-lymphoma", "angioimmunoblastic-t-cell-lymphoma", "cutaneous-t-cell-lymphoma", "sezary-syndrome", "hodgkin-lymphoma", "early-stage-classical-hodgkin-lymphoma", "advanced-stage-classical-hodgkin-lymphoma", "relapsed-refractory-hodgkin-lymphoma", "nodular-lymphocyte-predominant-hodgkin-lymphoma"],
    concernIds: ["metastatic-spinal-cord-compression", "metastatic-spinal-cord-compression-emergency"],
    window: "NICE NG234 treats new cord compression symptoms in anyone with a past or current diagnosis of cancer as an oncological emergency, and asks for advice within 24 hours for the pain pattern that suggests spinal metastases. Treated quickly the damage is usually recoverable; left for days it may not be. This applies at any time after a diagnosis, including years later.",
    flags: [
      { symptom: "Not being able to pass urine, or losing control of your bladder or bowel", threshold: "Macmillan lists difficulty passing urine, loss of bladder or bowel control and constipation among the signs of spinal cord compression and says to contact the hospital straight away. If you cannot reach anyone, go to A and E and say you have lymphoma and symptoms of spinal cord compression.", action: "emergency", source: MAC_MSCC_RF },
      { symptom: "New weakness, heaviness or unsteadiness in the legs or arms", threshold: "Macmillan lists weakness in the arms or legs, difficulty walking and a feeling of heaviness or clumsiness among the signs. Do not wait to see whether it settles overnight.", action: "emergency", source: MAC_MSCC_RF },
      { symptom: "Numbness or tingling in the legs, buttocks or around the back passage", threshold: "A band of numbness or pins and needles, or altered sensation when wiping, is part of the same picture and comes before the weakness in some people.", action: "emergency", source: MAC_MSCC_RF },
      { symptom: "New back or neck pain that is severe, worse lying flat, or wakes you at night", threshold: "NICE NG234 asks teams to get advice within 24 hours for the pain pattern that suggests spinal metastases, including pain in the middle of the back, pain that is worse on lying flat or that wakes the person at night, and pain that is progressive and unrelieved.", action: "call-now", source: NG234_MSCC },
    ],
  },
  {
    id: "lymphoma-svc-obstruction",
    label: "Lymphoma in the chest: swelling of the face, neck and arms (superior vena cava obstruction)",
    cancerIds: ["non-hodgkin-lymphoma", "dlbcl", "primary-mediastinal-b-cell-lymphoma", "hodgkin-lymphoma", "early-stage-classical-hodgkin-lymphoma", "advanced-stage-classical-hodgkin-lymphoma", "relapsed-refractory-hodgkin-lymphoma"],
    concernIds: ["superior-vena-cava-obstruction", "svc-obstruction"],
    window: "Macmillan says the symptoms can develop over a few days or over a few weeks, so a change over a week still counts as new. It happens when a mass in the chest presses on the large vein returning blood from the head and arms, and a large mass in the middle of the chest is a defining feature of primary mediastinal large B-cell lymphoma and common in Hodgkin lymphoma.",
    flags: [
      { symptom: "Swelling of the face, neck, arms or hands", threshold: "Macmillan describes swelling of the face, neck, arms and hands, with veins on the chest and neck that look more prominent than usual, as the picture of superior vena cava obstruction, and says to contact the team straight away.", action: "call-now", source: MAC_SVCO },
      { symptom: "Breathlessness, a cough, or a feeling of fullness in the head that is worse lying down or bending forward", threshold: "Macmillan lists breathlessness, cough, headache, dizziness and a feeling of fullness in the head, often worse when lying down or bending forward, among the symptoms. Breathlessness at rest is 999 whatever the cause.", action: "call-now", source: MAC_SVCO },
      { symptom: "Struggling to breathe, noisy breathing, difficulty swallowing, or confusion", threshold: "These are the signs that the airway or the brain is being affected rather than only the veins. The triage standard sends shortness of breath at rest and any altered level of consciousness straight to 999.", action: "emergency", source: UKONS },
      { symptom: "Before a diagnosis: swelling of the face or neck alongside a lump above the collarbone", threshold: "The NHS lists a painless swelling, most often in the neck, armpit or groin, as the commonest sign of non-Hodgkin lymphoma. Where that comes with swelling of the face or neck, or with new breathlessness, it is a reason to be seen the same day rather than to wait for a routine appointment.", action: "call-now", source: NHS_NHL_SYMPTOMS_RF },
    ],
  },
  {
    id: "lymphoma-hepatitis-b-reactivation",
    label: "Hepatitis B waking up during antibody treatment for a B-cell lymphoma",
    cancerIds: ["non-hodgkin-lymphoma", "dlbcl", "primary-mediastinal-b-cell-lymphoma", "burkitt-lymphoma", "follicular-lymphoma", "marginal-zone-lymphoma", "malt-lymphoma", "splenic-marginal-zone-lymphoma", "nodal-marginal-zone-lymphoma", "mantle-cell-lymphoma", "waldenstrom", "primary-cns-lymphoma"],
    concernIds: ["lymphoma-tx-hepatitis-b-reactivation", "hepatitis-b-screening-and-reactivation-prophylaxis"],
    window: "Antibodies that remove B cells can let a hepatitis B infection the person had years ago become active again, during treatment or in the months after it. This is why hepatitis B is on the list of blood tests before treatment, and why an antiviral tablet is prescribed alongside for anyone who tests positive.",
    flags: [
      { symptom: "Yellow skin or eyes, dark urine or pale stools", threshold: "Yellowing during or after antibody treatment for a B-cell lymphoma is a reason to be seen the same day and to have liver blood tests, not to wait for the next cycle.", action: "call-now", source: LA_DLBCL_RF },
      { symptom: "New tiredness, loss of appetite, nausea or pain under the right ribs", threshold: "These come before the yellowing. In the randomised comparison of two antiviral tablets in 121 people with hepatitis B surface antigen receiving R-CHOP, hepatitis B related hepatitis occurred in 13.3 per cent of those given lamivudine and none of those given entecavir, and reactivation in 30 per cent against 6.6 per cent, so which tablet you are on is a fair question.", action: "call-now", source: HBV_ENTECAVIR_RF },
      { symptom: "You were never tested for hepatitis B before the antibody treatment started", threshold: "Testing for hepatitis B before anti-CD20 antibody treatment is standard, and an antiviral is given from before the first dose until months after chemotherapy finishes for anyone who tests positive. If you do not know your result, ask for it.", action: "call-today", source: HBV_ENTECAVIR_RF },
    ],
  },
];

/** Cancer-scoped sets: the emergencies of the disease itself, independent of any product. */
export function redFlagsForCancerId(cancerId: string): RedFlagSet[] {
  return redFlagSets.filter((s) => s.cancerIds?.includes(cancerId));
}

/** Every red-flag set that applies to a product: matched by id, then by modality. `general` and cancer-scoped sets are not included. */
export function redFlagsFor(drugId: string, modality?: string): RedFlagSet[] {
  const m = (modality ?? "").toLowerCase();
  return redFlagSets.filter((s) => s.drugIds?.includes(drugId) || (s.modalityRe && m && new RegExp(s.modalityRe, "i").test(m)));
}

/**
 * Every distinct source cited by a red-flag row, for the weekly link check (`scripts/check-links.ts`).
 * Red-flag rows are not corpus entities, so they are invisible to the entity-walking collector; without
 * this export a dead urgent-advice citation is never noticed. See the note at the top of this file on
 * verifying a PDF source properly.
 */
export function redFlagSources(): { label: string; url: string }[] {
  const byUrl = new Map<string, { label: string; url: string }>();
  for (const s of [GENERAL_RED_FLAGS, ...redFlagSets]) for (const f of s.flags) if (!byUrl.has(f.source.url)) byUrl.set(f.source.url, f.source);
  return [...byUrl.values()].sort((a, b) => a.url.localeCompare(b.url));
}

/** The URLs of `redFlagSources()`, in the same order. */
export const redFlagSourceUrls = (): string[] => redFlagSources().map((s) => s.url);
