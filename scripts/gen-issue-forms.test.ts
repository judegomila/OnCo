import { describe, expect, it } from "vitest";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { FORMS_DIR, KIND_OPTIONS, LANGUAGE_OPTIONS, syncForm, syncIssueForms } from "./gen-issue-forms";
import { scaffold, render, slug } from "./new-record";
import { idFromThread } from "./fetch-votes";
import { KINDS } from "../src/lib/schema";

describe("issue forms", () => {
  it("dropdowns for kind and language are in sync with the code", () => {
    expect(syncIssueForms(FORMS_DIR, false)).toEqual([]);
    expect(KIND_OPTIONS).toContain("treatment");
    expect(KIND_OPTIONS).toContain("key paper");
    expect(LANGUAGE_OPTIONS).toEqual(["Spanish", "Chinese", "Portuguese", "Hindi", "French", "German", "Japanese", "Arabic"]);
  });

  it("syncForm only touches managed dropdowns", () => {
    const src = "body:\n  - type: dropdown\n    id: kind\n    attributes:\n      label: Kind\n      options: [old]\n  - type: dropdown\n    id: region\n    attributes:\n      options: [US, EU]\n  - type: input\n    id: options\n    attributes:\n      options: [x]\n";
    const out = syncForm(src);
    expect(out).toContain(`options: [${KIND_OPTIONS.join(", ")}]`);
    expect(out).toContain("options: [US, EU]");
    expect(out).toContain("options: [x]");
  });

  it("every form has a name, description, title and at least one required field", () => {
    for (const f of readdirSync(FORMS_DIR).filter((x) => x.endsWith(".yml") && x !== "config.yml")) {
      const text = readFileSync(join(FORMS_DIR, f), "utf8");
      expect(text, f).toMatch(/^name: /m);
      expect(text, f).toMatch(/^description: /m);
      expect(text, f).toMatch(/^title: /m);
      expect(text, f).toMatch(/required: true/);
      expect(text, f).not.toMatch(/\/edit\/main/);
    }
  });
});

describe("record scaffolder", () => {
  it("builds a schema-valid stub for every kind with TODO placeholders listed", () => {
    for (const k of KINDS) {
      const { record, placeholders } = scaffold(k, "Example Thing", "example-thing-test");
      expect(record.id).toBe("example-thing-test");
      expect(record.kind).toBe(k);
      expect(record.name).toBe("Example Thing");
      expect(placeholders.length, k).toBeGreaterThan(0);
      const src = render(k, record, placeholders);
      expect(src).toContain(`export const draft: ${k[0].toUpperCase()}${k.slice(1)}Input`);
      expect(src).toContain("TODO checklist");
    }
  });

  it("slugs names into kebab-case ids", () => {
    expect(slug("Sacituzumab Govitecan (Trodelvy)")).toBe("sacituzumab-govitecan-trodelvy");
    expect(slug("Iza-bren / BL-B01D1")).toBe("iza-bren-bl-b01d1");
  });
});

describe("vote thread matching", () => {
  const known = new Set(["idea-payload-switching", "tnbc"]);
  it("reads the id from the title, the form body, or anywhere in the title", () => {
    expect(idFromThread("idea-payload-switching: Payload-class switching", "", known)).toBe("idea-payload-switching");
    expect(idFromThread("Anything", "### Entity\n\nidea-payload-switching (idea)", known)).toBe("idea-payload-switching");
    expect(idFromThread("Thoughts on tnbc and ADCs", "", known)).toBe(null);
    expect(idFromThread("nothing-here: x", "", known)).toBe(null);
  });
});
