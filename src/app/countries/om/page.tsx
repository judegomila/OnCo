import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { CountryDeepDive } from "@/components/CountryDeepDive";
import { OM_DIVE } from "@/data/country-om";

export const metadata: Metadata = pageMeta({ title: OM_DIVE.title, description: OM_DIVE.description, path: "/countries/om/" });

export default function OmanPage() {
  return <CountryDeepDive dive={OM_DIVE} />;
}
