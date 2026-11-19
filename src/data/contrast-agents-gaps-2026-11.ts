/**
 * Contrast agents and surgical dyes, November 2026 round. Filled from the imaging-contrast-dyes rows of
 * docs/proposals/gap-census-2026-11.md: the gadolinium, iron, iodinated, barium and microbubble agents and the blue dyes
 * that Drugs@FDA and the WHO ATC index (V08 contrast media) list, with three family records that hold them together.
 *
 * Application numbers, sponsors and original approval dates were read from the openFDA Drugs@FDA endpoint on
 * 4 November 2026; indications are quoted from the current FDA label (openFDA drug label endpoint, or DailyMed where
 * openFDA had none); European rows from the EMA medicines register spreadsheet of the same date; ATC codes from the
 * WHO Collaborating Centre's index pages for V08CA, V08AB, V08DA, V08CB and V04CX. An original approval date is the
 * first approval of that application, not necessarily the first approval of the substance anywhere.
 *
 * Not filled, and why: patent blue V (ATC V04CX09) and iobitridol (V08AB11) have an ATC code but no regulator label that
 * could be read here; perflubutane microspheres (Sonazoid, V08DA06) likewise; fluorescein was left to its existing
 * mentions because its labels are for eye angiography.
 */
import type { CompanyInput, DrugInput, TechnologyInput } from "@/lib/schema";

const asOf = "2026-11-04";
const tags = ["contrast-agents-gaps-2026-11", "diagnostic"];
const provenance = { editedBy: "OnCo contrast agent gap fill (Drugs@FDA, FDA labels, DailyMed, EMA register, WHO ATC index)", editedOn: asOf };

type D = Omit<DrugInput, "kind" | "asOf" | "provenance">;
const d = (x: D): DrugInput => ({ kind: "drug", asOf, provenance, ...x, tags: [...tags, ...(x.tags ?? [])] } as DrugInput);
type Tc = Omit<TechnologyInput, "kind" | "asOf">;
const tech = (x: Tc): TechnologyInput => ({ kind: "technology", asOf, tags: ["contrast-agents-gaps-2026-11"], provenance, ...x } as TechnologyInput);
type Co = Omit<CompanyInput, "kind" | "asOf">;
const co = (x: Co): CompanyInput => ({ kind: "company", asOf, tags: ["contrast-agents-gaps-2026-11"], provenance, ...x } as CompanyInput);

const daf = (appl: string, what: string) => ({ label: `Drugs@FDA ${what}`, url: `https://www.accessdata.fda.gov/scripts/cder/daf/index.cfm?event=overview.process&ApplNo=${appl}` });
const dm = (setid: string, what: string) => ({ label: `DailyMed label: ${what}`, url: `https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=${setid}` });
const atc = (code: string, what: string) => ({ label: `WHO ATC index ${code}: ${what}`, url: `https://atcddd.fhi.no/atc_ddd_index/?code=${code}&showdescription=no` });
const epar = (slug: string, what: string) => ({ label: `EMA: ${what}`, url: `https://www.ema.europa.eu/en/medicines/human/EPAR/${slug}` });

const GBCA_BOX = "Like every gadolinium-based contrast agent in the United States, its label carries a boxed warning on the risks of intrathecal use and nephrogenic systemic fibrosis, a thickening of skin and organs seen in people with severe kidney disease.";
const GBCA = ["gadolinium-based-contrast-agents", "mri"];
const ICM = ["iodinated-contrast-media", "ct"];
const UCA = ["ultrasound-contrast-agents", "ultrasound", "ultrasound-elastography-ceus"];

