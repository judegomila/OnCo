/**
 * The module taxonomy of a medicine, free of graph imports so client components, the navigation and the sitemap
 * can read it: which formats the open drug engine (/pipeline/engine/) knows, which parts each format is built
 * from, and which two parts make the format's permutation grid. The decomposer that maps corpus records onto
 * these parts lives in src/lib/modular.ts.
 *
 * A "format" is the shape of the medicine (an ADC, a radioligand, a CAR-T). A "component" is one interchangeable
 * part of that shape (the target antigen, the payload class, the isotope). The grid of a format is component A
 * against component B; every other component is listed beside the grid and filters the table.
 */
export type FormatId = "adc" | "radioligand" | "car-t" | "tcr-t" | "bispecific" | "degrader" | "small-molecule" | "antibody" | "cytokine" | "vaccine" | "oncolytic-virus" | "cell-therapy";

export type ComponentKey =
  | "target" | "targetB" | "carrier" | "payload" | "payloadClass" | "linker" | "dar"
  | "isotope" | "emission" | "chelator" | "ligand"
  | "binder" | "costim" | "cellSource" | "cellType" | "vector" | "hla"
  | "format" | "pairClass"
  | "ligase" | "degraderType"
  | "mechanismClass" | "binding"
  | "antibodyFormat"
  | "cytokine" | "engineering"
  | "antigen" | "platform"
  | "virus" | "transgene";

export const COMPONENT_LABEL: Record<ComponentKey, string> = {
  target: "Target", targetB: "Second target", carrier: "Carrier (targeting system)", payload: "Payload", payloadClass: "Payload class", linker: "Linker type", dar: "Drug-to-antibody ratio",
  isotope: "Isotope", emission: "Emission", chelator: "Chelator", ligand: "Ligand class",
  binder: "Binder", costim: "Costimulatory domain", cellSource: "Cell source", cellType: "Cell type", vector: "Vector", hla: "HLA restriction",
  format: "Format", pairClass: "Pair class",
  ligase: "E3 ligase", degraderType: "Degrader type",
  mechanismClass: "Mechanism class", binding: "Binding mode",
  antibodyFormat: "Antibody format",
  cytokine: "Cytokine", engineering: "Engineering",
  antigen: "Antigen", platform: "Platform",
  virus: "Virus backbone", transgene: "Transgene",
};

export type FormatDef = {
  id: FormatId;
  name: string;
  /** One line on what the parts are, for the hub card and the page lede. */
  blurb: string;
  /** The two components that make the grid: rows then columns. */
  axes: [ComponentKey, ComponentKey];
  /** Every component the decomposer tries to resolve for this format, grid axes first. */
  components: ComponentKey[];
  /** 24x24 monoline glyph path (same grammar as RouteIcon). */
  glyph: string;
};

