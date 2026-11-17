import type { EntityInput, InstitutionInput } from "@/lib/schema";

/**
 * Montenegro: the two bodies behind /countries/me/ (wave 13) that the corpus did not hold. Both were written from
 * sources read raw on 16 November 2026: the Health Insurance Fund's list of medicines of October 2026 with its legend
 * and the Government decision that sets it, the medicines institute CInMED's register of approved clinical trials
 * (updated 6 July 2026), the Ministry of Health's draft National Cancer Control Programme of July 2011 (ICCP portal
 * copy) and a Ministry statement of 4 March 2026 as republished by the Medical CG portal. The Ministry's own site did
 * not answer a plain request on that day. Coordinates are approximate city points for Podgorica and Nikšić, not the
 * buildings.
 */
const asOf = "2026-11-16";
type I = Omit<InstitutionInput, "kind" | "asOf">;
const i = (x: I): InstitutionInput => ({ kind: "institution", asOf, ...x });

const FZO_LIST_OCT = "https://fzocg.me/wp-content/uploads/2026/10/Lista-ljekova-oktobar-2026.-godine.pdf";
const FZO_DECISION_OCT = "https://fzocg.me/wp-content/uploads/2026/10/Odluka-o-utvrdjivanju-osnovne-i-doplatne-oktobar-2026.g.pdf";
const NCCP_2011 = "https://www.iccp-portal.org/system/files/plans/MNE_B5_NACIONALNI%20PROGRAMza%20kontrolu%20raka.pdf";
const MOH_HPV_2026 = "https://medicalcg.me/04-mart-ministarstvo-zdravlja-dosljednom-vakcinacijom-protiv-hpv-ka-trajnom-smanjenju-tereta-malignih-bolesti/";
const CINMED_REGISTER = "https://cinmed.me/wp-content/uploads/2026/07/Registar-odobrenih-klinickih-ispitivanja-06072026.pdf";

const institutions: InstitutionInput[] = [
  i({ id: "ministry-of-health-montenegro", name: "Ministarstvo zdravlja Crne Gore", aka: ["Ministry of Health of Montenegro", "MZD"],
    city: "Podgorica", country: "ME", lat: 42.44, lng: 19.26, institutionType: "government", website: "https://www.gov.me/mzd",
    tldr: "Montenegro's health ministry. It proposes the list of medicines the public insurance fund pays for, which the Government adopts, and one of its commissions approves the medicines that list marks with the code K.",
    summary: "The Government of Montenegro adopted the decision setting the basic and supplementary lists of medicines on 24 September 2026 on the proposal of the Ministarstvo zdravlja, under the Law on Compulsory Health Insurance; it took effect on 10 October 2026. The legend of that list defines the prescribing code K as a medicine approved by a commission of the Ministry of Health, and the list's special-regime part says the Ministry's medicines commission approves those medicines for rare diseases and transplant programmes on the proposal of specialist boards. The Ministry's draft National Cancer Control Programme, dated July 2011, says the Minister appointed a National Commission for the control of malignant diseases in September 2010 to support a programme covering prevention, early detection, treatment and palliative care. In a statement for 4 March 2026, republished by the Medical CG portal, the Ministry said the HPV vaccine is recommended for girls and boys aged 9 to 26 and is free at health centres, alongside the national programme for early detection of cervical cancer. OnCo could not read the Ministry's own site on 16 November 2026 and found no cancer programme newer than the 2011 draft.",
    programs: ["Basic and supplementary lists of medicines (proposed to the Government)", "Medicines commission for special-regime medicines", "National Cancer Control Programme (draft of July 2011)"],
    institutions: ["health-insurance-fund-montenegro", "institute-of-public-health-montenegro", "clinical-centre-of-montenegro", "cinmed-montenegro"],
    links: [
      { label: "Government decision setting the basic and supplementary lists of medicines, October 2026 (PDF, in Montenegrin)", url: FZO_DECISION_OCT },
      { label: "FZOCG: list of medicines, October 2026, with the legend of codes (PDF, in Montenegrin)", url: FZO_LIST_OCT },
      { label: "Ministry of Health: National Cancer Control Programme, draft of July 2011 (PDF, in Montenegrin, ICCP portal)", url: NCCP_2011 },
      { label: "Medical CG: Ministry of Health statement for HPV awareness day, 4 March 2026 (in Montenegrin)", url: MOH_HPV_2026 },
    ] }),

  i({ id: "special-hospital-brezovik", name: "Specijalna bolnica za plućne bolesti Brezovik (Nikšić)", aka: ["Specijalna bolnica Brezovik", "Brezovik Special Hospital for Lung Diseases"],
    city: "Nikšić", country: "ME", lat: 42.77, lng: 18.94, institutionType: "hospital",
    tldr: "A special hospital for lung diseases at Nikšić in Montenegro. Its board of specialists is one of three named in the national medicines list that can give the opinion required before certain cancer medicines, including lung cancer immunotherapy, are paid for.",
    summary: "The legend of the Health Insurance Fund's list of medicines of October 2026 names the Specijalna bolnica Brezovik, with the Clinical Centre of Montenegro and the oncologists' board of Bijelo Polje general hospital, as a place whose board of specialists (konzilijum) gives the opinion required for medicines with the prescribing codes RK and SZK. The list's indication note for pembrolizumab says its lung cancer uses are approved on the proposal of the competent board of the Clinical Centre, the oncologists' board at Bijelo Polje or the Specijalna bolnica za plućne bolesti Brezovik. CInMED's register of approved clinical trials, updated on 6 July 2026, lists the hospital, at Nikšić, as the site of a completed phase 3 trial of picoplatin in small-cell lung cancer. OnCo has not read the hospital's own pages.",
    programs: ["Board of specialists for restricted lung cancer medicines"],
    institutions: ["clinical-centre-of-montenegro", "health-insurance-fund-montenegro"],
    cancers: ["nsclc", "sclc"],
    links: [
      { label: "FZOCG: list of medicines, October 2026, legend and indication notes (PDF, in Montenegrin)", url: FZO_LIST_OCT },
      { label: "CInMED: register of approved clinical trials, updated 6 July 2026 (PDF, in Montenegrin)", url: CINMED_REGISTER },
    ] }),
];

/** Records behind /countries/me/ (wave 13). */
export const recordsME: EntityInput[] = [...institutions];
