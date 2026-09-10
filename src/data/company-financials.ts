/**
 * Financial snapshots for public companies in the corpus, one row per company and fiscal year.
 *
 * Rules: every figure is as reported in the company's own annual report, Form 10-K or Form 20-F for the
 * fiscal year shown, in the company's reporting currency, rounded to one decimal place in billions. Where a
 * company does not report an oncology aggregate the field is left empty rather than estimated. Product
 * sales are the company's recognised revenue for that product (for partnered products this is the
 * company's share or collaboration revenue, as noted). Sources point at the filing index or annual
 * report page; figures should be re-checked there before they are relied on.
 */
export type Currency = "USD" | "CHF" | "EUR" | "JPY" | "DKK";
export type ProductSales = { name: string; drugId?: string; sales: number; note?: string };
export type CompanyFinancials = {
  companyId: string;
  fiscalYear: string;
  currency: Currency;
  /** Oncology revenue as the company reports it, billions. Empty when no oncology aggregate is disclosed. */
  oncologyRevenue?: number;
  /** Total revenue, billions. */
  totalRevenue?: number;
  topProducts: ProductSales[];
  /** Research and development expense, billions (company total, all therapeutic areas). */
  rdSpend?: number;
  /** Cash, cash equivalents and marketable securities at year end, billions, as the company groups them. */
  cash?: number;
  source: { label: string; url: string };
  note?: string;
};

const edgar = (cik: string, form: "10-K" | "20-F" = "10-K") => `https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=${cik}&type=${form}&dateb=&owner=include&count=40`;

