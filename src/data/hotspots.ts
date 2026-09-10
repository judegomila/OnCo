/**
 * Mutation hotspot maps for the targets where the exact residue decides which drug works.
 *
 * One record per target: protein length (UniProt canonical isoform), named domains with residue boundaries, and the
 * hotspot residues or regions with what they do, how common they are where a sourced figure exists, and the products
 * in the corpus that address (or are defeated by) each one. `drugs` are drug ids; `refs` may add trials, papers,
 * ideas or terms. Frequencies are quoted from the source named on the row or on the record; rows without a figure
 * have none we could source, not zero. Domain boundaries follow UniProt/InterPro annotations and are approximate.
 *
 * Rendered by src/components/HotspotPlot.tsx on target dossiers.
 */
export type HotspotKind = "activating" | "resistance" | "loss-of-function" | "other";
export type Hotspot = {
  /** Display label, e.g. "G12C", "Exon 19 deletions", "ITD". */
  label: string;
  /** Residue position (midpoint for a region), in the numbering of the canonical isoform given on the record. */
  position: number;
  /** Optional end position for a region (insertions, deletions, ITD). */
  end?: number;
  kind: HotspotKind;
  frequency?: string;
  note: string;
  /** Products in the corpus that address this residue (or, for resistance mutations, still work against it). */
  drugs: string[];
  /** Products in the corpus that this residue defeats. */
  defeats?: string[];
  refs?: string[];
  source?: { label: string; url: string };
};
export type ProteinDomain = { name: string; start: number; end: number };
export type HotspotMap = {
  targetId: string;
  gene: string;
  uniprot: string;
  length: number;
  isoformNote?: string;
  domains: ProteinDomain[];
  hotspots: Hotspot[];
  sources: Array<{ label: string; url: string }>;
};

const doi = (d: string, label: string) => ({ label, url: `https://doi.org/${d}` });
const cosmic = (gene: string) => ({ label: `COSMIC: ${gene}`, url: `https://cancer.sanger.ac.uk/cosmic/gene/analysis?ln=${gene}` });
const hotspotsOrg = { label: "Cancer Hotspots (MSK)", url: "https://www.cancerhotspots.org/" };

