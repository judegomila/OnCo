import type { CountryDive } from "@/data/country-dive";

/**
 * Brazil deep dive: the hand-written cards and tables for /countries/br/. Written on 3 November 2026 from Brazilian
 * primary sources read in Portuguese: INCA's Estimativa 2026 (triênio 2026 a 2028) and its statistics pages, the
 * Chamber of Deputies' consolidated text of Law 12.732/2012, the Senate's open-data record of Laws 14.758/2023 and
 * 14.454/2022, CONITEC's and ANS's own pages, ANVISA's service page, RDC 205/2017 and its 2026 news, the Ministry of
 * Health's announcements as republished by INCA, and the Hemocentro de Ribeirão Preto's pages on its CAR-T programme.
 *
 * Counting conventions worth holding in mind:
 *  - incidence  INCA's Estimativa is a projection, not a count: new cases expected in each year of 2026 to 2028,
 *               modelled from the population-based registries (RCBP) and the mortality system (SIM). INCA says its
 *               editions must not be compared with each other as a time series.
 *  - deaths     per-site deaths in 2023 are quoted inside the Estimativa from INCA's mortality atlas; the latest
 *               national all-cancer total on INCA's statistics page is for 2021.
 *  - survival   Brazil publishes no national survival series; see the gaps.
 * The Planalto legislation site and INCA's document repository (ninho.inca.gov.br) refused automated requests, so the
 * laws were read from the Chamber of Deputies' and Senate's copies and the Estimativa from INCA's web edition.
 */
