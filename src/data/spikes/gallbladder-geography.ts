import type { CancerGeography, GeoSource } from "@/lib/cancer-geography";
import type { Spike } from "./index";

/**
 * GALLBLADDER CANCER: THE GEOGRAPHY LAYER. Facts checked 2026-09-24 against the pages cited on each row.
 *
 * Gallbladder cancer has the most uneven map of any common cancer: rare in western Europe and most of the United
 * States, common along the Ganges, in the Andes, in Pakistan, Nepal and Bangladesh, in Korea and Japan, among Native
 * American and Hispanic populations of the Americas and, historically, in central and eastern Europe. This file holds
 * the country rates by sex (GLOBOCAN 2022, read from the IARC Cancer Today API on the date above and written to
 * public/globocan/sites/12-gallbladder-by-sex.json), the regions with the papers that describe them, Chile's GES
 * prophylactic cholecystectomy programme, India's registry figures, Japan's registry and guideline practice, and the
 * prevention evidence. Abstracts were read through Europe PMC; the Indian registry figures come from the NCRP report
 * chapters themselves; the Japanese figures from the National Cancer Center's statistics page. No figure is remembered.
 *
 * The spike adds no entities: the map and the cards render from `gallbladderGeography` (registered in
 * src/lib/cancer-geography.ts), and the patch and supplements tie the layer to records other files own.
 */
const asOf = "2026-09-24";
const GB = "gallbladder";

const doi = (label: string, d: string, date?: string): GeoSource => ({ label, url: `https://doi.org/${d}`, date });
const epmc = (label: string, pmid: string, date?: string): GeoSource => ({ label, url: `https://europepmc.org/article/MED/${pmid}`, date });

