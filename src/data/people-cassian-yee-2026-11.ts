import type { CompanyInput, InstitutionInput, PaperInput, PersonInput, TermInput, TrialInput } from "@/lib/schema";

/**
 * Cassian Yee (MD Anderson Cancer Center) and the records around the person: eight papers, nine trials on which
 * ClinicalTrials.gov names Cassian Yee as the overall official, the glossary term the 2015 review defines, and the
 * organisations the faculty profile names that OnCo did not hold (5 November 2026).
 *
 * Sources, all read as raw text on 5 November 2026: the MD Anderson faculty profile (appointments, training, awards,
 * memberships and the dated consultancies), the ORCID public API for 0000-0002-4429-7307, Europe PMC core records for
 * every PubMed id below (title, authors, journal and abstract; each DOI is the one Europe PMC holds for that PubMed id),
 * ClinicalTrials.gov v2 for each NCT number, each company's own website, SEC EDGAR (Prellis Biologics Form D, CIK
 * 1711459; Berkeley Lights 10-K for 2022, the 8-K of 21 March 2023 and the 8-K of 2 October 2023, CIK 1689657), the
 * Burroughs Wellcome Fund history page and Rice University's about page.
 *
 * Industry relationships: the person schema has no field for them, so the consultancies the profile discloses are
 * stated in `notes` with their dates and the profile as source, and the companies OnCo holds are linked in
 * `companies`. A consultancy is a disclosed advisory relationship, not employment or ownership. RootPath and Scribe
 * Biosciences are named in the notes only: neither could be confirmed from its own site, so neither has a record.
 *
 * Not linked, because the profile does not name them: Parker Institute for Cancer Immunotherapy, CPRIT (the profile
 * lists one invited CPRIT webinar talk, not funding) and uveal melanoma.
 */
const asOf = "2026-11-05";
const provenance = { editedBy: "OnCo agent (Claude Opus 5.5)", editedOn: asOf, note: "Written from the MD Anderson faculty profile, ORCID, Europe PMC, ClinicalTrials.gov v2, SEC EDGAR and each organisation's own site, read on 5 November 2026." };

