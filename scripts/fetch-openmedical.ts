/**
 * Pull the oncology-relevant entries of the Open Medical Registry (https://openmedical.sh/, MIT-licensed corpus of
 * open-source medical projects) and write src/data/openmedical.ts, a snapshot keyed to OnCo fronts (sections) and,
 * where the record makes it obvious, technologies and cancers.
 *
 * The registry publishes its whole corpus as static JSON (https://openmedical.sh/api):
 *   https://openmedical.sh/v1/registry.json        every entry, full records
 *   https://openmedical.sh/v1/entries/<id>.json     one entry
 * Record pages live at https://openmedical.sh/registry/<category>/<id>/.
 *
 * The mapping below is hand-curated: each id was chosen after reading the registry record (name, summary, tags,
 * licence, status) and mapped to the fronts it serves. Entries not in CURATED are ignored, so re-running the script
 * refreshes names, blurbs, licences, links and the verified flag without changing what is listed. A record that has
 * disappeared from the registry is reported and dropped. Ids that do not resolve to an OnCo section, technology or
 * cancer fail the run.
 *
 * Run: npm run fetch:openmedical   (network; one request)
 */
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { sections } from "../src/data/sections";
import { technologies } from "../src/data/technologies";
import { cancers } from "../src/data/cancers";
import { blurbOf, licenceOf } from "../src/lib/openmedical-text";

const REGISTRY_URL = "https://openmedical.sh/v1/registry.json";
const RECORD_BASE = "https://openmedical.sh/registry";
const UA = "OnCo/1.0 (https://github.com/judegomila/OnCo; open tools panel)";

type Mapping = { sections: string[]; technologies?: string[]; cancers?: string[]; /** a sentence lifted from the record when its summary opens with a citation */ blurb?: string };

const BREAST = ["tnbc", "breast-hr-positive", "breast-her2-positive"];

