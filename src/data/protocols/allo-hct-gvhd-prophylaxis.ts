import { protocol } from "./helpers";

/*
 * Choosing graft-versus-host disease (GVHD) prophylaxis for an allogeneic haematopoietic cell transplant.
 *
 * First written 11 November 2026. Second accuracy pass, 17 November 2026: every source fetched again as raw text and
 * every claim re-read against it.
 * - EBMT 2024 updated consensus recommendations on prophylaxis and management of GVHD (Penack et al., Lancet
 *   Haematology 2024;11:e147-e159): abstract only, from the Europe PMC REST API; not in PubMed Central, and
 *   thelancet.com answered 403 to one request. This edition supersedes the EBMT 2020 recommendations (Lancet
 *   Haematology 2020, 10.1016/S2352-3026(19)30256-X; also abstract only, also 403), which are not cited. No newer
 *   EBMT edition is in Europe PMC or Crossref.
 * - ABHH/SBTMO systematic evidence-based recommendations on GVHD prophylaxis (Hematology, Transfusion and Cell Therapy
 *   2026): open access, full text XML from the Europe PMC REST API (PMC13382006), all eleven PICO questions and the
 *   closing summary read. Supplementary forest plots were not read.
 * - BMT CTN 1703 (Bolanos-Meade et al., NEJM 2023): now read in full. The first pass had the abstract only; the
 *   author manuscript is in PubMed Central (PMC10575613) and was fetched as XML through NCBI E-utilities (the Europe
 *   PMC full-text endpoint answered 500). Its supplementary tables were not read. The quote on the page is the
 *   abstract's sentence as Europe PMC prints it.
 * - BMT CTN 1703 two-year report (Journal of Clinical Oncology 2025): abstract only, from Europe PMC. New on this pass.
 * - Orencia (abatacept) US prescribing information: DailyMed SPL XML, version 35. New on this pass, for the licensed
 *   indication and dose.
 * DOIs resolved through Crossref and Europe PMC. Quotes checked by script against the raw text
 * (a script kept in the checker's scratch folder).
 *
 * OnCo's technology record `gvhd-prophylaxis` explains the drugs and the trial evidence; this protocol is the choice
 * of regimen as the guidelines set it out.
 * Doses independently re-read on 17 November 2026 against the BMT CTN 1703 full text (PubMed Central author
 * manuscript), the ABHH/SBTMO 2026 full text and the Orencia label fetched again from DailyMed; the gap on tacrolimus
 * now gives the starting doses the trial prints.
 */
