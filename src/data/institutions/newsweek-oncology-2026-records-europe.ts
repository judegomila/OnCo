import type { InstitutionInput } from "@/lib/schema";
import { NEWSWEEK_ONCOLOGY_2026 } from "./newsweek-oncology-2026";

/**
 * Hospitals on the Newsweek and Statista list World's Best Specialized Hospitals 2026: Oncology (NEWSWEEK_ONCOLOGY_2026)
 * that OnCo held no record for, in Germany, Italy, Spain, France, Switzerland, the Netherlands and the United Kingdom,
 * in rank order. Ranks, printed names and cities are from the ranking page read raw on 11 November 2026. Every other
 * fact is from the hospital's own pages (or the network page named), read as raw text with curl on 11 November 2026.
 * Coordinates are Wikidata P625 for the hospital's item, or OpenStreetMap Nominatim where Wikidata has none, as each
 * part below says.
 *
 * Rows not written: rank 160 and 195 (UKSH Lübeck and Kiel) are one record, uksh, with the better rank; rank 281 (Royal
 * Brompton Hospital) is part of Guy's and St Thomas' NHS Foundation Trust (rbht.nhs.uk), which OnCo holds as
 * guys-st-thomas with rank 64, so it is a second site of that record; rank 217 (Instituto Oncológico Teknon) and rank
 * 245 (Hospital Universitario Quirónsalud Madrid) were not written because teknon.es, quironsalud.es and
 * quironsalud.com returned HTTP 403 to every request.
 *
 * Germany.
 * Pages read:
 *   Deutsche Krebshilfe, Onkologische Spitzenzentren: https://www.krebshilfe.de/helfen/rat-hilfe/onkologische-spitzenzentren/
 *   MHH: https://www.mhh.de/ , https://www.mhh.de/ccc
 *   Thoraxklinik Heidelberg: https://www.thoraxklinik-heidelberg.de/
 *   UKM: https://www.ukm.de/ , https://www.ukm.de/ueber-uns , https://www.ukm.de/zentren/wtz ; WTZ network: https://wtz.nrw/
 *   UKB: https://www.ukbonn.de , https://www.ukbonn.de/patient_innen/international/english/integrated-oncology-cio-bonn/
 *   UKSH: https://www.uksh.de/ , https://www.uksh.de/Das+UKSH.html ,
 *     https://www.uksh.de/Wissenschaft/Universitäres+Cancer+Center+Schleswig_Holstein-p-65848.html , the two campus pages Newsweek links
 *   Erlangen: https://www.uk-erlangen.de/ , https://www.ccc.uk-erlangen.de/ , https://www.uk-erlangen.de/patienten/onkologie/
 *   CCC Allianz WERA: https://www.ccc-wera.de/
 *   Regensburg: https://www.ukr.de , https://www.ukr.de/ueber-uns , https://www.ukr.de/medizin-pflege/tumorkonferenzen , https://www.ccco.de/
 *   Helios Berlin-Buch: https://www.helios-gesundheit.de/standorte-angebote/kliniken/berlin-buch/ and its onkologisches-zentrum page
 *   UMG: https://www.umg.eu/ , https://www.umg.eu/ueber-uns/ , https://gccc.umg.eu/
 *   Martini-Klinik: https://www.martini-klinik.de , https://www.martini-klinik.de/therapie
 *   Jena: https://www.uniklinikum-jena.de/ , https://www.uniklinikum-jena.de/tz/ , https://www.uniklinikum-jena.de/Kliniken+_+Institute/Zentren.html
 * Coordinates: Wikidata P625 for each hospital's item (UKSH: the organisation item, which is a Kiel point).
 * Not read: www.ccc-niedersachsen.eu and ccc.umg.eu (host does not resolve); krebszentrum-cio.de "Über das CIO" and
 *   organisation pages returned navigation only (no descriptive text); https://www.ukbonn.de/cio/ (404);
 *   www.mitteldeutsches-krebszentrum.de (homepage returned little text; Jena's own tumour centre page used instead).
 *
 * Italy and France.
 * Each was written from the hospital's own pages, read as raw text on 11 November 2026:
 * - Molinette: cittadellasalute.to.it home page for the Molinette, the Molinette presentation page, the Città della
 *   Salute presentation page, the Rete Oncologica page and the list of the Molinette's oncological care pathways (PDTA).
 * - Gaslini: gaslini.org home page, "l'istituzione" and the Dipartimento di Emato-Oncologia page.
 * - Azienda Ospedale-Università Padova: aopd.veneto.it home page and its Strutture, Carta dei Servizi page; the
 *   Istituto Oncologico Veneto's "chi siamo" page for the relation between the two.
 * - Besta: istituto-besta.it home page, "La Fondazione", "Dipartimenti, Reparti e Strutture" and the Neurochirurgia 1,
 *   Neurochirurgia Oncologica page.
 * - Policlinico Umberto I: policlinicoumberto1.it home page, "Storia e futuro" and the oncology and haematology
 *   department page.
 * - Sant'Andrea: ospedalesantandrea.it home page, "Azienda", "Oncologia" and the PACO page.
 * - Federico II: policlinico.unina.it home page, "Azienda" and the regional rare cancer centre page.
 * - Strasbourg: chru-strasbourg.fr page for the Hôpital de Hautepierre and "Prise en charge du cancer"; Institut
 *   Strauss's "Qui sommes-nous ?" page for the shared building.
 * - Bordeaux: chu-bordeaux.fr page for the Hôpital Pellegrin, "Prise en charge du cancer au CHU de Bordeaux" and the
 *   page of cancers treated by organ.
 * - Saint-Joseph: hopital-saint-joseph.fr home page, "Qui sommes-nous ?", "Nos services" and the two medical oncology
 *   service pages.
 * Coordinates: Wikidata P625 for Gaslini (Q204441), the Azienda Ospedaliera di Padova (Q30253940), Besta (Q5041465),
 * Umberto I (Q500377), Sant'Andrea (Q16530334), Federico II (Q3631448), Hautepierre (Q106963882) and Pellegrin
 * (Q3145195); OpenStreetMap Nominatim for the Molinette and the Hôpital Saint-Joseph, which have no Wikidata coordinate.
 *
 * Not read: none of these sites blocked the request. The Città della Salute pages that rank the Molinette by age and size
 * among Turin's hospitals, and the Bordeaux page that calls Pellegrin the most important site of the CHU, were
 * read but those claims are left out as unsourced superlatives. No source read here states a relation between the
 * CHU de Bordeaux and the Institut Bergonié, or between the Federico II hospital and the Fondazione Pascale, so neither is
 * linked.
 *
 * Spain, Switzerland and the Netherlands.
 * Read as raw text (curl, HTML stripped) on 11 November 2026:
 * - MD Anderson Cancer Center Madrid - Hospiten: mdanderson.es redirects (HTTP 301) to mdandersonhospiten.es; read the
 *   home page, "Sobre nosotros" and "Historia".
 * - Hospital Universitario Virgen del Rocío: home page, "El hospital", "Especialidades", the Medical Oncology and
 *   Radiation Oncology unit pages.
 * - Hospital Universitari de Bellvitge: home page, "Qui som / L'hospital", and the news item on La Marató 3Cat funding
 *   for the Comprehensive Cancer Centre Campus Salut Bellvitge.
 * - Kantonsspital St.Gallen (HOCH Health Ostschweiz, h-och.ch): Comprehensive Cancer Centre page and its
 *   "Leistungsangebot", "Über uns", and the St.Gallen site page.
 * - Hirslanden: Klinik St. Anna home and Oncology and Haematology pages; Klinik Hirslanden home and Tumorzentrum
 *   pages; Klinik Beau-Site home, "Zentren & Institute", "Fachgebiete" and Oncology and Haematology pages.
 * - Clinique Générale-Beaulieu (Swiss Medical Network): home page, oncology centre and radio-oncology centre pages.
 * - Lindenhofgruppe: home page, "Über uns", "Tumorboards".
 * - Catharina Ziekenhuis: home page and Catharina Kanker Instituut page; OncoZON: home, "Aangesloten ziekenhuizen"
 *   and "OECI accreditatie".
 * Coordinates: Wikidata P625 (MD Anderson Madrid Q5988238, Virgen del Rocío Q3145371, Bellvitge Q9004934,
 * Kantonsspital St. Gallen Q1728153, Klinik Hirslanden Q23783912, Clinique Générale-Beaulieu Q110063053, Lindenhof
 * Q30280704, Catharina Ziekenhuis Q3120439); OpenStreetMap Nominatim for Klinik St. Anna and Klinik Beau-Site, which
 * have no Wikidata coordinates.
 *
 * Not read:
 * - Instituto Oncológico Teknon (rank 217): www.teknon.es returned HTTP 403 (Akamai "Access Denied") to the OnCo user
 *   agent and to plain curl, home page and the Newsweek link alike. No record written.
 * - Hospital Universitario Quirónsalud Madrid (rank 245): www.quironsalud.es and www.quironsalud.com returned HTTP 403
 *   (Akamai "Access Denied") to both. No record written.
 * - https://mdanderson.es/en (the link Newsweek gives) timed out over HTTPS three times; its HTTP form redirects to
 *   mdandersonhospiten.es, which was read.
 *
 * United Kingdom.
 * Pages read:
 * stgeorges.nhs.uk (home, about, cancer services); roh.nhs.uk (home, about us, oncology service information);
 * southtees.nhs.uk cancer institute pages (home, welcome, radiotherapy, chemotherapy) and its University Hospitals Tees about page;
 * mft.nhs.uk Wythenshawe pages (home, about, cancer services, thoracic oncology); hcahealthcare.co.uk London Bridge
 * Hospital and Private Care at Guy's pages; nuffieldhealth.com/cambridgehospital and its cancer care page; rbht.nhs.uk Royal Brompton page.
 * Coordinates: Wikidata P625 (St George's Q3495316, ROH Q7374658, James Cook University Hospital Q6131686, Wythenshawe Q29131372,
 * London Bridge Hospital Q6669893, Nuffield Health Cambridge Hospital Q42851410).
 */
const asOf = "2026-11-11";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });

const DKH_SPITZENZENTREN = "https://www.krebshilfe.de/helfen/rat-hilfe/onkologische-spitzenzentren/";
const WERA = "https://www.ccc-wera.de/";

