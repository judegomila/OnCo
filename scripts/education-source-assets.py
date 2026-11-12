"""Inventory every non-Markdown public education blob without copying its body.

Roles inferred from paths are suggestions. Only a dated, blob-bound scope review
may classify an entry as teaching or supporting material.
"""
import argparse
import json
import subprocess
from pathlib import Path


def inventory(guide, ref):
    tree = subprocess.check_output(
        ["git", "ls-tree", "-rlz", ref, "--", "wiki/education/"], cwd=guide
    ).decode()
    items = []
    for row in filter(None, tree.split("\0")):
        info, path = row.split("\t", 1)
        mode, kind, blob, size = info.split()
        if kind != "blob" or path.endswith(".md"):
            continue
        suffix = Path(path).suffix
        suggested = (
            "provenance-or-authoring-support" if "/images/prompts/" in path
            else "standalone-teaching" if suffix == ".html"
            else "visual-teaching-candidate" if suffix in [".svg", ".png"]
            else "archive-needs-inspection"
        )
        items.append({
            "id": ref + ":" + path, "path": path, "guideRef": ref,
            "gitBlob": blob, "bytes": int(size), "format": suffix,
            "sourceURL": "https://github.com/jasonLaster/oncoguide/blob/" + ref + "/" + path,
            "suggestedRole": suggested, "scope": "unclassified",
            "review": {"status": "unreviewed", "points": []},
        })
    return {"guideRef": ref, "assetCount": len(items), "items": items}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--guide", required=True)
    parser.add_argument("--registry", required=True)
    parser.add_argument("--out", required=True)
    args = parser.parse_args()
    registry = json.loads(Path(args.registry).read_text())
    refs = [registry["primaryGuideRef"], *[p["guideRef"] for p in registry["phases"]]]
    if len(refs) != len(set(refs)):
        raise ValueError("Source registry contains duplicate refs")
    output = Path(args.out)
    previous = json.loads(output.read_text()) if output.exists() else {"phases": []}
    old = {item["id"]: item for phase in previous["phases"] for item in phase["items"]}
    phases = [inventory(args.guide, ref) for ref in refs]
    seen = set()
    for phase in phases:
        for item in phase["items"]:
            seen.add(item["id"])
            prior = old.get(item["id"])
            if prior:
                for key in ["path", "guideRef", "gitBlob", "bytes", "format"]:
                    if prior[key] != item[key]:
                        raise ValueError("Pinned asset differs: " + item["id"])
                for key in ["scope", "scopeReview", "sections", "review", "sourceSha256"]:
                    if key in prior:
                        item[key] = prior[key]
    if set(old) - seen:
        raise ValueError("Previously inventoried source assets disappeared")
    output.write_text(json.dumps({
        "schemaVersion": 1,
        "scope": "Independent non-Markdown censuses per source ref. Suggested roles do not establish exclusion, reading or coverage; overlapping version totals must not be added.",
        "phases": phases,
    }, indent=2, ensure_ascii=False) + "\n")
    print(json.dumps([{"guideRef": p["guideRef"], "assets": p["assetCount"]} for p in phases]))


if __name__ == "__main__":
    main()
