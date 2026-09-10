import type { CompanyInput } from "@/lib/schema";

/**
 * Investors that back companies attacking cancer: venture funds, corporate venture arms, an accelerator and disease
 * foundations that invest. They are company records with `companyType: "investor"`; each investor's portfolio is
 * derived from the `investors` field on the companies it backs (see src/lib/startups.ts), so nothing here lists
 * portfolio companies as data. `tags` carries the kind of investor: vc, corporate-venture, accelerator, foundation.
 * Facts checked against each investor's own website on 2026-09-10; no fund sizes unless the site states them.
 */

const asOf = "2026-09-10";

type I = Omit<CompanyInput, "kind" | "asOf" | "companyType" | "links"> & { kindTag: "vc" | "corporate-venture" | "accelerator" | "foundation" | "public-fund"; links?: CompanyInput["links"] };
const inv = ({ kindTag, links = [], ...x }: I): CompanyInput => ({
  kind: "company", asOf, companyType: "investor", tags: [kindTag, ...(x.tags ?? [])],
  links: [{ label: "Official website", url: x.website }, ...links],
  ...x,
});

export const investors: CompanyInput[] = [
  inv({ id: "y-combinator", name: "Y Combinator", kindTag: "accelerator", hq: "San Francisco, CA", country: "US", website: "https://www.ycombinator.com", founded: 2005, sections: ["drug-discovery", "diagnostics", "ai-computation"],
    tldr: "Y Combinator is the start-up accelerator that funds hundreds of new companies a year in return for a small stake. Since 2014 it has backed a steady stream of companies going after cancer, from blood tests to engineered viruses.",
    summary: "Y Combinator runs batches of early-stage companies, investing a standard amount for a fixed equity stake and then a further amount on the same terms as the company's next round, with a three-month programme and Demo Day. Its open directory lists more than 6,000 funded companies; the oncology subset in OnCo (companies with a `ycBatch`) was drawn from that directory and checked one by one. YC's biotech share grew from the mid-2010s, when it began accepting companies such as Notable Labs, Shasqi and BillionToOne, to recent batches with several cancer therapeutics, diagnostics and oncology AI companies each cycle. It is an accelerator rather than a specialist life-science fund, so its oncology bets skew towards software, diagnostics and platform biology with short paths to first revenue or data.",
    links: [{ label: "YC company directory", url: "https://www.ycombinator.com/companies" }, { label: "Open YC directory dataset (yc-oss/api)", url: "https://github.com/yc-oss/api" }] }),
  inv({ id: "third-rock-ventures", name: "Third Rock Ventures", kindTag: "vc", hq: "Boston, MA", country: "US", website: "https://www.thirdrockventures.com", founded: 2007, sections: ["targeted-therapy", "immunotherapy", "diagnostics"],
    tldr: "Third Rock Ventures builds biotech companies from scratch around a scientific idea, then funds and staffs them. Several of the best-known precision oncology companies of the last fifteen years started in its offices.",
    summary: "Third Rock Ventures is a Boston venture firm whose model is company creation: partners incubate a concept, assemble founding scientists and an interim management team, and fund the company through its first years before it raises from others or lists. Oncology has been a central theme since the firm's founding in 2007, with companies built around genomic profiling, kinase inhibitors, cancer metabolism, synthetic lethality and targeted immunotherapies, and a habit of pairing a therapeutic platform with a diagnostic rationale. Its portfolio pages list current and former companies; portfolio links in OnCo are derived from the startup records that name Third Rock as an investor.",
    links: [{ label: "Portfolio", url: "https://www.thirdrockventures.com/portfolio" }] }),
  inv({ id: "amgen-ventures", name: "Amgen Ventures", kindTag: "corporate-venture", hq: "Thousand Oaks, CA", country: "US", website: "https://www.amgen.com/science/collaborations/amgen-ventures", founded: 2004, companies: ["amgen"], sections: ["immunotherapy", "targeted-therapy"],
    tldr: "Amgen Ventures is the venture arm of the biotech company Amgen. It takes minority stakes in early companies whose science could matter to Amgen, including cancer drug and platform start-ups.",
    summary: "Amgen Ventures is Amgen's corporate venture group, formed in 2004 to invest in emerging biotechnology companies developing therapeutics, platforms and technologies aligned with Amgen's therapeutic areas, oncology among them. Like most pharma venture arms it invests alongside institutional venture firms rather than leading rounds alone, and its stakes are as much about scientific visibility and future partnering as about returns. It is listed on the parent company's collaborations pages; portfolio links in OnCo are derived from startup records that name it, such as Kernal Biologics." }),
];
