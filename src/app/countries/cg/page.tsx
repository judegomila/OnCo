import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { CG_DIVE } from "@/data/country-cg";

export const metadata: Metadata = pageMeta({ title: CG_DIVE.title, description: CG_DIVE.description, path: "/countries/cg/" });

export default function CongoPage() {
  return <CountryDeepDive dive={CG_DIVE} />;
}
