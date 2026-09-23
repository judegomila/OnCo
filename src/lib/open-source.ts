/**
 * Open-source oncology projects (/open-source/): category and openness metadata, licence families and the lookups
 * that let technology, collection and data-source pages list the open projects that implement or serve them.
 * The records are GENERATED (src/data/open-source.ts by scripts/fetch-open-source.ts); this module only reads them.
 */
import { openSourceProjects } from "@/data/open-source";
import type { OpenSourceCategory, Openness, OpenSourceProject } from "@/lib/schema";

export type { OpenSourceProject };

/** Label, one-line blurb and a 24x24 stroke glyph path per category, in display order. */
export const CATEGORY_META: Record<OpenSourceCategory, { label: string; blurb: string; glyph: string }> = {
  "analysis-pipeline": { label: "Analysis pipelines & modelling", blurb: "Variant callers, copy-number and signature tools, clonal reconstruction, immune deconvolution and the simulators of tumour growth.", glyph: "M4 6h6v4H4zM14 6h6v4h-6zM9 14h6v4H9zM7 10v2h10v-2M12 12v2" },
  "variant-interpretation": { label: "Variant interpretation knowledge bases", blurb: "What a mutation means in the clinic: curated evidence, driver catalogues and the annotators that apply them.", glyph: "M5 4h14v16H5zM8 8h8M8 12h8M8 16h5" },
  "imaging-segmentation": { label: "Imaging & segmentation", blurb: "DICOM viewers and archives, segmentation frameworks, radiomics and the imaging foundation models.", glyph: "M4 5h16v14H4zM4 15l5-5 4 4 3-3 4 4M16 8h.01" },
  "radiotherapy-planning": { label: "Radiotherapy planning & physics", blurb: "Treatment planning research systems, Monte Carlo dose engines, plan QA and dosimetry.", glyph: "M12 3v3M12 18v3M3 12h3M18 12h3M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8ZM12 11a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z" },
  pathology: { label: "Pathology", blurb: "Whole-slide readers and viewers, cell segmentation, quality control and the pathology foundation models.", glyph: "M12 3a7 7 0 1 0 0 14 7 7 0 0 0 0-14ZM12 17v4M8 21h8M9.5 9.5a2.5 2.5 0 1 0 5 0 2.5 2.5 0 0 0-5 0Z" },
  "single-cell-spatial": { label: "Single-cell & spatial", blurb: "Single-cell and spatial omics toolkits, tumour-versus-normal callers from expression, and the cell foundation models.", glyph: "M6 6a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM16 5a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM10 15a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM18 15a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM8 8l6-1M7 9l3 6M15 8l2 7M12 16h4" },
  "drug-discovery-chemistry": { label: "Drug discovery & chemistry", blurb: "Target platforms, cheminformatics, docking, structure prediction, generative design and the open-science drug programmes.", glyph: "M9 3h6M10 3v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3M8 15h8" },
  "trial-infrastructure": { label: "Trial infrastructure & registries", blurb: "Electronic data capture, common data models, registry software, trial registry clients and shared-data platforms.", glyph: "M5 4h14v16H5zM9 4v3h6V4M8 11h8M8 15h5" },
  "data-commons": { label: "Data commons & datasets", blurb: "Portals, clients and pipelines behind the open cancer genomics, imaging and proteomics collections.", glyph: "M5 6c0-1.7 3.1-3 7-3s7 1.3 7 3-3.1 3-7 3-7-1.3-7-3Zm0 0v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3" },
  "clinical-decision-support": { label: "Clinical decision support", blurb: "Risk and survival calculators, tumour board tools, trial matching and report interpretation.", glyph: "M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7l8-4ZM12 8v6M9 11h6" },
  "patient-facing": { label: "Patient-facing", blurb: "Open information and tools written for patients and the people around them.", glyph: "M12 21s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.6-7 10-7 10Z" },
  hardware: { label: "Hardware", blurb: "Open-hardware microscopes, scanners, consoles, lab robots and dosimeters.", glyph: "M8 8h8v8H8zM4 10h4M4 14h4M16 10h4M16 14h4M10 4v4M14 4v4M10 16v4M14 16v4" },
  "standards-ontologies": { label: "Standards & ontologies", blurb: "The vocabularies, data models and exchange formats that let oncology systems talk to each other.", glyph: "M12 4v16M4 8h16M6 8v3a6 6 0 0 0 12 0V8" },
  education: { label: "Education", blurb: "Open courses, training modules, notebooks and curated lists.", glyph: "M2 9l10-5 10 5-10 5L2 9Zm4 3v5c0 1.5 3 3 6 3s6-1.5 6-3v-5M22 9v6" },
};

export const CATEGORY_ORDER = Object.keys(CATEGORY_META) as OpenSourceCategory[];

