import type { PersonInput } from "@/lib/schema";

/**
 * People, wave 3: the publicly listed leader (director, chief executive, president, cancer centre lead or
 * head of oncology) for every institution that previously had no person record. One person per institution.
 * Public professional information only (institutional roles, professional profiles); each record cites in
 * `links` the leadership or about page the role was checked against in 2026-09. People move, so re-check.
 */
const asOf = "2026-09-10";

type P = Omit<PersonInput, "kind" | "asOf"> & { institutionId: string };
const p = (x: P): PersonInput => ({ kind: "person", asOf, institutions: [x.institutionId], ...x });

export const peopleLeadersWave3: PersonInput[] = [
  // =================== Health Canada ===================
  p({ id: "shalene-curtis-micallef", name: "Shalene Curtis-Micallef", role: "Deputy Minister of Health", institutionId: "health-canada", specialisms: ["Public administration", "Health law and regulation", "Health policy"],
    tldr: "Senior public servant who has led Health Canada as Deputy Minister since January 2026, after serving as Canada's Deputy Minister of Justice.",
    summary: "Shalene Curtis-Micallef is Deputy Minister of Health at Health Canada, the federal department responsible for health policy, regulation and drug and medical device approvals in Canada. She took up the role on 19 January 2026, having previously been Deputy Minister of Justice and Deputy Attorney General of Canada. At Justice Canada she also served as Executive Director and Senior General Counsel for the Health Portfolio, working on files including tobacco control, cannabis regulation, food safety modernisation and public health. She holds a law degree from Osgoode Hall Law School and a business degree from the University of Ottawa.",
    profiles: [{ label: "Health Canada profile", url: "https://www.canada.ca/en/health-canada/corporate/about-health-canada/branches-agencies/deputy-minister.html" }],
    links: [{ label: "Source: Health Canada Deputy Minister page", url: "https://www.canada.ca/en/health-canada/corporate/about-health-canada/branches-agencies/deputy-minister.html" }],
    tags: ["leadership", "government", "regulation"], cancers: [] }),

  // =================== Ho Chi Minh City Oncology Hospital ===================
  p({ id: "diep-bao-tuan", name: "Diệp Bảo Tuấn", role: "Director (Giám đốc), Ho Chi Minh City Oncology Hospital", institutionId: "hcmc-oncology-hospital", specialisms: ["Oncology", "Hospital management"],
    tldr: "Physician who directs Ho Chi Minh City Oncology Hospital, the main public cancer hospital serving southern Vietnam.",
    summary: "Diệp Bảo Tuấn (TS.BS, doctor of medicine) is Director of Ho Chi Minh City Oncology Hospital (Bệnh viện Ung Bướu TP.HCM), a public specialist cancer hospital operating on two sites in Ho Chi Minh City. The hospital's own announcement of a deputy director appointment in January 2025 names him as Giám đốc Bệnh viện, and its 2026 notices continue to publish a quarterly public reception schedule for the Director. The hospital website did not give further biographical detail.",
    profiles: [{ label: "Hospital leadership page", url: "https://benhvienungbuou.vn/ban-giam-doc-qua-cac-thoi-ky/" }],
    links: [{ label: "Source: hospital announcement naming the Director (January 2025)", url: "https://benhvienungbuou.vn/le-cong-bo-va-trao-quyet-dinh-dieu-dong-bo-nhiem-pho-giam-doc-benh-vien-ung-buou-tp-hcm/" }],
    tags: ["leadership", "clinician-scientist", "hospital-management"], cancers: [] }),

  // =================== Hokkaido University Hospital ===================
  p({ id: "yasuyuki-nasuhara", name: "Yasuyuki Nasuhara", role: "Director of Hokkaido University Hospital", institutionId: "hokkaido-university-hospital", specialisms: ["Hospital management", "Academic medicine", "Regional healthcare"],
    tldr: "Hospital director who has led Hokkaido University Hospital, a large university teaching hospital in Sapporo, since April 2025.",
    summary: "Yasuyuki Nasuhara (南須原 康行) is Director of Hokkaido University Hospital, the university teaching hospital of Hokkaido University in Sapporo with about 967 beds. He was appointed Director on 1 April 2025. In his director's message he sets out four priorities for the hospital: patient safety, professional development, advanced medical innovation and contribution to regional healthcare across Hokkaido. The hospital marked its centenary in 2021.",
    profiles: [{ label: "Director's message (Japanese)", url: "https://www.huhp.hokudai.ac.jp/director/" }, { label: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/?term=Nasuhara+Y%5BAuthor%5D" }],
    links: [{ label: "Source: Hokkaido University Hospital director's page", url: "https://www.huhp.hokudai.ac.jp/director/" }],
    tags: ["leadership", "clinician-scientist", "hospital-management"], cancers: [] }),

  // =================== Hospital de Amor (Barretos Cancer Hospital) ===================
  p({ id: "henrique-prata", name: "Henrique Prata", role: "President of Hospital de Amor and the Fundação Pio XII", institutionId: "hospital-de-amor-barretos", specialisms: ["Health management", "Cancer care access", "Philanthropic healthcare"],
    tldr: "Health manager who presides over Hospital de Amor in Barretos, one of the largest philanthropic cancer hospitals in Latin America.",
    summary: "Henrique Prata is President of Hospital de Amor (formerly Hospital de Câncer de Barretos) and of its parent body, the Fundação Pio XII, a philanthropic cancer hospital network based in Barretos, São Paulo state, that treats patients through Brazil's public health system. He is the son of the hospital's founders, Paulo Prata and Scylla Duarte Prata, joined the administration in 1989 and led the construction of the new hospital complex opened in 1991. The hospital describes him as a health manager with more than three decades of oncology management in the SUS.",
    profiles: [{ label: "Hospital de Amor article naming him as president", url: "https://hospitaldeamor.com.br/henrique-prata-lanca-seu-novo-livro-o-parque-dos-lobos/" }, { label: "Wikipedia (Portuguese)", url: "https://pt.wikipedia.org/wiki/Henrique_Prata" }],
    links: [{ label: "Source: Hospital de Amor news article (president of HA)", url: "https://hospitaldeamor.com.br/henrique-prata-lanca-seu-novo-livro-o-parque-dos-lobos/" }],
    tags: ["leadership", "hospital-management", "philanthropy"], cancers: [] }),

  // =================== HUS Comprehensive Cancer Center, Helsinki University Hospital ===================
  p({ id: "johanna-mattson", name: "Johanna Mattson", role: "Senior Medical Director and Director of Division, HUS Comprehensive Cancer Center", institutionId: "helsinki-hus", specialisms: ["Oncology", "Cancer centre management", "Radiotherapy and chemotherapy services"],
    tldr: "Oncologist who directs the HUS Comprehensive Cancer Center in Helsinki, Finland's largest cancer treatment centre.",
    summary: "Johanna Mattson is Senior Medical Director, Director of Division and Associate Professor at the HUS Comprehensive Cancer Center, part of Helsinki University Hospital and described by HUS as Finland's largest and most versatile cancer treatment centre. The centre was the first Nordic and second European cancer centre to receive OECI Comprehensive Cancer Center accreditation in 2014, is a member of the EURACAN rare adult solid cancer network and received Magnet recognition for nursing in 2024. It provides radiotherapy, chemotherapy, haematological disease treatment, breast surgery and palliative care for the Uusimaa region. She leads it alongside research director Peeter Karihtala and chief nursing officer Vuokko Kolhonen.",
    profiles: [{ label: "HUS Comprehensive Cancer Center page", url: "https://www.hus.fi/en/about-us/departments/comprehensive-cancer-center" }, { label: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/?term=Mattson+J%5BAuthor%5D+AND+Helsinki" }],
    links: [{ label: "Source: HUS Comprehensive Cancer Center leadership listing", url: "https://www.hus.fi/en/about-us/departments/comprehensive-cancer-center" }],
    tags: ["leadership", "clinician-scientist", "comprehensive-cancer-centre"], cancers: [] }),

  // =================== Institut Bergonié ===================
  p({ id: "nicolas-penel", name: "Nicolas Penel", role: "Directeur Général (Director General) of Institut Bergonié", institutionId: "institut-bergonie", specialisms: ["Medical oncology", "Sarcoma", "Early-phase clinical trials"],
    tldr: "Medical oncologist and sarcoma specialist who directs Institut Bergonié, the regional cancer centre for Nouvelle-Aquitaine in Bordeaux.",
    summary: "Nicolas Penel is Directeur Général of Institut Bergonié, the regional comprehensive cancer centre (Centre de Lutte Contre le Cancer) for Nouvelle-Aquitaine, based in Bordeaux with around 1,000 staff, more than 100 physicians and 159 beds serving nearly six million inhabitants. He is a medical oncologist and university professor at the University of Lille whose expertise is in sarcoma management and early-phase clinical trials, and he has authored or co-authored more than 450 indexed publications. Before joining Bergonié he spent ten years as Director of Clinical Research and Innovation at Centre Oscar Lambret in Lille. He was appointed to lead the institute's new strategic establishment project, working with deputy director general Céline Etchetto and research director Pierre Soubeyran.",
    profiles: [{ label: "Institut Bergonié presentation page", url: "https://www.bergonie.fr/linstitut/" }, { label: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/?term=Penel+N%5BAuthor%5D" }],
    links: [{ label: "Source: Institut Bergonié institutional page naming the direction", url: "https://www.bergonie.fr/linstitut/" }],
    tags: ["leadership", "clinician-scientist", "sarcoma", "clinical-trials"], cancers: ["sarcoma"] }),

  // =================== Institut Jules Bordet ===================
  p({ id: "renaud-witmeur", name: "Renaud Witmeur", role: "Directeur Général of the Hôpital Universitaire de Bruxelles (H.U.B), which includes Institut Jules Bordet", institutionId: "institut-jules-bordet", specialisms: ["Hospital management", "Health system governance"],
    tldr: "Chief executive of the Brussels University Hospital group that runs Institut Jules Bordet, Belgium's dedicated cancer institute.",
    summary: "Renaud Witmeur holds the Direction Générale of the Hôpital Universitaire de Bruxelles (H.U.B), the university hospital group that brings together Institut Jules Bordet, Hôpital Erasme and the Hôpital Universitaire des Enfants Reine Fabiola. Institut Jules Bordet, founded in 1935 and rebuilt on the Anderlecht campus in 2021, is Belgium's only hospital devoted entirely to cancer and is governed through the H.U.B management council rather than a separate hierarchy. Within that structure the medical direction is led by Directeur Général Médical Jean-Marie Hougardy, and Chloé Spilleboudt serves as Médecin-Cheffe for the Institut Jules Bordet site.",
    profiles: [{ label: "Institut Jules Bordet organisation page", url: "https://www.bordet.be/fr/organisation-institut-jules-bordet" }],
    links: [{ label: "Source: Institut Jules Bordet organisation and governance page", url: "https://www.bordet.be/fr/organisation-institut-jules-bordet" }],
    tags: ["leadership", "hospital-management"], cancers: [] }),

  // =================== Institut Paoli-Calmettes ===================
  p({ id: "norbert-vey", name: "Norbert Vey", role: "Directeur Général (Director General) of Institut Paoli-Calmettes", institutionId: "institut-paoli-calmettes", specialisms: ["Haematology", "Leukaemia", "Cancer centre management"],
    tldr: "Haematologist specialising in leukaemia who has directed Institut Paoli-Calmettes, the Marseille comprehensive cancer centre, since May 2022.",
    summary: "Norbert Vey is Directeur Général of Institut Paoli-Calmettes (IPC), the Centre de Lutte Contre le Cancer in Marseille, accredited as a Comprehensive Cancer Center by the OECI. He took office on 13 May 2022 for a five-year term following a ministerial decree, succeeding Patrice Viens, who had led the institute since 2007. He is a professor of haematology at Aix-Marseille University and a hospital practitioner specialising in the treatment of leukaemia, and previously directed the institute's haematology department.",
    profiles: [{ label: "IPC announcement of appointment", url: "https://www.institutpaolicalmettes.fr/le-pr-norbert-vey-nomme-directeur-general-de-linstitut-paoli-calmettes/" }, { label: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/?term=Vey+N%5BAuthor%5D" }],
    links: [{ label: "Source: Institut Paoli-Calmettes appointment announcement", url: "https://www.institutpaolicalmettes.fr/le-pr-norbert-vey-nomme-directeur-general-de-linstitut-paoli-calmettes/" }],
    tags: ["leadership", "clinician-scientist", "haematology"], cancers: ["aml", "all-leukemia"] }),

  // =================== Institut Pasteur ===================
  p({ id: "yasmine-belkaid", name: "Yasmine Belkaid", role: "President (Director General) of the Institut Pasteur", institutionId: "institut-pasteur", specialisms: ["Immunology", "Microbiome and host-microbe interactions", "Mucosal immunology"],
    tldr: "Immunologist who leads the Institut Pasteur in Paris, having taken up its presidency in January 2024 after a long career at the US National Institutes of Health.",
    summary: "Yasmine Belkaid is President of the Institut Pasteur, the Paris-based private non-profit foundation for biomedical research, education and public health. She was appointed on 29 March 2023 and began a six-year term in January 2024. Her research addresses interactions between hosts and microbes, in particular how the microbiota shapes immunity and inflammation. She previously headed the Mucosal Immunology Unit and directed the Microbiome programme at the US National Institute of Allergy and Infectious Diseases, and held an adjunct professorship at the University of Pennsylvania.",
    profiles: [{ label: "Wikipedia", url: "https://en.wikipedia.org/wiki/Yasmine_Belkaid" }, { label: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/?term=Belkaid+Y%5BAuthor%5D" }],
    links: [{ label: "Source: Wikipedia, Pasteur Institute (director-general listing)", url: "https://en.wikipedia.org/wiki/Pasteur_Institute" }],
    tags: ["leadership", "clinician-scientist", "immunology"], cancers: [] }),

  // =================== Institut Salah Azaïez ===================
  p({ id: "senda-tounsi", name: "Senda Tounsi", role: "Directeur Général (Director General) of Institut Salah Azaïez", institutionId: "institut-salah-azaiez", specialisms: ["Hospital administration", "Cancer centre management"],
    tldr: "Director General of Institut Salah Azaïez in Tunis, Tunisia's national cancer institute with around 208 beds.",
    summary: "Senda Tounsi is Directeur Général of the Institut Salah Azaïez (ISA), Tunisia's national cancer institute in Tunis, named after the physician Salah Azaïez (1911 to 1953). The institute's administration page lists her as Directeur général de l'I.S.A on a board of administration chaired by Said Gharbi, with Karima Mrad presiding over the medical committee. The institute is organised into two directorates, six sub-directorates and twelve clinical services, with 208 beds and about 740 staff including 85 physicians.",
    profiles: [{ label: "Institut Salah Azaïez administration page", url: "http://www.institutsalahazaiez.com/espace-administratif.php?id=1" }],
    links: [{ label: "Source: Institut Salah Azaïez administration page", url: "http://www.institutsalahazaiez.com/espace-administratif.php?id=1" }],
    tags: ["leadership", "hospital-management"], cancers: [] }),

  // =================== Institute for Protein Design (University of Washington) ===================
  p({ id: "david-baker", name: "David Baker", role: "Founder and Director of the Institute for Protein Design", institutionId: "institute-for-protein-design", specialisms: ["Computational protein design", "Structural biology", "Biochemistry"],
    tldr: "Nobel laureate biochemist who founded and directs the Institute for Protein Design, which builds new proteins for medicine including cancer therapeutics.",
    summary: "David Baker is Founder and Director of the Institute for Protein Design at the University of Washington, founded in 2012 with the mission of creating new proteins that address challenges across medicine, technology and sustainability. He is a Howard Hughes Medical Institute Investigator and the Henrietta and Aubrey Davis Endowed Professor in Biochemistry. His group developed the Rosetta and RoseTTAFold methods for protein structure prediction and design, and he received half of the 2024 Nobel Prize in Chemistry for computational protein design. Neil King serves as the institute's Deputy Director.",
    profiles: [{ label: "IPD faculty and staff", url: "https://www.ipd.uw.edu/people/faculty_and_staff/" }, { label: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/?term=Baker+D%5BAuthor%5D+AND+protein+design" }],
    links: [{ label: "Source: Institute for Protein Design faculty and staff page", url: "https://www.ipd.uw.edu/people/faculty_and_staff/" }],
    tags: ["leadership", "clinician-scientist", "protein-design", "drug-discovery"], cancers: [] }),

  // =================== Instituto Alexander Fleming ===================
  p({ id: "bernardo-rubinstein", name: "Bernardo Rubinstein", role: "Presidente (President) of the Instituto Alexander Fleming", institutionId: "instituto-alexander-fleming", specialisms: ["Healthcare governance", "Private hospital management"],
    tldr: "President of the Instituto Alexander Fleming, a private specialist cancer hospital in Buenos Aires that opened in 1994.",
    summary: "Bernardo Rubinstein is Presidente of the Instituto Alexander Fleming, a private oncology specialty hospital in Buenos Aires, Argentina, that opened on 14 March 1994 and positions itself as a leading cancer treatment centre in Latin America with a multidisciplinary team affiliated to the University of Buenos Aires. He heads the institute's Directorio, which also includes executive director Alejandra Rubinstein, academic director Reinaldo Chacón, medical director Federico A. Coló and general manager Antonio Goitisolo. The institute offers prevention, diagnosis and treatment services across surgery, medical oncology, haematology, radiotherapy and diagnostic imaging.",
    profiles: [{ label: "Instituto Alexander Fleming, Quiénes somos", url: "https://alexanderfleming.org/quienes-somos/" }],
    links: [{ label: "Source: Instituto Alexander Fleming institutional page (Directorio)", url: "https://alexanderfleming.org/quienes-somos/" }],
    tags: ["leadership", "hospital-management"], cancers: [] }),
  // =================== Taipei Veterans General Hospital ===================
  p({ id: "chen-wei-ming", name: "Chen Wei-ming", role: "Superintendent of Taipei Veterans General Hospital", institutionId: "taipei-veterans-general-hospital", specialisms: ["Hospital leadership", "Medical centre governance", "Veterans healthcare"],
    tldr: "Superintendent who has led Taipei Veterans General Hospital, one of Taiwan's largest medical centres, since January 2022.",
    summary: "Chen Wei-ming (陳威明) has been Superintendent of Taipei Veterans General Hospital since 16 January 2022. The hospital, founded in 1958 and run directly by the Veterans Affairs Council, is a designated medical centre with about 2,900 beds and hosts one of Taiwan's largest cancer services. The hospital's own site blocked automated access, so his role is recorded from the Chinese Wikipedia article for the hospital.",
    profiles: [{ label: "Wikipedia (hospital article, leadership)", url: "https://zh.wikipedia.org/wiki/臺北榮民總醫院" }],
    links: [{ label: "Source: Chinese Wikipedia, Taipei Veterans General Hospital", url: "https://zh.wikipedia.org/wiki/臺北榮民總醫院" }],
    tags: ["leadership", "hospital-management", "taiwan"], cancers: [] }),

  // =================== Tawam Hospital ===================
  p({ id: "sultan-mohamed-alkaram", name: "Sultan Mohamed Alkaram", role: "Chief Executive Officer, Al Ain Region (Tawam Hospital)", institutionId: "tawam-hospital", specialisms: ["Hospital leadership", "Regional health system management", "Cancer services"],
    tldr: "Chief executive for the Al Ain region who leads Tawam Hospital, the main national cancer treatment centre in the United Arab Emirates.",
    summary: "Dr Sultan Mohamed Alkaram is Chief Executive Officer for the Al Ain Region and signs the CEO message on the Tawam Hospital website. Tawam Hospital, part of the SEHA network, has served the community for four decades and describes a focused commitment to specialised care in women's and children's health and cancer treatment. Its oncology centre is the main national cancer treatment centre and a regional referral centre.",
    profiles: [{ label: "Tawam Hospital (Message from the CEO)", url: "https://tawam.seha.ae/" }],
    links: [{ label: "Source: Tawam Hospital homepage, Message from the CEO", url: "https://tawam.seha.ae/" }],
    tags: ["leadership", "hospital-management", "uae"], cancers: [] }),

  // =================== Tel Aviv Sourasky Medical Center ===================
  p({ id: "eli-sprecher", name: "Eli Sprecher", role: "CEO, Tel Aviv Sourasky Medical Center (Ichilov)", institutionId: "tel-aviv-sourasky", specialisms: ["Dermatology", "Genetics of skin disease", "Hospital leadership"],
    tldr: "Dermatologist and geneticist who has been chief executive of Tel Aviv Sourasky Medical Center, a major Israeli academic hospital, since 2024.",
    summary: "Professor Eli Sprecher is CEO of Tel Aviv Sourasky Medical Center (Ichilov), a major academic medical centre in Tel Aviv, having succeeded Ronni Gamzu in 2024. He previously headed the hospital's Dermatology Division (2008 to 2024) and served as Deputy CEO for patient safety and for research and development. His research addresses the genetic basis of skin diseases, including the mechanisms of fingerprint formation.",
    profiles: [{ label: "Executive Leadership page", url: "https://www.tasmc.org.il/en/aboutl/management/" }, { label: "Wikipedia", url: "https://en.wikipedia.org/wiki/Eli_Sprecher" }, { label: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/?term=Sprecher+E%5BAuthor%5D" }],
    links: [{ label: "Source: Sourasky Executive Leadership page", url: "https://www.tasmc.org.il/en/aboutl/management/" }],
    tags: ["leadership", "clinician-scientist", "dermatology", "genetics"], cancers: [] }),

  // =================== The Mark Foundation for Cancer Research ===================
  p({ id: "ryan-schoenfeld", name: "Ryan Schoenfeld", role: "Chief Executive Officer, The Mark Foundation for Cancer Research", institutionId: "mark-foundation", specialisms: ["Medicinal chemistry", "Drug discovery", "Research funding"],
    tldr: "Medicinal chemist who leads The Mark Foundation for Cancer Research, a funder that turns laboratory discoveries into new cancer tests and treatments.",
    summary: "Ryan Schoenfeld, PhD, is Chief Executive Officer of The Mark Foundation for Cancer Research, a nonprofit funder that backs high-risk, high-reward science to translate laboratory discoveries into new diagnostics, treatments and prevention strategies. He joined the foundation in 2018 and previously served as its Chief Scientific Officer. Before that he spent 12 years leading medicinal chemistry at Roche, was Scientific Director at the CHDI Foundation and led data science at Janssen, and he holds a PhD in Chemistry from Cornell University.",
    profiles: [{ label: "Mark Foundation team page", url: "https://themarkfoundation.org/about/team/" }, { label: "Mark Foundation biography", url: "https://themarkfoundation.org/team/ryan-schoenfeld/" }],
    links: [{ label: "Source: Mark Foundation team page", url: "https://themarkfoundation.org/about/team/" }],
    tags: ["leadership", "clinician-scientist", "drug-discovery", "research-funding"], cancers: [] }),

  // =================== The Ottawa Hospital Cancer Centre / Ottawa Hospital Research Institute ===================
  p({ id: "rebecca-auer", name: "Rebecca Auer", role: "Executive Vice-President, Research and Innovation, The Ottawa Hospital / Ottawa Hospital Research Institute", institutionId: "ottawa-hospital", specialisms: ["Surgical oncology", "Perioperative cancer immunology", "Oncolytic virus therapy"],
    tldr: "Cancer surgeon and scientist who leads research and innovation at The Ottawa Hospital and its research institute.",
    summary: "Rebecca Auer is Executive Vice-President, Research and Innovation at The Ottawa Hospital and a Senior Scientist in cancer research at the Ottawa Hospital Research Institute, the not-for-profit corporation that fulfils the hospital's research mission. A surgical oncologist, her research examines how surgery promotes metastasis through the coagulation and immune systems and tests perioperative interventions, including low molecular weight heparin trials in colorectal surgery patients and oncolytic vaccinia virus therapy for metastatic colorectal cancer. She has led multicentre trials funded by the Canadian Institutes of Health Research.",
    profiles: [{ label: "OHRI profile", url: "http://www.ohri.ca/en/node/3821" }, { label: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/?term=Auer+RC%5BAuthor%5D" }],
    links: [{ label: "Source: OHRI organisational structure page", url: "https://www.ohri.ca/en/who-we-are/organizational-structure" }],
    tags: ["leadership", "clinician-scientist", "surgical-oncology", "immunotherapy"], cancers: ["colorectal"] }),

  // =================== The V Foundation for Cancer Research ===================
  p({ id: "brandi-williams-broome", name: "Brandi Williams Broome", role: "Chief Executive Officer, The V Foundation for Cancer Research", institutionId: "v-foundation", specialisms: ["Nonprofit leadership", "Fundraising", "Research funding"],
    tldr: "Nonprofit executive who leads The V Foundation, a charity that raises money to fund cancer research across the United States.",
    summary: "Brandi Williams Broome is Chief Executive Officer of The V Foundation for Cancer Research, a charity headquartered in Cary, North Carolina, that funds cancer research through grant programmes and fundraising events. She brings more than 20 years of nonprofit leadership experience, including over a decade in senior executive roles at the American Heart Association and the American Diabetes Association, where she built high-performing fundraising teams and national corporate partnerships. She is a graduate of the University of Tennessee.",
    profiles: [{ label: "V Foundation leadership profile", url: "https://www.v.org/leadership-team/brandi-williams-broome/" }],
    links: [{ label: "Source: V Foundation leadership page", url: "https://www.v.org/about/leadership/" }],
    tags: ["leadership", "research-funding", "charity"], cancers: [] }),

  // =================== Therapeutic Goods Administration ===================
  p({ id: "anthony-lawler", name: "Anthony Lawler", role: "Head of the Therapeutic Goods Administration and Deputy Secretary, Health Products Regulation Group (since 2023)", institutionId: "tga", specialisms: ["Medicines regulation", "Health products policy", "International regulatory cooperation"],
    tldr: "Head of Australia's medicines and medical devices regulator, the body that approves cancer drugs for the Australian market.",
    summary: "Professor Anthony (Tony) Lawler heads the Therapeutic Goods Administration, Australia's regulator of medicines and medical devices, as Deputy Secretary of the Health Products Regulation Group within the federal Department of Health. He took up the role in June 2023, succeeding Professor John Skerritt, and in October 2025 was elected Chair of the International Coalition of Medicines Regulatory Authorities. The TGA website timed out during checks, so the role is recorded from Wikipedia.",
    profiles: [{ label: "Wikipedia", url: "https://en.wikipedia.org/wiki/Anthony_Lawler" }],
    links: [{ label: "Source: Wikipedia, Therapeutic Goods Administration", url: "https://en.wikipedia.org/wiki/Therapeutic_Goods_Administration" }],
    tags: ["leadership", "regulation", "australia"], cancers: [] }),

  // =================== Tohoku University Hospital ===================
  p({ id: "takashi-kamei", name: "Takashi Kamei", role: "Hospital Director, Tohoku University Hospital", institutionId: "tohoku-university-hospital", specialisms: ["Hospital leadership", "Academic medicine", "Regional cancer care"],
    tldr: "Director of Tohoku University Hospital, the leading university hospital and cancer genomic medicine hub for the Tohoku region of Japan.",
    summary: "Takashi Kamei is Hospital Director of Tohoku University Hospital in Sendai, the only Designated Special Functioning Hospital in Miyagi Prefecture and a Clinical Research Core Hospital and Designated Core Hospital for Cancer Genomic Medicine for the Tohoku region. In his director's message he frames the hospital's mission as providing the best possible treatment while empathising with patients, and commits it to advanced care, training healthcare professionals and innovative treatments for communities across Tohoku. The hospital traces its history to 1915.",
    profiles: [{ label: "Message from the Director", url: "https://www.hosp.tohoku.ac.jp/en/outline/002.php" }],
    links: [{ label: "Source: Tohoku University Hospital, Message from the Director", url: "https://www.hosp.tohoku.ac.jp/en/outline/002.php" }],
    tags: ["leadership", "hospital-management", "japan"], cancers: [] }),

  // =================== Union for International Cancer Control ===================
  p({ id: "cary-adams", name: "Cary Adams", role: "Chief Executive Officer, Union for International Cancer Control (since 2009)", institutionId: "uicc", specialisms: ["Global cancer control", "Non-communicable disease advocacy", "Nonprofit leadership"],
    tldr: "Long-serving chief executive of the Union for International Cancer Control, the world's largest international cancer membership organisation.",
    summary: "Dr Cary Adams has been Chief Executive Officer of the Union for International Cancer Control since 2009. UICC is the largest international cancer organisation, with more than 1,150 member organisations in over 170 countries. He came to the role from international business management in banking, has served two terms as Chair of the NCD Alliance board, and holds honorary doctorates from the University for Business and International Studies Geneva and the University of Bath. The current UICC President is Ulrika Årehed Kågström (2024 to 2026).",
    profiles: [{ label: "UICC biography", url: "https://www.uicc.org/mr-cary-adams-ceo" }],
    links: [{ label: "Source: UICC team page", url: "https://www.uicc.org/who-we-are/our-team" }],
    tags: ["leadership", "global-health", "advocacy"], cancers: [] }),

  // =================== University Hospitals Birmingham / University of Birmingham Cancer Research Centre ===================
  p({ id: "jonathan-brotherton", name: "Jonathan Brotherton", role: "Chief Executive, University Hospitals Birmingham NHS Foundation Trust", institutionId: "birmingham-cancer-centre", specialisms: ["Hospital operations", "NHS leadership", "Acute care management"],
    tldr: "Chief executive of the Birmingham hospital trust that runs the Queen Elizabeth Hospital and its regional cancer services.",
    summary: "Jonathan Brotherton is Chief Executive of University Hospitals Birmingham NHS Foundation Trust, which runs four hospitals including the Queen Elizabeth Hospital Birmingham and provides adult district general and specialist services for the West Midlands. He has worked in Birmingham and Solihull since 2014, joining Heart of England NHS Foundation Trust as Director of Operations before becoming Chief Operating Officer. The trust's Chief Medical Officer is Professor Kiran Patel, a consultant cardiologist who joined in March 2024.",
    profiles: [{ label: "UHB Board of Directors", url: "https://www.uhb.nhs.uk/about/trust-management/bod/" }],
    links: [{ label: "Source: UHB Board of Directors page", url: "https://www.uhb.nhs.uk/about/trust-management/bod/" }],
    tags: ["leadership", "hospital-management", "nhs"], cancers: [] }),

  // =================== University of Malaya Medical Centre ===================
  p({ id: "mohd-zukiflee-abu-bakar", name: "Mohd Zukiflee Abu Bakar", role: "Director, University of Malaya Medical Centre", institutionId: "ummc-kuala-lumpur", specialisms: ["Hospital leadership", "Academic medicine", "Clinical services management"],
    tldr: "Director of the University of Malaya Medical Centre, the academic teaching hospital of Universiti Malaya in Kuala Lumpur.",
    summary: "Professor Dr Mohd Zukiflee bin Abu Bakar is Director of the University of Malaya Medical Centre (UMMC, also known as PPUM), the academic medical centre affiliated with Universiti Malaya in Kuala Lumpur. He leads a management team of deputy directors covering professional services, clinical services (medical and surgical) and management. The centre's governance is shared with the university's Faculty of Medicine.",
    profiles: [{ label: "UMMC Principal Officers", url: "https://www.ummc.edu.my/ummc/principal-officer.asp" }],
    links: [{ label: "Source: UMMC Principal Officers page", url: "https://www.ummc.edu.my/ummc/principal-officer.asp" }],
    tags: ["leadership", "hospital-management", "malaysia"], cancers: [] }),

  // =================== UZ Leuven / Leuven Cancer Institute ===================
  p({ id: "paul-herijgers", name: "Paul Herijgers", role: "Chief Executive Officer, UZ Leuven", institutionId: "uz-leuven", specialisms: ["Hospital leadership", "Academic medicine", "Health system governance"],
    tldr: "Chief executive of the Leuven university hospital, whose Leuven Cancer Institute brings clinicians and scientists together to treat and study cancer.",
    summary: "Professor Paul Herijgers is Chief Executive Officer of UZ Leuven, the university hospital of KU Leuven and one of the largest hospitals in Belgium. He took over from Wim Robberecht on 1 August 2024 and chairs a management committee that includes Medical Director Gert Van Assche and Dean of Medicine Chris Verslype. UZ Leuven's Leuven Cancer Institute (LKI) unites physicians, nurses, basic scientists and clinical researchers in cancer care and research and includes the hospital's proton therapy centre.",
    profiles: [{ label: "UZ Leuven management committee", url: "https://www.uzleuven.be/en/about-us/management-committee" }],
    links: [{ label: "Source: UZ Leuven management committee page", url: "https://www.uzleuven.be/en/about-us/management-committee" }],
    tags: ["leadership", "hospital-management", "belgium"], cancers: [] }),

  // =================== Velindre Cancer Centre ===================
  p({ id: "carl-james", name: "Carl James", role: "Chief Executive, Velindre University NHS Trust", institutionId: "velindre-cardiff", specialisms: ["NHS leadership", "Cancer services", "Health system management"],
    tldr: "Chief executive of the Welsh health trust that runs Velindre Cancer Centre, the specialist cancer hospital for south east Wales.",
    summary: "Carl James is Chief Executive of Velindre University NHS Trust, the NHS Wales trust established in 1994 as a specialist provider of cancer services, whose Velindre Cancer Centre in Cardiff delivers radiotherapy including stereotactic techniques. He is quoted in that role in an August 2026 trust announcement welcoming Dr Sarah Green as Executive Director of Workforce and Organisational Development. The trust's chair is Sara Moseley.",
    profiles: [{ label: "Velindre University NHS Trust news (quoted as Chief Executive)", url: "https://velindre.nhs.wales/news/latest-news/velindre-university-nhs-trust-appoints-new-executive-director-of-workforce-and-organisational-development/" }],
    links: [{ label: "Source: Velindre trust announcement, 12 August 2026", url: "https://velindre.nhs.wales/news/latest-news/velindre-university-nhs-trust-appoints-new-executive-director-of-workforce-and-organisational-development/" }],
    tags: ["leadership", "hospital-management", "nhs", "wales"], cancers: [] }),

  // =================== Worldwide Cancer Research ===================
  p({ id: "laura-brady", name: "Laura Brady", role: "Chief Executive, Worldwide Cancer Research", institutionId: "worldwide-cancer-research", specialisms: ["Charity leadership", "Fundraising and marketing", "Research funding"],
    tldr: "Chief executive of Worldwide Cancer Research, a charity that funds early-stage discovery research into cancer in more than 30 countries.",
    summary: "Laura Brady is Chief Executive of Worldwide Cancer Research, a charity that has invested over 220 million pounds in early-stage discovery research across more than 30 countries. She was appointed in 2026, succeeding Dr Helen Rippon after Rippon's decade as Chief Executive, having previously been the charity's Director of Marketing and Fundraising and led its strategic rebrand. She has set out an aim to accelerate high-potential research into treatments by growing the charity's community of more than 90,000 supporters and its partnerships.",
    profiles: [{ label: "Worldwide Cancer Research, Who we are", url: "https://www.worldwidecancerresearch.org/who-we-are/" }],
    links: [{ label: "Source: Worldwide Cancer Research, Who we are page", url: "https://www.worldwidecancerresearch.org/who-we-are/" }],
    tags: ["leadership", "research-funding", "charity"], cancers: [] }),
  // =================== Emerson Collective ===================
  p({ id: "laurene-powell-jobs", name: "Laurene Powell Jobs", role: "Founder and President of Emerson Collective", institutionId: "emerson-collective", specialisms: ["Philanthropy", "Impact investing", "Social change organisations"],
    tldr: "Founder and President of Emerson Collective, the organisation that backs purpose-driven ventures in education, immigration, the environment and economic mobility.",
    summary: "Laurene Powell Jobs is Founder and President of Emerson Collective, an organisation that invests in purpose-driven entrepreneurs working on education, economic mobility, immigration and environmental issues. She leads the organisation and its staff, who are listed on the Emerson Collective about page. Emerson Collective works across investing, philanthropy and advocacy to address complex social challenges.",
    profiles: [{ label: "Institution profile", url: "https://www.emersoncollective.com/about" }],
    links: [{ label: "Source: Emerson Collective about page", url: "https://www.emersoncollective.com/about" }],
    tags: ["leadership", "philanthropy", "funding"], cancers: [] }),

  // =================== ETOP IBCSG Partners Foundation ===================
  p({ id: "rolf-stahel", name: "Rolf Stahel", role: "President of the Foundation Board, ETOP IBCSG Partners Foundation", institutionId: "etop-ibcsg", specialisms: ["Academic clinical trials", "Lung cancer research", "Breast cancer research"],
    tldr: "President of the board that governs ETOP IBCSG Partners, the Berne-based foundation running international academic trials in lung and breast cancer.",
    summary: "Rolf Stahel is President of the Foundation Board of the ETOP IBCSG Partners Foundation, a not-for-profit foundation for academic international lung and breast cancer research with its legal seat in Berne, Switzerland. The Foundation Board governs the foundation in accordance with its charter and is responsible for strategic management and overall supervision of its subordinate bodies, including the scientific committees and the Coordinating Center in Berne. Board members alongside him include Stefan Aebi, Paul Baas, Marco Colleoni, Richard Gelber, Sherene Loi, Keith McGregor, Solange Peters, Sanjay Popat and Rafael Rosell.",
    profiles: [{ label: "Institution profile", url: "https://www.etop.ibcsg.org/about-us/structure/foundation-board" }, { label: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/?term=Stahel+RA%5BAuthor%5D" }],
    links: [{ label: "Source: ETOP IBCSG Foundation Board page", url: "https://www.etop.ibcsg.org/about-us/structure/foundation-board" }],
    tags: ["leadership", "clinician-scientist", "clinical-trials", "cooperative-group"], cancers: [] }),

  // =================== European Association for Cancer Research ===================
  p({ id: "johanna-joyce", name: "Johanna Joyce", role: "President of the European Association for Cancer Research (2026-2028)", institutionId: "eacr", specialisms: ["Tumour immunology", "Tumour microenvironment", "Brain tumours", "Cancer research policy"],
    tldr: "Tumour immunologist at Ludwig Lausanne who began a two-year term as President of the European Association for Cancer Research in June 2026.",
    summary: "Johanna Joyce is President of the European Association for Cancer Research (EACR), the European membership society for cancer researchers, having begun her two-year term on 11 June 2026 after serving as President-Elect from September 2024. She is a Member of the Ludwig Institute for Cancer Research in Lausanne, Switzerland, where she has worked since January 2016. Her research investigates how the tumour microenvironment regulates cancer progression, metastasis and therapeutic response, with a particular focus on glioblastoma and brain metastases. The EACR board page lists Arkaitz Carracedo as President-Elect, Yardena Samuels as Past President, Caroline Dive as Treasurer and Andreas Trumpp as Secretary General.",
    profiles: [{ label: "Institution profile", url: "https://www.ludwigcancerresearch.org/scientist/johanna-joyce/" }, { label: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/?term=Joyce+JA%5BAuthor%5D" }],
    links: [{ label: "Source: EACR board page", url: "https://www.eacr.org/governance/board" }],
    tags: ["leadership", "clinician-scientist", "immunology", "society"], cancers: ["glioblastoma"] }),

  // =================== European Society for Clinical Nutrition and Metabolism ===================
  p({ id: "stanislaw-klek", name: "Stanislaw Klek", role: "Chairman of ESPEN (term until 2028)", institutionId: "espen", specialisms: ["Clinical nutrition", "Metabolism", "Nutritional care in cancer"],
    tldr: "Chairman of the European Society for Clinical Nutrition and Metabolism, the society that issues Europe's clinical nutrition guidelines, including those for people with cancer.",
    summary: "Stanislaw Klek is Chairman of ESPEN, the European Society for Clinical Nutrition and Metabolism, with a term running until 2028 according to the society's committees page. He leads an Executive Committee that also includes Cristina Cuerda as General Secretary and Stephane Schneider as Treasurer, with Matthias Pirlich designated President 2026. ESPEN publishes guidelines and consensus papers on clinical nutrition, runs an annual congress and workshops, and publishes the journal Clinical Nutrition ESPEN.",
    profiles: [{ label: "Institution profile", url: "https://www.espen.org/about/committees" }, { label: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/?term=Klek+S%5BAuthor%5D" }],
    links: [{ label: "Source: ESPEN committees page", url: "https://www.espen.org/about/committees" }],
    tags: ["leadership", "clinician-scientist", "nutrition", "society"], cancers: [] }),

  // =================== FDA Oncology Center of Excellence ===================
  p({ id: "r-angelo-de-claro", name: "R. Angelo de Claro", role: "Director, Oncology Center of Excellence, US Food and Drug Administration", institutionId: "fda-oce", specialisms: ["Regulatory oncology", "Haematology-oncology", "Global regulatory collaboration"],
    tldr: "Haematologist-oncologist who has directed the FDA's Oncology Center of Excellence since March 2025 and previously led its global clinical sciences programme, including Project Orbis.",
    summary: "Angelo de Claro is Director of the Oncology Center of Excellence (OCE), the US Food and Drug Administration centre that coordinates the review of oncology products across the agency, a role he has held since March 2025 alongside a dual appointment as Deputy Office Director in the Office of Oncologic Diseases. A haematologist-oncologist, he joined the FDA in 2010 as a medical officer, became a team leader in 2012 and a Division Director in the Office of Oncologic Diseases in 2019. He has led OCE's global clinical sciences programme since 2019, including coordination of Project Orbis, and was instrumental in launching the Real-Time Oncology Review programme. He trained at the University of the Philippines and completed fellowship training at the University of Washington.",
    profiles: [{ label: "Institution profile", url: "https://www.fda.gov/about-fda/fda-organization/r-angelo-de-claro" }, { label: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/?term=de+Claro+RA%5BAuthor%5D" }],
    links: [{ label: "Source: OCE Who We Are page", url: "https://www.fda.gov/about-fda/oncology-center-excellence/who-we-are-oncology-center-excellence" }],
    tags: ["leadership", "clinician-scientist", "regulatory", "haematology"], cancers: [] }),

  // =================== Fondation ARC pour la recherche sur le cancer ===================
  p({ id: "dominique-bazy", name: "Dominique Bazy", role: "President of Fondation ARC pour la recherche sur le cancer", institutionId: "fondation-arc", specialisms: ["Charity governance", "Cancer research funding", "Finance"],
    tldr: "President of Fondation ARC, the French charitable foundation that funds cancer research, whose board mandate was renewed in June 2026.",
    summary: "Dominique Bazy is President of the Board of Fondation ARC pour la recherche sur le cancer, the French foundation dedicated to funding cancer research, with his mandate renewed on 26 June 2026 according to the foundation's governance page. He also heads Barber Hauler Capital Advisers. The board comprises twelve volunteer members, including Alain Chevallier as Treasurer and Professor Eric Solary of Gustave Roussy, alongside institutional partners such as the Institut National du Cancer.",
    profiles: [{ label: "Institution profile", url: "https://www.fondation-arc.org/la-fondation/notre-fonctionnement/notre-gouvernance/le-conseil-dadministration/" }],
    links: [{ label: "Source: Fondation ARC board page", url: "https://www.fondation-arc.org/la-fondation/notre-fonctionnement/notre-gouvernance/le-conseil-dadministration/" }],
    tags: ["leadership", "funding", "charity"], cancers: [] }),

  // =================== Fondazione AIRC per la ricerca sul cancro ===================
  p({ id: "andrea-sironi", name: "Andrea Sironi", role: "President of Fondazione AIRC per la ricerca sul cancro", institutionId: "airc", specialisms: ["Charity governance", "Cancer research funding", "Economics"],
    tldr: "President of Fondazione AIRC, the Italian charitable foundation that raises funds from the public to finance cancer research across the country.",
    summary: "Andrea Sironi is President of Fondazione AIRC per la ricerca sul cancro, the Italian foundation that raises funds from the public to finance cancer research, as listed on the foundation's governing bodies page. The Consiglio di amministrazione that he presides over is the governing body with ordinary and extraordinary administrative powers, approving budgets and three-year plans and appointing the consigliere delegato and scientific director. Daniele Finocchiaro serves as Consigliere delegato and Anna Mondino as Scientific Director.",
    profiles: [{ label: "Institution profile", url: "https://www.airc.it/fondazione/chi-siamo/i-nostri-organi-di-governo" }],
    links: [{ label: "Source: AIRC governing bodies page", url: "https://www.airc.it/fondazione/chi-siamo/i-nostri-organi-di-governo" }],
    tags: ["leadership", "funding", "charity"], cancers: [] }),

  // =================== Fundación Arturo López Pérez ===================
  p({ id: "cristian-ayala-munita", name: "Cristián Ayala Munita", role: "General Manager (Gerente General) of Fundación Arturo López Pérez", institutionId: "falp-chile", specialisms: ["Hospital management", "Cancer care delivery", "Non-profit healthcare"],
    tldr: "General Manager of Fundación Arturo López Pérez, the Chilean non-profit cancer foundation that runs an oncology institute in Santiago.",
    summary: "Cristián Ayala Munita is General Manager (Gerente General) of Fundación Arturo López Pérez (FALP), a Chilean non-profit foundation dedicated to cancer care that operates an oncology institute in Santiago. He leads the administrative side of the organisation, while Dr Ricardo Morales Insunza serves as Medical Director and Rolando Medeiros Soux presides over the board of directors. Other senior posts listed by the foundation include the manager of the Instituto Oncológico, Marcos Simpson Álvarez, and the Scientific Director, Dr Christian Caglevic Medina.",
    profiles: [{ label: "Institution profile", url: "https://www.falp.org/fundacion/administracion-falp/" }],
    links: [{ label: "Source: FALP administration page", url: "https://www.falp.org/fundacion/administracion-falp/" }],
    tags: ["leadership", "hospital-management", "latin-america"], cancers: [] }),

  // =================== German Hodgkin Study Group ===================
  p({ id: "peter-borchmann", name: "Peter Borchmann", role: "Chairman and Head of the German Hodgkin Study Group", institutionId: "ghsg", specialisms: ["Hodgkin lymphoma", "Haematology", "Medical oncology", "Clinical trials"],
    tldr: "Cologne haematologist-oncologist who has chaired the German Hodgkin Study Group, the cooperative trial group based at Cologne University Hospital, since 2022.",
    summary: "Peter Borchmann is Chairman and Head (Chairman und Leiter) of the German Hodgkin Study Group (GHSG), the cooperative trial group headquartered at Klinik I fuer Innere Medizin of Uniklinik Koeln, a role he has held since 2022. He is a specialist in internal medicine, haematology and medical oncology with an additional qualification in palliative medicine, and a senior physician at Uniklinik Koeln. He has been a member of the GHSG since 1995; Michael Fuchs heads the GHSG study centre.",
    profiles: [{ label: "Institution profile", url: "https://www.ghsg.org/leitung" }, { label: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/?term=Borchmann+P%5BAuthor%5D" }],
    links: [{ label: "Source: GHSG leadership page", url: "https://www.ghsg.org/leitung" }],
    tags: ["leadership", "clinician-scientist", "haematology", "cooperative-group"], cancers: ["hodgkin-lymphoma"] }),

  // =================== German Lymphoma Alliance ===================
  p({ id: "christiane-pott", name: "Christiane Pott", role: "President (Praesidentin) of the German Lymphoma Alliance", institutionId: "german-lymphoma-alliance", specialisms: ["Lymphoma", "Haematology", "Clinical trials"],
    tldr: "Kiel professor of medicine who serves as President of the German Lymphoma Alliance, the umbrella body for German lymphoma study groups, alongside co-president Georg Lenz.",
    summary: "Christiane Pott is President (Praesidentin) of the German Lymphoma Alliance, the alliance that brings together German lymphoma study groups and centres, as listed on the organisation's contacts page. She is based at UKSH Campus Kiel. The alliance lists Georg Lenz of Universitaetsklinikum Muenster as its other President.",
    profiles: [{ label: "Institution profile", url: "https://www.german-lymphoma-alliance.de/website-ansprechpartner.html" }, { label: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/?term=Pott+C%5BAuthor%5D+lymphoma" }],
    links: [{ label: "Source: German Lymphoma Alliance contacts page", url: "https://www.german-lymphoma-alliance.de/website-ansprechpartner.html" }],
    tags: ["leadership", "clinician-scientist", "haematology", "cooperative-group"], cancers: [] }),

  // =================== Gunma University Heavy Ion Medical Center ===================
  p({ id: "tatsuya-ohno", name: "Tatsuya Ohno", role: "Director of the Gunma University Heavy Ion Medical Center", institutionId: "gunma-heavy-ion-medical-center", specialisms: ["Carbon-ion radiotherapy", "Radiation oncology", "Particle therapy"],
    tldr: "Carbon-ion radiotherapy specialist who directs the Gunma University Heavy Ion Medical Center, Japan's first university-based carbon-ion cancer treatment facility.",
    summary: "Tatsuya Ohno is Director of the Gunma University Heavy Ion Medical Center in Maebashi, which began heavy-ion (carbon-ion) cancer treatment in 2010 as the first university-based facility of its kind in Japan. In his director's greeting he describes the advantages of heavy-ion therapy over conventional X-ray treatment in dose concentration and biological effectiveness, with courses typically completed within one to four weeks, and the centre's roles in training specialists and promoting international collaboration. He has published extensively on carbon-ion radiotherapy from the Gunma facility.",
    profiles: [{ label: "Institution profile", url: "https://heavy-ion.showa.gunma-u.ac.jp/page.php?id=15" }, { label: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/?term=Ohno+T%5BAuthor%5D+carbon+ion+Gunma" }],
    links: [{ label: "Source: GHMC director's greeting", url: "https://heavy-ion.showa.gunma-u.ac.jp/page.php?id=15" }],
    tags: ["leadership", "clinician-scientist", "radiotherapy", "particle-therapy"], cancers: [] }),

  // =================== Guy's and St Thomas' NHS Foundation Trust / King's Health Partners Cancer Centre ===================
  p({ id: "amanda-pritchard", name: "Amanda Pritchard", role: "Chief Executive of Guy's and St Thomas' NHS Foundation Trust", institutionId: "guys-st-thomas", specialisms: ["Health service leadership", "NHS management", "Hospital operations"],
    tldr: "Former head of NHS England who returned to lead Guy's and St Thomas' NHS Foundation Trust as Chief Executive in September 2025.",
    summary: "Amanda Pritchard DBE is Chief Executive of Guy's and St Thomas' NHS Foundation Trust, the London trust whose services include the Guy's Cancer centre, a role she took up in September 2025. She previously spent nearly four years as Chief Executive of NHS England, the first woman to lead the health service, after two years as its Chief Operating Officer, and before that had already led Guy's and St Thomas' as Chief Executive. She began her NHS career as a graduate trainee in 1997 and received a damehood in 2026. The trust's executive team includes Professor Ian Abbs as Chief Medical Officer and Sarah Clarke as Chief Executive of the Cancer Surgery Clinical Group.",
    profiles: [{ label: "Institution profile", url: "https://www.guysandstthomas.nhs.uk/about-us/our-board/executive-directors" }],
    links: [{ label: "Source: Guy's and St Thomas' executive directors page", url: "https://www.guysandstthomas.nhs.uk/about-us/our-board/executive-directors" }],
    tags: ["leadership", "hospital-management", "nhs"], cancers: [] }),

  // =================== Hacettepe University Cancer Institute ===================
  p({ id: "kadir-mutlu-hayran", name: "Kadir Mutlu Hayran", role: "Director of the Hacettepe University Cancer Institute", institutionId: "hacettepe-cancer-institute", specialisms: ["Oncology research", "Academic oncology", "Cancer institute management"],
    tldr: "Professor who directs the Hacettepe University Cancer Institute in Ankara, one of Turkey's leading academic cancer research and treatment institutes.",
    summary: "Kadir Mutlu Hayran is Director of the Hacettepe University Cancer Institute in Ankara, the university's academic institute for cancer research, education and treatment, as listed on the institute's management page. His curriculum vitae is published through the Hacettepe research portal. The institute's management also includes deputy directors listed on its website.",
    profiles: [{ label: "Institution profile", url: "https://research.hacettepe.edu.tr/en/persons/kadir-mutlu-hayran-10/" }, { label: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/?term=Hayran+KM%5BAuthor%5D" }],
    links: [{ label: "Source: Hacettepe Cancer Institute director page", url: "https://kanser.hacettepe.edu.tr/?sayfa=yonetim-mudur" }],
    tags: ["leadership", "clinician-scientist", "academic-oncology"], cancers: [] }),
  // =================== Pharmaceutical Benefits Advisory Committee ===================
  p({ id: "robyn-ward", name: "Robyn Ward", role: "Chair of the Pharmaceutical Benefits Advisory Committee", institutionId: "pbac", specialisms: ["Medical oncology", "Cancer genetics", "Health technology assessment"],
    tldr: "Medical oncologist and cancer geneticist who chairs the independent expert committee that recommends which medicines Australia subsidises through the Pharmaceutical Benefits Scheme.",
    summary: "Professor Robyn Ward AM is Chair of the Pharmaceutical Benefits Advisory Committee (PBAC), the independent expert body appointed by the Australian Government to recommend new medicines for listing on the Pharmaceutical Benefits Scheme. She is Deputy Vice-Chancellor (Research and Enterprise) and Senior Vice-President of Monash University. Her expertise spans medical oncology, cancer genetics and health technology assessment, and she was made a Member of the Order of Australia for service to medical research and patient care in oncology.",
    profiles: [{ label: "PBAC membership page", url: "https://www.pbs.gov.au/info/industry/listing/participants/pbac" }, { label: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/?term=Ward+RL%5BAuthor%5D" }],
    links: [{ label: "Source: PBAC membership page", url: "https://www.pbs.gov.au/info/industry/listing/participants/pbac" }],
    tags: ["leadership", "clinician-scientist", "health-technology-assessment", "drug-reimbursement"], cancers: [] }),
  // =================== Philippine General Hospital ===================
  p({ id: "gerardo-legaspi", name: "Gerardo D. Legaspi", role: "Director of the Philippine General Hospital", institutionId: "philippine-general-hospital", specialisms: ["Hospital leadership", "Public tertiary care", "Academic medicine"],
    tldr: "Physician who directs the Philippine General Hospital, the largest government tertiary hospital in the Philippines and the national referral centre run by the University of the Philippines Manila.",
    summary: "Gerardo D. Legaspi, MD, is Director of the Philippine General Hospital (UP-PGH), a tertiary state-owned hospital administered by the University of the Philippines Manila that serves as the national referral centre and treats more than 600,000 patients a year, mostly indigent Filipinos. He heads a leadership team of deputy directors covering health operations, administration, fiscal services, training and research, and nursing.",
    profiles: [{ label: "PGH list of officials", url: "https://www.pgh.gov.ph/list-of-officials/" }, { label: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/?term=Legaspi+GD%5BAuthor%5D" }],
    links: [{ label: "Source: PGH list of officials", url: "https://www.pgh.gov.ph/list-of-officials/" }],
    tags: ["leadership", "clinician-scientist", "public-hospital"], cancers: [] }),
  // =================== Providence Health & Services ===================
  p({ id: "erik-wexler", name: "Erik G. Wexler", role: "President and CEO of Providence", institutionId: "providence-health", specialisms: ["Health system leadership", "Not-for-profit healthcare", "Hospital operations"],
    tldr: "Chief executive of Providence, one of the largest not-for-profit health systems in the United States, which runs a network of hospitals and cancer programmes across the western states.",
    summary: "Erik G. Wexler is President and CEO of Providence, a not-for-profit Catholic health system operating hospitals, clinics and cancer services across the western United States. He also serves as an ex-officio member of the Providence Board of Directors.",
    profiles: [{ label: "Providence leadership page", url: "https://www.providence.org/about/leadership" }],
    links: [{ label: "Source: Providence leadership page", url: "https://www.providence.org/about/leadership" }],
    tags: ["leadership", "health-system"], cancers: [] }),
  // =================== QIMR Berghofer Medical Research Institute ===================
  p({ id: "brandon-wainwright", name: "Brandon Wainwright", role: "Director and CEO of QIMR Berghofer Medical Research Institute", institutionId: "qimr-berghofer", specialisms: ["Cancer genetics", "Medulloblastoma", "Hedgehog signalling", "Research leadership"],
    tldr: "Geneticist known for work on the genetic drivers of childhood brain cancer who became Director and CEO of QIMR Berghofer, a leading Australian medical research institute, in 2026.",
    summary: "Professor Brandon Wainwright AM is Director and CEO of QIMR Berghofer Medical Research Institute in Brisbane, an Australian medical research institute with major cancer research programmes, a role he took up in 2026. He was previously Professor at The University of Queensland, led its Institute for Molecular Bioscience until 2019 and was Co-Director of the Children's Brain Cancer Centre. His research addresses genetic pathways in medulloblastoma and other cancers, including the role of Hedgehog signalling.",
    profiles: [{ label: "QIMR Berghofer directors page", url: "https://www.qimrb.edu.au/about/governance/directors" }, { label: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/?term=Wainwright+BJ%5BAuthor%5D" }],
    links: [{ label: "Source: QIMR Berghofer directors page", url: "https://www.qimrb.edu.au/about/governance/directors" }],
    tags: ["leadership", "clinician-scientist", "genetics", "paediatric-oncology"], cancers: [] }),
  // =================== QST Hospital (National Institutes for Quantum Science and Technology) ===================
  p({ id: "hitoshi-ishikawa", name: "Hitoshi Ishikawa", role: "Director of QST Hospital", institutionId: "qst-hospital", specialisms: ["Radiation oncology", "Carbon ion radiotherapy", "Heavy ion therapy"],
    tldr: "Radiation specialist who has directed QST Hospital in Chiba, Japan's pioneering carbon ion radiotherapy hospital, since April 2024.",
    summary: "Hitoshi Ishikawa is Director of QST Hospital, the clinical arm of Japan's National Institutes for Quantum Science and Technology and a centre for carbon ion radiotherapy, a role he has held since April 2024. In his director's message he prioritises validating heavy ion therapy across cancers and extending Japanese insurance coverage, the Quantum Scalpel project to build compact multi-ion accelerators with clinical use planned from 2028, and translating QST research such as radioisotope therapy and PET imaging into practice. The hospital also serves as a designated advanced medical facility for Chiba Prefecture.",
    profiles: [{ label: "QST Hospital director's greeting", url: "https://www.qst.go.jp/site/hospital/aboutus-greeting.html" }, { label: "QST Hospital (English)", url: "https://www.qst.go.jp/site/hospital-en/" }],
    links: [{ label: "Source: QST Hospital director's greeting", url: "https://www.qst.go.jp/site/hospital/aboutus-greeting.html" }],
    tags: ["leadership", "clinician-scientist", "radiotherapy", "particle-therapy"], cancers: [] }),
  // =================== Queen Mary Hospital / University of Hong Kong ===================
  p({ id: "chak-sing-lau", name: "Chak-sing Lau", role: "Dean of Medicine, LKS Faculty of Medicine, The University of Hong Kong", institutionId: "queen-mary-hospital-hku", specialisms: ["Rheumatology", "Clinical immunology", "Academic medicine"],
    tldr: "Rheumatologist who is Dean of Medicine at the University of Hong Kong, the academic partner of Queen Mary Hospital, and formerly chief of the hospital's Department of Medicine.",
    summary: "Professor Chak-sing Lau, BBS, JP, is the forty-first Dean of Medicine at The University of Hong Kong, whose LKS Faculty of Medicine is the teaching and research partner of Queen Mary Hospital, and is also interim Vice-President and Pro-Vice-Chancellor (Health). He holds the Daniel CK Yu Professorship in Rheumatology and Clinical Immunology and previously served as Chairperson of the Department of Medicine, Chief of Service in Medicine at Queen Mary Hospital and President of the Hong Kong Academy of Medicine. He is regarded as a pioneer of rheumatology in Hong Kong and founded the Hong Kong Arthritis and Rheumatism Foundation in 2001.",
    profiles: [{ label: "HKUMed Dean's Corner", url: "https://www.med.hku.hk/en/about-hkumed/leadership/professor-lau-chak-sing" }, { label: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/?term=Lau+CS%5BAuthor%5D" }],
    links: [{ label: "Source: HKUMed leadership page", url: "https://www.med.hku.hk/en/about-hkumed/leadership" }],
    tags: ["leadership", "clinician-scientist", "academic-medicine"], cancers: [] }),
  // =================== Ramathibodi Hospital, Mahidol University ===================
  p({ id: "atiporn-ingsathit", name: "Atiporn Ingsathit", role: "Director of Ramathibodi Hospital", institutionId: "ramathibodi-hospital", specialisms: ["Hospital leadership", "Clinical medicine", "Academic medicine"],
    tldr: "Physician who directs Ramathibodi Hospital, the university hospital of the Faculty of Medicine Ramathibodi Hospital at Mahidol University in Bangkok.",
    summary: "Professor Atiporn Ingsathit, MD, PhD, is Director of Ramathibodi Hospital, the teaching hospital of the Faculty of Medicine Ramathibodi Hospital, Mahidol University, in Bangkok. She serves on the faculty's administrative team under Dean Clinical Professor Artit Ungkanont.",
    profiles: [{ label: "Ramathibodi administrative team", url: "https://www.rama.mahidol.ac.th/en/aboutus/administrative-team" }, { label: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/?term=Ingsathit+A%5BAuthor%5D" }],
    links: [{ label: "Source: Ramathibodi administrative team page", url: "https://www.rama.mahidol.ac.th/en/aboutus/administrative-team" }],
    tags: ["leadership", "clinician-scientist", "university-hospital"], cancers: [] }),
  // =================== Rambam Health Care Campus ===================
  p({ id: "michal-mekel", name: "Michal Mekel", role: "Director General of Rambam Health Care Campus", institutionId: "rambam", specialisms: ["Endocrine surgery", "Hospital management", "Surgical oncology"],
    tldr: "Endocrine surgeon who leads Rambam Health Care Campus, the largest hospital in northern Israel, after nearly three decades at the institution.",
    summary: "Dr Michal Mekel is Director General of Rambam Health Care Campus in Haifa, the tertiary referral hospital for northern Israel. She trained at the Technion Faculty of Medicine, became Israel's first endocrine surgeon in 2009 and developed the specialty nationally, and moved into management in 2013 before appointment as Deputy Director in 2017 and then to the top role. She leads a management team including deputy directors for medical operations, paediatrics, surgery and hospitalisation logistics.",
    profiles: [{ label: "Rambam leadership page", url: "https://www.rambam.org.il/en/about_rambam/leadership/" }, { label: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/?term=Mekel+M%5BAuthor%5D" }],
    links: [{ label: "Source: Rambam about and leadership pages", url: "https://www.rambam.org.il/en/about_rambam/" }],
    tags: ["leadership", "clinician-scientist", "surgery"], cancers: [] }),
  // =================== Rosalind and Morris Goodman Cancer Institute, McGill University ===================
  p({ id: "john-stagg", name: "John Stagg", role: "Director of the Rosalind and Morris Goodman Cancer Institute", institutionId: "mcgill-goodman", specialisms: ["Cancer immunotherapy", "Immuno-oncology", "Therapeutic target discovery"],
    tldr: "Immunologist who studies why tumours resist immunotherapy and directs the Goodman Cancer Institute, McGill University's cancer research institute in Montreal.",
    summary: "Professor John Stagg is Director of the Rosalind and Morris Goodman Cancer Institute at McGill University, succeeding Morag Park who completed a 12-year term as Director in September 2025. He is Professor in McGill's Department of Microbiology and Immunology and Associate Professor at the Faculty of Pharmacy, Universite de Montreal. His laboratory investigates how cancers develop resistance to immunotherapy, including the effect of adenosine on immune cells, and uses multi-omics data to identify targets and develop biologic anti-cancer treatments.",
    profiles: [{ label: "Goodman Cancer Institute profile", url: "https://www.goodmancancer.ca/en/principal-investigators/john-stagg" }, { label: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/?term=Stagg+J%5BAuthor%5D" }],
    links: [{ label: "Source: Goodman Cancer Institute about page", url: "https://www.goodmancancer.ca/en/about-us" }],
    tags: ["leadership", "clinician-scientist", "immunotherapy"], cancers: [] }),
  // =================== Scottish Medicines Consortium ===================
  p({ id: "robert-peel", name: "Robert Peel", role: "Chair of the Scottish Medicines Consortium", institutionId: "smc", specialisms: ["Nephrology", "Medicines assessment", "Health technology assessment"],
    tldr: "Kidney specialist from NHS Highland who chairs the Scottish Medicines Consortium, the body that decides which newly licensed medicines are accepted for use in the Scottish health service.",
    summary: "Dr Robert Peel, Consultant Nephrologist at NHS Highland, is Chair of the Scottish Medicines Consortium (SMC), a committee of clinicians, pharmacists, health board representatives, industry and the public that assesses newly licensed medicines, including cancer drugs, for use by NHSScotland. He is supported by vice chairs Graeme Bryson, Director of Pharmacy at NHS Lanarkshire, and Jane Goddard, Consultant Nephrologist at NHS Lothian.",
    profiles: [{ label: "SMC who we are", url: "https://scottishmedicines.org.uk/about-us/who-we-are/" }],
    links: [{ label: "Source: SMC who we are page", url: "https://scottishmedicines.org.uk/about-us/who-we-are/" }],
    tags: ["leadership", "clinician-scientist", "health-technology-assessment", "drug-reimbursement"], cancers: [] }),
  // =================== Seoul St. Mary's Hospital ===================
  p({ id: "yoon-seung-kew", name: "Yoon Seung-kew", role: "President of Seoul St. Mary's Hospital", institutionId: "seoul-st-marys-hospital", specialisms: ["Hospital leadership", "Academic medicine", "Catholic healthcare"],
    tldr: "President of Seoul St. Mary's Hospital, the flagship 1,374-bed hospital of the Catholic University of Korea, which he is steering towards personalised, patient-centred care in cancer and other major diseases.",
    summary: "Yoon Seung-kew is President of Seoul St. Mary's Hospital, the flagship hospital of the Catholic Medical Center of the Catholic University of Korea and the largest single-building hospital in Korea with 1,374 beds. In his presidential greeting he commits the hospital to personalised medicine and patient-centred care, to tackling cancer, heart disease, brain disease and rare conditions, and to charity care grounded in Catholic medical ethics.",
    profiles: [{ label: "President's greeting", url: "https://www.cmcseoul.or.kr/en.aboutus.greeting.sp" }],
    links: [{ label: "Source: Seoul St. Mary's Hospital president's greeting", url: "https://www.cmcseoul.or.kr/en.aboutus.greeting.sp" }],
    tags: ["leadership", "university-hospital"], cancers: [] }),
  // =================== Shizuoka Cancer Center ===================
  p({ id: "katsuhiko-uesaka", name: "Katsuhiko Uesaka", role: "President of Shizuoka Cancer Center", institutionId: "shizuoka-cancer-center", specialisms: ["Cancer centre leadership", "Multidisciplinary cancer care", "Cancer genomic medicine"],
    tldr: "Physician who has led Shizuoka Cancer Center, one of Japan's three largest cancer centres by patient volume, since April 2023.",
    summary: "Katsuhiko Uesaka, MD, PhD, was appointed President of Shizuoka Cancer Center in April 2023, succeeding Ken Yamaguchi. The centre, founded in 2002, is the designated cancer hospital for Shizuoka Prefecture, a Special Functioning Hospital and a Cancer Genomic Medicine Core Hospital, and describes itself as one of the three top cancer centres in Japan by patient numbers. It emphasises multidisciplinary team care, runs Japan's first Supportive Therapy Center and conducts genomic research through Project HOPE, which has analysed tumours from more than 10,000 patients.",
    profiles: [{ label: "President's greeting", url: "https://www.scchr.jp/en/index.html" }, { label: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/?term=Uesaka+K%5BAuthor%5D" }],
    links: [{ label: "Source: Shizuoka Cancer Center president's greeting", url: "https://www.scchr.jp/en/index.html" }],
    tags: ["leadership", "clinician-scientist", "cancer-centre"], cancers: [] }),
  // =================== Siriraj Hospital, Mahidol University ===================
  p({ id: "yongyut-sirivatanauksorn", name: "Yongyut Sirivatanauksorn", role: "Director of Siriraj Hospital", institutionId: "siriraj-hospital", specialisms: ["Hospital leadership", "Surgery", "Academic medicine"],
    tldr: "Physician who directs Siriraj Hospital, Thailand's oldest and largest hospital and the teaching hospital of Mahidol University's Faculty of Medicine Siriraj Hospital.",
    summary: "Professor Yongyut Sirivatanauksorn is Director of Siriraj Hospital, the teaching hospital of the Faculty of Medicine Siriraj Hospital, Mahidol University, in Bangkok. He serves on the faculty's administrative team under Dean Professor Apichat Asavamongkolkul.",
    profiles: [{ label: "Siriraj administrative team", url: "https://www2.si.mahidol.ac.th/en/administration/administrative-team/" }, { label: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/?term=Sirivatanauksorn+Y%5BAuthor%5D" }],
    links: [{ label: "Source: Siriraj administrative team page", url: "https://www2.si.mahidol.ac.th/en/administration/administrative-team/" }],
    tags: ["leadership", "clinician-scientist", "university-hospital"], cancers: [] }),
  // =================== Sunnybrook Odette Cancer Centre ===================
  p({ id: "monika-krzyzanowska", name: "Monika Krzyzanowska", role: "Chief, Odette Cancer Program, Sunnybrook Health Sciences Centre", institutionId: "sunnybrook-odette", specialisms: ["Medical oncology", "Health services research", "Quality of cancer care", "Digital health"],
    tldr: "Medical oncologist and health services researcher who leads the Odette Cancer Program at Sunnybrook in Toronto, one of Canada's largest cancer centres.",
    summary: "Dr Monika Krzyzanowska is Chief of the Odette Cancer Program at Sunnybrook Health Sciences Centre in Toronto, Regional Vice President of Cancer Services at Ontario Health (Cancer Care Ontario) for the Toronto Central North region, and Professor of Medicine at the University of Toronto. A medical oncologist and health services researcher trained at the University of Toronto with a fellowship at Dana-Farber Cancer Institute and Harvard, she founded the Cancer Quality Lab and focuses on optimising the quality of cancer care and new care delivery models such as remote monitoring. In October 2025 she launched the programme's Cancer Care at Home model.",
    profiles: [{ label: "Sunnybrook profile", url: "https://sunnybrook.ca/find-a-doctor/monika-krzyzanowska/" }, { label: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/?term=Krzyzanowska+MK%5BAuthor%5D" }],
    links: [{ label: "Source: Sunnybrook Cancer Care at Home news release", url: "https://sunnybrook.ca/2025/10/sunnybrooks-odette-cancer-program-launches-cancer-care-at-home/" }],
    tags: ["leadership", "clinician-scientist", "medical-oncology", "health-services"], cancers: ["thyroid"] }),
  // =================== Swissmedic ===================
  p({ id: "vincenza-trivigno", name: "Vincenza Trivigno", role: "Executive Director of Swissmedic", institutionId: "swissmedic", specialisms: ["Medicines regulation", "Public administration", "Agency leadership"],
    tldr: "Executive Director of Swissmedic, the Swiss agency that authorises and supervises medicines and medical devices, including new cancer therapies.",
    summary: "Vincenza Trivigno, lic. rer. pol., is Executive Director of Swissmedic, the Swiss Agency for Therapeutic Products responsible for authorising and monitoring medicinal products and medical devices in Switzerland. She heads the Management Board, the agency's executive body responsible for operations, whose members include Deputy Executive Director Philippe Girard (medicinal product licences and surveillance) and Eveline Trachsel (medicinal product authorisation and vigilance).",
    profiles: [{ label: "Swissmedic Management Board", url: "https://www.swissmedic.ch/swissmedic/en/home/about-us/organisation/management-board.html" }],
    links: [{ label: "Source: Swissmedic Management Board page", url: "https://www.swissmedic.ch/swissmedic/en/home/about-us/organisation/management-board.html" }],
    tags: ["leadership", "regulator", "drug-regulation"], cancers: [] }),
  // =================== Leeds Cancer Centre, St James's University Hospital ===================
  p({ id: "brendan-brown", name: "Brendan Brown", role: "Chief Executive, Leeds Teaching Hospitals NHS Trust", institutionId: "leeds-cancer-centre", specialisms: ["Hospital management", "NHS leadership", "Cancer services"],
    tldr: "Chief Executive of Leeds Teaching Hospitals NHS Trust, the NHS trust that runs the Leeds Cancer Centre at St James's University Hospital.",
    summary: "Brendan Brown is Chief Executive of Leeds Teaching Hospitals NHS Trust, which operates the Leeds Cancer Centre at St James's University Hospital, one of the largest cancer centres in the UK. He leads the Trust's board of executive directors alongside the Chief Medical Officer, Chief Nurse and Chief Operating Officer. The Trust website does not name a separate clinical director for the cancer centre.",
    profiles: [{ label: "Trust Board members", url: "https://www.leedsth.nhs.uk/about/board/directors/" }],
    links: [{ label: "Source: Leeds Teaching Hospitals Trust Board members page", url: "https://www.leedsth.nhs.uk/about/board/directors/" }],
    tags: ["leadership", "nhs", "hospital-management"], cancers: [] }),

  // =================== Ligue nationale contre le cancer ===================
  p({ id: "philippe-bergerot", name: "Philippe Bergerot", role: "President of the Ligue nationale contre le cancer (since 2024)", institutionId: "ligue-contre-le-cancer", specialisms: ["Radiation oncology", "Cancer charity governance", "Patient advocacy"],
    tldr: "Radiation oncologist who has presided over the Ligue nationale contre le cancer, France's national cancer charity, since 2024.",
    summary: "Philippe Bergerot is President of the Ligue nationale contre le cancer, the French national cancer charity that funds research, supports patients and campaigns on prevention. He is a cancer physician and radiotherapist and was elected to lead the organisation's board in June 2024. He chairs a seven member bureau that prepares and oversees the decisions of the board of directors.",
    profiles: [{ label: "Ligue governance page", url: "https://www.ligue-cancer.net/qui-sommesnous" }, { label: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/?term=Bergerot+P%5BAuthor%5D" }],
    links: [{ label: "Source: Ligue nationale contre le cancer, Qui sommes-nous (bureau)", url: "https://www.ligue-cancer.net/qui-sommesnous" }],
    tags: ["leadership", "clinician-scientist", "radiation-oncology", "charity"], cancers: [] }),

  // =================== Macmillan Cancer Support ===================
  p({ id: "gemma-peters", name: "Gemma Peters", role: "Chief Executive Officer, Macmillan Cancer Support", institutionId: "macmillan-cancer-support", specialisms: ["Charity leadership", "Cancer support services", "Fundraising"],
    tldr: "Chief Executive of Macmillan Cancer Support, the UK charity that provides practical, emotional and financial support to people living with cancer.",
    summary: "Gemma Peters is Chief Executive Officer of Macmillan Cancer Support, the UK cancer support charity. She joined Macmillan in January 2023, bringing wide ranging expertise in the cancer and charity sectors. She leads an executive team that includes a Chief Medical Officer and a Chief Nursing Officer, with a stated focus on making sure people living with cancer get the support they need.",
    profiles: [{ label: "Macmillan profile", url: "https://www.macmillan.org.uk/about-us/organisation/team/leadership/ceo-gemma-peters" }],
    links: [{ label: "Source: Macmillan leadership team page", url: "https://www.macmillan.org.uk/about-us/organisation/team/leadership" }],
    tags: ["leadership", "charity", "supportive-care"], cancers: [] }),

  // =================== Marie Curie ===================
  p({ id: "matthew-reed", name: "Matthew Reed", role: "Chief Executive, Marie Curie", institutionId: "marie-curie-uk", specialisms: ["Charity leadership", "Palliative and end of life care", "Social policy"],
    tldr: "Chief Executive of Marie Curie, the UK end of life care charity, since February 2019.",
    summary: "Matthew Reed has been Chief Executive of Marie Curie, the UK's leading end of life charity, since February 2019. He previously served as Chief Executive of The Children's Society and of the Cystic Fibrosis Trust and as a director at Christian Aid. The charity's Board of Trustees delegates day to day management to him, and its Executive Team reports to him.",
    profiles: [{ label: "Marie Curie profile", url: "https://www.mariecurie.org.uk/about-us/governance/matthew-reed-chief-executive" }],
    links: [{ label: "Source: Marie Curie, Who we are", url: "https://www.mariecurie.org.uk/about-us/who-we-are" }],
    tags: ["leadership", "charity", "palliative-care"], cancers: [] }),

  // =================== Movember ===================
  p({ id: "andrew-little", name: "Andrew Little", role: "Chief Executive Officer, Movember", institutionId: "movember", specialisms: ["Charity leadership", "Men's health", "Prostate and testicular cancer funding"],
    tldr: "Chief Executive of Movember, the global men's health charity that funds prostate cancer, testicular cancer and mental health programmes.",
    summary: "Andrew Little is Chief Executive Officer of Movember, the global men's health charity best known for its annual moustache campaign and its funding of prostate cancer, testicular cancer and mental health work. He heads the Global Leadership Team, which is responsible for executing the strategies set by Movember's Board of Directors. The leadership team also includes the Director of the Movember Institute of Men's Health.",
    profiles: [{ label: "Movember leadership and governance", url: "https://au.movember.com/about-us/governance" }],
    links: [{ label: "Source: Movember governance page", url: "https://au.movember.com/about-us/governance" }],
    tags: ["leadership", "charity", "mens-health"], cancers: ["prostate"] }),

  // =================== National Cancer Institute, Cairo University ===================
  p({ id: "mohamed-abdel-moaty-samra", name: "Mohamed Abdel Moaty Samra", role: "Dean of the National Cancer Institute, Cairo University", institutionId: "nci-cairo", specialisms: ["Oncology", "Academic leadership", "Cancer care in Egypt"],
    tldr: "Professor who serves as Dean of the National Cancer Institute at Cairo University, Egypt's national cancer teaching hospital and research institute.",
    summary: "Professor Mohamed Abdel Moaty Samra is Dean of the National Cancer Institute, Cairo University, the Egyptian national cancer teaching hospital and research institute. He heads the institute's senior administration, which includes vice deans for postgraduate studies and research and for community service, and a hospital director. He presided over the institute's graduation ceremony in February 2025.",
    profiles: [{ label: "NCI Cairo senior administration", url: "https://nci.cu.edu.eg/%D8%A7%D9%84%D8%A5%D8%AF%D8%A7%D8%B1%D8%A9-%D8%A7%D9%84%D8%B9%D9%84%D9%8A%D8%A7/" }, { label: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/?term=Samra+MA%5BAuthor%5D+Cairo" }],
    links: [{ label: "Source: NCI Cairo senior administration page", url: "https://nci.cu.edu.eg/%D8%A7%D9%84%D8%A5%D8%AF%D8%A7%D8%B1%D8%A9-%D8%A7%D9%84%D8%B9%D9%84%D9%8A%D8%A7/" }],
    tags: ["leadership", "clinician-scientist", "africa"], cancers: [] }),

  // =================== National Institute for Health and Care Excellence ===================
  p({ id: "jonathan-benger", name: "Jonathan Benger", role: "Chief Executive of NICE (since December 2025)", institutionId: "nice", specialisms: ["Health technology assessment", "Clinical guidelines", "Emergency medicine"],
    tldr: "Emergency physician who became Chief Executive of NICE, the body that appraises new cancer medicines and issues clinical guidance for the NHS, in December 2025.",
    summary: "Professor Jonathan Benger is Chief Executive of the National Institute for Health and Care Excellence (NICE), the English body that produces clinical guidelines and appraises the cost effectiveness of new treatments, including cancer drugs. He joined NICE in January 2023 as Chief Medical Officer, became interim director of the centre for guidelines in March 2023, was appointed deputy chief executive in May 2024 and chief executive in December 2025. Earlier he was interim chief clinical information officer at NHS England, Chief Medical Officer of NHS Digital and national clinical director for urgent and emergency care.",
    profiles: [{ label: "NICE executive team", url: "https://www.nice.org.uk/about-us/executive-team" }, { label: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/?term=Benger+JR%5BAuthor%5D" }],
    links: [{ label: "Source: NICE executive team page", url: "https://www.nice.org.uk/about-us/executive-team" }],
    tags: ["leadership", "clinician-scientist", "hta", "policy"], cancers: [] }),

  // =================== National Institute of Oncology, Hungary ===================
  p({ id: "magdolna-dank", name: "Magdolna Dank", role: "Director-General and Chief Physician, National Institute of Oncology, Budapest", institutionId: "noi-budapest", specialisms: ["Clinical oncology", "Medical oncology", "Cancer centre management"],
    tldr: "Hungarian oncologist who is Director-General of the National Institute of Oncology in Budapest, Hungary's national cancer centre.",
    summary: "Professor Magdolna Dank is Director-General and Chief Physician (Foigazgato Foorvos) of the National Institute of Oncology (Orszagos Onkologiai Intezet) in Budapest, Hungary's national comprehensive cancer centre. She heads a directorate that includes a medical director, a scientific director and a nursing director. Her welcome message on the institute's home page introduces her in the role of Director-General.",
    profiles: [{ label: "Institute directors page", url: "https://onkol.hu/igazgatok/" }, { label: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/?term=Dank+M%5BAuthor%5D" }],
    links: [{ label: "Source: National Institute of Oncology directors page", url: "https://onkol.hu/igazgatok/" }],
    tags: ["leadership", "clinician-scientist", "medical-oncology"], cancers: [] }),

  // =================== Nationwide Children's Hospital ===================
  p({ id: "timothy-robinson", name: "Timothy Robinson", role: "Chief Executive Officer, Nationwide Children's Hospital", institutionId: "nationwide-childrens", specialisms: ["Hospital management", "Paediatric health systems", "Finance"],
    tldr: "Chief Executive of Nationwide Children's Hospital in Columbus, Ohio, a large paediatric health system with a major childhood cancer programme.",
    summary: "Timothy Robinson is Chief Executive Officer of Nationwide Children's Hospital in Columbus, Ohio, a paediatric health system that includes the Abigail Wexner Research Institute and the Nationwide Children's Hospital Foundation. He became CEO on 1 July 2019 after serving as executive vice president and chief financial officer. The hospital describes his financial leadership as central to its growth into a preeminent paediatric health care system.",
    profiles: [{ label: "Nationwide Children's leadership page", url: "https://www.nationwidechildrens.org/about-us/who-we-are/leadership" }],
    links: [{ label: "Source: Nationwide Children's executive leadership page", url: "https://www.nationwidechildrens.org/about-us/who-we-are/leadership" }],
    tags: ["leadership", "paediatric", "hospital-management"], cancers: [] }),

  // =================== NCI Center for Cancer Research (intramural programme) ===================
  p({ id: "senthil-muthuswamy", name: "Senthil K. Muthuswamy", role: "Director, Center for Cancer Research, National Cancer Institute", institutionId: "nci-ccr", specialisms: ["Cancer cell biology", "Organoid models", "Breast and pancreatic cancer"],
    tldr: "Cancer biologist who directs the National Cancer Institute's Center for Cancer Research, the large intramural research programme in Bethesda.",
    summary: "Senthil K. Muthuswamy is Director of the Center for Cancer Research (CCR), the intramural research programme of the US National Cancer Institute, and a Senior Investigator in its Laboratory of Cancer Biology and Genetics. He pioneered three dimensional organoid culture and co-culture methods for mechanistic, translational and co-clinical studies, and his laboratory defined roles for cell polarity proteins in cancer biology and therapy resistance. His research interests include metastasis, breast and pancreatic cancer and cancer immunotherapy.",
    profiles: [{ label: "CCR staff profile", url: "https://ccr.cancer.gov/staff-directory/senthil-k-muthuswamy" }, { label: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/?term=Muthuswamy+SK%5BAuthor%5D" }],
    links: [{ label: "Source: CCR Office of the Director leadership page", url: "https://ccr.cancer.gov/about/office-of-the-director" }],
    tags: ["leadership", "clinician-scientist", "cancer-biology", "organoids"], cancers: ["pancreatic", "breast-hr-positive"] }),

  // =================== Nordic Lymphoma Group ===================
  p({ id: "sirpa-leppa", name: "Sirpa Leppä", role: "Chairperson, Nordic Lymphoma Group", institutionId: "nordic-lymphoma-group", specialisms: ["Lymphoma", "Medical oncology", "Clinical trials"],
    tldr: "Helsinki oncologist who chairs the Nordic Lymphoma Group, the cooperative network that runs lymphoma trials and guidelines across the Nordic countries.",
    summary: "Sirpa Leppä is Chairperson of the Nordic Lymphoma Group (NLG), the cooperative group of Nordic haematologists and oncologists that develops lymphoma guidelines and protocols and runs multicentre trials. She works in the Department of Oncology at Helsinki University Hospital, Finland. The NLG coordinating group she chairs includes representatives from Finland, Norway, Sweden and Denmark, with Alexander Fosså of Oslo University Hospital as vice-chairman.",
    profiles: [{ label: "NLG coordinating group", url: "https://www.nordic-lymphoma.org/coordinating-group/" }, { label: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/?term=Lepp%C3%A4+S%5BAuthor%5D" }],
    links: [{ label: "Source: Nordic Lymphoma Group coordinating group page", url: "https://www.nordic-lymphoma.org/coordinating-group/" }],
    tags: ["leadership", "clinician-scientist", "lymphoma", "cooperative-group"], cancers: ["dlbcl", "hodgkin-lymphoma"] }),

  // =================== Northwell Health Cancer Institute ===================
  p({ id: "richard-barakat", name: "Richard Barakat", role: "Physician-in-Chief and Executive Director, Northwell Cancer Institute", institutionId: "northwell-cancer-institute", specialisms: ["Surgical oncology", "Cancer service line leadership", "Health system oncology"],
    tldr: "Physician-in-Chief and Executive Director of the Northwell Cancer Institute, the cancer service of New York's largest health system.",
    summary: "Richard Barakat, MD, MBA, is Physician-in-Chief and Executive Director of the Northwell Cancer Institute, the cancer programme of Northwell Health, which spans hospitals and cancer centres across New York and Connecticut. In that capacity he announced the September 2026 appointment of a system director of central nervous system cancer and described the institute's aim of connecting laboratory discovery with patient care. Institute leadership also includes a deputy physician-in-chief and director of medical oncology.",
    profiles: [{ label: "Northwell news release naming role", url: "https://www.northwell.edu/news/the-latest/northwell-appoints-system-director-central-nervous-system-cancer" }, { label: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/?term=Barakat+RR%5BAuthor%5D" }],
    links: [{ label: "Source: Northwell Health news release, September 2026", url: "https://www.northwell.edu/news/the-latest/northwell-appoints-system-director-central-nervous-system-cancer" }],
    tags: ["leadership", "clinician-scientist", "health-system"], cancers: [] }),

  // =================== Ocean Road Cancer Institute ===================
  p({ id: "diwani-msemo", name: "Diwani Msemo", role: "Executive Director, Ocean Road Cancer Institute", institutionId: "ocean-road-cancer-institute", specialisms: ["Cancer services in Tanzania", "Radiotherapy access", "Health system leadership"],
    tldr: "Executive Director of the Ocean Road Cancer Institute, Tanzania's national cancer hospital in Dar es Salaam.",
    summary: "Dr Diwani Msemo leads the Ocean Road Cancer Institute (ORCI), Tanzania's national specialised cancer institute in Dar es Salaam. In August 2026 he announced that ORCI would begin offering major cancer surgery in October, ending the need to refer patients to other national hospitals for operations before returning for radiotherapy or chemotherapy. He also reported the installation of a PET scanner at ORCI, described as the first in East and Central Africa.",
    profiles: [{ label: "Daily News (Tanzania) report", url: "https://dailynews.co.tz/orci-set-to-begin-major-cancer-surgery/" }],
    links: [{ label: "Source: Daily News Tanzania, ORCI set to begin major cancer surgery (August 2026)", url: "https://dailynews.co.tz/orci-set-to-begin-major-cancer-surgery/" }],
    tags: ["leadership", "clinician-scientist", "africa", "global-oncology"], cancers: [] }),

  // =================== Olivia Newton-John Cancer Wellness and Research Centre ===================
  p({ id: "marco-herold", name: "Marco Herold", role: "Chief Executive Officer, Olivia Newton-John Cancer Research Institute", institutionId: "onj-cancer-centre", specialisms: ["Blood cancer", "Cancer immunotherapy", "CRISPR genome editing"],
    tldr: "Cancer biologist who leads the Olivia Newton-John Cancer Research Institute, the research arm of the Olivia Newton-John Cancer Wellness and Research Centre in Melbourne.",
    summary: "Professor Marco Herold is Chief Executive Officer of the Olivia Newton-John Cancer Research Institute (ONJCRI), the research institute embedded in the Olivia Newton-John Cancer Wellness and Research Centre, an Austin Health comprehensive cancer service in Heidelberg, Melbourne. He also heads the Blood Cancer and Immunotherapy Laboratory and La Trobe University's School of Cancer Medicine, and joined ONJCRI in 2023 from the Walter and Eliza Hall Institute. His research applies genome wide CRISPR screening to find drug resistance factors and targets that enhance immune therapies.",
    profiles: [{ label: "ONJCRI profile", url: "https://www.onjcri.org.au/about/marco-herold/" }, { label: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/?term=Herold+MJ%5BAuthor%5D" }],
    links: [{ label: "Source: ONJCRI our people page", url: "https://www.onjcri.org.au/our-people/" }],
    tags: ["leadership", "clinician-scientist", "immunotherapy", "genome-editing"], cancers: [] }),

  // =================== Osaka International Cancer Institute ===================
  p({ id: "nariaki-matsuura", name: "Nariaki Matsuura", role: "President (Socho), Osaka International Cancer Institute", institutionId: "osaka-international-cancer-institute", specialisms: ["Cancer centre management", "Pathology", "Cancer medicine"],
    tldr: "President of the Osaka International Cancer Institute, the Osaka prefectural cancer centre that relocated to a new hospital in central Osaka in 2017.",
    summary: "Nariaki Matsuura (Matsuura Nariaki) is President (Socho) of the Osaka International Cancer Institute, the Osaka Prefectural Hospital Organization's cancer centre, which was founded in 1959 as the Osaka Prefectural Adult Disease Centre and took its current name on moving to Otemae, Osaka, in 2017. In his greeting he describes the institute's aims of delivering the best available treatment, developing new therapies and supporting patients' quality of life under the philosophy of advanced cancer care based on the patient's perspective. The institute is a designated prefectural cancer care hub and a cancer genomic medicine hub hospital.",
    profiles: [{ label: "Institute overview and president's greeting (Japanese)", url: "https://oici.jp/center/outline/overview/" }, { label: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/?term=Matsuura+Nariaki%5BAuthor%5D" }],
    links: [{ label: "Source: Osaka International Cancer Institute centre overview page", url: "https://oici.jp/center/outline/overview/" }],
    tags: ["leadership", "clinician-scientist", "japan"], cancers: [] }),

  // =================== Oxford Cancer, Oxford University Hospitals and University of Oxford ===================
  p({ id: "mark-middleton", name: "Mark Middleton", role: "Director, Oxford Cancer (co-director with Tim Elliott and Adam Mead)", institutionId: "oxford-cancer", specialisms: ["Experimental cancer medicine", "Melanoma", "Upper gastrointestinal cancer", "Early phase trials"],
    tldr: "Medical oncologist who co-directs Oxford Cancer, the city-wide partnership between the University of Oxford and Oxford University Hospitals.",
    summary: "Mark Middleton is one of three Directors of Oxford Cancer, the network and partnership between the University of Oxford and Oxford University Hospitals NHS Trust, alongside Tim Elliott and Adam Mead, and he co-chairs its Governance Board. He is Head of the Department of Oncology, Professor of Experimental Cancer Medicine and a Consultant Medical Oncologist at the Oxford Cancer and Haematology Centre, working on early phase, melanoma and upper gastrointestinal cancer trials. He trained at Cambridge, Oxford and the Christie Hospital and has been chief or principal investigator on more than 100 trials.",
    profiles: [{ label: "Department of Oncology profile", url: "https://www.oncology.ox.ac.uk/team/mark-middleton" }, { label: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/?term=Middleton+MR%5BAuthor%5D" }],
    links: [{ label: "Source: Oxford Cancer, Our Team", url: "https://www.cancer.ox.ac.uk/about/our-team" }],
    tags: ["leadership", "clinician-scientist", "medical-oncology", "early-phase-trials"], cancers: ["melanoma", "gastric", "esophageal"] }),
  // =================== Advanced Research Projects Agency for Health ===================
  p({ id: "alicia-jackson", name: "Alicia Jackson", role: "Director of the Advanced Research Projects Agency for Health", institutionId: "arpa-h", specialisms: ["Biomedical research funding", "Biotechnology", "Women's health"],
    tldr: "Materials scientist and biotechnology founder who directs ARPA-H, the United States agency that funds high-risk, high-reward health research programmes.",
    summary: "Alicia Jackson is Director of the Advanced Research Projects Agency for Health (ARPA-H), the United States government agency that funds high-risk, high-reward biomedical research. She holds a PhD in materials science from MIT and previously served as a Program Manager and Deputy Director of DARPA's Biological Technologies Office, where she guided an investment portfolio across biodefence, novel medicine development and biomanufacturing. She founded and led Evernow, a company focused on women's health during menopause, and co-founded or advised several biotechnology start-ups.",
    profiles: [{ label: "Institution profile", url: "https://arpa-h.gov/about/people/alicia-jackson" }],
    links: [{ label: "Source: ARPA-H Our People page", url: "https://arpa-h.gov/about/people" }],
    tags: ["leadership", "government", "research-funding"], cancers: [] }),

  // =================== Agência Nacional de Vigilância Sanitária ===================
  p({ id: "leandro-pinheiro-safatle", name: "Leandro Pinheiro Safatle", role: "Diretor-Presidente (Director-President) of Anvisa", institutionId: "anvisa", specialisms: ["Health regulation", "Medicines regulation", "Public health policy"],
    tldr: "Director-President of Anvisa, the Brazilian health regulatory agency that authorises medicines, including cancer treatments, for the Brazilian market.",
    summary: "Leandro Pinheiro Safatle is Diretor-Presidente of the Agência Nacional de Vigilância Sanitária (Anvisa), Brazil's federal health regulatory agency, created by law 9.782 of January 1999. He heads the agency's Diretoria Colegiada, the collegiate board that takes regulatory decisions on medicines, medical devices and other health products. His official page on the Anvisa site lists him in the role with the contact details of the presidency office.",
    profiles: [{ label: "Institution profile", url: "https://www.gov.br/anvisa/pt-br/composicao/diretor-presidente/antonio-barra-torres" }],
    links: [{ label: "Source: Anvisa Diretor-Presidente page", url: "https://www.gov.br/anvisa/pt-br/composicao/diretor-presidente" }],
    tags: ["leadership", "regulator", "government"], cancers: [] }),

  // =================== Aichi Cancer Center ===================
  p({ id: "yasumasa-niwa", name: "Yasumasa Niwa", role: "Hospital Director, Aichi Cancer Center Hospital", institutionId: "aichi-cancer-center", specialisms: ["Cancer hospital leadership", "Oncology", "Hospital management"],
    tldr: "Physician who leads Aichi Cancer Center Hospital, the 500-bed prefectural cancer hospital in Nagoya, Japan, as its hospital director.",
    summary: "Yasumasa Niwa (丹羽康正) is listed as Hospital Director (病院長) of Aichi Cancer Center Hospital, the prefectural cancer hospital of Aichi Prefecture in Chikusa, Nagoya. The hospital opened in December 1964, has 500 general beds and offers internal medicine, surgery, orthopaedics, neurosurgery, dermatology, urology, gynaecology, ophthalmology, otolaryngology, radiology, anaesthesiology and dentistry. The centre's own website could not be reached, so this record relies on the Japanese Wikipedia article and gives no start date.",
    profiles: [{ label: "Wikipedia (Japanese)", url: "https://ja.wikipedia.org/wiki/%E6%84%9B%E7%9F%A5%E7%9C%8C%E3%81%8C%E3%82%93%E3%82%BB%E3%83%B3%E3%82%BF%E3%83%BC" }],
    links: [{ label: "Source: Japanese Wikipedia article on Aichi Cancer Center", url: "https://ja.wikipedia.org/wiki/%E6%84%9B%E7%9F%A5%E7%9C%8C%E3%81%8C%E3%82%93%E3%82%BB%E3%83%B3%E3%82%BF%E3%83%BC" }],
    tags: ["leadership", "clinician-scientist", "hospital"], cancers: [] }),

  // =================== American Society of Hematology ===================
  p({ id: "robert-negrin", name: "Robert Negrin", role: "President of the American Society of Hematology (2026)", institutionId: "ash", specialisms: ["Haematology", "Blood and marrow transplantation", "Cellular therapy"],
    tldr: "Stanford transplant physician and cellular immunologist who is President of the American Society of Hematology for 2026.",
    summary: "Robert Negrin is President of the American Society of Hematology (ASH) for the 2026 term, serving alongside President-Elect Cindy E. Dunbar and Vice President Alison Loren on the Executive Committee of the professional society for clinicians and scientists in haematology, including blood cancers. He is Professor of Medicine (Blood and Marrow Transplantation and Cellular Therapy) at Stanford University, where he chaired the Division of Blood and Marrow Transplantation from 2000 to 2020. His laboratory studies graft versus host and graft versus tumour reactions, regulatory T cell therapy to prevent complications after transplantation, and expansion of cytotoxic cells for immunotherapy.",
    profiles: [{ label: "Stanford profile", url: "https://profiles.stanford.edu/robert-negrin" }, { label: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/?term=Negrin+RS%5BAuthor%5D" }],
    links: [{ label: "Source: ASH Executive Committee page", url: "https://www.hematology.org/about/governance/executive-committee" }],
    tags: ["leadership", "clinician-scientist", "haematology", "society"], cancers: [] }),

  // =================== Arc Institute ===================
  p({ id: "silvana-konermann", name: "Silvana Konermann", role: "Executive Director and Core Investigator, Arc Institute", institutionId: "arc-institute", specialisms: ["Functional genomics", "CRISPR technologies", "Neurodegeneration"],
    tldr: "Neuroscientist and co-founder who runs the Arc Institute, an independent research institute in the San Francisco Bay Area built to tackle complex diseases.",
    summary: "Silvana Konermann is Co-Founder, Executive Director and a Core Investigator of the Arc Institute, an independent research institute she started with Patrick Hsu and Patrick Collison after the three collaborated on Fast Grants. She is also Assistant Professor of Biochemistry at Stanford, holds a PhD in neuroscience from MIT, and has been a Chan Zuckerberg Biohub Investigator and a Hanna Gray Fellow of the Howard Hughes Medical Institute. Her laboratory uses CRISPR-based transcriptome engineering and functional genomic screens in brain cell models to uncover the molecular pathways behind Alzheimer's disease and other neurodegenerative disorders.",
    profiles: [{ label: "Institution profile", url: "https://arcinstitute.org/labs/konermannlab" }, { label: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/?term=Konermann+S%5BAuthor%5D" }],
    links: [{ label: "Source: Arc Institute About page", url: "https://arcinstitute.org/about" }],
    tags: ["leadership", "clinician-scientist", "genomics", "research-institute"], cancers: [] }),

  // =================== ARCAGY-GINECO ===================
  p({ id: "sebastien-armanet", name: "Sébastien Armanet", role: "Directeur Général (Director General) of ARCAGY-GINECO", institutionId: "arcagy-gineco", specialisms: ["Clinical research operations", "Gynaecological oncology trials", "Academic cooperative groups"],
    tldr: "Director General who runs the operational team of ARCAGY-GINECO, the French non-profit academic research group for gynaecological and metastatic breast cancers.",
    summary: "Sébastien Armanet is Directeur Général of ARCAGY-GINECO, an independent, non-profit academic cooperative group founded more than 30 years ago that runs clinical and translational research in gynaecological cancers and metastatic breast cancer. He leads its operational structure of about 45 staff, organised into clinical operations, quality assurance and regulatory affairs, translational research with a biological resource centre, administration and communication, and a medical unit. The association's board is chaired by President Marc Oberlis, with Alain Dormoy as treasurer, Bernard Poletto as secretary, and GINECO scientific committee members Anne-Claire Hardy-Bessard, Fabrice Lecuru and Bernard Asselain.",
    profiles: [{ label: "Institution profile", url: "https://arcagy.org/fr/page/50-organisation-d-arcagy.html" }],
    links: [{ label: "Source: ARCAGY organisation page", url: "https://arcagy.org/fr/page/50-organisation-d-arcagy.html" }],
    tags: ["leadership", "clinical-trials", "cooperative-group"], cancers: ["ovarian", "endometrial", "cervical"] }),

  // =================== BC Cancer ===================
  p({ id: "paris-ann-ingledew", name: "Paris-Ann Ingledew", role: "Executive Vice President and Chief Medical Officer, BC Cancer", institutionId: "bc-cancer", specialisms: ["Radiation oncology", "Medical education", "Health leadership"],
    tldr: "Radiation oncologist and educator who is the executive lead for BC Cancer, the provincial cancer agency of British Columbia, Canada.",
    summary: "Paris-Ann Ingledew is Executive Vice President and Chief Medical Officer of BC Cancer, the provincial cancer programme within the Provincial Health Services Authority of British Columbia. A radiation oncologist, she has held leadership roles across BC Cancer's regional centres, including department head of radiation oncology at BC Cancer Vancouver, and is past president of BC Cancer's Medical Dental Staff Association. She holds a master's degree in health professions education, is a clinical professor at the University of British Columbia and chairs the Royal College specialty committee for radiation oncology.",
    profiles: [{ label: "PHSA executive team", url: "http://www.phsa.ca/about/leadership/phsa-executive" }, { label: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/?term=Ingledew+PA%5BAuthor%5D" }],
    links: [{ label: "Source: PHSA executive leadership page", url: "http://www.phsa.ca/about/leadership/phsa-executive" }],
    tags: ["leadership", "clinician-scientist", "radiation-oncology"], cancers: [] }),

  // =================== Butaro Cancer Center of Excellence ===================
  p({ id: "nadine-karema", name: "Nadine Karema", role: "Executive Director, Partners In Health Rwanda (Inshuti Mu Buzima)", institutionId: "butaro-cancer-center", specialisms: ["Global health delivery", "Health systems strengthening", "Non-profit leadership"],
    tldr: "Executive Director of Partners In Health Rwanda, the organisation whose programme in northern Rwanda includes the Butaro Cancer Center of Excellence.",
    summary: "Nadine Karema is Executive Director of Partners In Health Rwanda, known locally as Inshuti Mu Buzima, the Rwandan arm of Partners In Health. The organisation supports district health programmes in Burera, Kirehe and Kayonza and the Butaro Cancer Center of Excellence, which Partners In Health describes as a centre for cancer care and medical education in East Africa. She leads an executive team that includes chief officers for policy and partnerships, finance, operations and human resources.",
    profiles: [{ label: "Institution profile", url: "https://pihrwanda.org/about-us/our-team" }],
    links: [{ label: "Source: PIH Rwanda team page", url: "https://pihrwanda.org/about-us/our-team" }],
    tags: ["leadership", "global-oncology", "non-profit"], cancers: [] }),

  // =================== Canadian Cancer Society ===================
  p({ id: "andrea-seale", name: "Andrea Seale", role: "Chief Executive Officer, Canadian Cancer Society", institutionId: "canadian-cancer-society", specialisms: ["Charity leadership", "Cancer advocacy", "Support programmes and fundraising"],
    tldr: "Chief executive of the Canadian Cancer Society, the national charity that funds cancer research, advocates on policy and runs support services across Canada.",
    summary: "Andrea Seale is Chief Executive Officer of the Canadian Cancer Society, the national cancer charity that funds research, delivers cancer support and prevention programmes, and advocates on public policy. She leads an executive team that includes Catalina Lopez-Correa as Executive Vice President of Research, Sandra Krueckl as Executive Vice President of Mission Services, and Riaz Kara as Executive Vice President of Advocacy and Policy.",
    profiles: [{ label: "Institution profile", url: "https://cancer.ca/en/about-us/our-people" }],
    links: [{ label: "Source: Canadian Cancer Society Our People page", url: "https://cancer.ca/en/about-us/our-people" }],
    tags: ["leadership", "charity", "advocacy"], cancers: [] }),

  // =================== Cancer Care Alberta (Alberta Health Services) ===================
  p({ id: "brenda-hubley", name: "Brenda Hubley", role: "Chair and Managing Director, Cancer Care Alberta", institutionId: "cancer-care-alberta", specialisms: ["Radiation therapy", "Cancer programme leadership", "Health services management"],
    tldr: "Radiation therapist turned health executive who leads Cancer Care Alberta, the provincial cancer programme for Alberta, Canada.",
    summary: "Brenda Hubley is Chair and Managing Director of Cancer Care Alberta, the organisation responsible for cancer services across the province of Alberta. She has a clinical background as a radiation therapist and more than 30 years in health care, with senior leadership roles in cancer programmes at large academic centres and in rural and community settings. She previously served as Chief Program Officer for Cancer Care Alberta within Alberta Health Services.",
    profiles: [{ label: "Institution profile", url: "https://www.cancercarealberta.ca/" }],
    links: [{ label: "Source: Cancer Care Alberta homepage", url: "https://www.cancercarealberta.ca/" }],
    tags: ["leadership", "health-system", "radiation-therapy"], cancers: [] }),

  // =================== Cancer Council Australia ===================
  p({ id: "jacinta-reddan", name: "Jacinta Reddan", role: "Chief Executive Officer, Cancer Council Australia", institutionId: "cancer-council-australia", specialisms: ["Non-profit leadership", "Public health advocacy", "Stakeholder engagement"],
    tldr: "Chief executive of Cancer Council Australia, the national body of Australia's state and territory cancer councils, which leads cancer control advocacy and research funding.",
    summary: "Jacinta Reddan is Chief Executive Officer of Cancer Council Australia, the national organisation that brings together the state and territory Cancer Councils. She brings leadership experience across financial services, defence, tourism, public health and infrastructure in Australia and the Asia-Pacific region, and previously held an advocacy leadership role covering Far North Queensland. She holds a degree in international relations and anthropology from Deakin University, a public health qualification from HarvardX, and is a Graduate of the Australian Institute of Company Directors.",
    profiles: [{ label: "Institution profile", url: "https://www.cancer.org.au/about-us/about-cancer-council/australia/ceo" }],
    links: [{ label: "Source: Cancer Council Australia CEO page", url: "https://www.cancer.org.au/about-us/about-cancer-council/australia/ceo" }],
    tags: ["leadership", "charity", "advocacy"], cancers: [] }),

  // =================== Cancer Institute of Iran, Imam Khomeini Hospital Complex ===================
  p({ id: "seyed-rouhollah-miri", name: "Seyed Rouhollah Miri", role: "Head of the Cancer Institute, Imam Khomeini Hospital Complex", institutionId: "tehran-cancer-institute", specialisms: ["Surgical oncology", "Cancer surgery", "Cancer hospital leadership"],
    tldr: "Surgical oncologist who heads the Cancer Institute of Iran at Tehran's Imam Khomeini Hospital Complex, the country's oldest dedicated cancer institute.",
    summary: "Seyed Rouhollah Miri, a subspecialist in cancer surgery, is Head of the Cancer Institute at the Imam Khomeini Hospital Complex of Tehran University of Medical Sciences, with Leila Torkzadeh, who holds a doctorate in health policy, as its manager. The institute is one of the complex's hospitals on the eastern side of the campus, and its site describes a hospital cancer registry office set up in 1997, a Cancer Research Centre that grew out of that registry, and a Radiation Oncology Research Centre approved in 2014. The institute page lists seven outpatient and seven inpatient operating room beds.",
    profiles: [{ label: "Institution page (Persian)", url: "https://ikhc.tums.ac.ir/%D8%A8%DB%8C%D9%85%D8%A7%D8%B1%D8%B3%D8%AA%D8%A7%D9%86-%D8%A7%D9%86%D8%B3%D8%AA%DB%8C%D8%AA%D9%88-%DA%A9%D8%A7%D9%86%D8%B3%D8%B1" }, { label: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/?term=Miri+SR%5BAuthor%5D" }],
    links: [{ label: "Source: IKHC Cancer Institute hospital page", url: "https://ikhc.tums.ac.ir/%D8%A8%DB%8C%D9%85%D8%A7%D8%B1%D8%B3%D8%AA%D8%A7%D9%86-%D8%A7%D9%86%D8%B3%D8%AA%DB%8C%D8%AA%D9%88-%DA%A9%D8%A7%D9%86%D8%B3%D8%B1" }],
    tags: ["leadership", "clinician-scientist", "surgical-oncology"], cancers: [] }),
  // =================== Instituto Nacional de Cancerología (Mexico) ===================
  p({ id: "oscar-arrieta-rodriguez", name: "Óscar Gerardo Arrieta Rodríguez", role: "Director General of the Instituto Nacional de Cancerología (INCan)", institutionId: "incan-mexico", specialisms: ["Medical oncology", "Thoracic oncology", "Translational research"],
    tldr: "Medical oncologist specialising in lung cancer who directs Mexico's national cancer institute, INCan, in Mexico City.",
    summary: "Óscar Gerardo Arrieta Rodríguez is Director General of the Instituto Nacional de Cancerología (INCan), Mexico's national cancer institute and one of the country's National Institutes of Health. He is a medical oncologist and researcher with a longstanding interest in translational research in thoracic oncology, and he founded and led INCan's Thoracic Oncology Unit before his appointment. He was designated Director General in 2023 for the 2023 to 2028 term and was named in that role in a Ministry of Health press release marking the institute's 79th anniversary in November 2025.",
    profiles: [{ label: "Institution directory", url: "https://incan.salud.gob.mx/directorio/direccion-general" }, { label: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/?term=Arrieta+O%5BAuthor%5D+AND+Cancerologia" }],
    links: [{ label: "Source: Mexican Ministry of Health press release, November 2025", url: "https://www.gob.mx/salud/prensa/225-instituto-nacional-de-cancerologia-cumple-79-anos-con-avances-tecnologicos-y-mayor-capacidad-de-atencion" }],
    tags: ["leadership", "clinician-scientist", "thoracic-oncology"], cancers: ["nsclc"] }),

  // =================== Instituto Nacional de Enfermedades Neoplásicas ===================
  p({ id: "francisco-berrospi-espinoza", name: "Francisco Berrospi Espinoza", role: "Jefe Institucional (Institutional Head) of INEN", institutionId: "inen-peru", specialisms: ["Surgical oncology", "Hepato-pancreato-biliary surgery", "Gastrointestinal cancer surgery"],
    tldr: "Cancer surgeon who heads Peru's national cancer institute, INEN, after more than two decades as an abdominal surgeon there.",
    summary: "Francisco Berrospi Espinoza is Jefe Institucional of the Instituto Nacional de Enfermedades Neoplásicas (INEN), Peru's national cancer institute in Lima. He trained in medicine at the Universidad Nacional de Trujillo, specialised in general and oncological surgery at the Universidad Peruana Cayetano Heredia and holds a master's degree in health services management from ESAN. He has been an attending surgeon in INEN's Abdominal Surgery Department since 2000 and previously directed the institute's surgery department; his clinical focus is gastrointestinal and hepato-pancreato-biliary cancer surgery. He was designated Jefe Institucional by Resolución Suprema 016-2022-SA in August 2022.",
    profiles: [{ label: "Institution profile", url: "https://portal.inen.sld.pe/jefatura-institucional/" }, { label: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/?term=Berrospi+F%5BAuthor%5D" }],
    links: [{ label: "Source: INEN Jefatura Institucional page", url: "https://portal.inen.sld.pe/jefatura-institucional/" }],
    tags: ["leadership", "clinician-scientist", "surgical-oncology"], cancers: ["gastric", "hcc", "pancreatic"] }),

  // =================== Instituto Português de Oncologia de Lisboa Francisco Gentil ===================
  p({ id: "carla-goncalo", name: "Carla Gonçalo", role: "Presidente do Conselho de Administração (Chair of the Board of Directors) of IPO Lisboa", institutionId: "ipo-lisboa", specialisms: ["Health services management", "Hospital governance", "Public health administration"],
    tldr: "Health manager who chairs the board of IPO Lisboa, the Portuguese Oncology Institute in Lisbon, since the board took office in 2025.",
    summary: "Carla Gonçalo is Presidente do Conselho de Administração of the Instituto Português de Oncologia de Lisboa Francisco Gentil (IPO Lisboa), the public oncology hospital that serves as the cancer reference centre for the Lisbon region. She is a health manager who previously sat on the management council of the Executive Directorate of Portugal's National Health Service (SNS) and earlier served as vice-president of the Central Administration of the Health System (ACSS). The current board was appointed by Resolução do Conselho de Ministros n.º 60/2025, published on 18 March 2025, for a three-year term.",
    profiles: [{ label: "Institution news: new board announced", url: "https://www.ipolisboa.min-saude.pt/noticias/ipo-lisboa-tem-nova-administracao/" }, { label: "Institution governance page", url: "https://www.ipolisboa.min-saude.pt/ipo/governacao/" }],
    links: [{ label: "Source: IPO Lisboa news, new administration", url: "https://www.ipolisboa.min-saude.pt/noticias/ipo-lisboa-tem-nova-administracao/" }],
    tags: ["leadership", "health-management"], cancers: [] }),

  // =================== Instituto Português de Oncologia do Porto Francisco Gentil ===================
  p({ id: "julio-oliveira", name: "Júlio Oliveira", role: "Presidente do Conselho de Administração (Chair of the Board of Directors) of IPO Porto", institutionId: "ipo-porto", specialisms: ["Medical oncology", "Cancer centre management", "Clinical research"],
    tldr: "Medical oncologist who chairs the board of IPO Porto, the public cancer hospital serving northern Portugal, since 2022.",
    summary: "Júlio Oliveira is Presidente do Conselho de Administração of the Instituto Português de Oncologia do Porto Francisco Gentil (IPO Porto), the National Health Service oncology hospital that is the reference cancer centre for northern Portugal. A medical oncologist, he has chaired the board since it took office in October 2022 and was reappointed for a further three-year term in 2026. In 2024 he was elected to the board of the Organisation of European Cancer Institutes (OECI) as Executive Secretary for the 2024 to 2027 term, and in 2025 he led the creation of an association to promote clinical research at the institute.",
    profiles: [{ label: "Institution news: elected to OECI board", url: "https://www.ipoporto.pt/presidente-do-ipo-porto-eleito-para-a-nova-direcao-da-oeci/" }],
    links: [{ label: "Source: IPO Porto news on clinical research association, May 2025", url: "https://www.ipoporto.pt/ipo-porto-cria-associacao-para-impusionar-a-investigacao-clinica/" }],
    tags: ["leadership", "clinician-scientist", "medical-oncology"], cancers: [] }),

  // =================== Intermountain Health Cancer Center ===================
  p({ id: "derrick-haslem", name: "Derrick S. Haslem", role: "Senior Medical Director of the Oncology Clinical Program, Intermountain Health", institutionId: "intermountain-cancer", specialisms: ["Medical oncology", "Breast cancer", "Cancer genomics and targeted therapy", "Tele-oncology"],
    tldr: "Medical oncologist who leads the oncology clinical programme across Intermountain Health's cancer centres in Utah and neighbouring states.",
    summary: "Derrick S. Haslem is Senior Medical Director of the Oncology Clinical Program at Intermountain Health, the not-for-profit health system whose cancer centres span Utah and surrounding states. He is a board-certified medical oncologist with expertise in targeted therapy, genomics and breast cancer, and completed his haematology and oncology fellowship at Huntsman Cancer Hospital, University of Utah, in 2009. He practises at Intermountain cancer centres in St George, Murray and Logan and has expanded rural access to cancer care through tele-oncology services in Utah, Idaho and Wyoming.",
    profiles: [{ label: "Institution profile", url: "https://doctors.intermountainhealth.org/provider/derrick-s-haslem/2556921" }, { label: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/?term=Haslem+DS%5BAuthor%5D" }],
    links: [{ label: "Source: Intermountain Health provider profile", url: "https://doctors.intermountainhealth.org/provider/derrick-s-haslem/2556921" }],
    tags: ["leadership", "clinician-scientist", "medical-oncology", "tele-oncology"], cancers: ["breast-hr-positive", "breast-her2-positive", "tnbc"] }),

  // =================== International Extranodal Lymphoma Study Group ===================
  p({ id: "franco-cavalli", name: "Franco Cavalli", role: "President of the Board, International Extranodal Lymphoma Study Group", institutionId: "ielsg", specialisms: ["Medical oncology", "Lymphoma", "International clinical trials"],
    tldr: "Swiss oncologist who presides over the board of the international study group that runs clinical trials in lymphomas arising outside the lymph nodes.",
    summary: "Franco Cavalli, of Bellinzona, Switzerland, is President of the Board of the International Extranodal Lymphoma Study Group (IELSG), a not-for-profit association founded in 1998 that brings together medical oncologists, haematologists, imaging specialists, pathologists, biologists and biostatisticians to conduct clinical and translational studies in extranodal lymphomas. The board he chairs includes representatives of national lymphoma cooperative groups from Europe, North America, Australia and China; Emanuele Zucca serves as IELSG Scientific and Medical Director.",
    profiles: [{ label: "IELSG Board of Directors", url: "https://ielsg.org/site/about-us/board-of-directors/" }, { label: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/?term=Cavalli+F%5BAuthor%5D+AND+lymphoma" }],
    links: [{ label: "Source: IELSG Board of Directors page", url: "https://ielsg.org/site/about-us/board-of-directors/" }],
    tags: ["leadership", "clinician-scientist", "lymphoma", "clinical-trials"], cancers: ["dlbcl"] }),

  // =================== International Society for Quality of Life Research ===================
  p({ id: "sandra-nolte", name: "Sandra Nolte", role: "President (2025-2027), International Society for Quality of Life Research", institutionId: "isoqol", specialisms: ["Health-related quality of life", "Patient-reported outcomes", "Outcomes research"],
    tldr: "Monash University researcher who is President of the international society for health-related quality of life research for the 2025 to 2027 term.",
    summary: "Sandra Nolte, PhD, of Monash University in Victoria, Australia, is President of the International Society for Quality of Life Research (ISOQOL) for the 2025 to 2027 term. ISOQOL describes itself as a global community of researchers, clinicians, health care professionals, industry professionals, consultants and patient research partners advancing health-related quality of life research. Her presidency coincides with the society's 2025 to 2027 governance restructure.",
    profiles: [{ label: "ISOQOL leadership page", url: "https://www.isoqol.org/who-we-are/" }, { label: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/?term=Nolte+S%5BAuthor%5D+AND+quality+of+life" }],
    links: [{ label: "Source: ISOQOL Who We Are page", url: "https://www.isoqol.org/who-we-are/" }],
    tags: ["leadership", "clinician-scientist", "quality-of-life", "patient-reported-outcomes"], cancers: [] }),

  // =================== IRCCS Istituto Romagnolo per lo Studio dei Tumori 'Dino Amadori' (IRST) ===================
  p({ id: "cristina-marchesi", name: "Cristina Marchesi", role: "Direttrice Generale (General Director) of IRST 'Dino Amadori' IRCCS", institutionId: "irst-meldola", specialisms: ["Healthcare management", "Public health and preventive medicine", "Hospital and community care integration"],
    tldr: "Physician and health service manager who has been General Director of the Romagna cancer institute IRST in Meldola since July 2025.",
    summary: "Cristina Marchesi is Direttrice Generale of the IRCCS Istituto Romagnolo per lo Studio dei Tumori 'Dino Amadori' (IRST), the national reference cancer institute for care, research and training based in Meldola with sites in Forlì, Cesena and Ravenna, part of the Emilia-Romagna regional health service. A physician who qualified in 1985 and specialised in hygiene and preventive medicine, she was General Director of the AUSL-IRCCS of Reggio Emilia from 2020 to January 2025 and has been vice-president of FIASO, the Italian federation of health authorities, since July 2023. She took up the IRST post on 1 July 2025, succeeding Lorenzo Maffioli, and leads the institute alongside President Luca Zambianchi, Medical Director Martina Rosticci and Scientific Director Nicola Normanno.",
    profiles: [{ label: "Institution profile", url: "https://www.irst.emr.it/it/persone/professionisti/marchesi-cristina" }],
    links: [{ label: "Source: IRST Direzione Generale page", url: "https://www.irst.emr.it/it/listituto/organizzazione/direzioni/direzione-generale" }],
    tags: ["leadership", "health-management"], cancers: [] }),

  // =================== Irish Cancer Society ===================
  p({ id: "nikki-gallagher", name: "Nikki Gallagher", role: "Chief Executive Officer of the Irish Cancer Society", institutionId: "irish-cancer-society", specialisms: ["Charity leadership", "Advocacy and public policy", "Governance"],
    tldr: "Advocacy and governance leader who is Chief Executive of the Irish Cancer Society, Ireland's national cancer charity.",
    summary: "Nikki Gallagher is Chief Executive Officer of the Irish Cancer Society, the national cancer charity that funds research and provides support services and advocacy for people affected by cancer in Ireland. The society describes her as a purpose-driven leader with experience in strategic leadership, advocacy and governance across the private, public and charity sectors, including central roles in campaigns on children's rights, reproductive healthcare, equality and education reform. She holds an MSc in Strategic Management, a Diploma in Law and a professional certificate in Governance, and leads the organisation with its Executive Leadership Team under a voluntary Board of Directors.",
    profiles: [{ label: "Institution leadership page", url: "https://www.cancer.ie/about-our-work/our-leadership" }],
    links: [{ label: "Source: Irish Cancer Society leadership page", url: "https://www.cancer.ie/about-our-work/our-leadership" }],
    tags: ["leadership", "advocacy", "charity"], cancers: [] }),

  // =================== Istituto Nazionale Tumori IRCCS Fondazione G. Pascale ===================
  p({ id: "maurizio-di-mauro", name: "Maurizio Di Mauro", role: "Direttore Generale (General Director) of Istituto Nazionale Tumori IRCCS Fondazione G. Pascale", institutionId: "pascale-naples", specialisms: ["Healthcare management", "Hospital administration", "Infectious diseases"],
    tldr: "Physician and hospital manager who is General Director of the Pascale, the national cancer institute in Naples.",
    summary: "Maurizio Di Mauro is Direttore Generale of the Istituto Nazionale Tumori IRCCS Fondazione G. Pascale in Naples, southern Italy's national cancer institute for research and care. He graduated in medicine and surgery at the University Federico II of Naples, specialised in infectious diseases and holds a master's degree in health economics and management. He was previously Medical Director of the Pascale, General Director of the Ospedali dei Colli hospital company and General Director of the university hospital of the Second University of Naples, and he was quoted as the institute's General Director in national press coverage in January 2026.",
    profiles: [{ label: "FIASO profile", url: "https://www.fiaso.it/fiaso/organizzazione/maurizio-di-mauro/" }],
    links: [{ label: "Source: ANSA report quoting the Pascale General Director, January 2026", url: "https://www.ansa.it/campania/notizie/2026/01/19/al-pascale-primo-prelievo-di-cornee-svolta-per-listituto-tumori-di-napoli_c083e153-1312-4491-b9c3-cd318b98edea.html" }],
    tags: ["leadership", "health-management"], cancers: [] }),

  // =================== Juravinski Cancer Centre / Escarpment Cancer Research Institute ===================
  p({ id: "chris-hillis", name: "Chris Hillis", role: "Vice President, Oncology and Site Executive, Juravinski Hospital and Cancer Centre, Hamilton Health Sciences", institutionId: "juravinski", specialisms: ["Malignant haematology", "Chronic lymphocytic leukaemia", "Myeloproliferative neoplasms", "Quality improvement"],
    tldr: "Blood cancer specialist who leads the Juravinski Cancer Centre, one of Ontario's largest integrated cancer programmes, as Vice President of Oncology.",
    summary: "Chris Hillis is Vice President, Oncology and Site Executive for the Juravinski Hospital and Cancer Centre at Hamilton Health Sciences, leading one of Ontario's largest integrated cancer programmes, and serves as Regional Vice President for the Hamilton Niagara Haldimand Brant Regional Cancer Program with Ontario Health. He is a malignant haematologist focused on chronic lymphocytic leukaemia and myeloproliferative neoplasms and an Associate Professor at McMaster University. He previously served as Chief of Oncology and Associate Chief Medical Information Officer, holds an MSc in quality improvement and patient safety, and leads a CIHR-funded research programme on making clinical trial outcomes more meaningful to patients with haematological malignancies.",
    profiles: [{ label: "Institution senior leadership page", url: "https://www.hamiltonhealthsciences.ca/about-us/our-organization/senior-leadership-team/" }, { label: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/?term=Hillis+C%5BAuthor%5D+AND+hematology" }],
    links: [{ label: "Source: Hamilton Health Sciences senior leadership team", url: "https://www.hamiltonhealthsciences.ca/about-us/our-organization/senior-leadership-team/" }],
    tags: ["leadership", "clinician-scientist", "haematology"], cancers: ["cll"] }),

  // =================== Koo Foundation Sun Yat-Sen Cancer Center ===================
  p({ id: "nei-min-chu", name: "Nei-Min Chu", role: "President (院長) of Koo Foundation Sun Yat-Sen Cancer Center", institutionId: "koo-foundation-sun-yat-sen-cancer-center", specialisms: ["Medical oncology", "Haematology-oncology", "Lung cancer", "Breast cancer"],
    tldr: "Medical oncologist who became President of Taipei's Koo Foundation Sun Yat-Sen Cancer Center in late 2024 after nearly three decades on its staff.",
    summary: "Nei-Min Chu (褚乃銘) is President of the Koo Foundation Sun Yat-Sen Cancer Center, the specialised private cancer hospital in Taipei founded in 1990 and known for its multidisciplinary team model. A medical oncology specialist whose clinical work has focused on lung and breast cancer, he trained in internal medicine in the United States and completed a haematology-oncology fellowship at the University of Florida before joining the centre in 1996. He was previously Vice President and took office as President in November 2024, succeeding founder Andrew T. Huang, who now serves as Chairman.",
    profiles: [{ label: "Institution medical oncology team page", url: "https://www.kfsyscc.org/department_team/medicaloncology" }, { label: "President's message", url: "https://www.kfsyscc.org/deans_words/3" }, { label: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/?term=Chu+NM%5BAuthor%5D+AND+Taiwan" }],
    links: [{ label: "Source: KFSYSCC medical oncology team page listing the President", url: "https://www.kfsyscc.org/department_team/medicaloncology" }],
    tags: ["leadership", "clinician-scientist", "medical-oncology"], cancers: ["nsclc"] }),

  // =================== Korle Bu Teaching Hospital ===================
  p({ id: "yakubu-seidu-adam", name: "Yakubu Seidu Adam", role: "Chief Executive Officer of Korle Bu Teaching Hospital", institutionId: "korle-bu-teaching-hospital", specialisms: ["Ophthalmology", "Glaucoma and cataract surgery", "Hospital leadership"],
    tldr: "Consultant eye surgeon who has been Chief Executive of Korle Bu Teaching Hospital, Ghana's largest referral hospital, since May 2025.",
    summary: "Yakubu Seidu Adam is Chief Executive Officer of Korle Bu Teaching Hospital in Accra, Ghana's premier tertiary teaching hospital and national referral centre, with around 2,000 beds and services including oncology. A consultant eye surgeon with expertise in glaucoma, cataract and refractive surgery, he joined Korle Bu in 2003 and from 2017 headed its Lions International Eye Centre; he is a Fellow of the Ghana College of Surgeons. His appointment as Chief Executive took effect on 6 May 2025, succeeding Opoku Ware Ampomah, and he continued in the role in 2026.",
    profiles: [{ label: "Appointment report, MyJoyOnline", url: "https://www.myjoyonline.com/dr-yakubu-seidu-adam-appointed-as-new-korle-bu-teaching-hospital-ceo/" }],
    links: [{ label: "Source: MyJoyOnline report of appointment, May 2025", url: "https://www.myjoyonline.com/dr-yakubu-seidu-adam-appointed-as-new-korle-bu-teaching-hospital-ceo/" }],
    tags: ["leadership", "clinician-scientist", "ophthalmology"], cancers: [] }),

  // =================== KWF Dutch Cancer Society ===================
  p({ id: "carla-van-gils", name: "Carla van Gils", role: "Bestuurder (Executive Director) of KWF Kankerbestrijding, jointly with Dorine Manson", institutionId: "kwf", specialisms: ["Clinical epidemiology of cancer", "Cancer research funding", "Research programme leadership"],
    tldr: "Cancer epidemiologist who co-leads KWF, the Dutch Cancer Society, the Netherlands' largest charitable funder of cancer research.",
    summary: "Carla van Gils is one of the two bestuurders (executive directors) of KWF Kankerbestrijding, the Dutch Cancer Society, a donor-funded foundation established in 1949 that finances cancer research at universities and institutes across the Netherlands; she leads the organisation jointly with Dorine Manson under a supervisory board chaired by Wiebe Draijer. She is Professor of Clinical Epidemiology of Cancer at UMC Utrecht, where she previously coordinated the cancer research programme of the Julius Center, and joined the KWF executive on 1 June 2021.",
    profiles: [{ label: "Institution organisation page", url: "https://www.kwf.nl/over-ons/onze-organisatie" }, { label: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/?term=van+Gils+CH%5BAuthor%5D" }],
    links: [{ label: "Source: KWF organisation page", url: "https://www.kwf.nl/over-ons/onze-organisatie" }],
    tags: ["leadership", "clinician-scientist", "epidemiology", "research-funding"], cancers: [] }),

  // =================== Kyushu University Hospital ===================
  p({ id: "yasuharu-nakashima", name: "Yasuharu Nakashima", role: "Hospital Director (病院長) of Kyushu University Hospital", institutionId: "kyushu-university-hospital", specialisms: ["Orthopaedic surgery", "Hip surgery", "Hospital management"],
    tldr: "Orthopaedic surgeon who became Director of Kyushu University Hospital in Fukuoka in April 2026 after eight years as a vice director.",
    summary: "Yasuharu Nakashima (中島康晴) is Hospital Director of Kyushu University Hospital in Fukuoka, the university's principal teaching hospital, according to the hospital's leadership list dated 1 April 2026. He is Professor and Chairman of the Department of Orthopaedic Surgery at Kyushu University, a post he has held since 2016, with clinical interests in hip surgery, total hip arthroplasty, rheumatoid arthritis and paediatric orthopaedics. In his director's greeting he notes that he served as a vice director from 2018, including through the COVID-19 pandemic, before taking the top post.",
    profiles: [{ label: "Director's greeting (Japanese)", url: "https://www.hosp.kyushu-u.ac.jp/info/aisatsu_20260401/" }, { label: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/?term=Nakashima+Y%5BAuthor%5D+AND+Kyushu+orthopaedic" }],
    links: [{ label: "Source: Kyushu University Hospital leadership list, 1 April 2026", url: "https://www.hosp.kyushu-u.ac.jp/uploads/file/articles/16324.pdf" }],
    tags: ["leadership", "clinician-scientist", "orthopaedics"], cancers: [] }),
];