// ======================= SOURCES =======================
const S = {
  gco: { label: "IARC Global Cancer Observatory, Cancer Today: GLOBOCAN 2022 estimates (gallbladder, C23), read through the Cancer Today API", url: "https://gco.iarc.who.int/today", date: asOf },
  gcoApi: { label: "IARC Cancer Today API v3, GLOBOCAN 2022 factsheet endpoint (one request per population, all sexes)", url: "https://gco-api.iarc.fr/api/globocan/v3/2022/meta/populations/all/", date: asOf },
  randi: epmc("Randi, Franceschi and La Vecchia, Gallbladder cancer worldwide: geographical distribution and risk factors, Int J Cancer 2006", "16397865", "2006"),
  hundal: epmc("Hundal and Shaffer, Gallbladder cancer: epidemiology and outcome, Clin Epidemiol 2014", "24634588", "2014"),
  lazcano: epmc("Lazcano-Ponce et al, Epidemiology and molecular pathology of gallbladder cancer, CA Cancer J Clin 2001", "11760569", "2001"),
  roa: doi("Roa et al, Gallbladder cancer, Nature Reviews Disease Primers 2022", "10.1038/s41572-022-00398-y", "2022"),
  are2017: epmc("Are et al, Global epidemiological trends and variations in the burden of gallbladder cancer (GLOBOCAN 2012), J Surg Oncol 2017", "28138977", "2017"),
  vuthaluru: epmc("Vuthaluru et al, Global epidemiological trends and variations in the burden of gallbladder cancer (GLOBOCAN 2020), J Surg Oncol 2023", "37818916", "2023"),
  torre: epmc("Torre et al, Worldwide burden of and trends in mortality from gallbladder and other biliary tract cancers, Clin Gastroenterol Hepatol 2018", "28826679", "2018"),
  // India
  ncrpCh5: { label: "ICMR-NCDIR, Report of National Cancer Registry Programme 2020 (2012-2016), Chapter 5, Fig. 5.12: gall bladder (C23-C24), comparison of age-adjusted incidence rates of 28 PBCRs", url: "https://ncdirindia.org/All_Reports/Report_2020/resources/Chapter5ComparisonofcancerincidenceandpatternsofallPopulationBasedCancerRegistries.pdf", date: "2020" },
  ncrpCh13: { label: "ICMR-NCDIR, Report of National Cancer Registry Programme 2020 (2012-2016), Chapter 13: trends in cancer incidence (Delhi, Dibrugarh)", url: "https://ncdirindia.org/All_Reports/Report_2020/resources/Chapter13TrendsinCancerIncidence.pdf", date: "2020" },
  ncrpReport: { label: "ICMR-NCDIR, Report of National Cancer Registry Programme 2020: report page and chapter downloads", url: "https://ncdirindia.org/All_Reports/Report_2020/default.aspx", date: asOf },
  mathur: epmc("Mathur et al, Cancer Statistics, 2020: report from National Cancer Registry Programme, India, JCO Global Oncology 2020", "32673076", "2020"),
  shanker: epmc("Shanker et al, Cancer scenario in North-East India and need for an appropriate research agenda, Indian J Med Res 2021", "34782528", "2021"),
  dutta: epmc("Dutta et al, Epidemiology of gallbladder cancer in India, Chin Clin Oncol 2019", "31484488", "2019"),
  malhotraDelhi: epmc("Malhotra et al, Gallbladder cancer incidence in Delhi urban: a 25-year trend analysis, Indian J Cancer 2017", "30082556", "2017"),
  malhotra2024: epmc("Malhotra et al, Demographical and epidemiological contribution to cancer incidence in Delhi and its trends from 1991-2015, Asian Pac J Cancer Prev 2024", "38679980", "2024"),
  mhatreBirth: epmc("Mhatre et al, Place of birth and risk of gallbladder cancer in India, Indian J Cancer 2016", "28071634", "2016"),
  mhatreOil: epmc("Mhatre et al, Mustard oil consumption, cooking method, diet and gallbladder cancer risk in high- and low-risk regions of India, Int J Cancer 2020", "32142159", "2020"),
  mishra: epmc("Mishra et al, Risk factors for gallbladder cancer development in northern India: a gallstones-matched case-control study, Indian J Med Res 2021", "35532588", "2021"),
  thomasNe: epmc("Thomas et al, Gallbladder cancer risk factors in Northeast India: population attributable fractions with global evidence, J Clin Exp Hepatol 2026", "41684861", "2026"),
  saikia: epmc("Saikia et al, Trend analysis of gallbladder cancer for Dibrugarh district, Assam, 2003-2016, Indian J Surg Oncol 2022", "35782802", "2022"),
  // Chile, Bolivia and the Andes
  supersalud: { label: "Superintendencia de Salud (Chile): the GES problems of health, number 26, Colecistectomía preventiva del cáncer de vesícula en personas de 35 a 49 años", url: "https://www.supersalud.gob.cl/difusion/665/w3-propertyvalue-1962.html", date: asOf },
  samaniego: doi("Samaniego et al, Gallbladder cancer: is it time to modify the Explicit Health Guarantees (GES) programme?, Rev Med Chile 2024", "10.4067/s0034-98872024001001028", "2024"),
  mardones: doi("Mardones and Frenz, Changes in gallbladder cancer mortality and hospital discharges after the GES guarantee, Rev Med Chile 2019", "10.4067/s0034-98872019000700860", "2019"),
  cid: epmc("Cid et al, Gallbladder cancer mortality in Chile: has the government programme targeting young gallstone patients had an impact?, Am J Epidemiol 2024", "38576158", "2024"),
  boekstegers2023: epmc("Boekstegers et al, Development and internal validation of a multifactorial risk prediction model for gallbladder cancer in a high-incidence country, Int J Cancer 2023", "37260300", "2023"),
  boekstegers2025: epmc("Boekstegers et al, Gallbladder cancer and dysplasia in cholecystectomy specimens: a large study in high-incidence regions of South America, Clin Gastroenterol Hepatol 2025", "40015496", "2025"),
  izarzugaza: epmc("Izarzugaza et al, Burden of gallbladder cancer in Central and South America, Cancer Epidemiol 2016", "27678326", "2016"),
  mirandaFilho: epmc("Miranda-Filho et al, Gallbladder and extrahepatic bile duct cancers in the Americas: incidence and mortality patterns and trends, Int J Cancer 2020", "31922259", "2020"),
  strom: epmc("Strom et al, Risk factors for gallbladder cancer: an international collaborative case-control study (La Paz and Mexico City), Cancer 1995", "8625043", "1995"),
  bermejo: doi("Lorenzo Bermejo et al, Subtypes of Native American ancestry and leading causes of death: Mapuche ancestry-specific associations with gallbladder cancer risk in Chile, PLoS Genetics 2017", "10.1371/journal.pgen.1006756", "2017"),
  salazar: epmc("Salazar et al, Gallbladder cancer in South America: epidemiology and prevention, Chin Clin Oncol 2019", "31431040", "2019"),
  // Pakistan, Nepal, Bangladesh
  alvi: epmc("Alvi, Siddiqui and Zafar, Risk factors of gallbladder cancer in Karachi: a case-control study, World J Surg Oncol 2011", "22151791", "2011"),
  qureshi: epmc("Qureshi et al, The frequency and associated factors of typhoid carriage in patients undergoing cholecystectomy for gallbladder disease in Pakistan, PLoS Negl Trop Dis 2024", "38865361", "2024"),
  thakur: epmc("Thakur et al, Risk factors of gallbladder cancer in Nepal: a case-control study, PLoS One 2025", "39841771", "2025"),
  tamrakar: epmc("Tamrakar et al, Risk factors for gallbladder cancer in Nepal: a case-control study, Asian Pac J Cancer Prev 2016", "27509990", "2016"),
  // Korea and Japan
  wi: epmc("Wi et al, Trends in gallbladder cancer incidence and survival in Korea (Korea Central Cancer Registry, 1999-2013), Cancer Res Treat 2018", "29370591", "2018"),
  kang2025: epmc("Kang et al, Incidence, mortality and survival of gallbladder, extrahepatic bile duct and pancreatic cancers in Korea: a population-based study from 1999 to 2022, Ann Hepatobiliary Pancreat Surg 2025", "40717397", "2025"),
  parkKorea: epmc("Park et al, Cancer statistics in Korea: incidence, mortality, survival and prevalence in 2022, Cancer Res Treat 2025", "40083085", "2025"),
  ganjoho: { label: "National Cancer Center Japan, Cancer Information Service: gallbladder and bile duct cancer statistics (胆のう・胆管), national cancer registry 2023 and vital statistics 2024", url: "https://ganjoho.jp/reg_stat/statistics/stat/cancer/9_gallbladder.html", date: asOf },
  makiuchi: epmc("Makiuchi and Sobue, Descriptive epidemiology of biliary tract cancer incidence and geographic variation in Japan (national cancer registry 2016-2017), Eur J Cancer Prev 2023", "35485392", "2023"),
  ishihara: epmc("Ishihara et al, Biliary tract cancer registry in Japan from 2008 to 2013, J Hepatobiliary Pancreat Sci 2016", "26699688", "2016"),
  kayahara: epmc("Kayahara and Nagakawa, Recent trends of gallbladder cancer in Japan: an analysis of 4,770 patients, Cancer 2007", "17594719", "2007"),
  nagino: epmc("Nagino et al, Clinical practice guidelines for the management of biliary tract cancers 2019: the 3rd English edition (Japanese Society of Hepato-Biliary-Pancreatic Surgery), J Hepatobiliary Pancreat Sci 2021", "33259690", "2021"),
  // The Americas
  henley: epmc("Henley et al, Gallbladder cancer incidence and mortality, United States 1999-2011, Cancer Epidemiol Biomarkers Prev 2015", "26070529", "2015"),
  lemrow: epmc("Lemrow et al, Gallbladder cancer incidence among American Indians and Alaska Natives, US, 1999-2004, Cancer 2008", "18720382", "2008"),
  kosuru: epmc("Kosuru et al, Persistently higher ratio of gallbladder cancer incidence in Native American people than in non-Hispanic Whites: selected United States regions, 1962-2021, J Racial Ethn Health Disparities 2026", "42024224", "2026"),
  nemunaitis: epmc("Nemunaitis et al, Gallbladder cancer: review of a rare orphan gastrointestinal cancer with a focus on populations of New Mexico, BMC Cancer 2018", "29914418", "2018"),
  abboud: epmc("Abboud et al, Racial and ethnic disparities in gallbladder cancer: a two-decade analysis of incidence and mortality rates in the US, Cancer Medicine 2024", "38963040", "2024"),
  // Europe
  levi: epmc("Levi et al, The recent decline in gallbladder cancer mortality in Europe, Eur J Cancer Prev 2003", "12883377", "2003"),
  // Prevention
  diehl: epmc("Diehl, Gallstone size and the risk of gallbladder cancer, JAMA 1983", "6632129", "1983"),
  moerman: epmc("Moerman et al, Gallstone size and the risk of gallbladder cancer (Dutch case-control study), Scand J Gastroenterol 1993", "8322023", "1993"),
  sheth: epmc("Sheth, Bedford and Chopra, Primary gallbladder cancer: recognition of risk factors and the role of prophylactic cholecystectomy, Am J Gastroenterol 2000", "10894571", "2000"),
  nagaraja: doi("Nagaraja and Eslick, Systematic review with meta-analysis: the relationship between chronic Salmonella typhi carrier status and gall-bladder cancer, Aliment Pharmacol Ther 2014", "10.1111/apt.12655", "2014"),
  koshiolTyphi: doi("Koshiol et al, Salmonella enterica serovar Typhi and gallbladder cancer: a case-control study and meta-analysis, Cancer Medicine 2016", "10.1002/cam4.915", "2016"),
  koshiolAflatoxin: epmc("Koshiol et al, Association of aflatoxin and gallbladder cancer (Shanghai case-control study), Gastroenterology 2017", "28428144", "2017"),
  nogueira: epmc("Nogueira et al, Association of aflatoxin with gallbladder cancer in Chile, JAMA 2015 (research letter; no abstract indexed)", "26010638", "2015"),
  koshiolAflatoxinChina: doi("Koshiol et al, Association of aflatoxin with gallbladder cancer in a case-control study nested within a Chinese cohort, Int J Cancer 2024", "10.1002/ijc.34755", "2024"),
} satisfies Record<string, GeoSource>;