export const hotspots: HotspotMap[] = [
  {
    targetId: "kras", gene: "KRAS", uniprot: "P01116", length: 189, isoformNote: "Isoform 4A numbering (189 aa); KRAS4B is 188 aa and shares the numbering of every hotspot below.",
    domains: [
      { name: "P-loop (G1)", start: 10, end: 17 },
      { name: "Switch I", start: 30, end: 38 },
      { name: "Switch II", start: 59, end: 76 },
      { name: "G4 / G5 nucleotide contacts", start: 116, end: 147 },
      { name: "Hypervariable region", start: 166, end: 189 },
    ],
    hotspots: [
      { label: "G12C", position: 12, kind: "activating", frequency: "About 13% of lung adenocarcinomas and 1 to 3% of other solid tumours", note: "Cysteine at codon 12 is what the covalent inhibitors bond to; the first druggable RAS allele.", drugs: ["sotorasib", "adagrasib", "divarasib", "olomorasib", "elironrasib", "daraxonrasib"], refs: ["codebreak-200", "krystal-12", "krascendo-1"], source: doi("10.1056/NEJMoa2103695", "CodeBreaK 100, NEJM 2021") },
      { label: "G12D", position: 12, kind: "activating", frequency: "The most common KRAS allele in pancreatic cancer", note: "No cysteine, so the covalent G12C chemistry does not apply; non-covalent G12D-selective and pan-RAS(ON) inhibitors followed.", drugs: ["mrtx1133", "zoldonrasib", "daraxonrasib", "eli-002-7p"], refs: ["rasolute-302"], source: cosmic("KRAS") },
      { label: "G12V", position: 12, kind: "activating", frequency: "Second most common allele in pancreatic and colorectal cancer", note: "Addressed only by pan-RAS(ON) inhibitors and mutant-KRAS vaccines so far.", drugs: ["daraxonrasib", "eli-002-7p"], source: cosmic("KRAS") },
      { label: "G12R", position: 12, kind: "activating", note: "Largely pancreatic; biochemically distinct (weak PI3K coupling).", drugs: ["daraxonrasib", "eli-002-7p"], source: cosmic("KRAS") },
      { label: "G13D", position: 13, kind: "activating", note: "Colorectal-enriched; retains some sensitivity to anti-EGFR antibodies in retrospective series, unlike codon 12 alleles.", drugs: ["daraxonrasib", "eli-002-7p"], source: cosmic("KRAS") },
      { label: "Q61H/K/L/R", position: 61, kind: "activating", note: "Switch II; abolishes intrinsic GTP hydrolysis. Rare in KRAS (common in NRAS).", drugs: ["daraxonrasib"], source: cosmic("KRAS") },
      { label: "Y96D / R68S / H95Q", position: 96, kind: "resistance", note: "Acquired switch-II pocket mutations after sotorasib or adagrasib; pan-RAS(ON) tri-complex inhibitors bind a different surface.", drugs: ["daraxonrasib"], defeats: ["sotorasib", "adagrasib"], source: doi("10.1056/NEJMoa2105281", "Awad et al., NEJM 2021") },
    ],
    sources: [hotspotsOrg, cosmic("KRAS"), doi("10.1038/nature12796", "Ostrem et al., Nature 2013 (G12C pocket)")],
  },
  {
    targetId: "egfr", gene: "EGFR", uniprot: "P00533", length: 1210, isoformNote: "Precursor numbering including the 24-residue signal peptide, the convention used for L858R and T790M.",
    domains: [
      { name: "Signal peptide", start: 1, end: 24 },
      { name: "Extracellular domains I to IV", start: 25, end: 645 },
      { name: "Transmembrane", start: 646, end: 668 },
      { name: "Juxtamembrane", start: 669, end: 711 },
      { name: "Kinase domain", start: 712, end: 979 },
      { name: "C-terminal tail", start: 980, end: 1210 },
    ],
    hotspots: [
      { label: "Exon 19 deletions", position: 746, end: 753, kind: "activating", frequency: "About 45% of EGFR-mutant NSCLC", note: "In-frame deletions around E746 to A750 in the kinase beta-3/alpha-C loop; the best responders to every generation of TKI.", drugs: ["osimertinib", "lazertinib", "amivantamab", "erlotinib", "gefitinib", "afatinib", "dacomitinib"], refs: ["flaura2", "mariposa", "adaura", "laura"], source: doi("10.1056/NEJMoa1713137", "FLAURA, NEJM 2018") },
      { label: "L858R", position: 858, kind: "activating", frequency: "About 40% of EGFR-mutant NSCLC", note: "Activation-loop substitution; somewhat shorter PFS than exon 19 deletions on every TKI.", drugs: ["osimertinib", "lazertinib", "amivantamab", "erlotinib", "gefitinib", "afatinib", "dacomitinib"], refs: ["flaura2", "mariposa"], source: doi("10.1056/NEJMoa1713137", "FLAURA, NEJM 2018") },
      { label: "G719X / S768I / L861Q", position: 719, kind: "activating", frequency: "About 10% of EGFR mutations (uncommon alleles)", note: "Exon 18, 20 and 21 point mutations; afatinib carries a label for them and osimertinib is active.", drugs: ["afatinib", "osimertinib"], source: cosmic("EGFR") },
      { label: "Exon 20 insertions", position: 762, end: 774, kind: "activating", frequency: "About 4 to 10% of EGFR mutations", note: "Insertions after the alpha-C helix that push the drug pocket shut for first- and third-generation TKIs.", drugs: ["amivantamab", "sunvozertinib"], defeats: ["osimertinib", "erlotinib", "gefitinib"], refs: ["mobocertinib"], source: doi("10.1038/s41571-018-0081-y", "Vyse and Huang, Nat Rev Clin Oncol 2019") },
      { label: "T790M", position: 790, kind: "resistance", frequency: "About 50 to 60% of progression on first- and second-generation TKIs", note: "Gatekeeper methionine restores ATP affinity; osimertinib was designed for it.", drugs: ["osimertinib", "lazertinib", "amivantamab"], defeats: ["erlotinib", "gefitinib", "afatinib", "dacomitinib"], source: doi("10.1158/1078-0432.CCR-12-2246", "Yu et al., Clin Cancer Res 2013") },
      { label: "C797S", position: 797, kind: "resistance", frequency: "About 7 to 15% after first-line osimertinib", note: "Loses the cysteine osimertinib bonds to. Fourth-generation allosteric inhibitors are in trials; ADCs against EGFR, HER3 or TROP2 work regardless of genotype.", drugs: ["amivantamab", "izalontamab-brengitecan", "patritumab-deruxtecan", "datopotamab-deruxtecan"], defeats: ["osimertinib", "lazertinib"], refs: ["flaura2"], source: doi("10.1056/NEJMoa2306434", "FLAURA2, NEJM 2023") },
    ],
    sources: [hotspotsOrg, cosmic("EGFR")],
  },
  {
    targetId: "braf", gene: "BRAF", uniprot: "P15056", length: 766,
    domains: [
      { name: "RAS-binding domain", start: 155, end: 227 },
      { name: "Cysteine-rich domain", start: 234, end: 280 },
      { name: "Kinase domain", start: 457, end: 717 },
    ],
    hotspots: [
      { label: "V600E", position: 600, kind: "activating", frequency: "About half of cutaneous melanomas; 8 to 12% of colorectal cancers; nearly all hairy cell leukaemias", note: "Class I: signals as a RAS-independent monomer, so type I.5 RAF inhibitors work. Colorectal disease needs EGFR co-blockade.", drugs: ["dabrafenib-trametinib", "encorafenib", "vemurafenib", "binimetinib", "cobimetinib", "tovorafenib"], refs: ["combi-ad", "columbus", "breakwater", "dreamseq"], source: doi("10.1038/nature00766", "Davies et al., Nature 2002") },
      { label: "V600K", position: 600, kind: "activating", frequency: "About 10 to 20% of BRAF V600 melanoma", note: "Second class I allele; same drugs, somewhat lower response rates in some series.", drugs: ["dabrafenib-trametinib", "encorafenib", "vemurafenib"], source: cosmic("BRAF") },
      { label: "Class II (K601E, G469A/V, L597, fusions)", position: 469, kind: "activating", note: "RAS-independent dimers; first-generation RAF inhibitors are ineffective or paradoxically activating. Type II (pan-RAF) inhibitors and MEK inhibitors are the route; tovorafenib is approved for BRAF-fusion paediatric low-grade glioma.", drugs: ["tovorafenib"], defeats: ["vemurafenib", "dabrafenib-trametinib", "encorafenib"], source: doi("10.1038/nature23291", "Yao et al., Nature 2017 (RAF classes)") },
      { label: "Class III (D594, G466, N581)", position: 594, kind: "other", note: "Kinase-impaired alleles that amplify upstream RAS signalling through CRAF; treated by targeting the upstream receptor, not BRAF.", drugs: [], source: doi("10.1038/nature23291", "Yao et al., Nature 2017 (RAF classes)") },
    ],
    sources: [hotspotsOrg, cosmic("BRAF")],
  },
  {
    targetId: "pik3ca", gene: "PIK3CA", uniprot: "P42336", length: 1068,
    domains: [
      { name: "Adaptor-binding domain", start: 16, end: 105 },
      { name: "RAS-binding domain", start: 187, end: 289 },
      { name: "C2 domain", start: 330, end: 487 },
      { name: "Helical domain", start: 517, end: 694 },
      { name: "Kinase domain", start: 797, end: 1068 },
    ],
    hotspots: [
      { label: "E542K / E545K", position: 545, kind: "activating", frequency: "Helical hotspots; with H1047R they account for about 80% of PIK3CA mutations", note: "Relieve inhibition by the p85 regulatory subunit. Drug response is similar across hotspots with alpelisib and inavolisib; mutant-selective inhibitors that spare wild-type p110alpha are in trials.", drugs: ["alpelisib", "inavolisib", "capivasertib"], refs: ["solar-1", "inavo120", "capitello-291"], source: doi("10.1126/science.1096502", "Samuels et al., Science 2004") },
      { label: "H1047R / H1047L", position: 1047, kind: "activating", frequency: "The single most common PIK3CA allele", note: "Kinase-domain hotspot that increases membrane association; the allele most mutant-selective programmes target first.", drugs: ["alpelisib", "inavolisib", "capivasertib"], refs: ["solar-1", "inavo120"], source: doi("10.1126/science.1096502", "Samuels et al., Science 2004") },
    ],
    sources: [hotspotsOrg, cosmic("PIK3CA")],
  },
  {
    targetId: "her2", gene: "ERBB2", uniprot: "P04626", length: 1255,
    domains: [
      { name: "Extracellular domains I to IV", start: 23, end: 652 },
      { name: "Transmembrane", start: 653, end: 675 },
      { name: "Kinase domain", start: 720, end: 987 },
      { name: "C-terminal tail", start: 988, end: 1255 },
    ],
    hotspots: [
      { label: "Exon 20 insertions (A775_G776insYVMA)", position: 776, end: 781, kind: "activating", frequency: "About 2 to 4% of non-squamous NSCLC carries a HER2 mutation, mostly exon 20 insertions", note: "Not amplification: HER2 IHC is often low. Trastuzumab deruxtecan and the mutant-selective TKIs zongertinib and sevabertinib are the approved routes.", drugs: ["trastuzumab-deruxtecan", "zongertinib", "sevabertinib", "pyrotinib"], refs: ["soho-01"], source: doi("10.1056/NEJMoa2112431", "DESTINY-Lung01, NEJM 2022") },
      { label: "S310F / S310Y", position: 310, kind: "activating", note: "Extracellular domain II; the most common HER2 point mutation across tumour types, sensitive to HER2 TKIs in basket trials.", drugs: ["neratinib", "zongertinib", "trastuzumab-deruxtecan"], source: hotspotsOrg },
      { label: "L755S / V777L / D769H", position: 755, kind: "activating", note: "Kinase-domain alleles enriched in HR-positive lobular breast cancer after endocrine therapy; L755S resists lapatinib but not irreversible TKIs.", drugs: ["neratinib", "tucatinib", "trastuzumab-deruxtecan"], defeats: ["lapatinib"], source: doi("10.1038/nature25475", "SUMMIT, Nature 2018") },
    ],
    sources: [hotspotsOrg, cosmic("ERBB2")],
  },
  {
    targetId: "alk", gene: "ALK", uniprot: "Q9UM73", length: 1620,
    domains: [
      { name: "Extracellular region", start: 19, end: 1038 },
      { name: "Transmembrane", start: 1039, end: 1059 },
      { name: "Kinase domain", start: 1116, end: 1392 },
    ],
    hotspots: [
      { label: "F1174L / R1275Q", position: 1174, kind: "activating", note: "Point mutations in neuroblastoma (rather than the fusions seen in lung cancer). F1174L is relatively crizotinib-resistant; lorlatinib is being tested up front.", drugs: ["lorlatinib", "crizotinib"], refs: ["anbl1531"], source: doi("10.1038/nature07397", "Mossé et al., Nature 2008") },
      { label: "L1196M", position: 1196, kind: "resistance", note: "Gatekeeper; the classic crizotinib escape, covered by every later-generation inhibitor.", drugs: ["alectinib", "brigatinib", "ceritinib", "lorlatinib", "ensartinib"], defeats: ["crizotinib"], source: doi("10.1158/2159-8290.CD-16-0596", "Gainor et al., Cancer Discov 2016") },
      { label: "G1202R", position: 1202, kind: "resistance", frequency: "About 40% of biopsies at progression on second-generation ALK TKIs", note: "Solvent-front mutation that clashes with most inhibitors; lorlatinib was designed to fit, and G1202R-containing compound mutations drive resistance to lorlatinib itself.", drugs: ["lorlatinib", "neladalkib"], defeats: ["crizotinib", "alectinib", "ceritinib", "brigatinib"], refs: ["crown", "alkove-1"], source: doi("10.1158/2159-8290.CD-16-0596", "Gainor et al., Cancer Discov 2016") },
      { label: "I1171N/T/S and G1269A", position: 1171, kind: "resistance", note: "Alectinib-associated (I1171) and crizotinib-associated (G1269A) escapes with differing sensitivity profiles; sequencing decisions depend on which is present.", drugs: ["lorlatinib", "brigatinib", "neladalkib"], source: doi("10.1158/2159-8290.CD-16-0596", "Gainor et al., Cancer Discov 2016") },
    ],
    sources: [hotspotsOrg, cosmic("ALK")],
  },
  {
    targetId: "estrogen-receptor", gene: "ESR1", uniprot: "P03372", length: 595,
    domains: [
      { name: "N-terminal domain (AF-1)", start: 1, end: 180 },
      { name: "DNA-binding domain", start: 181, end: 263 },
      { name: "Hinge", start: 264, end: 302 },
      { name: "Ligand-binding domain (AF-2)", start: 303, end: 552 },
      { name: "F domain", start: 553, end: 595 },
    ],
    hotspots: [
      { label: "Y537S / Y537N / Y537C", position: 537, kind: "resistance", frequency: "ESR1 mutations arise in roughly 30 to 40% of tumours progressing on aromatase inhibitors; Y537S and D538G dominate", note: "Locks helix 12 in the agonist conformation so the receptor no longer needs oestrogen. Detected in ctDNA; triggers a switch to an oral SERD or PROTAC.", drugs: ["elacestrant", "imlunestrant", "camizestrant", "vepdegestrant", "giredestrant"], defeats: ["letrozole", "exemestane"], refs: ["emerald", "serena-6", "ember-3", "veritac-2"], source: doi("10.1126/scitranslmed.aac7551", "Schiavon et al., Sci Transl Med 2015") },
      { label: "D538G", position: 538, kind: "resistance", note: "The most common ESR1 allele in most ctDNA series; same clinical handling as Y537S, with Y537S the harder allele for fulvestrant.", drugs: ["elacestrant", "imlunestrant", "camizestrant", "vepdegestrant"], refs: ["emerald", "serena-6"], source: doi("10.1126/scitranslmed.aac7551", "Schiavon et al., Sci Transl Med 2015") },
      { label: "E380Q / L536 / S463P", position: 380, kind: "resistance", note: "Less common ligand-binding-domain alleles with weaker constitutive activity.", drugs: ["elacestrant", "camizestrant"], source: cosmic("ESR1") },
    ],
    sources: [hotspotsOrg, cosmic("ESR1")],
  },
  {
    targetId: "tp53", gene: "TP53", uniprot: "P04637", length: 393,
    domains: [
      { name: "Transactivation domains", start: 1, end: 61 },
      { name: "Proline-rich region", start: 64, end: 92 },
      { name: "DNA-binding domain", start: 102, end: 292 },
      { name: "Tetramerisation domain", start: 325, end: 356 },
      { name: "C-terminal regulatory domain", start: 364, end: 393 },
    ],
    hotspots: [
      { label: "R175H", position: 175, kind: "loss-of-function", note: "Structural (conformational) hotspot: unfolds the DNA-binding domain. Target of reactivator programmes, none approved.", drugs: [], refs: ["eprenetapopt", "idea-bio1-mutant-p53-degrader", "idea-bio1-p53-mutant-reactivator-expansion"], source: doi("10.1101/cshperspect.a001008", "Olivier et al., Cold Spring Harb Perspect Biol 2010") },
      { label: "Y220C", position: 220, kind: "loss-of-function", frequency: "About 1.5% of TP53 mutations", note: "Creates a surface crevice that small molecules can bind to re-stabilise the fold; the only p53 allele with a residue-specific reactivator in clinical trials.", drugs: [], source: doi("10.1101/cshperspect.a001008", "Olivier et al., Cold Spring Harb Perspect Biol 2010") },
      { label: "R248Q / R248W", position: 248, kind: "loss-of-function", note: "DNA-contact hotspot; R248Q also gains oncogenic functions in several models.", drugs: [], source: doi("10.1101/cshperspect.a001008", "Olivier et al., Cold Spring Harb Perspect Biol 2010") },
      { label: "R273C / R273H", position: 273, kind: "loss-of-function", note: "DNA-contact hotspot; among the most frequent alleles in every tumour type.", drugs: [], source: doi("10.1101/cshperspect.a001008", "Olivier et al., Cold Spring Harb Perspect Biol 2010") },
      { label: "G245S / R249S / R282W", position: 282, kind: "loss-of-function", note: "Further structural hotspots; R249S is the aflatoxin signature in liver cancer.", drugs: [], source: doi("10.1101/cshperspect.a001008", "Olivier et al., Cold Spring Harb Perspect Biol 2010") },
    ],
    sources: [{ label: "TP53 Database (NCI, formerly IARC)", url: "https://tp53.isb-cgc.org/" }, hotspotsOrg, cosmic("TP53")],
  },
  {
    targetId: "idh", gene: "IDH1", uniprot: "O75874", length: 414, isoformNote: "IDH1 numbering. The paired IDH2 hotspots are R140Q and R172K (IDH2 is 452 aa).",
    domains: [],
    hotspots: [
      { label: "R132H", position: 132, kind: "other", frequency: "About 90% of IDH1 mutations in glioma", note: "Neomorphic: the mutant enzyme makes 2-hydroxyglutarate. R132H is the glioma allele; R132C is more common in AML and cholangiocarcinoma.", drugs: ["vorasidenib", "ivosidenib", "olutasidenib"], refs: ["indigo", "claridhy", "agile"], source: doi("10.1056/NEJMoa0808710", "Yan et al., NEJM 2009") },
      { label: "R132C / R132G / R132S / R132L", position: 132, kind: "other", note: "Non-H alleles enriched in AML, cholangiocarcinoma and chondrosarcoma; covered by the same inhibitors.", drugs: ["ivosidenib", "olutasidenib", "vorasidenib"], source: cosmic("IDH1") },
      { label: "IDH2 R140Q / R172K (paired gene)", position: 140, kind: "other", note: "Shown for reference at the equivalent IDH1 coordinate: enasidenib covers IDH2; vorasidenib covers both enzymes in glioma.", drugs: ["enasidenib", "vorasidenib"], source: cosmic("IDH2") },
    ],
    sources: [hotspotsOrg, cosmic("IDH1")],
  },
  {
    targetId: "kit", gene: "KIT", uniprot: "P10721", length: 976,
    domains: [
      { name: "Ig-like domains 1 to 5", start: 23, end: 520 },
      { name: "Transmembrane", start: 521, end: 543 },
      { name: "Juxtamembrane (exon 11)", start: 544, end: 581 },
      { name: "Kinase domain (exons 13 to 17)", start: 582, end: 937 },
    ],
    hotspots: [
      { label: "Exon 11 (W557_K558del, V559D, V560D, L576P)", position: 557, end: 576, kind: "activating", frequency: "About two thirds of GIST", note: "Juxtamembrane mutations release auto-inhibition; the most imatinib-sensitive group.", drugs: ["imatinib", "sunitinib", "regorafenib", "ripretinib"], refs: ["ssgxviii", "invictus", "insight-gist"], source: doi("10.1038/nrc3143", "Corless et al., Nat Rev Cancer 2011") },
      { label: "Exon 9 (A502_Y503dup)", position: 502, end: 503, kind: "activating", frequency: "About 10% of GIST", note: "Extracellular duplication; needs high-dose imatinib and responds better to sunitinib.", drugs: ["imatinib", "sunitinib", "ripretinib"], source: doi("10.1038/nrc3143", "Corless et al., Nat Rev Cancer 2011") },
      { label: "V654A / T670I (exons 13 to 14)", position: 654, kind: "resistance", note: "ATP-binding-pocket secondary mutations after imatinib; sunitinib retains activity.", drugs: ["sunitinib", "ripretinib"], defeats: ["imatinib"], source: doi("10.1038/nrc3143", "Corless et al., Nat Rev Cancer 2011") },
      { label: "D816V / N822K / A829P (exons 17 to 18)", position: 816, kind: "resistance", note: "Activation-loop mutations: secondary resistance in GIST and the primary driver of systemic mastocytosis. Avapritinib and ripretinib were designed for the active conformation.", drugs: ["avapritinib", "ripretinib", "regorafenib"], defeats: ["imatinib", "sunitinib"], source: doi("10.1038/nrc3143", "Corless et al., Nat Rev Cancer 2011") },
    ],
    sources: [hotspotsOrg, cosmic("KIT")],
  },
  {
    targetId: "pdgfra", gene: "PDGFRA", uniprot: "P16234", length: 1089,
    domains: [
      { name: "Extracellular Ig-like domains", start: 24, end: 524 },
      { name: "Transmembrane", start: 525, end: 549 },
      { name: "Juxtamembrane", start: 550, end: 592 },
      { name: "Kinase domain", start: 593, end: 954 },
    ],
    hotspots: [
      { label: "D842V (exon 18)", position: 842, kind: "activating", frequency: "About 5% of GIST", note: "Activation-loop mutation that is primary-resistant to imatinib, sunitinib and regorafenib; avapritinib was approved for it in 2020.", drugs: ["avapritinib"], defeats: ["imatinib", "sunitinib", "regorafenib"], source: doi("10.1016/S1470-2045(20)30269-2", "NAVIGATOR, Lancet Oncol 2020") },
    ],
    sources: [cosmic("PDGFRA")],
  },
  {
    targetId: "met", gene: "MET", uniprot: "P08581", length: 1390,
    domains: [
      { name: "SEMA domain", start: 25, end: 515 },
      { name: "PSI and IPT domains", start: 519, end: 932 },
      { name: "Transmembrane", start: 933, end: 955 },
      { name: "Juxtamembrane (exon 14)", start: 963, end: 1009 },
      { name: "Kinase domain", start: 1078, end: 1345 },
    ],
    hotspots: [
      { label: "Exon 14 skipping (splice sites around D1010, Y1003)", position: 1003, end: 1010, kind: "activating", frequency: "About 3% of NSCLC", note: "Loss of the CBL-binding juxtamembrane exon stabilises the receptor. Capmatinib and tepotinib are approved; crizotinib is active.", drugs: ["capmatinib-tepotinib", "crizotinib", "amivantamab"], source: doi("10.1158/2159-8290.CD-15-0285", "Frampton et al., Cancer Discov 2015") },
      { label: "D1228N/H and Y1230C/H", position: 1228, kind: "resistance", note: "Activation-loop mutations after type I MET TKIs (capmatinib, tepotinib, crizotinib); type II inhibitors (cabozantinib) retain activity preclinically. Antibody-based agents are genotype-independent.", drugs: ["cabozantinib", "amivantamab", "telisotuzumab-vedotin"], defeats: ["capmatinib-tepotinib", "crizotinib"], source: doi("10.1158/2159-8290.CD-15-0285", "Frampton et al., Cancer Discov 2015") },
    ],
    sources: [hotspotsOrg, cosmic("MET")],
  },
  {
    targetId: "fgfr2", gene: "FGFR2", uniprot: "P21802", length: 821,
    domains: [
      { name: "Ig-like domains I to III", start: 25, end: 358 },
      { name: "Transmembrane", start: 378, end: 398 },
      { name: "Kinase domain", start: 481, end: 770 },
    ],
    hotspots: [
      { label: "Fusions (FGFR2::BICC1 and many partners)", position: 768, end: 821, kind: "activating", frequency: "About 10 to 15% of intrahepatic cholangiocarcinoma", note: "Breakpoints in the last exon keep the kinase intact and add a dimerising partner. Pemigatinib and futibatinib are approved.", drugs: ["pemigatinib", "futibatinib", "erdafitinib", "tinengotinib"], refs: ["fight-202", "foenix-cca2", "first-308"], source: doi("10.1158/2159-8290.CD-16-1000", "Goyal et al., Cancer Discov 2017") },
      { label: "N550K / N550H", position: 550, kind: "activating", note: "Molecular-brake mutation: primary driver in endometrial cancer and an acquired resistance allele after reversible FGFR inhibitors.", drugs: ["futibatinib", "tinengotinib", "erdafitinib"], source: doi("10.1158/2159-8290.CD-16-1000", "Goyal et al., Cancer Discov 2017") },
      { label: "V565I / V565F (gatekeeper) and E566A, L618V", position: 565, kind: "resistance", note: "Polyclonal secondary kinase-domain mutations after pemigatinib or infigratinib; the covalent inhibitor futibatinib and newer FGFR2-selective agents retain activity against several of them.", drugs: ["futibatinib", "tinengotinib"], defeats: ["pemigatinib"], source: doi("10.1158/2159-8290.CD-16-1000", "Goyal et al., Cancer Discov 2017") },
    ],
    sources: [hotspotsOrg, cosmic("FGFR2")],
  },
  {
    targetId: "btk", gene: "BTK", uniprot: "Q06187", length: 659,
    domains: [
      { name: "PH domain", start: 1, end: 133 },
      { name: "TH domain", start: 134, end: 213 },
      { name: "SH3 domain", start: 214, end: 274 },
      { name: "SH2 domain", start: 281, end: 377 },
      { name: "Kinase domain", start: 402, end: 655 },
    ],
    hotspots: [
      { label: "C481S / C481R / C481F", position: 481, kind: "resistance", frequency: "The dominant mutation at progression on covalent BTK inhibitors in CLL", note: "Removes the cysteine the covalent drugs bond to. Non-covalent pirtobrutinib and BTK degraders do not need it.", drugs: ["pirtobrutinib", "nemtabrutinib", "bgb-16673"], defeats: ["ibrutinib", "acalabrutinib", "zanubrutinib"], refs: ["bruin-cll-321", "cadance-304", "bellwave-011"], source: doi("10.1056/NEJMoa1400029", "Woyach et al., NEJM 2014") },
      { label: "T474I (gatekeeper) and L528W (kinase-dead)", position: 528, kind: "resistance", note: "Emerging after non-covalent inhibitors and after zanubrutinib; L528W abolishes kinase activity yet the scaffold still signals, which is why degraders that remove the whole protein are being tested.", drugs: ["bgb-16673"], defeats: ["pirtobrutinib", "ibrutinib", "zanubrutinib"], refs: ["idea-btk-degrader-frontline"], source: doi("10.1182/blood.2022016600", "Wang et al., Blood 2022 (pirtobrutinib resistance)") },
      { label: "PLCG2 (downstream, not BTK)", position: 659, kind: "other", note: "Shown for context: gain-of-function PLCG2 mutations bypass BTK entirely, so no BTK-directed agent works.", drugs: ["venetoclax"], source: doi("10.1056/NEJMoa1400029", "Woyach et al., NEJM 2014") },
    ],
    sources: [cosmic("BTK")],
  },
  {
    targetId: "flt3", gene: "FLT3", uniprot: "P36888", length: 993,
    domains: [
      { name: "Extracellular Ig-like domains", start: 27, end: 541 },
      { name: "Transmembrane", start: 544, end: 563 },
      { name: "Juxtamembrane", start: 572, end: 603 },
      { name: "Kinase domain", start: 610, end: 943 },
    ],
    hotspots: [
      { label: "Internal tandem duplication (ITD)", position: 572, end: 603, kind: "activating", frequency: "About 25% of AML", note: "In-frame duplications in the juxtamembrane domain; high allelic ratio and long insertions carry worse prognosis. Every approved FLT3 inhibitor covers ITD.", drugs: ["midostaurin", "gilteritinib", "quizartinib"], refs: ["ratify", "admiral", "quantum-first"], source: doi("10.1038/s41375-018-0357-9", "Daver et al., Leukemia 2019") },
      { label: "D835Y/V/H (TKD)", position: 835, kind: "activating", frequency: "About 7% of AML", note: "Activation-loop mutation. Type I inhibitors (midostaurin, gilteritinib) cover it; type II quizartinib does not, and D835 emerges as resistance to quizartinib.", drugs: ["gilteritinib", "midostaurin"], defeats: ["quizartinib"], source: doi("10.1038/s41375-018-0357-9", "Daver et al., Leukemia 2019") },
      { label: "F691L (gatekeeper)", position: 691, kind: "resistance", note: "Acquired after gilteritinib or quizartinib; reduces sensitivity to both classes.", drugs: [], defeats: ["gilteritinib", "quizartinib"], source: doi("10.1038/s41375-018-0357-9", "Daver et al., Leukemia 2019") },
    ],
    sources: [cosmic("FLT3")],
  },
  {
    targetId: "bcr-abl", gene: "ABL1", uniprot: "P00519", length: 1130, isoformNote: "ABL1 isoform 1a numbering (1130 aa), the convention for T315I.",
    domains: [
      { name: "SH3 domain", start: 64, end: 121 },
      { name: "SH2 domain", start: 127, end: 217 },
      { name: "Kinase domain", start: 242, end: 493 },
    ],
    hotspots: [
      { label: "T315I (gatekeeper)", position: 315, kind: "resistance", note: "Blocks imatinib, dasatinib, nilotinib and bosutinib. Ponatinib was designed for it; asciminib (allosteric, myristoyl pocket) is active at higher doses.", drugs: ["ponatinib", "asciminib"], defeats: ["imatinib", "dasatinib", "nilotinib", "bosutinib"], refs: ["phallcon"], source: doi("10.1182/blood-2010-12-326405", "Soverini et al., Blood 2011") },
      { label: "P-loop (G250E, Y253H, E255K/V)", position: 253, kind: "resistance", note: "Destabilise the inactive conformation imatinib and nilotinib bind; dasatinib and ponatinib retain activity.", drugs: ["dasatinib", "ponatinib", "asciminib"], defeats: ["imatinib", "nilotinib"], source: doi("10.1182/blood-2010-12-326405", "Soverini et al., Blood 2011") },
      { label: "F317L / V299L", position: 317, kind: "resistance", note: "Dasatinib-contact residues; nilotinib and bosutinib remain options.", drugs: ["nilotinib", "bosutinib", "ponatinib"], defeats: ["dasatinib"], source: doi("10.1182/blood-2010-12-326405", "Soverini et al., Blood 2011") },
      { label: "A337 / P465 / V468 (myristoyl pocket)", position: 465, kind: "resistance", note: "Allosteric-site mutations selected by asciminib; the ATP-site inhibitors are unaffected, the logic behind combining the two classes.", drugs: ["ponatinib", "dasatinib"], defeats: ["asciminib"], source: doi("10.1182/blood-2010-12-326405", "Soverini et al., Blood 2011") },
    ],
    sources: [cosmic("ABL1")],
  },
  {
    targetId: "jak2", gene: "JAK2", uniprot: "O60674", length: 1132,
    domains: [
      { name: "FERM domain", start: 37, end: 380 },
      { name: "SH2-like domain", start: 401, end: 482 },
      { name: "Pseudokinase (JH2)", start: 545, end: 809 },
      { name: "Kinase (JH1)", start: 849, end: 1124 },
    ],
    hotspots: [
      { label: "V617F", position: 617, kind: "activating", frequency: "About 95% of polycythaemia vera and 50 to 60% of essential thrombocythaemia and primary myelofibrosis", note: "Pseudokinase mutation that releases auto-inhibition. The approved JAK inhibitors block the kinase domain and are not mutation-selective; V617F-selective inhibitors are in development.", drugs: ["ruxolitinib", "fedratinib", "momelotinib", "pacritinib", "ropeginterferon-alfa-2b"], source: doi("10.1016/S0140-6736(05)71142-9", "Baxter et al., Lancet 2005") },
      { label: "Exon 12 (N542_E543del, K539L)", position: 540, kind: "activating", frequency: "About 3% of polycythaemia vera", note: "V617F-negative PV; same drugs.", drugs: ["ruxolitinib", "ropeginterferon-alfa-2b"], source: cosmic("JAK2") },
    ],
    sources: [cosmic("JAK2")],
  },
  {
    targetId: "androgen-receptor", gene: "AR", uniprot: "P10275", length: 920, isoformNote: "Current UniProt numbering (920 aa); older papers number T878A as T877A.",
    domains: [
      { name: "N-terminal domain (AF-1)", start: 1, end: 558 },
      { name: "DNA-binding domain", start: 559, end: 624 },
      { name: "Hinge", start: 625, end: 669 },
      { name: "Ligand-binding domain", start: 670, end: 920 },
    ],
    hotspots: [
      { label: "T878A", position: 878, kind: "resistance", note: "Broadens ligand specificity so progesterone and the abiraterone metabolite become agonists; enriched after abiraterone.", drugs: ["enzalutamide", "darolutamide", "pluvicto"], defeats: ["abiraterone"], source: doi("10.1038/nrc4016", "Watson et al., Nat Rev Cancer 2015") },
      { label: "F877L", position: 877, kind: "resistance", note: "Converts enzalutamide and apalutamide into agonists; darolutamide retains antagonism in preclinical models.", drugs: ["darolutamide", "pluvicto"], defeats: ["enzalutamide", "apalutamide"], source: doi("10.1038/nrc4016", "Watson et al., Nat Rev Cancer 2015") },
      { label: "L702H", position: 702, kind: "resistance", note: "Makes glucocorticoids (prednisone given with abiraterone) into AR agonists.", drugs: ["enzalutamide"], defeats: ["abiraterone"], source: doi("10.1038/nrc4016", "Watson et al., Nat Rev Cancer 2015") },
      { label: "W742C / H875Y", position: 742, kind: "resistance", note: "Bicalutamide-to-agonist and broad promiscuity mutations from the first-generation anti-androgen era.", drugs: ["enzalutamide", "darolutamide"], defeats: ["bicalutamide"], source: doi("10.1038/nrc4016", "Watson et al., Nat Rev Cancer 2015") },
      { label: "AR-V7 (splice variant, no LBD)", position: 640, end: 670, kind: "resistance", note: "Truncated after the DNA-binding domain, so no ligand-binding-domain drug can touch it; the case for N-terminal-domain binders and degraders.", drugs: [], defeats: ["enzalutamide", "apalutamide", "darolutamide", "abiraterone"], refs: ["idea-bio1-arv7-degrader", "masofaniten"], source: doi("10.1038/nrc4016", "Watson et al., Nat Rev Cancer 2015") },
    ],
    sources: [cosmic("AR")],
  },
  {
    targetId: "akt", gene: "AKT1", uniprot: "P31749", length: 480,
    domains: [
      { name: "PH domain", start: 6, end: 108 },
      { name: "Kinase domain", start: 150, end: 408 },
      { name: "Regulatory tail", start: 409, end: 480 },
    ],
    hotspots: [
      { label: "E17K", position: 17, kind: "activating", frequency: "About 3 to 5% of breast cancers", note: "PH-domain mutation that pins AKT1 to the membrane; one of the alterations that qualifies for capivasertib with fulvestrant.", drugs: ["capivasertib"], refs: ["capitello-291"], source: doi("10.1038/nature05933", "Carpten et al., Nature 2007") },
    ],
    sources: [hotspotsOrg, cosmic("AKT1")],
  },
  {
    targetId: "ret", gene: "RET", uniprot: "P07949", length: 1114, isoformNote: "RET51 isoform numbering (1114 aa); RET9 is 1072 aa.",
    domains: [
      { name: "Cadherin-like extracellular domains", start: 29, end: 514 },
      { name: "Cysteine-rich domain", start: 515, end: 635 },
      { name: "Transmembrane", start: 636, end: 657 },
      { name: "Kinase domain", start: 724, end: 1016 },
    ],
    hotspots: [
      { label: "M918T", position: 918, kind: "activating", note: "The MEN2B germline allele and the most common somatic mutation in sporadic medullary thyroid cancer; highly sensitive to selpercatinib.", drugs: ["selpercatinib", "pralsetinib", "vandetanib", "cabozantinib"], refs: ["libretto-531", "arrow-thyroid"], source: cosmic("RET") },
      { label: "C634R and other cysteine codons", position: 634, kind: "activating", note: "MEN2A germline hotspot in the cysteine-rich domain; forms constitutive dimers.", drugs: ["selpercatinib", "pralsetinib"], source: cosmic("RET") },
      { label: "V804M / V804L (gatekeeper)", position: 804, kind: "resistance", note: "Blocks vandetanib and cabozantinib; selpercatinib and pralsetinib were designed to tolerate it.", drugs: ["selpercatinib", "pralsetinib"], defeats: ["vandetanib", "cabozantinib"], source: doi("10.1016/j.jtho.2020.01.006", "Solomon et al., J Thorac Oncol 2020") },
      { label: "G810R/S/C (solvent front)", position: 810, kind: "resistance", note: "Acquired after selpercatinib or pralsetinib; next-generation RET inhibitors are designed around it.", drugs: [], defeats: ["selpercatinib", "pralsetinib"], source: doi("10.1016/j.jtho.2020.01.006", "Solomon et al., J Thorac Oncol 2020") },
    ],
    sources: [cosmic("RET")],
  },
  {
    targetId: "ros1", gene: "ROS1", uniprot: "P08922", length: 2347,
    domains: [
      { name: "Extracellular region", start: 28, end: 1859 },
      { name: "Transmembrane", start: 1860, end: 1882 },
      { name: "Kinase domain", start: 1945, end: 2222 },
    ],
    hotspots: [
      { label: "G2032R (solvent front)", position: 2032, kind: "resistance", frequency: "The most common ROS1 resistance mutation after crizotinib", note: "Defeats crizotinib and entrectinib; repotrectinib and taletrectinib were designed to fit past it.", drugs: ["repotrectinib", "taletrectinib"], defeats: ["crizotinib", "entrectinib"], source: doi("10.1200/PO.17.00063", "Gainor et al., JCO Precision Oncology 2017") },
      { label: "L2026M (gatekeeper) and D2033N, S1986F/Y", position: 2026, kind: "resistance", note: "Less common escapes; sensitivity varies by drug.", drugs: ["repotrectinib", "taletrectinib"], source: doi("10.1200/PO.17.00063", "Gainor et al., JCO Precision Oncology 2017") },
    ],
    sources: [cosmic("ROS1")],
  },
  {
    targetId: "ntrk", gene: "NTRK1", uniprot: "P04629", length: 796, isoformNote: "TRKA (NTRK1) numbering; the homologous TRKC positions are G623R (solvent front) and G696A (xDFG).",
    domains: [
      { name: "Extracellular region", start: 33, end: 423 },
      { name: "Transmembrane", start: 424, end: 439 },
      { name: "Kinase domain", start: 510, end: 781 },
    ],
    hotspots: [
      { label: "G595R (solvent front)", position: 595, kind: "resistance", note: "The main acquired escape from larotrectinib and entrectinib; repotrectinib covers it.", drugs: ["repotrectinib"], defeats: ["larotrectinib", "entrectinib"], source: doi("10.1158/2159-8290.CD-17-0507", "Drilon et al., Cancer Discov 2017") },
      { label: "G667C (xDFG) and F589L (gatekeeper)", position: 667, kind: "resistance", note: "Further on-target escapes with partial coverage by next-generation TRK inhibitors.", drugs: ["repotrectinib"], defeats: ["larotrectinib", "entrectinib"], source: doi("10.1158/2159-8290.CD-17-0507", "Drilon et al., Cancer Discov 2017") },
    ],
    sources: [cosmic("NTRK1")],
  },
  {
    targetId: "bcl2", gene: "BCL2", uniprot: "P10415", length: 239,
    domains: [
      { name: "BH4", start: 10, end: 30 },
      { name: "BH3", start: 93, end: 107 },
      { name: "BH1", start: 136, end: 155 },
      { name: "BH2", start: 187, end: 202 },
      { name: "Transmembrane", start: 213, end: 233 },
    ],
    hotspots: [
      { label: "G101V", position: 101, kind: "resistance", note: "Reduces venetoclax affinity about 180-fold; found in a subset of CLL relapsing on continuous venetoclax, often subclonal. Sonrotoclax is reported to retain activity against it.", drugs: ["sonrotoclax"], defeats: ["venetoclax"], refs: ["celestial-tncll"], source: doi("10.1158/2159-8290.CD-18-1119", "Blombery et al., Cancer Discov 2019") },
      { label: "D103Y / F104L", position: 103, kind: "resistance", note: "Additional BH3-groove mutations co-occurring with G101V.", drugs: ["sonrotoclax"], defeats: ["venetoclax"], source: doi("10.1158/2159-8290.CD-18-1119", "Blombery et al., Cancer Discov 2019") },
    ],
    sources: [cosmic("BCL2")],
  },
];

export const hotspotsFor = (targetId: string): HotspotMap | undefined => hotspots.find((h) => h.targetId === targetId);
