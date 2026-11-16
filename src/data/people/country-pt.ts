import type { PersonInput } from "@/lib/schema";

/**
 * People added for /countries/pt/ (wave 5). Public professional information only, from official documents read on
 * 11 November 2026: the national cancer registry's 2019 report (its technical sheet names the coordinator), the
 * coordinator's note on the 2022 figures as reported by RTP and Observador (Lusa) in December 2025, and the
 * Directorate-General of Health's Norma 002/2026, which the Director-General signs.
 */
const asOf = "2026-11-11";
type P = Omit<PersonInput, "kind" | "asOf">;
const p = (x: P): PersonInput => ({ kind: "person", asOf, links: x.profiles, ...x });

export const peoplePT: PersonInput[] = [
  p({ id: "maria-jose-bento", name: "Maria José Bento", role: "Coordinator, Registo Oncológico Nacional; Director, Epidemiology Service, IPO Porto",
    institutionId: "ron-portugal", institutions: ["ron-portugal", "ipo-porto"],
    specialisms: ["Cancer epidemiology", "Cancer registration"],
    tldr: "She coordinates Portugal's national cancer registry and directs the epidemiology service of the Porto oncology institute, and presents the registry's yearly count of new cancers.",
    summary: "Maria José Bento is named as coordinator of the Registo Oncológico Nacional in the technical sheet of the registry's 2019 report, which IPO Porto edited and published. In December 2025 she presented the registry's figures for 2022, 60,954 new cancers, as coordinator of the registry and director of the Epidemiology Service of the Instituto Português de Oncologia do Porto, according to RTP and to Lusa's report in Observador; speaking to Lusa, she called for population screening for lung, prostate and stomach cancer. Under Law 53/2017 the registry's coordinator is a health professional from one of the three oncology institutes, designated for three years by the board of the institutes' group.",
    profiles: [
      { label: "RON 2019 report, technical sheet (PDF, IPO Porto)", url: "https://ipoporto.pt/wpsite_2020/wp-content/uploads/2023/05/ron-2019_new_v8f.pdf" },
      { label: "RTP: Registo Oncológico, mais de 60 mil novos casos de cancro em 2022", url: "https://www.rtp.pt/noticias/pais/registo-oncologico-mais-de-60-mil-novos-casos-de-cancro-em-2022-com-maior-incidencia-em-homens_n1706721" },
      { label: "Observador (Lusa): Portugal registou mais de 60 mil novos casos de cancro em 2022, 29 December 2025", url: "https://observador.pt/2025/12/29/portugal-registou-mais-de-60-mil-novos-casos-de-cancro-em-2022/" },
    ] }),
  p({ id: "rita-sa-machado", name: "Rita Sá Machado", role: "Director-General of Health, Direção-Geral da Saúde, Portugal",
    institutionId: "dgs-portugal", institutions: ["dgs-portugal"],
    specialisms: ["Public health"],
    tldr: "She heads Portugal's Directorate-General of Health, whose standards set the national HPV vaccination schedule and whose cancer programme wrote the national cancer strategy to 2030.",
    summary: "Rita Sá Machado signs as Diretora-Geral da Saúde the Directorate-General of Health's Norma 002/2026 of 8 April 2026, which updates the HPV vaccination strategy in Portugal's national vaccination programme: two doses of the nine-valent vaccine at age 10 for both sexes, catch-up doses for both sexes to age 18 and for women to 27, and a phased catch-up for men born from 2000. The directorate's Programa Nacional para as Doenças Oncológicas prepared the Estratégia Nacional de Luta contra o Cancro, horizonte 2030, approved by Despacho 13227/2023.",
    profiles: [
      { label: "DGS: Norma n.º 002/2026 (PDF, signed by the Director-General)", url: "https://www.dgs.pt/normas-orientacoes-e-informacoes/normas-e-circulares-normativas/norma-n-0022026-de-08042026-atualizacao-da-estrategia-de-vacinacao-contra-o-virus-do-papiloma-humano-hpv-no-programa-nacional-de-vacinacao-pdf.aspx" },
    ] }),
];
