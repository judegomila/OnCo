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
];