/** Registry id -> OnCo fronts, technologies, cancers. Keep alphabetical within each block. */
const CURATED: Record<string, Mapping> = {
  // Imaging: viewers, archives, toolkits, reconstruction, open scanners
  "3d-slicer": { sections: ["imaging", "surgery"], technologies: ["ct", "mri"] },
  "ohif-viewers": { sections: ["imaging"] },
  "dcm4che": { sections: ["imaging"] },
  "weasis": { sections: ["imaging"] },
  "cornerstone3d": { sections: ["imaging", "ai-computation"] },
  "dicoogle": { sections: ["imaging"] },
  "mitk": { sections: ["imaging"] },
  "itk": { sections: ["imaging", "ai-computation"] },
  "invesalius3": { sections: ["imaging", "surgery"], technologies: ["ct", "mri"] },
  "osi2-one": { sections: ["imaging", "devices"], technologies: ["mri"] },
  "osii-mri": { sections: ["imaging", "devices"], technologies: ["mri"] },
  "ocra": { sections: ["imaging", "devices"], technologies: ["mri"] },
  "marcos-server": { sections: ["imaging", "devices"], technologies: ["mri"] },
  "bart": { sections: ["imaging"], technologies: ["mri"] },
  "gadgetron": { sections: ["imaging"], technologies: ["mri"] },
  "un0rick": { sections: ["imaging", "devices"], technologies: ["ultrasound"] },
  "echomods": { sections: ["imaging", "devices"], technologies: ["ultrasound"] },
  "pydicom": { sections: ["imaging", "ai-computation"] },
  "highdicom": { sections: ["imaging", "diagnostics"] },
  "dcmqi": { sections: ["imaging", "ai-computation"] },
  "pyradiomics": { sections: ["imaging", "ai-computation"] },
  "totalsegmentator-osirix-horos-plugin": { sections: ["imaging", "ai-computation"], technologies: ["ct"] },
  "monailabel": { sections: ["imaging", "ai-computation"] },
  "monai-deploy-app-sdk": { sections: ["imaging", "ai-computation"] },
  "nbia-toolkit": { sections: ["imaging", "ai-computation"] },
  "tcia-notebooks": { sections: ["imaging", "ai-computation"] },
  "mercure": { sections: ["imaging", "ai-computation"] },
  "karnak": { sections: ["imaging"] },
  "foundation-cancer-image-biomarker": { sections: ["imaging", "ai-computation"] },
  "eva": { sections: ["ai-computation", "imaging", "diagnostics"], technologies: ["pathology-foundation-model"] },
  // Imaging: tumour-specific segmentation and detection
  "raidionics": { sections: ["imaging", "ai-computation"], technologies: ["mri"], cancers: ["glioblastoma"] },
  "brats-toolkit": { sections: ["imaging", "ai-computation"], technologies: ["mri"], cancers: ["glioblastoma"] },
  "robustnpc": { sections: ["radiation", "imaging", "ai-computation"], technologies: ["mri"], cancers: ["head-and-neck"] },
  "picai-prep": { sections: ["imaging", "early-detection"], technologies: ["mri"], cancers: ["prostate"] },
  "trusglandsegmentation": { sections: ["imaging"], technologies: ["ultrasound"], cancers: ["prostate"] },
  // Nuclear medicine and PET
  "calculate-suv": { sections: ["imaging", "radiopharma"], technologies: ["pet", "spect"] },
  "gate": { sections: ["radiation", "radiopharma", "imaging"], technologies: ["pet", "spect"] },
  "mipsegmentatorv1": { sections: ["imaging", "radiopharma", "ai-computation"], technologies: ["pet"] },
  "ai4elife": { sections: ["imaging", "radiopharma", "ai-computation"], technologies: ["fdg-pet", "pet-ct"] },
  // Screening
  "victre-pipeline": { sections: ["early-detection", "imaging"], technologies: ["mammography"], cancers: BREAST },
  "breast-cancer-classifier": { sections: ["early-detection", "ai-computation"], technologies: ["mammography", "radiology-ai-screening"], cancers: BREAST },
  "gmic": { sections: ["early-detection", "ai-computation"], technologies: ["mammography", "radiology-ai-screening"], cancers: BREAST },
  "mammography-metarepository": { sections: ["early-detection", "ai-computation"], technologies: ["mammography", "radiology-ai-screening"], cancers: BREAST },
  "human-against-machine": { sections: ["early-detection", "ai-computation"], cancers: ["melanoma"] },
  "human-papillomavirus-hpv-detection-in-vaginal-self-samples": { sections: ["early-detection"], cancers: ["cervical"] },
  "silicone-breast-phantoms-for-use-with-digital-imaging-elasto": { sections: ["early-detection", "devices"], cancers: BREAST },
  // Pathology: slide viewers, formats, analysis toolkits, foundation models
  "qupath": { sections: ["diagnostics"], technologies: ["histopathology-ihc", "digital-pathology-ai"] },
  "camicroscope": { sections: ["diagnostics"], technologies: ["histopathology-ihc"] },
  "cytomine": { sections: ["diagnostics"], technologies: ["histopathology-ihc"] },
  "slim": { sections: ["diagnostics"], technologies: ["histopathology-ihc"] },
  "dicom-microscopy-viewer": { sections: ["diagnostics"], technologies: ["histopathology-ihc"] },
  "wsidicom": { sections: ["diagnostics"], technologies: ["histopathology-ihc"] },
  "pathml": { sections: ["diagnostics", "ai-computation"], technologies: ["digital-pathology-ai"] },
  "tiatoolbox": { sections: ["diagnostics", "ai-computation"], technologies: ["digital-pathology-ai"] },
  "clam": { sections: ["diagnostics", "ai-computation"], technologies: ["digital-pathology-ai"] },
  "cellvit": { sections: ["diagnostics", "ai-computation"], technologies: ["digital-pathology-ai"] },
  "stamp": { sections: ["diagnostics", "ai-computation"], technologies: ["digital-pathology-ai"] },
  "moozy": { sections: ["diagnostics", "ai-computation"], technologies: ["pathology-foundation-model"] },
  "hi-uni": { sections: ["diagnostics", "ai-computation"], technologies: ["pathology-foundation-model"], cancers: ["endometrial"] },
  "hips": { sections: ["diagnostics", "ai-computation"], technologies: ["digital-pathology-ai"], cancers: BREAST },
  "mutils-panoptic": { sections: ["diagnostics", "immunotherapy", "ai-computation"], technologies: ["digital-pathology-ai"], cancers: BREAST, blurb: "A panoptic segmentation approach for tumor-infiltrating lymphocyte assessment: development of the MuTILs model and PanopTILs dataset." },
  "prostate-cancer-detection": { sections: ["diagnostics", "ai-computation"], technologies: ["digital-pathology-ai"], cancers: ["prostate"] },
  "glass-ai": { sections: ["diagnostics", "ai-computation"], technologies: ["digital-pathology-ai"], cancers: ["nsclc"] },
  "survivmil-compayl": { sections: ["diagnostics", "ai-computation"], technologies: ["digital-pathology-ai"], cancers: ["neuroblastoma"] },
  "mcmicro": { sections: ["diagnostics"], technologies: ["single-cell-spatial"] },
  "deepspot": { sections: ["diagnostics", "ai-computation"], technologies: ["single-cell-spatial", "digital-pathology-ai"] },
  "immunopy": { sections: ["diagnostics"], technologies: ["histopathology-ihc"], cancers: BREAST },
  "openflexure-microscope": { sections: ["diagnostics", "devices"] },
  "uc2-git": { sections: ["diagnostics", "devices"] },
  // Haematology: flow cytometry
  "cytkit": { sections: ["diagnostics", "devices"] },
  "honeychrome": { sections: ["diagnostics"] },
  "gatelabr": { sections: ["diagnostics"] },
  // Genomics and bioinformatics
  "gatk": { sections: ["diagnostics"], technologies: ["wes-wgs"] },
  "gatk-sv": { sections: ["diagnostics"], technologies: ["wes-wgs"] },
  "sarek": { sections: ["diagnostics"], technologies: ["wes-wgs", "cgp"] },
  "balsamic": { sections: ["diagnostics"], technologies: ["cgp", "wes-wgs"] },
  "deepsomatic": { sections: ["diagnostics", "ai-computation"], technologies: ["wes-wgs"] },
  "clairs": { sections: ["diagnostics", "ai-computation"], technologies: ["wes-wgs"] },
  "open-cravat": { sections: ["diagnostics"], technologies: ["cgp"] },
  "maftools": { sections: ["diagnostics", "ai-computation"] },
  "sigprofilerextractor": { sections: ["diagnostics"] },
  "sigprofilermatrixgenerator": { sections: ["diagnostics"] },
  "discover": { sections: ["diagnostics"] },
  "arriba": { sections: ["diagnostics"], technologies: ["rna-seq"] },
  "dnafusion": { sections: ["diagnostics"], technologies: ["liquid-biopsy"] },
  "umiseq-variant-calling": { sections: ["diagnostics"], technologies: ["liquid-biopsy"] },
  "circdna": { sections: ["diagnostics"], technologies: ["wes-wgs"] },
  "mgp1000": { sections: ["diagnostics"], technologies: ["wes-wgs"], cancers: ["multiple-myeloma"] },
  "mtb-cbioportal": { sections: ["diagnostics", "ai-computation"] },
  "ucscxenatools": { sections: ["diagnostics", "ai-computation"] },
  "scevan": { sections: ["diagnostics"], technologies: ["single-cell-spatial"] },
  "cancerfoundation": { sections: ["ai-computation", "targeted-therapy"], technologies: ["single-cell-spatial"] },
  "openscpca-analysis": { sections: ["diagnostics", "ai-computation"], technologies: ["single-cell-spatial"] },
  "epimethex": { sections: ["epigenetics", "diagnostics"], technologies: ["methylation-profiling"] },
  "galaxy": { sections: ["diagnostics", "ai-computation"] },
  // Oncology data resources and standards
  "phenoncox": { sections: ["ai-computation", "diagnostics"] },
  "pharmoncox": { sections: ["targeted-therapy", "chemotherapy", "drug-discovery"] },
  "openoncology": { sections: ["targeted-therapy", "ai-computation"] },
  "fhir": { sections: ["ai-computation"] },
  "omop-cdm": { sections: ["ai-computation"] },
  "ohdsi-atlas": { sections: ["ai-computation"] },
  "vcf2fhir": { sections: ["ai-computation", "diagnostics"] },
  "genomics-operations": { sections: ["ai-computation", "diagnostics"] },
  "openmrs": { sections: ["ai-computation"] },
  "onconova": { sections: ["ai-computation", "diagnostics"] },
  "cancer-report-validator": { sections: ["ai-computation"] },
  "state-cancer-profile-scraper": { sections: ["prevention", "ai-computation"] },
  // Trials, decision support and patient tools
  "trialmatchai": { sections: ["ai-computation"], technologies: ["ai-trial-matching"] },
  "decider": { sections: ["drug-discovery", "ai-computation"] },
  "oncoteam": { sections: ["supportive-care"], technologies: ["ai-trial-matching"] },
  "oncofiles": { sections: ["supportive-care"] },
  "mlsym": { sections: ["supportive-care", "ai-computation"] },
  // Drug discovery, screening, repurposing
  "opentrons": { sections: ["drug-discovery"] },
  "cellpyability": { sections: ["drug-discovery"] },
  "chembl-webresource-client": { sections: ["drug-discovery"] },
  "synprotx": { sections: ["drug-discovery", "ai-computation"], technologies: ["ai-drug-design"] },
  "kg4sl": { sections: ["drug-discovery", "targeted-therapy"], technologies: ["synthetic-lethality-approaches"] },
  "metro": { sections: ["immunotherapy", "drug-discovery"], technologies: ["neoantigen-mrna-vaccine"] },
  // Radiotherapy: planning, dose, QA, DICOM-RT
  "pymedphys": { sections: ["radiation"], technologies: ["imrt-igrt"] },
  "portpy": { sections: ["radiation", "ai-computation"], technologies: ["imrt-igrt"] },
  "open-kbp": { sections: ["radiation", "ai-computation"], technologies: ["imrt-igrt"] },
  "dicomautomaton": { sections: ["radiation", "imaging"] },
  "linaqa": { sections: ["radiation", "imaging", "radiopharma"] },
  "rt-utils": { sections: ["radiation", "ai-computation"] },
  "pyradise": { sections: ["radiation", "ai-computation"] },
  "slicerradreirradiation": { sections: ["radiation"], technologies: ["imrt-igrt", "brachytherapy"] },
  "radcomp": { sections: ["radiation"], technologies: ["imrt-igrt", "brachytherapy"] },
  "star": { sections: ["radiation"], technologies: ["imrt-igrt"] },
  "comet": { sections: ["radiation", "ai-computation"] },
  // Surgery and reconstruction
  "rgb-based-behavior-cloning-dataset-for-surgical-robotics-99": { sections: ["surgery", "ai-computation"], technologies: ["robotic-surgery"] },
  "clinical-and-functional-outcomes-of-patient-specific-3d-prin": { sections: ["surgery"], cancers: ["head-and-neck"] },
  "oral-cancer-speech-corpus-for-the-paper-objective-speech-ou": { sections: ["supportive-care", "surgery"], cancers: ["head-and-neck"] },
  // Prevention and lifestyle
  "legliv": { sections: ["nutrition-lifestyle", "prevention"], cancers: ["hcc"] },
};