// ======================= THE LAYER =======================
export const gallbladderGeography: CancerGeography = {
  cancerId: GB,
  cancerName: "Gallbladder cancer",
  asOf,
  siteCode: 12,
  headline: "GLOBOCAN 2022 estimates 122,491 new gallbladder cancers and 89,055 deaths a year worldwide, an age-standardised rate of 1.15 per 100,000; but Bolivia (7.64) and Chile (5.72) run at five to seven times the world rate, Bangladesh and Nepal follow, and inside India the women of Kamrup (Assam) are registered at 16.2 per 100,000 against a national estimate of 2.08. Women carry most of the burden almost everywhere except Korea and Japan.",

  regions: [
    {
      id: "gangetic-belt", title: "Northern India and the Gangetic belt", countries: ["IND"], glyph: "river",
      summary: "India contributes about a tenth of the world's gallbladder cancer, and almost all of it comes from the north, north-east, centre and east of the country: the Gangetic plain from Delhi through Uttar Pradesh and Bihar to Assam. The south and west have rates as low as western Europe's.",
      detail: "The National Cancer Registry Programme's 2012-2016 report places Kamrup urban (Guwahati, Assam) first of 28 population-based registries for gallbladder and biliary tract cancer (C23-C24), with age-adjusted rates of 16.2 per 100,000 in women and 7.9 in men, followed by Cachar district (11.9 and 5.6) and Delhi (11.6 and 5.4); Papumpare district in Arunachal Pradesh reaches 10.7 in women. Randi's 2006 review had already recorded 21.5 per 100,000 in Delhi women, the highest registry rate then published anywhere. In Delhi 12,410 gallbladder cancers were registered between 1988 and 2012, two thirds of them in women, and the cancer made up 6 percent of all Delhi cancers in 2012, with rates rising in both sexes after 2004; the NCRP trend chapter gives Delhi men a 4.2 percent annual rise and Dibrugarh men 10.8 percent. Being born in a high-risk region carries an odds ratio of 4.82 for the cancer, the risk climbs with years lived there, and it does not disappear on moving south (odds ratio 1.36), which points at something environmental met early in life. Gallstones are present in about 80 percent of Indian patients; in north-east India a population attributable fraction of 65 percent was calculated for gallstone disease, with mustard oil used in 96 percent of households and tubewell water in two thirds. Nationally GLOBOCAN 2022 estimates only 1.51 per 100,000 (2.08 in women), nineteenth in the world, because the south and west dilute the average.",
      sources: [S.ncrpCh5, S.ncrpCh13, S.randi, S.malhotraDelhi, S.mhatreBirth, S.dutta, S.thomasNe, S.shanker, S.mathur, S.gco],
      refs: ["paper-dutta-gallbladder-cancer-epidemiology-india-chin-clin-oncol-2019", "paper-patkar-tata-memorial-gallbladder-cancer-registry-cancer-epidemiol-2025", "tata-memorial", "homi-bhabha-cancer-hospital-varanasi", "icmr-ncrp"],
    },
    {
      id: "andes", title: "Chile, Bolivia and the Andes", countries: ["CHL", "BOL", "PER", "ECU"], glyph: "mountain",
      summary: "The two highest national rates in the world are Andean: GLOBOCAN 2022 puts Bolivia at 7.64 per 100,000 and Chile at 5.72, with women at 8.36 and 7.43. Chile has treated the cancer as a public health emergency for two decades and is the only country with a national prevention programme.",
      detail: "In WHO mortality data for 2009-2013 Chilean women died of gallbladder and other biliary cancers at 21.2 per 100,000, the highest of 50 countries and 26 times South Africa's 0.8; Chilean men at 9.9, also the highest. Registry data for 2003-2007 gave Chile the highest incidence in Central and South America and the world, 17.1 per 100,000 in women and 7.3 in men. Ancestry matters: in La Paz, speaking Aymara well carried an odds ratio of 15.9 against mestizos, and in Chile Mapuche ancestry raises risk in proportion to its share of the genome. Lazcano-Ponce's 2001 review recorded mortality of 3.5 to 15.5 per 100,000 among Chilean Mapuche, Bolivians and Chilean Hispanics, with Peru, Ecuador and Colombia intermediate; Randi's review placed Quito women at 12.9. The good news is direction: Chilean incidence fell in both sexes between 1998 and 2012, and mortality has been falling for two decades. In 10,561 gallstone patients operated on in Argentina, Bolivia, Chile and Peru, cancer or dysplasia was likeliest with clinical suspicion, planned open surgery, female sex, stones over 3 cm, high cholesterol, smoking and age; the mean age at cholecystectomy was 47, at high-grade dysplasia 62 and at cancer 64, a window of fifteen years.",
      sources: [S.gco, S.torre, S.izarzugaza, S.mirandaFilho, S.strom, S.bermejo, S.lazcano, S.randi, S.boekstegers2025, S.salazar],
      refs: ["paper-samaniego-chile-ges-programme-evaluation-rev-med-chile-2024", "paper-cid-chile-programme-gallbladder-cancer-mortality-am-j-epidemiol-2024", "prophylactic-cholecystectomy"],
    },
    {
      id: "pakistan", title: "Pakistan", countries: ["PAK"], glyph: "coast",
      summary: "Gallbladder cancer is the second commonest gastrointestinal cancer in Pakistani women. The Karachi registry gave South Karachi women 13.8 per 100,000 in Randi's review, the second highest registry rate in the world after Delhi.",
      detail: "GLOBOCAN 2022 estimates 2,841 cases a year in Pakistan and a women's rate of 2.55 per 100,000 against 1.02 in men. In a Karachi case-control study of 60 cancers and 120 gallstone controls, age over 55 (odds ratio 7.27), a solitary stone (3.33) and a stone over 1 cm (2.73) were independent risk factors and 78 percent of patients were women. Typhoid carriage, a recognised risk factor, is still common: of 988 people having their gallbladder removed for gallstones in two Pakistani centres, 3.4 percent had Salmonella Typhi or Paratyphi DNA in the gallbladder, more often in the stones than in bile or tissue.",
      sources: [S.randi, S.alvi, S.qureshi, S.gco],
      refs: ["salmonella-typhi-gallbladder-cancer"],
    },
    {
      id: "nepal-bangladesh", title: "Nepal and Bangladesh", countries: ["NPL", "BGD", "BTN"], glyph: "river",
      summary: "GLOBOCAN 2022 places Bangladesh third (5.25 per 100,000; 7.7 in women, the second highest women's rate anywhere) and Nepal fourth (4.36; 5.5 in women). Both are modelled estimates rather than registry counts, which the map marks.",
      detail: "Neither country has a national cancer registry, so GLOBOCAN assigns its incidence method 9 to both (rates carried over from neighbouring populations), and the analysis of GLOBOCAN 2020 by Vuthaluru and colleagues that ranked Bolivia, Chile, Bangladesh and Nepal highest by age-standardised rate rests on the same modelling. The Nepalese case-control literature is consistent with a real excess: gallbladder cancer is the sixth cancer and second gastrointestinal cancer of Nepalese women; a 2012-2013 study found a gallstone history carried an odds ratio of 27.6; and a 2021-2022 study of 120 cases found Terai or Madhesi ethnicity (adjusted odds ratio 7.88), three or more births (2.80), pesticide exposure (4.04) and a diet low in fruit and vegetables (2.69) associated with the cancer, noting that Nepal ranked fourth in the world in 2020. No population-based gallbladder cancer paper from Bangladesh was found.",
      sources: [S.gco, S.vuthaluru, S.thakur, S.tamrakar],
    },
    {
      id: "korea-japan", title: "Korea and Japan", countries: ["KOR", "JPN", "PRK"], glyph: "island",
      summary: "East Asia is the one high-rate region where men are affected as often as women. Korea's rate (2.62 per 100,000, sixth in the world) is higher in men (2.93) than women (2.36); Japan's 1.88 is identical in both sexes. Both countries run national registries and have watched the age-standardised rate fall while case counts rise with ageing.",
      detail: "The Korea Central Cancer Registry recorded 52,712 gallbladder cancers between 1999 and 2022. The crude incidence doubled from 2.8 to 5.6 per 100,000 as the population aged, but the age-standardised rate fell from 2.9 to 2.2; the share operated on within four months of diagnosis rose from 42.3 to 48.2 percent and five-year relative survival from 21.9 to 32.1 percent. Earlier registry work found a female-to-male incidence ratio of 0.96, the highest rates in Ulsan and Gyeongsangnam-do and the lowest in Seoul, and a 0.5 percent annual fall in men from 1999 to 2013. Japan's National Cancer Center counts gallbladder and bile duct cancer together: 20,926 diagnoses in 2023 (11,451 men, 9,475 women), 17,232 deaths in 2024 and a five-year relative survival of 24.8 percent for those diagnosed in 2018. The national registry for 2016-2017 separated 16,568 gallbladder cancers from 24,602 extrahepatic and 12,497 intrahepatic bile duct cancers and found the gallbladder rate similar in men and women, unlike the bile duct sites. Randi's review recorded the same pattern: female-to-male ratios near 1 in the Far East against 3 elsewhere.",
      sources: [S.gco, S.kang2025, S.wi, S.ganjoho, S.makiuchi, S.randi, S.parkKorea],
      refs: ["ncc-japan", "snuh"],
    },
    {
      id: "americas", title: "Native American and Hispanic populations of the Americas", countries: ["USA", "MEX"], glyph: "people",
      summary: "The United States as a whole is a low-rate country (1.13 cases per 100,000 a year in 2007-2011), but American Indian and Alaska Native people have three times the rate of non-Hispanic whites, and in the Southwest and Alaska five to eight times. Hispanic Americans and Mexican Americans sit in between.",
      detail: "About 3,700 Americans were diagnosed and 2,000 died each year in 2007-2011, two thirds of them women; incidence and death rates were three times higher among American Indian and Alaska Native people than non-Hispanic whites, and varied about two-fold between states. Linked Indian Health Service records for 1999-2004 gave American Indians and Alaska Natives 3.3 per 100,000, ranging from 1.5 in the East to 5.5 in Alaska. A 2026 meta-analysis of six decades of data found the disparity persisting: 3 to 3.5-fold nationally, 6 to 8.5-fold in Alaska and the Southwest, and about six-fold in current Arizona and New Mexico registry data. In New Mexico, Lazcano-Ponce recorded mortality of 11.3 per 100,000 among American Indians, and Hispanic New Mexicans have long been known to carry an excess. Across the Americas, US Hispanics had the highest incidence of any US group in GLOBOCAN 2018 (1.8 per 100,000 in women). US incidence has been falling in every group except non-Hispanic Black Americans, in whom it rose 2.08 percent a year from 2001 to 2014, mostly at distant stage.",
      sources: [S.henley, S.lemrow, S.kosuru, S.lazcano, S.nemunaitis, S.mirandaFilho, S.abboud, S.hundal],
    },
    {
      id: "eastern-europe", title: "Central and eastern Europe", countries: ["POL", "CZE", "SVK", "HUN", "HRV"], glyph: "map",
      summary: "Poland, the Czech Republic and Slovakia have Europe's highest gallbladder cancer rates and Hungary had women's mortality above 6 per 100,000 until the early 1990s. The gap with western Europe has narrowed as cholecystectomy became routine, but it has not closed.",
      detail: "Levi and colleagues traced the decline: in the European Union age-standardised mortality fell about 30 percent in women between the late 1980s and 1999 to 1.8 per 100,000 and about 10 percent in men to 1.4, while in the Czech Republic and Hungary women's rates stayed above 6 until the early 1990s and then fell about a quarter, with men's rates above 3 showing no consistent trend; they attributed the western decline mainly to the earlier and wider adoption of cholecystectomy, since gallstones are the major risk factor. GLOBOCAN 2022 still shows Slovakia (1.23 per 100,000), Czechia (1.22) and Poland (1.17) at about double Germany (0.57) and the United Kingdom (0.73). Torre's analysis of WHO mortality to 2014 found rates falling by 2 percent or more a year in most high-risk populations, Croatia excepted, but turning upward since the mid-2000s in women in the United Kingdom and the Netherlands and in men in Germany, which the authors linked to rising body weight.",
      sources: [S.lazcano, S.levi, S.gco, S.torre, S.randi],
    },
  ],

  programmes: [
    {
      id: "chile-ges", country: "CHL", title: "Chile: GES guarantee number 26, preventive cholecystectomy at 35 to 49", glyph: "scalpel",
      what: [
        "Since 2006 Chile's Explicit Health Guarantees (GES, formerly AUGE) have listed 'Colecistectomía preventiva del cáncer de vesícula en personas de 35 a 49 años' as guaranteed problem number 26: anyone aged 35 to 49 with gallstones is entitled to have the gallbladder removed, with access, timeliness, quality and financial protection guaranteed by law.",
        "It is the only national programme in the world that removes gallbladders to prevent cancer. By 2024, 284,139 GES notifications had been issued to patients in the age band with gallstones, matching the cholecystectomies performed under the programme.",
        "What the evaluations show: national gallbladder cancer mortality fell, and fell faster in the 35 to 49 group, in the first years after 2006 (Mardones and Frenz, 2002 to 2014 data); but the Rev Med Chile analysis of 2024 notes mortality was already falling before the programme and that the regions with most notifications are not always the regions with most cancer; the American Journal of Epidemiology analysis of 2024, with US National Cancer Institute authors, is the most rigorous test yet of whether the programme itself moved the curve.",
        "Number needed to operate: a Chilean risk model puts it at 115 cholecystectomies to prevent one gallbladder cancer by age 70 for gallstone carriers as a group, falling to 92 with non-genetic risk factors (body mass index, education, Mapuche surnames, number of children, family history) and 80 when Mapuche ancestry and a risk genotype are added, an argument for targeting rather than age alone.",
      ],
      detail: "The Ministry of Health's own GES pages (auge.minsal.cl) refused automated reading on the check date (HTTP 403), so the programme's name and number are quoted from the Superintendencia de Salud's list of GES problems and its start year and age band from the peer-reviewed evaluations; the current clinical guideline PDF could not be located.",
      sources: [S.supersalud, S.boekstegers2023, S.samaniego, S.mardones, S.cid],
      refs: ["paper-samaniego-chile-ges-programme-evaluation-rev-med-chile-2024", "paper-mardones-frenz-chile-ges-mortality-rev-med-chile-2019", "paper-cid-chile-programme-gallbladder-cancer-mortality-am-j-epidemiol-2024", "prophylactic-cholecystectomy"],
    },
    {
      id: "india-ncrp", country: "IND", title: "India: the National Cancer Registry Programme and the hospital registries", glyph: "registry",
      what: [
        "India has no national population register of cancer. The ICMR has run the National Cancer Registry Programme since 1982 from Bengaluru (ICMR-NCDIR, now ICMR-NINE); its 2020 report pools 28 population-based and 58 hospital-based registries for 2012-2016 and projects national counts from them, which is why India's estimates differ between sources.",
        "For gallbladder and biliary tract cancer (ICD-10 C23-C24) the report's Figure 5.12 ranks Kamrup urban first in both sexes (age-adjusted rate 16.2 per 100,000 in women, 7.9 in men), then Cachar (11.9 and 5.6), Delhi (11.6 and 5.4) and, in women, Papumpare (10.7). The registry publishes the gallbladder together with the extrahepatic bile ducts; a gallbladder-only (C23) rate is not given in the chapters read.",
        "Trends: in Delhi the age-adjusted rate in men rose 4.2 percent a year and in Dibrugarh district (Assam) 10.8 percent a year over the registry's trend window; Delhi's 25-year series shows both sexes rising after 2004. The report's summary paper singles out Kamrup urban's rise in all cancers combined (3.8 percent a year).",
        "Hospital registries fill the gaps: Tata Memorial's gallbladder cancer registry (Patkar 2025) describes the presenting stage and treatment of a national referral population, and the Mumbai case-control programme behind the place-of-birth and mustard-oil papers drew 1,170 cases from the same hospital.",
      ],
      detail: "The registry's report page and chapter PDFs were read directly on the check date (HTTP 200); the JCO Global Oncology summary paper of the same report gives the projected national count of 1,392,179 cancers for 2020 and names the Kamrup urban trend, but does not itself carry the gallbladder rates, which sit in Chapter 5.",
      sources: [S.ncrpReport, S.ncrpCh5, S.ncrpCh13, S.mathur, S.malhotraDelhi, S.mhatreOil],
      refs: ["icmr-ncrp", "tata-memorial", "paper-patkar-tata-memorial-gallbladder-cancer-registry-cancer-epidemiol-2025", "paper-dutta-gallbladder-cancer-epidemiology-india-chin-clin-oncol-2019"],
    },
    {
      id: "japan-practice", country: "JPN", title: "Japan: registry, guideline and surgical practice", glyph: "scalpel",
      what: [
        "Japan counts every case through its national cancer registry and publishes gallbladder and bile duct cancer together: 20,926 diagnoses in 2023, 17,232 deaths in 2024, crude incidence 16.8 per 100,000 and five-year relative survival 24.8 percent (27.5 percent in men, 21.7 in women) for those diagnosed in 2018.",
        "The Japanese Society of Hepato-Biliary-Pancreatic Surgery has published clinical practice guidelines for biliary tract cancers since 2007; the third edition (2019, English 2021) answers 31 clinical questions on six topics, the first of which is prophylactic treatment, followed by diagnosis, biliary drainage, surgery, chemotherapy and radiotherapy, with 14 strong and 14 weak GRADE recommendations.",
        "The Society's own registry of 18,606 biliary tract cancers treated between 2008 and 2013 reports five-year survival of 39.8 percent for gallbladder cancer in this operated population, against 24.2 percent for perihilar and 39.1 percent for distal bile duct cancer; an earlier community series of 4,774 patients (1988-1997) found survival tracking stage, 77 percent at five years in stage I falling to 3 percent in stage IVB, with no survival gain from more aggressive resection or adjuvant chemotherapy over that decade.",
        "There is no population screening programme for gallbladder cancer in Japan; the abdominal ultrasound that is part of routine health checks finds polyps and stones, and the guideline's prophylactic-treatment section is where the decision to remove a gallbladder for a large polyp, a porcelain gallbladder or an anomalous pancreaticobiliary junction is set out.",
      ],
      detail: "The National Cancer Center statistics page was read in Japanese on the check date; the survival and registry figures are quoted from the abstracts of the papers named. The guideline recommendations themselves are behind the journal's paywall and are described here only as far as the abstract goes.",
      sources: [S.ganjoho, S.nagino, S.ishihara, S.kayahara, S.makiuchi],
      refs: ["ncc-japan", "gallbladder-polyp", "porcelain-gallbladder", "anomalous-pancreaticobiliary-junction"],
    },
  ],

  figures: [
    { label: "Age-adjusted incidence, gallbladder and biliary tract (C23-C24), women", value: "16.2 per 100,000", place: "Kamrup urban (Guwahati, Assam), India", period: "2012-2016", source: S.ncrpCh5, note: "Highest of 28 Indian population-based registries; men 7.9. Cachar 11.9 and 5.6; Delhi 11.6 and 5.4; Papumpare 10.7 in women." },
    { label: "Age-adjusted incidence, gallbladder, women (registry data)", value: "21.5 per 100,000", place: "Delhi, India", period: "as compiled in 2006", source: S.randi, note: "The highest registry rate in Randi's worldwide review; South Karachi 13.8 and Quito 12.9 followed." },
    { label: "Gallbladder cancers registered over 25 years", value: "12,410 (4,010 men, 8,400 women)", place: "Delhi population-based registry", period: "1988-2012", source: S.malhotraDelhi, note: "6 percent of all Delhi cancers in 2012; rates rising in both sexes after 2004." },
    { label: "Age-standardised mortality, gallbladder and other biliary cancers, women", value: "21.2 per 100,000", place: "Chile", period: "2009-2013", source: S.torre, note: "Highest of 50 countries in WHO mortality data; men 9.9, also the highest. South Africa lowest at 0.8." },
    { label: "Age-standardised incidence, gallbladder cancer", value: "17.1 women, 7.3 men per 100,000", place: "Chile (registries)", period: "2003-2007", source: S.izarzugaza, note: "Mortality 12.9 and 6.0; the highest in Central and South America." },
    { label: "GES preventive cholecystectomy notifications since 2006", value: "284,139", place: "Chile, ages 35 to 49 with gallstones", period: "2006-2024", source: S.samaniego },
    { label: "Cholecystectomies needed to prevent one gallbladder cancer by age 70", value: "115 (92 to 80 with risk targeting)", place: "Chile, gallstone carriers", period: "model, 2023", source: S.boekstegers2023 },
    { label: "Gallbladder cancers in the Korea Central Cancer Registry", value: "52,712", place: "Republic of Korea", period: "1999-2022", source: S.kang2025, note: "Crude incidence 2.8 to 5.6 per 100,000; age-standardised 2.9 to 2.2; five-year relative survival 21.9 to 32.1 percent." },
    { label: "Gallbladder and bile duct cancer diagnoses", value: "20,926 (11,451 men, 9,475 women)", place: "Japan, national cancer registry", period: "2023", source: S.ganjoho, note: "17,232 deaths in 2024; five-year relative survival 24.8 percent for 2018 diagnoses." },
    { label: "Gallbladder cancer incidence and mortality", value: "1.13 cases and 0.62 deaths per 100,000", place: "United States", period: "2007-2011", source: S.henley, note: "About 3,700 cases and 2,000 deaths a year; American Indian and Alaska Native rates three times non-Hispanic white rates." },
    { label: "Incidence among American Indians and Alaska Natives", value: "3.3 per 100,000 (1.5 East to 5.5 Alaska)", place: "United States, IHS delivery-area counties", period: "1999-2004", source: S.lemrow },
    { label: "Age-standardised mortality, gallbladder cancer, women", value: "over 6 per 100,000 until the early 1990s", place: "Czech Republic and Hungary", period: "1980-1999", source: S.levi, note: "European Union women 1.8 and men 1.4 by 1999 after a 30 percent fall." },
  ],

  prevention: [
    {
      id: "cholecystectomy-stone-size", title: "Removing gallbladders with large stones", glyph: "scalpel", strength: "mixed",
      evidence: "Gallstones are the strongest risk factor (pooled relative risk 4.9 in Randi's review), and size seems to matter: in Diehl's 1983 case-control study of 81 cancers, stones of 2.0 to 2.9 cm carried an odds ratio of 2.4 and stones of 3 cm or more 10.1 against stones under 1 cm; a Dutch study of 72 cancers in 1993 found no relation; Karachi found stones over 1 cm (odds ratio 2.73) and solitary stones (3.33) independent risks; and the 10,561-patient South American cholecystectomy series lists stones over 3 cm among the factors for cancer and dysplasia. Diehl himself asked for replication before changing the management of silent stones, and no randomised trial of prophylactic cholecystectomy for asymptomatic stones has been run anywhere; Chile's programme, which operates by age rather than stone size, is the nearest thing to a population test and its evaluations are summarised above.",
      sources: [S.randi, S.diehl, S.moerman, S.alvi, S.boekstegers2025, S.sheth, S.lazcano],
      refs: ["prophylactic-cholecystectomy", "simple-cholecystectomy"],
    },
    {
      id: "typhoid-carriage", title: "Finding and treating chronic Salmonella Typhi carriers", glyph: "microbe", strength: "untested",
      evidence: "Chronic typhoid carriage, which lives in the gallbladder, roughly quadruples the risk: pooled odds ratio 4.28 across 17 studies (Nagaraja and Eslick 2014), summary relative risk 4.6 for anti-Vi antibodies and 5.0 for bile or stone culture (Koshiol 2016), pooled relative risk 4.8 in Randi's review, and an odds ratio of 12.7 for physician-diagnosed typhoid in La Paz. Carriage is still common where the cancer is common: 3.4 percent of 988 Pakistani cholecystectomy patients carried S. Typhi or Paratyphi DNA, mostly in the stones. Treating carriers, by antibiotics or cholecystectomy, is standard for typhoid control but has never been tested as a cancer prevention measure; no trial was found.",
      sources: [S.nagaraja, S.koshiolTyphi, S.randi, S.strom, S.qureshi],
      refs: ["salmonella-typhi-gallbladder-cancer", "paper-koshiol-salmonella-typhi-gallbladder-cancer-cancer-med-2016", "paper-nagaraja-eslick-typhi-carrier-gallbladder-cancer-meta-analysis-apt-2014"],
    },
    {
      id: "aflatoxin", title: "Cutting aflatoxin exposure", glyph: "grain", strength: "suggestive",
      evidence: "Aflatoxin, the mould toxin that causes liver cancer, is now linked to the gallbladder too. In Shanghai, aflatoxin B1-lysine adducts were found in the plasma of 32 percent of 209 gallbladder cancer patients against 15 percent of 250 gallstone controls (odds ratio 2.71; 7.61 for the top against the bottom quartile), a population attributable fraction of 20 percent; the JAMA research letter of 2015 reported the same association in Chile, and a 2024 case-control study nested in a Chinese cohort extended it. Red chilli peppers from Bolivia, Peru and Chile have been found contaminated with aflatoxin and ochratoxin. Reducing exposure is a plausible lever in the Andes and the Gangetic belt but has not been tested as prevention.",
      sources: [S.koshiolAflatoxin, S.nogueira, S.koshiolAflatoxinChina],
      refs: ["paper-roa-gallbladder-cancer-primer-nat-rev-dis-primers-2022"],
    },
    {
      id: "cholecystectomy-uptake", title: "Routine cholecystectomy for symptomatic stones", glyph: "map", strength: "consistent",
      evidence: "The clearest natural experiment is Europe's: mortality fell about 30 percent in EU women between the late 1980s and 1999 while the laparoscopic operation spread, and Levi and colleagues attribute the fall, and the persisting excess in central and eastern Europe, mainly to how early and how widely cholecystectomy was adopted. Randi's review reaches the same conclusion: the diagnosis of gallstones and removal of the gallbladder are today's keystone of prevention, with obesity, cholecystitis and stone formation the targets for the future.",
      sources: [S.levi, S.randi, S.torre],
      refs: ["simple-cholecystectomy", "gallbladder-cancer-roadmap"],
    },
  ],

  spotlights: [
    {
      id: "india", country: "IND", flag: "🇮🇳", title: "Gallbladder cancer in India", route: "/countries/in/#gallbladder",
      lede: "About one gallbladder cancer in six worldwide is Indian (GLOBOCAN 2022: 21,780 of 122,491 cases), and the cancer is concentrated along the Ganges and in Assam, where registries record rates ten times the national estimate. Presentation is late and patients are younger than in the West, in their fifties and sixties.",
      points: [
        "Where: the north, north-east, centre and east; Kamrup urban, Cachar, Delhi and Papumpare lead the registries. Born in a high-risk region: odds ratio 4.82, rising with years of residence and persisting after migration (1.36).",
        "Why: gallstones in 80 percent of patients and a 65 percent population attributable fraction in the north-east; chronic Salmonella Typhi and Helicobacter infection, adulterated mustard oil (odds ratio 3.01 for high consumption in the low-risk region, 1.33 in the high-risk region), unsafe water, heavy metals and low socioeconomic status act together on a vulnerable gallbladder.",
        "What is being tested: India runs the world's only randomised trials of pre-operative treatment for gallbladder cancer, POLCAGB (chemoradiation versus chemotherapy before surgery, Tata Memorial), NEOGB (neoadjuvant chemotherapy, Rajiv Gandhi Cancer Institute, 114 patients) and RUGB (chemoradiation for unresectable disease, 249 patients).",
        "Who treats it: Tata Memorial in Mumbai and its Varanasi hospital on the Ganges, AIIMS Delhi, PGIMER Chandigarh and the Rajiv Gandhi Cancer Institute; the corpus links the centres and their trials below.",
      ],
      figures: [
        { label: "New cases and deaths (GLOBOCAN 2022 estimate)", value: "21,780 cases, 16,407 deaths", place: "India", period: "2022", source: S.gco, note: "Age-standardised incidence 1.51 per 100,000 (women 2.08, men 0.96); nineteenth in the world." },
        { label: "Age-adjusted incidence, C23-C24, women / men", value: "Kamrup urban 16.2 / 7.9; Cachar 11.9 / 5.6; Delhi 11.6 / 5.4", place: "NCRP population-based registries", period: "2012-2016", source: S.ncrpCh5 },
        { label: "Annual rise in age-adjusted rate, men", value: "Delhi 4.2 percent; Dibrugarh 10.8 percent", place: "NCRP trend registries", period: "report of 2020", source: S.ncrpCh13 },
        { label: "Share of the global burden", value: "about 10 percent", place: "India", period: "review of 2019", source: S.dutta },
      ],
      sources: [S.gco, S.ncrpCh5, S.ncrpCh13, S.dutta, S.mhatreBirth, S.mhatreOil, S.thomasNe, S.mishra],
      refs: ["polcagb", "neogb", "rugb", "tata-memorial", "homi-bhabha-cancer-hospital-varanasi", "aiims-delhi", "pgimer-chandigarh", "rgci", "icmr-ncrp", "paper-dutta-gallbladder-cancer-epidemiology-india-chin-clin-oncol-2019", "paper-patkar-tata-memorial-gallbladder-cancer-registry-cancer-epidemiol-2025"],
    },
    {
      id: "chile", country: "CHL", flag: "🇨🇱", title: "Gallbladder cancer in Chile",
      lede: "Chile has the world's second highest national rate (5.72 per 100,000; 7.43 in women) and the highest recorded mortality, and it is the only country to have written gallbladder cancer prevention into law: since 2006 the GES guarantee has entitled every 35 to 49 year old with gallstones to a cholecystectomy.",
      points: [
        "Where and who: highest in the south and among people of Mapuche ancestry, whose share of Native American ancestry tracks risk gene by gene; Aymara ancestry carries a similar excess across the border in Bolivia, the only country with a higher rate.",
        "The trend is down: incidence fell in both sexes between 1998 and 2012 and mortality has fallen for two decades, though the fall began before the programme and the evaluations disagree on how much of it the programme caused.",
        "The next step is targeting: a Chilean risk model cuts the number of operations needed to prevent one cancer from 115 to 80 by adding body mass index, education, Mapuche surnames and ancestry, family history and a risk genotype to age and stones; the 2024 review in Rev Med Chile asks for the programme to be redesigned around such risk and around the regions where the cancer is commonest.",
        "Chile also anchors the biology: the five-country exome study found Chilean tumours had the lowest mutation burden, and the aflatoxin association was first reported in Chilean patients (JAMA 2015) before the Shanghai study put numbers on it.",
      ],
      figures: [
        { label: "New cases and deaths (GLOBOCAN 2022 estimate)", value: "1,917 cases, 1,236 deaths", place: "Chile", period: "2022", source: S.gco, note: "Age-standardised incidence 5.72 per 100,000 (women 7.43, men 3.85); second in the world after Bolivia (7.64)." },
        { label: "Age-standardised mortality, women / men (C23-C24)", value: "21.2 / 9.9 per 100,000", place: "Chile", period: "2009-2013", source: S.torre },
        { label: "GES notifications for preventive cholecystectomy", value: "284,139", place: "Chile, ages 35 to 49", period: "2006-2024", source: S.samaniego },
        { label: "Change in incidence", value: "declining in both sexes", place: "Chile", period: "1998-2012", source: S.mirandaFilho },
      ],
      sources: [S.gco, S.torre, S.izarzugaza, S.supersalud, S.samaniego, S.mardones, S.cid, S.boekstegers2023, S.bermejo, S.mirandaFilho],
      refs: ["paper-samaniego-chile-ges-programme-evaluation-rev-med-chile-2024", "paper-mardones-frenz-chile-ges-mortality-rev-med-chile-2019", "paper-cid-chile-programme-gallbladder-cancer-mortality-am-j-epidemiol-2024", "prophylactic-cholecystectomy", "paper-roa-gallbladder-cancer-primer-nat-rev-dis-primers-2022"],
    },
  ],

  gaps: [
    "GLOBOCAN's women's and men's rates were read from the Cancer Today API on 24 September 2026 for 185 countries and the world (no population failed); the site-wide countries.json still carries both sexes only, and the two agree to the last decimal for the gallbladder site. GLOBOCAN marks Bangladesh, Nepal, Bhutan and North Korea with incidence method 9 (rates carried over from neighbouring countries), so their high positions rest on modelling, not registration; the map shows the method code in each country's tooltip.",
    "The Chilean Ministry of Health GES pages (auge.minsal.cl) returned HTTP 403 to automated reading, and the preventive cholecystectomy clinical guideline PDF was not found at two former addresses (HTTP 404). The programme's name and number come from the Superintendencia de Salud's list of GES problems; its start year, age band and coverage from the three peer-reviewed evaluations.",
    "India's National Cancer Registry Programme publishes gallbladder cancer together with the extrahepatic bile ducts (C23-C24) and its latest pooled report covers 2012-2016; a gallbladder-only registry rate and more recent registry years were not found in the chapters read. National estimates of 21,780 cases (GLOBOCAN) and the 'about 10 percent of the global burden' (Dutta 2019) are not directly comparable.",
    "Japan's National Cancer Center statistics page counts gallbladder and bile duct cancer together (C23-C24); gallbladder-only counts come from the national registry paper for 2016-2017 (16,568 cases). The Korea Central Cancer Registry's own web page could not be read for a gallbladder figure; Korean figures are quoted from the registry's peer-reviewed reports.",
    "No population-based paper was found for Algeria or Libya, which GLOBOCAN 2022 nevertheless places fifth and ninth by age-standardised incidence (methods 2b and 2a: rates projected from regional registries); no paper was found for Bangladesh either, and none for eastern Europe published after 2010, so the European rows rest on GLOBOCAN and on Levi (2003) and Torre (2018).",
    "The US SEER gallbladder Cancer Stat Facts page returned HTTP 404 on the check date; US figures are quoted from Henley (2015), Lemrow (2008), Kosuru (2026) and Abboud (2024).",
    "Nogueira's 2015 JAMA research letter on aflatoxin in Chile has no abstract indexed in Europe PMC and is cited by title only; the Shanghai study carries the figures. The Japanese guideline's recommendations on prophylactic cholecystectomy are behind a paywall and are described only as far as its abstract goes.",
    "No randomised trial of prophylactic cholecystectomy for asymptomatic gallstones, of typhoid-carrier treatment for cancer prevention, or of aflatoxin reduction with gallbladder cancer as an endpoint was found in Europe PMC.",
  ],
};

