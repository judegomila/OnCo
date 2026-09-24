import type { CompareCell, CompareSet, CompareSource } from "@/lib/cancer-compare";

/**
 * BILIARY TRACT CANCERS COMPARED: gallbladder cancer beside intrahepatic and extrahepatic cholangiocarcinoma and
 * ampullary cancer. Computed rows read the records (burden, standard-of-care rows, history, target prevalence rows);
 * hand rows quote a sentence of the record's own summary, tldr or burden (`from`; the test checks the substring) or a
 * paper read on Europe PMC on 24 September 2026 (`source`). Where neither exists the cell is left out and renders as
 * "not recorded". Nothing is estimated.
 *
 *   Javle et al., Cancer 2016 (doi 10.1002/cncr.30254): comprehensive genomic profiling of 412 intrahepatic, 57
 *     extrahepatic and 85 gallbladder cancers; abstract gives KRAS 22% intrahepatic, 42% extrahepatic, ERBB2 16% gallbladder,
 *     FGFR 11% and IDH 20% "mostly limited to" intrahepatic.
 *   Hiraoka et al., Human Pathology 2020 (doi 10.1016/j.humpath.2020.08.006): HER2-positive by the gastro-oesophageal
 *     scoring in 3.7% of 110 intrahepatic, 3.0% of 67 perihilar, 18.5% of 119 distal, 31.3% of 80 gallbladder and 16.4% of
 *     79 ampullary carcinomas.
 */
const asOf = "2026-09-24";

const JAVLE: CompareSource = { label: "Javle et al., Biliary cancer: utility of next-generation sequencing for clinical management, Cancer 2016", url: "https://doi.org/10.1002/cncr.30254" };
const HIRAOKA: CompareSource = { label: "Hiraoka et al., Details of HER2 status in 454 cases of biliary tract cancer, Human Pathology 2020", url: "https://doi.org/10.1016/j.humpath.2020.08.006" };

const GB = "gallbladder", ICC = "intrahepatic-cholangiocarcinoma", ECC = "extrahepatic-cholangiocarcinoma", AMP = "ampullary";

const fromSummary = (id: string, text: string): CompareCell => ({ text, from: { id, field: "summary" } });
const fromBurden = (id: string, text: string): CompareCell => ({ text, from: { id, field: "burden" } });