export const alloHctGvhdProphylaxis = protocol({
  id: "allo-hct-gvhd-prophylaxis",
  name: "GVHD prophylaxis after allogeneic stem cell transplant: choosing the regimen",
  aka: ["GvHD prophylaxis regimen", "post-transplant cyclophosphamide", "PTCy", "ATG prophylaxis", "calcineurin inhibitor and methotrexate", "tacrolimus and mycophenolate"],
  domain: "cell-therapy-toxicity",
  tldr: "After a donor transplant, people take medicines to stop the donor's immune cells attacking their body (graft-versus-host disease). The combination depends on the donor, the pre-transplant treatment and whether the cells came from blood or marrow. Newer combinations reduce graft-versus-host disease; in the main trial they did not lengthen life, and each has its own side effects.",
  simple: "After a donor transplant you take medicines to stop the donor cells attacking your body. Your team chooses the combination that suits your donor and treatment.",
  summary: "EBMT 2024 (GRADE, ten PICO questions, 22 experts and a methodologist; abstract read): rabbit anti-T-cell globulin (ATG) or post-transplantation cyclophosphamide (PTCy) is standard prophylaxis in peripheral blood stem cell transplants from unrelated donors; ruxolitinib is the new standard for steroid-refractory acute and chronic GVHD; belumosudil is added for steroid-refractory chronic GVHD. The panel states its recommendations favour European practice.\n\nBMT CTN 1703 (phase III, 431 adults at 37 US centres, median age 66, peripheral blood grafts after reduced-intensity conditioning, matched sibling or 8/8 or 7/8 matched unrelated donors; full text read) calls a calcineurin inhibitor plus methotrexate a standard prophylaxis and tested PTCy against it. Experimental arm: cyclophosphamide 50 mg/kg a day on days 3 and 4 after transplant with mesna and hydration, then from day 5 tacrolimus and mycophenolate mofetil (15 mg/kg a dose, not more than 1 g three times a day, until day 35). Standard arm: tacrolimus from 3 days before transplant with intravenous methotrexate 15 mg/m² on day 1 and 10 mg/m² on days 3, 6 and 11. In both arms the tacrolimus taper could start on day 90, aiming to stop by day 180. Adjusted GVHD-free, relapse-free survival at one year was 52.7% against 34.9% (HR 0.64, 95% CI 0.49 to 0.83; 98 events among 214 patients against 135 among 217). Grade III or IV acute GVHD 6.3% against 14.7%; chronic GVHD at 12 months 21.9% against 35.1%; grade 2 or 3 infection at one year 40.0% against 30.4%, the difference lying in grade 2 infections. Overall and disease-free survival, relapse and transplant-related death were similar. ATG was not allowed, and 3.5% of patients had a 7/8 donor. At two years GVHD-free, relapse-free survival was 42.4% against 28.8% (follow-up report, abstract read).\n\nABHH/SBTMO 2026 (GRADE systematic review, 11 PICO questions, 54 studies): after myeloablative conditioning from a matched donor, ciclosporin or tacrolimus with methotrexate is a therapeutic option to reduce acute GVHD, with no proven reduction in mortality (very low quality); a calcineurin inhibitor with mycophenolate can be recommended instead for less mucositis and, with tacrolimus, less toxicity; adding rabbit ATG to standard prophylaxis is recommended; after reduced-intensity conditioning a calcineurin inhibitor with mycophenolate can be recommended for a lower risk of death, despite higher risks of acute and chronic GVHD; for haploidentical donors, high-dose PTCy (50 mg/kg on days +3 and +4) with a calcineurin inhibitor with or without mycophenolate gave less haemorrhagic cystitis and sinusoidal obstruction syndrome than PTCy with sirolimus and mycophenolate; in matched donors high-dose PTCy reduced chronic GVHD (randomised trials) with more haemorrhagic cystitis (cohorts); PTCy with ATG raises EBV reactivation; abatacept added to a calcineurin inhibitor and methotrexate is reported to lower grade III to IV acute GVHD (very low quality).",
  asOf: "2026-11-17",
  setting: {
    who: ["doctor", "pharmacist", "multidisciplinary-team"],
    where: ["ward"],
  },
  population: "People receiving an allogeneic haematopoietic cell transplant for a haematological cancer. BMT CTN 1703 enrolled adults aged 18 or over and says its data apply only to adults. The EBMT 2024 abstract and ABHH/SBTMO 2026 do not state an age range. The abatacept label covers adults and children aged 2 and over. Paediatric practice is otherwise not covered by the sources read.",
  trigger: "Planning an allogeneic transplant, once donor type, conditioning intensity and graft source are known.",
  steps: [
    {
      action: "Choose the prophylaxis regimen by donor type, conditioning intensity and graft source",
      why: "The preferred combination differs between a sibling, an unrelated or a half-matched donor, by how strong the pre-transplant treatment is, and between blood and marrow grafts.",
      source: "abhh-sbtmo-2026",
      quote: "The choice of GvHD prophylaxis should therefore be guided by donor type (matched sibling, matched unrelated, or haploidentical), conditioning regimen (myeloablative versus non-myeloablative/reduced intensity), and graft source (peripheral blood or bone marrow).",
    },
    {
      action: "For a peripheral blood transplant from an unrelated donor, include rabbit antithymocyte globulin or post-transplant cyclophosphamide",
      why: "The European transplant society names either one as standard prophylaxis in this setting. Only the abstract could be read, so the strength of the recommendation and the doses are not given here.",
      source: "ebmt-gvhd-2024",
      quote: "(2) use of rabbit anti-T-cell (thymocyte) globulin or post-transplantation cyclophosphamide as standard GVHD prophylaxis in peripheral blood stem-cell transplantations from unrelated donors",
    },
    {
      action: "After reduced-intensity conditioning with a peripheral blood graft from a matched donor, consider post-transplant cyclophosphamide with tacrolimus and mycophenolate rather than tacrolimus and methotrexate",
      why: "In a randomised trial in adults, more people were alive at one year without severe acute GVHD, chronic GVHD needing immune-suppressing treatment or relapse (52.7% against 34.9%). Overall survival was similar, and grade 2 infections were more common.",
      source: "bmt-ctn-1703",
      quote: "Among patients undergoing allogeneic HLA-matched HSCT with reduced-intensity conditioning, GVHD-free, relapse-free survival at 1 year was significantly more common among those who received cyclophosphamide-tacrolimus-mycophenolate mofetil than among those who received tacrolimus-methotrexate.",
    },
    {
      action: "For a haploidentical donor on high-dose post-transplant cyclophosphamide (50 mg/kg on days +3 and +4), pair it with a calcineurin inhibitor, with or without mycophenolate, rather than with sirolimus and mycophenolate",
      why: "Compared with the sirolimus-based version, it caused less bleeding from the bladder and less blockage of the small veins of the liver, with no significant difference in GVHD or survival.",
      source: "abhh-sbtmo-2026",
      quote: "In patients undergoing haploidentical allo-HCT for malignant diseases, using either myeloablative or non-myeloablative conditioning and bone marrow or peripheral blood grafts, a regimen with high-dose PTCy plus CNI with or without MMF, compared with high-dose PTCy plus sirolimus and MMF, reduces hemorrhagic cystitis and sinusoidal obstructive syndrome risks, despite showing no significant differences in the risk of Grade II–IV or III–IV aGvHD, cGvHD, NRM, OS, or EFS.",
    },
    {
      action: "After myeloablative conditioning from a matched donor, a calcineurin inhibitor with mycophenolate may be preferred to one with methotrexate",
      why: "The Brazilian review found GVHD, relapse and deaths comparable, with less mucositis (a sore, ulcerated mouth and gut) and, with tacrolimus, less kidney damage and respiratory failure.",
      source: "abhh-sbtmo-2026",
      quote: "However, the combination with MMF can be recommended due to lower toxicity (nephrotoxicity and respiratory failure), particularly with tacrolimus and the lower incidence of mucositis (regardless of cyclosporine and tacrolimus), when compared to the combination with methotrexate.",
      grade: "Quality of Evidence: varied between very low and moderate",
    },
    {
      action: "Add rabbit antithymocyte globulin to standard prophylaxis for peripheral blood transplants from a matched sibling or unrelated donor (ABHH/SBTMO 2026)",
      why: "It reduced acute GVHD in pooled studies, with no significant difference in overall survival.",
      source: "abhh-sbtmo-2026",
      quote: "In patients undergoing allo-HCT, the use of rATG in combination with standard GvHD prophylaxis is recommended over standard prophylaxis alone.",
      grade: "Quality of Evidence: ranged from very low to moderate",
    },
    {
      action: "Take the higher risk of Epstein-Barr virus reactivation into account when combining post-transplant cyclophosphamide with antithymocyte globulin",
      why: "In pooled studies the combination lowered grade II to IV acute GVHD and chronic GVHD but raised the risk of the Epstein-Barr virus (EBV) reactivating. The review reports the risk and does not say how to monitor for it.",
      source: "abhh-sbtmo-2026",
      quote: "In patients undergoing allo-HCT with haploidentical, related or unrelated matched donors or unrelated mismatched donors, the regimen combining high-dose PTCy plus ATG is associated with reduced risks of Grade II-IV aGvHD, and cGvHD, as well an increased risk of EBV reactivation when compared with other regimens lacking this combination.",
    },
  ],
  bestInClass: {
    statement: "EBMT 2024 is the current European standard (GRADE, ten PICO questions) and makes rabbit ATG or PTCy standard for unrelated-donor peripheral blood transplants; only its abstract could be read. BMT CTN 1703 is the one phase III trial read: in adults given peripheral blood grafts after reduced-intensity conditioning, PTCy-tacrolimus-mycophenolate improved GVHD-free, relapse-free survival over tacrolimus-methotrexate at one and two years, without a difference in overall survival at one year. ABHH/SBTMO 2026 is the most recent full GRADE systematic review read; it rates its evidence from very low to moderate, names the predominance of observational studies as a limit, and says its recommendations are particularly relevant for low- and middle-income countries. It also says it did not address which regimen is best for each clinical context. None of the sources read names one regimen as best for every transplant.",
    sources: ["ebmt-gvhd-2024", "bmt-ctn-1703", "bmt-ctn-1703-2yr", "abhh-sbtmo-2026"],
  },
  variants: [
    {
      name: "Abatacept with a calcineurin inhibitor and methotrexate (ABHH/SBTMO 2026; US label)",
      differs: "Adds abatacept to a calcineurin inhibitor and methotrexate for matched or mismatched unrelated donors. The US label licenses it for adults and children aged 2 and over having a transplant from a matched or 1 allele-mismatched unrelated donor: from age 6, 10 mg/kg (at most 1,000 mg) as a 60-minute intravenous infusion on the day before transplant and on days 5, 14 and 28 after it; from 2 to under 6 years, 15 mg/kg on the day before and 12 mg/kg on days 5, 14 and 28. The label says to give antiviral prophylaxis against EBV reactivation before the first dose and for six months after transplant.",
      evidence: "ABHH/SBTMO 2026, citing randomised trials: a 28% risk reduction in grade III to IV acute GVHD at three months and a 12% risk reduction in relapse at 24 months, no significant difference in chronic GVHD or overall survival; quality of evidence very low. The US label reads the randomised 8 of 8 matched cohort differently: at day 180, abatacept did not significantly improve survival free of grade III to IV acute GVHD (87% against 75%; HR 0.55, 95% CI 0.26 to 1.18; 73 and 69 patients), while survival free of grade II to IV acute GVHD (50% against 32%; HR 0.54, 0.35 to 0.83) and overall survival (97% against 84%; HR 0.33, 0.12 to 0.93) were better. Post-transplant lymphoproliferative disorder, all EBV-associated, occurred in 4 of 116 patients given abatacept.",
      sources: ["abhh-sbtmo-2026", "orencia-label"],
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
    { claim: "Ciclosporin or tacrolimus with methotrexate after myeloablative matched-donor transplant", grade: "Quality of Evidence: Very Low", source: "abhh-sbtmo-2026", quote: "For patients undergoing myeloablative allo-HCT with related or unrelated matched donors, the use of cyclosporine plus methotrexate is a therapeutic option for reducing the risk of aGvHD." },
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
      gradingScheme: "GRADE applied to ten PICO questions, with the wording and strength of recommendations voted in two consensus meetings; the abstract does not give the strength of each recommendation.",
      read: "abstract",
      accessed: "2026-11-17",
    },
    {
      key: "bmt-ctn-1703",
      label: "Post-Transplantation Cyclophosphamide-Based Graft-versus-Host Disease Prophylaxis (BMT CTN 1703, NCT03959241)",
      publisher: "New England Journal of Medicine",
      year: 2023,
      url: "https://europepmc.org/article/PMC/PMC10575613",
      doi: "10.1056/NEJMoa2215943",
      gradingScheme: "Randomised phase III trial; not a graded recommendation.",
      read: "full-text",
      accessed: "2026-11-17",
    },
    {
      key: "bmt-ctn-1703-2yr",
      label: "Improved Patient-Reported Outcomes With Post-Transplant Cyclophosphamide: A Quality-of-Life Evaluation and 2-Year Outcomes of BMT CTN 1703",
      publisher: "Journal of Clinical Oncology",
      year: 2025,
      url: "https://europepmc.org/abstract/MED/39752608",
      doi: "10.1200/JCO.24.00921",
      gradingScheme: "Companion report of a randomised phase III trial; not a graded recommendation.",
      read: "abstract",
      accessed: "2026-11-17",
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
      accessed: "2026-11-17",
    },
    {
      key: "orencia-label",
      label: "Orencia (abatacept) US prescribing information, DailyMed (E.R. Squibb & Sons; SPL version 35, effective 13 November 2025)",
      publisher: "E.R. Squibb & Sons / US FDA (DailyMed)",
      year: 2025,
      url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=0836c6ac-ee37-5640-2fed-a3185a0b16eb",
      gradingScheme: "Regulatory labelling; not graded.",
      read: "full-text",
      accessed: "2026-11-17",
    },
  ],
  upgrades: [],
  gaps: [
    "The EBMT 2024 recommendations could be read only as their abstract: on 17 November 2026 the journal page answered 403 and no open copy was found. The strength of each recommendation, the doses, and the advice for matched sibling and haploidentical donors are not stated here. The same is true of the EBMT 2020 edition it replaces, so the levels of consensus printed in either edition could not be checked.",
    "No source read prints target blood levels for ciclosporin or tacrolimus, or a dose of antithymocyte globulin by product. BMT CTN 1703 reports tacrolimus started 'in accordance with institutional practices', by mouth at 0.05 to 0.06 mg/kg a day or intravenously at 0.02 to 0.03 mg/kg a day, and prints no target level; these are the trial's protocol doses, not a recommendation. ABHH/SBTMO 2026 splits rabbit ATG at 6 mg/kg without naming the product, although the trials it pools carry both thymoglobulin and anti-T-lymphocyte globulin in their titles, so no ATG dose is given on this page.",
    "The methotrexate doses and the tacrolimus taper on this page are those of one trial (BMT CTN 1703), which reports them as its protocol and does not recommend them; its supplementary tables, including other toxic effects, were not read. The two-year results come from the abstract of the follow-up report.",
    "ABHH/SBTMO 2026 is internally inconsistent on antithymocyte globulin: the evidence synthesis and the recommendation find the chronic GVHD reduction significant only in the high-dose subgroup, while the closing summary says the low-dose subgroup. The supplementary forest plots that would settle it were not read.",
    "ABHH/SBTMO 2026 calls GVHD outcomes comparable between mycophenolate and methotrexate after myeloablative conditioning, yet for the one tacrolimus trial behind its toxicity finding (reduced-dose methotrexate with mycophenolate against full-dose methotrexate) it also reports a higher incidence of grade III to IV acute GVHD.",
    "ABHH/SBTMO 2026 and the US abatacept label disagree on whether abatacept lowers grade III to IV acute GVHD and on overall survival; both readings are given under the variant. The trial reports themselves were not read.",
    "ABHH/SBTMO 2026 reports that post-transplant cyclophosphamide with antithymocyte globulin raises EBV reactivation but gives no monitoring schedule, and no source read gives one for that combination.",
    "A second randomised trial of post-transplant cyclophosphamide, with ciclosporin (New England Journal of Medicine 2025), is among the trials ABHH/SBTMO 2026 pools and was not read.",
    "No ASTCT, NCCN or NICE guidance on GVHD prophylaxis was read; US and UK practice may differ from the European and Brazilian recommendations.",
    "Paediatric prophylaxis is not covered by the sources read, apart from the abatacept label's doses for children.",
  ],
  drugs: ["cyclophosphamide", "methotrexate", "sirolimus"],
  technologies: ["allogeneic-hsct", "gvhd-prophylaxis"],
  terms: ["gvhd", "conditioning-regimen"],
  related: ["gvhd-ruxolitinib-steroid-refractory"],
  tags: ["protocol", "cell-therapy", "transplant", "gvhd"],
});
