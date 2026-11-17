import type { EntityInput, InstitutionInput, PaperInput } from "@/lib/schema";

/**
 * Curaçao: the public bodies and papers behind /countries/cw/ (wave 16) that the corpus did not hold. Written from
 * sources read raw on 16 November 2026: the Sociale Verzekeringsbank's page on the basisverzekering ziektekosten and
 * its combined annual accounts for 2025 (PDF text), both in Dutch, and Fundashon Prevenshon's home, screening and programme pages.
 * DOIs were resolved through Europe PMC and the figures in `findings` are taken from the indexed abstracts.
 *
 * The existing record for Curaçao Medical Center (institutions/countries-2026-11-americas.ts) is reused on the page,
 * not duplicated. Coordinates are approximate Willemstad points, not building positions.
 */
const asOf = "2026-11-16";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });
type P = Omit<PaperInput, "kind" | "asOf">;
const p = (x: P): PaperInput => ({ kind: "paper", asOf, ...x });
const doi = (id: string, label: string) => ({ label, url: `https://doi.org/${id}` });
const pubmed = (pmid: string) => ({ label: "PubMed", url: `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` });

const SVB = "https://svbcur.org/";
const SVB_BVZ = "https://svbcur.org/werknemers/bvz/";
const SVB_ACCOUNTS_2025 = "https://svbcur.org/wp-content/uploads/2026/08/Jaarrekening-SVB-2025.pdf";
const FP = "https://fundashon-prevenshon.odoo.com/";
const FP_SCREENING = "https://fundashon-prevenshon.odoo.com/screening";
const FP_BREAST = "https://fundashon-prevenshon.odoo.com/breast-cancer-screening";
const FP_CERVICAL = "https://fundashon-prevenshon.odoo.com/cervical-cancer-screening";
const FP_BOWEL = "https://fundashon-prevenshon.odoo.com/bowel-cancer-screening";

const institutions: InstitutionInput[] = [
  i({ id: "svb-curacao", name: "Sociale Verzekeringsbank Curaçao (SVB)", aka: ["SVB", "SVB Curaçao", "Social Insurance Bank of Curaçao"],
    city: "Willemstad", country: "CW", lat: 12.11, lng: -68.92, institutionType: "government", website: SVB,
    tldr: "Curaçao's social insurance bank. It carries out the basic health insurance that covers the island's residents, pays for cancer care under it, and arranges and pays for referral abroad when treatment cannot be given in Curaçao.",
    summary: "The Sociale Verzekeringsbank carries out the Landsverordening basisverzekering ziektekosten, the basic health insurance (BVZ) in force for residents of Curaçao since 1 February 2013, which replaced earlier schemes for particular groups. At the end of 2025 it counted 136,801 people insured, and its accounts put average medical cost per insured person at about 4,785 Caribbean guilders that year. The insurance covers general practice, specialist and hospital care on referral, and medicines prescribed by a doctor unless they are on the SVB's negative list, with a charge of 1 guilder per prescription line.\n\nAn insured person can be sent abroad for examination or treatment that is not possible in Curaçao, on a medical specialist's indication and with the approval of the College Medische Uitzendingen; the SVB pays medical costs, the flight, a daily allowance, local transport and lodging. Its 2025 accounts count 881 such cases, 758 of them regular referrals, and say that it refers within the region in principle and to the Netherlands for highly complex care or transplants, and that it also flies specialists in for procedures that would otherwise mean sending patients abroad. It also runs the old-age and survivors' pensions, sickness and accident insurance and the long-term care insurance AVBZ. Its address is Pater Euwensweg 9, Willemstad.",
    programs: ["Basisverzekering ziektekosten (BVZ, since 1 February 2013)", "Medical referral abroad (College Medische Uitzendingen)", "Long-term care insurance (AVBZ)"],
    institutions: ["curacao-medical-center", "fundashon-prevenshon"],
    related: ["global-oncology-access"],
    links: [
      { label: "SVB Curaçao: basisverzekering ziektekosten (in Dutch)", url: SVB_BVZ },
      { label: "SVB Curaçao: combined annual accounts 2025 (PDF, in Dutch)", url: SVB_ACCOUNTS_2025 },
      { label: "SVB Curaçao (in Dutch)", url: SVB },
    ] }),

  i({ id: "fundashon-prevenshon", name: "Fundashon Prevenshon", aka: ["Fundashon Prevenshon Curaçao"],
    city: "Willemstad", country: "CW", lat: 12.108, lng: -68.94, institutionType: "research-institute", website: FP,
    tldr: "A foundation in Willemstad, set up in 2008, that organises and carries out Curaçao's three population screening programmes, for breast, cervical and bowel cancer, inviting residents in each target group.",
    summary: "Fundashon Prevenshon says it was founded in 2008 and is responsible for organising and carrying out three population screening programmes in Curaçao, for breast cancer, cervical cancer and bowel cancer; it launched the third in 2020 and moved in mid 2019 to Molenplein in Otrobanda. It receives a yearly overview of the people in its target groups from the Civil Registry, invites all women and legal residents in the target group, offers free transport to its prevention centre and runs a toll-free number. Its programme pages give the target groups as women aged 45 to 75 for breast screening every two years, women aged 25 to 65 for cervical screening, and men and women aged 50 to 75 for bowel screening, which went live in September 2020 after a pilot in June. Its site describes a 3D mammography machine for breast screening.\n\nThe foundation states that there is no national policy on screening for these cancers, that general practitioners can refer patients to other clinics, and that it therefore has no complete overview of the share of the target population screened. Research on the bowel cancer programme, which names the programme's organiser as the Caribbean Prevention Center, a name the foundation's own site carries beside Fundashon Prevenshon, reports that about 20% of those invited took part in its first year. The foundation's pages give no participation rates.",
    programs: ["Breast cancer screening (mammography)", "Cervical cancer screening", "Bowel cancer screening (from 2020)"],
    institutions: ["curacao-medical-center", "svb-curacao"],
    cancers: ["breast-cancer", "cervical", "colorectal"],
    keyPapers: ["paper-blake-colorectal-screening-decisions-curacao-bmc-public-health-2023", "paper-blake-masculinity-colorectal-screening-curacao-jnma-2026", "paper-hooi-hpv-genotypes-cervical-cancer-curacao-sti-2018", "paper-hooi-hpv-prevalence-women-curacao-plos-one-2018"],
    links: [
      { label: "Fundashon Prevenshon", url: FP },
      { label: "Fundashon Prevenshon: screening programmes", url: FP_SCREENING },
      { label: "Fundashon Prevenshon: breast cancer screening programme", url: FP_BREAST },
      { label: "Fundashon Prevenshon: cervical cancer screening programme", url: FP_CERVICAL },
      { label: "Fundashon Prevenshon: bowel cancer screening programme", url: FP_BOWEL },
    ] }),
];