export const biliaryCompareSet: CompareSet = {
  anchorId: GB,
  ids: [GB, ICC, ECC, AMP],
  title: "Gallbladder cancer beside intrahepatic and extrahepatic cholangiocarcinoma and ampullary cancer: anatomy, incidence, risk factors, presentation, HER2, FGFR2, IDH1 and KRAS rates, surgery, first-line treatment and trial legacy, every cell from a record field or a cited paper.",
  lede: "The four cancers share the bile-carrying tract and most of their drug trials, and differ in almost everything else. Each cell is read from the record it names or from a paper linked beside it; a cell with nothing behind it says so.",
  asOf,
  prevalenceKeywords: { [ICC]: ["intrahepatic"], [ECC]: ["extrahepatic", "perihilar", "distal"] },
  rows: [
    { id: "anatomy", label: "Where it starts", icon: "compass", kind: "hand", cells: {
      [GB]: fromSummary(GB, "The gallbladder is a pear-shaped pouch about 8 cm long under the right lobe of the liver that concentrates and stores bile"),
      [ICC]: fromSummary(ICC, "Intrahepatic cholangiocarcinoma arises from the bile ducts beyond the second-order branches within the liver and presents as a mass"),
      [ECC]: fromSummary(ECC, "Extrahepatic cholangiocarcinoma is divided at the cystic duct into perihilar tumours, described by Klatskin in 1965 and classified by Bismuth and Corlette according to how far they extend into the right and left hepatic ducts, and distal tumours of the common bile duct."),
      [AMP]: fromSummary(AMP, "Ampullary adenocarcinoma arises from the ampulla of Vater, the papilla where the common bile duct and main pancreatic duct open into the duodenum."),
    } },
    { id: "incidence", label: "How common", icon: "globe", kind: "burden", note: "The record's burden field, as written." },
    { id: "risk", label: "Main risk factors", icon: "flag", kind: "hand", cells: {
      [GB]: fromSummary(GB, "gallstones are the strongest (pooled relative risk 4.9 for a history of benign gallbladder disease, Randi 2006; odds ratio 7.26 for gallbladder cancer in a 2021 meta-analysis of 30 studies, Huang"),
      [ICC]: fromSummary(ICC, "Risk factors include cirrhosis, hepatitis B and C, primary sclerosing cholangitis, liver flukes in Thailand and neighbouring countries, and hepatolithiasis, but most cases in the West have none."),
      [ECC]: fromSummary(ECC, "Primary sclerosing cholangitis, choledochal cysts and liver flukes are risk factors."),
      [AMP]: fromSummary(AMP, "Familial adenomatous polyposis carries a large relative risk of ampullary adenoma and carcinoma, and endoscopic surveillance of the duodenum is part of FAP care."),
    } },
    { id: "presentation", label: "Typical presentation", icon: "pain", kind: "hand", cells: {
      [GB]: fromSummary(GB, "A large share is found by the pathologist after a cholecystectomy for presumed gallstone disease: 0.25 to 0.89 percent of all cholecystectomy specimens in the series reviewed by Soreide (2019)"),
      [ICC]: fromSummary(ICC, "presents as a mass, often found incidentally or with vague pain and weight loss, in contrast to the jaundice of extrahepatic tumours"),
      [ECC]: fromSummary(ECC, "Both present with painless jaundice, pale stools, dark urine and itching, often with cholangitis, and CA 19-9 is raised but unreliable in the presence of obstruction."),
      [AMP]: fromBurden(AMP, "it obstructs the bile duct early and presents with jaundice"),
    } },
    { id: "her2", label: "HER2 (ERBB2)", icon: "layers", kind: "prevalence", targetId: "her2", note: "Prevalence rows on the HER2 target record; where a record has none, the Hiraoka 2020 series scored by the gastro-oesophageal guideline.", cells: {
      [ICC]: { text: "HER2-positive in 3.7% of 110 intrahepatic cholangiocarcinomas (Hiraoka 2020)", source: HIRAOKA },
      [ECC]: { text: "HER2-positive in 3.0% of 67 perihilar and 18.5% of 119 distal extrahepatic cholangiocarcinomas (Hiraoka 2020)", source: HIRAOKA },
      [AMP]: { text: "HER2-positive in 16.4% of 79 ampullary carcinomas (Hiraoka 2020)", source: HIRAOKA },
    } },
    { id: "fgfr2", label: "FGFR2", icon: "layers", kind: "prevalence", targetId: "fgfr2", cells: {
      [ECC]: fromSummary(ECC, "FGFR2 fusions and IDH1 mutations are rare"),
    } },
    { id: "idh1", label: "IDH1", icon: "layers", kind: "prevalence", targetId: "idh", cells: {
      [ECC]: fromSummary(ECC, "FGFR2 fusions and IDH1 mutations are rare"),
    } },
    { id: "kras", label: "KRAS", icon: "layers", kind: "prevalence", targetId: "kras", cells: {
      [ICC]: { text: "KRAS altered in 22% of 412 intrahepatic cholangiocarcinomas (Javle 2016)", source: JAVLE },
      [ECC]: { text: "KRAS altered in 42% of 57 extrahepatic cholangiocarcinomas (Javle 2016)", source: JAVLE },
      [AMP]: fromSummary(AMP, "intestinal-type tumours resemble colorectal cancer (CDX2, MUC2; APC and KRAS mutations) and pancreatobiliary-type tumours resemble pancreatic cancer (MUC1, CK7; KRAS, TP53, SMAD4)"),
    } },
    { id: "surgery", label: "Surgery with curative intent", icon: "scalpel", kind: "soc", note: "The standard-of-care row on each record for resectable disease.", settings: {
      [GB]: "T1b, T2 or T3 (incidental or suspected before surgery)",
      [ICC]: "Resectable",
      [ECC]: ["Resectable perihilar", "Resectable distal"],
      [AMP]: "Resectable carcinoma",
    } },
    { id: "first-line", label: "First-line systemic treatment", icon: "watch", kind: "soc", note: "The standard-of-care row on each record for advanced disease, first line.", settings: {
      [GB]: "Unresectable or metastatic disease, first line",
      [ICC]: "Advanced, first line",
      [ECC]: "Advanced, first line",
      [AMP]: "Metastatic",
    } },
    { id: "legacy", label: "Trial legacy", icon: "clock", kind: "history", note: "History events on each record that name a trial." },
  ],
};
