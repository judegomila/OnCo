import type { PersonInput } from "@/lib/schema";

/**
 * People added for /countries/dk/ (wave 7). Each role was read on Medicinrådet's own news pages on 11 November 2026:
 * the chair is quoted as forperson in the brexucabtagene autoleucel and trastuzumab deruxtecan announcements, and the
 * director in the announcement on the 2025 backlog of applications.
 */
const asOf = "2026-11-11";
const MR_BREXU = "https://medicinraadet.dk/nyheder/2026/ny-effektbaseret-aftale-baner-vejen-for-behandling-til-kraeftpatienter";
const MR_TDXD = "https://medicinraadet.dk/nyheder/2026/ny-risikodelingsaftale-abner-for-behandling-af-to-typer-kraeft";
const MR_BACKLOG = "https://medicinraadet.dk/nyheder/2026/medicinradets-sagspukkel-er-naesten-vaek-nye-vurderinger-starter-som-planlagt";

export const peopleDK: PersonInput[] = [
  { kind: "person", asOf, id: "birgitte-klindt-poulsen", name: "Birgitte Klindt Poulsen",
    role: "Chair (forperson), Medicinrådet (Danish Medicines Council)",
    institutionId: "medicinraadet", institutions: ["medicinraadet"], specialisms: ["Medicines prioritisation", "Health technology assessment"],
    tldr: "Birgitte Klindt Poulsen chairs Medicinrådet, the council that decides which new hospital medicines Denmark's regions take into standard use.",
    summary: "Birgitte Klindt Poulsen is named as forperson (chair) of Medicinrådet in its 2026 announcements. Commenting on the recommendation of the CAR-T therapy brexucabtagene autoleucel under an outcome-based risk-sharing agreement, she said that the treatment is very expensive and its effect uncertain, and that the agreement lets the health service use it and collect data on its effect in Danish practice; on trastuzumab deruxtecan she said the council would like to see more such agreements.",
    profiles: [{ label: "Medicinrådet: risk-sharing agreement for brexucabtagene autoleucel (2026)", url: MR_BREXU }],
    links: [
      { label: "Medicinrådet: ny effektbaseret aftale baner vejen for behandling til kræftpatienter", url: MR_BREXU },
      { label: "Medicinrådet: ny risikodelingsaftale åbner for behandling af to typer kræft", url: MR_TDXD },
    ],
    drugs: ["brexucabtagene-autoleucel", "trastuzumab-deruxtecan"],
    tags: ["government"], cancers: [] },

  { kind: "person", asOf, id: "soren-gaard", name: "Søren Gaard",
    role: "Director, Medicinrådet (Danish Medicines Council)",
    institutionId: "medicinraadet", institutions: ["medicinraadet"], specialisms: ["Medicines prioritisation", "Health administration"],
    tldr: "Søren Gaard is director of Medicinrådet, whose secretariat assesses new hospital medicines for Denmark's five regions.",
    summary: "Søren Gaard is named as Medicinrådet's director in its 2026 announcement that the backlog left by a record 81 applications in 2025 had almost been cleared, with new assessments again starting as planned. He described the work to catch up on postponed assessments and to digitise the process, including a new applicant portal for companies.",
    profiles: [{ label: "Medicinrådet: the backlog is almost gone (2026)", url: MR_BACKLOG }],
    links: [{ label: "Medicinrådet: sagspuklen er næsten væk, nye vurderinger starter som planlagt", url: MR_BACKLOG }],
    tags: ["government"], cancers: [] },
];