// ======================= SPIKE =======================
const spike: Spike = {
  cancerId: GB,
  entities: [],
  // The three Chilean evaluations cite each other; the prevention terms gain the geography sources; the Indian trials
  // and the NCRP record gain their place on the map.
  supplements: [
    { id: "paper-samaniego-chile-ges-programme-evaluation-rev-med-chile-2024", related: ["paper-mardones-frenz-chile-ges-mortality-rev-med-chile-2019", "paper-cid-chile-programme-gallbladder-cancer-mortality-am-j-epidemiol-2024"], links: [{ label: "Superintendencia de Salud: GES problem 26, preventive cholecystectomy at 35 to 49", url: S.supersalud.url }] },
    { id: "paper-mardones-frenz-chile-ges-mortality-rev-med-chile-2019", related: ["paper-samaniego-chile-ges-programme-evaluation-rev-med-chile-2024"] },
    { id: "prophylactic-cholecystectomy", links: [{ label: "Superintendencia de Salud: GES problem 26, preventive cholecystectomy at 35 to 49", url: S.supersalud.url }, { label: S.boekstegers2023.label, url: S.boekstegers2023.url }, { label: S.diehl.label, url: S.diehl.url }] },
    { id: "salmonella-typhi-gallbladder-cancer", links: [{ label: S.qureshi.label, url: S.qureshi.url }, { label: S.strom.label, url: S.strom.url }] },
    { id: "icmr-ncrp", cancers: [GB], links: [{ label: S.ncrpCh5.label, url: S.ncrpCh5.url }] },
    { id: "polcagb", tags: ["india"] },
    { id: "neogb", tags: ["india"] },
    { id: "rugb", tags: ["india"] },
  ],
  patch: {
    links: [
      { label: "IARC Cancer Today: GLOBOCAN 2022 (gallbladder, C23) by country and sex", url: S.gco.url },
      { label: "ICMR-NCDIR: National Cancer Registry Programme report 2020, gall bladder (C23-C24) by registry", url: S.ncrpCh5.url },
      { label: "Superintendencia de Salud (Chile): GES problem 26, preventive cholecystectomy at 35 to 49", url: S.supersalud.url },
      { label: "National Cancer Center Japan: gallbladder and bile duct cancer statistics", url: S.ganjoho.url },
    ],
    openProblems: [
      "Why the map looks as it does: gallstones explain much of the excess in the Andes, the Gangetic belt and Pakistan but not the sex ratio of Korea and Japan, nor why India's south is spared; ancestry (Mapuche, Aymara, Native American), typhoid carriage, aflatoxin, mustard oil and water contamination are each supported by case-control studies and none by a prevention trial.",
    ],
  },
};

export default spike;