/** Label and tooltip per openness value, in display order (most open first). */
export const OPENNESS_META: Record<Openness, { label: string; tip: string }> = {
  "open-code-open-data": { label: "Open code and data", tip: "The code is under an open licence and the data or content it produces or serves is openly downloadable." },
  "open-code": { label: "Open code", tip: "The code is under an open licence; the project is a tool rather than a dataset." },
  "open-weights": { label: "Open weights", tip: "A trained model whose weights can be downloaded without a request form." },
  "open-data": { label: "Open data", tip: "A dataset or database that is openly downloadable, whether or not it has code." },
  "open-hardware": { label: "Open hardware", tip: "Design files under an open hardware licence, so the device can be built and modified." },
  "open-standard": { label: "Open standard", tip: "A specification, data model or vocabulary anyone may implement." },
  "open-content": { label: "Open content", tip: "Text, courses or lists released for reuse." },
  "open-code-closed-data": { label: "Open code, closed data", tip: "The code is open but the data it was built on, or the data it needs to run, is licensed or access-controlled." },
  "gated-weights": { label: "Gated weights", tip: "Model weights released behind a request form or a non-commercial licence." },
  "access-controlled-data": { label: "Access-controlled data", tip: "Data shared with researchers on application under a data use agreement; not open, but on record because the field depends on it." },
};

export const OPENNESS_ORDER = Object.keys(OPENNESS_META) as Openness[];

export type LicenceFamily = "Permissive" | "Copyleft" | "Network copyleft" | "Creative Commons" | "Public domain" | "Open hardware" | "Custom or other" | "None stated" | "Not stated";

export const LICENCE_FAMILY_ORDER: LicenceFamily[] = ["Permissive", "Copyleft", "Network copyleft", "Creative Commons", "Public domain", "Open hardware", "Custom or other", "None stated", "Not stated"];

export const LICENCE_FAMILY_TIP: Record<LicenceFamily, string> = {
  Permissive: "MIT, Apache-2.0, BSD and similar: reuse in anything, including closed products, with attribution.",
  Copyleft: "GPL, LGPL, MPL, EUPL: modifications that are distributed must stay open under the same terms.",
  "Network copyleft": "AGPL-3.0: like the GPL, and running it as a service also counts as distribution.",
  "Creative Commons": "CC BY and its variants; non-commercial (NC) and no-derivatives (ND) clauses restrict reuse.",
  "Public domain": "CC0 or a public domain dedication: no conditions.",
  "Open hardware": "CERN OHL and similar licences for design files.",
  "Custom or other": "The repository declares terms GitHub does not map to an SPDX id; read its LICENSE file before reuse.",
  "None stated": "No licence file in the repository: by default all rights are reserved, however public the code.",
  "Not stated": "A project page (not a repository) that did not name a licence when fetched.",
};

/** Family of an SPDX id or one of the three placeholder values. */
export function licenceFamily(licence: string): LicenceFamily {
  if (licence === "custom") return "Custom or other";
  if (licence === "none stated") return "None stated";
  if (licence === "not stated") return "Not stated";
  if (/^CC0|^Unlicense|public domain/i.test(licence)) return "Public domain";
  if (/^CC-BY/i.test(licence)) return "Creative Commons";
  if (/^CERN-OHL|^TAPR/i.test(licence)) return "Open hardware";
  if (/^AGPL/i.test(licence)) return "Network copyleft";
  if (/^GPL|^LGPL|^MPL|^EUPL|^EPL|^CECILL|^OSL/i.test(licence)) return "Copyleft";
  return "Permissive";
}

/** Activity bucket from the last push date: "2026", "2025", ... or "Page" for non-repository records. */
export function activeYear(p: OpenSourceProject): string {
  return p.lastCommit ? p.lastCommit.slice(0, 4) : "Page";
}

const byStars = (a: OpenSourceProject, b: OpenSourceProject) => (b.stars ?? -1) - (a.stars ?? -1) || a.name.localeCompare(b.name, "en", { sensitivity: "base" });

export function openSourceForTechnology(technologyId: string): OpenSourceProject[] {
  return openSourceProjects.filter((p) => p.technologies.includes(technologyId)).sort(byStars);
}

export function openSourceForDataSource(dataSourceId: string): OpenSourceProject[] {
  return openSourceProjects.filter((p) => p.dataSources.includes(dataSourceId)).sort(byStars);
}

export function openSourceForCollection(collectionId: string): OpenSourceProject[] {
  return openSourceProjects.filter((p) => p.collections.includes(collectionId)).sort(byStars);
}

export function openSourceForCancer(cancerId: string): OpenSourceProject[] {
  return openSourceProjects.filter((p) => p.cancers.includes(cancerId)).sort(byStars);
}

export function openSourceForMaintainer(entityId: string): OpenSourceProject[] {
  return openSourceProjects.filter((p) => p.maintainerId === entityId).sort(byStars);
}

/** Deep link into the browser filtered to one facet value. */
export function openSourceLink(facet: string, value: string): string {
  return `/open-source/?${encodeURIComponent(facet)}=${encodeURIComponent(value)}`;
}
