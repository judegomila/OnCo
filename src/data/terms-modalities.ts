import type { TermInput } from "@/lib/schema";

/** Drug-class pages for the modality headers of the pivot table and elsewhere. */
const asOf = "2026-09-17";
type T = Omit<TermInput, "kind" | "asOf" | "links"> & { wikipedia?: string; asOf?: string; links?: TermInput["links"] };
const t = (x: T): TermInput => ({ kind: "term", asOf, links: x.wikipedia ? [{ label: "Wikipedia", url: x.wikipedia }] : undefined, ...x });

export const termsModalities: TermInput[] = [
  t({
    id: "small-molecule", name: "Small molecule drug", category: "Treatment jargon",
    aka: ["small molecule", "small molecules", "small-molecule inhibitor", "small-molecule drug", "oral targeted drug", "chemical drug"],
    wikipedia: "https://en.wikipedia.org/wiki/Small_molecule",
    tldr: "Small-molecule medicines can act on intracellular targets, but size alone does not establish cell entry, oral absorption, selectivity or safety.",
    summary: "Many small-molecule medicines can reach targets inside cells, such as kinases and DNA-repair enzymes. Their actual entry, distribution, unbound concentration, metabolism and export depend on the compound and the system. Some are taken by mouth and others are administered by injection; formulation and clinical pharmacology must be checked for the named product.\n\nThe National Cancer Institute distinguishes small-molecule and antibody-based targeted therapies and describes several different mechanisms. A treatment can act on more than one protein, and a target alteration can affect activity or resistance. A chemically defined molecule is not automatically selective, orally available or a useful research probe. Probe fitness, target engagement, functional consequences and clinical benefit require different evidence.",
    technologies: ["kinase-inhibitors", "protac-degrader", "peptide-drug-conjugate", "cytotoxic-chemotherapy"],
    drugs: ["imatinib", "osimertinib", "olaparib", "venetoclax"],
    terms: ["antibody", "monoclonal", "targeted-therapy-term"],
    keyPapers: ["paper-veber-oral-bioavailability-jmedchem-2002"],

"notes": [
  "Small molecules are also the usual research tools for asking what a protein does, and a compound that is good for that question is a chemical probe, not necessarily a medicine; a probe is judged by potency, selectivity and controls, and a medicine also needs evidence in people about product quality, exposure, tolerability and benefit."
],
"asOf": "2026-11-11",
"related": [
  "chemical-probe"
]
,
"links": [
  {
    "label": "Wikipedia",
    "url": "https://en.wikipedia.org/wiki/Small_molecule"
  },
  {
    "label": "NCI: targeted cancer therapies, small-molecule and antibody mechanisms",
    "url": "https://www.cancer.gov/about-cancer/treatment/types/targeted-therapies"
  }
]
}),
  t({
    id: "vaccines-and-oncolytic-viruses", name: "Cancer vaccines and oncolytic viruses", category: "Immunology",
    aka: ["therapeutic cancer vaccine", "cancer vaccine", "cancer vaccines", "oncolytic virus therapy", "vaccine or oncolytic", "tumour vaccine"],
    wikipedia: "https://en.wikipedia.org/wiki/Cancer_vaccine",
    tldr: "Cancer vaccines aim to support immune recognition of cancer targets. Oncolytic viruses can injure susceptible cancer cells; useful tumour-directed immunity and clinical benefit need separate evidence.",
    summary: "Cancer-vaccine strategies differ in purpose, target selection and supplied material. Infection-prevention vaccines reduce the risk from cancer-causing infections. Therapeutic strategies aim at cancer-associated targets, including after removal of visible disease. Personalised selection, shared targets and RNA or peptide delivery are separate design choices.\n\nOncolytic viruses are a related approach in which viral activity can injure susceptible tumour cells and release material that may support an immune response. Infection, tumour recognition and useful clinical control remain distinct. A product-specific result cannot establish benefit for every vaccine, virus, cancer or setting.",
    technologies: ["neoantigen-mrna-vaccine", "shared-antigen-vaccine", "dendritic-cell-vaccines", "bacterial-vector-vaccines", "oncolytic-virus", "hpv-vaccine", "checkpoint-inhibitor"],
    drugs: ["talimogene-laherparepvec", "sipuleucel-t", "intismeran-autogene"],
    cancers: ["melanoma", "prostate", "cervical"],
    terms: ["immunotherapy-term"],

  asOf: "2026-11-12",
  notes: [
    "Cancer-vaccine strategies seek useful recognition of cancer-associated targets. Their purpose is different from vaccination against an infection that can cause cancer: HPV and hepatitis B vaccines reduce infection-related cancer risk, rather than treat an established tumour. A therapeutic vaccine can be studied after removal of visible cancer to reduce recurrence risk; that timing does not turn it into infection prevention. Teaching recognition is an aim, not a guarantee that responding cells will reach and control the cancer.",
    "Describe a vaccine along three independent axes: its purpose, how its targets are selected, and what material is supplied. Personalised selection uses information or material from one person's tumour and can still include targets shared with other people. Shared targets can be tumour-associated proteins or recurring mutation-derived neoantigens. Neither label proves that every cancer cell contains and displays the target. RNA can encode shared targets, and a personalised product can contain peptides. A three-axis comparison therefore classifies designs without ranking their effectiveness.",
    "A designed product supplies planned antigen material or instructions for making it. An in-situ approach instead uses tumour material already within the body while trying to support presentation and immune activation. Injury or injection alone does not show that vaccination succeeded. These categories describe antigen sources; they do not determine route, peptide display, personalisation or clinical benefit. The dedicated in-situ vaccination and intratumoral immunotherapy records distinguish a learning strategy from a delivery route.",
    "Brody's 2010 phase I/II study treated 15 people with low-grade B-cell lymphoma using low-dose radiation to one tumour and an injected CpG TLR9 agonist at that site. At distant untreated sites, one participant had a complete response and three had partial responses. This is evidence for a particular multicomponent regimen in that lymphoma group. It does not establish that every local injury creates a vaccine, that the same result occurs in breast cancer, or that this strategy outperforms a supplied-antigen vaccine.",
    "Ott's 2017 melanoma study illustrates personalised selection without RNA delivery. Six people received a vaccine containing long peptides selected from their own tumours with poly-ICLC, an immune stimulus. The study demonstrated manufacturing feasibility and assay-defined antigen-reactive responses. Some T-cell preparations also recognised the person's tumour cells, while others did not under the tested conditions. This early, nonrandomised study cannot rank all peptide and RNA platforms or isolate the contribution of each ingredient.",
    "Follow a proposed vaccine response through separate questions. Is the antigen supplied or available with suitable supporting signals? Is it processed and displayed, and are suitable cells primed or expanded? Do those cells reach the tumour, recognise naturally displayed targets and maintain useful function? Finally, does the complete intervention improve a clinical outcome with acceptable harms? Variation between tumour cells, differences in target display and immune restraint can affect different steps. The sequence is a way to investigate dependencies, not a promise that each stage follows automatically.",
    "Manufacturing feasibility, immunogenicity and clinical benefit are different endpoints. An immune assay needs its stated cell population, supplied antigen, controls, sampling time and response definition. Reactivity in blood to added peptide does not by itself establish recognition of naturally processed targets on cancer cells; recognition in a model does not establish fewer recurrences. A clinical comparison needs the population, accompanying treatments, endpoint, follow-up and harms. A positive result at one level cannot substitute for the next.",
    "Adding target sequences does not guarantee equally broad functional immunity. Responses can be concentrated on a subset of epitopes, a pattern called immunodominance; Ott's study found different response frequencies across selected targets and T-cell populations. A vaccine adjuvant is an ingredient intended to support an immune response. Adjuvant cancer treatment instead means treatment after the main treatment. These uses of the same word describe different things.",
    "In a fictional study, an RNA product encoding shared tumour-associated antigens is given after surgery, and an antigen-reactive blood response is detected. Its purpose is therapeutic risk reduction, its target selection is shared, and its supplied material is RNA. Nothing in those facts demonstrates personalised manufacture, natural tumour recognition or reduced recurrence. Those conclusions require their own product, assay and clinical evidence."
  ],
  links: [
    {"label":"Wikipedia","url":"https://en.wikipedia.org/wiki/Cancer_vaccine"},
    {"label":"NCI: cancer prevention and infection-prevention vaccines","url":"https://www.cancer.gov/about-cancer/causes-prevention/patient-prevention-overview-pdq"},
    {"label":"NCI: cancer treatment vaccines","url":"https://www.cancer.gov/about-cancer/treatment/types/immunotherapy/cancer-treatment-vaccines"},
    {"label":"Brody et al.: local radiation and CpG in 15 lymphoma participants (2010)","url":"https://pubmed.ncbi.nlm.nih.gov/20697067/"},
    {"label":"Ott et al.: personalised long-peptide melanoma vaccine (2017)","url":"https://pubmed.ncbi.nlm.nih.gov/28678778/"},
    {"label":"Kedl et al.: mouse T-cell competition for antigen-presenting cells (2000)","url":"https://pubmed.ncbi.nlm.nih.gov/11034600/"},
    {"label":"CDC: vaccine-adjuvant definition and reactions","url":"https://www.cdc.gov/vaccine-safety/about/adjuvants.html"}
  ],
  related: [
    "vaccine-adjuvants",
    "intratumoral-immunotherapy",
    "in-situ-vaccination",
    "shared-antigen-vaccine"
  ]
}),
];
