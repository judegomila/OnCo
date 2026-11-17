import type { InstitutionInput, PaperInput, TrialInput } from "@/lib/schema";

const asOf = "2026-11-03";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });
type P = Omit<PaperInput, "kind" | "asOf">;
const p = (x: P): PaperInput => ({ kind: "paper", asOf, ...x });
type T = Omit<TrialInput, "kind" | "asOf">;
const t = (x: T): TrialInput => ({ kind: "trial", asOf, ...x });

/**
 * The Netherlands: the records the corpus was missing when /countries/nl/ was written. OnCo already held the Dutch
 * cancer centres, IKNL, KWF, HOVON, Hartwig and a long list of Dutch trials, but none of the three public bodies that
 * decide what a Dutch patient can actually be given: the Zorginstituut, which advises on the basic insurance package;
 * the CBG, the medicines regulator inside the European network; and Oncode, the national research institute. Nor did
 * it hold the DRUP trial, though an idea record already cited it, or the two papers behind the Dutch precision
 * oncology model.
 *
 * Institution facts are read from each body's own Dutch pages; coordinates are Nominatim lookups of the visiting
 * address on the body's contact page. The papers were resolved through Crossref and PubMed and read from their
 * abstracts; the trial from the ClinicalTrials.gov API. Registered in src/data/index.ts.
 */
