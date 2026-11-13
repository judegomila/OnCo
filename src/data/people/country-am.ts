import type { PersonInput } from "@/lib/schema";

/**
 * People added for /countries/am/ (wave 12). The role was read on the National Center of Oncology's home page, in
 * Armenian, on 11 November 2026.
 */
const asOf = "2026-11-11";
const NCO = "https://www.oncology.am/";

export const peopleAM: PersonInput[] = [
  { kind: "person", asOf, id: "karen-tsarukyan", name: "Karen Tsarukyan",
    role: "Director, National Center of Oncology named after V. A. Fanarjyan, Yerevan",
    institutionId: "national-center-of-oncology-armenia", institutions: ["national-center-of-oncology-armenia"], specialisms: ["Cancer centre leadership"],
    tldr: "Karen Tsarukyan is the director of Armenia's National Center of Oncology in Yerevan.",
    summary: "The home page of the National Center of Oncology named after V. A. Fanarjyan, read in Armenian on 11 November 2026, names Karen Tsarukyan (Կարեն Ծառուկյան) as its director. OnCo has not read a fuller biography.",
    profiles: [{ label: "National Center of Oncology: home page (in Armenian)", url: NCO }],
    links: [{ label: "National Center of Oncology: home page (in Armenian)", url: NCO }],
    tags: ["leadership"], cancers: [] },
];
