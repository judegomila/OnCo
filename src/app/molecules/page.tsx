import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { graph } from "@/lib/graph";
import { routeFor } from "@/lib/schema";
import { STATUS_LABEL } from "@/lib/text";
import { STRUCTURES } from "@/lib/structures";
import { payloads } from "@/data/payloads";
import { Container, GroupKicker, PageHeader } from "@/components/ui";
import { MoleculeGallery, modalityGroup, type GalleryDrug, type MissingDrug } from "@/components/MoleculeGallery";

export const metadata: Metadata = pageMeta({ title: "Molecule gallery", description: "Every product in OnCo with a 3D structure, as rotating wireframes: filter by modality, payload class, target and approval status, open any one in the viewer, and see which products still need a structure.", path: "/molecules/" });

export default function MoleculesPage() {
  const g = graph();
  const payloadClassOf = new Map<string, string>();
  for (const p of payloads) for (const id of p.adcs) payloadClassOf.set(id, p.class);
  const drugs: GalleryDrug[] = [];
  const missing: MissingDrug[] = [];
  for (const d of g.kind("drug")) {
    const entries = STRUCTURES[d.id];
    if (entries?.length) {
      drugs.push({
        id: d.id, name: d.name, route: routeFor(d), modality: d.modality, modalityGroup: modalityGroup(d.modality), status: d.status, statusLabel: d.status ? (STATUS_LABEL[d.status] ?? d.status) : "",
        targets: d.targets.map((id) => g.get(id)).filter((t): t is NonNullable<typeof t> => !!t).map((t) => ({ id: t.id, name: t.name })),
        payloadClass: payloadClassOf.get(d.id), entries,
      });
    } else missing.push({ id: d.id, name: d.name, route: routeFor(d), modality: d.modality, status: d.status });
  }
  drugs.sort((a, b) => a.name.localeCompare(b.name));
  missing.sort((a, b) => a.name.localeCompare(b.name));
  const proteins = drugs.filter((d) => d.entries[0].source === "pdb").length;
  return (
    <>
      <PageHeader kicker={<GroupKicker id="map" />} title="Molecule gallery"
        lede={`${drugs.length} products drawn from their real 3D coordinates (${drugs.length - proteins} small molecules and payloads from PubChem, ${proteins} antibody and protein backbones from the PDB), all rotating at once. Filter to a class, a payload or a target, click one to inspect it, and scroll down for the ${missing.length} products still waiting for a structure.`} />
      <Container className="pb-16">
        <MoleculeGallery drugs={drugs} missing={missing} />
        <p className="text-xs text-muted mt-8 max-w-3xl">Structures are fetched once by <code>scripts/fetch-structures.ts</code> and served from this site; nothing is loaded from PubChem or RCSB while you browse. For ADCs the first entry is the payload, for biologics the antibody backbone (a representative IgG where the specific antibody has not been solved), each labelled as such in the viewer.</p>
      </Container>
    </>
  );
}