export const companyFinancials: CompanyFinancials[] = [
  { companyId: "merck", fiscalYear: "FY2024", currency: "USD", totalRevenue: 64.2, rdSpend: 17.9, cash: 13.2,
    topProducts: [{ name: "Keytruda", drugId: "pembrolizumab", sales: 29.5 }],
    source: { label: "Merck & Co. Form 10-K, FY2024 (SEC EDGAR)", url: edgar("0000310158") },
    note: "Merck does not report an oncology total; Keytruda alone was 46% of company sales. R&D includes charges for acquired in-process R&D." },
  { companyId: "astrazeneca", fiscalYear: "FY2024", currency: "USD", oncologyRevenue: 22.4, totalRevenue: 54.1, rdSpend: 13.6,
    topProducts: [{ name: "Tagrisso", drugId: "osimertinib", sales: 6.6 }, { name: "Imfinzi", drugId: "durvalumab", sales: 4.7 }, { name: "Enhertu", drugId: "trastuzumab-deruxtecan", sales: 3.8, note: "AstraZeneca-recognised total revenue from the Daiichi Sankyo collaboration" }, { name: "Calquence", drugId: "acalabrutinib", sales: 3.1 }, { name: "Lynparza", drugId: "olaparib", sales: 3.0 }],
    source: { label: "AstraZeneca Annual Report and Form 20-F 2024", url: "https://www.astrazeneca.com/investor-relations/annual-reports.html" },
    note: "Oncology is AstraZeneca's largest therapy area at about 41% of total revenue." },
  { companyId: "bms", fiscalYear: "FY2024", currency: "USD", totalRevenue: 48.3, rdSpend: 11.2, cash: 10.3,
    topProducts: [{ name: "Opdivo", drugId: "nivolumab", sales: 9.3 }, { name: "Revlimid", drugId: "lenalidomide", sales: 5.8 }, { name: "Pomalyst", drugId: "pomalidomide", sales: 3.5 }],
    source: { label: "Bristol Myers Squibb Form 10-K, FY2024 (SEC EDGAR)", url: edgar("0000014272") },
    note: "Cash is cash and cash equivalents only. Revlimid and Pomalyst are in generic erosion." },
  { companyId: "pfizer", fiscalYear: "FY2024", currency: "USD", totalRevenue: 63.6, rdSpend: 10.8,
    topProducts: [{ name: "Ibrance", drugId: "palbociclib", sales: 4.4 }, { name: "Xtandi", drugId: "enzalutamide", sales: 2.0, note: "alliance revenue, shared with Astellas" }, { name: "Padcev", drugId: "enfortumab-vedotin", sales: 1.6 }],
    source: { label: "Pfizer Form 10-K, FY2024 (SEC EDGAR)", url: edgar("0000078003") },
    note: "First full year including Seagen. Pfizer reports oncology as a business segment; the aggregate is not repeated here." },
  { companyId: "roche-genentech", fiscalYear: "FY2024", currency: "CHF", totalRevenue: 60.5, rdSpend: 13.0,
    topProducts: [{ name: "Tecentriq", drugId: "atezolizumab", sales: 3.5 }, { name: "Polivy", drugId: "polatuzumab-vedotin", sales: 1.1 }],
    source: { label: "Roche Annual Report 2024 (Finance Report)", url: "https://www.roche.com/investors/annual-reports" },
    note: "Group figures including Diagnostics. Roche reports oncology sales within Pharmaceuticals; the therapy-area total is not repeated here." },
  { companyId: "novartis", fiscalYear: "FY2024", currency: "USD", totalRevenue: 50.3, rdSpend: 10.0,
    topProducts: [{ name: "Kisqali", drugId: "ribociclib", sales: 3.0 }, { name: "Pluvicto", drugId: "pluvicto", sales: 1.4 }, { name: "Scemblix", drugId: "asciminib", sales: 0.8 }, { name: "Lutathera", drugId: "lutathera", sales: 0.7 }],
    source: { label: "Novartis Annual Report 2024 and Form 20-F", url: "https://www.novartis.com/investors/financial-data/annual-results" } },
  { companyId: "gilead", fiscalYear: "FY2024", currency: "USD", oncologyRevenue: 3.3, totalRevenue: 28.8, rdSpend: 5.9, cash: 10.0,
    topProducts: [{ name: "Yescarta", drugId: "axicabtagene-ciloleucel", sales: 1.6 }, { name: "Trodelvy", drugId: "sacituzumab-govitecan", sales: 1.3 }],
    source: { label: "Gilead Sciences Form 10-K, FY2024 (SEC EDGAR)", url: edgar("0000882095") },
    note: "Oncology as Gilead reports it: Trodelvy plus Cell Therapy (Yescarta and Tecartus). Cash includes marketable securities." },
  { companyId: "abbvie", fiscalYear: "FY2024", currency: "USD", oncologyRevenue: 6.6, totalRevenue: 56.3, rdSpend: 12.8, cash: 5.5,
    topProducts: [{ name: "Imbruvica", drugId: "ibrutinib", sales: 3.3, note: "AbbVie share; partnered with Johnson & Johnson" }, { name: "Venclexta", drugId: "venetoclax", sales: 2.6 }, { name: "Elahere", drugId: "mirvetuximab-soravtansine", sales: 0.5 }],
    source: { label: "AbbVie Form 10-K, FY2024 (SEC EDGAR)", url: edgar("0001551152") },
    note: "First year including ImmunoGen (Elahere). R&D excludes acquired in-process R&D and milestones." },
  { companyId: "johnson-johnson", fiscalYear: "FY2024", currency: "USD", totalRevenue: 88.8, rdSpend: 17.2,
    topProducts: [{ name: "Darzalex", drugId: "daratumumab", sales: 11.7 }, { name: "Erleada", drugId: "apalutamide", sales: 3.0 }, { name: "Imbruvica", drugId: "ibrutinib", sales: 2.9, note: "J&J share; partnered with AbbVie" }, { name: "Carvykti", drugId: "ciltacabtagene-autoleucel", sales: 1.0 }],
    source: { label: "Johnson & Johnson Form 10-K, FY2024 (SEC EDGAR)", url: edgar("0000200406") },
    note: "Company totals include MedTech. J&J reports an Oncology franchise within Innovative Medicine; the aggregate is not repeated here." },
  { companyId: "eli-lilly", fiscalYear: "FY2024", currency: "USD", totalRevenue: 45.0, rdSpend: 11.0,
    topProducts: [{ name: "Verzenio", drugId: "abemaciclib", sales: 5.3 }, { name: "Jaypirca", drugId: "pirtobrutinib", sales: 0.4 }],
    source: { label: "Eli Lilly Form 10-K, FY2024 (SEC EDGAR)", url: edgar("0000059478") },
    note: "Oncology is a small share of Lilly's revenue, which is dominated by diabetes and obesity medicines." },
  { companyId: "amgen", fiscalYear: "FY2024", currency: "USD", totalRevenue: 33.4, rdSpend: 6.0,
    topProducts: [{ name: "Kyprolis", drugId: "carfilzomib", sales: 1.4 }, { name: "Blincyto", drugId: "blinatumomab", sales: 1.2 }],
    source: { label: "Amgen Form 10-K, FY2024 (SEC EDGAR)", url: edgar("0000318154") } },
  { companyId: "regeneron", fiscalYear: "FY2024", currency: "USD", totalRevenue: 14.2, rdSpend: 5.1,
    topProducts: [{ name: "Libtayo", drugId: "cemiplimab", sales: 1.2 }],
    source: { label: "Regeneron Form 10-K, FY2024 (SEC EDGAR)", url: edgar("0000872589") } },
  { companyId: "beone", fiscalYear: "FY2024", currency: "USD", totalRevenue: 3.8, rdSpend: 2.0, cash: 2.6,
    topProducts: [{ name: "Brukinsa", drugId: "zanubrutinib", sales: 2.6 }],
    source: { label: "BeiGene (now BeOne Medicines) Form 10-K, FY2024 (SEC EDGAR)", url: edgar("0001651308") },
    note: "Essentially all revenue is oncology. Cash is cash, cash equivalents and restricted cash." },
  { companyId: "incyte", fiscalYear: "FY2024", currency: "USD", totalRevenue: 4.2, rdSpend: 2.6, cash: 2.2,
    topProducts: [{ name: "Jakafi", drugId: "ruxolitinib", sales: 2.8 }],
    source: { label: "Incyte Form 10-K, FY2024 (SEC EDGAR)", url: edgar("0000879169") } },
  { companyId: "exelixis", fiscalYear: "FY2024", currency: "USD", totalRevenue: 2.2, rdSpend: 0.9, cash: 1.7,
    topProducts: [{ name: "Cabometyx and Cometriq (US)", drugId: "cabozantinib", sales: 1.8 }],
    source: { label: "Exelixis Form 10-K, FY2024 (SEC EDGAR)", url: edgar("0000939767") },
    note: "Cash includes short- and long-term investments." },
  { companyId: "revolution-medicines", fiscalYear: "FY2024", currency: "USD", rdSpend: 0.7, cash: 2.3,
    topProducts: [],
    source: { label: "Revolution Medicines Form 10-K, FY2024 (SEC EDGAR)", url: edgar("0001628171") },
    note: "Pre-commercial; cash includes marketable securities." },
  { companyId: "immunocore", fiscalYear: "FY2024", currency: "USD", totalRevenue: 0.3,
    topProducts: [{ name: "Kimmtrak", drugId: "tebentafusp", sales: 0.3 }],
    source: { label: "Immunocore Form 10-K, FY2024 (SEC EDGAR)", url: edgar("0001671927") } },
];

export const financialsFor = (companyId: string) => companyFinancials.filter((f) => f.companyId === companyId);

export const CURRENCY_SYMBOL: Record<Currency, string> = { USD: "$", CHF: "CHF ", EUR: "€", JPY: "¥", DKK: "DKK " };
export const fmtBn = (n: number | undefined, c: Currency) => (n === undefined ? "" : `${CURRENCY_SYMBOL[c]}${n.toFixed(1)}bn`);