const INCA_EST = { label: "INCA, Estimativa 2026: Síntese de resultados e comentários (triênio 2026 a 2028)", url: "https://www.gov.br/inca/pt-br/assuntos/cancer/numeros/estimativa/sintese-de-resultados-e-comentarios" };
const INCA_EST_HOME = { label: "INCA, Estimativa 2026: Incidência de Câncer no Brasil (web edition)", url: "https://www.gov.br/inca/pt-br/assuntos/cancer/numeros/estimativa" };
const INCA_METHOD = { label: "INCA, Estimativa 2026: Metodologia", url: "https://www.gov.br/inca/pt-br/assuntos/cancer/numeros/estimativa/metodologia" };
const INCA_781 = { label: "INCA: INCA estimates 781,000 new cancer cases a year in Brazil between 2026 and 2028 (4 February 2026)", url: "https://www.gov.br/inca/pt-br/assuntos/noticias/2026/inca-estima-781-mil-novos-casos-de-cancer-por-ano-no-brasil-entre-2026-e-2028" };
const INCA_STATS = { label: "INCA: Estatísticas de câncer (incidence by site and sex; deaths by site and sex, 2021)", url: "https://www.gov.br/inca/pt-br/assuntos/cancer/numeros/estatisticas-de-cancer" };
const LEI_12732 = { label: "Law 12.732 of 22 November 2012, consolidated text (Chamber of Deputies)", url: "https://www2.camara.leg.br/legin/fed/lei/2012/lei-12732-22-novembro-2012-774660-normaatualizada-pl.html" };
const LEI_14758 = { label: "Law 14.758 of 19 December 2023, National Cancer Prevention and Control Policy (Senate open data)", url: "https://legis.senado.leg.br/dadosabertos/legislacao/37953903" };
const LEI_14454 = { label: "Law 14.454 of 21 September 2022, cover beyond the ANS list (Senate open data)", url: "https://legis.senado.leg.br/dadosabertos/legislacao/36359942" };
const CF_196 = { label: "Federal Constitution of 1988, Article 196 (Chamber of Deputies)", url: "https://www2.camara.leg.br/legin/fed/consti/1988/constituicao-1988-5-outubro-1988-322142-publicacaooriginal-1-pl.html" };
const CONITEC_ABOUT = { label: "CONITEC: Conheça a Conitec", url: "https://www.gov.br/conitec/pt-br/assuntos/a-comissao/conheca-a-conitec" };
const CONITEC_JUD = { label: "CONITEC: Judicialização", url: "https://www.gov.br/conitec/pt-br/judicializacao" };
const ANS_ROL = { label: "ANS: how the Rol de Procedimentos is updated", url: "https://www.gov.br/ans/pt-br/acesso-a-informacao/participacao-da-sociedade/atualizacao-do-rol-de-procedimentos/como-e-atualizado-o-rol-de-procedimentos" };
const ANS_ROL_HOME = { label: "ANS: Rol de Procedimentos e Eventos em Saúde", url: "https://www.gov.br/ans/pt-br/acesso-a-informacao/participacao-da-sociedade/atualizacao-do-rol-de-procedimentos" };
const ANS_DADOS = { label: "ANS: Dados gerais do setor", url: "https://www.gov.br/ans/pt-br/acesso-a-informacao/perfil-do-setor/dados-gerais" };
const AF_ONCO = { label: "INCA: SUS offers 23 new medicines for cancer treatment (21 May 2026)", url: "https://www.gov.br/inca/pt-br/assuntos/noticias/2026/sus-oferece-23-novos-medicamentos-para-o-tratamento-do-cancer" };
const ANVISA_REG = { label: "gov.br service page: Solicitar registro de medicamentos (ANVISA deadlines)", url: "https://www.gov.br/pt-br/servicos/solicitar-registro-de-medicamentos" };
const RDC_205 = { label: "ANVISA, RDC 205 of 28 December 2017, special procedure for rare-disease medicines (Ministry of Health legislation library)", url: "https://bvsms.saude.gov.br/bvs/saudelegis/anvisa/2017/rdc0205_28_12_2017.pdf" };
const ANVISA_IN289 = { label: "ANVISA: IN 289/2024 and guidance on regulatory reliance (English)", url: "https://www.gov.br/anvisa/pt-br/english/updates/anvisa-published-normative-instruction-in-289-2024-and-guidelines-on-regulatory-reliance" };
const ANVISA_BIO = { label: "ANVISA: optimised assessment of biological products begins (2 March 2026)", url: "https://www.gov.br/anvisa/pt-br/assuntos/noticias-anvisa/2026/anvisa-inicia-avaliacao-otimizada-de-produtos-biologicos" };
const ANVISA_PLAN = { label: "ANVISA: action plan to cut medicine registration queues (15 April 2026)", url: "https://www.gov.br/anvisa/pt-br/assuntos/noticias-anvisa/2026/anvisa-apresenta-plano-de-acao-para-reducao-de-filas-de-medicamentos" };
const ORBIS = { label: "FDA Oncology Center of Excellence: Project Orbis partners", url: "https://www.fda.gov/about-fda/oncology-center-excellence/project-orbis" };
const MAMMO = { label: "INCA: early detection of breast cancer (updated 30 September 2025)", url: "https://www.gov.br/inca/pt-br/assuntos/gestor-e-profissional-de-saude/controle-do-cancer-de-mama/acoes/deteccao-precoce" };
const HPV = { label: "INCA: early detection of cervical cancer, DNA-HPV testing (updated 30 September 2025)", url: "https://www.gov.br/inca/pt-br/assuntos/gestor-e-profissional-de-saude/controle-do-cancer-do-colo-do-utero/acoes/deteccao-precoce" };
const FIT = { label: "INCA: SUS adopts a new test to detect bowel cancer before symptoms (21 May 2026)", url: "https://www.gov.br/inca/pt-br/assuntos/noticias/2026/sus-adota-novo-exame-para-detectar-cancer-de-intestino-antes-dos-sintomas" };
const UNACON = { label: "INCA: cervical cancer treatment, UNACON and CACON habilitation under Portaria SAES/MS 1399/2019", url: "https://www.gov.br/inca/pt-br/assuntos/gestor-e-profissional-de-saude/controle-do-cancer-do-colo-do-utero/acoes/tratamento" };
const HDA = { label: "Hospital de Amor: Quem somos", url: "https://hospitaldeamor.com.br/quem-somos/" };
const HDA_HIST = { label: "Hospital de Amor: Nossa história", url: "https://hospitaldeamor.com.br/conheca-mais-sobre-nossa-historia/" };
const HEMO_NUTERA = { label: "Hemocentro de Ribeirão Preto: Nutera RP", url: "https://www.hemocentro.fmrp.usp.br/nutera-rp-terapia-avancada-no-combate-ao-cancer/" };
const HEMO_NET = { label: "Hemocentro de Ribeirão Preto: national CAR-T, preparing the health network (23 October 2026)", url: "https://www.hemocentro.fmrp.usp.br/car-t-nacional-preparar-a-rede-de-saude-e-essencial-para-ampliar-o-acesso-a-terapia/" };
const CARTHEDRALL = { label: "ClinicalTrials.gov: CARTHEDRALL (NCT06101381)", url: "https://clinicaltrials.gov/study/NCT06101381" };
const AMAZONA_TIME = { label: "Maschmann et al., time from diagnosis to treatment in AMAZONA III (Breast Cancer Res Treat 2023)", url: "https://doi.org/10.1007/s10549-022-06809-8" };
const AMAZONA = { label: "Rosa et al., AMAZONA III (Breast Cancer Res Treat 2020)", url: "https://doi.org/10.1007/s10549-020-05831-y" };
const CONSORTIUM = { label: "INCA: INCA joins a national cancer research consortium of 11 institutions (1 June 2026)", url: "https://www.gov.br/inca/pt-br/assuntos/noticias/2026/inca-integra-consorcio-nacional-de-pesquisa-em-cancer-com-11-instituicoes" };
const ATPBR = { label: "INCA: INCA leads project that drives precision oncology in Brazil (13 March 2026)", url: "https://www.gov.br/inca/pt-br/assuntos/noticias/2026/inca-lidera-projeto-que-impulsiona-oncologia-de-precisao-no-brasil" };
const LEI_14454_TERM = { label: "Schulze, on the 'internationally renowned' assessment body in Law 14.454 (Empório do Direito, 2023), quoting the text", url: "https://emporiododireito.com.br/leitura/avaliacao-de-tecnologia-em-saude-e-orgao-de-renome-internacional" };
const FAPESP_CART = { label: "Agência FAPESP: CAR-T cell therapies advance in São Paulo state, the Nutera centre formed by FMRP-USP and Instituto Butantan groups (20 June 2022)", url: "https://agencia.fapesp.br/tratamentos-contra-o-cancer-que-modificam-geneticamente-celulas-de-defesa-avancam-no-estado-de-sao-paulo/38914" };
const LACOG_CT = { label: "ClinicalTrials.gov: studies led by the Latin American Cooperative Oncology Group", url: "https://clinicaltrials.gov/search?lead=%22Latin%20American%20Cooperative%20Oncology%20Group%22" };

