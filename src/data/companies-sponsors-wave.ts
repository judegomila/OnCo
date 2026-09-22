/**
 * Sponsor companies wave 5 (September 2026, docs/CONTENT-ROADMAP.md): lead sponsors of two or more corpus trials with
 * no company or institution record (measured by `npm run content:gaps`), plus the two marketing authorisation holders
 * that the EMA wave (drugs-ema-wave.ts) needed.
 *
 * Sources, and nothing else: country, headquarters city, founding year, website and listing from the Wikidata item
 * named in `links` (read 22 September 2026); the sponsor name and its class (INDUSTRY) from the ClinicalTrials.gov API
 * v2 record of one of the sponsored trials; trial facts from the OnCo trial records already in the corpus. Company
 * type is an editorial classification from what those sources show (own pipeline compounds in the sponsored trials for
 * biotech; a sponsor that runs trials of other makers' products for cro-services). Nothing is taken from company
 * websites or press coverage. Logos are fetched by the weekly maintenance job.
 *
 * Not written, for the report: cooperative groups and public bodies that are not companies (GORTEC, French Sarcoma
 * Group, German CLL Study Group, Alliance Foundation Trials, AGO Research GmbH, Medical Research Council) and nine
 * sponsors for which Wikidata has no item and ClinicalTrials.gov gives no address (Novelwise Pharmaceutical,
 * Teligene, USWM CT, 3H Pharmaceuticals, Sunshine Guojian, BeyondBio, Five Eleven Pharma, Novita Pharmaceuticals,
 * Faeth Therapeutics). Registered in src/data/index.ts as `companiesSponsorsWave`.
 */
import type { CompanyInput } from "@/lib/schema";

const asOf = "2026-09-22";
const tags = ["ctgov-sponsor", "wave5-sponsor"];
const provenance = { editedBy: "OnCo content wave 5 (Wikidata, ClinicalTrials.gov v2, corpus trial records)", editedOn: asOf };
const WD = (qid: string) => ({ label: `Wikidata ${qid}`, url: `https://www.wikidata.org/wiki/${qid}` });
const CT = (lead: string) => ({ label: `ClinicalTrials.gov: trials led by ${lead}`, url: `https://clinicaltrials.gov/search?lead=${encodeURIComponent(lead)}` });

type C = Omit<CompanyInput, "kind" | "asOf" | "tags" | "provenance">;
const c = (x: C): CompanyInput => ({ kind: "company", asOf, tags, provenance, ...x });