export const contrastAgentDrugs: DrugInput[] = [
  // Gadolinium and iron MRI agents
  d({ id: "gadoxetate-disodium", name: "Gadoxetate disodium (liver-specific MRI contrast)", brand: "Eovist", aka: ["gadoxetate", "gadoxetic acid", "Eovist"], status: "approved",
    modality: "Gadolinium-based contrast agent for MRI of the liver (intravenous)", mechanism: "A gadolinium chelate that shortens the relaxation time of nearby water protons, brightening tissue on MRI. Part of each dose is taken up by working liver cells, so lesions without normal liver cells stand out in the later images.",
    tldr: "An MRI dye injected into a vein that is absorbed by healthy liver cells, so spots in the liver that are not normal liver tissue show up clearly. It is used to find and characterise liver tumours.",
    summary: "The FDA label (Bayer, NDA 022090, first approved 3 July 2008) says EOVIST \"is indicated for use in magnetic resonance imaging (MRI) of the liver to detect and characterize lesions in adult and pediatric patients, including term neonates, with known or suspected focal liver disease\". The WHO lists it as gadoxetic acid (ATC V08CA10). " + GBCA_BOX,
    approvals: [{ region: "US", year: 2008, indication: "MRI of the liver to detect and characterise lesions in known or suspected focal liver disease", note: "NDA 022090; Bayer" }],
    cancers: ["hcc"], companies: ["bayer"], technologies: GBCA,
    links: [daf("022090", "Eovist (NDA 022090)"), dm("6218b1e1-cbc3-4c14-bec7-528ac163a561", "Eovist"), atc("V08CA", "paramagnetic contrast media")] }),

  d({ id: "gadobutrol", name: "Gadobutrol", brand: "Gadavist", aka: ["gadobutrol", "Gadavist", "Pixxoscan"], status: "approved",
    modality: "Gadolinium-based contrast agent for MRI (intravenous)", mechanism: "A gadolinium chelate that shortens proton relaxation times, so tissues where it leaks out of blood vessels, such as tumours with a disrupted blood-brain barrier or abnormal vessels, appear bright on MRI.",
    tldr: "A widely used MRI dye given into a vein. Its American licence includes brain and spine scans and breast MRI to see how far a breast cancer extends.",
    summary: "The FDA label (Bayer, NDA 201277, first approved 14 March 2011) covers MRI of the central nervous system \"to detect and visualize areas with disrupted blood brain barrier and/or abnormal vascularity\", MRI of the breast \"to assess the presence and extent of malignant breast disease in adult patients\", MR angiography and cardiac MRI. A generic gadobutrol, GE Healthcare's Pixxoscan, was approved under ANDA 215957 on 29 June 2026. ATC V08CA09. " + GBCA_BOX,
    approvals: [{ region: "US", year: 2011, indication: "MRI of the central nervous system; breast MRI to assess the presence and extent of malignant breast disease; MR angiography; cardiac MRI", note: "NDA 201277; Bayer" }],
    cancers: ["breast-cancer", "glioblastoma", "secondary-brain-tumours"], companies: ["bayer", "ge-healthcare"], technologies: [...GBCA, "breast-mri-coils-abbreviated-mri"],
    links: [daf("201277", "Gadavist (NDA 201277)"), dm("bd28560f-de4d-4140-874e-31df823f4dbb", "Gadavist"), daf("215957", "Pixxoscan (ANDA 215957)"), atc("V08CA", "paramagnetic contrast media")] }),

  d({ id: "gadoterate-meglumine", name: "Gadoterate meglumine", brand: "Dotarem", aka: ["gadoterate", "gadoteric acid", "Dotarem", "Clariscan"], status: "approved",
    modality: "Gadolinium-based contrast agent for MRI of the brain and spine (intravenous)", mechanism: "A gadolinium chelate that brightens tissue on MRI where it leaves the blood, showing areas with a disrupted blood-brain barrier or abnormal vessels.",
    tldr: "An MRI dye given into a vein for scans of the brain and spine, used for example to show brain tumours and metastases.",
    summary: "Guerbet's Dotarem (NDA 204781, first approved 20 March 2013) is indicated \"for intravenous use with magnetic resonance imaging (MRI) in brain (intracranial), spine and associated tissues in adult and pediatric patients (including term neonates) to detect and visualize areas with disruption of the blood brain barrier (BBB) and/or abnormal vascularity\". GE Healthcare's Clariscan is an approved generic (ANDA 210016, 1 November 2019) with the same indication. ATC V08CA02 (gadoteric acid). " + GBCA_BOX,
    approvals: [{ region: "US", year: 2013, indication: "MRI of the brain, spine and associated tissues to visualise areas with disrupted blood-brain barrier or abnormal vascularity", note: "NDA 204781; Guerbet" }],
    cancers: ["glioblastoma", "secondary-brain-tumours"], companies: ["guerbet", "ge-healthcare"], technologies: GBCA,
    links: [daf("204781", "Dotarem (NDA 204781)"), dm("82b83e61-6af8-4225-aa39-8cbf206f65b0", "Dotarem"), daf("210016", "Clariscan (ANDA 210016)"), atc("V08CA", "paramagnetic contrast media")] }),

  d({ id: "gadobenate-dimeglumine", name: "Gadobenate dimeglumine", brand: "MultiHance", aka: ["gadobenate", "gadobenic acid", "MultiHance"], status: "approved",
    modality: "Gadolinium-based contrast agent for MRI (intravenous)", mechanism: "A gadolinium chelate that shortens proton relaxation times and brightens tissue on MRI where it leaks from blood vessels.",
    tldr: "An MRI dye given into a vein for scans of the brain and spine and for imaging blood vessels.",
    summary: "Bracco's MultiHance (NDA 021357, first approved 23 November 2004) is indicated for MRI of the central nervous system \"to visualize lesions with abnormal blood-brain barrier or abnormal vascularity of the brain, spine, and associated tissues\" and for MR angiography of renal and aorto-ilio-femoral vessels. ATC V08CA08 (gadobenic acid). " + GBCA_BOX,
    approvals: [{ region: "US", year: 2004, indication: "MRI of the central nervous system; MR angiography of renal and aorto-ilio-femoral vessels", note: "NDA 021357; Bracco" }],
    cancers: ["glioblastoma", "secondary-brain-tumours"], companies: ["bracco"], technologies: GBCA,
    links: [daf("021357", "MultiHance (NDA 021357)"), dm("59077a3e-5f03-4342-ae24-856267545631", "MultiHance"), atc("V08CA", "paramagnetic contrast media")] }),

  d({ id: "gadoteridol", name: "Gadoteridol", brand: "ProHance", aka: ["gadoteridol", "ProHance"], status: "approved",
    modality: "Gadolinium-based contrast agent for MRI of the brain, spine and head and neck (intravenous)", mechanism: "A gadolinium chelate that brightens tissue on MRI where it leaves the blood.",
    tldr: "An MRI dye given into a vein for scans of the brain, spine, and head and neck.",
    summary: "Bracco's ProHance (NDA 020131, first approved 16 November 1992) is indicated for MRI to visualise \"lesions with disrupted blood brain barrier and/or abnormal vascularity in the brain (intracranial lesions), spine and associated tissues\" in adults and children including term neonates, and \"lesions in the head and neck in adults\". ATC V08CA04. " + GBCA_BOX,
    approvals: [{ region: "US", year: 1992, indication: "MRI of the brain, spine and associated tissues; MRI of the head and neck in adults", note: "NDA 020131; Bracco" }],
    cancers: ["glioblastoma", "head-and-neck"], companies: ["bracco"], technologies: GBCA,
    links: [daf("020131", "ProHance (NDA 020131)"), dm("778aee03-7d4c-481a-be8a-a75db0702f5a", "ProHance"), atc("V08CA", "paramagnetic contrast media")] }),

  d({ id: "gadopiclenol", name: "Gadopiclenol", brand: "Elucirem", aka: ["gadopiclenol", "Elucirem", "Vueway"], status: "approved",
    modality: "Gadolinium-based contrast agent for MRI of the brain and body (intravenous)", mechanism: "A gadolinium chelate that brightens tissue on MRI where it leaks from abnormal blood vessels.",
    tldr: "A newer MRI dye given into a vein, approved in 2022 in the United States and 2023 in Europe, for brain and body scans including the liver, breast, lung and prostate in Europe.",
    summary: "Guerbet's Elucirem (NDA 216986, first approved 21 September 2022) and Bracco's Vueway carry the same American indication: MRI \"to detect and visualize lesions with abnormal vascularity in: the central nervous system (brain, spine, and associated tissues) the body (head and neck, thorax, abdomen, pelvis, and musculoskeletal system)\" in adults and children including term neonates. Both were authorised in the European Union on 7 December 2023 (EMEA/H/C/005626 and 006172) for pathologies of the central nervous system and of \"the liver, kidney, pancreas, breast, lung, prostate, and musculoskeletal system\". ATC V08CA12. " + GBCA_BOX,
    approvals: [{ region: "US", year: 2022, indication: "MRI of lesions with abnormal vascularity in the central nervous system and the body", note: "NDA 216986; Guerbet (Elucirem) and Bracco (Vueway)" }, { region: "EU", year: 2023, indication: "Contrast-enhanced MRI of the central nervous system and the liver, kidney, pancreas, breast, lung, prostate and musculoskeletal system", note: "Authorised 7 Dec 2023; Guerbet and Bracco Imaging" }],
    cancers: ["glioblastoma", "hcc", "breast-cancer", "prostate"], companies: ["guerbet", "bracco"], technologies: GBCA,
    links: [daf("216986", "Elucirem (NDA 216986)"), dm("192725e9-e83e-1a36-33f2-abee55792ab3", "Vueway"), epar("elucirem", "Elucirem"), epar("vueway", "Vueway"), atc("V08CA", "paramagnetic contrast media")] }),

  d({ id: "gadoquatrane", name: "Gadoquatrane", brand: "Ambelvist", aka: ["gadoquatrane", "Ambelvist"], status: "approved",
    modality: "Gadolinium-based contrast agent for MRI of the brain and body (intravenous)", mechanism: "A gadolinium-based chelate that brightens tissue on MRI where it leaks from abnormal blood vessels.",
    tldr: "A gadolinium MRI dye approved in the United States in 2026 for brain and body scans.",
    summary: "Bayer's Ambelvist (NDA 219627, original approval dated 12 June 2026 in Drugs@FDA) is indicated in adults and children, including term neonates, for MRI \"to detect and visualize lesions with abnormal vascularity in: the central nervous system (brain, spine, and associated tissues) the body (head and neck, thorax, abdomen, pelvis, and musculoskeletal system)\". ATC V08CA13. " + GBCA_BOX,
    approvals: [{ region: "US", year: 2026, indication: "MRI of lesions with abnormal vascularity in the central nervous system and the body", note: "NDA 219627; Bayer" }],
    cancers: ["glioblastoma", "secondary-brain-tumours"], companies: ["bayer"], technologies: GBCA,
    links: [daf("219627", "Ambelvist (NDA 219627)"), dm("fac80f5d-8d37-4237-bb52-0faef0dd46aa", "Ambelvist"), atc("V08CA", "paramagnetic contrast media")] }),

  d({ id: "gadodiamide", name: "Gadodiamide", brand: "Omniscan", aka: ["gadodiamide", "Omniscan"], status: "approved",
    modality: "Gadolinium-based contrast agent for MRI (intravenous)", mechanism: "A gadolinium chelate that brightens tissue on MRI where it leaks from blood vessels.",
    tldr: "An older MRI dye given into a vein for scans of the brain, spine, chest, abdomen and pelvis.",
    summary: "GE Healthcare's Omniscan (NDA 020123, first approved 8 January 1993) is indicated to \"Visualize lesions with abnormal vascularity in the brain, spine, and associated tissues\" and to \"Facilitate the visualization of lesions with abnormal vascularity within the thoracic, abdominal, pelvic cavities, and the retroperitoneal space\". ATC V08CA03. " + GBCA_BOX,
    approvals: [{ region: "US", year: 1993, indication: "MRI of lesions with abnormal vascularity in the central nervous system and the body", note: "NDA 020123; GE Healthcare" }],
    companies: ["ge-healthcare"], technologies: GBCA,
    links: [daf("020123", "Omniscan (NDA 020123)"), dm("1e9a37e2-f28a-4373-bf0f-3e9b60f42d8a", "Omniscan"), atc("V08CA", "paramagnetic contrast media")] }),

  d({ id: "ferabright-ferumoxytol", name: "Ferumoxytol for brain MRI (FeraBright)", brand: "FeraBright", aka: ["FeraBright", "ferumoxytol MRI contrast"], status: "approved",
    modality: "Iron-based contrast agent for MRI of the brain (intravenous)", mechanism: "Iron oxide nanoparticles coated with carbohydrate stay in the blood for a long time and alter the MRI signal where they leak into tissue through a disrupted blood-brain barrier.",
    tldr: "An iron-based MRI dye, not gadolinium, approved in the United States in 2025 for brain scans in adults with known or suspected brain tumours.",
    summary: "Azurity's FeraBright (NDA 219868, first approved 16 October 2025) \"is indicated for magnetic resonance imaging (MRI) of the brain in adults with known or suspected malignant neoplasms in the brain to visualize lesions with a disrupted blood-brain barrier\". Its label carries a boxed warning: \"Fatal and serious hypersensitivity reactions, including anaphylaxis, have occurred in patients receiving ferumoxytol products that contain the same active ingredient as FERABRIGHT\". Ferumoxytol is also sold as an iron replacement medicine; this record is about the imaging product.",
    approvals: [{ region: "US", year: 2025, indication: "MRI of the brain in adults with known or suspected malignant neoplasms in the brain", note: "NDA 219868; Azurity" }],
    cancers: ["glioblastoma", "secondary-brain-tumours"], technologies: ["mri", "gadolinium-based-contrast-agents"],
    links: [daf("219868", "FeraBright (NDA 219868)"), dm("ac666008-a14f-43b4-9d06-ec70f45a4234", "FeraBright")] }),

  d({ id: "mangafodipir", name: "Mangafodipir (withdrawn liver MRI contrast)", brand: "Teslascan", aka: ["mangafodipir", "mangafodipir trisodium", "Teslascan"], status: "withdrawn",
    modality: "Manganese-based contrast agent for MRI of the liver and pancreas (intravenous, withdrawn)", mechanism: "A manganese chelate taken up by liver cells, brightening normal liver on MRI so lesions without normal liver cells stand out.",
    tldr: "A liver MRI dye based on manganese that was authorised in Europe from 1997 to 2012 for finding liver metastases and liver cancer, and is no longer available.",
    summary: "The EMA register lists Teslascan (GE Healthcare AS, EMEA/H/C/000137), authorised on 22 May 1997 as a \"Contrast medium for diagnostic magnetic resonance imaging (MRI) for the detection of lesions of the liver suspected to be due to metastatic disease or hepatocellular carcinomas\" and an adjunct for focal pancreatic lesions, with the authorisation withdrawn on 21 June 2012; the EMA page says the company withdrew it voluntarily \"for commercial reasons\". In the United States, Drugs@FDA lists Teslascan (NDA 020652) with a first approval dated 26 November 1997 and a marketing status of discontinued (read 18 November 2026). ATC V08CA05. Liver-specific imaging is now done with gadoxetate.",
    approvals: [{ region: "EU", year: 1997, indication: "MRI detection of liver lesions suspected to be metastases or hepatocellular carcinoma; adjunct for focal pancreatic lesions", note: "Withdrawn 21 Jun 2012; GE Healthcare AS" }],
    cancers: ["hcc", "pancreatic"], companies: ["ge-healthcare"], technologies: GBCA, related: ["gadoxetate-disodium"],
    links: [epar("teslascan", "Teslascan"), daf("020652", "Teslascan (NDA 020652)"), atc("V08CA", "paramagnetic contrast media")] }),

  d({ id: "ferumoxtran-10", name: "Ferumoxtran-10 (Sinerem, lymph node MRI contrast)", brand: "Sinerem", aka: ["ferumoxtran-10", "Sinerem", "iron oxide nanoparticles"], status: "withdrawn",
    modality: "Iron oxide nanoparticle contrast agent for lymph node MRI (application withdrawn in Europe)", mechanism: "Ultrasmall iron oxide nanoparticles, a superparamagnetic contrast medium, change the MRI signal of tissues that take them up; the product was developed to image lymph nodes.",
    tldr: "An iron-based MRI dye designed to show whether lymph nodes contain cancer. Its European application was withdrawn in 2007 and it is not authorised there.",
    summary: "The EMA register lists Sinerem (iron oxide, Guerbet, EMEA/H/C/000801) with the status \"Application withdrawn\", the withdrawal dated 13 December 2007. The WHO index lists iron oxide nanoparticles as ATC V08CB03 among superparamagnetic contrast media.",
    approvals: [],
    companies: ["guerbet"], technologies: ["mri", "gadolinium-based-contrast-agents"],
    links: [epar("sinerem", "Sinerem"), atc("V08CB", "superparamagnetic contrast media")] }),

  // Iodinated and barium X-ray and CT agents
  d({ id: "iohexol", name: "Iohexol", brand: "Omnipaque", aka: ["iohexol", "Omnipaque"], status: "approved",
    modality: "Iodinated contrast agent for CT and X-ray imaging (intravenous, intra-arterial, intrathecal, oral, rectal)", mechanism: "A non-ionic, low-osmolar iodinated molecule; iodine absorbs X-rays strongly, so blood vessels, organs and enhancing tumours appear bright on CT and X-ray.",
    tldr: "One of the commonest dyes used for CT scans, given into a vein, by mouth or in other ways depending on the scan.",
    summary: "GE Healthcare's Omnipaque (NDA 018956, first approved 26 December 1985) \"is a radiographic contrast agent indicated for intrathecal, intra-arterial, intravenous, oral, rectal, intraarticular, and body cavity imaging procedures in adults and pediatric patients\"; intravenous indications include \"CT of the head and body\". Its boxed warning concerns using only the iodine concentrations recommended for intrathecal procedures. ATC V08AB02.",
    approvals: [{ region: "US", year: 1985, indication: "Intrathecal, intra-arterial, intravenous, oral, rectal, intra-articular and body cavity imaging, including CT of the head and body", note: "NDA 018956; GE Healthcare" }],
    companies: ["ge-healthcare"], technologies: ICM,
    links: [daf("018956", "Omnipaque (NDA 018956)"), dm("5088be1d-a708-1cac-e063-6394a90a2aff", "Omnipaque"), atc("V08AB", "low osmolar X-ray contrast media")] }),

  d({ id: "iodixanol", name: "Iodixanol", brand: "Visipaque", aka: ["iodixanol", "Visipaque"], status: "approved",
    modality: "Iodinated contrast agent for CT and angiography (intravenous, intra-arterial)", mechanism: "A non-ionic iodinated dimer that is iso-osmolar with blood; its iodine absorbs X-rays, so vessels and enhancing tissues appear bright.",
    tldr: "A CT and angiography dye given into a vein or artery.",
    summary: "GE Healthcare's Visipaque (NDA 020351, first approved 22 March 1996) is indicated for intra-arterial procedures and intravenous procedures including \"Computed tomography (CT) imaging head and body\", excretory urography and coronary CT angiography. Its label carries a boxed warning: \"NOT FOR INTRATHECAL USE\". ATC V08AB09.",
    approvals: [{ region: "US", year: 1996, indication: "Intra-arterial angiography; intravenous CT of the head and body, excretory urography and coronary CT angiography", note: "NDA 020351; GE Healthcare" }],
    companies: ["ge-healthcare"], technologies: ICM,
    links: [daf("020351", "Visipaque (NDA 020351)"), dm("e9d87b8c-7695-4c0f-8e81-000dedb5f66d", "Visipaque"), atc("V08AB", "low osmolar X-ray contrast media")] }),

  d({ id: "iopamidol", name: "Iopamidol", brand: "Isovue", aka: ["iopamidol", "Isovue", "Isovue-M"], status: "approved",
    modality: "Iodinated contrast agent for CT, angiography and myelography (intravenous, intrathecal)", mechanism: "A non-ionic low-osmolar iodinated molecule that makes vessels, organs and enhancing tissue appear bright on X-ray and CT.",
    tldr: "A CT and X-ray dye made by Bracco, sold for injection into a vein and, in a separate form, into the spinal fluid for myelography.",
    summary: "Drugs@FDA lists Bracco's iopamidol products under NDA 018735, first approved 31 December 1985, including Isovue-300 and Isovue-370 for injection and Isovue-M 200 and 300. The Isovue-M label is for myelography, CT myelography and CT cisternography. ATC V08AB04.",
    approvals: [{ region: "US", year: 1985, indication: "Radiographic contrast for injection (Isovue) and myelography (Isovue-M)", note: "NDA 018735; Bracco" }],
    companies: ["bracco"], technologies: ICM,
    links: [daf("018735", "Isovue (NDA 018735)"), dm("11e893d2-0183-4581-b908-c8b7302c7edb", "Isovue-M"), atc("V08AB", "low osmolar X-ray contrast media")] }),

  d({ id: "iopromide", name: "Iopromide", brand: "Ultravist", aka: ["iopromide", "Ultravist"], status: "approved",
    modality: "Iodinated contrast agent for CT, angiography and contrast-enhanced mammography (intravenous, intra-arterial)", mechanism: "A non-ionic low-osmolar iodinated molecule; enhancing tumours with leaky vessels take up more of it and appear bright on CT and on contrast mammography.",
    tldr: "A CT dye given into a vein. In the United States it is also licensed for contrast-enhanced mammography, a breast X-ray taken after the dye to show cancers that ordinary mammograms can miss.",
    summary: "Bayer's Ultravist (NDA 020220, first approved 10 May 1995) is indicated for intra-arterial procedures, excretory urography, contrast CT of the head and body, and \"Contrast mammography in adults as an adjunct following mammography and/or ultrasound\". Its boxed warning reads \"NOT FOR INTRATHECAL USE\". ATC V08AB05.",
    approvals: [{ region: "US", year: 1995, indication: "Angiography; excretory urography; contrast CT of the head and body; contrast mammography as an adjunct after mammography or ultrasound", note: "NDA 020220; Bayer" }],
    companies: ["bayer"], technologies: [...ICM, "contrast-enhanced-mammography"],
    links: [daf("020220", "Ultravist (NDA 020220)"), dm("df917c3a-59a2-4ed1-8470-8a5394c73325", "Ultravist"), atc("V08AB", "low osmolar X-ray contrast media")] }),

  d({ id: "ioversol", name: "Ioversol", brand: "Optiray", aka: ["ioversol", "Optiray"], status: "approved",
    modality: "Iodinated contrast agent for CT and angiography (intravenous, intra-arterial)", mechanism: "A non-ionic low-osmolar iodinated molecule that makes vessels and enhancing tissues appear bright on CT and X-ray.",
    tldr: "A CT and angiography dye given into a vein or artery.",
    summary: "Optiray (NDA 019710, Liebel-Flarsheim, first approved 30 December 1988) is indicated for intra-arterial arteriography and intravenous procedures including \"Computed tomography (CT) Imaging of Head and Body\", venography and excretory urography. Its boxed warning covers the risks of inadvertent intrathecal administration. ATC V08AB07.",
    approvals: [{ region: "US", year: 1988, indication: "Arteriography; CT of the head and body; venography; excretory urography", note: "NDA 019710; Liebel-Flarsheim" }],
    technologies: ICM,
    links: [daf("019710", "Optiray (NDA 019710)"), dm("549d38db-d4ed-4708-8f76-7cdaa157063f", "Optiray"), atc("V08AB", "low osmolar X-ray contrast media")] }),

  d({ id: "iomeprol", name: "Iomeprol", brand: "Iomervu", aka: ["iomeprol", "Iomervu"], status: "approved",
    modality: "Iodinated contrast agent for CT and angiography (intravenous, intra-arterial)", mechanism: "A non-ionic low-osmolar iodinated molecule that makes vessels and enhancing tissues appear bright on CT and X-ray.",
    tldr: "A CT and angiography dye approved in the United States in 2024.",
    summary: "Bracco's Iomervu (NDA 216016, first approved 27 November 2024) is indicated for intra-arterial procedures and intravenous procedures including \"Computed tomography (CT) of the head and body in adults and pediatric patients\", CT angiography, coronary CT angiography and CT urography. Its boxed warning covers the risks of intrathecal administration (label of 5 February 2026, read 18 November 2026). ATC V08AB10.",
    approvals: [{ region: "US", year: 2024, indication: "Angiography; CT of the head and body; CT angiography; CT urography", note: "NDA 216016; Bracco" }],
    companies: ["bracco"], technologies: ICM,
    links: [daf("216016", "Iomervu (NDA 216016)"), dm("cb2e0e00-7c93-0fb4-89a5-861641662a5a", "Iomervu"), atc("V08AB", "low osmolar X-ray contrast media")] }),

  d({ id: "diatrizoate", name: "Diatrizoate meglumine and diatrizoate sodium (oral contrast)", brand: "Gastrografin", aka: ["diatrizoate", "Gastrografin", "amidotrizoate", "diatrizoic acid"], status: "approved",
    modality: "Water-soluble iodinated contrast agent for X-ray and CT of the bowel (oral or rectal)", mechanism: "An ionic iodinated molecule that fills the bowel and absorbs X-rays, outlining the gut; being water-soluble, it is safer than barium where a leak is possible.",
    tldr: "A drink of iodine-based dye used to outline the gut on X-rays and CT scans, especially when a leak or perforation is possible and barium would be unsafe.",
    summary: "Bracco's Gastrografin (NDA 011245, first approved 17 January 1958) \"is indicated for radiographic examination of segments of the gastrointestinal tract (esophagus, stomach, proximal small intestine, and colon)\" and \"is particularly indicated when a more viscous agent such as barium sulfate, which is not water-soluble, is not feasible or is potentially dangerous\". It may also be used as an adjunct for CT of the torso to distinguish bowel loops.",
    approvals: [{ region: "US", year: 1958, indication: "Radiographic examination of the gastrointestinal tract; adjunct to CT of the torso", note: "NDA 011245; Bracco" }],
    companies: ["bracco"], technologies: ICM,
    links: [daf("011245", "Gastrografin (NDA 011245)"), dm("8c2340e4-2b42-45dc-8fac-9960e8172547", "Gastrografin")] }),

  d({ id: "iothalamate-meglumine", name: "Iothalamate meglumine (bladder contrast)", brand: "Cysto-Conray II", aka: ["iothalamate", "Cysto-Conray", "Cysto-Conray II"], status: "approved",
    modality: "Iodinated contrast agent for X-ray imaging of the bladder (instilled through a catheter)", mechanism: "An iodinated molecule instilled into the bladder that absorbs X-rays and outlines the bladder and urethra.",
    tldr: "An X-ray dye put into the bladder through a catheter to outline the bladder and urethra.",
    summary: "Cysto-Conray II (Liebel-Flarsheim, NDA 017057, first approved 17 April 1972) \"is indicated for use in retrograde cystography and cystourethrography\"; its label states \"NOT FOR INTRAVASCULAR ADMINISTRATION\".",
    approvals: [{ region: "US", year: 1972, indication: "Retrograde cystography and cystourethrography", note: "NDA 017057; Liebel-Flarsheim" }],
    technologies: ICM,
    links: [daf("017057", "Cysto-Conray (NDA 017057)"), dm("8841ab4d-674d-4beb-88a5-13e35f6005cc", "Cysto-Conray II")] }),

  d({ id: "barium-sulfate", name: "Barium sulfate oral contrast", brand: "Readi-Cat 2", aka: ["barium sulfate", "barium sulphate", "Readi-Cat", "E-Z-Paque", "Varibar", "Entero Vu", "Tagitol V", "barium swallow"], status: "approved",
    modality: "Barium sulfate contrast agent for X-ray and CT of the gut (oral)", mechanism: "Insoluble barium sulfate coats and fills the gut and absorbs X-rays, outlining the oesophagus, stomach and bowel.",
    tldr: "The chalky drink swallowed before some CT scans and X-rays so the gullet, stomach and bowel show up clearly.",
    summary: "Drugs@FDA lists Bracco's barium sulfate products under NDA 208143 (original approval 15 January 2016), including Readi-Cat 2, Liquid E-Z-Paque, Varibar, Entero Vu and Tagitol V. Readi-Cat 2 is indicated \"for use in computed tomography (CT) of the abdomen to delineate the gastrointestinal (GI) tract in adult and pediatric patients\"; Liquid E-Z-Paque for \"single contrast radiographic examinations of the esophagus, stomach, and small bowel\".",
    approvals: [{ region: "US", year: 2016, indication: "CT of the abdomen to delineate the gastrointestinal tract; radiographic examination of the oesophagus, stomach and small bowel", note: "NDA 208143; Bracco" }],
    companies: ["bracco"], technologies: ICM,
    links: [daf("208143", "Barium sulfate products (NDA 208143)"), dm("d2d293d5-dcc9-0d3f-58ed-686ef0132d7c", "Readi-Cat 2"), dm("2ecea1ab-66c8-4eb0-8503-6d6b41b51328", "Liquid E-Z-Paque")] }),

  // Ultrasound microbubbles
  d({ id: "sulfur-hexafluoride-microspheres", name: "Sulfur hexafluoride microbubbles (ultrasound contrast)", brand: "Lumason", aka: ["sulfur hexafluoride", "sulphur hexafluoride", "Lumason", "SonoVue"], status: "approved",
    modality: "Ultrasound contrast agent, gas microbubbles (intravenous)", mechanism: "Phospholipid-shelled microbubbles of sulfur hexafluoride stay in the blood vessels and reflect ultrasound strongly, showing blood flow in the liver and other organs in real time.",
    tldr: "Tiny gas bubbles injected into a vein during an ultrasound scan. In the liver they show how a lump fills with blood, which helps tell liver cancer and other lesions apart without radiation.",
    summary: "Bracco's Lumason (NDA 203684, first approved 10 October 2014) is indicated in echocardiography, in \"ultrasound of the liver in adult and pediatric patients to characterize focal liver lesions\" and in paediatric urinary tract ultrasound for vesicoureteral reflux (DailyMed label). Its boxed warning reads \"Serious cardiopulmonary reactions, including fatalities, have occurred uncommonly during or following the injection of ultrasound contrast agents, including sulfur hexafluoride lipid microspheres\". In the European Union SonoVue (EMEA/H/C/000303, authorised 26 March 2001) is indicated among other uses to improve \"display of the vascularity of liver and breast lesions during Doppler sonography in adult patients leading to more specific lesion characterisation\". ATC V08DA05.",
    approvals: [{ region: "US", year: 2014, indication: "Echocardiography; characterisation of focal liver lesions on ultrasound; paediatric urinary tract ultrasound", note: "NDA 203684; Bracco" }, { region: "EU", year: 2001, indication: "Ultrasound contrast, including characterisation of liver and breast lesions on Doppler sonography", note: "Authorised 26 Mar 2001; Bracco International" }],
    cancers: ["hcc"], companies: ["bracco"], technologies: UCA,
    links: [daf("203684", "Lumason (NDA 203684)"), dm("7c679424-c3f7-ed02-892f-20ca0d775089", "Lumason"), epar("sonovue", "SonoVue"), atc("V08DA", "ultrasound contrast media")] }),

  d({ id: "perflutren-lipid-microspheres", name: "Perflutren lipid microspheres (ultrasound contrast)", brand: "Definity", aka: ["perflutren", "Definity", "Definity RT", "Luminity"], status: "approved",
    modality: "Ultrasound contrast agent, gas microbubbles for echocardiography (intravenous)", mechanism: "Lipid-shelled microbubbles of perflutren gas fill the heart chambers and reflect ultrasound, outlining the wall of the left ventricle.",
    tldr: "Gas bubbles injected into a vein during a heart ultrasound to show the heart's pumping chamber more clearly when the ordinary picture is not good enough.",
    summary: "Lantheus' Definity (NDA 021064, first approved 31 July 2001) is indicated, after activation, \"for use in adult and pediatric patients with suboptimal echocardiograms to opacify the left ventricular chamber and to improve the delineation of the left ventricular endocardial border\". Its boxed warning reads \"Serious cardiopulmonary reactions, including fatalities, have occurred uncommonly during or following perflutren-containing microsphere administration\". In the European Union it is Luminity (EMEA/H/C/000654, authorised 20 September 2006). ATC V08DA04.",
    approvals: [{ region: "US", year: 2001, indication: "Opacification of the left ventricle in patients with suboptimal echocardiograms", note: "NDA 021064; Lantheus" }, { region: "EU", year: 2006, indication: "Ultrasound contrast in suboptimal echocardiography", note: "Luminity, authorised 20 Sep 2006; Lantheus EU" }],
    companies: ["lantheus"], technologies: UCA,
    links: [daf("021064", "Definity (NDA 021064)"), dm("7b9de6ab-a3ac-40c9-8103-139dc7a464a2", "Definity RT"), epar("luminity", "Luminity"), atc("V08DA", "ultrasound contrast media")] }),

  d({ id: "optison", name: "Perflutren protein-type A microspheres (ultrasound contrast)", brand: "Optison", aka: ["Optison", "perflutren albumin microspheres"], status: "approved",
    modality: "Ultrasound contrast agent, albumin-shelled gas microbubbles for echocardiography (intravenous)", mechanism: "Microbubbles of perflutren gas in a shell of human albumin reflect ultrasound and opacify the heart chambers.",
    tldr: "Gas bubbles in a protein shell injected into a vein during a heart ultrasound to show the heart's pumping chamber more clearly.",
    summary: "GE Healthcare's Optison (NDA 020899, first approved 31 December 1997) is indicated \"for use in adult and pediatric patients with suboptimal echocardiograms to opacify the left ventricle and to improve the delineation of the left ventricular endocardial borders\", with the same boxed warning on serious cardiopulmonary reactions as other perflutren products. In the European Union it has been authorised since 17 May 1998 (EMEA/H/C/000166). ATC V08DA01.",
    approvals: [{ region: "US", year: 1997, indication: "Opacification of the left ventricle in patients with suboptimal echocardiograms", note: "NDA 020899; GE Healthcare" }, { region: "EU", year: 1998, indication: "Transpulmonary echocardiographic contrast", note: "Authorised 17 May 1998; GE Healthcare AS" }],
    companies: ["ge-healthcare"], technologies: UCA,
    links: [daf("020899", "Optison (NDA 020899)"), dm("46bcf276-d423-408a-a410-f11383406a94", "Optison"), epar("optison", "Optison"), atc("V08DA", "ultrasound contrast media")] }),

  // Dyes
  d({ id: "isosulfan-blue", name: "Isosulfan blue (lymphatic mapping dye)", brand: "Lymphazurin", aka: ["isosulfan blue", "Lymphazurin", "isosulphan blue"], status: "approved",
    modality: "Blue dye for lymphatic mapping (subcutaneous injection)", mechanism: "Injected under the skin, the dye binds to proteins and is carried in lymphatic vessels, staining them and the nodes they drain to blue.",
    tldr: "A blue dye injected near a tumour before surgery. It travels to the nearest lymph nodes and stains them blue, helping the surgeon find the sentinel node.",
    summary: "Lymphazurin (NDA 018310, Covidien, first approved 29 July 1981) and generic isosulfan blue injection 1% (for example ANDA 090874) are labelled as \"an adjunct to lymphography in: primary and secondary lymphedema of the extremities; chyluria, chylous ascites or chylothorax; lymph node involvement by primary or secondary neoplasm; lymph node response to therapeutic modalities\".",
    approvals: [{ region: "US", year: 1981, indication: "Adjunct to lymphography, including lymph node involvement by primary or secondary neoplasm", note: "NDA 018310; Covidien" }],
    technologies: ["sentinel-node", "magnetic-sentinel-node-tracer"], terms: ["sentinel-lymph-node-biopsy"],
    links: [daf("018310", "Lymphazurin (NDA 018310)"), dm("0391e544-3633-48df-9f3a-ed16183125b1", "Isosulfan blue injection 1%")] }),

  d({ id: "indigotindisulfonate", name: "Indigotindisulfonate sodium (indigo carmine)", brand: "Bludigo", aka: ["indigotindisulfonate", "indigo carmine", "Bludigo"], status: "approved",
    modality: "Blue dye contrast agent for imaging the ureters during cystoscopy (intravenous)", mechanism: "Given into a vein, the dye is excreted by the kidneys and colours the urine blue, so urine jets from each ureteric opening can be seen in the bladder.",
    tldr: "A blue dye given into a vein near the end of an operation on the pelvis, so the surgeon can see blue urine coming from each ureter and check they were not damaged.",
    summary: "Provepharm's Bludigo (NDA 216264, first approved 8 July 2022) \"is indicated for use as a visualization aid in the cystoscopic assessment of the integrity of the ureters in adults following urological and gynecological open, robotic, or endoscopic surgical procedures\".",
    approvals: [{ region: "US", year: 2022, indication: "Visualisation aid in cystoscopic assessment of ureteric integrity after urological and gynaecological surgery", note: "NDA 216264; Provepharm" }],
    technologies: ["fluorescence-guided-surgery"],
    links: [daf("216264", "Bludigo (NDA 216264)"), dm("2b91c39d-5f15-4dcf-9d3d-b378470e6bd7", "Bludigo")] }),
];

