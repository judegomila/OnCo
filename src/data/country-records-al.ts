import type { EntityInput, InstitutionInput } from "@/lib/schema";

/**
 * Albania: records behind /countries/al/ (wave 13). None were added on 16 November 2026. The four bodies the page
 * describes from sources read that day, the Institute of Public Health (ishp-albania), the Compulsory Health Care
 * Insurance Fund (fsdksh-albania), the medicines agency (akbpm-albania) and the University Hospital Centre "Mother
 * Teresa" (mother-teresa-hospital-tirana), are already in the corpus and the page links them by id. The health
 * ministry (named "Ministria e Shëndetësisë dhe Mirëqenies Sociale" in decision no. 324 of 2026) has no record here because its site refused a plain request and nothing was read from it.
 */
const institutions: InstitutionInput[] = [];

/** Records behind /countries/al/ (wave 13). */
export const recordsAL: EntityInput[] = [...institutions];