export const BR_DIVE: CountryDive = {
  iso2: "BR",
  iso3: "BRA",
  name: "Brazil",
  flag: "🇧🇷",
  asOf: "2026-11-03",
  title: "Cancer in Brazil",
  description:
    "Cancer in Brazil from Brazilian sources: INCA's 2026 to 2028 estimate of about 781,000 new cases a year, the free public health system and the private plans a quarter of the population holds, the laws that set 30 days to a diagnosis and 60 days to a first treatment, CONITEC's deadlines and the courts, ANVISA's timelines and backlog, screening, and a national CAR-T made in a public university.",
  lede:
    "Brazil writes cancer care into law: health is a constitutional right, the public system must start a first cancer treatment within 60 days of the pathology report, and a national cancer policy has existed by statute since 2023. Most Brazilians rely on that free public system; about one in four also holds a private health plan.",
  globocanNote:
    "Brazil's own figures come from INCA's Estimativa, which projects new cases for each year of 2026 to 2028 from the population-based registries and the mortality system, and which INCA says should not be compared edition with edition. GLOBOCAN 2024 is IARC's separate model for 2024 and runs higher than INCA for several sites: 90,307 breast cancers against INCA's 78,610 a year, and 43,788 lung cancers against 35,380. For deaths, GLOBOCAN's 36,933 lung cancer deaths compare with 31,237 registered in Brazil's mortality system in 2023. Both correct for under-registration and ill-defined causes of death in different ways, so use either set consistently rather than mixing them. GLOBOCAN's all-cancers line above (C00-97, 640,575 new cases in 2024) includes non-melanoma skin cancer, of which it counts 49,282, leaving 591,293 without it; INCA's 781,000 includes 263,280 such cancers and its 518,000 leaves them out. Because the two models differ most for this one cancer, compare totals without it.",
  sections: [
    {
      id: "profile",
      nav: "Profile",
      title: "What cancer looks like in Brazil",
      aside: INCA_EST_HOME,
      cards: [
        {
          id: "how-counted",
          title: "How Brazil counts cancer: a national estimate every three years, built from regional registries",
          plain:
            "Brazil does not have a single national register that counts every cancer. The national cancer institute, INCA, publishes an estimate every three years of how many new cancers to expect, built from the regional registries and from death certificates. The current edition covers 2026 to 2028 and expects about 781,000 new cancers a year, or about 518,000 if the common skin cancers are left out.",
          detail:
            "INCA's first Estimativa appeared in 1995, and it describes its current method as analogous to the one IARC uses for GLOBOCAN; the main inputs are the population-based cancer registries (Registros de Câncer de Base Populacional, RCBP) and the national mortality information system (SIM). Where a state or capital has consolidated registry data, short-term prediction models are fitted; elsewhere INCA applies the registry's incidence-to-mortality ratio, or the median ratio of its region, to modelled 2026 mortality. The 2026 to 2028 edition, launched on World Cancer Day, 4 February 2026, applies corrections for under-registration of both deaths and cases, and INCA states that its editions should not be compared directly as a time series, because better data and revised methods move the numbers. Non-melanoma skin cancer is estimated at 263,280 new cases a year (136,180 in men, 127,100 in women) and is presented separately because of its high incidence and low lethality.",
          links: [INCA_781, INCA_METHOD, INCA_EST],
        },
        {
          id: "mix",
          title: "Breast and prostate lead, with cervical, stomach and oral cancers more common than in richer countries",
          plain:
            "Leaving out skin cancer, breast cancer is the commonest cancer in Brazil, with about 78,600 new cases a year, and prostate cancer the commonest in men, with about 77,900. Bowel cancer comes next, then lung and stomach. Among women, cervical cancer is the third commonest, with about 19,300 cases a year, even though screening and vaccination can prevent most of it.",
          detail:
            "INCA's Estimativa 2026 gives, for each year of 2026 to 2028: breast 78,610 (71.57 per 100,000 women); prostate 77,920 (74.62 per 100,000 men); colon and rectum 53,810 (26,270 in men, 27,540 in women); trachea, bronchus and lung 35,380 (18,730 and 16,650); stomach 22,530 (13,830 and 8,700); cervix 19,310 (17.59 per 100,000 women); oral cavity 17,190 (12,260 and 4,930); thyroid 16,450 (3,140 and 13,310). INCA's news release lists the five commonest in men as prostate, colorectum, lung, stomach and oral cavity, and in women as breast, colorectum, cervix, lung and thyroid. The country is uneven: estimated breast cancer risk is 88.29 per 100,000 women in the Southeast and 31.28 in the North, and prostate 94.90 per 100,000 men in the Southeast against 29.94 in the North. INCA also expects 7,560 cancers a year in children and adolescents.",
          links: [INCA_EST, INCA_781],
        },
        {
          id: "deaths",
          title: "Lung cancer causes the most cancer deaths, then bowel and breast",
          plain:
            "Lung cancer is the cancer that causes the most deaths in Brazil, more than 31,000 in 2023, followed by bowel cancer and breast cancer. Pancreatic and liver cancer cause many deaths relative to how often they occur. The latest all-cancer total on INCA's statistics page is for 2021, when about 232,000 Brazilians died of cancer.",
          detail:
            "Deaths in 2023 from the mortality system, as quoted in the Estimativa: trachea, bronchus and lung 31,237 (16,758 men, 14,479 women); colon and rectum 23,953; female breast 20,165 (18.59 per 100,000 women); prostate 17,258 (16.71 per 100,000 men); stomach 14,823; pancreas 13,507 against 13,240 expected new cases a year; liver 11,199 against 12,350; central nervous system 10,206; oesophagus 8,488; leukaemia 7,435; cervix 7,209; oral cavity, salivary glands and oropharynx 7,172. INCA's statistics page gives 120,784 cancer deaths in men and 110,910 in women in 2021, 231,694 in all, with prostate the leading cause in men (16,300) and breast in women (18,139). Brazil publishes no national survival series; OnCo names that gap below rather than borrowing a figure.",
          links: [INCA_EST, INCA_STATS],
        },
      ],
      tables: [
        {
          id: "inca-2026",
          title: "INCA Estimativa 2026: expected new cancers a year in Brazil, 2026 to 2028, and deaths in 2023",
          caption: "Estimated new cases for each year of the 2026 to 2028 triennium, by sex where INCA gives it; deaths registered in 2023. Counts, not rates.",
          columns: [
            { key: "site", label: "Site" },
            { key: "cases", label: "New cases a year", numeric: true },
            { key: "men", label: "Men", numeric: true },
            { key: "women", label: "Women", numeric: true },
            { key: "deaths", label: "Deaths, 2023", numeric: true },
          ],
          rows: [
            { site: "All cancers except non-melanoma skin (rounded)", cases: 518000, men: null, women: null, deaths: null },
            { site: "Non-melanoma skin", cases: 263280, men: 136180, women: 127100, deaths: 3541 },
            { site: "Breast (female)", cases: 78610, men: null, women: 78610, deaths: 20165 },
            { site: "Prostate", cases: 77920, men: 77920, women: null, deaths: 17258 },
            { site: "Colon and rectum", cases: 53810, men: 26270, women: 27540, deaths: 23953 },
            { site: "Trachea, bronchus and lung", cases: 35380, men: 18730, women: 16650, deaths: 31237 },
            { site: "Stomach", cases: 22530, men: 13830, women: 8700, deaths: 14823 },
            { site: "Cervix", cases: 19310, men: null, women: 19310, deaths: 7209 },
            { site: "Oral cavity (C00 to C10)", cases: 17190, men: 12260, women: 4930, deaths: 7172 },
            { site: "Thyroid", cases: 16450, men: 3140, women: 13310, deaths: 988 },
            { site: "Pancreas", cases: 13240, men: 6330, women: 6910, deaths: 13507 },
            { site: "Bladder", cases: 13110, men: 9040, women: 4070, deaths: 5252 },
            { site: "Non-Hodgkin lymphoma", cases: 12560, men: 6580, women: 5980, deaths: 4860 },
            { site: "Liver", cases: 12350, men: 7340, women: 5010, deaths: 11199 },
            { site: "Leukaemia", cases: 12220, men: 6540, women: 5680, deaths: 7435 },
            { site: "Central nervous system", cases: 12060, men: 6500, women: 5560, deaths: 10206 },
            { site: "Oesophagus", cases: 11390, men: 8750, women: 2640, deaths: 8488 },
            { site: "Melanoma of the skin", cases: 9360, men: 4930, women: 4430, deaths: 2047 },
          ],
          note: "The all-cancer figure is INCA's rounded total from its 4 February 2026 release (781,000 including non-melanoma skin cancer). Deaths are from the mortality system as quoted in the Estimativa; the oral cavity deaths cover C00 to C10 (oral cavity, salivary glands and oropharynx). Smaller sites in the Estimativa are not shown here.",
          sources: [INCA_EST, INCA_781],
        },
      ],
    },
    {
      id: "paying",
      nav: "Who pays",
      title: "Who pays: a free public system, and private plans for a quarter of the country",
      aside: ANS_DADOS,
      cards: [
        {
          id: "sus",
          title: "The public system is free at the point of use, and the law promises every cancer treatment needed",
          plain:
            "Brazil's constitution makes health a right of everyone and a duty of the state, and the public Unified Health System (SUS) charges nothing at the point of care. A 2012 law adds that a person with cancer receives every treatment needed free in the SUS. In practice what the SUS offers is limited by which treatments it has approved, which hospitals are accredited for cancer and how long the queues are.",
          detail:
            "Article 196 of the 1988 Federal Constitution reads that health is a right of all and a duty of the state, guaranteed through universal and equal access. Law 12.732 of 22 November 2012, Article 1, states that a patient with a malignant neoplasm will receive, free of charge in the SUS, all necessary treatments, and that the standard cancer therapies must be revised and republished as science and new proven treatments require; Article 2, paragraph 2, gives people in pain from cancer privileged free access to opioid analgesics. Cancer care in the SUS is delivered in hospitals accredited as UNACON or CACON (high-complexity oncology units and centres) under Portaria SAES/MS 1399 of 17 December 2019, and state and municipal health departments decide where each patient is referred. Law 14.758 of 19 December 2023 created the National Cancer Prevention and Control Policy and a national programme of patient navigation for people diagnosed with cancer; it was amended by Law 15.385 of 10 April 2026.",
          links: [CF_196, LEI_12732, LEI_14758, UNACON],
        },
        {
          id: "plans",
          title: "Private health plans: about 53 million people, and a list of what they must cover",
          plain:
            "About one Brazilian in four, mostly through an employer, has a private health plan regulated by the agency ANS. Plans must cover the tests and treatments on ANS's official list, and oral cancer medicines are covered, which is not true of oral medicines in general. Since 2022 a plan can also be required to pay for a treatment that is not on the list, under conditions set by law.",
          detail:
            "ANS counts 53,108,097 people in medical plans in September 2026, 38,988,679 of them in employer group plans, and puts coverage at 24.9 per cent of the population, up from 22.5 per cent in December 2016. The Rol de Procedimentos e Eventos em Saúde, set by Normative Resolution 465 of 2021, is updated continuously: proposals are assessed on evidence, comparative economic evaluation and budget impact, discussed by the Cosaúde committee and put to public consultation before ANS's board decides. Technologies the SUS incorporates on CONITEC's recommendation enter the list within 60 days. ANS's page notes that the Health Plans Law excludes oral medicines unless they are for cancer. Law 14.454 of 21 September 2022 amended the Health Plans Law to set criteria for cover beyond the list; one is a recommendation by CONITEC or by at least one internationally renowned health technology assessment body, a term the law does not define.",
          links: [ANS_DADOS, ANS_ROL, ANS_ROL_HOME, LEI_14454, LEI_14454_TERM],
        },
        {
          id: "medicines-reach",
          title: "Approved is not the same as available: 23 cancer medicines funded for SUS patients in 2026",
          plain:
            "A medicine can be approved for the SUS and still not reach patients for years, because someone has to fund and buy it. In May 2026 the Ministry of Health added 23 high-cost cancer medicines to the SUS funding table, some of which had been approved up to 12 years earlier. Patients in the private system and in the public one can therefore meet very different treatment options for the same cancer.",
          detail:
            "The Ministry's announcement, republished by INCA on 21 May 2026, describes an investment of R$2.2 billion in a new SUS funding table covering 23 high-cost oncology medicines for 25 types of cancer, including breast, lung, leukaemia, ovary and stomach, a 35 per cent increase in the medicines offered, which the Ministry says benefits 112,000 patients. Ten are bought centrally by the Ministry and distributed to the states; the rest are bought by the accredited cancer centres and reimbursed through the outpatient procedure authorisation (APAC) with a national price agreement. The same package funded robotic cancer surgery in the public network for the first time and widened access to breast reconstruction. The measures sit under the Pharmaceutical Assistance in Oncology component (AF-Onco). The AMAZONA III cohort showed the consequences of a two-track system for one cancer: women with breast cancer treated in the public system were diagnosed at stage III more than twice as often as privately insured women (33.5 against 14.7 per cent).",
          links: [AF_ONCO, AMAZONA],
        },
        {
          id: "travel",
          title: "Radiotherapy far from home: transport and daily allowances in law since 2025",
          plain:
            "Radiotherapy machines are not evenly spread across Brazil, and many patients travel to another municipality or state for treatment. A 2025 law guarantees suitable transport and a daily allowance for lodging and food for SUS patients having radiotherapy outside their home area, within the available budget.",
          detail:
            "Article 2-A of Law 12.732, added by Provisional Measure 1.301 of 30 May 2025 and converted into Law 15.233 of 7 October 2025, creates within the Agora Tem Especialistas programme a set of actions to widen access to radiotherapy: shorten waiting times, integrate the Ministry's information systems, and prioritise cancer patients through monitoring panels that join up demand and supply across public and private services. Every establishment with radiotherapy equipment must report supply and demand periodically, and one that fails to report loses access to the Pronon programme, the SUS Radiotherapy Expansion Plan and federal financing until it does. Patients having radiotherapy in a different federative entity (municipality, state or Federal District) from the one where they live are guaranteed transport and daily allowances for the whole treatment, subject to specific budget availability.",
          links: [LEI_12732],
        },
      ],
      tables: [
        {
          id: "ans-beneficiaries",
          title: "People with a private medical plan in Brazil, 2016 to 2026",
          caption: "Beneficiaries of private medical plans (with or without dental cover), December of each year and June 2026.",
          columns: [
            { key: "date", label: "Date" },
            { key: "people", label: "People in medical plans", numeric: true },
          ],
          rows: [
            { date: "December 2016", people: 47685266 },
            { date: "December 2019", people: 47077981 },
            { date: "December 2022", people: 50522936 },
            { date: "December 2024", people: 51948315 },
            { date: "December 2025", people: 52855626 },
            { date: "June 2026", people: 53055406 },
          ],
          note: "ANS gives coverage of 22.5 per cent of the population in December 2016 and 24.9 per cent in August 2026. A plan holder can still use the SUS, so these people are not outside the public system.",
          sources: [ANS_DADOS],
        },
      ],
    },
    {
      id: "assessment",
      nav: "CONITEC",
      title: "How the public system decides what to pay for: CONITEC, and the courts",
      aside: CONITEC_ABOUT,
      cards: [
        {
          id: "conitec",
          title: "CONITEC has 180 days, extendable by 90, to recommend a technology for the SUS",
          plain:
            "A new cancer medicine reaches the SUS only after CONITEC, a Ministry of Health commission, recommends it and the Ministry decides. Anyone, including a patient, can ask for an assessment. The law gives CONITEC 180 days to decide, with 90 more if needed, and the medicine must already be registered with the regulator and have a regulated price.",
          detail:
            "CONITEC's page sets out the legal framework: a decision deadline of 180 days, extendable by 90; an analysis based on scientific evidence of efficacy, accuracy, effectiveness and safety and on a comparative economic evaluation of benefits and costs against technologies already available; and prior registration with ANVISA. Its judicial guidance adds the conditions of Decree 7.646/2011: a proponent, ANVISA registration, price regulation by the medicines market chamber CMED, and evidence that the technology is at least as effective and safe as those already in the SUS for the indication. The commission works in three committees (medicines; products and procedures; clinical protocols), each with 17 voting institutions; the National Council of Justice, the National Council of the Public Prosecutor's Office and the public defenders' council take part without a vote. Public consultations carry a plain-language report for society, and patients can testify about the condition and the technology. In May 2026, for example, CONITEC consulted on pembrolizumab before and after surgery for high-risk early triple-negative breast cancer.",
          links: [CONITEC_ABOUT, CONITEC_JUD, { label: "INCA: CONITEC consults on pembrolizumab for breast cancer (22 May 2026)", url: "https://www.gov.br/inca/pt-br/assuntos/noticias/2026/conitec-recebe-contribuicoes-sobre-incorporacao-do-pembrolizumabe-para-cacer-de-mama" }],
        },
        {
          id: "courts",
          title: "Going to court for a medicine: the Supreme Court's six conditions",
          plain:
            "Many Brazilians ask a judge to order the state to supply a cancer medicine the SUS does not provide. The Supreme Federal Court has set conditions for when a judge may do so, and CONITEC publishes them for courts. In short, the person must show the medicine was refused, that there is no substitute in the SUS, that it is proven safe and effective and essential, and that they cannot afford it.",
          detail:
            "CONITEC's judicialisation page lists the Supreme Federal Court's conditions for a court order to supply a medicine outside the SUS lists: (1) the medicine was refused by the responsible public body; (2) CONITEC's decision not to include it was unlawful, no request for inclusion was made, or the analysis was excessively delayed; (3) no other medicine on the SUS lists can replace it; (4) there is scientific evidence it is effective and safe; (5) it is indispensable to treat the disease; (6) the person cannot afford it. The page exists to give judges and prosecutors the status of any technology under assessment. OnCo could not source a current national count of cancer-medicine lawsuits from an official page.",
          links: [CONITEC_JUD],
        },
        {
          id: "plans-follow",
          title: "Private plans follow within 60 days, and can be made to go further",
          plain:
            "When the SUS incorporates a technology on CONITEC's advice, private plans must add it to their mandatory list within 60 days. Plans can also be asked to pay for treatments not on the list, under the 2022 law.",
          detail:
            "ANS's rite for SUS-incorporated technologies checks only whether the technology is already listed and whether it conflicts with the Health Plans Law, such as the exclusion of non-cancer oral medicines, before adding it within 60 days of the incorporation order. Its own updates through FormRol follow the full evidence, economic evaluation and budget-impact path with public consultation. Law 14.454/2022 sets criteria for cover beyond the list, including a recommendation by CONITEC or an internationally renowned assessment body. OnCo did not verify from an official source how the courts have since read that law, and names it as a gap.",
          links: [ANS_ROL, LEI_14454],
        },
      ],
    },
    {
      id: "regulator",
      nav: "ANVISA",
      title: "The regulator: ANVISA's deadlines, special routes and backlog",
      aside: ANVISA_REG,
      cards: [
        {
          id: "deadlines",
          title: "A legal clock of 120 days for priority medicines and 365 for the rest",
          plain:
            "ANVISA must decide on a priority medicine within 120 days and on an ordinary one within 365 days, and can extend either once by a third. Whether it meets those deadlines is a separate question: in 2026 ANVISA called its backlog of registration requests one of its main challenges.",
          detail:
            "The federal services page for medicine registration gives the deadlines: priority category 120 days counted from the date of prioritisation; ordinary category 365 days from the filing of the registration request; in both, a single extension of up to one third, by reasoned decision. A registration is normally valid for ten years; one granted under a commitment agreement is valid for three years at first, then five. ANVISA is a partner in the FDA's Project Orbis for concurrent review of cancer medicines alongside the regulators of Australia, Canada, Israel, Japan, Singapore, Switzerland and the United Kingdom. ANVISA does not publish an average time to approval for new cancer medicines on the pages OnCo could read; that is named as a gap.",
          links: [ANVISA_REG, ORBIS],
        },
        {
          id: "rare",
          title: "Rare diseases: a 60-day review after a mandatory pre-submission meeting",
          plain:
            "For medicines for rare diseases, ANVISA has a special route with a meeting before the application and a 60-day first review. A rare disease here means one affecting up to 65 people in every 100,000, which includes many rare cancers.",
          detail:
            "RDC 205 of 28 December 2017 defines a rare disease as one affecting up to 65 people per 100,000 and sets the steps for registering a new rare-disease medicine: a pre-submission meeting held within 60 days of the company's request; submission within 30 days of that meeting under a specific subject code; ANVISA's assessment within 60 days of submission, ending in a request for information or a conclusive opinion; the company's reply within 30 days; and ANVISA's assessment of the reply within 45 days. Without the pre-submission meeting the application cannot use this route. The same resolution sets 120 days for good manufacturing practice certification. These are the timelines as published in 2017; OnCo did not check later amendments.",
          links: [RDC_205],
        },
        {
          id: "reliance",
          title: "Reliance on other regulators, and a 2026 drive to clear the queue",
          plain:
            "To work faster, ANVISA can use assessments already made by trusted foreign regulators instead of repeating them. It made this permanent in 2024 and in 2026 began applying it to clear a backlog of biological medicines waiting for review.",
          detail:
            "Normative Instruction 289/2024 lets ANVISA take into account the evaluation of an equivalent foreign regulatory authority (AREE) when assessing registration or post-approval changes for medicines, biological products and vaccines; ANVISA published an English version and question-and-answer guidance on regulatory reliance. RDC 997/2025, in force from 10 November 2025, set exceptional and temporary procedures to reduce the medicines backlog. From 24 February 2026 a dedicated team in ANVISA's biologics directorate began optimised assessment: of the first 13 registration requests taken from the ordinary queue, nine were accepted for the optimised route and the rest had incomplete documents. On 15 April 2026 ANVISA's board heard an action plan combining optimised analysis, reliance, risk-based prioritisation and better data management, and called the backlog one of the agency's main institutional challenges of 2026.",
          links: [ANVISA_IN289, ANVISA_BIO, ANVISA_PLAN],
        },
      ],
    },
    {
      id: "doing",
      nav: "What Brazil does",
      title: "What Brazil does that others do not",
      cards: [
        {
          id: "sixty-days",
          title: "A legal right to start treatment within 60 days, and to a diagnosis within 30",
          plain:
            "Few countries put a cancer waiting time into national law. Brazil does: a person with cancer has the right to start a first treatment in the SUS within 60 days of the pathology report, or sooner if their case needs it, and since 2020 the tests to confirm a suspected cancer must be done within 30 days. A patient whose wait is longer can cite the law.",
          detail:
            "Law 12.732/2012, Article 2, gives a patient with a malignant neoplasm the right to a first treatment in the SUS within up to 60 days from the day the diagnosis is signed in a pathology report, or sooner as the therapeutic need recorded in the single record requires; treatment counts as started with surgery, radiotherapy or chemotherapy. Paragraph 3, added by Law 13.896 of 30 October 2019 and in force 180 days after its publication on 31 October 2019, requires the tests needed to clarify a case whose main diagnostic hypothesis is cancer to be done within 30 days of a reasoned request by the doctor. How far the system meets the ceiling has been measured for breast cancer: in the AMAZONA III cohort the median from diagnosis to first treatment was 56 days in the public system and 34 in the private, and public-system patients had 4.74 times the odds of starting after 60 days.",
          links: [LEI_12732, AMAZONA_TIME],
        },
        {
          id: "mobile",
          title: "Cancer screening that drives to the patient: Hospital de Amor's 52 mobile units",
          plain:
            "Hospital de Amor, which began as a general hospital in Barretos, in the interior of São Paulo state, in 1962, treats patients entirely free through the SUS and runs a fleet of mobile screening units that travel across Brazil. It now has eight treatment units, 23 fixed prevention units and 52 mobile ones.",
          detail:
            "The hospital's own history dates it to 24 March 1962, when Paulo Prata and Scylla Duarte Prata founded a general hospital in central Barretos; people in the region then had to travel hundreds of kilometres for cancer treatment, and the small hospital began to take many of them in; it describes itself as the largest cancer complex in Latin America offering care entirely free of charge. Its current page lists eight treatment units, 23 fixed prevention units and 52 mobile units spread across Brazil, and describes this as the largest number of mobile screening and early detection units in the world, a claim OnCo reports as the hospital's own. It also hosts a branch of the IRCAD minimally invasive surgery training centre and a molecular oncology research centre.",
          links: [HDA, HDA_HIST],
        },
        {
          id: "car-t",
          title: "A CAR-T cell therapy made in a public university, aiming for the public system",
          plain:
            "CAR-T cell therapy, in which a patient's own immune cells are re-engineered to attack a blood cancer, is among the most expensive treatments in medicine. A blood centre at the University of São Paulo in Ribeirão Preto makes its own version and is testing it in a trial at five Brazilian hospitals, with the stated aim of a national product the SUS can provide.",
          detail:
            "The Hemocentro de Ribeirão Preto's academic CD19 CAR-T (HD37 clone, 4-1BB domain) treated 20 people with relapsed or refractory B-cell leukaemia or lymphoma from 2019 to 2023, reported in Bone Marrow Transplantation in 2024. The prospective phase 1/2 trial CARTHEDRALL (NCT06101381) started on 21 March 2024, aims to enrol 81 patients and runs at the Ribeirão Preto Medical School, Hospital das Clínicas de São Paulo, UNICAMP, Hospital Sírio-Libanês and A Beneficência Portuguesa de São Paulo. The centre says ANVISA chose it for a pilot project on advanced therapy products, and that its Nutera RP factory, built with the Instituto Butantan, and a São Paulo unit can treat more than 300 patients a year after more than R$200 million of investment. In October 2026 its director-president argued that treating centres across the country must be trained now for the therapy to reach SUS patients.",
          links: [HEMO_NUTERA, FAPESP_CART, CARTHEDRALL, HEMO_NET, { label: "Donadel et al., academic CD19 CAR-T in Brazil (Bone Marrow Transplant 2024)", url: "https://doi.org/10.1038/s41409-024-02283-6" }],
        },
      ],
    },
    {
      id: "screening",
      nav: "Screening",
      title: "Screening in the SUS: three programmes changed in 2025 and 2026",
      aside: MAMMO,
      cards: [
        {
          id: "breast-cervix",
          title: "Mammography from 50 to 74, and an HPV test in place of the smear",
          plain:
            "Since September 2025 the SUS recommends a routine mammogram every two years for women aged 50 to 74. For cervical cancer, a test for the HPV virus has become the main screening test for people aged 25 to 64 with a cervix, replacing the smear test where it is available.",
          detail:
            "INCA's guidance, updated on 30 September 2025, states that from September 2025 routine mammography is recommended for women aged 50 to 74 every two years, in line with the Latin American and Caribbean Code Against Cancer, and that in other age groups and intervals the balance of benefit and harm is unfavourable; trans men and non-binary people assigned female at birth who have kept their breasts are included. For the cervix, the national guideline on organised screening with molecular tests for oncogenic HPV DNA made the HPV test the primary screening test; cytology (the Papanicolaou smear) continues where the new test is not yet offered. Screening is for people with a cervix aged 25 to 64 who have ever been sexually active.",
          links: [MAMMO, HPV],
        },
        {
          id: "fit",
          title: "Bowel cancer screening with a home stool test from 2026",
          plain:
            "In May 2026 the Ministry of Health made a home stool test, the faecal immunochemical test, the reference screening test for bowel cancer in the SUS for people aged 50 to 75 without symptoms. A positive result leads to further tests such as a colonoscopy.",
          detail:
            "The Ministry's national protocol, announced on 21 May 2026 and republished by INCA, sets the FIT as the reference test for asymptomatic men and women aged 50 to 75, quotes a sensitivity of 85 to 92 per cent, and expects to widen access to prevention and early detection for more than 40 million Brazilians. The kit is collected at home and analysed in a laboratory; a positive result is referred for complementary examination, with colonoscopy the reference standard. INCA estimates 53,810 new colorectal cancers a year in 2026 to 2028, the second commonest cancer in Brazil excluding non-melanoma skin cancer.",
          links: [FIT, INCA_EST],
        },
      ],
    },
    {
      id: "research",
      nav: "Research",
      title: "Research: a cooperative group, a tumour atlas and a new national consortium",
      cards: [
        {
          id: "lacog",
          title: "LACOG: academic trials and the cohorts that measure Brazil's own care",
          plain:
            "Brazil's academic cancer trials are run largely through cooperative groups. The Latin American Cooperative Oncology Group, based in Porto Alegre, leads 47 registered studies, from drug trials to cohorts that describe how Brazilian patients are diagnosed and treated, including the breast cancer study that measured the public-private gap.",
          detail:
            "ClinicalTrials.gov lists 47 studies with LACOG as lead sponsor when OnCo checked on 3 November 2026, among them a phase 3 trial of anthracycline and taxane sequencing in locally advanced HER2-negative breast cancer (NCT04540692), phase 2 trials in lung, prostate, penile and gynaecological cancers, and epidemiological cohorts in breast, lung, cervical, renal, endometrial and neuroendocrine cancers. AMAZONA III (NCT02663973), run with the Brazilian breast cancer group GBECAM and the Ministry of Health, followed 2,950 women at 23 sites and found that only 34 per cent were diagnosed by screening. OnCo could not reach LACOG's own website, so its founding and membership are not given.",
          links: [LACOG_CT, AMAZONA, AMAZONA_TIME],
        },
        {
          id: "atlas",
          title: "A Brazilian tumour atlas, because the world's cancer genome data barely include Brazilians",
          plain:
            "Most of the genetic data that guide targeted cancer treatment come from people of European ancestry. INCA is building a public atlas of the molecular make-up of tumours from Brazilian patients, so that precision medicine in the SUS rests on Brazilian data.",
          detail:
            "The Atlas Tumoral da População Brasileira (ATPBR) was approved in 2023 with R$8.72 million over three years under the federal Genomas Brasil programme and is coordinated at INCA by João Paulo Viola and Mariana Boroni; its rationale and design were published in The Lancet Regional Health - Americas in 2026. Its stated aim is a secure platform for storing and sharing multi-omics tumour data. Its abstract reports no counts of tumours sequenced; OnCo did not read the full text.",
          links: [ATPBR, { label: "Boroni et al., The Brazilian Population Tumor Atlas Project (Lancet Reg Health Am 2026)", url: "https://doi.org/10.1016/j.lana.2026.101397" }],
        },
        {
          id: "consortium",
          title: "A national cancer research consortium, proposed in 2026",
          plain:
            "In 2026 the Ministry of Health brought 11 Brazilian hospitals and research institutions together to build a permanent national cancer research network, with a shared data platform and biobank, to speed up vaccines, tests and treatments for SUS patients.",
          detail:
            "INCA reported on 1 June 2026 that the Ministry's science secretariat convened INCA, A.C.Camargo Cancer Center, Beneficência Portuguesa, Hospital Alemão Oswaldo Cruz, Hospital Israelita Albert Einstein, Hospital Moinhos de Vento, Hospital Sírio-Libanês, the National Center for Research in Energy and Materials, Fiocruz and the Federal University of Minas Gerais, coordinated by Hospital do Coração (HCor). The idea followed an agreement between the Ministry and the University of Oxford on cancer vaccines. The first phase is an integrated research infrastructure: a national oncology data platform that follows patients over time and a national biobank of DNA, blood, plasma and tumour tissue with clinical trial data.",
          links: [CONSORTIUM],
        },
      ],
    },
  ],
  gaps: [
    {
      id: "gap-survival",
      title: "No national survival figures",
      plain:
        "Brazil does not publish a national series of cancer survival, and OnCo found none on INCA's pages. This page therefore gives no five-year survival figure for Brazil rather than borrow one from a study that covers a few cities.",
      detail:
        "International studies such as CONCORD have included Brazilian population-based registries, but they cover a minority of the population and are not an official national figure. INCA's statistics pages give incidence estimates and deaths only. A reader looking for survival for a specific cancer will find it, where it exists, on the cancer's own page, with its cohort.",
      links: [INCA_STATS],
    },
    {
      id: "gap-sources",
      title: "Sources OnCo could not reach or verify",
      plain:
        "Some official sources refused automated requests or did not show their figures in a form OnCo could read, so a few numbers a reader might expect are missing. They are listed here rather than filled from memory.",
      detail:
        "The Planalto legislation site and INCA's document repository (ninho.inca.gov.br) refused connections, so laws were read from the Chamber of Deputies' and Senate's copies; the full text of Law 14.758/2023 and of its April 2026 amendment was not read, only the Senate's summary. The national all-cancer death total for 2023 was not found on an INCA page (2021 is given). CONITEC's cost-effectiveness reference value, reported in the press in 2022, could not be verified from an official document. The current number of UNACON and CACON accredited hospitals loads dynamically on INCA's page and was not captured. ANVISA's average approval times for new cancer medicines, the date ANVISA joined Project Orbis, and how the courts have interpreted Law 14.454/2022 were not verified. The share of Brazilian health spending paid out of pocket was not sourced. LACOG's own website did not respond.",
      links: [INCA_781, LEI_14758, CONITEC_ABOUT],
    },
  ],
  institutions: ["inca-brazil", "anvisa", "conitec", "ans-brazil", "hospital-de-amor-barretos", "ac-camargo", "icesp", "einstein-sao-paulo", "sirio-libanes", "bp-beneficencia-portuguesa", "hcpa-porto-alegre", "erasto-gaertner", "hemocentro-ribeirao-preto"],
  companies: ["lacog", "eurofarma"],
  drugs: [],
  trials: ["nct06101381", "nct02663973", "nct06822543", "nct06638931", "nct06793137"],
  papers: ["paper-maschmann-amazona-iii-time-to-treatment-bcrt-2023", "paper-rosa-amazona-iii-bcrt-2020", "paper-donadel-academic-cart19-brazil-bmt-2024", "paper-boroni-atpbr-lancet-rha-2026"],
  people: ["roberto-de-almeida-gil", "leandro-pinheiro-safatle", "henrique-prata", "victor-piana-de-andrade", "arthur-violante-sapia", "katz-artur", "hoff-paulo", "kaliks-rafael", "barrios-carlos", "denise-soares-dos-santos", "flavio-tomasich", "brasil-silva-neto", "mariana-boroni", "diego-villa-cle", "rodrigo-calado", "daniela-dornelles-rosa"],
  how:
    "Written on 3 November 2026 from Brazilian sources read in Portuguese: INCA's Estimativa 2026 web edition and statistics pages, the consolidated text of Law 12.732/2012 on the Chamber of Deputies' site, the Senate's open-data records of Laws 14.758/2023 and 14.454/2022, CONITEC's and ANS's own pages, the federal services page for ANVISA registration, RDC 205/2017 from the Ministry of Health's legislation library, ANVISA's and the Ministry's 2026 announcements, and the Hemocentro de Ribeirão Preto's and Hospital de Amor's pages. Every figure was checked against the raw text of its source. Papers were resolved through Crossref and PubMed and trials through the ClinicalTrials.gov API. The institutions, trials, papers and people listed are drawn from OnCo's graph.",
  verify:
    "Brazilian rules change by decree, resolution and provisional measure, and INCA's estimates are projections that INCA itself says should not be compared between editions. Check the current text of a law or resolution before relying on a deadline, and ask the hospital's social service or the state health department about the 60-day and 30-day rights in a specific case.",
  verifyLinks: [INCA_EST_HOME, LEI_12732, CONITEC_ABOUT, ANS_ROL_HOME],
};