export const contrastAgentTechnologies: TechnologyInput[] = [
  tech({ id: "gadolinium-based-contrast-agents", name: "Gadolinium-based and other MRI contrast agents", aka: ["MRI contrast", "MRI dye", "Gadolinium contrast", "GBCA", "Gadolinium-based contrast agent"],
    sections: ["imaging"], status: "standard-of-care", since: 1992,
    tldr: "The dyes injected into a vein during many MRI scans. They make tumours and inflamed tissue light up, which helps find cancers, measure them and check how they respond to treatment.",
    summary: "Most MRI contrast agents contain gadolinium held in a chelate. The WHO groups them as paramagnetic contrast media (ATC V08CA), including gadoteric acid, gadodiamide, gadoteridol, gadobenic acid, gadobutrol, gadoxetic acid, gadopiclenol and gadoquatrane, and lists iron oxide nanoparticles separately (V08CB). In the United States every gadolinium agent's label carries a boxed warning on intrathecal use and nephrogenic systemic fibrosis. Most are general agents that show where the blood-brain barrier or vessels are abnormal; gadoxetate is taken up by liver cells and is used to characterise liver lesions; FeraBright, an iron agent, was approved in 2025 for brain MRI in people with known or suspected brain tumours.",
    principle: "Paramagnetic gadolinium (or superparamagnetic iron) shortens the T1 or T2 relaxation of nearby water protons; where the agent accumulates, in leaky tumour vessels or in liver cells for hepatobiliary agents, the MRI signal changes.",
    strengths: ["Shows tumour extent and blood-brain barrier disruption", "Liver-specific agents help characterise liver lesions"],
    limitations: ["Boxed warnings on intrathecal use and nephrogenic systemic fibrosis", "Allergic-type reactions occur"],
    cancers: ["glioblastoma", "hcc", "breast-cancer"], technologies: ["mri", "iodinated-contrast-media", "ultrasound-contrast-agents", "breast-mri-coils-abbreviated-mri"],
    drugs: ["gadoxetate-disodium", "gadobutrol", "gadoterate-meglumine", "gadobenate-dimeglumine", "gadoteridol", "gadopiclenol", "gadoquatrane", "gadodiamide", "ferabright-ferumoxytol", "mangafodipir", "ferumoxtran-10"], companies: ["bayer", "guerbet", "bracco", "ge-healthcare"],
    links: [atc("V08CA", "paramagnetic contrast media"), atc("V08CB", "superparamagnetic contrast media")] }),

  tech({ id: "iodinated-contrast-media", name: "Iodinated and barium contrast for CT and X-ray", aka: ["CT contrast", "CT dye", "Iodinated contrast", "Iodine contrast", "X-ray contrast", "Oral contrast"],
    sections: ["imaging"], status: "standard-of-care", since: 1958,
    tldr: "The iodine-based dyes injected into a vein for most CT scans, and the drinks of iodine or barium that outline the gut. They make blood vessels, organs and many tumours stand out.",
    summary: "The WHO groups water-soluble low-osmolar X-ray contrast media under ATC V08AB, including iohexol, iopamidol, iopromide, ioversol, iodixanol, iomeprol and iobitridol. Labels in the United States cover CT of the head and body, angiography and urography; several carry boxed warnings against intrathecal use, and iohexol's warns to use only the concentrations recommended for intrathecal procedures. Iopromide's label also covers contrast-enhanced mammography. Oral agents outline the gut: barium sulfate drinks for CT of the abdomen, and water-soluble diatrizoate (Gastrografin) when barium could be dangerous.",
    principle: "Iodine and barium have high atomic numbers and absorb X-rays strongly, so tissues and spaces containing them appear bright; tumours with abnormal vessels enhance in characteristic phases after an intravenous injection.",
    strengths: ["Fast, widely available imaging of the whole body", "Enhancement patterns help characterise tumours"],
    limitations: ["Allergic-type reactions", "Some agents are not for intrathecal use, per boxed warnings"],
    cancers: ["colorectal", "nsclc", "breast-cancer"], technologies: ["ct", "gadolinium-based-contrast-agents", "contrast-enhanced-mammography"],
    drugs: ["iohexol", "iodixanol", "iopamidol", "iopromide", "ioversol", "iomeprol", "diatrizoate", "iothalamate-meglumine", "barium-sulfate", "ethiodized-oil"], companies: ["ge-healthcare", "bracco", "bayer"],
    links: [atc("V08AB", "low osmolar X-ray contrast media")] }),

  tech({ id: "ultrasound-contrast-agents", name: "Ultrasound contrast agents (microbubbles)", aka: ["Microbubble contrast", "Ultrasound contrast", "CEUS agent", "Microbubbles"],
    sections: ["imaging"], status: "standard-of-care", since: 1997,
    tldr: "Tiny gas bubbles injected into a vein during an ultrasound scan, used to show blood flow in the heart and, in the liver, to tell different kinds of lump apart without radiation.",
    summary: "The WHO groups ultrasound contrast media under ATC V08DA: perflutren in human albumin (Optison), perflutren in phospholipid (Definity, Luminity in Europe), sulfur hexafluoride in phospholipid (Lumason, SonoVue in Europe) and perflubutane. Lumason's American label includes characterising focal liver lesions, and SonoVue's European indication includes liver and breast lesions on Doppler sonography. Perflutren products carry an American boxed warning on serious cardiopulmonary reactions. The elastography and contrast-enhanced ultrasound record covers the imaging technique.",
    principle: "Gas microbubbles a few micrometres across stay in the blood vessels and resonate in the ultrasound field, producing strong echoes that show perfusion in real time; contrast-specific imaging modes suppress the tissue signal.",
    strengths: ["Real-time perfusion imaging without radiation", "Bedside imaging with the same ultrasound machine"],
    limitations: ["Boxed warning on cardiopulmonary reactions for perflutren products", "Limited by the reach of ultrasound"],
    cancers: ["hcc"], technologies: ["ultrasound", "ultrasound-elastography-ceus", "gadolinium-based-contrast-agents"],
    drugs: ["sulfur-hexafluoride-microspheres", "perflutren-lipid-microspheres", "optison"], companies: ["bracco", "lantheus", "ge-healthcare"],
    links: [atc("V08DA", "ultrasound contrast media")] }),
];

