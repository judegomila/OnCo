/**
 * Symptom-to-test pathways: about 40 presenting symptoms, each mapped to the cancers they can (rarely) signal,
 * the first-line test, and the referral thresholds guidelines actually state.
 *
 * Ids in `cancers`, `tests` and `terms` reference existing corpus entities and are validated at build by
 * src/app/symptoms/page.tsx (graph().must()) and by src/lib/symptom-paths.test.ts.
 *
 * Thresholds are quoted from NICE NG12 "Suspected cancer: recognition and referral" (UK, updated 2023) and from
 * USPSTF or American Cancer Society (ACS) guidance (US). Where a source gives no numeric threshold, none is given
 * here. Most causes of every symptom below are not cancer; the pages say so.
 */
export type SymptomGroup = "general" | "chest" | "digestive" | "urinary" | "gynaecological" | "breast" | "skin" | "head and neck" | "brain and nerves" | "blood" | "bone and soft tissue" | "children";

export type SymptomPath = {
  id: string;
  label: string;
  aka?: string[];
  group: SymptomGroup;
  /** What the symptom is and its common, non-cancer causes. */
  plain: string;
  /** Features that raise concern, from the cited guideline. */
  redFlags: string[];
  /** Cancer ids this symptom can point to (validated). */
  cancers: string[];
  /** Technology ids for the usual first tests (validated). */
  tests: string[];
  /** Glossary term ids worth reading (validated). */
  terms?: string[];
  /** Which test comes first and what it rules in or out. */
  firstTest: string;
  referral: {
    /** UK criteria, quoting NICE NG12. */
    uk: string;
    /** NG12 recommendation number(s). */
    ukRef?: string;
    /** US guidance (USPSTF, ACS, NCCN). */
    us: string;
    sources: Array<{ label: string; url: string }>;
  };
};

const NG12 = { label: "NICE NG12: Suspected cancer, recognition and referral", url: "https://www.nice.org.uk/guidance/ng12/chapter/Recommendations-organised-by-site-of-cancer" };
const NG12_NONSITE = { label: "NICE NG12: recommendations organised by symptom", url: "https://www.nice.org.uk/guidance/ng12/chapter/Recommendations-organised-by-symptom-and-findings-of-primary-care-investigations" };
const acs = (slug: string, label: string) => ({ label: `ACS: signs and symptoms of ${label}`, url: `https://www.cancer.org/cancer/types/${slug}/detection-diagnosis-staging/signs-and-symptoms.html` });
const uspstf = (slug: string, label: string) => ({ label: `USPSTF: ${label} screening`, url: `https://www.uspreventiveservicestaskforce.org/uspstf/recommendation/${slug}` });