const papers: PaperInput[] = [
  p({ id: "paper-hooi-hpv-genotypes-cervical-cancer-curacao-sti-2018", name: "HPV genotypes in cervical cancers and precancers of Curaçao",
    journal: "Sexually Transmitted Infections", year: 2018, doi: "10.1136/sextrans-2017-053109", pmid: "29021405", authors: "Hooi DJ, Lissenberg-Witte BI, de Koning MNC, Pinedo HM, Kenter GG, Meijer CJ, Quint WG.", paperType: "observational",
    tldr: "Testing 104 cervical cancers from Curaçao, the authors found HPV types 16 and 18 in a smaller share than worldwide, with other high-risk types making a relatively large contribution, which matters for the choice of vaccine.",
    summary: "Published as \"High prevalence of high-risk HPV genotypes other than 16 and 18 in cervical cancers of Curaçao: implications for choice of prophylactic HPV vaccine\". Paraffin blocks of 104 cervical cancers and 120 precancerous lesions were analysed for HPV genotypes. The full text cites the Cancer Registry of Curaçao for a cervical cancer incidence of 13.4 per 100,000 women in 2004 to 2008, and says HPV vaccines were then not part of a national vaccination programme.",
    findings: [
      "HPV was found in 92 of 104 invasive cervical cancers (88.5%).",
      "The three most common types were 16 (38.5%), 18 (13.5%) and 45 (6.7%), together 58.7%.",
      "High-risk vaccine genotypes 16, 18, 31, 35, 45, 52 and 58 were responsible for 73.1% of invasive cancers.",
    ],
    whatItMeans: "The authors say the relatively high contribution of HPV types other than 16 and 18 should be taken into account when considering HPV vaccination in Curaçao.",
    caveats: ["104 cancers from pathology archives.", "Written before any vaccination programme began."],
    institutions: [], cancers: ["cervical"],
    links: [doi("10.1136/sextrans-2017-053109", "Sex Transm Infect 2018"), pubmed("29021405")] }),

  p({ id: "paper-hooi-hpv-prevalence-women-curacao-plos-one-2018", name: "HPV prevalence and risk factors in women from Curaçao",
    journal: "PLoS One", year: 2018, doi: "10.1371/journal.pone.0199624", pmid: "30005066", authors: "Hooi DJ, Lissenberg-Witte BI, Kenter G, et al.", paperType: "observational",
    tldr: "Among 1,075 women aged 25 to 65 sampled from Curaçao's population register, 19.7% carried HPV, and 32.8% of those aged 25 to 34.",
    summary: "Published as \"Human papillomavirus (HPV) prevalence and associated risk factors in women from Curaçao\". Five thousand women aged 25 to 65 were randomly selected from the national population register and 1,075 enrolled; HPV was detected and genotyped, and data on risk factors collected.",
    findings: [
      "Overall HPV prevalence was 19.7%; the most frequent genotypes were HPV16 (2.3%), 35 (2.1%) and 52 (1.8%).",
      "In women with normal cytology prevalence was 17.9%.",
      "The highest prevalence, 32.8%, was in the 25 to 34 age group.",
    ],
    whatItMeans: "The authors say the high prevalence in younger women argues for introducing cervical cancer prevention strategies, and that the local distribution of HPV types should inform the choice of vaccine.",
    caveats: ["1,075 of 5,000 invited women enrolled.", "A single survey."],
    institutions: [], cancers: ["cervical"],
    links: [doi("10.1371/journal.pone.0199624", "PLoS One 2018"), pubmed("30005066")] }),

  p({ id: "paper-blake-colorectal-screening-decisions-curacao-bmc-public-health-2023", name: "How people in Curaçao decide about colorectal cancer screening",
    journal: "BMC Public Health", year: 2023, doi: "10.1186/s12889-023-16335-x", pmid: "37501171", authors: "Blake SN, Hugtenburg JG, van der Vlugt M, Dekker E, Fransen MP.", paperType: "observational",
    tldr: "About 20% of people invited took part in the first year of Curaçao's colorectal cancer screening programme; interviews with 23 people not yet invited found trust in the organiser but little knowledge of the test.",
    summary: "Published as \"Decision-making on colorectal cancer screening in Curaçao - interviews with the target population\". Semi-structured interviews with 23 individuals who had not yet been invited were recorded, transcribed and analysed.",
    findings: [
      "During the first year of the population-based programme about 20% of invitees participated.",
      "Most respondents were aware of the programme but not familiar with the screening procedure.",
      "The programme was regarded positively, which seemed related to trust in the Caribbean Prevention Center, the organiser.",
      "A personal approach, visual aids and media were the preferred sources of information.",
    ],
    whatItMeans: "The authors suggest presenting screening information in the context of personal health, with sensitivity to fear of cancer and respect for people's wish to decide for themselves.",
    caveats: ["A qualitative study of 23 people.", "The participation figure is for the programme's first year."],
    institutions: ["fundashon-prevenshon"], cancers: ["colorectal"],
    links: [doi("10.1186/s12889-023-16335-x", "BMC Public Health 2023"), pubmed("37501171")] }),

  p({ id: "paper-blake-masculinity-colorectal-screening-curacao-jnma-2026", name: "Masculine norms and colorectal cancer screening among men in Curaçao",
    journal: "Journal of the National Medical Association", year: 2026, doi: "10.1016/j.jnma.2026.01.011", pmid: "41688307", authors: "Blake SN, van der Vlugt M, Dekker E, Hugtenburg JG, Fransen MP.", paperType: "observational",
    tldr: "Men in Curaçao take part in colorectal cancer screening half as often as women. In a survey of 109 men aged 50 to 75, 83% said they intended to take part, and conformity to masculine norms was not linked to that intention.",
    summary: "Published as \"Tough men, healthy guts: A cross-sectional survey on the role of masculinity in the Curaçao colorectal cancer (CRC) screening program\". Questionnaires including the Conformity to Masculine Norms Inventory-30 were collected from men aged 50 to 75 through personal distribution and snowball sampling.",
    findings: [
      "Of 109 men, 83% reported a positive screening intention and 89% a positive attitude to screening.",
      "The overall masculine norms score was not significantly associated with screening intention (odds ratio 0.98, 95% CI 0.94 to 1.02).",
      "The mean score was significantly lower among men who had taken part in screening.",
      "Risk perception was low for 88%, while cancer worry was high for 68%.",
    ],
    whatItMeans: "The authors conclude that the men surveyed showed moderate conformity to masculine norms and high intention to be screened, with no association between the two.",
    caveats: ["109 men recruited by personal distribution and snowball sampling, not a random sample.", "Stated intention, not attendance."],
    institutions: ["fundashon-prevenshon"], cancers: ["colorectal"],
    links: [doi("10.1016/j.jnma.2026.01.011", "J Natl Med Assoc 2026"), pubmed("41688307")] }),
];

export const recordsCW: EntityInput[] = [...institutions, ...papers];
