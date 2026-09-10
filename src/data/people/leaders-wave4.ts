import type { PersonInput } from "@/lib/schema";

/**
 * People, wave 4: the publicly listed leader (director, chief executive, president, cancer centre lead or
 * head of oncology) for every institution that still had no person record after wave 3, mostly the centres
 * added in institutions/centres-wave3.ts (OECI members, UK, Canada, Africa, Middle East, Latin America),
 * Chinese provincial cancer hospitals and Indian institutions. One person per institution. Public professional
 * information only (institutional roles, professional profiles); each record cites in `links` the leadership
 * or about page the role was checked against in 2026-09. People move, so re-check.
 */
const asOf = "2026-09-10";

type P = Omit<PersonInput, "kind" | "asOf"> & { institutionId: string };
const p = (x: P): PersonInput => ({ kind: "person", asOf, institutions: [x.institutionId], links: x.profiles, ...x });

export const peopleLeadersWave4: PersonInput[] = [
  // =================== Cancer Prevention and Research Institute of Texas ===================
  p({ id: "wayne-roberts", name: "Wayne Roberts", role: "Chief Executive Officer, Cancer Prevention and Research Institute of Texas (CPRIT)", institutionId: "cprit", specialisms: ["Public administration", "Research funding", "Cancer prevention policy"],
    tldr: "Public administrator who leads the Cancer Prevention and Research Institute of Texas, the state agency that funds cancer research and prevention across Texas.",
    summary: "Wayne Roberts is Chief Executive Officer of the Cancer Prevention and Research Institute of Texas (CPRIT), the Texas state agency created by voters to fund cancer research, product development and prevention programmes. Wikipedia lists him as the agency's chief executive and notes that in July 2018 the Texas State Agency Business Administrators' Association named him its Administrator of the Year. The CPRIT website could not be fetched directly, so this record relies on the agency's Wikipedia article.",
    profiles: [{ label: "Wikipedia: Cancer Prevention and Research Institute of Texas", url: "https://en.wikipedia.org/wiki/Cancer_Prevention_and_Research_Institute_of_Texas" }],
    links: [{ label: "Source: Wikipedia article on CPRIT (infobox names the CEO)", url: "https://en.wikipedia.org/wiki/Cancer_Prevention_and_Research_Institute_of_Texas" }],
    tags: ["leadership", "government", "philanthropy"], cancers: [] }),

  // =================== Cancer Research UK City of London Centre ===================
  p({ id: "tariq-enver", name: "Tariq Enver", role: "Director, Cancer Research UK City of London Centre", institutionId: "cruk-city-of-london-centre", specialisms: ["Cancer biotherapeutics", "Stem cell and leukaemia biology", "Research centre leadership"],
    tldr: "Scientist who directs the Cancer Research UK City of London Centre, the multi-institution London hub for cancer biotherapeutics research.",
    summary: "Tariq Enver is Director of the Cancer Research UK City of London Centre, which Cancer Research UK lists among its research centres with King's College London, University College London, Barts Cancer Institute and The Francis Crick Institute as partner institutions. The centre describes itself as a world class hub for cancer biotherapeutics that brings together cancer researchers from across Barts/QMUL, KCL, UCL and the Crick, with adult and paediatric faculty, shared infrastructure cores and a training programme. It also hosts the CRUK RadNet City of London radiation research network.",
    profiles: [{ label: "Cancer Research UK: our centres (names the Director)", url: "https://www.cancerresearchuk.org/funding-for-researchers/our-research-infrastructure/our-centres" }, { label: "CRUK City of London Centre website", url: "https://www.colcc.ac.uk/" }, { label: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/?term=Enver+T%5BAuthor%5D" }],
    links: [{ label: "Source: Cancer Research UK research centres page listing the centre Director", url: "https://www.cancerresearchuk.org/funding-for-researchers/our-research-infrastructure/our-centres" }],
    tags: ["leadership", "clinician-scientist", "research-institute"], cancers: [] }),

  // =================== Cancer Research UK Convergence Science Centre ===================
  p({ id: "axel-behrens", name: "Axel Behrens", role: "Director, Cancer Research UK Convergence Science Centre", institutionId: "cruk-convergence-science-centre", specialisms: ["Cancer biology", "Convergence science", "Research centre leadership"],
    tldr: "Cancer biologist who directs the Cancer Research UK Convergence Science Centre, the joint Institute of Cancer Research and Imperial College London programme bringing engineering and physical sciences into cancer research.",
    summary: "Axel Behrens is Director of the Cancer Research UK Convergence Science Centre, which Cancer Research UK lists among its funded research centres with The Institute of Cancer Research and Imperial College London as partner institutions. The centre exists to bring together cancer biologists and clinicians with engineers, physical scientists and data scientists. The centre's own website and the ICR pages could not be fetched, so this record relies on the Cancer Research UK centres listing.",
    profiles: [{ label: "Cancer Research UK: our centres (names the Director)", url: "https://www.cancerresearchuk.org/funding-for-researchers/our-research-infrastructure/our-centres" }, { label: "CRUK Convergence Science Centre website", url: "https://www.convergencesciencecentre.ac.uk/" }, { label: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/?term=Behrens+A%5BAuthor%5D+AND+cancer" }],
    links: [{ label: "Source: Cancer Research UK research centres page listing the centre Director", url: "https://www.cancerresearchuk.org/funding-for-researchers/our-research-infrastructure/our-centres" }],
    tags: ["leadership", "clinician-scientist", "research-institute"], cancers: [] }),

  // =================== CancerCare Manitoba ===================
  p({ id: "kent-stobart", name: "Kent Stobart", role: "President and Chief Executive Officer, CancerCare Manitoba", institutionId: "cancercare-manitoba", specialisms: ["Paediatric oncology", "Health system administration", "Medical education"],
    tldr: "Paediatric oncologist and certified physician executive who has led CancerCare Manitoba, the provincial cancer agency, as President and CEO since November 2025.",
    summary: "Dr Kent Stobart joined CancerCare Manitoba as President and Chief Executive Officer in November 2025. He is a clinical paediatric oncologist and a Canadian Certified Physician Executive (CCPE), with a background in oncology services, medical education and health system administration. During postgraduate studies at Queen's University he held a Terry Fox Research Scholarship from the National Cancer Institute of Canada, and in 2024 he received the Association of Faculties of Medicine of Canada President's Award for exemplary national leadership. CancerCare Manitoba is the provincial agency responsible for cancer and blood disorder services in Manitoba; its executive team also includes Dr Donna Turner (Population Oncology), Dr Arbind Dubey (Chief Medical Officer) and Brent Gibson (Corporate Services).",
    profiles: [{ label: "CancerCare Manitoba executive leadership page", url: "https://www.cancercare.mb.ca/About-Us/leadership-team/" }, { label: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/?term=Stobart+K%5BAuthor%5D" }],
    links: [{ label: "Source: CancerCare Manitoba executive leadership page", url: "https://www.cancercare.mb.ca/About-Us/leadership-team/" }],
    tags: ["leadership", "clinician-scientist", "hospital-management"], cancers: [] }),

  // =================== Catalan Institute of Oncology (ICO) ===================
  p({ id: "ramon-salazar-soler", name: "Ramon Salazar i Soler", role: "Director General, Institut Català d'Oncologia (ICO)", institutionId: "ico-catalonia", specialisms: ["Oncology", "Cancer centre management", "Public health system"],
    tldr: "Director general who leads the Institut Català d'Oncologia, the Catalan public cancer institute that runs comprehensive cancer services across several hospital sites.",
    summary: "Ramon Salazar i Soler leads the Institut Català d'Oncologia (ICO) as director general. The ICO is the public cancer institute of the Generalitat de Catalunya, providing specialist cancer care, research and prevention through centres attached to hospitals in L'Hospitalet de Llobregat, Badalona, Girona and Tarragona. The ICO website's organisation and senior management pages did not display names when fetched, so this record relies on the Catalan Wikipedia article, which reports his appointment citing Redacción Médica.",
    profiles: [{ label: "Wikipedia (Catalan): Institut Català d'Oncologia", url: "https://ca.wikipedia.org/wiki/Institut_Catal%C3%A0_d%27Oncologia" }, { label: "ICO institutional pages", url: "https://ico.gencat.cat/ca/linstitut/" }],
    links: [{ label: "Source: Catalan Wikipedia article on the ICO naming the director general", url: "https://ca.wikipedia.org/wiki/Institut_Catal%C3%A0_d%27Oncologia" }],
    tags: ["leadership", "comprehensive-cancer-centre", "hospital-management"], cancers: [] }),

  // =================== Central Drugs Standard Control Organization ===================
  p({ id: "rajeev-singh-raghuvanshi", name: "Rajeev Singh Raghuvanshi", role: "Drugs Controller General of India, Central Drugs Standard Control Organisation (CDSCO)", institutionId: "cdsco", specialisms: ["Drug regulation", "Pharmaceutical quality", "Public administration"],
    tldr: "India's Drugs Controller General, who heads the Central Drugs Standard Control Organisation, the national regulator for medicines, medical devices and clinical trials.",
    summary: "Dr Rajeev Singh Raghuvanshi is the Drugs Controller General of India (DCGI), the head of the Central Drugs Standard Control Organisation (CDSCO). The CDSCO 'Who's who' page lists him in that role alongside Joint Drugs Controllers including Dr S. Eswara Reddy, Dr V.G. Somani, Dr A. Visala and R. Chandrashekar. CDSCO is the Central Drug Authority under the Drugs and Cosmetics Act, responsible for approving new drugs, regulating clinical trials and setting standards for drugs, cosmetics and medical devices in India.",
    profiles: [{ label: "CDSCO Who's who page", url: "https://cdsco.gov.in/opencms/opencms/en/About-us/who/" }],
    links: [{ label: "Source: CDSCO Who's who page", url: "https://cdsco.gov.in/opencms/opencms/en/About-us/who/" }],
    tags: ["leadership", "government", "regulation"], cancers: [] }),

  // =================== Centre Eugène Marquis ===================
  p({ id: "renaud-de-crevoisier", name: "Renaud de Crevoisier", role: "Directeur Général (Director General), Centre Eugène Marquis", institutionId: "centre-eugene-marquis", specialisms: ["Oncology", "Cancer centre management", "Academic medicine"],
    tldr: "Professor of medicine who directs Centre Eugène Marquis, the regional comprehensive cancer centre for Brittany in Rennes.",
    summary: "Professeur Renaud de Crevoisier is Directeur Général of Centre Eugène Marquis, the Centre de Lutte Contre le Cancer for Brittany, based in Rennes. The centre's direction organigramme lists him alongside Julia Le Gouguec, Directrice Générale Adjointe, and Dr Claudia Lefeuvre-Plesse, Présidente de la Commission Médicale d'Etablissement. Centre Eugène Marquis is one of the Unicancer network of French cancer centres, combining treatment, research and teaching.",
    profiles: [{ label: "Centre Eugène Marquis direction organigramme", url: "https://www.centre-eugene-marquis.fr/organigramme-de-direction/" }, { label: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/?term=de+Crevoisier+R%5BAuthor%5D" }],
    links: [{ label: "Source: Centre Eugène Marquis organigramme de direction", url: "https://www.centre-eugene-marquis.fr/organigramme-de-direction/" }],
    tags: ["leadership", "clinician-scientist", "comprehensive-cancer-centre"], cancers: [] }),

  // =================== Centre François Baclesse ===================
  p({ id: "roman-rouzier", name: "Roman Rouzier", role: "Directeur Général (Director General), Centre François Baclesse", institutionId: "centre-francois-baclesse", specialisms: ["Gynaecological surgery", "Breast surgery", "Cancer centre management"],
    tldr: "Gynaecological and breast surgeon who has directed Centre François Baclesse, the comprehensive cancer centre for Normandy in Caen, since July 2023.",
    summary: "Professeur Roman Rouzier has been Directeur Général of Centre François Baclesse since 1 July 2023. He is a gynaecological surgeon specialising in breast surgery. The centre's organisation page states that he is supported by Michael Canovas, Directeur Général Adjoint. Centre François Baclesse is the Centre de Lutte Contre le Cancer for Normandy, based in Caen, providing cancer treatment, research and training within the Unicancer network.",
    profiles: [{ label: "Centre François Baclesse organisation page", url: "https://www.baclesse.fr/decouvrir-le-centre/organisation/" }, { label: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/?term=Rouzier+R%5BAuthor%5D" }],
    links: [{ label: "Source: Centre François Baclesse organisation page", url: "https://www.baclesse.fr/decouvrir-le-centre/organisation/" }],
    tags: ["leadership", "clinician-scientist", "comprehensive-cancer-centre"], cancers: [] }),

  // =================== Centre Henri Becquerel ===================
  p({ id: "pierre-vera", name: "Pierre Vera", role: "Directeur Général (Director General), Centre Henri Becquerel", institutionId: "centre-henri-becquerel", specialisms: ["Nuclear medicine", "Cancer imaging", "Cancer centre management"],
    tldr: "Nuclear medicine physician who directs Centre Henri Becquerel, the comprehensive cancer centre for the Rouen area in Normandy.",
    summary: "Professeur Pierre Vera is Directeur Général of Centre Henri Becquerel, the Centre de Lutte Contre le Cancer in Rouen. He is a nuclear medicine physician, and the centre's organisation page records his appointment to a five-year term beginning in 2017. He works with Artus Paty, Directeur Général Adjoint, who has been at the centre since 2016, supported by a Comité de Direction (CODIR) and a Conférence Médicale d'Etablissement (CME). The centre is overseen by a board of directors chaired by a representative of the State.",
    profiles: [{ label: "Centre Henri Becquerel organisation page", url: "https://www.becquerel.fr/le-centre/decouvrir-le-centre/organisation/" }, { label: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/?term=Vera+P%5BAuthor%5D+AND+Rouen" }],
    links: [{ label: "Source: Centre Henri Becquerel organisation page", url: "https://www.becquerel.fr/le-centre/decouvrir-le-centre/organisation/" }],
    tags: ["leadership", "clinician-scientist", "comprehensive-cancer-centre"], cancers: [] }),

  // =================== Centre Jean Perrin ===================
  p({ id: "frederique-penault-llorca", name: "Frédérique Penault-Llorca", role: "Directrice Générale (Director General), Centre Jean Perrin", institutionId: "centre-jean-perrin", specialisms: ["Pathology", "Breast cancer biomarkers", "Cancer centre management"],
    tldr: "Professor who directs Centre Jean Perrin, the comprehensive cancer centre for the Auvergne region in Clermont-Ferrand, now in her second five-year term.",
    summary: "Professeure Frédérique Penault-Llorca is Directrice Générale of Centre Jean Perrin, the Centre de Lutte Contre le Cancer in Clermont-Ferrand. The centre's organisation page states that she is serving her second five-year term, appointed by ministerial decree, and is supported by Raphaël Zint, Directeur Général Adjoint, and an executive team of twelve members including several physicians. The centre describes this physician and manager partnership as a distinctive feature of French cancer centres.",
    profiles: [{ label: "Centre Jean Perrin organisation page", url: "https://www.cjp.fr/nous-connaitre/notre-organisation" }, { label: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/?term=Penault-Llorca+F%5BAuthor%5D" }],
    links: [{ label: "Source: Centre Jean Perrin organisation page", url: "https://www.cjp.fr/nous-connaitre/notre-organisation" }],
    tags: ["leadership", "clinician-scientist", "comprehensive-cancer-centre"], cancers: [] }),

  // =================== Centro di Riferimento Oncologico di Aviano (CRO) ===================
  p({ id: "giuseppe-tonutti", name: "Giuseppe Tonutti", role: "Direttore Generale (Director General), Centro di Riferimento Oncologico di Aviano (CRO)", institutionId: "cro-aviano", specialisms: ["Hospital management", "Health administration", "Research hospital governance"],
    tldr: "Health manager who serves as Director General of the Centro di Riferimento Oncologico di Aviano, the national cancer research hospital (IRCCS) in Friuli Venezia Giulia.",
    summary: "Dott. Giuseppe Tonutti is Direttore Generale of the Centro di Riferimento Oncologico (CRO) di Aviano, a public cancer research hospital (IRCCS) in the Friuli Venezia Giulia region of north eastern Italy. The institute's strategic direction page lists him with Dott. Gustavo Baldassarre as Direttore Scientifico, Dott. Valter Gattei as acting Direttore Sanitario and Dott.ssa Cristina Zavagno as Direttore Amministrativo. The page states that its contents were last verified on 1 April 2026.",
    profiles: [{ label: "CRO Aviano strategic direction page", url: "https://www.cro.sanita.fvg.it/it/istituto/direzioni.html" }],
    links: [{ label: "Source: CRO Aviano direzione strategica page", url: "https://www.cro.sanita.fvg.it/it/istituto/direzioni.html" }],
    tags: ["leadership", "hospital-management", "research-institute"], cancers: [] }),

  // =================== Chao Family Comprehensive Cancer Center, UC Irvine ===================
  p({ id: "richard-van-etten", name: "Richard Van Etten", role: "Director, Chao Family Comprehensive Cancer Center, University of California, Irvine", institutionId: "uci-chao", specialisms: ["Haematological malignancies", "Leukaemia biology", "Cancer centre leadership"],
    tldr: "Physician-scientist who directs the Chao Family Comprehensive Cancer Center at UC Irvine, the NCI-designated comprehensive cancer centre for Orange County.",
    summary: "Richard Van Etten, MD, PhD, is Director of the Chao Family Comprehensive Cancer Center at the University of California, Irvine, and also serves as Senior Associate Dean and Associate Vice Chancellor for Cancer. The centre's leadership page lists Miguel Villalona Calero, MD, Division Chief of Hematology/Oncology, as Deputy Director, with associate directors covering basic science, clinical sciences, translational science, population science, community outreach, shared resources, education and administration. Executive decision-making is vested in a Senior Leadership Council chaired by the Director.",
    profiles: [{ label: "Chao Family Comprehensive Cancer Center leadership page", url: "https://cancer.uci.edu/about/leadership/" }, { label: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/?term=Van+Etten+RA%5BAuthor%5D" }],
    links: [{ label: "Source: Chao Family Comprehensive Cancer Center leadership page", url: "https://cancer.uci.edu/about/leadership/" }],
    tags: ["leadership", "clinician-scientist", "comprehensive-cancer-centre"], cancers: [] }),

  // =================== Chris Hani Baragwanath Academic Hospital ===================
  p({ id: "sandile-mfenyana", name: "Sandile Mfenyana", role: "Chief Executive Officer, Chris Hani Baragwanath Academic Hospital", institutionId: "chris-hani-baragwanath", specialisms: ["Hospital management", "Public health services"],
    tldr: "Chief executive of Chris Hani Baragwanath Academic Hospital in Soweto, one of the largest hospitals in the world and a major public referral centre for Gauteng.",
    summary: "Dr Sandile Mfenyana is Chief Executive Officer of Chris Hani Baragwanath Academic Hospital, the large public academic hospital in Soweto, Johannesburg, run by the Gauteng Department of Health and affiliated with the University of the Witwatersrand. The hospital's website names him as CEO but gives no appointment date or biography.",
    profiles: [{ label: "Chris Hani Baragwanath Academic Hospital website", url: "https://www.chrishanibaragwanathhospital.co.za/" }],
    links: [{ label: "Source: hospital website naming the CEO", url: "https://www.chrishanibaragwanathhospital.co.za/" }],
    tags: ["leadership", "hospital-management"], cancers: [] }),

  // =================== Christian Medical College, Vellore ===================
  p({ id: "biju-george", name: "Biju George", role: "Director, Christian Medical College, Vellore", institutionId: "cmc-vellore", specialisms: ["Academic medicine", "Hospital management", "Medical education"],
    tldr: "Physician who serves as Director of Christian Medical College, Vellore, the not-for-profit teaching hospital and medical school in Tamil Nadu, India.",
    summary: "Dr Biju George is Director of Christian Medical College (CMC), Vellore, a not-for-profit Christian teaching hospital and medical college in Tamil Nadu. The college's administration page lists him as Director alongside Dr Solomon Sathishkumar (Principal), Dr Rajesh I (Medical Superintendent), Mrs Alice Sony (Nursing Superintendent) and seven Associate Directors. The page functions as a directory and gives no appointment date or biography.",
    profiles: [{ label: "CMC Vellore administration page", url: "https://www.cmch-vellore.edu/administration/" }, { label: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/?term=George+B%5BAuthor%5D+AND+Vellore" }],
    links: [{ label: "Source: CMC Vellore administration page", url: "https://www.cmch-vellore.edu/administration/" }],
    tags: ["leadership", "clinician-scientist", "hospital-management"], cancers: [] }),

  // =================== CHU de Québec - Université Laval ===================
  p({ id: "martin-beaumont", name: "Martin Beaumont", role: "Président-directeur général (President and CEO), CHU de Québec - Université Laval", institutionId: "chu-de-quebec", specialisms: ["Hospital management", "Health system governance"],
    tldr: "Chief executive of CHU de Québec - Université Laval, the university hospital network in Quebec City that houses the region's cancer services.",
    summary: "Martin Beaumont is Président-directeur général of CHU de Québec - Université Laval, the multi-site university hospital centre affiliated with Université Laval in Quebec City. The CHU's directions page, updated 26 June 2026, lists him with Danielle Goulet as Présidente-directrice générale adjointe, Christine Mimeault as Directrice générale adjointe for major projects, Dr Julien Clément heading the Direction médicale and Vanessa Blouin heading the Direction de la cancérologie. The CHU's cancer services are organised through that cancer care directorate.",
    profiles: [{ label: "CHU de Québec directions page", url: "https://www.chudequebec.ca/a-propos-de-nous/direction-et-gouvernance/directions.aspx" }],
    links: [{ label: "Source: CHU de Québec directions page", url: "https://www.chudequebec.ca/a-propos-de-nous/direction-et-gouvernance/directions.aspx" }],
    tags: ["leadership", "hospital-management"], cancers: [] }),

  // =================== Dan L Duncan Comprehensive Cancer Center, Baylor College of Medicine ===================
  p({ id: "pavan-reddy", name: "Pavan Reddy", role: "Director, Dan L Duncan Comprehensive Cancer Center, Baylor College of Medicine", institutionId: "baylor-duncan", specialisms: ["Haematology and oncology", "Stem cell transplantation", "Cancer centre leadership"],
    tldr: "Physician who directs the Dan L Duncan Comprehensive Cancer Center at Baylor College of Medicine in Houston, an NCI-designated comprehensive cancer centre.",
    summary: "Pavan Reddy, MD, is Director of the Dan L Duncan Comprehensive Cancer Center at Baylor College of Medicine in Houston, Texas. The National Cancer Institute's cancer centre listing names him as Director and records that the centre, formed in 2006, received NCI designation in 2007 and comprehensive status in 2015. The Baylor College of Medicine pages for the centre could not be fetched, so this record relies on the NCI listing.",
    profiles: [{ label: "NCI cancer centre listing: Dan L Duncan Comprehensive Cancer Center", url: "https://www.cancer.gov/research/infrastructure/cancer-centers/find/baylorduncan" }, { label: "Baylor College of Medicine cancer centre website", url: "https://www.bcm.edu/centers/cancer-center" }, { label: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/?term=Reddy+P%5BAuthor%5D+AND+Baylor" }],
    links: [{ label: "Source: National Cancer Institute cancer centre listing naming the Director", url: "https://www.cancer.gov/research/infrastructure/cancer-centers/find/baylorduncan" }],
    tags: ["leadership", "clinician-scientist", "comprehensive-cancer-centre"], cancers: [] }),
  // =================== Trinity St James's Cancer Institute ===================
  p({ id: "john-kennedy", name: "John Kennedy", role: "Medical Director, Trinity St James's Cancer Institute", institutionId: "trinity-st-jamess-cancer-institute", specialisms: ["Oncology", "Comprehensive cancer care", "Academic cancer centre leadership"],
    tldr: "Professor who is Medical Director of Trinity St James's Cancer Institute, Ireland's first academic comprehensive cancer institute, in Dublin.",
    summary: "Professor John Kennedy is Medical Director of Trinity St James's Cancer Institute (TSJCI), a partnership between St James's Hospital and Trinity College Dublin on Ireland's largest academic health campus. The institute describes itself as the first of its kind in Ireland, building on the campus's long tradition of comprehensive cancer care. He leads it alongside Academic Director Professor Maeve Lowery, whose stated ambition for the institute is to develop a comprehensive cancer centre with national services in areas such as genomics and immunology.",
    profiles: [{ label: "Trinity St James's Cancer Institute page", url: "https://www.stjames.ie/cancer/" }, { label: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/?term=Kennedy+J%5BAuthor%5D+AND+St+James%27s+Dublin" }],
    links: [{ label: "Source: St James's Hospital cancer institute page naming the directors", url: "https://www.stjames.ie/cancer/" }],
    tags: ["leadership", "clinician-scientist", "comprehensive-cancer-centre"], cancers: [] }),

  // =================== Turku University Hospital Cancer Centre ===================
  p({ id: "pia-vihinen", name: "Pia Vihinen", role: "Director (johtaja), FICAN West (Läntinen Syöpäkeskus), Turku University Hospital", institutionId: "turku-university-hospital", specialisms: ["Regional cancer centre management", "Cancer research coordination"],
    tldr: "Director who leads FICAN West, the regional cancer centre for western Finland hosted by Turku University Hospital and the Wellbeing services county of Southwest Finland.",
    summary: "Pia Vihinen is Director (johtaja) of Läntinen Syöpäkeskus, FICAN West, the regional cancer centre for western Finland that is hosted by Turku University Hospital (Tyks) within the Wellbeing services county of Southwest Finland (Varha). FICAN West's organisation page lists her as director and as presenting officer to its steering group, which also includes Mikko Pietilä, Director of Tyks Hospital Services. FICAN West is one of the five regional cancer centres that, with the national coordinating body, make up the Finnish National Cancer Center.",
    profiles: [{ label: "FICAN West organisation page (Finnish)", url: "https://fican.fi/lantinen-syopakeskus/tietoa-meista/organisaatio/" }, { label: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/?term=Vihinen+P%5BAuthor%5D" }],
    links: [{ label: "Source: FICAN West organisation page naming the director", url: "https://fican.fi/lantinen-syopakeskus/tietoa-meista/organisaatio/" }],
    tags: ["leadership", "clinician-scientist", "comprehensive-cancer-centre"], cancers: [] }),

  // =================== University College Hospital, Ibadan ===================
  p({ id: "jesse-otegbayo", name: "Jesse Abiodun Otegbayo", role: "Chief Medical Director, University College Hospital, Ibadan", institutionId: "uch-ibadan", specialisms: ["Gastroenterology", "Internal medicine", "Hospital management"],
    tldr: "Professor of medicine and gastroenterologist who is Chief Medical Director of University College Hospital, Ibadan, Nigeria's oldest teaching hospital.",
    summary: "Professor Jesse Abiodun Otegbayo is Chief Medical Director of University College Hospital (UCH), Ibadan, the teaching hospital of the University of Ibadan and Nigeria's first teaching hospital. The hospital's website records his appointment as Chief Medical Director from 1 March 2019 and continued to list him in that office in September 2026. He qualified in medicine at the University of Ibadan in 1989, holds an MSc and PhD in chemical pathology and immunology, and became Professor of Medicine in 2008; he is a Fellow of the West African College of Physicians, the American College of Gastroenterology and the Royal College of Physicians of Glasgow, with more than 100 publications.",
    profiles: [{ label: "UCH Ibadan Chief Medical Director profile", url: "https://uch-ibadan.org.ng/member/professor-jesse-abiodun-otegbayo/" }, { label: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/?term=Otegbayo+JA%5BAuthor%5D" }],
    links: [{ label: "Source: UCH Ibadan website naming the Chief Medical Director", url: "https://uch-ibadan.org.ng" }],
    tags: ["leadership", "clinician-scientist", "hospital-management"], cancers: [] }),

  // =================== University Medical Center Groningen Comprehensive Cancer Center ===================
  p({ id: "ate-van-der-zee", name: "Ate van der Zee", role: "Chair of the Executive Board (voorzitter Raad van Bestuur), University Medical Center Groningen", institutionId: "umcg-groningen", specialisms: ["Academic hospital governance", "Hospital management"],
    tldr: "Professor who chairs the executive board of University Medical Center Groningen, the academic hospital in the northern Netherlands that houses the UMCG Comprehensive Cancer Center.",
    summary: "Professor Ate van der Zee leads University Medical Center Groningen (UMCG) as voorzitter of its Raad van Bestuur, the executive board of the academic hospital of the University of Groningen. UMCG is one of the eight Dutch university medical centres and includes the UMCG Comprehensive Cancer Center, which brings together its cancer care and cancer research. The Dutch Wikipedia article on UMCG names him as board chair; it does not name a separate head for the cancer centre.",
    profiles: [{ label: "Wikipedia: Universitair Medisch Centrum Groningen (Dutch)", url: "https://nl.wikipedia.org/wiki/Universitair_Medisch_Centrum_Groningen" }, { label: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/?term=van+der+Zee+AGJ%5BAuthor%5D" }],
    links: [{ label: "Source: Dutch Wikipedia article on UMCG naming the board chair", url: "https://nl.wikipedia.org/wiki/Universitair_Medisch_Centrum_Groningen" }],
    tags: ["leadership", "hospital-management", "comprehensive-cancer-centre"], cancers: [] }),

  // =================== University of Arizona Cancer Center ===================
  p({ id: "dan-theodorescu", name: "Dan Theodorescu", role: "Director, University of Arizona Cancer Center", institutionId: "arizona-cancer-center", specialisms: ["Urology", "Cellular and molecular medicine", "Developmental therapeutics"],
    tldr: "Professor of urology and of cellular and molecular medicine who directs the University of Arizona Cancer Center, the NCI-designated cancer centre in Tucson.",
    summary: "Dan Theodorescu, MD, PhD, is Director of the University of Arizona Cancer Center and holds the Nancy C. and Craig M. Berge Endowed Chair for the Director of the Cancer Center. He is Professor of Urology and of Cellular and Molecular Medicine at the University of Arizona and also leads the centre's Developmental Therapeutics Program. The University of Arizona Cancer Center is the NCI-designated cancer centre headquartered in Tucson.",
    profiles: [{ label: "University of Arizona Cancer Center leadership page", url: "https://cancercenter.arizona.edu/message-director/leadership" }, { label: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/?term=Theodorescu+D%5BAuthor%5D" }],
    links: [{ label: "Source: University of Arizona Cancer Center leadership page", url: "https://cancercenter.arizona.edu/message-director/leadership" }],
    tags: ["leadership", "clinician-scientist", "comprehensive-cancer-centre"], cancers: [] }),

  // =================== University of Florida Health Cancer Center ===================
  p({ id: "thomas-george", name: "Thomas J. George", role: "Interim Director, UF Health Cancer Institute (University of Florida Health Cancer Center)", institutionId: "uf-health-cancer-center", specialisms: ["Oncology", "Academic cancer centre leadership"],
    tldr: "Oncologist (FACP, FASCO) who is Interim Director of the UF Health Cancer Institute in Gainesville, Florida's only NCI-designated cancer centre based at a public university.",
    summary: "Thomas J. George, MD, FACP, FASCO, is Interim Director of the UF Health Cancer Institute, the University of Florida's cancer centre in Gainesville, and writes the director's welcome on its website. The institute became the 72nd NCI-designated cancer centre in June 2023 and is the only one based at a public university in Florida. It serves a 26-county area of north central Florida, has more than 350 researcher, clinician and educator members across the University of Florida and UF Health, and its clinical services include proton therapy, stem cell transplantation and immunotherapy. The leadership page did not give an appointment date.",
    profiles: [{ label: "UF Health Cancer Institute leadership page", url: "https://cancer.ufl.edu/about/leadership/" }, { label: "Interim director's welcome", url: "https://cancer.ufl.edu/about/welcome-overview/" }, { label: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/?term=George+TJ%5BAuthor%5D+AND+Florida" }],
    links: [{ label: "Source: UF Health Cancer Institute leadership page", url: "https://cancer.ufl.edu/about/leadership/" }],
    tags: ["leadership", "clinician-scientist", "comprehensive-cancer-centre"], cancers: [] }),

  // =================== University of Galway / Saolta Cancer Centre ===================
  p({ id: "michael-kerin", name: "Michael Kerin", role: "Clinical Director, Saolta Cancer Managed Clinical Academic Network (Saolta Cancer MCAN), Galway University Hospitals", institutionId: "galway-university-hospital-cancer-centre", specialisms: ["Breast cancer", "Cancer network leadership", "Academic medicine"],
    tldr: "Professor who is Clinical Director of the Saolta Cancer Managed Clinical Academic Network, the cancer centre serving the west and north west of Ireland from Galway.",
    summary: "Professor Michael Kerin is Clinical Director of the Saolta Cancer Managed Clinical Academic Network (Saolta Cancer MCAN), the cancer programme of the Saolta University Health Care Group centred on University Hospital Galway and linked with the University of Galway. The Saolta cancer centre page names him in that role in connection with his commentary on new breast cancer screening technology. The Galway centre is one of Ireland's designated cancer centres and provides cancer services for the HSE West and North West region.",
    profiles: [{ label: "Saolta cancer centre page", url: "https://www.saolta.ie/cancer-centre" }, { label: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/?term=Kerin+MJ%5BAuthor%5D" }],
    links: [{ label: "Source: Saolta cancer centre page naming the Clinical Director", url: "https://www.saolta.ie/cancer-centre" }],
    tags: ["leadership", "clinician-scientist", "comprehensive-cancer-centre"], cancers: [] }),

  // =================== University of Hawai'i Cancer Center ===================
  p({ id: "naoto-ueno", name: "Naoto T. Ueno", role: "Director, University of Hawai'i Cancer Center", institutionId: "hawaii-cancer-center", specialisms: ["Breast medical oncology", "Inflammatory breast cancer", "Early-phase clinical trials"],
    tldr: "Breast cancer physician-scientist who directs the University of Hawai'i Cancer Center, the NCI-designated cancer centre in Honolulu.",
    summary: "Naoto T. Ueno, MD, PhD, FACP, is Director of the University of Hawai'i Cancer Center and a full member of its Cancer Biology Program, where his focus is translational and clinical research. He is Professor at the cancer centre and in the Department of Medicine of the John A. Burns School of Medicine, University of Hawai'i at Manoa. He trained in medicine at Wakayama Medical College in Japan, completed a PhD in cancer biology at the University of Texas Graduate School of Biomedical Sciences, an internal medicine residency at the University of Pittsburgh Medical Center and fellowships in medical oncology and blood and marrow transplantation at MD Anderson Cancer Center. His research centres on triple-negative and inflammatory breast cancer and the tumour microenvironment, and he has led more than 50 clinical trials.",
    profiles: [{ label: "UH Cancer Center leadership page", url: "https://www.uhcancercenter.org/about-us/leadership" }, { label: "UH Cancer Center profile", url: "https://www.uhcancercenter.org/ueno-naoto" }, { label: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/?term=Ueno+NT%5BAuthor%5D" }],
    links: [{ label: "Source: University of Hawai'i Cancer Center leadership page", url: "https://www.uhcancercenter.org/about-us/leadership" }],
    tags: ["leadership", "clinician-scientist", "comprehensive-cancer-centre"], cancers: [] }),

  // =================== University of Wisconsin Carbone Cancer Center ===================
  p({ id: "christian-capitini", name: "Christian Capitini", role: "Director, University of Wisconsin Carbone Cancer Center", institutionId: "uw-carbone", specialisms: ["Oncology", "Academic cancer centre leadership"],
    tldr: "Physician who directs the University of Wisconsin Carbone Cancer Center, the NCI-designated comprehensive cancer centre in Madison.",
    summary: "Christian Capitini, MD, is Director of the University of Wisconsin Carbone Cancer Center (UWCCC), listed at the head of the centre's leadership page. UW Carbone is a matrix cancer centre within the UW School of Medicine and Public Health, drawing its members from 38 departments and nine schools and colleges at the University of Wisconsin-Madison. The leadership page gives his name and title only; it did not include further biographical detail.",
    profiles: [{ label: "UW Carbone Cancer Center leadership page", url: "https://cancer.wisc.edu/uwccc-leadership/" }, { label: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/?term=Capitini+CM%5BAuthor%5D" }],
    links: [{ label: "Source: UW Carbone Cancer Center leadership page", url: "https://cancer.wisc.edu/uwccc-leadership/" }],
    tags: ["leadership", "clinician-scientist", "comprehensive-cancer-centre"], cancers: [] }),

  // =================== UVA Comprehensive Cancer Center ===================
  p({ id: "thomas-loughran", name: "Thomas P. Loughran Jr.", role: "Director, UVA Comprehensive Cancer Center", institutionId: "uva-cancer-center", specialisms: ["Cancer centre leadership", "Academic medicine"],
    tldr: "Director who leads the UVA Comprehensive Cancer Center in Charlottesville, Virginia's first NCI-designated comprehensive cancer centre.",
    summary: "Thomas P. Loughran Jr. leads the UVA Comprehensive Cancer Center at the University of Virginia, which UVA Health describes as Virginia's first National Cancer Institute comprehensive cancer centre. According to the centre's Wikipedia article he became director in 2013, succeeding Michael J. Weber, who stepped down after twelve years; the article, last updated in August 2026, lists no successor. The UVA websites fetched for this record did not display a leadership page, so the role is recorded here from Wikipedia and should be re-checked.",
    profiles: [{ label: "Wikipedia: University of Virginia Cancer Center", url: "https://en.wikipedia.org/wiki/University_of_Virginia_Cancer_Center" }, { label: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/?term=Loughran+TP%5BAuthor%5D" }],
    links: [{ label: "Source: Wikipedia article on UVA Cancer Center naming the director", url: "https://en.wikipedia.org/wiki/University_of_Virginia_Cancer_Center" }],
    tags: ["leadership", "clinician-scientist", "comprehensive-cancer-centre"], cancers: [] }),

  // =================== VCU Massey Comprehensive Cancer Center ===================
  p({ id: "robert-winn", name: "Robert A. Winn", role: "Director, VCU Massey Comprehensive Cancer Center", institutionId: "vcu-massey", specialisms: ["Cancer centre leadership", "Academic medicine"],
    tldr: "Physician who leads VCU Massey Comprehensive Cancer Center in Richmond, Virginia, the NCI-designated comprehensive cancer centre of Virginia Commonwealth University.",
    summary: "Robert A. Winn, MD, leads VCU Massey Comprehensive Cancer Center, the cancer centre of Virginia Commonwealth University in Richmond and an NCI-designated comprehensive cancer centre. The centre's Wikipedia article records that he became director in 2019. The Massey website pages fetched for this record did not expose a leadership page, so the role is recorded from Wikipedia and should be re-checked.",
    profiles: [{ label: "Wikipedia: VCU Massey Cancer Center", url: "https://en.wikipedia.org/wiki/VCU_Massey_Cancer_Center" }, { label: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/?term=Winn+RA%5BAuthor%5D" }],
    links: [{ label: "Source: Wikipedia article on VCU Massey Cancer Center naming the director", url: "https://en.wikipedia.org/wiki/VCU_Massey_Cancer_Center" }],
    tags: ["leadership", "clinician-scientist", "comprehensive-cancer-centre"], cancers: [] }),

  // =================== Vejle Hospital Cancer Centre (Lillebaelt Hospital) ===================
  p({ id: "christian-sauvr", name: "Christian Sauvr", role: "Chief Executive (administrerende sygehusdirektør), Sygehus Lillebælt (Lillebaelt Hospital)", institutionId: "vejle-cancer-centre", specialisms: ["Hospital management", "Regional health services"],
    tldr: "Hospital chief executive who leads Sygehus Lillebælt, the Region of Southern Denmark hospital group whose Vejle site is a specialist cancer hospital.",
    summary: "Christian Sauvr leads Sygehus Lillebælt (Lillebaelt Hospital) as administrerende sygehusdirektør, the chief executive of the hospital group in the Region of Southern Denmark that runs Vejle Sygehus and Kolding Sygehus. The Danish Wikipedia article on Sygehus Lillebælt names him as head of the hospital management from 1 July 2020. Vejle Sygehus houses the group's oncology department and has repeatedly been recognised as Denmark's best mid-sized hospital, with particular recognition for its breast and lung cancer treatment. The hospital website did not expose a management page to the fetch, so the role is recorded from Wikipedia.",
    profiles: [{ label: "Wikipedia: Sygehus Lillebælt (Danish)", url: "https://da.wikipedia.org/wiki/Sygehus_Lilleb%C3%A6lt" }],
    links: [{ label: "Source: Danish Wikipedia article on Sygehus Lillebælt naming the chief executive", url: "https://da.wikipedia.org/wiki/Sygehus_Lilleb%C3%A6lt" }],
    tags: ["leadership", "hospital-management"], cancers: [] }),

  // =================== Verspeeten Family Cancer Centre, London Health Sciences Centre ===================
  p({ id: "tammy-quigley", name: "Tammy Quigley", role: "Vice President, Cancer, Renal, Mental Health and Patient Flow, London Health Sciences Centre; Regional Vice President, South West Regional Cancer Program", institutionId: "lhsc-verspeeten", specialisms: ["Cancer programme leadership", "Hospital operations", "Regional cancer services"],
    tldr: "Hospital executive who leads the cancer programme at London Health Sciences Centre, home of the Verspeeten Family Cancer Centre, and the South West Regional Cancer Program in Ontario.",
    summary: "Tammy Quigley is Vice President of Cancer, Renal, Mental Health and Patient Flow at London Health Sciences Centre (LHSC) in London, Ontario, and Regional Vice President for the South West Regional Cancer Program. LHSC's executive leadership page lists her in these roles; the Verspeeten Family Cancer Centre is LHSC's regional cancer centre for south western Ontario. The same page records that David Musyj currently serves as Supervisor of LHSC.",
    profiles: [{ label: "LHSC executive leadership team", url: "https://www.lhsc.on.ca/about-lhsc/executive-leadership-team" }],
    links: [{ label: "Source: LHSC executive leadership team page", url: "https://www.lhsc.on.ca/about-lhsc/executive-leadership-team" }],
    tags: ["leadership", "hospital-management"], cancers: [] }),

  // =================== Weston Park Cancer Centre, Sheffield Teaching Hospitals ===================
  p({ id: "kirsten-major", name: "Kirsten Major", role: "Chief Executive, Sheffield Teaching Hospitals NHS Foundation Trust", institutionId: "weston-park-sheffield", specialisms: ["NHS management", "Hospital leadership"],
    tldr: "NHS chief executive who leads Sheffield Teaching Hospitals NHS Foundation Trust, the trust that runs Weston Park Cancer Centre.",
    summary: "Kirsten Major is Chief Executive of Sheffield Teaching Hospitals NHS Foundation Trust, one of the largest NHS trusts in England and the operator of Weston Park Cancer Centre, one of the few dedicated cancer hospitals in the UK. The trust's Wikipedia article names her as chief executive alongside chief nurse Chris Morley and medical directors Jennifer Hill and David Black. The trust and Weston Park websites did not respond to the fetch, so the role is recorded from Wikipedia.",
    profiles: [{ label: "Wikipedia: Sheffield Teaching Hospitals NHS Foundation Trust", url: "https://en.wikipedia.org/wiki/Sheffield_Teaching_Hospitals_NHS_Foundation_Trust" }],
    links: [{ label: "Source: Wikipedia article on Sheffield Teaching Hospitals naming the chief executive", url: "https://en.wikipedia.org/wiki/Sheffield_Teaching_Hospitals_NHS_Foundation_Trust" }],
    tags: ["leadership", "hospital-management"], cancers: [] }),
  // =================== National Cancer Institute, Lithuania ===================
  p({ id: "valdas-peceliunas", name: "Valdas Pečeliūnas", role: "Director, National Cancer Institute (Nacionalinis vėžio institutas), Vilnius", institutionId: "nci-vilnius", specialisms: ["Oncology", "Cancer institute management", "Cancer research"],
    tldr: "Director who leads the National Cancer Institute in Vilnius, Lithuania's national specialist cancer treatment and research institute.",
    summary: "Valdas Pečeliūnas leads the National Cancer Institute (Nacionalinis vėžio institutas, NVI) in Vilnius as its Director. The institute is a non-profit public legal entity that combines specialist cancer treatment with cancer research, and its scientific work is overseen by an eleven-member Scientific Council elected for five-year terms. The Lithuanian Wikipedia article on the institute names him as the current director; the institute's own website describes its structure and administration without publishing leadership names.",
    profiles: [{ label: "Wikipedia (Lithuanian) article on the institute", url: "https://lt.wikipedia.org/wiki/Nacionalinis_vėžio_institutas" }, { label: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/?term=Peceliunas+V%5BAuthor%5D" }],
    links: [{ label: "Source: Lithuanian Wikipedia article naming the director", url: "https://lt.wikipedia.org/wiki/Nacionalinis_vėžio_institutas" }, { label: "Institute about page", url: "https://nvi.lt/apie-mus/" }],
    tags: ["leadership", "research-institute", "hospital-management"], cancers: [] }),

  // =================== National Centre for Biological Sciences ===================
  p({ id: "ls-shashidhara", name: "L. S. Shashidhara", role: "Centre Director, National Centre for Biological Sciences (NCBS), Bengaluru", institutionId: "ncbs", specialisms: ["Developmental genetics", "Evolutionary biology", "Cancer biology", "Science policy"],
    tldr: "Geneticist and developmental biologist who directs the National Centre for Biological Sciences in Bengaluru, a research unit of the Tata Institute of Fundamental Research.",
    summary: "L. S. Shashidhara is Centre Director of the National Centre for Biological Sciences (NCBS) in Bengaluru, a unit of the Tata Institute of Fundamental Research that conducts research across biological scales and increasingly combines experiment with computational approaches. His research concerns the gene regulatory mechanisms that position cells, tissues and organs during development, with applications to cancer research. He studied genetics and plant breeding at the University of Agricultural Sciences, Dharwad, took his PhD at the University of Cambridge and did postdoctoral work there on Hox protein function in Drosophila. He was a founding academic member of IISER Pune and Ashoka University, is a former Vice-President of the Indian National Science Academy, is President of the International Union of Biological Sciences, and has received the Shanti Swarup Bhatnagar Prize and a J. C. Bose National Fellowship.",
    profiles: [{ label: "NCBS profile", url: "https://www.ncbs.res.in/people/lsshashidhara" }, { label: "Director's message", url: "https://www.ncbs.res.in/director-message" }, { label: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/?term=Shashidhara+LS%5BAuthor%5D" }],
    links: [{ label: "Source: NCBS profile page for the Director", url: "https://www.ncbs.res.in/people/lsshashidhara" }],
    tags: ["leadership", "research-institute", "clinician-scientist"], cancers: [] }),

  // =================== National Health Authority (Ayushman Bharat PM-JAY) ===================
  p({ id: "sunil-kumar-barnwal", name: "Sunil Kumar Barnwal", role: "Chief Executive Officer, National Health Authority (Ayushman Bharat PM-JAY)", institutionId: "nha-pmjay", specialisms: ["Public administration", "Health insurance and financing", "Digital health"],
    tldr: "Civil servant who leads the National Health Authority, the agency that runs India's Ayushman Bharat PM-JAY public health insurance scheme.",
    summary: "Sunil Kumar Barnwal leads the National Health Authority (NHA) as its Chief Executive Officer. The NHA is the Government of India agency responsible for implementing Ayushman Bharat Pradhan Mantri Jan Arogya Yojana (PM-JAY), the publicly funded health assurance scheme that covers hospital treatment, including cancer care, for eligible low-income families. The English Wikipedia article on the NHA lists him as the incumbent CEO; the NHA website itself could not be read for this record.",
    profiles: [{ label: "Wikipedia article on the National Health Authority", url: "https://en.wikipedia.org/wiki/National_Health_Authority" }],
    links: [{ label: "Source: Wikipedia article naming the CEO", url: "https://en.wikipedia.org/wiki/National_Health_Authority" }],
    tags: ["leadership", "government"], cancers: [] }),

  // =================== National Institute of Cancer Research and Hospital ===================
  p({ id: "mostafa-aziz-sumon", name: "Mostafa Aziz Sumon", role: "Director (In-charge) and Professor, Radiation Oncology, National Institute of Cancer Research and Hospital, Dhaka", institutionId: "nicrh-dhaka", specialisms: ["Radiation oncology", "Hospital management", "Cancer care access"],
    tldr: "Radiation oncologist who directs the National Institute of Cancer Research and Hospital in Dhaka, Bangladesh's only tertiary government hospital dedicated to cancer.",
    summary: "Mostafa Aziz Sumon is Director (In-charge) of the National Institute of Cancer Research and Hospital (NICRH) at Mohakhali, Dhaka, and a Professor (CC) in its Department of Radiation Oncology. The institute describes itself as the country's only tertiary-level government hospital dedicated to cancer care. In his director's message he emphasises combining advanced technology with compassionate care, and points to the addition of a linear accelerator in the Radiation Oncology Department as a step toward making treatment more accessible to the general public.",
    profiles: [{ label: "NICRH Director page", url: "https://nicrh.gov.bd/administrator/director" }, { label: "Director's message", url: "https://nicrh.gov.bd/administrator/directors-message" }, { label: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/?term=Sumon+MA%5BAuthor%5D" }],
    links: [{ label: "Source: NICRH Director page", url: "https://nicrh.gov.bd/administrator/director" }],
    tags: ["leadership", "clinician-scientist", "hospital-management"], cancers: [] }),

  // =================== National Medical Products Administration / Center for Drug Evaluation ===================
  p({ id: "huang-guo", name: "Huang Guo", role: "Commissioner, National Medical Products Administration (NMPA), China", institutionId: "nmpa-cde", specialisms: ["Drug regulation", "Medical device regulation", "Public administration"],
    tldr: "Commissioner of China's National Medical Products Administration, the regulator whose Center for Drug Evaluation reviews new cancer drugs for the Chinese market.",
    summary: "Huang Guo (黄果) is Commissioner of the National Medical Products Administration (NMPA), the Chinese regulator for drugs, medical devices and cosmetics, and the parent body of the Center for Drug Evaluation (CDE), which conducts technical review of new drug applications. The NMPA's English leadership page lists him as NMPA Commissioner, Secretary of the NMPA Leading Party Members' Group and a member of the Leading Party Members' Group of the State Administration for Market Regulation, alongside Deputy Commissioners Lei Ping, Yang Sheng and Wang Weidong. The Chinese Wikipedia article on the NMPA dates his appointment as Commissioner to April 2026. The CDE's own website did not return readable leadership information for this record.",
    profiles: [{ label: "NMPA leadership page (English)", url: "https://english.nmpa.gov.cn/leadership.html" }],
    links: [{ label: "Source: NMPA English leadership page", url: "https://english.nmpa.gov.cn/leadership.html" }, { label: "Wikipedia (Chinese) article on the NMPA", url: "https://zh.wikipedia.org/wiki/国家药品监督管理局" }],
    tags: ["leadership", "regulation", "government"], cancers: [] }),

  // =================== Nottingham University Hospitals Cancer Centre (City Hospital) ===================
  p({ id: "anthony-may", name: "Anthony May", role: "Chief Executive, Nottingham University Hospitals NHS Trust", institutionId: "nottingham-cancer-centre", specialisms: ["Public sector leadership", "Hospital management", "Health and local government"],
    tldr: "Former county council chief executive who has led Nottingham University Hospitals NHS Trust, which runs the Nottingham cancer centre at City Hospital, since September 2022.",
    summary: "Anthony May OBE DL is Chief Executive of Nottingham University Hospitals NHS Trust, the trust that runs Queen's Medical Centre, City Hospital (home of the Nottingham cancer centre), Ropewalk House and the National Rehabilitation Centre. He joined the trust as Chief Executive on 1 September 2022. He was previously Chief Executive of Nottinghamshire County Council from April 2015 to August 2022, responsible for a budget of about 1.1 billion pounds and around 18,000 staff, chaired the Midlands Engine Operating Board for five years and led the Association of County Council Chief Executives for more than two years.",
    profiles: [{ label: "NUH Meet the Board", url: "https://www.nuh.nhs.uk/meet-the-board" }],
    links: [{ label: "Source: Nottingham University Hospitals board page", url: "https://www.nuh.nhs.uk/meet-the-board" }],
    tags: ["leadership", "hospital-management"], cancers: [] }),

  // =================== Nova Scotia Health Cancer Care Program (QEII) ===================
  p({ id: "nicole-boutilier", name: "Nicole Boutilier", role: "President and Chief Executive Officer, Nova Scotia Health", institutionId: "nova-scotia-cancer-care", specialisms: ["Family medicine", "Health system leadership", "Physician leadership"],
    tldr: "Family physician who is President and CEO of Nova Scotia Health, the provincial health authority that runs the Cancer Care Program centred on the QEII Health Sciences Centre.",
    summary: "Nicole Boutilier is President and Chief Executive Officer of Nova Scotia Health, the provincial authority that operates the Nova Scotia Health Cancer Care Program. A family physician from Pictou County, she graduated from Dalhousie Medical School and completed her family medicine residency in Calgary, and has more than 30 years in medicine and 21 years in leadership roles. She was previously Executive Vice President of Medicine and Clinical Operations at Nova Scotia Health and co-lead of the Nova Scotia Office of Healthcare Professional Recruitment, led the organisation's Operational Excellence transformation, and received the 2026 Chris Carruthers Excellence in Medical Leadership Award. Nova Scotia Health's Cancer Care Program pages do not name a separate programme lead.",
    profiles: [{ label: "Nova Scotia Health profile", url: "https://www.nshealth.ca/featured-people/dr-nicole-boutilier" }, { label: "Nova Scotia Health executive team", url: "https://www.nshealth.ca/about-us/executive-team" }],
    links: [{ label: "Source: Nova Scotia Health executive team page", url: "https://www.nshealth.ca/about-us/executive-team" }],
    tags: ["leadership", "hospital-management", "government"], cancers: [] }),

  // =================== OncoZON Comprehensive Cancer Network ===================
  p({ id: "valery-lemmens", name: "Valery Lemmens", role: "Director, OncoZON (regional oncology network, south-east Netherlands)", institutionId: "oncozon", specialisms: ["Cancer epidemiology", "Cancer registries and surveillance", "Regional cancer networks"],
    tldr: "Cancer epidemiologist and professor who became Director of OncoZON, the oncology network of ten hospitals in the south-east Netherlands, in August 2026.",
    summary: "Valery Lemmens is Director of OncoZON, the regional oncology network of ten affiliated healthcare institutions in the south-east Netherlands that coordinates shared care pathways, expert teams and knowledge exchange for cancer care. He took up the post on 1 August 2026, succeeding René van der Hulst, who had led the network for three years. An epidemiologist, he has held a professorship in region-integrated cancer care at Maastricht University since 2024, spent more than 20 years with the Netherlands Comprehensive Cancer Organisation (IKNL), including as a board member from 2019 and later as medical adviser, and previously held board positions at Maastro and a professorship in cancer surveillance at Erasmus MC. Board chair Helen Mertens, CEO of Maastricht UMC+, announced the appointment.",
    profiles: [{ label: "OncoZON appointment announcement", url: "https://www.oncozon.nl/prof-dr-valery-lemmens-benoemd-tot-directeur-van-oncozon/" }, { label: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/?term=Lemmens+VE%5BAuthor%5D" }],
    links: [{ label: "Source: OncoZON news item announcing the appointment (August 2026)", url: "https://www.oncozon.nl/prof-dr-valery-lemmens-benoemd-tot-directeur-van-oncozon/" }],
    tags: ["leadership", "clinician-scientist", "comprehensive-cancer-centre"], cancers: [] }),

  // =================== Ontario Health (Cancer Care Ontario) ===================
  p({ id: "jon-irish", name: "Jon Irish", role: "Vice President, Clinical, Cancer Programs, Ontario Health", institutionId: "ontario-health-cancer-care-ontario", specialisms: ["Head and neck surgical oncology", "Reconstructive surgery", "Cancer system leadership"],
    tldr: "Head and neck surgical oncologist who leads the cancer programmes of Ontario Health, the agency that absorbed Cancer Care Ontario, and chairs its Clinical Council.",
    summary: "Jon Irish is Vice President, Clinical, Cancer Programs at Ontario Health, the provincial agency that took over the functions of Cancer Care Ontario, and chairs the Ontario Health Clinical Council. He is also Head of the Division of Head and Neck Oncology and Reconstructive Surgery at University Health Network in Toronto. Ontario Health's clinical leadership page describes its clinical leads as province-wide clinicians who shape strategy, set clinical standards and guidelines and design system improvements. Ontario Health's President and CEO is Matthew Anderson.",
    profiles: [{ label: "Ontario Health clinical leadership page", url: "https://www.ontariohealth.ca/about/who-we-are/clinical-leadership.html" }, { label: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/?term=Irish+JC%5BAuthor%5D" }],
    links: [{ label: "Source: Ontario Health clinical leadership page", url: "https://www.ontariohealth.ca/about/who-we-are/clinical-leadership.html" }, { label: "Ontario Health senior leadership page", url: "https://www.ontariohealth.ca/about/who-we-are/senior-leadership.html" }],
    tags: ["leadership", "clinician-scientist", "government"], cancers: [] }),

  // =================== Peking Union Medical College Hospital ===================
  p({ id: "zhang-shuyang", name: "Zhang Shuyang", role: "President (院长), Peking Union Medical College Hospital, Beijing", institutionId: "pumch", specialisms: ["Cardiology", "Hospital management", "Academic medicine"],
    tldr: "Physician who leads Peking Union Medical College Hospital, the flagship academic hospital of the Chinese Academy of Medical Sciences in Beijing.",
    summary: "Zhang Shuyang (张抒扬) leads Peking Union Medical College Hospital (PUMCH) in Beijing as its President. PUMCH, founded in 1921 and affiliated to Peking Union Medical College and the Chinese Academy of Medical Sciences, is a Class A tertiary comprehensive hospital designated by the National Health Commission as a national guiding centre for complex disorders and a demonstration centre for medical education. The Chinese Wikipedia article on the hospital names Zhang Shuyang as President; the hospital's own website did not return a readable leadership page for this record.",
    profiles: [{ label: "Wikipedia (Chinese) article on PUMCH", url: "https://zh.wikipedia.org/wiki/北京协和医院" }, { label: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/?term=Zhang+S%5BAuthor%5D+AND+Peking+Union+Medical+College+Hospital" }],
    links: [{ label: "Source: Chinese Wikipedia article naming the President", url: "https://zh.wikipedia.org/wiki/北京协和医院" }, { label: "PUMCH about page (English)", url: "https://www.pumch.cn/en/new_about.html" }],
    tags: ["leadership", "hospital-management", "clinician-scientist"], cancers: [] }),

  // =================== Queen's Centre for Oncology and Haematology, Castle Hill Hospital ===================
  p({ id: "lyn-simpson", name: "Lyn Simpson", role: "Group Chief Executive, NHS Humber Health Partnership (Hull University Teaching Hospitals NHS Trust)", institutionId: "queens-centre-hull", specialisms: ["Nursing", "NHS operations", "Hospital management"],
    tldr: "Nurse-trained NHS executive who has been Group Chief Executive of NHS Humber Health Partnership, which runs the Queen's Centre at Castle Hill Hospital, since July 2025.",
    summary: "Lyn Simpson is Group Chief Executive of NHS Humber Health Partnership, the group formed by Hull University Teaching Hospitals NHS Trust and Northern Lincolnshire and Goole NHS Foundation Trust, whose hospitals include Castle Hill Hospital and its Queen's Centre for Oncology and Haematology. She took up the post in July 2025 on secondment from North Cumbria Integrated Care NHS Foundation Trust. She trained as a nurse, health visitor and midwife, has served as an executive board director since 1992, and her earlier roles include Executive Director of Patient Services at Newcastle Hospitals and national Director of NHS Operations at the Department of Health and NHS England. She works alongside Group Chair Alan Downey and Group Chief Medical Officer Kate Wood.",
    profiles: [{ label: "NHS Humber Health Partnership board page", url: "https://www.nlg.nhs.uk/about/how-we-are-run/board/" }],
    links: [{ label: "Source: NHS Humber Health Partnership group board page", url: "https://www.nlg.nhs.uk/about/how-we-are-run/board/" }],
    tags: ["leadership", "hospital-management"], cancers: [] }),

  // =================== Radboudumc Centre for Oncology ===================
  p({ id: "bertine-lahuis", name: "Bertine Lahuis", role: "Chair of the Executive Board (voorzitter Raad van Bestuur), Radboudumc, Nijmegen", institutionId: "radboudumc", specialisms: ["Hospital governance", "Academic medicine", "Psychiatry"],
    tldr: "Chair of the executive board of Radboud university medical centre in Nijmegen, the academic hospital that houses the Radboudumc Centre for Oncology.",
    summary: "Bertine Lahuis chairs the Raad van Bestuur (Executive Board) of Radboudumc, the university medical centre of Radboud University in Nijmegen, which includes the Radboudumc Centre for Oncology. As of 1 April 2025 the board comprises Lahuis as chair, Jan Smit as dean and vice-chair, Lot Winkel-Rüter as chief financial officer and Frédérique van Berkestijn as chief operating officer. Board members are appointed for fixed terms by the Supervisory Board of the Radboud University Medical Center Foundation. The board page does not give individual appointment dates.",
    profiles: [{ label: "Radboudumc Raad van Bestuur page", url: "https://www.radboudumc.nl/over-het-radboudumc/organisatie/raad-van-bestuur" }],
    links: [{ label: "Source: Radboudumc executive board page", url: "https://www.radboudumc.nl/over-het-radboudumc/organisatie/raad-van-bestuur" }],
    tags: ["leadership", "hospital-management", "comprehensive-cancer-centre"], cancers: [] }),

  // =================== Rajiv Gandhi Cancer Institute and Research Centre ===================
  p({ id: "dharmendra-singh-gangwar", name: "Dharmendra Singh Gangwar", role: "Chief Executive Officer, Rajiv Gandhi Cancer Institute and Research Centre, Delhi", institutionId: "rgci", specialisms: ["Public health administration", "Health financing", "Hospital governance"],
    tldr: "Former Indian Administrative Service secretary and physician who is Chief Executive Officer of the Rajiv Gandhi Cancer Institute and Research Centre in Delhi.",
    summary: "Dharmendra Singh Gangwar is Chief Executive Officer of the Rajiv Gandhi Cancer Institute and Research Centre (RGCIRC), a not-for-profit specialist cancer hospital in Rohini, Delhi, with a second site at Niti Bagh. He holds an MBBS from King George's Medical College, Lucknow, and is a former member of the Indian Administrative Service and Secretary to the Government of India, with more than 35 years in public health, governance and institutional development. As Additional Secretary and Financial Advisor in the Ministry of Health and Family Welfare he oversaw a health budget of more than 82,000 crore rupees during the COVID-19 pandemic, and he also serves as President of AIIMS Rewari. The institute's Chairman is Ashok Kumar Agarwal and its Medical Director is Sudhir Rawal.",
    profiles: [{ label: "RGCIRC Office of CEO", url: "https://www.rgcirc.org/office-of-ceo/" }],
    links: [{ label: "Source: RGCIRC Office of CEO page", url: "https://www.rgcirc.org/office-of-ceo/" }, { label: "RGCIRC Office of Chairman page", url: "https://www.rgcirc.org/office-of-chairman/" }],
    tags: ["leadership", "hospital-management", "philanthropy"], cancers: [] }),

  // =================== Riga East University Hospital / Oncology Centre of Latvia ===================
  p({ id: "vadims-beluns", name: "Vadims Beļuns", role: "Chair of the Board (valdes priekšsēdētājs), Riga East University Hospital", institutionId: "riga-east-university-hospital", specialisms: ["Hospital management", "Health system strategy"],
    tldr: "Chair of the management board of Riga East University Hospital, Latvia's largest hospital and home of the Oncology Centre of Latvia.",
    summary: "Vadims Beļuns is Chair of the Board (valdes priekšsēdētājs) of SIA Rīgas Austrumu klīniskā universitātes slimnīca (Riga East University Hospital), the largest hospital in Latvia, whose sites include the Oncology Centre of Latvia. The hospital's board page lists him alongside board members Kaspars Plūme and Ineta Derjabo and describes his focus as achieving the hospital's strategic objectives under its 'Future Hospital' vision across clinical care, education and research. The Latvian Wikipedia article on the hospital gives his term of office as 2026 to 2031.",
    profiles: [{ label: "Riga East University Hospital board page", url: "https://aslimnica.lv/par-mums/valde/" }],
    links: [{ label: "Source: Riga East University Hospital board (valde) page", url: "https://aslimnica.lv/par-mums/valde/" }, { label: "Wikipedia (Latvian) article on the hospital", url: "https://lv.wikipedia.org/wiki/Rīgas_Austrumu_klīniskā_universitātes_slimnīca" }],
    tags: ["leadership", "hospital-management"], cancers: [] }),

  // =================== Rutgers Cancer Institute of New Jersey ===================
  p({ id: "steven-k-libutti", name: "Steven K. Libutti", role: "Director, Rutgers Cancer Institute of New Jersey", institutionId: "rutgers-cinj", specialisms: ["Surgical oncology", "Endocrine and neuroendocrine tumours", "Cancer centre leadership"],
    tldr: "Surgeon who directs Rutgers Cancer Institute of New Jersey, the state's NCI-designated comprehensive cancer centre.",
    summary: "Steven K. Libutti, MD, FACS, is Director of Rutgers Cancer Institute of New Jersey, which holds National Cancer Institute designation as a Comprehensive Cancer Center. He is a Fellow of the American College of Surgeons and runs the Libutti Laboratory within the institute's resident faculty research programme. The institute's website lists him at the head of its leadership and publishes a message from the Director under his name.",
    profiles: [{ label: "Rutgers Cancer Institute profile", url: "https://www.cinj.org/about-cinj/steven-k-libutti-md-facs" }, { label: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/?term=Libutti+SK%5BAuthor%5D" }],
    links: [{ label: "Source: Rutgers Cancer Institute leadership profile", url: "https://www.cinj.org/about-cinj/steven-k-libutti-md-facs" }, { label: "Rutgers Cancer Institute home page naming the Director", url: "https://www.cinj.org/" }],
    tags: ["leadership", "clinician-scientist", "comprehensive-cancer-centre"], cancers: [] }),

  // =================== Saint Savvas General Oncology Hospital of Athens ===================
  p({ id: "christos-fasianos", name: "Christos Fasianos", role: "President of the Board of Directors, Saint Savvas Anticancer Oncology Hospital of Athens", institutionId: "saint-savvas-athens", specialisms: ["Hospital governance", "Public hospital administration"],
    tldr: "President of the governing board of Saint Savvas, the public anticancer oncology hospital in Athens.",
    summary: "Christos Fasianos (Χρήστος Φασιανός) is President of the Board of Directors (Πρόεδρος Διοικητικού Συμβουλίου) of the Saint Savvas Anticancer Oncology Hospital of Athens (Γενικό Αντικαρκινικό Ογκολογικό Νοσοκομείο Αθηνών 'Ο Άγιος Σάββας'), a public specialist cancer hospital in Athens. The hospital's governing bodies page lists him as President and Georgia Pontiki (Γεωργία Ποντίκη) as Vice President, together with regular and alternate board members. The page gives no appointment date or biography.",
    profiles: [{ label: "Saint Savvas governing bodies page", url: "https://agsavvas-hosp.gr/organa-dioikisis/" }],
    links: [{ label: "Source: Saint Savvas hospital governing bodies (Organa Dioikisis) page", url: "https://agsavvas-hosp.gr/organa-dioikisis/" }],
    tags: ["leadership", "hospital-management"], cancers: [] }),
];
