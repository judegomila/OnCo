import type { EntityInput, InstitutionInput } from "@/lib/schema";

/**
 * Indonesia: the public bodies behind /countries/id/ that the corpus did not hold. Every record was written from
 * Indonesian primary sources read raw in Indonesian (pdftotext of the PDF, or the page's own HTML): the Ministry of
 * Health's Rencana Kanker Nasional 2024-2034 (updated edition, December 2024), BPOM's own press releases, the
 * Ministry's health technology assessment announcements and the national social security council's note on
 * Presidential Regulation 59 of 2024. Coordinates of the ministry, BPOM and Cipto Mangunkusumo hospital were read
 * from OpenStreetMap's Nominatim for the named building; BPJS Kesehatan's is a central Jakarta point, not its office.
 *
 * Inbound links: each record here is linked from at least one other record in this file (the ministry names the
 * payer, the regulator and the registry; the registry names the ministry and the hospitals that run it), so none
 * is reachable only from the country page.
 */
const asOf = "2026-11-04";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });

const RKN = "https://repository.badankebijakan.kemkes.go.id/id/eprint/5958/1/Rencana%20Kanker%20Nasional%202024-2034_V71.pdf";
const RKN_LABEL = "Kementerian Kesehatan: Rencana Kanker Nasional 2024-2034, updated edition (PDF)";

