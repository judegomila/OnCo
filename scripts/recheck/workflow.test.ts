import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

/**
 * The weekly re-check's workflow is held to its own header: every action pinned to a commit, no secret, the job that
 * runs repository code unable to write, the job that can write running none, and never a merge.
 */
const yml = readFileSync(join(process.cwd(), ".github", "workflows", "weekly-recheck.yml"), "utf8");
const code = yml.split("\n").filter((l) => !l.trim().startsWith("#")).join("\n");
const job = (name: string) => { const m = new RegExp(`\\n  ${name}:\\n([\\s\\S]*?)(?=\\n  [a-z-]+:\\n|$)`).exec(code); if (!m) throw new Error(`no job ${name}`); return m[1]; };
const recheck = job("recheck"), propose = job("propose");

describe("weekly-recheck.yml", () => {
  it("runs on a weekly cron and by hand, one run at a time", () => {
    expect(code).toMatch(/cron: "\d+ \d+ \* \* [0-6]"/);
    expect(code).toContain("workflow_dispatch:");
    expect(code).toMatch(/concurrency:\n  group: weekly-recheck\n  cancel-in-progress: false/);
  });

  it("pins every action to a commit", () => {
    const uses = [...code.matchAll(/uses: (\S+)/g)].map((m) => m[1]);
    expect(uses.length).toBeGreaterThanOrEqual(6);
    for (const u of uses) if (!u.startsWith("./")) expect(u, u).toMatch(/^[\w-]+\/[\w-]+@[0-9a-f]{40}$/);
  });

  it("names no secret and no key", () => {
    expect(code).not.toMatch(/secrets\./);
    expect(code).not.toMatch(/API_KEY|ANTHROPIC|OPENAI/i);
  });

  it("gives no permission by default and the least to each job", () => {
    expect(code).toMatch(/\npermissions: \{\}\n/);
    expect(/permissions:\n((?: {6}.+\n)+)/.exec(recheck)![1].trim()).toBe("contents: read");
    expect(/permissions:\n((?: {6}.+\n)+)/.exec(propose)![1].split("\n").map((l) => l.trim().split(" #")[0]).filter(Boolean).sort()).toEqual(["contents: write", "issues: write", "pull-requests: write"]);
  });

  it("can be paused with one repository variable", () => {
    expect(recheck).toContain("if: vars.WEEKLY_RECHECK_PAUSED != 'true'");
    expect(propose).toContain("needs: recheck");
  });

  it("keeps the job that runs repository code away from credentials", () => {
    expect(recheck).toContain("persist-credentials: false");
    expect(recheck).not.toMatch(/github\.token|GH_TOKEN|GITHUB_TOKEN/);
    expect(recheck).toContain("scripts/weekly-recheck.ts --apply");
    expect(recheck).toContain("uses: ./.github/actions/gates");
    expect(recheck).toContain("scripts/change-class.ts");
  });

  it("runs no repository code in the job that can write", () => {
    expect(propose).not.toMatch(/\b(npm|npx|node|tsx|yarn|pnpm|python3?|bash scripts|sh scripts)\b/);
    expect(propose).not.toMatch(/uses: \.\//);
  });

  it("lets only the generated files and the report reach the pull request, by the same list in both jobs", () => {
    const paths = ["src/data/trial-registry-status.ts", "src/data/trial-participation.ts", "src/data/recheck", "docs/proposals/weekly-recheck-latest.md", "docs/proposals/weekly-recheck-latest.json"];
    for (const p of paths) { expect(recheck).toContain(p); expect(propose).toContain(`--include='${p}`); }
    expect([...propose.matchAll(/--include='([^']+)'/g)]).toHaveLength(paths.length);
  });

  it("opens one labelled pull request and never merges it", () => {
    expect(propose).toContain("branch: bot/weekly-recheck");
    expect(propose).toContain("labels: needs-review, recheck, automated");
    expect(code).not.toMatch(/gh pr merge|--auto|automerge|auto-merge|git push/i);
    expect(propose).toContain("needs.recheck.outputs.product != 'true'");
  });

  it("puts the gate result in the pull request body", () => {
    expect(propose).toContain("PASSED: ${{ needs.recheck.outputs.passed }}");
    expect(propose).toMatch(/Gates: validate, typecheck, lint and the full test suite passed/);
    expect(propose).toMatch(/Gates: \*\*failed\*\*/);
  });
});
