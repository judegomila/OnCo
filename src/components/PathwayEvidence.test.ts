import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { PathwaySchema } from "@/lib/schema";
import { PathwayDiagram } from "./PathwayDiagram";

const fixture = () => PathwaySchema.parse({
  id: "example-pathway", kind: "pathway", name: "Fictional review example", asOf: "2026-11-08",
  tldr: "A fictional contract fixture.", summary: "A fictional contract fixture.", analogy: "A fictional relay.",
  nodes: [{ id: "example-input", label: "Input A", x: 0, y: 0 }, { id: "example-output", label: "Output B", x: 1, y: 1 }],
  edges: [{ from: "example-input", to: "example-output", type: "activates" }],
});

describe("mechanism evidence presentation", () => {
  it("renders an accessible source/context disclosure for a hypothesis rather than an unqualified claim", () => {
    const pathway = fixture();
    pathway.edges[0].evidence = [{ basis: "hypothesis", context: "A fictional experimental system", statement: "A proposed relationship in the example", limitation: "This example does not establish patient benefit.", checkedOn: "2026-11-08", sources: [{ label: "Fictional example source", url: "https://example.org/method" }] }];
    const html = renderToStaticMarkup(createElement(PathwayDiagram, { p: pathway }));
    expect(html).toContain("Hypothesis: Input A activates Output B");
    expect(html).toContain("<details");
    expect(html).toContain("Relationship evidence and context");
    expect(html).toContain("A fictional experimental system");
    expect(html).toContain('href="https://example.org/method"');
    expect(html).toContain("This example does not establish patient benefit.");
  });

  it("does not invent evidence or add an empty source panel to a legacy edge", () => {
    const html = renderToStaticMarkup(createElement(PathwayDiagram, { p: fixture() }));
    expect(html).toContain("Input A activates Output B");
    expect(html).not.toContain("Hypothesis:");
    expect(html).not.toContain("Relationship evidence and context");
  });
});
