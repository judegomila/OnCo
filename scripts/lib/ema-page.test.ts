import { existsSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { parseEparPage, quotedStatus } from "./ema-page";

/** Markup as the register renders it (23 Sept 2026), trimmed to the elements the parser reads. */
const page = (status: string, title: string, message: string, dl: Array<[string, string]>, extra = "") => `
<html><body><article>
<div class="heading-status"><div data-medicine-status="${status}" data-medicine-icon="x" data-medicine-color="status-x" class="medicine-status"> <p class="h5 status-title">${title}</p> <div class="status-message"><p>${message}</p></div> </div></div>
<div class="fst-italic">inn here</div>
<dl>${dl.map(([k, v]) => `<dt class="pb-1 pb-md-2-5 ps-0 pe-4"><div>${k}</div></dt> <dd class="ps-md-2 pe-2 pb-3 pb-md-2-5"><div>${v}</div></dd>`).join(" ")}</dl>
${extra}
</article></body></html>`;

describe("parseEparPage", () => {
  it("reads an authorised medicine with its dates and the conditional marker", () => {
    const html = page("authorised", "Authorised", "This medicine is authorised for use in the European Union", [
      ["Name of medicine", "Ezmekly"], ["Active substance", "mirdametinib"], ["International non-proprietary name (INN) or common name", "mirdametinib"],
      ["EMA product number", "EMEA/H/C/006460"], ["Marketing authorisation holder", "Merck Europe B.V."], ["Opinion adopted", "22/05/2025"], ["Marketing authorisation issued", "17/07/2025"], ["Revision", "5"],
    ], '<div><svg><use href="icons.svg#icon-checkbox-c-filled"/></svg> <span>Conditional approval</span> <p>This medicine received a conditional marketing authorisation. This was granted in the interest of public health.</p></div>');
    const p = parseEparPage(html, "https://www.ema.europa.eu/en/medicines/human/EPAR/ezmekly");
    expect(p.status).toBe("authorised");
    expect(p.statusTitle).toBe("Authorised");
    expect(p.name).toBe("Ezmekly");
    expect(p.inn).toBe("mirdametinib");
    expect(p.issued).toBe("2025-07-17");
    expect(p.opinionAdopted).toBe("2025-05-22");
    expect(p.conditional).toBe(true);
    expect(p.biosimilar).toBe(false);
    expect(quotedStatus(p)).toBe("Authorised: This medicine is authorised for use in the European Union");
  });

  it("reads a withdrawn authorisation and its withdrawal date", () => {
    const html = page("withdrawn", "Withdrawn", "This medicine&#039;s authorisation has been withdrawn", [
      ["Name of medicine", "MabCampath"], ["International non-proprietary name (INN) or common name", "alemtuzumab"], ["Marketing authorisation issued", "06/07/2001"], ["Withdrawal of marketing authorisation", "08/08/2012"],
    ]);
    const p = parseEparPage(html, "u");
    expect(p.status).toBe("withdrawn");
    expect(p.issued).toBe("2001-07-06");
    expect(p.withdrawn).toBe("2012-08-08");
    expect(p.statusMessage).toBe("This medicine's authorisation has been withdrawn");
  });

  it("reads an application withdrawn before an opinion, a negative opinion and a biosimilar", () => {
    const app = parseEparPage(page("withdrawn-application", "Application withdrawn", "The application for this medicine has been withdrawn", [["Name of medicine", "Zumrad"], ["International non-proprietary name (INN) or common name", "sasanlimab"], ["Marketing authorisation applicant", "Pfizer Europe MA EEIG"]]), "u");
    expect(app.status).toBe("withdrawn-application");
    expect(app.issued).toBeUndefined();
    expect(app.applicant).toBe("Pfizer Europe MA EEIG");
    const neg = parseEparPage(page("opinion", "Opinion", "EMA has issued an opinion on this medicine", [["Name of medicine", "Kinselby"], ["International non-proprietary name (INN) or common name", "resminostat"], ["Opinion adopted", "22/05/2025"], ["Opinion status", "Negative"]]), "u");
    expect(neg.status).toBe("opinion");
    expect(neg.opinionStatus).toBe("Negative");
    expect(neg.opinionAdopted).toBe("2025-05-22");
    const bio = parseEparPage(page("authorised", "Authorised", "m", [["Name of medicine", "Retacrit"], ["International non-proprietary name (INN) or common name", "epoetin zeta"], ["Marketing authorisation issued", "18/12/2007"]], "<span>Biosimilar</span> <p>This is a biosimilar medicine, which is a biological medicine highly similar to another already approved biological medicine.</p>"), "u");
    expect(bio.biosimilar).toBe(true);
    expect(bio.conditional).toBe(false);
  });

  it("returns no status when the page has none", () => {
    const p = parseEparPage("<html><body><h1>Not found</h1></body></html>", "u");
    expect(p.status).toBeUndefined();
    expect(quotedStatus(p)).toBeUndefined();
  });

  // Real pages when a cache from a recent run is on this machine; the fixtures above are cut from the same markup.
  const cached = "/tmp/onco-proposals/ema/varuby.html";
  it.skipIf(!existsSync(cached))("reads a cached live page (varuby) as withdrawn with its issue date", () => {
    const p = parseEparPage(readFileSync(cached, "utf8"), "https://www.ema.europa.eu/en/medicines/human/EPAR/varuby");
    expect(p.status).toBe("withdrawn");
    expect(p.inn).toBe("rolapitant");
    expect(p.issued).toBe("2017-04-19");
  });
});