export const institutionsNewsweek2026Europe: InstitutionInput[] = [
i({ id: "mhh-hannover", name: "Medizinische Hochschule Hannover", aka: ["MHH", "Hannover Medical School", "Comprehensive Cancer Center Hannover", "CCC Hannover (Claudia von Schilling-Zentrum)"],
    city: "Hannover", country: "DE", lat: 52.384, lng: 9.804, institutionType: "university", website: "https://www.mhh.de/",
    newsweekOncology2026: 81,
    tldr: "Hannover Medical School is a medical university with its own hospital in Hanover, Germany. Its cancer centre brings together every clinic that diagnoses and treats cancer, and with the university hospital in Göttingen it forms a cancer centre funded by the charity German Cancer Aid.",
    summary: "The Medizinische Hochschule Hannover (MHH) is a medical university in Hanover, Lower Saxony, that runs its own hospital alongside teaching and research. Its departments include haematology and oncology, paediatric haematology and oncology, and radiotherapy and special oncology. Its Comprehensive Cancer Center (CCC) Hannover, the Claudia von Schilling-Zentrum, is the MHH's network for interdisciplinary cancer care: under the roof of the certified cancer centre all clinics and institutes involved in cancer diagnosis and treatment work together, with organ cancer centres, clinics and supportive services. With the Universitätsmedizin Göttingen it forms the Comprehensive Cancer Center Niedersachsen (CCC-N), which Deutsche Krebshilfe lists among the Onkologische Spitzenzentren it funds (as Göttingen/Hannover). Newsweek and Statista rank it 81 in World's Best Specialized Hospitals 2026: Oncology.",
    institutions: ["umg-goettingen", "deutsche-krebshilfe"],
    links: [
      { label: "Medizinische Hochschule Hannover", url: "https://www.mhh.de/" },
      { label: "Newsweek World's Best Specialized Hospitals 2026: Oncology, rank 81 (Medizinische Hochschule Hannover, Hannover)", url: NEWSWEEK_ONCOLOGY_2026 },
      { label: "MHH: Comprehensive Cancer Center Hannover", url: "https://www.mhh.de/ccc" },
      { label: "Deutsche Krebshilfe: Onkologische Spitzenzentren", url: DKH_SPITZENZENTREN },
    ] }),

i({ id: "molinette-torino", name: "Presidio Ospedaliero Molinette, A.O.U. Città della Salute e della Scienza di Torino", aka: ["Ospedale Molinette", "Molinette Hospital", "Città della Salute e della Scienza di Torino", "City of Health and Science University Hospital, Turin"],
    city: "Turin", country: "IT", lat: 45.039, lng: 7.674, institutionType: "hospital", website: "https://www.cittadellasalute.to.it", newsweekOncology2026: 97,
    tldr: "The Molinette is the main hospital of Turin's public university hospital trust, the Città della Salute e della Scienza, and works with the University of Turin. It runs care pathways for cancers from head to toe, including blood cancers, sarcomas and children's cancers.",
    summary: "The Presidio Ospedaliero Molinette (with the Dermatologico San Lazzaro and San Giovanni Antica Sede) is one of the hospitals of the Azienda Ospedaliero-Universitaria Città della Salute e della Scienza di Torino, alongside the CTO, the Ospedale Infantile Regina Margherita and the Sant'Anna. The trust describes the Molinette as a multispecialty hospital integrated with the Università degli Studi di Torino, carrying out care, teaching and research within the Piedmont regional health service. Its published list of oncological diagnostic and therapeutic care pathways (PDTA) covers anal, colon, oesophageal, gastric, liver, pancreatic and biliary, gynaecological, breast, thoracic, head and neck, thyroid and endocrine, adrenal, pituitary, neurological, neuroendocrine, kidney, bladder and upper urinary tract, prostate, penile and testicular cancers, skin cancers, acute leukaemias, myelodysplasia, lymphomas, multiple myeloma, soft tissue and retroperitoneal sarcomas, bone metastases, paediatric and rare tumours, and late toxicity of cancer treatment. The trust takes part in the Rete Oncologica del Piemonte e della Valle d'Aosta, whose organisational model was approved by regional decree DGR 11-3586 of 23 July 2021.\n\nNewsweek and Statista rank the Molinette 97th in World's Best Specialized Hospitals 2026: Oncology.",
    programs: ["Oncological care pathways (PDTA) by tumour site", "Rete Oncologica del Piemonte e della Valle d'Aosta"],
    institutions: [],
    links: [
      { label: "Città della Salute e della Scienza di Torino: Ospedale Molinette", url: "https://www.cittadellasalute.to.it/index.php?option=com_content&view=article&id=94%3Aospedale-molinette&catid=37&Itemid=309" },
      { label: "Newsweek World's Best Specialized Hospitals 2026: Oncology, rank 97 (Presidio Ospedaliero Molinette - A.O.U. Città della Salute e della Scienza, Turin)", url: NEWSWEEK_ONCOLOGY_2026 },
      { label: "Città della Salute e della Scienza: presentation of the Molinette", url: "https://www.cittadellasalute.to.it/index.php?option=com_content&view=article&id=1840:presentazione-molinette-dermatologico-san-lazzaro-san-giovanni-antica-sede&catid=132&Itemid=339" },
      { label: "Città della Salute e della Scienza: presentation of the trust", url: "https://www.cittadellasalute.to.it/index.php?option=com_content&view=category&id=132&Itemid=511" },
      { label: "Città della Salute e della Scienza: oncological care pathways (PDTA) at the Molinette", url: "https://www.cittadellasalute.to.it/index.php?option=com_content&view=category&id=409&Itemid=615" },
      { label: "Città della Salute e della Scienza: Rete Oncologica Piemonte e Valle d'Aosta", url: "https://www.cittadellasalute.to.it/index.php?option=com_content&view=article&id=4382&Itemid=705" },
    ] }),

  i({ id: "thoraxklinik-heidelberg", name: "Thoraxklinik Heidelberg", aka: ["Thoraxklinik am Universitätsklinikum Heidelberg", "Heidelberg Thoracic Clinic"],
    city: "Heidelberg", country: "DE", lat: 49.378, lng: 8.69, institutionType: "hospital", website: "https://www.thoraxklinik-heidelberg.de/",
    newsweekOncology2026: 112,
    tldr: "The Thoraxklinik is a specialist chest and lung hospital in Heidelberg, Germany, and part of Heidelberg University Hospital. It is a certified lung cancer centre and a founding member of the National Center for Tumor Diseases in Heidelberg.",
    summary: "The Thoraxklinik Heidelberg is a specialist hospital for lung and chest disease and, as it describes itself, part of Heidelberg University Hospital. It has been a certified lung cancer centre for years, is a European reference centre for rare lung disease (ERN Lung), and also runs an accredited weaning centre and centres for sleep medicine and pulmonary hypertension. It reports about 2,300 thoracic operations a year, discussed in daily interdisciplinary conferences; it uses a da Vinci X robotic system, with which more than 1,000 patients have been operated on, for lobe and segment resections of malignant lung tumours, mediastinal tumours and thymectomy. It is a partner in the German Center for Lung Research (DZL), a founding member of the National Center for Tumor Diseases Heidelberg (NCT) and works closely with the German Cancer Research Center (DKFZ). Newsweek and Statista rank it 112 in World's Best Specialized Hospitals 2026: Oncology.",
    institutions: ["heidelberg-nct", "dkfz"],
    links: [
      { label: "Thoraxklinik Heidelberg", url: "https://www.thoraxklinik-heidelberg.de/" },
      { label: "Newsweek World's Best Specialized Hospitals 2026: Oncology, rank 112 (Thoraxklinik Heidelberg, Heidelberg)", url: NEWSWEEK_ONCOLOGY_2026 },
    ] }),

  i({ id: "gaslini-genoa", name: "IRCCS Istituto Giannina Gaslini", aka: ["Istituto Giannina Gaslini", "Gaslini Children's Hospital", "Ospedale Gaslini"],
    city: "Genoa", country: "IT", lat: 44.393, lng: 8.988, institutionType: "hospital", website: "https://www.gaslini.org", newsweekOncology2026: 117,
    tldr: "Gaslini is a children's hospital and research institute in Genoa. Its blood and cancer department treats children with leukaemia, solid tumours and brain tumours, and carries out stem cell transplants.",
    summary: "The Istituto Giannina Gaslini is a paediatric Istituto di Ricovero e Cura a Carattere Scientifico (IRCCS) in Genoa. It began work in 1938, founded by senator Gerolamo Gaslini, was recognised as an IRCCS in 1959, and has hosted the University of Genoa's chairs of paediatrics since its foundation; the institute describes itself as offering all paediatric medical and surgical specialties. Its Dipartimento di Emato-Oncologia, directed by Carlo Dufour, comprises units of haematology, oncology, neuro-oncology and haematopoietic stem cell transplantation, with a haemostasis and thrombosis centre, a nutrition centre and a laboratory (Labsiem). The institute reports about 30,000 admissions a year, about 42 per cent of them from outside Liguria.\n\nNewsweek and Statista rank it 117th in World's Best Specialized Hospitals 2026: Oncology.",
    programs: ["Paediatric haematology", "Paediatric oncology", "Paediatric neuro-oncology", "Haematopoietic stem cell transplantation"],
    institutions: [],
    links: [
      { label: "Istituto Giannina Gaslini", url: "https://www.gaslini.org/" },
      { label: "Newsweek World's Best Specialized Hospitals 2026: Oncology, rank 117 (Istituto Giannina Gaslini, Genoa)", url: NEWSWEEK_ONCOLOGY_2026 },
      { label: "Gaslini: l'istituzione", url: "https://www.gaslini.org/istituto-gaslini/chi-siamo/listituzione/" },
      { label: "Gaslini: Dipartimento di Emato-Oncologia", url: "https://www.gaslini.org/dipartimenti/dipartimento-di-emato-oncologia" },
    ] }),

  i({ id: "aou-padova", name: "Azienda Ospedale-Università Padova", aka: ["AOPD", "Padua University Hospital", "Ospedale di Padova", "Azienda Ospedaliera di Padova"],
    city: "Padua", country: "IT", lat: 45.404, lng: 11.887, institutionType: "hospital", website: "https://www.aopd.veneto.it", newsweekOncology2026: 119,
    tldr: "Padua's public university hospital, run with the University of Padua. Its units include blood cancer care, children's blood and cancer care, bone tumour surgery and molecular cancer testing, and the Veneto cancer institute gives radiotherapy in a building on its site.",
    summary: "The Azienda Ospedale-Università Padova is the university hospital trust of Padua in the Veneto regional health service, working with the Università di Padova. Its directory of units (Strutture, Carta dei Servizi) lists, among others, haematology (UOC Ematologia), paediatric onco-haematology (Clinica di Oncoematologia Pediatrica), orthopaedics and orthopaedic oncology, molecular oncology diagnostics (UOSD Diagnostica Molecolare Oncologica), pathology, thoracic surgery, and general surgery units for the upper digestive tract, colorectal disease and hepatobiliary and pancreatic surgery with liver transplantation. The Istituto Oncologico Veneto (IOV), the region's cancer IRCCS, says it delivers radiotherapy in Padua in a radiotherapy building within the area of the hospital trust, and that as the regional hub it coordinates the multidisciplinary oncology groups that operate at the Azienda Ospedale-Università Padova among others.\n\nNewsweek and Statista rank it 119th in World's Best Specialized Hospitals 2026: Oncology.",
    programs: ["Haematology", "Paediatric onco-haematology", "Orthopaedic oncology", "Molecular oncology diagnostics"],
    institutions: ["iov-veneto"],
    links: [
      { label: "Azienda Ospedale-Università Padova", url: "https://www.aopd.veneto.it/" },
      { label: "Newsweek World's Best Specialized Hospitals 2026: Oncology, rank 119 (Azienda Ospedale Università Padova, Padua)", url: NEWSWEEK_ONCOLOGY_2026 },
      { label: "Azienda Ospedale-Università Padova: Strutture, Carta dei Servizi", url: "https://www.aopd.veneto.it/strutture-carta-dei-servizi" },
      { label: "Istituto Oncologico Veneto: chi siamo", url: "https://www.ioveneto.it/istituto/chi-siamo/" },
    ] }),

i({ id: "md-anderson-madrid", name: "MD Anderson Cancer Center Madrid - Hospiten", aka: ["MD Anderson Madrid", "MD Anderson Cancer Center Madrid", "MD Anderson Madrid - Hospiten"],
    city: "Madrid", country: "ES", lat: 40.471, lng: -3.666, institutionType: "cancer-center", website: "https://mdandersonhospiten.es", newsweekOncology2026: 121,
    tldr: "A private cancer hospital in Madrid that opened in 2000 as an international affiliate of the MD Anderson Cancer Center in Houston, Texas, and still works closely with it. It treats cancer and runs clinical trials, including early-phase trials of new cancer medicines.",
    summary: "MD Anderson Cancer Center Madrid - Hospiten is a cancer hospital in Madrid. Its own history page says it opened in 2000 as an international affiliate (filial internacional) of The University of Texas MD Anderson Cancer Center in Houston, that its mission integrates patient care, research, prevention and education, and that more than 65,000 patients have been treated there; it describes continuing close collaboration with MD Anderson in Houston. The old domain mdanderson.es now redirects to mdandersonhospiten.es.\n\nThe hospital lists a Phase I clinical trials unit for new cancer medicines, advised directly from Houston, a searchable list of its open trials, a hepatobiliary and pancreatic oncology unit, a multidisciplinary hereditary cancer genetic counselling unit, deep-inspiration breath-hold radiotherapy for left-sided breast tumours, and oncology second opinions; it works with national and international private insurers. Newsweek and Statista rank it 121st in World's Best Specialized Hospitals 2026: Oncology.",
    programs: ["Phase I clinical trials unit", "Hepatobiliary and pancreatic oncology unit", "Hereditary cancer genetic counselling unit", "Oncology second opinion"],
    institutions: ["md-anderson"],
    links: [
      { label: "MD Anderson Cancer Center Madrid - Hospiten", url: "https://mdandersonhospiten.es" },
      { label: "Newsweek World's Best Specialized Hospitals 2026: Oncology, rank 121 (MD Anderson Cancer Center - Madrid, Madrid)", url: NEWSWEEK_ONCOLOGY_2026 },
      { label: "MD Anderson Madrid - Hospiten: about us", url: "https://mdandersonhospiten.es/el-hospital/conoce-md-anderson-cancer-center-madrid-hospiten/sobre-nosotros" },
      { label: "MD Anderson Madrid - Hospiten: history", url: "https://mdandersonhospiten.es/el-hospital/conoce-md-anderson-cancer-center-madrid-hospiten/historia" },
    ] }),

  i({ id: "ukm-muenster", name: "Universitätsklinikum Münster", aka: ["UKM", "University Hospital Münster", "WTZ Münster", "Westdeutsches Tumorzentrum Münster"],
    city: "Münster", country: "DE", lat: 51.961, lng: 7.599, institutionType: "hospital", website: "https://www.ukm.de/",
    newsweekOncology2026: 125,
    tldr: "Münster University Hospital is a university hospital in north-west Germany. Its cancer centre runs a central cancer clinic and works with the university hospital in Essen as the West German Cancer Center, funded by the charity German Cancer Aid.",
    summary: "The Universitätsklinikum Münster (UKM) is a university hospital in Westphalia that trains doctors and researchers with the Medical Faculty of the University of Münster; the UKM group has more than 13,000 staff. The WTZ Münster is the UKM's central unit for interdisciplinary cancer treatment, with diagnosis and therapy organised in treatment programmes, many of them certified on behalf of the German Cancer Society (DKG) by OnkoZert, and a central WTZ outpatient clinic. Since October 2019 the cancer centres of the UKM and Universitätsmedizin Essen have cooperated as the Westdeutsches Tumorzentrum (WTZ); after review in 2024 the WTZ consortium of Münster and Essen was again named an Onkologisches Spitzenzentrum by Deutsche Krebshilfe. Newsweek and Statista rank it 125 in World's Best Specialized Hospitals 2026: Oncology.",
    institutions: ["essen-wtz", "deutsche-krebshilfe"],
    links: [
      { label: "Universitätsklinikum Münster", url: "https://www.ukm.de/" },
      { label: "Newsweek World's Best Specialized Hospitals 2026: Oncology, rank 125 (Universitätsklinikum Münster, Münster)", url: NEWSWEEK_ONCOLOGY_2026 },
      { label: "UKM: about us", url: "https://www.ukm.de/ueber-uns" },
      { label: "UKM: WTZ Münster", url: "https://www.ukm.de/zentren/wtz" },
      { label: "Westdeutsches Tumorzentrum network", url: "https://wtz.nrw/" },
      { label: "Deutsche Krebshilfe: Onkologische Spitzenzentren", url: DKH_SPITZENZENTREN },
    ] }),

i({ id: "st-georges-hospital-london", name: "St George's Hospital, Tooting", aka: ["St George's Hospital", "St George's University Hospitals NHS Foundation Trust", "St George's Cancer Centre"],
    city: "London", country: "GB", lat: 51.427, lng: -0.176, institutionType: "hospital", website: "https://www.stgeorges.nhs.uk",
    newsweekOncology2026: 133,
    tldr: "A large National Health Service teaching hospital in Tooting, south west London, and the cancer centre for that part of the city. It does most of the area's complex cancer surgery, gives chemotherapy, treats children with cancer, and sends patients to the Royal Marsden for radiotherapy.",
    summary: "St George's Hospital in Tooting is the main site of St George's University Hospitals NHS Foundation Trust, which shares its campus with St George's, University of London and, with Epsom and St Helier University Hospitals NHS Trust, forms a hospital group with a single executive team while the two trusts stay separate. The trust describes the hospital as the cancer centre for south west London: it provides most of the area's complex cancer surgery, is the south west London hub for brain and central nervous system, breast, children's, gynaecological, haematological, head and neck, lung and urological cancers, and is a national centre for skin and penile cancers. Its regional oncology service gives chemotherapy and biological treatments, about 16,000 cycles a year; radiotherapy for its patients is provided by the Royal Marsden. It hosts the regional breast, bowel and cervical screening services and the South London Cancer Research Network, and the trust says it is a designated children's cancer centre for London.\n\nNewsweek and Statista ranked it 133rd in World's Best Specialized Hospitals 2026: Oncology.",
    institutions: ["royal-marsden"],
    links: [
      { label: "St George's University Hospitals NHS Foundation Trust", url: "https://www.stgeorges.nhs.uk" },
      { label: "Newsweek World's Best Specialized Hospitals 2026: Oncology, rank 133 (St George's Hospital, London)", url: NEWSWEEK_ONCOLOGY_2026 },
      { label: "St George's: Cancer Services", url: "https://www.stgeorges.nhs.uk/service/cancer-services/" },
      { label: "St George's: About us", url: "https://www.stgeorges.nhs.uk/about/" },
    ] }),

  i({ id: "besta-milan", name: "Fondazione IRCCS Istituto Neurologico Carlo Besta", aka: ["Istituto Besta", "Carlo Besta Neurological Institute", "Besta"],
    city: "Milan", country: "IT", lat: 45.477, lng: 9.23, institutionType: "hospital", website: "https://www.istituto-besta.it", newsweekOncology2026: 149,
    tldr: "A public neurological hospital and research institute in Milan. It treats brain and spinal cord tumours in adults and children, with surgeons, brain tumour doctors, pathologists and radiotherapists working as one team.",
    summary: "The Fondazione IRCCS Istituto Neurologico Carlo Besta is a public, single-specialty Istituto di Ricovero e Cura a Carattere Scientifico for the neurosciences. It was founded in 1918, classified as an IRCCS from 1981 and became a Fondazione IRCCS in 2006; its founding members are the Lombardy region, the Ministry of Health and the City of Milan. Its functional neuro-oncology department (DIFNO) brings together clinical neuro-oncology, neuropathology, neurosurgery, neuroradiology and radiotherapy, holds multidisciplinary meetings for adult and paediatric cases, offers access to trials including phase 1, and takes part in the glioblastoma working group of Alleanza Contro il Cancro on liquid biopsy in brain tumours. Units listed include oncological neurosurgery (Neurochirurgia 1), neuro-oncology (Neurologia 2), brain metastasis surgery, paediatric neurosurgery, oncological neuropathology, experimental neuro-oncology, brain tumour immunotherapy and radiotherapy. The oncological neurosurgery unit describes intraoperative MRI, neuronavigation, fluorescence guidance, laser interstitial thermal therapy and robot-assisted biopsy, an internal tumour board, and trials in glioblastoma and focused ultrasound to open the blood-brain barrier.\n\nNewsweek and Statista rank it 149th in World's Best Specialized Hospitals 2026: Oncology.",
    programs: ["Functional neuro-oncology department (DIFNO)", "Oncological neurosurgery", "Brain metastasis surgery", "Brain tumour immunotherapy"],
    institutions: ["alleanza-contro-il-cancro"],
    links: [
      { label: "Fondazione IRCCS Istituto Neurologico Carlo Besta", url: "https://www.istituto-besta.it/" },
      { label: "Newsweek World's Best Specialized Hospitals 2026: Oncology, rank 149 (Fondazione I.R.C.C.S. Istituto Neurologico Carlo Besta, Milan)", url: NEWSWEEK_ONCOLOGY_2026 },
      { label: "Besta: La Fondazione", url: "https://www.istituto-besta.it/chi-siamo/34/la-fondazione" },
      { label: "Besta: Dipartimenti, Reparti e Strutture", url: "https://www.istituto-besta.it/dipartimenti-e-reparti" },
      { label: "Besta: Neurochirurgia 1, Neurochirurgia Oncologica", url: "https://www.istituto-besta.it/reparti/neurochirurgia-1-neurochirurgia-oncologica-47" },
    ] }),

  i({ id: "ukb-bonn", name: "Universitätsklinikum Bonn", aka: ["UKB", "University Hospital Bonn", "CIO Bonn", "Centrum für Integrierte Onkologie Bonn"],
    city: "Bonn", country: "DE", lat: 50.702, lng: 7.103, institutionType: "hospital", website: "https://www.ukbonn.de",
    newsweekOncology2026: 156,
    tldr: "Bonn University Hospital is a university hospital in western Germany. Its cancer centre organises all cancer care in the hospital and is part of a cancer centre shared with Aachen, Cologne and Düsseldorf that the charity German Cancer Aid funds.",
    summary: "The Universitätsklinikum Bonn (UKB) describes itself as a hospital of maximum care with 38 clinics and 31 institutes. Its Centre for Integrated Oncology, CIO Bonn, organises interdisciplinary cancer care across the hospital and acts as its Comprehensive Cancer Center, the interface for all oncology services; it says up to 250 clinical trials are open to patients. CIO Bonn is part of the CIO Aachen Bonn Köln Düsseldorf, which Deutsche Krebshilfe lists among the Onkologische Spitzenzentren it funds (as Aachen-Bonn-Köln-Düsseldorf). Newsweek and Statista rank it 156 in World's Best Specialized Hospitals 2026: Oncology.",
    institutions: ["uniklinik-koeln", "uk-duesseldorf", "deutsche-krebshilfe"],
    links: [
      { label: "Universitätsklinikum Bonn", url: "https://www.ukbonn.de" },
      { label: "Newsweek World's Best Specialized Hospitals 2026: Oncology, rank 156 (Universitätsklinikum Bonn, Bonn)", url: NEWSWEEK_ONCOLOGY_2026 },
      { label: "UKB: Integrated Oncology, CIO Bonn", url: "https://www.ukbonn.de/patient_innen/international/english/integrated-oncology-cio-bonn/" },
      { label: "CIO Aachen Bonn Köln Düsseldorf", url: "https://krebszentrum-cio.de/" },
      { label: "Deutsche Krebshilfe: Onkologische Spitzenzentren", url: DKH_SPITZENZENTREN },
    ] }),

  i({ id: "uksh", name: "Universitätsklinikum Schleswig-Holstein", aka: ["UKSH", "University Hospital Schleswig-Holstein", "Universitäres Cancer Center Schleswig-Holstein", "UCCSH", "UKSH Campus Lübeck", "UKSH Campus Kiel"],
    city: "Lübeck", country: "DE", lat: 54.33, lng: 10.143, institutionType: "hospital", website: "https://www.uksh.de/",
    newsweekOncology2026: 160,
    tldr: "The University Hospital Schleswig-Holstein is the university hospital of Kiel and Lübeck in northern Germany, run on two campuses. Its two certified cancer centres together form the University Cancer Center Schleswig-Holstein.",
    summary: "The Universitätsklinikum Schleswig-Holstein (UKSH) is a public-law institution of the universities of Kiel and Lübeck, on two campuses that were separate university hospitals before their merger. Building on the certified oncology centres of both campuses, the UKSH and the two universities set up the Universitäres Cancer Center Schleswig-Holstein (UCCSH), which brings together all disciplines and network partners and aims to gain funding and recognition from Deutsche Krebshilfe as an Onkologisches Spitzenzentrum. In Kiel the Karl-Lennert-Krebscentrum houses the outpatient portal of the Onkologisches Zentrum Kiel, with 11 organ centres on the campus; the Onkologisches Zentrum Lübeck is a cooperation of all disciplines in Lübeck. Newsweek and Statista rank Campus Lübeck 160 and Campus Kiel 195 in World's Best Specialized Hospitals 2026: Oncology; this record carries the Lübeck rank. The coordinates are Wikidata's point for the organisation, which lies in Kiel.",
    links: [
      { label: "Universitätsklinikum Schleswig-Holstein", url: "https://www.uksh.de/" },
      { label: "Newsweek World's Best Specialized Hospitals 2026: Oncology, rank 160 (Universitätsklinikum Schleswig-Holstein - Campus Lübeck, Lübeck)", url: NEWSWEEK_ONCOLOGY_2026 },
      { label: "Newsweek World's Best Specialized Hospitals 2026: Oncology, rank 195 (Universitätsklinikum Schleswig-Holstein - Campus Kiel, Kiel)", url: NEWSWEEK_ONCOLOGY_2026 },
      { label: "UKSH: about the UKSH", url: "https://www.uksh.de/Das+UKSH.html" },
      { label: "UKSH: Universitäres Cancer Center Schleswig-Holstein", url: "https://www.uksh.de/Wissenschaft/Universitäres+Cancer+Center+Schleswig_Holstein-p-65848.html" },
    ] }),

  i({ id: "policlinico-umberto-i", name: "Azienda Ospedaliero-Universitaria Policlinico Umberto I", aka: ["Policlinico Umberto I", "Umberto I University Hospital, Rome"],
    city: "Rome", country: "IT", lat: 41.907, lng: 12.51, institutionType: "hospital", website: "https://www.policlinicoumberto1.it", newsweekOncology2026: 176,
    tldr: "A public university hospital in central Rome, the teaching hospital of Sapienza University. Its cancer department includes medical oncology, blood cancer care with bone marrow transplant, a breast cancer unit and radiotherapy.",
    summary: "The Policlinico Umberto I is an azienda ospedaliero-universitaria in central Rome, opened in 1903, and the reference hospital of the Sapienza University of Rome faculties of Medicina e Odontoiatria and Farmacia e Medicina. Its departmental area for onco-haematology, dermatology and pathology lists a university medical oncology unit, haematology and bone marrow transplantation with a haematology day hospital and haematology emergency unit, a unit for breast cancer and innovative drugs, university radiotherapy, pathology with cytodiagnostics and molecular pathology, and dermatology.\n\nNewsweek and Statista rank it 176th in World's Best Specialized Hospitals 2026: Oncology.",
    programs: ["Medical oncology", "Haematology and bone marrow transplantation", "Breast cancer and innovative drugs unit", "Radiotherapy"],
    institutions: ["santandrea-rome"],
    links: [
      { label: "Policlinico Umberto I", url: "https://www.policlinicoumberto1.it/" },
      { label: "Newsweek World's Best Specialized Hospitals 2026: Oncology, rank 176 (Policlinico Umberto I, Rome)", url: NEWSWEEK_ONCOLOGY_2026 },
      { label: "Policlinico Umberto I: Storia e futuro", url: "https://www.policlinicoumberto1.it/il-policlinico/storia-e-futuro/" },
      { label: "Policlinico Umberto I: oncology, haematology, dermatology and pathology department", url: "https://www.policlinicoumberto1.it/dipartimento/ematologia-oncologia-e-dermatologia/" },
    ] }),

  i({ id: "uk-erlangen", name: "Universitätsklinikum Erlangen", aka: ["Uniklinikum Erlangen", "University Hospital Erlangen", "CCC Erlangen-EMN", "Comprehensive Cancer Center Erlangen-Europäische Metropolregion Nürnberg"],
    city: "Erlangen", country: "DE", lat: 49.599, lng: 11.011, institutionType: "hospital", website: "https://www.uk-erlangen.de/",
    newsweekOncology2026: 186,
    tldr: "Erlangen University Hospital is a university hospital in Bavaria, Germany. Its cancer centre links seven hospitals in Bavaria, each with a certified cancer centre, and is one of four sites of a Bavarian cancer alliance funded by the charity German Cancer Aid.",
    summary: "The Universitätsklinikum Erlangen is the university hospital of the Friedrich-Alexander-Universität Erlangen-Nürnberg. Its Comprehensive Cancer Center Erlangen-EMN is a joint structure of the university's Medical Faculty and the hospital with the Sozialstiftung Bamberg, Klinikum Bayreuth, Klinikum St. Marien Amberg, Klinikum Fürth, Klinikum Nürnberg and Sana Klinikum Hof; all seven sites have an oncology centre certified by the German Cancer Society. Care runs through an interdisciplinary tumour therapy centre, with cancer information and second opinions. Its oncology page also presents the National Center for Tumor Diseases (NCT) and the Bavarian Center for Cancer Research (BZKF), founded in November 2019 by the six Bavarian university hospitals. CCC Erlangen-EMN is one of the four sites of the CCC Allianz WERA with Würzburg, Regensburg and Augsburg, which Deutsche Krebshilfe funds as an Onkologisches Spitzenzentrum. Newsweek and Statista rank it 186 in World's Best Specialized Hospitals 2026: Oncology.",
    institutions: ["ccc-wuerzburg", "ukr-regensburg", "deutsche-krebshilfe"],
    links: [
      { label: "Universitätsklinikum Erlangen", url: "https://www.uk-erlangen.de/" },
      { label: "Newsweek World's Best Specialized Hospitals 2026: Oncology, rank 186 (Universitätsklinikum Erlangen, Erlangen)", url: NEWSWEEK_ONCOLOGY_2026 },
      { label: "Comprehensive Cancer Center Erlangen-EMN", url: "https://www.ccc.uk-erlangen.de/" },
      { label: "Uniklinikum Erlangen: oncology", url: "https://www.uk-erlangen.de/patienten/onkologie/" },
      { label: "CCC Allianz WERA", url: WERA },
      { label: "Deutsche Krebshilfe: Onkologische Spitzenzentren", url: DKH_SPITZENZENTREN },
    ] }),

  i({ id: "ukr-regensburg", name: "Universitätsklinikum Regensburg", aka: ["UKR", "University Hospital Regensburg", "Comprehensive Cancer Center Ostbayern", "CCCO", "University Cancer Center Regensburg", "UCC-R"],
    city: "Regensburg", country: "DE", lat: 48.988, lng: 12.09, institutionType: "hospital", website: "https://www.ukr.de",
    newsweekOncology2026: 188,
    tldr: "Regensburg University Hospital is the university hospital for eastern Bavaria, Germany. With a partner hospital it runs the Comprehensive Cancer Center of Eastern Bavaria, one of four sites of a Bavarian cancer alliance funded by the charity German Cancer Aid.",
    summary: "The Universitätsklinikum Regensburg (UKR) has more than 5,000 staff in 33 medical and dental clinics, polyclinics, departments and institutes, covering almost the whole range of medical specialties for eastern Bavaria. On 1 July 2016 the UKR and the Caritas-Krankenhaus St. Josef founded the Comprehensive Cancer Center Ostbayern (CCCO), within the cooperation model of the University Cancer Center Regensburg (UCC-R), with a network of hospitals, oncology centres, practices and hospices across the region. The UCC-R runs a Centre for Personalised Medicine in Oncology with a molecular tumour board, and the UKR lists tumour conferences and centres for skin, bowel, lung (with a mesothelioma unit) and sarcoma cancers. The CCCO is one of the four sites of the CCC Allianz WERA with Würzburg, Erlangen and Augsburg, which Deutsche Krebshilfe funds as an Onkologisches Spitzenzentrum. Newsweek and Statista rank it 188 in World's Best Specialized Hospitals 2026: Oncology.",
    institutions: ["ccc-wuerzburg", "uk-erlangen", "deutsche-krebshilfe"],
    links: [
      { label: "Universitätsklinikum Regensburg", url: "https://www.ukr.de" },
      { label: "Newsweek World's Best Specialized Hospitals 2026: Oncology, rank 188 (Universitätsklinikum Regensburg, Regensburg)", url: NEWSWEEK_ONCOLOGY_2026 },
      { label: "UKR: about us", url: "https://www.ukr.de/ueber-uns" },
      { label: "UKR: tumour conferences", url: "https://www.ukr.de/medizin-pflege/tumorkonferenzen" },
      { label: "Comprehensive Cancer Center Ostbayern", url: "https://www.ccco.de/" },
      { label: "CCC Allianz WERA", url: WERA },
    ] }),

  i({ id: "helios-berlin-buch", name: "Helios Klinikum Berlin-Buch", aka: ["Helios Hospital Berlin-Buch"],
    city: "Berlin", country: "DE", lat: 52.631, lng: 13.51, institutionType: "hospital", website: "https://www.helios-gesundheit.de/standorte-angebote/kliniken/berlin-buch/",
    newsweekOncology2026: 193,
    tldr: "Helios Klinikum Berlin-Buch is a hospital in north Berlin run by the Helios hospital group. It has an oncology centre and specialist centres for breast, bowel, pancreatic, prostate, liver, skin and childhood cancers and sarcoma.",
    summary: "Helios Klinikum Berlin-Buch is a hospital of the Helios group on the Berlin-Buch health campus in north Berlin, and a university campus of the MSB Medical School Berlin. Its Onkologisches Zentrum brings together the participating clinics for interdisciplinary cancer care, with nutrition and social counselling, psycho-oncology and chaplaincy, and works with hospitals, practices, nursing services and hospices in the region. Its departments include oncology, general, visceral and oncological surgery, radiotherapy and radiation oncology and tumour orthopaedics, and its listed centres include breast, bowel, pancreatic, prostate, testicular, liver tumour, skin tumour, uro-oncology, gastrointestinal tumour, sarcoma and childhood cancer centres. Its gynaecology offers surgery, chemotherapy and antibody therapy for gynaecological cancers and breast cancer, including treatment within trials. Newsweek and Statista rank it 193 in World's Best Specialized Hospitals 2026: Oncology.",
    links: [
      { label: "Helios Klinikum Berlin-Buch", url: "https://www.helios-gesundheit.de/standorte-angebote/kliniken/berlin-buch/" },
      { label: "Newsweek World's Best Specialized Hospitals 2026: Oncology, rank 193 (Helios Klinikum Berlin-Buch, Berlin)", url: NEWSWEEK_ONCOLOGY_2026 },
      { label: "Helios Klinikum Berlin-Buch: Onkologisches Zentrum", url: "https://www.helios-gesundheit.de/standorte-angebote/kliniken/berlin-buch/leistungen/zentren/onkologisches-zentrum/" },
    ] }),

  i({ id: "hus-strasbourg-hautepierre", name: "Hôpitaux Universitaires de Strasbourg, Hôpital de Hautepierre", aka: ["HUS", "CHRU Strasbourg", "Strasbourg University Hospitals", "Hautepierre Hospital"],
    city: "Strasbourg", country: "FR", lat: 48.592, lng: 7.707, institutionType: "hospital", website: "https://www.chru-strasbourg.fr", newsweekOncology2026: 197,
    tldr: "Strasbourg's public university hospitals, with Hautepierre as one of their main sites. They treat cancers along fifteen clinical pathways with cancer and blood cancer services and supportive care, and since January 2026 they share a cancer building with the Institut Strauss.",
    summary: "The Hôpital de Hautepierre is a site of the Hôpitaux Universitaires de Strasbourg (HUS). The HUS describe a multidisciplinary oncology and haematology offer with 15 clinical pathways for cancer care, supportive oncology care (soins oncologiques de support), chemotherapy in day hospital or inpatient settings, and priorities in care, clinical and translational research, regional collaboration and teaching. The Institut Strauss (Institut de Cancérologie Strasbourg Europe), a Unicancer comprehensive cancer centre, says that from 1 January 2026 all its patient care takes place in the ICANS building at 17 rue Albert Calmette, Strasbourg, which it shares with the HUS from that date.\n\nNewsweek and Statista rank the CHRU Strasbourg, Hôpital de Hautepierre, 197th in World's Best Specialized Hospitals 2026: Oncology.",
    programs: ["Oncology and haematology (15 cancer care pathways)", "Supportive oncology care"],
    institutions: ["institut-strauss"],
    links: [
      { label: "Hôpitaux Universitaires de Strasbourg: Hôpital de Hautepierre", url: "https://www.chru-strasbourg.fr/Hopital-de-Hautepierre" },
      { label: "Newsweek World's Best Specialized Hospitals 2026: Oncology, rank 197 (CHRU Strasbourg - Hôpital de Hautepierre, Strasbourg)", url: NEWSWEEK_ONCOLOGY_2026 },
      { label: "Hôpitaux Universitaires de Strasbourg: prise en charge du cancer", url: "https://www.chru-strasbourg.fr/prise-en-charge-du-cancer/" },
      { label: "Institut Strauss: Qui sommes-nous ?", url: "https://www.institut-strauss.fr/presentation-generale/" },
    ] }),

  i({ id: "santandrea-rome", name: "Azienda Ospedaliero-Universitaria Sant'Andrea", aka: ["Ospedale Sant'Andrea", "Sant'Andrea University Hospital, Rome"],
    city: "Rome", country: "IT", lat: 41.982, lng: 12.47, institutionType: "hospital", website: "https://www.ospedalesantandrea.it", newsweekOncology2026: 215,
    tldr: "A public university hospital in the north of Rome, home of Sapienza University's faculty of medicine and psychology. A cancer tumour board and a front desk for new cancer patients coordinate care across many specialties.",
    summary: "The Azienda Ospedaliero-Universitaria Sant'Andrea is a public university hospital of the Lazio regional health service, opened in 2001, and the seat of the Sapienza University of Rome faculty of Medicina e Psicologia. Its oncology page describes a hospital tumour board that sets the overall direction of cancer care and updates protocols, diagnostic and therapeutic care pathways (PDTA) by tumour type such as breast and lung, and a Punto Oncologico di Accesso e di Continuità di Cura (PACO) for patients at their first oncology visit. Specialties listed as working together include medical oncology, radiotherapy, oncological surgery (general, thoracic, gynaecological and urological), diagnostic and interventional radiology, nuclear medicine, simultaneous care, pathology, medical genetics and molecular biology, pain therapy, clinical nutrition, psycho-oncology and rehabilitation.\n\nNewsweek and Statista rank it 215th in World's Best Specialized Hospitals 2026: Oncology.",
    programs: ["Hospital tumour board", "Oncological care pathways (PDTA)", "PACO oncology access point"],
    institutions: ["policlinico-umberto-i"],
    links: [
      { label: "Azienda Ospedaliero-Universitaria Sant'Andrea", url: "https://www.ospedalesantandrea.it/" },
      { label: "Newsweek World's Best Specialized Hospitals 2026: Oncology, rank 215 (Azienda Ospedaliera Universitaria Sant'Andrea, Rome)", url: NEWSWEEK_ONCOLOGY_2026 },
      { label: "Sant'Andrea: Azienda", url: "https://www.ospedalesantandrea.it/azienda" },
      { label: "Sant'Andrea: Oncologia", url: "https://www.ospedalesantandrea.it/oncologia" },
      { label: "Sant'Andrea: PACO, oncology access and continuity of care", url: "https://ospedalesantandrea.it/paco-accoglienza-per-pazienti-oncologico" },
    ] }),

  i({ id: "virgen-del-rocio", name: "Hospital Universitario Virgen del Rocío", aka: ["Virgen del Rocío University Hospital", "HUVR", "Hospital Virgen del Rocío"],
    city: "Seville", country: "ES", lat: 37.362, lng: -5.981, institutionType: "hospital", website: "https://hospitaluvrocio.es", newsweekOncology2026: 216,
    tldr: "A large university hospital in Seville, in southern Spain, run under the Andalusian regional government. Its medical oncology, radiation oncology and haematology services treat cancer, and it takes referrals from across Spain for bone and soft-tissue tumours and germ cell tumours.",
    summary: "Hospital Universitario Virgen del Rocío in Seville dates from 1955, according to its own page, and has more than 1,500 beds and more than 10,000 staff. It holds 35 national reference designations (CSUR) to which patients from anywhere in Spain can be referred, 33 Andalusian reference units and procedures, and takes part in 10 European Reference Networks. Its website carries the Junta de Andalucía logo and links to the regional government's public procurement profile.\n\nIts specialties include Medical Oncology, Radiation Oncology, Haematology and Radiophysics. The Medical Oncology clinical management unit has more than 100 staff, outpatient care morning and afternoon, a 20-bed ward and 24-hour specialist on-call cover; it says it is a reference centre for musculoskeletal and germ cell tumours for patients from the region and the rest of Spain, recruits to phase I, II and III trials, and collaborates in basic research with the Instituto de Biomedicina de Sevilla (IBiS). Newsweek and Statista rank it 216th in World's Best Specialized Hospitals 2026: Oncology.",
    programs: ["Medical Oncology clinical management unit", "Radiation Oncology", "Haematology", "Reference centre for musculoskeletal and germ cell tumours"],
    institutions: [],
    links: [
      { label: "Hospital Universitario Virgen del Rocío", url: "https://hospitaluvrocio.es" },
      { label: "Newsweek World's Best Specialized Hospitals 2026: Oncology, rank 216 (Hospital Universitario Virgen del Rocío, Seville)", url: NEWSWEEK_ONCOLOGY_2026 },
      { label: "Virgen del Rocío: the hospital", url: "https://hospitaluvrocio.es/unidad/hospital-universitario-virgen-del-rocio/" },
      { label: "Virgen del Rocío: Medical Oncology unit", url: "https://hospitaluvrocio.es/unidad/oncologia-medica/" },
      { label: "Virgen del Rocío: Radiation Oncology", url: "https://hospitaluvrocio.es/unidad/oncologia-radioterapica/" },
    ] }),

  i({ id: "umg-goettingen", name: "Universitätsmedizin Göttingen", aka: ["UMG", "University Medical Center Göttingen", "UniversitätsKrebszentrum Göttingen", "G-CCC", "Göttingen Comprehensive Cancer Center"],
    city: "Göttingen", country: "DE", lat: 51.551, lng: 9.943, institutionType: "hospital", website: "https://www.umg.eu/",
    newsweekOncology2026: 218,
    tldr: "University Medical Center Göttingen is the medical faculty and university hospital of the University of Göttingen, Germany. Its cancer centre unites all its cancer clinics and, with Hannover Medical School, forms a cancer centre funded by the charity German Cancer Aid.",
    summary: "The Universitätsmedizin Göttingen (UMG) is the Medical Faculty and University Hospital of the Georg-August-Universität Göttingen. Its UniversitätsKrebszentrum (G-CCC, Göttingen Comprehensive Cancer Center) is an interdisciplinary centre bringing together all of the UMG's clinics and institutes working in oncology. With the CCC Hannover of the Medizinische Hochschule Hannover it forms the Comprehensive Cancer Center Niedersachsen (CCC-N), which works with associated hospitals and practices and which Deutsche Krebshilfe lists among the Onkologische Spitzenzentren it funds (as Göttingen/Hannover). Newsweek and Statista rank it 218 in World's Best Specialized Hospitals 2026: Oncology.",
    institutions: ["mhh-hannover", "deutsche-krebshilfe"],
    links: [
      { label: "Universitätsmedizin Göttingen", url: "https://www.umg.eu/" },
      { label: "Newsweek World's Best Specialized Hospitals 2026: Oncology, rank 218 (Universitätsmedizin Göttingen, Göttingen)", url: NEWSWEEK_ONCOLOGY_2026 },
      { label: "UMG: about us", url: "https://www.umg.eu/ueber-uns/" },
      { label: "UniversitätsKrebszentrum Göttingen (G-CCC)", url: "https://gccc.umg.eu/" },
      { label: "Deutsche Krebshilfe: Onkologische Spitzenzentren", url: DKH_SPITZENZENTREN },
    ] }),

  i({ id: "martini-klinik", name: "Martini-Klinik Prostatakrebszentrum", aka: ["Martini-Klinik am UKE", "Martini Clinic", "Martini-Klinik Prostate Cancer Center"],
    city: "Hamburg", country: "DE", lat: 53.592, lng: 9.979, institutionType: "cancer-center", website: "https://www.martini-klinik.de",
    newsweekOncology2026: 226,
    tldr: "The Martini-Klinik is a prostate cancer hospital in Hamburg, Germany, and part of the University Medical Center Hamburg-Eppendorf. It diagnoses and treats only prostate cancer, from active monitoring to surgery and radiotherapy.",
    summary: "The Martini-Klinik is a clinic of the Universitätsklinikum Hamburg-Eppendorf (UKE) specialised in the diagnosis and treatment of prostate cancer. It offers second-opinion review when first biopsy results are unclear and PSMA PET/CT staging, and presents five established strategies for localised prostate cancer: radical prostatectomy (open or robot-assisted), external beam radiotherapy, low or high dose rate brachytherapy, focal therapy and active surveillance, with treatment options for advanced disease. It describes its model as super-specialisation, measurement of outcome quality and a faculty system. Newsweek and Statista rank it 226 in World's Best Specialized Hospitals 2026: Oncology.",
    institutions: ["uke-hamburg"], cancers: ["prostate"],
    links: [
      { label: "Martini-Klinik", url: "https://www.martini-klinik.de" },
      { label: "Newsweek World's Best Specialized Hospitals 2026: Oncology, rank 226 (Martini-Klinik am UKE, Hamburg)", url: NEWSWEEK_ONCOLOGY_2026 },
      { label: "Martini-Klinik: treatment options", url: "https://www.martini-klinik.de/therapie" },
    ] }),

  i({ id: "bellvitge", name: "Hospital Universitari de Bellvitge", aka: ["Bellvitge University Hospital", "HUB", "Hospital de Bellvitge"],
    city: "Barcelona", country: "ES", lat: 41.345, lng: 2.104, institutionType: "hospital", website: "https://www.bellvitgehospital.cat", newsweekOncology2026: 227,
    tldr: "A public university hospital on the edge of Barcelona that provides cancer care together with the Catalan Institute of Oncology on the same campus. With the institute, a research institute and the University of Barcelona, it forms a campus recognised as a comprehensive cancer centre.",
    summary: "The Hospital Universitari de Bellvitge describes itself as a public, university, research hospital with 5,200 professionals, the local hospital for L'Hospitalet and El Prat de Llobregat and a referral centre of the highest complexity for 2 million people in southern Catalonia. It says oncological care is delivered in coordination with the Institut Català d'Oncologia (ICO) through functional units, that research is done with the Institut d'Investigació Biomèdica de Bellvitge (IDIBELL), and that it is linked to the University of Barcelona's Faculty of Medicine and Health Sciences, Bellvitge campus. Its areas of expertise include oncological care and robotic surgery, and its Centre d'Alta Precisió Diagnòstica houses a PET/MRI scanner.\n\nThe Campus Salut Bellvitge, made up of the hospital, ICO, IDIBELL and the University of Barcelona, is recognised by the Organisation of European Cancer Institutes (OECI) as a Comprehensive Cancer Centre; eight projects involving its staff were funded by La Marató de 3Cat's cancer call, out of 38 funded from 201 proposals. Newsweek and Statista rank the hospital 227th in World's Best Specialized Hospitals 2026: Oncology.",
    programs: ["Oncology functional units with the Institut Català d'Oncologia", "Comprehensive Cancer Centre Campus Salut Bellvitge (OECI)", "Centre d'Alta Precisió Diagnòstica (PET/MRI)"],
    institutions: ["ico-catalonia"],
    links: [
      { label: "Hospital Universitari de Bellvitge", url: "https://www.bellvitgehospital.cat" },
      { label: "Newsweek World's Best Specialized Hospitals 2026: Oncology, rank 227 (Hospital Universitari de Bellvitge, Barcelona)", url: NEWSWEEK_ONCOLOGY_2026 },
      { label: "Bellvitge: who we are", url: "https://www.bellvitgehospital.cat/ca/qui-som/lhospital" },
      { label: "Bellvitge: eight Comprehensive Cancer Centre Campus Salut Bellvitge projects funded by La Marató de 3Cat", url: "https://bellvitgehospital.cat/ca/actualitat/noticia/vuit-projectes-del-comprehensive-cancer-centre-campus-salut-bellvitge-reben" },
    ] }),

  i({ id: "uk-jena", name: "Universitätsklinikum Jena", aka: ["UKJ", "Jena University Hospital", "UniversitätsTumorCentrum Jena", "UTC Jena"],
    city: "Jena", country: "DE", lat: 50.93, lng: 11.58, institutionType: "hospital", website: "https://www.uniklinikum-jena.de/",
    newsweekOncology2026: 228,
    tldr: "Jena University Hospital is a university hospital in Thuringia, Germany. Its tumour centre brings together certified cancer centres for many cancers, and with Leipzig University Hospital it forms the Central German Cancer Center, funded by the charity German Cancer Aid.",
    summary: "The Universitätsklinikum Jena (UKJ) is the university hospital in Jena, Thuringia. Its UniversitätsTumorCentrum (UTC) brings together 20 clinics, 10 institutes, 6 certified organ cancer centres, 8 modules and 2 focus areas, with certified centres for breast, gynaecological, prostate, kidney, skin and bowel cancers and haematological neoplasms, and modules including head and neck, liver and oesophageal cancer; the hospital also lists a neuro-oncology centre, a sarcoma centre and a stem cell transplantation section. With Leipzig University Hospital it forms the Mitteldeutsches Krebszentrum (CCCG), which after international review was again funded by Deutsche Krebshilfe as an Onkologisches Spitzenzentrum, with 4.8 million euros for four years. Newsweek and Statista rank it 228 in World's Best Specialized Hospitals 2026: Oncology.",
    institutions: ["university-hospital-leipzig", "deutsche-krebshilfe"],
    links: [
      { label: "Universitätsklinikum Jena", url: "https://www.uniklinikum-jena.de/" },
      { label: "Newsweek World's Best Specialized Hospitals 2026: Oncology, rank 228 (Universitätsklinikum Jena, Jena)", url: NEWSWEEK_ONCOLOGY_2026 },
      { label: "UKJ: UniversitätsTumorCentrum", url: "https://www.uniklinikum-jena.de/tz/" },
      { label: "UKJ: centres", url: "https://www.uniklinikum-jena.de/Kliniken+_+Institute/Zentren.html" },
      { label: "Deutsche Krebshilfe: Onkologische Spitzenzentren", url: DKH_SPITZENZENTREN },
    ] }),

  i({ id: "kantonsspital-st-gallen", name: "Kantonsspital St.Gallen", aka: ["Cantonal Hospital St. Gallen", "KSSG", "Comprehensive Cancer Centre St.Gallen", "HOCH Health Ostschweiz"],
    city: "St. Gallen", country: "CH", lat: 47.43, lng: 9.388, institutionType: "hospital", website: "https://www.h-och.ch/comprehensive-cancer-centre/", newsweekOncology2026: 230,
    tldr: "The main hospital of the eastern Swiss health group HOCH Health Ostschweiz, in St. Gallen. Its Comprehensive Cancer Centre brings specialists together in tumour boards to plan each patient's diagnosis, treatment and follow-up.",
    summary: "The Kantonsspital St.Gallen is the St. Gallen site of HOCH Health Ostschweiz, which also runs hospitals in Grabs, Linth and Wil and outpatient centres. The site page describes it as a university teaching and research hospital that provides basic care for the city and specialised centre services for the canton and parts of neighbouring cantons. HOCH says more than 300 scientific papers are published and more than 200 clinical trials are under way across the group each year.\n\nIts Comprehensive Cancer Centre pools specialists from clinics, institutes and outside partners, who discuss each case in tumour boards. The services it lists include interdisciplinary clinics for gynaecological, lung, neuro-, dermato-, head and neck, uro- and visceral surgical oncology, sarcoma, tumour pain and palliative care, care for the common solid cancers and for leukaemias, lymphoma and GIST, liver tumour surgery, and genetic counselling for familial breast and gynaecological cancer and Lynch syndrome. It hosts the annual St.Galler Fortbildung Klinische Onkologie, in its 37th edition in 2027. Newsweek and Statista rank it 230th in World's Best Specialized Hospitals 2026: Oncology, under the name Kantonsspital St.Gallen / Comprehensive Cancer Centre.",
    programs: ["Comprehensive Cancer Centre with tumour boards", "Interdisciplinary sarcoma clinic", "Genetic counselling for familial breast and gynaecological cancer and Lynch syndrome", "St.Galler Fortbildung Klinische Onkologie"],
    institutions: [],
    links: [
      { label: "Kantonsspital St.Gallen: Comprehensive Cancer Centre", url: "https://www.h-och.ch/comprehensive-cancer-centre/" },
      { label: "Newsweek World's Best Specialized Hospitals 2026: Oncology, rank 230 (Kantonsspital St.Gallen / Comprehensive Cancer Centre, St. Gallen)", url: NEWSWEEK_ONCOLOGY_2026 },
      { label: "Comprehensive Cancer Centre: services", url: "https://www.h-och.ch/comprehensive-cancer-centre/leistungsangebot/" },
      { label: "HOCH Health Ostschweiz: Kantonsspital St.Gallen site", url: "https://www.h-och.ch/ueber-uns/standorte/stgallen/" },
      { label: "HOCH Health Ostschweiz: about us", url: "https://www.h-och.ch/ueber-uns/" },
    ] }),

  i({ id: "federico-ii-naples", name: "Azienda Ospedaliera Universitaria Federico II", aka: ["AOU Federico II", "Policlinico Federico II", "Federico II University Hospital, Naples"],
    city: "Naples", country: "IT", lat: 40.867, lng: 14.222, institutionType: "hospital", website: "https://www.policlinico.unina.it", newsweekOncology2026: 237,
    tldr: "The public university hospital of the University of Naples Federico II. It hosts the Campania region's coordinating centre for rare cancers, which treats testicular, thymic, neuroendocrine and rare head and neck tumours, sarcomas and rare melanomas.",
    summary: "The Azienda Ospedaliera Universitaria Federico II describes itself as combining care, teaching and research as a structural part both of the Campania regional health service and of the university. By regional decree DCA 90 of 31 October 2019 the Centro Regionale di Coordinamento per i Tumori Rari della Regione Campania was set up at the hospital, where a regional rare tumour centre already worked as the regional coordinating node of the national rare tumour network. The centre lists diagnosis and treatment of rare tumours, acting as reference provider for testicular tumours, thymic tumours, sarcomas including gastrointestinal stromal tumours, neuroendocrine tumours, rare melanomas (uveal and mucosal) and head and neck tumours, with day hospital, inpatient and outpatient care under the national health service.\n\nNewsweek and Statista rank it 237th in World's Best Specialized Hospitals 2026: Oncology.",
    programs: ["Campania regional coordinating centre for rare tumours"],
    institutions: [],
    links: [
      { label: "Azienda Ospedaliera Universitaria Federico II", url: "https://www.policlinico.unina.it/flex/cm/pages/ServeBLOB.php/L/IT/IDPagina/1" },
      { label: "Newsweek World's Best Specialized Hospitals 2026: Oncology, rank 237 (Azienda Ospedaliera Universitaria Federico II di Napoli, Naples)", url: NEWSWEEK_ONCOLOGY_2026 },
      { label: "AOU Federico II: Azienda", url: "https://www.policlinico.unina.it/azienda" },
      { label: "AOU Federico II: regional coordinating centre for rare tumours", url: "https://www.policlinico.unina.it/TumoriRari" },
    ] }),

  i({ id: "royal-orthopaedic-hospital-birmingham", name: "The Royal Orthopaedic Hospital, Birmingham", aka: ["Royal Orthopaedic Hospital", "ROH", "The Royal Orthopaedic Hospital NHS Foundation Trust"],
    city: "Birmingham", country: "GB", lat: 52.421, lng: -1.961, institutionType: "hospital", website: "https://www.roh.nhs.uk",
    newsweekOncology2026: 243,
    tldr: "A specialist public bone and joint hospital in Birmingham whose oncology team diagnoses and treats tumours of the bones and soft tissues, including sarcomas. It runs the Birmingham Sarcoma Service together with two other public hospital trusts in Birmingham.",
    summary: "The Royal Orthopaedic Hospital NHS Foundation Trust is a specialist orthopaedic hospital in Birmingham. Its orthopaedic oncology team specialises in diagnosing and treating benign and malignant tumours of bone and soft tissue. With University Hospitals Birmingham NHS Foundation Trust and Birmingham Women's and Children's Hospital NHS Foundation Trust it makes up the Birmingham Sarcoma Service, which the hospital says provides specialist care for patients regionally and nationally with all types and stages of soft tissue and bone sarcoma. Its patient pages describe surgery, radiotherapy before or after surgery, and chemotherapy as treatments for soft tissue sarcoma, and point patients to Sarcoma UK and the Bone Cancer Research Trust.\n\nNewsweek and Statista ranked it 243rd in World's Best Specialized Hospitals 2026: Oncology.",
    institutions: ["birmingham-cancer-centre", "sarcoma-uk", "bone-cancer-research-trust"],
    links: [
      { label: "The Royal Orthopaedic Hospital NHS Foundation Trust", url: "https://www.roh.nhs.uk" },
      { label: "Newsweek World's Best Specialized Hospitals 2026: Oncology, rank 243 (Royal Orthopaedic Hospital, Birmingham)", url: NEWSWEEK_ONCOLOGY_2026 },
      { label: "ROH: Oncology service and the Birmingham Sarcoma Service", url: "https://www.roh.nhs.uk/services-information/oncology" },
      { label: "ROH: About us", url: "https://www.roh.nhs.uk/about-us" },
    ] }),

  i({ id: "james-cook-cancer-institute", name: "James Cook Cancer Institute", aka: ["James Cook Cancer Institute, South Tees Hospitals NHS Foundation Trust", "The James Cook University Hospital cancer services"],
    city: "Middlesbrough", country: "GB", lat: 54.552, lng: -1.214, institutionType: "cancer-center", website: "https://www.southtees.nhs.uk/services/cancer-institute/",
    newsweekOncology2026: 248,
    tldr: "The cancer service of the South Tees public hospitals trust, based at the James Cook University Hospital in Middlesbrough and the Friarage Hospital in Northallerton. It provides cancer tests, surgery, radiotherapy and chemotherapy for people across Teesside and North Yorkshire.",
    summary: "The James Cook Cancer Institute is the cancer service of South Tees Hospitals NHS Foundation Trust, working from the James Cook University Hospital in Middlesbrough and the Friarage Hospital in Northallerton. The trust describes it as the specialist centre for cancer diagnosis, treatment and care for more than 1.5 million people across Teesside, North Yorkshire and beyond, performing more than 2,000 cancer operations a year across breast, lung, cardiothoracic, upper and lower gastrointestinal, haematological, skin, gynaecological, urological, head and neck, thyroid and brain and central nervous system cancers, with specialist palliative care. Its radiotherapy department carries out about 40,000 treatments a year, and its chemotherapy service about 10,000, from day units at James Cook and the Sir Robert Ogden Macmillan Centre at the Friarage and a day service at Darlington Memorial Hospital run with County Durham and Darlington NHS Foundation Trust; there is a teenage and young adult unit on the haematology ward. It also runs a rapid diagnostic centre, a radiotherapy late effects service (CLEAR), a prehabilitation programme and an oncology trials unit, and lists Maggie's Middlesbrough among its support services. Since 2024 South Tees has worked with North Tees and Hartlepool NHS Foundation Trust as the group University Hospitals Tees.\n\nNewsweek and Statista ranked it 248th in World's Best Specialized Hospitals 2026: Oncology.",
    institutions: ["maggies-middlesbrough"],
    links: [
      { label: "South Tees Hospitals: James Cook Cancer Institute", url: "https://www.southtees.nhs.uk/services/cancer-institute/" },
      { label: "Newsweek World's Best Specialized Hospitals 2026: Oncology, rank 248 (James Cook Cancer Institute, Middlesbrough)", url: NEWSWEEK_ONCOLOGY_2026 },
      { label: "James Cook Cancer Institute: welcome", url: "https://www.southtees.nhs.uk/services/cancer-institute/welcome-to-the-james-cook-cancer-institute/" },
      { label: "James Cook Cancer Institute: radiotherapy", url: "https://www.southtees.nhs.uk/services/cancer-institute/radiotherapy/" },
      { label: "James Cook Cancer Institute: chemotherapy", url: "https://www.southtees.nhs.uk/services/cancer-institute/chemotherapy/" },
      { label: "About University Hospitals Tees", url: "https://www.southtees.nhs.uk/about/university-hospitals-tees/about/" },
    ] }),

  i({ id: "wythenshawe-hospital", name: "Wythenshawe Hospital", aka: ["Wythenshawe Hospital, Manchester University NHS Foundation Trust", "North West Lung Centre"],
    city: "Manchester", country: "GB", lat: 53.39, lng: -2.295, institutionType: "hospital", website: "https://mft.nhs.uk/wythenshawe/",
    newsweekOncology2026: 249,
    tldr: "A teaching hospital in south Manchester run by the Manchester University public hospitals trust. It is the trust's base for lung cancer care and lung surgery, and also treats breast cancer, while most chemotherapy and all radiotherapy for its patients is given by The Christie.",
    summary: "Wythenshawe Hospital is an acute teaching hospital in south Manchester and part of Manchester University NHS Foundation Trust, formed on 1 October 2017, which runs ten hospitals on seven sites. The hospital lists cardiology and cardiothoracic surgery, heart and lung transplantation, respiratory medicine, burns and plastics, cancer and breast care among its specialist fields, and is home to the North West Lung Centre. The trust's Department of Thoracic Oncology is based mainly at Wythenshawe and covers most of the North West of England; the trust provides lung surgery for Greater Manchester and gives lung cancer diagnosis, chemotherapy and surgery for patients across Greater Manchester and Cheshire. Its breast unit, the Nightingale Centre, provides breast screening and surgery with reconstruction. The trust treats around 2,300 newly diagnosed cancer patients a year; The Christie gives most chemotherapy and all radiotherapy for its patients, sarcoma care goes to the Greater Manchester and Oswestry Sarcoma Service and brain tumours to Salford Royal, and children are treated at Royal Manchester Children's Hospital.\n\nNewsweek and Statista ranked it 249th in World's Best Specialized Hospitals 2026: Oncology.",
    institutions: ["the-christie", "manchester-royal-infirmary"],
    links: [
      { label: "Wythenshawe Hospital (Manchester University NHS Foundation Trust)", url: "https://mft.nhs.uk/wythenshawe/" },
      { label: "Newsweek World's Best Specialized Hospitals 2026: Oncology, rank 249 (Wythenshawe Hospital, Manchester)", url: NEWSWEEK_ONCOLOGY_2026 },
      { label: "Wythenshawe Hospital: About", url: "https://mft.nhs.uk/wythenshawe/about/" },
      { label: "Wythenshawe Hospital: Cancer Services", url: "https://mft.nhs.uk/wythenshawe/services/cancer-services" },
      { label: "MFT: Department of Thoracic Oncology", url: "https://mft.nhs.uk/wythenshawe/services/thoracic-oncology" },
    ] }),

  i({ id: "catharina-eindhoven", name: "Catharina Ziekenhuis", aka: ["Catharina Hospital", "Catharina Ziekenhuis Eindhoven", "Catharina Kanker Instituut", "Catharina Cancer Institute"],
    city: "Eindhoven", country: "NL", lat: 51.466, lng: 5.472, institutionType: "hospital", website: "https://www.catharinaziekenhuis.nl", newsweekOncology2026: 253,
    tldr: "A hospital in Eindhoven in the south of the Netherlands whose cancer institute brings cancer doctors and nurses together in one place. Patients are referred from other hospitals for some treatments, including surgery for pancreatic cancer.",
    summary: "Catharina Ziekenhuis is a hospital in Eindhoven. Its Catharina Kanker Instituut (CKI) brings the doctors and other professionals involved in cancer care together at one location with regular joint consultation, assigns each patient a case manager, usually a nurse specialist, and says many patients come from other hospitals for treatments offered in only a few Dutch hospitals. It holds STZ TEC recognition (top clinical care) for the treatment of pancreatic carcinoma.\n\nThe hospital is one of the member hospitals of OncoZON, the oncology network of south-east Netherlands, which went through a network accreditation with the Organisation of European Cancer Institutes. Newsweek and Statista rank it 253rd in World's Best Specialized Hospitals 2026: Oncology.",
    programs: ["Catharina Kanker Instituut", "STZ TEC recognition for pancreatic carcinoma", "OncoZON member hospital"],
    institutions: ["oncozon"],
    links: [
      { label: "Catharina Ziekenhuis", url: "https://www.catharinaziekenhuis.nl" },
      { label: "Newsweek World's Best Specialized Hospitals 2026: Oncology, rank 253 (Catharina Ziekenhuis, Eindhoven)", url: NEWSWEEK_ONCOLOGY_2026 },
      { label: "Catharina Kanker Instituut", url: "https://www.catharinaziekenhuis.nl/catharina-kankerinstituut/" },
      { label: "OncoZON: member hospitals", url: "https://www.oncozon.nl/aangesloten-ziekenhuizen/" },
      { label: "OncoZON: OECI accreditation", url: "https://www.oncozon.nl/oeci/" },
    ] }),

  i({ id: "hirslanden-st-anna-lucerne", name: "Hirslanden Klinik St. Anna", aka: ["Klinik St. Anna Luzern", "St. Anna Clinic Lucerne"],
    city: "Lucerne", country: "CH", lat: 47.058, lng: 8.326, institutionType: "hospital", website: "https://www.hirslanden.ch/de/klinik-st--anna/home.html", newsweekOncology2026: 264,
    tldr: "A private hospital of the Swiss Hirslanden group in Lucerne. It offers cancer and blood cancer treatment, radiotherapy, nuclear medicine and psychological support for people with cancer, and screening mammograms for the regional breast cancer screening programme.",
    summary: "Hirslanden Klinik St. Anna works across three sites, Klinik St. Anna, St. Anna im Bahnhof and St. Anna in Meggen, with more than 250 doctors covering about 40 specialties. It takes part in the cantonal breast cancer screening programme, offering screening mammography.\n\nIts Oncology and Haematology department describes chemotherapy, hormone therapy, immunotherapy and targeted therapy, care during and after treatment, palliative care, haematological diagnosis including bone marrow biopsy, and the clinic's radio-oncology, nuclear medicine and psycho-oncology services. Newsweek and Statista rank it 264th in World's Best Specialized Hospitals 2026: Oncology; the same list ranks Klinik Hirslanden in Zurich 267th and Klinik Beau-Site in Bern 288th.",
    programs: ["Oncology and Haematology", "Radio-oncology and nuclear medicine", "Psycho-oncology", "Cantonal breast cancer screening programme"],
    institutions: ["klinik-hirslanden-zurich", "hirslanden-beau-site-bern"],
    links: [
      { label: "Hirslanden Klinik St. Anna", url: "https://www.hirslanden.ch/de/klinik-st--anna/home.html" },
      { label: "Newsweek World's Best Specialized Hospitals 2026: Oncology, rank 264 (Hirslanden Klinik St. Anna, Lucerne)", url: NEWSWEEK_ONCOLOGY_2026 },
      { label: "Klinik St. Anna: Oncology and Haematology", url: "https://www.hirslanden.ch/de/klinik-st--anna/fachgebiete/onkologie-und-haematologie.html" },
    ] }),

  i({ id: "klinik-hirslanden-zurich", name: "Klinik Hirslanden", aka: ["Klinik Hirslanden Zürich", "Hirslanden Clinic Zurich", "Tumorzentrum Hirslanden Zürich"],
    city: "Zurich", country: "CH", lat: 47.351, lng: 8.576, institutionType: "hospital", website: "https://www.hirslanden.ch/de/klinik-hirslanden/home.html", newsweekOncology2026: 267,
    tldr: "A private hospital of the Hirslanden group in Zurich, open to patients with any class of Swiss insurance. Its tumour centre brings together certified cancer centres and plans each patient's treatment in multidisciplinary tumour boards.",
    summary: "Klinik Hirslanden in Zurich belongs to the Hirslanden group, is open to patients of all insurance classes, and is a teaching hospital of the University of Zurich's Faculty of Medicine. Its Tumorzentrum Hirslanden Zürich brings together cancer centres certified by the German Cancer Society (DKG) and on that basis carries the designation European Cancer Centre; specialists discuss each case in tumour boards, an individual treatment plan is drawn up for every patient, molecular testing guides personalised oncology, and the centre runs clinical research. The clinic reports investment in new radiotherapy technology from Siemens Healthineers.\n\nNewsweek and Statista rank it 267th in World's Best Specialized Hospitals 2026: Oncology; the same list ranks Hirslanden Klinik St. Anna in Lucerne 264th and Klinik Beau-Site in Bern 288th.",
    programs: ["Tumorzentrum Hirslanden Zürich (European Cancer Centre, DKG-certified centres)", "Tumour boards", "Personalised oncology with molecular testing", "Radiotherapy"],
    institutions: ["hirslanden-st-anna-lucerne", "hirslanden-beau-site-bern"],
    links: [
      { label: "Klinik Hirslanden", url: "https://www.hirslanden.ch/de/klinik-hirslanden/home.html" },
      { label: "Newsweek World's Best Specialized Hospitals 2026: Oncology, rank 267 (Klinik Hirslanden Zürich, Zurich)", url: NEWSWEEK_ONCOLOGY_2026 },
      { label: "Tumorzentrum Hirslanden Zürich", url: "https://www.hirslanden.ch/de/klinik-hirslanden/centers/tumorzentrum.html" },
      { label: "Klinik Hirslanden: new radiotherapy technology", url: "https://www.hirslanden.ch/de/klinik-hirslanden/news-und-medien/medienmitteilungen/neue-massstaebe-in-der-strahlentherapie.html" },
    ] }),

  i({ id: "london-bridge-hospital", name: "London Bridge Hospital", aka: ["HCA Healthcare UK London Bridge Hospital", "Private Care at Guy's"],
    city: "London", country: "GB", lat: 51.506, lng: -0.086, institutionType: "hospital", website: "https://www.hcahealthcare.co.uk/facilities/london-bridge-hospital",
    newsweekOncology2026: 273,
    tldr: "A private hospital in central London owned by HCA Healthcare UK. It offers cancer diagnosis, surgery, chemotherapy, radiotherapy and stem cell transplants for blood cancers, much of it at Private Care at Guy's, a private cancer unit on the top floors of the public cancer centre at Guy's Hospital.",
    summary: "London Bridge Hospital is a private hospital of HCA Healthcare UK in central London, with specialties that it lists as cardiac care, cancer care, haematology, digestive diseases, urology, orthopaedics and spinal care, neurosciences and women's health. It offers autologous haematopoietic stem cell transplantation for eligible patients with certain blood cancers and the Ion platform for diagnosing lung nodules. Private Care at Guy's, which HCA calls its cancer centre, sits on the top four floors of Guy's Hospital's NHS cancer centre but is wholly owned by London Bridge Hospital; it has theatres, chemotherapy and radiotherapy, oncology and surgical wards, a four-bed intensive care unit and a JACIE accredited stem cell transplantation unit, and houses the hospital's urology, haematology, head and neck, gynaecology and oncology services.\n\nNewsweek and Statista ranked it 273rd in World's Best Specialized Hospitals 2026: Oncology.",
    institutions: ["guys-st-thomas"],
    links: [
      { label: "HCA Healthcare UK: London Bridge Hospital", url: "https://www.hcahealthcare.co.uk/facilities/london-bridge-hospital" },
      { label: "Newsweek World's Best Specialized Hospitals 2026: Oncology, rank 273 (London Bridge Hospital, London)", url: NEWSWEEK_ONCOLOGY_2026 },
      { label: "HCA Healthcare UK: Private Care at Guy's", url: "https://www.hcahealthcare.co.uk/locations/hospitals/london-bridge-hospital/private-care-at-guys" },
    ] }),

  i({ id: "clinique-generale-beaulieu", name: "Clinique Générale-Beaulieu", aka: ["Generale-Beaulieu Clinic Geneva", "Clinique Générale-Beaulieu, Swiss Medical Network"],
    city: "Geneva", country: "CH", lat: 46.189, lng: 6.162, institutionType: "hospital", website: "https://www.swissmedical.net/fr/hopitaux/generale-beaulieu", newsweekOncology2026: 279,
    tldr: "A private hospital in Geneva, part of Swiss Medical Network, with a medical oncology centre, a radiotherapy centre, a breast centre and supportive care for people with cancer. Its oncology centre is open to patients with basic as well as private insurance.",
    summary: "Clinique Générale-Beaulieu is a private hospital in Geneva, founded in 1899 according to its own page, and part of Swiss Medical Network. Its medical oncology centre provides outpatient diagnosis and treatment of cancer alongside the clinic's radiology, radio-oncology and nuclear medicine departments, and is open to patients with basic (LAMal), semi-private or private cover. Its radio-oncology centre discusses cases in weekly tumour boards and treats with a CyberKnife S7 and a Radixact image-guided intensity-modulated system. The clinic also lists a breast centre, urological care for prostate cancer, robotic surgery, and a supportive care centre for oncological rehabilitation.\n\nNewsweek and Statista rank it 279th in World's Best Specialized Hospitals 2026: Oncology.",
    programs: ["Medical oncology centre", "Radio-oncology centre (CyberKnife S7, Radixact)", "Breast centre", "Supportive care and oncological rehabilitation"],
    institutions: [],
    links: [
      { label: "Clinique Générale-Beaulieu", url: "https://www.swissmedical.net/fr/hopitaux/generale-beaulieu" },
      { label: "Newsweek World's Best Specialized Hospitals 2026: Oncology, rank 279 (Clinique Générale-Beaulieu, Geneva)", url: NEWSWEEK_ONCOLOGY_2026 },
      { label: "Clinique Générale-Beaulieu: oncology centre", url: "https://www.swissmedical.net/fr/hopitaux/generale-beaulieu/centres/oncologie" },
      { label: "Clinique Générale-Beaulieu: radio-oncology centre", url: "https://www.swissmedical.net/fr/hopitaux/generale-beaulieu/centres/radio-oncologie" },
    ] }),

  i({ id: "lindenhofspital-bern", name: "Lindenhofspital", aka: ["Lindenhofspital Bern", "Lindenhof Hospital Bern", "Lindenhofgruppe"],
    city: "Bern", country: "CH", lat: 46.958, lng: 7.428, institutionType: "hospital", website: "https://www.lindenhofgruppe.ch/de/", newsweekOncology2026: 280,
    tldr: "A privately owned hospital in Bern, one of three sites of the Lindenhof group, which is on the canton's hospital list. Its cancer services include oncology, radiotherapy, a breast centre and weekly tumour boards.",
    summary: "The Lindenhofspital is one of three sites, with Engeried and Sonnenhof, of the Lindenhofgruppe, a privately owned group of listed hospitals in Bern. The group says it treats more than 184,000 patients a year, more than 31,000 of them as inpatients, employs about 2,600 people, and that its main fields include oncology, urology, women's medicine, visceral surgery, radiology and radiotherapy.\n\nSpecialists involved in tumour treatment meet in weekly tumour boards for breast and gynaecology, haematology, urology and prostate with neurosurgery, and visceral, thoracic and general cancers, with the family doctor involved. The group also lists the Brustzentrum Bern, radio-oncology and interventional radiology, and runs a prostate cancer awareness campaign each November. Newsweek and Statista rank the Lindenhofspital 280th in World's Best Specialized Hospitals 2026: Oncology.",
    programs: ["Weekly tumour boards", "Brustzentrum Bern", "Radio-oncology"],
    institutions: [],
    links: [
      { label: "Lindenhofgruppe", url: "https://www.lindenhofgruppe.ch/de/" },
      { label: "Newsweek World's Best Specialized Hospitals 2026: Oncology, rank 280 (Lindenhofspital Bern, Bern)", url: NEWSWEEK_ONCOLOGY_2026 },
      { label: "Lindenhofgruppe: about us", url: "https://www.lindenhofgruppe.ch/de/ueber-uns/" },
      { label: "Lindenhofgruppe: tumour boards", url: "https://www.lindenhofgruppe.ch/de/zuweiser/tumorboards/" },
    ] }),

  i({ id: "chu-bordeaux-pellegrin", name: "CHU de Bordeaux, Groupe hospitalier Pellegrin", aka: ["Hôpital Pellegrin", "CHU de Bordeaux", "Bordeaux University Hospital", "Pellegrin Hospital"],
    city: "Bordeaux", country: "FR", lat: 44.828, lng: -0.604, institutionType: "hospital", website: "https://www.chu-bordeaux.fr", newsweekOncology2026: 282,
    tldr: "Pellegrin is one of the hospitals of Bordeaux's public university hospital. The university hospital treats all adult cancers, and children's cancers, across its Pellegrin, Haut-Lévêque and Saint-André sites.",
    summary: "The Groupe hospitalier Pellegrin, founded in the nineteenth century, is a site of the Centre Hospitalier Universitaire de Bordeaux, including the Tripode building (1978) and the children's hospital (1992); its main activities include surgery, maternity, paediatrics, adult and paediatric emergencies and the SAMU. The CHU says it provides complete cancer care across its Pellegrin, Haut-Lévêque and Saint-André hospitals, treats all types of cancer at all stages, that patients treated for cancer make up about a third of its overall activity, and that every case is reviewed in multidisciplinary meetings (RCP), with supportive care and access to clinical research. Its patient pages cover breast, lung, digestive, gynaecological, head and neck, endocrine and thyroid, urological, brain and central nervous system, skin and blood cancers, and cancers of children and adolescents, coordinated by the CHU's cancer coordination centre (3C).\n\nNewsweek and Statista rank the CHU Bordeaux, Groupe hospitalier Pellegrin, 282nd in World's Best Specialized Hospitals 2026: Oncology.",
    programs: ["Adult cancer care across Pellegrin, Haut-Lévêque and Saint-André", "Cancers of children and adolescents", "Centre de coordination en cancérologie (3C)"],
    institutions: [],
    links: [
      { label: "CHU de Bordeaux: Hôpital Pellegrin", url: "https://www.chu-bordeaux.fr/CHU-de-Bordeaux/H%C3%B4pitaux-et-sites-du-CHU/Groupe-hospitalier-Pellegrin/" },
      { label: "Newsweek World's Best Specialized Hospitals 2026: Oncology, rank 282 (CHU Bordeaux - Groupe hospitalier Pellegrin, Bordeaux)", url: NEWSWEEK_ONCOLOGY_2026 },
      { label: "CHU de Bordeaux: prise en charge du cancer", url: "https://www.chu-bordeaux.fr/Patient-proches/Prise-en-charge-du-cancer-au-CHU-de-Bordeaux-/" },
      { label: "CHU de Bordeaux: cancers treated, by organ", url: "https://www.chu-bordeaux.fr/Patient-proches/Prise-en-charge-du-cancer-au-CHU-de-Bordeaux-/Les-diff%C3%A9rents-cancers-pris-en-charge-(par-organes)-/" },
    ] }),

  i({ id: "hirslanden-beau-site-bern", name: "Hirslanden Klinik Beau-Site", aka: ["Klinik Beau-Site Bern", "Beau-Site Clinic Bern"],
    city: "Bern", country: "CH", lat: 46.953, lng: 7.449, institutionType: "hospital", website: "https://www.hirslanden.ch/de/klinik-beau-site/home.html", newsweekOncology2026: 288,
    tldr: "A Hirslanden group hospital in Bern, open to patients with basic as well as private insurance. It has oncology and haematology, urology and radiology services, and works with the Hirslanden breast centre for Bern and Biel.",
    summary: "Klinik Beau-Site is a Hirslanden hospital in Bern and, as a listed hospital (Listenspital), takes privately, semi-privately and generally insured patients. Its focus areas are the HerzZentrum Bern and the Berner Viszeral Chirurgie; its specialties include medical oncology, oncology and haematology, urology and radiology, and it describes a prostate care nurse who supports men with prostate cancer and the Hirslanden Brustzentrum Bern Biel caring for women with breast cancer. Hirslanden Bern also includes the Klinik Permanence and the Salem-Spital.\n\nNewsweek and Statista rank it 288th in World's Best Specialized Hospitals 2026: Oncology; the same list ranks Hirslanden Klinik St. Anna in Lucerne 264th and Klinik Hirslanden in Zurich 267th.",
    programs: ["Oncology and Haematology", "Prostate care nurse", "Hirslanden Brustzentrum Bern Biel"],
    institutions: ["hirslanden-st-anna-lucerne", "klinik-hirslanden-zurich"],
    links: [
      { label: "Hirslanden Klinik Beau-Site", url: "https://www.hirslanden.ch/de/klinik-beau-site/home.html" },
      { label: "Newsweek World's Best Specialized Hospitals 2026: Oncology, rank 288 (Hirslanden Klinik Beau-Site, Bern)", url: NEWSWEEK_ONCOLOGY_2026 },
      { label: "Klinik Beau-Site: Oncology and Haematology", url: "https://www.hirslanden.ch/de/klinik-beau-site/fachgebiete/onkologie-haematologie.html" },
      { label: "Klinik Beau-Site: centres and institutes", url: "https://www.hirslanden.ch/de/klinik-beau-site/centers.html" },
    ] }),

  i({ id: "hopital-saint-joseph-marseille", name: "Hôpital Saint-Joseph", aka: ["Hôpital Saint Joseph Marseille", "Saint Joseph Hospital, Marseille"],
    city: "Marseille", country: "FR", lat: 43.275, lng: 5.393, institutionType: "hospital", website: "https://www.hopital-saint-joseph.fr", newsweekOncology2026: 289,
    tldr: "A general hospital in Marseille founded by the priest Jean-Baptiste Fouque. Its medical oncology service gives chemotherapy in a day hospital and on the ward, with supportive care, and it also has thoracic oncology and skin cancer doctors.",
    summary: "The Hôpital Saint-Joseph in Marseille has cared for patients for nearly a century in the spirit of its founder, the abbé Jean-Baptiste Fouque. Its services include medical oncology (general oncology and onco-dermatology), a medical oncology day hospital, and a pulmonology service covering thoracic oncology. The oncology day hospital gives chemotherapy protocols that are always validated in multidisciplinary meetings (RCP), works with the digestive, thoracic, urological, gynaecological and breast, and ear, nose and throat specialties, and offers supportive care from physiotherapists, psychologists, social workers, pain specialists and dietitians; volunteers of the Ligue contre le Cancer are present in the service.\n\nNewsweek and Statista rank it 289th in World's Best Specialized Hospitals 2026: Oncology.",
    programs: ["Medical oncology and oncology day hospital", "Onco-dermatology", "Thoracic oncology"],
    institutions: ["ligue-contre-le-cancer"],
    links: [
      { label: "Hôpital Saint-Joseph", url: "https://www.hopital-saint-joseph.fr/" },
      { label: "Newsweek World's Best Specialized Hospitals 2026: Oncology, rank 289 (Hôpital Saint-Joseph, Marseille)", url: NEWSWEEK_ONCOLOGY_2026 },
      { label: "Hôpital Saint-Joseph: Qui sommes-nous ?", url: "https://www.hopital-saint-joseph.fr/professionnels-de-sante/qui-sommes-nous-" },
      { label: "Hôpital Saint-Joseph: Oncologie Médicale", url: "https://www.hopital-saint-joseph.fr/votre-hopital-votre-maternite-1/nos-services/oncologie-medicale-hopital-de-support" },
      { label: "Hôpital Saint-Joseph: Oncologie Médicale, Hôpital de Jour", url: "https://www.hopital-saint-joseph.fr/votre-hopital-votre-maternite-1/nos-services/oncologie-medicale-hopital-de-jour" },
    ] }),

  i({ id: "nuffield-cambridge-hospital", name: "Nuffield Health Cambridge Hospital", aka: ["Nuffield Health - Cambridge Hospital"],
    city: "Cambridge", country: "GB", lat: 52.19, lng: 0.124, institutionType: "hospital", website: "https://www.nuffieldhealth.com/cambridgehospital",
    newsweekOncology2026: 290,
    tldr: "A private hospital run by Nuffield Health on Trumpington Road in Cambridge, near Addenbrooke's Hospital. It offers cancer surgery, chemotherapy, hormone therapy and targeted drugs led by consultants, and arranges radiotherapy at another hospital.",
    summary: "Nuffield Health Cambridge Hospital is a private hospital on Trumpington Road, Cambridge, near Addenbrooke's Hospital, offering medical and surgical specialties that it lists as including cancer care and cancer surgery, orthopaedic and robotic surgery, neurosurgery, cardiology and paediatrics, with MRI and CT on site. Its cancer service is consultant led with the oncology team and may include surgery, chemotherapy, hormone therapy and biological or targeted therapy; radiotherapy, brachytherapy, bone marrow aspiration and high intensity focused ultrasound are arranged by the consultant at another hospital.\n\nNewsweek and Statista ranked it 290th in World's Best Specialized Hospitals 2026: Oncology.",
    links: [
      { label: "Nuffield Health Cambridge Hospital", url: "https://www.nuffieldhealth.com/cambridgehospital" },
      { label: "Newsweek World's Best Specialized Hospitals 2026: Oncology, rank 290 (Nuffield Health - Cambridge Hospital, Cambridge)", url: NEWSWEEK_ONCOLOGY_2026 },
      { label: "Nuffield Health Cambridge Hospital: Cancer care (oncology)", url: "https://www.nuffieldhealth.com/hospitals/cambridge/areas-of-speciality-at-cambridge-hospital/cancer-care-oncology" },
    ] }),
];