export const netherlandsInstitutions: InstitutionInput[] = [
  i({ id: "zorginstituut-nederland", name: "Zorginstituut Nederland (National Health Care Institute)", aka: ["Zorginstituut", "ZIN", "Zorginstituut Nederland", "National Health Care Institute", "Dutch National Health Care Institute"], city: "Diemen", country: "NL", lat: 52.3297, lng: 4.9596, institutionType: "government", website: "https://www.zorginstituutnederland.nl",
    tldr: "The Dutch government body that advises the health minister on what the compulsory basic health insurance covers, including whether each expensive new cancer drug is worth its price.",
    summary: "Everyone who lives or works in the Netherlands must hold a health insurance policy, and every policy covers the same basic package (basispakket). The Zorginstituut describes its most important task as making sure that the basic package reimburses only treatments established to work and to suit what the patient needs; it advises the health minister, who takes the final decision on what the package contains. It judges care against four package criteria: necessity, effectiveness, cost-effectiveness and feasibility, with advice from two independent committees, the Scientific Advisory Board (WAR), which tests the evidence against the 'state of science and practice', and the Package Advisory Committee (ACP), which weighs the interests of the patients concerned against those of other patients and of all premium payers.\n\nIts 2024 framework for cost-effectiveness sets three reference values for the maximum extra cost per quality-adjusted life year, depending on how severe the disease is, measured by proportional shortfall: up to €20,000 for a burden of 0.10 to 0.40, up to €50,000 for 0.41 to 0.70, and up to €80,000 for 0.71 to 1.00. The framework calls the reference value a ceiling, not a target. New hospital medicines expected to cost €20 million or more a year across their indications, or €10 million a year for one indication at €50,000 or more per patient, can be held out of the package in the 'sluis' (lock) until the Zorginstituut has advised and the ministry has negotiated the price; the minister takes the final decision. In 2026 it advised that durvalumab for extensive small-cell lung cancer could be reimbursed only after a price cut of at least 60 per cent (it has been reimbursed since 29 August 2026, after the minister reached an agreement with the supplier), and that trastuzumab deruxtecan for HER2-mutant lung cancer needed a cut of at least 53 per cent.\n\nIt can also admit promising care conditionally while evidence is gathered: TIL therapy for melanoma was admitted that way from 2015 to 2022, judged effective and reimbursed from 15 January 2023, and dropped from the package on 15 January 2026 when no new hospital exemption was granted.",
    programs: ["Basic package advice (pakketadvies)", "Expensive medicines lock (sluis)", "Horizon scan of medicines", "Conditional admission (voorwaardelijke toelating)", "GIP medicines use database"],
    links: [
      { label: "Official website (Dutch)", url: "https://www.zorginstituutnederland.nl" },
      { label: "Compulsory deductible, with the Zorginstituut's description of its task (Dutch)", url: "https://www.zorginstituutnederland.nl/verzekerde-zorg/e/eigen-risico-zvw" },
      { label: "The lock for expensive medicines (Dutch)", url: "https://www.zorginstituutnederland.nl/wat-wij-doen/programmas-en-samenwerkingsverbanden/horizonscan-geneesmiddelen/sluis-voor-dure-geneesmiddelen" },
      { label: "Framework for cost-effectiveness, 26 November 2024 (Dutch, PDF)", url: "https://www.zorginstituutnederland.nl/site/binaries/site-content/collections/documents/2024/11/26/beoordelingskader-kosteneffectiviteit-van-zorg/Beoordelingskader+kosteneffectiviteit+van+zorg.pdf" },
      { label: "Medicines currently in the lock (Dutch)", url: "https://www.zorginstituutnederland.nl/wat-wij-doen/programmas-en-samenwerkingsverbanden/horizonscan-geneesmiddelen/sluis-voor-dure-geneesmiddelen/overzicht-geneesmiddelen-in-de-sluis" },
      { label: "Position on TIL therapy and its lapse in 2026 (Dutch)", url: "https://www.zorginstituutnederland.nl/documenten/2022/12/13/standpunt-tumorinfiltrerende-lymfocyten-til" },
    ],
    related: ["cbg-meb", "iknl", "ema"], drugs: ["tacquell"] }),

  i({ id: "cbg-meb", name: "Medicines Evaluation Board (CBG-MEB)", aka: ["College ter Beoordeling van Geneesmiddelen", "CBG", "MEB", "CBG-MEB", "Dutch Medicines Evaluation Board"], city: "Utrecht", country: "NL", lat: 52.0862, lng: 5.1002, institutionType: "government", website: "https://www.cbg-meb.nl",
    tldr: "The Dutch medicines regulator, which authorises medicines nationally and, inside the European network, is one of the agencies most often appointed to lead the scientific assessment of new medicines for the whole EU.",
    summary: "New cancer medicines are not licensed nationally in the Netherlands: the CBG's 2025 annual report notes that the EU's centralised procedure is compulsory for them, so the dossier goes to the European Medicines Agency, whose Committee for Medicinal Products for Human Use (CHMP) gives an opinion and the European Commission takes the binding decision. Each member state has one CHMP member and one alternate, and the Dutch members sit in the CBG's agency. For each medicine the CHMP appoints a rapporteur and a co-rapporteur from among the national agencies, who follow the product through its life.\n\nThe annual report gives the Netherlands 20 rapporteurships and 3 co-rapporteurships in 2025 (21 and 2 in 2021, 17 and 5 in 2022, 10 and 8 in 2023, 12 and 11 in 2024), and its 23 combined (co-)rapporteurships placed it third in the report's table of countries that year, behind Germany with 32 and Sweden with 24 and ahead of France with 21. It also took 15 pharmacovigilance rapporteurships at the PRAC. In the same year 104 new medicines were approved through the EMA. The CBG comments on academic oncology research proposals at the request of KWF. Once the Commission has authorised a cancer medicine, whether Dutch patients receive it through their insurance is a separate decision, on advice from the Zorginstituut.",
    programs: ["National marketing authorisation", "CHMP rapporteurships", "PRAC pharmacovigilance rapporteurships", "Scientific advice"],
    links: [
      { label: "Official website (Dutch)", url: "https://www.cbg-meb.nl" },
      { label: "Annual report 2025 (Dutch, PDF)", url: "https://www.cbg-meb.nl/site/binaries/site-content/collections/documents/2026/04/16/jaarverslag-2025-werken-aan-vertrouwen-in-medicijnen/260416-cbg-jaarverslag-2025.pdf" },
      { label: "Annual report 2025 (English, PDF)", url: "https://www.cbg-meb.nl/site/binaries/site-content/collections/documents/2026/04/16/jaarverslag-2025-werken-aan-vertrouwen-in-medicijnen/260416-meb-annual-report-2025.pdf" },
      { label: "Cooperation in Europe (Dutch)", url: "https://www.cbg-meb.nl/onderwerpen/over-ons-ons-werk/over-cbg-samenwerking-in-europa" },
    ],
    related: ["ema", "zorginstituut-nederland", "kwf"] }),

  i({ id: "oncode-institute", name: "Oncode Institute", aka: ["Oncode"], city: "Utrecht", country: "NL", lat: 52.0845, lng: 5.1041, institutionType: "research-institute", website: "https://www.oncodeinstitute.nl",
    tldr: "A Dutch 'institute without walls' that connects more than 750 cancer researchers across 13 partner institutes and works to move their discoveries towards patients.",
    summary: "Oncode's own history page says it was launched in early 2017 as a national collective effort, with KWF Dutch Cancer Society, the Ministries of Economic Affairs and Climate, Health, Welfare and Sport, and Education, Culture and Science, ZonMw and the Topsector Life Sciences & Health as founding partners, and was officially opened by Queen Máxima in Amsterdam on 5 February 2018; the same funders renewed their support in 2023. It describes itself as uniting more than 750 researchers across 13 partner institutes in the Netherlands. It calls itself an institute without walls: its research groups stay in their own universities and institutes. Its site lists a valorisation team, licensing opportunities, an Oncology Bridge Fund and an Alpe D'Huzes/KWF fund. Its office is on the Jaarbeursplein in Utrecht. Oncode appears as an affiliation of several authors of the Drug Rediscovery Protocol's 2019 report.",
    programs: ["Research groups and programmes at partner institutes", "Valorisation and licensing", "Oncology Bridge Fund", "Patient involvement programme"],
    links: [
      { label: "Official website", url: "https://www.oncodeinstitute.nl" },
      { label: "Our history", url: "https://www.oncodeinstitute.nl/about/our-history" },
      { label: "Our funders", url: "https://www.oncodeinstitute.nl/our-funders" },
    ],
    institutions: ["kwf"], related: ["nki", "umc-utrecht", "hartwig-medical-foundation"], keyPapers: ["paper-drup-van-der-velden-nature-2019"] }),
];

