import type { EntityInput } from "@/lib/schema";

/** Public primary-source records; clinical phase is not a clinical efficacy claim. */
export const trop2PreclinicalWatch: EntityInput[] = [
  {
    "id": "catb-101",
    "name": "CATB-101",
    "kind": "drug",
    "modality": "ADC",
    "status": "preclinical",
    "asOf": "2026-10-06",
    "payload": "TOP1 inhibitor plus tubulin inhibitor",
    "mechanism": "Dual-payload anti-TROP2 antibody-drug conjugate delivering inhibitors of DNA processing and microtubule function.",
    "tldr": "CATB-101 is an experimental drug designed to carry chemotherapy to cancer cells. Its published evidence is from laboratory and animal studies.",
    "summary": "CatenaBio describes CATB-101 in AACR 2026 abstract 6928. The two payloads inhibit topoisomerase I and tubulin. Cell-derived and patient-derived xenografts and non-GLP monkey studies are preclinical evidence; they do not demonstrate efficacy or a safer therapeutic window in patients. The abstract supports development, without a human response or survival readout.",
    "targets": [
      "trop2"
    ],
    "companies": [
      "catenabio"
    ],
    "technologies": [
      "adc",
      "dual-payload-adc"
    ],
    "links": [
      {
        "label": "Publisher abstract",
        "url": "https://doi.org/10.1158/1538-7445.am2026-6928"
      }
    ],
    "tags": [
      "evidence:preclinical"
    ]
  },
  {
    "id": "cbb-120",
    "name": "CBB-120",
    "kind": "drug",
    "modality": "ADC",
    "status": "preclinical",
    "asOf": "2026-11-18",
    "payload": "TOP1 inhibitor plus ATR inhibitor",
    "mechanism": "Site-specific, Fc-silenced anti-TROP2 ADC delivering a TOP1 inhibitor and an ATR inhibitor to combine DNA damage with inhibition of its repair.",
    "tldr": "CBB-120 is an experimental drug designed to carry chemotherapy to cancer cells. Its published evidence is from laboratory and animal studies.",
    "summary": "AACR-NCI-EORTC 2025 abstract A124 describes CBB-120 with EGCit linkers and TOP1/ATR inhibitor payloads. Evidence includes cell assays, xenografts and cynomolgus-monkey toxicology. Tumor regressions and comparisons with single-payload ADCs were in models, not a randomized clinical comparison. On-target skin toxicity was observed in monkeys; clinical benefit and safety remain unestablished.",
    "targets": [
      "trop2"
    ],
    "technologies": [
      "adc",
      "dual-payload-adc"
    ],
    "links": [
      {
        "label": "Publisher abstract",
        "url": "https://doi.org/10.1158/1535-7163.targ-25-a124"
      }
    ],
    "tags": [
      "evidence:preclinical"
    ]
  },
  {
    "id": "ctph-03",
    "name": "CTPH-03",
    "kind": "drug",
    "modality": "ADC",
    "status": "preclinical",
    "asOf": "2026-10-06",
    "payload": "MMAE-based dual payload; second payload not disclosed in the cited abstract",
    "mechanism": "TROP2-directed ADC carrying an MMAE-based dual-payload combination; the other payload is not identified by the public abstract.",
    "tldr": "CTPH-03 is an experimental drug designed to carry chemotherapy to cancer cells. Its published evidence is from laboratory and animal studies.",
    "summary": "AACR 2026 abstract 4438 describes CTPH-03 using an MMAE-based dual-payload format. Evidence comprises cell assays, cell-derived xenografts, rodent and monkey pharmacokinetics, and preliminary animal toxicity. The abstract describes patient-derived xenograft and IND-enabling studies as preparation. Neither the second payload identity nor human efficacy or safety can be inferred from these findings.",
    "targets": [
      "trop2"
    ],
    "technologies": [
      "adc",
      "dual-payload-adc"
    ],
    "links": [
      {
        "label": "Publisher abstract",
        "url": "https://doi.org/10.1158/1538-7445.am2026-4438"
      }
    ],
    "tags": [
      "evidence:preclinical"
    ]
  },
  {
    "id": "can020",
    "name": "CAN020",
    "kind": "drug",
    "modality": "ADC",
    "status": "preclinical",
    "asOf": "2026-11-18",
    "payload": "TOP1 inhibitor plus PARP inhibitor",
    "mechanism": "TROP2-directed ADC carrying a topoisomerase I inhibitor and a PARP inhibitor on a cleavable StarLinker platform.",
    "tldr": "CAN020 is an experimental drug designed to carry chemotherapy to cancer cells. Its published evidence is from laboratory and animal studies.",
    "summary": "AACR Drug Discovery and Development 2026 abstract A014 describes CAN020 with TOP1 and PARP inhibitor payloads. Cell and xenograft findings support a DNA-damage and repair-inhibition strategy. Breast, ovarian and gastric tumor models were tested. The authors propose advancement to phase I; that proposal is not evidence of trial initiation or human benefit.",
    "targets": [
      "trop2"
    ],
    "technologies": [
      "adc",
      "dual-payload-adc"
    ],
    "links": [
      {
        "label": "Publisher abstract",
        "url": "https://doi.org/10.1158/1557-3265.d32026-a014"
      }
    ],
    "tags": [
      "evidence:preclinical"
    ]
  },
  {
    "id": "bcg033",
    "name": "BCG033",
    "kind": "drug",
    "modality": "ADC",
    "status": "preclinical",
    "asOf": "2026-10-06",
    "payload": "Separate tested constructs: vcMMAE (DAR 4) or TOP1 inhibitor BLD1102 (DAR 8)",
    "mechanism": "Bispecific PTK7/TROP2 antibody-drug conjugate, tested with different single-payload conjugates rather than two payloads in one molecule.",
    "tldr": "BCG033 is an experimental drug designed to carry chemotherapy to cancer cells. Its published evidence is from laboratory and animal studies.",
    "summary": "AACR 2024 abstract 2616 describes BCG033 targeting PTK7 and TROP2. A vcMMAE construct with DAR 4 was tested in breast and lung xenografts; a separate BLD1102 TOP1 inhibitor construct with DAR 8 was tested in colorectal xenografts. These are distinct constructs, not a demonstrated dual-payload ADC. The cited results are preclinical and do not establish patient benefit.",
    "targets": [
      "trop2",
      "ptk7"
    ],
    "technologies": [
      "adc",
      "bispecific-adc"
    ],
    "links": [
      {
        "label": "Publisher abstract",
        "url": "https://doi.org/10.1158/1538-7445.am2024-2616"
      }
    ],
    "tags": [
      "evidence:preclinical"
    ]
  },
  {
    "id": "ptk7",
    "kind": "target",
    "name": "PTK7",
    "symbol": "PTK7",
    "biology": "Cell-surface antigen studied for binding and internalization of antibody-drug conjugates; the cited BCG033 abstract describes co-targeting with TROP2.",
    "targetClass": "surface-antigen",
    "asOf": "2026-10-06",
    "tldr": "PTK7 is a cell-surface protein being studied as an address for cancer-directed treatments.",
    "summary": "AACR 2024 abstract 2616 describes PTK7 and TROP2 as the two antigens bound by BCG033. The cited antibody-drug conjugate evidence is from cell and xenograft models; it does not establish clinical benefit or a companion diagnostic.",
    "links": [
      {
        "label": "AACR 2024 BCG033 abstract",
        "url": "https://doi.org/10.1158/1538-7445.am2024-2616"
      },
      {
        "label": "HGNC PTK7 approved gene record",
        "url": "https://rest.genenames.org/fetch/symbol/PTK7"
      }
    ],
    "hgnc": "HGNC:9618",
    "entrez": "5754",
    "ensembl": "ENSG00000112655",
    "uniprot": "Q13308"
  }
];