export const recordsID: EntityInput[] = [
  i({ id: "kemenkes-indonesia", name: "Ministry of Health of Indonesia (Kementerian Kesehatan)", aka: ["Kemenkes", "Kementerian Kesehatan Republik Indonesia", "Indonesian Ministry of Health"],
    city: "Jakarta", country: "ID", lat: -6.2302, lng: 106.8326, institutionType: "government", website: "https://kemkes.go.id",
    tldr: "Indonesia's health ministry. It wrote the national cancer plan for 2024 to 2034, decides which medicines go on the national formulary that the public insurance scheme pays for, and runs the free health check programme that includes breast and cervical screening.",
    summary: "The Ministry of Health launched the Rencana Pencegahan dan Pengendalian Kanker Nasional 2024-2034, Indonesia's national cancer prevention and control plan, at the Indonesia International Cancer Conference in Bali on 3 October 2024. The plan concentrates on six cancers (breast, cervix, lung, colorectal, liver and cancers in children under 18) and sets out six strategies: promotion and prevention, screening and early detection, access to diagnosis and treatment through to palliative care, cancer registration and research, partnerships, and governance.\n\nThe ministry sets the Formularium Nasional, the list of medicines that the Jaminan Kesehatan Nasional (JKN) scheme run by BPJS Kesehatan pays for; the plan cites Keputusan Menteri Kesehatan HK.01.07/MENKES/2197/2023 as the current formulary. Its health technology assessment process (Penilaian Teknologi Kesehatan) advises on what enters the JKN benefit package; the plan lists completed cancer assessments including trastuzumab for early and metastatic breast cancer, bevacizumab for metastatic colorectal cancer, rituximab for non-Hodgkin lymphoma and pembrolizumab for metastatic non-small cell lung cancer.\n\nIt designates hospitals into a tiered cancer referral network (madya, utama and paripurna strata, under Keputusan Menteri Kesehatan HK.01.07/MENKES/1277/2024) and names RS Kanker Dharmais as the national cancer centre and the national cancer data centre for the cancer registry.",
    programs: ["Rencana Kanker Nasional 2024-2034", "Formularium Nasional", "Penilaian Teknologi Kesehatan (health technology assessment)", "Cek Kesehatan Gratis (free health checks)", "Cancer referral network (pengampuan)", "HPV DNA cervical screening"],
    cancers: ["breast-hr-positive", "cervical", "colorectal", "hcc"], technologies: ["hpv-vaccine", "hpv-testing", "via-cervical-screening"],
    institutions: ["bpjs-kesehatan", "bpom-indonesia", "indonesia-cancer-registry", "dharmais-cancer-hospital", "rscm-jakarta"],
    links: [
      { label: RKN_LABEL, url: RKN },
      { label: "Kemenkes: Indonesia Luncurkan Rencana Nasional untuk Penanganan Kanker (3 October 2024)", url: "https://kemkes.go.id/id/indonesia-luncurkan-rencana-nasional-untuk-penanganan-kanker" },
      { label: "BKPK Kemenkes: usulan topik HTA reguler tahun 2026 (4 May 2026)", url: "https://www.badankebijakan.kemkes.go.id/kemenkes-buka-akses-pengajuan-usulan-topik-hta-reguler-tahun-2026/" },
    ] }),

  i({ id: "bpjs-kesehatan", name: "BPJS Kesehatan (Indonesia's national health insurance agency)", aka: ["BPJS Kesehatan", "Badan Penyelenggara Jaminan Sosial Kesehatan", "Jaminan Kesehatan Nasional", "JKN"],
    city: "Jakarta", country: "ID", lat: -6.2, lng: 106.85, institutionType: "government", website: "https://www.bpjs-kesehatan.go.id",
    tldr: "The public body that runs Indonesia's national health insurance scheme, which had about 285 million members in 2026 and pays for cancer treatment on the national formulary, including cervical, breast, lung and bowel cancer screening.",
    summary: "BPJS Kesehatan runs the Jaminan Kesehatan Nasional (JKN), Indonesia's single national health insurance scheme. Its president director, Prihati Pujowaskito, said in October 2026 that 284.72 million people were registered, 98.14 per cent of the population, against a 2026 national plan target of 98.7 per cent; in April 2026 he put the share of members whose cover was active at 81.5 per cent.\n\nThe national cancer plan reports that BPJS Kesehatan spent 3.1 trillion rupiah on cancer treatment in 2020 and 5.9 trillion in 2023, making cancer its second largest cost after heart disease, and that about 70 per cent of patients start treatment at an advanced stage. The plan also states that the JKN benefit package does not yet cover many targeted and immunotherapy medicines recommended in Indonesian clinical guidelines, and cites a study at Cipto Mangunkusumo hospital in which 79 per cent of patients receiving radiotherapy under JKN reported financial toxicity; the plan calls it a limited study.\n\nPresidential Regulation 59 of 2024 added fourteen screening services to the JKN benefit, among them screening for cervical, breast, bowel and lung cancer, and introduced a standard inpatient class (Kelas Rawat Inap Standar).\n\nThe coordinates on this record are a central Jakarta point, not the address of the head office.",
    programs: ["Jaminan Kesehatan Nasional (JKN)", "Screening benefits under Presidential Regulation 59 of 2024", "Kelas Rawat Inap Standar (standard inpatient class)"],
    cancers: ["breast-hr-positive", "cervical", "colorectal"], institutions: ["kemenkes-indonesia", "rscm-jakarta"],
    links: [
      { label: "Metro TV News: Peserta JKN Tembus 284,72 Juta Jiwa (31 October 2026)", url: "https://www.metrotvnews.com/read/kewCWRyW-peserta-jkn-tembus-284-72-juta-jiwa-cakupannya-capai-98-14" },
      { label: "DJSN: siaran pers Perpres 59 Tahun 2024 (PDF)", url: "https://djsn.go.id/files/dokumen/Keputusan/202406041238Press%20Release%20DJSN%20terkait%20Perpres%2059%202024.pdf" },
      { label: RKN_LABEL, url: RKN },
    ] }),

  i({ id: "bpom-indonesia", name: "BPOM (Indonesian Food and Drug Authority)", aka: ["BPOM", "Badan Pengawas Obat dan Makanan", "Indonesian FDA", "Badan POM"],
    city: "Jakarta", country: "ID", lat: -6.1884, lng: 106.8596, institutionType: "government", website: "https://www.pom.go.id",
    tldr: "Indonesia's medicines regulator. It licenses every medicine sold in the country, and since 2025 can approve a medicine in 90 working days by relying on the assessment of a reference regulator such as the European or United States agency.",
    summary: "BPOM grants the marketing authorisation (nomor izin edar) a medicine needs before it can be sold in Indonesia, under Peraturan Kepala BPOM 24 of 2017 on drug registration, amended for the fifth time by Peraturan BPOM 23 of 2025. In a press release of 31 December 2025 BPOM said the amendment introduced a reliance mechanism that shortens the evaluation of a medicine from 120 to 90 working days by drawing on the assessment of an established reference regulator. In April 2026 it listed the reference regulators as those of Europe, the United States, Australia, Canada, the United Kingdom, Japan and Switzerland, gave 50 working days for new medicines developed by companies investing in Indonesia and 100 working days for life-saving and orphan medicines, and said the share of accelerated authorisations had risen from 70.6 per cent in 2024 to 87.5 per cent in 2026.\n\nBPOM reported 12,111 medicine authorisations from 2023 to the end of 2025, 86.26 per cent of them for domestically made products. The national cancer plan notes that many essential and innovative cancer medicines are not registered in Indonesia and are obtained through a special access scheme.",
    programs: ["Drug registration (Peraturan Kepala BPOM 24 of 2017, fifth amendment 2025)", "Reliance pathway (90 working days)", "100 working day pathway for life-saving and orphan medicines", "Special access scheme for unregistered medicines"],
    institutions: ["kemenkes-indonesia"],
    links: [
      { label: "BPOM: BPOM Percepat Registrasi Obat di 2025 (31 December 2025)", url: "https://www.pom.go.id/siaran-pers/bpom-percepat-registrasi-obat-di-2025-perluas-akses-masyarakat-terhadap-obat-aman-dan-terjangkau" },
      { label: "BPOM: Strategi Kepala BPOM ... akses dan tata kelola obat (21 April 2026)", url: "https://www.pom.go.id/berita/strategi-kepala-bpom-kawal-makan-bergizi-gratis-dan-tingkatkan-akses-dan-tata-kelola-obat-sampai-apotek-desa" },
      { label: RKN_LABEL, url: RKN },
    ] }),

  i({ id: "indonesia-cancer-registry", name: "Indonesian National Cancer Registry (Registrasi Kanker Nasional)", aka: ["Registrasi Kanker Nasional", "Pusat Data Kanker Nasional", "Indonesian population-based cancer registry", "PBCR Indonesia"],
    city: "Jakarta", country: "ID", lat: -6.187, lng: 106.792, institutionType: "consortium",
    tldr: "Indonesia's cancer registration network, run from Dharmais National Cancer Centre with fourteen hospitals. It records cancers in 26 districts and cities covering about 14 per cent of the population, and its data have not yet met the quality standard of the International Agency for Research on Cancer's world registry volumes.",
    summary: "Indonesia's national cancer plan describes cancer registration that began with pathology records at Universitas Diponegoro in 1970, then a hospital registry at RS Kanker Dharmais from 1996. A population-based registry was first piloted in Jakarta for cancers diagnosed in 2005 to 2007, covering 57 hospitals and 345 community health centres, and submitted to IARC for Cancer Incidence in Five Continents Volume X; the plan says the evaluation found coverage too low and data quality below standard.\n\nThe Ministry of Health then set 26 districts and cities, about 14 per cent of the population, as the registry's coverage for cases from 2008 to 2012, with RS Kanker Dharmais as the national cancer data centre and fourteen hospitals from Medan to Jayapura collecting data. Submissions for 2008 to 2012 (Volume XI) and 2013 to 2017 (Volume XII) did not meet IARC's quality criteria and were not published. The plan names gaps in data transfer between the fourteen hospitals and district hospitals, passive reporting from private hospitals and laboratories, and staff turnover.\n\nThe plan sets eighteen priority districts and cities, names the city of Yogyakarta as having the most complete data and the first priority for reporting to Volume XIII, and plans to move registration onto the ministry's SATUSEHAT data platform. A separate paediatric registry, IP-CAR, recorded about 2,000 new childhood cancers in 2022 to 2023 against an estimated 10,000 a year.\n\nThe coordinates on this record are those of RS Kanker Dharmais, which hosts the data centre.",
    programs: ["Population-based registration in 26 districts and cities (14 provinces)", "Hospital-based registration in fourteen hospitals", "Integration with SATUSEHAT", "Indonesian Paediatric Cancer Registry (IP-CAR)"],
    cancers: ["breast-hr-positive", "cervical", "colorectal", "nasopharyngeal"], technologies: ["cancer-registries-surveillance"],
    institutions: ["dharmais-cancer-hospital", "kemenkes-indonesia", "rscm-jakarta", "iarc"],
    links: [
      { label: `${RKN_LABEL}, pages 79 to 86`, url: RKN },
    ] }),

  i({ id: "rscm-jakarta", name: "Dr. Cipto Mangunkusumo National Central General Hospital (RSCM)", aka: ["RSCM", "RSUPN dr. Cipto Mangunkusumo", "Cipto Mangunkusumo Hospital"],
    city: "Jakarta", country: "ID", lat: -6.1973, lng: 106.8467, institutionType: "hospital", website: "https://www.rscm.co.id", university: "Universitas Indonesia",
    tldr: "A national referral hospital in Jakarta for care, teaching and research, which works with Universitas Indonesia. It collects cancer registry data for all five Jakarta municipalities and hosts academic cancer trials.",
    summary: "Cipto Mangunkusumo (RSUP Nasional Dr. Cipto Mangunkusumo) is a national central general hospital in central Jakarta; its own website describes it as a national referral hospital for care, education and research. The national cancer plan names it, with Universitas Indonesia, as a site of specialist medical physics training. In the national cancer plan it is one of the fourteen hospitals that collect data for the Indonesian cancer registry, covering the five municipalities of Jakarta, and was a regional coordinating hospital for central Jakarta in the 2008 to 2010 registry pilot.\n\nThe plan cites a limited study of patients receiving radiotherapy at the national referral hospital, published through Universitas Indonesia in 2024, in which 79 per cent reported financial toxicity in meeting daily household needs despite JKN cover (38 per cent mild, 39 per cent moderate, 2 per cent severe). On ClinicalTrials.gov it is the site of a phase 2 trial of simvastatin in breast cancer sponsored by Universitas Indonesia (NCT05550415).",
    programs: ["Indonesian cancer registry data collection for Jakarta", "Radiotherapy", "Medical physics specialist training with Universitas Indonesia"],
    institutions: ["indonesia-cancer-registry", "kemenkes-indonesia"], trials: ["nct05550415"],
    links: [
      { label: `${RKN_LABEL}, pages 8, 34 and 80 to 82`, url: RKN },
      { label: "RSCM: Tentang RSCM (hospital website)", url: "https://www.rscm.co.id/" },
      { label: "ClinicalTrials.gov NCT05550415", url: "https://clinicaltrials.gov/study/NCT05550415" },
    ] }),
];