export const netherlandsTrials: TrialInput[] = [
  t({ id: "drup", name: "DRUP (Drug Rediscovery Protocol)", aka: ["Drug Rediscovery Protocol", "DRUP trial", "NCT02925234", "M15DRU"], nct: "NCT02925234", phase: "2", status: "recruiting", sponsor: "Netherlands Cancer Institute",
    setting: "Advanced solid tumours, multiple myeloma or B-cell non-Hodgkin lymphoma with no standard options left and a potentially actionable molecular variant; patients are matched to an approved targeted drug or immunotherapy used outside its licence",
    started: "2016-08", startedType: "actual", enrolled: 1550,
    tldr: "The Dutch national trial that gives patients whose tumour carries a targetable change an already-approved drug outside its licence, inside a trial, so that what happens is recorded and shared.",
    summary: "DRUP is a prospective, non-randomised, adaptive phase 2 trial run nationally on behalf of the Center for Personalized Cancer Treatment and led by the Netherlands Cancer Institute (registry acronym M15DRU). It started in August 2016 and the registry lists it as recruiting, with an estimated enrolment of 1,550 and primary completion estimated for September 2027. Patients with advanced cancer who have exhausted standard treatment and whose tumour test shows a potentially actionable variant are matched by a molecular tumour board to one of the commercially available targeted drugs or immunotherapies that collaborating companies contribute, and treated in cohorts defined by drug, tumour type and variant; a fresh biopsy is taken before treatment for next-generation sequencing. The registry lists Amgen, AstraZeneca, Bayer, Bristol-Myers Squibb, Novartis, Roche, Merck Sharp & Dohme, Boehringer Ingelheim, Ipsen, Eisai, Pfizer, Clovis, Eli Lilly, Janssen, GlaxoSmithKline, Incyte, the Dutch Cancer Society and Stelvio for Life as collaborators.\n\nThe first report, in Nature in 2019, found clinical benefit (response, or stable disease beyond 16 weeks) in 34 per cent of 215 treated patients and a 63 per cent benefit rate in a cohort with microsatellite-unstable tumours given nivolumab.",
    result: "First report (Nature 2019): clinical benefit in 34% of 215 treated patients; 63% in a cohort of microsatellite-unstable tumours given nivolumab.",
    links: [
      { label: "ClinicalTrials.gov NCT02925234", url: "https://clinicaltrials.gov/study/NCT02925234" },
      { label: "Nature 2019 first report", url: "https://doi.org/10.1038/s41586-019-1600-x" },
    ],
    institutions: ["nki", "oncode-institute", "hartwig-medical-foundation"], people: ["emile-voest"], keyPapers: ["paper-drup-van-der-velden-nature-2019"], related: ["idea-reg-generic-targeted-therapy-drup"] }),
];