export const FORMATS: FormatDef[] = [
  { id: "adc", name: "Antibody-drug conjugates", blurb: "A carrier that finds the cell, a linker that lets go at the right moment, and a payload that does the killing; the drug-to-antibody ratio says how many payloads ride along. Peptide and bicyclic conjugates and protein-toxin fusions are here too, since they swap the carrier and keep the idea.",
    axes: ["target", "payloadClass"], components: ["target", "payloadClass", "payload", "carrier", "linker", "dar"], glyph: "M3.5 9a4 4 0 0 1 4-4h9a4 4 0 0 1 0 8h-9a4 4 0 0 1-4-4Zm8.5-4v8M4 17h16" },
  { id: "radioligand", name: "Radioligands", blurb: "A ligand that binds the target, a chelator that holds the metal, and an isotope whose emission does the work; beta emitters travel millimetres, alpha emitters micrometres.",
    axes: ["target", "isotope"], components: ["target", "isotope", "emission", "ligand", "chelator"], glyph: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm0 6a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-1.5-5.5 1 5m4.5 8.5 3 4M5 19l3-4" },
  { id: "car-t", name: "CAR cell therapies", blurb: "An antigen to recognise, a binder that recognises it, a costimulatory domain that sets the tempo (4-1BB slow and durable, CD28 fast and sharp), a vector that installs the receptor, and the cell that carries it, taken from the patient or from a donor.",
    axes: ["target", "costim"], components: ["target", "costim", "binder", "cellSource", "cellType", "vector"], glyph: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0 0v9M8 21h8M5 5l3 2m8-2-3 2M4 12h4m8 0h4" },
  { id: "tcr-t", name: "TCR-T cell therapies", blurb: "A T-cell receptor engineered to see a peptide from inside the cell presented on an HLA molecule: the antigen and the HLA restriction together decide who the medicine can treat.",
    axes: ["target", "hla"], components: ["target", "hla", "cellSource", "format"], glyph: "M12 3v6m0 0-4 4m4-4 4 4M8 13v8m8-8v8M5 21h14M9 6h6" },
  { id: "bispecific", name: "Bispecific antibodies", blurb: "Two arms, two targets: a tumour antigen with CD3 to pull in T cells, two checkpoints at once, or two tumour receptors so escape through one is blocked by the other. The format (BiTE, DuoBody, 2:1, ImmTAC) sets half-life and dosing.",
    axes: ["target", "targetB"], components: ["target", "targetB", "pairClass", "format"], glyph: "M12 21V11m0 0L6 4m6 7 6-7M4 4h4M16 4h4" },
  { id: "degrader", name: "Degraders and molecular glues", blurb: "A ligand for the target, a recruiter for an E3 ligase, and a cell that does the rest: the protein is tagged and destroyed rather than blocked. Cereblon is the ligase almost everything uses today.",
    axes: ["target", "ligase"], components: ["target", "ligase", "degraderType"], glyph: "M7 7h6v6H7zM13 10h4M17 8v4M4 17l3-3m0 3-3-3M18 17l2 2m0-2-2 2" },
  { id: "small-molecule", name: "Small-molecule inhibitors", blurb: "A target and a way of hitting it: ATP-competitive, allosteric or covalent kinase inhibitors, PARP trapping, hormone receptor blockade. The grid asks which targets have been hit with which mechanism class.",
    axes: ["target", "mechanismClass"], components: ["target", "mechanismClass", "binding"], glyph: "M12 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm-6 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm12 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM12 23a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM12 5v14M7.7 10.5l3.6 1.5m1.4 0 3.6-1.5" },
  { id: "antibody", name: "Naked antibodies", blurb: "A target and an antibody format: whether the Fc is engineered to recruit killer cells, silenced to avoid them, fused to a trap, or copied as a biosimilar.",
    axes: ["target", "antibodyFormat"], components: ["target", "antibodyFormat"], glyph: "M12 21V11m0 0L6 4m6 7 6-7" },
  { id: "cytokine", name: "Cytokines", blurb: "A signalling protein and the engineering that tames it: PEGylation for half-life, Fc fusion, receptor bias, an antibody to aim it at the tumour.",
    axes: ["cytokine", "engineering"], components: ["cytokine", "engineering", "target"], glyph: "M12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm0 0v9M5 8l4 2m10-2-4 2M6 19l3-3m9 3-3-3" },
  { id: "vaccine", name: "Cancer vaccines", blurb: "An antigen to teach the immune system and a platform to deliver the lesson: mRNA in lipid nanoparticles, peptides, DNA plasmids, viral vectors, dendritic cells, whole cells or virus-like particles.",
    axes: ["antigen", "platform"], components: ["antigen", "platform", "target"], glyph: "M14 3l7 7-4 4-7-7 4-4ZM10 7 3 14v4h4l7-7M12 9l3 3" },
  { id: "oncolytic-virus", name: "Oncolytic viruses", blurb: "A virus backbone edited to replicate only in tumour cells and a transgene it carries to call the immune system in.",
    axes: ["virus", "transgene"], components: ["virus", "transgene"], glyph: "M12 3v3m0 12v3M3 12h3m12 0h3M6.3 6.3l2.1 2.1m7.2 7.2 2.1 2.1M6.3 17.7l2.1-2.1m7.2-7.2 2.1-2.1M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z" },
  { id: "cell-therapy", name: "Other cell therapies", blurb: "Cells without an engineered receptor: tumour-infiltrating lymphocytes, natural killer cells, cord blood grafts and virus-specific T cells, from the patient or from a donor.",
    axes: ["cellType", "cellSource"], components: ["cellType", "cellSource"], glyph: "M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm8 8a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM8 12l8 4" },
];

export const FORMAT_IDS: FormatId[] = FORMATS.map((f) => f.id);
export const formatById = (id: string): FormatDef | undefined => FORMATS.find((f) => f.id === id);

/** What the engine can say about one combination of parts, from the records it has. */
export type CellState = "approved" | "development" | "stopped" | "unclear" | "untried";
export const CELL_STATES: CellState[] = ["approved", "development", "stopped", "unclear", "untried"];
export const STATE_META: Record<CellState, { label: string; tip: string; chip: string; swatch: string }> = {
  approved: { label: "Approved", tip: "At least one medicine with this combination of parts has an approval row in the corpus and is not recorded as withdrawn.", chip: "bg-accent-soft text-accent border border-accent/30", swatch: "bg-accent-solid" },
  development: { label: "In development", tip: "A medicine with this combination has a recruiting, active or planned trial, a development-phase status on its record, or active studies on ClinicalTrials.gov, and no approval.", chip: "tone-live", swatch: "bg-amber-400" },
  stopped: { label: "Tried and stopped", tip: "Every medicine with this combination is recorded as withdrawn, negative or historic, or its only trial evidence is a terminated, withdrawn or negative study, or its approval was withdrawn.", chip: "bg-zinc-200 text-zinc-800 dark:bg-zinc-700 dark:text-zinc-100", swatch: "bg-zinc-600" },
  unclear: { label: "Recorded, state unclear", tip: "A medicine with this combination exists in the corpus but its record carries no status, no trial with a status, and no approval or registry activity to classify it by.", chip: "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300", swatch: "bg-zinc-300" },
  untried: { label: "Untried here", tip: "No medicine in the corpus combines these two parts. The corpus is not the world: absence here means nothing in OnCo, not nothing anywhere.", chip: "border border-dashed border-border text-muted", swatch: "bg-foreground/[0.06]" },
};

/** Site route of a format page. */
export const engineRoute = (id?: FormatId): string => (id ? `/pipeline/engine/${id}/` : "/pipeline/engine/");
/** Site-relative path of a format's JSON companion under the static API. */
export const engineFile = (id: FormatId | "index"): string => `/api/v1/pipeline/engine/${id}.json`;
/** Table id of a format's paged grid table (src/lib/tables/engine.ts). */
export const engineTableId = (id: FormatId): string => `engine-${id}`;
/** The axis-B value a medicine gets when the corpus does not record that part; never counted as a tried combination against the real columns. */
export const NOT_RECORDED = "not-recorded";
