import { protocol } from "./helpers";

/*
 * Choosing graft-versus-host disease (GVHD) prophylaxis for an allogeneic haematopoietic cell transplant.
 *
 * What was read, and how (11 November 2026, fetched raw and read as text):
 * - EBMT 2024 updated consensus recommendations on prophylaxis and management of GVHD (Penack et al., Lancet
 *   Haematology 2024): abstract only, from the Europe PMC REST API; not in PubMed Central. This edition supersedes the
 *   EBMT 2020 recommendations (also abstract only), which are not cited.
 * - ABHH/SBTMO systematic evidence-based recommendations on GVHD prophylaxis (Hematology, Transfusion and Cell Therapy
 *   2026): open access, full text from Europe PMC (PMC13382006), all eleven PICO questions read. Supplementary
 *   forest plots were not read.
 * - BMT CTN 1703 (Bolanos-Meade et al., NEJM 2023): abstract only.
 * DOIs resolved through Europe PMC. Quotes checked by script against the raw text.
 *
 * OnCo's technology record `gvhd-prophylaxis` explains the drugs and the trial evidence; this protocol is the choice
 * of regimen as the guidelines set it out.
 */
export const alloHctGvhdProphylaxis = protocol({
  id: "allo-hct-gvhd-prophylaxis",
  name: "GVHD prophylaxis after allogeneic stem cell transplant: choosing the regimen",
  aka: ["GvHD prophylaxis regimen", "post-transplant cyclophosphamide", "PTCy", "ATG prophylaxis", "calcineurin inhibitor and methotrexate", "tacrolimus and mycophenolate"],
  domain: "cell-therapy-toxicity",
  tldr: "After a donor transplant, everyone takes medicines to stop the donor's immune cells attacking their body (graft-versus-host disease). The combination depends on the donor, the pre-transplant treatment and whether the cells came from blood or marrow. Newer combinations reduce graft-versus-host disease; in the main trial they did not lengthen life, and each has its own side effects.",
  simple: "After a donor transplant you take medicines to stop the donor cells attacking your body. Your team chooses the combination that suits your donor and treatment.",
  summary: "EBMT 2024 (GRADE, ten PICO questions, 22 experts and a methodologist; abstract read): rabbit anti-T-cell globulin (ATG) or post-transplantation cyclophosphamide (PTCy) is standard prophylaxis in peripheral blood stem cell transplants from unrelated donors; ruxolitinib is the new standard for steroid-refractory acute and chronic GVHD; belumosudil is added for steroid-refractory chronic GVHD. The panel states its recommendations favour European practice.\n\nBMT CTN 1703 (phase III, 431 adults, reduced-intensity conditioning, matched related or matched or 7/8 unrelated donors): PTCy-tacrolimus-mycophenolate mofetil gave more GVHD-free, relapse-free survival at one year than tacrolimus-methotrexate (52.7% against 34.9%; HR 0.64), with no substantial difference in overall or disease-free survival, relapse, transplant-related death or engraftment.\n\nABHH/SBTMO 2026 (GRADE systematic review, 11 PICO questions, 54 studies): calcineurin inhibitor plus methotrexate reduces acute GVHD (very low quality); calcineurin inhibitor plus mycophenolate can be preferred after myeloablative conditioning for less mucositis and toxicity; adding rATG is recommended; calcineurin inhibitor plus mycophenolate after reduced-intensity conditioning; high-dose PTCy (50 mg/kg days +3 and +4) with a calcineurin inhibitor with or without mycophenolate for haploidentical donors, and with reduced chronic GVHD in matched donors (RCTs) at the cost of more haemorrhagic cystitis (cohorts); PTCy with ATG raises EBV reactivation; abatacept added to calcineurin inhibitor and methotrexate lowers grade III to IV acute GVHD (very low quality).",
  asOf: "2026-11-11",
  setting: {
    who: ["doctor", "pharmacist", "multidisciplinary-team"],
    where: ["ward"],
  },
  population: "Adults receiving an allogeneic haematopoietic cell transplant for a haematological cancer. EBMT 2024 and ABHH/SBTMO 2026 address adults; paediatric practice is not covered by the sources read.",
  trigger: "Planning an allogeneic transplant, once donor type, conditioning intensity and graft source are known.",
  steps: [
    {
      action: "Choose the prophylaxis regimen by donor type, conditioning intensity and graft source",
      why: "The best-tested combination differs between a sibling, an unrelated or a half-matched donor, and between blood and marrow grafts.",
      source: "abhh-sbtmo-2026",
      quote: "The choice of GvHD prophylaxis should therefore be guided by donor type (matched sibling, matched unrelated, or haploidentical), conditioning regimen (myeloablative versus non-myeloablative/reduced intensity), and graft source (peripheral blood or bone marrow).",
    },
    {
      action: "For a peripheral blood transplant from an unrelated donor, include antithymocyte globulin or post-transplant cyclophosphamide",
      why: "Both reduce graft-versus-host disease in this setting and are the European standard.",
      source: "ebmt-gvhd-2024",
      quote: "(2) use of rabbit anti-T-cell (thymocyte) globulin or post-transplantation cyclophosphamide as standard GVHD prophylaxis in peripheral blood stem-cell transplantations from unrelated donors",
    },
    {
      action: "After reduced-intensity conditioning from a matched donor, consider post-transplant cyclophosphamide with tacrolimus and mycophenolate rather than tacrolimus and methotrexate",
      why: "In a randomised trial it gave more people a year free of severe GVHD and relapse, though survival was similar.",
      source: "bmt-ctn-1703",
      quote: "Among patients undergoing allogeneic HLA-matched HSCT with reduced-intensity conditioning, GVHD-free, relapse-free survival at 1 year was significantly more common among those who received cyclophosphamide-tacrolimus-mycophenolate mofetil than among those who received tacrolimus-methotrexate.",
    },
    {
      action: "For a haploidentical donor, give high-dose post-transplant cyclophosphamide (50 mg/kg on days +3 and +4) with a calcineurin inhibitor, with or without mycophenolate",
      why: "Compared with the sirolimus-based version, it caused less bladder bleeding and liver blockage, with the same GVHD control.",
      source: "abhh-sbtmo-2026",
      quote: "In patients undergoing haploidentical allo-HCT for malignant diseases, using either myeloablative or non-myeloablative conditioning and bone marrow or peripheral blood grafts, a regimen with high-dose PTCy plus CNI with or without MMF, compared with high-dose PTCy plus sirolimus and MMF, reduces hemorrhagic cystitis and sinusoidal obstructive syndrome risks, despite showing no significant differences in the risk of Grade II–IV or III–IV aGvHD, cGvHD, NRM, OS, or EFS.",
    },
    {
      action: "After myeloablative conditioning from a matched donor, a calcineurin inhibitor with mycophenolate may be preferred to one with methotrexate",
      why: "GVHD control is similar, with less mouth ulceration and less kidney and lung toxicity.",
      source: "abhh-sbtmo-2026",
      quote: "However, the combination with MMF can be recommended due to lower toxicity (nephrotoxicity and respiratory failure), particularly with tacrolimus and the lower incidence of mucositis (regardless of cyclosporine and tacrolimus), when compared to the combination with methotrexate.",
      grade: "Quality of evidence: very low to moderate",
    },
    {
      action: "Consider adding rabbit antithymocyte globulin to standard prophylaxis for matched sibling or unrelated peripheral blood transplants",
      why: "It reduced acute GVHD in pooled studies without a clear survival change.",
      source: "abhh-sbtmo-2026",
      quote: "In patients undergoing allo-HCT, the use of rATG in combination with standard GvHD prophylaxis is recommended over standard prophylaxis alone.",
      grade: "Quality of evidence: very low to moderate",
    },
    {
      action: "When post-transplant cyclophosphamide is combined with antithymocyte globulin, monitor for EBV reactivation",
      why: "The combination reduces GVHD but, in pooled studies, raised the risk of the Epstein-Barr virus reactivating.",
      source: "abhh-sbtmo-2026",
      quote: "In patients undergoing allo-HCT with haploidentical, related or unrelated matched donors or unrelated mismatched donors, the regimen combining high-dose PTCy plus ATG is associated with reduced risks of Grade II-IV aGvHD, and cGvHD, as well an increased risk of EBV reactivation when compared with other regimens lacking this combination.",
    },
  ],
  bestInClass: {
    statement: "EBMT 2024 is the current European standard (GRADE, ten PICO questions) and makes ATG or PTCy standard for unrelated-donor peripheral blood transplants; only its abstract could be read. BMT CTN 1703 is the one phase III trial read: PTCy-tacrolimus-mycophenolate improved GVHD-free, relapse-free survival over tacrolimus-methotrexate after reduced-intensity conditioning, without a survival difference. ABHH/SBTMO 2026 is the most recent full GRADE systematic review read; it reaches compatible conclusions but rates most evidence very low to moderate, mostly from observational studies, and is written with low- and middle-income settings in mind. None of the sources read names one regimen as best for every transplant: all tie the choice to donor, conditioning and graft source.",
    sources: ["ebmt-gvhd-2024", "bmt-ctn-1703", "abhh-sbtmo-2026"],
  },
  variants: [
    {
      name: "Abatacept with a calcineurin inhibitor and methotrexate (ABHH/SBTMO 2026)",
      differs: "Adds abatacept to calcineurin inhibitor and methotrexate for matched or mismatched unrelated donors.",
      evidence: "Randomised trials pooled by ABHH: 28% lower risk of grade III to IV acute GVHD at three months and 12% lower relapse at 24 months, no difference in chronic GVHD or survival. Quality of evidence: very low.",
      sources: ["abhh-sbtmo-2026"],
    },
    {
      name: "Triple prophylaxis with sirolimus after reduced-intensity conditioning (ABHH/SBTMO 2026)",
      differs: "Ciclosporin, mycophenolate and sirolimus for related or unrelated matched or mismatched donors.",
      evidence: "Lower grade II to IV acute GVHD and better two-year survival; quality of evidence very low to low.",
      sources: ["abhh-sbtmo-2026"],
    },
    {
      name: "Tacrolimus with sirolimus after myeloablative conditioning (ABHH/SBTMO 2026)",
      differs: "Replaces methotrexate with sirolimus alongside tacrolimus.",
      evidence: "Three pooled randomised trials showed no greater benefit than calcineurin inhibitor plus methotrexate for acute or chronic GVHD or mortality.",
      sources: ["abhh-sbtmo-2026"],
    },
  ],
  grades: [
    { claim: "CNI plus mycophenolate after myeloablative matched-donor transplant", grade: "Quality of evidence: varied between very low and moderate", source: "abhh-sbtmo-2026", quote: "Quality of Evidence: varied between very low and moderate, depending on the analyzed outcome." },
    { claim: "Adding rATG to standard prophylaxis", grade: "Quality of evidence: ranged from very low to moderate", source: "abhh-sbtmo-2026", quote: "Quality of Evidence: ranged from very low to moderate, depending on the outcome assessed." },
    { claim: "Abatacept plus CNI and methotrexate", grade: "Quality of evidence: very low", source: "abhh-sbtmo-2026" },
    { claim: "ATG or PTCy standard for unrelated-donor PBSC transplants", grade: "GRADE (strength not stated in the abstract)", source: "ebmt-gvhd-2024" },
  ],
  sources: [
    {
      key: "ebmt-gvhd-2024",
      label: "Prophylaxis and management of graft-versus-host disease after stem-cell transplantation for haematological malignancies: updated consensus recommendations of the European Society for Blood and Marrow Transplantation (2024)",
      publisher: "EBMT, The Lancet Haematology",
      year: 2024,
      url: "https://europepmc.org/abstract/MED/38184001",
      doi: "10.1016/S2352-3026(23)00342-3",
      gradingScheme: "GRADE applied to ten PICO questions, with recommendation strength voted in two consensus meetings; the abstract does not give the strength of each recommendation.",
      read: "abstract",
      accessed: "2026-11-11",
    },
    {
      key: "bmt-ctn-1703",
      label: "Post-Transplantation Cyclophosphamide-Based Graft-versus-Host Disease Prophylaxis (BMT CTN 1703, NCT03959241)",
      publisher: "New England Journal of Medicine",
      year: 2023,
      url: "https://europepmc.org/abstract/MED/37342922",
      doi: "10.1056/NEJMoa2215943",
      gradingScheme: "Randomised phase III trial; not a graded recommendation.",
      read: "abstract",
      accessed: "2026-11-11",
    },
    {
      key: "abhh-sbtmo-2026",
      label: "Prophylaxis of graft-versus-host-disease: systematic evidence-based recommendations of the Brazilian Association of Hematology, Hemotherapy and Cell Therapy (ABHH) and the Brazilian Society of Cellular Therapy and Bone Marrow Transplantation (SBTMO)",
      publisher: "ABHH and SBTMO, Hematology, Transfusion and Cell Therapy",
      year: 2026,
      url: "https://europepmc.org/article/PMC/PMC13382006",
      doi: "10.1016/j.htct.2026.106494",
      gradingScheme: "GRADE: quality of evidence printed per outcome and per recommendation as very low, low, moderate or high; recommendations are worded as 'recommended' or 'can be recommended' without a separate strength.",
      read: "full-text",
      accessed: "2026-11-11",
    },
  ],
  upgrades: [],
  gaps: [
    "The EBMT 2024 recommendations could be read only as their abstract: the strength of each recommendation, the doses, and the advice for matched sibling and haploidentical donors are not stated here.",
    "BMT CTN 1703 was read only as its abstract; its toxicity and infection data are not given.",
    "ABHH/SBTMO 2026 is internally inconsistent on antithymocyte globulin: the evidence synthesis finds the chronic GVHD reduction significant only in the high-dose subgroup, while the summary section says the low-dose subgroup. The supplementary forest plots that would settle it were not read.",
    "No ASTCT, NCCN or NICE guidance on GVHD prophylaxis was read; US and UK practice may differ from the European and Brazilian recommendations.",
    "Paediatric prophylaxis is not covered by the sources read.",
  ],
  drugs: ["cyclophosphamide", "methotrexate", "sirolimus"],
  technologies: ["allogeneic-hsct", "gvhd-prophylaxis"],
  terms: ["gvhd", "conditioning-regimen"],
  related: ["gvhd-ruxolitinib-steroid-refractory"],
  tags: ["protocol", "cell-therapy", "transplant", "gvhd"],
});