type RegistryEntry = {
  id: string; name: string; category: string; summary: string; license?: string[]; license_class?: string;
  homepage?: string; repo?: string; status: string; trust: "verified" | "imported" | "stale"; verified?: string | null;
};

export type OpenMedicalEntry = {
  id: string; name: string; url: string; homepage: string; category: string; licence: string; verified: boolean;
  blurb: string; sections: string[]; technologies?: string[]; cancers?: string[]; fetched: string;
};

async function fetchRegistry(): Promise<RegistryEntry[]> {
  for (let i = 0; i < 3; i++) {
    try {
      const r = await fetch(REGISTRY_URL, { headers: { "User-Agent": UA, Accept: "application/json" } });
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      const j = (await r.json()) as { entries: RegistryEntry[] };
      return j.entries;
    } catch (e) {
      if (i === 2) throw e;
      await new Promise((res) => setTimeout(res, 1500 * (i + 1)));
    }
  }
  return [];
}

async function main() {
  const sectionIds = new Set(sections.map((s) => s.id));
  const techIds = new Set(technologies.map((t) => t.id));
  const cancerIds = new Set(cancers.map((c) => c.id));
  const bad: string[] = [];
  for (const [id, m] of Object.entries(CURATED)) {
    for (const s of m.sections) if (!sectionIds.has(s)) bad.push(`${id}: section ${s}`);
    for (const t of m.technologies ?? []) if (!techIds.has(t)) bad.push(`${id}: technology ${t}`);
    for (const c of m.cancers ?? []) if (!cancerIds.has(c)) bad.push(`${id}: cancer ${c}`);
  }
  if (bad.length) { console.error(`Unknown OnCo ids in CURATED:\n  ${bad.join("\n  ")}`); process.exit(1); }

  const entries = await fetchRegistry();
  const byId = new Map(entries.map((e) => [e.id, e]));
  const today = new Date().toISOString().slice(0, 10);
  const out: OpenMedicalEntry[] = [];
  const missing: string[] = [];
  for (const [id, m] of Object.entries(CURATED)) {
    const e = byId.get(id);
    if (!e) { missing.push(id); continue; }
    const homepage = e.homepage || e.repo;
    if (!homepage) { missing.push(`${id} (no homepage or repo)`); continue; }
    out.push({
      id: e.id, name: e.name, url: `${RECORD_BASE}/${e.category}/${e.id}/`, homepage, category: e.category,
      licence: licenceOf(e.license), verified: e.trust === "verified", blurb: m.blurb ?? blurbOf(e.summary),
      sections: m.sections, ...(m.technologies ? { technologies: m.technologies } : {}), ...(m.cancers ? { cancers: m.cancers } : {}), fetched: today,
    });
  }
  out.sort((a, b) => a.name.localeCompare(b.name, "en", { sensitivity: "base" }));

  const body = `/**
 * Open-source projects relevant to oncology from the Open Medical Registry (https://openmedical.sh/), mapped to OnCo
 * fronts, technologies and cancers. GENERATED by scripts/fetch-openmedical.ts on ${today} from
 * ${REGISTRY_URL}; the mapping lives in that script. Do not edit by hand.
 *
 * The registry corpus is MIT-licensed; each project keeps its own licence, which the registry reports as best it
 * could verify. \`verified\` means a person at the registry checked the record, not that OnCo has. Blurbs are one
 * sentence of the registry summary with punctuation normalised.
 */
export type OpenMedicalEntry = {
  id: string; name: string; url: string; homepage: string; category: string; licence: string; verified: boolean;
  blurb: string; sections: string[]; technologies?: string[]; cancers?: string[]; fetched: string;
};

export const OPENMEDICAL_GENERATED = "${today}";
export const OPENMEDICAL_SITE = "https://openmedical.sh/";

export const openmedical: OpenMedicalEntry[] = ${JSON.stringify(out, null, 2)};
`;
  writeFileSync(join(process.cwd(), "src", "data", "openmedical.ts"), body);

  const perSection = new Map<string, number>();
  for (const e of out) for (const s of e.sections) perSection.set(s, (perSection.get(s) ?? 0) + 1);
  console.log(`openmedical: ${out.length} entries written (${out.filter((e) => e.verified).length} verified) from ${entries.length} registry records`);
  for (const s of sections) if (perSection.get(s.id)) console.log(`  ${s.id}: ${perSection.get(s.id)}`);
  if (missing.length) console.log(`not found in registry (dropped): ${missing.join(", ")}`);
}

main().catch((e) => { console.error(e); process.exit(1); });