export const contrastAgentCompanies: CompanyInput[] = [
  co({ id: "bracco", name: "Bracco (Bracco Imaging and Bracco Diagnostics)", aka: ["Bracco Imaging", "Bracco Diagnostics", "Bracco Imaging S.p.A.", "Bracco International"], hq: "Princeton, NJ (US owner operator)", country: "US", companyType: "imaging", sections: ["imaging"],
    tldr: "Bracco makes contrast agents for MRI, CT, X-ray and ultrasound, including MultiHance, ProHance, Vueway, Isovue, Iomervu, Gastrografin, barium drinks and Lumason.",
    summary: "Drugs@FDA lists Bracco as sponsor of MultiHance (NDA 021357), ProHance (NDA 020131), Isovue (NDA 018735), Iomervu (NDA 216016), Gastrografin (NDA 011245), the barium sulfate products of NDA 208143 and Lumason (NDA 203684); it also markets Vueway (gadopiclenol). The EMA register names Bracco Imaging S.p.A. as holder of Vueway and Bracco International B.V. of SonoVue. Its FDA establishment registrations name Bracco Diagnostics Inc. of Princeton, New Jersey, as owner operator. Blue Earth Diagnostics, a separate record, is a Bracco company.",
    drugs: ["gadobenate-dimeglumine", "gadoteridol", "gadopiclenol", "iopamidol", "iomeprol", "diatrizoate", "barium-sulfate", "sulfur-hexafluoride-microspheres"], technologies: ["gadolinium-based-contrast-agents", "iodinated-contrast-media", "ultrasound-contrast-agents"], related: ["blue-earth-diagnostics"],
    links: [daf("021357", "MultiHance"), daf("203684", "Lumason"), epar("vueway", "Vueway")] }),
];