export const companiesSponsorsWave: CompanyInput[] = [
  c({ id: "criterium", name: "Criterium", aka: ["Criterium, Inc.", "Criterium Inc"], hq: "Saratoga Springs, New York", country: "US", companyType: "cro-services", website: "https://www.criteriuminc.com",
    tldr: "Criterium is a US company in Saratoga Springs, New York, that is the lead sponsor of four cancer trials in OnCo, all testing other makers' drugs: fruquintinib with TAS-102 in colorectal cancer and tucatinib, alpelisib or palbociclib combinations in breast cancer.",
    summary: "Criterium, Inc. is a company based in Saratoga Springs, United States (Wikidata Q140045287, which also gives its website). ClinicalTrials.gov classes it as an industry sponsor. It leads four trials recorded in OnCo, none of a compound of its own: NCT06992258 (phase 2, fruquintinib with TAS-102 against fruquintinib alone in refractory metastatic colorectal cancer), NCT05230810 (phase 1/2, alpelisib with tucatinib in PIK3CA-mutant HER2-positive metastatic breast cancer), NCT04567420 (DARE, phase 2, circulating tumour DNA-guided second-line adjuvant palbociclib and fulvestrant in high-risk ER-positive HER2-negative breast cancer) and NCT05458674 (phase 2, tucatinib with trastuzumab and eribulin in pretreated HER2-positive metastatic breast cancer). The cro-services type reflects that pattern; Criterium's own description of its business was not consulted.",
    cancers: ["colorectal", "breast-her2-positive", "breast-hr-positive"], trials: ["nct06992258", "nct05230810", "nct04567420", "nct05458674"], drugs: [],
    links: [{ label: "Official website", url: "https://www.criteriuminc.com" }, WD("Q140045287"), CT("Criterium, Inc.")] }),

  c({ id: "artios-pharma", name: "Artios Pharma", aka: ["Artios Pharma Ltd", "Artios Pharma Limited", "Artios"], hq: "Cambridge", country: "GB", companyType: "biotech", website: "https://www.artios.com",
    tldr: "Artios Pharma is a Cambridge, UK biotechnology company that leads two cancer trials in OnCo, testing its DNA damage response inhibitors ART0380 (ATR) and ART6043 (DNA polymerase theta) in advanced solid tumours.",
    summary: "Artios Pharma Limited is a company based in Cambridge, United Kingdom (Wikidata Q140045444, which also gives its website). ClinicalTrials.gov classes it as an industry sponsor. It leads two phase 1/2a trials recorded in OnCo: NCT04657068, the ATR kinase inhibitor ART0380 alone and in combination (with gemcitabine, irinotecan or FOLFIRI) in advanced or metastatic solid tumours including ovarian, endometrial, colorectal and pancreatic cancer, and NCT05898399 (POLKA), the DNA polymerase theta inhibitor ART6043 alone and with olaparib in advanced solid tumours. Both compounds are its own, which is the basis for the biotech type.",
    cancers: ["ovarian", "endometrial", "colorectal", "pancreatic"], trials: ["nct04657068", "nct05898399"], drugs: [], targets: ["atr"], pathways: ["ddr"],
    links: [{ label: "Official website", url: "https://www.artios.com" }, WD("Q140045444"), CT("Artios Pharma Ltd")] }),

  c({ id: "ambrx", name: "Ambrx", aka: ["Ambrx, Inc.", "Ambrx Inc", "Ambrx Biopharma"], hq: "La Jolla, California", country: "US", companyType: "biotech", website: "http://ambrx.com/", founded: 2003,
    tldr: "Ambrx is a La Jolla, California biotechnology company founded in 2003 whose HER2 antibody-drug conjugate ARX788 is in OnCo's phase 3 ACE-Breast-02 trial (with Zhejiang Medicine, in China) and the global phase 2 ACE-Breast-03 trial after trastuzumab deruxtecan.",
    summary: "Ambrx is an organisation based in La Jolla, United States, founded in 2003 (Wikidata Q100955904, which also gives its website). ClinicalTrials.gov classes it as an industry sponsor. In OnCo it sponsors ACE-Breast-02 (phase 3, with Zhejiang Medicine: ARX788 against lapatinib plus capecitabine in HER2-positive advanced breast cancer after trastuzumab and a taxane, recorded as positive) and NCT04829604 (ACE-Breast-03, phase 2, ARX788 in HER2-positive metastatic breast cancer previously treated with trastuzumab deruxtecan). ARX788 is its own compound, the basis for the biotech type.",
    cancers: ["breast-her2-positive"], trials: ["ace-breast-02", "nct04829604"], drugs: ["arx788"], targets: ["her2"], technologies: ["adc"],
    links: [{ label: "Official website", url: "http://ambrx.com/" }, WD("Q100955904"), CT("Ambrx, Inc.")] }),

  c({ id: "nerviano-medical-sciences", name: "Nerviano Medical Sciences", aka: ["Nerviano Medical Sciences Ltd.", "Nerviano Medical Sciences (Shanghai) Ltd.", "Nerviano Medical Sciences S.r.l.", "NMS"], hq: "Nerviano", country: "IT", companyType: "biotech", website: "http://www.nervianoms.com/en/", founded: 2004,
    tldr: "Nerviano Medical Sciences is an Italian drug-discovery company founded in 2004 in Nerviano, near Milan, that leads two cancer trials in OnCo: the PARP1-selective inhibitor atamparib in advanced solid tumours and NMS-03305293 with temozolomide in recurrent glioblastoma.",
    summary: "Nerviano Medical Sciences is a company based in Nerviano, Italy, founded in 2004 (Wikidata Q30280722, which also gives its website). ClinicalTrials.gov classes it as an industry sponsor; its Shanghai subsidiary is the registered sponsor of one trial. It leads two phase 1/2 trials recorded in OnCo: NCT07374419 (atamparib in advanced solid tumours, recorded under NSCLC) and NCT04910022 (NMS-03305293 with temozolomide in adults with recurrent glioblastoma). Both compounds are its own, the basis for the biotech type.",
    cancers: ["nsclc", "glioblastoma"], trials: ["nct07374419", "nct04910022"], drugs: ["temozolomide"],
    links: [{ label: "Official website", url: "http://www.nervianoms.com/en/" }, WD("Q30280722"), CT("Nerviano Medical Sciences")] }),

  c({ id: "qurient", name: "Qurient", aka: ["Qurient Co., Ltd.", "Qurient Co Ltd"], hq: "Seongnam", country: "KR", companyType: "biotech",
    tldr: "Qurient is a South Korean biotechnology company in Seongnam that leads two cancer trials in OnCo, testing the selective CDK7 inhibitor Q901 and the Axl/Mer/CSF1R inhibitor Q702, each with pembrolizumab, in advanced solid tumours.",
    summary: "Qurient is a company based in Seongnam, South Korea (Wikidata Q30253835; no website is recorded there, so none is given here). ClinicalTrials.gov classes it as an industry sponsor, with Merck Sharp & Dohme as collaborator on the pembrolizumab combinations. It leads two phase 1/2 trials recorded in OnCo: NCT05394103 (Q901, a highly selective CDK7 inhibitor, alone and with pembrolizumab in selected advanced solid tumours) and NCT05438420 (Q702, an oral Axl/Mer/CSF1R tyrosine kinase inhibitor, with pembrolizumab, recorded under cervical cancer). Both compounds are its own, the basis for the biotech type.",
    cancers: ["cervical"], trials: ["nct05394103", "nct05438420"], drugs: ["pembrolizumab"], targets: ["axl", "csf1r"], technologies: ["kinase-inhibitors"],
    links: [WD("Q30253835"), CT("Qurient Co., Ltd.")] }),

  c({ id: "immunovaccine", name: "Immunovaccine (IMV)", aka: ["ImmunoVaccine Technologies, Inc.", "ImmunoVaccine Technologies", "IMV Inc.", "IMV Inc", "Immunovaccine Technologies Inc."], hq: "Halifax, Nova Scotia", country: "CA", companyType: "biotech", website: "http://www.imvaccine.com/", founded: 2000,
    tldr: "Immunovaccine (IMV) is a Canadian biotechnology company founded in 2000 in Halifax, Nova Scotia, whose survivin-targeted immunotherapy DPX-Survivac is tested with pembrolizumab and low-dose cyclophosphamide in two OnCo trials, in relapsed diffuse large B-cell lymphoma and in selected solid tumours.",
    summary: "Immunovaccine is a company based in Halifax, Canada, founded in 2000 (Wikidata Q30282846, which also gives its website; a second Wikidata item, Q140169711, places Immunovaccine Technologies Inc. in Dartmouth). ClinicalTrials.gov registers it as ImmunoVaccine Technologies, Inc. (IMV Inc.), an industry sponsor, with Merck Sharp & Dohme as collaborator. It leads two phase 2 trials recorded in OnCo: NCT04920617 (VITALIZE, DPX-Survivac and pembrolizumab with and without intermittent low-dose cyclophosphamide in relapsed or refractory DLBCL) and NCT03836352 (the same combination in selected advanced and recurrent solid tumours, recorded under ovarian, hepatocellular, non-small-cell and small-cell lung cancer). DPX-Survivac is its own product, the basis for the biotech type.",
    cancers: ["dlbcl", "ovarian", "hcc", "nsclc", "sclc"], trials: ["nct04920617", "nct03836352"], drugs: ["pembrolizumab", "cyclophosphamide"], companies: ["merck"],
    links: [{ label: "Official website", url: "http://www.imvaccine.com/" }, WD("Q30282846"), CT("ImmunoVaccine Technologies, Inc.")] }),

  c({ id: "gruenenthal", name: "Grünenthal", aka: ["Gruenenthal GmbH", "Grünenthal GmbH", "Gruenenthal"], hq: "Aachen", country: "DE", companyType: "pharma", website: "https://www.grunenthal.com/", founded: 1946, wikipedia: "https://en.wikipedia.org/wiki/Gr%C3%BCnenthal",
    tldr: "Grünenthal is a German pharmaceutical company founded in 1946 in Aachen. In OnCo it is the marketing authorisation holder of PecFent, a fentanyl nasal spray authorised in the EU for breakthrough pain in adults on maintenance opioids for chronic cancer pain.",
    summary: "Grünenthal GmbH is a German pharmaceutical company based in Aachen, founded on 29 January 1946 (Wikidata Q153838, which also gives its website and English Wikipedia article). The EMA register names Gruenenthal GmbH as the marketing authorisation holder of PecFent (fentanyl pectin nasal spray), authorised 31 August 2010 for the management of breakthrough pain in adults already receiving maintenance opioid therapy for chronic cancer pain. It sponsors no trial recorded in OnCo.",
    cancers: [], trials: [], drugs: ["fentanyl"], technologies: ["pain-management"],
    links: [{ label: "Official website", url: "https://www.grunenthal.com/" }, WD("Q153838"), { label: "EMA: PecFent (EPAR)", url: "https://www.ema.europa.eu/en/medicines/human/EPAR/pecfent" }] }),

  c({ id: "4sc", name: "4SC", aka: ["4SC AG", "4Sc AG"], hq: "Planegg-Martinsried", country: "DE", companyType: "biotech", website: "https://www.4sc.com/", founded: 1997, stage: "public",
    tldr: "4SC is a listed German biotechnology company founded in 1997 in Planegg-Martinsried, near Munich. It applied to the EMA for its HDAC inhibitor resminostat (Kinselby) in advanced mycosis fungoides and Sézary syndrome and received a negative opinion in May 2025.",
    summary: "4SC is a public company based in Martinsried, Germany, founded in 1997 (Wikidata Q238181, which also gives its website). The EMA product page for Kinselby (resminostat, orphan designation) names 4Sc AG as the marketing authorisation applicant; the CHMP adopted its opinion on 22 May 2025 and the opinion status is negative, so the product is not authorised. It sponsors no trial recorded in OnCo.",
    cancers: ["cutaneous-t-cell-lymphoma"], trials: [], drugs: ["resminostat"], targets: ["hdac"], technologies: ["epigenetic-drugs"],
    links: [{ label: "Official website", url: "https://www.4sc.com/" }, WD("Q238181"), { label: "EMA: Kinselby (EPAR)", url: "https://www.ema.europa.eu/en/medicines/human/EPAR/kinselby" }] }),
];