export const SYMPTOM_PATHS: SymptomPath[] = [
  // ---------- General ----------
  {
    id: "unexplained-weight-loss", label: "Unexplained weight loss", group: "general",
    plain: "Losing weight without trying. Thyroid disease, diabetes, depression, gut conditions and medicines are far more common causes than cancer, but persistent loss with no explanation always deserves a check.",
    redFlags: ["Weight loss together with abdominal pain, change in bowel habit, cough, breathlessness or difficulty swallowing", "Aged 40 or over", "Loss of appetite, night sweats or fatigue at the same time"],
    cancers: ["colorectal", "pancreatic", "gastric", "esophageal", "nsclc", "cancer-of-unknown-primary", "dlbcl"],
    tests: ["ct", "colorectal-screening", "ultrasound"],
    terms: ["fit-test", "tumour-marker", "early-detection-term"],
    firstTest: "Blood tests first (full blood count, liver and kidney function, calcium, inflammatory markers, glucose, thyroid), a stool FIT test if there are any bowel symptoms, then a chest X-ray or CT of the chest, abdomen and pelvis if nothing explains it. Normal bloods and a normal CT make a hidden cancer much less likely but do not exclude it.",
    referral: {
      uk: "NICE NG12 says: offer a FIT test to people aged 40 and over with unexplained weight loss and abdominal pain; consider an urgent direct-access CT (or ultrasound if CT is not available) in people aged 60 and over with weight loss and any of diarrhoea, back pain, abdominal pain, nausea, vomiting, constipation or new-onset diabetes (pancreatic cancer); and consider a chest X-ray in people aged 40 and over with weight loss plus one other unexplained chest symptom.",
      ukRef: "1.3.1, 1.2.9, 1.1.1, 1.13",
      us: "No US screening body covers unexplained weight loss as a symptom. The ACS lists it as a general symptom that should be reported to a doctor; work-up follows the accompanying symptoms.",
      sources: [NG12_NONSITE, { label: "ACS: signs and symptoms of cancer", url: "https://www.cancer.org/cancer/diagnosis-staging/signs-and-symptoms-of-cancer.html" }],
    },
  },
  {
    id: "persistent-fatigue", label: "Persistent, unexplained tiredness", aka: ["fatigue"], group: "general",
    plain: "Tiredness that does not lift with rest. Anaemia, thyroid problems, sleep disorders, infection, low mood and medicines account for most cases. Cancer is a rare cause, usually through anaemia or a blood cancer.",
    redFlags: ["Pallor, bruising, bleeding or repeated infections alongside the tiredness", "Fever or night sweats", "Enlarged lymph nodes or a swollen spleen"],
    cancers: ["all-leukemia", "aml", "cll", "mds", "multiple-myeloma", "colorectal"],
    tests: ["flow-cytometry-mrd", "colorectal-screening"],
    terms: ["fit-test", "bone-marrow"],
    firstTest: "A full blood count, film and ferritin. Anaemia points towards iron loss (and a FIT test); abnormal white cells or platelets point towards a blood disorder and haematology review.",
    referral: {
      uk: "NICE NG12 says: consider a very urgent full blood count (within 48 hours) in adults with persistent fatigue together with pallor, unexplained fever, unexplained persistent or recurrent infection, generalised lymphadenopathy, unexplained bruising, bleeding or petechiae, or hepatosplenomegaly, to assess for leukaemia.",
      ukRef: "1.10.1",
      us: "No US screening recommendation. ACS lists extreme tiredness as a symptom of leukaemia and of anaemia from bowel bleeding; a complete blood count is the usual first test.",
      sources: [NG12, acs("acute-myeloid-leukemia", "acute myeloid leukaemia")],
    },
  },
  {
    id: "night-sweats-fever", label: "Night sweats or unexplained fever", group: "general",
    plain: "Drenching sweats at night or fevers with no infection found. Infections, menopause, medicines and anxiety are usual explanations. Lymphoma and leukaemia are the cancers that classically cause them.",
    redFlags: ["Weight loss of more than a tenth of body weight over six months", "Painless enlarged lymph nodes", "Itching without a rash", "Lymph node pain after alcohol"],
    cancers: ["hodgkin-lymphoma", "dlbcl", "follicular-lymphoma", "all-leukemia", "aml"],
    tests: ["ultrasound", "ct", "fdg-pet", "histopathology-ihc"],
    terms: ["lymph-node", "biopsy", "lymphoma-type"],
    firstTest: "Full blood count, inflammatory markers and lactate dehydrogenase, an examination for enlarged nodes and spleen, then imaging (ultrasound or CT) and an excision biopsy of any suspicious node. Lymphoma is diagnosed only on tissue.",
    referral: {
      uk: "NICE NG12 says: consider a suspected cancer pathway referral (appointment within 2 weeks) for adults with unexplained lymphadenopathy or splenomegaly, taking into account fever, night sweats, shortness of breath, pruritus, weight loss and alcohol-induced lymph node pain. Consider a very urgent full blood count (48 hours) for unexplained fever.",
      ukRef: "1.10.8, 1.10.10, 1.10.1",
      us: "No US screening recommendation. ACS lists fever, night sweats and weight loss as the B symptoms of lymphoma; evaluation is a blood count, imaging and node biopsy.",
      sources: [NG12, acs("hodgkin-lymphoma", "Hodgkin lymphoma")],
    },
  },
  {
    id: "lump-in-neck", label: "Lump in the neck", aka: ["swollen glands", "cervical lymphadenopathy"], group: "head and neck",
    plain: "A new lump or swollen gland in the neck. Most are reactive lymph nodes after a throat or dental infection and settle within a few weeks. A hard, painless, persistent lump needs assessment.",
    redFlags: ["Persists beyond 3 to 6 weeks", "Hard, fixed or growing", "Aged 45 or over", "Hoarseness, mouth ulcer, difficulty swallowing, or a smoking or alcohol history", "Night sweats, fever or weight loss"],
    cancers: ["head-and-neck", "nasopharyngeal", "thyroid", "salivary-gland", "hodgkin-lymphoma", "dlbcl", "cancer-of-unknown-primary"],
    tests: ["ultrasound", "thyroid-fna-molecular", "ct", "histopathology-ihc"],
    terms: ["lymph-node", "biopsy", "hpv-p16"],
    firstTest: "Ultrasound of the neck with a fine-needle aspiration or core biopsy of the lump. This tells apart a reactive node, a thyroid nodule, a salivary tumour and a cancer deposit; a cancer deposit then triggers a search for the primary in the mouth, throat or thyroid.",
    referral: {
      uk: "NICE NG12 says: consider a suspected cancer pathway referral (within 2 weeks) for people aged 45 and over with a persistent unexplained lump in the neck (laryngeal cancer), for people with a persistent unexplained lump in the neck (oral cancer), and for an unexplained thyroid lump.",
      ukRef: "1.8.1, 1.8.2, 1.8.4",
      us: "No US screening recommendation. ACS: a lump or mass in the neck is a common first sign of oral, throat, thyroid and nasopharyngeal cancers and of lymphoma; ultrasound with needle biopsy is the standard first step.",
      sources: [NG12, acs("oral-cavity-and-oropharyngeal-cancer", "oral and oropharyngeal cancer"), acs("thyroid-cancer", "thyroid cancer")],
    },
  },
  {
    id: "enlarged-lymph-nodes", label: "Swollen lymph nodes elsewhere (armpit, groin, generalised)", group: "blood",
    plain: "Lymph nodes swell with infection and inflammation and usually shrink again within two to three weeks. Nodes that stay enlarged, keep growing, or appear at several sites at once are the concern.",
    redFlags: ["Node larger than about 2 cm, hard or rubbery, painless", "Several regions involved", "Fever, night sweats, weight loss or itching", "Armpit node in a woman aged 30 or over with no breast lump found"],
    cancers: ["dlbcl", "follicular-lymphoma", "hodgkin-lymphoma", "cll", "mantle-cell-lymphoma", "breast-hr-positive", "melanoma"],
    tests: ["ultrasound", "ct", "fdg-pet", "flow-cytometry-mrd", "histopathology-ihc"],
    terms: ["lymph-node", "biopsy", "lymphoma-type"],
    firstTest: "A full blood count and film (chronic lymphocytic leukaemia shows up here), then ultrasound and a core or excision biopsy of the node. Fine-needle aspiration is not enough to classify lymphoma.",
    referral: {
      uk: "NICE NG12 says: consider a suspected cancer pathway referral (within 2 weeks) for adults with unexplained lymphadenopathy or splenomegaly, and consider a suspected cancer pathway referral for people aged 30 and over with an unexplained lump in the axilla (breast cancer).",
      ukRef: "1.10.8, 1.10.10, 1.4.2",
      us: "No US screening recommendation. ACS: painless swelling of nodes in the neck, armpit or groin is the most common symptom of lymphoma; imaging and node biopsy follow.",
      sources: [NG12, acs("non-hodgkin-lymphoma", "non-Hodgkin lymphoma")],
    },
  },

  // ---------- Chest ----------
  {
    id: "persistent-cough", label: "Cough lasting more than three weeks", group: "chest",
    plain: "A cough that will not clear. Post-viral cough, asthma, reflux, post-nasal drip and blood pressure tablets are the common causes. Lung cancer is uncommon but the one that matters to exclude, especially in people who have smoked.",
    redFlags: ["Coughing up blood", "Aged 40 or over with a second unexplained symptom (fatigue, breathlessness, chest pain, weight loss, appetite loss)", "Ever smoked", "Repeated chest infections, finger clubbing, hoarseness"],
    cancers: ["nsclc", "sclc", "mesothelioma"],
    tests: ["ct", "low-dose-ct-screening", "robotic-bronchoscopy", "pet-ct"],
    terms: ["screening", "biopsy"],
    firstTest: "A chest X-ray, then a CT of the chest if the X-ray is abnormal or the symptoms persist despite a normal X-ray. A chest X-ray misses a meaningful share of lung cancers, so a normal film with ongoing symptoms should not end the enquiry.",
    referral: {
      uk: "NICE NG12 says: offer an urgent chest X-ray (within 2 weeks) to people aged 40 and over with two or more unexplained symptoms (cough, fatigue, shortness of breath, chest pain, weight loss, appetite loss), or one of these if they have ever smoked; refer via the suspected cancer pathway if the X-ray suggests lung cancer or if aged 40 and over with unexplained haemoptysis.",
      ukRef: "1.1.1 to 1.1.3",
      us: "USPSTF recommends annual low-dose CT screening for adults aged 50 to 80 with a 20 pack-year smoking history who currently smoke or quit within the past 15 years. A symptomatic cough is investigated regardless of screening eligibility, usually with a chest X-ray then CT.",
      sources: [NG12, uspstf("lung-cancer-screening", "lung cancer"), acs("lung-cancer", "lung cancer")],
    },
  },
  {
    id: "coughing-blood", label: "Coughing up blood", aka: ["haemoptysis"], group: "chest",
    plain: "Blood in sputum. A chest infection or bronchitis is the usual cause, and streaks after a heavy cough often mean nothing more. Repeated or unexplained haemoptysis needs a chest X-ray and often a CT quickly.",
    redFlags: ["Aged 40 or over", "Any smoking history", "Weight loss, breathlessness or chest pain", "More than streaks, or recurring"],
    cancers: ["nsclc", "sclc"],
    tests: ["ct", "robotic-bronchoscopy", "pet-ct"],
    terms: ["biopsy", "cancer-stage"],
    firstTest: "Urgent chest X-ray and CT of the chest; bronchoscopy if a central lesion is seen or the CT is unrevealing but the bleeding persists.",
    referral: {
      uk: "NICE NG12 says: refer people using a suspected cancer pathway referral (appointment within 2 weeks) for lung cancer if they are aged 40 and over with unexplained haemoptysis.",
      ukRef: "1.1.1",
      us: "No US screening recommendation applies to a symptom. ACS lists coughing up blood or rust-coloured sputum as a lung cancer symptom needing prompt evaluation.",
      sources: [NG12, acs("lung-cancer", "lung cancer")],
    },
  },
  {
    id: "breathlessness", label: "New or worsening breathlessness", aka: ["shortness of breath", "dyspnoea"], group: "chest",
    plain: "Getting out of breath more easily than before. Heart and lung disease, anaemia, anxiety and being out of condition explain the great majority. Cancer causes breathlessness through a lung tumour, fluid around the lung, or anaemia.",
    redFlags: ["Aged 40 or over with a second unexplained chest symptom", "Ever smoked, or asbestos exposure", "Chest pain or a persistent cough alongside", "One-sided dull chest ache (possible pleural fluid)"],
    cancers: ["nsclc", "sclc", "mesothelioma"],
    tests: ["ct", "ultrasound"],
    terms: ["screening"],
    firstTest: "Chest X-ray (which also shows pleural fluid), full blood count for anaemia, and a CT of the chest if the X-ray is abnormal or the symptoms continue. Fluid around the lung is sampled and sent for cytology.",
    referral: {
      uk: "NICE NG12 says: offer an urgent chest X-ray (within 2 weeks) to people aged 40 and over with two or more unexplained symptoms including shortness of breath, or one if they have ever smoked; the same rule applies for mesothelioma, adding people who have been exposed to asbestos.",
      ukRef: "1.1.1, 1.1.4",
      us: "No US screening recommendation applies to a symptom. ACS lists shortness of breath among the symptoms of lung cancer and of mesothelioma; a chest X-ray is the usual first test.",
      sources: [NG12, acs("malignant-mesothelioma", "mesothelioma")],
    },
  },
  {
    id: "chest-pain", label: "Persistent chest or shoulder pain", group: "chest",
    plain: "Chest pain has many causes, and heart disease must be ruled out first. Pain from a lung cancer is usually a dull ache that persists for weeks, sometimes felt in the shoulder or arm.",
    redFlags: ["Aged 40 or over with another unexplained chest symptom", "Smoking history", "Worse with breathing and lasting weeks", "Weight loss"],
    cancers: ["nsclc", "sclc", "mesothelioma"],
    tests: ["ct"],
    firstTest: "A chest X-ray once cardiac causes are excluded, then CT of the chest if it is abnormal or the pain persists.",
    referral: {
      uk: "NICE NG12 says: offer an urgent chest X-ray (within 2 weeks) to people aged 40 and over with two or more unexplained symptoms including chest pain, or one if they have ever smoked.",
      ukRef: "1.1.1",
      us: "No US screening recommendation applies to a symptom. ACS lists chest pain that is often worse with deep breathing, coughing or laughing as a lung cancer symptom.",
      sources: [NG12, acs("lung-cancer", "lung cancer")],
    },
  },
  {
    id: "hoarse-voice", label: "Hoarse voice for more than three weeks", aka: ["hoarseness"], group: "head and neck",
    plain: "A rough or weak voice. Laryngitis, voice strain and reflux are the usual causes and settle within three weeks. Hoarseness that persists, particularly in smokers or drinkers, needs a look at the vocal cords.",
    redFlags: ["Aged 45 or over", "Smoking or heavy alcohol use", "Neck lump, difficulty swallowing or ear pain", "Breathlessness or noisy breathing"],
    cancers: ["head-and-neck", "nsclc", "thyroid"],
    tests: ["ct", "histopathology-ihc"],
    terms: ["biopsy", "hpv-p16"],
    firstTest: "Examination of the larynx with a flexible nasendoscope by an ear, nose and throat specialist, which directly shows the vocal cords; biopsy of anything suspicious. A chest X-ray is added because a lung tumour can paralyse the nerve to the voice box.",
    referral: {
      uk: "NICE NG12 says: consider a suspected cancer pathway referral (appointment within 2 weeks) for laryngeal cancer in people aged 45 and over with persistent unexplained hoarseness or an unexplained lump in the neck.",
      ukRef: "1.8.1",
      us: "No US screening recommendation. ACS: hoarseness or voice change lasting more than 2 weeks should be checked by a doctor, especially in people who smoke or drink.",
      sources: [NG12, acs("laryngeal-and-hypopharyngeal-cancer", "laryngeal cancer")],
    },
  },

  // ---------- Digestive ----------
  {
    id: "difficulty-swallowing", label: "Difficulty swallowing", aka: ["dysphagia", "food sticking"], group: "digestive",
    plain: "Food or drink sticking on the way down, or pain on swallowing. Reflux narrowing, a spasm or a benign stricture are common causes. New, progressive difficulty swallowing solids is one of the strongest symptoms of oesophageal cancer and is investigated urgently.",
    redFlags: ["Progressive, from solids to liquids", "Weight loss", "Aged 55 or over with reflux, indigestion or upper abdominal pain", "Vomiting or anaemia"],
    cancers: ["esophageal", "gastric", "head-and-neck"],
    tests: ["endoscopic-resection", "ct", "pet-ct"],
    terms: ["biopsy", "barretts-esophagus", "escc-vs-eac"],
    firstTest: "Upper GI endoscopy (gastroscopy) with biopsies, which sees the oesophagus and stomach lining directly. A CT and PET-CT stage any cancer found.",
    referral: {
      uk: "NICE NG12 says: offer urgent direct-access upper gastrointestinal endoscopy (within 2 weeks) to assess for oesophageal or stomach cancer in people with dysphagia, or aged 55 and over with weight loss and any of upper abdominal pain, reflux or dyspepsia.",
      ukRef: "1.2.1, 1.2.4",
      us: "No US screening recommendation for the general population. ACS lists trouble swallowing as the most common symptom of oesophageal cancer; endoscopy with biopsy is the diagnostic test.",
      sources: [NG12, acs("esophagus-cancer", "oesophageal cancer")],
    },
  },
  {
    id: "indigestion-reflux", label: "Persistent indigestion or reflux", aka: ["dyspepsia", "heartburn"], group: "digestive",
    plain: "Burning behind the breastbone or discomfort after eating. Acid reflux, a hiatus hernia, Helicobacter infection and anti-inflammatory tablets are the usual reasons. It is common and rarely cancer; age, weight loss and new onset change the picture.",
    redFlags: ["Aged 55 or over with weight loss", "New and persistent symptoms in someone aged 55 or over", "Difficulty swallowing, vomiting, anaemia or an upper abdominal mass", "Treatment-resistant symptoms"],
    cancers: ["gastric", "esophageal"],
    tests: ["endoscopic-resection", "ct"],
    terms: ["biopsy", "barretts-esophagus", "lauren-classification"],
    firstTest: "Gastroscopy with biopsies when the red flags are present; a Helicobacter pylori test and a trial of acid suppression when they are not.",
    referral: {
      uk: "NICE NG12 says: offer urgent direct-access upper GI endoscopy (within 2 weeks) to people aged 55 and over with weight loss and any of upper abdominal pain, reflux or dyspepsia; consider non-urgent endoscopy for people aged 55 and over with treatment-resistant dyspepsia, or with upper abdominal pain and low haemoglobin, or with raised platelet count plus nausea, vomiting, weight loss, reflux, dyspepsia or upper abdominal pain, or with nausea or vomiting plus weight loss, reflux, dyspepsia or upper abdominal pain.",
      ukRef: "1.2.4, 1.2.5",
      us: "No US screening recommendation. ACS lists persistent indigestion and heartburn among stomach cancer symptoms, especially with weight loss or trouble swallowing.",
      sources: [NG12, acs("stomach-cancer", "stomach cancer")],
    },
  },
  {
    id: "rectal-bleeding", label: "Blood in the stool or from the back passage", aka: ["rectal bleeding", "haematochezia"], group: "digestive",
    plain: "Bright red blood on the paper or in the pan, or dark blood mixed in the stool. Haemorrhoids and small tears are by far the commonest causes. Bleeding is still one of the classic bowel cancer symptoms, so guidelines now test the stool for hidden blood and examine the rectum.",
    redFlags: ["Aged 50 or over", "Under 50 with abdominal pain or weight loss as well", "Change in bowel habit", "Iron-deficiency anaemia", "A lump felt in the rectum or abdomen"],
    cancers: ["colorectal", "anal"],
    tests: ["colorectal-screening", "ct", "mri"],
    terms: ["fit-test", "screening", "sidedness"],
    firstTest: "A quantitative faecal immunochemical test (FIT) for hidden blood plus a rectal examination. A FIT of 10 micrograms of haemoglobin per gram or more, or a rectal mass, leads to colonoscopy, which finds and removes polyps and biopsies any tumour. A negative FIT with ongoing symptoms still warrants safety-netting.",
    referral: {
      uk: "NICE NG12 (2023 update) says: offer FIT to adults under 50 with rectal bleeding and either unexplained abdominal pain or weight loss, and to adults aged 50 and over with unexplained rectal bleeding; refer via the suspected cancer pathway if FIT is 10 micrograms of haemoglobin per gram of faeces or more, or if there is a rectal mass or unexplained anal mass or ulceration, regardless of FIT.",
      ukRef: "1.3.1, 1.3.3, 1.3.4",
      us: "USPSTF recommends colorectal cancer screening for all adults aged 45 to 75. Symptoms such as rectal bleeding are investigated outside screening, usually with colonoscopy.",
      sources: [NG12, uspstf("colorectal-cancer-screening", "colorectal cancer"), acs("colon-rectal-cancer", "colorectal cancer")],
    },
  },
  {
    id: "change-in-bowel-habit", label: "Change in bowel habit", aka: ["new diarrhoea", "new constipation"], group: "digestive",
    plain: "Looser, more frequent or harder stools for several weeks with no obvious reason. Diet, infection, irritable bowel, medicines and thyroid changes are common causes. A persistent change, especially in people over 50 or with bleeding or weight loss, is checked for bowel cancer.",
    redFlags: ["Lasting more than 3 to 6 weeks", "Blood in the stool", "Weight loss or abdominal pain", "Iron-deficiency anaemia", "Aged 50 or over"],
    cancers: ["colorectal", "ovarian", "pancreatic", "neuroendocrine"],
    tests: ["colorectal-screening", "ct"],
    terms: ["fit-test", "screening"],
    firstTest: "FIT for hidden blood plus a full blood count and ferritin. A positive FIT leads to colonoscopy. In women aged 50 and over, persistent bowel change is also a trigger to measure CA125 for ovarian cancer.",
    referral: {
      uk: "NICE NG12 (2023) says: offer FIT to adults with a change in bowel habit; refer via the suspected cancer pathway if FIT is 10 micrograms per gram or more. Separately, consider a CA125 test in women, especially aged 50 and over, with unexplained changes in bowel habit.",
      ukRef: "1.3.1, 1.3.3, 1.5.3",
      us: "USPSTF recommends colorectal screening from age 45 to 75. ACS lists a change in bowel habits lasting more than a few days as a symptom to report.",
      sources: [NG12, uspstf("colorectal-cancer-screening", "colorectal cancer"), acs("colon-rectal-cancer", "colorectal cancer")],
    },
  },
  {
    id: "iron-deficiency-anaemia", label: "Iron-deficiency anaemia", group: "digestive",
    plain: "Low haemoglobin with low iron stores found on a blood test. Heavy periods, poor diet and coeliac disease are frequent causes. In men and in post-menopausal women, unexplained iron deficiency usually means slow bleeding from the gut and is investigated as possible bowel or stomach cancer.",
    redFlags: ["Men of any age and post-menopausal women", "Aged 60 or over with anaemia even without iron deficiency", "Weight loss or bowel symptoms", "No dietary or menstrual explanation"],
    cancers: ["colorectal", "gastric", "esophageal", "rcc"],
    tests: ["colorectal-screening", "endoscopic-resection", "ct"],
    terms: ["fit-test"],
    firstTest: "Coeliac serology, urine dip for blood, and FIT. Guidelines then recommend examining both the upper and lower gut (gastroscopy and colonoscopy) in unexplained iron deficiency, because either can be the source.",
    referral: {
      uk: "NICE NG12 (2023) says: offer FIT to adults with iron-deficiency anaemia, and to adults aged 60 and over with anaemia even in the absence of iron deficiency; refer via the suspected cancer pathway if FIT is 10 micrograms per gram or more. NICE also lists upper abdominal pain with low haemoglobin (aged 55 and over) as a reason for non-urgent endoscopy.",
      ukRef: "1.3.1, 1.3.3, 1.2.5",
      us: "No US screening recommendation is symptom-based; the American Gastroenterological Association recommends bidirectional endoscopy for unexplained iron-deficiency anaemia in men and post-menopausal women.",
      sources: [NG12, { label: "AGA guideline: gastrointestinal evaluation of iron deficiency anemia (2020)", url: "https://doi.org/10.1053/j.gastro.2020.06.046" }],
    },
  },
  {
    id: "abdominal-pain", label: "Persistent abdominal pain", group: "digestive",
    plain: "Tummy pain lasting weeks. Irritable bowel, ulcers, gallstones, constipation and gynaecological causes are common. Pain with weight loss, bleeding, a mass or in older people is where cancer of the bowel, pancreas, stomach or ovary is considered.",
    redFlags: ["Aged 40 or over with weight loss", "Aged 60 or over with weight loss and back pain, nausea, vomiting or new diabetes", "A palpable mass", "Bleeding, anaemia or change in bowel habit", "Bloating and feeling full quickly in women aged 50 or over"],
    cancers: ["colorectal", "pancreatic", "gastric", "ovarian", "hcc", "cholangiocarcinoma", "gist"],
    tests: ["ultrasound", "ct", "colorectal-screening"],
    terms: ["fit-test", "ca-125", "ca19-9"],
    firstTest: "Bloods including liver tests, calcium and glucose, FIT, and an ultrasound of the abdomen; CT of the abdomen and pelvis when there is weight loss or the ultrasound is unhelpful. In women, CA125 is added when bloating and early satiety are present.",
    referral: {
      uk: "NICE NG12 says: offer FIT to people aged 40 and over with unexplained weight loss and abdominal pain, and to people aged 50 and over with unexplained abdominal pain; refer via the suspected cancer pathway if FIT is 10 micrograms per gram or more or if there is an abdominal mass. Consider an urgent direct-access CT in people aged 60 and over with weight loss and any of back pain, abdominal pain, nausea, vomiting, constipation, diarrhoea or new-onset diabetes (pancreatic cancer).",
      ukRef: "1.3.1, 1.3.3, 1.2.9",
      us: "USPSTF recommends against screening for pancreatic cancer in asymptomatic adults; symptomatic pain is investigated with imaging. ACS lists belly or back pain as a common pancreatic cancer symptom.",
      sources: [NG12, uspstf("pancreatic-cancer-screening", "pancreatic cancer"), acs("pancreatic-cancer", "pancreatic cancer")],
    },
  },
  {
    id: "jaundice", label: "Yellowing of the skin or eyes", aka: ["jaundice"], group: "digestive",
    plain: "Yellow skin and eyes, often with dark urine, pale stools and itching. Gallstones, hepatitis and medicines are common causes. Painless jaundice in an adult over 40 raises the possibility of a tumour blocking the bile duct, from the pancreas or bile duct, and is referred urgently.",
    redFlags: ["Painless", "Aged 40 or over", "Weight loss", "New-onset diabetes", "Pale stools and dark urine"],
    cancers: ["pancreatic", "cholangiocarcinoma", "hcc"],
    tests: ["ultrasound", "ct", "mri"],
    terms: ["ca19-9", "biliary-anatomy-subtypes", "biopsy"],
    firstTest: "Liver blood tests, then an urgent ultrasound of the liver and bile ducts to show whether the ducts are dilated (a blockage) or not (a liver cause). A blockage leads to CT of the pancreas and MRI or endoscopic ultrasound with biopsy.",
    referral: {
      uk: "NICE NG12 says: refer people using a suspected cancer pathway referral (appointment within 2 weeks) for pancreatic cancer if they are aged 40 and over and have jaundice.",
      ukRef: "1.2.8",
      us: "USPSTF recommends against pancreatic cancer screening in asymptomatic adults. ACS lists jaundice as one of the first signs of pancreatic and bile duct cancer; any new jaundice should be seen promptly.",
      sources: [NG12, uspstf("pancreatic-cancer-screening", "pancreatic cancer"), acs("bile-duct-cancer", "bile duct cancer")],
    },
  },
  {
    id: "bloating-early-satiety", label: "Persistent bloating or feeling full quickly", group: "gynaecological",
    plain: "A swollen tummy or losing appetite after a few mouthfuls. Irritable bowel, constipation, food intolerance and hormonal changes are common. In women, especially over 50, symptoms that are new, persistent or frequent are checked for ovarian cancer, which has few early signs.",
    redFlags: ["Symptoms on 12 or more days a month", "Aged 50 or over", "Pelvic or abdominal pain, urinary urgency or frequency", "A mass or fluid in the abdomen", "Weight loss or fatigue"],
    cancers: ["ovarian", "gastric", "colorectal", "pancreatic"],
    tests: ["ultrasound", "ct"],
    terms: ["ca-125", "hgsoc", "tumour-marker"],
    firstTest: "A CA125 blood test; if it is 35 IU/ml or more, an ultrasound of the abdomen and pelvis. CA125 rises in many benign conditions too, so the two together decide the next step. An abdominal mass or fluid goes straight to urgent referral.",
    referral: {
      uk: "NICE NG12 says: refer urgently if examination finds ascites and/or a pelvic or abdominal mass that is not obviously fibroids. Measure serum CA125 in women, particularly aged 50 and over, with persistent or frequent (more than 12 times a month) bloating, early satiety or loss of appetite, pelvic or abdominal pain, or urinary urgency or frequency; if CA125 is 35 IU/ml or greater, arrange an ultrasound of the abdomen and pelvis and refer urgently if it suggests ovarian cancer.",
      ukRef: "1.5.1, 1.5.2, 1.5.5 to 1.5.7",
      us: "USPSTF recommends against screening asymptomatic women for ovarian cancer. ACS: women with bloating, pelvic pain, trouble eating or urinary symptoms on most days for more than a few weeks should see a doctor, preferably a gynaecologist.",
      sources: [NG12, uspstf("ovarian-cancer-screening", "ovarian cancer"), acs("ovarian-cancer", "ovarian cancer")],
    },
  },
  {
    id: "abdominal-mass", label: "A lump or swelling in the abdomen", group: "digestive",
    plain: "A mass you or your doctor can feel. A full bladder, constipation, fibroids, a hernia or an enlarged spleen from other causes are possibilities. Any unexplained abdominal mass is imaged urgently because bowel, ovarian, kidney, liver and gastric cancers and lymphoma can all present this way.",
    redFlags: ["Any unexplained mass", "Weight loss, bleeding or pain", "A child with a palpable mass (see the children's section)"],
    cancers: ["colorectal", "ovarian", "rcc", "hcc", "gastric", "dlbcl", "sarcoma"],
    tests: ["ultrasound", "ct"],
    terms: ["biopsy", "cancer-stage"],
    firstTest: "Ultrasound first, or CT of the abdomen and pelvis, which shows what organ the mass belongs to and guides biopsy.",
    referral: {
      uk: "NICE NG12 says: refer via a suspected cancer pathway (within 2 weeks) for colorectal cancer if there is an abdominal mass; refer urgently for ovarian cancer if examination identifies ascites and/or a pelvic or abdominal mass; consider an urgent direct-access ultrasound for an upper abdominal mass consistent with an enlarged liver or gallbladder; refer for stomach cancer if there is an upper abdominal mass consistent with stomach cancer.",
      ukRef: "1.3.1, 1.5.1, 1.2.3, 1.2.6, 1.2.7",
      us: "No US screening body covers a palpable mass; imaging is the standard first step and the ACS lists an abdominal mass among symptoms of kidney, liver and ovarian cancers.",
      sources: [NG12, acs("kidney-cancer", "kidney cancer")],
    },
  },

  // ---------- Urinary and men's health ----------
  {
    id: "blood-in-urine", label: "Blood in the urine", aka: ["haematuria"], group: "urinary",
    plain: "Pink, red or brown urine, or blood found on a dipstick. Urine infection, kidney stones and an enlarged prostate are the usual causes. Visible blood without infection, especially over 45, is a classic bladder or kidney cancer symptom and is referred urgently.",
    redFlags: ["Aged 45 or over with visible blood and no infection", "Visible blood that persists after treating an infection", "Aged 60 or over with non-visible blood plus pain on passing urine or a raised white cell count", "Smoking history or industrial dye exposure"],
    cancers: ["urothelial", "rcc", "prostate"],
    tests: ["cystoscopy-turbt", "ct", "ultrasound"],
    terms: ["nmibc-vs-mibc", "biopsy"],
    firstTest: "Urine culture to exclude infection, then a cystoscopy (a camera into the bladder) and imaging of the kidneys (ultrasound or CT urogram). Cystoscopy sees bladder tumours directly and allows biopsy and removal.",
    referral: {
      uk: "NICE NG12 says: refer via a suspected cancer pathway (within 2 weeks) for bladder or renal cancer people aged 45 and over with unexplained visible haematuria without urinary tract infection, or visible haematuria that persists or recurs after successful treatment of infection; and for bladder cancer people aged 60 and over with unexplained non-visible haematuria and either dysuria or a raised white cell count. Consider non-urgent referral for people aged 60 and over with recurrent or persistent unexplained urinary tract infection.",
      ukRef: "1.6.4 to 1.6.6",
      us: "USPSTF found insufficient evidence for bladder cancer screening in asymptomatic adults. The American Urological Association recommends cystoscopy and upper-tract imaging for adults with unexplained haematuria, with intensity based on risk.",
      sources: [NG12, { label: "AUA/SUFU guideline: microhematuria (2020)", url: "https://www.auanet.org/guidelines-and-quality/guidelines/microhematuria" }, acs("bladder-cancer", "bladder cancer")],
    },
  },
  {
    id: "urinary-symptoms-men", label: "Urinary symptoms in men (frequency, poor flow, getting up at night)", aka: ["lower urinary tract symptoms", "LUTS"], group: "urinary",
    plain: "Needing to pass urine more often, a weak stream, hesitancy or waking at night. Benign prostate enlargement is by far the commonest cause. Prostate cancer rarely causes symptoms early, but guidelines use these symptoms as a prompt to offer a PSA test and examination.",
    redFlags: ["Prostate feels hard or irregular on examination", "PSA above the age-specific threshold", "Blood in urine or semen", "Bone pain, weight loss or erectile dysfunction alongside"],
    cancers: ["prostate", "urothelial"],
    tests: ["mp-mri", "psma-pet", "histopathology-ihc"],
    terms: ["psa", "gleason-grade-group", "biopsy"],
    firstTest: "A PSA blood test and a digital rectal examination. A raised PSA leads to a multiparametric MRI of the prostate, which decides whether a biopsy is needed and where to target it.",
    referral: {
      uk: "NICE NG12 says: refer via a suspected cancer pathway (within 2 weeks) if the prostate feels malignant on rectal examination. Consider a PSA test and rectal examination in men with any lower urinary tract symptoms (nocturia, frequency, hesitancy, urgency or retention), erectile dysfunction or visible haematuria. Refer if PSA is above the age-specific threshold: over 2.5 (aged 40 to 49), over 3.5 (50 to 59), over 4.5 (60 to 69), over 6.5 (70 to 79), using clinical judgement under 40 and at 80 and over.",
      ukRef: "1.6.1 to 1.6.3",
      us: "USPSTF: for men aged 55 to 69 the decision to have PSA screening should be an individual one after discussing benefits and harms; it recommends against PSA screening in men 70 and over. ACS lists urinary symptoms as more often due to benign enlargement but worth reporting.",
      sources: [NG12, uspstf("prostate-cancer-screening", "prostate cancer"), acs("prostate-cancer", "prostate cancer")],
    },
  },
  {
    id: "testicular-lump", label: "Lump or swelling in a testicle", group: "urinary",
    plain: "A new lump, swelling or change in the shape or feel of a testicle. Cysts, fluid collections, varicose veins and infection are common and benign. A painless, firm lump within the testicle is treated as cancer until an ultrasound says otherwise; testicular cancer is highly curable.",
    redFlags: ["Painless enlargement or change in texture", "A firm lump within (not beside) the testicle", "Heaviness or ache in the scrotum or lower abdomen", "Aged 15 to 45"],
    cancers: ["testicular"],
    tests: ["ultrasound", "ct"],
    terms: ["afp", "tumour-marker"],
    firstTest: "Ultrasound of the scrotum, which reliably tells a solid testicular mass from a cyst or fluid, plus the tumour-marker blood tests AFP, beta-hCG and LDH. Diagnosis is confirmed by removing the testicle rather than by needle biopsy.",
    referral: {
      uk: "NICE NG12 says: consider a suspected cancer pathway referral (within 2 weeks) for testicular cancer in men with a non-painful enlargement or change in shape or texture of the testis; consider a direct-access ultrasound for men with unexplained or persistent testicular symptoms.",
      ukRef: "1.6.7, 1.6.8",
      us: "USPSTF recommends against routine screening for testicular cancer in asymptomatic men. ACS: a painless lump or swelling in either testicle is the most common symptom and should be checked without delay.",
      sources: [NG12, { label: "USPSTF: testicular cancer screening", url: "https://www.uspreventiveservicestaskforce.org/uspstf/recommendation/testicular-cancer-screening" }, acs("testicular-cancer", "testicular cancer")],
    },
  },
  {
    id: "flank-pain", label: "Pain in the side or loin", aka: ["flank pain"], group: "urinary",
    plain: "Pain between the ribs and hip, to one side. Kidney stones, infection and muscular strain are usual. Kidney cancer causes pain only when large; more often it is found by chance on a scan or through blood in the urine.",
    redFlags: ["Blood in the urine", "A mass felt in the flank", "Weight loss, fever or fatigue", "Unexplained anaemia or raised calcium"],
    cancers: ["rcc", "urothelial"],
    tests: ["ultrasound", "ct"],
    firstTest: "A urine dipstick for blood and an ultrasound of the kidneys; CT if the ultrasound shows a solid mass or the pain persists.",
    referral: {
      uk: "NICE NG12 has no flank-pain rule. Its renal cancer recommendation is haematuria-based: refer via a suspected cancer pathway people aged 45 and over with unexplained visible haematuria without infection, or persisting after infection treatment.",
      ukRef: "1.6.6",
      us: "No US screening recommendation. ACS lists pain on one side of the lower back not caused by injury, a mass in the side and blood in the urine as kidney cancer symptoms.",
      sources: [NG12, acs("kidney-cancer", "kidney cancer")],
    },
  },

  // ---------- Gynaecological and breast ----------
  {
    id: "postmenopausal-bleeding", label: "Bleeding after the menopause", aka: ["postmenopausal bleeding"], group: "gynaecological",
    plain: "Any vaginal bleeding a year or more after periods have stopped. Thinning of the vaginal or womb lining and hormone therapy are the common causes. About one in ten women with this symptom have endometrial cancer, so every episode is investigated.",
    redFlags: ["Any bleeding after the menopause, even once", "Aged 55 or over", "Unexplained vaginal discharge, especially with a raised platelet count or blood in urine", "Not on hormone replacement, or bleeding outside the expected pattern on it"],
    cancers: ["endometrial", "cervical", "vulvar"],
    tests: ["ultrasound", "histopathology-ihc", "mri"],
    terms: ["biopsy", "endometrial-molecular-classes"],
    firstTest: "A transvaginal ultrasound to measure the thickness of the womb lining, then an endometrial biopsy or hysteroscopy (a camera into the womb) if the lining is thickened or bleeding persists. The cervix is examined at the same visit.",
    referral: {
      uk: "NICE NG12 says: refer women using a suspected cancer pathway (appointment within 2 weeks) for endometrial cancer if they are aged 55 and over with post-menopausal bleeding (unexplained vaginal bleeding more than 12 months after menstruation has stopped); consider the same referral for women under 55 with post-menopausal bleeding; consider direct-access ultrasound for women aged 55 and over with unexplained vaginal discharge who present for the first time or have thrombocytosis or haematuria, or with visible haematuria plus low haemoglobin, thrombocytosis or high blood glucose.",
      ukRef: "1.5.8 to 1.5.10",
      us: "No US screening test exists for endometrial cancer. ACS: all women should report any unexpected vaginal bleeding or spotting after the menopause to a doctor; transvaginal ultrasound and endometrial biopsy are the usual tests.",
      sources: [NG12, acs("endometrial-cancer", "endometrial cancer")],
    },
  },
  {
    id: "bleeding-between-periods", label: "Bleeding between periods or after sex", aka: ["intermenstrual bleeding", "postcoital bleeding"], group: "gynaecological",
    plain: "Bleeding outside a period or after intercourse. Contraception, infection, cervical ectropion and polyps are frequent causes. Persistent bleeding after sex is a recognised cervical cancer symptom and the cervix should be examined.",
    redFlags: ["Cervix looks abnormal on examination", "Missed cervical screening", "Persistent or recurring", "Pelvic pain or unusual discharge"],
    cancers: ["cervical", "endometrial", "vulvar"],
    tests: ["hpv-testing", "histopathology-ihc", "mri"],
    terms: ["cin-hsil", "hpv-p16", "biopsy"],
    firstTest: "A speculum examination of the cervix. An abnormal-looking cervix is referred for colposcopy and biopsy directly; a normal-looking cervix leads to swabs, checking screening is up to date, and gynaecology assessment if bleeding persists. Screening tests (HPV and cytology) are not the right test for a symptom.",
    referral: {
      uk: "NICE NG12 says: consider a suspected cancer pathway referral (within 2 weeks) for women if, on examination, the appearance of their cervix is consistent with cervical cancer.",
      ukRef: "1.5.11",
      us: "USPSTF recommends cervical cancer screening every 3 years with cytology for women aged 21 to 29, and every 3 years with cytology, every 5 years with high-risk HPV testing, or every 5 years with co-testing for women aged 30 to 65. Bleeding after sex is a symptom and is evaluated by examination and colposcopy, not by a routine screen.",
      sources: [NG12, uspstf("cervical-cancer-screening", "cervical cancer"), acs("cervical-cancer", "cervical cancer")],
    },
  },
  {
    id: "vulval-lump-ulcer", label: "Vulval lump, ulcer or persistent itching", group: "gynaecological",
    plain: "A lump, sore, or itch of the vulva that does not settle. Thrush, dermatitis and lichen sclerosus are common causes and are treatable. A persistent lump, ulcer or bleeding area needs examination and, usually, a biopsy.",
    redFlags: ["Unexplained lump, ulceration or bleeding", "Itching or soreness not responding to treatment", "Skin colour change or thickening", "Aged over 60"],
    cancers: ["vulvar", "melanoma"],
    tests: ["histopathology-ihc"],
    terms: ["biopsy", "hpv-p16", "squamous-cell-carcinoma"],
    firstTest: "Examination and a punch biopsy of the lesion. Biopsy is the test that distinguishes lichen sclerosus and pre-cancer (VIN) from invasive cancer.",
    referral: {
      uk: "NICE NG12 says: consider a suspected cancer pathway referral (within 2 weeks) for vulval cancer in women with an unexplained vulval lump, ulceration or bleeding.",
      ukRef: "1.5.12",
      us: "No US screening recommendation. ACS lists persistent itching, a lump, an open sore or skin colour change on the vulva as symptoms to have examined.",
      sources: [NG12, acs("vulvar-cancer", "vulval cancer")],
    },
  },
  {
    id: "breast-lump", label: "Breast lump", group: "breast",
    plain: "A new lump or thickening in the breast. Cysts, fibroadenomas and normal lumpy tissue are the commonest findings, particularly in younger women. Any unexplained lump in a woman aged 30 or over is referred for triple assessment; most turn out to be benign.",
    redFlags: ["Aged 30 or over with an unexplained lump", "Hard, irregular, fixed or painless", "Skin dimpling, puckering or redness", "Lump in the armpit", "A lump in a man"],
    cancers: ["breast-hr-positive", "breast-her2-positive", "tnbc"],
    tests: ["mammography", "ultrasound", "histopathology-ihc", "mri"],
    terms: ["biopsy", "ihc", "her2-low", "in-situ"],
    firstTest: "Triple assessment in one clinic visit: examination, imaging (mammography for women aged around 40 and over, ultrasound at any age) and a needle core biopsy of anything solid. The biopsy report gives grade, hormone receptor and HER2 status, which decide treatment.",
    referral: {
      uk: "NICE NG12 says: refer people using a suspected cancer pathway (appointment within 2 weeks) for breast cancer if they are aged 30 and over and have an unexplained breast lump with or without pain; consider the same referral for skin changes that suggest breast cancer and for people aged 30 and over with an unexplained lump in the axilla; consider non-urgent referral for people under 30 with an unexplained breast lump.",
      ukRef: "1.4.1 to 1.4.3",
      us: "USPSTF recommends screening mammography every other year for women aged 40 to 74. A lump is a symptom and is evaluated with diagnostic imaging and biopsy at any age, independent of screening.",
      sources: [NG12, uspstf("breast-cancer-screening", "breast cancer"), acs("breast-cancer", "breast cancer")],
    },
  },
  {
    id: "nipple-changes", label: "Nipple discharge, retraction or skin change", group: "breast",
    plain: "Fluid from the nipple, a nipple newly pulled inwards, or eczema-like change on the nipple or breast skin. Duct ectasia, benign papillomas and hormonal causes are common. One-sided bloody discharge, new retraction or persistent skin change in a woman over 50 is referred.",
    redFlags: ["Aged 50 or over with discharge, retraction or other change in one nipple only", "Blood-stained or spontaneous discharge from one duct", "Persistent scaly or eczematous nipple (possible Paget disease)", "Skin dimpling, redness or thickening (peau d'orange)"],
    cancers: ["breast-hr-positive", "breast-her2-positive", "tnbc"],
    tests: ["mammography", "ultrasound", "histopathology-ihc"],
    terms: ["in-situ", "biopsy"],
    firstTest: "Clinical examination, mammography and ultrasound, with a biopsy of any underlying lesion or of the nipple skin itself when Paget disease is suspected. Inflammatory breast cancer is diagnosed on skin punch biopsy when a red, swollen breast does not respond to antibiotics.",
    referral: {
      uk: "NICE NG12 says: refer people using a suspected cancer pathway (within 2 weeks) for breast cancer if they are aged 50 and over with any of discharge, retraction or other changes of concern in one nipple only; consider the same referral for skin changes that suggest breast cancer.",
      ukRef: "1.4.1, 1.4.2",
      us: "USPSTF covers screening mammography (biennial, ages 40 to 74), not symptoms. ACS lists nipple retraction, nipple discharge other than milk, and red, dry, flaking or thickened nipple or breast skin as changes to have checked.",
      sources: [NG12, uspstf("breast-cancer-screening", "breast cancer"), acs("breast-cancer", "breast cancer")],
    },
  },

  // ---------- Skin ----------
  {
    id: "changing-mole", label: "A changing, new or unusual mole", group: "skin",
    plain: "A mole that is growing, changing shape or colour, itching or bleeding, or a new dark spot in adulthood. Most moles are harmless. The ABCDE features (asymmetry, irregular border, several colours, diameter over 6 mm, evolving) and the NICE 7-point checklist pick out those that need a dermatologist.",
    redFlags: ["Change in size, shape or colour (major features, 2 points each on the 7-point checklist)", "Diameter 7 mm or more, inflammation, oozing or crusting, change in sensation (minor features, 1 point each)", "A mole that looks different from the rest (ugly duckling)", "A new firm, growing, pink or red nodule (nodular melanoma need not be pigmented)"],
    cancers: ["melanoma", "basal-cell-carcinoma", "cutaneous-scc"],
    tests: ["dermoscopy-ai", "histopathology-ihc", "sentinel-node"],
    terms: ["breslow-thickness", "ulceration-melanoma", "biopsy"],
    firstTest: "Dermoscopy (a magnified, polarised look at the lesion) by a trained clinician, then a full-thickness excision biopsy with a narrow margin of anything suspicious. The pathology report gives Breslow thickness, ulceration and mitotic rate, which set the stage.",
    referral: {
      uk: "NICE NG12 says: refer people using a suspected cancer pathway (within 2 weeks) for melanoma if they have a suspicious pigmented skin lesion with a weighted 7-point checklist score of 3 or more, or if dermoscopy suggests melanoma; consider the same referral for a pigmented or non-pigmented skin lesion that suggests nodular melanoma.",
      ukRef: "1.7.1 to 1.7.3",
      us: "USPSTF concludes the evidence is insufficient to recommend for or against routine visual skin screening in asymptomatic adults. ACS: any new spot, or a spot changing in size, shape or colour, or that looks different from the rest, should be checked by a doctor, using the ABCDE rule.",
      sources: [NG12, uspstf("skin-cancer-screening", "skin cancer"), acs("melanoma-skin-cancer", "melanoma")],
    },
  },
  {
    id: "non-healing-skin-lesion", label: "A sore or skin patch that will not heal", group: "skin",
    plain: "A scab, ulcer or shiny bump that persists for more than a few weeks, often on sun-exposed skin. Actinic keratoses, cysts and slow-healing wounds are common. Basal cell carcinoma grows slowly and almost never spreads; squamous cell carcinoma can spread and is referred more quickly.",
    redFlags: ["A growing, crusting or bleeding lesion lasting more than 4 to 8 weeks", "Firm, tender, fast-growing nodule (SCC features)", "Immunosuppressed or transplant recipient", "Lesion on the lip, ear or in a scar"],
    cancers: ["cutaneous-scc", "basal-cell-carcinoma", "merkel-cell-carcinoma", "melanoma"],
    tests: ["dermoscopy-ai", "histopathology-ihc"],
    terms: ["biopsy", "squamous-cell-carcinoma"],
    firstTest: "Examination with dermoscopy and a biopsy (shave, punch or excision) of the lesion. Biopsy is what separates a basal cell from a squamous cell carcinoma or an actinic keratosis.",
    referral: {
      uk: "NICE NG12 says: consider a suspected cancer pathway referral (within 2 weeks) for people with a skin lesion that raises the suspicion of squamous cell carcinoma; consider routine referral for a lesion that raises the suspicion of basal cell carcinoma, only using the suspected cancer pathway if there is particular concern that delay may have a significant impact because of factors such as lesion site or size.",
      ukRef: "1.7.4 to 1.7.6",
      us: "USPSTF: insufficient evidence on routine skin screening in asymptomatic adults. ACS lists an open sore that does not heal, a pearly or waxy bump, and a rough, scaly red patch as basal and squamous cell skin cancer signs.",
      sources: [NG12, uspstf("skin-cancer-screening", "skin cancer"), acs("basal-and-squamous-cell-skin-cancer", "basal and squamous cell skin cancer")],
    },
  },

  // ---------- Head and neck, mouth ----------
  {
    id: "mouth-ulcer", label: "Mouth ulcer or patch lasting more than three weeks", group: "head and neck",
    plain: "Ulcers, or red or white patches inside the mouth. Ordinary aphthous ulcers heal within two weeks; trauma from teeth or dentures, infections and lichen planus are other common causes. An ulcer or patch that persists beyond three weeks, especially in smokers or drinkers, is examined for oral cancer.",
    redFlags: ["Ulcer lasting more than 3 weeks", "A red, or red and white, patch (erythroplakia or leukoplakia)", "A lump on the lip or in the mouth", "Smoking, alcohol, betel use, or HPV risk", "Neck lump, ear pain or difficulty swallowing"],
    cancers: ["head-and-neck", "salivary-gland"],
    tests: ["histopathology-ihc", "ct", "pet-ct"],
    terms: ["biopsy", "hpv-p16", "squamous-cell-carcinoma"],
    firstTest: "Examination of the mouth and neck and a biopsy of the lesion, usually by an oral surgeon or ear, nose and throat team. Imaging (CT, MRI or PET-CT) stages any cancer confirmed.",
    referral: {
      uk: "NICE NG12 says: consider a suspected cancer pathway referral (within 2 weeks) for oral cancer in people with unexplained ulceration in the oral cavity lasting for more than 3 weeks, or a persistent and unexplained lump in the neck; consider an urgent referral (within 2 weeks) for assessment for possible oral cancer by a dentist in people who have a lump on the lip or in the oral cavity consistent with oral cancer, or a red or red and white patch consistent with erythroplakia or erythroleukoplakia.",
      ukRef: "1.8.2, 1.8.3",
      us: "USPSTF found insufficient evidence for routine oral cancer screening in asymptomatic adults. ACS: a sore in the mouth that does not heal, or a white or red patch, lasting more than 2 weeks should be checked by a doctor or dentist.",
      sources: [NG12, { label: "USPSTF: oral cancer screening", url: "https://www.uspreventiveservicestaskforce.org/uspstf/recommendation/oral-cancer-screening" }, acs("oral-cavity-and-oropharyngeal-cancer", "oral and oropharyngeal cancer")],
    },
  },
  {
    id: "thyroid-lump", label: "Lump in the front of the neck (thyroid)", aka: ["thyroid nodule", "goitre"], group: "head and neck",
    plain: "A swelling at the front of the neck that moves on swallowing. Thyroid nodules are very common and most are benign; a small minority are cancer. Ultrasound features decide which need a needle test.",
    redFlags: ["Hard, fixed or rapidly growing nodule", "Hoarseness or difficulty swallowing", "Lymph nodes in the neck", "Childhood neck radiation or family history of thyroid cancer", "Aged under 20 or over 60"],
    cancers: ["thyroid"],
    tests: ["ultrasound", "thyroid-fna-molecular", "radioligand-therapy"],
    terms: ["bethesda-category", "low-risk-dtc", "biopsy"],
    firstTest: "Thyroid function blood tests and an ultrasound of the neck, which grades the nodule; suspicious nodules have an ultrasound-guided fine-needle aspiration reported on the Bethesda scale, sometimes with a molecular test on indeterminate results.",
    referral: {
      uk: "NICE NG12 says: consider a suspected cancer pathway referral (appointment within 2 weeks) for thyroid cancer in people with an unexplained thyroid lump.",
      ukRef: "1.8.4",
      us: "USPSTF recommends against screening for thyroid cancer in asymptomatic adults. A palpable nodule is evaluated with TSH and ultrasound, then fine-needle aspiration when ultrasound features warrant it (American Thyroid Association).",
      sources: [NG12, { label: "USPSTF: thyroid cancer screening", url: "https://www.uspreventiveservicestaskforce.org/uspstf/recommendation/thyroid-cancer-screening" }, acs("thyroid-cancer", "thyroid cancer")],
    },
  },
  {
    id: "one-sided-ear-nose-symptoms", label: "Blocked nose, nosebleeds or hearing loss on one side", group: "head and neck",
    plain: "One-sided nasal blockage, recurrent nosebleeds, or fluid behind one eardrum in an adult. Colds, allergy and polyps are usual. Persistent one-sided symptoms, particularly with a neck lump, raise the possibility of a nasopharyngeal or sinus tumour, which is more common in people of southern Chinese or south-east Asian heritage.",
    redFlags: ["Symptoms confined to one side and persisting", "Neck lump", "One-sided glue ear in an adult", "Facial numbness, double vision or headache", "Blood-stained nasal discharge"],
    cancers: ["nasopharyngeal", "head-and-neck"],
    tests: ["ct", "mri", "histopathology-ihc"],
    terms: ["plasma-ebv-dna", "biopsy"],
    firstTest: "Examination of the nose and back of the throat with a flexible nasendoscope, then MRI or CT and a biopsy of any mass. In nasopharyngeal cancer a blood test for Epstein-Barr virus DNA supports the diagnosis and tracks treatment.",
    referral: {
      uk: "NICE NG12 has no nasopharyngeal-specific rule; use the head and neck recommendations: consider a suspected cancer pathway referral for a persistent unexplained lump in the neck, and for people aged 45 and over with persistent unexplained hoarseness.",
      ukRef: "1.8.1, 1.8.2",
      us: "No US screening recommendation. ACS lists a lump in the neck, one-sided nasal blockage or nosebleeds, hearing loss or ringing in one ear, and recurrent ear infections in adults as nasopharyngeal cancer symptoms.",
      sources: [NG12, acs("nasopharyngeal-cancer", "nasopharyngeal cancer")],
    },
  },

  // ---------- Brain and nerves ----------
  {
    id: "new-headache-neurological", label: "New headache with neurological symptoms", group: "brain and nerves",
    plain: "Headaches are almost always migraine, tension or medication-related. The ones that matter are new headaches that are progressive, wake you from sleep, are worse on lying down or coughing, or come with weakness, speech, vision or balance problems, personality change, seizures or vomiting.",
    redFlags: ["Progressive, sub-acute loss of function (weakness, speech, vision, coordination, cognition)", "First seizure in an adult", "Headache worse in the morning or on lying flat, with vomiting", "New personality or behaviour change", "Known cancer elsewhere (possible brain metastases)"],
    cancers: ["glioblastoma", "primary-cns-lymphoma", "medulloblastoma", "nsclc", "melanoma"],
    tests: ["mri", "ct"],
    terms: ["blood-brain-barrier", "mgmt", "biopsy"],
    firstTest: "MRI of the brain with contrast (CT if MRI is unavailable or contraindicated). Imaging shows whether there is a mass and what it is likely to be; a neurosurgical biopsy or resection gives the diagnosis and molecular profile.",
    referral: {
      uk: "NICE NG12 says: consider an urgent direct-access MRI scan of the brain (or CT scan if MRI is contraindicated), to be performed within 2 weeks, to assess for brain or central nervous system cancer in adults with progressive, sub-acute loss of central neurological function.",
      ukRef: "1.9.1",
      us: "No US screening recommendation. ACS lists headache, seizures, nausea, vision changes, weakness, speech problems and personality change as brain tumour symptoms; MRI is the imaging test of choice.",
      sources: [NG12, acs("brain-spinal-cord-tumors-adults", "brain and spinal cord tumours in adults")],
    },
  },
  {
    id: "back-pain-bone-pain", label: "Persistent bone or back pain", group: "bone and soft tissue",
    plain: "Bone pain that persists for weeks, is worse at night, or is unexplained by injury or arthritis. Mechanical back pain and osteoporosis are common. In adults over 60, persistent bone pain and unexplained fractures are a prompt to test for myeloma; in children and young people, unexplained bone pain or swelling is imaged within days for bone sarcoma.",
    redFlags: ["Aged 60 or over with persistent back or bone pain, or an unexplained fracture", "Pain at night or at rest", "Raised calcium, anaemia or kidney problems on bloods", "Children and young people with unexplained bone swelling or pain", "Known cancer elsewhere (possible bone metastases)"],
    cancers: ["multiple-myeloma", "osteosarcoma", "ewing-sarcoma", "prostate", "breast-hr-positive", "nsclc"],
    tests: ["whole-body-mri", "ct", "mri", "psma-pet"],
    terms: ["r-iss", "bone-marrow", "biopsy"],
    firstTest: "For adults: full blood count, calcium, kidney function, ESR or plasma viscosity, and serum protein electrophoresis with serum free light chains or urine Bence Jones protein. A plain X-ray of the painful bone, then whole-body MRI or low-dose CT if myeloma is suspected. For children: an X-ray of the bone within 48 hours.",
    referral: {
      uk: "NICE NG12 says: offer a very urgent protein electrophoresis and Bence Jones protein urine test (within 48 hours) to people aged 60 and over with hypercalcaemia or leukopenia and a presentation consistent with myeloma; consider the same tests in people aged 60 and over with persistent bone pain, particularly back pain, or an unexplained fracture; refer via the suspected cancer pathway if the results suggest myeloma. For bone sarcoma: consider a very urgent direct-access X-ray (within 48 hours) in children and young people with unexplained bone swelling or pain, and an urgent X-ray (within 2 weeks) in adults.",
      ukRef: "1.10.4 to 1.10.7, 1.11.1, 1.11.2",
      us: "No US screening recommendation. ACS lists bone pain (often in the back, hips and skull) as the most common myeloma symptom, and bone pain that is worse at night or with activity as the most common bone sarcoma symptom.",
      sources: [NG12, acs("multiple-myeloma", "multiple myeloma"), acs("bone-cancer", "bone cancer")],
    },
  },
  {
    id: "soft-tissue-lump", label: "A growing lump under the skin", aka: ["soft tissue mass"], group: "bone and soft tissue",
    plain: "A lump in a limb, trunk or elsewhere under the skin. Lipomas (fatty lumps), cysts and hernias are common and harmless. A lump that is growing, larger than a golf ball (about 5 cm), deep to the muscle layer or painful is imaged for soft tissue sarcoma.",
    redFlags: ["Increasing in size", "Larger than 5 cm", "Deep to the fascia or fixed", "Painful", "Recurrence after previous removal"],
    cancers: ["sarcoma", "gist", "dlbcl", "melanoma"],
    tests: ["ultrasound", "mri", "histopathology-ihc"],
    terms: ["fnclcc-grade", "sarcoma-type", "biopsy"],
    firstTest: "Ultrasound of the lump first; if it suggests sarcoma or is uncertain, MRI and a core biopsy planned by a specialist sarcoma centre so the biopsy track can be removed at surgery.",
    referral: {
      uk: "NICE NG12 says: consider an urgent direct-access ultrasound scan (within 2 weeks) to assess for soft tissue sarcoma in adults with an unexplained lump that is increasing in size; consider a suspected cancer pathway referral if the ultrasound findings are suggestive of soft tissue sarcoma or are uncertain and clinical concern persists. For children and young people: consider a very urgent ultrasound (within 48 hours) for an unexplained lump that is increasing in size.",
      ukRef: "1.11.3 to 1.11.6",
      us: "No US screening recommendation. ACS: a new lump anywhere on the body that is growing, or a lump larger than about 5 cm, should be checked by a doctor even if it is painless.",
      sources: [NG12, acs("soft-tissue-sarcoma", "soft tissue sarcoma")],
    },
  },

  // ---------- Blood ----------
  {
    id: "bruising-bleeding", label: "Unexplained bruising, bleeding or tiny red spots", aka: ["petechiae", "easy bruising"], group: "blood",
    plain: "Bruises with no injury, nosebleeds or bleeding gums, or a rash of pinpoint red spots that do not fade under pressure. Low platelets from viral illness, medicines (aspirin, anticoagulants) or an immune cause are common. Leukaemia and bone marrow failure are the rare, urgent causes and a blood count settles it quickly.",
    redFlags: ["Petechiae (pinpoint spots) in a child: immediate assessment", "Bruising together with pallor, fatigue, fever or infections", "Bleeding from several sites", "Enlarged liver, spleen or lymph nodes"],
    cancers: ["aml", "all-leukemia", "mds", "cll"],
    tests: ["flow-cytometry-mrd", "cytogenetics-fish"],
    terms: ["bone-marrow", "leukaemia-type", "eln-risk"],
    firstTest: "A full blood count and blood film within 48 hours. Abnormal counts lead to same-day haematology review, flow cytometry on blood and a bone marrow biopsy with cytogenetics and molecular testing.",
    referral: {
      uk: "NICE NG12 says: consider a very urgent full blood count (within 48 hours) to assess for leukaemia in adults with any of pallor, persistent fatigue, unexplained fever, unexplained persistent or recurrent infection, generalised lymphadenopathy, unexplained bruising, unexplained bleeding, unexplained petechiae, or hepatosplenomegaly. Refer children and young people immediately for specialist assessment if they have unexplained petechiae or hepatosplenomegaly.",
      ukRef: "1.10.1 to 1.10.3",
      us: "No US screening recommendation. ACS lists easy bruising or bleeding, frequent nosebleeds, bleeding gums and tiny red spots as leukaemia symptoms; a complete blood count is the first test.",
      sources: [NG12, acs("acute-myeloid-leukemia", "acute myeloid leukaemia")],
    },
  },
  {
    id: "recurrent-infections", label: "Repeated or unusual infections", group: "blood",
    plain: "Infections that keep coming back or will not clear. Diabetes, medicines, smoking and chronic lung disease are common reasons. Persistent unexplained infection with tiredness, pallor, bruising or swollen glands can mean the bone marrow is not making normal white cells.",
    redFlags: ["Infections plus pallor, fatigue, bruising or bleeding", "Unexplained fever", "Aged 60 or over with recurrent urinary infection (bladder cancer rule)", "Low neutrophils or abnormal white cells on a blood count"],
    cancers: ["all-leukemia", "aml", "cll", "multiple-myeloma", "mds", "urothelial"],
    tests: ["flow-cytometry-mrd", "cystoscopy-turbt"],
    terms: ["bone-marrow", "leukaemia-type"],
    firstTest: "Full blood count and film, immunoglobulins and protein electrophoresis in older adults (myeloma suppresses normal antibodies), and urine culture and cystoscopy referral for recurrent urinary infection in people aged 60 and over.",
    referral: {
      uk: "NICE NG12 says: consider a very urgent full blood count (within 48 hours) for adults with unexplained persistent or recurrent infection, alongside the other leukaemia features; consider non-urgent referral for bladder cancer in people aged 60 and over with recurrent or persistent unexplained urinary tract infection.",
      ukRef: "1.10.1, 1.10.5",
      us: "No US screening recommendation. ACS lists frequent infections as a symptom of leukaemia and of myeloma, through low normal white cells and antibodies.",
      sources: [NG12, acs("chronic-lymphocytic-leukemia", "chronic lymphocytic leukaemia")],
    },
  },
  {
    id: "itching-without-rash", label: "Itching all over without a rash", aka: ["pruritus"], group: "blood",
    plain: "Generalised itch with normal-looking skin. Dry skin, liver or kidney disease, thyroid problems, iron deficiency and medicines are the common causes. Itch is also a recognised symptom of Hodgkin lymphoma and of bile duct blockage, so it is a prompt for blood tests and a check for enlarged nodes.",
    redFlags: ["Enlarged lymph nodes, night sweats, fever or weight loss", "Jaundice or pale stools", "Itch worse after a hot bath (polycythaemia)", "Not explained by skin disease"],
    cancers: ["hodgkin-lymphoma", "cholangiocarcinoma", "pancreatic", "myeloproliferative-neoplasms"],
    tests: ["ultrasound", "ct", "fdg-pet"],
    terms: ["lymph-node", "biopsy"],
    firstTest: "Full blood count, liver, kidney and thyroid tests, ferritin and glucose; an examination for lymph nodes and spleen. Enlarged nodes lead to ultrasound and biopsy; abnormal liver tests lead to ultrasound of the bile ducts.",
    referral: {
      uk: "NICE NG12 says: consider a suspected cancer pathway referral (within 2 weeks) for Hodgkin or non-Hodgkin lymphoma in adults with unexplained lymphadenopathy or splenomegaly, taking into account associated symptoms including pruritus.",
      ukRef: "1.10.8, 1.10.10",
      us: "No US screening recommendation. ACS lists itchy skin among the symptoms of Hodgkin lymphoma and of bile duct cancer.",
      sources: [NG12, acs("hodgkin-lymphoma", "Hodgkin lymphoma")],
    },
  },

  // ---------- Children ----------
  {
    id: "child-abdominal-mass", label: "Child with a swollen tummy or lump in the abdomen", group: "children",
    plain: "A firm swelling in a child's abdomen, sometimes noticed at bath time or when dressing. Constipation, a full bladder and an enlarged spleen from infection are common. Neuroblastoma and Wilms tumour classically present as a painless abdominal mass in a young child, and guidelines ask for referral within 48 hours.",
    redFlags: ["Any palpable abdominal mass or unexplained enlarged organ", "Blood in the urine", "Pallor, bone pain, irritability or weight loss", "Raised blood pressure", "Periorbital bruising or a limp (neuroblastoma spread)"],
    cancers: ["neuroblastoma", "wilms-tumor", "hepatoblastoma", "dlbcl"],
    tests: ["ultrasound", "mri", "ct"],
    terms: ["inrg-staging", "mycn-amplification", "afp"],
    firstTest: "An urgent abdominal ultrasound the same or next day, which shows which organ the mass comes from; then MRI or CT, urine catecholamines (for neuroblastoma) and AFP (for liver tumours), and biopsy at a children's cancer centre.",
    referral: {
      uk: "NICE NG12 says: consider very urgent referral (an appointment within 48 hours) for specialist assessment for neuroblastoma or Wilms tumour in children with a palpable abdominal mass or unexplained enlarged abdominal organ, and for Wilms tumour in children with unexplained visible haematuria.",
      ukRef: "1.12.1, 1.12.3",
      us: "No US screening recommendation. ACS lists a lump or swelling in the belly as the most common sign of both neuroblastoma and Wilms tumour, with belly pain, fever, blood in the urine and high blood pressure as other signs.",
      sources: [NG12, acs("neuroblastoma", "neuroblastoma"), acs("wilms-tumor", "Wilms tumour")],
    },
  },
  {
    id: "child-eye-white-reflex", label: "Child with a white pupil in photos or a new squint", aka: ["leukocoria", "absent red reflex"], group: "children",
    plain: "A white glow in the pupil instead of the normal red reflex on flash photographs, or a new turn of the eye. Photo artefact and benign causes exist, but an absent red reflex is the classic sign of retinoblastoma, a curable eye cancer of early childhood, and is referred urgently.",
    redFlags: ["Absent or white red reflex, in one or both eyes", "New squint or change in eye colour", "Red, painful or swollen eye without infection", "Family history of retinoblastoma"],
    cancers: ["retinoblastoma"],
    tests: ["mri", "ultrasound"],
    terms: ["germline-vs-somatic", "hereditary-cancer-syndromes"],
    firstTest: "Examination of the red reflex with an ophthalmoscope in primary care, then an urgent dilated eye examination by a paediatric ophthalmologist, with ocular ultrasound and MRI of the orbits and brain. No biopsy is taken; the diagnosis is made by examination and imaging.",
    referral: {
      uk: "NICE NG12 says: consider urgent referral (an appointment within 2 weeks) for ophthalmological assessment for retinoblastoma in children with an absent red reflex.",
      ukRef: "1.12.2",
      us: "No US screening recommendation beyond routine red-reflex checks in well-child care (American Academy of Pediatrics). ACS lists a white pupil reflex, a wandering eye and eye pain or redness as retinoblastoma signs.",
      sources: [NG12, acs("retinoblastoma", "retinoblastoma")],
    },
  },
  {
    id: "child-headache-balance", label: "Child with persistent headache, vomiting or balance problems", group: "children",
    plain: "Headaches, morning vomiting, unsteadiness, a head tilt, new squint or behaviour change in a child. Migraine, infections and eye strain are far more common. Brain tumours are the commonest solid cancer in children and can present with any of these, so newly abnormal neurological function is referred within 48 hours.",
    redFlags: ["Newly abnormal cerebellar or other central neurological function (unsteady walk, clumsiness, squint, weakness)", "Persistent or recurrent vomiting, especially in the morning", "Headache that wakes the child or is worse on waking", "Abnormal head position, growth or puberty changes, seizures"],
    cancers: ["medulloblastoma", "glioblastoma"],
    tests: ["mri", "methylation-profiling"],
    terms: ["h3k27m", "biopsy"],
    firstTest: "MRI of the brain with contrast, arranged urgently by the paediatric team; imaging findings then guide neurosurgical biopsy or resection and molecular classification.",
    referral: {
      uk: "NICE NG12 says: consider a very urgent referral (an appointment within 48 hours) for suspected brain or central nervous system cancer in children and young people with newly abnormal cerebellar or other central neurological function.",
      ukRef: "1.9.2",
      us: "No US screening recommendation. ACS lists headache, nausea and vomiting, blurred vision, balance problems, behaviour changes and seizures as brain tumour symptoms in children. The UK HeadSmart campaign lists the same warning signs by age.",
      sources: [NG12, { label: "HeadSmart: brain tumour symptoms in children", url: "https://www.headsmart.org.uk/" }, { label: "ACS: signs and symptoms of brain and spinal cord tumours in children", url: "https://www.cancer.org/cancer/types/brain-spinal-cord-tumors-children/detection-diagnosis-staging/signs-and-symptoms.html" }],
    },
  },
  {
    id: "child-pallor-fatigue-bruising", label: "Child who is pale, tired, bruising or has bone pain", group: "children",
    plain: "A child who is unusually pale and tired, bruises easily, has repeated fevers or infections, or complains of bone or joint pain and limps. Viral illnesses and iron deficiency are common. Acute leukaemia is the commonest childhood cancer and typically presents this way, so a full blood count within 48 hours is the rule.",
    redFlags: ["Unexplained petechiae or an enlarged liver or spleen: immediate referral", "Pallor with persistent fatigue", "Unexplained fever or persistent infection", "Generalised lymphadenopathy", "Persistent or unexplained bone pain, limp, bruising or bleeding"],
    cancers: ["all-leukemia", "aml", "neuroblastoma", "hodgkin-lymphoma"],
    tests: ["flow-cytometry-mrd", "cytogenetics-fish"],
    terms: ["bone-marrow", "leukaemia-type", "mrd"],
    firstTest: "A full blood count and film within 48 hours; abnormal results lead to same-day paediatric haematology review, flow cytometry and a bone marrow aspirate for diagnosis and risk grouping.",
    referral: {
      uk: "NICE NG12 says: refer children and young people for immediate specialist assessment for leukaemia if they have unexplained petechiae or hepatosplenomegaly; offer a very urgent full blood count (within 48 hours) to children and young people with any of pallor, persistent fatigue, unexplained fever, unexplained persistent infection, generalised lymphadenopathy, persistent or unexplained bone pain, unexplained bruising or unexplained bleeding.",
      ukRef: "1.10.2, 1.10.3",
      us: "No US screening recommendation. ACS lists fatigue, pale skin, fever, easy bruising or bleeding, bone or joint pain and swollen lymph nodes as childhood leukaemia symptoms.",
      sources: [NG12, { label: "ACS: signs and symptoms of childhood leukaemia", url: "https://www.cancer.org/cancer/types/leukemia-in-children/detection-diagnosis-staging/signs-and-symptoms.html" }],
    },
  },
];

export const SYMPTOM_GROUPS: SymptomGroup[] = ["general", "chest", "digestive", "urinary", "gynaecological", "breast", "skin", "head and neck", "brain and nerves", "blood", "bone and soft tissue", "children"];