export const netherlandsPapers: PaperInput[] = [
  p({ id: "paper-drup-van-der-velden-nature-2019", name: "The Drug Rediscovery Protocol: approved cancer drugs used outside their licence, inside a national trial",
    tldr: "The first report of the Dutch DRUP trial: a third of 215 patients with no standard options left benefited from an approved drug matched to their tumour's molecular profile and given outside its licence.",
    summary: "Large-scale genetic profiling of tumours finds actionable variants for which approved drugs exist, but when patients are treated with those drugs outside their label the successes and failures are not systematically collected or shared. The Drug Rediscovery Protocol is an adaptive precision-oncology trial that treats such patients, who must have exhausted or declined standard therapy, in cohorts defined by tumour type and molecular variant, to find signals of activity.\n\nThe abstract reports an overall clinical benefit rate, defined as complete or partial response or stable disease beyond 16 weeks, of 34 per cent in 215 treated patients, 136 of whom received targeted therapies and 79 immunotherapy. The median duration of clinical benefit was 9 months (95 per cent confidence interval 8 to 11), with 26 patients still benefiting at data cut-off. A cohort of patients with microsatellite-unstable tumours given nivolumab had a clinical benefit rate of 63 per cent, while patients with colorectal cancer with a relatively low mutational load gained only limited benefit from immunotherapy.",
    journal: "Nature", year: 2019, doi: "10.1038/s41586-019-1600-x", pmid: "31570881",
    authors: "van der Velden DL, Hoes LR, van der Wijngaart H, et al.", paperType: "translational", participants: 215,
    findings: ["Clinical benefit (complete or partial response, or stable disease beyond 16 weeks) in 34% of 215 treated patients.", "136 patients received targeted therapies and 79 immunotherapy.", "Median duration of clinical benefit 9 months (95% CI 8 to 11).", "Clinical benefit rate 63% in a cohort of microsatellite-unstable tumours treated with nivolumab."],
    whatItMeans: "It showed that a country can let patients use an approved drug off-label without each case vanishing into an anecdote: every treatment is a trial cohort, and a cohort that works can make the case for paying for that use.",
    caveats: ["Non-randomised cohorts with small numbers each; a benefit signal is not proof of benefit over other options.", "Stable disease beyond 16 weeks counts as benefit, which flatters slow-growing tumours.", "Drugs are contributed by companies, so the menu is limited to what they offer."],
    links: [{ label: "Nature 2019", url: "https://doi.org/10.1038/s41586-019-1600-x" }, { label: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/31570881/" }],
    trials: ["drup"], institutions: ["nki", "oncode-institute", "hartwig-medical-foundation"], people: ["emile-voest", "myriam-chalabi"], related: ["paper-priestley-hartwig-metastatic-wgs-nature-2019"] }),

  p({ id: "paper-priestley-hartwig-metastatic-wgs-nature-2019", name: "Whole-genome sequencing of 2,520 metastatic tumours from the Dutch Hartwig cohort",
    tldr: "The Hartwig Medical Foundation's whole-genome analysis of metastatic cancers from Dutch patients found a variant that could steer treatment towards an approved or trial drug in 62 per cent of them.",
    summary: "The abstract describes what it calls the largest pan-cancer study of metastatic solid tumour genomes to that date: whole-genome sequencing of 2,520 pairs of tumour and normal tissue, at median depths of 106 and 38 times, surveying more than 70 million somatic variants. The mutations of metastatic lesions varied widely and largely reflected the primary tumour types, with whole-genome duplication in 56 per cent. Individual lesions were relatively homogeneous: 96 per cent of driver mutations were clonal and up to 80 per cent of tumour-suppressor genes were inactivated on both alleles. For 62 per cent of patients the authors identified variants that could be used to direct them towards therapies that were approved or in clinical trials.",
    journal: "Nature", year: 2019, doi: "10.1038/s41586-019-1689-y", pmid: "31645765",
    authors: "Priestley P, Baber J, Lolkema MP, et al.", paperType: "translational", participants: 2520,
    findings: ["Whole-genome sequencing of 2,520 metastatic tumour and normal pairs, at median depths of 106x and 38x.", "Whole-genome duplication in 56% of metastatic tumours.", "96% of driver mutations were clonal.", "62% of patients had a variant that could direct them to an approved or trial therapy."],
    whatItMeans: "This is the cohort behind the Hartwig Medical Database, which the foundation describes as the largest of its kind, offered free of charge to researchers. It showed whole-genome sequencing of metastases done at national scale, and found a variant that could point to a treatment in most of the patients sequenced.",
    caveats: ["Actionable is not the same as benefited: the paper counts variants that could direct treatment, not outcomes after treatment.", "Patients were those referred into Dutch trial and sequencing programmes, not a population sample."],
    links: [{ label: "Nature 2019", url: "https://doi.org/10.1038/s41586-019-1689-y" }, { label: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/31645765/" }, { label: "Hartwig Medical Database", url: "https://www.hartwigmedicalfoundation.nl/en/data/database/" }],
    institutions: ["hartwig-medical-foundation"], technologies: ["wes-wgs"], related: ["drup"] }),
];
