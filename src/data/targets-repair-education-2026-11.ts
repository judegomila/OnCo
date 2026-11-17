/**
 * Source-scoped teaching for the existing KEAP1 owner. Generated gene records yield
 * to handwritten targets in src/data/index.ts. Inherit its identity/catalogue fields;
 * keep the generated file and the existing lung supplement unchanged.
 */
import type { TargetInput } from "@/lib/schema";
import { targetsGenesWave } from "./targets-genes-wave";

const keap1 = targetsGenesWave.find((record) => record.id === "keap1");
if (!keap1) throw new Error("The KEAP1 education supplement needs its generated canonical owner");

export const repairEducationTargets: TargetInput[] = [{
  ...keap1,
  "tldr": "KEAP1 helps a protein-tagging complex control the NRF2 stress response. A KEAP1 variant, an NRF2 output and a cancer cell’s dependence on that response are separate findings.",
  "summary": "NFE2L2 encodes NRF2, a transcription factor; KEAP1 is an adaptor linking it to a CUL3-containing ubiquitin-ligase complex. Under suitable unstressed conditions, tagging promotes NRF2 degradation. Reduced turnover can make more NRF2 available for nuclear stress-defense programs. Protein turnover, nuclear output, protection against a stressor and survival dependence require separate measurements.\n\nZhang's biochemical and cell experiments found stress-associated inhibition of NRF2 ubiquitination without disruption of every KEAP1-NRF2 association. The lesson's paired conditions depict altered turnover, not creation of NRF2 or a mandatory physical latch release. CUL3 is a scaffold used with other adaptors and substrates, so a CUL3 change cannot be assigned an NRF2 effect from its name alone.\n\nIn a fictional culture, high NQO1 RNA, nuclear NRF2, several responsive proteins and reduced readouts after controlled KEAP1 restoration support a regulatory consequence. Test survival under a defined stress separately, using a specific NRF2 perturbation, matched controls and appropriate restoration to assess dependence. Stronger defenses may confer resistance; their abundance does not demonstrate ferroptosis sensitivity or benefit from an NRF2-directed therapy.\n\nSingh sequenced 54 non-small-cell lung tumors and found KEAP1 mutations in ten, about 19%, alongside a separate 12-cell-line analysis. This cohort proportion is not a universal lung-cancer prevalence. Vartanian's proteomic study in A549 and other cell experiments found that brusatol broadly inhibited protein synthesis, so lower NRF2 after that compound does not establish selective engagement. Use cell identity, preservation, timing, several outputs and general-translation controls; no universal NRF2-high treatment cutoff follows.",
  "links": [
  {
    "label": "HGNC HGNC:23177",
    "url": "https://www.genenames.org/data/gene-symbol-report/#!/hgnc_id/HGNC:23177"
  },
  {
    "label": "UniProt Q14145",
    "url": "https://www.uniprot.org/uniprotkb/Q14145/entry"
  },
  {
    "label": "NCBI Gene 9817",
    "url": "https://www.ncbi.nlm.nih.gov/gene/9817"
  },
  {
    "label": "Ensembl ENSG00000079999",
    "url": "https://www.ensembl.org/Homo_sapiens/Gene/Summary?g=ENSG00000079999"
  },
  {
    "label": "Oxidative stress sensor Keap1 functions as an adaptor for Cul3-based E3 ligase to regulate proteasomal degradation of Nrf2. (2004; primary evidence)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/15282312/"
  },
  {
    "label": "Keap1 is a redox-regulated substrate adaptor protein for a Cul3-dependent ubiquitin ligase complex. (2004; primary evidence)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/15572695/"
  },
  {
    "label": "Oncogene-induced Nrf2 transcription promotes ROS detoxification and tumorigenesis. (2011; primary evidence)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/21734707/"
  },
  {
    "label": "Dysfunctional KEAP1-NRF2 interaction in non-small-cell lung cancer. (2006; primary evidence)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/17020408/"
  },
  {
    "label": "Application of Mass Spectrometry Profiling to Establish Brusatol as an Inhibitor of Global Protein Synthesis. (2016; primary evidence)",
    "url": "https://pubmed.ncbi.nlm.nih.gov/26711467/"
  }
],
  "asOf": "2026-11-10",
  provenance: { ...keap1.provenance, editedBy: "OnCo repair and signalling education audit; generated identity and catalogue fields preserved", editedOn: "2026-11-10" },
}];