const PROFILE = { label: "MD Anderson faculty profile: Cassian Yee, M.D.", url: "https://faculty.mdanderson.org/profiles/cassian_yee.html" };
const ORCID = { label: "ORCID 0000-0002-4429-7307", url: "https://orcid.org/0000-0002-4429-7307" };
const ct = (nct: string) => ({ label: `ClinicalTrials.gov ${nct}`, url: `https://clinicaltrials.gov/study/${nct}` });
const pubmed = (pmid: string) => ({ label: `PubMed ${pmid}`, url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` });
const doiLink = (d: string) => ({ label: `DOI ${d}`, url: `https://doi.org/${d}` });

// ---------------------------------------------------------------- person
type Pe = Omit<PersonInput, "kind" | "asOf">;
const person = (x: Pe): PersonInput => ({ kind: "person", asOf, provenance, ...x });

export const cassianYeePeople: PersonInput[] = [
  person({
    id: "cassian-yee", name: "Cassian Yee", aka: ["Cassian Yee, MD", "C. Yee"],
    role: "Professor, Melanoma Medical Oncology and Immunology; Director, Program for T Cell-Based Therapies, MD Anderson Cancer Center",
    institutionId: "md-anderson", orcid: "0000-0002-4429-7307",
    specialisms: ["Adoptive T-cell therapy", "Endogenous T-cell therapy", "Melanoma", "Sarcoma", "Tumour antigens"],
    tldr: "Cassian Yee is a cancer doctor and scientist in Houston who grows a patient's own cancer-recognising T cells in the laboratory and gives them back as a treatment. Cassian Yee's early trials in Seattle were among the studies that showed such cells can find and shrink melanoma.",
    summary: "Cassian Yee is Professor in the Departments of Melanoma Medical Oncology and Immunology at MD Anderson Cancer Center in Houston, Director of the Program for T Cell-Based Therapies (ProTCT) and Director of the Solid Tumor Cell Therapy Program, and has held the Kenneth D. Muller Professorship in Melanoma Research since 2022 (MD Anderson faculty profile). Cassian Yee has co-directed MD Anderson's Adoptive Cell Therapy Platform since 2019, founded and co-directs the MD Anderson and Rice University immunotherapy consortium (since 2018), and was Scientific Director of the Cell Therapy Manufacturing Facility and leader of the TIL Working Group from 2020 to 2023 and Co-Director of the Moon Shots immunotherapy platform from 2020 to 2021 (MD Anderson faculty profile).\n\nCassian Yee received an MD from the University of Manitoba in 1986, was a Medical Research Council of Canada fellow at the Ontario Cancer Institute and Princess Margaret Hospital in Toronto, trained in internal medicine at Stanford University Medical Center, and from 1991 trained and then worked at the University of Washington and Fred Hutchinson Cancer Research Center in Seattle, where Cassian Yee was on staff until 2013 (MD Anderson faculty profile).\n\nThe work in Seattle tested T cells taken from a patient's own blood, selected for one tumour antigen and expanded in the laboratory, now called endogenous T-cell therapy. Infused CD8+ T-cell clones against MART-1 and gp100 persisted, travelled to tumours and caused regressions in patients with metastatic melanoma (PNAS 2002); one patient's MART-1 clones also destroyed normal pigment cells in the skin (Journal of Experimental Medicine 2000); and CD4+ T cells against NY-ESO-1 produced a durable remission in one patient with refractory melanoma (New England Journal of Medicine 2008). Later trials added fludarabine or cyclophosphamide conditioning and CTLA-4 blockade with ipilimumab (PLoS ONE 2009, PNAS 2012, Journal of Clinical Oncology 2016).",
    institutions: ["md-anderson", "fred-hutch", "stanford", "princess-margaret", "rice-university", "nci", "oicr", "osu-james", "cancer-research-institute", "damon-runyon", "burroughs-wellcome-fund", "aacr", "asco", "sitc"],
    companies: ["immatics", "instil-bio", "obsidian-therapeutics", "genomefrontier-therapeutics", "t-cypher-bio", "affyimmune-therapeutics", "berkeley-lights", "lav", "prellis-biologics", "adaptive-biotechnologies"],
    technologies: ["tcr-t", "til-therapy"], terms: ["endogenous-t-cell-therapy"],
    cancers: ["melanoma", "sarcoma", "ovarian", "pancreatic"], targets: ["ctag1b", "gp100"],
    trials: ["nct00002786", "nct00045357", "nct00045149", "nct00317759", "nct00101257", "nct00438984", "nct00553306", "nct01106235", "nct02210104"],
    keyPapers: ["paper-yee-ctl-clones-melanoma-pnas-2002", "paper-yee-t-cell-vitiligo-jem-2000", "paper-hunder-cd4-ny-eso-1-melanoma-nejm-2008", "paper-wallen-fludarabine-ctl-melanoma-plos-one-2009", "paper-chapuis-cd8-central-memory-melanoma-pnas-2012", "paper-chapuis-il21-ctl-ipilimumab-jco-2016", "paper-yee-endogenous-t-cells-immunol-rev-2014", "paper-chu-pan-cancer-t-cell-atlas-nat-med-2023", "paper-yee-endogenous-t-cell-therapy-cancer-j-2015"],
    papers: [
      { title: "Adoptive T cell therapy using antigen-specific CD8+ T cell clones for the treatment of patients with metastatic melanoma", journal: "Proceedings of the National Academy of Sciences", year: 2002, doi: "10.1073/pnas.242600099", url: "https://doi.org/10.1073/pnas.242600099" },
      { title: "Treatment of metastatic melanoma with autologous CD4+ T cells against NY-ESO-1", journal: "New England Journal of Medicine", year: 2008, doi: "10.1056/NEJMoa0800251", url: "https://doi.org/10.1056/NEJMoa0800251" },
      { title: "T-Cell Therapy Using Interleukin-21-Primed Cytotoxic T-Cell Lymphocytes Combined With Cytotoxic T-Cell Lymphocyte Antigen-4 Blockade Results in Long-Term Cell Persistence and Durable Tumor Regression", journal: "Journal of Clinical Oncology", year: 2016, doi: "10.1200/JCO.2015.65.5142", url: "https://doi.org/10.1200/JCO.2015.65.5142" },
      { title: "Endogenous T-Cell Therapy: Clinical Experience", journal: "The Cancer Journal", year: 2015, doi: "10.1097/PPO.0000000000000158", url: "https://doi.org/10.1097/PPO.0000000000000158" },
    ],
    profiles: [PROFILE, ORCID, { label: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/?term=Yee%20C%5BAuthor%5D%20AND%20(melanoma%20OR%20T%20cell)" }],
    notes: [
      "Disclosed consultancies, as dated on the MD Anderson faculty profile (\"Consultantships\", all listed as remote): RootPath 2021 to 2023; T-Cypher Bio 2021 to 2023; GenomeFrontier Therapeutics 2020 to 2026; Instil Bio 2020 to 2021; Scribe Biosciences 2020 to 2021; Obsidian Therapeutics 2020 to 2025; AffyImmune Therapeutics 2019 to 2021; Berkeley Lights 2019 to 2020; Lilly Asia Ventures (LAV) 2019 to 2021; Immatics Biotechnologies 2019 to 2024; Prellis Biologics 2019 to 2023. RootPath and Scribe Biosciences have no OnCo record because neither could be confirmed from its own site.",
      "The profile lists Adaptive Biotechnologies among professional memberships, 2011 to present, without describing the role.",
      "Advisory and committee roles listed on the profile: NCI Cancer Adoptive Cell Therapy (Can-ACT) Steering Committee (2024 to present); Cancer Research Institute Scientific Advisory Board (2017 to present); Ontario Institute for Cancer Research External Advisory Board (2008 to present); Ohio State University PIIO External Scientific Advisory Board (2020 to present); NCI Investigational Drug Steering Committee Immunotherapy Task Force; Damon Runyon Physician-Scientist Training Award Committee (2015 to present).",
      "Elected to the American Society for Clinical Investigation in 2009; member of the AACR, ASCO, the American Association of Immunologists and the International Society for Biological Therapy of Cancer (now SITC). Editorial boards listed: Cancer Immunology Research, Journal for ImmunoTherapy of Cancer, OncoImmunology, Cancer Research, Cancer Immunity and Journal of Translational Medicine.",
      "Awards listed: Burroughs Wellcome Fund Career Award in Biomedical Sciences (1995 to 2000) and Clinical Scientist Award in Translational Research (2006 to 2012); Cancer Research Institute Investigator Award (2000 to 2004); Damon Runyon-Lilly Clinical Investigator Award (2001 to 2006); Potu N. Rao Award for Excellence in Basic Science, MD Anderson (2021).",
    ],
    tags: ["immunotherapy", "cell-therapy", "melanoma", "trialist"],
    links: [PROFILE, ORCID],
  }),
];

// ---------------------------------------------------------------- organisations
type Co = Omit<CompanyInput, "kind" | "asOf">;
const co = (x: Co): CompanyInput => ({ kind: "company", asOf, provenance, ...x });

export const cassianYeeCompanies: CompanyInput[] = [
  co({ id: "t-cypher-bio", name: "T-Cypher Bio", aka: ["T-Cypher Bio Ltd", "T-Cypher"], hq: "Abingdon, Oxfordshire", country: "GB", companyType: "biotech", stage: "startup", website: "https://www.tcypherbio.com",
    tldr: "A small company near Oxford that designs medicines to point the immune system at new targets found only on diseased cells, for solid cancers and some autoimmune diseases.",
    summary: "T-Cypher Bio states that it develops immune-engaging medicines against novel disease-specific targets for cancer and autoimmune disease, with a pipeline across a range of solid tumours and selected autoimmune diseases, built on proprietary platforms that combine laboratory and computational methods (T-Cypher Bio website). Its registered address is Barton House, the Quadrant, Abingdon (T-Cypher Bio website). Its team page says that a number of inventions from the University of Oxford laboratory of its scientific co-founder have been licensed to the company (T-Cypher Bio, About us).",
    links: [{ label: "T-Cypher Bio website", url: "https://www.tcypherbio.com/" }, { label: "T-Cypher Bio, About us", url: "https://www.tcypherbio.com/about-us/" }],
    tags: ["immune-engager"] }),
  co({ id: "affyimmune-therapeutics", name: "AffyImmune Therapeutics", aka: ["AffyImmune", "AffyImmune Therapeutics, Inc."], hq: "Waltham, MA", country: "US", companyType: "cell-therapy", stage: "startup", website: "https://affyimmune.com",
    tldr: "A Massachusetts company making CAR-T cell therapy aimed at ICAM-1, a molecule that some solid tumours carry in large amounts. Its first product is being tested in anaplastic thyroid cancer.",
    summary: "AffyImmune describes itself as a clinical-stage company developing affinity-tuned CAR-T cells directed at ICAM-1, engineered so that the cells can be monitored non-invasively during treatment (AffyImmune website). Its lead candidate, AIC100, is an ICAM-1-directed CAR-T therapy developed for anaplastic and advanced differentiated thyroid cancer (AffyImmune website). The company announced on 23 July 2024 that the FDA had granted AIC100 Regenerative Medicine Advanced Therapy (RMAT) designation in recurrent anaplastic thyroid cancer (AffyImmune website, news). It is based at 303 Wyman Street, Waltham, Massachusetts (AffyImmune website).",
    technologies: ["car-t"], cancers: ["anaplastic-thyroid-cancer", "thyroid"],
    links: [{ label: "AffyImmune website", url: "https://affyimmune.com/" }],
    tags: ["car-t", "solid-tumour-cell-therapy"] }),
  co({ id: "prellis-biologics", name: "Prellis Biologics", aka: ["Prellis Biologics, Inc", "Prellis"], hq: "San Francisco, CA", country: "US", companyType: "biotech", stage: "startup", founded: 2017, website: "https://www.prellisbio.com",
    tldr: "A San Francisco company that finds human antibodies by growing small 3D-printed copies of lymph nodes in the laboratory and screening what they make, with machine learning to pick the best ones.",
    summary: "Prellis Biologics states that it combines human biology with machine learning to discover antibody medicines, using a bioprinted lymph node organoid (LNO) platform, which it calls EXIS, to reproduce human immune responses in vitro and mine the human antibody repertoire (Prellis website). Its SEC Form D filings give a San Francisco business address, Delaware incorporation and 2017 as the year of incorporation (SEC EDGAR, CIK 1711459).",
    links: [{ label: "Prellis Biologics website", url: "https://www.prellisbio.com/" }, { label: "SEC EDGAR filings, Prellis Biologics (CIK 1711459)", url: "https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=1711459" }],
    tags: ["antibody-discovery"] }),
  co({ id: "berkeley-lights", name: "Berkeley Lights", aka: ["Berkeley Lights, Inc.", "PhenomeX", "PhenomeX Inc.", "Bruker Cellular Analysis"], hq: "Emeryville, CA", country: "US", companyType: "devices", stage: "acquired", acquiredBy: "bruker", founded: 2011,
    tldr: "A California maker of laboratory instruments that grow, test and pick out single living cells on a chip, used among other things to find T cells and antibodies for new medicines. It became part of Bruker in 2023.",
    summary: "Berkeley Lights described its platform as high-throughput functional screening of live cells on OptoSelect chips, on which thousands of individual cells can be isolated, expanded, assayed and exported, for biological research and therapeutics discovery (Berkeley Lights 10-K for 2022). The company was incorporated in Delaware on 5 April 2011 and was based in Emeryville, California (Berkeley Lights 10-K for 2022). After acquiring IsoPlexis on 21 March 2023 it changed its name to PhenomeX (8-K, 21 March 2023). Bruker completed its acquisition of PhenomeX on 2 October 2023, after which the company was renamed Bruker Cellular Analysis (8-K, 2 October 2023).",
    links: [
      { label: "Berkeley Lights 10-K for 2022 (SEC EDGAR)", url: "https://www.sec.gov/Archives/edgar/data/1689657/000168965723000009/bli-20221231.htm" },
      { label: "8-K, 21 March 2023: IsoPlexis merger and name change to PhenomeX (SEC EDGAR)", url: "https://www.sec.gov/Archives/edgar/data/1689657/000114036123012827/brhc10050009_8k.htm" },
      { label: "8-K, 2 October 2023: completion of acquisition by Bruker (SEC EDGAR)", url: "https://www.sec.gov/Archives/edgar/data/1689657/000119312523248475/d496355d8k.htm" },
    ],
    tags: ["cell-analysis-instruments"] }),
  co({ id: "lav", name: "LAV", aka: ["Lilly Asia Ventures", "LAV Fund"], hq: "Shanghai", country: "CN", companyType: "investor", founded: 2008, website: "https://www.lavfund.com",
    tldr: "A life-science venture capital firm with offices in Shanghai, Hong Kong and Palo Alto. It began in 2008 as a venture arm of the drug company Eli Lilly and became independent in 2011.",
    summary: "LAV describes itself as a biomedical venture capital firm headquartered in China, with offices in Shanghai, Hong Kong and Palo Alto, investing in biopharmaceuticals, human therapeutics, medical devices and diagnostics (LAV website). It states that it originated in 2008 as a corporate venture subsidiary of Eli Lilly and spun off in 2011 to become an independent investment management company (LAV, About us).",
    notes: ["The firm's pages use the name LAV; \"Lilly Asia Ventures\" appears in the site's own metadata and is the name under which the MD Anderson faculty profile of Cassian Yee lists a 2019 to 2021 consultancy."],
    links: [{ label: "LAV website", url: "https://www.lavfund.com/" }, { label: "LAV, About us", url: "https://www.lavfund.com/about-us" }],
    tags: ["vc", "corporate-venture"] }),
];

type In = Omit<InstitutionInput, "kind" | "asOf">;
const inst = (x: In): InstitutionInput => ({ kind: "institution", asOf, provenance, ...x });

export const cassianYeeInstitutions: InstitutionInput[] = [
  inst({ id: "burroughs-wellcome-fund", name: "Burroughs Wellcome Fund", aka: ["BWF"], institutionType: "consortium", city: "Durham, NC", country: "US", lat: 35.994, lng: -78.899, website: "https://www.bwfund.org",
    tldr: "A private foundation in North Carolina that funds biomedical scientists in the United States and Canada, especially at the start of their careers.",
    summary: "The Burroughs Wellcome Fund was founded in 1955 as the corporate foundation of the pharmaceutical company Burroughs Wellcome Co., and in 1993 a $400 million gift from the Wellcome Trust made it an independent private foundation with no ties to its founding company (Burroughs Wellcome Fund, Our history). Based in Durham, North Carolina, it runs competitive, peer-reviewed awards for scientists at career transitions across the United States and Canada, and supports science education in North Carolina (Burroughs Wellcome Fund website).",
    programs: ["Career Award in Biomedical Sciences", "Clinical Scientist Award in Translational Research"],
    links: [{ label: "Burroughs Wellcome Fund website", url: "https://www.bwfund.org/" }, { label: "Burroughs Wellcome Fund, Our history", url: "https://www.bwfund.org/about/history/" }, { label: "Burroughs Wellcome Fund, About", url: "https://www.bwfund.org/about/" }],
    tags: ["funder", "foundation"] }),
  inst({ id: "rice-university", name: "Rice University", aka: ["William Marsh Rice University"], institutionType: "university", city: "Houston", country: "US", lat: 29.717, lng: -95.402, website: "https://www.rice.edu",
    tldr: "A private research university in Houston that works with the Texas Medical Center, including on cancer immunotherapy with MD Anderson.",
    summary: "Rice University is on a 300-acre campus in Houston, Texas; it opened as the Rice Institute on 23 September 1912 and was renamed William Marsh Rice University on 1 July 1960 (Rice University, About). The university describes partnerships with local industry and the Texas Medical Center (Rice University, About). Its faculty collaborate with MD Anderson Cancer Center through an immunotherapy consortium that the MD Anderson profile of Cassian Yee lists as founded in 2018.",
    institutions: ["md-anderson"],
    links: [{ label: "Rice University, About", url: "https://www.rice.edu/about" }, PROFILE],
    tags: ["university"] }),
];

// ---------------------------------------------------------------- term
export const cassianYeeTerms: TermInput[] = [
  { kind: "term", asOf, provenance, id: "endogenous-t-cell-therapy", name: "Endogenous T-cell therapy", category: "Immunology",
    aka: ["ETC therapy", "endogenous T cell therapy", "ETC", "peripheral blood-derived antigen-specific T cells"],
    tldr: "A treatment that finds the rare T cells in a patient's own blood that already recognise the cancer, grows large numbers of them in the laboratory without changing their genes, and infuses them back.",
    summary: "Yee, Lizee and Schueneman describe three ways of adoptive T-cell transfer: tumour-infiltrating lymphocytes taken from a biopsy; lymphocytes redirected by a chimeric antigen receptor or T-cell receptor; and the isolation and expansion of often low-frequency endogenous T cells reactive to tumour antigens from the peripheral blood, which they call endogenous T-cell (ETC) therapy (Cancer Journal 2015). It needs specialised methods to isolate and expand very low-frequency tumour-reactive T cells from blood, and the authors note that a trial can be started quickly once a tumour-associated target epitope has been identified (Cancer Journal 2015). The early melanoma trials at Fred Hutchinson Cancer Research Center infused such cells as clones against MART-1, gp100, tyrosinase and NY-ESO-1.",
    technologies: ["til-therapy", "tcr-t", "car-t"], cancers: ["melanoma"],
    keyPapers: ["paper-yee-endogenous-t-cell-therapy-cancer-j-2015", "paper-yee-endogenous-t-cells-immunol-rev-2014"],
    links: [doiLink("10.1097/PPO.0000000000000158"), pubmed("26588682")] },
];

// ---------------------------------------------------------------- papers
type Pa = Omit<PaperInput, "kind" | "asOf">;
const paper = (x: Pa): PaperInput => ({ kind: "paper", asOf, provenance, people: ["cassian-yee"], ...x });

/** Titles, authors, journals, years and abstracts read from the Europe PMC core record for each PubMed id on 5 November 2026. */
export const cassianYeePapers: PaperInput[] = [
  paper({ id: "paper-yee-ctl-clones-melanoma-pnas-2002", name: "Adoptive T cell therapy using antigen-specific CD8+ T cell clones for the treatment of patients with metastatic melanoma: in vivo persistence, migration, and antitumor effect of transferred T cells",
    tldr: "A small early trial in which ten people with melanoma that had spread were given copies of their own T cells grown to recognise melanoma proteins. The cells lasted in the body, went to the tumours and shrank some of them, with no serious side effects.",
    summary: "A phase I study of autologous CD8+ T-cell clones against the melanoma antigens MART-1/Melan-A and gp100 in metastatic melanoma: 43 infusions were given to 10 patients, the first without IL-2 and later ones with low-dose IL-2 (PNAS 2002). The clones persisted in response to low-dose IL-2, localised preferentially to tumour sites and eliminated antigen-positive tumour cells (PNAS 2002).",
    journal: "Proceedings of the National Academy of Sciences of the United States of America", journals: ["pnas"], year: 2002, doi: "10.1073/pnas.242600099", pmid: "12427970",
    authors: "Yee C, Thompson JA, Byrd D, Riddell SR, Roche P, Celis E, Greenberg PD.", paperType: "translational", participants: 10,
    findings: ["43 infusions of MART-1- or gp100-specific CD8+ T-cell clones were given to 10 patients with no serious toxicity.", "Transferred clones persisted in vivo with low-dose IL-2 and preferentially localised to tumour sites.", "Regression of individual metastases and minor, mixed or stable responses were seen in 8 of 10 patients with refractory metastatic disease, for up to 21 months."],
    whatItMeans: "It showed that T cells taken from a patient's blood, selected for one melanoma antigen and grown as clones, can survive after infusion, reach tumours and kill the antigen-carrying cells there.",
    caveats: ["Ten patients, no control group; responses were minor, mixed or stable disease rather than formal remissions.", "Tumour cells that lost the target antigen were not eliminated, a limit of single-antigen targeting."],
    cancers: ["melanoma"], targets: ["gp100"], drugs: ["aldesleukin"], terms: ["endogenous-t-cell-therapy"], institutions: ["fred-hutch"],
    links: [doiLink("10.1073/pnas.242600099"), pubmed("12427970")] }),
  paper({ id: "paper-yee-t-cell-vitiligo-jem-2000", name: "Melanocyte destruction after antigen-specific immunotherapy of melanoma: direct evidence of T cell-mediated vitiligo",
    tldr: "A report of one patient whose infused melanoma-targeting T cells also attacked normal pigment cells in the skin, which the authors called the first direct evidence in humans that such cells can harm healthy tissue carrying the same protein.",
    summary: "A patient with metastatic melanoma developed inflammatory lesions around pigmented areas of skin after an infusion of MART-1-specific CD8+ T-cell clones (Journal of Experimental Medicine 2000). Tetramer analysis showed MART-1-specific CD8+ T cells, identical to the infused clones by CDR3 sequencing, made up more than 28 per cent of CD8 T cells in the skin, and post-infusion biopsies showed loss of MART-1 expression and absence of melanocytes in affected skin (Journal of Experimental Medicine 2000).",
    journal: "The Journal of Experimental Medicine", year: 2000, doi: "10.1084/jem.192.11.1637", pmid: "11104805",
    authors: "Yee C, Thompson JA, Roche P, Byrd DR, Lee PP, Piepkorn M, Kenyon K, Davis MM, Riddell SR, Greenberg PD.", paperType: "translational", participants: 1,
    findings: ["Infused MART-1-specific CD8+ T-cell clones were found at more than 28 per cent of all CD8 T cells in skin lesions, identical to the infused clones.", "Post-infusion skin biopsies showed loss of MART-1 expression, melanocyte damage and complete absence of melanocytes in affected regions."],
    whatItMeans: "Targeting a protein that tumours share with normal cells can damage those normal cells too; the authors state this was the first direct evidence of it in humans, which shaped later thinking on on-target, off-tumour toxicity.",
    caveats: ["A single patient."],
    cancers: ["melanoma"], terms: ["endogenous-t-cell-therapy"], institutions: ["fred-hutch"],
    links: [doiLink("10.1084/jem.192.11.1637"), pubmed("11104805")] }),
  paper({ id: "paper-hunder-cd4-ny-eso-1-melanoma-nejm-2008", name: "Treatment of metastatic melanoma with autologous CD4+ T cells against NY-ESO-1",
    tldr: "A case report of one person with melanoma that no treatment had controlled, who went into a lasting remission after an infusion of their own helper T cells grown against the NY-ESO-1 protein.",
    summary: "The authors developed an in vitro method for isolating and expanding autologous CD4+ T-cell clones specific for the melanoma-associated antigen NY-ESO-1 and infused them into a patient with refractory metastatic melanoma who had had no prior conditioning or cytokine treatment (New England Journal of Medicine 2008). The transferred cells mediated a durable clinical remission and led to endogenous responses against melanoma antigens other than NY-ESO-1 (New England Journal of Medicine 2008).",
    journal: "The New England Journal of Medicine", journals: ["nejm"], year: 2008, doi: "10.1056/NEJMoa0800251", pmid: "18565862",
    authors: "Hunder NN, Wallen H, Cao J, Hendricks DW, Reilly JZ, Rodmyre R, Jungbluth A, Gnjatic S, Thompson JA, Yee C.", paperType: "translational", participants: 1,
    findings: ["Autologous NY-ESO-1-specific CD4+ T-cell clones, given without conditioning or cytokines, produced a durable clinical remission in one patient with refractory metastatic melanoma.", "The patient developed endogenous responses to melanoma antigens other than NY-ESO-1."],
    whatItMeans: "Helper (CD4+) T cells, not only killer (CD8+) T cells, can drive a remission, and one targeted infusion can widen the immune response to other tumour antigens.",
    caveats: ["One patient; a case report, not a trial result."],
    cancers: ["melanoma"], targets: ["ctag1b"], terms: ["endogenous-t-cell-therapy"], institutions: ["fred-hutch"],
    links: [doiLink("10.1056/NEJMoa0800251"), pubmed("18565862")] }),
  paper({ id: "paper-wallen-fludarabine-ctl-melanoma-plos-one-2009", name: "Fludarabine modulates immune response and extends in vivo survival of adoptively transferred CD8 T cells in patients with metastatic melanoma",
    tldr: "A small trial in ten people with advanced melanoma that compared how long infused T cells lasted with and without the chemotherapy drug fludarabine first. Fludarabine made them last about three times longer.",
    summary: "In a first-in-human phase I study (FHCRC 1796, NCT00317759), patients with refractory metastatic melanoma received two infusions of a single tumour-reactive antigen-specific CTL clone, the first without and the second after fludarabine 25 mg/m2 a day for five days, allowing an intra-patient comparison (PLoS ONE 2009). Nineteen infusions were given to ten patients with no serious toxicities (PLoS ONE 2009).",
    journal: "PLoS ONE", year: 2009, doi: "10.1371/journal.pone.0004749", pmid: "19270751",
    authors: "Wallen H, Thompson JA, Reilly JZ, Rodmyre RM, Cao J, Yee C.", paperType: "translational", participants: 10,
    findings: ["Fludarabine improved in vivo persistence of transferred CTL clones 2.9-fold, from a median of 4.5 days (range 0 to 38+) to 13.0 days (range 2 to 63+) (p<0.05).", "Three of nine evaluable patients had minor response or stable disease for 5.8 to 11.0 months; median overall survival was 9.7 months.", "Fludarabine raised plasma IL-7 and IL-15 and also raised the share of CD4+ T cells expressing Foxp3."],
    whatItMeans: "Lymphodepletion before infusion helps transferred T cells survive, but the rise in regulatory T cells suggests conditioning alone is not enough for anti-tumour effect.",
    caveats: ["Ten patients, phase I; the authors conclude that further improvements to T-cell survival and to regulatory T cells are needed."],
    cancers: ["melanoma"], drugs: ["fludarabine"], terms: ["endogenous-t-cell-therapy", "lymphodepletion"], trials: ["nct00317759"], institutions: ["fred-hutch"],
    links: [doiLink("10.1371/journal.pone.0004749"), pubmed("19270751"), ct("NCT00317759")] }),
  paper({ id: "paper-chapuis-cd8-central-memory-melanoma-pnas-2012", name: "Transferred melanoma-specific CD8+ T cells persist, mediate tumor regression, and acquire central memory phenotype",
    tldr: "In eleven people with advanced melanoma given cyclophosphamide and then their own melanoma-targeting T cells, one had a complete remission lasting over three years, and the cells that survived changed into long-lived memory cells.",
    summary: "Eleven patients with refractory, progressive metastatic melanoma received cyclophosphamide alone as conditioning before infusion of blood-derived, antigen-specific CD8+ CTL clones, followed by low-dose or high-dose IL-2 (PNAS 2012). The infused clones had an effector memory phenotype, and those that persisted long term acquired central memory qualities in vivo (PNAS 2012).",
    journal: "Proceedings of the National Academy of Sciences of the United States of America", journals: ["pnas"], year: 2012, doi: "10.1073/pnas.1113748109", pmid: "22393002",
    authors: "Chapuis AG, Thompson JA, Margolin KA, Rodmyre R, Lai IP, Dowdy K, Farrar EA, Bhatia S, Sabath DE, Cao J, Li Y, Yee C.", paperType: "translational", participants: 11,
    findings: ["No life-threatening toxicities occurred with low-dose IL-2.", "Five of 10 evaluable patients had stable disease at 8 weeks, and 1 of 11 had a complete remission continuing for longer than 3 years.", "On-target autoimmune events with early skin rashes were seen in patients with stable disease or complete remission at 4 weeks or longer."],
    whatItMeans: "Infused T-cell clones can convert to a central memory type in the body, which may underlie lasting benefit.",
    caveats: ["Eleven patients and no control group."],
    cancers: ["melanoma"], drugs: ["cyclophosphamide", "aldesleukin"], terms: ["endogenous-t-cell-therapy"], institutions: ["fred-hutch"],
    links: [doiLink("10.1073/pnas.1113748109"), pubmed("22393002")] }),
  paper({ id: "paper-chapuis-il21-ctl-ipilimumab-jco-2016", name: "T-Cell Therapy Using Interleukin-21-Primed Cytotoxic T-Cell Lymphocytes Combined With Cytotoxic T-Cell Lymphocyte Antigen-4 Blockade Results in Long-Term Cell Persistence and Durable Tumor Regression",
    tldr: "Ten people with stage IV melanoma were given their own MART-1-targeting T cells followed by the immunotherapy drug ipilimumab. Two had lasting complete remissions and the infused cells were still found in the blood months later.",
    summary: "Autologous MART-1-specific CTLs were primed with peptide-pulsed dendritic cells in the presence of interleukin-21 and enriched by peptide-MHC multimer-guided sorting, and 10 patients with stage IV melanoma received the cells followed by a standard course of ipilimumab (Journal of Clinical Oncology 2016). The toxicity profile was comparable to ipilimumab alone (Journal of Clinical Oncology 2016).",
    journal: "Journal of Clinical Oncology", journals: ["jco"], year: 2016, doi: "10.1200/JCO.2015.65.5142", pmid: "27269940",
    authors: "Chapuis AG, Roberts IM, Thompson JA, Margolin KA, Bhatia S, Lee SM, Sloan HL, Lai IP, Farrar EA, Wagener F, Shibuya KC, Cao J, Wolchok JD, Greenberg PD, Yee C.", paperType: "translational", participants: 10,
    findings: ["Best responses at 12 weeks: two continuous complete remissions, one partial response by RECIST (two by immune-related response criteria) and three with stable disease.", "Infused CTLs persisted at up to 2.9 per cent of CD8+ T cells for as long as patients were monitored, up to 40 weeks.", "Patients with complete remission, partial response or stable disease developed responses to non-targeted tumour antigens (epitope spreading)."],
    whatItMeans: "Combining antigen-specific T cells with CTLA-4 blockade was safe in this small study and produced durable responses, supporting checkpoint inhibitors as partners for cell therapy.",
    caveats: ["Ten patients, single arm; the contribution of the cells and of ipilimumab cannot be separated."],
    cancers: ["melanoma"], drugs: ["ipilimumab"], terms: ["endogenous-t-cell-therapy"], institutions: ["fred-hutch"],
    links: [doiLink("10.1200/JCO.2015.65.5142"), pubmed("27269940")] }),
  paper({ id: "paper-yee-endogenous-t-cells-immunol-rev-2014", name: "The use of endogenous T cells for adoptive transfer",
    tldr: "A review of how T cells already present in a patient's blood or tumour can be found, grown and made to work better as a cancer treatment.",
    summary: "The review presents endogenous T cells derived from peripheral blood or tumour sites as a source of effector cells for adoptive therapy, and covers strategies to isolate, manipulate and enhance antigen-specific T cells in vitro and to improve their efficacy and persistence in vivo by host immunomodulation (Immunological Reviews 2014).",
    journal: "Immunological Reviews", year: 2014, doi: "10.1111/imr.12134", pmid: "24329802",
    authors: "Yee C.", paperType: "review",
    findings: ["Reviews methods to isolate, expand and enhance antigen-specific endogenous T cells and to improve their persistence after transfer."],
    whatItMeans: "An overview of the endogenous T-cell approach from one of its developers, written as checkpoint inhibitors and engineered cell therapies were entering the clinic.",
    caveats: ["Narrative review; no new data."],
    terms: ["endogenous-t-cell-therapy"],
    links: [doiLink("10.1111/imr.12134"), pubmed("24329802")] }),
  paper({ id: "paper-yee-endogenous-t-cell-therapy-cancer-j-2015", name: "Endogenous T-Cell Therapy: Clinical Experience",
    tldr: "A review that names and describes endogenous T-cell therapy: growing the rare cancer-recognising T cells from a patient's blood and giving them back, as an alternative to tumour-derived or genetically engineered T cells.",
    summary: "The review sets out three approaches to adoptive T-cell transfer (tumour-infiltrating lymphocytes, CAR- or TCR-engineered lymphocytes, and expansion of low-frequency endogenous T cells from peripheral blood) and describes the third, ETC therapy, its isolation and expansion methods and its clinical experience (Cancer Journal 2015).",
    journal: "The Cancer Journal", journals: ["the-cancer-journal"], year: 2015, doi: "10.1097/PPO.0000000000000158", pmid: "26588682",
    authors: "Yee C, Lizee G, Schueneman AJ.", paperType: "review",
    findings: ["Defines endogenous T-cell (ETC) therapy as the isolation and expansion of low-frequency tumour-reactive T cells from peripheral blood.", "Argues that ETC trials can be started rapidly once a tumour-associated target epitope is identified, which could allow personalised antigen-specific T-cell therapy for almost any solid tumour."],
    whatItMeans: "The paper gives the approach its name and makes the case for it beyond melanoma.",
    caveats: ["Narrative review by the method's developers."],
    terms: ["endogenous-t-cell-therapy"], cancers: ["melanoma"],
    links: [doiLink("10.1097/PPO.0000000000000158"), pubmed("26588682")] }),
  paper({ id: "paper-chu-pan-cancer-t-cell-atlas-nat-med-2023", name: "Pan-cancer T cell atlas links a cellular stress response state to immunotherapy resistance",
    tldr: "A map of T cells from more than 300,000 single-cell readings across 16 cancer types, which found a stressed T-cell state that was more common in tumours that did not respond to immunotherapy.",
    summary: "A single-cell atlas of T cells from 308,048 transcriptomes across 16 cancer types identified previously undescribed states, including a stress response state (TSTR) marked by heat shock gene expression, detectable in situ mostly within lymphocyte aggregates or potential tertiary lymphoid structures (Nature Medicine 2023). T-cell states were correlated with genomic, pathological and clinical features in 375 patients from 23 cohorts, 171 of whom received immune checkpoint blockade (Nature Medicine 2023).",
    journal: "Nature Medicine", journals: ["nature-medicine"], year: 2023, doi: "10.1038/s41591-023-02371-y", pmid: "37248301",
    authors: "Chu Y, Dai E, Li Y, et al.; Yee C, Wang L.", paperType: "basic",
    findings: ["Single-cell atlas of 308,048 T-cell transcriptomes across 16 cancer types.", "Identified a heat shock stress response T-cell state, TSTR, detectable in tumour tissue across cancer types.", "Heat shock gene expression in intratumoral CD4/CD8+ cells was significantly upregulated after immune checkpoint blockade, particularly in non-responsive tumours."],
    whatItMeans: "A reference map of tumour T cells, with a candidate state linked to resistance that could inform T-cell therapy and biomarker work.",
    caveats: ["The link between the stress state and resistance is an association; the authors describe a potential role."],
    terms: ["single-cell-rna-seq"], institutions: ["md-anderson"],
    links: [doiLink("10.1038/s41591-023-02371-y"), pubmed("37248301")] }),
];

// ---------------------------------------------------------------- trials
type Tr = Omit<TrialInput, "kind" | "asOf">;
const trial = (x: Tr): TrialInput => ({ kind: "trial", asOf, provenance, people: ["cassian-yee"], ...x });

/** Every field read from the ClinicalTrials.gov v2 record for the NCT number on 5 November 2026; none posts results. */
export const cassianYeeTrials: TrialInput[] = [
  trial({ id: "nct00002786", nct: "NCT00002786", name: "Tyrosinase-specific CD8+ T cells, gene-modified and unmodified, in metastatic melanoma (Fred Hutchinson phase 1/2)", phase: "1/2", status: "completed", started: "1995-10", startedType: "actual",
    sponsor: "Fred Hutchinson Cancer Center, with the National Cancer Institute",
    setting: "Metastatic melanoma: autologous CD8+ tyrosinase-specific T cells, genetically modified and unmodified, with aldesleukin",
    tldr: "An early Seattle trial that gave people with melanoma that had spread their own T cells grown to recognise tyrosinase, a melanoma protein. It started in 1995 and the registry lists it as completed in 2006.",
    summary: "The registry's official title is a phase I study of cellular adoptive immunotherapy using genetically modified and unmodified autologous CD8+ tyrosinase-specific T cells for patients with metastatic melanoma; the record lists it as phase 1/2, started in October 1995 and completed in March 2006, with an estimated enrolment of 20 (ClinicalTrials.gov NCT00002786). Cassian Yee is listed as study chair, the sponsor is Fred Hutchinson Cancer Center with the National Cancer Institute as collaborator, and the interventions are aldesleukin and therapeutic T cells (ClinicalTrials.gov NCT00002786). No results are posted.",
    result: "No results posted on ClinicalTrials.gov.",
    cancers: ["melanoma"], targets: ["tyr"], drugs: ["aldesleukin"], institutions: ["fred-hutch", "nci"], terms: ["endogenous-t-cell-therapy"],
    links: [ct("NCT00002786")] }),
  trial({ id: "nct00045357", nct: "NCT00045357", name: "Autologous CD4+ antigen-specific T-cell clones in metastatic melanoma (Fred Hutchinson phase 1)", phase: "1", status: "completed", started: "2001-11", startedType: "actual",
    sponsor: "Fred Hutchinson Cancer Center, with the National Cancer Institute",
    setting: "Metastatic melanoma: autologous CD4+ antigen-specific T-cell clones",
    tldr: "A Seattle safety trial of helper T cells grown from patients' own blood to recognise melanoma. It ran from 2001 to 2008 and the registry posts no results.",
    summary: "The registry describes a phase I safety study of cellular adoptive immunotherapy using autologous CD4+ antigen-specific T-cell clones in metastatic melanoma, started in November 2001 and completed in August 2008, with an estimated enrolment of 18 (ClinicalTrials.gov NCT00045357). Cassian Yee is listed as study chair; the sponsor is Fred Hutchinson Cancer Center with the National Cancer Institute as collaborator (ClinicalTrials.gov NCT00045357). No results are posted.",
    result: "No results posted on ClinicalTrials.gov.",
    cancers: ["melanoma"], institutions: ["fred-hutch", "nci"], terms: ["endogenous-t-cell-therapy"],
    links: [ct("NCT00045357")] }),
  trial({ id: "nct00045149", nct: "NCT00045149", name: "CD8+ T-cell clones against cancer-testis antigens in metastatic melanoma (Fred Hutchinson phase 1)", phase: "1", status: "completed", started: "2002-10", startedType: "actual",
    sponsor: "Fred Hutchinson Cancer Center, with the National Cancer Institute",
    setting: "Metastatic melanoma: autologous CD8+ antigen-specific T-cell clones targeting cancer-testis antigens, with aldesleukin",
    tldr: "A Seattle safety trial of killer T cells grown to recognise cancer-testis proteins, which melanomas can carry but most normal adult tissues do not. It ran from 2002 to 2005.",
    summary: "The registry describes a phase I safety study of autologous CD8+ antigen-specific T-cell clones targeting cancer-testis antigens in metastatic melanoma, started in October 2002 and completed in June 2005; no enrolment figure is given (ClinicalTrials.gov NCT00045149). Cassian Yee is listed as study chair, the sponsor is Fred Hutchinson Cancer Center with the National Cancer Institute as collaborator, and the interventions are aldesleukin and therapeutic T cells (ClinicalTrials.gov NCT00045149). No results are posted.",
    result: "No results posted on ClinicalTrials.gov.",
    cancers: ["melanoma"], drugs: ["aldesleukin"], institutions: ["fred-hutch", "nci"], terms: ["endogenous-t-cell-therapy"],
    links: [ct("NCT00045149")] }),
  trial({ id: "nct00317759", nct: "NCT00317759", name: "Fludarabine before CD8+ antigen-specific T-cell clones in stage IV melanoma (Fred Hutchinson phase 1)", phase: "1", status: "completed", started: "2003-05", startedType: "actual",
    sponsor: "Fred Hutchinson Cancer Center, with the National Cancer Institute",
    setting: "Metastatic melanoma: autologous CD8+ antigen-specific T-cell clones following fludarabine lymphodepletion",
    tldr: "A Seattle trial that tested whether giving the chemotherapy drug fludarabine before an infusion of a patient's own melanoma-targeting T cells helped the cells survive. The published report found they lasted about three times longer.",
    summary: "The registry describes a phase I study of autologous CD8+ antigen-specific T-cell clones following fludarabine lymphodepletion in metastatic melanoma, started in May 2003 and completed in October 2008, with an estimated enrolment of 12; Cassian Yee is listed as principal investigator (ClinicalTrials.gov NCT00317759). The trial's report, which names this registration (FHCRC 1796), gave 19 infusions to 10 patients and found that fludarabine extended median persistence of the transferred clones from 4.5 to 13.0 days (PLoS ONE 2009). No results are posted on the registry.",
    result: "Published report: fludarabine improved in vivo persistence of transferred CTL clones 2.9-fold, from a median of 4.5 to 13.0 days, in 10 patients (PLoS ONE 2009). No results posted on ClinicalTrials.gov.",
    cancers: ["melanoma"], drugs: ["fludarabine"], institutions: ["fred-hutch", "nci"], terms: ["endogenous-t-cell-therapy", "lymphodepletion"],
    keyPapers: ["paper-wallen-fludarabine-ctl-melanoma-plos-one-2009"],
    links: [ct("NCT00317759"), doiLink("10.1371/journal.pone.0004749")] }),
  trial({ id: "nct00101257", nct: "NCT00101257", name: "Autologous CD4+ antigen-specific T-cell clones in advanced ovarian or primary peritoneal cancer (Fred Hutchinson phase 1)", phase: "1", status: "completed", started: "2004-10", startedType: "actual",
    sponsor: "Fred Hutchinson Cancer Center",
    setting: "Stage III or IV ovarian cancer or primary peritoneal cancer: autologous CD4+ antigen-specific T-cell clones",
    tldr: "A Seattle safety and dose trial of helper T cells grown from patients' own blood, in women with advanced ovarian or peritoneal cancer. It ran from 2004 to 2010.",
    summary: "The registry describes a phase I study of the side effects and best dose of autologous CD4+ antigen-specific T-cell clones in stage III or IV ovarian or primary peritoneal cancer, started in October 2004 and completed in March 2010, with an estimated enrolment of 18 (ClinicalTrials.gov NCT00101257). Cassian Yee is listed as study chair and Fred Hutchinson Cancer Center as sponsor (ClinicalTrials.gov NCT00101257). No results are posted.",
    result: "No results posted on ClinicalTrials.gov.",
    cancers: ["ovarian"], institutions: ["fred-hutch"], terms: ["endogenous-t-cell-therapy"],
    links: [ct("NCT00101257")] }),
  trial({ id: "nct00438984", nct: "NCT00438984", name: "CD8+ antigen-specific T-cell clones after cyclophosphamide, with aldesleukin, in stage IV melanoma (Fred Hutchinson phase 1, NCI-2010-01280)", phase: "1", status: "completed", started: "2006-12", startedType: "actual", enrolled: 11,
    sponsor: "Fred Hutchinson Cancer Research Center/University of Washington Cancer Consortium, with the National Cancer Institute",
    setting: "Stage IV or recurrent melanoma: cyclophosphamide conditioning, then autologous CD8+ antigen-specific T-cell clones and aldesleukin",
    tldr: "A Seattle trial in 11 people with advanced melanoma that gave cyclophosphamide before their own melanoma-targeting T cells, followed by the immune signal IL-2. It ran from 2006 to 2012.",
    summary: "The registry describes a phase I study of autologous CD8+ antigen-specific T-cell clones following cyclophosphamide conditioning, with aldesleukin, in metastatic melanoma, started in December 2006, with primary completion in January 2011, completion in February 2012 and an actual enrolment of 11 (ClinicalTrials.gov NCT00438984). Cassian Yee is listed as principal investigator; the record names NIH grant R21CA128283 (ClinicalTrials.gov NCT00438984). No results are posted.",
    result: "No results posted on ClinicalTrials.gov.",
    cancers: ["melanoma"], drugs: ["cyclophosphamide", "aldesleukin"], institutions: ["fred-hutch", "nci"], terms: ["endogenous-t-cell-therapy"],
    links: [ct("NCT00438984")] }),
  trial({ id: "nct00553306", nct: "NCT00553306", name: "CD8+ antigen-specific T-cell clones after cyclophosphamide, with aldesleukin, in stage IV melanoma (Fred Hutchinson phase 1/2, NCI-2010-01281)", phase: "1/2", status: "completed", started: "2007-09", startedType: "actual", enrolled: 10,
    sponsor: "Fred Hutchinson Cancer Center",
    setting: "Stage IV or recurrent melanoma: cyclophosphamide, then laboratory-expanded autologous CD8+ antigen-specific T cells and aldesleukin",
    tldr: "A Seattle trial in 10 people with advanced melanoma testing the side effects and effect of their own laboratory-grown T cells given after cyclophosphamide, with IL-2. It ran from 2007 to 2012.",
    summary: "The registry describes a phase I/II study of autologous CD8+ antigen-specific T-cell clones following cyclophosphamide conditioning, with aldesleukin, in metastatic melanoma, started in September 2007, with primary completion in August 2010, completion in March 2012 and an actual enrolment of 10 (ClinicalTrials.gov NCT00553306). Cassian Yee is listed as principal investigator and Fred Hutchinson Cancer Center as sponsor (ClinicalTrials.gov NCT00553306). No results are posted.",
    result: "No results posted on ClinicalTrials.gov.",
    cancers: ["melanoma"], drugs: ["cyclophosphamide", "aldesleukin"], institutions: ["fred-hutch"], terms: ["endogenous-t-cell-therapy"],
    links: [ct("NCT00553306")] }),
  trial({ id: "nct01106235", nct: "NCT01106235", name: "IL-21-modulated CD8+ antigen-specific T cells with cyclophosphamide and aldesleukin in metastatic melanoma (Fred Hutchinson phase 1, terminated)", phase: "1", status: "withdrawn", started: "2010-04", startedType: "actual",
    sponsor: "Fred Hutchinson Cancer Center, with the National Cancer Institute",
    setting: "Stage IV melanoma: autologous CD8+ antigen-specific T cells modulated with interleukin-21 in the laboratory, with cyclophosphamide and aldesleukin",
    tldr: "A Seattle trial of melanoma-targeting T cells treated in the laboratory with the immune signal IL-21 before infusion. The registry lists it as terminated in 2011 and gives no reason.",
    summary: "The registry describes a phase I study of autologous interleukin-21-modulated CD8+ antigen-specific T cells, with cyclophosphamide and aldesleukin, in metastatic melanoma, started in April 2010, with an estimated enrolment of 12 (ClinicalTrials.gov NCT01106235). Its overall status is terminated, with primary completion in November 2011 and no reason for stopping recorded; Cassian Yee is listed as principal investigator (ClinicalTrials.gov NCT01106235). No results are posted.",
    result: "Terminated, with no reason given on the registry; no results posted.",
    cancers: ["melanoma"], drugs: ["cyclophosphamide", "aldesleukin"], institutions: ["fred-hutch", "nci"], terms: ["endogenous-t-cell-therapy"],
    links: [ct("NCT01106235")] }),
  trial({ id: "nct02210104", nct: "NCT02210104", name: "Autologous CD4+ NY-ESO-1-specific T cells with ipilimumab in NY-ESO-1-expressing tumours (MD Anderson phase 1, withdrawn)", phase: "1", status: "withdrawn", started: "2016-12", startedType: "actual", enrolled: 0,
    sponsor: "M.D. Anderson Cancer Center, with the National Institutes of Health and the National Cancer Institute",
    setting: "NY-ESO-1-expressing melanoma or sarcoma: cyclophosphamide, autologous CD4+ NY-ESO-1-specific T cells and ipilimumab",
    tldr: "A planned MD Anderson trial of helper T cells against the NY-ESO-1 protein, given with the immunotherapy drug ipilimumab, for melanoma and sarcoma. It was withdrawn before anyone joined.",
    summary: "The registry describes a phase I study of autologous CD4+ NY-ESO-1-specific T cells with anti-CTLA-4 (ipilimumab) and cyclophosphamide for patients with NY-ESO-1-expressing tumours, listing melanoma and sarcoma as conditions (ClinicalTrials.gov NCT02210104). It was withdrawn with an actual enrolment of 0; the reason given is \"Issues with tetramer staining\" (ClinicalTrials.gov NCT02210104). Cassian Yee is listed as principal investigator; the record names NIH grant R01CA104711 (ClinicalTrials.gov NCT02210104).",
    result: "Withdrawn before enrolment (0 participants); registry reason: \"Issues with tetramer staining\".",
    cancers: ["melanoma", "sarcoma"], targets: ["ctag1b"], drugs: ["ipilimumab", "cyclophosphamide"], institutions: ["md-anderson", "nci"], terms: ["endogenous-t-cell-therapy"],
    tags: ["failure"],
    links: [ct("NCT02210104")] }),
];
